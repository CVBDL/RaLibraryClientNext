import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class HttpErrorHandlerService {

  constructor(public snackBar: MatSnackBar) { }

  handle(err: HttpErrorResponse): void {
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

    this.snackBar.open(message, 'Network', {
      extraClasses: ['ral-error']
    });
  }
}
