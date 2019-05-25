import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'ng2-file-upload';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { HelperService } from './helper.service';

import { ImagePreviewDirective } from './image-preview.directive';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DarshanComponent } from './darshan/darshan.component';
import { QuotesComponent } from './quotes/quotes.component';
import { AudioComponent, WarningSnackBarComponent } from './audio/audio.component';
import { FileSizePipe } from './file-size.pipe';
import { EventsComponent } from './events/events.component';
import { GalleryComponent, GalleryModalComponent } from './gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DarshanComponent,
    QuotesComponent,
    AudioComponent,
    WarningSnackBarComponent,
    EventsComponent,
    ImagePreviewDirective,
    FileSizePipe,
    GalleryComponent,
    GalleryModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [ HelperService ],
  entryComponents: [GalleryModalComponent, WarningSnackBarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
