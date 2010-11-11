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
};
