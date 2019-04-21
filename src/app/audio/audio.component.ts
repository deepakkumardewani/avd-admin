import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

import { FileUploader, FileItem } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

const URL = `${environment.serverUrl}/lectures/audio/daily`;

@Component({
  selector: 'warning-snack-bar',
  templateUrl: 'warning-snack-bar.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class WarningSnackBarComponent {}

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'upload',
    maxFileSize: 15 * 1024 * 1024 // 15 MB
  });
  public hasBaseDropZoneOver = false;

  displayedColumns: string[] = ['file', 'name', 'size', 'status', 'delete'];
  dataSource = this.uploader.queue;

  zIndex = -1;
  audioTitle: string;
  durationInSeconds = 5;

  constructor(private snackBar: MatSnackBar) {
    this.uploader.onBeforeUploadItem = (item: any) => {
      this.audioTitle = item.file.name.substr(0, item.file.name.indexOf(' '));
      this.uploader.options.headers = [
        { name: 'audiotitle', value: this.audioTitle }
      ];
    };
  }

  public fileOverBase(e: any): void {
    if (e) {
      this.zIndex = 10;
    }
    this.zIndex = -1;
    this.hasBaseDropZoneOver = e;
  }

  public onFileDrop(e: any): void {
    const size = e[0].size / 1024 / 1024;
    if (size > 15) {
      this.openSnackBar();
    }
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

  openSnackBar() {
    this.snackBar.openFromComponent(WarningSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
