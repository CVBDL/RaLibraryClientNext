import { Component } from '@angular/core';

import { NavLink } from "./nav-link.model";

@Component({
  selector: 'ral-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  readonly navLinks: Array<NavLink> = [
    { path: '/profile', label: 'Me' },
    { path: '/browse', label: 'Browse' },
    { path: '/search', label: 'Search' }
  ]
}
