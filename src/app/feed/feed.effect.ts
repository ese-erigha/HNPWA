import { Injectable } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { Actions, Effect} from "@ngrx/effects";
import { Observable, of } from "rxjs";
import {switchMap,withLatestFrom,map, tap, catchError} from "rxjs/operators";
import * as feedActions from "./feed.actions";
import {State} from './feed.reducer';
import {FeedService} from './services/feed.service';
import {FeedTypeService} from './services/feedtype.service';

@Injectable()
export class FeedEffects {
  constructor(private actions$: Actions,private store$: Store<State>,private feedService: FeedService,private feedTypeService: FeedTypeService) {}

  @Effect()
  loadFeeds$: Observable<Action> = this.actions$.ofType(feedActions.LOAD_FEEDS)
                                        .pipe(
                                            tap((action)=> new feedActions.LoadFeedsPendingAction({currentFeed: action['payload'].type})),
                                            withLatestFrom(this.store$),
                                            map(([action,state])=> {

                                                return {feed: state.feedState[action['payload'].type], payload: action['payload'] };
                                            }),
                                            switchMap(actionAndState =>{

                                                if(!Object.keys(actionAndState.feed).length){ //If feed type data is empty

                                                    return this.feedService.getFeedIds(this.feedTypeService.getFeedKey(actionAndState.payload.type))
                                                                .pipe(
                                                                    tap((response)=>{
                                                                        
                                                                    }),
                                                                    map((feedIds: any)=> {
                                                                        
                                                                        return this.feedService.paginateFeedIds(feedIds)
                                                                    }),
                                                                    switchMap((feedType: any) =>{
                                    
                                                                       return this.feedService.getItems(feedType[actionAndState.payload.pageNumber])
                                                                                    .pipe(
                                                                                        map((feeds: Array<any>)=> {
                                                                                            
                                                                                            return {
                                                                                                [actionAndState.payload.type] : feedType,
                                                                                                feeds: feeds,
                                                                                                currentFeed: actionAndState.payload.type
                                                                                            }
                                                                                        })
                                                                                    );
                                                                    })
                                                                );
                                                }else{
                                                    
                                                    return this.feedService.getItems(actionAndState.feed[actionAndState.payload.pageNumber])
                                                               .pipe(
                                                                    map((feeds: Array<any>)=> {
                                                                        
                                                                        let feedData = actionAndState.feed;
                                                                        feedData['pageNumber'] = actionAndState.payload.pageNumber;

                                                                        return {
                                                                            feeds: feeds,
                                                                            currentFeed: actionAndState.payload.type,
                                                                            [actionAndState.payload.type]: feedData
                                                                        }
                                                                    })
                                                               );   
                                                 }
                                    
                                            }),
                                            map((partialState: {})=> new feedActions.LoadFeedsSuccessAction(partialState)),
                                            catchError( err => of(new feedActions.LoadFeedsErrorAction({feeds:[]})))   
                                        );



 @Effect()
  loadItem$: Observable<Action> = this.actions$.ofType(feedActions.LOAD_ITEM)
                                               .pipe(
                                                    tap((action) => new feedActions.LoadItemPendingAction({story:{}})),
                                                    switchMap((action)=>{
                                                        return this.feedService.getItem(action['payload'].id);
                                                    }),
                                                    switchMap((story)=>{
                                                        
                                                        if(story['kids'].length){
                                                            return this.feedService.getItems(story['kids'])
                                                                                .pipe(

                                                                                    map((comments: Array<any>)=>{

                                                                                        story['kids'] = Object.assign([],comments);
                                                                                        return {story: story};
                                                                                    })
                                                                                );
                                                        }else{
                                                            return of({story: story});
                                                        }
                                                    }),
                                                    map((partialState: {})=> new feedActions.LoadItemSuccessAction (partialState)),
                                                    catchError( err => of(new feedActions.LoadItemErrorAction(err))) 
                                               );
                                        

}
