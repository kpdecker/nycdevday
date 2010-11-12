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
        // Force the creation of a dock stage. This is meant for testing.
        // Under a normal application this should only be done in the handleLanch handler on the dockMode message
        Mojo.Log.info("pushDockStage");
        Mojo.Controller.getAppController().assistant.createOrActivateStage("dock", "dock", Mojo.Controller.StageType.dockMode);
    },
};
