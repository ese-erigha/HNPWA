import { Component,OnInit,OnDestroy,Input } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'navigation',
  templateUrl: './navbar.component.html',
  styleUrls : ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {

    @Input() feedType: string;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private router: Router, private route: ActivatedRoute){

    }

    ngOnInit(){
      this.route.params
                .pipe(
                    takeUntil(this.destroy$)
                )
                .subscribe(params=>{
                  this.feedType = params['feedType'];
                })
    }

    viewFeed(feedType: string){
      this.router.navigate(['/feeds',feedType]);
    }

    ngOnDestroy(){
      this.destroy$.next(true);
      // Now let's also unsubscribe from the subject itself:
      this.destroy$.unsubscribe();
    }
}
