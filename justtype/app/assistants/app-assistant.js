function AppAssistant(appController) {
};

AppAssistant.prototype = {
    handleLaunch: function(params){
        Mojo.Log.info("handleLaunch: %j", params);
        this.controller.createStageWithCallback({
                name: "main",
                lightweight: true,
            },
            function(controller) {
                controller.pushScene("main", params);
            },
            Mojo.Controller.StageType.card);
    },

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
