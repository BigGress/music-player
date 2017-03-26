import { 
  Component,
  OnInit,
} from "@angular/core";
import { Http } from "@angular/http";

import {PlayService} from "./play.service";

@Component({
  selector: "play",
  styleUrls: ["./play.component.scss"],
  templateUrl: "./play.component.html",
})
export class PlayComponent implements OnInit {
  songs: any[] = [];
  searchSongs: any[] = [];

  public isSearch: boolean = false;

  constructor(
    private http: Http,
    private service: PlayService
  ) {}

  ngOnInit() {
    this.songs = this.service.playSongs;
  }

  public searchSong(str: any) {    
    this.service.search(<string>str)
        .subscribe((songs) => {
          this.searchSongs = songs;
          this.SearchLists();
        });
  }

  private SearchLists() {
    this.isSearch = true;
  }

  public toggle() {
    this.isSearch = !this.isSearch;

    this.getSong();
  }

  public getSong() {
    this.service.getSong()
        .then(() => {
          this.songs = this.service.playSongs;
        });
  }

  public addSong(song: any) {
    this.service.addSong(song);
    this.getSong();
  }

  public deleteSong(song: any) {
    this.service.deleteSong(song);
    this.getSong();
  }
}
