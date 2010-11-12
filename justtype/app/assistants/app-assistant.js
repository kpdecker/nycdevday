function AppAssistant(appController) {
};

AppAssistant.prototype = {
    handleLaunch: function(params){
        Mojo.Log.info("handleLaunch: %j", params);

        // Create the main scene if we do not already have one
        var proxy = this.controller.getStageProxy("main");
        if (!proxy) {
            // The stage controller has not been created
            this.controller.createStageWithCallback({
                    name: "main",
                    lightweight: true,
                },
                function(controller) {
                    controller.pushScene("main");
                },
                Mojo.Controller.StageType.card);
        } else {
            var controller = this.controller.getStageController("main");
            controller && controller.activate();
        }

        // If we were passed the cross app API parameter to the main stage
        if (params.status) {
            this.delegateToSupportingScene("main", "populateStatus", params.status);
        }
    },

    /**
     * Delegation utility. Calls the first scene assistant who has an instance of delegateName.
     * If the stage is still proxied calls proxy.delegateToSceneAssistant.
     */
    delegateToSupportingScene: function(stageName, delegateName, params) {
        var controller = this.controller.getStageController(stageName),
            proxy = this.controller.getStageProxy(stageName);
        if (controller) {
            // The scene if fully initialized, we delegate directly, walking on the scene stack until we
            // find a scene that supports this operation
            var scenes = controller.getScenes(),
                len = scenes.length;
            for (var i = 0; i < len; i++) {
                var assistant = scenes[i].assistant,
                    delegateFn = assistant[delegateName];
                if (delegateFn) {
                    delegateFn.call(assistant, params);
                    break;
                }
            }
        } else if (proxy) {
            // The scene is in the process of init, delegate using the Mojo API
            proxy.delegateToSceneAssistant(delegateName, params);
        }
    },
};
