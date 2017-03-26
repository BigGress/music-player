import { 
  Component,
  OnInit,
  trigger,
  state,
  style,
  animate,
  transition,
  Input,
} from "@angular/core";

import { makeRightToLeft } from "../../animation/page/right-to-left";

@Component({
  selector: "play-search-list",
  templateUrl: "./playSearchList.component.html",
  // animations: [
  //   makeRightToLeft(),
  // ],
  // host: {
  //   "[@RightToLeft]": ""
  // },
})
export class PlaySearchListComponent implements OnInit {
  @Input() songs: any[]

  constructor() { }

  ngOnInit() {}
}