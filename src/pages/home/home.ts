import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Content , List , Platform} from 'ionic-angular';
import { ChatEngine } from '../../app/chatengine';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isInitialized: boolean = false;

  messages: any[] = [];
  message: string;

  mutationObserver: MutationObserver;

  @ViewChild(Content) contentArea: Content;
  @ViewChild(List, {read: ElementRef}) chatList: ElementRef;

  private sub1$:any;
  private sub2$:any;


  constructor(private ce: ChatEngine, public platform: Platform, public navCtrl: NavController) {

    this.mutationObserver = new MutationObserver((mutations) => {
        this.contentArea.scrollToBottom();
    });

  }

  ionViewDidLoad() {

      this.chatInitialize();

      this.platform.ready().then(() => {

        this.sub1$ = this.platform.resume.subscribe ( (e) => {
           this.chatInitialize();
        });

        this.sub2$ = this.platform.pause.subscribe ( (e) => {
           this.chatLeave();
        });

      });

      this.mutationObserver.observe(this.chatList.nativeElement, {
          childList: true
      });

      return true;

  }

  ionViewWillUnload() {

      this.chatLeave();

      this.sub1$.unsubscribe();
      this.sub2$.unsubscribe();

      this.mutationObserver.disconnect();

      return true;

  }

  chatInitialize() {

      if(!this.isInitialized){

            this.ce.instance.connect(new Date().getTime(), this.generatePerson(true), 'auth-key');

            this.ce.instance.on('$.ready', (data) => {

              this.ce.me = data.me ;
              this.ce.chat = this.ce.instance.global;
              console.log("ChatEngine is ready");

            });

            this.ce.instance.on('$.online.*', (payload) => {

              console.log('Status', payload.user.state.full + ' is in this room!');

            });

            this.ce.instance.on('message', (payload) => {

              console.log("New message from " + payload.sender.name);

              //Add human readable timestamp for chat message
              payload.rcvdTime = this.getCurrentTime();

              // add the message to the array
              this.messages.push(payload);

            });

            this.isInitialized = true;
            console.log("Chat is initialized");

      }

  }

  getUsers(obj) {

    let users: any = [];
    if (obj) {
      Object.keys(obj).forEach((key) => {
        //console.log(obj[key].state.avatar);
        users.push(obj[key]);
      });
    }

    return users;
  }

  send() {

    if(this.message.length>0){

      console.log("Sending " + this.message);

      this.ce.chat.emit('message', { text: this.message });

      this.message = '';

    }

  }

  chatLeave(){

    if(this.isInitialized){

        this.ce.chat.leave();
        this.ce.me.state.full = "";

        this.ce.instance.disconnect();

        this.isInitialized = false;

    }
  }

  getCurrentTime() : string {

    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

  }

  generatePerson(online): any {

        let myChatUser = JSON.parse(localStorage.getItem("myChatUser"));

        if (myChatUser) {
            return myChatUser;
        }

        let person: any = {};

        var names = "Benjamin Riaz Hecham Bhavana Madison CraigB Oz Todd Stephen Girish Annie Michael DH Jeff Cody Jordan Vinny Ben Jochen Chaitan".split(" ");

        var avatars = [
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg'
        ];

        person.first = names[Math.floor(Math.random() * names.length)];
        person.last = names[Math.floor(Math.random() * names.length)];
        person.full = [person.first, person.last].join(" ");
        person.uuid = String(new Date().getTime());
        person.avatar = avatars[Math.floor(Math.random() * avatars.length)];
        person.online = online || false;
        person.lastSeen = Math.floor(Math.random() * 60);

        localStorage.setItem('myChatUser', JSON.stringify(person));

        return person;

    }

}
