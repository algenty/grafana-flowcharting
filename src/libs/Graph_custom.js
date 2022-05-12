mxTooltipHandler.prototype.show = function (tip, x, y) {
  // TYPE STRING
  if (this.destroyed) {return;}
  if (tip == null) {return;}
  if (tip.length === 0) {return;}
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
};

mxTooltipHandler.prototype.init = function () {
  if (this.div === null || this.div === undefined) {
    this.$div = $('<div class="graph-tooltip">');
    this.div = this.$div[0];
    mxEvent.addGestureListeners(
      this.div,
      mxUtils.bind(this, function (evt) {
        this.hideTooltip();
      })
    );
  }
};

mxTooltipHandler.prototype.hideTooltip = function () {
  if (this.div != null) {
    this.div.style.visibility = 'hidden';
    this.div.innerHTML = '';
  }
};

mxTooltipHandler.prototype.delay = 200;

Graph.prototype.getTooltipForCell = function (cell) {
  let hasTips = false;
  let div = document.createElement('div');
  if (mxUtils.isNode(cell.value)) {
    let tmp = cell.value.getAttribute('tooltip');
    // Tooltip
    if (tmp != null) {
      hasTips = true;
      if (tmp != null && this.isReplacePlaceholders(cell)) {
        tmp = this.replacePlaceholders(cell, tmp);
      }
      let ttDiv = document.createElement('div');
      ttDiv.className = 'tooltip-text';
      ttDiv.innerHTML = this.sanitizeHtml(tmp);
      div.appendChild(ttDiv);
    }

    let ignored = this.builtInProperties;
    let attrs = cell.value.attributes;
    let temp = [];

    // Hides links in edit mode
    // if (this.isEnabled()) {
    ignored.push('link');
    // }

    // Attributes
    for (let i = 0; i < attrs.length; i++) {
      if (mxUtils.indexOf(ignored, attrs[i].nodeName) < 0 && attrs[i].nodeValue.length > 0) {
        temp.push({ name: attrs[i].nodeName, value: attrs[i].nodeValue });
      }
    }

    // Sorts by name
    temp.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    if (temp.length > 0) {
      hasTips = true;
      var attrDiv = document.createElement('div');
      var attrString = '';
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].name !== 'link' || !this.isCustomLink(temp[i].value)) {
          attrString +=
            (temp[i].name !== 'link' ? '<b>' + temp[i].name + ':</b> ' : '') +
            mxUtils.htmlEntities(temp[i].value) +
            '\n';
        }
      }
      attrDiv.innerHTML = attrString;
      div.appendChild(attrDiv);
    }
  }

  // GF Tooltips
  if (cell.GF_tooltipHandler != null) {
    let tooltipHandler = cell.GF_tooltipHandler;
    let gfDiv = tooltipHandler.getDiv(div);
    if (gfDiv !== null) {
      hasTips = true;
    }
  }
  if (hasTips) {return div;}
  return '';
};

mxEvent.addMouseWheelListener = function (func, container) {
  if (null != func) {
    var c = function (container) {
      null == container && (container = window.event);
      var c;
      c = mxClient.IS_FF ? -container.detail / 2 : container.wheelDelta / 120;
      0 !== c && func(container, 0 < c);
    };
    mxClient.IS_NS && null == document.documentMode
      ? mxEvent.addListener(
        mxClient.IS_GC && null != container ? container : window,
        mxClient.IS_SF || mxClient.IS_GC ? 'mousewheel' : 'DOMMouseScroll',
        c
      )
      : mxEvent.addListener(document, 'mousewheel', c);
  }
};
