/* Copyright 2010 Palm, Inc. All rights reserved. */
/*globals Element:false */
var FlyinAnimation;

(function() {

/*-------------------------------*
 * Worker methods
 *-------------------------------*/
function getClassQuery(className, negate) {
    return negate ? (":not(." + className + ")") : ("." + className);
}
function getClassNameApply(remove) {
    return remove ? Element.removeClassName : Element.addClassName;
}

function flyElement(anim, className, query, complete) {
    var el = anim.el.querySelector(query);
    if (!el) {
        complete();
        return;
    }

    function transitionEnd() {
        anim.cleanupFly(true);

        flyElement(anim, className, query, complete);
    }
    anim.cleanupFly = function(notComplete) {
        el.removeEventListener("webkitTransitionEnd", transitionEnd, true);
        anim.cleanupFly = undefined;

        if (!notComplete) {
            complete();
        }
    };

    // Use the webKitTransitionEnd event to deermine when the transaction has completed successfully.
    el.addEventListener("webkitTransitionEnd", transitionEnd, true);

    if (!el.hasClassName(className)) {
        el.addClassName(className);
    } else {
        el.removeClassName(className);
    }
}

/**
 * Helper class that implements a flyin and flyout effect for all elements that have the elementClassName defined.
 *
 * Each element with the given class name will be displayed or hidden per the parameters to flyIn and flyOut sequentially.
 * The animation order is defined by the order of elements in the DOM, using the ordering defined by querySelectorAll
 *
 * @param el Node Root node for the animation
 * @param elementClassName String CSS class name that will be used to query for elements that need to be animated.
 */
FlyinAnimation = function(el, elementClassName) {
    this.el = el;
    this.elementClassName = elementClassName;
};

FlyinAnimation.prototype = {
    /** State position constant for elements that are hidden of the left side of the viewport */
    LEFT: "left",
    /** State position constant for elements that are currently visible */
    CENTER: "center",
    /** Stage position constant for elements that are hidden of the right side of the viewport */
    RIGHT: "right",

    /**
     * Fly out all elements.
     *
     * @param rightSide boolean Flyout should fly out the right side of the screen.
     * @param complete function Callback function that is executed once the animation has completed for all elements.
     */
    flyOut: function(rightSide, complete) {
        var className = rightSide ? "visible" : "flyout",
            query = getClassQuery(this.elementClassName) + getClassQuery(className, !rightSide);

        flyElement(this, className, query, complete);
    },

    /**
     * Fly out all elements.
     *
     * @param rightSide boolean Flyout should fly out the right side of the screen.
     * @param complete function Callback function that is executed once the animation has completed for all elements.
     */
    flyIn: function(rightSide, complete) {
        var className = rightSide ? "visible" : "flyout",
            query = getClassQuery(this.elementClassName) + getClassQuery(className, rightSide);

        flyElement(this, className, query, complete);
    },

    /**
     * Retreves the CSS classes that should be applied to an element, in addition to elementClassName, in order to display
     * display that element in the given state.
     *
     * @param pos {LEFT, CENTER, RIGHT} Desired element state
     * @return String Collection of " " separated CSS class names needed for the given state.
     */
    getState: function(pos) {
        if (pos === this.LEFT) {
            return "visible flyout";
        } else if (pos === this.CENTER) {
            return "visible";
        } else {
            return "";
        }
    },

    /**
     * Snaps all elements to the desired position.
     *
     * @param pos {LEFT, CENTER, RIGHT} Desired element state
     */
    resetAllToState: function(pos) {
        var state = this.getState(pos),
            els = this.el.querySelectorAll(getClassQuery(this.elementClassName)),
            len = els.length;
        var states = {
            visible: getClassNameApply(state.indexOf("visible") > -1),
            flyout: getClassNameApply(state.indexOf("flyout") > -1)
        };

        for (var i = 0; i < len; i++) {
            // Reset all of the elements to the desired state
            var el = els[i];
            el.addClassName("snap-to");
            states.flyout.call(el, "flyout");
            states.visible.call(el, "visible");
            el.removeClassName("snap-to");
        }
    },
};

})();
