import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoSearchService } from './repo-search.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [RepoSearchService]
})
export class ServiceProviderModule { }
