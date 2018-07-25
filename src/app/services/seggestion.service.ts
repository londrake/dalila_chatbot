import { Injectable,  Output, EventEmitter } from '@angular/core';

@Injectable()
export class SeggestionService {

  //public sug: string = "";
  public sug= { suggestion: "",
                carousel: "",
                };
  //@Output() change: EventEmitter<object> = new EventEmitter();
  @Output() change: EventEmitter<object> = new EventEmitter();
  //constructor() { }

  setSuggestion(sug){
    this.sug = sug;
    console.log("Suggestion service ts ", this.sug);
    this.change.emit(this.sug);
  }


}
