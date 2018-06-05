import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map,filter,share } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { TrendingRepo } from '../Models/trending-repo.model';


@Injectable({
  providedIn: 'root'
})
export class RepoSearchService {

  _CurrentTopic: number = 0;
  _Topics: string[] = ["Trending","C", "C#"];
  _TrendingRepos: TrendingRepo[] = [];
  _TrendingChanged: Subject<null> = new Subject<null>();
  public TrendingChanged: Observable<null>;
  _TopicChanged: Subject<null> = new Subject<null>();
  public TopicChanged: Observable<null>;


  constructor(private web: HttpClient)
  {
    this.TrendingChanged = this._TrendingChanged.asObservable();
    this.TopicChanged = this._TopicChanged.asObservable();
  }

  public ChangeTopics(index: number)
  { 
    if (this._CurrentTopic != index)
    { 
      this._TopicChanged.next();
      console.log("Changed Topics ", index);
      this._TrendingRepos = [];
      if (index != 0)
      {
        this.GetTrending('daily', this._Topics[index]);
      } else
      { 
        this.GetTrending('daily', "");
      }  

      this._CurrentTopic = index;
    }  
  }

  public GetTrending(Period: string, Language: string = this._Topics[this._CurrentTopic]): Observable<TrendingRepo[]>
  {

    if (Language == "Trending")
    {
      Language = "";
    }  

    if (this._TrendingRepos.length != 0)
    {
      return of(this._TrendingRepos);
    } else
    { 
      var trendingRepoApi = this.web.get<TrendingRepo[]>(`http://localhost:9832/api/repo/trending?Period=${Period}&Language=${encodeURIComponent(Language)}`).pipe(share());

      trendingRepoApi.subscribe(x => { this._TrendingRepos = x; this._TrendingChanged.next(); });

      return trendingRepoApi;
    }  
  }

  public SearchRepo(OwnerName: string, RepoName: string)//: Observable<TrendingRepo>
  { 
    /* var thing = this.web.get<TrendingRepo[]>("http://localhost:9832/api/repo/trending").pipe(map(x =>
    {
      return x.filter(y => y.repoOwner == OwnerName && y.repoTitle == RepoName);
    }), map(x => { if (x.length == 0) { return null } else { return x[0] } }), share());
    return thing; */
  }
}
