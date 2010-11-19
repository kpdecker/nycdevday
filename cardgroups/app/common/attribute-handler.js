/* Copyright 2010 Palm, Inc. All rights reserved. */
var AttributeHandler;

// Scope block
(function() {

function getAncestorWithAttrs(targetElement, attrs) {
    function loadAttrs(el) {
        var found = false;
        for (var i in attrs) {
            if (attrs.hasOwnProperty(i)) {
                attrs[i] = el.getAttributeNode(i);
                found = found || !!attrs[i];
            }
        }
        return found;
    }
    if (targetElement && loadAttrs(targetElement)) {
        return targetElement;
    }

    var attrNames = [];
    for (var i in attrs) {
        if (attrs.hasOwnProperty(i)) {
            attrNames.push(i);
        }
    }
    targetElement = targetElement.up("[" + attrNames.join("],[") + "]");
    if (targetElement && loadAttrs(targetElement)) {
        return targetElement;
    }
};

AttributeHandler = {
    /**
     * Example event handler implementing attribute-based actions.
     *
     * Launches the photos scene whenever an element with the x-card-group-photo-target attribute is launched.
     */
    handleAttrItemTap: function(stageController, event) {
        var attrs = {
            "x-card-group-album-target": undefined,
            "x-card-group-photo-target": undefined,
        };

        // Determine if the target or any of it's parent elements define one of the action attributes.
        var targetElement = getAncestorWithAttrs(event.target, attrs);
        if (!targetElement) {
            return;
        }

        var albumAttachmentTarget = attrs["x-card-group-album-target"],
            photoAttachmentTarget = attrs["x-card-group-photo-target"];

        // Handle any of the action attributes, if defined
        if (albumAttachmentTarget) {
            /* NOP: Example used to demonstrate having multiple attribute types in this handler. */
            return true;
        } else if (photoAttachmentTarget) {
            // push the photo scene (optionally to a new stage if a Mod+Tap occured)
            var stageController = StageManager.stageControllerFromEvent(stageController, event);
            StageManager.pushOrCreateScene(stageController, "photo", photoAttachmentTarget.value);
            
            return true;
        }
    },
};

})();
