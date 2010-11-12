function MainAssistant(params) {
    this.pushOtherSceneHandler = this.pushOtherScene.bindAsEventListener(this);
};

MainAssistant.prototype = {
    setup: function() {
        this.controller.setupWidget("push-other-scene", {label: $L("Other Scene")}, {});
        this.controller.listen("push-other-scene", Mojo.Event.tap, this.pushOtherSceneHandler);
    },
    cleanup: function() {
        this.controller.stopListening("push-other-scene", this.pushOtherSceneHandler);
    },

    pushOtherScene: function() {
        this.controller.stageController.pushScene("other");
    },
};
