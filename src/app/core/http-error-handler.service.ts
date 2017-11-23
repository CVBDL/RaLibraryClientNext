import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class HttpErrorHandlerService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Handle HTTP response errors.
   * @param err
   */
  handle(err: HttpErrorResponse): void {
    let message = this.determineMessage(err);

    this.showMessage(message);
  }

  /**
   * Determine message to display.
   * @param err 
   */
  private determineMessage(err: HttpErrorResponse): string {
    let message: string = '';

    if (err.error instanceof Error) {
      message = 'Application Error.';

    } else {
      switch (err.status) {
        case 500:
          message = 'Server Internal Error.';
          break;
        case 404:
          message = 'Not Found.';
          break;
        case 401:
          message = 'Unauthorized';
          break;
        case 400:
          message = 'Bad Request';
          break;
        default:
          message = 'Unknown Error.';
          break;
      }
    }

    return message;
  }

  /**
   * Show the error message.
   * @param message Error message.
   */
  private showMessage(message: string): void {
    this.snackBar.open(message, 'Network', {
      extraClasses: ['ral-error']
    });
  }
}
