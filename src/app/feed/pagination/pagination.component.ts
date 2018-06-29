import { Component,OnInit,OnDestroy,Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {State,FeedState} from '../feed.reducer';
import {Feed} from '../../store/models/feed.model';
import * as feedActions from '../feed.actions';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit, OnDestroy {

    feed = null;
    feedType: string = "";
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private store: Store<State>){

      this.store.select(state => state.feedState)
                .pipe(
                    takeUntil(this.destroy$)
                  )
                  .subscribe((feedState: FeedState)=>{
                    this.loading  = feedState.loading;
                    this.feedType = feedState.currentFeed;
                    if(!this.loading && feedState[this.feedType] ){
                        
                        this.feed =  feedState[this.feedType];
                    }
                        
                });
    }

    ngOnInit(){

    }

    fetchNext(currentPage: number){
      this.fetchPage(++currentPage);
    }

    fetchPrev(currentPage: number){
      this.fetchPage(--currentPage);
    }


    fetchPage(pageNumber: number){

        this.store.dispatch({
            type: feedActions.LOAD_FEEDS,
            payload: <feedActions.feedQuery>{
              type: this.feedType,
              pageNumber: pageNumber
            } 
          });
    }

    ngOnDestroy(){
        
     }
}
