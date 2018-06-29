import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, Effect} from "@ngrx/effects";
import { Observable, of } from "rxjs";
import {switchMap,map, tap, catchError} from "rxjs/operators";
import * as userActions from "./user.actions";
import {UserService} from './services/user.service';
import {User} from '../store/models/user.model';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,private userService: UserService) {}

 @Effect()
  loadItem$: Observable<Action> = this.actions$.ofType(userActions.LOAD_USER)
                                               .pipe(
                                                    tap((action) => new userActions.LoadUserPendingAction({user:{}})),
                                                    switchMap((action)=>{
                                                        
                                                        return this.userService.getUser(action['payload'].id)
                                                                                .pipe(
                                                                                    map((user: User)=>{
                                                                                        
                                                                                        return {user: user};
                                                                                    })
                                                                                );
                                                    }),
                                                    map((partialState: {})=> new userActions.LoadUserSuccessAction (partialState)),
                                                    catchError( err => of(new userActions.LoadUserErrorAction(err))) 
                                               );
                                        

}
