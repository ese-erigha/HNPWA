import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Store } from "@ngrx/store";
import { State, UserState } from "../../user.reducer";
import { User } from "../../../store/models/user.model";
import * as userActions from "../../user.actions";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CustomError } from "../../../store/models/custom-error.model";
import { NotificationService } from "../../../shared/services/notification.service";
import swal from 'sweetalert2';


@Component({
  selector: "user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  user: User;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private notificationService: NotificationService,
    private router: Router,
    private location: Location
  ) {
    this.store
      .select(state => state.userState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((userState: UserState) => {
        
        this.loading = userState.loading;
        if (!this.loading) {
          this.user = userState.user;
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
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.fetchUser(params["id"]);
    });
  }

  fetchUser(userId: string) {
    this.store.dispatch({
      type: userActions.LOAD_USER,
      payload: <userActions.userQuery>{
        id: userId
      }
    });
  }

  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();

  }
}
