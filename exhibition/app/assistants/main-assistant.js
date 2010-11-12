function MainAssistant() {
    this.pushDockStageHandler = this.pushDockStage.bindAsEventListener(this);
};

MainAssistant.prototype = {
    setup: function() {
        this.controller.setupWidget("push-dock-stage", {label: $L("Push Dock Stage")}, {});
        this.controller.listen("push-dock-stage", Mojo.Event.tap, this.pushDockStageHandler);
    },
    cleanup: function() {
        this.controller.stopListening("push-dock-stage", Mojo.Event.tap, this.pushDockStageHandler);
    },

    pushDockStage: function() {
        Mojo.Log.info("pushDockStage");
    },
};
