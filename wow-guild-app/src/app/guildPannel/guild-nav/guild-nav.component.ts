import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'guild-nav',
  templateUrl: './guild-nav.component.html',
  styleUrls: ['./guild-nav.component.css']
})
export class GuildNavComponent {

  // TODO: Add roll and vote mby some other stuff  like  Wall with  posts 
  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

}
