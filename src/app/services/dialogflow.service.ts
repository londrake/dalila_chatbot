import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '@env/environment';

@Injectable()
export class DialogflowService {

  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  private token: string = environment.token;
  private sessionId: string = (Date.now() + Math.random()).toString();

  constructor(private http: Http){}

  public getResponse(query: string, oreq){
    let data = {
      query : query,
      lang: 'it',
      sessionId: this.sessionId,
     
      originalRequest: {
                          source: "google",
                          data: oreq.orData,
                      },
    
      //result: oreq.result
      event: oreq.event,
                      
    }

    if (data.event.hasOwnProperty("name"))
      delete data.query;
    console.log ("Richiesta effettuata a DialogFlow: ", data);

   
    return this.http
      .post(`${this.baseURL}`, data, {headers: this.getHeaders()})
      .map(res => {
        //console.log(res);
        return res.json()
      })
  }

  public getHeaders(){
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    headers.append('Content-Type','application/json; charset=utf-8');
    return headers;
  }
}
