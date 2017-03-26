import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/core";

export function makeRightToLeft() {
  return trigger("RightToLeft", [
      state("void", style({position:"absolute", width:"100%"}) ),
      state("*", style({position:"absolute", width:"100%"}) ),
      transition(":enter", [
        style({transform: "translateX(100%)"}),
        animate("0.5s ease-in-out", style({transform: "translateX(0%)"}))
      ]),
      transition(":leave", [
        style({transform: "translateX(0%)"}),
        animate("0.5s ease-in-out", style({transform: "translateX(-100%)"}))
      ])
    ])
}
