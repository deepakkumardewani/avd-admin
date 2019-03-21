import { HelperService } from './../helper.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

const URL = `${environment.serverUrl}/photos/album`;

@Component({
  selector: 'gallery-modal',
  templateUrl: 'gallery-modal.html',
  styles: ['mat-card { width: 100%; height: 200px; }']
})
export class GalleryModalComponent implements OnInit {
  videoUrls = '';
  albumTitle = '';
  uploadCount = 0;
  queueLength = 0;
  imageUrls = [];
  uploadComplete = false;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    method: 'post',
    itemAlias: 'upload',
    parametersBeforeFiles: true
  });
  public hasBaseDropZoneOver = false;

  displayedColumns: string[] = ['file', 'name', 'status', 'delete'];
  dataSource = this.uploader.queue;
  constructor(
    public dialogRef: MatDialogRef<GalleryModalComponent>,
    private helper: HelperService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.uploader.response.subscribe(res => {
      this.save(res);
    });

    if (this.data) {
      this.albumTitle = this.data.title;
    }
  }

  public onFileDrop(e: any): void {
    // this.uploader.queue.forEach(file => {
    //   if (file.isSuccess && file.isUploaded) {
    //     this.uploader.removeFromQueue(file);
    //   }
    // });
    this.dataSource = [...this.uploader.queue];
    this.uploadCount = 0;
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  removeFile(item) {
    this.uploader.removeFromQueue(item);
    this.dataSource = [...this.uploader.queue];
  }

  upload(videoUrls, albumTitle) {
    // this.uploader.onBuildItemForm = function(fileItem, form) {
    //   form.append('videoUrls', videoUrls);
    //   form.append('albumTitle', albumTitle);
    //   return { fileItem, form };
    // };
    // this.uploader.onCompleteAll = function() {
    //   console.log('upload all');

    // }
    this.queueLength = this.uploader.queue.length;
    this.uploader.options.headers = [
      { name: 'albumtitle', value: this.albumTitle }
    ];
    this.uploader.uploadAll();
  }

  isUploadDisabled() {
    return (
      this.videoUrls.length === 0 ||
      this.albumTitle.length === 0 ||
      this.uploader.queue.length === 0
    );
  }

  save(res) {
    const response = JSON.parse(res);

    this.uploadCount++;
    this.imageUrls.push(response.location);
    if (this.uploadCount === this.queueLength) {
      const body = {
        albumTitle: this.albumTitle,
        imageUrls: this.imageUrls,
        videoUrls: this.videoUrls.split(',')
      };
      this.helper.saveAlbum(body).subscribe(() => {
        this.uploadComplete = true;
        setTimeout(() => {
          this.dialogRef.close();
        }, 1500);
      });
    }
  }
}

/*
  GALLERY COMPONENT
*/

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  albums: any;
  displayedColumns: string[] = ['thumbnail', 'name', 'image', 'video', 'edit'];
  dataSource: any;

  constructor(public dialog: MatDialog, private helper: HelperService) {}

  async ngOnInit() {
    const self = this;
    this.helper.getAlbums().subscribe(albums => {
      self.albums = albums;
      self.dataSource = albums;
    });
  }

  createAlbum() {
    const dialogRef = this.dialog.open(GalleryModalComponent, {
      width: '800px',
      height: '500px',
      hasBackdrop: true,
      panelClass: 'audio-dialog'
    });


    dialogRef.afterClosed().subscribe(() => {
      const self = this;
      this.helper.getAlbums().subscribe(albums => {
        self.albums = albums;
        self.dataSource = albums;
      });
    });
  }

  editAlbum(album) {
    const dialogRef = this.dialog.open(GalleryModalComponent, {
      width: '800px',
      height: '500px',
      hasBackdrop: true,
      panelClass: 'audio-dialog',
      data: album
    });

    dialogRef.afterClosed().subscribe(() => {
      const self = this;
      this.helper.getAlbums().subscribe(albums => {
        self.albums = albums;
        self.dataSource = albums;
      });
    });
  }
}
