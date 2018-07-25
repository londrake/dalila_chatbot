import { Component } from '@angular/core';
import { Message } from '@app/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public message : Message;
  public messages : Message[];
  public suggestions : string[];
  public carousel: string[];
  /*public data: object = { 
    hasSuggestion : false,
    suggestions : []
  };
  */
  public suggestionButton : string = "";
  


  constructor(){
    this.message = new Message('', 'assets/images/user.png',{}, new Date());
    this.messages = [
      new Message('Welcome to OpenDigitalLibrary', 'assets/images/bot.png', {}, new Date())
    ];
    this.suggestions= [];
    this.carousel= [];
  }

  getData(data)
  { console.log("getData() ", data);
    this.carousel =(data.carousel.hasOwnProperty("items") && data.carousel.items.length>0) ? data.carousel.items : [];
    console.log("I carousel ricevuti sono: ", this.carousel);
    //this.data.hasSuggestion =  (data.hasOwnProperty("suggestions")) ? true : false;
    this.suggestions = (data.hasOwnProperty("suggestions") && data.suggestions.length>0) ? data.suggestions : [];
    //console.log("i sugerimenti ricevuti sono ", data);
    console.log("I suggerimenti assegnati sono ", this.suggestions);

  }
  setSuggestionselect(event){
    this.suggestionButton = event;
    console.log( "Il bottone premuto è", event);
  }
}
