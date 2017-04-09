import { 
  Component,
  OnInit,
  trigger,
  state,
  style,
  animate,
  transition,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

import { makeRightToLeft } from "../../animation/page/right-to-left";

import { PlayService } from "../play.service";

@Component({
  // moduleId: module.id,
  selector: "play-list",
  templateUrl: "./playList.component.html",
  // animations: [
  //   makeRightToLeft(),
  // ],
  // host: {
  //   "[@RightToLeft]": ""
  // },
})
export class PlayListComponent implements OnInit {
  @Input() songs: any[];

  constructor(
    private service: PlayService
  ) { }

  ngOnInit() {
    
  }
}