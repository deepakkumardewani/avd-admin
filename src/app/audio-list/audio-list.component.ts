import { Component, OnInit } from '@angular/core';
import { HelperService } from './../helper.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss']
})
export class AudioListComponent implements OnInit {

  audios: any;
  audioPage = 1;
  limit = 1000;
  total = 0;
  page = 1;
  displayedColumns: string[] = ['position', 'title', 'subtitle', 'delete'];
  dataSource = [];
  isMobile: boolean;

  constructor(
    private helper: HelperService,
    private deviceService: DeviceDetectorService
    ) { }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    this.audios = [];
    this.helper.getAllAudio(this.audioPage, this.limit).subscribe((result: any) => {
      this.total = result.total;
      this.audios = result.docs;

      this.audios = this.audios.map((audio) => {
        return {
          ...audio,
          isDeleted: false
        };
      });
      this.dataSource = [ ...this.audios ];
    });
  }


  removeFile(item, index) {
    this.helper.deleteAudio(item._id).subscribe((result: any) => {
      this.audios[index] = {
        ...this.audios[index],
        isDeleted: true
      };

      this.dataSource = [...this.audios ];
    });
  }
}
