import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
  private renderer2: Renderer2
  myPlatformId = inject(PLATFORM_ID)

  constructor(private translateService: TranslateService, private renderer: RendererFactory2) {
    this.renderer2 = this.renderer.createRenderer(null, null)

    this.translateService.setDefaultLang('en')
    if (isPlatformBrowser(this.myPlatformId)) {
      const savedLang = localStorage.getItem('lang')
      if (savedLang)
        translateService.use(savedLang!)
    }
  }


  changeDirection() {
    if (localStorage.getItem('lang') == 'eng') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr')
    } else if (localStorage.getItem('lang') == 'ar') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl')
    }
  }



}


export function httpLoadderFaactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json')
}
