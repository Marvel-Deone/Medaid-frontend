import { Component,ViewChild } from '@angular/core';
import { MessagecontainerComponent } from '../messagecontainer/messagecontainer.component';


@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css']
})
export class ChatContainerComponent {
  public index!: number;
  public showSidebar = true;
  @ViewChild('child2') child2!: MessagecontainerComponent;
  ngOnInit(): void {
    
    
  }
  public onClickChat(): void {
    this.showSidebar = false;
  }

}
