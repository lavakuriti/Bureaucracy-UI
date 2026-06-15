import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonLabel, IonIcon, IonBadge, IonButton, IonButtons, IonSpinner,
  IonFab, IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personCircleOutline, documentTextOutline, notificationsOutline, scanOutline, carOutline,
  businessOutline, shieldCheckmarkOutline, alertCircleOutline, add
} from 'ionicons/icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonIcon, IonBadge,
    IonButton, IonButtons, IonSpinner, IonFab, IonFabButton
  ],
})
export class HomePage {
  deadlines = [
    {
      id: 1,
      title: 'Tesla Insurance Renewal',
      due: 'Due in 2 days',
      icon: 'car-outline',
      category: 'Insurance',
      isOverdue: false
    },
    {
      id: 2,
      title: 'Q4 Tax Declaration',
      due: 'Overdue',
      icon: 'business-outline',
      category: 'Taxes',
      isOverdue: true
    }
  ];

  constructor(private authService: AuthService) {
    addIcons({ personCircleOutline, documentTextOutline, businessOutline, add });
    addIcons({
      notificationsOutline, scanOutline, carOutline,
      businessOutline, shieldCheckmarkOutline, alertCircleOutline
    });
  }
  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log("code", code)
    if (code) {
      this.exchangeCode(code);
    }
  }

  async exchangeCode(code: string) {
    try {
      this.authService.exchangeCode(code).subscribe(async (response) => {
        console.log("response", response)
        this.authService.setAccessToken(response.accessToken);
        console.log('Tokens saved securely!');
      });
      // Remove code from URL
      window.history.replaceState({}, '', '/app/home');

    } catch (error) {
      console.error('Failed to exchange code:', error);
    }
  }
  testTokens() {
    this.authService.getAccessToken();
    this.authService.getRefreshToken();
  }
  refreshTokens() {
    this.authService.refreshTokens().then((token) => {
      console.log('Access Token:', token);
    });
  }
}