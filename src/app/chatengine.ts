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
        publishKey: 'pub-c-d8d7a6be-abc9-4d1e-b4d7-58557d95a1e8',
        subscribeKey: 'sub-c-f3aa76f8-d6fe-11e8-94b4-42638ad66e25',
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
