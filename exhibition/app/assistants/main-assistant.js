/* Copyright 2010 Palm, Inc. All rights reserved. */
function MainAssistant() {
    this.pushDockSceneHandler = this.pushDockScene.bindAsEventListener(this);
};

MainAssistant.prototype = {
    setup: function() {
        this.controller.setupWidget("push-dock-scene", {label: $L("Push Dock Scene")}, {});
        this.controller.listen("push-dock-scene", Mojo.Event.tap, this.pushDockSceneHandler);
    },
    cleanup: function() {
        this.controller.stopListening("push-dock-scene", Mojo.Event.tap, this.pushDockSceneHandler);
    },

    pushDockScene: function() {
        // Force the creation of a dock stage. This is meant for testing.
        // Under a normal application this should only be done in the handleLanch handler on the dockMode message
        Mojo.Log.info("pushDockScene");
        this.controller.stageController.pushScene("dock");
    },
};
