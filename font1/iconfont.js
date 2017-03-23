;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-icon2" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M690.802292 754.405889c-54.748928 0-108.317984-21.506826-147.93733-61.134359-39.450501-39.434128-61.176314-91.865267-61.176314-147.650805 0-55.776328 21.725814-108.225887 61.176314-147.667178 39.442314-39.450501 91.882664-61.168128 147.658991-61.168128 55.776328 0 108.225887 21.717627 147.667178 61.168128 39.442314 39.442314 61.168128 91.89085 61.168128 147.667178 0 55.784514-21.725814 108.225887-61.168128 147.658991-6.739495 6.739495-17.657148 6.739495-24.396643 0-6.739495-6.739495-6.739495-17.657148 0-24.396643 32.921807-32.921807 51.058886-76.69373 51.058886-123.262348 0-46.560432-18.137079-90.340541-51.058886-123.271558-32.929993-32.929993-76.711126-51.058886-123.271558-51.058886-46.560432 0-90.332355 18.128893-123.262348 51.058886s-51.067073 76.710103-51.067073 123.271558c0 46.560432 18.137079 90.332355 51.067073 123.254162 44.125987 44.125987 108.958574 61.319577 169.250752 44.918026 9.157567-2.527566 18.676361 2.90619 21.178345 12.113899 2.501984 9.190313-2.914376 18.676361-12.113899 21.178345C727.507262 752.013399 709.091844 754.405889 690.802292 754.405889z"  ></path>' +
    '' +
    '<path d="M942.104805 814.44531c-4.414543 0-8.828063-1.684362-12.19781-5.054109L820.501236 699.986465c-6.739495-6.739495-6.739495-17.657148 0-24.396643 6.739495-6.739495 17.657148-6.739495 24.396643 0l109.404736 109.404736c6.739495 6.739495 6.739495 17.657148 0 24.396643C950.932868 812.760948 946.518325 814.44531 942.104805 814.44531z"  ></path>' +
    '' +
    '<path d="M753.351883 226.689952 79.467913 226.689952c-9.528004 0-17.252943-7.724938-17.252943-17.252943 0-9.528004 7.724938-17.252943 17.252943-17.252943L753.351883 192.184067c9.528004 0 17.252943 7.724938 17.252943 17.252943C770.604826 218.965014 762.879887 226.689952 753.351883 226.689952z"  ></path>' +
    '' +
    '<path d="M377.98782 501.284961 79.467913 501.284961c-9.528004 0-17.252943-7.724938-17.252943-17.252943 0-9.528004 7.724938-17.252943 17.252943-17.252943l298.518884 0c9.528004 0 17.252943 7.724938 17.252943 17.252943C395.239739 493.560022 387.514801 501.284961 377.98782 501.284961z"  ></path>' +
    '' +
    '<path d="M377.98782 767.497045 79.467913 767.497045c-9.528004 0-17.252943-7.724938-17.252943-17.252943 0-9.528004 7.724938-17.252943 17.252943-17.252943l298.518884 0c9.528004 0 17.252943 7.724938 17.252943 17.252943C395.239739 759.772107 387.514801 767.497045 377.98782 767.497045z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-sanjiao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M941.474448 256.873392c29.000498 34.887578 28.486798 87.117127-3.417843 120.209826L574.784952 753.764276c-33.447786 34.659381-87.654362 34.659381-121.090892 0L90.433662 377.084241c-31.927153-33.093722-32.441876-85.310991-3.429099-120.198569L941.474448 256.873392z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)