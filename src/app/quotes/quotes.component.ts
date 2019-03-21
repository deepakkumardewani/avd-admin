import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

const URL = `${environment.serverUrl}/quotes`;

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent {

  value: string;

  constructor() {}

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'upload'
  });

  upload(value) {
    this.uploader.onBuildItemForm = function(fileItem, form) {
      form.append('text', value);
      return { fileItem, form };
    };
    this.uploader.uploadAll();
  }
}
