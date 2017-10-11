import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ral-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  host: { 'class': 'ral-nav' },
  encapsulation: ViewEncapsulation.None
})
export class NavComponent {
  readonly navLinks: Array<NavLink> = [
    { path: '/profile', label: 'Me' },
    { path: '/browse', label: 'Browse' },
    { path: '/search', label: 'Search' }
  ]
}

interface NavLink {
  path: string, 
  label: string
}
