import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import {
  catchError
} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  allAudioUrl = `${environment.serverUrl}/lectures/audio`;
  constructor(private http: HttpClient) {}

   getAlbums() {
    return this.http.get(`${environment.serverUrl}/photos/albums`);
   }
   saveAlbum(body) {
     return this.http.post(`${environment.serverUrl}/photos/save/album`, body);
   }

   sendNotification(body) {
     return this.http.post(`${environment.serverUrl}/notification`, body);
   }

   deleteAudio(id) {
     return this.http.delete(`${this.allAudioUrl}?id=${id}`);
   }
   getAllAudio(page, limit) {
    return this.http.get<any[]>(`${this.allAudioUrl}?limit=${limit}&page=${page}`)
    .pipe(
       catchError(this.handleError)
     );
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
