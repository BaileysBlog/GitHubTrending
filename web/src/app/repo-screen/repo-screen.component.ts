import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RepoSearchService } from '../Services/repo-search.service';
import { TrendingRepo } from '../Models/trending-repo.model';

@Component({
  selector: 'repo-screen',
  templateUrl: './repo-screen.component.html',
  styleUrls: ['./repo-screen.component.css']
})
export class RepoScreenComponent implements OnInit
{
  
  _RepoData: TrendingRepo;
  Loading: boolean = true;

  Owner: string;
  RepoTitle: string;

  cards = [
    { title: 'READ.ME', cols: 2, rows: 1 },
    { title: 'Pull Requests', cols: 1, rows: 1 },
    { title: 'Issues', cols: 1, rows: 2 },
    { title: 'Contributors', cols: 1, rows: 1 }
  ];

  constructor(private route: ActivatedRoute, private router: Router,private repoApi: RepoSearchService)
  { 

  }

  ngOnInit()
  { 
    this.route.paramMap.subscribe((params) =>
    {
      this.Owner = params.get('owner');
      this.RepoTitle = params.get('repo');

      this.repoApi.SearchRepo(this.Owner, this.RepoTitle).subscribe(x =>
      {
        if (x == null)
        {
          this.router.navigate([""]);
        } else
        { 
          this.Loading = false;
          this._RepoData = x;
        }  
      });

    });
  }
}
