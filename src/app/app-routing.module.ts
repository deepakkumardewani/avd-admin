import { GalleryComponent } from './gallery/gallery.component';
import { EventsComponent } from './events/events.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DarshanComponent } from './darshan/darshan.component';
import { QuotesComponent } from './quotes/quotes.component';
import { AudioComponent } from './audio/audio.component';
import { AudioListComponent } from './audio-list/audio-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'darshan', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: {title: 'Home'}},
  { path: 'quotes', component: QuotesComponent, data: {title: 'Quotes'}},
  { path: 'audio', component: AudioComponent, data: {title: 'Audio'}},
  { path: 'audio-list', component: AudioListComponent, data: {title: 'AudioList'}},
  { path: 'darshan', component: DarshanComponent, data: {title: 'Darshan'}},
  { path: 'events', component: EventsComponent, data: {title: 'Events'}},
  { path: 'gallery', component: GalleryComponent, data: {title: 'Gallery'}},
  { path: '**', redirectTo: 'darshan' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
