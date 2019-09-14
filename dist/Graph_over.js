"use strict";

mxTooltipHandler.prototype.show = function (tip, x, y) {
  // u.log(1, 'mxTooltipHandler.prototype.show()');
  if (!this.destroyed && tip != null && tip.length > 0) {
    // Initializes the DOM nodes if required
    if (this.div == null) {
      this.init();
    }

    if (!mxUtils.isNode(tip)) {
      this.div.innerHTML = tip.replace(/\n/g, '<br>');
    } else {
      this.div.innerHTML = '';
      this.div.appendChild(tip);
    }

    this.$div.place_tt(x + 20, y);
    this.div.style.visibility = '';
    mxUtils.fit(this.div);
  }
};

mxTooltipHandler.prototype.init = function () {
  // u.log(1, 'mxTooltipHandler.prototype.init()');
  if (this.div === null || this.div === undefined) {
    this.$div = $('<div class="graph-tooltip">');
    this.div = this.$div[0];
    mxEvent.addGestureListeners(this.div, mxUtils.bind(this, function (evt) {
      this.hideTooltip();
    }));
  }
};

mxTooltipHandler.prototype.hideTooltip = function () {
  if (this.div != null) {
    this.div.style.visibility = 'hidden';
    this.div.innerHTML = '';
  }
};

mxEvent.addMouseWheelListener = function (func, container) {
  if (null != func) {
    var c = function c(container) {
      null == container && (container = window.event);
      var c;
      c = mxClient.IS_FF ? -container.detail / 2 : container.wheelDelta / 120;
      0 != c && func(container, 0 < c);
    };

    mxClient.IS_NS && null == document.documentMode ? mxEvent.addListener(mxClient.IS_GC && null != container ? container : window, mxClient.IS_SF || mxClient.IS_GC ? 'mousewheel' : 'DOMMouseScroll', c) : mxEvent.addListener(document, 'mousewheel', c);
  }
};
