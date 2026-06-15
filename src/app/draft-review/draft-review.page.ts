import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem,
  IonLabel, IonInput, IonButton, IonIcon, IonButtons, IonBadge, IonNote, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  documentTextOutline, checkmarkCircleOutline, createOutline,
  eyeOutline, sendOutline, arrowBackOutline
} from 'ionicons/icons';
import { AiReasoningLogComponent, ReasoningStep } from '../shared/ai-reasoning-log/ai-reasoning-log.component';

export interface FormField {
  id: string;
  label: string;
  aiValue: string;
  userValue: string;
  isEditing: boolean;
  isCorrected: boolean;
  confidence: number;
}

@Component({
  selector: 'app-draft-review',
  templateUrl: 'draft-review.page.html',
  styleUrls: ['draft-review.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem,
    IonLabel, IonInput, IonButton, IonButtons, IonIcon, IonBadge, IonNote, IonSpinner,
    AiReasoningLogComponent
  ],
})
export class DraftReviewPage implements OnInit {
  // PDF Preview (simulated)
  pdfUrl = signal('/assets/sample-form.pdf');
  isPdfLoading = signal(true);
  isSubmitting = signal(false);
  submissionSuccess = signal(false);

  // Form Fields
  formFields = signal<FormField[]>([
    {
      id: 'fullName',
      label: 'Full Legal Name',
      aiValue: 'Alexandra Johnson',
      userValue: 'Alexandra Johnson',
      isEditing: false,
      isCorrected: false,
      confidence: 0.95
    },
    {
      id: 'address',
      label: 'Primary Address',
      aiValue: '1225 Oak Street, San Francisco, CA 94102',
      userValue: '1225 Oak Street, San Francisco, CA 94102',
      isEditing: false,
      isCorrected: false,
      confidence: 0.88
    },
    {
      id: 'ssn',
      label: 'Social Security Number',
      aiValue: '***-**-6789',
      userValue: '***-**-6789',
      isEditing: false,
      isCorrected: false,
      confidence: 0.99
    },
    {
      id: 'dob',
      label: 'Date of Birth',
      aiValue: '1988-05-15',
      userValue: '1988-05-15',
      isEditing: false,
      isCorrected: false,
      confidence: 0.92
    }
  ]);

  // AI Reasoning Steps
  reasoningSteps = signal<ReasoningStep[]>([
    {
      id: '1',
      title: 'Document Analysis',
      description: 'Analyzing PDF structure and form fields...',
      status: 'completed',
      timestamp: new Date(Date.now() - 30000),
      technicalDetails: 'OCR confidence: 98.5%\nForm type: IRS-1040\nFields detected: 12',
      duration: 8500
    },
    {
      id: '2',
      title: 'Data Extraction',
      description: 'Extracting personal information from identity profile...',
      status: 'completed',
      timestamp: new Date(Date.now() - 20000),
      technicalDetails: 'Profile match: 95%\nSSN masked for security\nAddress geocoded successfully',
      duration: 5200
    },
    {
      id: '3',
      title: 'Form Population',
      description: 'Filling form fields with extracted data...',
      status: 'completed',
      timestamp: new Date(Date.now() - 10000),
      technicalDetails: 'Fields populated: 8/12\nValidation passed: 100%\nReady for review',
      duration: 3200
    },
    {
      id: '4',
      title: 'Final Validation',
      description: 'Performing final checks before submission...',
      status: 'active',
      timestamp: new Date(),
      technicalDetails: 'Checksum validation: ✓\nFormat compliance: ✓\nSecurity scan: In progress...'
    }
  ]);

  isAgentWorking = signal(true);

  constructor(private router: Router, private toastController: ToastController) {
    addIcons({
      documentTextOutline,
      checkmarkCircleOutline,
      createOutline,
      eyeOutline,
      sendOutline,
      arrowBackOutline
    });
  }

  ngOnInit() {
    // Simulate PDF loading
    setTimeout(() => {
      this.isPdfLoading.set(false);
    }, 2000);

    // Simulate agent completion
    setTimeout(() => {
      this.isAgentWorking.set(false);
      this.reasoningSteps.update(steps => {
        const updated = [...steps];
        updated[3].status = 'completed';
        updated[3].duration = 4500;
        return updated;
      });
    }, 8000);
  }

  toggleFieldEdit(field: FormField) {
    field.isEditing = !field.isEditing;
    if (!field.isEditing) {
      // Check if value changed
      field.isCorrected = field.userValue !== field.aiValue;
    }
  }

  saveFieldEdit(field: FormField) {
    field.isEditing = false;
    field.isCorrected = field.userValue !== field.aiValue;
  }

  getConfidenceColor(confidence: number): string {
    if (confidence >= 0.9) return 'success';
    if (confidence >= 0.7) return 'warning';
    return 'danger';
  }

  getConfidenceText(confidence: number): string {
    if (confidence >= 0.9) return 'High';
    if (confidence >= 0.7) return 'Medium';
    return 'Low';
  }

  submitForm() {
    this.isSubmitting.set(true);
    
    // Validate all required fields
    const fields = this.formFields();
    const hasEmptyFields = fields.some(f => !f.userValue || f.userValue.trim().length === 0);
    
    if (hasEmptyFields) {
      this.showErrorToast('Please fill in all required fields');
      this.isSubmitting.set(false);
      return;
    }

    // Collect form data
    const formData = {
      documentId: 'IRS-1040-2024',
      timestamp: new Date(),
      fields: fields.map(f => ({
        id: f.id,
        label: f.label,
        originalValue: f.aiValue,
        submittedValue: f.userValue,
        wasCorrected: f.isCorrected,
        confidence: f.confidence
      })),
      metadata: {
        totalFields: fields.length,
        correctedFields: fields.filter(f => f.isCorrected).length,
        submissionType: 'tax-return',
        source: 'ai-agent-review'
      }
    };

    // Simulate API submission
    setTimeout(async () => {
      try {
        // In a real app, this would call an API endpoint
        console.log('Submitting form data:', formData);
        
        this.submissionSuccess.set(true);
        await this.showSuccessToast('Form submitted successfully!');
        
        // Navigate back to approvals after success
        setTimeout(() => {
          this.router.navigate(['/approvals']);
        }, 1500);
      } catch (error) {
        console.error('Form submission error:', error);
        await this.showErrorToast('Failed to submit form. Please try again.');
      } finally {
        this.isSubmitting.set(false);
      }
    }, 2000);
  }

  private async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle-outline'
    });
    await toast.present();
  }

  private async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'danger',
      icon: 'alert-circle-outline'
    });
    await toast.present();
  }

  previewPdf() {
    // In a real app, this would open the PDF in a modal or new window
    console.log('Opening PDF preview:', this.pdfUrl());
    // For now, just show a toast
    this.showInfoToast('PDF preview - Full viewer coming soon');
  }

  private async showInfoToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'primary',
      icon: 'information-circle-outline'
    });
    await toast.present();
  }

  trackByFieldId(index: number, field: FormField): string {
    return field.id;
  }
}