/* Copyright 2010 Palm, Inc. All rights reserved. */
var StageManager;

(function() {
    var stageCounter = 0,
        appController;

    StageManager = {
        init: function() {
            appController = Mojo.Controller.getAppController();
        },
        getStageName: function() {
            return "facebookStage-"+(stageCounter++);
        },

        createStage: function(onInit) {
            Mojo.Log.info("StageManager.createStage");
            var name = StageManager.getStageName();
            appController.createStageWithCallback({
                    name: name,
                    lightweight: true,
                },
                onInit,
                Mojo.Controller.StageType.card);
        },

        cloneSceneIntoStage: function(sceneController, destinationController) {
            if (!sceneController._sceneCloneArgs) {
                throw new Error("Scene missing clone args: " + sceneController.sceneName);
            }
            destinationController.pushScene.apply(destinationController, sceneController._sceneCloneArgs);
        },
        cloneSceneIntoNewStage: function(sceneController) {
            StageManager.createStage(
                function(stageController) {
                    StageManager.cloneSceneIntoStage(sceneController, stageController);
                });
        },
    };
})();

// We need to override one of the core scene generation logic to record the scene params
// This allows us to attempt to clone the scene, although any operations that have
// side effects on any of this data will break this functionality
(function($super){
    Mojo.Controller.StageController.prototype._prepareNewScene = function(sceneArguments, myArguments) {
        var ret = $super.call(this, sceneArguments, myArguments);
        if (ret) {
            var cloneArgs = myArguments.slice(0);
            cloneArgs.unshift(sceneArguments);
            ret._sceneCloneArgs = cloneArgs;
            Mojo.Log.info("Clone Scene Args: %j", ret._sceneCloneArgs);
        }
        return ret;
    };
})(Mojo.Controller.StageController.prototype._prepareNewScene);
