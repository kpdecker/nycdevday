/* Copyright 2010 Palm, Inc. All rights reserved. */
function DockAssistant() {
    this.mouseDownHandler = this.mouseDown.bindAsEventListener(this);
    this.mouseUpHandler = this.mouseUp.bindAsEventListener(this);
    this.dblClickHandler = this.dblclick.bindAsEventListener(this);
    this.flickHandler = this.flick.bindAsEventListener(this);

    this.curIndex = -1;
}

DockAssistant.prototype = {
    setup: function() {
        this.flyin = new FlyinAnimation(this.controller.sceneElement, "flyin-element");
        this.timer = new SlideshowTimer(this.controller, this.showNext.bind(this));

        this.controller.listen(this.controller.sceneElement, "mousedown", this.mouseDownHandler);
        this.controller.listen(this.controller.sceneElement, "mouseup", this.mouseUpHandler);
        this.controller.listen(this.controller.sceneElement, "dblclick", this.dblClickHandler);
        this.controller.listen(this.controller.sceneElement, Mojo.Event.flick, this.flickHandler);

        this.showNext();
    },
    cleanup: function() {
        this.controller.stopListening(this.controller.sceneElement, "mousedown", this.mouseDownHandler);
        this.controller.stopListening(this.controller.sceneElement, "mouseup", this.mouseUpHandler);
        this.controller.stopListening(this.controller.sceneElement, "dblclick", this.dblClickHandler);
        this.controller.stopListening(this.controller.sceneElement, Mojo.Event.flick, this.flickHandler);
    },

    /*-----------------------*
     * User Event Handlers
     *-----------------------*/
    mouseDown: function(event) {
        this.timer.stop();
    },
    mouseUp: function(event) {
        this.timer.start(false);
    },
    dblclick: function(event) {
        this.timer.toggleDisabledFlag();
    },
    flick: function(event) {
        if (event.velocity.x < 0) {
            this.showNext();
        } else {
            this.showPrev();
        }
    },

    /*-----------------------*
     * Slideshow Movement
     *-----------------------*/
    showNext: function() {
        this.curIndex++;
        this.loadItem(false);
    },
    showPrev: function() {
        if (!this.curIndex) {
            return;
        }

        this.curIndex--;
        this.loadItem(true);
    },

    /*-----------------------*
     * Item Load and Render
     *-----------------------*/
    loadItem: function(reverse) {
        var entry = DataModel[this.curIndex];
        if (entry) {
            // Always display status messages
            var dockContent = "";
            if (entry.parsedMessage) {
                dockContent = Mojo.View.render({template: "dock/content-message", object: entry});
            }

            if (entry.src) {
                dockContent += Mojo.View.render({template: "dock/content-photo", object: entry});
            }

            entry.dockContent = dockContent;
            this.showEntry(reverse, entry);
        } else if (!reverse) {
            // Wrap
            this.curIndex = -1;
            this.showNext();
        }
    },

    showEntry: function(reverse, result) {
        var self = this;
        function flyoutComplete() {
            // Reset the scroller to the top
            var scroller = Mojo.View.getScrollerForElement(self.controller.sceneElement);
            if (scroller) {
                scroller.mojo.scrollTo(0, 0, false, false);
            }

            // Display the new content
            self.renderEntry(result, self.flyin.getState(reverse ? self.flyin.LEFT : self.flyin.RIGHT));

            self.flyin.flyIn(!reverse, flyinComplete);
        }
        function flyinComplete() {
            // Setup the next iteration
            self.timer.start(true);
        }

        // Clear out anything that may be running already
        this.timer.stop();

        // Begin the animation
        this.flyin.flyOut(reverse, flyoutComplete);
    },
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
};
