import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { SearchListComponent } from "./components/searchList/list.component";
import { MusicItemComponent } from "./components/musicItem/musicItem.component";
import { AudioComponent } from "./components/audio/audio.component";

@NgModule({
  exports: [
    SearchListComponent,
    MusicItemComponent,
    AudioComponent,
  ],
  imports: [
    IonicModule
  ],
  declarations: [
    SearchListComponent,
    MusicItemComponent,
    AudioComponent,
  ],
})
export class MusicModule { }
