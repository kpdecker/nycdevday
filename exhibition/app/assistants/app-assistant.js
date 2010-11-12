function AppAssistant() {}

AppAssistant.prototype = {
    handleLaunch: function(params){
        Mojo.Log.info("handleLaunch: %j", params);

        if (params.dockMode) {
            this.createOrActivateStage("dock", "dock", Mojo.Controller.StageType.dockMode);
        } else {
            // Create the main scene if we do not already have one
            this.createOrActivateStage("main", "main", Mojo.Controller.StageType.card);
        }
    },

    createOrActivateStage: function(stageName, sceneName, stageType) {
        var proxy = this.controller.getStageProxy(stageName);
        if (!proxy) {
            // The stage controller has not been created
            this.controller.createStageWithCallback({
                    name: stageName,
                    lightweight: true,
                },
                function(controller) {
                    controller.pushScene(sceneName);
                },
                stageType);
        } else {
            var controller = this.controller.getStageController(stageName);
            controller && controller.activate();
        }
    }
};
