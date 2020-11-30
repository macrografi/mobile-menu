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
    /*        effect: 'basic-zoom',
        speed: '0.6s',
        card: false,
        overlay: false,*/
    callback: function () {},
  };

  var createItem = function (items, settings) {
    for (var i = 0; i < items.length; i++) {
      var mobileCollapse = document.querySelector('#mobileCollapse');
      var overlay = document.querySelector('#overlay');
      var sidenav = document.querySelector('#Sidenav');
      var sideBarClose = document.querySelector('#sideBarClose');
      var subContent = document.querySelectorAll('.open-sub-content');
      var menuItem = document.querySelectorAll('#menuItem li');
      var winWidth;

      mobileCollapse.addEventListener('click', openSideNav);
      overlay.addEventListener('click', closeNav);
      sideBarClose.addEventListener('click', closeNav);

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
        //winWidth = window.width();
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
      window.addEventListener('resize', getWindowWidth);
      /*            var childCount = items[i].children.length;

            if (childCount >= 2) {
                items[i].children[1].style.transition = settings.speed;
            } else {
                items[i].children[0].style.transition = settings.speed;
            }*/

      /*            function getCard(elem, event) {
                if (settings.card) {
                    if (event === 'mouseover') {
                        elem.children[0].classList.add('active');
                    } else {
                        elem.children[0].classList.remove('active');
                    }
                }
            }*/
      /*            function getOverlay(elem, event) {
                if (settings.overlay) {
                    if (event === 'mouseover') {
                        elem.children[2].classList.add('active');
                    } else {
                        elem.children[2].classList.remove('active');
                    }
                }
            }*/

      /*            items[i].addEventListener('mouseover', function () {
                this.classList.add(settings.effect);
                getCard(this, 'mouseover');
                getOverlay(this, 'mouseover');
            });
            items[i].addEventListener('mouseout', function () {
                getCard(this, 'mouseout');
                getOverlay(this, 'mouseout');
            });*/
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
