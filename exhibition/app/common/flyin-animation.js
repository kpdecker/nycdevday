/* Copyright 2010 Palm, Inc. All rights reserved. */
var FlyinAnimation;

(function() {

FlyinAnimation = function(el, elementClassName) {
    this.el = el;
    this.elementClassName = elementClassName;
};

FlyinAnimation.prototype = {
    LEFT: "left",
    CENTER: "center",
    RIGHT: "right",

    flyOut: function(rightSide, complete) {
        var className = rightSide ? "visible" : "flyout",
            query = getClassQuery(this.elementClassName) + getClassQuery(className, !rightSide);

        flyElement(this, className, query, complete);
    },
    flyIn: function(rightSide, complete) {
        var className = rightSide ? "visible" : "flyout",
            query = getClassQuery(this.elementClassName) + getClassQuery(className, rightSide);

        flyElement(this, className, query, complete);
    },

    getState: function(pos) {
        if (pos === this.LEFT) {
            return "visible flyout";
        } else if (pos === this.CENTER) {
            return "visible";
        } else {
            return "";
        }
    },
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
    el.addEventListener("webkitTransitionEnd", transitionEnd, true);
    if (!el.hasClassName(className)) {
        el.addClassName(className);
    } else {
        el.removeClassName(className);
    }
}

})();
