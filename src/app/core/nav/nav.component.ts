import { Component } from '@angular/core';

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

interface NavLink {
  path: string, 
  label: string
}
