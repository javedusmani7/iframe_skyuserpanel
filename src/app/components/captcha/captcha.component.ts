import { CommonModule } from '@angular/common';
import { Component, ElementRef, Signal, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Fingerprint2 from 'fingerprintjs2';

@Component({
  selector: 'app-captcha',
  imports: [CommonModule,FormsModule],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css'
})
export class CaptchaComponent {
  @ViewChild('captchaCanvas') captchaCanvas!: ElementRef<HTMLCanvasElement>;

  captchaText = '';
  userInput = '';
  resultMessage = '';
  resultClass = '';
  fingerprintHash = '';

  ngAfterViewInit(): void {
    Fingerprint2.get((components) => {
      this.fingerprintHash = Fingerprint2.x64hash128(
        components.map((c) => c.value).join(''),
        31
      );
      this.generateCaptcha();
    });
  }

  generateCaptcha(): void {
    const canvas = this.captchaCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const chars =
      'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    this.captchaText = '';
    for (let i = 0; i < 6; i++) {
      this.captchaText += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    // Clear & draw CAPTCHA
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '28px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(this.captchaText, 10, 35);

    // Add noise
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = '#ccc';
      ctx.stroke();
    }

    this.userInput = '';
    this.resultMessage = '';
    this.resultClass = '';
  }

  validateCaptcha(): void {
    if (
      this.userInput.trim().toLowerCase() ===
      this.captchaText.toLowerCase()
    ) {
      this.resultMessage =
        '✅ CAPTCHA passed. Fingerprint: ' + this.fingerprintHash.slice(0, 8);
      this.resultClass = 'success';
    } else {
      this.resultMessage = '❌ CAPTCHA incorrect!';
      this.resultClass = 'error';
      this.generateCaptcha();
    }
    this.userInput = '';
  }
}
