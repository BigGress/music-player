import { Component, OnInit } from '@angular/core';
import { SearchService, MusicService } from "../../common/service";
import { Subject } from "rxjs";

@Component({
  selector: "page-music",
  templateUrl: "./music.component.html"
})
export class MusicComponent implements OnInit {
  test: any = "test";
  // 搜索的字段
  searchText: string;
  // 判断是否处于搜索状态
  isSearching: boolean = false;
  // isSearching: boolean = true;
  // 搜索Subject
  searchSubject: Subject<string> = new Subject();

  // 搜索到的音乐
  searchSongs: any[] = [];
  // 搜索过的音乐缓存
  cacheSearchText: string[] = [];

  // 正在播放的音乐
  playingSong: any;

  constructor(
    public search: SearchService,
    public music: MusicService
  ) {
    this.getLocalSearchText();
  }

  ngOnInit() {
    this.searchSubject.debounceTime(200).subscribe(() => {
      this.searchSong();
    });

    this.music.changeMusic.subscribe((song) => {
      this.playingSong = song;
    })
  }

  public searchSong(search?: string) {
    this.search.search(search || this.searchText, 1, this.searchSongs.length ? this.searchSongs.length - 1 : 0)
        .subscribe((res) => {

          this.searchSongs = res;

          this.getLocalSearchText();
        })
  }

  /**
   * 点击了搜索文字
   *
   *
   * @memberOf MusicComponent
   */
  public clickCacheSearchText(text: string) {
    this.searchText = text;
    this.searchSong(text);
  }

  public deleteSearchText(text: string) {
    console.log(text);
    this.search.deleteCacheSearch(text);
    this.getLocalSearchText();
  }

  // 从服务里面获取搜索信息
  private getLocalSearchText() {
    this.cacheSearchText = this.search.cacheSearchText;
  }

  // 搜索音乐事件
  public searchMusic() {
    if (this.searchText.length) {
      this.searchSubject.next(this.searchText);
    }
  }

  public toggleSearchBar() {
    this.isSearching = !this.isSearching;
    if (!this.isSearching) {
      this.searchSongs = [];
      this.searchText = "";
    }
  }

  public testa($event) {
    console.log($event);

  }

  // 播放音乐
  public playSong(song: any) {
    this.music.playSong(song);
  }

  // 添加到播放列表
  public addSong(song: any) {
    this.music.addSong(song);
  }
}
