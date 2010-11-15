function MainAssistant(unique) {
    this.unique = unique;
    this.pushSceneHandler = this.pushScene.bindAsEventListener(this);
};

MainAssistant.prototype = {
    setup: function() {
        var uniqueEl = this.controller.sceneElement.querySelector(".unique-id");
        uniqueEl.textContent = $L("Unique Id: #{unique}").interpolate({ unique: this.unique });

        this.controller.setupWidget("push-scene", {label: $L("Push New Scene")}, {});
        this.controller.listen("push-scene", Mojo.Event.tap, this.pushSceneHandler);
    },
    cleanup: function() {
        this.controller.stopListening("push-scene", Mojo.Event.tap, this.pushSceneHandler);
    },

    pushScene: function() {
        this.controller.stageController.pushScene("main", (Math.random()*1000)|0);
    },
};
