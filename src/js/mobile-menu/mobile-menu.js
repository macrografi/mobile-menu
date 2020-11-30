(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.getContents = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {
  'use strict';

  var defaults = {
    selector: '#Sidenav',
    isAccordion: false,
    isLayer: false,
    callback: function () {},
  };

  var createItem = function (items, settings) {
    for (var i = 0; i < items.length; i++) {
      var mobileCollapse = document.querySelector('#mobileCollapse'),
        overlay = document.querySelector('#overlay'),
        sidenav = document.querySelector('#Sidenav'),
        sideBarClose = document.querySelector('#sideBarClose'),
        subContent = document.querySelectorAll('.open-sub-content'),
        menuItem = document.querySelectorAll('#menuItem li'),
        goBackButton = document.querySelector('.go-back'),
        winWidth;

      mobileCollapse.addEventListener('click', openSideNav);
      overlay.addEventListener('click', closeNav);
      sideBarClose.addEventListener('click', closeNav);
      //goBackButton.addEventListener('click', goBack);
      window.addEventListener('resize', getWindowWidth);

      function openSideNav() {
        overlay.classList.toggle('active');
        function setWidth(val) {
          subContent.forEach(function (elm) {
            elm.setAttribute('style', 'display:block; width:' + val + 'px; right:-' + val + 'px;');
          });
          menuItem.forEach(function (elm, index) {
            elm.addEventListener('click', function () {
              var menuItem = document.querySelector('#sub-' + index);
              menuItem.setAttribute('style', 'display:block; width:' + val + 'px; right:' + 0 + 'px;');
            });
          });
        }
        if (winWidth >= 768 || winWidth === 1024) {
          winWidth = window.innerWidth / 2;
          sidenav.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:' + 0 + 'px;');
          setWidth(winWidth);
        } else {
          sidenav.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:' + 0 + 'px;');
          setWidth(winWidth);
        }
      }
      function closeNav() {
        sidenav.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:-' + winWidth + 'px;');
        overlay.classList.toggle('active');

        subContent.forEach(function (elm, index) {
          elm.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:-' + winWidth + 'px;');
        });
      }
      function getBack(val) {
        val.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:-' + winWidth + 'px;');
      }
      function goBack() {
        //var subElem = this.offsetParent;
        //console.log(subElem);
        //getBack(subElem);
      }
      function getWindowWidth() {
        winWidth = window.innerWidth;
        overlay.classList.remove('active');
        if (winWidth < 1230) {
          sidenav.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:-' + winWidth + 'px;');
        } else {
          sidenav.setAttribute('style', 'display:none');
        }
      }
      getWindowWidth();
    }
    settings.callback(items);
  };

  //Constructor - ("selector", {settings})
  return function (selector, options) {
    var publicAPIs = {};
    var items, settings;

    publicAPIs.destroy = function () {
      if (!settings) {
        return;
      }
      settings = null;
    };

    publicAPIs.init = function (options) {
      publicAPIs.destroy();
      settings = Object.assign({}, defaults, options);
      items = document.querySelectorAll(selector);
      createItem(items, settings);
    };

    publicAPIs.init(options);
    return publicAPIs;
  };
});
