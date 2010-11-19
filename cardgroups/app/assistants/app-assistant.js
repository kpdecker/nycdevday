/* Copyright 2010 Palm, Inc. All rights reserved. */
/*globals Mojo:false, StageManager:false, RandomManager:false */
function AppAssistant() {}

AppAssistant.prototype = {
    setup: function() {
        StageManager.init();
    },
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
                    controller.pushScene("main", RandomManager.newId());
                },
                Mojo.Controller.StageType.card);
        } else {
            var controller = this.controller.getStageController("main");
            controller && controller.activate();
        }
    },
};
