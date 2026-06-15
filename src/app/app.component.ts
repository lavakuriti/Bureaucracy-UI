import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { pulseOutline, folderOutline, checkboxOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {
    // this.authService.initAuth().then(() => {
    //   if (this.authService.isLoggedIn) {
    //     this.router.navigate(['/app/home']);
    //   } else {
    //   }
    // });
        // this.router.navigate(['/login']);

  }
}
