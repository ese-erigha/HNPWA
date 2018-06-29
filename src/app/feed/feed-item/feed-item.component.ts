import { Component,OnInit,OnDestroy,Input } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import { Store } from '@ngrx/store';
import {State} from '../feed.reducer';
import {Feed} from '../../store/models/feed.model';
import * as feedActions from '../feed.actions';

@Component({
  selector: 'feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls : ["./feed-item.component.css"]
})
export class FeedItemComponent implements OnInit, OnDestroy {

    @Input() feed: Feed = null;
    @Input() feedType: string = "";

    constructor(private route: ActivatedRoute,private store: Store<State>,private router: Router){

    }

    ngOnInit(){

    }

    viewFeed(feedId){
      this.router.navigate(['feeds/item',feedId]);
    }

    ngOnDestroy(){

    }
}
