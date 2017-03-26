import { 
  Component, 
  OnInit,
  trigger,
  state,
  style,
  animate,
  transition,
  Output,
  EventEmitter,
} from "@angular/core";
import { Response } from "@angular/http";

import { PlayService } from "../play.service";

@Component({
  // moduleId: module.id,
  selector: "play-list-search",
  styleUrls: ["./search.component.scss"],
  templateUrl: "./search.component.html",
  animations: [
    trigger("toggleInput", [
      state("show", style({
        "width": "180px",
        "padding": ".1em 1em",
        "opacity": 1,
        "border-radius": "8%/50%",
      })),
      state("hide", style({
        "width": 0,
        "padding": "0 0",
        "opacity": 0,
        "border-radius": "30%/50%",
      })),
      transition("show <=> hide", animate("200ms ease-in")),
    ]),
  ]
})
export class SearchComponent {
  public search: string;
  public hideInput: string = "hide";

  public songs: any[] = [];

  @Output() public clickSend = new EventEmitter<string>();

  constructor(
    private service: PlayService
  ) { }

  public searchSong() {
    this.service.search(this.search)
        .subscribe((songs) => {
          console.log(songs);
          this.songs = songs;
        });
  }

  public onsubmit(form) {
    if (form.valid) {
      this.clickSend.emit(this.search);
    } else {
      this.toggleInput();
    }
  }

  private toggleInput() {
    this.hideInput = this.hideInput === "show" ? "hide" : "show";
  }

  public test() {
    console.log(this.search);
  }
}
