
import { ImagePreviewDirective } from './image-preview.directive';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DarshanComponent } from './darshan/darshan.component';
import { QuotesComponent } from './quotes/quotes.component';
import { AudioComponent } from './audio/audio.component';
import { FileSizePipe } from './file-size.pipe';
import { EventsComponent } from './events/events.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GalleryComponent, GalleryModalComponent } from './gallery/gallery.component';
import { HelperService } from './helper.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DarshanComponent,
    QuotesComponent,
    AudioComponent,
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
    HttpClientModule

  ],
  providers: [ HelperService ],
  entryComponents: [GalleryModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
