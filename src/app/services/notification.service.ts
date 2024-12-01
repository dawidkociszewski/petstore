import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  public showNotification(message: string, duration: number = 5000): void {
    this.snackBar.open(message, null, {
      duration
    })
  }
}
