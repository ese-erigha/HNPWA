import { Injectable } from '@angular/core';
import { forkJoin, Observable} from 'rxjs';
import {ApiService} from '../../shared/services/api.service';
import {HelperService} from '../../shared/services/helper.service';


@Injectable()
export class FeedService {

  constructor(private apiService: ApiService, private helperService: HelperService) {

  }

  getItem(id: number){
    return this.apiService.getItem(id);
  }

  getItems(itemIds: Array<number>){

    const calls = [];
    itemIds.forEach(id =>{
        calls.push(this.apiService.getItem(id));
    });
    return forkJoin(calls);

  }

  getFeedIds(feed: string): Observable<any>{
    return this.apiService.getFeed(feed);
  }

  paginateFeedIds(feedIds: Array<number>,pageNumber: number = 1, pageSize: number = 15){
    return this.helperService.paginate(feedIds,pageNumber,pageSize);
  }

}