import { HelperService } from './../helper.service';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';

const URL = `${environment.serverUrl}/photos/dailyDarshan`;
@Component({
  selector: 'app-darshan-list',
  templateUrl: './darshan-list.component.html',
  styleUrls: ['./darshan-list.component.scss']
})
export class DarshanListComponent implements OnInit {


  constructor(
    private http: HttpClient,
    private deviceService: DeviceDetectorService,
    private helper: HelperService
    ) {

  }
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'upload',
    allowedMimeType: ['image/png', 'image/jpeg']
    // removeAfterUpload: true
  });
  public hasBaseDropZoneOver = false;

  displayedColumns: string[] = ['name', 'image'];
  dataSource = this.uploader.queue;

  zIndex = -1;
  isMobile: boolean;
  photos: any;

  _id: string;

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    this.photos = [];
    this.helper.getDarshan().subscribe((result: any) => {
      console.log(result);
      this._id = result._id;
      this.photos = result.imageUrls;
      this.dataSource = [ ...this.photos ];

    });
  }
  async delete() {
    this.helper.deleteDarshan(this._id).subscribe((result: any) => {
        console.log({result});

    });
  }



}
