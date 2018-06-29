import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { State, FeedState } from "../feed.reducer";
import { Feed } from "../../store/models/feed.model";
import { CustomError } from "../../store/models/custom-error.model";
import * as feedActions from "../feed.actions";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { NotificationService } from "../../shared/services/notification.service";
import swal from 'sweetalert2';

@Component({
  selector: "feed-list",
  templateUrl: "./feed-list.component.html",
  styleUrls: ["./feed-list.component.css"]
})
export class FeedListComponent implements OnInit, OnDestroy {
  feeds: Array<Feed> = [];
  loading: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>();
  

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private notificationService: NotificationService
  ) {
    this.store
      .select(state => state.feedState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((feedState: FeedState) => {
        this.loading = feedState.loading;
        if (!this.loading) {
          this.feeds = feedState.feeds;
        }
      });

    this.notificationService.dispatchError$
                            .pipe(takeUntil(this.destroy$))
                            .subscribe((error: CustomError)=>{
                                
                                swal({
                                  title: error.title,
                                  text: error.text,
                                  type: 'error',
                                  toast: false,
                                  allowOutsideClick: false,
                                  allowEscapeKey: false
                                });
                            });

  }

  ngOnInit() {

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.triggerFetch(params["feedType"], 1);
    });
  }

  triggerFetch(feedType: string, pageNumber: number) {
    this.store.dispatch({
      type: feedActions.LOAD_FEEDS,
      payload: <feedActions.feedQuery>{
        type: feedType,
        pageNumber: pageNumber
      }
    });
  }

  fetchFeed(feedType: string) {
    this.triggerFetch(feedType, 1);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
