import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import "rxjs/add/operator/map"

const baseURl = "http://music.163.com";
const headers = new Headers();
headers.set("Content-Type", "application/x-www-form-urlencoded")

@Injectable()
export class PlayService {
  public playSongs: any[] = [];
  
  public searchSongs: any[] = [];

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
      this.searchSongs = e.json().result.songs;
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
    this.playSongs.push(obj);
    this.cacheSong();
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
    this.playSongs = JSON.parse(localStorage.getItem("song"));
    return Promise.resolve(this.playSongs);
  }
}
