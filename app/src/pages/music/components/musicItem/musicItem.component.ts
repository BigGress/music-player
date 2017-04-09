import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  EventEmitter,
} from '@angular/core';

import { ActionSheetController } from "ionic-angular";
import { MusicService } from "../../../../common/service";

let DeviceWidth = window.screen.availWidth;

@Component({
  selector: "music-item",
  templateUrl: "./musicItem.component.html"
})
export class MusicItemComponent implements OnInit {
  /**
   * 判断类型
   * 0 是播放音乐item，
   * 1 是搜索音乐item
   *
   * @type {string}
   * @memberOf MusicItemComponent
   */
  type: number;

  @Input() song: any;
  @Input() playing: boolean;

  // 播放音乐外放事件
  @Output() play: EventEmitter<any> = new EventEmitter();
  @Output() add: EventEmitter<any> = new EventEmitter();

  constructor(
    private element: ElementRef,
    private actionSheetCtrl: ActionSheetController,
    public music: MusicService
  ) {
    console.log(this.music.playingSong);

  }

  ngOnInit() {
    let type = this.element.nativeElement.getAttribute("type");
    this.type = type === "search" ? 1 : 0;
  }

  clickItem($event: MouseEvent) {
    if ($event.clientX / DeviceWidth > 0.9) {
      this.songActions();
    } else {
      this.playSong();
    }

  }

  songActions() {
    let actionSheet;
    if (this.type === 1) {
      actionSheet = this.actionSheetCtrl.create({
        title: `歌曲: ${this.song.name}`,
        buttons: [
          {
            text: "播放",
            handler: () => {
              this.playSong();
            }
          },{
            text: "添加到播放列表",
            handler: () => {
              this.addSong();
            }
          }
        ]
      });
    } else {

      let buttons = [
          {
            // 先判断是不是正在播放的歌曲，并且判断播放器的暂停状态
            text: `${this.music.playingSong.id === this.song.id && !this.music.player.paused ? "暂停" : "播放"}`,
            handler: () => {
              this.music.playSong(this.song);
            }
          },
          {
            text: "从播放列表删除",
            handler: () => {
              this.music.deleteSong(this.song);
            }
          }
        ]
      actionSheet = this.actionSheetCtrl.create({
        title: `歌曲: ${this.song.name}`,
        buttons
      })
    }
    actionSheet.present();
  }

  // 播放音乐
  playSong() {
    this.play.emit(this.song);
  }

  // 添加播放列表
  addSong() {
    this.add.emit(this.song);
  }
}
