import { Injectable } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

export type DetectionPrediction = {
  class: string;
  score: number;
};

@Injectable({
  providedIn: 'root',
})
export class DetectionService {
  private model: cocoSsd.ObjectDetection | null = null;

  async loadModel(): Promise<void> {
    if (!this.model) {
      console.log('Cargando detector 🚀...');
      this.model = await cocoSsd.load();
      console.log('Modelo cargado 🤘🏼');
    }
  }

  async detectObjects(imageUrl: string): Promise<DetectionPrediction[]> {
    await this.loadModel();

    const img = await this.createImageElement(imageUrl);

    const predictions = await this.model!.detect(img);

    return predictions.map(p => ({
      class: p.class,
      score: p.score,
    }));
  }

  private createImageElement(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.src = src;
      img.crossOrigin = 'anonymous';

      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }
}