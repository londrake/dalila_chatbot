import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '@app/models';
import { SuggestionComponent } from '../suggestion/suggestion.component';
import { SeggestionService } from '@app/services';

@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input('message')
  private message: Message;

  private sug= { 
                suggestion: "",
                carousel: "",
               };
  private position: String = "left";
  private user: String = "left";

  constructor(private carouselService: SeggestionService) { }

  ngOnInit() {
  }

  check(avatar){
    //console.log(avatar);
    if (avatar.indexOf("bot")==-1)
      {
        this.position = "right";
        this.user="Utente"
      }else{
        this.position = "left";
        this.user = "Dalila"
      }
        
    
  }
  show(carousel){
    //console.log("carusel");
    //console.log (suggestion.length);
    if (carousel.length>0)
      return true;
    else 
      return false;
    
  }
  getImage(item){
    //TO REDEFINE WHEN IMAGE ARE SENT...
    //console.log("Retriving image for carousel item ", item.title);
    if (item.hasOwnProperty('image') && item.image != "")
        return item.image;
      else
        return "assets/images/no_img2.png";
  }
  setSuggestion(item): void {
    console.log("Hai cliccato sul carousel: ", item.title);
    this.sug.carousel = item.title;
    this.carouselService.setSuggestion(this.sug);
  }

}
