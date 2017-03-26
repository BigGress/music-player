import { NgModule } from "@angular/core";
import { CommonModule } from "../common/common.module";
// 路由
import { PlayListRouterModule } from "./playList.router";
// 基础组建
import { PlayListComponent } from "./playList.component";

// 播放列表模块
@NgModule({
  bootstrap: [
    PlayListComponent
  ],
  declarations: [
    PlayListComponent
  ],
  imports: [
    PlayListRouterModule,
  ],
})
export class PlayListModule {}
