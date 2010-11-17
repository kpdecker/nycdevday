function DockAssistant() {}

DockAssistant.prototype = {
    setup: function() {
    },
    cleanup: function() {
    renderEntry: function(result, flyState) {
        // Render the thing
        this.controller.sceneElement.innerHTML = Mojo.View.render({
            template: "dock/item-template",
            object: {
                flyState: flyState,
                pic_square: result.pic_square,
                name: result.name,
                content: result.dockContent,
            }
        });
    },
    },
};
