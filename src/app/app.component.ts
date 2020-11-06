import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  private stompClient
  private serverUrl = 'http://localhost:8080/gs-guide-websocket'

  ngOnInit(){
    this.initializeWebSocketConnection();
  }
  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      console.log(frame);
      console.log(that.stompClient);
      that.stompClient.subscribe("/topic", (message) => {
       if(message.body){
          console.log(message.body);
       }
       else {
         console.log("aaaaaaaaaaaaa");
       }
       
      });
    });
  }
 

}
