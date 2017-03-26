import { Routes } from "@angular/router";
import { PlayListComponent } from "./play-list/playList.component";

import { DataResolver } from "./app.resolver";

export const ROUTES: Routes = [
  // { path: "play",  loadChildren: "./play-list#PlayListModule" },
  { path: "**",    redirectTo: "play" },
  // { path: "about", component: AboutComponent },
  // { path: "detail", loadChildren: "./+detail#DetailModule"},
  // { path: "barrel", loadChildren: "./+barrel#BarrelModule"},
  // { path: "**",    component: NoContentComponent },
];
