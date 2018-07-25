import { Message } from '@app/models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SeggestionService } from '@app/services';

@Component({
  selector: 'carousel-panel',
  templateUrl: './carousel-panel.component.html',
  styleUrls: ['./carousel-panel.component.scss']
})
export class CarouselPanelComponent implements OnInit {

  @Input('carousel')
  private carousel: string[]= [];

  private sug= { suggestion: "",
                carousel: "",
              };
  
  @Output()
  public carouselSelected = new EventEmitter<object>();

  constructor(private carouselService: SeggestionService) {
  }


  show(carousel){
    //console.log("carusel");
    //console.log (suggestion.length);
    return true;
    /*
    if (carousel.length>0)
      return false;
    else 
      return true;
      */
    
  }
  getImage(item){
    //TO REDEFINE WHEN IMAGE ARE SENT...
    //console.log("Retriving image for carousel item ", item.title);
    if (item.hasOwnProperty('image') && item.image != "")
        return item.image;
      else
        return "assets/images/no_img.jpg";
  }


   setSuggestion(item): void {
     console.log("Hai cliccato sul carousel: ", item.title);
     this.sug.carousel = item.title;
     this.carouselService.setSuggestion(this.sug);
   }

  ngOnInit() {
  }

}
