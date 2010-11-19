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
    handleAttrItemTap: function(stageController, event) {
        var attrs = {
            "x-card-group-album-target": undefined,
            "x-card-group-photo-target": undefined,
        };

        var targetElement = getAncestorWithAttrs(event.target, attrs);
        if (!targetElement) {
            return;
        }

        var albumAttachmentTarget = attrs["x-card-group-album-target"],
            photoAttachmentTarget = attrs["x-card-group-photo-target"];

        // if the target is a link, launch the browser
        if (albumAttachmentTarget) {
            /* NOP: Example used to demonstrate having multiple attribute types in this handler. */
            return true;
        } else if (photoAttachmentTarget) {
            var stageController = StageManager.stageControllerFromEvent(stageController, event);
            StageManager.pushOrCreateScene(stageController, "photo", photoAttachmentTarget.value);
            
            return true;
        }
    },
};

})();
