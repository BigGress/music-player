import { 
  Component,
  OnInit,
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/core";

import { makeRightToLeft } from "../../animation/page/right-to-left";

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
  constructor() { }

  ngOnInit() { }
}