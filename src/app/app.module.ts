import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DialogflowService, SeggestionService } from '@app/services';
import { MessageListComponent, MessageFormComponent, MessageItemComponent } from '@app/components';
import { SuggestionComponent } from '@app/components/suggestion/suggestion.component';
import { SuggestionPanelComponent } from '@app/components/suggestion-panel/suggestion-panel.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselPanelComponent } from './components/carousel-panel/carousel-panel.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageFormComponent,
    MessageItemComponent,
    SuggestionComponent,
    SuggestionPanelComponent,
    CarouselComponent,
    CarouselPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2CarouselamosModule
  ],
  providers: [
    DialogflowService,
    SeggestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
