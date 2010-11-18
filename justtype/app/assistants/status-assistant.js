/* Copyright 2010 Palm, Inc. All rights reserved. */
function StatusAssistant(params) {
    this.pushOtherSceneHandler = this.pushOtherScene.bindAsEventListener(this);

    this.launchStatus = params;
}

StatusAssistant.prototype = {
    setup: function(params) {
        this.controller.setupWidget("push-status-other-scene", {label: $L("Other Scene")}, {});
        this.controller.listen("push-status-other-scene", Mojo.Event.tap, this.pushOtherSceneHandler);

        if (this.launchStatus) {
            // Note that we are just displaying the scene here. Calling populateStatus could cause us to kill our parent scene if
            // called at this point due to the topScene field still pointing to our parent.
            this.displayStatus(this.launchStatus);
        }
    },
    cleanup: function() {
        this.controller.stopListening("push-status-other-scene", Mojo.Event.tap, this.pushOtherSceneHandler);
    },

    pushOtherScene: function() {
        this.controller.stageController.pushScene("other");
    },

    populateStatus: function(status) {
        Mojo.Log.info("StatusAssistant.populateStatus: %j", status);

        // Pop any scenes above us off the stack
        if (this.controller.stageController.topScene() !== this.controller) {
            this.controller.stageController.popScenesTo(this.controller.sceneName);
        }

        this.displayStatus(status);
    },
    displayStatus: function(status) {
        this.controller.get("status-section").textContent = status;
    }
};
