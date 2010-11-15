var ReferenceCountCache = function() {
    var cache = {};

    this.get = function(name) {
        var entry = cache[name];
        if (entry) {
            entry.count++;
            return entry.value;
        }
    };
    this.set = function(name, value) {
        cache[name] = { value: value, count: 1 };
    };
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
