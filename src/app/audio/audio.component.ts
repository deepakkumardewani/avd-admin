import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

const URL = `${environment.serverUrl}/lectures/audio/daily`;

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'upload',
  });
  public hasBaseDropZoneOver = false;

  displayedColumns: string[] = ['file', 'name', 'size', 'status', 'delete'];
  dataSource = this.uploader.queue;

  zIndex = -1;

  public fileOverBase(e: any): void {
    // if (this.uploader.queue.length === 1) {

    // }
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

  upload() {
    this.uploader.uploadAll();
  }

}
