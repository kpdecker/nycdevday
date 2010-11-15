function MainAssistant(unique) {
    this.unique = unique || (Math.random()*1000)|0;
};

MainAssistant.prototype = {
    setup: function() {
        var uniqueEl = this.controller.sceneElement.querySelector(".unique-id");
        uniqueEl.textContent = $L("Unique Id: #{unique}").interpolate({ unique: this.unique });
    },
    cleanup: function() {
    },
};
