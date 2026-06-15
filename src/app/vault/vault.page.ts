import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton,
  IonLabel, IonChip, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonIcon, IonBadge, IonModal, IonButtons,
  IonButton, IonList, IonItem, IonSkeletonText, IonFab, IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  searchOutline, documentTextOutline, carOutline, medicalOutline,
  businessOutline, shieldCheckmarkOutline, eyeOutline, downloadOutline,
  lockClosedOutline, fingerPrintOutline
} from 'ionicons/icons';
import { BiometricService } from '../services/biometric.service';
import { BiometricLockComponent } from '../shared/biometric-lock/biometric-lock.component';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.page.html',
  styleUrls: ['./vault.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment,
    IonSegmentButton, IonLabel, IonChip, IonGrid, IonRow, IonCol, IonCard,
    IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonBadge, IonModal,
    IonButtons, IonButton, IonList, IonItem, IonSkeletonText, IonFab, IonFabButton,
    BiometricLockComponent
  ]
})
export class VaultPage {
  private biometricService = inject(BiometricService);

  // Signals for modern Angular
  segment = signal('active');
  isLoading = signal(true);
  isAuthenticated = signal(false);
  showBiometricLock = signal(true);
  selectedDoc = signal<any>(null);
  isModalOpen = signal(false);

  categories = ['Taxes', 'Insurance', 'Identity', 'Medical'];

  documents = signal([
    {
      id: 1,
      name: '2023 Tax Return',
      category: 'Taxes',
      icon: 'business-outline',
      needsAction: true,
      encrypted: true,
      details: { 'Tax Year': '2023', 'Reference': 'TX-9921', 'Size': '2.4 MB' }
    },
    {
      id: 2,
      name: 'Tesla Insurance',
      category: 'Insurance',
      icon: 'car-outline',
      needsAction: false,
      encrypted: true,
      details: { 'Policy #': 'V-992831', 'Due Date': 'Oct 12', 'Size': '1.8 MB' }
    },
    {
      id: 3,
      name: 'Passport Scan',
      category: 'Identity',
      icon: 'document-text-outline',
      needsAction: false,
      encrypted: true,
      details: { 'Expiry': 'Jan 2030', 'Size': '3.2 MB' }
    },
    {
      id: 4,
      name: 'Health Record',
      category: 'Medical',
      icon: 'medical-outline',
      needsAction: true,
      encrypted: true,
      details: { 'Provider': 'BlueShield', 'Size': '5.1 MB' }
    }
  ]);

  constructor() {
    addIcons({
      searchOutline, documentTextOutline, carOutline, medicalOutline,
      businessOutline, shieldCheckmarkOutline, eyeOutline, downloadOutline,
      lockClosedOutline, fingerPrintOutline
    });

    // Simulate loading documents
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }

  segmentChanged(event: any) {
    this.segment.set(event.detail.value);
  }

  onAuthenticationSuccess(success: boolean) {
    if (success) {
      this.isAuthenticated.set(true);
      this.showBiometricLock.set(false);
    }
  }

  openDocument(doc: any) {
    this.selectedDoc.set(doc);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedDoc.set(null);
  }

  downloadDocument(doc: any) {
    console.log('Downloading document:', doc.name);
    // TODO: Implement secure download
  }

  viewDocument(doc: any) {
    console.log('Viewing document:', doc.name);
    // TODO: Open PDF viewer with @defer
  }
}