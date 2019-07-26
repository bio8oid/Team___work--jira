// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function(modules, cache, entry, globalName) {
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {}
    ];
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
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
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
})(
  {
    '../../node_modules/ev-emitter/ev-emitter.js': [
      function(require, module, exports) {
        var define;
        var global = arguments[3];
        /**
         * EvEmitter v1.1.0
         * Lil' event emitter
         * MIT License
         */

        /* jshint unused: true, undef: true, strict: true */

        (function(global, factory) {
          // universal module definition
          /* jshint strict: false */ /* globals define, module, window */
          if (typeof define === 'function' && define.amd) {
            // AMD - RequireJS
            define(factory);
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS - Browserify, Webpack
            module.exports = factory();
          } else {
            // Browser globals
            global.EvEmitter = factory();
          }
        })(typeof window !== 'undefined' ? window : this, function() {
          'use strict';

          function EvEmitter() {}

          var proto = EvEmitter.prototype;

          proto.on = function(eventName, listener) {
            if (!eventName || !listener) {
              return;
            }
            // set events hash
            var events = (this._events = this._events || {});
            // set listeners array
            var listeners = (events[eventName] = events[eventName] || []);
            // only add once
            if (listeners.indexOf(listener) == -1) {
              listeners.push(listener);
            }

            return this;
          };

          proto.once = function(eventName, listener) {
            if (!eventName || !listener) {
              return;
            }
            // add event
            this.on(eventName, listener);
            // set once flag
            // set onceEvents hash
            var onceEvents = (this._onceEvents = this._onceEvents || {});
            // set onceListeners object
            var onceListeners = (onceEvents[eventName] = onceEvents[eventName] || {});
            // set flag
            onceListeners[listener] = true;

            return this;
          };

          proto.off = function(eventName, listener) {
            var listeners = this._events && this._events[eventName];
            if (!listeners || !listeners.length) {
              return;
            }
            var index = listeners.indexOf(listener);
            if (index != -1) {
              listeners.splice(index, 1);
            }

            return this;
          };

          proto.emitEvent = function(eventName, args) {
            var listeners = this._events && this._events[eventName];
            if (!listeners || !listeners.length) {
              return;
            }
            // copy over to avoid interference if .off() in listener
            listeners = listeners.slice(0);
            args = args || [];
            // once stuff
            var onceListeners = this._onceEvents && this._onceEvents[eventName];

            for (var i = 0; i < listeners.length; i++) {
              var listener = listeners[i];
              var isOnce = onceListeners && onceListeners[listener];
              if (isOnce) {
                // remove listener
                // remove before trigger to prevent recursion
                this.off(eventName, listener);
                // unset once flag
                delete onceListeners[listener];
              }
              // trigger listener
              listener.apply(this, args);
            }

            return this;
          };

          proto.allOff = function() {
            delete this._events;
            delete this._onceEvents;
          };

          return EvEmitter;
        });
      },
      {}
    ],
    '../../node_modules/get-size/get-size.js': [
      function(require, module, exports) {
        var define;
        /*!
         * getSize v2.0.3
         * measure size of elements
         * MIT license
         */

        /* jshint browser: true, strict: true, undef: true, unused: true */
        /* globals console: false */

        (function(window, factory) {
          /* jshint strict: false */ /* globals define, module */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define(factory);
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory();
          } else {
            // browser global
            window.getSize = factory();
          }
        })(window, function factory() {
          'use strict';

          // -------------------------- helpers -------------------------- //

          // get a number from a string, not a percentage
          function getStyleSize(value) {
            var num = parseFloat(value);
            // not a percent like '100%', and a number
            var isValid = value.indexOf('%') == -1 && !isNaN(num);
            return isValid && num;
          }

          function noop() {}

          var logError =
            typeof console === 'undefined'
              ? noop
              : function(message) {
                  console.error(message);
                };

          // -------------------------- measurements -------------------------- //

          var measurements = [
            'paddingLeft',
            'paddingRight',
            'paddingTop',
            'paddingBottom',
            'marginLeft',
            'marginRight',
            'marginTop',
            'marginBottom',
            'borderLeftWidth',
            'borderRightWidth',
            'borderTopWidth',
            'borderBottomWidth'
          ];

          var measurementsLength = measurements.length;

          function getZeroSize() {
            var size = {
              width: 0,
              height: 0,
              innerWidth: 0,
              innerHeight: 0,
              outerWidth: 0,
              outerHeight: 0
            };
            for (var i = 0; i < measurementsLength; i++) {
              var measurement = measurements[i];
              size[measurement] = 0;
            }
            return size;
          }

          // -------------------------- getStyle -------------------------- //

          /**
           * getStyle, get style of element, check for Firefox bug
           * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
           */
          function getStyle(elem) {
            var style = getComputedStyle(elem);
            if (!style) {
              logError(
                'Style returned ' +
                  style +
                  '. Are you running this code in a hidden iframe on Firefox? ' +
                  'See https://bit.ly/getsizebug1'
              );
            }
            return style;
          }

          // -------------------------- setup -------------------------- //

          var isSetup = false;

          var isBoxSizeOuter;

          /**
           * setup
           * check isBoxSizerOuter
           * do on first getSize() rather than on page load for Firefox bug
           */
          function setup() {
            // setup once
            if (isSetup) {
              return;
            }
            isSetup = true;

            // -------------------------- box sizing -------------------------- //

            /**
             * Chrome & Safari measure the outer-width on style.width on border-box elems
             * IE11 & Firefox<29 measures the inner-width
             */
            var div = document.createElement('div');
            div.style.width = '200px';
            div.style.padding = '1px 2px 3px 4px';
            div.style.borderStyle = 'solid';
            div.style.borderWidth = '1px 2px 3px 4px';
            div.style.boxSizing = 'border-box';

            var body = document.body || document.documentElement;
            body.appendChild(div);
            var style = getStyle(div);
            // round value for browser zoom. desandro/masonry#928
            isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
            getSize.isBoxSizeOuter = isBoxSizeOuter;

            body.removeChild(div);
          }

          // -------------------------- getSize -------------------------- //

          function getSize(elem) {
            setup();

            // use querySeletor if elem is string
            if (typeof elem === 'string') {
              elem = document.querySelector(elem);
            }

            // do not proceed on non-objects
            if (!elem || typeof elem !== 'object' || !elem.nodeType) {
              return;
            }

            var style = getStyle(elem);

            // if hidden, everything is 0
            if (style.display == 'none') {
              return getZeroSize();
            }

            var size = {};
            size.width = elem.offsetWidth;
            size.height = elem.offsetHeight;

            var isBorderBox = (size.isBorderBox = style.boxSizing == 'border-box');

            // get all measurements
            for (var i = 0; i < measurementsLength; i++) {
              var measurement = measurements[i];
              var value = style[measurement];
              var num = parseFloat(value);
              // any 'auto', 'medium' value will be 0
              size[measurement] = !isNaN(num) ? num : 0;
            }

            var paddingWidth = size.paddingLeft + size.paddingRight;
            var paddingHeight = size.paddingTop + size.paddingBottom;
            var marginWidth = size.marginLeft + size.marginRight;
            var marginHeight = size.marginTop + size.marginBottom;
            var borderWidth = size.borderLeftWidth + size.borderRightWidth;
            var borderHeight = size.borderTopWidth + size.borderBottomWidth;

            var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

            // overwrite width and height if we can get it from style
            var styleWidth = getStyleSize(style.width);
            if (styleWidth !== false) {
              size.width =
                styleWidth +
                // add padding and border unless it's already including it
                (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
            }

            var styleHeight = getStyleSize(style.height);
            if (styleHeight !== false) {
              size.height =
                styleHeight +
                // add padding and border unless it's already including it
                (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
            }

            size.innerWidth = size.width - (paddingWidth + borderWidth);
            size.innerHeight = size.height - (paddingHeight + borderHeight);

            size.outerWidth = size.width + marginWidth;
            size.outerHeight = size.height + marginHeight;

            return size;
          }

          return getSize;
        });
      },
      {}
    ],
    '../../node_modules/desandro-matches-selector/matches-selector.js': [
      function(require, module, exports) {
        var define;
        /**
         * matchesSelector v2.0.2
         * matchesSelector( element, '.selector' )
         * MIT license
         */

        /* jshint browser: true, strict: true, undef: true, unused: true */

        (function(window, factory) {
          /* global define: false, module: false */
          'use strict';
          // universal module definition
          if (typeof define === 'function' && define.amd) {
            // AMD
            define(factory);
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory();
          } else {
            // browser global
            window.matchesSelector = factory();
          }
        })(window, function factory() {
          'use strict';

          var matchesMethod = (function() {
            var ElemProto = window.Element.prototype;
            // check for the standard method name first
            if (ElemProto.matches) {
              return 'matches';
            }
            // check un-prefixed
            if (ElemProto.matchesSelector) {
              return 'matchesSelector';
            }
            // check vendor prefixes
            var prefixes = ['webkit', 'moz', 'ms', 'o'];

            for (var i = 0; i < prefixes.length; i++) {
              var prefix = prefixes[i];
              var method = prefix + 'MatchesSelector';
              if (ElemProto[method]) {
                return method;
              }
            }
          })();

          return function matchesSelector(elem, selector) {
            return elem[matchesMethod](selector);
          };
        });
      },
      {}
    ],
    '../../node_modules/fizzy-ui-utils/utils.js': [
      function(require, module, exports) {
        var define;
        /**
         * Fizzy UI utils v2.0.7
         * MIT license
         */

        /* jshint browser: true, undef: true, unused: true, strict: true */

        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */ /* globals define, module, require */

          if (typeof define === 'function' && define.amd) {
            // AMD
            define(['desandro-matches-selector/matches-selector'], function(
              matchesSelector
            ) {
              return factory(window, matchesSelector);
            });
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(window, require('desandro-matches-selector'));
          } else {
            // browser global
            window.fizzyUIUtils = factory(window, window.matchesSelector);
          }
        })(window, function factory(window, matchesSelector) {
          'use strict';

          var utils = {};

          // ----- extend ----- //

          // extends objects
          utils.extend = function(a, b) {
            for (var prop in b) {
              a[prop] = b[prop];
            }
            return a;
          };

          // ----- modulo ----- //

          utils.modulo = function(num, div) {
            return ((num % div) + div) % div;
          };

          // ----- makeArray ----- //

          var arraySlice = Array.prototype.slice;

          // turn element or nodeList into an array
          utils.makeArray = function(obj) {
            if (Array.isArray(obj)) {
              // use object if already an array
              return obj;
            }
            // return empty array if undefined or null. #6
            if (obj === null || obj === undefined) {
              return [];
            }

            var isArrayLike = typeof obj === 'object' && typeof obj.length === 'number';
            if (isArrayLike) {
              // convert nodeList to array
              return arraySlice.call(obj);
            }

            // array of single index
            return [obj];
          };

          // ----- removeFrom ----- //

          utils.removeFrom = function(ary, obj) {
            var index = ary.indexOf(obj);
            if (index != -1) {
              ary.splice(index, 1);
            }
          };

          // ----- getParent ----- //

          utils.getParent = function(elem, selector) {
            while (elem.parentNode && elem != document.body) {
              elem = elem.parentNode;
              if (matchesSelector(elem, selector)) {
                return elem;
              }
            }
          };

          // ----- getQueryElement ----- //

          // use element as selector string
          utils.getQueryElement = function(elem) {
            if (typeof elem === 'string') {
              return document.querySelector(elem);
            }
            return elem;
          };

          // ----- handleEvent ----- //

          // enable .ontype to trigger from .addEventListener( elem, 'type' )
          utils.handleEvent = function(event) {
            var method = 'on' + event.type;
            if (this[method]) {
              this[method](event);
            }
          };

          // ----- filterFindElements ----- //

          utils.filterFindElements = function(elems, selector) {
            // make array of elems
            elems = utils.makeArray(elems);
            var ffElems = [];

            elems.forEach(function(elem) {
              // check that elem is an actual element
              if (!(elem instanceof HTMLElement)) {
                return;
              }
              // add elem if no selector
              if (!selector) {
                ffElems.push(elem);
                return;
              }
              // filter & find items if we have a selector
              // filter
              if (matchesSelector(elem, selector)) {
                ffElems.push(elem);
              }
              // find children
              var childElems = elem.querySelectorAll(selector);
              // concat childElems to filterFound array
              for (var i = 0; i < childElems.length; i++) {
                ffElems.push(childElems[i]);
              }
            });

            return ffElems;
          };

          // ----- debounceMethod ----- //

          utils.debounceMethod = function(_class, methodName, threshold) {
            threshold = threshold || 100;
            // original method
            var method = _class.prototype[methodName];
            var timeoutName = methodName + 'Timeout';

            _class.prototype[methodName] = function() {
              var timeout = this[timeoutName];
              clearTimeout(timeout);

              var args = arguments;
              var _this = this;
              this[timeoutName] = setTimeout(function() {
                method.apply(_this, args);
                delete _this[timeoutName];
              }, threshold);
            };
          };

          // ----- docReady ----- //

          utils.docReady = function(callback) {
            var readyState = document.readyState;
            if (readyState == 'complete' || readyState == 'interactive') {
              // do async to allow for other scripts to run. metafizzy/flickity#441
              setTimeout(callback);
            } else {
              document.addEventListener('DOMContentLoaded', callback);
            }
          };

          // ----- htmlInit ----- //

          // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
          utils.toDashed = function(str) {
            return str
              .replace(/(.)([A-Z])/g, function(match, $1, $2) {
                return $1 + '-' + $2;
              })
              .toLowerCase();
          };

          var console = window.console;
          /**
           * allow user to initialize classes via [data-namespace] or .js-namespace class
           * htmlInit( Widget, 'widgetName' )
           * options are parsed from data-namespace-options
           */
          utils.htmlInit = function(WidgetClass, namespace) {
            utils.docReady(function() {
              var dashedNamespace = utils.toDashed(namespace);
              var dataAttr = 'data-' + dashedNamespace;
              var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
              var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
              var elems = utils
                .makeArray(dataAttrElems)
                .concat(utils.makeArray(jsDashElems));
              var dataOptionsAttr = dataAttr + '-options';
              var jQuery = window.jQuery;

              elems.forEach(function(elem) {
                var attr =
                  elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
                var options;
                try {
                  options = attr && JSON.parse(attr);
                } catch (error) {
                  // log error, do not initialize
                  if (console) {
                    console.error(
                      'Error parsing ' +
                        dataAttr +
                        ' on ' +
                        elem.className +
                        ': ' +
                        error
                    );
                  }
                  return;
                }
                // initialize
                var instance = new WidgetClass(elem, options);
                // make available via $().data('namespace')
                if (jQuery) {
                  jQuery.data(elem, namespace, instance);
                }
              });
            });
          };

          // -----  ----- //

          return utils;
        });
      },
      {
        'desandro-matches-selector':
          '../../node_modules/desandro-matches-selector/matches-selector.js'
      }
    ],
    '../../node_modules/flickity/js/cell.js': [
      function(require, module, exports) {
        var define;
        // Flickity.Cell
        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define(['get-size/get-size'], function(getSize) {
              return factory(window, getSize);
            });
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(window, require('get-size'));
          } else {
            // browser global
            window.Flickity = window.Flickity || {};
            window.Flickity.Cell = factory(window, window.getSize);
          }
        })(window, function factory(window, getSize) {
          'use strict';

          function Cell(elem, parent) {
            this.element = elem;
            this.parent = parent;

            this.create();
          }

          var proto = Cell.prototype;

          proto.create = function() {
            this.element.style.position = 'absolute';
            this.element.setAttribute('aria-hidden', 'true');
            this.x = 0;
            this.shift = 0;
          };

          proto.destroy = function() {
            // reset style
            this.unselect();
            this.element.style.position = '';
            var side = this.parent.originSide;
            this.element.style[side] = '';
          };

          proto.getSize = function() {
            this.size = getSize(this.element);
          };

          proto.setPosition = function(x) {
            this.x = x;
            this.updateTarget();
            this.renderPosition(x);
          };

          // setDefaultTarget v1 method, backwards compatibility, remove in v3
          proto.updateTarget = proto.setDefaultTarget = function() {
            var marginProperty =
              this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
            this.target =
              this.x +
              this.size[marginProperty] +
              this.size.width * this.parent.cellAlign;
          };

          proto.renderPosition = function(x) {
            // render position of cell with in slider
            var side = this.parent.originSide;
            this.element.style[side] = this.parent.getPositionValue(x);
          };

          proto.select = function() {
            this.element.classList.add('is-selected');
            this.element.removeAttribute('aria-hidden');
          };

          proto.unselect = function() {
            this.element.classList.remove('is-selected');
            this.element.setAttribute('aria-hidden', 'true');
          };

          /**
           * @param {Integer} factor - 0, 1, or -1
           **/
          proto.wrapShift = function(shift) {
            this.shift = shift;
            this.renderPosition(this.x + this.parent.slideableWidth * shift);
          };

          proto.remove = function() {
            this.element.parentNode.removeChild(this.element);
          };

          return Cell;
        });
      },
      { 'get-size': '../../node_modules/get-size/get-size.js' }
    ],
    '../../node_modules/flickity/js/slide.js': [
      function(require, module, exports) {
        var define;
        // slide
        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define(factory);
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory();
          } else {
            // browser global
            window.Flickity = window.Flickity || {};
            window.Flickity.Slide = factory();
          }
        })(window, function factory() {
          'use strict';

          function Slide(parent) {
            this.parent = parent;
            this.isOriginLeft = parent.originSide == 'left';
            this.cells = [];
            this.outerWidth = 0;
            this.height = 0;
          }

          var proto = Slide.prototype;

          proto.addCell = function(cell) {
            this.cells.push(cell);
            this.outerWidth += cell.size.outerWidth;
            this.height = Math.max(cell.size.outerHeight, this.height);
            // first cell stuff
            if (this.cells.length == 1) {
              this.x = cell.x; // x comes from first cell
              var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
              this.firstMargin = cell.size[beginMargin];
            }
          };

          proto.updateTarget = function() {
            var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
            var lastCell = this.getLastCell();
            var lastMargin = lastCell ? lastCell.size[endMargin] : 0;
            var slideWidth = this.outerWidth - (this.firstMargin + lastMargin);
            this.target =
              this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
          };

          proto.getLastCell = function() {
            return this.cells[this.cells.length - 1];
          };

          proto.select = function() {
            this.cells.forEach(function(cell) {
              cell.select();
            });
          };

          proto.unselect = function() {
            this.cells.forEach(function(cell) {
              cell.unselect();
            });
          };

          proto.getCellElements = function() {
            return this.cells.map(function(cell) {
              return cell.element;
            });
          };

          return Slide;
        });
      },
      {}
    ],
    '../../node_modules/flickity/js/animate.js': [
      function(require, module, exports) {
        var define;
        // animate
        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define(['fizzy-ui-utils/utils'], function(utils) {
              return factory(window, utils);
            });
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(window, require('fizzy-ui-utils'));
          } else {
            // browser global
            window.Flickity = window.Flickity || {};
            window.Flickity.animatePrototype = factory(window, window.fizzyUIUtils);
          }
        })(window, function factory(window, utils) {
          'use strict';

          // -------------------------- animate -------------------------- //

          var proto = {};

          proto.startAnimation = function() {
            if (this.isAnimating) {
              return;
            }

            this.isAnimating = true;
            this.restingFrames = 0;
            this.animate();
          };

          proto.animate = function() {
            this.applyDragForce();
            this.applySelectedAttraction();

            var previousX = this.x;

            this.integratePhysics();
            this.positionSlider();
            this.settle(previousX);
            // animate next frame
            if (this.isAnimating) {
              var _this = this;
              requestAnimationFrame(function animateFrame() {
                _this.animate();
              });
            }
          };

          proto.positionSlider = function() {
            var x = this.x;
            // wrap position around
            if (this.options.wrapAround && this.cells.length > 1) {
              x = utils.modulo(x, this.slideableWidth);
              x = x - this.slideableWidth;
              this.shiftWrapCells(x);
            }

            this.setTranslateX(x, this.isAnimating);
            this.dispatchScrollEvent();
          };

          proto.setTranslateX = function(x, is3d) {
            x += this.cursorPosition;
            // reverse if right-to-left and using transform
            x = this.options.rightToLeft ? -x : x;
            var translateX = this.getPositionValue(x);
            // use 3D tranforms for hardware acceleration on iOS
            // but use 2D when settled, for better font-rendering
            this.slider.style.transform = is3d
              ? 'translate3d(' + translateX + ',0,0)'
              : 'translateX(' + translateX + ')';
          };

          proto.dispatchScrollEvent = function() {
            var firstSlide = this.slides[0];
            if (!firstSlide) {
              return;
            }
            var positionX = -this.x - firstSlide.target;
            var progress = positionX / this.slidesWidth;
            this.dispatchEvent('scroll', null, [progress, positionX]);
          };

          proto.positionSliderAtSelected = function() {
            if (!this.cells.length) {
              return;
            }
            this.x = -this.selectedSlide.target;
            this.velocity = 0; // stop wobble
            this.positionSlider();
          };

          proto.getPositionValue = function(position) {
            if (this.options.percentPosition) {
              // percent position, round to 2 digits, like 12.34%
              return Math.round((position / this.size.innerWidth) * 10000) * 0.01 + '%';
            } else {
              // pixel positioning
              return Math.round(position) + 'px';
            }
          };

          proto.settle = function(previousX) {
            // keep track of frames where x hasn't moved
            if (
              !this.isPointerDown &&
              Math.round(this.x * 100) == Math.round(previousX * 100)
            ) {
              this.restingFrames++;
            }
            // stop animating if resting for 3 or more frames
            if (this.restingFrames > 2) {
              this.isAnimating = false;
              delete this.isFreeScrolling;
              // render position with translateX when settled
              this.positionSlider();
              this.dispatchEvent('settle', null, [this.selectedIndex]);
            }
          };

          proto.shiftWrapCells = function(x) {
            // shift before cells
            var beforeGap = this.cursorPosition + x;
            this._shiftCells(this.beforeShiftCells, beforeGap, -1);
            // shift after cells
            var afterGap =
              this.size.innerWidth - (x + this.slideableWidth + this.cursorPosition);
            this._shiftCells(this.afterShiftCells, afterGap, 1);
          };

          proto._shiftCells = function(cells, gap, shift) {
            for (var i = 0; i < cells.length; i++) {
              var cell = cells[i];
              var cellShift = gap > 0 ? shift : 0;
              cell.wrapShift(cellShift);
              gap -= cell.size.outerWidth;
            }
          };

          proto._unshiftCells = function(cells) {
            if (!cells || !cells.length) {
              return;
            }
            for (var i = 0; i < cells.length; i++) {
              cells[i].wrapShift(0);
            }
          };

          // -------------------------- physics -------------------------- //

          proto.integratePhysics = function() {
            this.x += this.velocity;
            this.velocity *= this.getFrictionFactor();
          };

          proto.applyForce = function(force) {
            this.velocity += force;
          };

          proto.getFrictionFactor = function() {
            return (
              1 - this.options[this.isFreeScrolling ? 'freeScrollFriction' : 'friction']
            );
          };

          proto.getRestingPosition = function() {
            // my thanks to Steven Wittens, who simplified this math greatly
            return this.x + this.velocity / (1 - this.getFrictionFactor());
          };

          proto.applyDragForce = function() {
            if (!this.isDraggable || !this.isPointerDown) {
              return;
            }
            // change the position to drag position by applying force
            var dragVelocity = this.dragX - this.x;
            var dragForce = dragVelocity - this.velocity;
            this.applyForce(dragForce);
          };

          proto.applySelectedAttraction = function() {
            // do not attract if pointer down or no slides
            var dragDown = this.isDraggable && this.isPointerDown;
            if (dragDown || this.isFreeScrolling || !this.slides.length) {
              return;
            }
            var distance = this.selectedSlide.target * -1 - this.x;
            var force = distance * this.options.selectedAttraction;
            this.applyForce(force);
          };

          return proto;
        });
      },
      { 'fizzy-ui-utils': '../../node_modules/fizzy-ui-utils/utils.js' }
    ],
    '../../node_modules/flickity/js/flickity.js': [
      function(require, module, exports) {
        var define;
        // Flickity main
        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define([
              'ev-emitter/ev-emitter',
              'get-size/get-size',
              'fizzy-ui-utils/utils',
              './cell',
              './slide',
              './animate'
            ], function(EvEmitter, getSize, utils, Cell, Slide, animatePrototype) {
              return factory(
                window,
                EvEmitter,
                getSize,
                utils,
                Cell,
                Slide,
                animatePrototype
              );
            });
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(
              window,
              require('ev-emitter'),
              require('get-size'),
              require('fizzy-ui-utils'),
              require('./cell'),
              require('./slide'),
              require('./animate')
            );
          } else {
            // browser global
            var _Flickity = window.Flickity;

            window.Flickity = factory(
              window,
              window.EvEmitter,
              window.getSize,
              window.fizzyUIUtils,
              _Flickity.Cell,
              _Flickity.Slide,
              _Flickity.animatePrototype
            );
          }
        })(window, function factory(
          window,
          EvEmitter,
          getSize,
          utils,
          Cell,
          Slide,
          animatePrototype
        ) {
          'use strict';

          // vars
          var jQuery = window.jQuery;
          var getComputedStyle = window.getComputedStyle;
          var console = window.console;

          function moveElements(elems, toElem) {
            elems = utils.makeArray(elems);
            while (elems.length) {
              toElem.appendChild(elems.shift());
            }
          }

          // -------------------------- Flickity -------------------------- //

          // globally unique identifiers
          var GUID = 0;
          // internal store of all Flickity intances
          var instances = {};

          function Flickity(element, options) {
            var queryElement = utils.getQueryElement(element);
            if (!queryElement) {
              if (console) {
                console.error('Bad element for Flickity: ' + (queryElement || element));
              }
              return;
            }
            this.element = queryElement;
            // do not initialize twice on same element
            if (this.element.flickityGUID) {
              var instance = instances[this.element.flickityGUID];
              instance.option(options);
              return instance;
            }

            // add jQuery
            if (jQuery) {
              this.$element = jQuery(this.element);
            }
            // options
            this.options = utils.extend({}, this.constructor.defaults);
            this.option(options);

            // kick things off
            this._create();
          }

          Flickity.defaults = {
            accessibility: true,
            // adaptiveHeight: false,
            cellAlign: 'center',
            // cellSelector: undefined,
            // contain: false,
            freeScrollFriction: 0.075, // friction when free-scrolling
            friction: 0.28, // friction when selecting
            namespaceJQueryEvents: true,
            // initialIndex: 0,
            percentPosition: true,
            resize: true,
            selectedAttraction: 0.025,
            setGallerySize: true
            // watchCSS: false,
            // wrapAround: false
          };

          // hash of methods triggered on _create()
          Flickity.createMethods = [];

          var proto = Flickity.prototype;
          // inherit EventEmitter
          utils.extend(proto, EvEmitter.prototype);

          proto._create = function() {
            // add id for Flickity.data
            var id = (this.guid = ++GUID);
            this.element.flickityGUID = id; // expando
            instances[id] = this; // associate via id
            // initial properties
            this.selectedIndex = 0;
            // how many frames slider has been in same position
            this.restingFrames = 0;
            // initial physics properties
            this.x = 0;
            this.velocity = 0;
            this.originSide = this.options.rightToLeft ? 'right' : 'left';
            // create viewport & slider
            this.viewport = document.createElement('div');
            this.viewport.className = 'flickity-viewport';
            this._createSlider();

            if (this.options.resize || this.options.watchCSS) {
              window.addEventListener('resize', this);
            }

            // add listeners from on option
            for (var eventName in this.options.on) {
              var listener = this.options.on[eventName];
              this.on(eventName, listener);
            }

            Flickity.createMethods.forEach(function(method) {
              this[method]();
            }, this);

            if (this.options.watchCSS) {
              this.watchCSS();
            } else {
              this.activate();
            }
          };

          /**
           * set options
           * @param {Object} opts
           */
          proto.option = function(opts) {
            utils.extend(this.options, opts);
          };

          proto.activate = function() {
            if (this.isActive) {
              return;
            }
            this.isActive = true;
            this.element.classList.add('flickity-enabled');
            if (this.options.rightToLeft) {
              this.element.classList.add('flickity-rtl');
            }

            this.getSize();
            // move initial cell elements so they can be loaded as cells
            var cellElems = this._filterFindCellElements(this.element.children);
            moveElements(cellElems, this.slider);
            this.viewport.appendChild(this.slider);
            this.element.appendChild(this.viewport);
            // get cells from children
            this.reloadCells();

            if (this.options.accessibility) {
              // allow element to focusable
              this.element.tabIndex = 0;
              // listen for key presses
              this.element.addEventListener('keydown', this);
            }

            this.emitEvent('activate');
            this.selectInitialIndex();
            // flag for initial activation, for using initialIndex
            this.isInitActivated = true;
            // ready event. #493
            this.dispatchEvent('ready');
          };

          // slider positions the cells
          proto._createSlider = function() {
            // slider element does all the positioning
            var slider = document.createElement('div');
            slider.className = 'flickity-slider';
            slider.style[this.originSide] = 0;
            this.slider = slider;
          };

          proto._filterFindCellElements = function(elems) {
            return utils.filterFindElements(elems, this.options.cellSelector);
          };

          // goes through all children
          proto.reloadCells = function() {
            // collection of item elements
            this.cells = this._makeCells(this.slider.children);
            this.positionCells();
            this._getWrapShiftCells();
            this.setGallerySize();
          };

          /**
           * turn elements into Flickity.Cells
           * @param {Array or NodeList or HTMLElement} elems
           * @returns {Array} items - collection of new Flickity Cells
           */
          proto._makeCells = function(elems) {
            var cellElems = this._filterFindCellElements(elems);

            // create new Flickity for collection
            var cells = cellElems.map(function(cellElem) {
              return new Cell(cellElem, this);
            }, this);

            return cells;
          };

          proto.getLastCell = function() {
            return this.cells[this.cells.length - 1];
          };

          proto.getLastSlide = function() {
            return this.slides[this.slides.length - 1];
          };

          // positions all cells
          proto.positionCells = function() {
            // size all cells
            this._sizeCells(this.cells);
            // position all cells
            this._positionCells(0);
          };

          /**
           * position certain cells
           * @param {Integer} index - which cell to start with
           */
          proto._positionCells = function(index) {
            index = index || 0;
            // also measure maxCellHeight
            // start 0 if positioning all cells
            this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
            var cellX = 0;
            // get cellX
            if (index > 0) {
              var startCell = this.cells[index - 1];
              cellX = startCell.x + startCell.size.outerWidth;
            }
            var len = this.cells.length;
            for (var i = index; i < len; i++) {
              var cell = this.cells[i];
              cell.setPosition(cellX);
              cellX += cell.size.outerWidth;
              this.maxCellHeight = Math.max(cell.size.outerHeight, this.maxCellHeight);
            }
            // keep track of cellX for wrap-around
            this.slideableWidth = cellX;
            // slides
            this.updateSlides();
            // contain slides target
            this._containSlides();
            // update slidesWidth
            this.slidesWidth = len
              ? this.getLastSlide().target - this.slides[0].target
              : 0;
          };

          /**
           * cell.getSize() on multiple cells
           * @param {Array} cells
           */
          proto._sizeCells = function(cells) {
            cells.forEach(function(cell) {
              cell.getSize();
            });
          };

          // --------------------------  -------------------------- //

          proto.updateSlides = function() {
            this.slides = [];
            if (!this.cells.length) {
              return;
            }

            var slide = new Slide(this);
            this.slides.push(slide);
            var isOriginLeft = this.originSide == 'left';
            var nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';

            var canCellFit = this._getCanCellFit();

            this.cells.forEach(function(cell, i) {
              // just add cell if first cell in slide
              if (!slide.cells.length) {
                slide.addCell(cell);
                return;
              }

              var slideWidth =
                slide.outerWidth -
                slide.firstMargin +
                (cell.size.outerWidth - cell.size[nextMargin]);

              if (canCellFit.call(this, i, slideWidth)) {
                slide.addCell(cell);
              } else {
                // doesn't fit, new slide
                slide.updateTarget();

                slide = new Slide(this);
                this.slides.push(slide);
                slide.addCell(cell);
              }
            }, this);
            // last slide
            slide.updateTarget();
            // update .selectedSlide
            this.updateSelectedSlide();
          };

          proto._getCanCellFit = function() {
            var groupCells = this.options.groupCells;
            if (!groupCells) {
              return function() {
                return false;
              };
            } else if (typeof groupCells === 'number') {
              // group by number. 3 -> [0,1,2], [3,4,5], ...
              var number = parseInt(groupCells, 10);
              return function(i) {
                return i % number !== 0;
              };
            }
            // default, group by width of slide
            // parse '75%
            var percentMatch =
              typeof groupCells === 'string' && groupCells.match(/^(\d+)%$/);
            var percent = percentMatch ? parseInt(percentMatch[1], 10) / 100 : 1;
            return function(i, slideWidth) {
              return slideWidth <= (this.size.innerWidth + 1) * percent;
            };
          };

          // alias _init for jQuery plugin .flickity()
          proto._init = proto.reposition = function() {
            this.positionCells();
            this.positionSliderAtSelected();
          };

          proto.getSize = function() {
            this.size = getSize(this.element);
            this.setCellAlign();
            this.cursorPosition = this.size.innerWidth * this.cellAlign;
          };

          var cellAlignShorthands = {
            // cell align, then based on origin side
            center: {
              left: 0.5,
              right: 0.5
            },
            left: {
              left: 0,
              right: 1
            },
            right: {
              right: 0,
              left: 1
            }
          };

          proto.setCellAlign = function() {
            var shorthand = cellAlignShorthands[this.options.cellAlign];
            this.cellAlign = shorthand
              ? shorthand[this.originSide]
              : this.options.cellAlign;
          };

          proto.setGallerySize = function() {
            if (this.options.setGallerySize) {
              var height =
                this.options.adaptiveHeight && this.selectedSlide
                  ? this.selectedSlide.height
                  : this.maxCellHeight;
              this.viewport.style.height = height + 'px';
            }
          };

          proto._getWrapShiftCells = function() {
            // only for wrap-around
            if (!this.options.wrapAround) {
              return;
            }
            // unshift previous cells
            this._unshiftCells(this.beforeShiftCells);
            this._unshiftCells(this.afterShiftCells);
            // get before cells
            // initial gap
            var gapX = this.cursorPosition;
            var cellIndex = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(gapX, cellIndex, -1);
            // get after cells
            // ending gap between last cell and end of gallery viewport
            gapX = this.size.innerWidth - this.cursorPosition;
            // start cloning at first cell, working forwards
            this.afterShiftCells = this._getGapCells(gapX, 0, 1);
          };

          proto._getGapCells = function(gapX, cellIndex, increment) {
            // keep adding cells until the cover the initial gap
            var cells = [];
            while (gapX > 0) {
              var cell = this.cells[cellIndex];
              if (!cell) {
                break;
              }
              cells.push(cell);
              cellIndex += increment;
              gapX -= cell.size.outerWidth;
            }
            return cells;
          };

          // ----- contain ----- //

          // contain cell targets so no excess sliding
          proto._containSlides = function() {
            if (
              !this.options.contain ||
              this.options.wrapAround ||
              !this.cells.length
            ) {
              return;
            }
            var isRightToLeft = this.options.rightToLeft;
            var beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
            var endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
            var contentWidth = this.slideableWidth - this.getLastCell().size[endMargin];
            // content is less than gallery size
            var isContentSmaller = contentWidth < this.size.innerWidth;
            // bounds
            var beginBound = this.cursorPosition + this.cells[0].size[beginMargin];
            var endBound = contentWidth - this.size.innerWidth * (1 - this.cellAlign);
            // contain each cell target
            this.slides.forEach(function(slide) {
              if (isContentSmaller) {
                // all cells fit inside gallery
                slide.target = contentWidth * this.cellAlign;
              } else {
                // contain to bounds
                slide.target = Math.max(slide.target, beginBound);
                slide.target = Math.min(slide.target, endBound);
              }
            }, this);
          };

          // -----  ----- //

          /**
           * emits events via eventEmitter and jQuery events
           * @param {String} type - name of event
           * @param {Event} event - original event
           * @param {Array} args - extra arguments
           */
          proto.dispatchEvent = function(type, event, args) {
            var emitArgs = event ? [event].concat(args) : args;
            this.emitEvent(type, emitArgs);

            if (jQuery && this.$element) {
              // default trigger with type if no event
              type += this.options.namespaceJQueryEvents ? '.flickity' : '';
              var $event = type;
              if (event) {
                // create jQuery event
                var jQEvent = jQuery.Event(event);
                jQEvent.type = type;
                $event = jQEvent;
              }
              this.$element.trigger($event, args);
            }
          };

          // -------------------------- select -------------------------- //

          /**
           * @param {Integer} index - index of the slide
           * @param {Boolean} isWrap - will wrap-around to last/first if at the end
           * @param {Boolean} isInstant - will immediately set position at selected cell
           */
          proto.select = function(index, isWrap, isInstant) {
            if (!this.isActive) {
              return;
            }
            index = parseInt(index, 10);
            this._wrapSelect(index);

            if (this.options.wrapAround || isWrap) {
              index = utils.modulo(index, this.slides.length);
            }
            // bail if invalid index
            if (!this.slides[index]) {
              return;
            }
            var prevIndex = this.selectedIndex;
            this.selectedIndex = index;
            this.updateSelectedSlide();
            if (isInstant) {
              this.positionSliderAtSelected();
            } else {
              this.startAnimation();
            }
            if (this.options.adaptiveHeight) {
              this.setGallerySize();
            }
            // events
            this.dispatchEvent('select', null, [index]);
            // change event if new index
            if (index != prevIndex) {
              this.dispatchEvent('change', null, [index]);
            }
            // old v1 event name, remove in v3
            this.dispatchEvent('cellSelect');
          };

          // wraps position for wrapAround, to move to closest slide. #113
          proto._wrapSelect = function(index) {
            var len = this.slides.length;
            var isWrapping = this.options.wrapAround && len > 1;
            if (!isWrapping) {
              return index;
            }
            var wrapIndex = utils.modulo(index, len);
            // go to shortest
            var delta = Math.abs(wrapIndex - this.selectedIndex);
            var backWrapDelta = Math.abs(wrapIndex + len - this.selectedIndex);
            var forewardWrapDelta = Math.abs(wrapIndex - len - this.selectedIndex);
            if (!this.isDragSelect && backWrapDelta < delta) {
              index += len;
            } else if (!this.isDragSelect && forewardWrapDelta < delta) {
              index -= len;
            }
            // wrap position so slider is within normal area
            if (index < 0) {
              this.x -= this.slideableWidth;
            } else if (index >= len) {
              this.x += this.slideableWidth;
            }
          };

          proto.previous = function(isWrap, isInstant) {
            this.select(this.selectedIndex - 1, isWrap, isInstant);
          };

          proto.next = function(isWrap, isInstant) {
            this.select(this.selectedIndex + 1, isWrap, isInstant);
          };

          proto.updateSelectedSlide = function() {
            var slide = this.slides[this.selectedIndex];
            // selectedIndex could be outside of slides, if triggered before resize()
            if (!slide) {
              return;
            }
            // unselect previous selected slide
            this.unselectSelectedSlide();
            // update new selected slide
            this.selectedSlide = slide;
            slide.select();
            this.selectedCells = slide.cells;
            this.selectedElements = slide.getCellElements();
            // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
            // Remove in v3?
            this.selectedCell = slide.cells[0];
            this.selectedElement = this.selectedElements[0];
          };

          proto.unselectSelectedSlide = function() {
            if (this.selectedSlide) {
              this.selectedSlide.unselect();
            }
          };

          proto.selectInitialIndex = function() {
            var initialIndex = this.options.initialIndex;
            // already activated, select previous selectedIndex
            if (this.isInitActivated) {
              this.select(this.selectedIndex, false, true);
              return;
            }
            // select with selector string
            if (initialIndex && typeof initialIndex === 'string') {
              var cell = this.queryCell(initialIndex);
              if (cell) {
                this.selectCell(initialIndex, false, true);
                return;
              }
            }

            var index = 0;
            // select with number
            if (initialIndex && this.slides[initialIndex]) {
              index = initialIndex;
            }
            // select instantly
            this.select(index, false, true);
          };

          /**
           * select slide from number or cell element
           * @param {Element or Number} elem
           */
          proto.selectCell = function(value, isWrap, isInstant) {
            // get cell
            var cell = this.queryCell(value);
            if (!cell) {
              return;
            }

            var index = this.getCellSlideIndex(cell);
            this.select(index, isWrap, isInstant);
          };

          proto.getCellSlideIndex = function(cell) {
            // get index of slides that has cell
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides[i];
              var index = slide.cells.indexOf(cell);
              if (index != -1) {
                return i;
              }
            }
          };

          // -------------------------- get cells -------------------------- //

          /**
           * get Flickity.Cell, given an Element
           * @param {Element} elem
           * @returns {Flickity.Cell} item
           */
          proto.getCell = function(elem) {
            // loop through cells to get the one that matches
            for (var i = 0; i < this.cells.length; i++) {
              var cell = this.cells[i];
              if (cell.element == elem) {
                return cell;
              }
            }
          };

          /**
           * get collection of Flickity.Cells, given Elements
           * @param {Element, Array, NodeList} elems
           * @returns {Array} cells - Flickity.Cells
           */
          proto.getCells = function(elems) {
            elems = utils.makeArray(elems);
            var cells = [];
            elems.forEach(function(elem) {
              var cell = this.getCell(elem);
              if (cell) {
                cells.push(cell);
              }
            }, this);
            return cells;
          };

          /**
           * get cell elements
           * @returns {Array} cellElems
           */
          proto.getCellElements = function() {
            return this.cells.map(function(cell) {
              return cell.element;
            });
          };

          /**
           * get parent cell from an element
           * @param {Element} elem
           * @returns {Flickit.Cell} cell
           */
          proto.getParentCell = function(elem) {
            // first check if elem is cell
            var cell = this.getCell(elem);
            if (cell) {
              return cell;
            }
            // try to get parent cell elem
            elem = utils.getParent(elem, '.flickity-slider > *');
            return this.getCell(elem);
          };

          /**
           * get cells adjacent to a slide
           * @param {Integer} adjCount - number of adjacent slides
           * @param {Integer} index - index of slide to start
           * @returns {Array} cells - array of Flickity.Cells
           */
          proto.getAdjacentCellElements = function(adjCount, index) {
            if (!adjCount) {
              return this.selectedSlide.getCellElements();
            }
            index = index === undefined ? this.selectedIndex : index;

            var len = this.slides.length;
            if (1 + adjCount * 2 >= len) {
              return this.getCellElements();
            }

            var cellElems = [];
            for (var i = index - adjCount; i <= index + adjCount; i++) {
              var slideIndex = this.options.wrapAround ? utils.modulo(i, len) : i;
              var slide = this.slides[slideIndex];
              if (slide) {
                cellElems = cellElems.concat(slide.getCellElements());
              }
            }
            return cellElems;
          };

          /**
           * select slide from number or cell element
           * @param {Element, Selector String, or Number} selector
           */
          proto.queryCell = function(selector) {
            if (typeof selector === 'number') {
              // use number as index
              return this.cells[selector];
            }
            if (typeof selector === 'string') {
              // do not select invalid selectors from hash: #123, #/. #791
              if (selector.match(/^[#\.]?[\d\/]/)) {
                return;
              }
              // use string as selector, get element
              selector = this.element.querySelector(selector);
            }
            // get cell from element
            return this.getCell(selector);
          };

          // -------------------------- events -------------------------- //

          proto.uiChange = function() {
            this.emitEvent('uiChange');
          };

          // keep focus on element when child UI elements are clicked
          proto.childUIPointerDown = function(event) {
            // HACK iOS does not allow touch events to bubble up?!
            if (event.type != 'touchstart') {
              event.preventDefault();
            }
            this.focus();
          };

          // ----- resize ----- //

          proto.onresize = function() {
            this.watchCSS();
            this.resize();
          };

          utils.debounceMethod(Flickity, 'onresize', 150);

          proto.resize = function() {
            if (!this.isActive) {
              return;
            }
            this.getSize();
            // wrap values
            if (this.options.wrapAround) {
              this.x = utils.modulo(this.x, this.slideableWidth);
            }
            this.positionCells();
            this._getWrapShiftCells();
            this.setGallerySize();
            this.emitEvent('resize');
            // update selected index for group slides, instant
            // TODO: position can be lost between groups of various numbers
            var selectedElement = this.selectedElements && this.selectedElements[0];
            this.selectCell(selectedElement, false, true);
          };

          // watches the :after property, activates/deactivates
          proto.watchCSS = function() {
            var watchOption = this.options.watchCSS;
            if (!watchOption) {
              return;
            }

            var afterContent = getComputedStyle(this.element, ':after').content;
            // activate if :after { content: 'flickity' }
            if (afterContent.indexOf('flickity') != -1) {
              this.activate();
            } else {
              this.deactivate();
            }
          };

          // ----- keydown ----- //

          // go previous/next if left/right keys pressed
          proto.onkeydown = function(event) {
            // only work if element is in focus
            var isNotFocused =
              document.activeElement && document.activeElement != this.element;
            if (!this.options.accessibility || isNotFocused) {
              return;
            }

            var handler = Flickity.keyboardHandlers[event.keyCode];
            if (handler) {
              handler.call(this);
            }
          };

          Flickity.keyboardHandlers = {
            // left arrow
            37: function() {
              var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
              this.uiChange();
              this[leftMethod]();
            },
            // right arrow
            39: function() {
              var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
              this.uiChange();
              this[rightMethod]();
            }
          };

          // ----- focus ----- //

          proto.focus = function() {
            // TODO remove scrollTo once focus options gets more support
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Browser_compatibility
            var prevScrollY = window.pageYOffset;
            this.element.focus({ preventScroll: true });
            // hack to fix scroll jump after focus, #76
            if (window.pageYOffset != prevScrollY) {
              window.scrollTo(window.pageXOffset, prevScrollY);
            }
          };

          // -------------------------- destroy -------------------------- //

          // deactivate all Flickity functionality, but keep stuff available
          proto.deactivate = function() {
            if (!this.isActive) {
              return;
            }
            this.element.classList.remove('flickity-enabled');
            this.element.classList.remove('flickity-rtl');
            this.unselectSelectedSlide();
            // destroy cells
            this.cells.forEach(function(cell) {
              cell.destroy();
            });
            this.element.removeChild(this.viewport);
            // move child elements back into element
            moveElements(this.slider.children, this.element);
            if (this.options.accessibility) {
              this.element.removeAttribute('tabIndex');
              this.element.removeEventListener('keydown', this);
            }
            // set flags
            this.isActive = false;
            this.emitEvent('deactivate');
          };

          proto.destroy = function() {
            this.deactivate();
            window.removeEventListener('resize', this);
            this.allOff();
            this.emitEvent('destroy');
            if (jQuery && this.$element) {
              jQuery.removeData(this.element, 'flickity');
            }
            delete this.element.flickityGUID;
            delete instances[this.guid];
          };

          // -------------------------- prototype -------------------------- //

          utils.extend(proto, animatePrototype);

          // -------------------------- extras -------------------------- //

          /**
           * get Flickity instance from element
           * @param {Element} elem
           * @returns {Flickity}
           */
          Flickity.data = function(elem) {
            elem = utils.getQueryElement(elem);
            var id = elem && elem.flickityGUID;
            return id && instances[id];
          };

          utils.htmlInit(Flickity, 'flickity');

          if (jQuery && jQuery.bridget) {
            jQuery.bridget('flickity', Flickity);
          }

          // set internal jQuery, for Webpack + jQuery v3, #478
          Flickity.setJQuery = function(jq) {
            jQuery = jq;
          };

          Flickity.Cell = Cell;
          Flickity.Slide = Slide;

          return Flickity;
        });
      },
      {
        'ev-emitter': '../../node_modules/ev-emitter/ev-emitter.js',
        'get-size': '../../node_modules/get-size/get-size.js',
        'fizzy-ui-utils': '../../node_modules/fizzy-ui-utils/utils.js',
        './cell': '../../node_modules/flickity/js/cell.js',
        './slide': '../../node_modules/flickity/js/slide.js',
        './animate': '../../node_modules/flickity/js/animate.js'
      }
    ],
    '../../node_modules/unipointer/unipointer.js': [
      function(require, module, exports) {
        var define;
        /*!
         * Unipointer v2.3.0
         * base class for doing one thing with pointer event
         * MIT license
         */

        /* jshint browser: true, undef: true, unused: true, strict: true */

        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */ /* global define, module, require */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define(['ev-emitter/ev-emitter'], function(EvEmitter) {
              return factory(window, EvEmitter);
            });
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(window, require('ev-emitter'));
          } else {
            // browser global
            window.Unipointer = factory(window, window.EvEmitter);
          }
        })(window, function factory(window, EvEmitter) {
          'use strict';

          function noop() {}

          function Unipointer() {}

          // inherit EvEmitter
          var proto = (Unipointer.prototype = Object.create(EvEmitter.prototype));

          proto.bindStartEvent = function(elem) {
            this._bindStartEvent(elem, true);
          };

          proto.unbindStartEvent = function(elem) {
            this._bindStartEvent(elem, false);
          };

          /**
           * Add or remove start event
           * @param {Boolean} isAdd - remove if falsey
           */
          proto._bindStartEvent = function(elem, isAdd) {
            // munge isAdd, default to true
            isAdd = isAdd === undefined ? true : isAdd;
            var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

            // default to mouse events
            var startEvent = 'mousedown';
            if (window.PointerEvent) {
              // Pointer Events
              startEvent = 'pointerdown';
            } else if ('ontouchstart' in window) {
              // Touch Events. iOS Safari
              startEvent = 'touchstart';
            }
            elem[bindMethod](startEvent, this);
          };

          // trigger handler methods for events
          proto.handleEvent = function(event) {
            var method = 'on' + event.type;
            if (this[method]) {
              this[method](event);
            }
          };

          // returns the touch that we're keeping track of
          proto.getTouch = function(touches) {
            for (var i = 0; i < touches.length; i++) {
              var touch = touches[i];
              if (touch.identifier == this.pointerIdentifier) {
                return touch;
              }
            }
          };

          // ----- start event ----- //

          proto.onmousedown = function(event) {
            // dismiss clicks from right or middle buttons
            var button = event.button;
            if (button && (button !== 0 && button !== 1)) {
              return;
            }
            this._pointerDown(event, event);
          };

          proto.ontouchstart = function(event) {
            this._pointerDown(event, event.changedTouches[0]);
          };

          proto.onpointerdown = function(event) {
            this._pointerDown(event, event);
          };

          /**
           * pointer start
           * @param {Event} event
           * @param {Event or Touch} pointer
           */
          proto._pointerDown = function(event, pointer) {
            // dismiss right click and other pointers
            // button = 0 is okay, 1-4 not
            if (event.button || this.isPointerDown) {
              return;
            }

            this.isPointerDown = true;
            // save pointer identifier to match up touch events
            this.pointerIdentifier =
              pointer.pointerId !== undefined
                ? // pointerId for pointer events, touch.indentifier for touch events
                  pointer.pointerId
                : pointer.identifier;

            this.pointerDown(event, pointer);
          };

          proto.pointerDown = function(event, pointer) {
            this._bindPostStartEvents(event);
            this.emitEvent('pointerDown', [event, pointer]);
          };

          // hash of events to be bound after start event
          var postStartEvents = {
            mousedown: ['mousemove', 'mouseup'],
            touchstart: ['touchmove', 'touchend', 'touchcancel'],
            pointerdown: ['pointermove', 'pointerup', 'pointercancel']
          };

          proto._bindPostStartEvents = function(event) {
            if (!event) {
              return;
            }
            // get proper events to match start event
            var events = postStartEvents[event.type];
            // bind events to node
            events.forEach(function(eventName) {
              window.addEventListener(eventName, this);
            }, this);
            // save these arguments
            this._boundPointerEvents = events;
          };

          proto._unbindPostStartEvents = function() {
            // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
            if (!this._boundPointerEvents) {
              return;
            }
            this._boundPointerEvents.forEach(function(eventName) {
              window.removeEventListener(eventName, this);
            }, this);

            delete this._boundPointerEvents;
          };

          // ----- move event ----- //

          proto.onmousemove = function(event) {
            this._pointerMove(event, event);
          };

          proto.onpointermove = function(event) {
            if (event.pointerId == this.pointerIdentifier) {
              this._pointerMove(event, event);
            }
          };

          proto.ontouchmove = function(event) {
            var touch = this.getTouch(event.changedTouches);
            if (touch) {
              this._pointerMove(event, touch);
            }
          };

          /**
           * pointer move
           * @param {Event} event
           * @param {Event or Touch} pointer
           * @private
           */
          proto._pointerMove = function(event, pointer) {
            this.pointerMove(event, pointer);
          };

          // public
          proto.pointerMove = function(event, pointer) {
            this.emitEvent('pointerMove', [event, pointer]);
          };

          // ----- end event ----- //

          proto.onmouseup = function(event) {
            this._pointerUp(event, event);
          };

          proto.onpointerup = function(event) {
            if (event.pointerId == this.pointerIdentifier) {
              this._pointerUp(event, event);
            }
          };

          proto.ontouchend = function(event) {
            var touch = this.getTouch(event.changedTouches);
            if (touch) {
              this._pointerUp(event, touch);
            }
          };

          /**
           * pointer up
           * @param {Event} event
           * @param {Event or Touch} pointer
           * @private
           */
          proto._pointerUp = function(event, pointer) {
            this._pointerDone();
            this.pointerUp(event, pointer);
          };

          // public
          proto.pointerUp = function(event, pointer) {
            this.emitEvent('pointerUp', [event, pointer]);
          };

          // ----- pointer done ----- //

          // triggered on pointer up & pointer cancel
          proto._pointerDone = function() {
            this._pointerReset();
            this._unbindPostStartEvents();
            this.pointerDone();
          };

          proto._pointerReset = function() {
            // reset properties
            this.isPointerDown = false;
            delete this.pointerIdentifier;
          };

          proto.pointerDone = noop;

          // ----- pointer cancel ----- //

          proto.onpointercancel = function(event) {
            if (event.pointerId == this.pointerIdentifier) {
              this._pointerCancel(event, event);
            }
          };

          proto.ontouchcancel = function(event) {
            var touch = this.getTouch(event.changedTouches);
            if (touch) {
              this._pointerCancel(event, touch);
            }
          };

          /**
           * pointer cancel
           * @param {Event} event
           * @param {Event or Touch} pointer
           * @private
           */
          proto._pointerCancel = function(event, pointer) {
            this._pointerDone();
            this.pointerCancel(event, pointer);
          };

          // public
          proto.pointerCancel = function(event, pointer) {
            this.emitEvent('pointerCancel', [event, pointer]);
          };

          // -----  ----- //

          // utility function for getting x/y coords from event
          Unipointer.getPointerPoint = function(pointer) {
            return {
              x: pointer.pageX,
              y: pointer.pageY
            };
          };

          // -----  ----- //

          return Unipointer;
        });
      },
      { 'ev-emitter': '../../node_modules/ev-emitter/ev-emitter.js' }
    ],
    '../../node_modules/unidragger/unidragger.js': [
      function(require, module, exports) {
        var define;
        /*!
         * Unidragger v2.3.0
         * Draggable base class
         * MIT license
         */

        /* jshint browser: true, unused: true, undef: true, strict: true */

        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */ /* globals define, module, require */

          if (typeof define === 'function' && define.amd) {
            // AMD
            define(['unipointer/unipointer'], function(Unipointer) {
              return factory(window, Unipointer);
            });
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(window, require('unipointer'));
          } else {
            // browser global
            window.Unidragger = factory(window, window.Unipointer);
          }
        })(window, function factory(window, Unipointer) {
          'use strict';

          // -------------------------- Unidragger -------------------------- //

          function Unidragger() {}

          // inherit Unipointer & EvEmitter
          var proto = (Unidragger.prototype = Object.create(Unipointer.prototype));

          // ----- bind start ----- //

          proto.bindHandles = function() {
            this._bindHandles(true);
          };

          proto.unbindHandles = function() {
            this._bindHandles(false);
          };

          /**
           * Add or remove start event
           * @param {Boolean} isAdd
           */
          proto._bindHandles = function(isAdd) {
            // munge isAdd, default to true
            isAdd = isAdd === undefined ? true : isAdd;
            // bind each handle
            var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
            var touchAction = isAdd ? this._touchActionValue : '';
            for (var i = 0; i < this.handles.length; i++) {
              var handle = this.handles[i];
              this._bindStartEvent(handle, isAdd);
              handle[bindMethod]('click', this);
              // touch-action: none to override browser touch gestures. metafizzy/flickity#540
              if (window.PointerEvent) {
                handle.style.touchAction = touchAction;
              }
            }
          };

          // prototype so it can be overwriteable by Flickity
          proto._touchActionValue = 'none';

          // ----- start event ----- //

          /**
           * pointer start
           * @param {Event} event
           * @param {Event or Touch} pointer
           */
          proto.pointerDown = function(event, pointer) {
            var isOkay = this.okayPointerDown(event);
            if (!isOkay) {
              return;
            }
            // track start event position
            this.pointerDownPointer = pointer;

            event.preventDefault();
            this.pointerDownBlur();
            // bind move and end events
            this._bindPostStartEvents(event);
            this.emitEvent('pointerDown', [event, pointer]);
          };

          // nodes that have text fields
          var cursorNodes = {
            TEXTAREA: true,
            INPUT: true,
            SELECT: true,
            OPTION: true
          };

          // input types that do not have text fields
          var clickTypes = {
            radio: true,
            checkbox: true,
            button: true,
            submit: true,
            image: true,
            file: true
          };

          // dismiss inputs with text fields. flickity#403, flickity#404
          proto.okayPointerDown = function(event) {
            var isCursorNode = cursorNodes[event.target.nodeName];
            var isClickType = clickTypes[event.target.type];
            var isOkay = !isCursorNode || isClickType;
            if (!isOkay) {
              this._pointerReset();
            }
            return isOkay;
          };

          // kludge to blur previously focused input
          proto.pointerDownBlur = function() {
            var focused = document.activeElement;
            // do not blur body for IE10, metafizzy/flickity#117
            var canBlur = focused && focused.blur && focused != document.body;
            if (canBlur) {
              focused.blur();
            }
          };

          // ----- move event ----- //

          /**
           * drag move
           * @param {Event} event
           * @param {Event or Touch} pointer
           */
          proto.pointerMove = function(event, pointer) {
            var moveVector = this._dragPointerMove(event, pointer);
            this.emitEvent('pointerMove', [event, pointer, moveVector]);
            this._dragMove(event, pointer, moveVector);
          };

          // base pointer move logic
          proto._dragPointerMove = function(event, pointer) {
            var moveVector = {
              x: pointer.pageX - this.pointerDownPointer.pageX,
              y: pointer.pageY - this.pointerDownPointer.pageY
            };
            // start drag if pointer has moved far enough to start drag
            if (!this.isDragging && this.hasDragStarted(moveVector)) {
              this._dragStart(event, pointer);
            }
            return moveVector;
          };

          // condition if pointer has moved far enough to start drag
          proto.hasDragStarted = function(moveVector) {
            return Math.abs(moveVector.x) > 3 || Math.abs(moveVector.y) > 3;
          };

          // ----- end event ----- //

          /**
           * pointer up
           * @param {Event} event
           * @param {Event or Touch} pointer
           */
          proto.pointerUp = function(event, pointer) {
            this.emitEvent('pointerUp', [event, pointer]);
            this._dragPointerUp(event, pointer);
          };

          proto._dragPointerUp = function(event, pointer) {
            if (this.isDragging) {
              this._dragEnd(event, pointer);
            } else {
              // pointer didn't move enough for drag to start
              this._staticClick(event, pointer);
            }
          };

          // -------------------------- drag -------------------------- //

          // dragStart
          proto._dragStart = function(event, pointer) {
            this.isDragging = true;
            // prevent clicks
            this.isPreventingClicks = true;
            this.dragStart(event, pointer);
          };

          proto.dragStart = function(event, pointer) {
            this.emitEvent('dragStart', [event, pointer]);
          };

          // dragMove
          proto._dragMove = function(event, pointer, moveVector) {
            // do not drag if not dragging yet
            if (!this.isDragging) {
              return;
            }

            this.dragMove(event, pointer, moveVector);
          };

          proto.dragMove = function(event, pointer, moveVector) {
            event.preventDefault();
            this.emitEvent('dragMove', [event, pointer, moveVector]);
          };

          // dragEnd
          proto._dragEnd = function(event, pointer) {
            // set flags
            this.isDragging = false;
            // re-enable clicking async
            setTimeout(
              function() {
                delete this.isPreventingClicks;
              }.bind(this)
            );

            this.dragEnd(event, pointer);
          };

          proto.dragEnd = function(event, pointer) {
            this.emitEvent('dragEnd', [event, pointer]);
          };

          // ----- onclick ----- //

          // handle all clicks and prevent clicks when dragging
          proto.onclick = function(event) {
            if (this.isPreventingClicks) {
              event.preventDefault();
            }
          };

          // ----- staticClick ----- //

          // triggered after pointer down & up with no/tiny movement
          proto._staticClick = function(event, pointer) {
            // ignore emulated mouse up clicks
            if (this.isIgnoringMouseUp && event.type == 'mouseup') {
              return;
            }

            this.staticClick(event, pointer);

            // set flag for emulated clicks 300ms after touchend
            if (event.type != 'mouseup') {
              this.isIgnoringMouseUp = true;
              // reset flag after 300ms
              setTimeout(
                function() {
                  delete this.isIgnoringMouseUp;
                }.bind(this),
                400
              );
            }
          };

          proto.staticClick = function(event, pointer) {
            this.emitEvent('staticClick', [event, pointer]);
          };

          // ----- utils ----- //

          Unidragger.getPointerPoint = Unipointer.getPointerPoint;

          // -----  ----- //

          return Unidragger;
        });
      },
      { unipointer: '../../node_modules/unipointer/unipointer.js' }
    ],
    '../../node_modules/flickity/js/drag.js': [
      function(require, module, exports) {
        var define;
        // drag
        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define([
              './flickity',
              'unidragger/unidragger',
              'fizzy-ui-utils/utils'
            ], function(Flickity, Unidragger, utils) {
              return factory(window, Flickity, Unidragger, utils);
            });
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(
              window,
              require('./flickity'),
              require('unidragger'),
              require('fizzy-ui-utils')
            );
          } else {
            // browser global
            window.Flickity = factory(
              window,
              window.Flickity,
              window.Unidragger,
              window.fizzyUIUtils
            );
          }
        })(window, function factory(window, Flickity, Unidragger, utils) {
          'use strict';

          // ----- defaults ----- //

          utils.extend(Flickity.defaults, {
            draggable: '>1',
            dragThreshold: 3
          });

          // ----- create ----- //

          Flickity.createMethods.push('_createDrag');

          // -------------------------- drag prototype -------------------------- //

          var proto = Flickity.prototype;
          utils.extend(proto, Unidragger.prototype);
          proto._touchActionValue = 'pan-y';

          // --------------------------  -------------------------- //

          var isTouch = 'createTouch' in document;
          var isTouchmoveScrollCanceled = false;

          proto._createDrag = function() {
            this.on('activate', this.onActivateDrag);
            this.on('uiChange', this._uiChangeDrag);
            this.on('deactivate', this.onDeactivateDrag);
            this.on('cellChange', this.updateDraggable);
            // TODO updateDraggable on resize? if groupCells & slides change
            // HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
            // #457, RubaXa/Sortable#973
            if (isTouch && !isTouchmoveScrollCanceled) {
              window.addEventListener('touchmove', function() {});
              isTouchmoveScrollCanceled = true;
            }
          };

          proto.onActivateDrag = function() {
            this.handles = [this.viewport];
            this.bindHandles();
            this.updateDraggable();
          };

          proto.onDeactivateDrag = function() {
            this.unbindHandles();
            this.element.classList.remove('is-draggable');
          };

          proto.updateDraggable = function() {
            // disable dragging if less than 2 slides. #278
            if (this.options.draggable == '>1') {
              this.isDraggable = this.slides.length > 1;
            } else {
              this.isDraggable = this.options.draggable;
            }
            if (this.isDraggable) {
              this.element.classList.add('is-draggable');
            } else {
              this.element.classList.remove('is-draggable');
            }
          };

          // backwards compatibility
          proto.bindDrag = function() {
            this.options.draggable = true;
            this.updateDraggable();
          };

          proto.unbindDrag = function() {
            this.options.draggable = false;
            this.updateDraggable();
          };

          proto._uiChangeDrag = function() {
            delete this.isFreeScrolling;
          };

          // -------------------------- pointer events -------------------------- //

          proto.pointerDown = function(event, pointer) {
            if (!this.isDraggable) {
              this._pointerDownDefault(event, pointer);
              return;
            }
            var isOkay = this.okayPointerDown(event);
            if (!isOkay) {
              return;
            }

            this._pointerDownPreventDefault(event);
            this.pointerDownFocus(event);
            // blur
            if (document.activeElement != this.element) {
              // do not blur if already focused
              this.pointerDownBlur();
            }

            // stop if it was moving
            this.dragX = this.x;
            this.viewport.classList.add('is-pointer-down');
            // track scrolling
            this.pointerDownScroll = getScrollPosition();
            window.addEventListener('scroll', this);

            this._pointerDownDefault(event, pointer);
          };

          // default pointerDown logic, used for staticClick
          proto._pointerDownDefault = function(event, pointer) {
            // track start event position
            // Safari 9 overrides pageX and pageY. These values needs to be copied. #779
            this.pointerDownPointer = {
              pageX: pointer.pageX,
              pageY: pointer.pageY
            };
            // bind move and end events
            this._bindPostStartEvents(event);
            this.dispatchEvent('pointerDown', event, [pointer]);
          };

          var focusNodes = {
            INPUT: true,
            TEXTAREA: true,
            SELECT: true
          };

          proto.pointerDownFocus = function(event) {
            var isFocusNode = focusNodes[event.target.nodeName];
            if (!isFocusNode) {
              this.focus();
            }
          };

          proto._pointerDownPreventDefault = function(event) {
            var isTouchStart = event.type == 'touchstart';
            var isTouchPointer = event.pointerType == 'touch';
            var isFocusNode = focusNodes[event.target.nodeName];
            if (!isTouchStart && !isTouchPointer && !isFocusNode) {
              event.preventDefault();
            }
          };

          // ----- move ----- //

          proto.hasDragStarted = function(moveVector) {
            return Math.abs(moveVector.x) > this.options.dragThreshold;
          };

          // ----- up ----- //

          proto.pointerUp = function(event, pointer) {
            delete this.isTouchScrolling;
            this.viewport.classList.remove('is-pointer-down');
            this.dispatchEvent('pointerUp', event, [pointer]);
            this._dragPointerUp(event, pointer);
          };

          proto.pointerDone = function() {
            window.removeEventListener('scroll', this);
            delete this.pointerDownScroll;
          };

          // -------------------------- dragging -------------------------- //

          proto.dragStart = function(event, pointer) {
            if (!this.isDraggable) {
              return;
            }
            this.dragStartPosition = this.x;
            this.startAnimation();
            window.removeEventListener('scroll', this);
            this.dispatchEvent('dragStart', event, [pointer]);
          };

          proto.pointerMove = function(event, pointer) {
            var moveVector = this._dragPointerMove(event, pointer);
            this.dispatchEvent('pointerMove', event, [pointer, moveVector]);
            this._dragMove(event, pointer, moveVector);
          };

          proto.dragMove = function(event, pointer, moveVector) {
            if (!this.isDraggable) {
              return;
            }
            event.preventDefault();

            this.previousDragX = this.dragX;
            // reverse if right-to-left
            var direction = this.options.rightToLeft ? -1 : 1;
            if (this.options.wrapAround) {
              // wrap around move. #589
              moveVector.x = moveVector.x % this.slideableWidth;
            }
            var dragX = this.dragStartPosition + moveVector.x * direction;

            if (!this.options.wrapAround && this.slides.length) {
              // slow drag
              var originBound = Math.max(
                -this.slides[0].target,
                this.dragStartPosition
              );
              dragX = dragX > originBound ? (dragX + originBound) * 0.5 : dragX;
              var endBound = Math.min(
                -this.getLastSlide().target,
                this.dragStartPosition
              );
              dragX = dragX < endBound ? (dragX + endBound) * 0.5 : dragX;
            }

            this.dragX = dragX;

            this.dragMoveTime = new Date();
            this.dispatchEvent('dragMove', event, [pointer, moveVector]);
          };

          proto.dragEnd = function(event, pointer) {
            if (!this.isDraggable) {
              return;
            }
            if (this.options.freeScroll) {
              this.isFreeScrolling = true;
            }
            // set selectedIndex based on where flick will end up
            var index = this.dragEndRestingSelect();

            if (this.options.freeScroll && !this.options.wrapAround) {
              // if free-scroll & not wrap around
              // do not free-scroll if going outside of bounding slides
              // so bounding slides can attract slider, and keep it in bounds
              var restingX = this.getRestingPosition();
              this.isFreeScrolling =
                -restingX > this.slides[0].target &&
                -restingX < this.getLastSlide().target;
            } else if (!this.options.freeScroll && index == this.selectedIndex) {
              // boost selection if selected index has not changed
              index += this.dragEndBoostSelect();
            }
            delete this.previousDragX;
            // apply selection
            // TODO refactor this, selecting here feels weird
            // HACK, set flag so dragging stays in correct direction
            this.isDragSelect = this.options.wrapAround;
            this.select(index);
            delete this.isDragSelect;
            this.dispatchEvent('dragEnd', event, [pointer]);
          };

          proto.dragEndRestingSelect = function() {
            var restingX = this.getRestingPosition();
            // how far away from selected slide
            var distance = Math.abs(
              this.getSlideDistance(-restingX, this.selectedIndex)
            );
            // get closet resting going up and going down
            var positiveResting = this._getClosestResting(restingX, distance, 1);
            var negativeResting = this._getClosestResting(restingX, distance, -1);
            // use closer resting for wrap-around
            var index =
              positiveResting.distance < negativeResting.distance
                ? positiveResting.index
                : negativeResting.index;
            return index;
          };

          /**
           * given resting X and distance to selected cell
           * get the distance and index of the closest cell
           * @param {Number} restingX - estimated post-flick resting position
           * @param {Number} distance - distance to selected cell
           * @param {Integer} increment - +1 or -1, going up or down
           * @returns {Object} - { distance: {Number}, index: {Integer} }
           */
          proto._getClosestResting = function(restingX, distance, increment) {
            var index = this.selectedIndex;
            var minDistance = Infinity;
            var condition =
              this.options.contain && !this.options.wrapAround
                ? // if contain, keep going if distance is equal to minDistance
                  function(d, md) {
                    return d <= md;
                  }
                : function(d, md) {
                    return d < md;
                  };
            while (condition(distance, minDistance)) {
              // measure distance to next cell
              index += increment;
              minDistance = distance;
              distance = this.getSlideDistance(-restingX, index);
              if (distance === null) {
                break;
              }
              distance = Math.abs(distance);
            }
            return {
              distance: minDistance,
              // selected was previous index
              index: index - increment
            };
          };

          /**
           * measure distance between x and a slide target
           * @param {Number} x
           * @param {Integer} index - slide index
           */
          proto.getSlideDistance = function(x, index) {
            var len = this.slides.length;
            // wrap around if at least 2 slides
            var isWrapAround = this.options.wrapAround && len > 1;
            var slideIndex = isWrapAround ? utils.modulo(index, len) : index;
            var slide = this.slides[slideIndex];
            if (!slide) {
              return null;
            }
            // add distance for wrap-around slides
            var wrap = isWrapAround ? this.slideableWidth * Math.floor(index / len) : 0;
            return x - (slide.target + wrap);
          };

          proto.dragEndBoostSelect = function() {
            // do not boost if no previousDragX or dragMoveTime
            if (
              this.previousDragX === undefined ||
              !this.dragMoveTime ||
              // or if drag was held for 100 ms
              new Date() - this.dragMoveTime > 100
            ) {
              return 0;
            }

            var distance = this.getSlideDistance(-this.dragX, this.selectedIndex);
            var delta = this.previousDragX - this.dragX;
            if (distance > 0 && delta > 0) {
              // boost to next if moving towards the right, and positive velocity
              return 1;
            } else if (distance < 0 && delta < 0) {
              // boost to previous if moving towards the left, and negative velocity
              return -1;
            }
            return 0;
          };

          // ----- staticClick ----- //

          proto.staticClick = function(event, pointer) {
            // get clickedCell, if cell was clicked
            var clickedCell = this.getParentCell(event.target);
            var cellElem = clickedCell && clickedCell.element;
            var cellIndex = clickedCell && this.cells.indexOf(clickedCell);
            this.dispatchEvent('staticClick', event, [pointer, cellElem, cellIndex]);
          };

          // ----- scroll ----- //

          proto.onscroll = function() {
            var scroll = getScrollPosition();
            var scrollMoveX = this.pointerDownScroll.x - scroll.x;
            var scrollMoveY = this.pointerDownScroll.y - scroll.y;
            // cancel click/tap if scroll is too much
            if (Math.abs(scrollMoveX) > 3 || Math.abs(scrollMoveY) > 3) {
              this._pointerDone();
            }
          };

          // ----- utils ----- //

          function getScrollPosition() {
            return {
              x: window.pageXOffset,
              y: window.pageYOffset
            };
          }

          // -----  ----- //

          return Flickity;
        });
      },
      {
        './flickity': '../../node_modules/flickity/js/flickity.js',
        unidragger: '../../node_modules/unidragger/unidragger.js',
        'fizzy-ui-utils': '../../node_modules/fizzy-ui-utils/utils.js'
      }
    ],
    '../../node_modules/flickity/js/prev-next-button.js': [
      function(require, module, exports) {
        var define;
        // prev/next buttons
        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define([
              './flickity',
              'unipointer/unipointer',
              'fizzy-ui-utils/utils'
            ], function(Flickity, Unipointer, utils) {
              return factory(window, Flickity, Unipointer, utils);
            });
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(
              window,
              require('./flickity'),
              require('unipointer'),
              require('fizzy-ui-utils')
            );
          } else {
            // browser global
            factory(window, window.Flickity, window.Unipointer, window.fizzyUIUtils);
          }
        })(window, function factory(window, Flickity, Unipointer, utils) {
          'use strict';

          var svgURI = 'http://www.w3.org/2000/svg';

          // -------------------------- PrevNextButton -------------------------- //

          function PrevNextButton(direction, parent) {
            this.direction = direction;
            this.parent = parent;
            this._create();
          }

          PrevNextButton.prototype = Object.create(Unipointer.prototype);

          PrevNextButton.prototype._create = function() {
            // properties
            this.isEnabled = true;
            this.isPrevious = this.direction == -1;
            var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
            this.isLeft = this.direction == leftDirection;

            var element = (this.element = document.createElement('button'));
            element.className = 'flickity-button flickity-prev-next-button';
            element.className += this.isPrevious ? ' previous' : ' next';
            // prevent button from submitting form http://stackoverflow.com/a/10836076/182183
            element.setAttribute('type', 'button');
            // init as disabled
            this.disable();

            element.setAttribute('aria-label', this.isPrevious ? 'Previous' : 'Next');

            // create arrow
            var svg = this.createSVG();
            element.appendChild(svg);
            // events
            this.parent.on('select', this.update.bind(this));
            this.on('pointerDown', this.parent.childUIPointerDown.bind(this.parent));
          };

          PrevNextButton.prototype.activate = function() {
            this.bindStartEvent(this.element);
            this.element.addEventListener('click', this);
            // add to DOM
            this.parent.element.appendChild(this.element);
          };

          PrevNextButton.prototype.deactivate = function() {
            // remove from DOM
            this.parent.element.removeChild(this.element);
            // click events
            this.unbindStartEvent(this.element);
            this.element.removeEventListener('click', this);
          };

          PrevNextButton.prototype.createSVG = function() {
            var svg = document.createElementNS(svgURI, 'svg');
            svg.setAttribute('class', 'flickity-button-icon');
            svg.setAttribute('viewBox', '0 0 100 100');
            var path = document.createElementNS(svgURI, 'path');
            var pathMovements = getArrowMovements(this.parent.options.arrowShape);
            path.setAttribute('d', pathMovements);
            path.setAttribute('class', 'arrow');
            // rotate arrow
            if (!this.isLeft) {
              path.setAttribute('transform', 'translate(100, 100) rotate(180) ');
            }
            svg.appendChild(path);
            return svg;
          };

          // get SVG path movmement
          function getArrowMovements(shape) {
            // use shape as movement if string
            if (typeof shape === 'string') {
              return shape;
            }
            // create movement string
            return (
              'M ' +
              shape.x0 +
              ',50' +
              ' L ' +
              shape.x1 +
              ',' +
              (shape.y1 + 50) +
              ' L ' +
              shape.x2 +
              ',' +
              (shape.y2 + 50) +
              ' L ' +
              shape.x3 +
              ',50 ' +
              ' L ' +
              shape.x2 +
              ',' +
              (50 - shape.y2) +
              ' L ' +
              shape.x1 +
              ',' +
              (50 - shape.y1) +
              ' Z'
            );
          }

          PrevNextButton.prototype.handleEvent = utils.handleEvent;

          PrevNextButton.prototype.onclick = function() {
            if (!this.isEnabled) {
              return;
            }
            this.parent.uiChange();
            var method = this.isPrevious ? 'previous' : 'next';
            this.parent[method]();
          };

          // -----  ----- //

          PrevNextButton.prototype.enable = function() {
            if (this.isEnabled) {
              return;
            }
            this.element.disabled = false;
            this.isEnabled = true;
          };

          PrevNextButton.prototype.disable = function() {
            if (!this.isEnabled) {
              return;
            }
            this.element.disabled = true;
            this.isEnabled = false;
          };

          PrevNextButton.prototype.update = function() {
            // index of first or last slide, if previous or next
            var slides = this.parent.slides;
            // enable is wrapAround and at least 2 slides
            if (this.parent.options.wrapAround && slides.length > 1) {
              this.enable();
              return;
            }
            var lastIndex = slides.length ? slides.length - 1 : 0;
            var boundIndex = this.isPrevious ? 0 : lastIndex;
            var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
            this[method]();
          };

          PrevNextButton.prototype.destroy = function() {
            this.deactivate();
            this.allOff();
          };

          // -------------------------- Flickity prototype -------------------------- //

          utils.extend(Flickity.defaults, {
            prevNextButtons: true,
            arrowShape: {
              x0: 10,
              x1: 60,
              y1: 50,
              x2: 70,
              y2: 40,
              x3: 30
            }
          });

          Flickity.createMethods.push('_createPrevNextButtons');
          var proto = Flickity.prototype;

          proto._createPrevNextButtons = function() {
            if (!this.options.prevNextButtons) {
              return;
            }

            this.prevButton = new PrevNextButton(-1, this);
            this.nextButton = new PrevNextButton(1, this);

            this.on('activate', this.activatePrevNextButtons);
          };

          proto.activatePrevNextButtons = function() {
            this.prevButton.activate();
            this.nextButton.activate();
            this.on('deactivate', this.deactivatePrevNextButtons);
          };

          proto.deactivatePrevNextButtons = function() {
            this.prevButton.deactivate();
            this.nextButton.deactivate();
            this.off('deactivate', this.deactivatePrevNextButtons);
          };

          // --------------------------  -------------------------- //

          Flickity.PrevNextButton = PrevNextButton;

          return Flickity;
        });
      },
      {
        './flickity': '../../node_modules/flickity/js/flickity.js',
        unipointer: '../../node_modules/unipointer/unipointer.js',
        'fizzy-ui-utils': '../../node_modules/fizzy-ui-utils/utils.js'
      }
    ],
    '../../node_modules/flickity/js/page-dots.js': [
      function(require, module, exports) {
        var define;
        // page dots
        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define([
              './flickity',
              'unipointer/unipointer',
              'fizzy-ui-utils/utils'
            ], function(Flickity, Unipointer, utils) {
              return factory(window, Flickity, Unipointer, utils);
            });
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(
              window,
              require('./flickity'),
              require('unipointer'),
              require('fizzy-ui-utils')
            );
          } else {
            // browser global
            factory(window, window.Flickity, window.Unipointer, window.fizzyUIUtils);
          }
        })(window, function factory(window, Flickity, Unipointer, utils) {
          // -------------------------- PageDots -------------------------- //

          'use strict';

          function PageDots(parent) {
            this.parent = parent;
            this._create();
          }

          PageDots.prototype = Object.create(Unipointer.prototype);

          PageDots.prototype._create = function() {
            // create holder element
            this.holder = document.createElement('ol');
            this.holder.className = 'flickity-page-dots';
            // create dots, array of elements
            this.dots = [];
            // events
            this.handleClick = this.onClick.bind(this);
            this.on('pointerDown', this.parent.childUIPointerDown.bind(this.parent));
          };

          PageDots.prototype.activate = function() {
            this.setDots();
            this.holder.addEventListener('click', this.handleClick);
            this.bindStartEvent(this.holder);
            // add to DOM
            this.parent.element.appendChild(this.holder);
          };

          PageDots.prototype.deactivate = function() {
            this.holder.removeEventListener('click', this.handleClick);
            this.unbindStartEvent(this.holder);
            // remove from DOM
            this.parent.element.removeChild(this.holder);
          };

          PageDots.prototype.setDots = function() {
            // get difference between number of slides and number of dots
            var delta = this.parent.slides.length - this.dots.length;
            if (delta > 0) {
              this.addDots(delta);
            } else if (delta < 0) {
              this.removeDots(-delta);
            }
          };

          PageDots.prototype.addDots = function(count) {
            var fragment = document.createDocumentFragment();
            var newDots = [];
            var length = this.dots.length;
            var max = length + count;

            for (var i = length; i < max; i++) {
              var dot = document.createElement('li');
              dot.className = 'dot';
              dot.setAttribute('aria-label', 'Page dot ' + (i + 1));
              fragment.appendChild(dot);
              newDots.push(dot);
            }

            this.holder.appendChild(fragment);
            this.dots = this.dots.concat(newDots);
          };

          PageDots.prototype.removeDots = function(count) {
            // remove from this.dots collection
            var removeDots = this.dots.splice(this.dots.length - count, count);
            // remove from DOM
            removeDots.forEach(function(dot) {
              this.holder.removeChild(dot);
            }, this);
          };

          PageDots.prototype.updateSelected = function() {
            // remove selected class on previous
            if (this.selectedDot) {
              this.selectedDot.className = 'dot';
              this.selectedDot.removeAttribute('aria-current');
            }
            // don't proceed if no dots
            if (!this.dots.length) {
              return;
            }
            this.selectedDot = this.dots[this.parent.selectedIndex];
            this.selectedDot.className = 'dot is-selected';
            this.selectedDot.setAttribute('aria-current', 'step');
          };

          PageDots.prototype.onTap = PageDots.prototype.onClick = function(event) {
            // old method name, backwards-compatible
            var target = event.target;
            // only care about dot clicks
            if (target.nodeName != 'LI') {
              return;
            }

            this.parent.uiChange();
            var index = this.dots.indexOf(target);
            this.parent.select(index);
          };

          PageDots.prototype.destroy = function() {
            this.deactivate();
            this.allOff();
          };

          Flickity.PageDots = PageDots;

          // -------------------------- Flickity -------------------------- //

          utils.extend(Flickity.defaults, {
            pageDots: true
          });

          Flickity.createMethods.push('_createPageDots');

          var proto = Flickity.prototype;

          proto._createPageDots = function() {
            if (!this.options.pageDots) {
              return;
            }
            this.pageDots = new PageDots(this);
            // events
            this.on('activate', this.activatePageDots);
            this.on('select', this.updateSelectedPageDots);
            this.on('cellChange', this.updatePageDots);
            this.on('resize', this.updatePageDots);
            this.on('deactivate', this.deactivatePageDots);
          };

          proto.activatePageDots = function() {
            this.pageDots.activate();
          };

          proto.updateSelectedPageDots = function() {
            this.pageDots.updateSelected();
          };

          proto.updatePageDots = function() {
            this.pageDots.setDots();
          };

          proto.deactivatePageDots = function() {
            this.pageDots.deactivate();
          };

          // -----  ----- //

          Flickity.PageDots = PageDots;

          return Flickity;
        });
      },
      {
        './flickity': '../../node_modules/flickity/js/flickity.js',
        unipointer: '../../node_modules/unipointer/unipointer.js',
        'fizzy-ui-utils': '../../node_modules/fizzy-ui-utils/utils.js'
      }
    ],
    '../../node_modules/flickity/js/player.js': [
      function(require, module, exports) {
        var define;
        // player & autoPlay
        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define([
              'ev-emitter/ev-emitter',
              'fizzy-ui-utils/utils',
              './flickity'
            ], function(EvEmitter, utils, Flickity) {
              return factory(EvEmitter, utils, Flickity);
            });
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(
              require('ev-emitter'),
              require('fizzy-ui-utils'),
              require('./flickity')
            );
          } else {
            // browser global
            factory(window.EvEmitter, window.fizzyUIUtils, window.Flickity);
          }
        })(window, function factory(EvEmitter, utils, Flickity) {
          'use strict';

          // -------------------------- Player -------------------------- //

          function Player(parent) {
            this.parent = parent;
            this.state = 'stopped';
            // visibility change event handler
            this.onVisibilityChange = this.visibilityChange.bind(this);
            this.onVisibilityPlay = this.visibilityPlay.bind(this);
          }

          Player.prototype = Object.create(EvEmitter.prototype);

          // start play
          Player.prototype.play = function() {
            if (this.state == 'playing') {
              return;
            }
            // do not play if page is hidden, start playing when page is visible
            var isPageHidden = document.hidden;
            if (isPageHidden) {
              document.addEventListener('visibilitychange', this.onVisibilityPlay);
              return;
            }

            this.state = 'playing';
            // listen to visibility change
            document.addEventListener('visibilitychange', this.onVisibilityChange);
            // start ticking
            this.tick();
          };

          Player.prototype.tick = function() {
            // do not tick if not playing
            if (this.state != 'playing') {
              return;
            }

            var time = this.parent.options.autoPlay;
            // default to 3 seconds
            time = typeof time === 'number' ? time : 3000;
            var _this = this;
            // HACK: reset ticks if stopped and started within interval
            this.clear();
            this.timeout = setTimeout(function() {
              _this.parent.next(true);
              _this.tick();
            }, time);
          };

          Player.prototype.stop = function() {
            this.state = 'stopped';
            this.clear();
            // remove visibility change event
            document.removeEventListener('visibilitychange', this.onVisibilityChange);
          };

          Player.prototype.clear = function() {
            clearTimeout(this.timeout);
          };

          Player.prototype.pause = function() {
            if (this.state == 'playing') {
              this.state = 'paused';
              this.clear();
            }
          };

          Player.prototype.unpause = function() {
            // re-start play if paused
            if (this.state == 'paused') {
              this.play();
            }
          };

          // pause if page visibility is hidden, unpause if visible
          Player.prototype.visibilityChange = function() {
            var isPageHidden = document.hidden;
            this[isPageHidden ? 'pause' : 'unpause']();
          };

          Player.prototype.visibilityPlay = function() {
            this.play();
            document.removeEventListener('visibilitychange', this.onVisibilityPlay);
          };

          // -------------------------- Flickity -------------------------- //

          utils.extend(Flickity.defaults, {
            pauseAutoPlayOnHover: true
          });

          Flickity.createMethods.push('_createPlayer');
          var proto = Flickity.prototype;

          proto._createPlayer = function() {
            this.player = new Player(this);

            this.on('activate', this.activatePlayer);
            this.on('uiChange', this.stopPlayer);
            this.on('pointerDown', this.stopPlayer);
            this.on('deactivate', this.deactivatePlayer);
          };

          proto.activatePlayer = function() {
            if (!this.options.autoPlay) {
              return;
            }
            this.player.play();
            this.element.addEventListener('mouseenter', this);
          };

          // Player API, don't hate the ... thanks I know where the door is

          proto.playPlayer = function() {
            this.player.play();
          };

          proto.stopPlayer = function() {
            this.player.stop();
          };

          proto.pausePlayer = function() {
            this.player.pause();
          };

          proto.unpausePlayer = function() {
            this.player.unpause();
          };

          proto.deactivatePlayer = function() {
            this.player.stop();
            this.element.removeEventListener('mouseenter', this);
          };

          // ----- mouseenter/leave ----- //

          // pause auto-play on hover
          proto.onmouseenter = function() {
            if (!this.options.pauseAutoPlayOnHover) {
              return;
            }
            this.player.pause();
            this.element.addEventListener('mouseleave', this);
          };

          // resume auto-play on hover off
          proto.onmouseleave = function() {
            this.player.unpause();
            this.element.removeEventListener('mouseleave', this);
          };

          // -----  ----- //

          Flickity.Player = Player;

          return Flickity;
        });
      },
      {
        'ev-emitter': '../../node_modules/ev-emitter/ev-emitter.js',
        'fizzy-ui-utils': '../../node_modules/fizzy-ui-utils/utils.js',
        './flickity': '../../node_modules/flickity/js/flickity.js'
      }
    ],
    '../../node_modules/flickity/js/add-remove-cell.js': [
      function(require, module, exports) {
        var define;
        // add, remove cell
        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define(['./flickity', 'fizzy-ui-utils/utils'], function(Flickity, utils) {
              return factory(window, Flickity, utils);
            });
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(
              window,
              require('./flickity'),
              require('fizzy-ui-utils')
            );
          } else {
            // browser global
            factory(window, window.Flickity, window.fizzyUIUtils);
          }
        })(window, function factory(window, Flickity, utils) {
          'use strict';

          // append cells to a document fragment
          function getCellsFragment(cells) {
            var fragment = document.createDocumentFragment();
            cells.forEach(function(cell) {
              fragment.appendChild(cell.element);
            });
            return fragment;
          }

          // -------------------------- add/remove cell prototype -------------------------- //

          var proto = Flickity.prototype;

          /**
           * Insert, prepend, or append cells
           * @param {Element, Array, NodeList} elems
           * @param {Integer} index
           */
          proto.insert = function(elems, index) {
            var cells = this._makeCells(elems);
            if (!cells || !cells.length) {
              return;
            }
            var len = this.cells.length;
            // default to append
            index = index === undefined ? len : index;
            // add cells with document fragment
            var fragment = getCellsFragment(cells);
            // append to slider
            var isAppend = index == len;
            if (isAppend) {
              this.slider.appendChild(fragment);
            } else {
              var insertCellElement = this.cells[index].element;
              this.slider.insertBefore(fragment, insertCellElement);
            }
            // add to this.cells
            if (index === 0) {
              // prepend, add to start
              this.cells = cells.concat(this.cells);
            } else if (isAppend) {
              // append, add to end
              this.cells = this.cells.concat(cells);
            } else {
              // insert in this.cells
              var endCells = this.cells.splice(index, len - index);
              this.cells = this.cells.concat(cells).concat(endCells);
            }

            this._sizeCells(cells);
            this.cellChange(index, true);
          };

          proto.append = function(elems) {
            this.insert(elems, this.cells.length);
          };

          proto.prepend = function(elems) {
            this.insert(elems, 0);
          };

          /**
           * Remove cells
           * @param {Element, Array, NodeList} elems
           */
          proto.remove = function(elems) {
            var cells = this.getCells(elems);
            if (!cells || !cells.length) {
              return;
            }

            var minCellIndex = this.cells.length - 1;
            // remove cells from collection & DOM
            cells.forEach(function(cell) {
              cell.remove();
              var index = this.cells.indexOf(cell);
              minCellIndex = Math.min(index, minCellIndex);
              utils.removeFrom(this.cells, cell);
            }, this);

            this.cellChange(minCellIndex, true);
          };

          /**
           * logic to be run after a cell's size changes
           * @param {Element} elem - cell's element
           */
          proto.cellSizeChange = function(elem) {
            var cell = this.getCell(elem);
            if (!cell) {
              return;
            }
            cell.getSize();

            var index = this.cells.indexOf(cell);
            this.cellChange(index);
          };

          /**
           * logic any time a cell is changed: added, removed, or size changed
           * @param {Integer} changedCellIndex - index of the changed cell, optional
           */
          proto.cellChange = function(changedCellIndex, isPositioningSlider) {
            var prevSelectedElem = this.selectedElement;
            this._positionCells(changedCellIndex);
            this._getWrapShiftCells();
            this.setGallerySize();
            // update selectedIndex
            // try to maintain position & select previous selected element
            var cell = this.getCell(prevSelectedElem);
            if (cell) {
              this.selectedIndex = this.getCellSlideIndex(cell);
            }
            this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex);

            this.emitEvent('cellChange', [changedCellIndex]);
            // position slider
            this.select(this.selectedIndex);
            // do not position slider after lazy load
            if (isPositioningSlider) {
              this.positionSliderAtSelected();
            }
          };

          // -----  ----- //

          return Flickity;
        });
      },
      {
        './flickity': '../../node_modules/flickity/js/flickity.js',
        'fizzy-ui-utils': '../../node_modules/fizzy-ui-utils/utils.js'
      }
    ],
    '../../node_modules/flickity/js/lazyload.js': [
      function(require, module, exports) {
        var define;
        // lazyload
        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define(['./flickity', 'fizzy-ui-utils/utils'], function(Flickity, utils) {
              return factory(window, Flickity, utils);
            });
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(
              window,
              require('./flickity'),
              require('fizzy-ui-utils')
            );
          } else {
            // browser global
            factory(window, window.Flickity, window.fizzyUIUtils);
          }
        })(window, function factory(window, Flickity, utils) {
          'use strict';

          Flickity.createMethods.push('_createLazyload');
          var proto = Flickity.prototype;

          proto._createLazyload = function() {
            this.on('select', this.lazyLoad);
          };

          proto.lazyLoad = function() {
            var lazyLoad = this.options.lazyLoad;
            if (!lazyLoad) {
              return;
            }
            // get adjacent cells, use lazyLoad option for adjacent count
            var adjCount = typeof lazyLoad === 'number' ? lazyLoad : 0;
            var cellElems = this.getAdjacentCellElements(adjCount);
            // get lazy images in those cells
            var lazyImages = [];
            cellElems.forEach(function(cellElem) {
              var lazyCellImages = getCellLazyImages(cellElem);
              lazyImages = lazyImages.concat(lazyCellImages);
            });
            // load lazy images
            lazyImages.forEach(function(img) {
              new LazyLoader(img, this);
            }, this);
          };

          function getCellLazyImages(cellElem) {
            // check if cell element is lazy image
            if (cellElem.nodeName == 'IMG') {
              var lazyloadAttr = cellElem.getAttribute('data-flickity-lazyload');
              var srcAttr = cellElem.getAttribute('data-flickity-lazyload-src');
              var srcsetAttr = cellElem.getAttribute('data-flickity-lazyload-srcset');
              if (lazyloadAttr || srcAttr || srcsetAttr) {
                return [cellElem];
              }
            }
            // select lazy images in cell
            var lazySelector =
              'img[data-flickity-lazyload], ' +
              'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
            var imgs = cellElem.querySelectorAll(lazySelector);
            return utils.makeArray(imgs);
          }

          // -------------------------- LazyLoader -------------------------- //

          /**
           * class to handle loading images
           */
          function LazyLoader(img, flickity) {
            this.img = img;
            this.flickity = flickity;
            this.load();
          }

          LazyLoader.prototype.handleEvent = utils.handleEvent;

          LazyLoader.prototype.load = function() {
            this.img.addEventListener('load', this);
            this.img.addEventListener('error', this);
            // get src & srcset
            var src =
              this.img.getAttribute('data-flickity-lazyload') ||
              this.img.getAttribute('data-flickity-lazyload-src');
            var srcset = this.img.getAttribute('data-flickity-lazyload-srcset');
            // set src & serset
            this.img.src = src;
            if (srcset) {
              this.img.setAttribute('srcset', srcset);
            }
            // remove attr
            this.img.removeAttribute('data-flickity-lazyload');
            this.img.removeAttribute('data-flickity-lazyload-src');
            this.img.removeAttribute('data-flickity-lazyload-srcset');
          };

          LazyLoader.prototype.onload = function(event) {
            this.complete(event, 'flickity-lazyloaded');
          };

          LazyLoader.prototype.onerror = function(event) {
            this.complete(event, 'flickity-lazyerror');
          };

          LazyLoader.prototype.complete = function(event, className) {
            // unbind events
            this.img.removeEventListener('load', this);
            this.img.removeEventListener('error', this);

            var cell = this.flickity.getParentCell(this.img);
            var cellElem = cell && cell.element;
            this.flickity.cellSizeChange(cellElem);

            this.img.classList.add(className);
            this.flickity.dispatchEvent('lazyLoad', event, cellElem);
          };

          // -----  ----- //

          Flickity.LazyLoader = LazyLoader;

          return Flickity;
        });
      },
      {
        './flickity': '../../node_modules/flickity/js/flickity.js',
        'fizzy-ui-utils': '../../node_modules/fizzy-ui-utils/utils.js'
      }
    ],
    '../../node_modules/flickity/js/index.js': [
      function(require, module, exports) {
        var define;
        /*!
         * Flickity v2.2.0
         * Touch, responsive, flickable carousels
         *
         * Licensed GPLv3 for open source use
         * or Flickity Commercial License for commercial use
         *
         * https://flickity.metafizzy.co
         * Copyright 2015-2018 Metafizzy
         */

        (function(window, factory) {
          // universal module definition
          /* jshint strict: false */
          if (typeof define === 'function' && define.amd) {
            // AMD
            define([
              './flickity',
              './drag',
              './prev-next-button',
              './page-dots',
              './player',
              './add-remove-cell',
              './lazyload'
            ], factory);
          } else if (typeof module === 'object' && module.exports) {
            // CommonJS
            module.exports = factory(
              require('./flickity'),
              require('./drag'),
              require('./prev-next-button'),
              require('./page-dots'),
              require('./player'),
              require('./add-remove-cell'),
              require('./lazyload')
            );
          }
        })(window, function factory(Flickity) {
          /* jshint strict: false */
          return Flickity;
        });
      },
      {
        './flickity': '../../node_modules/flickity/js/flickity.js',
        './drag': '../../node_modules/flickity/js/drag.js',
        './prev-next-button': '../../node_modules/flickity/js/prev-next-button.js',
        './page-dots': '../../node_modules/flickity/js/page-dots.js',
        './player': '../../node_modules/flickity/js/player.js',
        './add-remove-cell': '../../node_modules/flickity/js/add-remove-cell.js',
        './lazyload': '../../node_modules/flickity/js/lazyload.js'
      }
    ],
    'sliders.js': [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;

        var _flickity = _interopRequireDefault(require('flickity'));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var flickitySlider = function flickitySlider(placement, options) {
          return new _flickity.default(placement, options);
        };

        var _default = flickitySlider;
        exports.default = _default;
      },
      { flickity: '../../node_modules/flickity/js/index.js' }
    ],
    '../../node_modules/process/browser.js': [
      function(require, module, exports) {
        // shim for using process in browser
        var process = (module.exports = {}); // cached from whatever global is present so that test runners that stub it
        // don't break things.  But we need to wrap it in a try catch in case it is
        // wrapped in strict mode code which doesn't define any globals.  It's inside a
        // function because try/catches deoptimize in certain engines.

        var cachedSetTimeout;
        var cachedClearTimeout;

        function defaultSetTimout() {
          throw new Error('setTimeout has not been defined');
        }

        function defaultClearTimeout() {
          throw new Error('clearTimeout has not been defined');
        }

        (function() {
          try {
            if (typeof setTimeout === 'function') {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }

          try {
            if (typeof clearTimeout === 'function') {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();

        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            // normal enviroments in sane situations
            return setTimeout(fun, 0);
          } // if setTimeout wasn't available but was latter defined

          if (
            (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
            setTimeout
          ) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }

          try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }

        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            // normal enviroments in sane situations
            return clearTimeout(marker);
          } // if clearTimeout wasn't available but was latter defined

          if (
            (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
            clearTimeout
          ) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }

          try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
            } catch (e) {
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
            }
          }
        }

        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;

        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }

          draining = false;

          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }

          if (queue.length) {
            drainQueue();
          }
        }

        function drainQueue() {
          if (draining) {
            return;
          }

          var timeout = runTimeout(cleanUpNextTick);
          draining = true;
          var len = queue.length;

          while (len) {
            currentQueue = queue;
            queue = [];

            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }

            queueIndex = -1;
            len = queue.length;
          }

          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }

        process.nextTick = function(fun) {
          var args = new Array(arguments.length - 1);

          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }

          queue.push(new Item(fun, args));

          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        }; // v8 likes predictible objects

        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }

        Item.prototype.run = function() {
          this.fun.apply(null, this.array);
        };

        process.title = 'browser';
        process.env = {};
        process.argv = [];
        process.version = ''; // empty string to avoid regexp issues

        process.versions = {};

        function noop() {}

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;

        process.listeners = function(name) {
          return [];
        };

        process.binding = function(name) {
          throw new Error('process.binding is not supported');
        };

        process.cwd = function() {
          return '/';
        };

        process.chdir = function(dir) {
          throw new Error('process.chdir is not supported');
        };

        process.umask = function() {
          return 0;
        };
      },
      {}
    ],
    '../../node_modules/jquery/dist/jquery.js': [
      function(require, module, exports) {
        var global = arguments[3];
        var process = require('process');
        var define;
        /*!
         * jQuery JavaScript Library v3.4.1
         * https://jquery.com/
         *
         * Includes Sizzle.js
         * https://sizzlejs.com/
         *
         * Copyright JS Foundation and other contributors
         * Released under the MIT license
         * https://jquery.org/license
         *
         * Date: 2019-05-01T21:04Z
         */
        (function(global, factory) {
          'use strict';

          if (typeof module === 'object' && typeof module.exports === 'object') {
            // For CommonJS and CommonJS-like environments where a proper `window`
            // is present, execute the factory and get jQuery.
            // For environments that do not have a `window` with a `document`
            // (such as Node.js), expose a factory as module.exports.
            // This accentuates the need for the creation of a real `window`.
            // e.g. var jQuery = require("jquery")(window);
            // See ticket #14549 for more info.
            module.exports = global.document
              ? factory(global, true)
              : function(w) {
                  if (!w.document) {
                    throw new Error('jQuery requires a window with a document');
                  }
                  return factory(w);
                };
          } else {
            factory(global);
          }

          // Pass this if window is not defined yet
        })(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
          // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
          // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
          // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
          // enough that all such attempts are guarded in a try block.
          'use strict';

          var arr = [];

          var document = window.document;

          var getProto = Object.getPrototypeOf;

          var slice = arr.slice;

          var concat = arr.concat;

          var push = arr.push;

          var indexOf = arr.indexOf;

          var class2type = {};

          var toString = class2type.toString;

          var hasOwn = class2type.hasOwnProperty;

          var fnToString = hasOwn.toString;

          var ObjectFunctionString = fnToString.call(Object);

          var support = {};

          var isFunction = function isFunction(obj) {
            // Support: Chrome <=57, Firefox <=52
            // In some browsers, typeof returns "function" for HTML <object> elements
            // (i.e., `typeof document.createElement( "object" ) === "function"`).
            // We don't want to classify *any* DOM node as a function.
            return typeof obj === 'function' && typeof obj.nodeType !== 'number';
          };

          var isWindow = function isWindow(obj) {
            return obj != null && obj === obj.window;
          };

          var preservedScriptAttributes = {
            type: true,
            src: true,
            nonce: true,
            noModule: true
          };

          function DOMEval(code, node, doc) {
            doc = doc || document;

            var i;

            var val;

            var script = doc.createElement('script');

            script.text = code;
            if (node) {
              for (i in preservedScriptAttributes) {
                // Support: Firefox 64+, Edge 18+
                // Some browsers don't support the "nonce" property on scripts.
                // On the other hand, just using `getAttribute` is not enough as
                // the `nonce` attribute is reset to an empty string whenever it
                // becomes browsing-context connected.
                // See https://github.com/whatwg/html/issues/2369
                // See https://html.spec.whatwg.org/#nonce-attributes
                // The `node.getAttribute` check was added for the sake of
                // `jQuery.globalEval` so that it can fake a nonce-containing node
                // via an object.
                val = node[i] || (node.getAttribute && node.getAttribute(i));
                if (val) {
                  script.setAttribute(i, val);
                }
              }
            }
            doc.head.appendChild(script).parentNode.removeChild(script);
          }

          function toType(obj) {
            if (obj == null) {
              return obj + '';
            }

            // Support: Android <=2.3 only (functionish RegExp)
            return typeof obj === 'object' || typeof obj === 'function'
              ? class2type[toString.call(obj)] || 'object'
              : typeof obj;
          }
          /* global Symbol */
          // Defining this global in .eslintrc.json would create a danger of using the global
          // unguarded in another place, it seems safer to define global only for this module

          var version = '3.4.1';

          // Define a local copy of jQuery

          var jQuery = function(selector, context) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
          };

          // Support: Android <=4.0 only
          // Make sure we trim BOM and NBSP

          var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

          jQuery.fn = jQuery.prototype = {
            // The current version of jQuery being used
            jquery: version,

            constructor: jQuery,

            // The default length of a jQuery object is 0
            length: 0,

            toArray: function() {
              return slice.call(this);
            },

            // Get the Nth element in the matched element set OR
            // Get the whole matched element set as a clean array
            get: function(num) {
              // Return all the elements in a clean array
              if (num == null) {
                return slice.call(this);
              }

              // Return just the one element from the set
              return num < 0 ? this[num + this.length] : this[num];
            },

            // Take an array of elements and push it onto the stack
            // (returning the new matched element set)
            pushStack: function(elems) {
              // Build a new jQuery matched element set
              var ret = jQuery.merge(this.constructor(), elems);

              // Add the old object onto the stack (as a reference)
              ret.prevObject = this;

              // Return the newly-formed element set
              return ret;
            },

            // Execute a callback for every element in the matched set.
            each: function(callback) {
              return jQuery.each(this, callback);
            },

            map: function(callback) {
              return this.pushStack(
                jQuery.map(this, function(elem, i) {
                  return callback.call(elem, i, elem);
                })
              );
            },

            slice: function() {
              return this.pushStack(slice.apply(this, arguments));
            },

            first: function() {
              return this.eq(0);
            },

            last: function() {
              return this.eq(-1);
            },

            eq: function(i) {
              var len = this.length;

              var j = +i + (i < 0 ? len : 0);
              return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
            },

            end: function() {
              return this.prevObject || this.constructor();
            },

            // For internal use only.
            // Behaves like an Array's method, not like a jQuery method.
            push: push,
            sort: arr.sort,
            splice: arr.splice
          };

          jQuery.extend = jQuery.fn.extend = function() {
            var options;

            var name;

            var src;

            var copy;

            var copyIsArray;

            var clone;

            var target = arguments[0] || {};

            var i = 1;

            var length = arguments.length;

            var deep = false;

            // Handle a deep copy situation
            if (typeof target === 'boolean') {
              deep = target;

              // Skip the boolean and the target
              target = arguments[i] || {};
              i++;
            }

            // Handle case when target is a string or something (possible in deep copy)
            if (typeof target !== 'object' && !isFunction(target)) {
              target = {};
            }

            // Extend jQuery itself if only one argument is passed
            if (i === length) {
              target = this;
              i--;
            }

            for (; i < length; i++) {
              // Only deal with non-null/undefined values
              if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                  copy = options[name];

                  // Prevent Object.prototype pollution
                  // Prevent never-ending loop
                  if (name === '__proto__' || target === copy) {
                    continue;
                  }

                  // Recurse if we're merging plain objects or arrays
                  if (
                    deep &&
                    copy &&
                    (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
                  ) {
                    src = target[name];

                    // Ensure proper type for the source value
                    if (copyIsArray && !Array.isArray(src)) {
                      clone = [];
                    } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                      clone = {};
                    } else {
                      clone = src;
                    }
                    copyIsArray = false;

                    // Never move original objects, clone them
                    target[name] = jQuery.extend(deep, clone, copy);

                    // Don't bring in undefined values
                  } else if (copy !== undefined) {
                    target[name] = copy;
                  }
                }
              }
            }

            // Return the modified object
            return target;
          };

          jQuery.extend({
            // Unique for each copy of jQuery on the page
            expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),

            // Assume jQuery is ready without the ready module
            isReady: true,

            error: function(msg) {
              throw new Error(msg);
            },

            noop: function() {},

            isPlainObject: function(obj) {
              var proto, Ctor;

              // Detect obvious negatives
              // Use toString instead of jQuery.type to catch host objects
              if (!obj || toString.call(obj) !== '[object Object]') {
                return false;
              }

              proto = getProto(obj);

              // Objects with no prototype (e.g., `Object.create( null )`) are plain
              if (!proto) {
                return true;
              }

              // Objects with prototype are plain iff they were constructed by a global Object function
              Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
              return (
                typeof Ctor === 'function' &&
                fnToString.call(Ctor) === ObjectFunctionString
              );
            },

            isEmptyObject: function(obj) {
              var name;

              for (name in obj) {
                return false;
              }
              return true;
            },

            // Evaluates a script in a global context
            globalEval: function(code, options) {
              DOMEval(code, { nonce: options && options.nonce });
            },

            each: function(obj, callback) {
              var length;

              var i = 0;

              if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                  if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                  }
                }
              } else {
                for (i in obj) {
                  if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                  }
                }
              }

              return obj;
            },

            // Support: Android <=4.0 only
            trim: function(text) {
              return text == null ? '' : (text + '').replace(rtrim, '');
            },

            // results is for internal usage only
            makeArray: function(arr, results) {
              var ret = results || [];

              if (arr != null) {
                if (isArrayLike(Object(arr))) {
                  jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr);
                } else {
                  push.call(ret, arr);
                }
              }

              return ret;
            },

            inArray: function(elem, arr, i) {
              return arr == null ? -1 : indexOf.call(arr, elem, i);
            },

            // Support: Android <=4.0 only, PhantomJS 1 only
            // push.apply(_, arraylike) throws on ancient WebKit
            merge: function(first, second) {
              var len = +second.length;

              var j = 0;

              var i = first.length;

              for (; j < len; j++) {
                first[i++] = second[j];
              }

              first.length = i;

              return first;
            },

            grep: function(elems, callback, invert) {
              var callbackInverse;

              var matches = [];

              var i = 0;

              var length = elems.length;

              var callbackExpect = !invert;

              // Go through the array, only saving the items
              // that pass the validator function
              for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                  matches.push(elems[i]);
                }
              }

              return matches;
            },

            // arg is for internal usage only
            map: function(elems, callback, arg) {
              var length;

              var value;

              var i = 0;

              var ret = [];

              // Go through the array, translating each of the items to their new values
              if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                  value = callback(elems[i], i, arg);

                  if (value != null) {
                    ret.push(value);
                  }
                }

                // Go through every key on the object,
              } else {
                for (i in elems) {
                  value = callback(elems[i], i, arg);

                  if (value != null) {
                    ret.push(value);
                  }
                }
              }

              // Flatten any nested arrays
              return concat.apply([], ret);
            },

            // A global GUID counter for objects
            guid: 1,

            // jQuery.support is not used in Core but other projects attach their
            // properties to it so it needs to exist.
            support: support
          });

          if (typeof Symbol === 'function') {
            jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
          }

          // Populate the class2type map
          jQuery.each(
            'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
              ' '
            ),
            function(i, name) {
              class2type['[object ' + name + ']'] = name.toLowerCase();
            }
          );

          function isArrayLike(obj) {
            // Support: real iOS 8.2 only (not reproducible in simulator)
            // `in` check used to prevent JIT error (gh-2145)
            // hasOwn isn't used here due to false negatives
            // regarding Nodelist length in IE
            var length = !!obj && 'length' in obj && obj.length;

            var type = toType(obj);

            if (isFunction(obj) || isWindow(obj)) {
              return false;
            }

            return (
              type === 'array' ||
              length === 0 ||
              (typeof length === 'number' && length > 0 && length - 1 in obj)
            );
          }
          var Sizzle =
            /*!
             * Sizzle CSS Selector Engine v2.3.4
             * https://sizzlejs.com/
             *
             * Copyright JS Foundation and other contributors
             * Released under the MIT license
             * https://js.foundation/
             *
             * Date: 2019-04-08
             */
            (function(window) {
              var i;

              var support;

              var Expr;

              var getText;

              var isXML;

              var tokenize;

              var compile;

              var select;

              var outermostContext;

              var sortInput;

              var hasDuplicate;

              // Local document vars

              var setDocument;

              var document;

              var docElem;

              var documentIsHTML;

              var rbuggyQSA;

              var rbuggyMatches;

              var matches;

              var contains;

              // Instance-specific data

              var expando = 'sizzle' + 1 * new Date();

              var preferredDoc = window.document;

              var dirruns = 0;

              var done = 0;

              var classCache = createCache();

              var tokenCache = createCache();

              var compilerCache = createCache();

              var nonnativeSelectorCache = createCache();

              var sortOrder = function(a, b) {
                if (a === b) {
                  hasDuplicate = true;
                }
                return 0;
              };

              // Instance methods

              var hasOwn = {}.hasOwnProperty;

              var arr = [];

              var pop = arr.pop;

              var push_native = arr.push;

              var push = arr.push;

              var slice = arr.slice;

              // Use a stripped-down indexOf as it's faster than native
              // https://jsperf.com/thor-indexof-vs-for/5

              var indexOf = function(list, elem) {
                var i = 0;

                var len = list.length;
                for (; i < len; i++) {
                  if (list[i] === elem) {
                    return i;
                  }
                }
                return -1;
              };

              var booleans =
                'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped';

              // Regular expressions

              // http://www.w3.org/TR/css3-selectors/#whitespace

              var whitespace = '[\\x20\\t\\r\\n\\f]';

              // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier

              var identifier = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+';

              // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors

              var attributes =
                '\\[' +
                whitespace +
                '*(' +
                identifier +
                ')(?:' +
                whitespace +
                // Operator (capture 2)
                '*([*^$|!~]?=)' +
                whitespace +
                // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
                identifier +
                '))|)' +
                whitespace +
                '*\\]';

              var pseudos =
                ':(' +
                identifier +
                ')(?:\\((' +
                // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                // 1. quoted (capture 3; capture 4 or capture 5)
                '(\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|' +
                // 2. simple (capture 6)
                '((?:\\\\.|[^\\\\()[\\]]|' +
                attributes +
                ')*)|' +
                // 3. anything else (capture 2)
                '.*' +
                ')\\)|)';

              // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter

              var rwhitespace = new RegExp(whitespace + '+', 'g');

              var rtrim = new RegExp(
                '^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$',
                'g'
              );

              var rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*');

              var rcombinators = new RegExp(
                '^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*'
              );

              var rdescend = new RegExp(whitespace + '|>');

              var rpseudo = new RegExp(pseudos);

              var ridentifier = new RegExp('^' + identifier + '$');

              var matchExpr = {
                ID: new RegExp('^#(' + identifier + ')'),
                CLASS: new RegExp('^\\.(' + identifier + ')'),
                TAG: new RegExp('^(' + identifier + '|[*])'),
                ATTR: new RegExp('^' + attributes),
                PSEUDO: new RegExp('^' + pseudos),
                CHILD: new RegExp(
                  '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
                    whitespace +
                    '*(even|odd|(([+-]|)(\\d*)n|)' +
                    whitespace +
                    '*(?:([+-]|)' +
                    whitespace +
                    '*(\\d+)|))' +
                    whitespace +
                    '*\\)|)',
                  'i'
                ),
                bool: new RegExp('^(?:' + booleans + ')$', 'i'),
                // For use in libraries implementing .is()
                // We use this for POS matching in `select`
                needsContext: new RegExp(
                  '^' +
                    whitespace +
                    '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
                    whitespace +
                    '*((?:-\\d)?\\d*)' +
                    whitespace +
                    '*\\)|)(?=[^-]|$)',
                  'i'
                )
              };

              var rhtml = /HTML$/i;

              var rinputs = /^(?:input|select|textarea|button)$/i;

              var rheader = /^h\d$/i;

              var rnative = /^[^{]+\{\s*\[native \w/;

              // Easily-parseable/retrievable ID or TAG or CLASS selectors

              var rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;

              var rsibling = /[+~]/;

              // CSS escapes
              // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters

              var runescape = new RegExp(
                '\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)',
                'ig'
              );

              var funescape = function(_, escaped, escapedWhitespace) {
                var high = '0x' + escaped - 0x10000;
                // NaN means non-codepoint
                // Support: Firefox<24
                // Workaround erroneous numeric interpretation of +"0x"
                return high !== high || escapedWhitespace
                  ? escaped
                  : high < 0
                  ? // BMP codepoint
                    String.fromCharCode(high + 0x10000)
                  : // Supplemental Plane codepoint (surrogate pair)
                    String.fromCharCode((high >> 10) | 0xd800, (high & 0x3ff) | 0xdc00);
              };

              // CSS string/identifier serialization
              // https://drafts.csswg.org/cssom/#common-serializing-idioms

              var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g;

              var fcssescape = function(ch, asCodePoint) {
                if (asCodePoint) {
                  // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                  if (ch === '\0') {
                    return '\uFFFD';
                  }

                  // Control characters and (dependent upon position) numbers get escaped as code points
                  return (
                    ch.slice(0, -1) +
                    '\\' +
                    ch.charCodeAt(ch.length - 1).toString(16) +
                    ' '
                  );
                }

                // Other potentially-special ASCII characters get backslash-escaped
                return '\\' + ch;
              };

              // Used for iframes
              // See setDocument()
              // Removing the function wrapper causes a "Permission Denied"
              // error in IE

              var unloadHandler = function() {
                setDocument();
              };

              var inDisabledFieldset = addCombinator(
                function(elem) {
                  return (
                    elem.disabled === true && elem.nodeName.toLowerCase() === 'fieldset'
                  );
                },
                { dir: 'parentNode', next: 'legend' }
              );

              // Optimize for push.apply( _, NodeList )
              try {
                push.apply(
                  (arr = slice.call(preferredDoc.childNodes)),
                  preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[preferredDoc.childNodes.length].nodeType;
              } catch (e) {
                push = {
                  apply: arr.length
                    ? // Leverage slice if possible
                      function(target, els) {
                        push_native.apply(target, slice.call(els));
                      }
                    : // Support: IE<9
                      // Otherwise append directly
                      function(target, els) {
                        var j = target.length;

                        var i = 0;
                        // Can't trust NodeList.length
                        while ((target[j++] = els[i++])) {}
                        target.length = j - 1;
                      }
                };
              }

              function Sizzle(selector, context, results, seed) {
                var m;

                var i;

                var elem;

                var nid;

                var match;

                var groups;

                var newSelector;

                var newContext = context && context.ownerDocument;

                // nodeType defaults to 9, since context defaults to document

                var nodeType = context ? context.nodeType : 9;

                results = results || [];

                // Return early from calls with invalid selector or context
                if (
                  typeof selector !== 'string' ||
                  !selector ||
                  (nodeType !== 1 && nodeType !== 9 && nodeType !== 11)
                ) {
                  return results;
                }

                // Try to shortcut find operations (as opposed to filters) in HTML documents
                if (!seed) {
                  if (
                    (context ? context.ownerDocument || context : preferredDoc) !==
                    document
                  ) {
                    setDocument(context);
                  }
                  context = context || document;

                  if (documentIsHTML) {
                    // If the selector is sufficiently simple, try using a "get*By*" DOM method
                    // (excepting DocumentFragment context, where the methods don't exist)
                    if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                      // ID selector
                      if ((m = match[1])) {
                        // Document context
                        if (nodeType === 9) {
                          if ((elem = context.getElementById(m))) {
                            // Support: IE, Opera, Webkit
                            // TODO: identify versions
                            // getElementById can match elements by name instead of ID
                            if (elem.id === m) {
                              results.push(elem);
                              return results;
                            }
                          } else {
                            return results;
                          }

                          // Element context
                        } else {
                          // Support: IE, Opera, Webkit
                          // TODO: identify versions
                          // getElementById can match elements by name instead of ID
                          if (
                            newContext &&
                            (elem = newContext.getElementById(m)) &&
                            contains(context, elem) &&
                            elem.id === m
                          ) {
                            results.push(elem);
                            return results;
                          }
                        }

                        // Type selector
                      } else if (match[2]) {
                        push.apply(results, context.getElementsByTagName(selector));
                        return results;

                        // Class selector
                      } else if (
                        (m = match[3]) &&
                        support.getElementsByClassName &&
                        context.getElementsByClassName
                      ) {
                        push.apply(results, context.getElementsByClassName(m));
                        return results;
                      }
                    }

                    // Take advantage of querySelectorAll
                    if (
                      support.qsa &&
                      !nonnativeSelectorCache[selector + ' '] &&
                      (!rbuggyQSA || !rbuggyQSA.test(selector)) &&
                      // Support: IE 8 only
                      // Exclude object elements
                      (nodeType !== 1 || context.nodeName.toLowerCase() !== 'object')
                    ) {
                      newSelector = selector;
                      newContext = context;

                      // qSA considers elements outside a scoping root when evaluating child or
                      // descendant combinators, which is not what we want.
                      // In such cases, we work around the behavior by prefixing every selector in the
                      // list with an ID selector referencing the scope context.
                      // Thanks to Andrew Dupont for this technique.
                      if (nodeType === 1 && rdescend.test(selector)) {
                        // Capture the context ID, setting it first if necessary
                        if ((nid = context.getAttribute('id'))) {
                          nid = nid.replace(rcssescape, fcssescape);
                        } else {
                          context.setAttribute('id', (nid = expando));
                        }

                        // Prefix every selector in the list
                        groups = tokenize(selector);
                        i = groups.length;
                        while (i--) {
                          groups[i] = '#' + nid + ' ' + toSelector(groups[i]);
                        }
                        newSelector = groups.join(',');

                        // Expand context for sibling selectors
                        newContext =
                          (rsibling.test(selector) &&
                            testContext(context.parentNode)) ||
                          context;
                      }

                      try {
                        push.apply(results, newContext.querySelectorAll(newSelector));
                        return results;
                      } catch (qsaError) {
                        nonnativeSelectorCache(selector, true);
                      } finally {
                        if (nid === expando) {
                          context.removeAttribute('id');
                        }
                      }
                    }
                  }
                }

                // All others
                return select(selector.replace(rtrim, '$1'), context, results, seed);
              }

              /**
               * Create key-value caches of limited size
               * @returns {function(string, object)} Returns the Object data after storing it on itself with
               *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
               *	deleting the oldest entry
               */
              function createCache() {
                var keys = [];

                function cache(key, value) {
                  // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                  if (keys.push(key + ' ') > Expr.cacheLength) {
                    // Only keep the most recent entries
                    delete cache[keys.shift()];
                  }
                  return (cache[key + ' '] = value);
                }
                return cache;
              }

              /**
               * Mark a function for special use by Sizzle
               * @param {Function} fn The function to mark
               */
              function markFunction(fn) {
                fn[expando] = true;
                return fn;
              }

              /**
               * Support testing using an element
               * @param {Function} fn Passed the created element and returns a boolean result
               */
              function assert(fn) {
                var el = document.createElement('fieldset');

                try {
                  return !!fn(el);
                } catch (e) {
                  return false;
                } finally {
                  // Remove from its parent by default
                  if (el.parentNode) {
                    el.parentNode.removeChild(el);
                  }
                  // release memory in IE
                  el = null;
                }
              }

              /**
               * Adds the same handler for all of the specified attrs
               * @param {String} attrs Pipe-separated list of attributes
               * @param {Function} handler The method that will be applied
               */
              function addHandle(attrs, handler) {
                var arr = attrs.split('|');

                var i = arr.length;

                while (i--) {
                  Expr.attrHandle[arr[i]] = handler;
                }
              }

              /**
               * Checks document order of two siblings
               * @param {Element} a
               * @param {Element} b
               * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
               */
              function siblingCheck(a, b) {
                var cur = b && a;

                var diff =
                  cur &&
                  a.nodeType === 1 &&
                  b.nodeType === 1 &&
                  a.sourceIndex - b.sourceIndex;

                // Use IE sourceIndex if available on both nodes
                if (diff) {
                  return diff;
                }

                // Check if b follows a
                if (cur) {
                  while ((cur = cur.nextSibling)) {
                    if (cur === b) {
                      return -1;
                    }
                  }
                }

                return a ? 1 : -1;
              }

              /**
               * Returns a function to use in pseudos for input types
               * @param {String} type
               */
              function createInputPseudo(type) {
                return function(elem) {
                  var name = elem.nodeName.toLowerCase();
                  return name === 'input' && elem.type === type;
                };
              }

              /**
               * Returns a function to use in pseudos for buttons
               * @param {String} type
               */
              function createButtonPseudo(type) {
                return function(elem) {
                  var name = elem.nodeName.toLowerCase();
                  return (name === 'input' || name === 'button') && elem.type === type;
                };
              }

              /**
               * Returns a function to use in pseudos for :enabled/:disabled
               * @param {Boolean} disabled true for :disabled; false for :enabled
               */
              function createDisabledPseudo(disabled) {
                // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
                return function(elem) {
                  // Only certain elements can match :enabled or :disabled
                  // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
                  // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
                  if ('form' in elem) {
                    // Check for inherited disabledness on relevant non-disabled elements:
                    // * listed form-associated elements in a disabled fieldset
                    //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                    //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                    // * option elements in a disabled optgroup
                    //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                    // All such elements have a "form" property.
                    if (elem.parentNode && elem.disabled === false) {
                      // Option elements defer to a parent optgroup if present
                      if ('label' in elem) {
                        if ('label' in elem.parentNode) {
                          return elem.parentNode.disabled === disabled;
                        } else {
                          return elem.disabled === disabled;
                        }
                      }

                      // Support: IE 6 - 11
                      // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                      return (
                        elem.isDisabled === disabled ||
                        // Where there is no isDisabled, check manually
                        /* jshint -W018 */
                        (elem.isDisabled !== !disabled &&
                          inDisabledFieldset(elem) === disabled)
                      );
                    }

                    return elem.disabled === disabled;

                    // Try to winnow out elements that can't be disabled before trusting the disabled property.
                    // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                    // even exist on them, let alone have a boolean value.
                  } else if ('label' in elem) {
                    return elem.disabled === disabled;
                  }

                  // Remaining elements are neither :enabled nor :disabled
                  return false;
                };
              }

              /**
               * Returns a function to use in pseudos for positionals
               * @param {Function} fn
               */
              function createPositionalPseudo(fn) {
                return markFunction(function(argument) {
                  argument = +argument;
                  return markFunction(function(seed, matches) {
                    var j;

                    var matchIndexes = fn([], seed.length, argument);

                    var i = matchIndexes.length;

                    // Match elements found at the specified indexes
                    while (i--) {
                      if (seed[(j = matchIndexes[i])]) {
                        seed[j] = !(matches[j] = seed[j]);
                      }
                    }
                  });
                });
              }

              /**
               * Checks a node for validity as a Sizzle context
               * @param {Element|Object=} context
               * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
               */
              function testContext(context) {
                return (
                  context &&
                  typeof context.getElementsByTagName !== 'undefined' &&
                  context
                );
              }

              // Expose support vars for convenience
              support = Sizzle.support = {};

              /**
               * Detects XML nodes
               * @param {Element|Object} elem An element or a document
               * @returns {Boolean} True iff elem is a non-HTML XML node
               */
              isXML = Sizzle.isXML = function(elem) {
                var namespace = elem.namespaceURI;

                var docElem = (elem.ownerDocument || elem).documentElement;

                // Support: IE <=8
                // Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
                // https://bugs.jquery.com/ticket/4833
                return !rhtml.test(
                  namespace || (docElem && docElem.nodeName) || 'HTML'
                );
              };

              /**
               * Sets document-related variables once based on the current document
               * @param {Element|Object} [doc] An element or document object to use to set the document
               * @returns {Object} Returns the current document
               */
              setDocument = Sizzle.setDocument = function(node) {
                var hasCompare;

                var subWindow;

                var doc = node ? node.ownerDocument || node : preferredDoc;

                // Return early if doc is invalid or already selected
                if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                  return document;
                }

                // Update global variables
                document = doc;
                docElem = document.documentElement;
                documentIsHTML = !isXML(document);

                // Support: IE 9-11, Edge
                // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
                if (
                  preferredDoc !== document &&
                  (subWindow = document.defaultView) &&
                  subWindow.top !== subWindow
                ) {
                  // Support: IE 11, Edge
                  if (subWindow.addEventListener) {
                    subWindow.addEventListener('unload', unloadHandler, false);

                    // Support: IE 9 - 10 only
                  } else if (subWindow.attachEvent) {
                    subWindow.attachEvent('onunload', unloadHandler);
                  }
                }

                /* Attributes
	---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties
                // (excepting IE8 booleans)
                support.attributes = assert(function(el) {
                  el.className = 'i';
                  return !el.getAttribute('className');
                });

                /* getElement(s)By*
	---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function(el) {
                  el.appendChild(document.createComment(''));
                  return !el.getElementsByTagName('*').length;
                });

                // Support: IE<9
                support.getElementsByClassName = rnative.test(
                  document.getElementsByClassName
                );

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programmatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function(el) {
                  docElem.appendChild(el).id = expando;
                  return (
                    !document.getElementsByName ||
                    !document.getElementsByName(expando).length
                  );
                });

                // ID filter and find
                if (support.getById) {
                  Expr.filter['ID'] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                      return elem.getAttribute('id') === attrId;
                    };
                  };
                  Expr.find['ID'] = function(id, context) {
                    if (
                      typeof context.getElementById !== 'undefined' &&
                      documentIsHTML
                    ) {
                      var elem = context.getElementById(id);
                      return elem ? [elem] : [];
                    }
                  };
                } else {
                  Expr.filter['ID'] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                      var node =
                        typeof elem.getAttributeNode !== 'undefined' &&
                        elem.getAttributeNode('id');
                      return node && node.value === attrId;
                    };
                  };

                  // Support: IE 6 - 7 only
                  // getElementById is not reliable as a find shortcut
                  Expr.find['ID'] = function(id, context) {
                    if (
                      typeof context.getElementById !== 'undefined' &&
                      documentIsHTML
                    ) {
                      var node;

                      var i;

                      var elems;

                      var elem = context.getElementById(id);

                      if (elem) {
                        // Verify the id attribute
                        node = elem.getAttributeNode('id');
                        if (node && node.value === id) {
                          return [elem];
                        }

                        // Fall back on getElementsByName
                        elems = context.getElementsByName(id);
                        i = 0;
                        while ((elem = elems[i++])) {
                          node = elem.getAttributeNode('id');
                          if (node && node.value === id) {
                            return [elem];
                          }
                        }
                      }

                      return [];
                    }
                  };
                }

                // Tag
                Expr.find['TAG'] = support.getElementsByTagName
                  ? function(tag, context) {
                      if (typeof context.getElementsByTagName !== 'undefined') {
                        return context.getElementsByTagName(tag);

                        // DocumentFragment nodes don't have gEBTN
                      } else if (support.qsa) {
                        return context.querySelectorAll(tag);
                      }
                    }
                  : function(tag, context) {
                      var elem;

                      var tmp = [];

                      var i = 0;

                      // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too

                      var results = context.getElementsByTagName(tag);

                      // Filter out possible comments
                      if (tag === '*') {
                        while ((elem = results[i++])) {
                          if (elem.nodeType === 1) {
                            tmp.push(elem);
                          }
                        }

                        return tmp;
                      }
                      return results;
                    };

                // Class
                Expr.find['CLASS'] =
                  support.getElementsByClassName &&
                  function(className, context) {
                    if (
                      typeof context.getElementsByClassName !== 'undefined' &&
                      documentIsHTML
                    ) {
                      return context.getElementsByClassName(className);
                    }
                  };

                /* QSA/matchesSelector
	---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See https://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ((support.qsa = rnative.test(document.querySelectorAll))) {
                  // Build QSA regex
                  // Regex strategy adopted from Diego Perini
                  assert(function(el) {
                    // Select is set to empty string on purpose
                    // This is to test IE's treatment of not explicitly
                    // setting a boolean content attribute,
                    // since its presence should be enough
                    // https://bugs.jquery.com/ticket/12359
                    docElem.appendChild(el).innerHTML =
                      "<a id='" +
                      expando +
                      "'></a>" +
                      "<select id='" +
                      expando +
                      "-\r\\' msallowcapture=''>" +
                      "<option selected=''></option></select>";

                    // Support: IE8, Opera 11-12.16
                    // Nothing should be selected when empty strings follow ^= or $= or *=
                    // The test attribute must be unknown in Opera but "safe" for WinRT
                    // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                    if (el.querySelectorAll("[msallowcapture^='']").length) {
                      rbuggyQSA.push('[*^$]=' + whitespace + '*(?:\'\'|"")');
                    }

                    // Support: IE8
                    // Boolean attributes and "value" are not treated correctly
                    if (!el.querySelectorAll('[selected]').length) {
                      rbuggyQSA.push(
                        '\\[' + whitespace + '*(?:value|' + booleans + ')'
                      );
                    }

                    // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                    if (!el.querySelectorAll('[id~=' + expando + '-]').length) {
                      rbuggyQSA.push('~=');
                    }

                    // Webkit/Opera - :checked should return selected option elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    // IE8 throws error here and will not see later tests
                    if (!el.querySelectorAll(':checked').length) {
                      rbuggyQSA.push(':checked');
                    }

                    // Support: Safari 8+, iOS 8+
                    // https://bugs.webkit.org/show_bug.cgi?id=136851
                    // In-page `selector#id sibling-combinator selector` fails
                    if (!el.querySelectorAll('a#' + expando + '+*').length) {
                      rbuggyQSA.push('.#.+[+~]');
                    }
                  });

                  assert(function(el) {
                    el.innerHTML =
                      "<a href='' disabled='disabled'></a>" +
                      "<select disabled='disabled'><option/></select>";

                    // Support: Windows 8 Native Apps
                    // The type and name attributes are restricted during .innerHTML assignment
                    var input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    el.appendChild(input).setAttribute('name', 'D');

                    // Support: IE8
                    // Enforce case-sensitivity of name attribute
                    if (el.querySelectorAll('[name=d]').length) {
                      rbuggyQSA.push('name' + whitespace + '*[*^$|!~]?=');
                    }

                    // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                    // IE8 throws error here and will not see later tests
                    if (el.querySelectorAll(':enabled').length !== 2) {
                      rbuggyQSA.push(':enabled', ':disabled');
                    }

                    // Support: IE9-11+
                    // IE's :disabled selector does not pick up the children of disabled fieldsets
                    docElem.appendChild(el).disabled = true;
                    if (el.querySelectorAll(':disabled').length !== 2) {
                      rbuggyQSA.push(':enabled', ':disabled');
                    }

                    // Opera 10-11 does not throw on post-comma invalid pseudos
                    el.querySelectorAll('*,:x');
                    rbuggyQSA.push(',.*:');
                  });
                }

                if (
                  (support.matchesSelector = rnative.test(
                    (matches =
                      docElem.matches ||
                      docElem.webkitMatchesSelector ||
                      docElem.mozMatchesSelector ||
                      docElem.oMatchesSelector ||
                      docElem.msMatchesSelector)
                  ))
                ) {
                  assert(function(el) {
                    // Check to see if it's possible to do matchesSelector
                    // on a disconnected node (IE 9)
                    support.disconnectedMatch = matches.call(el, '*');

                    // This should fail with an exception
                    // Gecko does not error, returns false instead
                    matches.call(el, "[s!='']:x");
                    rbuggyMatches.push('!=', pseudos);
                  });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));
                rbuggyMatches =
                  rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'));

                /* Contains
	---------------------------------------------------------------------- */
                hasCompare = rnative.test(docElem.compareDocumentPosition);

                // Element contains another
                // Purposefully self-exclusive
                // As in, an element does not contain itself
                contains =
                  hasCompare || rnative.test(docElem.contains)
                    ? function(a, b) {
                        var adown = a.nodeType === 9 ? a.documentElement : a;

                        var bup = b && b.parentNode;
                        return (
                          a === bup ||
                          !!(
                            bup &&
                            bup.nodeType === 1 &&
                            (adown.contains
                              ? adown.contains(bup)
                              : a.compareDocumentPosition &&
                                a.compareDocumentPosition(bup) & 16)
                          )
                        );
                      }
                    : function(a, b) {
                        if (b) {
                          while ((b = b.parentNode)) {
                            if (b === a) {
                              return true;
                            }
                          }
                        }
                        return false;
                      };

                /* Sorting
	---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare
                  ? function(a, b) {
                      // Flag for duplicate removal
                      if (a === b) {
                        hasDuplicate = true;
                        return 0;
                      }

                      // Sort on method existence if only one input has compareDocumentPosition
                      var compare =
                        !a.compareDocumentPosition - !b.compareDocumentPosition;
                      if (compare) {
                        return compare;
                      }

                      // Calculate position if both inputs belong to the same document
                      compare =
                        (a.ownerDocument || a) === (b.ownerDocument || b)
                          ? a.compareDocumentPosition(b)
                          : // Otherwise we know they are disconnected
                            1;

                      // Disconnected nodes
                      if (
                        compare & 1 ||
                        (!support.sortDetached &&
                          b.compareDocumentPosition(a) === compare)
                      ) {
                        // Choose the first element that is related to our preferred document
                        if (
                          a === document ||
                          (a.ownerDocument === preferredDoc &&
                            contains(preferredDoc, a))
                        ) {
                          return -1;
                        }
                        if (
                          b === document ||
                          (b.ownerDocument === preferredDoc &&
                            contains(preferredDoc, b))
                        ) {
                          return 1;
                        }

                        // Maintain original order
                        return sortInput
                          ? indexOf(sortInput, a) - indexOf(sortInput, b)
                          : 0;
                      }

                      return compare & 4 ? -1 : 1;
                    }
                  : function(a, b) {
                      // Exit early if the nodes are identical
                      if (a === b) {
                        hasDuplicate = true;
                        return 0;
                      }

                      var cur;

                      var i = 0;

                      var aup = a.parentNode;

                      var bup = b.parentNode;

                      var ap = [a];

                      var bp = [b];

                      // Parentless nodes are either documents or disconnected
                      if (!aup || !bup) {
                        return a === document
                          ? -1
                          : b === document
                          ? 1
                          : aup
                          ? -1
                          : bup
                          ? 1
                          : sortInput
                          ? indexOf(sortInput, a) - indexOf(sortInput, b)
                          : 0;

                        // If the nodes are siblings, we can do a quick check
                      } else if (aup === bup) {
                        return siblingCheck(a, b);
                      }

                      // Otherwise we need full lists of their ancestors for comparison
                      cur = a;
                      while ((cur = cur.parentNode)) {
                        ap.unshift(cur);
                      }
                      cur = b;
                      while ((cur = cur.parentNode)) {
                        bp.unshift(cur);
                      }

                      // Walk down the tree looking for a discrepancy
                      while (ap[i] === bp[i]) {
                        i++;
                      }

                      return i
                        ? // Do a sibling check if the nodes have a common ancestor
                          siblingCheck(ap[i], bp[i])
                        : // Otherwise nodes in our document sort first
                        ap[i] === preferredDoc
                        ? -1
                        : bp[i] === preferredDoc
                        ? 1
                        : 0;
                    };

                return document;
              };

              Sizzle.matches = function(expr, elements) {
                return Sizzle(expr, null, null, elements);
              };

              Sizzle.matchesSelector = function(elem, expr) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                  setDocument(elem);
                }

                if (
                  support.matchesSelector &&
                  documentIsHTML &&
                  !nonnativeSelectorCache[expr + ' '] &&
                  (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                  (!rbuggyQSA || !rbuggyQSA.test(expr))
                ) {
                  try {
                    var ret = matches.call(elem, expr);

                    // IE 9's matchesSelector returns false on disconnected nodes
                    if (
                      ret ||
                      support.disconnectedMatch ||
                      // As well, disconnected nodes are said to be in a document
                      // fragment in IE 9
                      (elem.document && elem.document.nodeType !== 11)
                    ) {
                      return ret;
                    }
                  } catch (e) {
                    nonnativeSelectorCache(expr, true);
                  }
                }

                return Sizzle(expr, document, null, [elem]).length > 0;
              };

              Sizzle.contains = function(context, elem) {
                // Set document vars if needed
                if ((context.ownerDocument || context) !== document) {
                  setDocument(context);
                }
                return contains(context, elem);
              };

              Sizzle.attr = function(elem, name) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                  setDocument(elem);
                }

                var fn = Expr.attrHandle[name.toLowerCase()];

                // Don't get fooled by Object.prototype properties (jQuery #13807)

                var val =
                  fn && hasOwn.call(Expr.attrHandle, name.toLowerCase())
                    ? fn(elem, name, !documentIsHTML)
                    : undefined;

                return val !== undefined
                  ? val
                  : support.attributes || !documentIsHTML
                  ? elem.getAttribute(name)
                  : (val = elem.getAttributeNode(name)) && val.specified
                  ? val.value
                  : null;
              };

              Sizzle.escape = function(sel) {
                return (sel + '').replace(rcssescape, fcssescape);
              };

              Sizzle.error = function(msg) {
                throw new Error('Syntax error, unrecognized expression: ' + msg);
              };

              /**
               * Document sorting and removing duplicates
               * @param {ArrayLike} results
               */
              Sizzle.uniqueSort = function(results) {
                var elem;

                var duplicates = [];

                var j = 0;

                var i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);

                if (hasDuplicate) {
                  while ((elem = results[i++])) {
                    if (elem === results[i]) {
                      j = duplicates.push(i);
                    }
                  }
                  while (j--) {
                    results.splice(duplicates[j], 1);
                  }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
              };

              /**
               * Utility function for retrieving the text value of an array of DOM nodes
               * @param {Array|Element} elem
               */
              getText = Sizzle.getText = function(elem) {
                var node;

                var ret = '';

                var i = 0;

                var nodeType = elem.nodeType;

                if (!nodeType) {
                  // If no nodeType, this is expected to be an array
                  while ((node = elem[i++])) {
                    // Do not traverse comment nodes
                    ret += getText(node);
                  }
                } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                  // Use textContent for elements
                  // innerText usage removed for consistency of new lines (jQuery #11153)
                  if (typeof elem.textContent === 'string') {
                    return elem.textContent;
                  } else {
                    // Traverse its children
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                      ret += getText(elem);
                    }
                  }
                } else if (nodeType === 3 || nodeType === 4) {
                  return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
              };

              Expr = Sizzle.selectors = {
                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                  '>': { dir: 'parentNode', first: true },
                  ' ': { dir: 'parentNode' },
                  '+': { dir: 'previousSibling', first: true },
                  '~': { dir: 'previousSibling' }
                },

                preFilter: {
                  ATTR: function(match) {
                    match[1] = match[1].replace(runescape, funescape);

                    // Move the given value to match[3] whether quoted or unquoted
                    match[3] = (match[3] || match[4] || match[5] || '').replace(
                      runescape,
                      funescape
                    );

                    if (match[2] === '~=') {
                      match[3] = ' ' + match[3] + ' ';
                    }

                    return match.slice(0, 4);
                  },

                  CHILD: function(match) {
                    /* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
                    match[1] = match[1].toLowerCase();

                    if (match[1].slice(0, 3) === 'nth') {
                      // nth-* requires argument
                      if (!match[3]) {
                        Sizzle.error(match[0]);
                      }

                      // numeric x and y parameters for Expr.filter.CHILD
                      // remember that false/true cast respectively to 0/1
                      match[4] = +(match[4]
                        ? match[5] + (match[6] || 1)
                        : 2 * (match[3] === 'even' || match[3] === 'odd'));
                      match[5] = +(match[7] + match[8] || match[3] === 'odd');

                      // other types prohibit arguments
                    } else if (match[3]) {
                      Sizzle.error(match[0]);
                    }

                    return match;
                  },

                  PSEUDO: function(match) {
                    var excess;

                    var unquoted = !match[6] && match[2];

                    if (matchExpr['CHILD'].test(match[0])) {
                      return null;
                    }

                    // Accept quoted arguments as-is
                    if (match[3]) {
                      match[2] = match[4] || match[5] || '';

                      // Strip excess characters from unquoted arguments
                    } else if (
                      unquoted &&
                      rpseudo.test(unquoted) &&
                      // Get excess from tokenize (recursively)
                      (excess = tokenize(unquoted, true)) &&
                      // advance to the next closing parenthesis
                      (excess =
                        unquoted.indexOf(')', unquoted.length - excess) -
                        unquoted.length)
                    ) {
                      // excess is a negative index
                      match[0] = match[0].slice(0, excess);
                      match[2] = unquoted.slice(0, excess);
                    }

                    // Return only captures needed by the pseudo filter method (type and argument)
                    return match.slice(0, 3);
                  }
                },

                filter: {
                  TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector
                      .replace(runescape, funescape)
                      .toLowerCase();
                    return nodeNameSelector === '*'
                      ? function() {
                          return true;
                        }
                      : function(elem) {
                          return (
                            elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                          );
                        };
                  },

                  CLASS: function(className) {
                    var pattern = classCache[className + ' '];

                    return (
                      pattern ||
                      ((pattern = new RegExp(
                        '(^|' + whitespace + ')' + className + '(' + whitespace + '|$)'
                      )) &&
                        classCache(className, function(elem) {
                          return pattern.test(
                            (typeof elem.className === 'string' && elem.className) ||
                              (typeof elem.getAttribute !== 'undefined' &&
                                elem.getAttribute('class')) ||
                              ''
                          );
                        }))
                    );
                  },

                  ATTR: function(name, operator, check) {
                    return function(elem) {
                      var result = Sizzle.attr(elem, name);

                      if (result == null) {
                        return operator === '!=';
                      }
                      if (!operator) {
                        return true;
                      }

                      result += '';

                      return operator === '='
                        ? result === check
                        : operator === '!='
                        ? result !== check
                        : operator === '^='
                        ? check && result.indexOf(check) === 0
                        : operator === '*='
                        ? check && result.indexOf(check) > -1
                        : operator === '$='
                        ? check && result.slice(-check.length) === check
                        : operator === '~='
                        ? (' ' + result.replace(rwhitespace, ' ') + ' ').indexOf(
                            check
                          ) > -1
                        : operator === '|='
                        ? result === check ||
                          result.slice(0, check.length + 1) === check + '-'
                        : false;
                    };
                  },

                  CHILD: function(type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== 'nth';

                    var forward = type.slice(-4) !== 'last';

                    var ofType = what === 'of-type';

                    return first === 1 && last === 0
                      ? // Shortcut for :nth-*(n)
                        function(elem) {
                          return !!elem.parentNode;
                        }
                      : function(elem, context, xml) {
                          var cache;

                          var uniqueCache;

                          var outerCache;

                          var node;

                          var nodeIndex;

                          var start;

                          var dir =
                            simple !== forward ? 'nextSibling' : 'previousSibling';

                          var parent = elem.parentNode;

                          var name = ofType && elem.nodeName.toLowerCase();

                          var useCache = !xml && !ofType;

                          var diff = false;

                          if (parent) {
                            // :(first|last|only)-(child|of-type)
                            if (simple) {
                              while (dir) {
                                node = elem;
                                while ((node = node[dir])) {
                                  if (
                                    ofType
                                      ? node.nodeName.toLowerCase() === name
                                      : node.nodeType === 1
                                  ) {
                                    return false;
                                  }
                                }
                                // Reverse direction for :only-* (if we haven't yet done so)
                                start = dir =
                                  type === 'only' && !start && 'nextSibling';
                              }
                              return true;
                            }

                            start = [forward ? parent.firstChild : parent.lastChild];

                            // non-xml :nth-child(...) stores cache data on `parent`
                            if (forward && useCache) {
                              // Seek `elem` from a previously-cached index

                              // ...in a gzip-friendly way
                              node = parent;
                              outerCache = node[expando] || (node[expando] = {});

                              // Support: IE <9 only
                              // Defend against cloned attroperties (jQuery gh-1709)
                              uniqueCache =
                                outerCache[node.uniqueID] ||
                                (outerCache[node.uniqueID] = {});

                              cache = uniqueCache[type] || [];
                              nodeIndex = cache[0] === dirruns && cache[1];
                              diff = nodeIndex && cache[2];
                              node = nodeIndex && parent.childNodes[nodeIndex];

                              while (
                                (node =
                                  (++nodeIndex && node && node[dir]) ||
                                  // Fallback to seeking `elem` from the start
                                  (diff = nodeIndex = 0) ||
                                  start.pop())
                              ) {
                                // When found, cache indexes on `parent` and break
                                if (node.nodeType === 1 && ++diff && node === elem) {
                                  uniqueCache[type] = [dirruns, nodeIndex, diff];
                                  break;
                                }
                              }
                            } else {
                              // Use previously-cached element index if available
                              if (useCache) {
                                // ...in a gzip-friendly way
                                node = elem;
                                outerCache = node[expando] || (node[expando] = {});

                                // Support: IE <9 only
                                // Defend against cloned attroperties (jQuery gh-1709)
                                uniqueCache =
                                  outerCache[node.uniqueID] ||
                                  (outerCache[node.uniqueID] = {});

                                cache = uniqueCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = nodeIndex;
                              }

                              // xml :nth-child(...)
                              // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                              if (diff === false) {
                                // Use the same loop as above to seek `elem` from the start
                                while (
                                  (node =
                                    (++nodeIndex && node && node[dir]) ||
                                    (diff = nodeIndex = 0) ||
                                    start.pop())
                                ) {
                                  if (
                                    (ofType
                                      ? node.nodeName.toLowerCase() === name
                                      : node.nodeType === 1) &&
                                    ++diff
                                  ) {
                                    // Cache the index of each encountered element
                                    if (useCache) {
                                      outerCache =
                                        node[expando] || (node[expando] = {});

                                      // Support: IE <9 only
                                      // Defend against cloned attroperties (jQuery gh-1709)
                                      uniqueCache =
                                        outerCache[node.uniqueID] ||
                                        (outerCache[node.uniqueID] = {});

                                      uniqueCache[type] = [dirruns, diff];
                                    }

                                    if (node === elem) {
                                      break;
                                    }
                                  }
                                }
                              }
                            }

                            // Incorporate the offset, then check against cycle size
                            diff -= last;
                            return (
                              diff === first ||
                              (diff % first === 0 && diff / first >= 0)
                            );
                          }
                        };
                  },

                  PSEUDO: function(pseudo, argument) {
                    // pseudo-class names are case-insensitive
                    // http://www.w3.org/TR/selectors/#pseudo-classes
                    // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                    // Remember that setFilters inherits from pseudos
                    var args;

                    var fn =
                      Expr.pseudos[pseudo] ||
                      Expr.setFilters[pseudo.toLowerCase()] ||
                      Sizzle.error('unsupported pseudo: ' + pseudo);

                    // The user may use createPseudo to indicate that
                    // arguments are needed to create the filter function
                    // just as Sizzle does
                    if (fn[expando]) {
                      return fn(argument);
                    }

                    // But maintain support for old signatures
                    if (fn.length > 1) {
                      args = [pseudo, pseudo, '', argument];
                      return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())
                        ? markFunction(function(seed, matches) {
                            var idx;

                            var matched = fn(seed, argument);

                            var i = matched.length;
                            while (i--) {
                              idx = indexOf(seed, matched[i]);
                              seed[idx] = !(matches[idx] = matched[i]);
                            }
                          })
                        : function(elem) {
                            return fn(elem, 0, args);
                          };
                    }

                    return fn;
                  }
                },

                pseudos: {
                  // Potentially complex pseudos
                  not: markFunction(function(selector) {
                    // Trim the selector passed to compile
                    // to avoid treating leading and trailing
                    // spaces as combinators
                    var input = [];

                    var results = [];

                    var matcher = compile(selector.replace(rtrim, '$1'));

                    return matcher[expando]
                      ? markFunction(function(seed, matches, context, xml) {
                          var elem;

                          var unmatched = matcher(seed, null, xml, []);

                          var i = seed.length;

                          // Match elements unmatched by `matcher`
                          while (i--) {
                            if ((elem = unmatched[i])) {
                              seed[i] = !(matches[i] = elem);
                            }
                          }
                        })
                      : function(elem, context, xml) {
                          input[0] = elem;
                          matcher(input, null, xml, results);
                          // Don't keep the element (issue #299)
                          input[0] = null;
                          return !results.pop();
                        };
                  }),

                  has: markFunction(function(selector) {
                    return function(elem) {
                      return Sizzle(selector, elem).length > 0;
                    };
                  }),

                  contains: markFunction(function(text) {
                    text = text.replace(runescape, funescape);
                    return function(elem) {
                      return (elem.textContent || getText(elem)).indexOf(text) > -1;
                    };
                  }),

                  // "Whether an element is represented by a :lang() selector
                  // is based solely on the element's language value
                  // being equal to the identifier C,
                  // or beginning with the identifier C immediately followed by "-".
                  // The matching of C against the element's language value is performed case-insensitively.
                  // The identifier C does not have to be a valid language name."
                  // http://www.w3.org/TR/selectors/#lang-pseudo
                  lang: markFunction(function(lang) {
                    // lang value must be a valid identifier
                    if (!ridentifier.test(lang || '')) {
                      Sizzle.error('unsupported lang: ' + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function(elem) {
                      var elemLang;
                      do {
                        if (
                          (elemLang = documentIsHTML
                            ? elem.lang
                            : elem.getAttribute('xml:lang') ||
                              elem.getAttribute('lang'))
                        ) {
                          elemLang = elemLang.toLowerCase();
                          return (
                            elemLang === lang || elemLang.indexOf(lang + '-') === 0
                          );
                        }
                      } while ((elem = elem.parentNode) && elem.nodeType === 1);
                      return false;
                    };
                  }),

                  // Miscellaneous
                  target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                  },

                  root: function(elem) {
                    return elem === docElem;
                  },

                  focus: function(elem) {
                    return (
                      elem === document.activeElement &&
                      (!document.hasFocus || document.hasFocus()) &&
                      !!(elem.type || elem.href || ~elem.tabIndex)
                    );
                  },

                  // Boolean properties
                  enabled: createDisabledPseudo(false),
                  disabled: createDisabledPseudo(true),

                  checked: function(elem) {
                    // In CSS3, :checked should return both checked and selected elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    var nodeName = elem.nodeName.toLowerCase();
                    return (
                      (nodeName === 'input' && !!elem.checked) ||
                      (nodeName === 'option' && !!elem.selected)
                    );
                  },

                  selected: function(elem) {
                    // Accessing this property makes selected-by-default
                    // options in Safari work properly
                    if (elem.parentNode) {
                      elem.parentNode.selectedIndex;
                    }

                    return elem.selected === true;
                  },

                  // Contents
                  empty: function(elem) {
                    // http://www.w3.org/TR/selectors/#empty-pseudo
                    // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                    //   but not by others (comment: 8; processing instruction: 7; etc.)
                    // nodeType < 6 works because attributes (2) do not appear as children
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                      if (elem.nodeType < 6) {
                        return false;
                      }
                    }
                    return true;
                  },

                  parent: function(elem) {
                    return !Expr.pseudos['empty'](elem);
                  },

                  // Element/input types
                  header: function(elem) {
                    return rheader.test(elem.nodeName);
                  },

                  input: function(elem) {
                    return rinputs.test(elem.nodeName);
                  },

                  button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (
                      (name === 'input' && elem.type === 'button') || name === 'button'
                    );
                  },

                  text: function(elem) {
                    var attr;
                    return (
                      elem.nodeName.toLowerCase() === 'input' &&
                      elem.type === 'text' &&
                      // Support: IE<8
                      // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                      ((attr = elem.getAttribute('type')) == null ||
                        attr.toLowerCase() === 'text')
                    );
                  },

                  // Position-in-collection
                  first: createPositionalPseudo(function() {
                    return [0];
                  }),

                  last: createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1];
                  }),

                  eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument];
                  }),

                  even: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 0;
                    for (; i < length; i += 2) {
                      matchIndexes.push(i);
                    }
                    return matchIndexes;
                  }),

                  odd: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 1;
                    for (; i < length; i += 2) {
                      matchIndexes.push(i);
                    }
                    return matchIndexes;
                  }),

                  lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i =
                      argument < 0
                        ? argument + length
                        : argument > length
                        ? length
                        : argument;
                    for (; --i >= 0; ) {
                      matchIndexes.push(i);
                    }
                    return matchIndexes;
                  }),

                  gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; ++i < length; ) {
                      matchIndexes.push(i);
                    }
                    return matchIndexes;
                  })
                }
              };

              Expr.pseudos['nth'] = Expr.pseudos['eq'];

              // Add button/input type pseudos
              for (i in {
                radio: true,
                checkbox: true,
                file: true,
                password: true,
                image: true
              }) {
                Expr.pseudos[i] = createInputPseudo(i);
              }
              for (i in { submit: true, reset: true }) {
                Expr.pseudos[i] = createButtonPseudo(i);
              }

              // Easy API for creating new setFilters
              function setFilters() {}
              setFilters.prototype = Expr.filters = Expr.pseudos;
              Expr.setFilters = new setFilters();

              tokenize = Sizzle.tokenize = function(selector, parseOnly) {
                var matched;

                var match;

                var tokens;

                var type;

                var soFar;

                var groups;

                var preFilters;

                var cached = tokenCache[selector + ' '];

                if (cached) {
                  return parseOnly ? 0 : cached.slice(0);
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while (soFar) {
                  // Comma and first run
                  if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                      // Don't consume trailing commas as valid
                      soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push((tokens = []));
                  }

                  matched = false;

                  // Combinators
                  if ((match = rcombinators.exec(soFar))) {
                    matched = match.shift();
                    tokens.push({
                      value: matched,
                      // Cast descendant combinators to space
                      type: match[0].replace(rtrim, ' ')
                    });
                    soFar = soFar.slice(matched.length);
                  }

                  // Filters
                  for (type in Expr.filter) {
                    if (
                      (match = matchExpr[type].exec(soFar)) &&
                      (!preFilters[type] || (match = preFilters[type](match)))
                    ) {
                      matched = match.shift();
                      tokens.push({
                        value: matched,
                        type: type,
                        matches: match
                      });
                      soFar = soFar.slice(matched.length);
                    }
                  }

                  if (!matched) {
                    break;
                  }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly
                  ? soFar.length
                  : soFar
                  ? Sizzle.error(selector)
                  : // Cache the tokens
                    tokenCache(selector, groups).slice(0);
              };

              function toSelector(tokens) {
                var i = 0;

                var len = tokens.length;

                var selector = '';
                for (; i < len; i++) {
                  selector += tokens[i].value;
                }
                return selector;
              }

              function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir;

                var skip = combinator.next;

                var key = skip || dir;

                var checkNonElements = base && key === 'parentNode';

                var doneName = done++;

                return combinator.first
                  ? // Check against closest ancestor/preceding element
                    function(elem, context, xml) {
                      while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                          return matcher(elem, context, xml);
                        }
                      }
                      return false;
                    }
                  : // Check against all ancestor/preceding elements
                    function(elem, context, xml) {
                      var oldCache;

                      var uniqueCache;

                      var outerCache;

                      var newCache = [dirruns, doneName];

                      // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                      if (xml) {
                        while ((elem = elem[dir])) {
                          if (elem.nodeType === 1 || checkNonElements) {
                            if (matcher(elem, context, xml)) {
                              return true;
                            }
                          }
                        }
                      } else {
                        while ((elem = elem[dir])) {
                          if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});

                            // Support: IE <9 only
                            // Defend against cloned attroperties (jQuery gh-1709)
                            uniqueCache =
                              outerCache[elem.uniqueID] ||
                              (outerCache[elem.uniqueID] = {});

                            if (skip && skip === elem.nodeName.toLowerCase()) {
                              elem = elem[dir] || elem;
                            } else if (
                              (oldCache = uniqueCache[key]) &&
                              oldCache[0] === dirruns &&
                              oldCache[1] === doneName
                            ) {
                              // Assign to newCache so results back-propagate to previous elements
                              return (newCache[2] = oldCache[2]);
                            } else {
                              // Reuse newcache so results back-propagate to previous elements
                              uniqueCache[key] = newCache;

                              // A match means we're done; a fail means we have to keep checking
                              if ((newCache[2] = matcher(elem, context, xml))) {
                                return true;
                              }
                            }
                          }
                        }
                      }
                      return false;
                    };
              }

              function elementMatcher(matchers) {
                return matchers.length > 1
                  ? function(elem, context, xml) {
                      var i = matchers.length;
                      while (i--) {
                        if (!matchers[i](elem, context, xml)) {
                          return false;
                        }
                      }
                      return true;
                    }
                  : matchers[0];
              }

              function multipleContexts(selector, contexts, results) {
                var i = 0;

                var len = contexts.length;
                for (; i < len; i++) {
                  Sizzle(selector, contexts[i], results);
                }
                return results;
              }

              function condense(unmatched, map, filter, context, xml) {
                var elem;

                var newUnmatched = [];

                var i = 0;

                var len = unmatched.length;

                var mapped = map != null;

                for (; i < len; i++) {
                  if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                      newUnmatched.push(elem);
                      if (mapped) {
                        map.push(i);
                      }
                    }
                  }
                }

                return newUnmatched;
              }

              function setMatcher(
                preFilter,
                selector,
                matcher,
                postFilter,
                postFinder,
                postSelector
              ) {
                if (postFilter && !postFilter[expando]) {
                  postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                  postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function(seed, results, context, xml) {
                  var temp;

                  var i;

                  var elem;

                  var preMap = [];

                  var postMap = [];

                  var preexisting = results.length;

                  // Get initial elements from seed or context

                  var elems =
                    seed ||
                    multipleContexts(
                      selector || '*',
                      context.nodeType ? [context] : context,
                      []
                    );

                  // Prefilter to get matcher input, preserving a map for seed-results synchronization

                  var matcherIn =
                    preFilter && (seed || !selector)
                      ? condense(elems, preMap, preFilter, context, xml)
                      : elems;

                  var matcherOut = matcher
                    ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                      postFinder || (seed ? preFilter : preexisting || postFilter)
                      ? // ...intermediate processing is necessary
                        []
                      : // ...otherwise use results directly
                        results
                    : matcherIn;

                  // Find primary matches
                  if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                  }

                  // Apply postFilter
                  if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);

                    // Un-match failing elements by moving them back to matcherIn
                    i = temp.length;
                    while (i--) {
                      if ((elem = temp[i])) {
                        matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                      }
                    }
                  }

                  if (seed) {
                    if (postFinder || preFilter) {
                      if (postFinder) {
                        // Get the final matcherOut by condensing this intermediate into postFinder contexts
                        temp = [];
                        i = matcherOut.length;
                        while (i--) {
                          if ((elem = matcherOut[i])) {
                            // Restore matcherIn since elem is not yet a final match
                            temp.push((matcherIn[i] = elem));
                          }
                        }
                        postFinder(null, (matcherOut = []), temp, xml);
                      }

                      // Move matched elements from seed to results to keep them synchronized
                      i = matcherOut.length;
                      while (i--) {
                        if (
                          (elem = matcherOut[i]) &&
                          (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1
                        ) {
                          seed[temp] = !(results[temp] = elem);
                        }
                      }
                    }

                    // Add elements to results, through postFinder if defined
                  } else {
                    matcherOut = condense(
                      matcherOut === results
                        ? matcherOut.splice(preexisting, matcherOut.length)
                        : matcherOut
                    );
                    if (postFinder) {
                      postFinder(null, results, matcherOut, xml);
                    } else {
                      push.apply(results, matcherOut);
                    }
                  }
                });
              }

              function matcherFromTokens(tokens) {
                var checkContext;

                var matcher;

                var j;

                var len = tokens.length;

                var leadingRelative = Expr.relative[tokens[0].type];

                var implicitRelative = leadingRelative || Expr.relative[' '];

                var i = leadingRelative ? 1 : 0;

                // The foundational matcher ensures that elements are reachable from top-level context(s)

                var matchContext = addCombinator(
                  function(elem) {
                    return elem === checkContext;
                  },
                  implicitRelative,
                  true
                );

                var matchAnyContext = addCombinator(
                  function(elem) {
                    return indexOf(checkContext, elem) > -1;
                  },
                  implicitRelative,
                  true
                );

                var matchers = [
                  function(elem, context, xml) {
                    var ret =
                      (!leadingRelative && (xml || context !== outermostContext)) ||
                      ((checkContext = context).nodeType
                        ? matchContext(elem, context, xml)
                        : matchAnyContext(elem, context, xml));
                    // Avoid hanging onto element (issue #299)
                    checkContext = null;
                    return ret;
                  }
                ];

                for (; i < len; i++) {
                  if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                  } else {
                    matcher = Expr.filter[tokens[i].type].apply(
                      null,
                      tokens[i].matches
                    );

                    // Return special upon seeing a positional matcher
                    if (matcher[expando]) {
                      // Find the next relative operator (if any) for proper handling
                      j = ++i;
                      for (; j < len; j++) {
                        if (Expr.relative[tokens[j].type]) {
                          break;
                        }
                      }
                      return setMatcher(
                        i > 1 && elementMatcher(matchers),
                        i > 1 &&
                          toSelector(
                            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                            tokens
                              .slice(0, i - 1)
                              .concat({ value: tokens[i - 2].type === ' ' ? '*' : '' })
                          ).replace(rtrim, '$1'),
                        matcher,
                        i < j && matcherFromTokens(tokens.slice(i, j)),
                        j < len && matcherFromTokens((tokens = tokens.slice(j))),
                        j < len && toSelector(tokens)
                      );
                    }
                    matchers.push(matcher);
                  }
                }

                return elementMatcher(matchers);
              }

              function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0;

                var byElement = elementMatchers.length > 0;

                var superMatcher = function(seed, context, xml, results, outermost) {
                  var elem;

                  var j;

                  var matcher;

                  var matchedCount = 0;

                  var i = '0';

                  var unmatched = seed && [];

                  var setMatched = [];

                  var contextBackup = outermostContext;

                  // We must always have either seed elements or outermost context

                  var elems = seed || (byElement && Expr.find['TAG']('*', outermost));

                  // Use integer dirruns iff this is the outermost matcher

                  var dirrunsUnique = (dirruns +=
                    contextBackup == null ? 1 : Math.random() || 0.1);

                  var len = elems.length;

                  if (outermost) {
                    outermostContext = context === document || context || outermost;
                  }

                  // Add elements passing elementMatchers directly to results
                  // Support: IE<9, Safari
                  // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                  for (; i !== len && (elem = elems[i]) != null; i++) {
                    if (byElement && elem) {
                      j = 0;
                      if (!context && elem.ownerDocument !== document) {
                        setDocument(elem);
                        xml = !documentIsHTML;
                      }
                      while ((matcher = elementMatchers[j++])) {
                        if (matcher(elem, context || document, xml)) {
                          results.push(elem);
                          break;
                        }
                      }
                      if (outermost) {
                        dirruns = dirrunsUnique;
                      }
                    }

                    // Track unmatched elements for set filters
                    if (bySet) {
                      // They will have gone through all possible matchers
                      if ((elem = !matcher && elem)) {
                        matchedCount--;
                      }

                      // Lengthen the array for every element, matched or not
                      if (seed) {
                        unmatched.push(elem);
                      }
                    }
                  }

                  // `i` is now the count of elements visited above, and adding it to `matchedCount`
                  // makes the latter nonnegative.
                  matchedCount += i;

                  // Apply set filters to unmatched elements
                  // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                  // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                  // no element matchers and no seed.
                  // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                  // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                  // numerically zero.
                  if (bySet && i !== matchedCount) {
                    j = 0;
                    while ((matcher = setMatchers[j++])) {
                      matcher(unmatched, setMatched, context, xml);
                    }

                    if (seed) {
                      // Reintegrate element matches to eliminate the need for sorting
                      if (matchedCount > 0) {
                        while (i--) {
                          if (!(unmatched[i] || setMatched[i])) {
                            setMatched[i] = pop.call(results);
                          }
                        }
                      }

                      // Discard index placeholder values to get only actual matches
                      setMatched = condense(setMatched);
                    }

                    // Add matches to results
                    push.apply(results, setMatched);

                    // Seedless set matches succeeding multiple successful matchers stipulate sorting
                    if (
                      outermost &&
                      !seed &&
                      setMatched.length > 0 &&
                      matchedCount + setMatchers.length > 1
                    ) {
                      Sizzle.uniqueSort(results);
                    }
                  }

                  // Override manipulation of globals by nested matchers
                  if (outermost) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup;
                  }

                  return unmatched;
                };

                return bySet ? markFunction(superMatcher) : superMatcher;
              }

              compile = Sizzle.compile = function(
                selector,
                match /* Internal Use Only */
              ) {
                var i;

                var setMatchers = [];

                var elementMatchers = [];

                var cached = compilerCache[selector + ' '];

                if (!cached) {
                  // Generate a function of recursive functions that can be used to check each element
                  if (!match) {
                    match = tokenize(selector);
                  }
                  i = match.length;
                  while (i--) {
                    cached = matcherFromTokens(match[i]);
                    if (cached[expando]) {
                      setMatchers.push(cached);
                    } else {
                      elementMatchers.push(cached);
                    }
                  }

                  // Cache the compiled function
                  cached = compilerCache(
                    selector,
                    matcherFromGroupMatchers(elementMatchers, setMatchers)
                  );

                  // Save selector and tokenization
                  cached.selector = selector;
                }
                return cached;
              };

              /**
               * A low-level selection function that works with Sizzle's compiled
               *  selector functions
               * @param {String|Function} selector A selector or a pre-compiled
               *  selector function built with Sizzle.compile
               * @param {Element} context
               * @param {Array} [results]
               * @param {Array} [seed] A set of elements to match against
               */
              select = Sizzle.select = function(selector, context, results, seed) {
                var i;

                var tokens;

                var token;

                var type;

                var find;

                var compiled = typeof selector === 'function' && selector;

                var match =
                  !seed && tokenize((selector = compiled.selector || selector));

                results = results || [];

                // Try to minimize operations if there is only one selector in the list and no seed
                // (the latter of which guarantees us context)
                if (match.length === 1) {
                  // Reduce context if the leading compound selector is an ID
                  tokens = match[0] = match[0].slice(0);
                  if (
                    tokens.length > 2 &&
                    (token = tokens[0]).type === 'ID' &&
                    context.nodeType === 9 &&
                    documentIsHTML &&
                    Expr.relative[tokens[1].type]
                  ) {
                    context = (Expr.find['ID'](
                      token.matches[0].replace(runescape, funescape),
                      context
                    ) || [])[0];
                    if (!context) {
                      return results;

                      // Precompiled matchers will still verify ancestry, so step up a level
                    } else if (compiled) {
                      context = context.parentNode;
                    }

                    selector = selector.slice(tokens.shift().value.length);
                  }

                  // Fetch a seed set for right-to-left matching
                  i = matchExpr['needsContext'].test(selector) ? 0 : tokens.length;
                  while (i--) {
                    token = tokens[i];

                    // Abort if we hit a combinator
                    if (Expr.relative[(type = token.type)]) {
                      break;
                    }
                    if ((find = Expr.find[type])) {
                      // Search, expanding context for leading sibling combinators
                      if (
                        (seed = find(
                          token.matches[0].replace(runescape, funescape),
                          (rsibling.test(tokens[0].type) &&
                            testContext(context.parentNode)) ||
                            context
                        ))
                      ) {
                        // If seed is empty or no tokens remain, we can return early
                        tokens.splice(i, 1);
                        selector = seed.length && toSelector(tokens);
                        if (!selector) {
                          push.apply(results, seed);
                          return results;
                        }

                        break;
                      }
                    }
                  }
                }

                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                (compiled || compile(selector, match))(
                  seed,
                  context,
                  !documentIsHTML,
                  results,
                  !context ||
                    (rsibling.test(selector) && testContext(context.parentNode)) ||
                    context
                );
                return results;
              };

              // One-time assignments

              // Sort stability
              support.sortStable =
                expando
                  .split('')
                  .sort(sortOrder)
                  .join('') === expando;

              // Support: Chrome 14-35+
              // Always assume duplicates if they aren't passed to the comparison function
              support.detectDuplicates = !!hasDuplicate;

              // Initialize against the default document
              setDocument();

              // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
              // Detached nodes confoundingly follow *each other*
              support.sortDetached = assert(function(el) {
                // Should return 1, but returns 4 (following)
                return (
                  el.compareDocumentPosition(document.createElement('fieldset')) & 1
                );
              });

              // Support: IE<8
              // Prevent attribute/property "interpolation"
              // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
              if (
                !assert(function(el) {
                  el.innerHTML = "<a href='#'></a>";
                  return el.firstChild.getAttribute('href') === '#';
                })
              ) {
                addHandle('type|href|height|width', function(elem, name, isXML) {
                  if (!isXML) {
                    return elem.getAttribute(
                      name,
                      name.toLowerCase() === 'type' ? 1 : 2
                    );
                  }
                });
              }

              // Support: IE<9
              // Use defaultValue in place of getAttribute("value")
              if (
                !support.attributes ||
                !assert(function(el) {
                  el.innerHTML = '<input/>';
                  el.firstChild.setAttribute('value', '');
                  return el.firstChild.getAttribute('value') === '';
                })
              ) {
                addHandle('value', function(elem, name, isXML) {
                  if (!isXML && elem.nodeName.toLowerCase() === 'input') {
                    return elem.defaultValue;
                  }
                });
              }

              // Support: IE<9
              // Use getAttributeNode to fetch booleans when getAttribute lies
              if (
                !assert(function(el) {
                  return el.getAttribute('disabled') == null;
                })
              ) {
                addHandle(booleans, function(elem, name, isXML) {
                  var val;
                  if (!isXML) {
                    return elem[name] === true
                      ? name.toLowerCase()
                      : (val = elem.getAttributeNode(name)) && val.specified
                      ? val.value
                      : null;
                  }
                });
              }

              return Sizzle;
            })(window);

          jQuery.find = Sizzle;
          jQuery.expr = Sizzle.selectors;

          // Deprecated
          jQuery.expr[':'] = jQuery.expr.pseudos;
          jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
          jQuery.text = Sizzle.getText;
          jQuery.isXMLDoc = Sizzle.isXML;
          jQuery.contains = Sizzle.contains;
          jQuery.escapeSelector = Sizzle.escape;

          var dir = function(elem, dir, until) {
            var matched = [];

            var truncate = until !== undefined;

            while ((elem = elem[dir]) && elem.nodeType !== 9) {
              if (elem.nodeType === 1) {
                if (truncate && jQuery(elem).is(until)) {
                  break;
                }
                matched.push(elem);
              }
            }
            return matched;
          };

          var siblings = function(n, elem) {
            var matched = [];

            for (; n; n = n.nextSibling) {
              if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
              }
            }

            return matched;
          };

          var rneedsContext = jQuery.expr.match.needsContext;

          function nodeName(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
          }
          var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

          // Implement the identical functionality for filter and not
          function winnow(elements, qualifier, not) {
            if (isFunction(qualifier)) {
              return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
              });
            }

            // Single element
            if (qualifier.nodeType) {
              return jQuery.grep(elements, function(elem) {
                return (elem === qualifier) !== not;
              });
            }

            // Arraylike of elements (jQuery, arguments, Array)
            if (typeof qualifier !== 'string') {
              return jQuery.grep(elements, function(elem) {
                return indexOf.call(qualifier, elem) > -1 !== not;
              });
            }

            // Filtered directly for both simple and complex selectors
            return jQuery.filter(qualifier, elements, not);
          }

          jQuery.filter = function(expr, elems, not) {
            var elem = elems[0];

            if (not) {
              expr = ':not(' + expr + ')';
            }

            if (elems.length === 1 && elem.nodeType === 1) {
              return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
            }

            return jQuery.find.matches(
              expr,
              jQuery.grep(elems, function(elem) {
                return elem.nodeType === 1;
              })
            );
          };

          jQuery.fn.extend({
            find: function(selector) {
              var i;

              var ret;

              var len = this.length;

              var self = this;

              if (typeof selector !== 'string') {
                return this.pushStack(
                  jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++) {
                      if (jQuery.contains(self[i], this)) {
                        return true;
                      }
                    }
                  })
                );
              }

              ret = this.pushStack([]);

              for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
              }

              return len > 1 ? jQuery.uniqueSort(ret) : ret;
            },
            filter: function(selector) {
              return this.pushStack(winnow(this, selector || [], false));
            },
            not: function(selector) {
              return this.pushStack(winnow(this, selector || [], true));
            },
            is: function(selector) {
              return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === 'string' && rneedsContext.test(selector)
                  ? jQuery(selector)
                  : selector || [],
                false
              ).length;
            }
          });

          // Initialize a jQuery object

          // A central reference to the root jQuery(document)
          var rootjQuery;

          // A simple way to check for HTML strings
          // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
          // Strict HTML recognition (#11290: must start with <)
          // Shortcut simple #id case for speed

          var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;

          var init = (jQuery.fn.init = function(selector, context, root) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
              return this;
            }

            // Method init() accepts an alternate rootjQuery
            // so migrate can support jQuery.sub (gh-2101)
            root = root || rootjQuery;

            // Handle HTML strings
            if (typeof selector === 'string') {
              if (
                selector[0] === '<' &&
                selector[selector.length - 1] === '>' &&
                selector.length >= 3
              ) {
                // Assume that strings that start and end with <> are HTML and skip the regex check
                match = [null, selector, null];
              } else {
                match = rquickExpr.exec(selector);
              }

              // Match html or make sure no context is specified for #id
              if (match && (match[1] || !context)) {
                // HANDLE: $(html) -> $(array)
                if (match[1]) {
                  context = context instanceof jQuery ? context[0] : context;

                  // Option to run scripts is true for back-compat
                  // Intentionally let the error be thrown if parseHTML is not present
                  jQuery.merge(
                    this,
                    jQuery.parseHTML(
                      match[1],
                      context && context.nodeType
                        ? context.ownerDocument || context
                        : document,
                      true
                    )
                  );

                  // HANDLE: $(html, props)
                  if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                    for (match in context) {
                      // Properties of context are called as methods if possible
                      if (isFunction(this[match])) {
                        this[match](context[match]);

                        // ...and otherwise set as attributes
                      } else {
                        this.attr(match, context[match]);
                      }
                    }
                  }

                  return this;

                  // HANDLE: $(#id)
                } else {
                  elem = document.getElementById(match[2]);

                  if (elem) {
                    // Inject the element directly into the jQuery object
                    this[0] = elem;
                    this.length = 1;
                  }
                  return this;
                }

                // HANDLE: $(expr, $(...))
              } else if (!context || context.jquery) {
                return (context || root).find(selector);

                // HANDLE: $(expr, context)
                // (which is just equivalent to: $(context).find(expr)
              } else {
                return this.constructor(context).find(selector);
              }

              // HANDLE: $(DOMElement)
            } else if (selector.nodeType) {
              this[0] = selector;
              this.length = 1;
              return this;

              // HANDLE: $(function)
              // Shortcut for document ready
            } else if (isFunction(selector)) {
              return root.ready !== undefined
                ? root.ready(selector)
                : // Execute immediately if ready is not present
                  selector(jQuery);
            }

            return jQuery.makeArray(selector, this);
          });

          // Give the init function the jQuery prototype for later instantiation
          init.prototype = jQuery.fn;

          // Initialize central reference
          rootjQuery = jQuery(document);

          var rparentsprev = /^(?:parents|prev(?:Until|All))/;

          // Methods guaranteed to produce a unique set when starting from a unique set

          var guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
          };

          jQuery.fn.extend({
            has: function(target) {
              var targets = jQuery(target, this);

              var l = targets.length;

              return this.filter(function() {
                var i = 0;
                for (; i < l; i++) {
                  if (jQuery.contains(this, targets[i])) {
                    return true;
                  }
                }
              });
            },

            closest: function(selectors, context) {
              var cur;

              var i = 0;

              var l = this.length;

              var matched = [];

              var targets = typeof selectors !== 'string' && jQuery(selectors);

              // Positional selectors never match, since there's no _selection_ context
              if (!rneedsContext.test(selectors)) {
                for (; i < l; i++) {
                  for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                    // Always skip document fragments
                    if (
                      cur.nodeType < 11 &&
                      (targets
                        ? targets.index(cur) > -1
                        : // Don't pass non-elements to Sizzle
                          cur.nodeType === 1 &&
                          jQuery.find.matchesSelector(cur, selectors))
                    ) {
                      matched.push(cur);
                      break;
                    }
                  }
                }
              }

              return this.pushStack(
                matched.length > 1 ? jQuery.uniqueSort(matched) : matched
              );
            },

            // Determine the position of an element within the set
            index: function(elem) {
              // No argument, return index in parent
              if (!elem) {
                return this[0] && this[0].parentNode
                  ? this.first().prevAll().length
                  : -1;
              }

              // Index in selector
              if (typeof elem === 'string') {
                return indexOf.call(jQuery(elem), this[0]);
              }

              // Locate the position of the desired element
              return indexOf.call(
                this,

                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem
              );
            },

            add: function(selector, context) {
              return this.pushStack(
                jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context)))
              );
            },

            addBack: function(selector) {
              return this.add(
                selector == null ? this.prevObject : this.prevObject.filter(selector)
              );
            }
          });

          function sibling(cur, dir) {
            while ((cur = cur[dir]) && cur.nodeType !== 1) {}
            return cur;
          }

          jQuery.each(
            {
              parent: function(elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
              },
              parents: function(elem) {
                return dir(elem, 'parentNode');
              },
              parentsUntil: function(elem, i, until) {
                return dir(elem, 'parentNode', until);
              },
              next: function(elem) {
                return sibling(elem, 'nextSibling');
              },
              prev: function(elem) {
                return sibling(elem, 'previousSibling');
              },
              nextAll: function(elem) {
                return dir(elem, 'nextSibling');
              },
              prevAll: function(elem) {
                return dir(elem, 'previousSibling');
              },
              nextUntil: function(elem, i, until) {
                return dir(elem, 'nextSibling', until);
              },
              prevUntil: function(elem, i, until) {
                return dir(elem, 'previousSibling', until);
              },
              siblings: function(elem) {
                return siblings((elem.parentNode || {}).firstChild, elem);
              },
              children: function(elem) {
                return siblings(elem.firstChild);
              },
              contents: function(elem) {
                if (typeof elem.contentDocument !== 'undefined') {
                  return elem.contentDocument;
                }

                // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
                // Treat the template element as a regular one in browsers that
                // don't support it.
                if (nodeName(elem, 'template')) {
                  elem = elem.content || elem;
                }

                return jQuery.merge([], elem.childNodes);
              }
            },
            function(name, fn) {
              jQuery.fn[name] = function(until, selector) {
                var matched = jQuery.map(this, fn, until);

                if (name.slice(-5) !== 'Until') {
                  selector = until;
                }

                if (selector && typeof selector === 'string') {
                  matched = jQuery.filter(selector, matched);
                }

                if (this.length > 1) {
                  // Remove duplicates
                  if (!guaranteedUnique[name]) {
                    jQuery.uniqueSort(matched);
                  }

                  // Reverse order for parents* and prev-derivatives
                  if (rparentsprev.test(name)) {
                    matched.reverse();
                  }
                }

                return this.pushStack(matched);
              };
            }
          );
          var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

          // Convert String-formatted options into Object-formatted ones
          function createOptions(options) {
            var object = {};
            jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
              object[flag] = true;
            });
            return object;
          }

          /*
           * Create a callback list using the following parameters:
           *
           *	options: an optional list of space-separated options that will change how
           *			the callback list behaves or a more traditional option object
           *
           * By default a callback list will act like an event callback list and can be
           * "fired" multiple times.
           *
           * Possible options:
           *
           *	once:			will ensure the callback list can only be fired once (like a Deferred)
           *
           *	memory:			will keep track of previous values and will call any callback added
           *					after the list has been fired right away with the latest "memorized"
           *					values (like a Deferred)
           *
           *	unique:			will ensure a callback can only be added once (no duplicate in the list)
           *
           *	stopOnFalse:	interrupt callings when a callback returns false
           *
           */
          jQuery.Callbacks = function(options) {
            // Convert options from String-formatted to Object-formatted if needed
            // (we check in cache first)
            options =
              typeof options === 'string'
                ? createOptions(options)
                : jQuery.extend({}, options);

            var // Flag to know if list is currently firing
              firing;

            // Last fire value for non-forgettable lists

            var memory;

            // Flag to know if list was already fired

            var fired;

            // Flag to prevent firing

            var locked;

            // Actual callback list

            var list = [];

            // Queue of execution data for repeatable lists

            var queue = [];

            // Index of currently firing callback (modified by add/remove as needed)

            var firingIndex = -1;

            // Fire callbacks

            var fire = function() {
              // Enforce single-firing
              locked = locked || options.once;

              // Execute callbacks for all pending executions,
              // respecting firingIndex overrides and runtime changes
              fired = firing = true;
              for (; queue.length; firingIndex = -1) {
                memory = queue.shift();
                while (++firingIndex < list.length) {
                  // Run callback and check for early termination
                  if (
                    list[firingIndex].apply(memory[0], memory[1]) === false &&
                    options.stopOnFalse
                  ) {
                    // Jump to end and forget the data so .add doesn't re-fire
                    firingIndex = list.length;
                    memory = false;
                  }
                }
              }

              // Forget the data if we're done with it
              if (!options.memory) {
                memory = false;
              }

              firing = false;

              // Clean up if we're done firing for good
              if (locked) {
                // Keep an empty list if we have data for future add calls
                if (memory) {
                  list = [];

                  // Otherwise, this object is spent
                } else {
                  list = '';
                }
              }
            };

            // Actual Callbacks object

            var self = {
              // Add a callback or a collection of callbacks to the list
              add: function() {
                if (list) {
                  // If we have memory from a past run, we should fire after adding
                  if (memory && !firing) {
                    firingIndex = list.length - 1;
                    queue.push(memory);
                  }

                  (function add(args) {
                    jQuery.each(args, function(_, arg) {
                      if (isFunction(arg)) {
                        if (!options.unique || !self.has(arg)) {
                          list.push(arg);
                        }
                      } else if (arg && arg.length && toType(arg) !== 'string') {
                        // Inspect recursively
                        add(arg);
                      }
                    });
                  })(arguments);

                  if (memory && !firing) {
                    fire();
                  }
                }
                return this;
              },

              // Remove a callback from the list
              remove: function() {
                jQuery.each(arguments, function(_, arg) {
                  var index;
                  while ((index = jQuery.inArray(arg, list, index)) > -1) {
                    list.splice(index, 1);

                    // Handle firing indexes
                    if (index <= firingIndex) {
                      firingIndex--;
                    }
                  }
                });
                return this;
              },

              // Check if a given callback is in the list.
              // If no argument is given, return whether or not list has callbacks attached.
              has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
              },

              // Remove all callbacks from the list
              empty: function() {
                if (list) {
                  list = [];
                }
                return this;
              },

              // Disable .fire and .add
              // Abort any current/pending executions
              // Clear all callbacks and values
              disable: function() {
                locked = queue = [];
                list = memory = '';
                return this;
              },
              disabled: function() {
                return !list;
              },

              // Disable .fire
              // Also disable .add unless we have memory (since it would have no effect)
              // Abort any pending executions
              lock: function() {
                locked = queue = [];
                if (!memory && !firing) {
                  list = memory = '';
                }
                return this;
              },
              locked: function() {
                return !!locked;
              },

              // Call all callbacks with the given context and arguments
              fireWith: function(context, args) {
                if (!locked) {
                  args = args || [];
                  args = [context, args.slice ? args.slice() : args];
                  queue.push(args);
                  if (!firing) {
                    fire();
                  }
                }
                return this;
              },

              // Call all the callbacks with the given arguments
              fire: function() {
                self.fireWith(this, arguments);
                return this;
              },

              // To know if the callbacks have already been called at least once
              fired: function() {
                return !!fired;
              }
            };

            return self;
          };

          function Identity(v) {
            return v;
          }
          function Thrower(ex) {
            throw ex;
          }

          function adoptValue(value, resolve, reject, noValue) {
            var method;

            try {
              // Check for promise aspect first to privilege synchronous behavior
              if (value && isFunction((method = value.promise))) {
                method
                  .call(value)
                  .done(resolve)
                  .fail(reject);

                // Other thenables
              } else if (value && isFunction((method = value.then))) {
                method.call(value, resolve, reject);

                // Other non-thenables
              } else {
                // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
                // * false: [ value ].slice( 0 ) => resolve( value )
                // * true: [ value ].slice( 1 ) => resolve()
                resolve.apply(undefined, [value].slice(noValue));
              }

              // For Promises/A+, convert exceptions into rejections
              // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
              // Deferred#then to conditionally suppress rejection.
            } catch (value) {
              // Support: Android 4.0 only
              // Strict mode functions invoked without .call/.apply get global-object context
              reject.apply(undefined, [value]);
            }
          }

          jQuery.extend({
            Deferred: function(func) {
              var tuples = [
                // action, add listener, callbacks,
                // ... .then handlers, argument index, [final state]
                [
                  'notify',
                  'progress',
                  jQuery.Callbacks('memory'),
                  jQuery.Callbacks('memory'),
                  2
                ],
                [
                  'resolve',
                  'done',
                  jQuery.Callbacks('once memory'),
                  jQuery.Callbacks('once memory'),
                  0,
                  'resolved'
                ],
                [
                  'reject',
                  'fail',
                  jQuery.Callbacks('once memory'),
                  jQuery.Callbacks('once memory'),
                  1,
                  'rejected'
                ]
              ];

              var state = 'pending';

              var promise = {
                state: function() {
                  return state;
                },
                always: function() {
                  deferred.done(arguments).fail(arguments);
                  return this;
                },
                catch: function(fn) {
                  return promise.then(null, fn);
                },

                // Keep pipe for back-compat
                pipe: function(/* fnDone, fnFail, fnProgress */) {
                  var fns = arguments;

                  return jQuery
                    .Deferred(function(newDefer) {
                      jQuery.each(tuples, function(i, tuple) {
                        // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                        var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];

                        // deferred.progress(function() { bind to newDefer or newDefer.notify })
                        // deferred.done(function() { bind to newDefer or newDefer.resolve })
                        // deferred.fail(function() { bind to newDefer or newDefer.reject })
                        deferred[tuple[1]](function() {
                          var returned = fn && fn.apply(this, arguments);
                          if (returned && isFunction(returned.promise)) {
                            returned
                              .promise()
                              .progress(newDefer.notify)
                              .done(newDefer.resolve)
                              .fail(newDefer.reject);
                          } else {
                            newDefer[tuple[0] + 'With'](
                              this,
                              fn ? [returned] : arguments
                            );
                          }
                        });
                      });
                      fns = null;
                    })
                    .promise();
                },
                then: function(onFulfilled, onRejected, onProgress) {
                  var maxDepth = 0;
                  function resolve(depth, deferred, handler, special) {
                    return function() {
                      var that = this;

                      var args = arguments;

                      var mightThrow = function() {
                        var returned, then;

                        // Support: Promises/A+ section 2.3.3.3.3
                        // https://promisesaplus.com/#point-59
                        // Ignore double-resolution attempts
                        if (depth < maxDepth) {
                          return;
                        }

                        returned = handler.apply(that, args);

                        // Support: Promises/A+ section 2.3.1
                        // https://promisesaplus.com/#point-48
                        if (returned === deferred.promise()) {
                          throw new TypeError('Thenable self-resolution');
                        }

                        // Support: Promises/A+ sections 2.3.3.1, 3.5
                        // https://promisesaplus.com/#point-54
                        // https://promisesaplus.com/#point-75
                        // Retrieve `then` only once
                        then =
                          returned &&
                          // Support: Promises/A+ section 2.3.4
                          // https://promisesaplus.com/#point-64
                          // Only check objects and functions for thenability
                          (typeof returned === 'object' ||
                            typeof returned === 'function') &&
                          returned.then;

                        // Handle a returned thenable
                        if (isFunction(then)) {
                          // Special processors (notify) just wait for resolution
                          if (special) {
                            then.call(
                              returned,
                              resolve(maxDepth, deferred, Identity, special),
                              resolve(maxDepth, deferred, Thrower, special)
                            );

                            // Normal processors (resolve) also hook into progress
                          } else {
                            // ...and disregard older resolution values
                            maxDepth++;

                            then.call(
                              returned,
                              resolve(maxDepth, deferred, Identity, special),
                              resolve(maxDepth, deferred, Thrower, special),
                              resolve(maxDepth, deferred, Identity, deferred.notifyWith)
                            );
                          }

                          // Handle all other returned values
                        } else {
                          // Only substitute handlers pass on context
                          // and multiple values (non-spec behavior)
                          if (handler !== Identity) {
                            that = undefined;
                            args = [returned];
                          }

                          // Process the value(s)
                          // Default process is resolve
                          (special || deferred.resolveWith)(that, args);
                        }
                      };

                      // Only normal processors (resolve) catch and reject exceptions

                      var process = special
                        ? mightThrow
                        : function() {
                            try {
                              mightThrow();
                            } catch (e) {
                              if (jQuery.Deferred.exceptionHook) {
                                jQuery.Deferred.exceptionHook(e, process.stackTrace);
                              }

                              // Support: Promises/A+ section 2.3.3.3.4.1
                              // https://promisesaplus.com/#point-61
                              // Ignore post-resolution exceptions
                              if (depth + 1 >= maxDepth) {
                                // Only substitute handlers pass on context
                                // and multiple values (non-spec behavior)
                                if (handler !== Thrower) {
                                  that = undefined;
                                  args = [e];
                                }

                                deferred.rejectWith(that, args);
                              }
                            }
                          };

                      // Support: Promises/A+ section 2.3.3.3.1
                      // https://promisesaplus.com/#point-57
                      // Re-resolve promises immediately to dodge false rejection from
                      // subsequent errors
                      if (depth) {
                        process();
                      } else {
                        // Call an optional hook to record the stack, in case of exception
                        // since it's otherwise lost when execution goes async
                        if (jQuery.Deferred.getStackHook) {
                          process.stackTrace = jQuery.Deferred.getStackHook();
                        }
                        window.setTimeout(process);
                      }
                    };
                  }

                  return jQuery
                    .Deferred(function(newDefer) {
                      // progress_handlers.add( ... )
                      tuples[0][3].add(
                        resolve(
                          0,
                          newDefer,
                          isFunction(onProgress) ? onProgress : Identity,
                          newDefer.notifyWith
                        )
                      );

                      // fulfilled_handlers.add( ... )
                      tuples[1][3].add(
                        resolve(
                          0,
                          newDefer,
                          isFunction(onFulfilled) ? onFulfilled : Identity
                        )
                      );

                      // rejected_handlers.add( ... )
                      tuples[2][3].add(
                        resolve(
                          0,
                          newDefer,
                          isFunction(onRejected) ? onRejected : Thrower
                        )
                      );
                    })
                    .promise();
                },

                // Get a promise for this deferred
                // If obj is provided, the promise aspect is added to the object
                promise: function(obj) {
                  return obj != null ? jQuery.extend(obj, promise) : promise;
                }
              };

              var deferred = {};

              // Add list-specific methods
              jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2];

                var stateString = tuple[5];

                // promise.progress = list.add
                // promise.done = list.add
                // promise.fail = list.add
                promise[tuple[1]] = list.add;

                // Handle state
                if (stateString) {
                  list.add(
                    function() {
                      // state = "resolved" (i.e., fulfilled)
                      // state = "rejected"
                      state = stateString;
                    },

                    // rejected_callbacks.disable
                    // fulfilled_callbacks.disable
                    tuples[3 - i][2].disable,

                    // rejected_handlers.disable
                    // fulfilled_handlers.disable
                    tuples[3 - i][3].disable,

                    // progress_callbacks.lock
                    tuples[0][2].lock,

                    // progress_handlers.lock
                    tuples[0][3].lock
                  );
                }

                // progress_handlers.fire
                // fulfilled_handlers.fire
                // rejected_handlers.fire
                list.add(tuple[3].fire);

                // deferred.notify = function() { deferred.notifyWith(...) }
                // deferred.resolve = function() { deferred.resolveWith(...) }
                // deferred.reject = function() { deferred.rejectWith(...) }
                deferred[tuple[0]] = function() {
                  deferred[tuple[0] + 'With'](
                    this === deferred ? undefined : this,
                    arguments
                  );
                  return this;
                };

                // deferred.notifyWith = list.fireWith
                // deferred.resolveWith = list.fireWith
                // deferred.rejectWith = list.fireWith
                deferred[tuple[0] + 'With'] = list.fireWith;
              });

              // Make the deferred a promise
              promise.promise(deferred);

              // Call given func if any
              if (func) {
                func.call(deferred, deferred);
              }

              // All done!
              return deferred;
            },

            // Deferred helper
            when: function(singleValue) {
              var // count of uncompleted subordinates
                remaining = arguments.length;

              // count of unprocessed arguments

              var i = remaining;

              // subordinate fulfillment data

              var resolveContexts = Array(i);

              var resolveValues = slice.call(arguments);

              // the master Deferred

              var master = jQuery.Deferred();

              // subordinate callback factory

              var updateFunc = function(i) {
                return function(value) {
                  resolveContexts[i] = this;
                  resolveValues[i] =
                    arguments.length > 1 ? slice.call(arguments) : value;
                  if (!--remaining) {
                    master.resolveWith(resolveContexts, resolveValues);
                  }
                };
              };

              // Single- and empty arguments are adopted like Promise.resolve
              if (remaining <= 1) {
                adoptValue(
                  singleValue,
                  master.done(updateFunc(i)).resolve,
                  master.reject,
                  !remaining
                );

                // Use .then() to unwrap secondary thenables (cf. gh-3000)
                if (
                  master.state() === 'pending' ||
                  isFunction(resolveValues[i] && resolveValues[i].then)
                ) {
                  return master.then();
                }
              }

              // Multiple arguments are aggregated like Promise.all array elements
              while (i--) {
                adoptValue(resolveValues[i], updateFunc(i), master.reject);
              }

              return master.promise();
            }
          });

          // These usually indicate a programmer mistake during development,
          // warn about them ASAP rather than swallowing them by default.
          var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

          jQuery.Deferred.exceptionHook = function(error, stack) {
            // Support: IE 8 - 9 only
            // Console exists when dev tools are open, which can happen at any time
            if (
              window.console &&
              window.console.warn &&
              error &&
              rerrorNames.test(error.name)
            ) {
              window.console.warn(
                'jQuery.Deferred exception: ' + error.message,
                error.stack,
                stack
              );
            }
          };

          jQuery.readyException = function(error) {
            window.setTimeout(function() {
              throw error;
            });
          };

          // The deferred used on DOM ready
          var readyList = jQuery.Deferred();

          jQuery.fn.ready = function(fn) {
            readyList
              .then(fn)

              // Wrap jQuery.readyException in a function so that the lookup
              // happens at the time of error handling instead of callback
              // registration.
              .catch(function(error) {
                jQuery.readyException(error);
              });

            return this;
          };

          jQuery.extend({
            // Is the DOM ready to be used? Set to true once it occurs.
            isReady: false,

            // A counter to track how many items to wait for before
            // the ready event fires. See #6781
            readyWait: 1,

            // Handle when the DOM is ready
            ready: function(wait) {
              // Abort if there are pending holds or we're already ready
              if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
              }

              // Remember that the DOM is ready
              jQuery.isReady = true;

              // If a normal DOM Ready event fired, decrement, and wait if need be
              if (wait !== true && --jQuery.readyWait > 0) {
                return;
              }

              // If there are functions bound, to execute
              readyList.resolveWith(document, [jQuery]);
            }
          });

          jQuery.ready.then = readyList.then;

          // The ready event handler and self cleanup method
          function completed() {
            document.removeEventListener('DOMContentLoaded', completed);
            window.removeEventListener('load', completed);
            jQuery.ready();
          }

          // Catch cases where $(document).ready() is called
          // after the browser event has already occurred.
          // Support: IE <=9 - 10 only
          // Older IE sometimes signals "interactive" too soon
          if (
            document.readyState === 'complete' ||
            (document.readyState !== 'loading' && !document.documentElement.doScroll)
          ) {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            window.setTimeout(jQuery.ready);
          } else {
            // Use the handy event callback
            document.addEventListener('DOMContentLoaded', completed);

            // A fallback to window.onload, that will always work
            window.addEventListener('load', completed);
          }

          // Multifunctional method to get and set values of a collection
          // The value/s can optionally be executed if it's a function
          var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0;

            var len = elems.length;

            var bulk = key == null;

            // Sets many values
            if (toType(key) === 'object') {
              chainable = true;
              for (i in key) {
                access(elems, fn, i, key[i], true, emptyGet, raw);
              }

              // Sets one value
            } else if (value !== undefined) {
              chainable = true;

              if (!isFunction(value)) {
                raw = true;
              }

              if (bulk) {
                // Bulk operations run against the entire set
                if (raw) {
                  fn.call(elems, value);
                  fn = null;

                  // ...except when executing function values
                } else {
                  bulk = fn;
                  fn = function(elem, key, value) {
                    return bulk.call(jQuery(elem), value);
                  };
                }
              }

              if (fn) {
                for (; i < len; i++) {
                  fn(
                    elems[i],
                    key,
                    raw ? value : value.call(elems[i], i, fn(elems[i], key))
                  );
                }
              }
            }

            if (chainable) {
              return elems;
            }

            // Gets
            if (bulk) {
              return fn.call(elems);
            }

            return len ? fn(elems[0], key) : emptyGet;
          };

          // Matches dashed string for camelizing
          var rmsPrefix = /^-ms-/;

          var rdashAlpha = /-([a-z])/g;

          // Used by camelCase as callback to replace()
          function fcamelCase(all, letter) {
            return letter.toUpperCase();
          }

          // Convert dashed to camelCase; used by the css and data modules
          // Support: IE <=9 - 11, Edge 12 - 15
          // Microsoft forgot to hump their vendor prefix (#9572)
          function camelCase(string) {
            return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
          }
          var acceptData = function(owner) {
            // Accepts only:
            //  - Node
            //    - Node.ELEMENT_NODE
            //    - Node.DOCUMENT_NODE
            //  - Object
            //    - Any
            return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
          };

          function Data() {
            this.expando = jQuery.expando + Data.uid++;
          }

          Data.uid = 1;

          Data.prototype = {
            cache: function(owner) {
              // Check if the owner object already has a cache
              var value = owner[this.expando];

              // If not, create one
              if (!value) {
                value = {};

                // We can accept data for non-element nodes in modern browsers,
                // but we should not, see #8335.
                // Always return an empty object.
                if (acceptData(owner)) {
                  // If it is a node unlikely to be stringify-ed or looped over
                  // use plain assignment
                  if (owner.nodeType) {
                    owner[this.expando] = value;

                    // Otherwise secure it in a non-enumerable property
                    // configurable must be true to allow the property to be
                    // deleted when data is removed
                  } else {
                    Object.defineProperty(owner, this.expando, {
                      value: value,
                      configurable: true
                    });
                  }
                }
              }

              return value;
            },
            set: function(owner, data, value) {
              var prop;

              var cache = this.cache(owner);

              // Handle: [ owner, key, value ] args
              // Always use camelCase key (gh-2257)
              if (typeof data === 'string') {
                cache[camelCase(data)] = value;

                // Handle: [ owner, { properties } ] args
              } else {
                // Copy the properties one-by-one to the cache object
                for (prop in data) {
                  cache[camelCase(prop)] = data[prop];
                }
              }
              return cache;
            },
            get: function(owner, key) {
              return key === undefined
                ? this.cache(owner)
                : // Always use camelCase key (gh-2257)
                  owner[this.expando] && owner[this.expando][camelCase(key)];
            },
            access: function(owner, key, value) {
              // In cases where either:
              //
              //   1. No key was specified
              //   2. A string key was specified, but no value provided
              //
              // Take the "read" path and allow the get method to determine
              // which value to return, respectively either:
              //
              //   1. The entire cache object
              //   2. The data stored at the key
              //
              if (
                key === undefined ||
                (key && typeof key === 'string' && value === undefined)
              ) {
                return this.get(owner, key);
              }

              // When the key is not a string, or both a key and value
              // are specified, set or extend (existing objects) with either:
              //
              //   1. An object of properties
              //   2. A key and value
              //
              this.set(owner, key, value);

              // Since the "set" path can have two possible entry points
              // return the expected data based on which path was taken[*]
              return value !== undefined ? value : key;
            },
            remove: function(owner, key) {
              var i;

              var cache = owner[this.expando];

              if (cache === undefined) {
                return;
              }

              if (key !== undefined) {
                // Support array or space separated string of keys
                if (Array.isArray(key)) {
                  // If key is an array of keys...
                  // We always set camelCase keys, so remove that.
                  key = key.map(camelCase);
                } else {
                  key = camelCase(key);

                  // If a key with the spaces exists, use it.
                  // Otherwise, create an array by matching non-whitespace
                  key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
                }

                i = key.length;

                while (i--) {
                  delete cache[key[i]];
                }
              }

              // Remove the expando if there's no more data
              if (key === undefined || jQuery.isEmptyObject(cache)) {
                // Support: Chrome <=35 - 45
                // Webkit & Blink performance suffers when deleting properties
                // from DOM nodes, so set to undefined instead
                // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                if (owner.nodeType) {
                  owner[this.expando] = undefined;
                } else {
                  delete owner[this.expando];
                }
              }
            },
            hasData: function(owner) {
              var cache = owner[this.expando];
              return cache !== undefined && !jQuery.isEmptyObject(cache);
            }
          };
          var dataPriv = new Data();

          var dataUser = new Data();

          //	Implementation Summary
          //
          //	1. Enforce API surface and semantic compatibility with 1.9.x branch
          //	2. Improve the module's maintainability by reducing the storage
          //		paths to a single mechanism.
          //	3. Use the same single mechanism to support "private" and "user" data.
          //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
          //	5. Avoid exposing implementation details on user objects (eg. expando properties)
          //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

          var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;

          var rmultiDash = /[A-Z]/g;

          function getData(data) {
            if (data === 'true') {
              return true;
            }

            if (data === 'false') {
              return false;
            }

            if (data === 'null') {
              return null;
            }

            // Only convert to a number if it doesn't change the string
            if (data === +data + '') {
              return +data;
            }

            if (rbrace.test(data)) {
              return JSON.parse(data);
            }

            return data;
          }

          function dataAttr(elem, key, data) {
            var name;

            // If nothing was found internally, try to fetch any
            // data from the HTML5 data-* attribute
            if (data === undefined && elem.nodeType === 1) {
              name = 'data-' + key.replace(rmultiDash, '-$&').toLowerCase();
              data = elem.getAttribute(name);

              if (typeof data === 'string') {
                try {
                  data = getData(data);
                } catch (e) {}

                // Make sure we set the data so it isn't changed later
                dataUser.set(elem, key, data);
              } else {
                data = undefined;
              }
            }
            return data;
          }

          jQuery.extend({
            hasData: function(elem) {
              return dataUser.hasData(elem) || dataPriv.hasData(elem);
            },

            data: function(elem, name, data) {
              return dataUser.access(elem, name, data);
            },

            removeData: function(elem, name) {
              dataUser.remove(elem, name);
            },

            // TODO: Now that all calls to _data and _removeData have been replaced
            // with direct calls to dataPriv methods, these can be deprecated.
            _data: function(elem, name, data) {
              return dataPriv.access(elem, name, data);
            },

            _removeData: function(elem, name) {
              dataPriv.remove(elem, name);
            }
          });

          jQuery.fn.extend({
            data: function(key, value) {
              var i;

              var name;

              var data;

              var elem = this[0];

              var attrs = elem && elem.attributes;

              // Gets all values
              if (key === undefined) {
                if (this.length) {
                  data = dataUser.get(elem);

                  if (elem.nodeType === 1 && !dataPriv.get(elem, 'hasDataAttrs')) {
                    i = attrs.length;
                    while (i--) {
                      // Support: IE 11 only
                      // The attrs elements can be null (#14894)
                      if (attrs[i]) {
                        name = attrs[i].name;
                        if (name.indexOf('data-') === 0) {
                          name = camelCase(name.slice(5));
                          dataAttr(elem, name, data[name]);
                        }
                      }
                    }
                    dataPriv.set(elem, 'hasDataAttrs', true);
                  }
                }

                return data;
              }

              // Sets multiple values
              if (typeof key === 'object') {
                return this.each(function() {
                  dataUser.set(this, key);
                });
              }

              return access(
                this,
                function(value) {
                  var data;

                  // The calling jQuery object (element matches) is not empty
                  // (and therefore has an element appears at this[ 0 ]) and the
                  // `value` parameter was not undefined. An empty jQuery object
                  // will result in `undefined` for elem = this[ 0 ] which will
                  // throw an exception if an attempt to read a data cache is made.
                  if (elem && value === undefined) {
                    // Attempt to get data from the cache
                    // The key will always be camelCased in Data
                    data = dataUser.get(elem, key);
                    if (data !== undefined) {
                      return data;
                    }

                    // Attempt to "discover" the data in
                    // HTML5 custom data-* attrs
                    data = dataAttr(elem, key);
                    if (data !== undefined) {
                      return data;
                    }

                    // We tried really hard, but the data doesn't exist.
                    return;
                  }

                  // Set the data...
                  this.each(function() {
                    // We always store the camelCased key
                    dataUser.set(this, key, value);
                  });
                },
                null,
                value,
                arguments.length > 1,
                null,
                true
              );
            },

            removeData: function(key) {
              return this.each(function() {
                dataUser.remove(this, key);
              });
            }
          });

          jQuery.extend({
            queue: function(elem, type, data) {
              var queue;

              if (elem) {
                type = (type || 'fx') + 'queue';
                queue = dataPriv.get(elem, type);

                // Speed up dequeue by getting out quickly if this is just a lookup
                if (data) {
                  if (!queue || Array.isArray(data)) {
                    queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                  } else {
                    queue.push(data);
                  }
                }
                return queue || [];
              }
            },

            dequeue: function(elem, type) {
              type = type || 'fx';

              var queue = jQuery.queue(elem, type);

              var startLength = queue.length;

              var fn = queue.shift();

              var hooks = jQuery._queueHooks(elem, type);

              var next = function() {
                jQuery.dequeue(elem, type);
              };

              // If the fx queue is dequeued, always remove the progress sentinel
              if (fn === 'inprogress') {
                fn = queue.shift();
                startLength--;
              }

              if (fn) {
                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === 'fx') {
                  queue.unshift('inprogress');
                }

                // Clear up the last queue stop function
                delete hooks.stop;
                fn.call(elem, next, hooks);
              }

              if (!startLength && hooks) {
                hooks.empty.fire();
              }
            },

            // Not public - generate a queueHooks object, or return the current one
            _queueHooks: function(elem, type) {
              var key = type + 'queueHooks';
              return (
                dataPriv.get(elem, key) ||
                dataPriv.access(elem, key, {
                  empty: jQuery.Callbacks('once memory').add(function() {
                    dataPriv.remove(elem, [type + 'queue', key]);
                  })
                })
              );
            }
          });

          jQuery.fn.extend({
            queue: function(type, data) {
              var setter = 2;

              if (typeof type !== 'string') {
                data = type;
                type = 'fx';
                setter--;
              }

              if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
              }

              return data === undefined
                ? this
                : this.each(function() {
                    var queue = jQuery.queue(this, type, data);

                    // Ensure a hooks for this queue
                    jQuery._queueHooks(this, type);

                    if (type === 'fx' && queue[0] !== 'inprogress') {
                      jQuery.dequeue(this, type);
                    }
                  });
            },
            dequeue: function(type) {
              return this.each(function() {
                jQuery.dequeue(this, type);
              });
            },
            clearQueue: function(type) {
              return this.queue(type || 'fx', []);
            },

            // Get a promise resolved when queues of a certain type
            // are emptied (fx is the type by default)
            promise: function(type, obj) {
              var tmp;

              var count = 1;

              var defer = jQuery.Deferred();

              var elements = this;

              var i = this.length;

              var resolve = function() {
                if (!--count) {
                  defer.resolveWith(elements, [elements]);
                }
              };

              if (typeof type !== 'string') {
                obj = type;
                type = undefined;
              }
              type = type || 'fx';

              while (i--) {
                tmp = dataPriv.get(elements[i], type + 'queueHooks');
                if (tmp && tmp.empty) {
                  count++;
                  tmp.empty.add(resolve);
                }
              }
              resolve();
              return defer.promise(obj);
            }
          });
          var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

          var rcssNum = new RegExp('^(?:([+-])=|)(' + pnum + ')([a-z%]*)$', 'i');

          var cssExpand = ['Top', 'Right', 'Bottom', 'Left'];

          var documentElement = document.documentElement;

          var isAttached = function(elem) {
            return jQuery.contains(elem.ownerDocument, elem);
          };

          var composed = { composed: true };

          // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
          // Check attachment across shadow DOM boundaries when possible (gh-3504)
          // Support: iOS 10.0-10.2 only
          // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
          // leading to errors. We need to check for `getRootNode`.
          if (documentElement.getRootNode) {
            isAttached = function(elem) {
              return (
                jQuery.contains(elem.ownerDocument, elem) ||
                elem.getRootNode(composed) === elem.ownerDocument
              );
            };
          }
          var isHiddenWithinTree = function(elem, el) {
            // isHiddenWithinTree might be called from jQuery#filter function;
            // in that case, element will be second argument
            elem = el || elem;

            // Inline style trumps all
            return (
              elem.style.display === 'none' ||
              (elem.style.display === '' &&
                // Otherwise, check computed style
                // Support: Firefox <=43 - 45
                // Disconnected elements can have computed display: none, so first confirm that elem is
                // in the document.
                isAttached(elem) &&
                jQuery.css(elem, 'display') === 'none')
            );
          };

          var swap = function(elem, options, callback, args) {
            var ret;

            var name;

            var old = {};

            // Remember the old values, and insert the new ones
            for (name in options) {
              old[name] = elem.style[name];
              elem.style[name] = options[name];
            }

            ret = callback.apply(elem, args || []);

            // Revert the old values
            for (name in options) {
              elem.style[name] = old[name];
            }

            return ret;
          };

          function adjustCSS(elem, prop, valueParts, tween) {
            var adjusted;

            var scale;

            var maxIterations = 20;

            var currentValue = tween
              ? function() {
                  return tween.cur();
                }
              : function() {
                  return jQuery.css(elem, prop, '');
                };

            var initial = currentValue();

            var unit =
              (valueParts && valueParts[3]) || (jQuery.cssNumber[prop] ? '' : 'px');

            // Starting value computation is required for potential unit mismatches

            var initialInUnit =
              elem.nodeType &&
              (jQuery.cssNumber[prop] || (unit !== 'px' && +initial)) &&
              rcssNum.exec(jQuery.css(elem, prop));

            if (initialInUnit && initialInUnit[3] !== unit) {
              // Support: Firefox <=54
              // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
              initial = initial / 2;

              // Trust units reported by jQuery.css
              unit = unit || initialInUnit[3];

              // Iteratively approximate from a nonzero starting point
              initialInUnit = +initial || 1;

              while (maxIterations--) {
                // Evaluate and update our best guess (doubling guesses that zero out).
                // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
                jQuery.style(elem, prop, initialInUnit + unit);
                if (
                  (1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <=
                  0
                ) {
                  maxIterations = 0;
                }
                initialInUnit = initialInUnit / scale;
              }

              initialInUnit = initialInUnit * 2;
              jQuery.style(elem, prop, initialInUnit + unit);

              // Make sure we update the tween properties later on
              valueParts = valueParts || [];
            }

            if (valueParts) {
              initialInUnit = +initialInUnit || +initial || 0;

              // Apply relative offset (+=/-=) if specified
              adjusted = valueParts[1]
                ? initialInUnit + (valueParts[1] + 1) * valueParts[2]
                : +valueParts[2];
              if (tween) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted;
              }
            }
            return adjusted;
          }

          var defaultDisplayMap = {};

          function getDefaultDisplay(elem) {
            var temp;

            var doc = elem.ownerDocument;

            var nodeName = elem.nodeName;

            var display = defaultDisplayMap[nodeName];

            if (display) {
              return display;
            }

            temp = doc.body.appendChild(doc.createElement(nodeName));
            display = jQuery.css(temp, 'display');

            temp.parentNode.removeChild(temp);

            if (display === 'none') {
              display = 'block';
            }
            defaultDisplayMap[nodeName] = display;

            return display;
          }

          function showHide(elements, show) {
            var display;

            var elem;

            var values = [];

            var index = 0;

            var length = elements.length;

            // Determine new display value for elements that need to change
            for (; index < length; index++) {
              elem = elements[index];
              if (!elem.style) {
                continue;
              }

              display = elem.style.display;
              if (show) {
                // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                // check is required in this first loop unless we have a nonempty display value (either
                // inline or about-to-be-restored)
                if (display === 'none') {
                  values[index] = dataPriv.get(elem, 'display') || null;
                  if (!values[index]) {
                    elem.style.display = '';
                  }
                }
                if (elem.style.display === '' && isHiddenWithinTree(elem)) {
                  values[index] = getDefaultDisplay(elem);
                }
              } else {
                if (display !== 'none') {
                  values[index] = 'none';

                  // Remember what we're overwriting
                  dataPriv.set(elem, 'display', display);
                }
              }
            }

            // Set the display of the elements in a second loop to avoid constant reflow
            for (index = 0; index < length; index++) {
              if (values[index] != null) {
                elements[index].style.display = values[index];
              }
            }

            return elements;
          }

          jQuery.fn.extend({
            show: function() {
              return showHide(this, true);
            },
            hide: function() {
              return showHide(this);
            },
            toggle: function(state) {
              if (typeof state === 'boolean') {
                return state ? this.show() : this.hide();
              }

              return this.each(function() {
                if (isHiddenWithinTree(this)) {
                  jQuery(this).show();
                } else {
                  jQuery(this).hide();
                }
              });
            }
          });
          var rcheckableType = /^(?:checkbox|radio)$/i;

          var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;

          var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;

          // We have to close these tags to support XHTML (#13200)
          var wrapMap = {
            // Support: IE <=9 only
            option: [1, "<select multiple='multiple'>", '</select>'],

            // XHTML parsers do not magically insert elements in the
            // same way that tag soup parsers do. So we cannot shorten
            // this by omitting <tbody> or other required elements.
            thead: [1, '<table>', '</table>'],
            col: [2, '<table><colgroup>', '</colgroup></table>'],
            tr: [2, '<table><tbody>', '</tbody></table>'],
            td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],

            _default: [0, '', '']
          };

          // Support: IE <=9 only
          wrapMap.optgroup = wrapMap.option;

          wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption =
            wrapMap.thead;
          wrapMap.th = wrapMap.td;

          function getAll(context, tag) {
            // Support: IE <=9 - 11 only
            // Use typeof to avoid zero-argument method invocation on host objects (#15151)
            var ret;

            if (typeof context.getElementsByTagName !== 'undefined') {
              ret = context.getElementsByTagName(tag || '*');
            } else if (typeof context.querySelectorAll !== 'undefined') {
              ret = context.querySelectorAll(tag || '*');
            } else {
              ret = [];
            }

            if (tag === undefined || (tag && nodeName(context, tag))) {
              return jQuery.merge([context], ret);
            }

            return ret;
          }

          // Mark scripts as having already been evaluated
          function setGlobalEval(elems, refElements) {
            var i = 0;

            var l = elems.length;

            for (; i < l; i++) {
              dataPriv.set(
                elems[i],
                'globalEval',
                !refElements || dataPriv.get(refElements[i], 'globalEval')
              );
            }
          }

          var rhtml = /<|&#?\w+;/;

          function buildFragment(elems, context, scripts, selection, ignored) {
            var elem;

            var tmp;

            var tag;

            var wrap;

            var attached;

            var j;

            var fragment = context.createDocumentFragment();

            var nodes = [];

            var i = 0;

            var l = elems.length;

            for (; i < l; i++) {
              elem = elems[i];

              if (elem || elem === 0) {
                // Add nodes directly
                if (toType(elem) === 'object') {
                  // Support: Android <=4.0 only, PhantomJS 1 only
                  // push.apply(_, arraylike) throws on ancient WebKit
                  jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

                  // Convert non-html into a text node
                } else if (!rhtml.test(elem)) {
                  nodes.push(context.createTextNode(elem));

                  // Convert html into DOM nodes
                } else {
                  tmp = tmp || fragment.appendChild(context.createElement('div'));

                  // Deserialize a standard representation
                  tag = (rtagName.exec(elem) || ['', ''])[1].toLowerCase();
                  wrap = wrapMap[tag] || wrapMap._default;
                  tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

                  // Descend through wrappers to the right content
                  j = wrap[0];
                  while (j--) {
                    tmp = tmp.lastChild;
                  }

                  // Support: Android <=4.0 only, PhantomJS 1 only
                  // push.apply(_, arraylike) throws on ancient WebKit
                  jQuery.merge(nodes, tmp.childNodes);

                  // Remember the top-level container
                  tmp = fragment.firstChild;

                  // Ensure the created nodes are orphaned (#12392)
                  tmp.textContent = '';
                }
              }
            }

            // Remove wrapper from fragment
            fragment.textContent = '';

            i = 0;
            while ((elem = nodes[i++])) {
              // Skip elements already in the context collection (trac-4087)
              if (selection && jQuery.inArray(elem, selection) > -1) {
                if (ignored) {
                  ignored.push(elem);
                }
                continue;
              }

              attached = isAttached(elem);

              // Append to fragment
              tmp = getAll(fragment.appendChild(elem), 'script');

              // Preserve script evaluation history
              if (attached) {
                setGlobalEval(tmp);
              }

              // Capture executables
              if (scripts) {
                j = 0;
                while ((elem = tmp[j++])) {
                  if (rscriptType.test(elem.type || '')) {
                    scripts.push(elem);
                  }
                }
              }
            }

            return fragment;
          }

          (function() {
            var fragment = document.createDocumentFragment();

            var div = fragment.appendChild(document.createElement('div'));

            var input = document.createElement('input');

            // Support: Android 4.0 - 4.3 only
            // Check state lost if the name is set (#11217)
            // Support: Windows Web Apps (WWA)
            // `name` and `type` must use .setAttribute for WWA (#14901)
            input.setAttribute('type', 'radio');
            input.setAttribute('checked', 'checked');
            input.setAttribute('name', 't');

            div.appendChild(input);

            // Support: Android <=4.1 only
            // Older WebKit doesn't clone checked state correctly in fragments
            support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

            // Support: IE <=11 only
            // Make sure textarea (and checkbox) defaultValue is properly cloned
            div.innerHTML = '<textarea>x</textarea>';
            support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
          })();

          var rkeyEvent = /^key/;

          var rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;

          var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

          function returnTrue() {
            return true;
          }

          function returnFalse() {
            return false;
          }

          // Support: IE <=9 - 11+
          // focus() and blur() are asynchronous, except when they are no-op.
          // So expect focus to be synchronous when the element is already active,
          // and blur to be synchronous when the element is not already active.
          // (focus and blur are always synchronous in other supported browsers,
          // this just defines when we can count on it).
          function expectSync(elem, type) {
            return (elem === safeActiveElement()) === (type === 'focus');
          }

          // Support: IE <=9 only
          // Accessing document.activeElement can throw unexpectedly
          // https://bugs.jquery.com/ticket/13393
          function safeActiveElement() {
            try {
              return document.activeElement;
            } catch (err) {}
          }

          function on(elem, types, selector, data, fn, one) {
            var origFn, type;

            // Types can be a map of types/handlers
            if (typeof types === 'object') {
              // ( types-Object, selector, data )
              if (typeof selector !== 'string') {
                // ( types-Object, data )
                data = data || selector;
                selector = undefined;
              }
              for (type in types) {
                on(elem, type, selector, data, types[type], one);
              }
              return elem;
            }

            if (data == null && fn == null) {
              // ( types, fn )
              fn = selector;
              data = selector = undefined;
            } else if (fn == null) {
              if (typeof selector === 'string') {
                // ( types, selector, fn )
                fn = data;
                data = undefined;
              } else {
                // ( types, data, fn )
                fn = data;
                data = selector;
                selector = undefined;
              }
            }
            if (fn === false) {
              fn = returnFalse;
            } else if (!fn) {
              return elem;
            }

            if (one === 1) {
              origFn = fn;
              fn = function(event) {
                // Can use an empty set, since event contains the info
                jQuery().off(event);
                return origFn.apply(this, arguments);
              };

              // Use same guid so caller can remove using origFn
              fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return elem.each(function() {
              jQuery.event.add(this, types, fn, data, selector);
            });
          }

          /*
           * Helper functions for managing events -- not part of the public interface.
           * Props to Dean Edwards' addEvent library for many of the ideas.
           */
          jQuery.event = {
            global: {},

            add: function(elem, types, handler, data, selector) {
              var handleObjIn;

              var eventHandle;

              var tmp;

              var events;

              var t;

              var handleObj;

              var special;

              var handlers;

              var type;

              var namespaces;

              var origType;

              var elemData = dataPriv.get(elem);

              // Don't attach events to noData or text/comment nodes (but allow plain objects)
              if (!elemData) {
                return;
              }

              // Caller can pass in an object of custom data in lieu of the handler
              if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
              }

              // Ensure that invalid selectors throw exceptions at attach time
              // Evaluate against documentElement in case elem is a non-element node (e.g., document)
              if (selector) {
                jQuery.find.matchesSelector(documentElement, selector);
              }

              // Make sure that the handler has a unique ID, used to find/remove it later
              if (!handler.guid) {
                handler.guid = jQuery.guid++;
              }

              // Init the element's event structure and main handler, if this is the first
              if (!(events = elemData.events)) {
                events = elemData.events = {};
              }
              if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                  // Discard the second event of a jQuery.event.trigger() and
                  // when an event is called after a page has unloaded
                  return typeof jQuery !== 'undefined' &&
                    jQuery.event.triggered !== e.type
                    ? jQuery.event.dispatch.apply(elem, arguments)
                    : undefined;
                };
              }

              // Handle multiple events separated by a space
              types = (types || '').match(rnothtmlwhite) || [''];
              t = types.length;
              while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || '').split('.').sort();

                // There *must* be a type, no attaching namespace-only handlers
                if (!type) {
                  continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[type] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = (selector ? special.delegateType : special.bindType) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[type] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend(
                  {
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext:
                      selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join('.')
                  },
                  handleObjIn
                );

                // Init the event handler queue if we're the first
                if (!(handlers = events[type])) {
                  handlers = events[type] = [];
                  handlers.delegateCount = 0;

                  // Only use addEventListener if the special events handler returns false
                  if (
                    !special.setup ||
                    special.setup.call(elem, data, namespaces, eventHandle) === false
                  ) {
                    if (elem.addEventListener) {
                      elem.addEventListener(type, eventHandle);
                    }
                  }
                }

                if (special.add) {
                  special.add.call(elem, handleObj);

                  if (!handleObj.handler.guid) {
                    handleObj.handler.guid = handler.guid;
                  }
                }

                // Add to the element's handler list, delegates in front
                if (selector) {
                  handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                  handlers.push(handleObj);
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[type] = true;
              }
            },

            // Detach an event or set of events from an element
            remove: function(elem, types, handler, selector, mappedTypes) {
              var j;

              var origCount;

              var tmp;

              var events;

              var t;

              var handleObj;

              var special;

              var handlers;

              var type;

              var namespaces;

              var origType;

              var elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

              if (!elemData || !(events = elemData.events)) {
                return;
              }

              // Once for each type.namespace in types; type may be omitted
              types = (types || '').match(rnothtmlwhite) || [''];
              t = types.length;
              while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || '').split('.').sort();

                // Unbind all events (on this namespace, if provided) for the element
                if (!type) {
                  for (type in events) {
                    jQuery.event.remove(elem, type + types[t], handler, selector, true);
                  }
                  continue;
                }

                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp =
                  tmp[2] &&
                  new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)');

                // Remove matching events
                origCount = j = handlers.length;
                while (j--) {
                  handleObj = handlers[j];

                  if (
                    (mappedTypes || origType === handleObj.origType) &&
                    (!handler || handler.guid === handleObj.guid) &&
                    (!tmp || tmp.test(handleObj.namespace)) &&
                    (!selector ||
                      selector === handleObj.selector ||
                      (selector === '**' && handleObj.selector))
                  ) {
                    handlers.splice(j, 1);

                    if (handleObj.selector) {
                      handlers.delegateCount--;
                    }
                    if (special.remove) {
                      special.remove.call(elem, handleObj);
                    }
                  }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if (origCount && !handlers.length) {
                  if (
                    !special.teardown ||
                    special.teardown.call(elem, namespaces, elemData.handle) === false
                  ) {
                    jQuery.removeEvent(elem, type, elemData.handle);
                  }

                  delete events[type];
                }
              }

              // Remove data and the expando if it's no longer used
              if (jQuery.isEmptyObject(events)) {
                dataPriv.remove(elem, 'handle events');
              }
            },

            dispatch: function(nativeEvent) {
              // Make a writable jQuery.Event from the native event object
              var event = jQuery.event.fix(nativeEvent);

              var i;

              var j;

              var ret;

              var matched;

              var handleObj;

              var handlerQueue;

              var args = new Array(arguments.length);

              var handlers = (dataPriv.get(this, 'events') || {})[event.type] || [];

              var special = jQuery.event.special[event.type] || {};

              // Use the fix-ed jQuery.Event rather than the (read-only) native event
              args[0] = event;

              for (i = 1; i < arguments.length; i++) {
                args[i] = arguments[i];
              }

              event.delegateTarget = this;

              // Call the preDispatch hook for the mapped type, and let it bail if desired
              if (
                special.preDispatch &&
                special.preDispatch.call(this, event) === false
              ) {
                return;
              }

              // Determine handlers
              handlerQueue = jQuery.event.handlers.call(this, event, handlers);

              // Run delegates first; they may want to stop propagation beneath us
              i = 0;
              while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;

                j = 0;
                while (
                  (handleObj = matched.handlers[j++]) &&
                  !event.isImmediatePropagationStopped()
                ) {
                  // If the event is namespaced, then each handler is only invoked if it is
                  // specially universal or its namespaces are a superset of the event's.
                  if (
                    !event.rnamespace ||
                    handleObj.namespace === false ||
                    event.rnamespace.test(handleObj.namespace)
                  ) {
                    event.handleObj = handleObj;
                    event.data = handleObj.data;

                    ret = (
                      (jQuery.event.special[handleObj.origType] || {}).handle ||
                      handleObj.handler
                    ).apply(matched.elem, args);

                    if (ret !== undefined) {
                      if ((event.result = ret) === false) {
                        event.preventDefault();
                        event.stopPropagation();
                      }
                    }
                  }
                }
              }

              // Call the postDispatch hook for the mapped type
              if (special.postDispatch) {
                special.postDispatch.call(this, event);
              }

              return event.result;
            },

            handlers: function(event, handlers) {
              var i;

              var handleObj;

              var sel;

              var matchedHandlers;

              var matchedSelectors;

              var handlerQueue = [];

              var delegateCount = handlers.delegateCount;

              var cur = event.target;

              // Find delegate handlers
              if (
                delegateCount &&
                // Support: IE <=9
                // Black-hole SVG <use> instance trees (trac-13180)
                cur.nodeType &&
                // Support: Firefox <=42
                // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                // Support: IE 11 only
                // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                !(event.type === 'click' && event.button >= 1)
              ) {
                for (; cur !== this; cur = cur.parentNode || this) {
                  // Don't check non-elements (#13208)
                  // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                  if (
                    cur.nodeType === 1 &&
                    !(event.type === 'click' && cur.disabled === true)
                  ) {
                    matchedHandlers = [];
                    matchedSelectors = {};
                    for (i = 0; i < delegateCount; i++) {
                      handleObj = handlers[i];

                      // Don't conflict with Object.prototype properties (#13203)
                      sel = handleObj.selector + ' ';

                      if (matchedSelectors[sel] === undefined) {
                        matchedSelectors[sel] = handleObj.needsContext
                          ? jQuery(sel, this).index(cur) > -1
                          : jQuery.find(sel, this, null, [cur]).length;
                      }
                      if (matchedSelectors[sel]) {
                        matchedHandlers.push(handleObj);
                      }
                    }
                    if (matchedHandlers.length) {
                      handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                    }
                  }
                }
              }

              // Add the remaining (directly-bound) handlers
              cur = this;
              if (delegateCount < handlers.length) {
                handlerQueue.push({
                  elem: cur,
                  handlers: handlers.slice(delegateCount)
                });
              }

              return handlerQueue;
            },

            addProp: function(name, hook) {
              Object.defineProperty(jQuery.Event.prototype, name, {
                enumerable: true,
                configurable: true,

                get: isFunction(hook)
                  ? function() {
                      if (this.originalEvent) {
                        return hook(this.originalEvent);
                      }
                    }
                  : function() {
                      if (this.originalEvent) {
                        return this.originalEvent[name];
                      }
                    },

                set: function(value) {
                  Object.defineProperty(this, name, {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: value
                  });
                }
              });
            },

            fix: function(originalEvent) {
              return originalEvent[jQuery.expando]
                ? originalEvent
                : new jQuery.Event(originalEvent);
            },

            special: {
              load: {
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
              },
              click: {
                // Utilize native event to ensure correct state for checkable inputs
                setup: function(data) {
                  // For mutual compressibility with _default, replace `this` access with a local var.
                  // `|| data` is dead code meant only to preserve the variable through minification.
                  var el = this || data;

                  // Claim the first handler
                  if (
                    rcheckableType.test(el.type) &&
                    el.click &&
                    nodeName(el, 'input')
                  ) {
                    // dataPriv.set( el, "click", ... )
                    leverageNative(el, 'click', returnTrue);
                  }

                  // Return false to allow normal processing in the caller
                  return false;
                },
                trigger: function(data) {
                  // For mutual compressibility with _default, replace `this` access with a local var.
                  // `|| data` is dead code meant only to preserve the variable through minification.
                  var el = this || data;

                  // Force setup before triggering a click
                  if (
                    rcheckableType.test(el.type) &&
                    el.click &&
                    nodeName(el, 'input')
                  ) {
                    leverageNative(el, 'click');
                  }

                  // Return non-false to allow normal event-path propagation
                  return true;
                },

                // For cross-browser consistency, suppress native .click() on links
                // Also prevent it if we're currently inside a leveraged native-event stack
                _default: function(event) {
                  var target = event.target;
                  return (
                    (rcheckableType.test(target.type) &&
                      target.click &&
                      nodeName(target, 'input') &&
                      dataPriv.get(target, 'click')) ||
                    nodeName(target, 'a')
                  );
                }
              },

              beforeunload: {
                postDispatch: function(event) {
                  // Support: Firefox 20+
                  // Firefox doesn't alert if the returnValue field is not set.
                  if (event.result !== undefined && event.originalEvent) {
                    event.originalEvent.returnValue = event.result;
                  }
                }
              }
            }
          };

          // Ensure the presence of an event listener that handles manually-triggered
          // synthetic events by interrupting progress until reinvoked in response to
          // *native* events that it fires directly, ensuring that state changes have
          // already occurred before other listeners are invoked.
          function leverageNative(el, type, expectSync) {
            // Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
            if (!expectSync) {
              if (dataPriv.get(el, type) === undefined) {
                jQuery.event.add(el, type, returnTrue);
              }
              return;
            }

            // Register the controller as a special universal handler for all event namespaces
            dataPriv.set(el, type, false);
            jQuery.event.add(el, type, {
              namespace: false,
              handler: function(event) {
                var notAsync;

                var result;

                var saved = dataPriv.get(this, type);

                if (event.isTrigger & 1 && this[type]) {
                  // Interrupt processing of the outer synthetic .trigger()ed event
                  // Saved data should be false in such cases, but might be a leftover capture object
                  // from an async native handler (gh-4350)
                  if (!saved.length) {
                    // Store arguments for use when handling the inner native event
                    // There will always be at least one argument (an event object), so this array
                    // will not be confused with a leftover capture object.
                    saved = slice.call(arguments);
                    dataPriv.set(this, type, saved);

                    // Trigger the native event and capture its result
                    // Support: IE <=9 - 11+
                    // focus() and blur() are asynchronous
                    notAsync = expectSync(this, type);
                    this[type]();
                    result = dataPriv.get(this, type);
                    if (saved !== result || notAsync) {
                      dataPriv.set(this, type, false);
                    } else {
                      result = {};
                    }
                    if (saved !== result) {
                      // Cancel the outer synthetic event
                      event.stopImmediatePropagation();
                      event.preventDefault();
                      return result.value;
                    }

                    // If this is an inner synthetic event for an event with a bubbling surrogate
                    // (focus or blur), assume that the surrogate already propagated from triggering the
                    // native event and prevent that from happening again here.
                    // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
                    // bubbling surrogate propagates *after* the non-bubbling base), but that seems
                    // less bad than duplication.
                  } else if ((jQuery.event.special[type] || {}).delegateType) {
                    event.stopPropagation();
                  }

                  // If this is a native event triggered above, everything is now in order
                  // Fire an inner synthetic event with the original arguments
                } else if (saved.length) {
                  // ...and capture the result
                  dataPriv.set(this, type, {
                    value: jQuery.event.trigger(
                      // Support: IE <=9 - 11+
                      // Extend with the prototype to reset the above stopImmediatePropagation()
                      jQuery.extend(saved[0], jQuery.Event.prototype),
                      saved.slice(1),
                      this
                    )
                  });

                  // Abort handling of the native event
                  event.stopImmediatePropagation();
                }
              }
            });
          }

          jQuery.removeEvent = function(elem, type, handle) {
            // This "if" is needed for plain objects
            if (elem.removeEventListener) {
              elem.removeEventListener(type, handle);
            }
          };

          jQuery.Event = function(src, props) {
            // Allow instantiation without the 'new' keyword
            if (!(this instanceof jQuery.Event)) {
              return new jQuery.Event(src, props);
            }

            // Event object
            if (src && src.type) {
              this.originalEvent = src;
              this.type = src.type;

              // Events bubbling up the document may have been marked as prevented
              // by a handler lower down the tree; reflect the correct value.
              this.isDefaultPrevented =
                src.defaultPrevented ||
                (src.defaultPrevented === undefined &&
                  // Support: Android <=2.3 only
                  src.returnValue === false)
                  ? returnTrue
                  : returnFalse;

              // Create target properties
              // Support: Safari <=6 - 7 only
              // Target should not be a text node (#504, #13143)
              this.target =
                src.target && src.target.nodeType === 3
                  ? src.target.parentNode
                  : src.target;

              this.currentTarget = src.currentTarget;
              this.relatedTarget = src.relatedTarget;

              // Event type
            } else {
              this.type = src;
            }

            // Put explicitly provided properties onto the event object
            if (props) {
              jQuery.extend(this, props);
            }

            // Create a timestamp if incoming event doesn't have one
            this.timeStamp = (src && src.timeStamp) || Date.now();

            // Mark it as fixed
            this[jQuery.expando] = true;
          };

          // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
          // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
          jQuery.Event.prototype = {
            constructor: jQuery.Event,
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            isSimulated: false,

            preventDefault: function() {
              var e = this.originalEvent;

              this.isDefaultPrevented = returnTrue;

              if (e && !this.isSimulated) {
                e.preventDefault();
              }
            },
            stopPropagation: function() {
              var e = this.originalEvent;

              this.isPropagationStopped = returnTrue;

              if (e && !this.isSimulated) {
                e.stopPropagation();
              }
            },
            stopImmediatePropagation: function() {
              var e = this.originalEvent;

              this.isImmediatePropagationStopped = returnTrue;

              if (e && !this.isSimulated) {
                e.stopImmediatePropagation();
              }

              this.stopPropagation();
            }
          };

          // Includes all common event props including KeyEvent and MouseEvent specific props
          jQuery.each(
            {
              altKey: true,
              bubbles: true,
              cancelable: true,
              changedTouches: true,
              ctrlKey: true,
              detail: true,
              eventPhase: true,
              metaKey: true,
              pageX: true,
              pageY: true,
              shiftKey: true,
              view: true,
              char: true,
              code: true,
              charCode: true,
              key: true,
              keyCode: true,
              button: true,
              buttons: true,
              clientX: true,
              clientY: true,
              offsetX: true,
              offsetY: true,
              pointerId: true,
              pointerType: true,
              screenX: true,
              screenY: true,
              targetTouches: true,
              toElement: true,
              touches: true,

              which: function(event) {
                var button = event.button;

                // Add which for key events
                if (event.which == null && rkeyEvent.test(event.type)) {
                  return event.charCode != null ? event.charCode : event.keyCode;
                }

                // Add which for click: 1 === left; 2 === middle; 3 === right
                if (
                  !event.which &&
                  button !== undefined &&
                  rmouseEvent.test(event.type)
                ) {
                  if (button & 1) {
                    return 1;
                  }

                  if (button & 2) {
                    return 3;
                  }

                  if (button & 4) {
                    return 2;
                  }

                  return 0;
                }

                return event.which;
              }
            },
            jQuery.event.addProp
          );

          jQuery.each({ focus: 'focusin', blur: 'focusout' }, function(
            type,
            delegateType
          ) {
            jQuery.event.special[type] = {
              // Utilize native event if possible so blur/focus sequence is correct
              setup: function() {
                // Claim the first handler
                // dataPriv.set( this, "focus", ... )
                // dataPriv.set( this, "blur", ... )
                leverageNative(this, type, expectSync);

                // Return false to allow normal processing in the caller
                return false;
              },
              trigger: function() {
                // Force setup before trigger
                leverageNative(this, type);

                // Return non-false to allow normal event-path propagation
                return true;
              },

              delegateType: delegateType
            };
          });

          // Create mouseenter/leave events using mouseover/out and event-time checks
          // so that event delegation works in jQuery.
          // Do the same for pointerenter/pointerleave and pointerover/pointerout
          //
          // Support: Safari 7 only
          // Safari sends mouseenter too often; see:
          // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
          // for the description of the bug (it existed in older Chrome versions as well).
          jQuery.each(
            {
              mouseenter: 'mouseover',
              mouseleave: 'mouseout',
              pointerenter: 'pointerover',
              pointerleave: 'pointerout'
            },
            function(orig, fix) {
              jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,

                handle: function(event) {
                  var ret;

                  var target = this;

                  var related = event.relatedTarget;

                  var handleObj = event.handleObj;

                  // For mouseenter/leave call the handler if related is outside the target.
                  // NB: No relatedTarget if the mouse left/entered the browser window
                  if (
                    !related ||
                    (related !== target && !jQuery.contains(target, related))
                  ) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                  }
                  return ret;
                }
              };
            }
          );

          jQuery.fn.extend({
            on: function(types, selector, data, fn) {
              return on(this, types, selector, data, fn);
            },
            one: function(types, selector, data, fn) {
              return on(this, types, selector, data, fn, 1);
            },
            off: function(types, selector, fn) {
              var handleObj, type;
              if (types && types.preventDefault && types.handleObj) {
                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(
                  handleObj.namespace
                    ? handleObj.origType + '.' + handleObj.namespace
                    : handleObj.origType,
                  handleObj.selector,
                  handleObj.handler
                );
                return this;
              }
              if (typeof types === 'object') {
                // ( types-object [, selector] )
                for (type in types) {
                  this.off(type, selector, types[type]);
                }
                return this;
              }
              if (selector === false || typeof selector === 'function') {
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
              }
              if (fn === false) {
                fn = returnFalse;
              }
              return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
              });
            }
          });

          var /* eslint-disable max-len */

            // See https://github.com/eslint/eslint/issues/3229
            rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;

          /* eslint-enable */

          // Support: IE <=10 - 11, Edge 12 - 13 only
          // In IE/Edge using regex groups here causes severe slowdowns.
          // See https://connect.microsoft.com/IE/feedback/details/1736512/

          var rnoInnerhtml = /<script|<style|<link/i;

          // checked="checked" or checked

          var rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i;

          var rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

          // Prefer a tbody over its parent table for containing new rows
          function manipulationTarget(elem, content) {
            if (
              nodeName(elem, 'table') &&
              nodeName(content.nodeType !== 11 ? content : content.firstChild, 'tr')
            ) {
              return jQuery(elem).children('tbody')[0] || elem;
            }

            return elem;
          }

          // Replace/restore the type attribute of script elements for safe DOM manipulation
          function disableScript(elem) {
            elem.type = (elem.getAttribute('type') !== null) + '/' + elem.type;
            return elem;
          }
          function restoreScript(elem) {
            if ((elem.type || '').slice(0, 5) === 'true/') {
              elem.type = elem.type.slice(5);
            } else {
              elem.removeAttribute('type');
            }

            return elem;
          }

          function cloneCopyEvent(src, dest) {
            var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

            if (dest.nodeType !== 1) {
              return;
            }

            // 1. Copy private data: events, handlers, etc.
            if (dataPriv.hasData(src)) {
              pdataOld = dataPriv.access(src);
              pdataCur = dataPriv.set(dest, pdataOld);
              events = pdataOld.events;

              if (events) {
                delete pdataCur.handle;
                pdataCur.events = {};

                for (type in events) {
                  for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i]);
                  }
                }
              }
            }

            // 2. Copy user data
            if (dataUser.hasData(src)) {
              udataOld = dataUser.access(src);
              udataCur = jQuery.extend({}, udataOld);

              dataUser.set(dest, udataCur);
            }
          }

          // Fix IE bugs, see support tests
          function fixInput(src, dest) {
            var nodeName = dest.nodeName.toLowerCase();

            // Fails to persist the checked state of a cloned checkbox or radio button.
            if (nodeName === 'input' && rcheckableType.test(src.type)) {
              dest.checked = src.checked;

              // Fails to return the selected option to the default selected state when cloning options
            } else if (nodeName === 'input' || nodeName === 'textarea') {
              dest.defaultValue = src.defaultValue;
            }
          }

          function domManip(collection, args, callback, ignored) {
            // Flatten any nested arrays
            args = concat.apply([], args);

            var fragment;

            var first;

            var scripts;

            var hasScripts;

            var node;

            var doc;

            var i = 0;

            var l = collection.length;

            var iNoClone = l - 1;

            var value = args[0];

            var valueIsFunction = isFunction(value);

            // We can't cloneNode fragments that contain checked, in WebKit
            if (
              valueIsFunction ||
              (l > 1 &&
                typeof value === 'string' &&
                !support.checkClone &&
                rchecked.test(value))
            ) {
              return collection.each(function(index) {
                var self = collection.eq(index);
                if (valueIsFunction) {
                  args[0] = value.call(this, index, self.html());
                }
                domManip(self, args, callback, ignored);
              });
            }

            if (l) {
              fragment = buildFragment(
                args,
                collection[0].ownerDocument,
                false,
                collection,
                ignored
              );
              first = fragment.firstChild;

              if (fragment.childNodes.length === 1) {
                fragment = first;
              }

              // Require either new content or an interest in ignored elements to invoke the callback
              if (first || ignored) {
                scripts = jQuery.map(getAll(fragment, 'script'), disableScript);
                hasScripts = scripts.length;

                // Use the original fragment for the last item
                // instead of the first because it can end up
                // being emptied incorrectly in certain situations (#8070).
                for (; i < l; i++) {
                  node = fragment;

                  if (i !== iNoClone) {
                    node = jQuery.clone(node, true, true);

                    // Keep references to cloned scripts for later restoration
                    if (hasScripts) {
                      // Support: Android <=4.0 only, PhantomJS 1 only
                      // push.apply(_, arraylike) throws on ancient WebKit
                      jQuery.merge(scripts, getAll(node, 'script'));
                    }
                  }

                  callback.call(collection[i], node, i);
                }

                if (hasScripts) {
                  doc = scripts[scripts.length - 1].ownerDocument;

                  // Reenable scripts
                  jQuery.map(scripts, restoreScript);

                  // Evaluate executable scripts on first document insertion
                  for (i = 0; i < hasScripts; i++) {
                    node = scripts[i];
                    if (
                      rscriptType.test(node.type || '') &&
                      !dataPriv.access(node, 'globalEval') &&
                      jQuery.contains(doc, node)
                    ) {
                      if (node.src && (node.type || '').toLowerCase() !== 'module') {
                        // Optional AJAX dependency, but won't run scripts if not present
                        if (jQuery._evalUrl && !node.noModule) {
                          jQuery._evalUrl(node.src, {
                            nonce: node.nonce || node.getAttribute('nonce')
                          });
                        }
                      } else {
                        DOMEval(node.textContent.replace(rcleanScript, ''), node, doc);
                      }
                    }
                  }
                }
              }
            }

            return collection;
          }

          function remove(elem, selector, keepData) {
            var node;

            var nodes = selector ? jQuery.filter(selector, elem) : elem;

            var i = 0;

            for (; (node = nodes[i]) != null; i++) {
              if (!keepData && node.nodeType === 1) {
                jQuery.cleanData(getAll(node));
              }

              if (node.parentNode) {
                if (keepData && isAttached(node)) {
                  setGlobalEval(getAll(node, 'script'));
                }
                node.parentNode.removeChild(node);
              }
            }

            return elem;
          }

          jQuery.extend({
            htmlPrefilter: function(html) {
              return html.replace(rxhtmlTag, '<$1></$2>');
            },

            clone: function(elem, dataAndEvents, deepDataAndEvents) {
              var i;

              var l;

              var srcElements;

              var destElements;

              var clone = elem.cloneNode(true);

              var inPage = isAttached(elem);

              // Fix IE cloning issues
              if (
                !support.noCloneChecked &&
                (elem.nodeType === 1 || elem.nodeType === 11) &&
                !jQuery.isXMLDoc(elem)
              ) {
                // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
                destElements = getAll(clone);
                srcElements = getAll(elem);

                for (i = 0, l = srcElements.length; i < l; i++) {
                  fixInput(srcElements[i], destElements[i]);
                }
              }

              // Copy the events from the original to the clone
              if (dataAndEvents) {
                if (deepDataAndEvents) {
                  srcElements = srcElements || getAll(elem);
                  destElements = destElements || getAll(clone);

                  for (i = 0, l = srcElements.length; i < l; i++) {
                    cloneCopyEvent(srcElements[i], destElements[i]);
                  }
                } else {
                  cloneCopyEvent(elem, clone);
                }
              }

              // Preserve script evaluation history
              destElements = getAll(clone, 'script');
              if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, 'script'));
              }

              // Return the cloned set
              return clone;
            },

            cleanData: function(elems) {
              var data;

              var elem;

              var type;

              var special = jQuery.event.special;

              var i = 0;

              for (; (elem = elems[i]) !== undefined; i++) {
                if (acceptData(elem)) {
                  if ((data = elem[dataPriv.expando])) {
                    if (data.events) {
                      for (type in data.events) {
                        if (special[type]) {
                          jQuery.event.remove(elem, type);

                          // This is a shortcut to avoid jQuery.event.remove's overhead
                        } else {
                          jQuery.removeEvent(elem, type, data.handle);
                        }
                      }
                    }

                    // Support: Chrome <=35 - 45+
                    // Assign undefined instead of using delete, see Data#remove
                    elem[dataPriv.expando] = undefined;
                  }
                  if (elem[dataUser.expando]) {
                    // Support: Chrome <=35 - 45+
                    // Assign undefined instead of using delete, see Data#remove
                    elem[dataUser.expando] = undefined;
                  }
                }
              }
            }
          });

          jQuery.fn.extend({
            detach: function(selector) {
              return remove(this, selector, true);
            },

            remove: function(selector) {
              return remove(this, selector);
            },

            text: function(value) {
              return access(
                this,
                function(value) {
                  return value === undefined
                    ? jQuery.text(this)
                    : this.empty().each(function() {
                        if (
                          this.nodeType === 1 ||
                          this.nodeType === 11 ||
                          this.nodeType === 9
                        ) {
                          this.textContent = value;
                        }
                      });
                },
                null,
                value,
                arguments.length
              );
            },

            append: function() {
              return domManip(this, arguments, function(elem) {
                if (
                  this.nodeType === 1 ||
                  this.nodeType === 11 ||
                  this.nodeType === 9
                ) {
                  var target = manipulationTarget(this, elem);
                  target.appendChild(elem);
                }
              });
            },

            prepend: function() {
              return domManip(this, arguments, function(elem) {
                if (
                  this.nodeType === 1 ||
                  this.nodeType === 11 ||
                  this.nodeType === 9
                ) {
                  var target = manipulationTarget(this, elem);
                  target.insertBefore(elem, target.firstChild);
                }
              });
            },

            before: function() {
              return domManip(this, arguments, function(elem) {
                if (this.parentNode) {
                  this.parentNode.insertBefore(elem, this);
                }
              });
            },

            after: function() {
              return domManip(this, arguments, function(elem) {
                if (this.parentNode) {
                  this.parentNode.insertBefore(elem, this.nextSibling);
                }
              });
            },

            empty: function() {
              var elem;

              var i = 0;

              for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                  // Prevent memory leaks
                  jQuery.cleanData(getAll(elem, false));

                  // Remove any remaining nodes
                  elem.textContent = '';
                }
              }

              return this;
            },

            clone: function(dataAndEvents, deepDataAndEvents) {
              dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
              deepDataAndEvents =
                deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

              return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
              });
            },

            html: function(value) {
              return access(
                this,
                function(value) {
                  var elem = this[0] || {};

                  var i = 0;

                  var l = this.length;

                  if (value === undefined && elem.nodeType === 1) {
                    return elem.innerHTML;
                  }

                  // See if we can take a shortcut and just use innerHTML
                  if (
                    typeof value === 'string' &&
                    !rnoInnerhtml.test(value) &&
                    !wrapMap[(rtagName.exec(value) || ['', ''])[1].toLowerCase()]
                  ) {
                    value = jQuery.htmlPrefilter(value);

                    try {
                      for (; i < l; i++) {
                        elem = this[i] || {};

                        // Remove element nodes and prevent memory leaks
                        if (elem.nodeType === 1) {
                          jQuery.cleanData(getAll(elem, false));
                          elem.innerHTML = value;
                        }
                      }

                      elem = 0;

                      // If using innerHTML throws an exception, use the fallback method
                    } catch (e) {}
                  }

                  if (elem) {
                    this.empty().append(value);
                  }
                },
                null,
                value,
                arguments.length
              );
            },

            replaceWith: function() {
              var ignored = [];

              // Make the changes, replacing each non-ignored context element with the new content
              return domManip(
                this,
                arguments,
                function(elem) {
                  var parent = this.parentNode;

                  if (jQuery.inArray(this, ignored) < 0) {
                    jQuery.cleanData(getAll(this));
                    if (parent) {
                      parent.replaceChild(elem, this);
                    }
                  }

                  // Force callback invocation
                },
                ignored
              );
            }
          });

          jQuery.each(
            {
              appendTo: 'append',
              prependTo: 'prepend',
              insertBefore: 'before',
              insertAfter: 'after',
              replaceAll: 'replaceWith'
            },
            function(name, original) {
              jQuery.fn[name] = function(selector) {
                var elems;

                var ret = [];

                var insert = jQuery(selector);

                var last = insert.length - 1;

                var i = 0;

                for (; i <= last; i++) {
                  elems = i === last ? this : this.clone(true);
                  jQuery(insert[i])[original](elems);

                  // Support: Android <=4.0 only, PhantomJS 1 only
                  // .get() because push.apply(_, arraylike) throws on ancient WebKit
                  push.apply(ret, elems.get());
                }

                return this.pushStack(ret);
              };
            }
          );
          var rnumnonpx = new RegExp('^(' + pnum + ')(?!px)[a-z%]+$', 'i');

          var getStyles = function(elem) {
            // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            var view = elem.ownerDocument.defaultView;

            if (!view || !view.opener) {
              view = window;
            }

            return view.getComputedStyle(elem);
          };

          var rboxStyle = new RegExp(cssExpand.join('|'), 'i');

          (function() {
            // Executing both pixelPosition & boxSizingReliable tests require only one layout
            // so they're executed at the same time to save the second computation.
            function computeStyleTests() {
              // This is a singleton, we need to execute it only once
              if (!div) {
                return;
              }

              container.style.cssText =
                'position:absolute;left:-11111px;width:60px;' +
                'margin-top:1px;padding:0;border:0';
              div.style.cssText =
                'position:relative;display:block;box-sizing:border-box;overflow:scroll;' +
                'margin:auto;border:1px;padding:1px;' +
                'width:60%;top:1%';
              documentElement.appendChild(container).appendChild(div);

              var divStyle = window.getComputedStyle(div);
              pixelPositionVal = divStyle.top !== '1%';

              // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
              reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;

              // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
              // Some styles come back with percentage values, even though they shouldn't
              div.style.right = '60%';
              pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;

              // Support: IE 9 - 11 only
              // Detect misreporting of content dimensions for box-sizing:border-box elements
              boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;

              // Support: IE 9 only
              // Detect overflow:scroll screwiness (gh-3699)
              // Support: Chrome <=64
              // Don't get tricked when zoom affects offsetWidth (gh-4029)
              div.style.position = 'absolute';
              scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;

              documentElement.removeChild(container);

              // Nullify the div so it wouldn't be stored in the memory and
              // it will also be a sign that checks already performed
              div = null;
            }

            function roundPixelMeasures(measure) {
              return Math.round(parseFloat(measure));
            }

            var pixelPositionVal;

            var boxSizingReliableVal;

            var scrollboxSizeVal;

            var pixelBoxStylesVal;

            var reliableMarginLeftVal;

            var container = document.createElement('div');

            var div = document.createElement('div');

            // Finish early in limited (non-browser) environments
            if (!div.style) {
              return;
            }

            // Support: IE <=9 - 11 only
            // Style of cloned element affects source element cloned (#8908)
            div.style.backgroundClip = 'content-box';
            div.cloneNode(true).style.backgroundClip = '';
            support.clearCloneStyle = div.style.backgroundClip === 'content-box';

            jQuery.extend(support, {
              boxSizingReliable: function() {
                computeStyleTests();
                return boxSizingReliableVal;
              },
              pixelBoxStyles: function() {
                computeStyleTests();
                return pixelBoxStylesVal;
              },
              pixelPosition: function() {
                computeStyleTests();
                return pixelPositionVal;
              },
              reliableMarginLeft: function() {
                computeStyleTests();
                return reliableMarginLeftVal;
              },
              scrollboxSize: function() {
                computeStyleTests();
                return scrollboxSizeVal;
              }
            });
          })();

          function curCSS(elem, name, computed) {
            var width;

            var minWidth;

            var maxWidth;

            var ret;

            // Support: Firefox 51+
            // Retrieving style before computed somehow
            // fixes an issue with getting wrong values
            // on detached elements

            var style = elem.style;

            computed = computed || getStyles(elem);

            // getPropertyValue is needed for:
            //   .css('filter') (IE 9 only, #12537)
            //   .css('--customProperty) (#3144)
            if (computed) {
              ret = computed.getPropertyValue(name) || computed[name];

              if (ret === '' && !isAttached(elem)) {
                ret = jQuery.style(elem, name);
              }

              // A tribute to the "awesome hack by Dean Edwards"
              // Android Browser returns percentage for some values,
              // but width seems to be reliably pixels.
              // This is against the CSSOM draft spec:
              // https://drafts.csswg.org/cssom/#resolved-values
              if (
                !support.pixelBoxStyles() &&
                rnumnonpx.test(ret) &&
                rboxStyle.test(name)
              ) {
                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
              }
            }

            return ret !== undefined
              ? // Support: IE <=9 - 11 only
                // IE returns zIndex value as an integer.
                ret + ''
              : ret;
          }

          function addGetHookIf(conditionFn, hookFn) {
            // Define the hook, we'll check on the first run if it's really needed.
            return {
              get: function() {
                if (conditionFn()) {
                  // Hook not needed (or it's not possible to use it due
                  // to missing dependency), remove it.
                  delete this.get;
                  return;
                }

                // Hook needed; redefine it so that the support test is not executed again.
                return (this.get = hookFn).apply(this, arguments);
              }
            };
          }

          var cssPrefixes = ['Webkit', 'Moz', 'ms'];

          var emptyStyle = document.createElement('div').style;

          var vendorProps = {};

          // Return a vendor-prefixed property or undefined
          function vendorPropName(name) {
            // Check for vendor prefixed names
            var capName = name[0].toUpperCase() + name.slice(1);

            var i = cssPrefixes.length;

            while (i--) {
              name = cssPrefixes[i] + capName;
              if (name in emptyStyle) {
                return name;
              }
            }
          }

          // Return a potentially-mapped jQuery.cssProps or vendor prefixed property
          function finalPropName(name) {
            var final = jQuery.cssProps[name] || vendorProps[name];

            if (final) {
              return final;
            }
            if (name in emptyStyle) {
              return name;
            }
            return (vendorProps[name] = vendorPropName(name) || name);
          }

          var // Swappable if display is none or starts with table
            // except "table", "table-cell", or "table-caption"
            // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
            rdisplayswap = /^(none|table(?!-c[ea]).+)/;

          var rcustomProp = /^--/;

          var cssShow = {
            position: 'absolute',
            visibility: 'hidden',
            display: 'block'
          };

          var cssNormalTransform = {
            letterSpacing: '0',
            fontWeight: '400'
          };

          function setPositiveNumber(elem, value, subtract) {
            // Any relative (+/-) values have already been
            // normalized at this point
            var matches = rcssNum.exec(value);
            return matches
              ? // Guard against undefined "subtract", e.g., when used as in cssHooks
                Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || 'px')
              : value;
          }

          function boxModelAdjustment(
            elem,
            dimension,
            box,
            isBorderBox,
            styles,
            computedVal
          ) {
            var i = dimension === 'width' ? 1 : 0;

            var extra = 0;

            var delta = 0;

            // Adjustment may not be necessary
            if (box === (isBorderBox ? 'border' : 'content')) {
              return 0;
            }

            for (; i < 4; i += 2) {
              // Both box models exclude margin
              if (box === 'margin') {
                delta += jQuery.css(elem, box + cssExpand[i], true, styles);
              }

              // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
              if (!isBorderBox) {
                // Add padding
                delta += jQuery.css(elem, 'padding' + cssExpand[i], true, styles);

                // For "border" or "margin", add border
                if (box !== 'padding') {
                  delta += jQuery.css(
                    elem,
                    'border' + cssExpand[i] + 'Width',
                    true,
                    styles
                  );

                  // But still keep track of it otherwise
                } else {
                  extra += jQuery.css(
                    elem,
                    'border' + cssExpand[i] + 'Width',
                    true,
                    styles
                  );
                }

                // If we get here with a border-box (content + padding + border), we're seeking "content" or
                // "padding" or "margin"
              } else {
                // For "content", subtract padding
                if (box === 'content') {
                  delta -= jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
                }

                // For "content" or "padding", subtract border
                if (box !== 'margin') {
                  delta -= jQuery.css(
                    elem,
                    'border' + cssExpand[i] + 'Width',
                    true,
                    styles
                  );
                }
              }
            }

            // Account for positive content-box scroll gutter when requested by providing computedVal
            if (!isBorderBox && computedVal >= 0) {
              // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
              // Assuming integer scroll gutter, subtract the rest and round down
              delta +=
                Math.max(
                  0,
                  Math.ceil(
                    elem['offset' + dimension[0].toUpperCase() + dimension.slice(1)] -
                      computedVal -
                      delta -
                      extra -
                      0.5

                    // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
                    // Use an explicit zero to avoid NaN (gh-3964)
                  )
                ) || 0;
            }

            return delta;
          }

          function getWidthOrHeight(elem, dimension, extra) {
            // Start with computed style
            var styles = getStyles(elem);

            // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
            // Fake content-box until we know it's needed to know the true value.

            var boxSizingNeeded = !support.boxSizingReliable() || extra;

            var isBorderBox =
              boxSizingNeeded &&
              jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';

            var valueIsBorderBox = isBorderBox;

            var val = curCSS(elem, dimension, styles);

            var offsetProp = 'offset' + dimension[0].toUpperCase() + dimension.slice(1);

            // Support: Firefox <=54
            // Return a confounding non-pixel value or feign ignorance, as appropriate.
            if (rnumnonpx.test(val)) {
              if (!extra) {
                return val;
              }
              val = 'auto';
            }

            // Fall back to offsetWidth/offsetHeight when value is "auto"
            // This happens for inline elements with no explicit setting (gh-3571)
            // Support: Android <=4.1 - 4.3 only
            // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
            // Support: IE 9-11 only
            // Also use offsetWidth/offsetHeight for when box sizing is unreliable
            // We use getClientRects() to check for hidden/disconnected.
            // In those cases, the computed value can be trusted to be border-box
            if (
              ((!support.boxSizingReliable() && isBorderBox) ||
                val === 'auto' ||
                (!parseFloat(val) &&
                  jQuery.css(elem, 'display', false, styles) === 'inline')) &&
              elem.getClientRects().length
            ) {
              isBorderBox =
                jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';

              // Where available, offsetWidth/offsetHeight approximate border box dimensions.
              // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
              // retrieved value as a content box dimension.
              valueIsBorderBox = offsetProp in elem;
              if (valueIsBorderBox) {
                val = elem[offsetProp];
              }
            }

            // Normalize "" and auto
            val = parseFloat(val) || 0;

            // Adjust for the element's box model
            return (
              val +
              boxModelAdjustment(
                elem,
                dimension,
                extra || (isBorderBox ? 'border' : 'content'),
                valueIsBorderBox,
                styles,

                // Provide the current computed size to request scroll gutter calculation (gh-3589)
                val
              ) +
              'px'
            );
          }

          jQuery.extend({
            // Add in style property hooks for overriding the default
            // behavior of getting and setting a style property
            cssHooks: {
              opacity: {
                get: function(elem, computed) {
                  if (computed) {
                    // We should always get a number back from opacity
                    var ret = curCSS(elem, 'opacity');
                    return ret === '' ? '1' : ret;
                  }
                }
              }
            },

            // Don't automatically add "px" to these possibly-unitless properties
            cssNumber: {
              animationIterationCount: true,
              columnCount: true,
              fillOpacity: true,
              flexGrow: true,
              flexShrink: true,
              fontWeight: true,
              gridArea: true,
              gridColumn: true,
              gridColumnEnd: true,
              gridColumnStart: true,
              gridRow: true,
              gridRowEnd: true,
              gridRowStart: true,
              lineHeight: true,
              opacity: true,
              order: true,
              orphans: true,
              widows: true,
              zIndex: true,
              zoom: true
            },

            // Add in properties whose names you wish to fix before
            // setting or getting the value
            cssProps: {},

            // Get and set the style property on a DOM Node
            style: function(elem, name, value, extra) {
              // Don't set styles on text and comment nodes
              if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
              }

              // Make sure that we're working with the right name
              var ret;

              var type;

              var hooks;

              var origName = camelCase(name);

              var isCustomProp = rcustomProp.test(name);

              var style = elem.style;

              // Make sure that we're working with the right name. We don't
              // want to query the value if it is a CSS custom property
              // since they are user-defined.
              if (!isCustomProp) {
                name = finalPropName(origName);
              }

              // Gets hook for the prefixed version, then unprefixed version
              hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

              // Check if we're setting a value
              if (value !== undefined) {
                type = typeof value;

                // Convert "+=" or "-=" to relative numbers (#7345)
                if (type === 'string' && (ret = rcssNum.exec(value)) && ret[1]) {
                  value = adjustCSS(elem, name, ret);

                  // Fixes bug #9237
                  type = 'number';
                }

                // Make sure that null and NaN values aren't set (#7116)
                if (value == null || value !== value) {
                  return;
                }

                // If a number was passed in, add the unit (except for certain CSS properties)
                // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
                // "px" to a few hardcoded values.
                if (type === 'number' && !isCustomProp) {
                  value += (ret && ret[3]) || (jQuery.cssNumber[origName] ? '' : 'px');
                }

                // background-* props affect original clone's values
                if (
                  !support.clearCloneStyle &&
                  value === '' &&
                  name.indexOf('background') === 0
                ) {
                  style[name] = 'inherit';
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if (
                  !hooks ||
                  !('set' in hooks) ||
                  (value = hooks.set(elem, value, extra)) !== undefined
                ) {
                  if (isCustomProp) {
                    style.setProperty(name, value);
                  } else {
                    style[name] = value;
                  }
                }
              } else {
                // If a hook was provided get the non-computed value from there
                if (
                  hooks &&
                  'get' in hooks &&
                  (ret = hooks.get(elem, false, extra)) !== undefined
                ) {
                  return ret;
                }

                // Otherwise just get the value from the style object
                return style[name];
              }
            },

            css: function(elem, name, extra, styles) {
              var val;

              var num;

              var hooks;

              var origName = camelCase(name);

              var isCustomProp = rcustomProp.test(name);

              // Make sure that we're working with the right name. We don't
              // want to modify the value if it is a CSS custom property
              // since they are user-defined.
              if (!isCustomProp) {
                name = finalPropName(origName);
              }

              // Try prefixed name followed by the unprefixed name
              hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

              // If a hook was provided get the computed value from there
              if (hooks && 'get' in hooks) {
                val = hooks.get(elem, true, extra);
              }

              // Otherwise, if a way to get the computed value exists, use that
              if (val === undefined) {
                val = curCSS(elem, name, styles);
              }

              // Convert "normal" to computed value
              if (val === 'normal' && name in cssNormalTransform) {
                val = cssNormalTransform[name];
              }

              // Make numeric if forced or a qualifier was provided and val looks numeric
              if (extra === '' || extra) {
                num = parseFloat(val);
                return extra === true || isFinite(num) ? num || 0 : val;
              }

              return val;
            }
          });

          jQuery.each(['height', 'width'], function(i, dimension) {
            jQuery.cssHooks[dimension] = {
              get: function(elem, computed, extra) {
                if (computed) {
                  // Certain elements can have dimension info if we invisibly show them
                  // but it must have a current display style that would benefit
                  return rdisplayswap.test(jQuery.css(elem, 'display')) &&
                    // Support: Safari 8+
                    // Table columns in Safari have non-zero offsetWidth & zero
                    // getBoundingClientRect().width unless display is changed.
                    // Support: IE <=11 only
                    // Running getBoundingClientRect on a disconnected node
                    // in IE throws an error.
                    (!elem.getClientRects().length ||
                      !elem.getBoundingClientRect().width)
                    ? swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, dimension, extra);
                      })
                    : getWidthOrHeight(elem, dimension, extra);
                }
              },

              set: function(elem, value, extra) {
                var matches;

                var styles = getStyles(elem);

                // Only read styles.position if the test has a chance to fail
                // to avoid forcing a reflow.

                var scrollboxSizeBuggy =
                  !support.scrollboxSize() && styles.position === 'absolute';

                // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)

                var boxSizingNeeded = scrollboxSizeBuggy || extra;

                var isBorderBox =
                  boxSizingNeeded &&
                  jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';

                var subtract = extra
                  ? boxModelAdjustment(elem, dimension, extra, isBorderBox, styles)
                  : 0;

                // Account for unreliable border-box dimensions by comparing offset* to computed and
                // faking a content-box to get border and padding (gh-3699)
                if (isBorderBox && scrollboxSizeBuggy) {
                  subtract -= Math.ceil(
                    elem['offset' + dimension[0].toUpperCase() + dimension.slice(1)] -
                      parseFloat(styles[dimension]) -
                      boxModelAdjustment(elem, dimension, 'border', false, styles) -
                      0.5
                  );
                }

                // Convert to pixels if value adjustment is needed
                if (
                  subtract &&
                  (matches = rcssNum.exec(value)) &&
                  (matches[3] || 'px') !== 'px'
                ) {
                  elem.style[dimension] = value;
                  value = jQuery.css(elem, dimension);
                }

                return setPositiveNumber(elem, value, subtract);
              }
            };
          });

          jQuery.cssHooks.marginLeft = addGetHookIf(
            support.reliableMarginLeft,
            function(elem, computed) {
              if (computed) {
                return (
                  (parseFloat(curCSS(elem, 'marginLeft')) ||
                    elem.getBoundingClientRect().left -
                      swap(elem, { marginLeft: 0 }, function() {
                        return elem.getBoundingClientRect().left;
                      })) + 'px'
                );
              }
            }
          );

          // These hooks are used by animate to expand properties
          jQuery.each(
            {
              margin: '',
              padding: '',
              border: 'Width'
            },
            function(prefix, suffix) {
              jQuery.cssHooks[prefix + suffix] = {
                expand: function(value) {
                  var i = 0;

                  var expanded = {};

                  // Assumes a single number if not a string

                  var parts = typeof value === 'string' ? value.split(' ') : [value];

                  for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] =
                      parts[i] || parts[i - 2] || parts[0];
                  }

                  return expanded;
                }
              };

              if (prefix !== 'margin') {
                jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
              }
            }
          );

          jQuery.fn.extend({
            css: function(name, value) {
              return access(
                this,
                function(elem, name, value) {
                  var styles;

                  var len;

                  var map = {};

                  var i = 0;

                  if (Array.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;

                    for (; i < len; i++) {
                      map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }

                    return map;
                  }

                  return value !== undefined
                    ? jQuery.style(elem, name, value)
                    : jQuery.css(elem, name);
                },
                name,
                value,
                arguments.length > 1
              );
            }
          });

          function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing);
          }
          jQuery.Tween = Tween;

          Tween.prototype = {
            constructor: Tween,
            init: function(elem, options, prop, end, easing, unit) {
              this.elem = elem;
              this.prop = prop;
              this.easing = easing || jQuery.easing._default;
              this.options = options;
              this.start = this.now = this.cur();
              this.end = end;
              this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px');
            },
            cur: function() {
              var hooks = Tween.propHooks[this.prop];

              return hooks && hooks.get
                ? hooks.get(this)
                : Tween.propHooks._default.get(this);
            },
            run: function(percent) {
              var eased;

              var hooks = Tween.propHooks[this.prop];

              if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](
                  percent,
                  this.options.duration * percent,
                  0,
                  1,
                  this.options.duration
                );
              } else {
                this.pos = eased = percent;
              }
              this.now = (this.end - this.start) * eased + this.start;

              if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
              }

              if (hooks && hooks.set) {
                hooks.set(this);
              } else {
                Tween.propHooks._default.set(this);
              }
              return this;
            }
          };

          Tween.prototype.init.prototype = Tween.prototype;

          Tween.propHooks = {
            _default: {
              get: function(tween) {
                var result;

                // Use a property on the element directly when it is not a DOM element,
                // or when there is no matching style property that exists.
                if (
                  tween.elem.nodeType !== 1 ||
                  (tween.elem[tween.prop] != null &&
                    tween.elem.style[tween.prop] == null)
                ) {
                  return tween.elem[tween.prop];
                }

                // Passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails.
                // Simple values such as "10px" are parsed to Float;
                // complex values such as "rotate(1rad)" are returned as-is.
                result = jQuery.css(tween.elem, tween.prop, '');

                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === 'auto' ? 0 : result;
              },
              set: function(tween) {
                // Use step hook for back compat.
                // Use cssHook if its there.
                // Use .style if available and use plain properties where available.
                if (jQuery.fx.step[tween.prop]) {
                  jQuery.fx.step[tween.prop](tween);
                } else if (
                  tween.elem.nodeType === 1 &&
                  (jQuery.cssHooks[tween.prop] ||
                    tween.elem.style[finalPropName(tween.prop)] != null)
                ) {
                  jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                  tween.elem[tween.prop] = tween.now;
                }
              }
            }
          };

          // Support: IE <=9 only
          // Panic based approach to setting things on disconnected nodes
          Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function(tween) {
              if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
              }
            }
          };

          jQuery.easing = {
            linear: function(p) {
              return p;
            },
            swing: function(p) {
              return 0.5 - Math.cos(p * Math.PI) / 2;
            },
            _default: 'swing'
          };

          jQuery.fx = Tween.prototype.init;

          // Back compat <1.8 extension point
          jQuery.fx.step = {};

          var fxNow;

          var inProgress;

          var rfxtypes = /^(?:toggle|show|hide)$/;

          var rrun = /queueHooks$/;

          function schedule() {
            if (inProgress) {
              if (document.hidden === false && window.requestAnimationFrame) {
                window.requestAnimationFrame(schedule);
              } else {
                window.setTimeout(schedule, jQuery.fx.interval);
              }

              jQuery.fx.tick();
            }
          }

          // Animations created synchronously will run synchronously
          function createFxNow() {
            window.setTimeout(function() {
              fxNow = undefined;
            });
            return (fxNow = Date.now());
          }

          // Generate parameters to create a standard animation
          function genFx(type, includeWidth) {
            var which;

            var i = 0;

            var attrs = { height: type };

            // If we include width, step value is 1 to do all cssExpand values,
            // otherwise step value is 2 to skip over Left and Right
            includeWidth = includeWidth ? 1 : 0;
            for (; i < 4; i += 2 - includeWidth) {
              which = cssExpand[i];
              attrs['margin' + which] = attrs['padding' + which] = type;
            }

            if (includeWidth) {
              attrs.opacity = attrs.width = type;
            }

            return attrs;
          }

          function createTween(value, prop, animation) {
            var tween;

            var collection = (Animation.tweeners[prop] || []).concat(
              Animation.tweeners['*']
            );

            var index = 0;

            var length = collection.length;
            for (; index < length; index++) {
              if ((tween = collection[index].call(animation, prop, value))) {
                // We're done with this property
                return tween;
              }
            }
          }

          function defaultPrefilter(elem, props, opts) {
            var prop;

            var value;

            var toggle;

            var hooks;

            var oldfire;

            var propTween;

            var restoreDisplay;

            var display;

            var isBox = 'width' in props || 'height' in props;

            var anim = this;

            var orig = {};

            var style = elem.style;

            var hidden = elem.nodeType && isHiddenWithinTree(elem);

            var dataShow = dataPriv.get(elem, 'fxshow');

            // Queue-skipping animations hijack the fx hooks
            if (!opts.queue) {
              hooks = jQuery._queueHooks(elem, 'fx');
              if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                  if (!hooks.unqueued) {
                    oldfire();
                  }
                };
              }
              hooks.unqueued++;

              anim.always(function() {
                // Ensure the complete handler is called before this completes
                anim.always(function() {
                  hooks.unqueued--;
                  if (!jQuery.queue(elem, 'fx').length) {
                    hooks.empty.fire();
                  }
                });
              });
            }

            // Detect show/hide animations
            for (prop in props) {
              value = props[prop];
              if (rfxtypes.test(value)) {
                delete props[prop];
                toggle = toggle || value === 'toggle';
                if (value === (hidden ? 'hide' : 'show')) {
                  // Pretend to be hidden if this is a "show" and
                  // there is still data from a stopped show/hide
                  if (value === 'show' && dataShow && dataShow[prop] !== undefined) {
                    hidden = true;

                    // Ignore all other no-op show/hide data
                  } else {
                    continue;
                  }
                }
                orig[prop] = (dataShow && dataShow[prop]) || jQuery.style(elem, prop);
              }
            }

            // Bail out if this is a no-op like .hide().hide()
            propTween = !jQuery.isEmptyObject(props);
            if (!propTween && jQuery.isEmptyObject(orig)) {
              return;
            }

            // Restrict "overflow" and "display" styles during box animations
            if (isBox && elem.nodeType === 1) {
              // Support: IE <=9 - 11, Edge 12 - 15
              // Record all 3 overflow attributes because IE does not infer the shorthand
              // from identically-valued overflowX and overflowY and Edge just mirrors
              // the overflowX value there.
              opts.overflow = [style.overflow, style.overflowX, style.overflowY];

              // Identify a display type, preferring old show/hide data over the CSS cascade
              restoreDisplay = dataShow && dataShow.display;
              if (restoreDisplay == null) {
                restoreDisplay = dataPriv.get(elem, 'display');
              }
              display = jQuery.css(elem, 'display');
              if (display === 'none') {
                if (restoreDisplay) {
                  display = restoreDisplay;
                } else {
                  // Get nonempty value(s) by temporarily forcing visibility
                  showHide([elem], true);
                  restoreDisplay = elem.style.display || restoreDisplay;
                  display = jQuery.css(elem, 'display');
                  showHide([elem]);
                }
              }

              // Animate inline elements as inline-block
              if (
                display === 'inline' ||
                (display === 'inline-block' && restoreDisplay != null)
              ) {
                if (jQuery.css(elem, 'float') === 'none') {
                  // Restore the original display value at the end of pure show/hide animations
                  if (!propTween) {
                    anim.done(function() {
                      style.display = restoreDisplay;
                    });
                    if (restoreDisplay == null) {
                      display = style.display;
                      restoreDisplay = display === 'none' ? '' : display;
                    }
                  }
                  style.display = 'inline-block';
                }
              }
            }

            if (opts.overflow) {
              style.overflow = 'hidden';
              anim.always(function() {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2];
              });
            }

            // Implement show/hide animations
            propTween = false;
            for (prop in orig) {
              // General show/hide setup for this element animation
              if (!propTween) {
                if (dataShow) {
                  if ('hidden' in dataShow) {
                    hidden = dataShow.hidden;
                  }
                } else {
                  dataShow = dataPriv.access(elem, 'fxshow', {
                    display: restoreDisplay
                  });
                }

                // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
                if (toggle) {
                  dataShow.hidden = !hidden;
                }

                // Show elements before animating them
                if (hidden) {
                  showHide([elem], true);
                }

                /* eslint-disable no-loop-func */

                anim.done(function() {
                  /* eslint-enable no-loop-func */

                  // The final step of a "hide" animation is actually hiding the element
                  if (!hidden) {
                    showHide([elem]);
                  }
                  dataPriv.remove(elem, 'fxshow');
                  for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                  }
                });
              }

              // Per-property setup
              propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
              if (!(prop in dataShow)) {
                dataShow[prop] = propTween.start;
                if (hidden) {
                  propTween.end = propTween.start;
                  propTween.start = 0;
                }
              }
            }
          }

          function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks;

            // camelCase, specialEasing and expand cssHook pass
            for (index in props) {
              name = camelCase(index);
              easing = specialEasing[name];
              value = props[index];
              if (Array.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
              }

              if (index !== name) {
                props[name] = value;
                delete props[index];
              }

              hooks = jQuery.cssHooks[name];
              if (hooks && 'expand' in hooks) {
                value = hooks.expand(value);
                delete props[name];

                // Not quite $.extend, this won't overwrite existing keys.
                // Reusing 'index' because we have the correct "name"
                for (index in value) {
                  if (!(index in props)) {
                    props[index] = value[index];
                    specialEasing[index] = easing;
                  }
                }
              } else {
                specialEasing[name] = easing;
              }
            }
          }

          function Animation(elem, properties, options) {
            var result;

            var stopped;

            var index = 0;

            var length = Animation.prefilters.length;

            var deferred = jQuery.Deferred().always(function() {
              // Don't match elem in the :animated selector
              delete tick.elem;
            });

            var tick = function() {
              if (stopped) {
                return false;
              }
              var currentTime = fxNow || createFxNow();

              var remaining = Math.max(
                0,
                animation.startTime + animation.duration - currentTime
              );

              // Support: Android 2.3 only
              // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)

              var temp = remaining / animation.duration || 0;

              var percent = 1 - temp;

              var index = 0;

              var length = animation.tweens.length;

              for (; index < length; index++) {
                animation.tweens[index].run(percent);
              }

              deferred.notifyWith(elem, [animation, percent, remaining]);

              // If there's more to do, yield
              if (percent < 1 && length) {
                return remaining;
              }

              // If this was an empty animation, synthesize a final progress notification
              if (!length) {
                deferred.notifyWith(elem, [animation, 1, 0]);
              }

              // Resolve the animation and report its conclusion
              deferred.resolveWith(elem, [animation]);
              return false;
            };

            var animation = deferred.promise({
              elem: elem,
              props: jQuery.extend({}, properties),
              opts: jQuery.extend(
                true,
                {
                  specialEasing: {},
                  easing: jQuery.easing._default
                },
                options
              ),
              originalProperties: properties,
              originalOptions: options,
              startTime: fxNow || createFxNow(),
              duration: options.duration,
              tweens: [],
              createTween: function(prop, end) {
                var tween = jQuery.Tween(
                  elem,
                  animation.opts,
                  prop,
                  end,
                  animation.opts.specialEasing[prop] || animation.opts.easing
                );
                animation.tweens.push(tween);
                return tween;
              },
              stop: function(gotoEnd) {
                var index = 0;

                // If we are going to the end, we want to run all the tweens
                // otherwise we skip this part

                var length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) {
                  return this;
                }
                stopped = true;
                for (; index < length; index++) {
                  animation.tweens[index].run(1);
                }

                // Resolve when we played the last frame; otherwise, reject
                if (gotoEnd) {
                  deferred.notifyWith(elem, [animation, 1, 0]);
                  deferred.resolveWith(elem, [animation, gotoEnd]);
                } else {
                  deferred.rejectWith(elem, [animation, gotoEnd]);
                }
                return this;
              }
            });

            var props = animation.props;

            propFilter(props, animation.opts.specialEasing);

            for (; index < length; index++) {
              result = Animation.prefilters[index].call(
                animation,
                elem,
                props,
                animation.opts
              );
              if (result) {
                if (isFunction(result.stop)) {
                  jQuery._queueHooks(
                    animation.elem,
                    animation.opts.queue
                  ).stop = result.stop.bind(result);
                }
                return result;
              }
            }

            jQuery.map(props, createTween, animation);

            if (isFunction(animation.opts.start)) {
              animation.opts.start.call(elem, animation);
            }

            // Attach callbacks from options
            animation
              .progress(animation.opts.progress)
              .done(animation.opts.done, animation.opts.complete)
              .fail(animation.opts.fail)
              .always(animation.opts.always);

            jQuery.fx.timer(
              jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
              })
            );

            return animation;
          }

          jQuery.Animation = jQuery.extend(Animation, {
            tweeners: {
              '*': [
                function(prop, value) {
                  var tween = this.createTween(prop, value);
                  adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                  return tween;
                }
              ]
            },

            tweener: function(props, callback) {
              if (isFunction(props)) {
                callback = props;
                props = ['*'];
              } else {
                props = props.match(rnothtmlwhite);
              }

              var prop;

              var index = 0;

              var length = props.length;

              for (; index < length; index++) {
                prop = props[index];
                Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                Animation.tweeners[prop].unshift(callback);
              }
            },

            prefilters: [defaultPrefilter],

            prefilter: function(callback, prepend) {
              if (prepend) {
                Animation.prefilters.unshift(callback);
              } else {
                Animation.prefilters.push(callback);
              }
            }
          });

          jQuery.speed = function(speed, easing, fn) {
            var opt =
              speed && typeof speed === 'object'
                ? jQuery.extend({}, speed)
                : {
                    complete: fn || (!fn && easing) || (isFunction(speed) && speed),
                    duration: speed,
                    easing: (fn && easing) || (easing && !isFunction(easing) && easing)
                  };

            // Go to the end state if fx are off
            if (jQuery.fx.off) {
              opt.duration = 0;
            } else {
              if (typeof opt.duration !== 'number') {
                if (opt.duration in jQuery.fx.speeds) {
                  opt.duration = jQuery.fx.speeds[opt.duration];
                } else {
                  opt.duration = jQuery.fx.speeds._default;
                }
              }
            }

            // Normalize opt.queue - true/undefined/null -> "fx"
            if (opt.queue == null || opt.queue === true) {
              opt.queue = 'fx';
            }

            // Queueing
            opt.old = opt.complete;

            opt.complete = function() {
              if (isFunction(opt.old)) {
                opt.old.call(this);
              }

              if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
              }
            };

            return opt;
          };

          jQuery.fn.extend({
            fadeTo: function(speed, to, easing, callback) {
              // Show any hidden elements after setting opacity to 0
              return (
                this.filter(isHiddenWithinTree)
                  .css('opacity', 0)
                  .show()

                  // Animate to the value specified
                  .end()
                  .animate({ opacity: to }, speed, easing, callback)
              );
            },
            animate: function(prop, speed, easing, callback) {
              var empty = jQuery.isEmptyObject(prop);

              var optall = jQuery.speed(speed, easing, callback);

              var doAnimation = function() {
                // Operate on a copy of prop so per-property easing won't be lost
                var anim = Animation(this, jQuery.extend({}, prop), optall);

                // Empty animations, or finishing resolves immediately
                if (empty || dataPriv.get(this, 'finish')) {
                  anim.stop(true);
                }
              };
              doAnimation.finish = doAnimation;

              return empty || optall.queue === false
                ? this.each(doAnimation)
                : this.queue(optall.queue, doAnimation);
            },
            stop: function(type, clearQueue, gotoEnd) {
              var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
              };

              if (typeof type !== 'string') {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
              }
              if (clearQueue && type !== false) {
                this.queue(type || 'fx', []);
              }

              return this.each(function() {
                var dequeue = true;

                var index = type != null && type + 'queueHooks';

                var timers = jQuery.timers;

                var data = dataPriv.get(this);

                if (index) {
                  if (data[index] && data[index].stop) {
                    stopQueue(data[index]);
                  }
                } else {
                  for (index in data) {
                    if (data[index] && data[index].stop && rrun.test(index)) {
                      stopQueue(data[index]);
                    }
                  }
                }

                for (index = timers.length; index--; ) {
                  if (
                    timers[index].elem === this &&
                    (type == null || timers[index].queue === type)
                  ) {
                    timers[index].anim.stop(gotoEnd);
                    dequeue = false;
                    timers.splice(index, 1);
                  }
                }

                // Start the next in the queue if the last step wasn't forced.
                // Timers currently will call their complete callbacks, which
                // will dequeue but only if they were gotoEnd.
                if (dequeue || !gotoEnd) {
                  jQuery.dequeue(this, type);
                }
              });
            },
            finish: function(type) {
              if (type !== false) {
                type = type || 'fx';
              }
              return this.each(function() {
                var index;

                var data = dataPriv.get(this);

                var queue = data[type + 'queue'];

                var hooks = data[type + 'queueHooks'];

                var timers = jQuery.timers;

                var length = queue ? queue.length : 0;

                // Enable finishing flag on private data
                data.finish = true;

                // Empty the queue first
                jQuery.queue(this, type, []);

                if (hooks && hooks.stop) {
                  hooks.stop.call(this, true);
                }

                // Look for any active animations, and finish them
                for (index = timers.length; index--; ) {
                  if (timers[index].elem === this && timers[index].queue === type) {
                    timers[index].anim.stop(true);
                    timers.splice(index, 1);
                  }
                }

                // Look for any animations in the old queue and finish them
                for (index = 0; index < length; index++) {
                  if (queue[index] && queue[index].finish) {
                    queue[index].finish.call(this);
                  }
                }

                // Turn off finishing flag
                delete data.finish;
              });
            }
          });

          jQuery.each(['toggle', 'show', 'hide'], function(i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function(speed, easing, callback) {
              return speed == null || typeof speed === 'boolean'
                ? cssFn.apply(this, arguments)
                : this.animate(genFx(name, true), speed, easing, callback);
            };
          });

          // Generate shortcuts for custom animations
          jQuery.each(
            {
              slideDown: genFx('show'),
              slideUp: genFx('hide'),
              slideToggle: genFx('toggle'),
              fadeIn: { opacity: 'show' },
              fadeOut: { opacity: 'hide' },
              fadeToggle: { opacity: 'toggle' }
            },
            function(name, props) {
              jQuery.fn[name] = function(speed, easing, callback) {
                return this.animate(props, speed, easing, callback);
              };
            }
          );

          jQuery.timers = [];
          jQuery.fx.tick = function() {
            var timer;

            var i = 0;

            var timers = jQuery.timers;

            fxNow = Date.now();

            for (; i < timers.length; i++) {
              timer = timers[i];

              // Run the timer and safely remove it when done (allowing for external removal)
              if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
              }
            }

            if (!timers.length) {
              jQuery.fx.stop();
            }
            fxNow = undefined;
          };

          jQuery.fx.timer = function(timer) {
            jQuery.timers.push(timer);
            jQuery.fx.start();
          };

          jQuery.fx.interval = 13;
          jQuery.fx.start = function() {
            if (inProgress) {
              return;
            }

            inProgress = true;
            schedule();
          };

          jQuery.fx.stop = function() {
            inProgress = null;
          };

          jQuery.fx.speeds = {
            slow: 600,
            fast: 200,

            // Default speed
            _default: 400
          };

          // Based off of the plugin by Clint Helfers, with permission.
          // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
          jQuery.fn.delay = function(time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || 'fx';

            return this.queue(type, function(next, hooks) {
              var timeout = window.setTimeout(next, time);
              hooks.stop = function() {
                window.clearTimeout(timeout);
              };
            });
          };

          (function() {
            var input = document.createElement('input');

            var select = document.createElement('select');

            var opt = select.appendChild(document.createElement('option'));

            input.type = 'checkbox';

            // Support: Android <=4.3 only
            // Default value for a checkbox should be "on"
            support.checkOn = input.value !== '';

            // Support: IE <=11 only
            // Must access selectedIndex to make default options select
            support.optSelected = opt.selected;

            // Support: IE <=11 only
            // An input loses its value after becoming a radio
            input = document.createElement('input');
            input.value = 't';
            input.type = 'radio';
            support.radioValue = input.value === 't';
          })();

          var boolHook;

          var attrHandle = jQuery.expr.attrHandle;

          jQuery.fn.extend({
            attr: function(name, value) {
              return access(this, jQuery.attr, name, value, arguments.length > 1);
            },

            removeAttr: function(name) {
              return this.each(function() {
                jQuery.removeAttr(this, name);
              });
            }
          });

          jQuery.extend({
            attr: function(elem, name, value) {
              var ret;

              var hooks;

              var nType = elem.nodeType;

              // Don't get/set attributes on text, comment and attribute nodes
              if (nType === 3 || nType === 8 || nType === 2) {
                return;
              }

              // Fallback to prop when attributes are not supported
              if (typeof elem.getAttribute === 'undefined') {
                return jQuery.prop(elem, name, value);
              }

              // Attribute hooks are determined by the lowercase version
              // Grab necessary hook if one is defined
              if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                hooks =
                  jQuery.attrHooks[name.toLowerCase()] ||
                  (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
              }

              if (value !== undefined) {
                if (value === null) {
                  jQuery.removeAttr(elem, name);
                  return;
                }

                if (
                  hooks &&
                  'set' in hooks &&
                  (ret = hooks.set(elem, value, name)) !== undefined
                ) {
                  return ret;
                }

                elem.setAttribute(name, value + '');
                return value;
              }

              if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
              }

              ret = jQuery.find.attr(elem, name);

              // Non-existent attributes return null, we normalize to undefined
              return ret == null ? undefined : ret;
            },

            attrHooks: {
              type: {
                set: function(elem, value) {
                  if (
                    !support.radioValue &&
                    value === 'radio' &&
                    nodeName(elem, 'input')
                  ) {
                    var val = elem.value;
                    elem.setAttribute('type', value);
                    if (val) {
                      elem.value = val;
                    }
                    return value;
                  }
                }
              }
            },

            removeAttr: function(elem, value) {
              var name;

              var i = 0;

              // Attribute names can contain non-HTML whitespace characters
              // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2

              var attrNames = value && value.match(rnothtmlwhite);

              if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                  elem.removeAttribute(name);
                }
              }
            }
          });

          // Hooks for boolean attributes
          boolHook = {
            set: function(elem, value, name) {
              if (value === false) {
                // Remove boolean attributes when set to false
                jQuery.removeAttr(elem, name);
              } else {
                elem.setAttribute(name, name);
              }
              return name;
            }
          };

          jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
            var getter = attrHandle[name] || jQuery.find.attr;

            attrHandle[name] = function(elem, name, isXML) {
              var ret;

              var handle;

              var lowercaseName = name.toLowerCase();

              if (!isXML) {
                // Avoid an infinite loop by temporarily removing this function from the getter
                handle = attrHandle[lowercaseName];
                attrHandle[lowercaseName] = ret;
                ret = getter(elem, name, isXML) != null ? lowercaseName : null;
                attrHandle[lowercaseName] = handle;
              }
              return ret;
            };
          });

          var rfocusable = /^(?:input|select|textarea|button)$/i;

          var rclickable = /^(?:a|area)$/i;

          jQuery.fn.extend({
            prop: function(name, value) {
              return access(this, jQuery.prop, name, value, arguments.length > 1);
            },

            removeProp: function(name) {
              return this.each(function() {
                delete this[jQuery.propFix[name] || name];
              });
            }
          });

          jQuery.extend({
            prop: function(elem, name, value) {
              var ret;

              var hooks;

              var nType = elem.nodeType;

              // Don't get/set properties on text, comment and attribute nodes
              if (nType === 3 || nType === 8 || nType === 2) {
                return;
              }

              if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                // Fix name and attach hooks
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
              }

              if (value !== undefined) {
                if (
                  hooks &&
                  'set' in hooks &&
                  (ret = hooks.set(elem, value, name)) !== undefined
                ) {
                  return ret;
                }

                return (elem[name] = value);
              }

              if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
              }

              return elem[name];
            },

            propHooks: {
              tabIndex: {
                get: function(elem) {
                  // Support: IE <=9 - 11 only
                  // elem.tabIndex doesn't always return the
                  // correct value when it hasn't been explicitly set
                  // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                  // Use proper attribute retrieval(#12072)
                  var tabindex = jQuery.find.attr(elem, 'tabindex');

                  if (tabindex) {
                    return parseInt(tabindex, 10);
                  }

                  if (
                    rfocusable.test(elem.nodeName) ||
                    (rclickable.test(elem.nodeName) && elem.href)
                  ) {
                    return 0;
                  }

                  return -1;
                }
              }
            },

            propFix: {
              for: 'htmlFor',
              class: 'className'
            }
          });

          // Support: IE <=11 only
          // Accessing the selectedIndex property
          // forces the browser to respect setting selected
          // on the option
          // The getter ensures a default option is selected
          // when in an optgroup
          // eslint rule "no-unused-expressions" is disabled for this code
          // since it considers such accessions noop
          if (!support.optSelected) {
            jQuery.propHooks.selected = {
              get: function(elem) {
                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if (parent && parent.parentNode) {
                  parent.parentNode.selectedIndex;
                }
                return null;
              },
              set: function(elem) {
                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if (parent) {
                  parent.selectedIndex;

                  if (parent.parentNode) {
                    parent.parentNode.selectedIndex;
                  }
                }
              }
            };
          }

          jQuery.each(
            [
              'tabIndex',
              'readOnly',
              'maxLength',
              'cellSpacing',
              'cellPadding',
              'rowSpan',
              'colSpan',
              'useMap',
              'frameBorder',
              'contentEditable'
            ],
            function() {
              jQuery.propFix[this.toLowerCase()] = this;
            }
          );

          // Strip and collapse whitespace according to HTML spec
          // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
          function stripAndCollapse(value) {
            var tokens = value.match(rnothtmlwhite) || [];
            return tokens.join(' ');
          }

          function getClass(elem) {
            return (elem.getAttribute && elem.getAttribute('class')) || '';
          }

          function classesToArray(value) {
            if (Array.isArray(value)) {
              return value;
            }
            if (typeof value === 'string') {
              return value.match(rnothtmlwhite) || [];
            }
            return [];
          }

          jQuery.fn.extend({
            addClass: function(value) {
              var classes;

              var elem;

              var cur;

              var curValue;

              var clazz;

              var j;

              var finalValue;

              var i = 0;

              if (isFunction(value)) {
                return this.each(function(j) {
                  jQuery(this).addClass(value.call(this, j, getClass(this)));
                });
              }

              classes = classesToArray(value);

              if (classes.length) {
                while ((elem = this[i++])) {
                  curValue = getClass(elem);
                  cur = elem.nodeType === 1 && ' ' + stripAndCollapse(curValue) + ' ';

                  if (cur) {
                    j = 0;
                    while ((clazz = classes[j++])) {
                      if (cur.indexOf(' ' + clazz + ' ') < 0) {
                        cur += clazz + ' ';
                      }
                    }

                    // Only assign if different to avoid unneeded rendering.
                    finalValue = stripAndCollapse(cur);
                    if (curValue !== finalValue) {
                      elem.setAttribute('class', finalValue);
                    }
                  }
                }
              }

              return this;
            },

            removeClass: function(value) {
              var classes;

              var elem;

              var cur;

              var curValue;

              var clazz;

              var j;

              var finalValue;

              var i = 0;

              if (isFunction(value)) {
                return this.each(function(j) {
                  jQuery(this).removeClass(value.call(this, j, getClass(this)));
                });
              }

              if (!arguments.length) {
                return this.attr('class', '');
              }

              classes = classesToArray(value);

              if (classes.length) {
                while ((elem = this[i++])) {
                  curValue = getClass(elem);

                  // This expression is here for better compressibility (see addClass)
                  cur = elem.nodeType === 1 && ' ' + stripAndCollapse(curValue) + ' ';

                  if (cur) {
                    j = 0;
                    while ((clazz = classes[j++])) {
                      // Remove *all* instances
                      while (cur.indexOf(' ' + clazz + ' ') > -1) {
                        cur = cur.replace(' ' + clazz + ' ', ' ');
                      }
                    }

                    // Only assign if different to avoid unneeded rendering.
                    finalValue = stripAndCollapse(cur);
                    if (curValue !== finalValue) {
                      elem.setAttribute('class', finalValue);
                    }
                  }
                }
              }

              return this;
            },

            toggleClass: function(value, stateVal) {
              var type = typeof value;

              var isValidValue = type === 'string' || Array.isArray(value);

              if (typeof stateVal === 'boolean' && isValidValue) {
                return stateVal ? this.addClass(value) : this.removeClass(value);
              }

              if (isFunction(value)) {
                return this.each(function(i) {
                  jQuery(this).toggleClass(
                    value.call(this, i, getClass(this), stateVal),
                    stateVal
                  );
                });
              }

              return this.each(function() {
                var className, i, self, classNames;

                if (isValidValue) {
                  // Toggle individual class names
                  i = 0;
                  self = jQuery(this);
                  classNames = classesToArray(value);

                  while ((className = classNames[i++])) {
                    // Check each className given, space separated list
                    if (self.hasClass(className)) {
                      self.removeClass(className);
                    } else {
                      self.addClass(className);
                    }
                  }

                  // Toggle whole class name
                } else if (value === undefined || type === 'boolean') {
                  className = getClass(this);
                  if (className) {
                    // Store className if set
                    dataPriv.set(this, '__className__', className);
                  }

                  // If the element has a class name or if we're passed `false`,
                  // then remove the whole classname (if there was one, the above saved it).
                  // Otherwise bring back whatever was previously saved (if anything),
                  // falling back to the empty string if nothing was stored.
                  if (this.setAttribute) {
                    this.setAttribute(
                      'class',
                      className || value === false
                        ? ''
                        : dataPriv.get(this, '__className__') || ''
                    );
                  }
                }
              });
            },

            hasClass: function(selector) {
              var className;

              var elem;

              var i = 0;

              className = ' ' + selector + ' ';
              while ((elem = this[i++])) {
                if (
                  elem.nodeType === 1 &&
                  (' ' + stripAndCollapse(getClass(elem)) + ' ').indexOf(className) > -1
                ) {
                  return true;
                }
              }

              return false;
            }
          });

          var rreturn = /\r/g;

          jQuery.fn.extend({
            val: function(value) {
              var hooks;

              var ret;

              var valueIsFunction;

              var elem = this[0];

              if (!arguments.length) {
                if (elem) {
                  hooks =
                    jQuery.valHooks[elem.type] ||
                    jQuery.valHooks[elem.nodeName.toLowerCase()];

                  if (
                    hooks &&
                    'get' in hooks &&
                    (ret = hooks.get(elem, 'value')) !== undefined
                  ) {
                    return ret;
                  }

                  ret = elem.value;

                  // Handle most common string cases
                  if (typeof ret === 'string') {
                    return ret.replace(rreturn, '');
                  }

                  // Handle cases where value is null/undef or number
                  return ret == null ? '' : ret;
                }

                return;
              }

              valueIsFunction = isFunction(value);

              return this.each(function(i) {
                var val;

                if (this.nodeType !== 1) {
                  return;
                }

                if (valueIsFunction) {
                  val = value.call(this, i, jQuery(this).val());
                } else {
                  val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if (val == null) {
                  val = '';
                } else if (typeof val === 'number') {
                  val += '';
                } else if (Array.isArray(val)) {
                  val = jQuery.map(val, function(value) {
                    return value == null ? '' : value + '';
                  });
                }

                hooks =
                  jQuery.valHooks[this.type] ||
                  jQuery.valHooks[this.nodeName.toLowerCase()];

                // If set returns undefined, fall back to normal setting
                if (
                  !hooks ||
                  !('set' in hooks) ||
                  hooks.set(this, val, 'value') === undefined
                ) {
                  this.value = val;
                }
              });
            }
          });

          jQuery.extend({
            valHooks: {
              option: {
                get: function(elem) {
                  var val = jQuery.find.attr(elem, 'value');
                  return val != null
                    ? val
                    : // Support: IE <=10 - 11 only
                      // option.text throws exceptions (#14686, #14858)
                      // Strip and collapse whitespace
                      // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                      stripAndCollapse(jQuery.text(elem));
                }
              },
              select: {
                get: function(elem) {
                  var value;

                  var option;

                  var i;

                  var options = elem.options;

                  var index = elem.selectedIndex;

                  var one = elem.type === 'select-one';

                  var values = one ? null : [];

                  var max = one ? index + 1 : options.length;

                  if (index < 0) {
                    i = max;
                  } else {
                    i = one ? index : 0;
                  }

                  // Loop through all the selected options
                  for (; i < max; i++) {
                    option = options[i];

                    // Support: IE <=9 only
                    // IE8-9 doesn't update selected after form reset (#2551)
                    if (
                      (option.selected || i === index) &&
                      // Don't return options that are disabled or in a disabled optgroup
                      !option.disabled &&
                      (!option.parentNode.disabled ||
                        !nodeName(option.parentNode, 'optgroup'))
                    ) {
                      // Get the specific value for the option
                      value = jQuery(option).val();

                      // We don't need an array for one selects
                      if (one) {
                        return value;
                      }

                      // Multi-Selects return an array
                      values.push(value);
                    }
                  }

                  return values;
                },

                set: function(elem, value) {
                  var optionSet;

                  var option;

                  var options = elem.options;

                  var values = jQuery.makeArray(value);

                  var i = options.length;

                  while (i--) {
                    option = options[i];

                    /* eslint-disable no-cond-assign */

                    if (
                      (option.selected =
                        jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1)
                    ) {
                      optionSet = true;
                    }

                    /* eslint-enable no-cond-assign */
                  }

                  // Force browsers to behave consistently when non-matching value is set
                  if (!optionSet) {
                    elem.selectedIndex = -1;
                  }
                  return values;
                }
              }
            }
          });

          // Radios and checkboxes getter/setter
          jQuery.each(['radio', 'checkbox'], function() {
            jQuery.valHooks[this] = {
              set: function(elem, value) {
                if (Array.isArray(value)) {
                  return (elem.checked =
                    jQuery.inArray(jQuery(elem).val(), value) > -1);
                }
              }
            };
            if (!support.checkOn) {
              jQuery.valHooks[this].get = function(elem) {
                return elem.getAttribute('value') === null ? 'on' : elem.value;
              };
            }
          });

          // Return jQuery for attributes-only inclusion

          support.focusin = 'onfocusin' in window;

          var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

          var stopPropagationCallback = function(e) {
            e.stopPropagation();
          };

          jQuery.extend(jQuery.event, {
            trigger: function(event, data, elem, onlyHandlers) {
              var i;

              var cur;

              var tmp;

              var bubbleType;

              var ontype;

              var handle;

              var special;

              var lastElement;

              var eventPath = [elem || document];

              var type = hasOwn.call(event, 'type') ? event.type : event;

              var namespaces = hasOwn.call(event, 'namespace')
                ? event.namespace.split('.')
                : [];

              cur = lastElement = tmp = elem = elem || document;

              // Don't do events on text and comment nodes
              if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
              }

              // focus/blur morphs to focusin/out; ensure we're not firing them right now
              if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
              }

              if (type.indexOf('.') > -1) {
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split('.');
                type = namespaces.shift();
                namespaces.sort();
              }
              ontype = type.indexOf(':') < 0 && 'on' + type;

              // Caller can pass in a jQuery.Event object, Object, or just an event type string
              event = event[jQuery.expando]
                ? event
                : new jQuery.Event(type, typeof event === 'object' && event);

              // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
              event.isTrigger = onlyHandlers ? 2 : 3;
              event.namespace = namespaces.join('.');
              event.rnamespace = event.namespace
                ? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)')
                : null;

              // Clean up the event in case it is being reused
              event.result = undefined;
              if (!event.target) {
                event.target = elem;
              }

              // Clone any incoming data and prepend the event, creating the handler arg list
              data = data == null ? [event] : jQuery.makeArray(data, [event]);

              // Allow special events to draw outside the lines
              special = jQuery.event.special[type] || {};
              if (
                !onlyHandlers &&
                special.trigger &&
                special.trigger.apply(elem, data) === false
              ) {
                return;
              }

              // Determine event propagation path in advance, per W3C events spec (#9951)
              // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
              if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                  cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                  eventPath.push(cur);
                  tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if (tmp === (elem.ownerDocument || document)) {
                  eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
              }

              // Fire handlers on the event path
              i = 0;
              while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                lastElement = cur;
                event.type = i > 1 ? bubbleType : special.bindType || type;

                // jQuery handler
                handle =
                  (dataPriv.get(cur, 'events') || {})[event.type] &&
                  dataPriv.get(cur, 'handle');
                if (handle) {
                  handle.apply(cur, data);
                }

                // Native handler
                handle = ontype && cur[ontype];
                if (handle && handle.apply && acceptData(cur)) {
                  event.result = handle.apply(cur, data);
                  if (event.result === false) {
                    event.preventDefault();
                  }
                }
              }
              event.type = type;

              // If nobody prevented the default action, do it now
              if (!onlyHandlers && !event.isDefaultPrevented()) {
                if (
                  (!special._default ||
                    special._default.apply(eventPath.pop(), data) === false) &&
                  acceptData(elem)
                ) {
                  // Call a native DOM method on the target with the same name as the event.
                  // Don't do default actions on window, that's where global variables be (#6170)
                  if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
                    // Don't re-trigger an onFOO event when we call its FOO() method
                    tmp = elem[ontype];

                    if (tmp) {
                      elem[ontype] = null;
                    }

                    // Prevent re-triggering of the same event, since we already bubbled it above
                    jQuery.event.triggered = type;

                    if (event.isPropagationStopped()) {
                      lastElement.addEventListener(type, stopPropagationCallback);
                    }

                    elem[type]();

                    if (event.isPropagationStopped()) {
                      lastElement.removeEventListener(type, stopPropagationCallback);
                    }

                    jQuery.event.triggered = undefined;

                    if (tmp) {
                      elem[ontype] = tmp;
                    }
                  }
                }
              }

              return event.result;
            },

            // Piggyback on a donor event to simulate a different one
            // Used only for `focus(in | out)` events
            simulate: function(type, elem, event) {
              var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true
              });

              jQuery.event.trigger(e, null, elem);
            }
          });

          jQuery.fn.extend({
            trigger: function(type, data) {
              return this.each(function() {
                jQuery.event.trigger(type, data, this);
              });
            },
            triggerHandler: function(type, data) {
              var elem = this[0];
              if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
              }
            }
          });

          // Support: Firefox <=44
          // Firefox doesn't have focus(in | out) events
          // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
          //
          // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
          // focus(in | out) events fire after focus & blur events,
          // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
          // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
          if (!support.focusin) {
            jQuery.each({ focus: 'focusin', blur: 'focusout' }, function(orig, fix) {
              // Attach a single capturing handler on the document while someone wants focusin/focusout
              var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
              };

              jQuery.event.special[fix] = {
                setup: function() {
                  var doc = this.ownerDocument || this;

                  var attaches = dataPriv.access(doc, fix);

                  if (!attaches) {
                    doc.addEventListener(orig, handler, true);
                  }
                  dataPriv.access(doc, fix, (attaches || 0) + 1);
                },
                teardown: function() {
                  var doc = this.ownerDocument || this;

                  var attaches = dataPriv.access(doc, fix) - 1;

                  if (!attaches) {
                    doc.removeEventListener(orig, handler, true);
                    dataPriv.remove(doc, fix);
                  } else {
                    dataPriv.access(doc, fix, attaches);
                  }
                }
              };
            });
          }
          var location = window.location;

          var nonce = Date.now();

          var rquery = /\?/;

          // Cross-browser xml parsing
          jQuery.parseXML = function(data) {
            var xml;
            if (!data || typeof data !== 'string') {
              return null;
            }

            // Support: IE 9 - 11 only
            // IE throws on parseFromString with invalid input.
            try {
              xml = new window.DOMParser().parseFromString(data, 'text/xml');
            } catch (e) {
              xml = undefined;
            }

            if (!xml || xml.getElementsByTagName('parsererror').length) {
              jQuery.error('Invalid XML: ' + data);
            }
            return xml;
          };

          var rbracket = /\[\]$/;

          var rCRLF = /\r?\n/g;

          var rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i;

          var rsubmittable = /^(?:input|select|textarea|keygen)/i;

          function buildParams(prefix, obj, traditional, add) {
            var name;

            if (Array.isArray(obj)) {
              // Serialize array item.
              jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                  // Treat each array item as a scalar.
                  add(prefix, v);
                } else {
                  // Item is non-scalar (array or object), encode its numeric index.
                  buildParams(
                    prefix + '[' + (typeof v === 'object' && v != null ? i : '') + ']',
                    v,
                    traditional,
                    add
                  );
                }
              });
            } else if (!traditional && toType(obj) === 'object') {
              // Serialize object item.
              for (name in obj) {
                buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
              }
            } else {
              // Serialize scalar item.
              add(prefix, obj);
            }
          }

          // Serialize an array of form elements or a set of
          // key/values into a query string
          jQuery.param = function(a, traditional) {
            var prefix;

            var s = [];

            var add = function(key, valueOrFunction) {
              // If value is a function, invoke it and use its return value
              var value = isFunction(valueOrFunction)
                ? valueOrFunction()
                : valueOrFunction;

              s[s.length] =
                encodeURIComponent(key) +
                '=' +
                encodeURIComponent(value == null ? '' : value);
            };

            if (a == null) {
              return '';
            }

            // If an array was passed in, assume that it is an array of form elements.
            if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
              // Serialize the form elements
              jQuery.each(a, function() {
                add(this.name, this.value);
              });
            } else {
              // If traditional, encode the "old" way (the way 1.3.2 or older
              // did it), otherwise encode params recursively.
              for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
              }
            }

            // Return the resulting serialization
            return s.join('&');
          };

          jQuery.fn.extend({
            serialize: function() {
              return jQuery.param(this.serializeArray());
            },
            serializeArray: function() {
              return this.map(function() {
                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop(this, 'elements');
                return elements ? jQuery.makeArray(elements) : this;
              })
                .filter(function() {
                  var type = this.type;

                  // Use .is( ":disabled" ) so that fieldset[disabled] works
                  return (
                    this.name &&
                    !jQuery(this).is(':disabled') &&
                    rsubmittable.test(this.nodeName) &&
                    !rsubmitterTypes.test(type) &&
                    (this.checked || !rcheckableType.test(type))
                  );
                })
                .map(function(i, elem) {
                  var val = jQuery(this).val();

                  if (val == null) {
                    return null;
                  }

                  if (Array.isArray(val)) {
                    return jQuery.map(val, function(val) {
                      return { name: elem.name, value: val.replace(rCRLF, '\r\n') };
                    });
                  }

                  return { name: elem.name, value: val.replace(rCRLF, '\r\n') };
                })
                .get();
            }
          });

          var r20 = /%20/g;

          var rhash = /#.*$/;

          var rantiCache = /([?&])_=[^&]*/;

          var rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm;

          // #7653, #8125, #8152: local protocol detection

          var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;

          var rnoContent = /^(?:GET|HEAD)$/;

          var rprotocol = /^\/\//;

          /* Prefilters
           * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
           * 2) These are called:
           *    - BEFORE asking for a transport
           *    - AFTER param serialization (s.data is a string if s.processData is true)
           * 3) key is the dataType
           * 4) the catchall symbol "*" can be used
           * 5) execution will start with transport dataType and THEN continue down to "*" if needed
           */

          var prefilters = {};

          /* Transports bindings
           * 1) key is the dataType
           * 2) the catchall symbol "*" can be used
           * 3) selection will start with transport dataType and THEN go to "*" if needed
           */

          var transports = {};

          // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression

          var allTypes = '*/'.concat('*');

          // Anchor tag for parsing the document origin

          var originAnchor = document.createElement('a');
          originAnchor.href = location.href;

          // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
          function addToPrefiltersOrTransports(structure) {
            // dataTypeExpression is optional and defaults to "*"
            return function(dataTypeExpression, func) {
              if (typeof dataTypeExpression !== 'string') {
                func = dataTypeExpression;
                dataTypeExpression = '*';
              }

              var dataType;

              var i = 0;

              var dataTypes =
                dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

              if (isFunction(func)) {
                // For each dataType in the dataTypeExpression
                while ((dataType = dataTypes[i++])) {
                  // Prepend if requested
                  if (dataType[0] === '+') {
                    dataType = dataType.slice(1) || '*';
                    (structure[dataType] = structure[dataType] || []).unshift(func);

                    // Otherwise append
                  } else {
                    (structure[dataType] = structure[dataType] || []).push(func);
                  }
                }
              }
            };
          }

          // Base inspection function for prefilters and transports
          function inspectPrefiltersOrTransports(
            structure,
            options,
            originalOptions,
            jqXHR
          ) {
            var inspected = {};

            var seekingTransport = structure === transports;

            function inspect(dataType) {
              var selected;
              inspected[dataType] = true;
              jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(
                  options,
                  originalOptions,
                  jqXHR
                );
                if (
                  typeof dataTypeOrTransport === 'string' &&
                  !seekingTransport &&
                  !inspected[dataTypeOrTransport]
                ) {
                  options.dataTypes.unshift(dataTypeOrTransport);
                  inspect(dataTypeOrTransport);
                  return false;
                } else if (seekingTransport) {
                  return !(selected = dataTypeOrTransport);
                }
              });
              return selected;
            }

            return inspect(options.dataTypes[0]) || (!inspected['*'] && inspect('*'));
          }

          // A special extend for ajax options
          // that takes "flat" options (not to be deep extended)
          // Fixes #9887
          function ajaxExtend(target, src) {
            var key;

            var deep;

            var flatOptions = jQuery.ajaxSettings.flatOptions || {};

            for (key in src) {
              if (src[key] !== undefined) {
                (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
              }
            }
            if (deep) {
              jQuery.extend(true, target, deep);
            }

            return target;
          }

          /* Handles responses to an ajax request:
           * - finds the right dataType (mediates between content-type and expected dataType)
           * - returns the corresponding response
           */
          function ajaxHandleResponses(s, jqXHR, responses) {
            var ct;

            var type;

            var finalDataType;

            var firstDataType;

            var contents = s.contents;

            var dataTypes = s.dataTypes;

            // Remove auto dataType and get content-type in the process
            while (dataTypes[0] === '*') {
              dataTypes.shift();
              if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader('Content-Type');
              }
            }

            // Check if we're dealing with a known content-type
            if (ct) {
              for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                  dataTypes.unshift(type);
                  break;
                }
              }
            }

            // Check to see if we have a response for the expected dataType
            if (dataTypes[0] in responses) {
              finalDataType = dataTypes[0];
            } else {
              // Try convertible dataTypes
              for (type in responses) {
                if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
                  finalDataType = type;
                  break;
                }
                if (!firstDataType) {
                  firstDataType = type;
                }
              }

              // Or just use first one
              finalDataType = finalDataType || firstDataType;
            }

            // If we found a dataType
            // We add the dataType to the list if needed
            // and return the corresponding response
            if (finalDataType) {
              if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
              }
              return responses[finalDataType];
            }
          }

          /* Chain conversions given the request and the original response
           * Also sets the responseXXX fields on the jqXHR instance
           */
          function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2;

            var current;

            var conv;

            var tmp;

            var prev;

            var converters = {};

            // Work with a copy of dataTypes in case we need to modify it for conversion

            var dataTypes = s.dataTypes.slice();

            // Create converters map with lowercased keys
            if (dataTypes[1]) {
              for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
              }
            }

            current = dataTypes.shift();

            // Convert to each sequential dataType
            while (current) {
              if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
              }

              // Apply the dataFilter if provided
              if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
              }

              prev = current;
              current = dataTypes.shift();

              if (current) {
                // There's only work to do if current dataType is non-auto
                if (current === '*') {
                  current = prev;

                  // Convert response if prev dataType is non-auto and differs from current
                } else if (prev !== '*' && prev !== current) {
                  // Seek a direct converter
                  conv = converters[prev + ' ' + current] || converters['* ' + current];

                  // If none found, seek a pair
                  if (!conv) {
                    for (conv2 in converters) {
                      // If conv2 outputs current
                      tmp = conv2.split(' ');
                      if (tmp[1] === current) {
                        // If prev can be converted to accepted input
                        conv =
                          converters[prev + ' ' + tmp[0]] || converters['* ' + tmp[0]];
                        if (conv) {
                          // Condense equivalence converters
                          if (conv === true) {
                            conv = converters[conv2];

                            // Otherwise, insert the intermediate dataType
                          } else if (converters[conv2] !== true) {
                            current = tmp[0];
                            dataTypes.unshift(tmp[1]);
                          }
                          break;
                        }
                      }
                    }
                  }

                  // Apply converter (if not an equivalence)
                  if (conv !== true) {
                    // Unless errors are allowed to bubble, catch and return them
                    if (conv && s.throws) {
                      response = conv(response);
                    } else {
                      try {
                        response = conv(response);
                      } catch (e) {
                        return {
                          state: 'parsererror',
                          error: conv
                            ? e
                            : 'No conversion from ' + prev + ' to ' + current
                        };
                      }
                    }
                  }
                }
              }
            }

            return { state: 'success', data: response };
          }

          jQuery.extend({
            // Counter for holding the number of active queries
            active: 0,

            // Last-Modified header cache for next request
            lastModified: {},
            etag: {},

            ajaxSettings: {
              url: location.href,
              type: 'GET',
              isLocal: rlocalProtocol.test(location.protocol),
              global: true,
              processData: true,
              async: true,
              contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

              /*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

              accepts: {
                '*': allTypes,
                text: 'text/plain',
                html: 'text/html',
                xml: 'application/xml, text/xml',
                json: 'application/json, text/javascript'
              },

              contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
              },

              responseFields: {
                xml: 'responseXML',
                text: 'responseText',
                json: 'responseJSON'
              },

              // Data converters
              // Keys separate source (or catchall "*") and destination types with a single space
              converters: {
                // Convert anything to text
                '* text': String,

                // Text to html (true = no transformation)
                'text html': true,

                // Evaluate text as a json expression
                'text json': JSON.parse,

                // Parse text as xml
                'text xml': jQuery.parseXML
              },

              // For options that shouldn't be deep extended:
              // you can add your own custom options here if
              // and when you create one that shouldn't be
              // deep extended (see ajaxExtend)
              flatOptions: {
                url: true,
                context: true
              }
            },

            // Creates a full fledged settings object into target
            // with both ajaxSettings and settings fields.
            // If target is omitted, writes into ajaxSettings.
            ajaxSetup: function(target, settings) {
              return settings
                ? // Building a settings object
                  ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)
                : // Extending ajaxSettings
                  ajaxExtend(jQuery.ajaxSettings, target);
            },

            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),

            // Main method
            ajax: function(url, options) {
              // If url is an object, simulate pre-1.5 signature
              if (typeof url === 'object') {
                options = url;
                url = undefined;
              }

              // Force options to be an object
              options = options || {};

              var transport;

              // URL without anti-cache param

              var cacheURL;

              // Response headers

              var responseHeadersString;

              var responseHeaders;

              // timeout handle

              var timeoutTimer;

              // Url cleanup var

              var urlAnchor;

              // Request state (becomes false upon send and true upon completion)

              var completed;

              // To know if global events are to be dispatched

              var fireGlobals;

              // Loop variable

              var i;

              // uncached part of the url

              var uncached;

              // Create the final options object

              var s = jQuery.ajaxSetup({}, options);

              // Callbacks context

              var callbackContext = s.context || s;

              // Context for global events is callbackContext if it is a DOM node or jQuery collection

              var globalEventContext =
                s.context && (callbackContext.nodeType || callbackContext.jquery)
                  ? jQuery(callbackContext)
                  : jQuery.event;

              // Deferreds

              var deferred = jQuery.Deferred();

              var completeDeferred = jQuery.Callbacks('once memory');

              // Status-dependent callbacks

              var statusCode = s.statusCode || {};

              // Headers (they are sent all at once)

              var requestHeaders = {};

              var requestHeadersNames = {};

              // Default abort message

              var strAbort = 'canceled';

              // Fake xhr

              var jqXHR = {
                readyState: 0,

                // Builds headers hashtable if needed
                getResponseHeader: function(key) {
                  var match;
                  if (completed) {
                    if (!responseHeaders) {
                      responseHeaders = {};
                      while ((match = rheaders.exec(responseHeadersString))) {
                        responseHeaders[match[1].toLowerCase() + ' '] = (
                          responseHeaders[match[1].toLowerCase() + ' '] || []
                        ).concat(match[2]);
                      }
                    }
                    match = responseHeaders[key.toLowerCase() + ' '];
                  }
                  return match == null ? null : match.join(', ');
                },

                // Raw string
                getAllResponseHeaders: function() {
                  return completed ? responseHeadersString : null;
                },

                // Caches the header
                setRequestHeader: function(name, value) {
                  if (completed == null) {
                    name = requestHeadersNames[name.toLowerCase()] =
                      requestHeadersNames[name.toLowerCase()] || name;
                    requestHeaders[name] = value;
                  }
                  return this;
                },

                // Overrides response content-type header
                overrideMimeType: function(type) {
                  if (completed == null) {
                    s.mimeType = type;
                  }
                  return this;
                },

                // Status-dependent callbacks
                statusCode: function(map) {
                  var code;
                  if (map) {
                    if (completed) {
                      // Execute the appropriate callbacks
                      jqXHR.always(map[jqXHR.status]);
                    } else {
                      // Lazy-add the new callbacks in a way that preserves old ones
                      for (code in map) {
                        statusCode[code] = [statusCode[code], map[code]];
                      }
                    }
                  }
                  return this;
                },

                // Cancel the request
                abort: function(statusText) {
                  var finalText = statusText || strAbort;
                  if (transport) {
                    transport.abort(finalText);
                  }
                  done(0, finalText);
                  return this;
                }
              };

              // Attach deferreds
              deferred.promise(jqXHR);

              // Add protocol if not provided (prefilters might expect it)
              // Handle falsy url in the settings object (#10093: consistency with old signature)
              // We also use the url parameter if available
              s.url = ((url || s.url || location.href) + '').replace(
                rprotocol,
                location.protocol + '//'
              );

              // Alias method option to type as per ticket #12004
              s.type = options.method || options.type || s.method || s.type;

              // Extract dataTypes list
              s.dataTypes = (s.dataType || '*').toLowerCase().match(rnothtmlwhite) || [
                ''
              ];

              // A cross-domain request is in order when the origin doesn't match the current origin.
              if (s.crossDomain == null) {
                urlAnchor = document.createElement('a');

                // Support: IE <=8 - 11, Edge 12 - 15
                // IE throws exception on accessing the href property if url is malformed,
                // e.g. http://example.com:80x/
                try {
                  urlAnchor.href = s.url;

                  // Support: IE <=8 - 11 only
                  // Anchor's host property isn't correctly set when s.url is relative
                  urlAnchor.href = urlAnchor.href;
                  s.crossDomain =
                    originAnchor.protocol + '//' + originAnchor.host !==
                    urlAnchor.protocol + '//' + urlAnchor.host;
                } catch (e) {
                  // If there is an error parsing the URL, assume it is crossDomain,
                  // it can be rejected by the transport if it is invalid
                  s.crossDomain = true;
                }
              }

              // Convert data if not already a string
              if (s.data && s.processData && typeof s.data !== 'string') {
                s.data = jQuery.param(s.data, s.traditional);
              }

              // Apply prefilters
              inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

              // If request was aborted inside a prefilter, stop there
              if (completed) {
                return jqXHR;
              }

              // We can fire global events as of now if asked to
              // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
              fireGlobals = jQuery.event && s.global;

              // Watch for a new set of requests
              if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger('ajaxStart');
              }

              // Uppercase the type
              s.type = s.type.toUpperCase();

              // Determine if request has content
              s.hasContent = !rnoContent.test(s.type);

              // Save the URL in case we're toying with the If-Modified-Since
              // and/or If-None-Match header later on
              // Remove hash to simplify url manipulation
              cacheURL = s.url.replace(rhash, '');

              // More options handling for requests with no content
              if (!s.hasContent) {
                // Remember the hash so we can put it back
                uncached = s.url.slice(cacheURL.length);

                // If data is available and should be processed, append data to url
                if (s.data && (s.processData || typeof s.data === 'string')) {
                  cacheURL += (rquery.test(cacheURL) ? '&' : '?') + s.data;

                  // #9682: remove data so that it's not used in an eventual retry
                  delete s.data;
                }

                // Add or update anti-cache param if needed
                if (s.cache === false) {
                  cacheURL = cacheURL.replace(rantiCache, '$1');
                  uncached =
                    (rquery.test(cacheURL) ? '&' : '?') + '_=' + nonce++ + uncached;
                }

                // Put hash and anti-cache on the URL that will be requested (gh-1732)
                s.url = cacheURL + uncached;

                // Change '%20' to '+' if this is encoded form body content (gh-2658)
              } else if (
                s.data &&
                s.processData &&
                (s.contentType || '').indexOf('application/x-www-form-urlencoded') === 0
              ) {
                s.data = s.data.replace(r20, '+');
              }

              // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
              if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                  jqXHR.setRequestHeader(
                    'If-Modified-Since',
                    jQuery.lastModified[cacheURL]
                  );
                }
                if (jQuery.etag[cacheURL]) {
                  jqXHR.setRequestHeader('If-None-Match', jQuery.etag[cacheURL]);
                }
              }

              // Set the correct header, if data is being sent
              if (
                (s.data && s.hasContent && s.contentType !== false) ||
                options.contentType
              ) {
                jqXHR.setRequestHeader('Content-Type', s.contentType);
              }

              // Set the Accepts header for the server, depending on the dataType
              jqXHR.setRequestHeader(
                'Accept',
                s.dataTypes[0] && s.accepts[s.dataTypes[0]]
                  ? s.accepts[s.dataTypes[0]] +
                      (s.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '')
                  : s.accepts['*']
              );

              // Check for headers option
              for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
              }

              // Allow custom headers/mimetypes and early abort
              if (
                s.beforeSend &&
                (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)
              ) {
                // Abort if not done already and return
                return jqXHR.abort();
              }

              // Aborting is no longer a cancellation
              strAbort = 'abort';

              // Install callbacks on deferreds
              completeDeferred.add(s.complete);
              jqXHR.done(s.success);
              jqXHR.fail(s.error);

              // Get transport
              transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

              // If no transport, we auto-abort
              if (!transport) {
                done(-1, 'No Transport');
              } else {
                jqXHR.readyState = 1;

                // Send global event
                if (fireGlobals) {
                  globalEventContext.trigger('ajaxSend', [jqXHR, s]);
                }

                // If request was aborted inside ajaxSend, stop there
                if (completed) {
                  return jqXHR;
                }

                // Timeout
                if (s.async && s.timeout > 0) {
                  timeoutTimer = window.setTimeout(function() {
                    jqXHR.abort('timeout');
                  }, s.timeout);
                }

                try {
                  completed = false;
                  transport.send(requestHeaders, done);
                } catch (e) {
                  // Rethrow post-completion exceptions
                  if (completed) {
                    throw e;
                  }

                  // Propagate others as results
                  done(-1, e);
                }
              }

              // Callback for when everything is done
              function done(status, nativeStatusText, responses, headers) {
                var isSuccess;

                var success;

                var error;

                var response;

                var modified;

                var statusText = nativeStatusText;

                // Ignore repeat invocations
                if (completed) {
                  return;
                }

                completed = true;

                // Clear timeout if it exists
                if (timeoutTimer) {
                  window.clearTimeout(timeoutTimer);
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || '';

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = (status >= 200 && status < 300) || status === 304;

                // Get response data
                if (responses) {
                  response = ajaxHandleResponses(s, jqXHR, responses);
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert(s, response, jqXHR, isSuccess);

                // If successful, handle type chaining
                if (isSuccess) {
                  // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                  if (s.ifModified) {
                    modified = jqXHR.getResponseHeader('Last-Modified');
                    if (modified) {
                      jQuery.lastModified[cacheURL] = modified;
                    }
                    modified = jqXHR.getResponseHeader('etag');
                    if (modified) {
                      jQuery.etag[cacheURL] = modified;
                    }
                  }

                  // if no content
                  if (status === 204 || s.type === 'HEAD') {
                    statusText = 'nocontent';

                    // if not modified
                  } else if (status === 304) {
                    statusText = 'notmodified';

                    // If we have data, let's convert it
                  } else {
                    statusText = response.state;
                    success = response.data;
                    error = response.error;
                    isSuccess = !error;
                  }
                } else {
                  // Extract error from statusText and normalize for non-aborts
                  error = statusText;
                  if (status || !statusText) {
                    statusText = 'error';
                    if (status < 0) {
                      status = 0;
                    }
                  }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + '';

                // Success/Error
                if (isSuccess) {
                  deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                  deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }

                // Status-dependent callbacks
                jqXHR.statusCode(statusCode);
                statusCode = undefined;

                if (fireGlobals) {
                  globalEventContext.trigger(isSuccess ? 'ajaxSuccess' : 'ajaxError', [
                    jqXHR,
                    s,
                    isSuccess ? success : error
                  ]);
                }

                // Complete
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

                if (fireGlobals) {
                  globalEventContext.trigger('ajaxComplete', [jqXHR, s]);

                  // Handle the global AJAX counter
                  if (!--jQuery.active) {
                    jQuery.event.trigger('ajaxStop');
                  }
                }
              }

              return jqXHR;
            },

            getJSON: function(url, data, callback) {
              return jQuery.get(url, data, callback, 'json');
            },

            getScript: function(url, callback) {
              return jQuery.get(url, undefined, callback, 'script');
            }
          });

          jQuery.each(['get', 'post'], function(i, method) {
            jQuery[method] = function(url, data, callback, type) {
              // Shift arguments if data argument was omitted
              if (isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
              }

              // The url can be an options object (which then must have .url)
              return jQuery.ajax(
                jQuery.extend(
                  {
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                  },
                  jQuery.isPlainObject(url) && url
                )
              );
            };
          });

          jQuery._evalUrl = function(url, options) {
            return jQuery.ajax({
              url: url,

              // Make this explicit, since user can override this through ajaxSetup (#11264)
              type: 'GET',
              dataType: 'script',
              cache: true,
              async: false,
              global: false,

              // Only evaluate the response if it is successful (gh-4126)
              // dataFilter is not invoked for failure responses, so using it instead
              // of the default converter is kludgy but it works.
              converters: {
                'text script': function() {}
              },
              dataFilter: function(response) {
                jQuery.globalEval(response, options);
              }
            });
          };

          jQuery.fn.extend({
            wrapAll: function(html) {
              var wrap;

              if (this[0]) {
                if (isFunction(html)) {
                  html = html.call(this[0]);
                }

                // The elements to wrap the target around
                wrap = jQuery(html, this[0].ownerDocument)
                  .eq(0)
                  .clone(true);

                if (this[0].parentNode) {
                  wrap.insertBefore(this[0]);
                }

                wrap
                  .map(function() {
                    var elem = this;

                    while (elem.firstElementChild) {
                      elem = elem.firstElementChild;
                    }

                    return elem;
                  })
                  .append(this);
              }

              return this;
            },

            wrapInner: function(html) {
              if (isFunction(html)) {
                return this.each(function(i) {
                  jQuery(this).wrapInner(html.call(this, i));
                });
              }

              return this.each(function() {
                var self = jQuery(this);

                var contents = self.contents();

                if (contents.length) {
                  contents.wrapAll(html);
                } else {
                  self.append(html);
                }
              });
            },

            wrap: function(html) {
              var htmlIsFunction = isFunction(html);

              return this.each(function(i) {
                jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
              });
            },

            unwrap: function(selector) {
              this.parent(selector)
                .not('body')
                .each(function() {
                  jQuery(this).replaceWith(this.childNodes);
                });
              return this;
            }
          });

          jQuery.expr.pseudos.hidden = function(elem) {
            return !jQuery.expr.pseudos.visible(elem);
          };
          jQuery.expr.pseudos.visible = function(elem) {
            return !!(
              elem.offsetWidth ||
              elem.offsetHeight ||
              elem.getClientRects().length
            );
          };

          jQuery.ajaxSettings.xhr = function() {
            try {
              return new window.XMLHttpRequest();
            } catch (e) {}
          };

          var xhrSuccessStatus = {
            // File protocol always yields status code 0, assume 200
            0: 200,

            // Support: IE <=9 only
            // #1450: sometimes IE returns 1223 when it should be 204
            1223: 204
          };

          var xhrSupported = jQuery.ajaxSettings.xhr();

          support.cors = !!xhrSupported && 'withCredentials' in xhrSupported;
          support.ajax = xhrSupported = !!xhrSupported;

          jQuery.ajaxTransport(function(options) {
            var callback, errorCallback;

            // Cross domain only allowed if supported through XMLHttpRequest
            if (support.cors || (xhrSupported && !options.crossDomain)) {
              return {
                send: function(headers, complete) {
                  var i;

                  var xhr = options.xhr();

                  xhr.open(
                    options.type,
                    options.url,
                    options.async,
                    options.username,
                    options.password
                  );

                  // Apply custom fields if provided
                  if (options.xhrFields) {
                    for (i in options.xhrFields) {
                      xhr[i] = options.xhrFields[i];
                    }
                  }

                  // Override mime type if needed
                  if (options.mimeType && xhr.overrideMimeType) {
                    xhr.overrideMimeType(options.mimeType);
                  }

                  // X-Requested-With header
                  // For cross-domain requests, seeing as conditions for a preflight are
                  // akin to a jigsaw puzzle, we simply never set it to be sure.
                  // (it can always be set on a per-request basis or even using ajaxSetup)
                  // For same-domain requests, won't change header if already provided.
                  if (!options.crossDomain && !headers['X-Requested-With']) {
                    headers['X-Requested-With'] = 'XMLHttpRequest';
                  }

                  // Set headers
                  for (i in headers) {
                    xhr.setRequestHeader(i, headers[i]);
                  }

                  // Callback
                  callback = function(type) {
                    return function() {
                      if (callback) {
                        callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;

                        if (type === 'abort') {
                          xhr.abort();
                        } else if (type === 'error') {
                          // Support: IE <=9 only
                          // On a manual native abort, IE9 throws
                          // errors on any property access that is not readyState
                          if (typeof xhr.status !== 'number') {
                            complete(0, 'error');
                          } else {
                            complete(
                              // File: protocol always yields status 0; see #8605, #14207
                              xhr.status,
                              xhr.statusText
                            );
                          }
                        } else {
                          complete(
                            xhrSuccessStatus[xhr.status] || xhr.status,
                            xhr.statusText,

                            // Support: IE <=9 only
                            // IE9 has no XHR2 but throws on binary (trac-11426)
                            // For XHR2 non-text, let the caller handle it (gh-2498)
                            (xhr.responseType || 'text') !== 'text' ||
                              typeof xhr.responseText !== 'string'
                              ? { binary: xhr.response }
                              : { text: xhr.responseText },
                            xhr.getAllResponseHeaders()
                          );
                        }
                      }
                    };
                  };

                  // Listen to events
                  xhr.onload = callback();
                  errorCallback = xhr.onerror = xhr.ontimeout = callback('error');

                  // Support: IE 9 only
                  // Use onreadystatechange to replace onabort
                  // to handle uncaught aborts
                  if (xhr.onabort !== undefined) {
                    xhr.onabort = errorCallback;
                  } else {
                    xhr.onreadystatechange = function() {
                      // Check readyState before timeout as it changes
                      if (xhr.readyState === 4) {
                        // Allow onerror to be called first,
                        // but that will not handle a native abort
                        // Also, save errorCallback to a variable
                        // as xhr.onerror cannot be accessed
                        window.setTimeout(function() {
                          if (callback) {
                            errorCallback();
                          }
                        });
                      }
                    };
                  }

                  // Create the abort callback
                  callback = callback('abort');

                  try {
                    // Do send the request (this may raise an exception)
                    xhr.send((options.hasContent && options.data) || null);
                  } catch (e) {
                    // #14683: Only rethrow if this hasn't been notified as an error yet
                    if (callback) {
                      throw e;
                    }
                  }
                },

                abort: function() {
                  if (callback) {
                    callback();
                  }
                }
              };
            }
          });

          // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
          jQuery.ajaxPrefilter(function(s) {
            if (s.crossDomain) {
              s.contents.script = false;
            }
          });

          // Install script dataType
          jQuery.ajaxSetup({
            accepts: {
              script:
                'text/javascript, application/javascript, ' +
                'application/ecmascript, application/x-ecmascript'
            },
            contents: {
              script: /\b(?:java|ecma)script\b/
            },
            converters: {
              'text script': function(text) {
                jQuery.globalEval(text);
                return text;
              }
            }
          });

          // Handle cache's special case and crossDomain
          jQuery.ajaxPrefilter('script', function(s) {
            if (s.cache === undefined) {
              s.cache = false;
            }
            if (s.crossDomain) {
              s.type = 'GET';
            }
          });

          // Bind script tag hack transport
          jQuery.ajaxTransport('script', function(s) {
            // This transport only deals with cross domain or forced-by-attrs requests
            if (s.crossDomain || s.scriptAttrs) {
              var script, callback;
              return {
                send: function(_, complete) {
                  script = jQuery('<script>')
                    .attr(s.scriptAttrs || {})
                    .prop({ charset: s.scriptCharset, src: s.url })
                    .on(
                      'load error',
                      (callback = function(evt) {
                        script.remove();
                        callback = null;
                        if (evt) {
                          complete(evt.type === 'error' ? 404 : 200, evt.type);
                        }
                      })
                    );

                  // Use native DOM manipulation to avoid our domManip AJAX trickery
                  document.head.appendChild(script[0]);
                },
                abort: function() {
                  if (callback) {
                    callback();
                  }
                }
              };
            }
          });

          var oldCallbacks = [];

          var rjsonp = /(=)\?(?=&|$)|\?\?/;

          // Default jsonp settings
          jQuery.ajaxSetup({
            jsonp: 'callback',
            jsonpCallback: function() {
              var callback = oldCallbacks.pop() || jQuery.expando + '_' + nonce++;
              this[callback] = true;
              return callback;
            }
          });

          // Detect, normalize options and install callbacks for jsonp requests
          jQuery.ajaxPrefilter('json jsonp', function(s, originalSettings, jqXHR) {
            var callbackName;

            var overwritten;

            var responseContainer;

            var jsonProp =
              s.jsonp !== false &&
              (rjsonp.test(s.url)
                ? 'url'
                : typeof s.data === 'string' &&
                  (s.contentType || '').indexOf('application/x-www-form-urlencoded') ===
                    0 &&
                  rjsonp.test(s.data) &&
                  'data');

            // Handle iff the expected data type is "jsonp" or we have a parameter to set
            if (jsonProp || s.dataTypes[0] === 'jsonp') {
              // Get callback name, remembering preexisting value associated with it
              callbackName = s.jsonpCallback = isFunction(s.jsonpCallback)
                ? s.jsonpCallback()
                : s.jsonpCallback;

              // Insert callback into url or form data
              if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, '$1' + callbackName);
              } else if (s.jsonp !== false) {
                s.url +=
                  (rquery.test(s.url) ? '&' : '?') + s.jsonp + '=' + callbackName;
              }

              // Use data converter to retrieve json after script execution
              s.converters['script json'] = function() {
                if (!responseContainer) {
                  jQuery.error(callbackName + ' was not called');
                }
                return responseContainer[0];
              };

              // Force json dataType
              s.dataTypes[0] = 'json';

              // Install callback
              overwritten = window[callbackName];
              window[callbackName] = function() {
                responseContainer = arguments;
              };

              // Clean-up function (fires after converters)
              jqXHR.always(function() {
                // If previous value didn't exist - remove it
                if (overwritten === undefined) {
                  jQuery(window).removeProp(callbackName);

                  // Otherwise restore preexisting value
                } else {
                  window[callbackName] = overwritten;
                }

                // Save back as free
                if (s[callbackName]) {
                  // Make sure that re-using the options doesn't screw things around
                  s.jsonpCallback = originalSettings.jsonpCallback;

                  // Save the callback name for future use
                  oldCallbacks.push(callbackName);
                }

                // Call if it was a function and we have a response
                if (responseContainer && isFunction(overwritten)) {
                  overwritten(responseContainer[0]);
                }

                responseContainer = overwritten = undefined;
              });

              // Delegate to script
              return 'script';
            }
          });

          // Support: Safari 8 only
          // In Safari 8 documents created via document.implementation.createHTMLDocument
          // collapse sibling forms: the second one becomes a child of the first one.
          // Because of that, this security measure has to be disabled in Safari 8.
          // https://bugs.webkit.org/show_bug.cgi?id=137337
          support.createHTMLDocument = (function() {
            var body = document.implementation.createHTMLDocument('').body;
            body.innerHTML = '<form></form><form></form>';
            return body.childNodes.length === 2;
          })();

          // Argument "data" should be string of html
          // context (optional): If specified, the fragment will be created in this context,
          // defaults to document
          // keepScripts (optional): If true, will include scripts passed in the html string
          jQuery.parseHTML = function(data, context, keepScripts) {
            if (typeof data !== 'string') {
              return [];
            }
            if (typeof context === 'boolean') {
              keepScripts = context;
              context = false;
            }

            var base, parsed, scripts;

            if (!context) {
              // Stop scripts or inline event handlers from being executed immediately
              // by using document.implementation
              if (support.createHTMLDocument) {
                context = document.implementation.createHTMLDocument('');

                // Set the base href for the created document
                // so any parsed elements with URLs
                // are based on the document's URL (gh-2965)
                base = context.createElement('base');
                base.href = document.location.href;
                context.head.appendChild(base);
              } else {
                context = document;
              }
            }

            parsed = rsingleTag.exec(data);
            scripts = !keepScripts && [];

            // Single tag
            if (parsed) {
              return [context.createElement(parsed[1])];
            }

            parsed = buildFragment([data], context, scripts);

            if (scripts && scripts.length) {
              jQuery(scripts).remove();
            }

            return jQuery.merge([], parsed.childNodes);
          };

          /**
           * Load a url into a page
           */
          jQuery.fn.load = function(url, params, callback) {
            var selector;

            var type;

            var response;

            var self = this;

            var off = url.indexOf(' ');

            if (off > -1) {
              selector = stripAndCollapse(url.slice(off));
              url = url.slice(0, off);
            }

            // If it's a function
            if (isFunction(params)) {
              // We assume that it's the callback
              callback = params;
              params = undefined;

              // Otherwise, build a param string
            } else if (params && typeof params === 'object') {
              type = 'POST';
            }

            // If we have elements to modify, make the request
            if (self.length > 0) {
              jQuery
                .ajax({
                  url: url,

                  // If "type" variable is undefined, then "GET" method will be used.
                  // Make value of this field explicit since
                  // user can override it through ajaxSetup method
                  type: type || 'GET',
                  dataType: 'html',
                  data: params
                })
                .done(function(responseText) {
                  // Save response for use in complete callback
                  response = arguments;

                  self.html(
                    selector
                      ? // If a selector was specified, locate the right elements in a dummy div
                        // Exclude scripts to avoid IE 'Permission Denied' errors
                        jQuery('<div>')
                          .append(jQuery.parseHTML(responseText))
                          .find(selector)
                      : // Otherwise use the full result
                        responseText
                  );

                  // If the request succeeds, this function gets "data", "status", "jqXHR"
                  // but they are ignored because response was set above.
                  // If it fails, this function gets "jqXHR", "status", "error"
                })
                .always(
                  callback &&
                    function(jqXHR, status) {
                      self.each(function() {
                        callback.apply(
                          this,
                          response || [jqXHR.responseText, status, jqXHR]
                        );
                      });
                    }
                );
            }

            return this;
          };

          // Attach a bunch of functions for handling common AJAX events
          jQuery.each(
            [
              'ajaxStart',
              'ajaxStop',
              'ajaxComplete',
              'ajaxError',
              'ajaxSuccess',
              'ajaxSend'
            ],
            function(i, type) {
              jQuery.fn[type] = function(fn) {
                return this.on(type, fn);
              };
            }
          );

          jQuery.expr.pseudos.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
              return elem === fn.elem;
            }).length;
          };

          jQuery.offset = {
            setOffset: function(elem, options, i) {
              var curPosition;

              var curLeft;

              var curCSSTop;

              var curTop;

              var curOffset;

              var curCSSLeft;

              var calculatePosition;

              var position = jQuery.css(elem, 'position');

              var curElem = jQuery(elem);

              var props = {};

              // Set position first, in-case top/left are set even on static elem
              if (position === 'static') {
                elem.style.position = 'relative';
              }

              curOffset = curElem.offset();
              curCSSTop = jQuery.css(elem, 'top');
              curCSSLeft = jQuery.css(elem, 'left');
              calculatePosition =
                (position === 'absolute' || position === 'fixed') &&
                (curCSSTop + curCSSLeft).indexOf('auto') > -1;

              // Need to be able to calculate position if either
              // top or left is auto and position is either absolute or fixed
              if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
              } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
              }

              if (isFunction(options)) {
                // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                options = options.call(elem, i, jQuery.extend({}, curOffset));
              }

              if (options.top != null) {
                props.top = options.top - curOffset.top + curTop;
              }
              if (options.left != null) {
                props.left = options.left - curOffset.left + curLeft;
              }

              if ('using' in options) {
                options.using.call(elem, props);
              } else {
                curElem.css(props);
              }
            }
          };

          jQuery.fn.extend({
            // offset() relates an element's border box to the document origin
            offset: function(options) {
              // Preserve chaining for setter
              if (arguments.length) {
                return options === undefined
                  ? this
                  : this.each(function(i) {
                      jQuery.offset.setOffset(this, options, i);
                    });
              }

              var rect;

              var win;

              var elem = this[0];

              if (!elem) {
                return;
              }

              // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
              // Support: IE <=11 only
              // Running getBoundingClientRect on a
              // disconnected node in IE throws an error
              if (!elem.getClientRects().length) {
                return { top: 0, left: 0 };
              }

              // Get document-relative position by adding viewport scroll to viewport-relative gBCR
              rect = elem.getBoundingClientRect();
              win = elem.ownerDocument.defaultView;
              return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
              };
            },

            // position() relates an element's margin box to its offset parent's padding box
            // This corresponds to the behavior of CSS absolute positioning
            position: function() {
              if (!this[0]) {
                return;
              }

              var offsetParent;

              var offset;

              var doc;

              var elem = this[0];

              var parentOffset = { top: 0, left: 0 };

              // position:fixed elements are offset from the viewport, which itself always has zero offset
              if (jQuery.css(elem, 'position') === 'fixed') {
                // Assume position:fixed implies availability of getBoundingClientRect
                offset = elem.getBoundingClientRect();
              } else {
                offset = this.offset();

                // Account for the *real* offset parent, which can be the document or its root element
                // when a statically positioned element is identified
                doc = elem.ownerDocument;
                offsetParent = elem.offsetParent || doc.documentElement;
                while (
                  offsetParent &&
                  (offsetParent === doc.body || offsetParent === doc.documentElement) &&
                  jQuery.css(offsetParent, 'position') === 'static'
                ) {
                  offsetParent = offsetParent.parentNode;
                }
                if (
                  offsetParent &&
                  offsetParent !== elem &&
                  offsetParent.nodeType === 1
                ) {
                  // Incorporate borders into its offset, since they are outside its content origin
                  parentOffset = jQuery(offsetParent).offset();
                  parentOffset.top += jQuery.css(offsetParent, 'borderTopWidth', true);
                  parentOffset.left += jQuery.css(
                    offsetParent,
                    'borderLeftWidth',
                    true
                  );
                }
              }

              // Subtract parent offsets and element margins
              return {
                top:
                  offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', true),
                left:
                  offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', true)
              };
            },

            // This method will return documentElement in the following cases:
            // 1) For the element inside the iframe without offsetParent, this method will return
            //    documentElement of the parent window
            // 2) For the hidden or detached element
            // 3) For body or html element, i.e. in case of the html node - it will return itself
            //
            // but those exceptions were never presented as a real life use-cases
            // and might be considered as more preferable results.
            //
            // This logic, however, is not guaranteed and can change at any point in the future
            offsetParent: function() {
              return this.map(function() {
                var offsetParent = this.offsetParent;

                while (
                  offsetParent &&
                  jQuery.css(offsetParent, 'position') === 'static'
                ) {
                  offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || documentElement;
              });
            }
          });

          // Create scrollLeft and scrollTop methods
          jQuery.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function(
            method,
            prop
          ) {
            var top = prop === 'pageYOffset';

            jQuery.fn[method] = function(val) {
              return access(
                this,
                function(elem, method, val) {
                  // Coalesce documents and windows
                  var win;
                  if (isWindow(elem)) {
                    win = elem;
                  } else if (elem.nodeType === 9) {
                    win = elem.defaultView;
                  }

                  if (val === undefined) {
                    return win ? win[prop] : elem[method];
                  }

                  if (win) {
                    win.scrollTo(
                      !top ? val : win.pageXOffset,
                      top ? val : win.pageYOffset
                    );
                  } else {
                    elem[method] = val;
                  }
                },
                method,
                val,
                arguments.length
              );
            };
          });

          // Support: Safari <=7 - 9.1, Chrome <=37 - 49
          // Add the top/left cssHooks using jQuery.fn.position
          // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
          // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
          // getComputedStyle returns percent when specified for top/left/bottom/right;
          // rather than make the css module depend on the offset module, just check for it here
          jQuery.each(['top', 'left'], function(i, prop) {
            jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(
              elem,
              computed
            ) {
              if (computed) {
                computed = curCSS(elem, prop);

                // If curCSS returns percentage, fallback to offset
                return rnumnonpx.test(computed)
                  ? jQuery(elem).position()[prop] + 'px'
                  : computed;
              }
            });
          });

          // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
          jQuery.each({ Height: 'height', Width: 'width' }, function(name, type) {
            jQuery.each(
              { padding: 'inner' + name, content: type, '': 'outer' + name },
              function(defaultExtra, funcName) {
                // Margin is only for outerHeight, outerWidth
                jQuery.fn[funcName] = function(margin, value) {
                  var chainable =
                    arguments.length && (defaultExtra || typeof margin !== 'boolean');

                  var extra =
                    defaultExtra ||
                    (margin === true || value === true ? 'margin' : 'border');

                  return access(
                    this,
                    function(elem, type, value) {
                      var doc;

                      if (isWindow(elem)) {
                        // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                        return funcName.indexOf('outer') === 0
                          ? elem['inner' + name]
                          : elem.document.documentElement['client' + name];
                      }

                      // Get document width or height
                      if (elem.nodeType === 9) {
                        doc = elem.documentElement;

                        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                        // whichever is greatest
                        return Math.max(
                          elem.body['scroll' + name],
                          doc['scroll' + name],
                          elem.body['offset' + name],
                          doc['offset' + name],
                          doc['client' + name]
                        );
                      }

                      return value === undefined
                        ? // Get width or height on the element, requesting but not forcing parseFloat
                          jQuery.css(elem, type, extra)
                        : // Set width or height on the element
                          jQuery.style(elem, type, value, extra);
                    },
                    type,
                    chainable ? margin : undefined,
                    chainable
                  );
                };
              }
            );
          });

          jQuery.each(
            (
              'blur focus focusin focusout resize scroll click dblclick ' +
              'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
              'change select submit keydown keypress keyup contextmenu'
            ).split(' '),
            function(i, name) {
              // Handle event binding
              jQuery.fn[name] = function(data, fn) {
                return arguments.length > 0
                  ? this.on(name, null, data, fn)
                  : this.trigger(name);
              };
            }
          );

          jQuery.fn.extend({
            hover: function(fnOver, fnOut) {
              return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
            }
          });

          jQuery.fn.extend({
            bind: function(types, data, fn) {
              return this.on(types, null, data, fn);
            },
            unbind: function(types, fn) {
              return this.off(types, null, fn);
            },

            delegate: function(selector, types, data, fn) {
              return this.on(types, selector, data, fn);
            },
            undelegate: function(selector, types, fn) {
              // ( namespace ) or ( selector, types [, fn] )
              return arguments.length === 1
                ? this.off(selector, '**')
                : this.off(types, selector || '**', fn);
            }
          });

          // Bind a function to a context, optionally partially applying any
          // arguments.
          // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
          // However, it is not slated for removal any time soon
          jQuery.proxy = function(fn, context) {
            var tmp, args, proxy;

            if (typeof context === 'string') {
              tmp = fn[context];
              context = fn;
              fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if (!isFunction(fn)) {
              return undefined;
            }

            // Simulated bind
            args = slice.call(arguments, 2);
            proxy = function() {
              return fn.apply(context || this, args.concat(slice.call(arguments)));
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
          };

          jQuery.holdReady = function(hold) {
            if (hold) {
              jQuery.readyWait++;
            } else {
              jQuery.ready(true);
            }
          };
          jQuery.isArray = Array.isArray;
          jQuery.parseJSON = JSON.parse;
          jQuery.nodeName = nodeName;
          jQuery.isFunction = isFunction;
          jQuery.isWindow = isWindow;
          jQuery.camelCase = camelCase;
          jQuery.type = toType;

          jQuery.now = Date.now;

          jQuery.isNumeric = function(obj) {
            // As of jQuery 3.0, isNumeric is limited to
            // strings and numbers (primitives or objects)
            // that can be coerced to finite numbers (gh-2662)
            var type = jQuery.type(obj);
            return (
              (type === 'number' || type === 'string') &&
              // parseFloat NaNs numeric-cast false positives ("")
              // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
              // subtraction forces infinities to NaN
              !isNaN(obj - parseFloat(obj))
            );
          };

          // Register as a named AMD module, since jQuery can be concatenated with other
          // files that may use define, but not via a proper concatenation script that
          // understands anonymous AMD modules. A named AMD is safest and most robust
          // way to register. Lowercase jquery is used because AMD module names are
          // derived from file names, and jQuery is normally delivered in a lowercase
          // file name. Do this after creating the global so that if an AMD module wants
          // to call noConflict to hide this version of jQuery, it will work.

          // Note that for maximum portability, libraries that are not jQuery should
          // declare themselves as anonymous modules, and avoid setting a global if an
          // AMD loader is present. jQuery is a special case. For more information, see
          // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

          if (typeof define === 'function' && define.amd) {
            define('jquery', [], function() {
              return jQuery;
            });
          }

          var // Map over jQuery in case of overwrite
            _jQuery = window.jQuery;

          // Map over the $ in case of overwrite

          var _$ = window.$;

          jQuery.noConflict = function(deep) {
            if (window.$ === jQuery) {
              window.$ = _$;
            }

            if (deep && window.jQuery === jQuery) {
              window.jQuery = _jQuery;
            }

            return jQuery;
          };

          // Expose jQuery and $ identifiers, even in AMD
          // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
          // and CommonJS for browser emulators (#13566)
          if (!noGlobal) {
            window.jQuery = window.$ = jQuery;
          }

          return jQuery;
        });
      },
      { process: '../../node_modules/process/browser.js' }
    ],
    '../../node_modules/popper.js/dist/esm/popper.js': [
      function(require, module, exports) {
        var global = arguments[3];
        ('use strict');

        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;

        /** !
         * @fileOverview Kickass library to create and place poppers near their reference elements.
         * @version 1.14.6
         * @license
         * Copyright (c) 2016 Federico Zivolo and contributors
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in all
         * copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
         * SOFTWARE.
         */
        var isBrowser =
          typeof window !== 'undefined' && typeof document !== 'undefined';
        var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
        var timeoutDuration = 0;

        for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
          if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
            timeoutDuration = 1;
            break;
          }
        }

        function microtaskDebounce(fn) {
          var called = false;
          return function() {
            if (called) {
              return;
            }

            called = true;
            window.Promise.resolve().then(function() {
              called = false;
              fn();
            });
          };
        }

        function taskDebounce(fn) {
          var scheduled = false;
          return function() {
            if (!scheduled) {
              scheduled = true;
              setTimeout(function() {
                scheduled = false;
                fn();
              }, timeoutDuration);
            }
          };
        }

        var supportsMicroTasks = isBrowser && window.Promise;
        /**
         * Create a debounced version of a method, that's asynchronously deferred
         * but called in the minimum time possible.
         *
         * @method
         * @memberof Popper.Utils
         * @argument {Function} fn
         * @returns {Function}
         */

        var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
        /**
         * Check if the given variable is a function
         * @method
         * @memberof Popper.Utils
         * @argument {Any} functionToCheck - variable to check
         * @returns {Boolean} answer to: is a function?
         */

        function isFunction(functionToCheck) {
          var getType = {};
          return (
            functionToCheck &&
            getType.toString.call(functionToCheck) === '[object Function]'
          );
        }
        /**
         * Get CSS computed property of the given element
         * @method
         * @memberof Popper.Utils
         * @argument {Eement} element
         * @argument {String} property
         */

        function getStyleComputedProperty(element, property) {
          if (element.nodeType !== 1) {
            return [];
          } // NOTE: 1 DOM access here

          var window = element.ownerDocument.defaultView;
          var css = window.getComputedStyle(element, null);
          return property ? css[property] : css;
        }
        /**
         * Returns the parentNode or the host of the element
         * @method
         * @memberof Popper.Utils
         * @argument {Element} element
         * @returns {Element} parent
         */

        function getParentNode(element) {
          if (element.nodeName === 'HTML') {
            return element;
          }

          return element.parentNode || element.host;
        }
        /**
         * Returns the scrolling parent of the given element
         * @method
         * @memberof Popper.Utils
         * @argument {Element} element
         * @returns {Element} scroll parent
         */

        function getScrollParent(element) {
          // Return body, `getScroll` will take care to get the correct `scrollTop` from it
          if (!element) {
            return document.body;
          }

          switch (element.nodeName) {
            case 'HTML':
            case 'BODY':
              return element.ownerDocument.body;

            case '#document':
              return element.body;
          } // Firefox want us to check `-x` and `-y` variations as well

          var _getStyleComputedProp = getStyleComputedProperty(element);

          var overflow = _getStyleComputedProp.overflow;

          var overflowX = _getStyleComputedProp.overflowX;

          var overflowY = _getStyleComputedProp.overflowY;

          if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
            return element;
          }

          return getScrollParent(getParentNode(element));
        }

        var isIE11 =
          isBrowser && !!(window.MSInputMethodContext && document.documentMode);
        var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
        /**
         * Determines if the browser is Internet Explorer
         * @method
         * @memberof Popper.Utils
         * @param {Number} version to check
         * @returns {Boolean} isIE
         */

        function isIE(version) {
          if (version === 11) {
            return isIE11;
          }

          if (version === 10) {
            return isIE10;
          }

          return isIE11 || isIE10;
        }
        /**
         * Returns the offset parent of the given element
         * @method
         * @memberof Popper.Utils
         * @argument {Element} element
         * @returns {Element} offset parent
         */

        function getOffsetParent(element) {
          if (!element) {
            return document.documentElement;
          }

          var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

          var offsetParent = element.offsetParent || null; // Skip hidden elements which don't have an offsetParent

          while (offsetParent === noOffsetParent && element.nextElementSibling) {
            offsetParent = (element = element.nextElementSibling).offsetParent;
          }

          var nodeName = offsetParent && offsetParent.nodeName;

          if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
            return element
              ? element.ownerDocument.documentElement
              : document.documentElement;
          } // .offsetParent will return the closest TH, TD or TABLE in case
          // no offsetParent is present, I hate this job...

          if (
            ['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 &&
            getStyleComputedProperty(offsetParent, 'position') === 'static'
          ) {
            return getOffsetParent(offsetParent);
          }

          return offsetParent;
        }

        function isOffsetContainer(element) {
          var nodeName = element.nodeName;

          if (nodeName === 'BODY') {
            return false;
          }

          return (
            nodeName === 'HTML' ||
            getOffsetParent(element.firstElementChild) === element
          );
        }
        /**
         * Finds the root node (document, shadowDOM root) of the given element
         * @method
         * @memberof Popper.Utils
         * @argument {Element} node
         * @returns {Element} root node
         */

        function getRoot(node) {
          if (node.parentNode !== null) {
            return getRoot(node.parentNode);
          }

          return node;
        }
        /**
         * Finds the offset parent common to the two provided nodes
         * @method
         * @memberof Popper.Utils
         * @argument {Element} element1
         * @argument {Element} element2
         * @returns {Element} common offset parent
         */

        function findCommonOffsetParent(element1, element2) {
          // This check is needed to avoid errors in case one of the elements isn't defined for any reason
          if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
            return document.documentElement;
          } // Here we make sure to give as "start" the element that comes first in the DOM

          var order =
            element1.compareDocumentPosition(element2) &
            Node.DOCUMENT_POSITION_FOLLOWING;
          var start = order ? element1 : element2;
          var end = order ? element2 : element1; // Get common ancestor container

          var range = document.createRange();
          range.setStart(start, 0);
          range.setEnd(end, 0);
          var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

          if (
            (element1 !== commonAncestorContainer &&
              element2 !== commonAncestorContainer) ||
            start.contains(end)
          ) {
            if (isOffsetContainer(commonAncestorContainer)) {
              return commonAncestorContainer;
            }

            return getOffsetParent(commonAncestorContainer);
          } // one of the nodes is inside shadowDOM, find which one

          var element1root = getRoot(element1);

          if (element1root.host) {
            return findCommonOffsetParent(element1root.host, element2);
          } else {
            return findCommonOffsetParent(element1, getRoot(element2).host);
          }
        }
        /**
         * Gets the scroll value of the given element in the given side (top and left)
         * @method
         * @memberof Popper.Utils
         * @argument {Element} element
         * @argument {String} side `top` or `left`
         * @returns {number} amount of scrolled pixels
         */

        function getScroll(element) {
          var side =
            arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
          var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
          var nodeName = element.nodeName;

          if (nodeName === 'BODY' || nodeName === 'HTML') {
            var html = element.ownerDocument.documentElement;
            var scrollingElement = element.ownerDocument.scrollingElement || html;
            return scrollingElement[upperSide];
          }

          return element[upperSide];
        }
        /*
         * Sum or subtract the element scroll values (left and top) from a given rect object
         * @method
         * @memberof Popper.Utils
         * @param {Object} rect - Rect object you want to change
         * @param {HTMLElement} element - The element from the function reads the scroll values
         * @param {Boolean} subtract - set to true if you want to subtract the scroll values
         * @return {Object} rect - The modifier rect object
         */

        function includeScroll(rect, element) {
          var subtract =
            arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var scrollTop = getScroll(element, 'top');
          var scrollLeft = getScroll(element, 'left');
          var modifier = subtract ? -1 : 1;
          rect.top += scrollTop * modifier;
          rect.bottom += scrollTop * modifier;
          rect.left += scrollLeft * modifier;
          rect.right += scrollLeft * modifier;
          return rect;
        }
        /*
         * Helper to detect borders of a given element
         * @method
         * @memberof Popper.Utils
         * @param {CSSStyleDeclaration} styles
         * Result of `getStyleComputedProperty` on the given element
         * @param {String} axis - `x` or `y`
         * @return {number} borders - The borders size of the given axis
         */

        function getBordersSize(styles, axis) {
          var sideA = axis === 'x' ? 'Left' : 'Top';
          var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
          return (
            parseFloat(styles['border' + sideA + 'Width'], 10) +
            parseFloat(styles['border' + sideB + 'Width'], 10)
          );
        }

        function getSize(axis, body, html, computedStyle) {
          return Math.max(
            body['offset' + axis],
            body['scroll' + axis],
            html['client' + axis],
            html['offset' + axis],
            html['scroll' + axis],
            isIE(10)
              ? parseInt(html['offset' + axis]) +
                  parseInt(
                    computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]
                  ) +
                  parseInt(
                    computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]
                  )
              : 0
          );
        }

        function getWindowSizes(document) {
          var body = document.body;
          var html = document.documentElement;
          var computedStyle = isIE(10) && getComputedStyle(html);
          return {
            height: getSize('Height', body, html, computedStyle),
            width: getSize('Width', body, html, computedStyle)
          };
        }

        var classCallCheck = function(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        };

        var createClass = (function() {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ('value' in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        })();

        var defineProperty = function(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        };

        var _extends =
          Object.assign ||
          function(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];

              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }

            return target;
          };
        /**
         * Given element offsets, generate an output similar to getBoundingClientRect
         * @method
         * @memberof Popper.Utils
         * @argument {Object} offsets
         * @returns {Object} ClientRect like output
         */

        function getClientRect(offsets) {
          return _extends({}, offsets, {
            right: offsets.left + offsets.width,
            bottom: offsets.top + offsets.height
          });
        }
        /**
         * Get bounding client rect of given element
         * @method
         * @memberof Popper.Utils
         * @param {HTMLElement} element
         * @return {Object} client rect
         */

        function getBoundingClientRect(element) {
          var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
          // considered in DOM in some circumstances...
          // This isn't reproducible in IE10 compatibility mode of IE11

          try {
            if (isIE(10)) {
              rect = element.getBoundingClientRect();
              var scrollTop = getScroll(element, 'top');
              var scrollLeft = getScroll(element, 'left');
              rect.top += scrollTop;
              rect.left += scrollLeft;
              rect.bottom += scrollTop;
              rect.right += scrollLeft;
            } else {
              rect = element.getBoundingClientRect();
            }
          } catch (e) {}

          var result = {
            left: rect.left,
            top: rect.top,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
          }; // subtract scrollbar size from sizes

          var sizes =
            element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
          var width = sizes.width || element.clientWidth || result.right - result.left;
          var height =
            sizes.height || element.clientHeight || result.bottom - result.top;
          var horizScrollbar = element.offsetWidth - width;
          var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
          // we make this check conditional for performance reasons

          if (horizScrollbar || vertScrollbar) {
            var styles = getStyleComputedProperty(element);
            horizScrollbar -= getBordersSize(styles, 'x');
            vertScrollbar -= getBordersSize(styles, 'y');
            result.width -= horizScrollbar;
            result.height -= vertScrollbar;
          }

          return getClientRect(result);
        }

        function getOffsetRectRelativeToArbitraryNode(children, parent) {
          var fixedPosition =
            arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var isIE10 = isIE(10);
          var isHTML = parent.nodeName === 'HTML';
          var childrenRect = getBoundingClientRect(children);
          var parentRect = getBoundingClientRect(parent);
          var scrollParent = getScrollParent(children);
          var styles = getStyleComputedProperty(parent);
          var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
          var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

          if (fixedPosition && isHTML) {
            parentRect.top = Math.max(parentRect.top, 0);
            parentRect.left = Math.max(parentRect.left, 0);
          }

          var offsets = getClientRect({
            top: childrenRect.top - parentRect.top - borderTopWidth,
            left: childrenRect.left - parentRect.left - borderLeftWidth,
            width: childrenRect.width,
            height: childrenRect.height
          });
          offsets.marginTop = 0;
          offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
          // we do this only on HTML because it's the only element that behaves
          // differently when margins are applied to it. The margins are included in
          // the box of the documentElement, in the other cases not.

          if (!isIE10 && isHTML) {
            var marginTop = parseFloat(styles.marginTop, 10);
            var marginLeft = parseFloat(styles.marginLeft, 10);
            offsets.top -= borderTopWidth - marginTop;
            offsets.bottom -= borderTopWidth - marginTop;
            offsets.left -= borderLeftWidth - marginLeft;
            offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

            offsets.marginTop = marginTop;
            offsets.marginLeft = marginLeft;
          }

          if (
            isIE10 && !fixedPosition
              ? parent.contains(scrollParent)
              : parent === scrollParent && scrollParent.nodeName !== 'BODY'
          ) {
            offsets = includeScroll(offsets, parent);
          }

          return offsets;
        }

        function getViewportOffsetRectRelativeToArtbitraryNode(element) {
          var excludeScroll =
            arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var html = element.ownerDocument.documentElement;
          var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
          var width = Math.max(html.clientWidth, window.innerWidth || 0);
          var height = Math.max(html.clientHeight, window.innerHeight || 0);
          var scrollTop = !excludeScroll ? getScroll(html) : 0;
          var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
          var offset = {
            top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
            left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
            width: width,
            height: height
          };
          return getClientRect(offset);
        }
        /**
         * Check if the given element is fixed or is inside a fixed parent
         * @method
         * @memberof Popper.Utils
         * @argument {Element} element
         * @argument {Element} customContainer
         * @returns {Boolean} answer to "isFixed?"
         */

        function isFixed(element) {
          var nodeName = element.nodeName;

          if (nodeName === 'BODY' || nodeName === 'HTML') {
            return false;
          }

          if (getStyleComputedProperty(element, 'position') === 'fixed') {
            return true;
          }

          return isFixed(getParentNode(element));
        }
        /**
         * Finds the first parent of an element that has a transformed property defined
         * @method
         * @memberof Popper.Utils
         * @argument {Element} element
         * @returns {Element} first transformed parent or documentElement
         */

        function getFixedPositionOffsetParent(element) {
          // This check is needed to avoid errors in case one of the elements isn't defined for any reason
          if (!element || !element.parentElement || isIE()) {
            return document.documentElement;
          }

          var el = element.parentElement;

          while (el && getStyleComputedProperty(el, 'transform') === 'none') {
            el = el.parentElement;
          }

          return el || document.documentElement;
        }
        /**
         * Computed the boundaries limits and return them
         * @method
         * @memberof Popper.Utils
         * @param {HTMLElement} popper
         * @param {HTMLElement} reference
         * @param {number} padding
         * @param {HTMLElement} boundariesElement - Element used to define the boundaries
         * @param {Boolean} fixedPosition - Is in fixed position mode
         * @returns {Object} Coordinates of the boundaries
         */

        function getBoundaries(popper, reference, padding, boundariesElement) {
          var fixedPosition =
            arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false; // NOTE: 1 DOM access here

          var boundaries = {
            top: 0,
            left: 0
          };
          var offsetParent = fixedPosition
            ? getFixedPositionOffsetParent(popper)
            : findCommonOffsetParent(popper, reference); // Handle viewport case

          if (boundariesElement === 'viewport') {
            boundaries = getViewportOffsetRectRelativeToArtbitraryNode(
              offsetParent,
              fixedPosition
            );
          } else {
            // Handle other cases based on DOM element used as boundaries
            var boundariesNode = void 0;

            if (boundariesElement === 'scrollParent') {
              boundariesNode = getScrollParent(getParentNode(reference));

              if (boundariesNode.nodeName === 'BODY') {
                boundariesNode = popper.ownerDocument.documentElement;
              }
            } else if (boundariesElement === 'window') {
              boundariesNode = popper.ownerDocument.documentElement;
            } else {
              boundariesNode = boundariesElement;
            }

            var offsets = getOffsetRectRelativeToArbitraryNode(
              boundariesNode,
              offsetParent,
              fixedPosition
            ); // In case of HTML, we need a different computation

            if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
              var _getWindowSizes = getWindowSizes(popper.ownerDocument);

              var height = _getWindowSizes.height;

              var width = _getWindowSizes.width;

              boundaries.top += offsets.top - offsets.marginTop;
              boundaries.bottom = height + offsets.top;
              boundaries.left += offsets.left - offsets.marginLeft;
              boundaries.right = width + offsets.left;
            } else {
              // for all the other DOM elements, this one is good
              boundaries = offsets;
            }
          } // Add paddings

          padding = padding || 0;
          var isPaddingNumber = typeof padding === 'number';
          boundaries.left += isPaddingNumber ? padding : padding.left || 0;
          boundaries.top += isPaddingNumber ? padding : padding.top || 0;
          boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
          boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
          return boundaries;
        }

        function getArea(_ref) {
          var width = _ref.width;

          var height = _ref.height;
          return width * height;
        }
        /**
         * Utility used to transform the `auto` placement to the placement with more
         * available space.
         * @method
         * @memberof Popper.Utils
         * @argument {Object} data - The data object generated by update method
         * @argument {Object} options - Modifiers configuration and options
         * @returns {Object} The data object, properly modified
         */

        function computeAutoPlacement(
          placement,
          refRect,
          popper,
          reference,
          boundariesElement
        ) {
          var padding =
            arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

          if (placement.indexOf('auto') === -1) {
            return placement;
          }

          var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
          var rects = {
            top: {
              width: boundaries.width,
              height: refRect.top - boundaries.top
            },
            right: {
              width: boundaries.right - refRect.right,
              height: boundaries.height
            },
            bottom: {
              width: boundaries.width,
              height: boundaries.bottom - refRect.bottom
            },
            left: {
              width: refRect.left - boundaries.left,
              height: boundaries.height
            }
          };
          var sortedAreas = Object.keys(rects)
            .map(function(key) {
              return _extends(
                {
                  key: key
                },
                rects[key],
                {
                  area: getArea(rects[key])
                }
              );
            })
            .sort(function(a, b) {
              return b.area - a.area;
            });
          var filteredAreas = sortedAreas.filter(function(_ref2) {
            var width = _ref2.width;

            var height = _ref2.height;
            return width >= popper.clientWidth && height >= popper.clientHeight;
          });
          var computedPlacement =
            filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
          var variation = placement.split('-')[1];
          return computedPlacement + (variation ? '-' + variation : '');
        }
        /**
         * Get offsets to the reference element
         * @method
         * @memberof Popper.Utils
         * @param {Object} state
         * @param {Element} popper - the popper element
         * @param {Element} reference - the reference element (the popper will be relative to this)
         * @param {Element} fixedPosition - is in fixed position mode
         * @returns {Object} An object containing the offsets which will be applied to the popper
         */

        function getReferenceOffsets(state, popper, reference) {
          var fixedPosition =
            arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
          var commonOffsetParent = fixedPosition
            ? getFixedPositionOffsetParent(popper)
            : findCommonOffsetParent(popper, reference);
          return getOffsetRectRelativeToArbitraryNode(
            reference,
            commonOffsetParent,
            fixedPosition
          );
        }
        /**
         * Get the outer sizes of the given element (offset size + margins)
         * @method
         * @memberof Popper.Utils
         * @argument {Element} element
         * @returns {Object} object containing width and height properties
         */

        function getOuterSizes(element) {
          var window = element.ownerDocument.defaultView;
          var styles = window.getComputedStyle(element);
          var x =
            parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
          var y =
            parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
          var result = {
            width: element.offsetWidth + y,
            height: element.offsetHeight + x
          };
          return result;
        }
        /**
         * Get the opposite placement of the given one
         * @method
         * @memberof Popper.Utils
         * @argument {String} placement
         * @returns {String} flipped placement
         */

        function getOppositePlacement(placement) {
          var hash = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
          };
          return placement.replace(/left|right|bottom|top/g, function(matched) {
            return hash[matched];
          });
        }
        /**
         * Get offsets to the popper
         * @method
         * @memberof Popper.Utils
         * @param {Object} position - CSS position the Popper will get applied
         * @param {HTMLElement} popper - the popper element
         * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
         * @param {String} placement - one of the valid placement options
         * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
         */

        function getPopperOffsets(popper, referenceOffsets, placement) {
          placement = placement.split('-')[0]; // Get popper node sizes

          var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

          var popperOffsets = {
            width: popperRect.width,
            height: popperRect.height
          }; // depending by the popper placement we have to compute its offsets slightly differently

          var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
          var mainSide = isHoriz ? 'top' : 'left';
          var secondarySide = isHoriz ? 'left' : 'top';
          var measurement = isHoriz ? 'height' : 'width';
          var secondaryMeasurement = !isHoriz ? 'height' : 'width';
          popperOffsets[mainSide] =
            referenceOffsets[mainSide] +
            referenceOffsets[measurement] / 2 -
            popperRect[measurement] / 2;

          if (placement === secondarySide) {
            popperOffsets[secondarySide] =
              referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
          } else {
            popperOffsets[secondarySide] =
              referenceOffsets[getOppositePlacement(secondarySide)];
          }

          return popperOffsets;
        }
        /**
         * Mimics the `find` method of Array
         * @method
         * @memberof Popper.Utils
         * @argument {Array} arr
         * @argument prop
         * @argument value
         * @returns index or -1
         */

        function find(arr, check) {
          // use native find if supported
          if (Array.prototype.find) {
            return arr.find(check);
          } // use `filter` to obtain the same behavior of `find`

          return arr.filter(check)[0];
        }
        /**
         * Return the index of the matching object
         * @method
         * @memberof Popper.Utils
         * @argument {Array} arr
         * @argument prop
         * @argument value
         * @returns index or -1
         */

        function findIndex(arr, prop, value) {
          // use native findIndex if supported
          if (Array.prototype.findIndex) {
            return arr.findIndex(function(cur) {
              return cur[prop] === value;
            });
          } // use `find` + `indexOf` if `findIndex` isn't supported

          var match = find(arr, function(obj) {
            return obj[prop] === value;
          });
          return arr.indexOf(match);
        }
        /**
         * Loop trough the list of modifiers and run them in order,
         * each of them will then edit the data object.
         * @method
         * @memberof Popper.Utils
         * @param {dataObject} data
         * @param {Array} modifiers
         * @param {String} ends - Optional modifier name used as stopper
         * @returns {dataObject}
         */

        function runModifiers(modifiers, data, ends) {
          var modifiersToRun =
            ends === undefined
              ? modifiers
              : modifiers.slice(0, findIndex(modifiers, 'name', ends));
          modifiersToRun.forEach(function(modifier) {
            if (modifier['function']) {
              // eslint-disable-line dot-notation
              console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            }

            var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

            if (modifier.enabled && isFunction(fn)) {
              // Add properties to offsets to make them a complete clientRect object
              // we do this before each modifier to make sure the previous one doesn't
              // mess with these values
              data.offsets.popper = getClientRect(data.offsets.popper);
              data.offsets.reference = getClientRect(data.offsets.reference);
              data = fn(data, modifier);
            }
          });
          return data;
        }
        /**
         * Updates the position of the popper, computing the new offsets and applying
         * the new style.<br />
         * Prefer `scheduleUpdate` over `update` because of performance reasons.
         * @method
         * @memberof Popper
         */

        function update() {
          // if popper is destroyed, don't perform any further update
          if (this.state.isDestroyed) {
            return;
          }

          var data = {
            instance: this,
            styles: {},
            arrowStyles: {},
            attributes: {},
            flipped: false,
            offsets: {}
          }; // compute reference element offsets

          data.offsets.reference = getReferenceOffsets(
            this.state,
            this.popper,
            this.reference,
            this.options.positionFixed
          ); // compute auto placement, store placement inside the data object,
          // modifiers will be able to edit `placement` if needed
          // and refer to originalPlacement to know the original value

          data.placement = computeAutoPlacement(
            this.options.placement,
            data.offsets.reference,
            this.popper,
            this.reference,
            this.options.modifiers.flip.boundariesElement,
            this.options.modifiers.flip.padding
          ); // store the computed placement inside `originalPlacement`

          data.originalPlacement = data.placement;
          data.positionFixed = this.options.positionFixed; // compute the popper offsets

          data.offsets.popper = getPopperOffsets(
            this.popper,
            data.offsets.reference,
            data.placement
          );
          data.offsets.popper.position = this.options.positionFixed
            ? 'fixed'
            : 'absolute'; // run the modifiers

          data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
          // the other ones will call `onUpdate` callback

          if (!this.state.isCreated) {
            this.state.isCreated = true;
            this.options.onCreate(data);
          } else {
            this.options.onUpdate(data);
          }
        }
        /**
         * Helper used to know if the given modifier is enabled.
         * @method
         * @memberof Popper.Utils
         * @returns {Boolean}
         */

        function isModifierEnabled(modifiers, modifierName) {
          return modifiers.some(function(_ref) {
            var name = _ref.name;

            var enabled = _ref.enabled;
            return enabled && name === modifierName;
          });
        }
        /**
         * Get the prefixed supported property name
         * @method
         * @memberof Popper.Utils
         * @argument {String} property (camelCase)
         * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
         */

        function getSupportedPropertyName(property) {
          var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
          var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

          for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            var toCheck = prefix ? '' + prefix + upperProp : property;

            if (typeof document.body.style[toCheck] !== 'undefined') {
              return toCheck;
            }
          }

          return null;
        }
        /**
         * Destroys the popper.
         * @method
         * @memberof Popper
         */

        function destroy() {
          this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

          if (isModifierEnabled(this.modifiers, 'applyStyle')) {
            this.popper.removeAttribute('x-placement');
            this.popper.style.position = '';
            this.popper.style.top = '';
            this.popper.style.left = '';
            this.popper.style.right = '';
            this.popper.style.bottom = '';
            this.popper.style.willChange = '';
            this.popper.style[getSupportedPropertyName('transform')] = '';
          }

          this.disableEventListeners(); // remove the popper if user explicity asked for the deletion on destroy
          // do not use `remove` because IE11 doesn't support it

          if (this.options.removeOnDestroy) {
            this.popper.parentNode.removeChild(this.popper);
          }

          return this;
        }
        /**
         * Get the window associated with the element
         * @argument {Element} element
         * @returns {Window}
         */

        function getWindow(element) {
          var ownerDocument = element.ownerDocument;
          return ownerDocument ? ownerDocument.defaultView : window;
        }

        function attachToScrollParents(scrollParent, event, callback, scrollParents) {
          var isBody = scrollParent.nodeName === 'BODY';
          var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
          target.addEventListener(event, callback, {
            passive: true
          });

          if (!isBody) {
            attachToScrollParents(
              getScrollParent(target.parentNode),
              event,
              callback,
              scrollParents
            );
          }

          scrollParents.push(target);
        }
        /**
         * Setup needed event listeners used to update the popper position
         * @method
         * @memberof Popper.Utils
         * @private
         */

        function setupEventListeners(reference, options, state, updateBound) {
          // Resize event listener on window
          state.updateBound = updateBound;
          getWindow(reference).addEventListener('resize', state.updateBound, {
            passive: true
          }); // Scroll event listener on scroll parents

          var scrollElement = getScrollParent(reference);
          attachToScrollParents(
            scrollElement,
            'scroll',
            state.updateBound,
            state.scrollParents
          );
          state.scrollElement = scrollElement;
          state.eventsEnabled = true;
          return state;
        }
        /**
         * It will add resize/scroll events and start recalculating
         * position of the popper element when they are triggered.
         * @method
         * @memberof Popper
         */

        function enableEventListeners() {
          if (!this.state.eventsEnabled) {
            this.state = setupEventListeners(
              this.reference,
              this.options,
              this.state,
              this.scheduleUpdate
            );
          }
        }
        /**
         * Remove event listeners used to update the popper position
         * @method
         * @memberof Popper.Utils
         * @private
         */

        function removeEventListeners(reference, state) {
          // Remove resize event listener on window
          getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

          state.scrollParents.forEach(function(target) {
            target.removeEventListener('scroll', state.updateBound);
          }); // Reset state

          state.updateBound = null;
          state.scrollParents = [];
          state.scrollElement = null;
          state.eventsEnabled = false;
          return state;
        }
        /**
         * It will remove resize/scroll events and won't recalculate popper position
         * when they are triggered. It also won't trigger `onUpdate` callback anymore,
         * unless you call `update` method manually.
         * @method
         * @memberof Popper
         */

        function disableEventListeners() {
          if (this.state.eventsEnabled) {
            cancelAnimationFrame(this.scheduleUpdate);
            this.state = removeEventListeners(this.reference, this.state);
          }
        }
        /**
         * Tells if a given input is a number
         * @method
         * @memberof Popper.Utils
         * @param {*} input to check
         * @return {Boolean}
         */

        function isNumeric(n) {
          return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
        }
        /**
         * Set the style to the given popper
         * @method
         * @memberof Popper.Utils
         * @argument {Element} element - Element to apply the style to
         * @argument {Object} styles
         * Object with a list of properties and values which will be applied to the element
         */

        function setStyles(element, styles) {
          Object.keys(styles).forEach(function(prop) {
            var unit = ''; // add unit if the value is numeric and is one of the following

            if (
              ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !==
                -1 &&
              isNumeric(styles[prop])
            ) {
              unit = 'px';
            }

            element.style[prop] = styles[prop] + unit;
          });
        }
        /**
         * Set the attributes to the given popper
         * @method
         * @memberof Popper.Utils
         * @argument {Element} element - Element to apply the attributes to
         * @argument {Object} styles
         * Object with a list of properties and values which will be applied to the element
         */

        function setAttributes(element, attributes) {
          Object.keys(attributes).forEach(function(prop) {
            var value = attributes[prop];

            if (value !== false) {
              element.setAttribute(prop, attributes[prop]);
            } else {
              element.removeAttribute(prop);
            }
          });
        }
        /**
         * @function
         * @memberof Modifiers
         * @argument {Object} data - The data object generated by `update` method
         * @argument {Object} data.styles - List of style properties - values to apply to popper element
         * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
         * @argument {Object} options - Modifiers configuration and options
         * @returns {Object} The same data object
         */

        function applyStyle(data) {
          // any property present in `data.styles` will be applied to the popper,
          // in this way we can make the 3rd party modifiers add custom styles to it
          // Be aware, modifiers could override the properties defined in the previous
          // lines of this modifier!
          setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
          // they will be set as HTML attributes of the element

          setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

          if (data.arrowElement && Object.keys(data.arrowStyles).length) {
            setStyles(data.arrowElement, data.arrowStyles);
          }

          return data;
        }
        /**
         * Set the x-placement attribute before everything else because it could be used
         * to add margins to the popper margins needs to be calculated to get the
         * correct popper offsets.
         * @method
         * @memberof Popper.modifiers
         * @param {HTMLElement} reference - The reference element used to position the popper
         * @param {HTMLElement} popper - The HTML element used as popper
         * @param {Object} options - Popper.js options
         */

        function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
          // compute reference element offsets
          var referenceOffsets = getReferenceOffsets(
            state,
            popper,
            reference,
            options.positionFixed
          ); // compute auto placement, store placement inside the data object,
          // modifiers will be able to edit `placement` if needed
          // and refer to originalPlacement to know the original value

          var placement = computeAutoPlacement(
            options.placement,
            referenceOffsets,
            popper,
            reference,
            options.modifiers.flip.boundariesElement,
            options.modifiers.flip.padding
          );
          popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
          // without the position applied we can't guarantee correct computations

          setStyles(popper, {
            position: options.positionFixed ? 'fixed' : 'absolute'
          });
          return options;
        }
        /**
         * @function
         * @memberof Popper.Utils
         * @argument {Object} data - The data object generated by `update` method
         * @argument {Boolean} shouldRound - If the offsets should be rounded at all
         * @returns {Object} The popper's position offsets rounded
         *
         * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
         * good as it can be within reason.
         * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
         *
         * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
         * as well on High DPI screens).
         *
         * Firefox prefers no rounding for positioning and does not have blurriness on
         * high DPI screens.
         *
         * Only horizontal placement and left/right values need to be considered.
         */

        function getRoundedOffsets(data, shouldRound) {
          var _data$offsets = data.offsets;

          var popper = _data$offsets.popper;

          var reference = _data$offsets.reference;
          var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
          var isVariation = data.placement.indexOf('-') !== -1;
          var sameWidthOddness = reference.width % 2 === popper.width % 2;
          var bothOddWidth = reference.width % 2 === 1 && popper.width % 2 === 1;

          var noRound = function noRound(v) {
            return v;
          };

          var horizontalToInteger = !shouldRound
            ? noRound
            : isVertical || isVariation || sameWidthOddness
            ? Math.round
            : Math.floor;
          var verticalToInteger = !shouldRound ? noRound : Math.round;
          return {
            left: horizontalToInteger(
              bothOddWidth && !isVariation && shouldRound
                ? popper.left - 1
                : popper.left
            ),
            top: verticalToInteger(popper.top),
            bottom: verticalToInteger(popper.bottom),
            right: horizontalToInteger(popper.right)
          };
        }

        var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
        /**
         * @function
         * @memberof Modifiers
         * @argument {Object} data - The data object generated by `update` method
         * @argument {Object} options - Modifiers configuration and options
         * @returns {Object} The data object, properly modified
         */

        function computeStyle(data, options) {
          var x = options.x;

          var y = options.y;
          var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

          var legacyGpuAccelerationOption = find(data.instance.modifiers, function(
            modifier
          ) {
            return modifier.name === 'applyStyle';
          }).gpuAcceleration;

          if (legacyGpuAccelerationOption !== undefined) {
            console.warn(
              'WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!'
            );
          }

          var gpuAcceleration =
            legacyGpuAccelerationOption !== undefined
              ? legacyGpuAccelerationOption
              : options.gpuAcceleration;
          var offsetParent = getOffsetParent(data.instance.popper);
          var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

          var styles = {
            position: popper.position
          };
          var offsets = getRoundedOffsets(
            data,
            window.devicePixelRatio < 2 || !isFirefox
          );
          var sideA = x === 'bottom' ? 'top' : 'bottom';
          var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
          //  we use `translate3d` to apply the position to the popper we
          // automatically use the supported prefixed version if needed

          var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
          // If the content of the popper grows once it's been positioned, it
          // may happen that the popper gets misplaced because of the new content
          // overflowing its reference element
          // To avoid this problem, we provide two options (x and y), which allow
          // the consumer to define the offset origin.
          // If we position a popper on top of a reference element, we can set
          // `x` to `top` to make the popper grow towards its top instead of
          // its bottom.

          var left = void 0;

          var top = void 0;

          if (sideA === 'bottom') {
            // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
            // and not the bottom of the html element
            if (offsetParent.nodeName === 'HTML') {
              top = -offsetParent.clientHeight + offsets.bottom;
            } else {
              top = -offsetParentRect.height + offsets.bottom;
            }
          } else {
            top = offsets.top;
          }

          if (sideB === 'right') {
            if (offsetParent.nodeName === 'HTML') {
              left = -offsetParent.clientWidth + offsets.right;
            } else {
              left = -offsetParentRect.width + offsets.right;
            }
          } else {
            left = offsets.left;
          }

          if (gpuAcceleration && prefixedProperty) {
            styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
            styles[sideA] = 0;
            styles[sideB] = 0;
            styles.willChange = 'transform';
          } else {
            // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
            var invertTop = sideA === 'bottom' ? -1 : 1;
            var invertLeft = sideB === 'right' ? -1 : 1;
            styles[sideA] = top * invertTop;
            styles[sideB] = left * invertLeft;
            styles.willChange = sideA + ', ' + sideB;
          } // Attributes

          var attributes = {
            'x-placement': data.placement
          }; // Update `data` attributes, styles and arrowStyles

          data.attributes = _extends({}, attributes, data.attributes);
          data.styles = _extends({}, styles, data.styles);
          data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
          return data;
        }
        /**
         * Helper used to know if the given modifier depends from another one.<br />
         * It checks if the needed modifier is listed and enabled.
         * @method
         * @memberof Popper.Utils
         * @param {Array} modifiers - list of modifiers
         * @param {String} requestingName - name of requesting modifier
         * @param {String} requestedName - name of requested modifier
         * @returns {Boolean}
         */

        function isModifierRequired(modifiers, requestingName, requestedName) {
          var requesting = find(modifiers, function(_ref) {
            var name = _ref.name;
            return name === requestingName;
          });
          var isRequired =
            !!requesting &&
            modifiers.some(function(modifier) {
              return (
                modifier.name === requestedName &&
                modifier.enabled &&
                modifier.order < requesting.order
              );
            });

          if (!isRequired) {
            var _requesting = '`' + requestingName + '`';

            var requested = '`' + requestedName + '`';
            console.warn(
              requested +
                ' modifier is required by ' +
                _requesting +
                ' modifier in order to work, be sure to include it before ' +
                _requesting +
                '!'
            );
          }

          return isRequired;
        }
        /**
         * @function
         * @memberof Modifiers
         * @argument {Object} data - The data object generated by update method
         * @argument {Object} options - Modifiers configuration and options
         * @returns {Object} The data object, properly modified
         */

        function arrow(data, options) {
          var _data$offsets$arrow; // arrow depends on keepTogether in order to work

          if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
            return data;
          }

          var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

          if (typeof arrowElement === 'string') {
            arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

            if (!arrowElement) {
              return data;
            }
          } else {
            // if the arrowElement isn't a query selector we must check that the
            // provided DOM node is child of its popper node
            if (!data.instance.popper.contains(arrowElement)) {
              console.warn(
                'WARNING: `arrow.element` must be child of its popper element!'
              );
              return data;
            }
          }

          var placement = data.placement.split('-')[0];
          var _data$offsets = data.offsets;

          var popper = _data$offsets.popper;

          var reference = _data$offsets.reference;
          var isVertical = ['left', 'right'].indexOf(placement) !== -1;
          var len = isVertical ? 'height' : 'width';
          var sideCapitalized = isVertical ? 'Top' : 'Left';
          var side = sideCapitalized.toLowerCase();
          var altSide = isVertical ? 'left' : 'top';
          var opSide = isVertical ? 'bottom' : 'right';
          var arrowElementSize = getOuterSizes(arrowElement)[len]; //
          // extends keepTogether behavior making sure the popper and its
          // reference have enough pixels in conjunction
          //
          // top/left side

          if (reference[opSide] - arrowElementSize < popper[side]) {
            data.offsets.popper[side] -=
              popper[side] - (reference[opSide] - arrowElementSize);
          } // bottom/right side

          if (reference[side] + arrowElementSize > popper[opSide]) {
            data.offsets.popper[side] +=
              reference[side] + arrowElementSize - popper[opSide];
          }

          data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

          var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
          // take popper margin in account because we don't have this info available

          var css = getStyleComputedProperty(data.instance.popper);
          var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
          var popperBorderSide = parseFloat(
            css['border' + sideCapitalized + 'Width'],
            10
          );
          var sideValue =
            center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

          sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
          data.arrowElement = arrowElement;
          data.offsets.arrow = ((_data$offsets$arrow = {}),
          defineProperty(_data$offsets$arrow, side, Math.round(sideValue)),
          defineProperty(_data$offsets$arrow, altSide, ''),
          _data$offsets$arrow);
          return data;
        }
        /**
         * Get the opposite placement variation of the given one
         * @method
         * @memberof Popper.Utils
         * @argument {String} placement variation
         * @returns {String} flipped placement variation
         */

        function getOppositeVariation(variation) {
          if (variation === 'end') {
            return 'start';
          } else if (variation === 'start') {
            return 'end';
          }

          return variation;
        }
        /**
         * List of accepted placements to use as values of the `placement` option.<br />
         * Valid placements are:
         * - `auto`
         * - `top`
         * - `right`
         * - `bottom`
         * - `left`
         *
         * Each placement can have a variation from this list:
         * - `-start`
         * - `-end`
         *
         * Variations are interpreted easily if you think of them as the left to right
         * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
         * is right.<br />
         * Vertically (`left` and `right`), `start` is top and `end` is bottom.
         *
         * Some valid examples are:
         * - `top-end` (on top of reference, right aligned)
         * - `right-start` (on right of reference, top aligned)
         * - `bottom` (on bottom, centered)
         * - `auto-end` (on the side with more space available, alignment depends by placement)
         *
         * @static
         * @type {Array}
         * @enum {String}
         * @readonly
         * @method placements
         * @memberof Popper
         */

        var placements = [
          'auto-start',
          'auto',
          'auto-end',
          'top-start',
          'top',
          'top-end',
          'right-start',
          'right',
          'right-end',
          'bottom-end',
          'bottom',
          'bottom-start',
          'left-end',
          'left',
          'left-start'
        ]; // Get rid of `auto` `auto-start` and `auto-end`

        var validPlacements = placements.slice(3);
        /**
         * Given an initial placement, returns all the subsequent placements
         * clockwise (or counter-clockwise).
         *
         * @method
         * @memberof Popper.Utils
         * @argument {String} placement - A valid placement (it accepts variations)
         * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
         * @returns {Array} placements including their variations
         */

        function clockwise(placement) {
          var counter =
            arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var index = validPlacements.indexOf(placement);
          var arr = validPlacements
            .slice(index + 1)
            .concat(validPlacements.slice(0, index));
          return counter ? arr.reverse() : arr;
        }

        var BEHAVIORS = {
          FLIP: 'flip',
          CLOCKWISE: 'clockwise',
          COUNTERCLOCKWISE: 'counterclockwise'
        };
        /**
         * @function
         * @memberof Modifiers
         * @argument {Object} data - The data object generated by update method
         * @argument {Object} options - Modifiers configuration and options
         * @returns {Object} The data object, properly modified
         */

        function flip(data, options) {
          // if `inner` modifier is enabled, we can't use the `flip` modifier
          if (isModifierEnabled(data.instance.modifiers, 'inner')) {
            return data;
          }

          if (data.flipped && data.placement === data.originalPlacement) {
            // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
            return data;
          }

          var boundaries = getBoundaries(
            data.instance.popper,
            data.instance.reference,
            options.padding,
            options.boundariesElement,
            data.positionFixed
          );
          var placement = data.placement.split('-')[0];
          var placementOpposite = getOppositePlacement(placement);
          var variation = data.placement.split('-')[1] || '';
          var flipOrder = [];

          switch (options.behavior) {
            case BEHAVIORS.FLIP:
              flipOrder = [placement, placementOpposite];
              break;

            case BEHAVIORS.CLOCKWISE:
              flipOrder = clockwise(placement);
              break;

            case BEHAVIORS.COUNTERCLOCKWISE:
              flipOrder = clockwise(placement, true);
              break;

            default:
              flipOrder = options.behavior;
          }

          flipOrder.forEach(function(step, index) {
            if (placement !== step || flipOrder.length === index + 1) {
              return data;
            }

            placement = data.placement.split('-')[0];
            placementOpposite = getOppositePlacement(placement);
            var popperOffsets = data.offsets.popper;
            var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

            var floor = Math.floor;
            var overlapsRef =
              (placement === 'left' &&
                floor(popperOffsets.right) > floor(refOffsets.left)) ||
              (placement === 'right' &&
                floor(popperOffsets.left) < floor(refOffsets.right)) ||
              (placement === 'top' &&
                floor(popperOffsets.bottom) > floor(refOffsets.top)) ||
              (placement === 'bottom' &&
                floor(popperOffsets.top) < floor(refOffsets.bottom));
            var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
            var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
            var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
            var overflowsBottom =
              floor(popperOffsets.bottom) > floor(boundaries.bottom);
            var overflowsBoundaries =
              (placement === 'left' && overflowsLeft) ||
              (placement === 'right' && overflowsRight) ||
              (placement === 'top' && overflowsTop) ||
              (placement === 'bottom' && overflowsBottom); // flip the variation if required

            var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
            var flippedVariation =
              !!options.flipVariations &&
              ((isVertical && variation === 'start' && overflowsLeft) ||
                (isVertical && variation === 'end' && overflowsRight) ||
                (!isVertical && variation === 'start' && overflowsTop) ||
                (!isVertical && variation === 'end' && overflowsBottom));

            if (overlapsRef || overflowsBoundaries || flippedVariation) {
              // this boolean to detect any flip loop
              data.flipped = true;

              if (overlapsRef || overflowsBoundaries) {
                placement = flipOrder[index + 1];
              }

              if (flippedVariation) {
                variation = getOppositeVariation(variation);
              }

              data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
              // any additional property we may add in the future

              data.offsets.popper = _extends(
                {},
                data.offsets.popper,
                getPopperOffsets(
                  data.instance.popper,
                  data.offsets.reference,
                  data.placement
                )
              );
              data = runModifiers(data.instance.modifiers, data, 'flip');
            }
          });
          return data;
        }
        /**
         * @function
         * @memberof Modifiers
         * @argument {Object} data - The data object generated by update method
         * @argument {Object} options - Modifiers configuration and options
         * @returns {Object} The data object, properly modified
         */

        function keepTogether(data) {
          var _data$offsets = data.offsets;

          var popper = _data$offsets.popper;

          var reference = _data$offsets.reference;
          var placement = data.placement.split('-')[0];
          var floor = Math.floor;
          var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
          var side = isVertical ? 'right' : 'bottom';
          var opSide = isVertical ? 'left' : 'top';
          var measurement = isVertical ? 'width' : 'height';

          if (popper[side] < floor(reference[opSide])) {
            data.offsets.popper[opSide] =
              floor(reference[opSide]) - popper[measurement];
          }

          if (popper[opSide] > floor(reference[side])) {
            data.offsets.popper[opSide] = floor(reference[side]);
          }

          return data;
        }
        /**
         * Converts a string containing value + unit into a px value number
         * @function
         * @memberof {modifiers~offset}
         * @private
         * @argument {String} str - Value + unit string
         * @argument {String} measurement - `height` or `width`
         * @argument {Object} popperOffsets
         * @argument {Object} referenceOffsets
         * @returns {Number|String}
         * Value in pixels, or original string if no values were extracted
         */

        function toValue(str, measurement, popperOffsets, referenceOffsets) {
          // separate value from unit
          var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
          var value = +split[1];
          var unit = split[2]; // If it's not a number it's an operator, I guess

          if (!value) {
            return str;
          }

          if (unit.indexOf('%') === 0) {
            var element = void 0;

            switch (unit) {
              case '%p':
                element = popperOffsets;
                break;

              case '%':
              case '%r':
              default:
                element = referenceOffsets;
            }

            var rect = getClientRect(element);
            return (rect[measurement] / 100) * value;
          } else if (unit === 'vh' || unit === 'vw') {
            // if is a vh or vw, we calculate the size based on the viewport
            var size = void 0;

            if (unit === 'vh') {
              size = Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0
              );
            } else {
              size = Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
              );
            }

            return (size / 100) * value;
          } else {
            // if is an explicit pixel unit, we get rid of the unit and keep the value
            // if is an implicit unit, it's px, and we return just the value
            return value;
          }
        }
        /**
         * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
         * @function
         * @memberof {modifiers~offset}
         * @private
         * @argument {String} offset
         * @argument {Object} popperOffsets
         * @argument {Object} referenceOffsets
         * @argument {String} basePlacement
         * @returns {Array} a two cells array with x and y offsets in numbers
         */

        function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
          var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
          // in this way the first offset will use an axis and the second one
          // will use the other one

          var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
          // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

          var fragments = offset.split(/(\+|\-)/).map(function(frag) {
            return frag.trim();
          }); // Detect if the offset string contains a pair of values or a single one
          // they could be separated by comma or space

          var divider = fragments.indexOf(
            find(fragments, function(frag) {
              return frag.search(/,|\s/) !== -1;
            })
          );

          if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
            console.warn(
              'Offsets separated by white space(s) are deprecated, use a comma (,) instead.'
            );
          } // If divider is found, we divide the list of values and operands to divide
          // them by ofset X and Y.

          var splitRegex = /\s*,\s*|\s+/;
          var ops =
            divider !== -1
              ? [
                  fragments
                    .slice(0, divider)
                    .concat([fragments[divider].split(splitRegex)[0]]),
                  [fragments[divider].split(splitRegex)[1]].concat(
                    fragments.slice(divider + 1)
                  )
                ]
              : [fragments]; // Convert the values with units to absolute pixels to allow our computations

          ops = ops.map(function(op, index) {
            // Most of the units rely on the orientation of the popper
            var measurement = (index === 1
            ? !useHeight
            : useHeight)
              ? 'height'
              : 'width';
            var mergeWithPrevious = false;
            return (
              op // This aggregates any `+` or `-` sign that aren't considered operators
                // e.g.: 10 + +5 => [10, +, +5]
                .reduce(function(a, b) {
                  if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
                    a[a.length - 1] = b;
                    mergeWithPrevious = true;
                    return a;
                  } else if (mergeWithPrevious) {
                    a[a.length - 1] += b;
                    mergeWithPrevious = false;
                    return a;
                  } else {
                    return a.concat(b);
                  }
                }, []) // Here we convert the string values into number values (in px)
                .map(function(str) {
                  return toValue(str, measurement, popperOffsets, referenceOffsets);
                })
            );
          }); // Loop trough the offsets arrays and execute the operations

          ops.forEach(function(op, index) {
            op.forEach(function(frag, index2) {
              if (isNumeric(frag)) {
                offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
              }
            });
          });
          return offsets;
        }
        /**
         * @function
         * @memberof Modifiers
         * @argument {Object} data - The data object generated by update method
         * @argument {Object} options - Modifiers configuration and options
         * @argument {Number|String} options.offset=0
         * The offset value as described in the modifier description
         * @returns {Object} The data object, properly modified
         */

        function offset(data, _ref) {
          var offset = _ref.offset;
          var placement = data.placement;

          var _data$offsets = data.offsets;

          var popper = _data$offsets.popper;

          var reference = _data$offsets.reference;
          var basePlacement = placement.split('-')[0];
          var offsets = void 0;

          if (isNumeric(+offset)) {
            offsets = [+offset, 0];
          } else {
            offsets = parseOffset(offset, popper, reference, basePlacement);
          }

          if (basePlacement === 'left') {
            popper.top += offsets[0];
            popper.left -= offsets[1];
          } else if (basePlacement === 'right') {
            popper.top += offsets[0];
            popper.left += offsets[1];
          } else if (basePlacement === 'top') {
            popper.left += offsets[0];
            popper.top -= offsets[1];
          } else if (basePlacement === 'bottom') {
            popper.left += offsets[0];
            popper.top += offsets[1];
          }

          data.popper = popper;
          return data;
        }
        /**
         * @function
         * @memberof Modifiers
         * @argument {Object} data - The data object generated by `update` method
         * @argument {Object} options - Modifiers configuration and options
         * @returns {Object} The data object, properly modified
         */

        function preventOverflow(data, options) {
          var boundariesElement =
            options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
          // go one step up and use the next offsetParent as reference to
          // avoid to make this modifier completely useless and look like broken

          if (data.instance.reference === boundariesElement) {
            boundariesElement = getOffsetParent(boundariesElement);
          } // NOTE: DOM access here
          // resets the popper's position so that the document size can be calculated excluding
          // the size of the popper element itself

          var transformProp = getSupportedPropertyName('transform');
          var popperStyles = data.instance.popper.style; // assignment to help minification

          var top = popperStyles.top;

          var left = popperStyles.left;

          var transform = popperStyles[transformProp];
          popperStyles.top = '';
          popperStyles.left = '';
          popperStyles[transformProp] = '';
          var boundaries = getBoundaries(
            data.instance.popper,
            data.instance.reference,
            options.padding,
            boundariesElement,
            data.positionFixed
          ); // NOTE: DOM access here
          // restores the original style properties after the offsets have been computed

          popperStyles.top = top;
          popperStyles.left = left;
          popperStyles[transformProp] = transform;
          options.boundaries = boundaries;
          var order = options.priority;
          var popper = data.offsets.popper;
          var check = {
            primary: function primary(placement) {
              var value = popper[placement];

              if (
                popper[placement] < boundaries[placement] &&
                !options.escapeWithReference
              ) {
                value = Math.max(popper[placement], boundaries[placement]);
              }

              return defineProperty({}, placement, value);
            },
            secondary: function secondary(placement) {
              var mainSide = placement === 'right' ? 'left' : 'top';
              var value = popper[mainSide];

              if (
                popper[placement] > boundaries[placement] &&
                !options.escapeWithReference
              ) {
                value = Math.min(
                  popper[mainSide],
                  boundaries[placement] -
                    (placement === 'right' ? popper.width : popper.height)
                );
              }

              return defineProperty({}, mainSide, value);
            }
          };
          order.forEach(function(placement) {
            var side =
              ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
            popper = _extends({}, popper, check[side](placement));
          });
          data.offsets.popper = popper;
          return data;
        }
        /**
         * @function
         * @memberof Modifiers
         * @argument {Object} data - The data object generated by `update` method
         * @argument {Object} options - Modifiers configuration and options
         * @returns {Object} The data object, properly modified
         */

        function shift(data) {
          var placement = data.placement;
          var basePlacement = placement.split('-')[0];
          var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

          if (shiftvariation) {
            var _data$offsets = data.offsets;

            var reference = _data$offsets.reference;

            var popper = _data$offsets.popper;
            var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
            var side = isVertical ? 'left' : 'top';
            var measurement = isVertical ? 'width' : 'height';
            var shiftOffsets = {
              start: defineProperty({}, side, reference[side]),
              end: defineProperty(
                {},
                side,
                reference[side] + reference[measurement] - popper[measurement]
              )
            };
            data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
          }

          return data;
        }
        /**
         * @function
         * @memberof Modifiers
         * @argument {Object} data - The data object generated by update method
         * @argument {Object} options - Modifiers configuration and options
         * @returns {Object} The data object, properly modified
         */

        function hide(data) {
          if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
            return data;
          }

          var refRect = data.offsets.reference;
          var bound = find(data.instance.modifiers, function(modifier) {
            return modifier.name === 'preventOverflow';
          }).boundaries;

          if (
            refRect.bottom < bound.top ||
            refRect.left > bound.right ||
            refRect.top > bound.bottom ||
            refRect.right < bound.left
          ) {
            // Avoid unnecessary DOM access if visibility hasn't changed
            if (data.hide === true) {
              return data;
            }

            data.hide = true;
            data.attributes['x-out-of-boundaries'] = '';
          } else {
            // Avoid unnecessary DOM access if visibility hasn't changed
            if (data.hide === false) {
              return data;
            }

            data.hide = false;
            data.attributes['x-out-of-boundaries'] = false;
          }

          return data;
        }
        /**
         * @function
         * @memberof Modifiers
         * @argument {Object} data - The data object generated by `update` method
         * @argument {Object} options - Modifiers configuration and options
         * @returns {Object} The data object, properly modified
         */

        function inner(data) {
          var placement = data.placement;
          var basePlacement = placement.split('-')[0];
          var _data$offsets = data.offsets;

          var popper = _data$offsets.popper;

          var reference = _data$offsets.reference;
          var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
          var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
          popper[isHoriz ? 'left' : 'top'] =
            reference[basePlacement] -
            (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
          data.placement = getOppositePlacement(placement);
          data.offsets.popper = getClientRect(popper);
          return data;
        }
        /**
         * Modifier function, each modifier can have a function of this type assigned
         * to its `fn` property.<br />
         * These functions will be called on each update, this means that you must
         * make sure they are performant enough to avoid performance bottlenecks.
         *
         * @function ModifierFn
         * @argument {dataObject} data - The data object generated by `update` method
         * @argument {Object} options - Modifiers configuration and options
         * @returns {dataObject} The data object, properly modified
         */

        /**
         * Modifiers are plugins used to alter the behavior of your poppers.<br />
         * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
         * needed by the library.
         *
         * Usually you don't want to override the `order`, `fn` and `onLoad` props.
         * All the other properties are configurations that could be tweaked.
         * @namespace modifiers
         */

        var modifiers = {
          /**
           * Modifier used to shift the popper on the start or end of its reference
           * element.<br />
           * It will read the variation of the `placement` property.<br />
           * It can be one either `-end` or `-start`.
           * @memberof modifiers
           * @inner
           */
          shift: {
            /** @prop {number} order=100 - Index used to define the order of execution */
            order: 100,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: shift
          },

          /**
           * The `offset` modifier can shift your popper on both its axis.
           *
           * It accepts the following units:
           * - `px` or unit-less, interpreted as pixels
           * - `%` or `%r`, percentage relative to the length of the reference element
           * - `%p`, percentage relative to the length of the popper element
           * - `vw`, CSS viewport width unit
           * - `vh`, CSS viewport height unit
           *
           * For length is intended the main axis relative to the placement of the popper.<br />
           * This means that if the placement is `top` or `bottom`, the length will be the
           * `width`. In case of `left` or `right`, it will be the `height`.
           *
           * You can provide a single value (as `Number` or `String`), or a pair of values
           * as `String` divided by a comma or one (or more) white spaces.<br />
           * The latter is a deprecated method because it leads to confusion and will be
           * removed in v2.<br />
           * Additionally, it accepts additions and subtractions between different units.
           * Note that multiplications and divisions aren't supported.
           *
           * Valid examples are:
           * ```
           * 10
           * '10%'
           * '10, 10'
           * '10%, 10'
           * '10 + 10%'
           * '10 - 5vh + 3%'
           * '-10px + 5vh, 5px - 6%'
           * ```
           * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
           * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
           * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
           *
           * @memberof modifiers
           * @inner
           */
          offset: {
            /** @prop {number} order=200 - Index used to define the order of execution */
            order: 200,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: offset,

            /** @prop {Number|String} offset=0
             * The offset value as described in the modifier description
             */
            offset: 0
          },

          /**
           * Modifier used to prevent the popper from being positioned outside the boundary.
           *
           * A scenario exists where the reference itself is not within the boundaries.<br />
           * We can say it has "escaped the boundaries" — or just "escaped".<br />
           * In this case we need to decide whether the popper should either:
           *
           * - detach from the reference and remain "trapped" in the boundaries, or
           * - if it should ignore the boundary and "escape with its reference"
           *
           * When `escapeWithReference` is set to`true` and reference is completely
           * outside its boundaries, the popper will overflow (or completely leave)
           * the boundaries in order to remain attached to the edge of the reference.
           *
           * @memberof modifiers
           * @inner
           */
          preventOverflow: {
            /** @prop {number} order=300 - Index used to define the order of execution */
            order: 300,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: preventOverflow,

            /**
             * @prop {Array} [priority=['left','right','top','bottom']]
             * Popper will try to prevent overflow following these priorities by default,
             * then, it could overflow on the left and on top of the `boundariesElement`
             */
            priority: ['left', 'right', 'top', 'bottom'],

            /**
             * @prop {number} padding=5
             * Amount of pixel used to define a minimum distance between the boundaries
             * and the popper. This makes sure the popper always has a little padding
             * between the edges of its container
             */
            padding: 5,

            /**
             * @prop {String|HTMLElement} boundariesElement='scrollParent'
             * Boundaries used by the modifier. Can be `scrollParent`, `window`,
             * `viewport` or any DOM element.
             */
            boundariesElement: 'scrollParent'
          },

          /**
           * Modifier used to make sure the reference and its popper stay near each other
           * without leaving any gap between the two. Especially useful when the arrow is
           * enabled and you want to ensure that it points to its reference element.
           * It cares only about the first axis. You can still have poppers with margin
           * between the popper and its reference element.
           * @memberof modifiers
           * @inner
           */
          keepTogether: {
            /** @prop {number} order=400 - Index used to define the order of execution */
            order: 400,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: keepTogether
          },

          /**
           * This modifier is used to move the `arrowElement` of the popper to make
           * sure it is positioned between the reference element and its popper element.
           * It will read the outer size of the `arrowElement` node to detect how many
           * pixels of conjunction are needed.
           *
           * It has no effect if no `arrowElement` is provided.
           * @memberof modifiers
           * @inner
           */
          arrow: {
            /** @prop {number} order=500 - Index used to define the order of execution */
            order: 500,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: arrow,

            /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
            element: '[x-arrow]'
          },

          /**
           * Modifier used to flip the popper's placement when it starts to overlap its
           * reference element.
           *
           * Requires the `preventOverflow` modifier before it in order to work.
           *
           * **NOTE:** this modifier will interrupt the current update cycle and will
           * restart it if it detects the need to flip the placement.
           * @memberof modifiers
           * @inner
           */
          flip: {
            /** @prop {number} order=600 - Index used to define the order of execution */
            order: 600,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: flip,

            /**
             * @prop {String|Array} behavior='flip'
             * The behavior used to change the popper's placement. It can be one of
             * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
             * placements (with optional variations)
             */
            behavior: 'flip',

            /**
             * @prop {number} padding=5
             * The popper will flip if it hits the edges of the `boundariesElement`
             */
            padding: 5,

            /**
             * @prop {String|HTMLElement} boundariesElement='viewport'
             * The element which will define the boundaries of the popper position.
             * The popper will never be placed outside of the defined boundaries
             * (except if `keepTogether` is enabled)
             */
            boundariesElement: 'viewport'
          },

          /**
           * Modifier used to make the popper flow toward the inner of the reference element.
           * By default, when this modifier is disabled, the popper will be placed outside
           * the reference element.
           * @memberof modifiers
           * @inner
           */
          inner: {
            /** @prop {number} order=700 - Index used to define the order of execution */
            order: 700,

            /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
            enabled: false,

            /** @prop {ModifierFn} */
            fn: inner
          },

          /**
           * Modifier used to hide the popper when its reference element is outside of the
           * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
           * be used to hide with a CSS selector the popper when its reference is
           * out of boundaries.
           *
           * Requires the `preventOverflow` modifier before it in order to work.
           * @memberof modifiers
           * @inner
           */
          hide: {
            /** @prop {number} order=800 - Index used to define the order of execution */
            order: 800,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: hide
          },

          /**
           * Computes the style that will be applied to the popper element to gets
           * properly positioned.
           *
           * Note that this modifier will not touch the DOM, it just prepares the styles
           * so that `applyStyle` modifier can apply it. This separation is useful
           * in case you need to replace `applyStyle` with a custom implementation.
           *
           * This modifier has `850` as `order` value to maintain backward compatibility
           * with previous versions of Popper.js. Expect the modifiers ordering method
           * to change in future major versions of the library.
           *
           * @memberof modifiers
           * @inner
           */
          computeStyle: {
            /** @prop {number} order=850 - Index used to define the order of execution */
            order: 850,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: computeStyle,

            /**
             * @prop {Boolean} gpuAcceleration=true
             * If true, it uses the CSS 3D transformation to position the popper.
             * Otherwise, it will use the `top` and `left` properties
             */
            gpuAcceleration: true,

            /**
             * @prop {string} [x='bottom']
             * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
             * Change this if your popper should grow in a direction different from `bottom`
             */
            x: 'bottom',

            /**
             * @prop {string} [x='left']
             * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
             * Change this if your popper should grow in a direction different from `right`
             */
            y: 'right'
          },

          /**
           * Applies the computed styles to the popper element.
           *
           * All the DOM manipulations are limited to this modifier. This is useful in case
           * you want to integrate Popper.js inside a framework or view library and you
           * want to delegate all the DOM manipulations to it.
           *
           * Note that if you disable this modifier, you must make sure the popper element
           * has its position set to `absolute` before Popper.js can do its work!
           *
           * Just disable this modifier and define your own to achieve the desired effect.
           *
           * @memberof modifiers
           * @inner
           */
          applyStyle: {
            /** @prop {number} order=900 - Index used to define the order of execution */
            order: 900,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: applyStyle,

            /** @prop {Function} */
            onLoad: applyStyleOnLoad,

            /**
             * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
             * @prop {Boolean} gpuAcceleration=true
             * If true, it uses the CSS 3D transformation to position the popper.
             * Otherwise, it will use the `top` and `left` properties
             */
            gpuAcceleration: undefined
          }
        };
        /**
         * The `dataObject` is an object containing all the information used by Popper.js.
         * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
         * @name dataObject
         * @property {Object} data.instance The Popper.js instance
         * @property {String} data.placement Placement applied to popper
         * @property {String} data.originalPlacement Placement originally defined on init
         * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
         * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
         * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
         * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
         * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
         * @property {Object} data.boundaries Offsets of the popper boundaries
         * @property {Object} data.offsets The measurements of popper, reference and arrow elements
         * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
         * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
         * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
         */

        /**
         * Default options provided to Popper.js constructor.<br />
         * These can be overridden using the `options` argument of Popper.js.<br />
         * To override an option, simply pass an object with the same
         * structure of the `options` object, as the 3rd argument. For example:
         * ```
         * new Popper(ref, pop, {
         *   modifiers: {
         *     preventOverflow: { enabled: false }
         *   }
         * })
         * ```
         * @type {Object}
         * @static
         * @memberof Popper
         */

        var Defaults = {
          /**
           * Popper's placement.
           * @prop {Popper.placements} placement='bottom'
           */
          placement: 'bottom',

          /**
           * Set this to true if you want popper to position it self in 'fixed' mode
           * @prop {Boolean} positionFixed=false
           */
          positionFixed: false,

          /**
           * Whether events (resize, scroll) are initially enabled.
           * @prop {Boolean} eventsEnabled=true
           */
          eventsEnabled: true,

          /**
           * Set to true if you want to automatically remove the popper when
           * you call the `destroy` method.
           * @prop {Boolean} removeOnDestroy=false
           */
          removeOnDestroy: false,

          /**
           * Callback called when the popper is created.<br />
           * By default, it is set to no-op.<br />
           * Access Popper.js instance with `data.instance`.
           * @prop {onCreate}
           */
          onCreate: function onCreate() {},

          /**
           * Callback called when the popper is updated. This callback is not called
           * on the initialization/creation of the popper, but only on subsequent
           * updates.<br />
           * By default, it is set to no-op.<br />
           * Access Popper.js instance with `data.instance`.
           * @prop {onUpdate}
           */
          onUpdate: function onUpdate() {},

          /**
           * List of modifiers used to modify the offsets before they are applied to the popper.
           * They provide most of the functionalities of Popper.js.
           * @prop {modifiers}
           */
          modifiers: modifiers
        };
        /**
         * @callback onCreate
         * @param {dataObject} data
         */

        /**
         * @callback onUpdate
         * @param {dataObject} data
         */
        // Utils
        // Methods

        var Popper = (function() {
          /**
           * Creates a new Popper.js instance.
           * @class Popper
           * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
           * @param {HTMLElement} popper - The HTML element used as the popper
           * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
           * @return {Object} instance - The generated Popper.js instance
           */
          function Popper(reference, popper) {
            var _this = this;

            var options =
              arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            classCallCheck(this, Popper);

            this.scheduleUpdate = function() {
              return requestAnimationFrame(_this.update);
            }; // make update() debounced, so that it only runs at most once-per-tick

            this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

            this.options = _extends({}, Popper.Defaults, options); // init state

            this.state = {
              isDestroyed: false,
              isCreated: false,
              scrollParents: []
            }; // get reference and popper elements (allow jQuery wrappers)

            this.reference = reference && reference.jquery ? reference[0] : reference;
            this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

            this.options.modifiers = {};
            Object.keys(
              _extends({}, Popper.Defaults.modifiers, options.modifiers)
            ).forEach(function(name) {
              _this.options.modifiers[name] = _extends(
                {},
                Popper.Defaults.modifiers[name] || {},
                options.modifiers ? options.modifiers[name] : {}
              );
            }); // Refactoring modifiers' list (Object => Array)

            this.modifiers = Object.keys(this.options.modifiers)
              .map(function(name) {
                return _extends(
                  {
                    name: name
                  },
                  _this.options.modifiers[name]
                );
              }) // sort the modifiers by order
              .sort(function(a, b) {
                return a.order - b.order;
              }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
            // such code is executed in the same order of its modifier
            // they could add new properties to their options configuration
            // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

            this.modifiers.forEach(function(modifierOptions) {
              if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
                modifierOptions.onLoad(
                  _this.reference,
                  _this.popper,
                  _this.options,
                  modifierOptions,
                  _this.state
                );
              }
            }); // fire the first update to position the popper in the right place

            this.update();
            var eventsEnabled = this.options.eventsEnabled;

            if (eventsEnabled) {
              // setup event listeners, they will take care of update the position in specific situations
              this.enableEventListeners();
            }

            this.state.eventsEnabled = eventsEnabled;
          } // We can't use class properties because they don't get listed in the
          // class prototype and break stuff like Sinon stubs

          createClass(Popper, [
            {
              key: 'update',
              value: function update$$1() {
                return update.call(this);
              }
            },
            {
              key: 'destroy',
              value: function destroy$$1() {
                return destroy.call(this);
              }
            },
            {
              key: 'enableEventListeners',
              value: function enableEventListeners$$1() {
                return enableEventListeners.call(this);
              }
            },
            {
              key: 'disableEventListeners',
              value: function disableEventListeners$$1() {
                return disableEventListeners.call(this);
              }
              /**
               * Schedules an update. It will run on the next UI update available.
               * @method scheduleUpdate
               * @memberof Popper
               */

              /**
               * Collection of utilities useful when writing custom modifiers.
               * Starting from version 1.7, this method is available only if you
               * include `popper-utils.js` before `popper.js`.
               *
               * **DEPRECATION**: This way to access PopperUtils is deprecated
               * and will be removed in v2! Use the PopperUtils module directly instead.
               * Due to the high instability of the methods contained in Utils, we can't
               * guarantee them to follow semver. Use them at your own risk!
               * @static
               * @private
               * @type {Object}
               * @deprecated since version 1.8
               * @member Utils
               * @memberof Popper
               */
            }
          ]);
          return Popper;
        })();
        /**
         * The `referenceObject` is an object that provides an interface compatible with Popper.js
         * and lets you use it as replacement of a real DOM node.<br />
         * You can use this method to position a popper relatively to a set of coordinates
         * in case you don't have a DOM node to use as reference.
         *
         * ```
         * new Popper(referenceObject, popperNode);
         * ```
         *
         * NB: This feature isn't supported in Internet Explorer 10.
         * @name referenceObject
         * @property {Function} data.getBoundingClientRect
         * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
         * @property {number} data.clientWidth
         * An ES6 getter that will return the width of the virtual reference element.
         * @property {number} data.clientHeight
         * An ES6 getter that will return the height of the virtual reference element.
         */

        Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
        Popper.placements = placements;
        Popper.Defaults = Defaults;
        var _default = Popper;
        exports.default = _default;
      },
      {}
    ],
    'bootstrap.min.js': [
      function(require, module, exports) {
        var define;
        function _typeof(obj) {
          if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === 'function' &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
            };
          }
          return _typeof(obj);
        }

        /*!
         * Bootstrap v4.1.3 (https://getbootstrap.com/)
         * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         */
        !(function(t, e) {
          (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ==
            'object' && typeof module !== 'undefined'
            ? e(exports, require('jquery'), require('popper.js'))
            : typeof define === 'function' && define.amd
            ? define(['exports', 'jquery', 'popper.js'], e)
            : e((t.bootstrap = {}), t.jQuery, t.Popper);
        })(this, function(t, e, h) {
          'use strict';

          function i(t, e) {
            for (var n = 0; n < e.length; n++) {
              var i = e[n];
              (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                'value' in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i);
            }
          }

          function s(t, e, n) {
            return e && i(t.prototype, e), n && i(t, n), t;
          }

          function l(r) {
            for (var t = 1; t < arguments.length; t++) {
              var o = arguments[t] != null ? arguments[t] : {};

              var e = Object.keys(o);
              typeof Object.getOwnPropertySymbols === 'function' &&
                (e = e.concat(
                  Object.getOwnPropertySymbols(o).filter(function(t) {
                    return Object.getOwnPropertyDescriptor(o, t).enumerable;
                  })
                )),
                e.forEach(function(t) {
                  var e, n, i;
                  (e = r),
                    (i = o[(n = t)]),
                    n in e
                      ? Object.defineProperty(e, n, {
                          value: i,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0
                        })
                      : (e[n] = i);
                });
            }

            return r;
          }

          (e = e && e.hasOwnProperty('default') ? e.default : e),
            (h = h && h.hasOwnProperty('default') ? h.default : h);

          var r;

          var n;

          var o;

          var a;

          var c;

          var u;

          var f;

          var d;

          var g;

          var _;

          var m;

          var p;

          var v;

          var y;

          var E;

          var C;

          var T;

          var b;

          var S;

          var I;

          var A;

          var D;

          var w;

          var N;

          var O;

          var k;

          var P;

          var j;

          var H;

          var L;

          var R;

          var x;

          var W;

          var U;

          var q;

          var F;

          var K;

          var M;

          var Q;

          var B;

          var V;

          var Y;

          var z;

          var J;

          var Z;

          var G;

          var $;

          var X;

          var tt;

          var et;

          var nt;

          var it;

          var rt;

          var ot;

          var st;

          var at;

          var lt;

          var ct;

          var ht;

          var ut;

          var ft;

          var dt;

          var gt;

          var _t;

          var mt;

          var pt;

          var vt;

          var yt;

          var Et;

          var Ct;

          var Tt;

          var bt;

          var St;

          var It;

          var At;

          var Dt;

          var wt;

          var Nt;

          var Ot;

          var kt;

          var Pt;

          var jt;

          var Ht;

          var Lt;

          var Rt;

          var xt;

          var Wt;

          var Ut;

          var qt;

          var Ft;

          var Kt;

          var Mt;

          var Qt;

          var Bt;

          var Vt;

          var Yt;

          var zt;

          var Jt;

          var Zt;

          var Gt;

          var $t;

          var Xt;

          var te;

          var ee;

          var ne;

          var ie;

          var re;

          var oe;

          var se;

          var ae;

          var le;

          var ce;

          var he;

          var ue;

          var fe;

          var de;

          var ge;

          var _e;

          var me;

          var pe;

          var ve;

          var ye;

          var Ee;

          var Ce;

          var Te;

          var be;

          var Se;

          var Ie;

          var Ae;

          var De;

          var we;

          var Ne;

          var Oe;

          var ke;

          var Pe;

          var je;

          var He;

          var Le;

          var Re;

          var xe;

          var We;

          var Ue;

          var qe;

          var Fe;

          var Ke;

          var Me;

          var Qe;

          var Be;

          var Ve;

          var Ye;

          var ze;

          var Je;

          var Ze;

          var Ge;

          var $e;

          var Xe;

          var tn;

          var en;

          var nn;

          var rn;

          var on;

          var sn;

          var an;

          var ln;

          var cn;

          var hn;

          var un;

          var fn;

          var dn;

          var gn;

          var _n;

          var mn;

          var pn;

          var vn;

          var yn;

          var En;

          var Cn;

          var Tn;

          var bn;

          var Sn;

          var In;

          var An;

          var Dn;

          var wn;

          var Nn;

          var On;

          var kn;

          var Pn;

          var jn;

          var Hn;

          var Ln;

          var Rn;

          var xn;

          var Wn;

          var Un;

          var qn;

          var Fn = (function(i) {
            var e = 'transitionend';

            function t(t) {
              var e = this;

              var n = !1;
              return (
                i(this).one(l.TRANSITION_END, function() {
                  n = !0;
                }),
                setTimeout(function() {
                  n || l.triggerTransitionEnd(e);
                }, t),
                this
              );
            }

            var l = {
              TRANSITION_END: 'bsTransitionEnd',
              getUID: function getUID(t) {
                for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); ) {}

                return t;
              },
              getSelectorFromElement: function getSelectorFromElement(t) {
                var e = t.getAttribute('data-target');
                (e && e !== '#') || (e = t.getAttribute('href') || '');

                try {
                  return document.querySelector(e) ? e : null;
                } catch (t) {
                  return null;
                }
              },
              getTransitionDurationFromElement: function getTransitionDurationFromElement(
                t
              ) {
                if (!t) return 0;
                var e = i(t).css('transition-duration');
                return parseFloat(e) ? ((e = e.split(',')[0]), 1e3 * parseFloat(e)) : 0;
              },
              reflow: function reflow(t) {
                return t.offsetHeight;
              },
              triggerTransitionEnd: function triggerTransitionEnd(t) {
                i(t).trigger(e);
              },
              supportsTransitionEnd: function supportsTransitionEnd() {
                return Boolean(e);
              },
              isElement: function isElement(t) {
                return (t[0] || t).nodeType;
              },
              typeCheckConfig: function typeCheckConfig(t, e, n) {
                for (var i in n) {
                  if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var r = n[i];

                    var o = e[i];

                    var s =
                      o && l.isElement(o)
                        ? 'element'
                        : ((a = o),
                          {}.toString
                            .call(a)
                            .match(/\s([a-z]+)/i)[1]
                            .toLowerCase());
                    if (!new RegExp(r).test(s)) {
                      throw new Error(
                        t.toUpperCase() +
                          ': Option "' +
                          i +
                          '" provided type "' +
                          s +
                          '" but expected type "' +
                          r +
                          '".'
                      );
                    }
                  }
                }

                var a;
              }
            };
            return (
              (i.fn.emulateTransitionEnd = t),
              (i.event.special[l.TRANSITION_END] = {
                bindType: e,
                delegateType: e,
                handle: function handle(t) {
                  if (i(t.target).is(this)) {
                    return t.handleObj.handler.apply(this, arguments);
                  }
                }
              }),
              l
            );
          })(e);

          var Kn = ((n = 'alert'),
          (a = '.' + (o = 'bs.alert')),
          (c = (r = e).fn[n]),
          (u = {
            CLOSE: 'close' + a,
            CLOSED: 'closed' + a,
            CLICK_DATA_API: 'click' + a + '.data-api'
          }),
          (f = 'alert'),
          (d = 'fade'),
          (g = 'show'),
          (_ = (function() {
            function i(t) {
              this._element = t;
            }

            var t = i.prototype;
            return (
              (t.close = function(t) {
                var e = this._element;
                t && (e = this._getRootElement(t)),
                  this._triggerCloseEvent(e).isDefaultPrevented() ||
                    this._removeElement(e);
              }),
              (t.dispose = function() {
                r.removeData(this._element, o), (this._element = null);
              }),
              (t._getRootElement = function(t) {
                var e = Fn.getSelectorFromElement(t);

                var n = !1;
                return (
                  e && (n = document.querySelector(e)),
                  n || (n = r(t).closest('.' + f)[0]),
                  n
                );
              }),
              (t._triggerCloseEvent = function(t) {
                var e = r.Event(u.CLOSE);
                return r(t).trigger(e), e;
              }),
              (t._removeElement = function(e) {
                var n = this;

                if ((r(e).removeClass(g), r(e).hasClass(d))) {
                  var t = Fn.getTransitionDurationFromElement(e);
                  r(e)
                    .one(Fn.TRANSITION_END, function(t) {
                      return n._destroyElement(e, t);
                    })
                    .emulateTransitionEnd(t);
                } else this._destroyElement(e);
              }),
              (t._destroyElement = function(t) {
                r(t)
                  .detach()
                  .trigger(u.CLOSED)
                  .remove();
              }),
              (i._jQueryInterface = function(n) {
                return this.each(function() {
                  var t = r(this);

                  var e = t.data(o);
                  e || ((e = new i(this)), t.data(o, e)), n === 'close' && e[n](this);
                });
              }),
              (i._handleDismiss = function(e) {
                return function(t) {
                  t && t.preventDefault(), e.close(this);
                };
              }),
              s(i, null, [
                {
                  key: 'VERSION',
                  get: function get() {
                    return '4.1.3';
                  }
                }
              ]),
              i
            );
          })()),
          r(document).on(
            u.CLICK_DATA_API,
            '[data-dismiss="alert"]',
            _._handleDismiss(new _())
          ),
          (r.fn[n] = _._jQueryInterface),
          (r.fn[n].Constructor = _),
          (r.fn[n].noConflict = function() {
            return (r.fn[n] = c), _._jQueryInterface;
          }),
          _);

          var Mn = ((p = 'button'),
          (y = '.' + (v = 'bs.button')),
          (E = '.data-api'),
          (C = (m = e).fn[p]),
          (T = 'active'),
          (b = 'btn'),
          (I = '[data-toggle^="button"]'),
          (A = '[data-toggle="buttons"]'),
          (D = 'input'),
          (w = '.active'),
          (N = '.btn'),
          (O = {
            CLICK_DATA_API: 'click' + y + E,
            FOCUS_BLUR_DATA_API: (S = 'focus') + y + E + ' blur' + y + E
          }),
          (k = (function() {
            function n(t) {
              this._element = t;
            }

            var t = n.prototype;
            return (
              (t.toggle = function() {
                var t = !0;

                var e = !0;

                var n = m(this._element).closest(A)[0];

                if (n) {
                  var i = this._element.querySelector(D);

                  if (i) {
                    if (i.type === 'radio') {
                      if (i.checked && this._element.classList.contains(T)) t = !1;
                      else {
                        var r = n.querySelector(w);
                        r && m(r).removeClass(T);
                      }
                    }

                    if (t) {
                      if (
                        i.hasAttribute('disabled') ||
                        n.hasAttribute('disabled') ||
                        i.classList.contains('disabled') ||
                        n.classList.contains('disabled')
                      ) {
                        return;
                      }
                      (i.checked = !this._element.classList.contains(T)),
                        m(i).trigger('change');
                    }

                    i.focus(), (e = !1);
                  }
                }

                e &&
                  this._element.setAttribute(
                    'aria-pressed',
                    !this._element.classList.contains(T)
                  ),
                  t && m(this._element).toggleClass(T);
              }),
              (t.dispose = function() {
                m.removeData(this._element, v), (this._element = null);
              }),
              (n._jQueryInterface = function(e) {
                return this.each(function() {
                  var t = m(this).data(v);
                  t || ((t = new n(this)), m(this).data(v, t)),
                    e === 'toggle' && t[e]();
                });
              }),
              s(n, null, [
                {
                  key: 'VERSION',
                  get: function get() {
                    return '4.1.3';
                  }
                }
              ]),
              n
            );
          })()),
          m(document)
            .on(O.CLICK_DATA_API, I, function(t) {
              t.preventDefault();
              var e = t.target;
              m(e).hasClass(b) || (e = m(e).closest(N)),
                k._jQueryInterface.call(m(e), 'toggle');
            })
            .on(O.FOCUS_BLUR_DATA_API, I, function(t) {
              var e = m(t.target).closest(N)[0];
              m(e).toggleClass(S, /^focus(in)?$/.test(t.type));
            }),
          (m.fn[p] = k._jQueryInterface),
          (m.fn[p].Constructor = k),
          (m.fn[p].noConflict = function() {
            return (m.fn[p] = C), k._jQueryInterface;
          }),
          k);

          var Qn = ((j = 'carousel'),
          (L = '.' + (H = 'bs.carousel')),
          (R = '.data-api'),
          (x = (P = e).fn[j]),
          (W = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: 'hover',
            wrap: !0
          }),
          (U = {
            interval: '(number|boolean)',
            keyboard: 'boolean',
            slide: '(boolean|string)',
            pause: '(string|boolean)',
            wrap: 'boolean'
          }),
          (q = 'next'),
          (F = 'prev'),
          (K = 'left'),
          (M = 'right'),
          (Q = {
            SLIDE: 'slide' + L,
            SLID: 'slid' + L,
            KEYDOWN: 'keydown' + L,
            MOUSEENTER: 'mouseenter' + L,
            MOUSELEAVE: 'mouseleave' + L,
            TOUCHEND: 'touchend' + L,
            LOAD_DATA_API: 'load' + L + R,
            CLICK_DATA_API: 'click' + L + R
          }),
          (B = 'carousel'),
          (V = 'active'),
          (Y = 'slide'),
          (z = 'carousel-item-right'),
          (J = 'carousel-item-left'),
          (Z = 'carousel-item-next'),
          (G = 'carousel-item-prev'),
          ($ = '.active'),
          (X = '.active.carousel-item'),
          (tt = '.carousel-item'),
          (et = '.carousel-item-next, .carousel-item-prev'),
          (nt = '.carousel-indicators'),
          (it = '[data-slide], [data-slide-to]'),
          (rt = '[data-ride="carousel"]'),
          (ot = (function() {
            function o(t, e) {
              (this._items = null),
                (this._interval = null),
                (this._activeElement = null),
                (this._isPaused = !1),
                (this._isSliding = !1),
                (this.touchTimeout = null),
                (this._config = this._getConfig(e)),
                (this._element = P(t)[0]),
                (this._indicatorsElement = this._element.querySelector(nt)),
                this._addEventListeners();
            }

            var t = o.prototype;
            return (
              (t.next = function() {
                this._isSliding || this._slide(q);
              }),
              (t.nextWhenVisible = function() {
                !document.hidden &&
                  P(this._element).is(':visible') &&
                  P(this._element).css('visibility') !== 'hidden' &&
                  this.next();
              }),
              (t.prev = function() {
                this._isSliding || this._slide(F);
              }),
              (t.pause = function(t) {
                t || (this._isPaused = !0),
                  this._element.querySelector(et) &&
                    (Fn.triggerTransitionEnd(this._element), this.cycle(!0)),
                  clearInterval(this._interval),
                  (this._interval = null);
              }),
              (t.cycle = function(t) {
                t || (this._isPaused = !1),
                  this._interval &&
                    (clearInterval(this._interval), (this._interval = null)),
                  this._config.interval &&
                    !this._isPaused &&
                    (this._interval = setInterval(
                      (document.visibilityState
                        ? this.nextWhenVisible
                        : this.next
                      ).bind(this),
                      this._config.interval
                    ));
              }),
              (t.to = function(t) {
                var e = this;
                this._activeElement = this._element.querySelector(X);

                var n = this._getItemIndex(this._activeElement);

                if (!(t > this._items.length - 1 || t < 0)) {
                  if (this._isSliding) {
                    P(this._element).one(Q.SLID, function() {
                      return e.to(t);
                    });
                  } else {
                    if (n === t) return this.pause(), void this.cycle();
                    var i = n < t ? q : F;

                    this._slide(i, this._items[t]);
                  }
                }
              }),
              (t.dispose = function() {
                P(this._element).off(L),
                  P.removeData(this._element, H),
                  (this._items = null),
                  (this._config = null),
                  (this._element = null),
                  (this._interval = null),
                  (this._isPaused = null),
                  (this._isSliding = null),
                  (this._activeElement = null),
                  (this._indicatorsElement = null);
              }),
              (t._getConfig = function(t) {
                return (t = l({}, W, t)), Fn.typeCheckConfig(j, t, U), t;
              }),
              (t._addEventListeners = function() {
                var e = this;
                this._config.keyboard &&
                  P(this._element).on(Q.KEYDOWN, function(t) {
                    return e._keydown(t);
                  }),
                  this._config.pause === 'hover' &&
                    (P(this._element)
                      .on(Q.MOUSEENTER, function(t) {
                        return e.pause(t);
                      })
                      .on(Q.MOUSELEAVE, function(t) {
                        return e.cycle(t);
                      }),
                    'ontouchstart' in document.documentElement &&
                      P(this._element).on(Q.TOUCHEND, function() {
                        e.pause(),
                          e.touchTimeout && clearTimeout(e.touchTimeout),
                          (e.touchTimeout = setTimeout(function(t) {
                            return e.cycle(t);
                          }, 500 + e._config.interval));
                      }));
              }),
              (t._keydown = function(t) {
                if (!/input|textarea/i.test(t.target.tagName)) {
                  switch (t.which) {
                    case 37:
                      t.preventDefault(), this.prev();
                      break;

                    case 39:
                      t.preventDefault(), this.next();
                  }
                }
              }),
              (t._getItemIndex = function(t) {
                return (
                  (this._items =
                    t && t.parentNode
                      ? [].slice.call(t.parentNode.querySelectorAll(tt))
                      : []),
                  this._items.indexOf(t)
                );
              }),
              (t._getItemByDirection = function(t, e) {
                var n = t === q;

                var i = t === F;

                var r = this._getItemIndex(e);

                var o = this._items.length - 1;

                if (((i && r === 0) || (n && r === o)) && !this._config.wrap) {
                  return e;
                }
                var s = (r + (t === F ? -1 : 1)) % this._items.length;
                return s === -1 ? this._items[this._items.length - 1] : this._items[s];
              }),
              (t._triggerSlideEvent = function(t, e) {
                var n = this._getItemIndex(t);

                var i = this._getItemIndex(this._element.querySelector(X));

                var r = P.Event(Q.SLIDE, {
                  relatedTarget: t,
                  direction: e,
                  from: i,
                  to: n
                });

                return P(this._element).trigger(r), r;
              }),
              (t._setActiveIndicatorElement = function(t) {
                if (this._indicatorsElement) {
                  var e = [].slice.call(this._indicatorsElement.querySelectorAll($));
                  P(e).removeClass(V);

                  var n = this._indicatorsElement.children[this._getItemIndex(t)];

                  n && P(n).addClass(V);
                }
              }),
              (t._slide = function(t, e) {
                var n;

                var i;

                var r;

                var o = this;

                var s = this._element.querySelector(X);

                var a = this._getItemIndex(s);

                var l = e || (s && this._getItemByDirection(t, s));

                var c = this._getItemIndex(l);

                var h = Boolean(this._interval);

                if (
                  (t === q ? ((n = J), (i = Z), (r = K)) : ((n = z), (i = G), (r = M)),
                  l && P(l).hasClass(V))
                ) {
                  this._isSliding = !1;
                } else if (
                  !this._triggerSlideEvent(l, r).isDefaultPrevented() &&
                  s &&
                  l
                ) {
                  (this._isSliding = !0),
                    h && this.pause(),
                    this._setActiveIndicatorElement(l);
                  var u = P.Event(Q.SLID, {
                    relatedTarget: l,
                    direction: r,
                    from: a,
                    to: c
                  });

                  if (P(this._element).hasClass(Y)) {
                    P(l).addClass(i), Fn.reflow(l), P(s).addClass(n), P(l).addClass(n);
                    var f = Fn.getTransitionDurationFromElement(s);
                    P(s)
                      .one(Fn.TRANSITION_END, function() {
                        P(l)
                          .removeClass(n + ' ' + i)
                          .addClass(V),
                          P(s).removeClass(V + ' ' + i + ' ' + n),
                          (o._isSliding = !1),
                          setTimeout(function() {
                            return P(o._element).trigger(u);
                          }, 0);
                      })
                      .emulateTransitionEnd(f);
                  } else {
                    P(s).removeClass(V),
                      P(l).addClass(V),
                      (this._isSliding = !1),
                      P(this._element).trigger(u);
                  }

                  h && this.cycle();
                }
              }),
              (o._jQueryInterface = function(i) {
                return this.each(function() {
                  var t = P(this).data(H);

                  var e = l({}, W, P(this).data());
                  _typeof(i) == 'object' && (e = l({}, e, i));
                  var n = typeof i === 'string' ? i : e.slide;
                  if (
                    (t || ((t = new o(this, e)), P(this).data(H, t)),
                    typeof i === 'number')
                  ) {
                    t.to(i);
                  } else if (typeof n === 'string') {
                    if (typeof t[n] === 'undefined') {
                      throw new TypeError('No method named "' + n + '"');
                    }
                    t[n]();
                  } else e.interval && (t.pause(), t.cycle());
                });
              }),
              (o._dataApiClickHandler = function(t) {
                var e = Fn.getSelectorFromElement(this);

                if (e) {
                  var n = P(e)[0];

                  if (n && P(n).hasClass(B)) {
                    var i = l({}, P(n).data(), P(this).data());

                    var r = this.getAttribute('data-slide-to');
                    r && (i.interval = !1),
                      o._jQueryInterface.call(P(n), i),
                      r &&
                        P(n)
                          .data(H)
                          .to(r),
                      t.preventDefault();
                  }
                }
              }),
              s(o, null, [
                {
                  key: 'VERSION',
                  get: function get() {
                    return '4.1.3';
                  }
                },
                {
                  key: 'Default',
                  get: function get() {
                    return W;
                  }
                }
              ]),
              o
            );
          })()),
          P(document).on(Q.CLICK_DATA_API, it, ot._dataApiClickHandler),
          P(window).on(Q.LOAD_DATA_API, function() {
            for (
              var t = [].slice.call(document.querySelectorAll(rt)), e = 0, n = t.length;
              e < n;
              e++
            ) {
              var i = P(t[e]);

              ot._jQueryInterface.call(i, i.data());
            }
          }),
          (P.fn[j] = ot._jQueryInterface),
          (P.fn[j].Constructor = ot),
          (P.fn[j].noConflict = function() {
            return (P.fn[j] = x), ot._jQueryInterface;
          }),
          ot);

          var Bn = ((at = 'collapse'),
          (ct = '.' + (lt = 'bs.collapse')),
          (ht = (st = e).fn[at]),
          (ut = {
            toggle: !0,
            parent: ''
          }),
          (ft = {
            toggle: 'boolean',
            parent: '(string|element)'
          }),
          (dt = {
            SHOW: 'show' + ct,
            SHOWN: 'shown' + ct,
            HIDE: 'hide' + ct,
            HIDDEN: 'hidden' + ct,
            CLICK_DATA_API: 'click' + ct + '.data-api'
          }),
          (gt = 'show'),
          (_t = 'collapse'),
          (mt = 'collapsing'),
          (pt = 'collapsed'),
          (vt = 'width'),
          (yt = 'height'),
          (Et = '.show, .collapsing'),
          (Ct = '[data-toggle="collapse"]'),
          (Tt = (function() {
            function a(e, t) {
              (this._isTransitioning = !1),
                (this._element = e),
                (this._config = this._getConfig(t)),
                (this._triggerArray = st.makeArray(
                  document.querySelectorAll(
                    '[data-toggle="collapse"][href="#' +
                      e.id +
                      '"],[data-toggle="collapse"][data-target="#' +
                      e.id +
                      '"]'
                  )
                ));

              for (
                var n = [].slice.call(document.querySelectorAll(Ct)),
                  i = 0,
                  r = n.length;
                i < r;
                i++
              ) {
                var o = n[i];

                var s = Fn.getSelectorFromElement(o);

                var a = [].slice.call(document.querySelectorAll(s)).filter(function(t) {
                  return t === e;
                });
                s !== null &&
                  a.length > 0 &&
                  ((this._selector = s), this._triggerArray.push(o));
              }

              (this._parent = this._config.parent ? this._getParent() : null),
                this._config.parent ||
                  this._addAriaAndCollapsedClass(this._element, this._triggerArray),
                this._config.toggle && this.toggle();
            }

            var t = a.prototype;
            return (
              (t.toggle = function() {
                st(this._element).hasClass(gt) ? this.hide() : this.show();
              }),
              (t.show = function() {
                var t;

                var e;

                var n = this;

                if (
                  !this._isTransitioning &&
                  !st(this._element).hasClass(gt) &&
                  (this._parent &&
                    (t = [].slice
                      .call(this._parent.querySelectorAll(Et))
                      .filter(function(t) {
                        return t.getAttribute('data-parent') === n._config.parent;
                      })).length === 0 &&
                    (t = null),
                  !(
                    t &&
                    (e = st(t)
                      .not(this._selector)
                      .data(lt)) &&
                    e._isTransitioning
                  ))
                ) {
                  var i = st.Event(dt.SHOW);

                  if ((st(this._element).trigger(i), !i.isDefaultPrevented())) {
                    t &&
                      (a._jQueryInterface.call(st(t).not(this._selector), 'hide'),
                      e || st(t).data(lt, null));

                    var r = this._getDimension();

                    st(this._element)
                      .removeClass(_t)
                      .addClass(mt),
                      (this._element.style[r] = 0),
                      this._triggerArray.length &&
                        st(this._triggerArray)
                          .removeClass(pt)
                          .attr('aria-expanded', !0),
                      this.setTransitioning(!0);
                    var o = 'scroll' + (r[0].toUpperCase() + r.slice(1));

                    var s = Fn.getTransitionDurationFromElement(this._element);
                    st(this._element)
                      .one(Fn.TRANSITION_END, function() {
                        st(n._element)
                          .removeClass(mt)
                          .addClass(_t)
                          .addClass(gt),
                          (n._element.style[r] = ''),
                          n.setTransitioning(!1),
                          st(n._element).trigger(dt.SHOWN);
                      })
                      .emulateTransitionEnd(s),
                      (this._element.style[r] = this._element[o] + 'px');
                  }
                }
              }),
              (t.hide = function() {
                var t = this;

                if (!this._isTransitioning && st(this._element).hasClass(gt)) {
                  var e = st.Event(dt.HIDE);

                  if ((st(this._element).trigger(e), !e.isDefaultPrevented())) {
                    var n = this._getDimension();

                    (this._element.style[n] =
                      this._element.getBoundingClientRect()[n] + 'px'),
                      Fn.reflow(this._element),
                      st(this._element)
                        .addClass(mt)
                        .removeClass(_t)
                        .removeClass(gt);
                    var i = this._triggerArray.length;
                    if (i > 0) {
                      for (var r = 0; r < i; r++) {
                        var o = this._triggerArray[r];

                        var s = Fn.getSelectorFromElement(o);
                        if (s !== null) {
                          st([].slice.call(document.querySelectorAll(s))).hasClass(
                            gt
                          ) ||
                            st(o)
                              .addClass(pt)
                              .attr('aria-expanded', !1);
                        }
                      }
                    }
                    this.setTransitioning(!0);
                    this._element.style[n] = '';
                    var a = Fn.getTransitionDurationFromElement(this._element);
                    st(this._element)
                      .one(Fn.TRANSITION_END, function() {
                        t.setTransitioning(!1),
                          st(t._element)
                            .removeClass(mt)
                            .addClass(_t)
                            .trigger(dt.HIDDEN);
                      })
                      .emulateTransitionEnd(a);
                  }
                }
              }),
              (t.setTransitioning = function(t) {
                this._isTransitioning = t;
              }),
              (t.dispose = function() {
                st.removeData(this._element, lt),
                  (this._config = null),
                  (this._parent = null),
                  (this._element = null),
                  (this._triggerArray = null),
                  (this._isTransitioning = null);
              }),
              (t._getConfig = function(t) {
                return (
                  ((t = l({}, ut, t)).toggle = Boolean(t.toggle)),
                  Fn.typeCheckConfig(at, t, ft),
                  t
                );
              }),
              (t._getDimension = function() {
                return st(this._element).hasClass(vt) ? vt : yt;
              }),
              (t._getParent = function() {
                var n = this;

                var t = null;
                Fn.isElement(this._config.parent)
                  ? ((t = this._config.parent),
                    typeof this._config.parent.jquery !== 'undefined' &&
                      (t = this._config.parent[0]))
                  : (t = document.querySelector(this._config.parent));
                var e =
                  '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

                var i = [].slice.call(t.querySelectorAll(e));
                return (
                  st(i).each(function(t, e) {
                    n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e]);
                  }),
                  t
                );
              }),
              (t._addAriaAndCollapsedClass = function(t, e) {
                if (t) {
                  var n = st(t).hasClass(gt);
                  e.length &&
                    st(e)
                      .toggleClass(pt, !n)
                      .attr('aria-expanded', n);
                }
              }),
              (a._getTargetFromElement = function(t) {
                var e = Fn.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null;
              }),
              (a._jQueryInterface = function(i) {
                return this.each(function() {
                  var t = st(this);

                  var e = t.data(lt);

                  var n = l({}, ut, t.data(), _typeof(i) == 'object' && i ? i : {});

                  if (
                    (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1),
                    e || ((e = new a(this, n)), t.data(lt, e)),
                    typeof i === 'string')
                  ) {
                    if (typeof e[i] === 'undefined') {
                      throw new TypeError('No method named "' + i + '"');
                    }
                    e[i]();
                  }
                });
              }),
              s(a, null, [
                {
                  key: 'VERSION',
                  get: function get() {
                    return '4.1.3';
                  }
                },
                {
                  key: 'Default',
                  get: function get() {
                    return ut;
                  }
                }
              ]),
              a
            );
          })()),
          st(document).on(dt.CLICK_DATA_API, Ct, function(t) {
            t.currentTarget.tagName === 'A' && t.preventDefault();
            var n = st(this);

            var e = Fn.getSelectorFromElement(this);

            var i = [].slice.call(document.querySelectorAll(e));
            st(i).each(function() {
              var t = st(this);

              var e = t.data(lt) ? 'toggle' : n.data();

              Tt._jQueryInterface.call(t, e);
            });
          }),
          (st.fn[at] = Tt._jQueryInterface),
          (st.fn[at].Constructor = Tt),
          (st.fn[at].noConflict = function() {
            return (st.fn[at] = ht), Tt._jQueryInterface;
          }),
          Tt);

          var Vn = ((St = 'dropdown'),
          (At = '.' + (It = 'bs.dropdown')),
          (Dt = '.data-api'),
          (wt = (bt = e).fn[St]),
          (Nt = new RegExp('38|40|27')),
          (Ot = {
            HIDE: 'hide' + At,
            HIDDEN: 'hidden' + At,
            SHOW: 'show' + At,
            SHOWN: 'shown' + At,
            CLICK: 'click' + At,
            CLICK_DATA_API: 'click' + At + Dt,
            KEYDOWN_DATA_API: 'keydown' + At + Dt,
            KEYUP_DATA_API: 'keyup' + At + Dt
          }),
          (kt = 'disabled'),
          (Pt = 'show'),
          (jt = 'dropup'),
          (Ht = 'dropright'),
          (Lt = 'dropleft'),
          (Rt = 'dropdown-menu-right'),
          (xt = 'position-static'),
          (Wt = '[data-toggle="dropdown"]'),
          (Ut = '.dropdown form'),
          (qt = '.dropdown-menu'),
          (Ft = '.navbar-nav'),
          (Kt = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'),
          (Mt = 'top-start'),
          (Qt = 'top-end'),
          (Bt = 'bottom-start'),
          (Vt = 'bottom-end'),
          (Yt = 'right-start'),
          (zt = 'left-start'),
          (Jt = {
            offset: 0,
            flip: !0,
            boundary: 'scrollParent',
            reference: 'toggle',
            display: 'dynamic'
          }),
          (Zt = {
            offset: '(number|string|function)',
            flip: 'boolean',
            boundary: '(string|element)',
            reference: '(string|element)',
            display: 'string'
          }),
          (Gt = (function() {
            function c(t, e) {
              (this._element = t),
                (this._popper = null),
                (this._config = this._getConfig(e)),
                (this._menu = this._getMenuElement()),
                (this._inNavbar = this._detectNavbar()),
                this._addEventListeners();
            }

            var t = c.prototype;
            return (
              (t.toggle = function() {
                if (!this._element.disabled && !bt(this._element).hasClass(kt)) {
                  var t = c._getParentFromElement(this._element);

                  var e = bt(this._menu).hasClass(Pt);

                  if ((c._clearMenus(), !e)) {
                    var n = {
                      relatedTarget: this._element
                    };

                    var i = bt.Event(Ot.SHOW, n);

                    if ((bt(t).trigger(i), !i.isDefaultPrevented())) {
                      if (!this._inNavbar) {
                        if (typeof h === 'undefined') {
                          throw new TypeError(
                            'Bootstrap dropdown require Popper.js (https://popper.js.org)'
                          );
                        }
                        var r = this._element;
                        this._config.reference === 'parent'
                          ? (r = t)
                          : Fn.isElement(this._config.reference) &&
                            ((r = this._config.reference),
                            typeof this._config.reference.jquery !== 'undefined' &&
                              (r = this._config.reference[0])),
                          this._config.boundary !== 'scrollParent' &&
                            bt(t).addClass(xt),
                          (this._popper = new h(
                            r,
                            this._menu,
                            this._getPopperConfig()
                          ));
                      }

                      'ontouchstart' in document.documentElement &&
                        bt(t).closest(Ft).length === 0 &&
                        bt(document.body)
                          .children()
                          .on('mouseover', null, bt.noop),
                        this._element.focus(),
                        this._element.setAttribute('aria-expanded', !0),
                        bt(this._menu).toggleClass(Pt),
                        bt(t)
                          .toggleClass(Pt)
                          .trigger(bt.Event(Ot.SHOWN, n));
                    }
                  }
                }
              }),
              (t.dispose = function() {
                bt.removeData(this._element, It),
                  bt(this._element).off(At),
                  (this._element = null),
                  (this._menu = null) !== this._popper &&
                    (this._popper.destroy(), (this._popper = null));
              }),
              (t.update = function() {
                (this._inNavbar = this._detectNavbar()),
                  this._popper !== null && this._popper.scheduleUpdate();
              }),
              (t._addEventListeners = function() {
                var e = this;
                bt(this._element).on(Ot.CLICK, function(t) {
                  t.preventDefault(), t.stopPropagation(), e.toggle();
                });
              }),
              (t._getConfig = function(t) {
                return (
                  (t = l({}, this.constructor.Default, bt(this._element).data(), t)),
                  Fn.typeCheckConfig(St, t, this.constructor.DefaultType),
                  t
                );
              }),
              (t._getMenuElement = function() {
                if (!this._menu) {
                  var t = c._getParentFromElement(this._element);

                  t && (this._menu = t.querySelector(qt));
                }

                return this._menu;
              }),
              (t._getPlacement = function() {
                var t = bt(this._element.parentNode);

                var e = Bt;
                return (
                  t.hasClass(jt)
                    ? ((e = Mt), bt(this._menu).hasClass(Rt) && (e = Qt))
                    : t.hasClass(Ht)
                    ? (e = Yt)
                    : t.hasClass(Lt)
                    ? (e = zt)
                    : bt(this._menu).hasClass(Rt) && (e = Vt),
                  e
                );
              }),
              (t._detectNavbar = function() {
                return bt(this._element).closest('.navbar').length > 0;
              }),
              (t._getPopperConfig = function() {
                var e = this;

                var t = {};
                typeof this._config.offset === 'function'
                  ? (t.fn = function(t) {
                      return (
                        (t.offsets = l(
                          {},
                          t.offsets,
                          e._config.offset(t.offsets) || {}
                        )),
                        t
                      );
                    })
                  : (t.offset = this._config.offset);
                var n = {
                  placement: this._getPlacement(),
                  modifiers: {
                    offset: t,
                    flip: {
                      enabled: this._config.flip
                    },
                    preventOverflow: {
                      boundariesElement: this._config.boundary
                    }
                  }
                };
                return (
                  this._config.display === 'static' &&
                    (n.modifiers.applyStyle = {
                      enabled: !1
                    }),
                  n
                );
              }),
              (c._jQueryInterface = function(e) {
                return this.each(function() {
                  var t = bt(this).data(It);

                  if (
                    (t ||
                      ((t = new c(this, _typeof(e) == 'object' ? e : null)),
                      bt(this).data(It, t)),
                    typeof e === 'string')
                  ) {
                    if (typeof t[e] === 'undefined') {
                      throw new TypeError('No method named "' + e + '"');
                    }
                    t[e]();
                  }
                });
              }),
              (c._clearMenus = function(t) {
                if (!t || (t.which !== 3 && (t.type !== 'keyup' || t.which === 9))) {
                  for (
                    var e = [].slice.call(document.querySelectorAll(Wt)),
                      n = 0,
                      i = e.length;
                    n < i;
                    n++
                  ) {
                    var r = c._getParentFromElement(e[n]);

                    var o = bt(e[n]).data(It);

                    var s = {
                      relatedTarget: e[n]
                    };

                    if ((t && t.type === 'click' && (s.clickEvent = t), o)) {
                      var a = o._menu;

                      if (
                        bt(r).hasClass(Pt) &&
                        !(
                          t &&
                          ((t.type === 'click' &&
                            /input|textarea/i.test(t.target.tagName)) ||
                            (t.type === 'keyup' && t.which === 9)) &&
                          bt.contains(r, t.target)
                        )
                      ) {
                        var l = bt.Event(Ot.HIDE, s);
                        bt(r).trigger(l),
                          l.isDefaultPrevented() ||
                            ('ontouchstart' in document.documentElement &&
                              bt(document.body)
                                .children()
                                .off('mouseover', null, bt.noop),
                            e[n].setAttribute('aria-expanded', 'false'),
                            bt(a).removeClass(Pt),
                            bt(r)
                              .removeClass(Pt)
                              .trigger(bt.Event(Ot.HIDDEN, s)));
                      }
                    }
                  }
                }
              }),
              (c._getParentFromElement = function(t) {
                var e;

                var n = Fn.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode;
              }),
              (c._dataApiKeydownHandler = function(t) {
                if (
                  (/input|textarea/i.test(t.target.tagName)
                    ? !(
                        t.which === 32 ||
                        (t.which !== 27 &&
                          ((t.which !== 40 && t.which !== 38) ||
                            bt(t.target).closest(qt).length))
                      )
                    : Nt.test(t.which)) &&
                  (t.preventDefault(),
                  t.stopPropagation(),
                  !this.disabled && !bt(this).hasClass(kt))
                ) {
                  var e = c._getParentFromElement(this);

                  var n = bt(e).hasClass(Pt);

                  if (
                    (n || (t.which === 27 && t.which === 32)) &&
                    (!n || (t.which !== 27 && t.which !== 32))
                  ) {
                    var i = [].slice.call(e.querySelectorAll(Kt));

                    if (i.length !== 0) {
                      var r = i.indexOf(t.target);
                      t.which === 38 && r > 0 && r--,
                        t.which === 40 && r < i.length - 1 && r++,
                        r < 0 && (r = 0),
                        i[r].focus();
                    }
                  } else {
                    if (t.which === 27) {
                      var o = e.querySelector(Wt);
                      bt(o).trigger('focus');
                    }

                    bt(this).trigger('click');
                  }
                }
              }),
              s(c, null, [
                {
                  key: 'VERSION',
                  get: function get() {
                    return '4.1.3';
                  }
                },
                {
                  key: 'Default',
                  get: function get() {
                    return Jt;
                  }
                },
                {
                  key: 'DefaultType',
                  get: function get() {
                    return Zt;
                  }
                }
              ]),
              c
            );
          })()),
          bt(document)
            .on(Ot.KEYDOWN_DATA_API, Wt, Gt._dataApiKeydownHandler)
            .on(Ot.KEYDOWN_DATA_API, qt, Gt._dataApiKeydownHandler)
            .on(Ot.CLICK_DATA_API + ' ' + Ot.KEYUP_DATA_API, Gt._clearMenus)
            .on(Ot.CLICK_DATA_API, Wt, function(t) {
              t.preventDefault(),
                t.stopPropagation(),
                Gt._jQueryInterface.call(bt(this), 'toggle');
            })
            .on(Ot.CLICK_DATA_API, Ut, function(t) {
              t.stopPropagation();
            }),
          (bt.fn[St] = Gt._jQueryInterface),
          (bt.fn[St].Constructor = Gt),
          (bt.fn[St].noConflict = function() {
            return (bt.fn[St] = wt), Gt._jQueryInterface;
          }),
          Gt);

          var Yn = ((Xt = 'modal'),
          (ee = '.' + (te = 'bs.modal')),
          (ne = ($t = e).fn[Xt]),
          (ie = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
          }),
          (re = {
            backdrop: '(boolean|string)',
            keyboard: 'boolean',
            focus: 'boolean',
            show: 'boolean'
          }),
          (oe = {
            HIDE: 'hide' + ee,
            HIDDEN: 'hidden' + ee,
            SHOW: 'show' + ee,
            SHOWN: 'shown' + ee,
            FOCUSIN: 'focusin' + ee,
            RESIZE: 'resize' + ee,
            CLICK_DISMISS: 'click.dismiss' + ee,
            KEYDOWN_DISMISS: 'keydown.dismiss' + ee,
            MOUSEUP_DISMISS: 'mouseup.dismiss' + ee,
            MOUSEDOWN_DISMISS: 'mousedown.dismiss' + ee,
            CLICK_DATA_API: 'click' + ee + '.data-api'
          }),
          (se = 'modal-scrollbar-measure'),
          (ae = 'modal-backdrop'),
          (le = 'modal-open'),
          (ce = 'fade'),
          (he = 'show'),
          (ue = '.modal-dialog'),
          (fe = '[data-toggle="modal"]'),
          (de = '[data-dismiss="modal"]'),
          (ge = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'),
          (_e = '.sticky-top'),
          (me = (function() {
            function r(t, e) {
              (this._config = this._getConfig(e)),
                (this._element = t),
                (this._dialog = t.querySelector(ue)),
                (this._backdrop = null),
                (this._isShown = !1),
                (this._isBodyOverflowing = !1),
                (this._ignoreBackdropClick = !1),
                (this._scrollbarWidth = 0);
            }

            var t = r.prototype;
            return (
              (t.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t);
              }),
              (t.show = function(t) {
                var e = this;

                if (!this._isTransitioning && !this._isShown) {
                  $t(this._element).hasClass(ce) && (this._isTransitioning = !0);
                  var n = $t.Event(oe.SHOW, {
                    relatedTarget: t
                  });
                  $t(this._element).trigger(n),
                    this._isShown ||
                      n.isDefaultPrevented() ||
                      ((this._isShown = !0),
                      this._checkScrollbar(),
                      this._setScrollbar(),
                      this._adjustDialog(),
                      $t(document.body).addClass(le),
                      this._setEscapeEvent(),
                      this._setResizeEvent(),
                      $t(this._element).on(oe.CLICK_DISMISS, de, function(t) {
                        return e.hide(t);
                      }),
                      $t(this._dialog).on(oe.MOUSEDOWN_DISMISS, function() {
                        $t(e._element).one(oe.MOUSEUP_DISMISS, function(t) {
                          $t(t.target).is(e._element) && (e._ignoreBackdropClick = !0);
                        });
                      }),
                      this._showBackdrop(function() {
                        return e._showElement(t);
                      }));
                }
              }),
              (t.hide = function(t) {
                var e = this;

                if (
                  (t && t.preventDefault(), !this._isTransitioning && this._isShown)
                ) {
                  var n = $t.Event(oe.HIDE);

                  if (
                    ($t(this._element).trigger(n),
                    this._isShown && !n.isDefaultPrevented())
                  ) {
                    this._isShown = !1;
                    var i = $t(this._element).hasClass(ce);

                    if (
                      (i && (this._isTransitioning = !0),
                      this._setEscapeEvent(),
                      this._setResizeEvent(),
                      $t(document).off(oe.FOCUSIN),
                      $t(this._element).removeClass(he),
                      $t(this._element).off(oe.CLICK_DISMISS),
                      $t(this._dialog).off(oe.MOUSEDOWN_DISMISS),
                      i)
                    ) {
                      var r = Fn.getTransitionDurationFromElement(this._element);
                      $t(this._element)
                        .one(Fn.TRANSITION_END, function(t) {
                          return e._hideModal(t);
                        })
                        .emulateTransitionEnd(r);
                    } else this._hideModal();
                  }
                }
              }),
              (t.dispose = function() {
                $t.removeData(this._element, te),
                  $t(window, document, this._element, this._backdrop).off(ee),
                  (this._config = null),
                  (this._element = null),
                  (this._dialog = null),
                  (this._backdrop = null),
                  (this._isShown = null),
                  (this._isBodyOverflowing = null),
                  (this._ignoreBackdropClick = null),
                  (this._scrollbarWidth = null);
              }),
              (t.handleUpdate = function() {
                this._adjustDialog();
              }),
              (t._getConfig = function(t) {
                return (t = l({}, ie, t)), Fn.typeCheckConfig(Xt, t, re), t;
              }),
              (t._showElement = function(t) {
                var e = this;

                var n = $t(this._element).hasClass(ce);
                (this._element.parentNode &&
                  this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
                  document.body.appendChild(this._element),
                  (this._element.style.display = 'block'),
                  this._element.removeAttribute('aria-hidden'),
                  (this._element.scrollTop = 0),
                  n && Fn.reflow(this._element),
                  $t(this._element).addClass(he),
                  this._config.focus && this._enforceFocus();

                var i = $t.Event(oe.SHOWN, {
                  relatedTarget: t
                });

                var r = function r() {
                  e._config.focus && e._element.focus(),
                    (e._isTransitioning = !1),
                    $t(e._element).trigger(i);
                };

                if (n) {
                  var o = Fn.getTransitionDurationFromElement(this._element);
                  $t(this._dialog)
                    .one(Fn.TRANSITION_END, r)
                    .emulateTransitionEnd(o);
                } else r();
              }),
              (t._enforceFocus = function() {
                var e = this;
                $t(document)
                  .off(oe.FOCUSIN)
                  .on(oe.FOCUSIN, function(t) {
                    document !== t.target &&
                      e._element !== t.target &&
                      $t(e._element).has(t.target).length === 0 &&
                      e._element.focus();
                  });
              }),
              (t._setEscapeEvent = function() {
                var e = this;
                this._isShown && this._config.keyboard
                  ? $t(this._element).on(oe.KEYDOWN_DISMISS, function(t) {
                      t.which === 27 && (t.preventDefault(), e.hide());
                    })
                  : this._isShown || $t(this._element).off(oe.KEYDOWN_DISMISS);
              }),
              (t._setResizeEvent = function() {
                var e = this;
                this._isShown
                  ? $t(window).on(oe.RESIZE, function(t) {
                      return e.handleUpdate(t);
                    })
                  : $t(window).off(oe.RESIZE);
              }),
              (t._hideModal = function() {
                var t = this;
                (this._element.style.display = 'none'),
                  this._element.setAttribute('aria-hidden', !0),
                  (this._isTransitioning = !1),
                  this._showBackdrop(function() {
                    $t(document.body).removeClass(le),
                      t._resetAdjustments(),
                      t._resetScrollbar(),
                      $t(t._element).trigger(oe.HIDDEN);
                  });
              }),
              (t._removeBackdrop = function() {
                this._backdrop &&
                  ($t(this._backdrop).remove(), (this._backdrop = null));
              }),
              (t._showBackdrop = function(t) {
                var e = this;

                var n = $t(this._element).hasClass(ce) ? ce : '';

                if (this._isShown && this._config.backdrop) {
                  if (
                    ((this._backdrop = document.createElement('div')),
                    (this._backdrop.className = ae),
                    n && this._backdrop.classList.add(n),
                    $t(this._backdrop).appendTo(document.body),
                    $t(this._element).on(oe.CLICK_DISMISS, function(t) {
                      e._ignoreBackdropClick
                        ? (e._ignoreBackdropClick = !1)
                        : t.target === t.currentTarget &&
                          (e._config.backdrop === 'static'
                            ? e._element.focus()
                            : e.hide());
                    }),
                    n && Fn.reflow(this._backdrop),
                    $t(this._backdrop).addClass(he),
                    !t)
                  ) {
                    return;
                  }
                  if (!n) return void t();
                  var i = Fn.getTransitionDurationFromElement(this._backdrop);
                  $t(this._backdrop)
                    .one(Fn.TRANSITION_END, t)
                    .emulateTransitionEnd(i);
                } else if (!this._isShown && this._backdrop) {
                  $t(this._backdrop).removeClass(he);

                  var r = function r() {
                    e._removeBackdrop(), t && t();
                  };

                  if ($t(this._element).hasClass(ce)) {
                    var o = Fn.getTransitionDurationFromElement(this._backdrop);
                    $t(this._backdrop)
                      .one(Fn.TRANSITION_END, r)
                      .emulateTransitionEnd(o);
                  } else r();
                } else t && t();
              }),
              (t._adjustDialog = function() {
                var t =
                  this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing &&
                  t &&
                  (this._element.style.paddingLeft = this._scrollbarWidth + 'px'),
                  this._isBodyOverflowing &&
                    !t &&
                    (this._element.style.paddingRight = this._scrollbarWidth + 'px');
              }),
              (t._resetAdjustments = function() {
                (this._element.style.paddingLeft = ''),
                  (this._element.style.paddingRight = '');
              }),
              (t._checkScrollbar = function() {
                var t = document.body.getBoundingClientRect();
                (this._isBodyOverflowing = t.left + t.right < window.innerWidth),
                  (this._scrollbarWidth = this._getScrollbarWidth());
              }),
              (t._setScrollbar = function() {
                var r = this;

                if (this._isBodyOverflowing) {
                  var t = [].slice.call(document.querySelectorAll(ge));

                  var e = [].slice.call(document.querySelectorAll(_e));
                  $t(t).each(function(t, e) {
                    var n = e.style.paddingRight;

                    var i = $t(e).css('padding-right');
                    $t(e)
                      .data('padding-right', n)
                      .css('padding-right', parseFloat(i) + r._scrollbarWidth + 'px');
                  }),
                    $t(e).each(function(t, e) {
                      var n = e.style.marginRight;

                      var i = $t(e).css('margin-right');
                      $t(e)
                        .data('margin-right', n)
                        .css('margin-right', parseFloat(i) - r._scrollbarWidth + 'px');
                    });
                  var n = document.body.style.paddingRight;

                  var i = $t(document.body).css('padding-right');
                  $t(document.body)
                    .data('padding-right', n)
                    .css('padding-right', parseFloat(i) + this._scrollbarWidth + 'px');
                }
              }),
              (t._resetScrollbar = function() {
                var t = [].slice.call(document.querySelectorAll(ge));
                $t(t).each(function(t, e) {
                  var n = $t(e).data('padding-right');
                  $t(e).removeData('padding-right'), (e.style.paddingRight = n || '');
                });
                var e = [].slice.call(document.querySelectorAll('' + _e));
                $t(e).each(function(t, e) {
                  var n = $t(e).data('margin-right');
                  typeof n !== 'undefined' &&
                    $t(e)
                      .css('margin-right', n)
                      .removeData('margin-right');
                });
                var n = $t(document.body).data('padding-right');
                $t(document.body).removeData('padding-right'),
                  (document.body.style.paddingRight = n || '');
              }),
              (t._getScrollbarWidth = function() {
                var t = document.createElement('div');
                (t.className = se), document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e;
              }),
              (r._jQueryInterface = function(n, i) {
                return this.each(function() {
                  var t = $t(this).data(te);

                  var e = l(
                    {},
                    ie,
                    $t(this).data(),
                    _typeof(n) == 'object' && n ? n : {}
                  );

                  if (
                    (t || ((t = new r(this, e)), $t(this).data(te, t)),
                    typeof n === 'string')
                  ) {
                    if (typeof t[n] === 'undefined') {
                      throw new TypeError('No method named "' + n + '"');
                    }
                    t[n](i);
                  } else e.show && t.show(i);
                });
              }),
              s(r, null, [
                {
                  key: 'VERSION',
                  get: function get() {
                    return '4.1.3';
                  }
                },
                {
                  key: 'Default',
                  get: function get() {
                    return ie;
                  }
                }
              ]),
              r
            );
          })()),
          $t(document).on(oe.CLICK_DATA_API, fe, function(t) {
            var e;

            var n = this;

            var i = Fn.getSelectorFromElement(this);
            i && (e = document.querySelector(i));
            var r = $t(e).data(te) ? 'toggle' : l({}, $t(e).data(), $t(this).data());
            (this.tagName !== 'A' && this.tagName !== 'AREA') || t.preventDefault();
            var o = $t(e).one(oe.SHOW, function(t) {
              t.isDefaultPrevented() ||
                o.one(oe.HIDDEN, function() {
                  $t(n).is(':visible') && n.focus();
                });
            });

            me._jQueryInterface.call($t(e), r, this);
          }),
          ($t.fn[Xt] = me._jQueryInterface),
          ($t.fn[Xt].Constructor = me),
          ($t.fn[Xt].noConflict = function() {
            return ($t.fn[Xt] = ne), me._jQueryInterface;
          }),
          me);

          var zn = ((ve = 'tooltip'),
          (Ee = '.' + (ye = 'bs.tooltip')),
          (Ce = (pe = e).fn[ve]),
          (Te = 'bs-tooltip'),
          (be = new RegExp('(^|\\s)' + Te + '\\S+', 'g')),
          (Ae = {
            animation: !0,
            template:
              '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: 'hover focus',
            title: '',
            delay: 0,
            html: !(Ie = {
              AUTO: 'auto',
              TOP: 'top',
              RIGHT: 'right',
              BOTTOM: 'bottom',
              LEFT: 'left'
            }),
            selector: !(Se = {
              animation: 'boolean',
              template: 'string',
              title: '(string|element|function)',
              trigger: 'string',
              delay: '(number|object)',
              html: 'boolean',
              selector: '(string|boolean)',
              placement: '(string|function)',
              offset: '(number|string)',
              container: '(string|element|boolean)',
              fallbackPlacement: '(string|array)',
              boundary: '(string|element)'
            }),
            placement: 'top',
            offset: 0,
            container: !1,
            fallbackPlacement: 'flip',
            boundary: 'scrollParent'
          }),
          (we = 'out'),
          (Ne = {
            HIDE: 'hide' + Ee,
            HIDDEN: 'hidden' + Ee,
            SHOW: (De = 'show') + Ee,
            SHOWN: 'shown' + Ee,
            INSERTED: 'inserted' + Ee,
            CLICK: 'click' + Ee,
            FOCUSIN: 'focusin' + Ee,
            FOCUSOUT: 'focusout' + Ee,
            MOUSEENTER: 'mouseenter' + Ee,
            MOUSELEAVE: 'mouseleave' + Ee
          }),
          (Oe = 'fade'),
          (ke = 'show'),
          (Pe = '.tooltip-inner'),
          (je = '.arrow'),
          (He = 'hover'),
          (Le = 'focus'),
          (Re = 'click'),
          (xe = 'manual'),
          (We = (function() {
            function i(t, e) {
              if (typeof h === 'undefined') {
                throw new TypeError(
                  'Bootstrap tooltips require Popper.js (https://popper.js.org)'
                );
              }
              (this._isEnabled = !0),
                (this._timeout = 0),
                (this._hoverState = ''),
                (this._activeTrigger = {}),
                (this._popper = null),
                (this.element = t),
                (this.config = this._getConfig(e)),
                (this.tip = null),
                this._setListeners();
            }

            var t = i.prototype;
            return (
              (t.enable = function() {
                this._isEnabled = !0;
              }),
              (t.disable = function() {
                this._isEnabled = !1;
              }),
              (t.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled;
              }),
              (t.toggle = function(t) {
                if (this._isEnabled) {
                  if (t) {
                    var e = this.constructor.DATA_KEY;

                    var n = pe(t.currentTarget).data(e);
                    n ||
                      ((n = new this.constructor(
                        t.currentTarget,
                        this._getDelegateConfig()
                      )),
                      pe(t.currentTarget).data(e, n)),
                      (n._activeTrigger.click = !n._activeTrigger.click),
                      n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n);
                  } else {
                    if (pe(this.getTipElement()).hasClass(ke)) {
                      return void this._leave(null, this);
                    }

                    this._enter(null, this);
                  }
                }
              }),
              (t.dispose = function() {
                clearTimeout(this._timeout),
                  pe.removeData(this.element, this.constructor.DATA_KEY),
                  pe(this.element).off(this.constructor.EVENT_KEY),
                  pe(this.element)
                    .closest('.modal')
                    .off('hide.bs.modal'),
                  this.tip && pe(this.tip).remove(),
                  (this._isEnabled = null),
                  (this._timeout = null),
                  (this._hoverState = null),
                  (this._activeTrigger = null) !== this._popper &&
                    this._popper.destroy(),
                  (this._popper = null),
                  (this.element = null),
                  (this.config = null),
                  (this.tip = null);
              }),
              (t.show = function() {
                var e = this;
                if (pe(this.element).css('display') === 'none') {
                  throw new Error('Please use show on visible elements');
                }
                var t = pe.Event(this.constructor.Event.SHOW);

                if (this.isWithContent() && this._isEnabled) {
                  pe(this.element).trigger(t);
                  var n = pe.contains(
                    this.element.ownerDocument.documentElement,
                    this.element
                  );
                  if (t.isDefaultPrevented() || !n) return;
                  var i = this.getTipElement();

                  var r = Fn.getUID(this.constructor.NAME);
                  i.setAttribute('id', r),
                    this.element.setAttribute('aria-describedby', r),
                    this.setContent(),
                    this.config.animation && pe(i).addClass(Oe);

                  var o =
                    typeof this.config.placement === 'function'
                      ? this.config.placement.call(this, i, this.element)
                      : this.config.placement;

                  var s = this._getAttachment(o);

                  this.addAttachmentClass(s);
                  var a =
                    !1 === this.config.container
                      ? document.body
                      : pe(document).find(this.config.container);
                  pe(i).data(this.constructor.DATA_KEY, this),
                    pe.contains(this.element.ownerDocument.documentElement, this.tip) ||
                      pe(i).appendTo(a),
                    pe(this.element).trigger(this.constructor.Event.INSERTED),
                    (this._popper = new h(this.element, i, {
                      placement: s,
                      modifiers: {
                        offset: {
                          offset: this.config.offset
                        },
                        flip: {
                          behavior: this.config.fallbackPlacement
                        },
                        arrow: {
                          element: je
                        },
                        preventOverflow: {
                          boundariesElement: this.config.boundary
                        }
                      },
                      onCreate: function onCreate(t) {
                        t.originalPlacement !== t.placement &&
                          e._handlePopperPlacementChange(t);
                      },
                      onUpdate: function onUpdate(t) {
                        e._handlePopperPlacementChange(t);
                      }
                    })),
                    pe(i).addClass(ke),
                    'ontouchstart' in document.documentElement &&
                      pe(document.body)
                        .children()
                        .on('mouseover', null, pe.noop);

                  var l = function l() {
                    e.config.animation && e._fixTransition();
                    var t = e._hoverState;
                    (e._hoverState = null),
                      pe(e.element).trigger(e.constructor.Event.SHOWN),
                      t === we && e._leave(null, e);
                  };

                  if (pe(this.tip).hasClass(Oe)) {
                    var c = Fn.getTransitionDurationFromElement(this.tip);
                    pe(this.tip)
                      .one(Fn.TRANSITION_END, l)
                      .emulateTransitionEnd(c);
                  } else l();
                }
              }),
              (t.hide = function(t) {
                var e = this;

                var n = this.getTipElement();

                var i = pe.Event(this.constructor.Event.HIDE);

                var r = function r() {
                  e._hoverState !== De && n.parentNode && n.parentNode.removeChild(n),
                    e._cleanTipClass(),
                    e.element.removeAttribute('aria-describedby'),
                    pe(e.element).trigger(e.constructor.Event.HIDDEN),
                    e._popper !== null && e._popper.destroy(),
                    t && t();
                };

                if ((pe(this.element).trigger(i), !i.isDefaultPrevented())) {
                  if (
                    (pe(n).removeClass(ke),
                    'ontouchstart' in document.documentElement &&
                      pe(document.body)
                        .children()
                        .off('mouseover', null, pe.noop),
                    (this._activeTrigger[Re] = !1),
                    (this._activeTrigger[Le] = !1),
                    (this._activeTrigger[He] = !1),
                    pe(this.tip).hasClass(Oe))
                  ) {
                    var o = Fn.getTransitionDurationFromElement(n);
                    pe(n)
                      .one(Fn.TRANSITION_END, r)
                      .emulateTransitionEnd(o);
                  } else r();

                  this._hoverState = '';
                }
              }),
              (t.update = function() {
                this._popper !== null && this._popper.scheduleUpdate();
              }),
              (t.isWithContent = function() {
                return Boolean(this.getTitle());
              }),
              (t.addAttachmentClass = function(t) {
                pe(this.getTipElement()).addClass(Te + '-' + t);
              }),
              (t.getTipElement = function() {
                return (this.tip = this.tip || pe(this.config.template)[0]), this.tip;
              }),
              (t.setContent = function() {
                var t = this.getTipElement();
                this.setElementContent(pe(t.querySelectorAll(Pe)), this.getTitle()),
                  pe(t).removeClass(Oe + ' ' + ke);
              }),
              (t.setElementContent = function(t, e) {
                var n = this.config.html;
                _typeof(e) == 'object' && (e.nodeType || e.jquery)
                  ? n
                    ? pe(e)
                        .parent()
                        .is(t) || t.empty().append(e)
                    : t.text(pe(e).text())
                  : t[n ? 'html' : 'text'](e);
              }),
              (t.getTitle = function() {
                var t = this.element.getAttribute('data-original-title');
                return (
                  t ||
                    (t =
                      typeof this.config.title === 'function'
                        ? this.config.title.call(this.element)
                        : this.config.title),
                  t
                );
              }),
              (t._getAttachment = function(t) {
                return Ie[t.toUpperCase()];
              }),
              (t._setListeners = function() {
                var i = this;
                this.config.trigger.split(' ').forEach(function(t) {
                  if (t === 'click') {
                    pe(i.element).on(
                      i.constructor.Event.CLICK,
                      i.config.selector,
                      function(t) {
                        return i.toggle(t);
                      }
                    );
                  } else if (t !== xe) {
                    var e =
                      t === He
                        ? i.constructor.Event.MOUSEENTER
                        : i.constructor.Event.FOCUSIN;

                    var n =
                      t === He
                        ? i.constructor.Event.MOUSELEAVE
                        : i.constructor.Event.FOCUSOUT;
                    pe(i.element)
                      .on(e, i.config.selector, function(t) {
                        return i._enter(t);
                      })
                      .on(n, i.config.selector, function(t) {
                        return i._leave(t);
                      });
                  }
                  pe(i.element)
                    .closest('.modal')
                    .on('hide.bs.modal', function() {
                      return i.hide();
                    });
                }),
                  this.config.selector
                    ? (this.config = l({}, this.config, {
                        trigger: 'manual',
                        selector: ''
                      }))
                    : this._fixTitle();
              }),
              (t._fixTitle = function() {
                var t = _typeof(this.element.getAttribute('data-original-title'));

                (this.element.getAttribute('title') || t !== 'string') &&
                  (this.element.setAttribute(
                    'data-original-title',
                    this.element.getAttribute('title') || ''
                  ),
                  this.element.setAttribute('title', ''));
              }),
              (t._enter = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || pe(t.currentTarget).data(n)) ||
                  ((e = new this.constructor(
                    t.currentTarget,
                    this._getDelegateConfig()
                  )),
                  pe(t.currentTarget).data(n, e)),
                  t && (e._activeTrigger[t.type === 'focusin' ? Le : He] = !0),
                  pe(e.getTipElement()).hasClass(ke) || e._hoverState === De
                    ? (e._hoverState = De)
                    : (clearTimeout(e._timeout),
                      (e._hoverState = De),
                      e.config.delay && e.config.delay.show
                        ? (e._timeout = setTimeout(function() {
                            e._hoverState === De && e.show();
                          }, e.config.delay.show))
                        : e.show());
              }),
              (t._leave = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || pe(t.currentTarget).data(n)) ||
                  ((e = new this.constructor(
                    t.currentTarget,
                    this._getDelegateConfig()
                  )),
                  pe(t.currentTarget).data(n, e)),
                  t && (e._activeTrigger[t.type === 'focusout' ? Le : He] = !1),
                  e._isWithActiveTrigger() ||
                    (clearTimeout(e._timeout),
                    (e._hoverState = we),
                    e.config.delay && e.config.delay.hide
                      ? (e._timeout = setTimeout(function() {
                          e._hoverState === we && e.hide();
                        }, e.config.delay.hide))
                      : e.hide());
              }),
              (t._isWithActiveTrigger = function() {
                for (var t in this._activeTrigger) {
                  if (this._activeTrigger[t]) return !0;
                }

                return !1;
              }),
              (t._getConfig = function(t) {
                return (
                  typeof (t = l(
                    {},
                    this.constructor.Default,
                    pe(this.element).data(),
                    _typeof(t) == 'object' && t ? t : {}
                  )).delay === 'number' &&
                    (t.delay = {
                      show: t.delay,
                      hide: t.delay
                    }),
                  typeof t.title === 'number' && (t.title = t.title.toString()),
                  typeof t.content === 'number' && (t.content = t.content.toString()),
                  Fn.typeCheckConfig(ve, t, this.constructor.DefaultType),
                  t
                );
              }),
              (t._getDelegateConfig = function() {
                var t = {};
                if (this.config) {
                  for (var e in this.config) {
                    this.constructor.Default[e] !== this.config[e] &&
                      (t[e] = this.config[e]);
                  }
                }
                return t;
              }),
              (t._cleanTipClass = function() {
                var t = pe(this.getTipElement());

                var e = t.attr('class').match(be);
                e !== null && e.length && t.removeClass(e.join(''));
              }),
              (t._handlePopperPlacementChange = function(t) {
                var e = t.instance;
                (this.tip = e.popper),
                  this._cleanTipClass(),
                  this.addAttachmentClass(this._getAttachment(t.placement));
              }),
              (t._fixTransition = function() {
                var t = this.getTipElement();

                var e = this.config.animation;
                t.getAttribute('x-placement') === null &&
                  (pe(t).removeClass(Oe),
                  (this.config.animation = !1),
                  this.hide(),
                  this.show(),
                  (this.config.animation = e));
              }),
              (i._jQueryInterface = function(n) {
                return this.each(function() {
                  var t = pe(this).data(ye);

                  var e = _typeof(n) == 'object' && n;

                  if (
                    (t || !/dispose|hide/.test(n)) &&
                    (t || ((t = new i(this, e)), pe(this).data(ye, t)),
                    typeof n === 'string')
                  ) {
                    if (typeof t[n] === 'undefined') {
                      throw new TypeError('No method named "' + n + '"');
                    }
                    t[n]();
                  }
                });
              }),
              s(i, null, [
                {
                  key: 'VERSION',
                  get: function get() {
                    return '4.1.3';
                  }
                },
                {
                  key: 'Default',
                  get: function get() {
                    return Ae;
                  }
                },
                {
                  key: 'NAME',
                  get: function get() {
                    return ve;
                  }
                },
                {
                  key: 'DATA_KEY',
                  get: function get() {
                    return ye;
                  }
                },
                {
                  key: 'Event',
                  get: function get() {
                    return Ne;
                  }
                },
                {
                  key: 'EVENT_KEY',
                  get: function get() {
                    return Ee;
                  }
                },
                {
                  key: 'DefaultType',
                  get: function get() {
                    return Se;
                  }
                }
              ]),
              i
            );
          })()),
          (pe.fn[ve] = We._jQueryInterface),
          (pe.fn[ve].Constructor = We),
          (pe.fn[ve].noConflict = function() {
            return (pe.fn[ve] = Ce), We._jQueryInterface;
          }),
          We);

          var Jn = ((qe = 'popover'),
          (Ke = '.' + (Fe = 'bs.popover')),
          (Me = (Ue = e).fn[qe]),
          (Qe = 'bs-popover'),
          (Be = new RegExp('(^|\\s)' + Qe + '\\S+', 'g')),
          (Ve = l({}, zn.Default, {
            placement: 'right',
            trigger: 'click',
            content: '',
            template:
              '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
          })),
          (Ye = l({}, zn.DefaultType, {
            content: '(string|element|function)'
          })),
          (ze = 'fade'),
          (Ze = '.popover-header'),
          (Ge = '.popover-body'),
          ($e = {
            HIDE: 'hide' + Ke,
            HIDDEN: 'hidden' + Ke,
            SHOW: (Je = 'show') + Ke,
            SHOWN: 'shown' + Ke,
            INSERTED: 'inserted' + Ke,
            CLICK: 'click' + Ke,
            FOCUSIN: 'focusin' + Ke,
            FOCUSOUT: 'focusout' + Ke,
            MOUSEENTER: 'mouseenter' + Ke,
            MOUSELEAVE: 'mouseleave' + Ke
          }),
          (Xe = (function(t) {
            var e, n;

            function i() {
              return t.apply(this, arguments) || this;
            }

            (n = t),
              ((e = i).prototype = Object.create(n.prototype)),
              ((e.prototype.constructor = e).__proto__ = n);
            var r = i.prototype;
            return (
              (r.isWithContent = function() {
                return this.getTitle() || this._getContent();
              }),
              (r.addAttachmentClass = function(t) {
                Ue(this.getTipElement()).addClass(Qe + '-' + t);
              }),
              (r.getTipElement = function() {
                return (this.tip = this.tip || Ue(this.config.template)[0]), this.tip;
              }),
              (r.setContent = function() {
                var t = Ue(this.getTipElement());
                this.setElementContent(t.find(Ze), this.getTitle());

                var e = this._getContent();

                typeof e === 'function' && (e = e.call(this.element)),
                  this.setElementContent(t.find(Ge), e),
                  t.removeClass(ze + ' ' + Je);
              }),
              (r._getContent = function() {
                return this.element.getAttribute('data-content') || this.config.content;
              }),
              (r._cleanTipClass = function() {
                var t = Ue(this.getTipElement());

                var e = t.attr('class').match(Be);
                e !== null && e.length > 0 && t.removeClass(e.join(''));
              }),
              (i._jQueryInterface = function(n) {
                return this.each(function() {
                  var t = Ue(this).data(Fe);

                  var e = _typeof(n) == 'object' ? n : null;

                  if (
                    (t || !/destroy|hide/.test(n)) &&
                    (t || ((t = new i(this, e)), Ue(this).data(Fe, t)),
                    typeof n === 'string')
                  ) {
                    if (typeof t[n] === 'undefined') {
                      throw new TypeError('No method named "' + n + '"');
                    }
                    t[n]();
                  }
                });
              }),
              s(i, null, [
                {
                  key: 'VERSION',
                  get: function get() {
                    return '4.1.3';
                  }
                },
                {
                  key: 'Default',
                  get: function get() {
                    return Ve;
                  }
                },
                {
                  key: 'NAME',
                  get: function get() {
                    return qe;
                  }
                },
                {
                  key: 'DATA_KEY',
                  get: function get() {
                    return Fe;
                  }
                },
                {
                  key: 'Event',
                  get: function get() {
                    return $e;
                  }
                },
                {
                  key: 'EVENT_KEY',
                  get: function get() {
                    return Ke;
                  }
                },
                {
                  key: 'DefaultType',
                  get: function get() {
                    return Ye;
                  }
                }
              ]),
              i
            );
          })(zn)),
          (Ue.fn[qe] = Xe._jQueryInterface),
          (Ue.fn[qe].Constructor = Xe),
          (Ue.fn[qe].noConflict = function() {
            return (Ue.fn[qe] = Me), Xe._jQueryInterface;
          }),
          Xe);

          var Zn = ((en = 'scrollspy'),
          (rn = '.' + (nn = 'bs.scrollspy')),
          (on = (tn = e).fn[en]),
          (sn = {
            offset: 10,
            method: 'auto',
            target: ''
          }),
          (an = {
            offset: 'number',
            method: 'string',
            target: '(string|element)'
          }),
          (ln = {
            ACTIVATE: 'activate' + rn,
            SCROLL: 'scroll' + rn,
            LOAD_DATA_API: 'load' + rn + '.data-api'
          }),
          (cn = 'dropdown-item'),
          (hn = 'active'),
          (un = '[data-spy="scroll"]'),
          (fn = '.active'),
          (dn = '.nav, .list-group'),
          (gn = '.nav-link'),
          (_n = '.nav-item'),
          (mn = '.list-group-item'),
          (pn = '.dropdown'),
          (vn = '.dropdown-item'),
          (yn = '.dropdown-toggle'),
          (En = 'offset'),
          (Cn = 'position'),
          (Tn = (function() {
            function n(t, e) {
              var n = this;
              (this._element = t),
                (this._scrollElement = t.tagName === 'BODY' ? window : t),
                (this._config = this._getConfig(e)),
                (this._selector =
                  this._config.target +
                  ' ' +
                  gn +
                  ',' +
                  this._config.target +
                  ' ' +
                  mn +
                  ',' +
                  this._config.target +
                  ' ' +
                  vn),
                (this._offsets = []),
                (this._targets = []),
                (this._activeTarget = null),
                (this._scrollHeight = 0),
                tn(this._scrollElement).on(ln.SCROLL, function(t) {
                  return n._process(t);
                }),
                this.refresh(),
                this._process();
            }

            var t = n.prototype;
            return (
              (t.refresh = function() {
                var e = this;

                var t = this._scrollElement === this._scrollElement.window ? En : Cn;

                var r = this._config.method === 'auto' ? t : this._config.method;

                var o = r === Cn ? this._getScrollTop() : 0;
                (this._offsets = []),
                  (this._targets = []),
                  (this._scrollHeight = this._getScrollHeight()),
                  [].slice
                    .call(document.querySelectorAll(this._selector))
                    .map(function(t) {
                      var e;

                      var n = Fn.getSelectorFromElement(t);

                      if ((n && (e = document.querySelector(n)), e)) {
                        var i = e.getBoundingClientRect();
                        if (i.width || i.height) return [tn(e)[r]().top + o, n];
                      }

                      return null;
                    })
                    .filter(function(t) {
                      return t;
                    })
                    .sort(function(t, e) {
                      return t[0] - e[0];
                    })
                    .forEach(function(t) {
                      e._offsets.push(t[0]), e._targets.push(t[1]);
                    });
              }),
              (t.dispose = function() {
                tn.removeData(this._element, nn),
                  tn(this._scrollElement).off(rn),
                  (this._element = null),
                  (this._scrollElement = null),
                  (this._config = null),
                  (this._selector = null),
                  (this._offsets = null),
                  (this._targets = null),
                  (this._activeTarget = null),
                  (this._scrollHeight = null);
              }),
              (t._getConfig = function(t) {
                if (
                  typeof (t = l({}, sn, _typeof(t) == 'object' && t ? t : {}))
                    .target !== 'string'
                ) {
                  var e = tn(t.target).attr('id');
                  e || ((e = Fn.getUID(en)), tn(t.target).attr('id', e)),
                    (t.target = '#' + e);
                }

                return Fn.typeCheckConfig(en, t, an), t;
              }),
              (t._getScrollTop = function() {
                return this._scrollElement === window
                  ? this._scrollElement.pageYOffset
                  : this._scrollElement.scrollTop;
              }),
              (t._getScrollHeight = function() {
                return (
                  this._scrollElement.scrollHeight ||
                  Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight
                  )
                );
              }),
              (t._getOffsetHeight = function() {
                return this._scrollElement === window
                  ? window.innerHeight
                  : this._scrollElement.getBoundingClientRect().height;
              }),
              (t._process = function() {
                var t = this._getScrollTop() + this._config.offset;

                var e = this._getScrollHeight();

                var n = this._config.offset + e - this._getOffsetHeight();

                if ((this._scrollHeight !== e && this.refresh(), n <= t)) {
                  var i = this._targets[this._targets.length - 1];
                  this._activeTarget !== i && this._activate(i);
                } else {
                  if (
                    this._activeTarget &&
                    t < this._offsets[0] &&
                    this._offsets[0] > 0
                  ) {
                    return (this._activeTarget = null), void this._clear();
                  }

                  for (var r = this._offsets.length; r--; ) {
                    this._activeTarget !== this._targets[r] &&
                      t >= this._offsets[r] &&
                      (typeof this._offsets[r + 1] === 'undefined' ||
                        t < this._offsets[r + 1]) &&
                      this._activate(this._targets[r]);
                  }
                }
              }),
              (t._activate = function(e) {
                (this._activeTarget = e), this._clear();

                var t = this._selector.split(',');

                t = t.map(function(t) {
                  return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]';
                });
                var n = tn([].slice.call(document.querySelectorAll(t.join(','))));
                n.hasClass(cn)
                  ? (n
                      .closest(pn)
                      .find(yn)
                      .addClass(hn),
                    n.addClass(hn))
                  : (n.addClass(hn),
                    n
                      .parents(dn)
                      .prev(gn + ', ' + mn)
                      .addClass(hn),
                    n
                      .parents(dn)
                      .prev(_n)
                      .children(gn)
                      .addClass(hn)),
                  tn(this._scrollElement).trigger(ln.ACTIVATE, {
                    relatedTarget: e
                  });
              }),
              (t._clear = function() {
                var t = [].slice.call(document.querySelectorAll(this._selector));
                tn(t)
                  .filter(fn)
                  .removeClass(hn);
              }),
              (n._jQueryInterface = function(e) {
                return this.each(function() {
                  var t = tn(this).data(nn);

                  if (
                    (t ||
                      ((t = new n(this, _typeof(e) == 'object' && e)),
                      tn(this).data(nn, t)),
                    typeof e === 'string')
                  ) {
                    if (typeof t[e] === 'undefined') {
                      throw new TypeError('No method named "' + e + '"');
                    }
                    t[e]();
                  }
                });
              }),
              s(n, null, [
                {
                  key: 'VERSION',
                  get: function get() {
                    return '4.1.3';
                  }
                },
                {
                  key: 'Default',
                  get: function get() {
                    return sn;
                  }
                }
              ]),
              n
            );
          })()),
          tn(window).on(ln.LOAD_DATA_API, function() {
            for (
              var t = [].slice.call(document.querySelectorAll(un)), e = t.length;
              e--;

            ) {
              var n = tn(t[e]);

              Tn._jQueryInterface.call(n, n.data());
            }
          }),
          (tn.fn[en] = Tn._jQueryInterface),
          (tn.fn[en].Constructor = Tn),
          (tn.fn[en].noConflict = function() {
            return (tn.fn[en] = on), Tn._jQueryInterface;
          }),
          Tn);

          var Gn = ((In = '.' + (Sn = 'bs.tab')),
          (An = (bn = e).fn.tab),
          (Dn = {
            HIDE: 'hide' + In,
            HIDDEN: 'hidden' + In,
            SHOW: 'show' + In,
            SHOWN: 'shown' + In,
            CLICK_DATA_API: 'click' + In + '.data-api'
          }),
          (wn = 'dropdown-menu'),
          (Nn = 'active'),
          (On = 'disabled'),
          (kn = 'fade'),
          (Pn = 'show'),
          (jn = '.dropdown'),
          (Hn = '.nav, .list-group'),
          (Ln = '.active'),
          (Rn = '> li > .active'),
          (xn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]'),
          (Wn = '.dropdown-toggle'),
          (Un = '> .dropdown-menu .active'),
          (qn = (function() {
            function i(t) {
              this._element = t;
            }

            var t = i.prototype;
            return (
              (t.show = function() {
                var n = this;

                if (
                  !(
                    (this._element.parentNode &&
                      this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                      bn(this._element).hasClass(Nn)) ||
                    bn(this._element).hasClass(On)
                  )
                ) {
                  var t;

                  var i;

                  var e = bn(this._element).closest(Hn)[0];

                  var r = Fn.getSelectorFromElement(this._element);

                  if (e) {
                    var o = e.nodeName === 'UL' ? Rn : Ln;
                    i = (i = bn.makeArray(bn(e).find(o)))[i.length - 1];
                  }

                  var s = bn.Event(Dn.HIDE, {
                    relatedTarget: this._element
                  });

                  var a = bn.Event(Dn.SHOW, {
                    relatedTarget: i
                  });

                  if (
                    (i && bn(i).trigger(s),
                    bn(this._element).trigger(a),
                    !a.isDefaultPrevented() && !s.isDefaultPrevented())
                  ) {
                    r && (t = document.querySelector(r)),
                      this._activate(this._element, e);

                    var l = function l() {
                      var t = bn.Event(Dn.HIDDEN, {
                        relatedTarget: n._element
                      });

                      var e = bn.Event(Dn.SHOWN, {
                        relatedTarget: i
                      });
                      bn(i).trigger(t), bn(n._element).trigger(e);
                    };

                    t ? this._activate(t, t.parentNode, l) : l();
                  }
                }
              }),
              (t.dispose = function() {
                bn.removeData(this._element, Sn), (this._element = null);
              }),
              (t._activate = function(t, e, n) {
                var i = this;

                var r = (e.nodeName === 'UL' ? bn(e).find(Rn) : bn(e).children(Ln))[0];

                var o = n && r && bn(r).hasClass(kn);

                var s = function s() {
                  return i._transitionComplete(t, r, n);
                };

                if (r && o) {
                  var a = Fn.getTransitionDurationFromElement(r);
                  bn(r)
                    .one(Fn.TRANSITION_END, s)
                    .emulateTransitionEnd(a);
                } else s();
              }),
              (t._transitionComplete = function(t, e, n) {
                if (e) {
                  bn(e).removeClass(Pn + ' ' + Nn);
                  var i = bn(e.parentNode).find(Un)[0];
                  i && bn(i).removeClass(Nn),
                    e.getAttribute('role') === 'tab' &&
                      e.setAttribute('aria-selected', !1);
                }

                if (
                  (bn(t).addClass(Nn),
                  t.getAttribute('role') === 'tab' &&
                    t.setAttribute('aria-selected', !0),
                  Fn.reflow(t),
                  bn(t).addClass(Pn),
                  t.parentNode && bn(t.parentNode).hasClass(wn))
                ) {
                  var r = bn(t).closest(jn)[0];

                  if (r) {
                    var o = [].slice.call(r.querySelectorAll(Wn));
                    bn(o).addClass(Nn);
                  }

                  t.setAttribute('aria-expanded', !0);
                }

                n && n();
              }),
              (i._jQueryInterface = function(n) {
                return this.each(function() {
                  var t = bn(this);

                  var e = t.data(Sn);

                  if (
                    (e || ((e = new i(this)), t.data(Sn, e)), typeof n === 'string')
                  ) {
                    if (typeof e[n] === 'undefined') {
                      throw new TypeError('No method named "' + n + '"');
                    }
                    e[n]();
                  }
                });
              }),
              s(i, null, [
                {
                  key: 'VERSION',
                  get: function get() {
                    return '4.1.3';
                  }
                }
              ]),
              i
            );
          })()),
          bn(document).on(Dn.CLICK_DATA_API, xn, function(t) {
            t.preventDefault(), qn._jQueryInterface.call(bn(this), 'show');
          }),
          (bn.fn.tab = qn._jQueryInterface),
          (bn.fn.tab.Constructor = qn),
          (bn.fn.tab.noConflict = function() {
            return (bn.fn.tab = An), qn._jQueryInterface;
          }),
          qn);

          !(function(t) {
            if (typeof t === 'undefined') {
              throw new TypeError(
                "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
              );
            }
            var e = t.fn.jquery.split(' ')[0].split('.');
            if (
              (e[0] < 2 && e[1] < 9) ||
              (e[0] === 1 && e[1] === 9 && e[2] < 1) ||
              e[0] >= 4
            ) {
              throw new Error(
                "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
              );
            }
          })(e),
            (t.Util = Fn),
            (t.Alert = Kn),
            (t.Button = Mn),
            (t.Carousel = Qn),
            (t.Collapse = Bn),
            (t.Dropdown = Vn),
            (t.Modal = Yn),
            (t.Popover = Jn),
            (t.Scrollspy = Zn),
            (t.Tab = Gn),
            (t.Tooltip = zn),
            Object.defineProperty(t, '__esModule', {
              value: !0
            });
        });
      },
      {
        jquery: '../../node_modules/jquery/dist/jquery.js',
        'popper.js': '../../node_modules/popper.js/dist/esm/popper.js'
      }
    ],
    'starsAction.js': [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.starsAction = starsAction;

        function starsAction() {
          var ratingContainers = document.querySelectorAll('.stars');
          var containerWithBool = Array.from(ratingContainers).map(function(stars) {
            return {
              stars: stars,
              toggle: true
            };
          });
          containerWithBool.forEach(function(item, index) {
            for (var i = 0; i < item.stars.children.length; i++) {
              addOnClickEvents(item.stars.children[i], index);
              item.stars.children[i].addEventListener('mouseenter', eventMouseIn);
              item.stars.children[i].addEventListener('mouseleave', eventMouseOut);
            }
          });

          function addOnClickEvents(element, index) {
            element.addEventListener('click', function(e) {
              e.preventDefault();
              element.classList.add('active');
              onClick(element);
              containerWithBool[index].toggle = !containerWithBool[index].toggle;

              if (containerWithBool[index].toggle) {
                clearSiblins(this);
                clearSiblinsNxt(this);
                addEventsNext(this);
                addEventsPrev(this);
              }
            });
          }

          function onClick(element) {
            ratingOnClick(element);
            removeNextListeners(element);
            removePrevListeners(element);
          }

          function changeSiblings(element) {
            element.classList.add('active');

            if (element.previousElementSibling) {
              changeSiblings(element.previousElementSibling);
            }
          }

          function clearSiblins(element) {
            if (element.classList.contains('active')) {
              element.classList.remove('active');
            }

            if (element.previousElementSibling) {
              clearSiblins(element.previousElementSibling);
            }
          }

          function clearSiblinsNxt(element) {
            if (element.classList.contains('active')) {
              element.classList.remove('active');
            }

            if (element.nextElementSibling) {
              clearSiblinsNxt(element.nextElementSibling);
            }
          }

          function ratingOnClick(element) {
            element.classList.add('active');

            if (element.previousElementSibling) {
              ratingOnClick(element.previousElementSibling);
            }
          }

          function removeNextListeners(element) {
            element.removeEventListener('mouseleave', eventMouseOut);
            element.removeEventListener('mouseenter', eventMouseIn);

            if (element.nextElementSibling) {
              removeNextListeners(element.nextElementSibling);
            }
          }

          function removePrevListeners(element) {
            element.removeEventListener('mouseleave', eventMouseOut);
            element.removeEventListener('mouseenter', eventMouseIn);

            if (element.previousElementSibling) {
              removePrevListeners(element.previousElementSibling);
            }
          }

          function addEventsPrev(element) {
            element.addEventListener('mouseenter', eventMouseIn);
            element.addEventListener('mouseleave', eventMouseOut);

            if (element.previousElementSibling) {
              addEventsPrev(element.previousElementSibling);
            }
          }

          function addEventsNext(element) {
            element.addEventListener('mouseenter', eventMouseIn);
            element.addEventListener('mouseleave', eventMouseOut);

            if (element.nextElementSibling) {
              addEventsNext(element.nextElementSibling);
            }
          }

          function eventMouseOut() {
            clearSiblins(this);
          }

          function eventMouseIn() {
            changeSiblings(this);
          }
        }
      },
      {}
    ],
    'app.js': [
      function(require, module, exports) {
        'use strict';

        var _sliders = _interopRequireDefault(require('./sliders'));

        require('./bootstrap.min.js');

        var _starsAction = require('./starsAction');

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var hotDealsSlider = (0, _sliders.default)('.hot-deals-slider', {
          wrapAround: true,
          prevNextButtons: false,
          pageDots: false,
          draggable: false,
          autoPlay: true
        });
        var hotDealsDots = document.querySelectorAll('.hot-deals__dot');

        var _loop = function _loop(i) {
          hotDealsDots[i].addEventListener('click', function() {
            return hotDealsSlider.select(i);
          });
        };

        for (var i = 0; i < hotDealsDots.length; i++) {
          _loop(i);
        }

        hotDealsSlider.on('change', function(index) {
          clearDots(hotDealsDots);
          hotDealsDots[index].classList.add('active');
        });

        function clearDots(dots) {
          for (var i = 0; i < dots.length; i++) {
            if (dots[i].classList.contains('active')) {
              dots[i].classList.remove('active');
            }
          }
        }

        var distinguishSlider = (0, _sliders.default)('.distinguish-slider', {
          prevNextButtons: false,
          pageDots: false,
          wrapAround: true
        });
        var distinguishSliderNav = document.querySelectorAll('.distinguish__buttons');
        var distinguishSliderNavPrev = distinguishSliderNav[1];
        var distinguishSliderNavNext = distinguishSliderNav[0];
        distinguishSliderNavPrev.addEventListener('click', function() {
          return distinguishSlider.previous(true);
        });
        distinguishSliderNavNext.addEventListener('click', function() {
          return distinguishSlider.next(true);
        });
        (0, _sliders.default)('.brands-slider', {
          wrapAround: true,
          pageDots: false,
          groupCells: '100%',
          cellAlign: 'center',
          contain: true
        });
        (0, _sliders.default)('.blog-slider', {
          wrapAround: true
        });
        (0, _starsAction.starsAction)(); // Product section sliders in tabs

        var bedSlider = (0, _sliders.default)('#bed', {
          wrapAround: true
        });
        var chairSlider = (0, _sliders.default)('#chair', {
          wrapAround: true
        });
        var sofaSlider = (0, _sliders.default)('#sofa', {
          wrapAround: true
        });
        var tableSlider = (0, _sliders.default)('#table', {
          wrapAround: true
        });
        var diningSlider = (0, _sliders.default)('#dining', {
          wrapAround: true
        });
      },
      {
        './sliders': 'sliders.js',
        './bootstrap.min.js': 'bootstrap.min.js',
        './starsAction': 'starsAction.js'
      }
    ],
    '../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js': [
      function(require, module, exports) {
        var global = arguments[3];
        var OVERLAY_ID = '__parcel__error__overlay__';
        var OldModule = module.bundle.Module;

        function Module(moduleName) {
          OldModule.call(this, moduleName);
          this.hot = {
            data: module.bundle.hotData,
            _acceptCallbacks: [],
            _disposeCallbacks: [],
            accept: function(fn) {
              this._acceptCallbacks.push(fn || function() {});
            },
            dispose: function(fn) {
              this._disposeCallbacks.push(fn);
            }
          };
          module.bundle.hotData = null;
        }

        module.bundle.Module = Module;
        var checkedAssets, assetsToAccept;
        var parent = module.bundle.parent;

        if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
          var hostname = '' || location.hostname;
          var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
          var ws = new WebSocket(protocol + '://' + hostname + ':' + '55348' + '/');

          ws.onmessage = function(event) {
            checkedAssets = {};
            assetsToAccept = [];
            var data = JSON.parse(event.data);

            if (data.type === 'update') {
              var handled = false;
              data.assets.forEach(function(asset) {
                if (!asset.isNew) {
                  var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

                  if (didAccept) {
                    handled = true;
                  }
                }
              }); // Enable HMR for CSS by default.

              handled =
                handled ||
                data.assets.every(function(asset) {
                  return asset.type === 'css' && asset.generated.js;
                });

              if (handled) {
                console.clear();
                data.assets.forEach(function(asset) {
                  hmrApply(global.parcelRequire, asset);
                });
                assetsToAccept.forEach(function(v) {
                  hmrAcceptRun(v[0], v[1]);
                });
              } else {
                window.location.reload();
              }
            }

            if (data.type === 'reload') {
              ws.close();

              ws.onclose = function() {
                location.reload();
              };
            }

            if (data.type === 'error-resolved') {
              console.log('[parcel] ✨ Error resolved');
              removeErrorOverlay();
            }

            if (data.type === 'error') {
              console.error(
                '[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack
              );
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
          overlay.innerHTML =
            '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
            '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
            '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
            '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' +
            message.innerHTML +
            '</div>' +
            '<pre>' +
            stackTrace.innerHTML +
            '</pre>' +
            '</div>';
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

              if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
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

          return getParents(global.parcelRequire, id).some(function(id) {
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
            cached.hot._disposeCallbacks.forEach(function(cb) {
              cb(bundle.hotData);
            });
          }

          delete bundle.cache[id];
          bundle(id);
          cached = bundle.cache[id];

          if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
            cached.hot._acceptCallbacks.forEach(function(cb) {
              cb();
            });

            return true;
          }
        }
      },
      {}
    ]
  },
  {},
  ['../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js', 'app.js'],
  null
);
// # sourceMappingURL=/app.js.map
