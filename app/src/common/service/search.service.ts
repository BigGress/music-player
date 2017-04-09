import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { headers, baseUrl } from "../config/config";

import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

import { MusicService } from "./music.service";

@Injectable()
export class SearchService {
  searchSongs: any[] = [];

  aaa: string = "haha"

  // 缓存搜索过的内容
  public cacheSearchText: string[] = [];

  constructor(
    private http: Http,
    private music: MusicService
  ) {
    this.getCacheSearch();
  }


  /**
   * 添加搜索缓存,只存储10条内容
   *
   * @private
   * @param {string} text
   *
   * @memberOf SearchService
   */
  private addCacheSearch(text: string) {
    if (!this.cacheSearchText.find(e => e === text)) {
      this.cacheSearchText.unshift(text);
      if (this.cacheSearchText.length > 10) {
        this.cacheSearchText = this.cacheSearchText.splice(0, 9);
      }
      localStorage.setItem("searchText", JSON.stringify(this.cacheSearchText));
    }
  }

  // 获取缓存的内容
  private getCacheSearch() {
    this.cacheSearchText = JSON.parse(localStorage.getItem("searchText")) || [];
  }

  // 删除缓存的搜索结果
  public deleteCacheSearch(text: string) {
    this.cacheSearchText.splice(
      this.cacheSearchText.findIndex(e => e === text),
      1
    );
    localStorage.setItem("searchText", JSON.stringify(this.cacheSearchText));
  }

  /**
   * 搜索音乐
   *
   * @param {string} search
   * @param {number} [type=1]
   * @param {number} [offset=0]
   * @param {boolean} [total=true]
   * @param {number} [limit=9]
   * @returns
   *
   * @memberOf SearchService
   */
  public search(
    search: string,
    type: number = 1,
    offset: number = 0,
    total: boolean = true,
    limit: number = 20
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
    return this.http.post(`${baseUrl}/api/search/get/web?csrf_token=`,
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
      // 添加搜索缓存
      this.addCacheSearch(search);
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

  public addSong(song: any) {
    this.music.addSong(song);
  }
}
