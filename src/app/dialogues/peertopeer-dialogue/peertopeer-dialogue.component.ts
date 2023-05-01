import { Component } from '@angular/core';

@Component({
  selector: 'app-peertopeer-dialogue',
  templateUrl: './peertopeer-dialogue.component.html',
  styleUrls: ['./peertopeer-dialogue.component.css']
})
export class PeertopeerDialogueComponent {
   public showLink:boolean = false;

   createSession(){
    this.showLink=true
   }

}
