import { Injectable, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { headers, baseUrl } from "../config/config";

import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

@Injectable()
export class MusicService {

  // 播放的音乐列表
  public playSongs: any[] = [];

  // 正在播放的音乐歌曲
  public playingSong: any;

  /**
   * 循环模式
   *
   * 0 单曲循环
   * 1 列表循环
   * 2 随机播放
   *
   * @type {number}
   * @memberOf MusicService
   */
  public cycle: number = localStorage.getItem("cycle") ? JSON.parse(localStorage.getItem("cycle")) : 0;
  // private isLoop: boolean = localStorage.getItem("isLoop") === "true" ? JSON.parse(localStorage.getItem("isLoop")) : false;

  // 播放dom
  public player: HTMLAudioElement = new Audio();

  public changeMusic: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: Http
  ) {
    this.getSongs();

    this.getPlayingSong();
  }


  /**
   * 添加音乐
   *
   *
   * @memberOf MusicService
   */
  public addSong(song: any) {
    if (!this.playSongs.find(e => e.id == song.id)) {
      this.playSongs.push(song);
      this.cacheSongs();
    }
  }

  /**
   * 删除音乐
   *
   * @param {*} song
   * @returns
   *
   * @memberOf MusicService
   */
  public deleteSong(song: any) {
    const index = this.playSongs.findIndex(e => e.id == song.id);
    const theSong = this.playSongs.splice(index, 1);
    this.cacheSongs();
    return theSong;
  }


  /**
   * 上一首
   *
   * @param {*} song
   * @returns
   *
   * @memberOf MusicService
   */
  public preSong(song: any) {
    let index = this.playSongs.findIndex(e => e.id == song.id);

    let playSong = this.playSongs[index > 0 ? --index : this.playSongs.length - 1];

    this.playSong(playSong);

    return playSong;
  }

  /**
   * 下一首
   *
   * @param {*} song
   * @returns
   *
   * @memberOf MusicService
   */
  public nextSong(song: any) {
    let index = this.playSongs.findIndex(e => e.id == song.id);

    let playSong = this.playSongs[index < this.playSongs.length - 1 ? ++index : 0];

    this.playSong(playSong);

    return playSong;
  }

  /**
   * 缓存音乐
   *
   *
   * @memberOf MusicService
   */
  private cacheSongs() {
    localStorage.setItem("songs", JSON.stringify(this.playSongs));
  }

  /**
   * 从缓存中获取音乐
   *
   * @private
   *
   * @memberOf MusicService
   */
  private getSongs() {
    const songs = JSON.parse(localStorage.getItem("songs"));
    this.playSongs = songs || [];
    return this.playSongs;
  }

  /**
   * 获取音乐详情
   *
   * @param {number} id
   * @returns
   *
   * @memberOf MusicService
   */
  public getSongUrl(id: number) {
    return this.http.get(`${baseUrl}/api/song/detail?ids=%5B${id}%5d`, {headers})
               .map(res => res.json())
               .map(songs => songs.songs[0])
               .toPromise();
  }


  /**
   * 播放音乐，在播放之前先获取音乐的地址
   *
   * @param {*} song
   *
   * @memberOf MusicService
   */
  public async playSong(song: any, play: boolean = true) {
    if (song) {
      if (!this.playingSong || song.id !== this.playingSong.id) {
        let songDetail = await this.getSongUrl(song.id);
        this.addSong(song);

        this.player.src = songDetail.mp3Url;
        this.player.loop = this.cycle === 0;

        this.playingSong = song;
        this.playingSong.songDetail = songDetail;

        this.listenerPlayType();

        if (play) {
          this.player.play();
          this.savePlayingSong(this.playingSong);
        }

        this.changeMusic.emit(this.playingSong);
      } else {
        // 如果暂停的状态时true就播放
        if (this.player.paused) {
          this.player.play();
        } else {
          this.player.pause();
        }
      }
    }
  }

  /**
   * 获取上次退出时播放的音乐
   */
  private getPlayingSong() {
    if (!this.playingSong) {
      const playingSong = JSON.parse(localStorage.getItem("playingSong"));
      if (playingSong) {
        this.playSong(playingSong, false);
      }
    }
  }

  /**
   * 保存播放的歌曲
   *
   * @private
   * @param {*} song
   *
   * @memberOf MusicService
   */
  private savePlayingSong(song: any) {
    if (song) {
      localStorage.setItem("playingSong", JSON.stringify(song));
    }
  }

  /**
   * 切换单曲循环
   *
   *
   * @memberOf MusicService
   */
  public togglePlayType() {
    this.cycle = this.cycle > 2 ? 0 : this.cycle + 1;
    this.player.loop = this.cycle === 0;
    localStorage.setItem("cycle", JSON.stringify(this.cycle));
  }

  /**
   * 播放列表
   *
   *
   * @memberOf MusicService
   */
  private listenerPlayType() {
    this.player.addEventListener("ended", () => {

      // 列表播放
      if (this.cycle === 1) {

        this.nextSong(this.playingSong);
      }

      // 随机播放
    })
    if (this.cycle === 2) {
      let index = Math.round(Math.random() * (this.playSongs.length - 1));
      this.playSong(this.playSong[index]);
    }
  }

  /**
   * 设置播放时间
   *
   *
   * @memberOf MusicService
   */
  setTime(time: number) {
    this.player.currentTime = time;
  }
}
