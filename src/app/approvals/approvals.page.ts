import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonLabel, IonIcon, IonButton, IonBadge, IonSkeletonText, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonChip
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  documentTextOutline, checkmarkCircleOutline, alertCircleOutline,
  timeOutline, eyeOutline, thumbsUpOutline, thumbsDownOutline
} from 'ionicons/icons';

interface ApprovalItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: Date;
  type: 'form' | 'document' | 'payment';
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-approvals',
  templateUrl: 'approvals.page.html',
  styleUrls: ['approvals.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
    IonLabel, IonIcon, IonButton, IonBadge, IonSkeletonText, IonChip
  ],
})
export class ApprovalsPage {
  isLoading = signal(true);

  approvals = signal<ApprovalItem[]>([
    {
      id: '1',
      title: 'Tax Return 2025 - Form 1040',
      description: 'AI completed your tax return. Review and sign.',
      status: 'pending',
      timestamp: new Date(),
      type: 'form',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Insurance Renewal - Progressive',
      description: 'Auto-renewal processed. Confirm payment details.',
      status: 'pending',
      timestamp: new Date(Date.now() - 3600000),
      type: 'payment',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'DMV Registration Renewal',
      description: 'Vehicle registration completed. Ready for signature.',
      status: 'approved',
      timestamp: new Date(Date.now() - 86400000),
      type: 'document',
      priority: 'low'
    }
  ]);

  constructor() {
    addIcons({
      documentTextOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
      timeOutline,
      eyeOutline,
      thumbsUpOutline,
      thumbsDownOutline
    });

    // Simulate loading
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'approved': return 'checkmark-circle-outline';
      case 'rejected': return 'alert-circle-outline';
      default: return 'time-outline';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      default: return 'warning';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      default: return 'medium';
    }
  }

  reviewApproval(approval: ApprovalItem) {
    console.log('Review approval:', approval.id);
    // TODO: Navigate to review page
  }

  approveItem(approval: ApprovalItem) {
    console.log('Approve:', approval.id);
    // TODO: Implement approval logic
  }

  rejectItem(approval: ApprovalItem) {
    console.log('Reject:', approval.id);
    // TODO: Implement rejection logic
  }
}