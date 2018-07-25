import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { SeggestionService } from '@app/services';
//import { SeggestionService } from '../../services';
//import { EventEmitter } from 'events';

@Component({
  selector: 'suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  @Input('suggestions')
  private suggestions : string;

  @Output()
  public suggestionSelected = new EventEmitter<object>();
  private sug: { 
                suggestion: string,
                carousel: string,
                };

  constructor(private seggestion: SeggestionService) {
   }

   setSuggestion(): void {
     
     this.sug.suggestion= this.suggestions;
     console.log("Set suggestion", this.sug);
     this.seggestion.setSuggestion(this.sug);
   }

  ngOnInit() {
  }

}
