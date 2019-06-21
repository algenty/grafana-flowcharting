"use strict";

/* eslint-disable func-names */
mxTooltipHandler.prototype.show = function (tip, x, y) {
  if (!this.destroyed && tip != null && tip.length > 0) {
    // Initializes the DOM nodes if required
    if (this.div == null) {
      this.init();
    } // eslint-disable-next-line no-undef


    var origin = mxUtils.getScrollOrigin();
    this.div.style.zIndex = this.zIndex;
    var $parent = $(this.div.parentNode);
    var left = x - $parent.offset().left;
    var top = y - $parent.offset().top + 30;
    this.div.style.left = "".concat(left, "px");
    this.div.style.top = "".concat(top, "px");

    if (!mxUtils.isNode(tip)) {
      this.div.innerHTML = tip.replace(/\n/g, '<br>');
    } else {
      this.div.innerHTML = '';
      this.div.appendChild(tip);
    }

    this.div.style.visibility = '';
    mxUtils.fit(this.div);
  }
};

mxTooltipHandler.prototype.init = function () {
  if (this.div === null || this.div === undefined) {
    this.div = $('.mxTooltip')[0];
    this.div.style.visibility = 'hidden';
    mxEvent.addGestureListeners(this.div, mxUtils.bind(this, function (evt) {
      this.hideTooltip();
    }));
  }
};
