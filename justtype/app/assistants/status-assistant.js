function StatusAssistant(params) {
    this.pushOtherSceneHandler = this.pushOtherScene.bindAsEventListener(this);
}

StatusAssistant.prototype = {
    setup: function(params) {
        this.controller.setupWidget("push-status-other-scene", {label: $L("Other Scene")}, {});
        this.controller.listen("push-status-other-scene", Mojo.Event.tap, this.pushOtherSceneHandler);
    },
    cleanup: function() {
        this.controller.stopListening("push-status-other-scene", Mojo.Event.tap, this.pushOtherSceneHandler);
    },

    pushOtherScene: function() {
        this.controller.stageController.pushScene("other");
    },

    populateStatus: function(status) {
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
