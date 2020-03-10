// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"helpers.js":[function(require,module,exports) {
var clamp = function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
};

var flipP = function flipP(p) {
  return p >= 0 ? Math.abs(p - 1) : Math.abs(p) - 1;
};

var flipVal = function flipVal(val, min, max) {
  return Math.abs(val * (Math.sign(val) || 1) - max) + min;
};

var pToVal = function pToVal(p, zero, hundred) {
  return p * (hundred - zero) + zero;
};

function valToP(value, min, max) {
  if (min > max) {
    ;
    var _ref = [max, min];
    min = _ref[0];
    max = _ref[1];
    value = flipVal(value, min, max);
  }

  return (value - min) / (max - min);
}

function valToPwMid(value, min, max) {
  var turn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : pToVal(0.5, min, max);

  if (min > max) {
    ;
    var _ref2 = [max, min];
    min = _ref2[0];
    max = _ref2[1];
    turn = flipVal(turn, min, max);
    value = flipVal(value, min, max);
  }

  return value < turn ? (value - turn) / (turn - min) : (value - turn) / (max - turn);
}

var random = function random(min, max) {
  var mathFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var w = Math.random() * (max - min) + min;
  return mathFunc == null ? w : Math[mathFunc](w);
};

var setCssProperties = function setCssProperties(el) {
  for (var _len = arguments.length, pairs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    pairs[_key - 1] = arguments[_key];
  }

  return pairs.forEach(function (pair) {
    return el.style.setProperty(pair[0], pair[1]);
  });
};

var stayInLoop = function stayInLoop(value, min, max) {
  while (value < min || value > max) {
    value = value < min ? max - Math.abs(min - value) + 1 : min + Math.abs(max - value) - 1;
  }

  return value;
};

var wait = function wait(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
};

var promiseWhile = function promiseWhile(data, condition, action) {
  var whilst = function whilst(data) {
    console.log('turn');
    return condition(data) ? action(data).then(whilst) : Promise.resolve(data);
  };

  return whilst(data);
};

var getWindowSize = function getWindowSize() {
  var body = document.body,
      html = document.documentElement;
  return {
    height: window.innerHeight,
    width: window.innerWidth,
    fullHeight: Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
  };
};

var getUrlValues = function getUrlValues() {
  // returns dictionary with key & value pars from URL
  var urlString = location.search.substring(1);
  if (urlString === '') return;
  var dict = {};
  urlString.split('&').forEach(function (exp) {
    if (exp.search(/=/) == -1) {
      // if in URL there was no key value par but only one value:
      dict[exp] = null;
    } else {
      var pair = exp.split('=');
      dict[pair[0]] = decodeURIComponent(pair[1]);
    }
  });
  return dict;
};

var getUrlValue = function getUrlValue(key) {
  // returns true / false if key is present or its value if present
  var url = location.search.substring(1);
  if (url === '') return false;
  if (url.search(/=/) == -1 && url == key) return true;else {
    var val;
    url.split('&').forEach(function (exp) {
      var pair = exp.split('=');
      if (pair[0] == key) val = pair[1];
    });
    return decodeURIComponent(val);
  }
  return false;
};

function setUrlVar() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var dictionary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var dict = dictionary || getUrlValues() || {},
      string = '?';
  if (key !== null) dict[key] = value;

  for (var k in dict) {
    string += dict[k] !== null ? k + '=' + encodeURIComponent(dict[k]) + '&' : k + '&';
  }

  history.replaceState(null, null, location.pathname + string.slice(0, -1));
}

function delUrlVal(key) {
  var dict = getUrlValues() || {};
  console.log(dict);

  for (var k in dict) {
    if (k == key) delete dict[key];
  }

  console.log(dict);
  setUrlVar(null, null, dict);
}

var URL = {
  set: setUrlVar,
  get: getUrlValue,
  getDict: getUrlValues,
  del: delUrlVal
};

function addMultiEventListener(el, s, fn) {
  s.split(' ').forEach(function (e) {
    return el.addEventListener(e, fn, false);
  });
} // Usage:
// addMultiEventListener(window, 'resize scroll', () => { code... });

/*!
 * Serialize all form data into a query string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   form The form to serialize
 * @return {String}      The serialized form data
 */


var serialize = function serialize(form) {
  // Setup our serialized data
  var serialized = []; // Loop through each field in the form

  for (var i = 0; i < form.elements.length; i++) {
    var field = form.elements[i]; // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields

    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue; // If a multi-select, get all selections

    if (field.type === 'select-multiple') {
      for (var n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) continue;
        serialized.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[n].value));
      }
    } else if (field.type !== 'checkbox' && field.type !== 'radio' || field.checked) {
      // Convert field data to a query string
      serialized.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
    }
  }

  return serialized.join('&');
};

module.exports = {
  clamp: clamp,
  valToP: valToP,
  pToVal: pToVal,
  random: random,
  getWindowSize: getWindowSize,
  stayInLoop: stayInLoop,
  URL: URL,
  addMultiEventListener: addMultiEventListener,
  serialize: serialize
};
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51733" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","helpers.js"], null)
//# sourceMappingURL=/helpers.aba008cc.js.map