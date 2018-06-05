import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

import { Observable, pipe } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SideNavService
{


  ShowTopics: boolean = true;



  constructor(private nav: Router)
  {
    nav.events.pipe(filter(x => { return x instanceof NavigationEnd })).subscribe((e: RouterEvent) =>
    {
      if (e.url != "/")
      {
        this.ShowTopics = false;
      } else
      { 
        this.ShowTopics = true;
      }
    });
  }
}
