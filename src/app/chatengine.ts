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
        publishKey: 'pub-c-508821e1-5e68-4774-bcad-f773a0497bd5',
        subscribeKey: 'sub-c-72db42c6-da0c-11e8-abf2-1e598b800e69',
        presenceTimeout: 10,
        heartbeatInterval: 4
      },
      {
        debug: true,
        globalChannel: 'chat-engine-ionic'
      });
    this.create = ChatEngineCore.create.bind(this);
    this.plugin = ChatEngineCore.plugin;
  }
}
