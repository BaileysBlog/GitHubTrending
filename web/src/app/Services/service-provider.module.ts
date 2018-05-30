import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoSearchService } from './repo-search.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [RepoSearchService]
})
export class ServiceProviderModule { }
