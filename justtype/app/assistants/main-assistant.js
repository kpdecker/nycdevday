function MainAssistant(params) {
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
        this.controller.stopListening("push-other-scene", this.pushOtherSceneHandler);
    },

    pushStatusScene: function() {
        this.controller.stageController.pushScene("status");
    },
    pushOtherScene: function() {
        this.controller.stageController.pushScene("other");
    },
};
