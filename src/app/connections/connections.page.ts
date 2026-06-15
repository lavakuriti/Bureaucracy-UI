import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonIcon, IonToggle, IonButton, IonButtons, IonItemDivider, IonNote
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  mailOutline, desktopOutline, logInOutline, carOutline,
  checkmarkCircleOutline, alertCircleOutline, arrowBackOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-connections',
  templateUrl: 'connections.page.html',
  styleUrls: ['connections.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
    IonIcon, IonToggle, IonButton, IonButtons, IonItemDivider, IonNote
  ],
})
export class ConnectionsPage {
  // Core Access toggles
  gmailEnabled = true;
  outlookEnabled = false;

  constructor() {
    addIcons({
      mailOutline,
      desktopOutline,
      logInOutline,
      carOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
      arrowBackOutline
    });
  }

  // Toggle handlers
  onGmailToggle(event: any) {
    this.gmailEnabled = event.detail.checked;
  }

  onOutlookToggle(event: any) {
    this.outlookEnabled = event.detail.checked;
  }

  // Portal action handlers
  editMyGovLogin() {
    console.log('Edit MyGov login');
    // TODO: Navigate to edit login modal or page
  }

  disconnectMyGov() {
    console.log('Disconnect MyGov');
    // TODO: Implement disconnect logic with confirmation
  }

  connectInsurance() {
    console.log('Connect Progressive Insurance');
    // TODO: Navigate to connection flow
  }
}
