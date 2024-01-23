import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // تعيين 'en' كلغة افتراضية
    translate.setDefaultLang('en'); 
    // استخدام 'en' كلغة نشطة للتطبيق
    translate.use('en'); 
  }
  isMenuVisible = true;
  isadmin = false;
  title = 'online-store';
}
