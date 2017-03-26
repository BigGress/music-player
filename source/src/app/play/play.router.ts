import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { PlayComponent } from "./play.component";

import { PlayListComponent } from "./play-list/playList.component";
import { PlaySearchListComponent } from "./play-search-list/playSearchList.component";

const router: Route[] = [
  // { path: "", children: [
  //     {path: "", component: PlayListComponent},
  //   ]
  // },
  { path: "play", component: PlayComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(router),
  ],
  exports: [
    RouterModule
  ]
})
export class PlayRouterModule {}
