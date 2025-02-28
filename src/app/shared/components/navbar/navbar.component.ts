import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../services/flowbite/flowbite.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  mood: string = 'light'
  private readonly router = inject(Router)
  private readonly myPlatformID = inject(PLATFORM_ID)
  isLoggedIn: boolean = false
  constructor(private flowbiteService: FlowbiteService) {
  }

  toggleMood() {
    (this.mood == 'light') ? this.mood = 'dark' : this.mood = 'light';
  }

  logout() {
    if (isPlatformBrowser(this.myPlatformID)) {
      localStorage.clear()
    }
    this.router.navigate(['login'])
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => { });

    if (isPlatformBrowser(this.myPlatformID)) {
      (localStorage.getItem('eToken')) ? this.isLoggedIn = true : this.isLoggedIn = false
    }
  }
}
