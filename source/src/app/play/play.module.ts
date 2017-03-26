import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "../common/common.module";
// 路由
import { PlayRouterModule } from "./play.router";
// 基础组建
import { PlayComponent } from "./play.component";
import { SearchComponent } from "./search/search.component";

import { PlayListComponent } from "./play-list/playList.component";
import { PlaySearchListComponent } from "./play-search-list/playSearchList.component";

import { PlayService } from "./play.service";

// 播放列表模块
@NgModule({
  bootstrap: [
    PlayComponent
  ],
  declarations: [
    PlayComponent,
    SearchComponent,
    PlayListComponent,
    PlaySearchListComponent,
  ],
  imports: [
    CommonModule,
    PlayRouterModule,
  ],
  providers: [
    PlayService
  ]
})
export class PlayModule {}
