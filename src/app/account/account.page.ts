import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonLabel, IonIcon, IonAvatar, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonItemGroup, IonItemDivider
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personCircleOutline, shieldCheckmarkOutline, keyOutline,
  settingsOutline, logOutOutline, helpCircleOutline,
  informationCircleOutline, lockClosedOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
    IonLabel, IonIcon, IonAvatar, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonItemGroup, IonItemDivider
  ],
})
export class AccountPage {
  private authService = inject(AuthService);
userProfile : any = {}
  // get userProfile() {
  //   const profile = this.authService.userProfile;
  //   return {
  //     name: profile?.name || 'Guest User',
  //     email: profile?.email || 'Not signed in',
  //     avatar: profile?.avatar || null,
  //     memberSince: 'January 2024' // Mock data
  //   };
  // }

  constructor(private router: Router, private route: ActivatedRoute) {
    addIcons({
      personCircleOutline,
      shieldCheckmarkOutline,
      keyOutline,
      settingsOutline,
      logOutOutline,
      helpCircleOutline,
      informationCircleOutline,
      lockClosedOutline
    });
  }

  navigateToIdentity() {
    this.router.navigate(['..', 'identity'], {relativeTo: this.route});
  }

  navigateToConnections() {
    this.router.navigate(['..', 'connections'], {relativeTo: this.route});
  }

  navigateToSettings() {
    // TODO: Implement settings page
    console.log('Navigate to settings');
  }

  navigateToHelp() {
    // TODO: Implement help page
    console.log('Navigate to help');
  }

  navigateToAbout() {
    // TODO: Implement about page
    console.log('Navigate to about');
  }

  logout() {
    // this.authService.logout();
  }
}