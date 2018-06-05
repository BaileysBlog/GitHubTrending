import { Component, OnInit, Input } from '@angular/core';
import { TrendingRepo } from '../../Models/trending-repo.model';

@Component({
  selector: 'app-repo-preview',
  templateUrl: './repo-preview.component.html',
  styleUrls: ['./repo-preview.component.css']
})
export class RepoPreviewComponent implements OnInit {

  @Input() RepoData: TrendingRepo;


  public GetTitle(): string
  { 
    
    return `${this.RepoData.repoOwner}/${this.RepoData.repoTitle}`;
  }

  constructor() { }

  ngOnInit() {
  }

}
