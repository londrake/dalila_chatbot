export class Message {
  content: string;
  timestamp: Date;
  avatar: string;
  carousel = [];
  card={};

  // aggiunte di marko
  type: string;
  data: object;
  

  constructor(content: string, avatar: string, data,  timestamp?: Date){
    this.content = content;
    this.timestamp = timestamp;
    this.avatar = avatar;
    this.carousel = (data.hasOwnProperty("carousel")) ? data.carousel : [];
    console.log (" CONSTRUCTOR MESSAGE.CAROUSEL, " , this.carousel);
    this.card = (data.hasOwnProperty("card")) ? data.card : {};
    console.log (" CONSTRUCTOR MESSAGE.CARD, " , data.card);
    // aggiunte di marko
    //this.type = null ? "text" : type;
    //this.data = ((data==null || data=={}) ? { hasSuggestion : false } : data);

   // console.log("i miei dati: ", data)
  }

}
