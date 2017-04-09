import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from "@angular/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { MusicModule } from "../pages/music/music.module";
import { MusicComponent } from "../pages/music/music.component";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MusicService } from "../common/service/music.service";
import { SearchService } from "../common/service/search.service";

import { ModalPage } from "../common/modal/audio.page";

import { DatePipe } from "../common/pipe/date.pipe";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    MusicComponent,
    ModalPage,
    DatePipe,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    MusicModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    MusicComponent,
    ModalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MusicService,
    SearchService,
  ]
})
export class AppModule {}
