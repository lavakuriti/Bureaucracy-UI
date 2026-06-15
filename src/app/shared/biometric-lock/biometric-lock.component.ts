import { Component, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonCard, IonCardContent,
  IonIcon, IonButton, IonText, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosedOutline, fingerPrintOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { BiometricService } from 'src/app/services/biometric.service';
@Component({
  selector: 'app-biometric-lock',
  templateUrl: 'biometric-lock.component.html',
  styleUrls: ['biometric-lock.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonCard, IonCardContent,
    IonIcon, IonButton, IonText, IonSpinner
  ],
})
export class BiometricLockComponent {
  @Output() authenticated = new EventEmitter<boolean>();

  private biometricService = inject(BiometricService);

  isAuthenticating = false;
  isAuthenticated = false;
  errorMessage = '';

  constructor() {
    addIcons({
      lockClosedOutline,
      fingerPrintOutline,
      checkmarkCircleOutline
    });
  }

  async authenticate() {
    this.isAuthenticating = true;
    this.errorMessage = '';

    try {
      const result = await this.biometricService.authenticate();

      if (result) {
        this.isAuthenticated = true;
        this.authenticated.emit(true);
        // Navigate to vault after successful authentication
        setTimeout(() => {
          console.log('Authentication successful - accessing vault');
        }, 1000);
      } else {
        this.errorMessage = 'Authentication failed. Please try again.';
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Authentication error occurred.';
    } finally {
      this.isAuthenticating = false;
    }
  }

  cancel() {
    // TODO: Navigate back or close modal
    console.log('Authentication cancelled');
  }
}