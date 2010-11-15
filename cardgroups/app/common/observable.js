/* Copyright 2009 Palm, Inc.  All rights reserved. */
function Observable() {
    this.observers = [];
}

Observable.prototype = {
    // This is potentially dangerous.  Whenever observe is called, stopObserving needs to be called when
    // the scene is cleaned up
    observe: function(fn){
        this.observers.push(fn);
    },
    // method signature must be the same object that was passed into observe()
    stopObserving: function(fn){
        // iterate over observers and remove this function if a match is found
        for (var i = 0; i < this.observers.length; i++) {
            if (this.observers[i] === fn) {
                this.observers.splice(i, 1);
                break;
            }
        }
    },
    notifyObservers: function(data) {
        for(var i=0; i<this.observers.length; i++) {
            try {
                this.observers[i](data);
            } catch (err) {
                Mojo.Log.error("Error processing notifyObservers: %s %s", err, err && err.stack);
            }
        }
    }
}
