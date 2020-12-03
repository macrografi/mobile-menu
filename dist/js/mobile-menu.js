/*!
 * mobile menu v1.0.0
 * Menu Plug-in
 * (c) 2020 Cenk Özkan
 * ISC License
 * https://github.com/macrografi/mobile-menu.git
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], (function() {
      return factory(root);
    }));
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.getContents = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (function(window) {
  'use strict';

  var defaults = {
    selector: '#Sidenav',
    overlay: false,
    isAccordion: false,
    isLayer: false,
    callback: function() {},
  };

  var createItem = function(items, settings) {
    for (var i = 0; i < items.length; i++) {
      console.log(settings);
      var sidenav = items[i],
        mobileCollapse = document.querySelector('#mobileCollapse'),
        overlay = document.querySelector('#overlay'),
        sideBarClose = document.querySelector('#sideBarClose'),
        subContent = document.querySelectorAll('.open-sub-content'),
        menuItem = document.querySelectorAll('#menuItem li'),
        goBackButton = document.querySelectorAll('.go-back'),
        winWidth;

      /*start set calculate window width*/
      function getWindowWidth() {
        winWidth = window.innerWidth;
        overlay.classList.remove('active');
        if (winWidth < 1230) {
          sidenav.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:-' + winWidth + 'px;');
        } else {
          sidenav.setAttribute('style', 'display:none');
        }
      }
      /*end set calculate window width*/

      /*start overlay*/
      function getOverlay() {
        if (!settings.overlay) {
          overlay.classList.remove('active');
        } else {
          overlay.classList.toggle('active');
        }
      }
      /*end overlay*/

      /*start open sidenav*/
      function openSideNav() {
        if (settings.isLayer) {
          getOverlay();
          function setWidth(val) {
            subContent.forEach((function(elm) {
              elm.setAttribute('style', 'display:block; width:' + val + 'px; right:-' + val + 'px;');
            }));
            menuItem.forEach((function(elm, index) {
              elm.addEventListener('click', (function() {
                var menuItem = document.querySelector('#sub-' + index);
                menuItem.setAttribute('style', 'display:block; width:' + val + 'px; right:' + 0 + 'px;');
              }));
            }));
          }
          if (winWidth >= 768 || winWidth === 1024) {
            winWidth = window.innerWidth / 2;
            sidenav.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:' + 0 + 'px;');
            setWidth(winWidth);
          } else {
            sidenav.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:' + 0 + 'px;');
            setWidth(winWidth);
          }

          goBackButton.forEach((function(elm, index) {
            elm.addEventListener('click', goBack);
          }));
          function getBack(val) {
            val.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:-' + winWidth + 'px;');
          }
          function goBack() {
            var subElem = this.offsetParent;
            getBack(subElem);
          }
        } else if (settings.isAccordion) {
          getOverlay();
          console.log('accordion');
        }
      }
      /*end open sidenav*/

      /*start close sidenav*/
      function closeNav() {
        sidenav.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:-' + winWidth + 'px;');
        getOverlay();
        subContent.forEach((function(elm, index) {
          elm.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:-' + winWidth + 'px;');
        }));
      }
      /*end close sidenav*/

      /*start set window width*/
      window.addEventListener('resize', getWindowWidth);
      getWindowWidth();
      /*end set window width*/

      /*start click open sidenav*/
      mobileCollapse.addEventListener('click', openSideNav);
      /*end click open sidenav*/

      /*start click overlay*/
      overlay.addEventListener('click', closeNav);
      /*end click overlay*/

      /*start click close sidebar*/
      sideBarClose.addEventListener('click', closeNav);
      /*end click close sidebar*/

      /*
      if (settings.isLayer) {
        goBackButton.forEach(function(elm, index) {
          elm.addEventListener('click', goBack);
        });
        function getBack(val) {
          val.setAttribute('style', 'display:block; width:' + winWidth + 'px; right:-' + winWidth + 'px;');
        }
        function goBack() {
          var subElem = this.offsetParent;
          getBack(subElem);
        }
      } else if (settings.isAccordion) {
        console.log('accordion');
      }
       */
    }
    settings.callback(items);
  };

  //Constructor - ("selector", {settings})
  return function(selector, options) {
    var publicAPIs = {};
    var items, settings;

    publicAPIs.destroy = function() {
      if (!settings) {
        return;
      }
      settings = null;
    };

    publicAPIs.init = function(options) {
      publicAPIs.destroy();
      settings = Object.assign({}, defaults, options);
      items = document.querySelectorAll(selector);
      createItem(items, settings);
    };

    publicAPIs.init(options);
    return publicAPIs;
  };
}));
