import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map,filter,share } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { TrendingRepo } from '../Models/trending-repo.model';

@Injectable({
  providedIn: 'root'
})
export class RepoSearchService {


  constructor(private web: HttpClient) { }


  public GetTrending(Period: string, Language: string): Observable<TrendingRepo[]>
  {
    return this.web.get<TrendingRepo[]>(`http://localhost:9832/api/repo/trending?Period=${Period}&Language=${Language}`);
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
