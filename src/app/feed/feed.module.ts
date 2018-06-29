
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import {reducer} from './feed.reducer';
import {FeedListComponent} from './feed-list/feed-list.component';
import {FeedItemComponent} from './feed-item/feed-item.component';
import {FeedRoutingModule} from './feed-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FeedService} from './services/feed.service';
import {FeedTypeService} from './services/feedtype.service';
import {FeedEffects} from './feed.effect';
import {PaginationComponent} from './pagination/pagination.component';
import {StoryComponent} from './story/story.component';
import {CommentComponent} from './comment/comment.component';

@NgModule({
    imports: [
        CommonModule,
        FeedRoutingModule,
        SharedModule,
        StoreModule.forFeature('feedState',reducer),
        EffectsModule.forRoot([FeedEffects]),
    ],
    exports: [FeedListComponent,FeedItemComponent,PaginationComponent,StoryComponent,CommentComponent],
    declarations: [FeedListComponent,FeedItemComponent,PaginationComponent,StoryComponent,CommentComponent],
    providers: [FeedService,FeedTypeService]
})
export class FeedModule{}