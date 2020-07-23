(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Cabinet"] = factory();
	else
		root["Cabinet"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

/**
 * 执行渲染
 * @param {*} selector 宿主（容器）
 */

function runCabinet(selector) {
  var iScene = new _Sprite__WEBPACK_IMPORTED_MODULE_0__["default"]({
    parent: selector ? document.querySelector(selector) : window
  });
  return iScene;
}

/* harmony default export */ __webpack_exports__["default"] = (runCabinet);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



var Sprite = /*#__PURE__*/function () {
  function Sprite(params) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Sprite);

    this.parent = params.parent;
    this.scene = new THREE.Scene();
    this.scene.position.set(0, -40, 10);
    this.camera = this.initCamera(params.parent);
    this.canControl = false; // 粒子效果相关参数

    this.particle = null;
    this.particles = [];
    this.AMOUNTX = 100;
    this.AMOUNTY = 80;
    this.SEPARATION = 60;
    this.count = 0; // 设置开发模式

    this.dev = params && params.dev;
    this.initLight();
    this.initRenderer(params.parent);
    this.initWave();
    this.render();
    this.animationID = this.animate();
    window.addEventListener('resize', this.onResize.bind(this, params.parent), false);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Sprite, [{
    key: "destroyed",
    value: function destroyed() {
      window.cancelAnimationFrame(this.animationID);
      this.scene = null;
      this.camera = null;
      this.particle = null;
      this.particles = [];
      this.dircLight = null;
      this.dev = null;
      window.removeEventListener('resize', function () {});

      if (this.parent) {
        this.parent.removeChild(this.renderer.domElement);
      }

      this.renderer = null;
    } // 渲染摄像头

  }, {
    key: "initCamera",
    value: function initCamera(container) {
      var width = container ? container.offsetWidth : window.innerWidth;
      var height = container ? container.offsetHeight : window.innerHeight;
      var camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
      camera.position.set(0, 30, 200);
      return camera;
    } // 渲染灯光

  }, {
    key: "initLight",
    value: function initLight() {
      this.dircLight = new THREE.DirectionalLight(0xffffff);
      this.dircLight.position.set(300, 400, 200);
      this.scene.add(this.dircLight);
      var hemi = new THREE.HemisphereLight(0x003073, 0x029797, 0.75);
      hemi.position.set(0.5, 1, 0.75);
      this.scene.add(hemi);
    } // 渲染场景

  }, {
    key: "initRenderer",
    value: function initRenderer(container) {
      var width = container ? container.offsetWidth : window.innerWidth;
      var height = container ? container.offsetHeight : window.innerHeight;
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      this.renderer.setSize(width, height);
      this.renderer.setClearColor('#003879');
      container ? container.appendChild(this.renderer.domElement) : document.body.appendChild(this.renderer.domElement);
    } //  added by tim

  }, {
    key: "initWave",
    value: function initWave() {
      var PI2 = Math.PI * 2;
      var mt = new THREE.PointCloudMaterial({
        color: '#02d7e8',
        program: function program(context) {
          context.beginPath();
          context.arc(0, 0, 16, 0, PI2);
          context.fill();
        }
      });
      var i = 0;

      for (var ix = 0; ix < this.AMOUNTX; ix++) {
        for (var iy = 0; iy < this.AMOUNTY; iy++) {
          this.particle = this.particles[i++] = new THREE.Sprite(mt);
          this.particle.position.x = ix * this.SEPARATION - this.AMOUNTX * this.SEPARATION / 2;
          this.particle.position.z = iy * this.SEPARATION - this.AMOUNTY * this.SEPARATION / 2;
          this.scene.add(this.particle);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      TWEEN.update();

      if (this.particle) {
        var i = 0;

        for (var ix = 0; ix < this.AMOUNTX; ix++) {
          for (var iy = 0; iy < this.AMOUNTY; iy++) {
            this.particle = this.particles[i++];
            this.particle.position.y = Math.sin((ix + this.count) * 0.3) * 50 + Math.sin((iy + this.count) * 0.5) * 50 - 100;
            this.particle.scale.x = this.particle.scale.y = (Math.sin((ix + this.count) * 0.3) + 1) * 2 + Math.sin((iy + this.count) * 0.5 + 1) * 2;
          }
        }

        this.count += 0.1;
        this.renderer.render(this.scene, this.camera);
      }
    } // resize事件处理

  }, {
    key: "onResize",
    value: function onResize(container) {
      var width = container ? container.offsetWidth : window.innerWidth;
      var height = container ? container.offsetHeight : window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }, {
    key: "animate",
    value: function animate() {
      this.render();
      return window.requestAnimationFrame(this.animate.bind(this));
    }
  }]);

  return Sprite;
}();

/* harmony default export */ __webpack_exports__["default"] = (Sprite);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ })
/******/ ])["default"];
});