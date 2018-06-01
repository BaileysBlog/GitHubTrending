import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RepoSearchService } from '../Services/repo-search.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'trending-screen',
  templateUrl: './trending-screen.component.html',
  styleUrls: ['./trending-screen.component.css']
})
export class TrendingScreenComponent {
  
  Cards:any = [];

  constructor(private trendingApi: RepoSearchService)
  { 
    this.GetTrendingCards();
  }

  public GetTrendingCards()
  { 
    this.trendingApi.GetTrending('daily', '').pipe(map(x =>
    {
      var newArray:any[] = [];
      x.forEach(repo => {
        newArray.push({ title: `${repo.repoOwner}/${repo.repoTitle}`, cols: 1, rows: 1})
      });
      return newArray;
    })).subscribe(x =>
    {
      this.Cards = x;
     });
  }
}
