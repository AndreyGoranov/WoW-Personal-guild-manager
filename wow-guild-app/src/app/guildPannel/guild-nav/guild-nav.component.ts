import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'guild-nav',
  templateUrl: './guild-nav.component.html',
  styleUrls: ['./guild-nav.component.css']
})
export class GuildNavComponent {

  // TODO: Add roll and vote mby some other stuff  like  Wall with  posts 
  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  opened:boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  redirect(route: string): any {
    this.opened = false;
    this.router.navigate(['guild/g',{ outlets: { "guild": [route] } }]);
  } 

}
