import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3050/upload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'upload'});

  constructor() { }

  ngOnInit() {
  }

}
