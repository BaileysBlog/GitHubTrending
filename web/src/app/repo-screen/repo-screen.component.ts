import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RepoSearchService } from '../Services/repo-search.service';
import { TrendingRepo } from '../Models/trending-repo.model';
import { ElectronService } from 'ngx-electron';
import { Repo } from '../Models/Repo.model';




@Component({
  selector: 'repo-screen',
  templateUrl: './repo-screen.component.html',
  styleUrls: ['./repo-screen.component.css']
})
export class RepoScreenComponent implements OnInit
{
  
  _RepoData: Repo;
  Loading: boolean = true;

  Owner: string;
  RepoTitle: string;

  cards = [
    { title: 'READ.ME', cols: 2, rows: 1 },
    { title: 'Pull Requests', cols: 1, rows: 1 },
    { title: 'Issues', cols: 1, rows: 2 },
    { title: 'Contributors', cols: 1, rows: 1 }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private repoApi: RepoSearchService, private _electronService: ElectronService)
  { 
    
  }

  ngOnInit()
  { 
    this.route.paramMap.subscribe((params) =>
    {
      this.Owner = params.get('owner');
      this.RepoTitle = params.get('repo');

      this.repoApi.SearchRepo(this.Owner, this.RepoTitle).subscribe(data =>
      {
        this._RepoData = data;
        this.Loading = false;
        
      });
    });
  }

  LaunchGitHubPage()
  { 
    let link = `https://www.github.com/${this.Owner}/${this.RepoTitle}`;

    if (this._electronService.isElectronApp)
    {
      this._electronService.shell.openExternal(link);
    } else
    { 
      window.open(link, "_blank");
    }  
  }
}
