import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepoSearchService } from '../Services/repo-search.service';
import { SideNavService } from '../Services/side-nav.service';
import { MatSidenav, MatIcon } from '@angular/material';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent
{

  @ViewChild('drawer') _Drawer: MatSidenav
  @ViewChild('toggler') _ToggleBtn: MatIcon

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  

  constructor(private breakpointObserver: BreakpointObserver, public trendingApi: RepoSearchService, public navService: SideNavService)
  {
    this.trendingApi.TopicChanged.subscribe(x =>
    {
      if (this._Drawer && this._Drawer.opened && this._Drawer.mode == "over")
      { 
        this._Drawer.close();
        if (this._ToggleBtn)
        { 
          (this._ToggleBtn._elementRef.nativeElement as HTMLElement).blur();
        }  
      }  
    });
  }

}
