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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _ISceneUmd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _Server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _Cabinet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _Switch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _Rope__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _Smoke__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _InfoPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12);








 // window.onload = function() {
//   const scene = runCabinet('body', true, (cabinet) => {
//     console.log('回调执行，mmp', cabinet)
//   })
// }

/**
 * 执行渲染
 * @param {*} selector 宿主（容器）
 */

function runCabinet(selector) {
  var renderCabinet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  var config = {
    switchTop: 11.5,
    // 交换机距离地板的高度
    serverTop: 21.5,
    // 最低的服务器距离地板的高度
    serverHeight: 4,
    // 服务器自身高度
    serverSpacing: 2.1,
    // 服务器之间的间隔
    maxServerCount: 11 // 最多能存放几台服务器

  };
  var data = [{
    name: '机柜1',
    wd: 30,
    sd: 20
  }, {
    name: '机柜2',
    wd: 30,
    sd: 20
  }, {
    name: '机柜3',
    wd: 30,
    sd: 20
  }];
  var iScene = new _ISceneUmd__WEBPACK_IMPORTED_MODULE_1__["default"]({
    parent: document.querySelector(selector || 'body'),
    control: true,
    callback: callback
  });

  if (!renderCabinet) {
    return false;
  }

  Object(_InfoPanel__WEBPACK_IMPORTED_MODULE_7__["render"])(data, selector || 'body'); // setInterval(() => {
  //   render(data, selector)
  // }, 3000)

  Object(_Camera__WEBPACK_IMPORTED_MODULE_8__["renderCamera"])(data, selector ? selector : 'body'); // 机柜

  var cabinet = new _Cabinet__WEBPACK_IMPORTED_MODULE_3__["default"]({
    x: -32,
    z: 0,
    name: '机柜1',
    scene: iScene,
    id: '0_590'
  });
  var cabinet1 = new _Cabinet__WEBPACK_IMPORTED_MODULE_3__["default"]({
    x: 0,
    z: 0,
    name: '机柜2',
    scene: iScene,
    id: '0_591'
  });
  var cabinet2 = new _Cabinet__WEBPACK_IMPORTED_MODULE_3__["default"]({
    x: 32,
    z: 0,
    name: '机柜3',
    scene: iScene,
    id: '0_592'
  }); // 烟感

  var smoke1 = new _Smoke__WEBPACK_IMPORTED_MODULE_6__["default"]({
    height: 90,
    scene: iScene,
    cabinet: cabinet1
  });
  var smoke2 = new _Smoke__WEBPACK_IMPORTED_MODULE_6__["default"]({
    height: 90,
    scene: iScene,
    cabinet: cabinet
  });
  var smoke3 = new _Smoke__WEBPACK_IMPORTED_MODULE_6__["default"]({
    height: 90,
    scene: iScene,
    cabinet: cabinet2
  }); // 漏水绳子

  var rope1 = new _Rope__WEBPACK_IMPORTED_MODULE_5__["default"]({
    y: 3,
    radius: 1,
    scene: iScene,
    cabinet: cabinet1
  });
  var rope2 = new _Rope__WEBPACK_IMPORTED_MODULE_5__["default"]({
    y: 3,
    radius: 1,
    scene: iScene,
    cabinet: cabinet
  });
  var rope3 = new _Rope__WEBPACK_IMPORTED_MODULE_5__["default"]({
    y: 3,
    radius: 1,
    scene: iScene,
    cabinet: cabinet2
  });
  var target1 = rope1.group.children[0];
  var target2 = rope2.group.children[0];
  var target3 = rope3.group.children[0];

  var changeRope = function changeRope() {
    var mbm = new THREE.MeshBasicMaterial({
      color: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomColor"])()
    });
    target1.material = mbm;
    target2.material = mbm;
    target3.material = mbm;
  }; // setInterval(() => {
  //   changeRope()
  // }, 3000)
  // 服务器


  for (var i = 0; i < config.maxServerCount; i++) {
    new _Server__WEBPACK_IMPORTED_MODULE_2__["default"](iScene, cabinet, config.serverTop + i * (config.serverHeight + config.serverSpacing));
    new _Server__WEBPACK_IMPORTED_MODULE_2__["default"](iScene, cabinet1, config.serverTop + i * (config.serverHeight + config.serverSpacing));
    new _Server__WEBPACK_IMPORTED_MODULE_2__["default"](iScene, cabinet2, config.serverTop + i * (config.serverHeight + config.serverSpacing));
  } // 交换机


  new _Switch__WEBPACK_IMPORTED_MODULE_4__["default"](iScene, cabinet, config.switchTop);
  new _Switch__WEBPACK_IMPORTED_MODULE_4__["default"](iScene, cabinet1, config.switchTop);
  new _Switch__WEBPACK_IMPORTED_MODULE_4__["default"](iScene, cabinet2, config.switchTop); // 返回整个IScene

  return iScene;
}

/* harmony default export */ __webpack_exports__["default"] = (runCabinet);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTexture", function() { return loadTexture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomColor", function() { return randomColor; });
var loadTexture = function loadTexture(src, render) {
  var loader = new THREE.TextureLoader();
  return loader.load(src, function () {
    render();
  });
};
var randomColor = function randomColor() {
  var str = "#";
  var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

  for (var i = 0; i < 6; i++) {
    var num = parseInt(Math.random() * 16);
    str += arr[num];
  }

  return str;
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




var IScene = /*#__PURE__*/function () {
  function IScene(params) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, IScene);

    this.parent = params.parent;
    this.scene = new THREE.Scene();
    this.scene.position.set(0, -40, 5);
    this.camera = this.initCamera(params.parent);
    this.canControl = params.control; // 粒子效果相关参数

    this.particle = null;
    this.particles = [];
    this.AMOUNTX = 100;
    this.AMOUNTY = 80;
    this.SEPARATION = 80;
    this.count = 0; // 设置开发模式

    this.dev = params && params.dev;
    this.initLight();
    this.initRenderer(params.parent);
    this.initTexture();
    this.initFloor();

    if (params && params.dev) {
      this.stats(params.parent);
    }

    this.initWave();
    this.render();
    this.initControls();
    this.animate();
    window.addEventListener('resize', this.onResize.bind(this, params.parent), false);
    window.addEventListener('dblclick', this.injectHandler.bind(this, params.callback), false);
  } // 渲染摄像头


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(IScene, [{
    key: "initCamera",
    value: function initCamera(container) {
      var width = container ? container.offsetWidth : window.innerWidth;
      var height = container ? container.offsetHeight : window.innerHeight;
      var camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
      camera.position.set(0, 15, 200);
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
      this.renderer.setClearColor('#0b0c0f');
      container ? container.appendChild(this.renderer.domElement) : document.body.appendChild(this.renderer.domElement);
    }
  }, {
    key: "initTexture",
    value: function initTexture() {
      var _this = this;

      this.floorTexture = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["loadTexture"])('images/floor.png', function () {
        _this.render();
      });
      this.floorTexture.wrapS = THREE.RepeatWrapping;
      this.floorTexture.wrapT = THREE.RepeatWrapping;
      this.floorTexture.repeat.set(1, 1);
    } // 地板

  }, {
    key: "initFloor",
    value: function initFloor() {
      var geometry = new THREE.BoxGeometry(400, 0, 250);
      var material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: this.floorTexture,
        transparent: true
      });
      this.floor = new THREE.Mesh(geometry, material);
      this.floor.position.set(0, -1, 0);
      this.scene.add(this.floor);
    } //  added by tim

  }, {
    key: "initWave",
    value: function initWave() {
      var PI2 = Math.PI * 2;
      var mt = new THREE.PointCloudMaterial({
        color: '#0063f5',
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
      var i = 0;

      for (var ix = 0; ix < this.AMOUNTX; ix++) {
        for (var iy = 0; iy < this.AMOUNTY; iy++) {
          this.particle = this.particles[i++];
          this.particle.position.y = Math.sin((ix + this.count) * 0.3) * 50 + Math.sin((iy + this.count) * 0.5) * 50 - 100;
          this.particle.scale.x = this.particle.scale.y = (Math.sin((ix + this.count) * 0.3) + 1) * 2 + Math.sin((iy + this.count) * 0.5 + 1) * 2;
        }
      }

      this.renderer.render(this.scene, this.camera);
      this.count += 0.1;
    } // 鼠标控制器

  }, {
    key: "initControls",
    value: function initControls() {
      this.controls = new THREE.OrbitControls(this.camera);
      this.controls.addEventListener('change', this.render.bind(this));
      this.controls.maxDistance = 2000;
      this.controls.enabled = this.canControl;
      this.controls.maxPolarAngle = 1.5;
      this.controls.minPolarAngle = 0.5;
      this.controls.enableZoom = false;
    } // resize事件处理

  }, {
    key: "onResize",
    value: function onResize(container) {
      var width = container ? container.offsetWidth : window.innerWidth;
      var height = container ? container.offsetHeight : window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    } // 注册器

  }, {
    key: "injectHandler",
    value: function injectHandler(callback, event) {
      var width = window.innerWidth;
      var height = window.innerHeight;
      event.preventDefault();
      var vector = new THREE.Vector3(event.clientX / width * 2 - 1, -(event.clientY / height) * 2 + 1, 0.5);
      vector = vector.unproject(this.camera);
      var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
      var intersects = raycaster.intersectObjects(this.scene.children, true);
      var firstObj = intersects[0].object;

      if (callback && callback instanceof Function) {
        callback(firstObj.parent);
      } //   if (firstObj.name == 'door') {
      //     if (firstObj.parent.rotation.y == 0) {
      //       new TWEEN.Tween(firstObj.parent.rotation).to({ y: 0.6 * Math.PI }, 1500).easing(TWEEN.Easing.Elastic.Out).start()
      //     } else {
      //       new TWEEN.Tween(firstObj.parent.rotation).to({ y: 0 }, 300).start()
      //     }
      //     this.controls.update()
      //   }
      //   if(firstObj.name === 'server'){
      //      if(firstObj.parent.position.z === 0){
      //          new TWEEN.Tween( firstObj.parent.position ).to({ z: firstObj.parent.position.z + 20 }, 500 ).easing( TWEEN.Easing.Elastic.Out).start()
      //      }else{
      //          new TWEEN.Tween( firstObj.parent.position ).to({ z: firstObj.parent.position.z - 20 }, 500 ).easing( TWEEN.Easing.Elastic.Out).start()
      //      }
      //      this.controls.update()
      //  }
      // this.render()

    }
  }, {
    key: "stats",
    value: function stats(container) {
      this.stats = new Stats();
      container ? container.appendChild(this.stats.dom) : document.body.appendChild(this.stats.dom);
    }
  }, {
    key: "animate",
    value: function animate() {
      this.render();
      this.dev && this.stats.update();
      requestAnimationFrame(this.animate.bind(this));
    }
  }]);

  return IScene;
}();

/* harmony default export */ __webpack_exports__["default"] = (IScene);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 4 */
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

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




var Server = /*#__PURE__*/function () {
  function Server(scene, cabinet, height) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Server);

    this.x = cabinet.x;
    this.z = cabinet.z;
    this.y = 0;
    this.h = height;
    this.build(scene);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Server, [{
    key: "build",
    value: function build(sceneInstance) {
      var serverGroup = new THREE.Group();
      serverGroup.position.set(this.x, this.y, this.z); // const serverTexture = loadTexture('images/rack_inside.png', () => { sceneInstance.render() })

      var serverGEO = new THREE.BoxGeometry(24, 3.5, 36);
      var serverMat = new THREE.MeshBasicMaterial({
        color: 0x4ebaff,
        // map: serverTexture,
        opacity: 0.7,
        transparent: true,
        side: THREE.DoubleSide
      });
      var server = new THREE.Mesh(serverGEO, serverMat);
      server.position.set(0, this.h, 2);
      server.name = 'server';
      var serverMGeo = new THREE.BoxGeometry(26.4, 4, 0.2);
      var serverMaterials = []; // 服务器的材质

      serverMaterials.push(serverMat, serverMat, serverMat, serverMat, serverMat, serverMat); // const serverMMat = new THREE.MeshFaceMaterial(serverMaterials)
      // const serverMFace = new THREE.Mesh(serverMGeo, serverMMat)
      // serverMFace.name = 'server'
      // serverMFace.position.set(0, this.h, 36 / 2 + 0.2 / 2 + 2)
      // serverGroup.add(server, serverMFace)

      serverGroup.add(server);
      sceneInstance.scene.add(serverGroup);
    }
  }]);

  return Server;
}();

/* harmony default export */ __webpack_exports__["default"] = (Server);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);




var Cabinet = /*#__PURE__*/function () {
  // 宽
  // 长
  function Cabinet(params) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Cabinet);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_bottomWidth", 30);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "_bottomLength", 40);

    this.x = params.x;
    this.z = params.z;
    this.y = 0;
    this.number = params.name;
    this.resourceID = params.id;
    this.buildBox(params.scene);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Cabinet, [{
    key: "buildBox",
    value: function buildBox(sceneInstance) {
      // 机箱外表
      // const t1 = loadTexture('images/rack_panel.png', () => { sceneInstance.render() })
      // const t2 = loadTexture('images/cabz.png', () => { sceneInstance.render() })
      // const t3 = loadTexture('images/caby.png', () => { sceneInstance.render() })
      var cabGroup = new THREE.Group();
      cabGroup.position.set(this.x, this.y, this.z);
      cabGroup.name = 'CabinetGroup';
      var cabMatLambert = new THREE.MeshLambertMaterial({
        color: 0x007aff,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 1,
        map: this.gradientTexure()
      });
      var cabMatBasic = new THREE.MeshBasicMaterial({
        color: 0x007aff,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 1 // map: this.gradientTexure()

      }); // 底部

      var cabBottomGeo = new THREE.BoxGeometry(this._bottomWidth, 2, this._bottomLength);
      var cabBottom = new THREE.Mesh(cabBottomGeo, cabMatBasic);
      cabBottom.position.set(0, 1, 0); // 左侧

      var cabLeftGeo = new THREE.BoxGeometry(2, 88, this._bottomLength);
      var cabLeftMaterials = [];
      cabLeftMaterials.push(cabMatLambert, cabMatLambert, cabMatLambert, cabMatLambert, new THREE.MeshBasicMaterial({
        color: 0x4ebaff,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide // map: t2

      }), cabMatLambert);
      var cabLeftMat = new THREE.MeshFaceMaterial(cabLeftMaterials);
      var cabLeft = new THREE.Mesh(cabLeftGeo, cabLeftMat);
      cabLeft.position.set(this._bottomWidth / 2 - 1, 46, 0); // 右侧

      var cabRightGeo = new THREE.BoxGeometry(2, 88, this._bottomLength);
      var cabRightMaterials = [];
      cabRightMaterials.push(cabMatLambert, cabMatLambert, cabMatLambert, cabMatLambert, new THREE.MeshBasicMaterial({
        color: 0x4ebaff,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0.5 // map: t3

      }), cabMatLambert);
      var cabRightMat = new THREE.MeshFaceMaterial(cabRightMaterials);
      var cabRight = new THREE.Mesh(cabRightGeo, cabRightMat);
      cabRight.position.set(-this._bottomWidth / 2 + 1, 46, 0); // 背面版

      var cabBackGeo = new THREE.BoxGeometry(this._bottomWidth - 4, 88, 2); // 后板

      var cabBack = new THREE.Mesh(cabBackGeo, cabMatLambert);
      cabBack.position.set(0, 46, 0 - this._bottomLength / 2 + 1); // 顶板

      var cabTopGeo = new THREE.BoxGeometry(this._bottomWidth, 2, this._bottomLength);
      var cabTopMaterials = [];
      cabTopMaterials.push(cabMatLambert, cabMatLambert, new THREE.MeshLambertMaterial({
        color: 0x007aff,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        map: this.gradientTexure() // map: t1
        // map: this.canvasTexture(this.number)

      }), cabMatLambert, cabMatLambert, cabMatLambert);
      var cabTopMat = new THREE.MeshFaceMaterial(cabTopMaterials);
      var cabTop = new THREE.Mesh(cabTopGeo, cabTopMat);
      cabTop.position.set(0, 91, 0);
      cabTop.name = 'cabTop';
      cabGroup.add(cabBottom, cabLeft, cabRight, cabBack, cabTop);
      cabGroup.name = this.number; // 绑定一下整体的名称

      cabGroup.resource_id = this.resourceID; // 绑定一下整体的id
      // 机箱门

      var cabDoorGroup = new THREE.Group();
      cabDoorGroup.position.set(this.x + 15, this.y, this.z + 20);
      cabDoorGroup.name = this.number; // 绑定一下整体的名称

      cabDoorGroup.resource_id = this.resourceID; // 绑定一下整体的id

      var doorGeo = new THREE.BoxGeometry(this._bottomWidth, 92, 1);
      var doorMaterials = [];
      var rackMaterial = new THREE.MeshLambertMaterial({
        color: 0x007aff,
        opacity: 0.3,
        transparent: true,
        side: THREE.DoubleSide
      });
      doorMaterials.push(rackMaterial, rackMaterial, rackMaterial, rackMaterial, new THREE.MeshLambertMaterial({
        // map: loadTexture('images/rack_front_door.png', () => { sceneInstance.render() }),
        map: this.gradientTexure(),
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      }), new THREE.MeshLambertMaterial({
        // map: loadTexture('images/rack_door_back.png', () => { sceneInstance.render() }),
        map: this.gradientTexure(),
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
      }));
      var doorMat = new THREE.MeshFaceMaterial(doorMaterials);
      var door = new THREE.Mesh(doorGeo, doorMat);
      door.name = 'door';
      door.position.set(-this._bottomWidth / 2, 46, 0.5);
      cabDoorGroup.add(door);
      sceneInstance.scene.add(cabGroup, cabDoorGroup);
    } // canvasTexture(number) {
    //   const canvas = document.createElement("canvas")
    //   canvas.width = 50
    //   canvas.height = 40
    //   const ctx = canvas.getContext("2d");
    //   const g = ctx.createLinearGradient(0, 0, 50, 40)
    //   g.addColorStop(0, "#777")
    //   g.addColorStop(1, "#777")
    //   ctx.fillStyle = g
    //   ctx.fillRect(0, 0, 50, 40)
    //   ctx.textBaseline = 'top'
    //   ctx.font = "20px SimHei"
    //   ctx.fillStyle = "#00ffff"
    //   const txtWidth = ctx.measureText(number).width
    //   ctx.fillText(number, 50 / 2 - txtWidth / 2, 40 / 2 - 20 / 2)
    //   const texture = new THREE.Texture(canvas)
    //   texture.needsUpdate = true
    //   return texture
    // }

  }, {
    key: "gradientTexure",
    value: function gradientTexure() {
      var canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 1024;
      var ctx = canvas.getContext("2d");
      var g = ctx.createLinearGradient(0, 1024, 1024, 0);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.68, "rgba(0,122,255,1)");
      g.addColorStop(0.7, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,122,255,1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 1024);
      var texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    }
  }]);

  return Cabinet;
}();

/* harmony default export */ __webpack_exports__["default"] = (Cabinet);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
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
}

module.exports = _defineProperty;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




var Switch = /*#__PURE__*/function () {
  function Switch(sceneInstance, cabinet, height) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Switch);

    this.x = cabinet.x;
    this.z = cabinet.z;
    this.h = height;
    this.build(sceneInstance);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Switch, [{
    key: "build",
    value: function build(sceneInstance) {
      var switchGroup = new THREE.Group();
      switchGroup.position.set(this.x, 0, this.z); // const switchTexture = loadTexture('images/rack_inside.png', () => { sceneInstance.render() })

      var switchGeo = new THREE.BoxGeometry(24, 11.5, 36);
      var switchMat = new THREE.MeshBasicMaterial({
        color: 0x4ebaff,
        // map: switchTexture,
        opacity: 0.7,
        transparent: true,
        side: THREE.DoubleSide
      });
      var switchBody = new THREE.Mesh(switchGeo, switchMat);
      switchBody.position.set(0, this.h, 2);
      var switchMGeo = new THREE.BoxGeometry(26.3, 12, 0.2);
      var switchMMat = new THREE.MeshBasicMaterial({
        color: 0x4ebaff,
        opacity: 0.5,
        transparent: true,
        side: THREE.DoubleSide
      });
      var switchFaceMaterials = [];
      switchFaceMaterials.push(switchMMat, switchMMat, switchMMat, switchMMat, new THREE.MeshBasicMaterial({
        color: 0x4ebaff,
        // map: loadTexture('images/switchboard.png', () => { sceneInstance.render() }),
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
      }), switchMMat);
      var switchFaceMat = new THREE.MeshFaceMaterial(switchFaceMaterials);
      var switchFace = new THREE.Mesh(switchMGeo, switchFaceMat);
      switchFace.position.set(0, this.h, 36 / 2 + 0.2 / 2 + 2); // switchGroup.add(switchBody, switchFace)

      switchGroup.add(switchBody);
      sceneInstance.scene.add(switchGroup);
    }
  }]);

  return Switch;
}();

/* harmony default export */ __webpack_exports__["default"] = (Switch);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




var Rope = /*#__PURE__*/function () {
  function Rope(options) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Rope);

    this.x = options.cabinet.x;
    this.y = options.y || 0;
    this.z = options.cabinet.z;
    this.radius = options.radius;
    this.build(options.scene);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Rope, [{
    key: "build",
    value: function build(sceneInstance) {
      var group = new THREE.Group();
      group.position.set(this.x, this.y, this.z); // const texture = loadTexture('images/rope.jpg', () => { sceneInstance.render() })

      var material = new THREE.MeshBasicMaterial({
        color: 0x4ebaff
      });
      var p1 = new THREE.Vector3(-12, 0, 18.5);
      var p2 = new THREE.Vector3(-12, 0, -17);
      var p4 = new THREE.Vector3(12, 0, -17);
      var p5 = new THREE.Vector3(12, 0, 18.5);
      var line1 = new THREE.LineCurve3(p1, p2);
      var curve = new THREE.CatmullRomCurve3([p2, p4]);
      var line2 = new THREE.LineCurve3(p4, p5);
      var CurvePath = new THREE.CurvePath();
      CurvePath.curves.push(line1, curve, line2);
      var geometry = new THREE.TubeGeometry(CurvePath, 200, 0.2, 25, true);
      var mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
      this.group = group;
      sceneInstance.scene.add(group);
    }
  }]);

  return Rope;
}();

/* harmony default export */ __webpack_exports__["default"] = (Rope);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



var Smoke = /*#__PURE__*/function () {
  function Smoke(options) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Smoke);

    this.x = options.cabinet.x;
    this.z = options.cabinet.z;
    this.y = 0;
    this.h = options.height;
    this.build(options.scene);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Smoke, [{
    key: "build",
    value: function build(sceneInstance) {
      var group = new THREE.Group();
      group.position.set(this.x, this.y, this.z);
      var material = new THREE.LineBasicMaterial({
        color: 0x007aff
      });
      var material1 = new THREE.LineBasicMaterial({
        color: 0x007aff
      });
      var geometry2 = new THREE.CylinderGeometry(4, 4, 1, 25);
      var geometry3 = new THREE.CylinderGeometry(3, 0, 1, 25);
      var mesh2 = new THREE.Mesh(geometry2, material);
      var mesh3 = new THREE.Mesh(geometry3, material1);
      mesh2.position.set(0, this.h, 0);
      mesh3.position.set(0, this.h - 1, 0);
      group.add(mesh2);
      group.add(mesh3);
      this.group = group;
      sceneInstance.scene.add(group);
    }
  }]);

  return Smoke;
}();

/* harmony default export */ __webpack_exports__["default"] = (Smoke);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
var render = function render(d) {
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';
  var data = JSON.parse(JSON.stringify(d));
  var div;
  var hasDOM = !!document.querySelector('.three-cabinet-info');

  if (document.querySelector('.three-cabinet-info')) {
    div = document.querySelector('.three-cabinet-info');
  } else {
    div = document.createElement('div');
  }

  div.className = 'three-cabinet-info';
  div.innerHTML = '';
  var html = '';

  if (Array.isArray(data)) {
    data.forEach(function (item) {
      item.wd = (item.wd + Math.random() * 10).toFixed(1);
      item.sd = (item.sd + Math.random() * 10).toFixed(1);
      html += "<div class=\"info-item\">\n                <ul>\n                  <li>".concat(item.name, "</li>\n                  <li><span><img src=\"/js/plugin/cabinet/images/xbr-icon-cld-wd.svg\"/> ").concat(item.wd, "\u2103</span></li>\n                  <li><span><img src=\"/js/plugin/cabinet/images/xbr-icon-cld-sd.svg\"/> ").concat(item.sd, "%</span></li>\n                </ul>\n              </div>\n            ");
    });
    div.innerHTML = html;

    if (!hasDOM) {
      document.querySelector(selector).appendChild(div);
    }
  }
};

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderCamera", function() { return renderCamera; });
var renderCamera = function renderCamera(d) {
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';
  var data = JSON.parse(JSON.stringify(d));
  var div;
  var hasDOM = !!document.querySelector('.three-camera');

  if (document.querySelector('.three-camera')) {
    div = document.querySelector('.three-camera');
  } else {
    div = document.createElement('div');
  }

  div.className = 'three-camera';
  div.innerHTML = '';
  var html = "<img src='/js/plugin/cabinet/images/myCamera.png'/>";
  div.innerHTML = html;

  if (!hasDOM) {
    document.querySelector(selector).appendChild(div);
  }
};

/***/ })
/******/ ])["default"];
});