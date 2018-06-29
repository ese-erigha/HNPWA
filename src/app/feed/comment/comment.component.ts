import { Component,Input,OnInit,OnDestroy } from '@angular/core';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit, OnDestroy {

    @Input() comment;
    
    constructor(){}

    ngOnInit(){
    }

    ngOnDestroy(){
      
    }
}
