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

  public SearchRepo(OwnerName: string, RepoName: string): Observable<TrendingRepo>
  { 
    var thing = this.web.get<TrendingRepo[]>("/assets/Trending.json").pipe(map(x =>
    {
      return x.filter(y => y.RepoOwner == OwnerName && y.RepoTitle == RepoName);
    }), map(x => { if (x.length == 0) { return null } else { return x[0] } }), share());
    return thing;
  }
}
