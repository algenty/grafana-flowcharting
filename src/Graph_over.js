/* eslint-disable func-names */

mxTooltipHandler.prototype.show = function(tip, x, y) {
  if (!this.destroyed && tip != null && tip.length > 0) {
    // Initializes the DOM nodes if required
    if (this.div == null) {
      this.init();
    }

    // eslint-disable-next-line no-undef
    const origin = mxUtils.getScrollOrigin();

    this.div.style.zIndex = this.zIndex;
    const $parent = $(this.div.parentNode);
    const left = x - $parent.offset().left;
    const top = y - $parent.offset().top + 30 ;
    this.div.style.left = `${left}px`;
    this.div.style.top = `${top}px`;
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

mxTooltipHandler.prototype.init = function() {
  if (this.div === null || this.div === undefined) {
    this.div = $('.mxTooltip')[0];
    this.div.style.visibility = 'hidden';
    mxEvent.addGestureListeners(
      this.div,
      mxUtils.bind(this, function(evt) {
        this.hideTooltip();
      })
    );
  }
};
