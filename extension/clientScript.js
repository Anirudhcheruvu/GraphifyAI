/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config.json":
/*!*********************!*\
  !*** ./config.json ***!
  \*********************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"stream_interval":2000,"output_sample_rate":24000,"input_sample_rate":16000,"outputMode":"AUDIO","model":"gemini-2.0-flash-exp","generation_config":{"temperature":0,"top_p":0,"response_modalities":"AUDIO"},"tools":[{"function_declarations":[{"name":"process_graph_from_audio_tool","description":"A function that generated queries to query on database to get graph or data if a user makes a query about graph or any data point related to products, orders or customers.","parameters":{"type":"OBJECT","properties":{"query":{"type":"STRING","description":"The user query for retrieving data from database."}},"required":["query"]}}]}],"apiHost":"http://localhost:8080/process-image","wsHost":"ws://localhost:8080/ws"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./clientScript.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.json */ "./config.json");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }

function getTimestamp() {
  var now = new Date();
  return "".concat(now.toISOString(), " [").concat(now.getHours().toString().padStart(2, '0'), ":").concat(now.getMinutes().toString().padStart(2, '0'), ":").concat(now.getSeconds().toString().padStart(2, '0'), "]");
}
console.log(getTimestamp(), "Guidance UI Script loaded");
var Response = /*#__PURE__*/_createClass(function Response(data) {
  _classCallCheck(this, Response);
  this.text = null;
  this.audioData = null;
  this.endOfTurn = null;
  if (data.text) {
    this.text = data.text;
  }
  if (data.audio) {
    this.audioData = data.audio;
  }
});
function handleReceivedImage(renderedImage) {
  if (!renderedImage) return;
  var imageUrl = "data:image/png;base64,".concat(renderedImage);
  dynamicImage.src = imageUrl;

  // Show the image container
  imageContainer.style.display = "block";
}

// Define the AudioInputHandler class to handle audio input streams
var AudioInputHandler = /*#__PURE__*/function () {
  function AudioInputHandler() {
    _classCallCheck(this, AudioInputHandler);
    this.audioContext = null;
    this.audioWorkletNode = null;
    this.pcmData = [];
    this.interval = null;
    this.webSocket = null;
    this.stream = null;
    this.isRecording = false;
  }
  return _createClass(AudioInputHandler, [{
    key: "initializeAudioInputStreaming",
    value: function () {
      var _initializeAudioInputStreaming = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this = this;
        var moduleUrl, source;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: _config_json__WEBPACK_IMPORTED_MODULE_0__.input_sample_rate
              });

              // Load the AudioWorklet module from the extension
              moduleUrl = chrome.runtime.getURL('pcm-input-processor.js');
              _context.next = 5;
              return this.audioContext.audioWorklet.addModule(moduleUrl);
            case 5:
              console.log(getTimestamp(), "Audio Input Worklet module loaded successfully:", moduleUrl);
              _context.next = 8;
              return navigator.mediaDevices.getUserMedia({
                audio: {
                  channelCount: 1,
                  sampleRate: 16000
                }
              });
            case 8:
              this.stream = _context.sent;
              source = this.audioContext.createMediaStreamSource(this.stream);
              this.audioWorkletNode = new AudioWorkletNode(this.audioContext, 'pcm-input-processor');

              // Listen for messages from the AudioWorkletProcessor
              this.audioWorkletNode.port.onmessage = function (event) {
                var _this$pcmData;
                var pcm16 = event.data;
                (_this$pcmData = _this.pcmData).push.apply(_this$pcmData, _toConsumableArray(pcm16));
              };
              source.connect(this.audioWorkletNode);
              console.log(getTimestamp(), "Initialized Audio Input Streaming");
              return _context.abrupt("return", {
                success: true
              });
            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](0);
              console.error(getTimestamp(), "Error Initializing Audio Input Streaming.", _context.t0);
              return _context.abrupt("return", {
                success: false,
                error: _context.t0
              });
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 17]]);
      }));
      function initializeAudioInputStreaming() {
        return _initializeAudioInputStreaming.apply(this, arguments);
      }
      return initializeAudioInputStreaming;
    }() // Convert PCM data to base64 and send using the callback
  }, {
    key: "startRecording",
    value: function () {
      var _startRecording = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var buffer, view, b64PCM;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.isRecording) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return");
            case 2:
              _context2.prev = 2;
              // console.log(getTimestamp(), "Starting conversion of PCM Data to base64")
              this.isRecording = true;
              /* 
              this.pcmData contains audio samples (numbers) in a raw format. 
              To send this data as Base64, we first need to pack it into a binary buffer.
              PCM audio data is typically represented as 16-bit signed integers (Int16). 
              Since each Int16 takes 2 bytes, we need this.pcmData.length * 2 bytes of memory. 
              */
              buffer = new ArrayBuffer(this.pcmData.length * 2);
              /* 
              A DataView object is created to interact with the binary data in the ArrayBuffer.
              DataView provides methods to read and write specific data types (like 16-bit integers) 
              at specified byte offsets in the buffer.
              */
              view = new DataView(buffer);
              /*
              Each sample in this.pcmData (a 16-bit integer) is written into the ArrayBuffer using the setInt16 method of DataView.
              index * 2: This calculates the byte offset for each sample because each sample takes 2 bytes.
              value: This is the PCM value being written.
              true: This specifies little-endian byte order, which is a common format for audio data.
              */
              this.pcmData.forEach(function (value, index) {
                view.setInt16(index * 2, value, true);
              });

              /*
              The Uint8Array is used to create a view of the ArrayBuffer as bytes (8-bit unsigned integers).
              String.fromCharCode.apply(null, ...) is then used to create a string where each byte from the Uint8Array is converted to a character.
              The btoa function is used to convert that string into a Base64-encoded string.
              */
              b64PCM = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer))); // console.log(getTimestamp(), "PCM Data converted to base64")
              return _context2.abrupt("return", b64PCM);
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](2);
              console.error(getTimestamp(), "Error during PCM to Base64 conversion", _context2.t0);
              return _context2.abrupt("return", null);
            case 15:
              _context2.prev = 15;
              this.pcmData = [];
              this.isRecording = false;
              return _context2.finish(15);
            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[2, 11, 15, 19]]);
      }));
      function startRecording() {
        return _startRecording.apply(this, arguments);
      }
      return startRecording;
    }()
  }, {
    key: "stopRecording",
    value: function stopRecording() {
      var _this2 = this;
      console.log(getTimestamp(), "Stopping audio input recording");

      // Stop the media stream tracks
      if (this.stream) {
        this.stream.getTracks().forEach(function (track) {
          return track.stop();
        });
        this.stream = null;
      }

      // Disconnect and clean up audio nodes
      if (this.audioWorkletNode) {
        this.audioWorkletNode.disconnect();
        this.audioWorkletNode = null;
      }

      // Close the audio context
      if (this.audioContext) {
        this.audioContext.close().then(function () {
          _this2.audioContext = null;
          console.log(getTimestamp(), "Audio context closed successfully");
        })["catch"](function (error) {
          console.error(getTimestamp(), "Error closing audio context:", error);
        });
      }
      this.isRecording = false;
    }
  }]);
}();
var StreamHandler = /*#__PURE__*/function () {
  function StreamHandler() {
    _classCallCheck(this, StreamHandler);
    this.startButton = document.getElementById('startButton');
    this.stopButton = document.getElementById('stopButton');
    this.generateGraphButton = document.getElementById('generateGraphButton');
    this.screenCaptureHandler = null;
    this.audioOutputHandler = null;
    this.audioInputHandler = null;
    this.audioInterval = null;
    this.URL = "ws://localhost:8080/ws";
    this.isVideoMode = false;
  }
  return _createClass(StreamHandler, [{
    key: "startStreaming",
    value: function () {
      var _startStreaming = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var audioInInit, audioOutInit;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              // AUDIO MODE: Initialize audio components
              this.audioInputHandler = new AudioInputHandler();
              this.audioOutputHandler = new AudioOutputHandler();

              // Initialize both input and output audio
              _context3.next = 5;
              return this.audioInputHandler.initializeAudioInputStreaming();
            case 5:
              audioInInit = _context3.sent;
              _context3.next = 8;
              return this.audioOutputHandler.initializeAudioOutputStreaming();
            case 8:
              audioOutInit = _context3.sent;
              if (!(!audioInInit.success || !audioOutInit.success)) {
                _context3.next = 11;
                break;
              }
              throw new Error('Audio initialization failed');
            case 11:
              _context3.next = 13;
              return this.connect();
            case 13:
              this.startAudioStreaming();

              // Common UI updates
              document.getElementById('toggleModeButton').disabled = true;
              this.stopButton.disabled = false;
              this.startButton.disabled = true;
              _context3.next = 24;
              break;
            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](0);
              console.error(getTimestamp(), "Error during streaming initialization:", _context3.t0);
              // Change this:
              this.cleanupResources();
              // To:
              this.isVideoMode ? this.cleanupVideoResources() : this.cleanupAudioResources();
            case 24:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 19]]);
      }));
      function startStreaming() {
        return _startStreaming.apply(this, arguments);
      }
      return startStreaming;
    }()
  }, {
    key: "startAudioStreaming",
    value: function startAudioStreaming() {
      var _this3 = this;
      this.audioInterval = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var b64PCM, nextResult;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _this3.audioInputHandler.startRecording();
            case 3:
              b64PCM = _context4.sent;
              if (!b64PCM) {
                _context4.next = 8;
                break;
              }
              _context4.next = 7;
              return _this3.sendMessageToServer(b64PCM);
            case 7:
              nextResult = _context4.sent;
            case 8:
              _context4.next = 13;
              break;
            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              console.error(getTimestamp(), "Error during audio streaming:", _context4.t0);
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 10]]);
      })), _config_json__WEBPACK_IMPORTED_MODULE_0__.stream_interval);
      console.log(getTimestamp(), "Audio Interval started:", this.audioInterval);
    }
  }, {
    key: "startScreenCapture",
    value: function startScreenCapture() {
      var _this4 = this;
      this.captureInterval = window.setInterval(function () {
        _this4.screenCaptureHandler.captureImage();
      }, _config_json__WEBPACK_IMPORTED_MODULE_0__.stream_interval);
      console.log(getTimestamp(), "Capture Interval started:", this.captureInterval);
    }
  }, {
    key: "handleGenerateGraph",
    value: function () {
      var _handleGenerateGraph = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var imageData, response, result;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (this.screenCaptureHandler) {
                _context5.next = 3;
                break;
              }
              console.error("No screen capture handler initialized");
              return _context5.abrupt("return");
            case 3:
              _context5.prev = 3;
              this.generateGraphButton.disabled = true;
              this.screenCaptureHandler.captureImage();

              // Add validation
              if (this.screenCaptureHandler.currentFrameB64) {
                _context5.next = 8;
                break;
              }
              throw new Error("Failed to capture screen image");
            case 8:
              imageData = this.screenCaptureHandler.currentFrameB64;
              _context5.next = 11;
              return fetch("".concat(_config_json__WEBPACK_IMPORTED_MODULE_0__.apiHost), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  image: imageData
                })
              });
            case 11:
              response = _context5.sent;
              if (response.ok) {
                _context5.next = 14;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 14:
              _context5.next = 16;
              return response.json();
            case 16:
              result = _context5.sent;
              handleReceivedImage(result.renderedImage);
              _context5.next = 23;
              break;
            case 20:
              _context5.prev = 20;
              _context5.t0 = _context5["catch"](3);
              console.error(getTimestamp(), "Graph generation failed:", _context5.t0);
            case 23:
              _context5.prev = 23;
              this.generateGraphButton.disabled = false;
              return _context5.finish(23);
            case 26:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[3, 20, 23, 26]]);
      }));
      function handleGenerateGraph() {
        return _handleGenerateGraph.apply(this, arguments);
      }
      return handleGenerateGraph;
    }()
  }, {
    key: "sendMessageToServer",
    value: function () {
      var _sendMessageToServer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(b64PCM) {
        var _this$screenCaptureHa;
        var mediaChunks, payload;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (!(this.webSocket == null)) {
                _context6.next = 3;
                break;
              }
              console.log(getTimestamp(), "Websocket not initialized");
              return _context6.abrupt("return");
            case 3:
              // Build an array of media chunks (audio is always sent)
              mediaChunks = [{
                mime_type: "audio/pcm",
                data: b64PCM
              }]; // If in video mode and an image was captured, add the video payload.
              if (this.isVideoMode && (_this$screenCaptureHa = this.screenCaptureHandler) !== null && _this$screenCaptureHa !== void 0 && _this$screenCaptureHa.currentFrameB64) {
                mediaChunks.push({
                  mime_type: "image/jpeg",
                  data: this.screenCaptureHandler.currentFrameB64
                });
              }
              payload = {
                realtime_input: {
                  media_chunks: mediaChunks
                }
              };
              this.webSocket.send(JSON.stringify(payload));
              console.log(getTimestamp(), "Sent to Server: ");
            case 8:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function sendMessageToServer(_x) {
        return _sendMessageToServer.apply(this, arguments);
      }
      return sendMessageToServer;
    }()
  }, {
    key: "stopStreaming",
    value: function () {
      var _stopStreaming = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var _this$audioInputHandl, _this$audioOutputHand;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              console.log(getTimestamp(), "Stopping Streaming.");
              if (this.isVideoMode && this.screenCaptureHandler) {
                this.screenCaptureHandler.stopRecording();
                this.screenCaptureHandler = null;
              }
              if (this.audioInterval) {
                clearInterval(this.audioInterval);
                this.audioInterval = null;
              }
              if (this.webSocket) {
                this.webSocket.close();
                this.webSocket = null;
              }
              (_this$audioInputHandl = this.audioInputHandler) === null || _this$audioInputHandl === void 0 || _this$audioInputHandl.stopRecording();
              (_this$audioOutputHand = this.audioOutputHandler) === null || _this$audioOutputHand === void 0 || _this$audioOutputHand.stopRecording();
              document.getElementById('toggleModeButton').disabled = false;
              this.stopButton.disabled = true;
              this.startButton.disabled = false;
            case 9:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function stopStreaming() {
        return _stopStreaming.apply(this, arguments);
      }
      return stopStreaming;
    }()
  }, {
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var _this5 = this;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              console.log(getTimestamp(), "Connecting: ", this.URL);
              this.webSocket = new WebSocket(this.URL);
              this.webSocket.onclose = function (event) {
                console.log(getTimestamp(), "Websocket Closed: ", event);
                if (event.code === 1006) {
                  alert("Connection Closed Unexpectedly");
                }
              };
              this.webSocket.onerror = function (event) {
                console.log(getTimestamp(), "Websocket Error: ", event);
              };
              this.webSocket.onopen = /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(event) {
                  return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                    while (1) switch (_context8.prev = _context8.next) {
                      case 0:
                        console.log(getTimestamp(), "Websocket Open: ", event);
                        _context8.next = 3;
                        return _this5.sendInitialSetupMessage();
                      case 3:
                      case "end":
                        return _context8.stop();
                    }
                  }, _callee8);
                }));
                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }();
              this.webSocket.onmessage = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(event) {
                  return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                    while (1) switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return _this5.receiveMessage(event);
                      case 2:
                      case "end":
                        return _context9.stop();
                    }
                  }, _callee9);
                }));
                return function (_x3) {
                  return _ref3.apply(this, arguments);
                };
              }();
            case 6:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
  }, {
    key: "sendInitialSetupMessage",
    value: function () {
      var _sendInitialSetupMessage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var setup_client_message;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              console.log(getTimestamp(), "Sending setup message");
              setup_client_message = {
                setup: {
                  generation_config: {
                    response_modalities: [_config_json__WEBPACK_IMPORTED_MODULE_0__.generation_config.response_modalities]
                  },
                  tools: _config_json__WEBPACK_IMPORTED_MODULE_0__.tools
                }
              };
              this.webSocket.send(JSON.stringify(setup_client_message));
            case 3:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function sendInitialSetupMessage() {
        return _sendInitialSetupMessage.apply(this, arguments);
      }
      return sendInitialSetupMessage;
    }()
  }, {
    key: "receiveMessage",
    value: function () {
      var _receiveMessage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(event) {
        var messageData, response;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              messageData = JSON.parse(event.data);
              response = new Response(messageData);
              if (!response.audioData) {
                _context12.next = 5;
                break;
              }
              _context12.next = 5;
              return this.audioOutputHandler.injestAudioChunkToPlay(response.audioData);
            case 5:
              if (response.text) {
                displayMessage(response.text);
              }

              // If an image is received, process it
              if (!messageData.renderedImage) {
                _context12.next = 9;
                break;
              }
              _context12.next = 9;
              return handleReceivedImage(messageData.renderedImage);
            case 9:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function receiveMessage(_x4) {
        return _receiveMessage.apply(this, arguments);
      }
      return receiveMessage;
    }()
  }, {
    key: "cleanupVideoResources",
    value: function cleanupVideoResources() {
      if (this.screenCaptureHandler) {
        this.screenCaptureHandler.stopRecording();
        this.screenCaptureHandler = null;
      }
    }
  }, {
    key: "cleanupAudioResources",
    value: function cleanupAudioResources() {
      var _this$audioInputHandl2, _this$audioOutputHand2;
      (_this$audioInputHandl2 = this.audioInputHandler) === null || _this$audioInputHandl2 === void 0 || _this$audioInputHandl2.stopRecording();
      (_this$audioOutputHand2 = this.audioOutputHandler) === null || _this$audioOutputHand2 === void 0 || _this$audioOutputHand2.stopRecording();
    }
  }]);
}(); // Define the AudioOutputHandler class to handle audio output streams
var AudioOutputHandler = /*#__PURE__*/function () {
  function AudioOutputHandler() {
    _classCallCheck(this, AudioOutputHandler);
    this.audioContext = null;
    this.audioWorkletNode = null;
    this.initialized = false;
  }

  // Initialize the audio output context and audio worklet
  return _createClass(AudioOutputHandler, [{
    key: "initializeAudioOutputStreaming",
    value: function () {
      var _initializeAudioOutputStreaming = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
        var moduleUrl;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              if (!this.initialized) {
                _context13.next = 2;
                break;
              }
              return _context13.abrupt("return");
            case 2:
              _context13.prev = 2;
              this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: _config_json__WEBPACK_IMPORTED_MODULE_0__.output_sample_rate
              });
              // Load the AudioWorklet module from the extension
              moduleUrl = chrome.runtime.getURL('pcm-output-processor.js');
              _context13.next = 7;
              return this.audioContext.audioWorklet.addModule(moduleUrl);
            case 7:
              console.log(getTimestamp(), "Audio Output Worklet module loaded successfully:", moduleUrl);
              this.audioWorkletNode = new AudioWorkletNode(this.audioContext, "pcm-output-processor");
              this.audioWorkletNode.connect(this.audioContext.destination);
              this.initialized = true;
              console.log(getTimestamp(), "Initialized Audio Output Streaming");
              return _context13.abrupt("return", {
                success: true
              });
            case 15:
              _context13.prev = 15;
              _context13.t0 = _context13["catch"](2);
              console.error(getTimestamp(), "Error Initializing Audio Output Streaming.", _context13.t0);
              return _context13.abrupt("return", {
                success: false,
                error: _context13.t0
              });
            case 19:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this, [[2, 15]]);
      }));
      function initializeAudioOutputStreaming() {
        return _initializeAudioOutputStreaming.apply(this, arguments);
      }
      return initializeAudioOutputStreaming;
    }()
  }, {
    key: "stopRecording",
    value: function stopRecording() {
      if (this.audioWorkletNode) {
        this.audioWorkletNode.disconnect();
      }
      if (this.audioContext) {
        this.audioContext.close();
      }
    }

    // Convert base64 audio data to ArrayBuffer and play it
  }, {
    key: "injestAudioChunkToPlay",
    value: function () {
      var _injestAudioChunkToPlay = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(base64AudioChunk) {
        var arrayBuffer, float32Data;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              if (!(this.audioContext.state === "suspended")) {
                _context14.next = 4;
                break;
              }
              _context14.next = 4;
              return this.audioContext.resume();
            case 4:
              arrayBuffer = base64ToArrayBuffer(base64AudioChunk);
              float32Data = convertPCM16LEToFloat32(arrayBuffer); // console.log("Received Float32 audio data:", float32Data); // Add this log
              this.audioWorkletNode.port.postMessage(float32Data);
              _context14.next = 12;
              break;
            case 9:
              _context14.prev = 9;
              _context14.t0 = _context14["catch"](0);
              console.error(getTimestamp(), "Error processing audio chunk:", _context14.t0);
            case 12:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this, [[0, 9]]);
      }));
      function injestAudioChunkToPlay(_x5) {
        return _injestAudioChunkToPlay.apply(this, arguments);
      }
      return injestAudioChunkToPlay;
    }()
  }]);
}();
function base64ToArrayBuffer(base64) {
  // console.log("Input Base64 String:", base64); // Add this log
  var binaryString = window.atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  // console.log("Decoded ArrayBuffer:", bytes); // Add this log

  return bytes.buffer;
}
function convertPCM16LEToFloat32(pcmData) {
  var inputArray = new Int16Array(pcmData);
  var float32Array = new Float32Array(inputArray.length);
  // console.log("Input PCM Int16Array:", inputArray); // Add this log

  for (var i = 0; i < inputArray.length; i++) {
    float32Array[i] = inputArray[i] / 32768;
  }
  // console.log("Converted Float32Array:", float32Array); // Add this log

  return float32Array;
}
var uiContainer = document.createElement('div');
uiContainer.id = 'screen-capture-ui';
// Inject the UI HTML into the container
uiContainer.innerHTML = "\n  <div class=\"screen-capture-overlay\">\n    <video id=\"videoElement\" autoplay style=\"display:none;\"></video>\n    <canvas id=\"canvasElement\" style=\"display:none;\"></canvas>\n    <div class=\"button-container-gemini\">\n      <button id=\"startButton\" class=\"anirudh-button-class start-btn\">Start Listening</button>\n      <button id=\"toggleModeButton\" class=\"anirudh-button-class mode-btn\">Visualize</button>\n      <button id=\"generateGraphButton\" class=\"anirudh-button-class\" style=\"display: none\">Generate Graph</button>\n      <button id=\"stopButton\" class=\"anirudh-button-class stop-btn\" disabled>Stop Listening</button>\n    </div>\n  </div>\n";
{/* <div id="chatLog"></div> */}

// Function to display a message in the chat log
function displayMessage(text) {
  console.log("Display Text is: ", text);
  try {
    // Parse the input text as JSON
    var textJSON = JSON.parse(text);
    console.log("Text JSON is: ", textJSON);

    // Extract the guide from the JSON response
    var guide = textJSON[0].response.result;

    // Extract the guide title (text before the first newline)
    var guideTitle = guide.split("\n")[0];

    // Create a new paragraph element to display the title
    var newParagraph = document.createElement("p");
    // Add the guide title in bold using <strong>
    newParagraph.innerHTML = "Fetching Guide for: <strong>".concat(guideTitle, "</strong>");

    // Append the title to the chat log
    var chatLog = document.getElementById("chatLog");
    chatLog.appendChild(newParagraph);

    // Scroll to the bottom of the chat log
    chatLog.scrollTop = chatLog.scrollHeight;
  } catch (error) {
    console.error("Error processing the guide:", error);
  }
}
var style = document.createElement("style");
style.textContent = "\n  .screen-capture-overlay {\n    border-radius: 8px;\n    }\n    \n  #screen-capture-ui {\n  border: 1px solid rgba(0,0,0,0.1);\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  z-index: 9999;\n  background-color: rgb(245, 245, 230);\n  padding: 15px;\n  border-radius: 10px;\n  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\n  border: 2px solid black;\n  // width: 360px; /* Fixed width */\n  // height: 150px; /* Fixed height */\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 20px 15px; \n}\n  \n.button-container-gemini {\n  display: flex;\n  justify-content: space-between; /* Ensures even spacing */\n  align-items: center; /* Aligns buttons vertically */\n  width: 100%;\n  gap: 12px; /* Ensures spacing between buttons */\n  padding: 12px 0;\n  box-sizing: border-box; /* Ensures padding doesn't increase width */\n}\n\n.anirudh-button-class {\n  all: unset; /* Reset inherited styles */\n  line-height: 1.2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  font-family: Arial, Helvetica, sans-serif !important;\n  padding: 12px 10px;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 13px;\n  flex: 1; /* Ensures buttons take equal width */\n  min-width: 100px; /* Maintains uniform button width */\n  max-width: 100px; /* Prevents uneven stretching */\n  height: 38px; /* Ensures all buttons have the same height */\n  white-space: normal !important; /* Prevents text from wrapping */\n  line-height: 1.1; \n  word-break: break-word;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Subtle depth */\n  transition: all 0.2s ease; /* Smooth hover effects */\n}\n\n.anirudh-button-class:not(:disabled) {\n  // background-color: #4CAF50;\n  color: white;\n}\n\n.anirudh-button-class:hover {\n  // background-color: #45a049;\n}\n\n.anirudh-button-class:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 3px 6px rgba(0,0,0,0.15);\n}\n  \n.anirudh-button-class:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n}\n  .start-btn {\n  background-color: #4CAF50;\n}\n\n.start-btn:hover {\n  background-color: #45a049;\n}\n\n.stop-btn {\n  background-color: rgba(220, 53, 70, 0.54);\n}\n\n.stop-btn:hover {\n  background-color: #a71d2a;\n}\n\n.mode-btn {\n  background-color: #2196F3;\n  min-height: 40px; \n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 2px;\n}\n\n.mode-btn:hover {\n  background-color: #1976D2;\n}\n\n#generateGraphButton {\n  background-color: #9C27B0;  /* Modern purple */\n  color: white;\n  transition: all 0.2s ease;\n}\n\n#generateGraphButton:hover {\n  background-color: #7B1FA2;  /* Deep amethyst */\n}\n\n#generateGraphButton:active {\n  background-color: #6A1B9A;  /* Rich royal purple */\n}\n\n#generateGraphButton:disabled {\n  background-color: #CE93D8;  /* Soft lavender */\n  cursor: not-allowed;\n}\n\n  #chatLog {\n    width: 320px;\n    height: 560px;\n    overflow-y: auto;\n    border: 1px solid #ddd;\n    border-radius: 4px;\n    padding: 8px;\n    margin-top: 10px;\n    background-color: #f5f5f5;\n  }\n\n  #chatLog p {\n    margin: 8px 0;\n    padding: 12px;\n    border-radius: 8px;\n    background-color: white;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);\n    color: black;\n  }\n\n  #chatLog p:nth-child(odd) {\n    background-color: #e8eaf6;\n  }\n";

// Append the style and container to the document
document.head.appendChild(style);
document.body.appendChild(uiContainer);

// ----- Dynamic Image Handling Section -----

// Create a dynamic image container (hidden by default)
var imageContainer = document.createElement("div");
imageContainer.id = "dynamicImageContainer";
imageContainer.style.position = "fixed";
imageContainer.style.top = "50%";
imageContainer.style.left = "50%";
imageContainer.style.transform = "translate(-50%, -50%)";
imageContainer.style.backgroundColor = "rgba(0,0,0,0.8)";
imageContainer.style.padding = "15px";
imageContainer.style.borderRadius = "8px";
imageContainer.style.display = "none"; // Initially hidden
imageContainer.style.zIndex = "10000";
imageContainer.style.textAlign = "center";

// Create an image element to display received images
var dynamicImage = document.createElement("img");
dynamicImage.id = "dynamicImage";
dynamicImage.style.maxWidth = "90vw";
dynamicImage.style.maxHeight = "90vh";
dynamicImage.style.display = "block";
dynamicImage.style.marginBottom = "10px";

// Create a close button for the image viewer
var closeButton = document.createElement("button");
closeButton.innerText = "Close";
closeButton.style.padding = "10px 15px";
closeButton.style.border = "none";
closeButton.style.backgroundColor = "#ff4444";
closeButton.style.color = "white";
closeButton.style.borderRadius = "5px";
closeButton.style.cursor = "pointer";

// Close the image viewer when the button is clicked
closeButton.addEventListener("click", function () {
  imageContainer.style.display = "none"; // Hide the container
});

// Append the image and close button to the container
imageContainer.appendChild(dynamicImage);
imageContainer.appendChild(closeButton);

// Append the container to the body (but keep it hidden initially)
document.body.appendChild(imageContainer);

// Enable dragging for the UI container
var isDragging = false;
var offsetX, offsetY;

// Event 
uiContainer.addEventListener('mousedown', function (event) {
  isDragging = true;

  // Get the mouse position relative to the UI container
  var rect = uiContainer.getBoundingClientRect();
  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;

  // Change the cursor to move
  uiContainer.style.cursor = 'move';
});
document.addEventListener('mousemove', function (event) {
  if (isDragging) {
    // Prevent text selection while dragging
    event.preventDefault();

    // Set the new position of the UI container
    uiContainer.style.left = "".concat(event.clientX - offsetX, "px");
    uiContainer.style.top = "".concat(event.clientY - offsetY, "px");
  }
});
document.addEventListener('mouseup', function () {
  isDragging = false;

  // Reset the cursor
  uiContainer.style.cursor = 'default';
});

// Append the UI container to the body of the page
document.body.appendChild(uiContainer);
console.log(getTimestamp(), "UI container appended");
var streamHandlerInstance = new StreamHandler();

// Default mode: audio only
streamHandlerInstance.isVideoMode = false;
function captureImage() {
  return _captureImage.apply(this, arguments);
}
function _captureImage() {
  _captureImage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          return _context16.abrupt("return", new Promise(function (resolve, reject) {
            chrome.runtime.sendMessage({
              action: "captureVisibleTab"
            }, function (response) {
              if (!response || response.success === false) {
                console.error("Failed to capture screen:", (response === null || response === void 0 ? void 0 : response.error) || "Unknown error");
                reject(new Error((response === null || response === void 0 ? void 0 : response.error) || "Unknown error"));
                return;
              }
              resolve(response.dataUrl.split(",")[1]); // Return base64 image data
            });
          }));
        case 1:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return _captureImage.apply(this, arguments);
}
function sendTableAndReceiveImage(_x6) {
  return _sendTableAndReceiveImage.apply(this, arguments);
} // After initializing streamHandlerInstance
function _sendTableAndReceiveImage() {
  _sendTableAndReceiveImage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(capturedImage) {
    var response;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return fetch("".concat(_config_json__WEBPACK_IMPORTED_MODULE_0__.apiHost), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image: capturedImage
            })
          });
        case 2:
          response = _context17.sent;
          if (response.ok) {
            _context17.next = 5;
            break;
          }
          throw new Error("HTTP error! status: ".concat(response.status));
        case 5:
          return _context17.abrupt("return", response);
        case 6:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return _sendTableAndReceiveImage.apply(this, arguments);
}
streamHandlerInstance.generateGraphButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
  var capturedImage, response, result;
  return _regeneratorRuntime().wrap(function _callee15$(_context15) {
    while (1) switch (_context15.prev = _context15.next) {
      case 0:
        _context15.prev = 0;
        // generateButton.innerText = 'Generating graph...'; 
        streamHandlerInstance.generateGraphButton.disabled = true;
        _context15.next = 4;
        return captureImage();
      case 4:
        capturedImage = _context15.sent;
        if (capturedImage) {
          _context15.next = 7;
          break;
        }
        throw new Error("Failed to capture screen image");
      case 7:
        _context15.next = 9;
        return sendTableAndReceiveImage(capturedImage);
      case 9:
        response = _context15.sent;
        _context15.next = 12;
        return response.json();
      case 12:
        result = _context15.sent;
        handleReceivedImage(result.renderedImage);
        _context15.next = 19;
        break;
      case 16:
        _context15.prev = 16;
        _context15.t0 = _context15["catch"](0);
        console.error(getTimestamp(), "Graph generation failed:", _context15.t0);
      case 19:
        _context15.prev = 19;
        streamHandlerInstance.generateGraphButton.disabled = false;
        // generateButton.innerText = 'Generate Graph';
        return _context15.finish(19);
      case 22:
      case "end":
        return _context15.stop();
    }
  }, _callee15, null, [[0, 16, 19, 22]]);
})));
var toggleModeButton = document.getElementById('toggleModeButton');
toggleModeButton.addEventListener('click', function () {
  streamHandlerInstance.isVideoMode = !streamHandlerInstance.isVideoMode;
  streamHandlerInstance.generateGraphButton.style.display = streamHandlerInstance.isVideoMode ? 'inline-block' : 'none';
  streamHandlerInstance.startButton.style.display = streamHandlerInstance.isVideoMode ? 'none' : 'inline-block';
  streamHandlerInstance.stopButton.style.display = streamHandlerInstance.isVideoMode ? 'none' : 'inline-block';

  // screenCaptureHandler = new ScreenCapture();

  toggleModeButton.innerText = streamHandlerInstance.isVideoMode ? 'back' : 'Visualize';
});
streamHandlerInstance.startButton.addEventListener("click", function () {
  return streamHandlerInstance.startStreaming();
});
streamHandlerInstance.stopButton.addEventListener("click", function () {
  return streamHandlerInstance.stopStreaming();
});
})();

/******/ })()
;
//# sourceMappingURL=clientScript.js.map