import {
  Component,
  OnInit,
} from "@angular/core";
import { PlayService } from "../play.service";

@Component({
  selector: "play-audio",
  templateUrl: "./playAudio.component.html",
  styleUrls: ["./playAudio.component.scss"]
})
export class PlayAudioComponent implements OnInit {
  // 播放对象
  player: HTMLAudioElement;
  // 是否单曲循环
  loop: boolean = true;
  // 总时间
  totalTime: number = 0;

  constructor(
    private service: PlayService
  ) {
  }

  ngOnInit() {
    this.service.playSong.subscribe({
      next: (e) => {
        if (e) {
          this.playSong(e);
        }
      }
    });


  }

  /**
   * 下一首歌
   * 
   * 
   * @memberOf PlayAudioComponent
   */
  public nextSong() {
    let index = this.service.playSongs.findIndex(e => e.id === this.service.playingSong.id);
    let song = this.service.playSongs[index + 1];
    // 如果这首歌不存在就播放第一首歌
    this.service.playTheSong(song || this.service.playSongs[0]);
  }

  /**
   * 上一首歌
   * 
   * 
   * @memberOf PlayAudioComponent
   */
  public preSong() {
    let index = this.service.playSongs.findIndex(e => e.id === this.service.playingSong.id);
    let song = this.service.playSongs[index - 1];
    // 如果上一首歌没有就播放最后一首歌
    this.service.playTheSong(song || this.service.playSongs[this.service.playSongs.length - 1]);
  }

  // 切换播放模式
  public changeLoop() {
    this.loop = !this.loop;
  }

  // 播放歌曲
  public playSong(song: any) {
    if (this.player) {
      // 如果播放的歌曲处于暂停状态，并且没有新歌
      if (!song && this.player.paused) {
        this.player.play();
      } else {
        this.pauseSong();
      }
    }

    // 如果有新歌传入，就播放它， 并替换原音乐
    if (song) {
      this.pauseSong();
      this.player = new Audio();
      this.player.src = song.mp3Url;
      this.player.loop = this.loop;
      this.player.play();
      this.totalTime = song.duration;

      // 播放结束事件
      this.player.addEventListener("ended", () => {
        // this.playEnd();
        console.log(123)
      });

      window["chrome"].runtime.sendMessage(
        this.player,
        function (response) {
            console.log("!23");
        });

      this.service.playingSong = song;
      this.service.playingSong.status = 1;
    }
  }

  /**
   * 暂停音乐
   * 
   * 
   * @memberOf PlayAudioComponent
   */
  public pauseSong() {
    if (this.service.playingSong) {
      this.service.playingSong.status = 0;
    }
    if (this.player) {
      this.player.pause();
    }
  }

  /**
   * 播放结束时的事件
   */
  // private playEnd() {
  //   console.log("结束")
  //   if (!this.loop) {
  //     this.nextSong();
  //   }
  // }

  /**
   * 修改播放时间
   */
  public changeTime(event: MouseEvent) {

  }
}