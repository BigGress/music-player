import { Component } from "@angular/core";
import { Http } from "@angular/http";

@Component({
  selector: "play",
  templateUrl: "./playList.component.html"
})
export class PlayListComponent {
  constructor(
    private http: Http
  ) {
    console.log("test");
  }
}
