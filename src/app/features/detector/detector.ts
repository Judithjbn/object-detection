import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { PercentPipe } from '@angular/common';
import {
  DetectionPrediction,
  DetectionService,
} from '../../core/services/detection';

@Component({
  selector: 'app-detector',
  imports: [PercentPipe],
  templateUrl: './detector.html',
  styleUrl: './detector.css',
})
export class Detector {
  private detectionService = inject(DetectionService);
  private cdr = inject(ChangeDetectorRef);

  imagePreview: string | null = null;
  predictions: DetectionPrediction[] = [];
  isLoading = false;

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    try {
      this.isLoading = true;
      this.predictions = [];
      this.cdr.detectChanges();

      const imageUrl = await this.readFileAsDataUrl(file);
      this.imagePreview = imageUrl;
      this.cdr.detectChanges();

      this.predictions = await this.detectionService.detectObjects(imageUrl);
      console.log('Predictions en componente:', this.predictions);

      this.isLoading = false;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error detectando objetos:', error);
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  private readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('No se pudo leer la imagen'));

      reader.readAsDataURL(file);
    });
  }
}