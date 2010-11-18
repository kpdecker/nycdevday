/* Copyright 2010 Palm, Inc. All rights reserved. */
function MainAssistant(id) {
    this.randomId = id;

    this.pushSceneHandler = this.pushScene.bindAsEventListener(this);
    this.cloneSceneHandler = this.cloneScene.bindAsEventListener(this);
    this.newDataHandler = this.newData.bindAsEventListener(this);
};

MainAssistant.prototype = {
    setup: function() {
        this.random = RandomManager.get(this.randomId);
        this.renderData();

        this.observerManager = new ObserverManager(this.controller);
        this.observerManager.setup();
        this.observerManager.observe(this.random, this.renderData.bind(this), ObserverManager.DeferUntil.SceneActive, true);

        this.controller.setupWidget("push-scene", {label: $L("Push New Scene")}, {});
        this.controller.listen("push-scene", Mojo.Event.tap, this.pushSceneHandler);

        this.controller.setupWidget("clone-scene", {label: $L("Clone Scene to New Stage")}, {});
        this.controller.listen("clone-scene", Mojo.Event.tap, this.cloneSceneHandler);

        this.controller.setupWidget("new-data", {label: $L("New Data")}, {});
        this.controller.listen("new-data", Mojo.Event.tap, this.newDataHandler);
    },
    cleanup: function() {
        // Cleanup the entry reference to prevent a leak
        RandomManager.release(this.random);

        this.observerManager.cleanup();

        this.controller.stopListening("push-scene", Mojo.Event.tap, this.pushSceneHandler);
        this.controller.stopListening("clone-scene", Mojo.Event.tap, this.cloneSceneHandler);
        this.controller.stopListening("new-data", Mojo.Event.tap, this.newDataHandler);
    },

    renderData: function() {
        var uniqueEl = this.controller.sceneElement.querySelector(".unique-id");
        uniqueEl.textContent = $L("Random: Id: #{id} Data: #{data}").interpolate(this.random);
    },

    pushScene: function() {
        this.controller.stageController.pushScene("main", RandomManager.newId());
    },
    cloneScene: function() {
        StageManager.cloneSceneIntoNewStage(this.controller);
    },
    newData: function() {
        this.random.newData();
    },
};
