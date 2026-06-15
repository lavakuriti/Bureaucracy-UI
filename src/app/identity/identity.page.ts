import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItemGroup, IonItem, IonLabel, IonInput, IonIcon, IonButton, IonButtons, IonFab, IonFabButton, IonItemDivider } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  eyeOutline, eyeOffOutline, lockClosedOutline, cloudUploadOutline,
  arrowBackOutline, checkmarkDoneOutline, pencilOutline, closeOutline
} from 'ionicons/icons';

interface MaskedField {
  actual: string;
  masked: string;
  isRevealed: boolean;
}

@Component({
  selector: 'app-identity',
  templateUrl: 'identity.page.html',
  styleUrls: ['identity.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItemGroup,
    IonItem, IonLabel, IonInput, IonIcon, IonButton, IonButtons, IonFab,
    IonFabButton,
    IonItemDivider
],
})
export class IdentityPage {
  isEditMode = false;

  // Personal Details
  fullName = 'Alexandra Johnson';
  primaryAddress = '1225 Oak Street, San Francisco, CA 94102';
  dateOfBirth = '1988-05-15';

  // Government IDs - Masked
  ssn: MaskedField = {
    actual: '123-45-6789',
    masked: '***-**-6789',
    isRevealed: false
  };

  driverLicense: MaskedField = {
    actual: 'DL123456789',
    masked: '***-***-6789',
    isRevealed: false
  };

  // Contact Preferences
  officialEmail = 'alexandra.johnson@email.com';
  officialPhone = '+1 (555) 123-4567';

  constructor() {
    addIcons({
      eyeOutline,
      eyeOffOutline,
      lockClosedOutline,
      cloudUploadOutline,
      arrowBackOutline,
      checkmarkDoneOutline,
      pencilOutline,
      closeOutline
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  toggleFieldVisibility(field: MaskedField) {
    field.isRevealed = !field.isRevealed;
  }

  getDisplayValue(field: MaskedField): string {
    return field.isRevealed ? field.actual : field.masked;
  }

  scanNewID() {
    console.log('Scan new ID - open file upload');
    // TODO: Open file picker or camera for ID scanning
  }

  saveChanges() {
    console.log('Save profile changes');
    // TODO: Implement save logic and validation
    this.isEditMode = false;
  }

  discardChanges() {
    this.isEditMode = false;
    // TODO: Reset form fields if they were edited
  }
}
