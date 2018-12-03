import { Injectable } from '@angular/core';
import { ChatEngineCore } from 'chat-engine';
@Injectable()
export class ChatEngine {
  instance: any;
  create: any;
  plugin: any;
  me: any = { state: {} };
  chat: any = {};

  constructor() {
    this.instance = ChatEngineCore.create(
      {
        publishKey: '<PUBNUB PUBLISH KEY>',
        subscribeKey: '<PUBNUB SUBSCRIBE KEY>'
      },
      {
        debug: true,
        globalChannel: 'chat-engine-ionic'
      });
    this.create = ChatEngineCore.create.bind(this);
    this.plugin = ChatEngineCore.plugin;
  }
}
