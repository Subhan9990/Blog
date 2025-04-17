import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-loading-spinner',
  template:` <mat-progress-spinner mode="indeterminate" diameter="50"></mat-progress-spinner>`,
  imports: [MatProgressSpinnerModule]
})
export class LoadingSpinnerComponent {}