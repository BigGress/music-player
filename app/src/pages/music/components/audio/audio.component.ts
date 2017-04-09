import {
  Component,
  OnInit,
} from '@angular/core';
import { ModalController } from "ionic-angular";

import { MusicService } from "../../../../common/service";

import { ModalPage } from "../../../../common/modal/audio.page";

@Component({
  selector: "music-audio",
  templateUrl: "./audio.component.html"
})
export class AudioComponent implements OnInit {
  playingSong: any;

  constructor(
    public music: MusicService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.music.changeMusic.subscribe((song) => {
      this.playingSong = song;
    })

    // this.openAudioModal();
  }

  // 控制音乐播放暂停
  public toggleSong($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    this.music.playSong(this.playingSong);
  }

  public nextSong($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    this.music.nextSong(this.playingSong);
  }

  public openAudioModal() {
    console.log("modal");

    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }
}
