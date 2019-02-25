/**
 * Sets global constants.
 */
// Changes default colors
mxConstants.SHADOW_OPACITY = 0.25;
mxConstants.SHADOWCOLOR = '#000000';
mxConstants.VML_SHADOWCOLOR = '#d0d0d0';
mxGraph.prototype.pageBreakColor = '#c0c0c0';
mxGraph.prototype.pageScale = 1;

// Matches label positions of mxGraph 1.x
mxText.prototype.baseSpacingTop = 5;
mxText.prototype.baseSpacingBottom = 1;

// Keeps edges between relative child cells inside parent
mxGraphModel.prototype.ignoreRelativeEdgeParent = false;

// Defines grid properties
mxGraphView.prototype.gridImage = (mxClient.IS_SVG) ? 'data:image/gif;base64,R0lGODlhCgAKAJEAAAAAAP///8zMzP///yH5BAEAAAMALAAAAAAKAAoAAAIJ1I6py+0Po2wFADs=' :
  IMAGE_PATH + '/grid.gif';
mxGraphView.prototype.gridSteps = 4;
mxGraphView.prototype.minGridSize = 4;

// UrlParams is null in embed mode
mxGraphView.prototype.gridColor = '#e0e0e0';

// Alternative text for unsupported foreignObjects
mxSvgCanvas2D.prototype.foAltText = '[Not supported by viewer]';

// Hook for custom constraints
mxShape.prototype.getConstraints = function (style) {
  return null;
};

mxGraph.currentEdgeStyle = mxUtils.clone(mxGraph.defaultEdgeStyle);
mxGraph.currentVertexStyle = mxUtils.clone(mxGraph.defaultVertexStyle);

// Adds support for HTML labels via style. Note: Currently, only the Java
// backend supports HTML labels but CSS support is limited to the following:
// http://docs.oracle.com/javase/6/docs/api/index.html?javax/swing/text/html/CSS.html
// TODO: Wrap should not affect isHtmlLabel output (should be handled later)
mxGraph.isHtmlLabel = function (cell) {
  var state = mxGraph.view.getState(cell);
  var style = (state != null) ? state.style : mxGraph.getCellStyle(cell);
  return style['html'] == '1' || style[mxConstants.STYLE_WHITE_SPACE] == 'wrap';
};

// HTML entities are displayed as plain text in wrapped plain text labels
mxCellRenderer.getLabelValue = function (state) {
  var result = mxCellRenderer.prototype.getLabelValue.apply(mxGraph, arguments);

  if (state.view.graph.isHtmlLabel(state.cell)) {
    if (state.style['html'] != 1) {
      result = mxUtils.htmlEntities(result, false);
    }
    else {
      result = state.view.graph.sanitizeHtml(result);
    }
  }

  return result;
};

/**
 * Specifies the regular expression for matching placeholders.
 */
mxGraph.prototype.placeholderPattern = new RegExp('%(date\{.*\}|[^%^\{^\}]+)%', 'g');

/**
 * Specifies the regular expression for matching placeholders.
 */
mxGraph.prototype.absoluteUrlPattern = new RegExp('^(?:[a-z]+:)?//', 'i');

/**
 * Revalidates all cells with placeholders in the current graph model.
 */
mxGraph.prototype.updatePlaceholders = function () {
  var model = this.model;
  var validate = false;

  for (var key in this.model.cells) {
    var cell = this.model.cells[key];

    if (this.isReplacePlaceholders(cell)) {
      this.view.invalidate(cell, false, false);
      validate = true;
    }
  }

  if (validate) {
    this.view.validate();
  }
};

/**
 * Adds support for placeholders in labels.
 */
mxGraph.prototype.isReplacePlaceholders = function (cell) {
  return cell.value != null && typeof (cell.value) == 'object' &&
    cell.value.getAttribute('placeholders') == '1';
};

/**
 * Adds support for placeholders in labels.
 */
mxGraph.prototype.isSplitTarget = function (target, cells, evt) {
  return !this.model.isEdge(cells[0]) &&
    !mxEvent.isAltDown(evt) && !mxEvent.isShiftDown(evt) &&
    mxGraph.prototype.isSplitTarget.apply(this, arguments);
};

/**
 * Adds support for placeholders in labels.
 */
// mxGraph.prototype.getLabel = function(cell)
// {
// 	var result = mxGraph.prototype.getLabel.apply(this, arguments);

// 	if (result != null && this.isReplacePlaceholders(cell) && cell.getAttribute('placeholder') == null)
// 	{
// 		result = this.replacePlaceholders(cell, result);
// 	}

// 	return result;
// };

/**
 * Returns all labels in the diagram as a string.
 */
mxGraph.prototype.getIndexableText = function () {
  var tmp = document.createElement('div');
  var labels = [];
  var label = '';

  for (var key in this.model.cells) {
    var cell = this.model.cells[key];

    if (this.model.isVertex(cell) || this.model.isEdge(cell)) {
      if (this.isHtmlLabel(cell)) {
        tmp.innerHTML = this.getLabel(cell);
        label = mxUtils.extractTextWithWhitespace([tmp]);
      }
      else {
        label = this.getLabel(cell);
      }

      label = mxUtils.trim(label.replace(/[\x00-\x1F\x7F-\x9F]|\s+/g, ' '));

      if (label.length > 0) {
        labels.push(label);
      }
    }
  }

  return labels.join(' ');
};

/**
 * Returns the label for the given cell.
 */
mxGraph.prototype.convertValueToString = function (cell) {

  if (cell.value != null && typeof (cell.value) == 'object') {
    if (this.isReplacePlaceholders(cell) && cell.getAttribute('placeholder') != null) {
      var name = cell.getAttribute('placeholder');
      var current = cell;
      var result = null;

      while (result == null && current != null) {
        if (current.value != null && typeof (current.value) == 'object') {
          result = (current.hasAttribute(name)) ? ((current.getAttribute(name) != null) ?
            current.getAttribute(name) : '') : null;
        }

        current = this.model.getParent(current);
      }

      return result || '';
    }
    else {
      return cell.value.getAttribute('label') || '';
    }
  }
  return cell.getValue() || '';
};

/**
 * Returns the link for the given cell.
 */
mxGraph.prototype.getLinksForState = function (state) {
  if (state != null && state.text != null && state.text.node != null) {
    return state.text.node.getElementsByTagName('a');
  }

  return null;
};

/**
 * Returns the link for the given cell.
 */
mxGraph.prototype.getLinkForCell = function (cell) {
  if (cell.value != null && typeof (cell.value) == 'object') {
    var link = cell.value.getAttribute('link');

    // Removes links with leading javascript: protocol
    // TODO: Check more possible attack vectors
    if (link != null && link.toLowerCase().substring(0, 11) === 'javascript:') {
      link = link.substring(11);
    }

    return link;
  }

  return null;
};

/**
 * Overrides tooltips to show custom tooltip or metadata.
 */
mxGraph.prototype.getTooltipForCell = function (cell) {
  var tip = '';

  if (mxUtils.isNode(cell.value)) {
    var tmp = cell.value.getAttribute('tooltip');

    if (tmp != null) {
      if (tmp != null && this.isReplacePlaceholders(cell)) {
        tmp = this.replacePlaceholders(cell, tmp);
      }

      tip = this.sanitizeHtml(tmp);
    }
    else {
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
  }

  return tip;
};


/**
 * Reset the list of processed edges.
 */
var mxGraphViewResetValidationState = mxGraphView.prototype.resetValidationState;
mxGraphView.prototype.resetValidationState = function () {
  mxGraphViewResetValidationState.apply(this, arguments);

  this.validEdges = [];
};

/**
	 * Updates jumps for valid edges and repaints if needed.
	 */
var mxGraphViewValidateCellState = mxGraphView.prototype.validateCellState;
mxGraphView.prototype.validateCellState = function (cell, recurse) {
  var state = this.getState(cell);

  // Forces repaint if jumps change on a valid edge
  if (state != null && this.graph.model.isEdge(state.cell) &&
    state.style != null && state.style[mxConstants.STYLE_CURVED] != 1 &&
    !state.invalid && this.updateLineJumps(state)) {
    this.graph.cellRenderer.redraw(state, false, this.isRendering());
  }

  state = mxGraphViewValidateCellState.apply(this, arguments);

  // Adds to the list of edges that may intersect with later edges
  if (state != null && this.graph.model.isEdge(state.cell) &&
    state.style[mxConstants.STYLE_CURVED] != 1) {
    // LATER: Reuse jumps for valid edges
    this.validEdges.push(state);
  }

  return state;
};