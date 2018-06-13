import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { RepoSearchService } from '../../Services/repo-search.service';
import { Repo } from '../../Models/Repo.model';
import { ReadMeFormat } from '../../Models/readme.format.model';
import { ReadMeResponse } from '../../Models/ReadMeResponse.model';

@Component({
  selector: 'app-read-me',
  templateUrl: './read-me.component.html',
  styleUrls: ['./read-me.component.css']
})
export class ReadMeComponent implements OnInit, AfterViewInit {

  @Input() Repo: Repo;

  Loading: boolean = true;

  ReadMeHtml: string;

  private download_url: string;

  constructor(private repoApi: RepoSearchService)
  {
    
  }

  ngOnInit() {
  }

  ngAfterViewInit()
  { 
    this.repoApi.GetMarkdown(this.Repo.owner.login, this.Repo.name, ReadMeFormat.Html).subscribe(x =>
    {
      this.Loading = false;
      this.ReadMeHtml = x.content;
      this.download_url = x.download_url;
    });
  }

  TriggerDownload(format: ReadMeFormat)
  {
    window.open(this.download_url + format, "_blank");
  }

}
