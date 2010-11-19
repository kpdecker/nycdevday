/* Copyright 2010 Palm, Inc. All rights reserved. */

/**
 * Cache with reference-counted element removal.
 */
var ReferenceCountCache = function() {
    var cache = {};

    /**
     * Retrieve the element with the given name, if one exists.
     * This method will increment the reference count for the element and
     * must have a matching release call.
     *
     * @param name String Cache element reference.
     * @return Value stored in the cache
     */
    this.get = function(name) {
        var entry = cache[name];
        if (entry) {
            entry.count++;
            return entry.value;
        }
    };

    /**
     * Insert an element into the cache. This element will have a refrence
     * count number of one and must be paired with a release call to remove
     * the element from the cache and allow for garbage collection.
     *
     * @param name String Cache element reference
     * @param value Object Value to store in the cache
     */
    this.set = function(name, value) {
        cache[name] = { value: value, count: 1 };
    };

    /**
     * Decreases the reference count for the given element. If the count drops
     * to zero then the object will be removed from the cache and available for
     * garbage collection.
     *
     * @param name String Cache element reference
     */
    this.release = function(name) {
        var entry = cache[name];
        if (entry) {
            entry.count--;
            if (entry.count <= 0) {
                delete cache[name];
            }
        }
    };
};
