var SlideshowTimer;

(function() {
const SLIDE_DURATION = 5000;

SlideshowTimer = function(controller, next) {
    this.controller = controller;
    this.showNext = next;
};

SlideshowTimer.prototype = {
    start: function(fullIter) {
        // Short circuit autotransitions
        if (this.disableAutoTransition) {
            return;
        }

        // Make sure that we don't have multiple queued timers
        this.stop();

        var self = this,
            timeout = SLIDE_DURATION;
        if (!fullIter && this.timerStart) {
            // Wait the remainder of the timeout, but if we have a short time left
            // then add some more time so the user has a chance to interact with the app
            // some more before the UI disappears.
            timeout = Math.max(timeout - this.timeElapsed, 1000);
        } else {
            this.timeElapsed = 0;
        }
        this.showEntryTimeout = this.controller.window.setTimeout(
                function() {
                    self.showNext();
                }, timeout);
        this.timerStart = Date.now();
    },
    stop: function() {
        if (this.showEntryTimeout) {
            this.controller.window.clearTimeout(this.showEntryTimeout);
            delete this.showEntryTimeout;

            var now = Date.now();
            this.timeElapsed += now - this.timerStart;
        }
    },
    toggleDisabledFlag: function() {
        this.disableAutoTransition = !this.disableAutoTransition;
        if (this.disableAutoTransition) {
            this.stop();
        } else {
            this.start(true);
        }
    }
};
})();
