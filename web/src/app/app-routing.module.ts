import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepoScreenComponent } from './repo-screen/repo-screen.component';
import { TrendingScreenComponent } from './trending-screen/trending-screen.component';

const routes: Routes =
  [
    { path: ':owner/:repo', component: RepoScreenComponent },
    { path: '', component: TrendingScreenComponent},
    { path: '**', redirectTo: ''}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
