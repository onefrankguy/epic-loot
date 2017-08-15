;(function () {
'use strict';

function Fn (selector) {
  if (selector instanceof Fn) {
    return selector
  }

  this.element = selector

  if (typeof selector === 'string') {
    if (selector.indexOf('#') === 0) {
      this.element = document.getElementById(selector.slice(1))
    }
  }

  return this
}

Fn.prototype.html = function (value) {
  if (this.element) {
    if (value === undefined) {
      return this.element.innerHTML
    }

    this.element.innerHTML = value
  }

  return this
}

Fn.prototype.touch = function (start, end) {
  var self = this

  if (this.element) {
    if ('ontouchstart' in document.documentElement === false) {
      this.element.onmousedown = function (e) {
        if (start) {
          start(self, e)
        }
        document.onmousemove = function (e) {
          e.preventDefault()
        }
        document.onmouseup = function (e) {
          if (end) {
            end(self, e)
          }
          document.onmousemove = undefined
          document.onmouseup = undefined
        }
      }
    } else {
      this.element.ontouchstart = function (e) {
        if (start) {
          start(self, e)
        }
        document.ontouchmove = function (e) {
          e.preventDefault()
        }
        document.ontouchend = function (e) {
          if (end) {
            end(self, e)
          }
          document.ontouchmove = undefined
          document.ontouchend = undefined
        }
      }
    }
  }

  return this
}

function root (selector) {
  return new Fn(selector)
}

window.jQuery = root
})()
