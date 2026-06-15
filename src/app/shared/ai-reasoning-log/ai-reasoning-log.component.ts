import { Component, Input, signal, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonList, IonItem, IonIcon, IonButton, IonNote,
  IonBadge, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  radioButtonOffOutline, checkmarkCircleOutline, warningOutline,
  chevronDownOutline, chevronUpOutline, codeOutline
} from 'ionicons/icons';

export interface ReasoningStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  timestamp: Date;
  technicalDetails?: string;
  duration?: number;
}

@Component({
  selector: 'app-ai-reasoning-log',
  templateUrl: 'ai-reasoning-log.component.html',
  styleUrls: ['ai-reasoning-log.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonList, IonItem, IonIcon, IonButton, IonNote,
    IonBadge, IonSpinner
  ],
})
export class AiReasoningLogComponent implements OnInit {
  @Input() steps: ReasoningStep[] = [];
  @Input() isActive = false;

  expandedSteps = signal<Set<string>>(new Set());
  currentTypingText = signal('');
  private typewriterInterval: any;

  constructor() {
    addIcons({
      radioButtonOffOutline,
      checkmarkCircleOutline,
      warningOutline,
      chevronDownOutline,
      chevronUpOutline,
      codeOutline
    });
  }

  ngOnInit() {
    // Start typewriter effect for active step
    effect(() => {
      if (this.isActive) {
        this.startTypewriterEffect();
      } else {
        this.stopTypewriterEffect();
      }
    });
  }

  ngOnDestroy() {
    this.stopTypewriterEffect();
  }

  getStatusIcon(step: ReasoningStep): string {
    switch (step.status) {
      case 'completed': return 'checkmark-circle-outline';
      case 'error': return 'warning-outline';
      case 'active': return 'radio-button-off-outline';
      default: return 'radio-button-off-outline';
    }
  }

  getStatusColor(step: ReasoningStep): string {
    switch (step.status) {
      case 'completed': return 'success';
      case 'error': return 'danger';
      case 'active': return 'primary';
      default: return 'medium';
    }
  }

  getDisplayText(step: ReasoningStep): string {
    if (step.status === 'active' && this.isActive) {
      return this.currentTypingText();
    }
    return step.description;
  }

  toggleExpanded(stepId: string) {
    const current = this.expandedSteps();
    const newSet = new Set(current);
    if (newSet.has(stepId)) {
      newSet.delete(stepId);
    } else {
      newSet.add(stepId);
    }
    this.expandedSteps.set(newSet);
  }

  isExpanded(stepId: string): boolean {
    return this.expandedSteps().has(stepId);
  }

  private startTypewriterEffect() {
    this.stopTypewriterEffect();

    const activeStep = this.steps.find(s => s.status === 'active');
    if (!activeStep) return;

    const fullText = activeStep.description;
    let currentIndex = 0;

    this.typewriterInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        this.currentTypingText.set(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        this.stopTypewriterEffect();
      }
    }, 50); // 50ms per character
  }

  private stopTypewriterEffect() {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
      this.typewriterInterval = null;
    }
  }

  formatDuration(duration?: number): string {
    if (!duration) {
      return '0s';
    }
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return minutes > 0
      ? `${minutes}m ${remainderSeconds}s`
      : `${remainderSeconds}s`;
  }

  trackByStepId(index: number, step: ReasoningStep): string {
    return step.id;
  }
}
