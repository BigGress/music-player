import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { BehaviorSubject } from "rxjs";

import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

const baseURl = "http://music.163.com";
const headers = new Headers();
headers.set("Content-Type", "application/x-www-form-urlencoded")

@Injectable()
export class PlayService {
  // 播放的音乐列表
  public playSongs: any[] = [];
  // 搜索的音乐列表
  public searchSongs: any[] = [];
  // 播放音乐的事件
  public playSong: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  // 正在播放的歌曲
  public playingSong: any;

  constructor(
    private http: Http
  ) {
    this.getSong();
  } 

  public search(
    search: string,
    type: number = 1,
    offset: number = 0,
    total: boolean = true,
    limit: number = 9
  ) {
    // const data = encrypt({
    //   s: search,
    //   type,
    //   offset,
    //   total,
    //   limit
    // })
    // return this.http.post(`http://music.163.com/weapi/cloudsearch/get/web?csrf_token=`, this.serializer(data), {headers})      
    //             .map(e => {
    //               this.searchSongs = e.json().result.songs.map(e => {
    //                 e.artist = e.artists.map(e => e.name).join("、");
    //                 return e;
    //               });
    //               return this.searchSongs;
    //             })
    return this.http.post(`${baseURl}/api/search/get/web?csrf_token=`, 
    this.serializer({
      s: search,
      type,
      offset,
      total,
      limit
    }), {
      headers
    })
    .map(e => {
      this.searchSongs = e.json().result.songs.map(e => {
        e.artist = e.artists.map(e => e.name).join("、");
        return e;
      });
      return this.searchSongs;
    })
  }

  private serializer(obj: {[key: string]: any}) {
    let strArr = [];
    let key;
    for (key in obj) {
        strArr.push(`${key}=${obj[key]}`);
    };
    return strArr.join("&");
  }

  public addSong(obj: any) {
    if (!this.playSongs.find(e => e.id === obj.id)) {
      this.playSongs.push(obj);
      this.cacheSong();
    }
  }

  public deleteSong(obj: any) {
    if (obj && obj.id) {
      this.playSongs.splice(
        this.playSongs.findIndex(e => e.id === obj.id),
        1
      );
      this.cacheSong();
    }
  }

  private cacheSong() {
    localStorage.setItem("song", JSON.stringify(this.playSongs));
  }

  public getSong() {
    this.playSongs = JSON.parse(localStorage.getItem("song")) || [];
    return Promise.resolve(this.playSongs);
  }

  // public playSong(id: number) {
  //   let res = ;
    
  //   return this.getSongUrl(id);
  // }

  public getSongUrl(id: number) {
    // const data = encrypt({
    //   br: 128000,
    //   csrf_token: '',
    //   ids: `[${id}]`,
    // });

    // console.log(data);
     

    return this.http.get(`${baseURl}/api/song/detail?ids=%5B${id}%5d`, {headers})
               .toPromise()
               .then(res => res.json().songs[0])
  }

  /**
   * 先获取音乐，再发射到playSong观察者
   * 
   * @param {*} song 音乐
   * 
   * @memberOf PlayService
   */
  public async playTheSong(song: any) {
    let songUrl = await this.getSongUrl(song.id);
    this.playSong.next(songUrl);
  } 
}
