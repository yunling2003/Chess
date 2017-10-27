define("CacheProvider", ["db/chessdb"], function (chessdb) {
  var instance;

  function CacheProvider() {
    if (instance) {
      return instance;
    }

    instance = this;

    this._cache = {};
  }

  CacheProvider.prototype = {
    get: function (k) {
      return this._cache[k] || undefined;
    },

    set: function (k, v) {
      this._cache[k] = v;
    },

    clear: function (k) {
      delete this._cache[k];
    }
  };

  return {
    CacheProvider: CacheProvider
  };
});