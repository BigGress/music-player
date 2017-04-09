import { 
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { PlayService } from "../play.service";

@Component({
  selector: "play-item",
  templateUrl: "./playItem.component.html",
  styleUrls: ["./playItem.component.scss"]
})
export class PlayItemComponent {
  @Input() song: any;
  @Input() index: number;
  /**
   * 类型
   * 0是播放列表
   * 1是搜索列表
   */
  @Input() type: number;
  @Input() isPlay: boolean;

  @Output() deleteSong = new EventEmitter<any>();
  @Output() addSong = new EventEmitter<any>();
  @Output() playSong = new EventEmitter<any>();

  constructor(
    private service: PlayService
  ) {}

  public add() {
    this.addSong.emit(this.song);
  }

  public deleteS() {
    this.deleteSong.emit(this.song);
  }

  public play() {
    // this.playSong.emit(this.song);

    this.service.playTheSong(this.song)
    // this.service.playSong.next(this.song);
    
  }
}