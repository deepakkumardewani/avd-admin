import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient) {}

   getAlbums() {
    return this.http.get(`${environment.serverUrl}/photos/albums`);
   }
   saveAlbum(body) {
     return this.http.post(`${environment.serverUrl}/photos/save/album`, body);
   }
}
