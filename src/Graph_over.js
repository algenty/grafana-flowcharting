/* eslint-disable func-names */

mxTooltipHandler.prototype.show = function(tip, x, y) {
  if (!this.destroyed && tip != null && tip.length > 0) {
    // Initializes the DOM nodes if required
    if (this.$div == null) {
      this.init();
    }

    if (!mxUtils.isNode(tip)) {
      this.div.innerHTML = tip.replace(/\n/g, '<br>');
    } else {
      this.div.innerHTML = '';
      this.div.appendChild(tip);
    }
    this.$div.place_tt(x + 20 ,y);
    this.div.style.visibility = '';
    //mxUtils.fit(this.div);


    // eslint-disable-next-line no-undef
    //const origin = mxUtils.getScrollOrigin();

    //this.div.style.zIndex = this.zIndex;
    //const $parent = $(this.div.parentNode);
    //const left = x - $parent.offset().left;
    //const top = y - $parent.offset().top + 30 ;
    //this.div.style.left = `${left}px`;
    // this.div.style.top = `${top}px`;
    // if (!mxUtils.isNode(tip)) {
    //   this.div.innerHTML = tip.replace(/\n/g, '<br>');
    // } else {
    //   this.div.innerHTML = '';
    //   this.div.appendChild(tip);
    // }

    // this.div.style.visibility = '';
    // mxUtils.fit(this.div);
  }
};

mxTooltipHandler.prototype.init = function() {
  if (this.div === null || this.div === undefined) {
    this.$div = $('<div class="graph-tooltip">');
    this.div=this.$div[0];
    //this.div.style.visibility = 'hidden';
    mxEvent.addGestureListeners(
      this.div,
      mxUtils.bind(this, function(evt) {
        this.hideTooltip();
      })
    );
  }
};

mxTooltipHandler.prototype.hideTooltip = function()
{
	if (this.div != null)
	{
		this.div.style.visibility = 'hidden';
		//this.div.innerHTML = '';
	}
};

Graph.prototype.getTooltipForCell = function (cell) {
  debugger
  var tip = '';
  u.log(1,"Graph_other.getTooltipForCell()")
  if (mxUtils.isNode(cell.value)) {
    var tmp = cell.value.getAttribute('tooltip');
    if (tmp != null) {
      if (tmp != null && this.isReplacePlaceholders(cell)) {
        tmp = this.replacePlaceholders(cell, tmp);
      }
      tip = '<div style="word-wrap:break-word;">' + this.sanitizeHtml(tmp) +'</div>';
    }

    var ignored = this.builtInProperties;
    var attrs = cell.value.attributes;
    var temp = [];

    // Hides links in edit mode
    if (this.isEnabled()) {
      ignored.push('link');
    }

    for (var i = 0; i < attrs.length; i++) {
      if (mxUtils.indexOf(ignored, attrs[i].nodeName) < 0 && attrs[i].nodeValue.length > 0) {
        temp.push({ name: attrs[i].nodeName, value: attrs[i].nodeValue });
      }
    }

    // Sorts by name
    temp.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      else if (a.name > b.name) {
        return 1;
      }
      else {
        return 0;
      }
    });

    for (var i = 0; i < temp.length; i++) {
      if (temp[i].name != 'link' || !this.isCustomLink(temp[i].value)) {
        tip += ((temp[i].name != 'link') ? '<b>' + temp[i].name + ':</b> ' : '') +
          mxUtils.htmlEntities(temp[i].value) + '\n';
      }
    }

    if (tip.length > 0) {
      tip = tip.substring(0, tip.length - 1);

      if (mxClient.IS_SVG) {
        tip = '<div style="max-width:360px;">' + tip + '</div>';
      }
    }

  }
  return tip;
};
