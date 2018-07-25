import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Message } from '@app/models';
import { DialogflowService, SeggestionService } from '@app/services';
import { SuggestionComponent } from '../suggestion/suggestion.component';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @Output() panelShow = new EventEmitter<object>();

  @Input('message')
  private message : Message;

  @Input('messages')
  private messages : Message[];  

  @Input('data')
  private  data;  
  private  oreq;  
  
  private carouselSelection : String = "";



  constructor(private dialogFlowService: DialogflowService, private seggestionService: SeggestionService) {

   }

  ngOnInit() {
    this.seggestionService.change.subscribe(sug => {
      console.log("Seggestion service.change(), ", sug);
      this.message.content = (sug.suggestion == "") ? sug.carousel : sug.suggestion;
      this.carouselSelection = sug.carousel;
      this.sendMessage();
    });
  }

  private keyPress(e) {
    //console.log(e.keyCode);
    if (e.keyCode == 13) {
      this.sendMessage();
    }
  }

  public sendMessage(): void {
    this.data=  {
                  suggestions: [], 
                  carousel: []
                };
   // struttura dati per la gesione del click sull'item del carousel 
    this.oreq= {
                orData:{
                      inputs: [
                          {
                            rawInputs: [
                              {
                                inputType: "TOUCH",
                                query: this.carouselSelection
                              }
                            ],
                            intent: "actions.intent.OPTION",
                            arguments:[
                              { 
                                name: "OPTION",
                                textValue: this.carouselSelection,
                              }
                            ]
                          }
                      ]
                },                
                event: {
                  name: "card",
                  data: {
                    arguments:[
                      { 
                        name: "OPTION",
                        textValue: this.carouselSelection,
                      }
                    ]
                  }
                },
              
    };

    this.message.timestamp = new Date();
    this.messages.push(this.message);

    if (this.carouselSelection == ""){
      this.oreq ={
        orData: {},
        event:{},
      }      
    }


    this.dialogFlowService.getResponse(this.message.content, this.oreq).subscribe(res => {
      console.log("Risposta da dialogFlow: ", res);
    
      //CHECK IF SUGGESTIONS ARE AVAIBLE
      if (res.result.fulfillment.data && res.result.fulfillment.data.google && res.result.fulfillment.data.google.richResponse && res.result.fulfillment.data.google.richResponse.suggestions && res.result.fulfillment.data.google.richResponse.suggestions.length > 0){
        /*this.messages.push(
          new Message("Scegli uno tra i suggerimenti nel pannello in basso.", 'assets/images/bot.png', res.timestamp)
        );*/
        console.log("i suggerimenti ricevuti nel messaggio sono", res.result.fulfillment.data.google.richResponse.suggestions);
        this.data.suggestions = res.result.fulfillment.data.google.richResponse.suggestions;
        console.log (this.data);
        //this.panelShow.emit(res.result.fulfillment.data.google.richResponse);
      }


      //CHECK IF CAROUSEL ITEMS ARE AVAIBLE
      if (res.result.fulfillment.data &&  res.result.fulfillment.data.google && res.result.fulfillment.data.google.systemIntent && res.result.fulfillment.data.google.systemIntent.data && res.result.fulfillment.data.google.systemIntent.data.carouselSelect && res.result.fulfillment.data.google.systemIntent.data.carouselSelect.items.length > 0){
        /*this.messages.push(
          new Message("Scegli uno tra i suggerimenti nel pannello in basso.", 'assets/images/bot.png', res.timestamp)
        );*/
        console.log("Gli elementi carusel ricevuti sono:", res.result.fulfillment.data.google.systemIntent.data.carouselSelect.items);
        this.data.carousel = res.result.fulfillment.data.google.systemIntent.data.carouselSelect.items;
        console.log (this.data);
      }
      
      //Default message by Dialog Flow
      if (res.result.fulfillment && res.result.fulfillment && res.result.fulfillment.speech){
        this.messages.push(
          new Message(res.result.fulfillment.speech, 'assets/images/bot.png',{}, res.timestamp)
        );
      }
      // Message from webHook
      if (res.result.fulfillment.data && res.result.fulfillment.data.google && res.result.fulfillment.data.google.richResponse && res.result.fulfillment.data.google.richResponse.items && res.result.fulfillment.data.google.richResponse.items.length > 0)
      {        
        let resMessages = res.result.fulfillment.data.google.richResponse.items;
        console.log("ecco i messaggi ", resMessages);
        for( let resMessage of resMessages) {
          console.log("Processo il messaggio", resMessage);
          if (resMessage.hasOwnProperty("simpleResponse"))
            this.messages.push(
              new Message(resMessage.simpleResponse.textToSpeech, 'assets/images/bot.png',{carousel: this.data.carousel,}, res.timestamp)
            );
          else if (resMessage.hasOwnProperty("basicCard"))
            this.messages.push(
              new Message("", 'assets/images/bot.png',{card: resMessage.basicCard,}, res.timestamp)
            );
                    
        }
      }  


      //EMIT AN EVENT WHICH HANDLE SUGGESTIONS AND CAROUSEL ITEMS.
      this.panelShow.emit(this.data);
    });

    this.message = new Message('', 'assets/images/user.png',{}, null);
  }

}
