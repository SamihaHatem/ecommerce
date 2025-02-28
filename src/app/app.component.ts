import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  myPlatformId = inject(PLATFORM_ID)
  ngOnInit(): void {
    if (isPlatformBrowser(this.myPlatformId)) {
      if (localStorage.getItem('theme') == 'dark') {
        document.documentElement.classList.add('dark')
      }
      else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
  title = 'ecommerce';


}
