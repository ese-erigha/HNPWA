import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedListComponent } from './feed-list/feed-list.component';
import {StoryComponent} from './story/story.component';

const routes: Routes = [
  {
    path: '',
    children: [

      { path: ':feedType', component: FeedListComponent },
      {path: 'item/:id', component: StoryComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule {}