import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map,filter,share } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { TrendingRepo } from '../Models/trending-repo.model';
import { ElectronService } from 'ngx-electron';
import { Repo } from '../Models/Repo.model';
import { ReadMeFormat } from '../Models/readme.format.model';
import { ReadMeResponse } from '../Models/ReadMeResponse.model';


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


  constructor(private web: HttpClient,private electron: ElectronService)
  {
    this.TrendingChanged = this._TrendingChanged.asObservable();
    this.TopicChanged = this._TopicChanged.asObservable();
  }

  public ChangeTopics(index: number)
  { 
    if (this._CurrentTopic != index)
    { 
      this._TopicChanged.next();
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

      trendingRepoApi.subscribe(x => { this._TrendingRepos = x; this._TrendingChanged.next();});

      return trendingRepoApi;
    }  
  }

  public SearchRepo(OwnerName: string, RepoName: string) : Observable<Repo>
  { 
    return this.web.get<Repo>(`http://localhost:9832/api/repo/search?Owner=${OwnerName}&Repo=${RepoName}`);
  }

  public LoadMarkdownFromUrl(url: string): Observable<ReadMeResponse>
  { 
    return this.web.get<ReadMeResponse>(url);
  }

  public GetMarkdown(owner: string, repo: string, format: ReadMeFormat): Observable<ReadMeResponse>
  { 
    return this.web.get<ReadMeResponse>(`http://localhost:9832/api/repo/readme?Owner=${owner}&Repo=${repo}&format=${format}`)
  }
}
