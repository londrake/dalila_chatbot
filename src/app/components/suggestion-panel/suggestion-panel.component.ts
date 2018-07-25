import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Message } from '@app/models';
import { SeggestionService } from '@app/services';

@Component({
  selector: 'suggestion-panel',
  templateUrl: './suggestion-panel.component.html',
  styleUrls: ['./suggestion-panel.component.scss']
})
export class SuggestionPanelComponent implements OnInit {
    
  @Input('suggestions')
  private suggestions: string[]=[];

  @Output()
  public suggestionSelected = new EventEmitter<object>();

  private sug= { 
    suggestion: "",
    carousel: "",
  };

  constructor(private seggestion: SeggestionService) {
  }

  show(suggestion){
    //console.log("ciao ciao");
    //console.log (suggestion.length);
    if (suggestion.length>0)
      return false;
    else 
      return true;
    
  }

  setSuggestion(suggestion): void {
    //console.log("ciao");
    //this.seggestion.setSuggestion(suggestion.title);
    this.sug.suggestion= suggestion.title;
    console.log("Set suggestion", this.sug);
    this.seggestion.setSuggestion(this.sug);
  }

  ngOnInit() {
  }

}

/*

export class SuggestionPanelComponent implements OnInit {
    
  @Input('suggestions')
  private suggestions: string[]=[];

  @Output()
  public suggestionSelected = new EventEmitter<object>();

  private sug: { 
                  suggestion: "",
                  carousel: "",
                };

  constructor(private seggestion: SeggestionService) {
  }

  show(suggestion){
    //console.log("ciao ciao");
    //console.log (suggestion.length);
    if (suggestion.length>0)
      return false;
    else 
      return true;
    
  }

  setSuggestion(suggestion): void {     
    this.sug.suggestion= suggestion.title;
    console.log("Set suggestion", this.sug);
    this.seggestion.setSuggestion(this.sug);
  }
  */