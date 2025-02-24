import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../services/flowbite/flowbite.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  mood: string = 'light'
  constructor(private flowbiteService:FlowbiteService) { }

  toggleMood() {
    (this.mood == 'light') ? this.mood = 'dark' : this.mood = 'light';
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => { });
  }
}
