import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { PlayListComponent } from "./playList.component";

const router: Route[] = [
  { path: "", children: [
      {path: "", component: PlayListComponent},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(router),
  ],
  exports: [
    RouterModule
  ]
})
export class PlayListRouterModule {}
