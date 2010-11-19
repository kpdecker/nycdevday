/* Copyright 2010 Palm, Inc. All rights reserved. */
/*globals ReferenceCountCache:false, Random:false */
var RandomManager;

(function() {
    var randomCache = new ReferenceCountCache(),
        counter = 0;

    RandomManager = {
        newId: function() {
            return counter++;
        },
        get: function(id) {
            var random = randomCache.get(id);
            if (!random) {
                random = new Random(id);
                randomCache.set(id, random);
            }
            return random;
        },
        release: function(id) {
            randomCache.release(id.id || id);
        }
    };
})();
