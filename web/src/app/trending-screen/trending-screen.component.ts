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
  
  Cards: any = [];
  Loading: boolean = false;

  constructor(private trendingApi: RepoSearchService)
  { 
    this.trendingApi.TopicChanged.subscribe(x=>this.Loading = true);
    this.trendingApi.TrendingChanged.subscribe(x => {this.GetTrendingCards();});
    this.GetTrendingCards();
  }

  public GetTrendingCards()
  { 
    this.Loading = true;
    this.trendingApi.GetTrending('daily').pipe(map(x =>
    {
      var newArray:any[] = [];
      x.forEach(repo => {
        newArray.push({ title: `${repo.repoOwner}/${repo.repoTitle}`, repoData: repo, cols: 1, rows: 1})
      });
      return newArray;
    })).subscribe(x =>
    {
      this.Cards = x;
      this.Loading = false;
     });
  }
}
