import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Store } from "@ngrx/store";
import { State, FeedState } from "../feed.reducer";
import * as feedActions from "../feed.actions";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CustomError } from "../../store/models/custom-error.model";
import { NotificationService } from "../../shared/services/notification.service";
import swal from 'sweetalert2';

@Component({
  selector: "story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.css"]
})
export class StoryComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  itemId: number = null;
  item = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private notificationService: NotificationService,
    private location: Location
  ) {
    this.store
      .select(state => state.feedState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((feedState: FeedState) => {
        this.loading = feedState.loading;
        if (!this.loading) {
          this.item = feedState.story;
        }
      });

    this.notificationService.dispatchError$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error: CustomError) => {
        swal({
          title: error.title,
          text: error.text,
          type: 'error',
          toast: false,
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      });
  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => this.triggerFetch(params["id"]));
  }

  triggerFetch(itemId: number) {
    this.store.dispatch({
      type: feedActions.LOAD_ITEM,
      payload: <feedActions.itemQuery>{
        id: itemId
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
