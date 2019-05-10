"use strict";

/* eslint-disable func-names */
mxTooltipHandler.prototype.show = function (tip, x, y) {
  if (!this.destroyed && tip != null && tip.length > 0) {
    // Initializes the DOM nodes if required
    if (this.div == null) {
      this.init();
    } // eslint-disable-next-line no-undef


    var origin = mxUtils.getScrollOrigin();
    this.div.style.zIndex = this.zIndex; // this.div.style.zIndex = 1;
    // this.div.style.left = `${x + origin.x}px`;

    this.div.style.left = "".concat(x - 20, "px");
    console.log("X : " + x, " Y : " + y); // this.div.style.top = `${y + mxConstants.TOOLTIP_VERTICAL_OFFSET + origin.y}px`;

    this.div.style.top = "".concat(y - 70, "px");

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
    this.div = $(".mxTooltip")[0];
    this.div.style.visibility = 'hidden';
    mxEvent.addGestureListeners(this.div, mxUtils.bind(this, function (evt) {
      this.hideTooltip();
    }));
  }
};
