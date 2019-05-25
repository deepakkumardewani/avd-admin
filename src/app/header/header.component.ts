import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService
    ) {}

  title: String;
  isMobile: boolean;

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(
          this.router.routerState,
          this.router.routerState.root
        ).join('-');
        this.title = title;

      }
    });
  }

  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
