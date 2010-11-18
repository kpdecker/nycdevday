/* Copyright 2010 Palm, Inc. All rights reserved. */
var SlideshowTimer;

(function() {
const SLIDE_DURATION = 5000;

/**
 * Utility class that manages the slideshow interval.
 *
 * @oaram contoller SceneController Scene controller that the slideshow is displayed in.
 * @param next function Callback function that is executed when the slideshow interval elapses.
 */
SlideshowTimer = function(controller, next) {
    this.controller = controller;
    this.showNext = next;
};

SlideshowTimer.prototype = {
    /**
     * Begin waiting for the next interval.
     *
     * @param fullIter boolean Truthy to reset the total wait time counter and wait for a complete interval.
     */
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
        Mojo.Log.info("Init dock timer: timeout: %d time: %d elapsed: %d", timeout, this.timerStart, this.timeElapsed);
    },
    /**
     * Stop the current interval execution.
     */
    stop: function() {
        if (this.showEntryTimeout) {
            this.controller.window.clearTimeout(this.showEntryTimeout);
            delete this.showEntryTimeout;

            var now = Date.now();
            this.timeElapsed += now - this.timerStart;
            Mojo.Log.info("Stop dock timer: now: %d time: %d elapsed: %d", now, this.timerStart, this.timeElapsed);
        }
    },
    /**
     * Enable or disable the slideshow. When disabled the start function is ignored.
     */
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
