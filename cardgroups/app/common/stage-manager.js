/* Copyright 2010 Palm, Inc. All rights reserved. */
var StageManager;

(function() {
    var stageCounter = 0,
        appController;

    /**
     * Helper methods for creating and managing stages and scenes.
     */
    StageManager = {
        /**
         * Init method. Must be called during or after the app assistant setup.
         */
        init: function() {
            appController = Mojo.Controller.getAppController();
        },

        /**
         * Unique stage name generator.
         */
        getStageName: function() {
            return "facebookStage-"+(stageCounter++);
        },

        /**
         * Helper method that determines if the the Orange/White key or the Meta key was pressed during a tap event.
         *
         * @param stageController Current stage controller
         * @param event Event to examine
         * @return stageController if either key was not pressed, undefined if a modified key was pressed.
         */
        stageControllerFromEvent: function(stageController, event) {
            if (event.originalEvent) {
                // listTap Event
                event = event.originalEvent;
            }
            if (event.up) {
                // tap Event
                event = event.up;
            }

            if (!event.metaKey && !event.altKey) {
                return stageController;
            }
        },

        /**
         * Create a scene, optionally creating in it a new stage.
         *
         * @param stageController StageController to push the scene to. If undefined, create a new stage.
         * @param sceneName Name of the scene to push.
         * @param arguments... Arguments passed to the pushScene method
         */
        pushOrCreateScene: function(stageController, sceneName) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (!stageController) {
                StageManager.createStage(
                        function(controller) {
                            controller.pushScene.apply(controller, args);
                        });
            } else {
                stageController.pushScene.apply(stageController, args);
            }
        },

        /**
         * Helper utility for creating a new card stage
         */
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

        /**
         * Clones the given scene, pushing in the destination stage.
         *
         * @param sceneController SceneController Scene to clone
         * @param destinationController StageController Stage to push the cloned scene on to.
         */
        cloneSceneIntoStage: function(sceneController, destinationController) {
            if (!sceneController._sceneCloneArgs) {
                throw new Error("Scene missing clone args: " + sceneController.sceneName);
            }
            destinationController.pushScene.apply(destinationController, sceneController._sceneCloneArgs);
        },

        /**
         * Clones the given scene into a new stage.
         *
         * @param sceneController SceneController Scene to clone
         */
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
