import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = `${environment.serverUrl}/photos/dailyDarshan`;

@Component({
  selector: 'app-darshan',
  templateUrl: './darshan.component.html',
  styleUrls: ['./darshan.component.scss']
})
export class DarshanComponent implements OnInit {

  constructor(private http: HttpClient) {

  }
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'upload',
    allowedMimeType: ['image/png', 'image/jpeg']
    // removeAfterUpload: true
  });
  public hasBaseDropZoneOver = false;

  displayedColumns: string[] = ['image', 'name', 'size', 'status', 'delete'];
  dataSource = this.uploader.queue;

  zIndex = -1;

  public fileOverBase(e: any): void {
    if (e) {
      this.zIndex = 10;
    }
    this.zIndex = -1;
    this.hasBaseDropZoneOver = e;
  }

  public onFileDrop(e: any): void {
    this.uploader.queue.map(file => {
      if (file.isSuccess) {
        this.uploader.removeFromQueue(file);
      }
    });

    this.dataSource = [...this.uploader.queue];
  }

  removeFile(item) {
    this.uploader.removeFromQueue(item);
    this.dataSource = [...this.uploader.queue];
  }

  async upload() {
    // await this.deleteImages();
    this.uploader.uploadAll();
  }

  deleteImages() {
    return this.http.delete('http://localhost:3050/photos/dailyDarshan');
  }

  ngOnInit() {}
}
