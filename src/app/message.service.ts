import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  constructor() {}

  add(message: string) {
    this.messages.push(message);
  }
  clear() {
    this.messages = [];
  }
  close(message: string):void{
    console.log("close method")
    this.messages = this.messages.filter(mess => mess !== message)
    
  }
}
