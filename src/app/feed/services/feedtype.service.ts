import { Injectable } from '@angular/core';

@Injectable()
export class FeedTypeService {

    public urlKeyToFeedKey = {

        new:'newstories',
        top: 'topstories',
        best: 'beststories',
        ask: 'askstories',
        show: 'showstories',
        job: 'jobstories'
    }

  constructor() {}

  getFeedKey(urlKey:string){

    return this.urlKeyToFeedKey[urlKey];
  }

}