import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType, HttpInterceptor,
  HttpHandler,HttpRequest, HttpResponse,  HttpErrorResponse  } from '@angular/common/http';
import { map,catchError, retry } from 'rxjs/operators';

// const API_PERMISSION_URL = 'api/permissions';
const API_FILE_UPLOAD_URL = 'http://localhost:3000/api/upload';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  //private apiUrl = `${environment.apiUrl}/fileupload.route`;
  //private handleError: HandleError;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  redirectUrl: string;

  constructor(
    private http: HttpClient  ) {
  }

  fileUpload(formData: any) {
    ;
    return this.http.post(API_FILE_UPLOAD_URL, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event)),
      //catchError(this.handleError('fileUpload', null))
    );
  }

  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
      case HttpEventType.Response:
        return event.body;
      default:
        return `Upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event: any) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { progress: percentDone, files: [] };
  }

}