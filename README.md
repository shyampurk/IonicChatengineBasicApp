# Ionic App with ChatEngine

Basic Chat App with Ionic and ChatEngine


## Setup

Before proceeding, make sure that you have the ionic CLI installed. Follow [this link](https://ionicframework.com/getting-started#cli) to setup your base Ionic environment.

### Step 1 - Install the module dependencies

Close the repo and install the module dependencies for Ionic and Angular core libraries

    npm install
    
### Step 2 - Install ChatEngine module

    cd IonicChatengineBasicApp
    npm install chat-engine --save
    
### Step 3 - Generate the Publish and Subscribe Key

Generate your PubNub Publish and Subscribe key by following the first step of [ChatEngine quickstart guide](https://www.pubnub.com/tutorials/chatengine/)

### Step 4 - Add the keys in code

Replace the Publish key in [this line](/src/app/chatengine.ts#L14)

Replace the Subscribe key in [this line](/src/app/chatengine.ts#L15)

### Step 5 - Run the app

Run the app 

    ionic serve
    
This will open up the default browser window to run the app. Since this is a chat app, you can open another browser to login as a different user for chatting. For  best results, you can test it by launching two instances of the app, one from Chrome and the other from Firefox. 

Alternatively, you can compile this into a native android app under Android Studio by building with Cordova and launch from multiple android devices. 
