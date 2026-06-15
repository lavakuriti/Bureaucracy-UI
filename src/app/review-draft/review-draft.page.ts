import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonIcon, IonCard,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonBadge,
  IonButton, IonFooter
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  documentAttachOutline, documentTextOutline, checkmark, checkmarkCircle, 
  shieldCheckmark, informationCircle, createOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-review-draft',
  templateUrl: './review-draft.page.html',
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
    IonBackButton, IonAccordion, IonAccordionGroup, IonItem, IonLabel, 
    IonIcon, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, 
    IonCardContent, IonBadge, IonButton, IonFooter
  ]
})
export class ReviewDraftPage {
  constructor() {
    addIcons({ 
      documentAttachOutline, documentTextOutline, checkmark, checkmarkCircle, 
      shieldCheckmark, informationCircle, createOutline 
    });
  }
}