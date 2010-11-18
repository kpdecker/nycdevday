/* Copyright 2010 Palm, Inc. All rights reserved. */
function MainAssistant() {
    this.pushStatusSceneHandler = this.pushStatusScene.bindAsEventListener(this);
    this.pushOtherSceneHandler = this.pushOtherScene.bindAsEventListener(this);
};

MainAssistant.prototype = {
    setup: function() {
        this.controller.setupWidget("push-status-scene", {label: $L("Status Scene")}, {});
        this.controller.listen("push-status-scene", Mojo.Event.tap, this.pushStatusSceneHandler);

        this.controller.setupWidget("push-other-scene", {label: $L("Other Scene")}, {});
        this.controller.listen("push-other-scene", Mojo.Event.tap, this.pushOtherSceneHandler);
    },
    cleanup: function() {
        this.controller.stopListening("push-status-scene", Mojo.Event.tap, this.pushStatusSceneHandler);
        this.controller.stopListening("push-other-scene", Mojo.Event.tap, this.pushOtherSceneHandler);
    },

    pushStatusScene: function() {
        this.controller.stageController.pushScene("status");
    },
    pushOtherScene: function() {
        this.controller.stageController.pushScene("other");
    },

    populateStatus: function(status) {
        Mojo.Log.info("MainAssistant.populateStatus: %j", status);

        // This is a point that we could cleanup any UIs that may conflict with this action.
        // Examples: the navigation menu in the Facebook application

        // If there are any scene above use (which we know do not handle this message since we are seeing it),
        // then pop them off the stack so we have ourselves and then the status scene after handling this message
        if (this.controller.stageController.topScene() !== this.controller) {
            this.controller.stageController.popScenesTo(this.controller.sceneName);
        }

        this.controller.stageController.pushScene("status", status);
    }
};
