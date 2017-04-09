import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { MusicService } from "../service/music.service";

import { Observable, Subscription } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/debounceTime"

let DeviceWidth = window.screen.width;

@Component({
  templateUrl: "./audio.page.html"
})
export class ModalPage implements OnInit, OnDestroy {
  currentTime: number = 0;
  timeSubscription: Subscription;

  @ViewChild("playLine") line: ElementRef;
  lineSubscription: Subscription;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public music: MusicService
  ) {
  }

  ngOnInit() {
    this.timeSubscription = Observable.interval(1000).map(e => {
      return this.music.player.currentTime
    }).subscribe((res) => {
      this.currentTime = res;
    });
    // console.log(this.line);

    // this.lineSubscription = Observable.fromEvent(this.line.nativeElement, "touchmove")
    //           .debounceTime(50)
    //           .subscribe(($event: TouchEvent) => {
    //             this.movePlayer($event);
    //           })
  }

  ngOnDestroy() {
    this.timeSubscription.unsubscribe();
  }

  public close() {
    this.viewCtrl.dismiss();
  }

  public playSong() {
    this.music.playSong(this.music.playingSong);
  }

  public preSong() {
    this.music.preSong(this.music.playingSong);
  }

  public nextSong() {
    this.music.nextSong(this.music.playingSong);
  }

  public togglePlayType() {
    this.music.togglePlayType();
  }

  public movePlayer(event: TouchEvent | MouseEvent) {
    // console.log(event);
    if (event instanceof TouchEvent) {
      let touches = event.touches[0];
      let totalWidth = DeviceWidth * 0.8 * 0.94;

      let present = (touches.clientX - ((DeviceWidth - totalWidth) / 2)) / totalWidth;

      this.music.setTime(present * this.music.playingSong.songDetail.duration / 1000);

      console.log(12);

    }
  }
}
