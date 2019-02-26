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
    } else {
      result = state.view.graph.sanitizeHtml(result);
    }
  }

  return result;
};


// All code below not available and not needed in embed mode
if (typeof mxVertexHandler !== 'undefined') {
  mxGraph.setConnectable(true);
  mxGraph.setDropEnabled(true);
  mxGraph.setPanning(true);
  mxGraph.setTooltips(true);
  mxGraph.setAllowLoops(true);
  mxGraph.allowAutoPanning = true;
  mxGraph.resetEdgesOnConnect = false;
  mxGraph.constrainChildren = false;
  mxGraph.constrainRelativeChildren = true;

  // Do not scroll after moving cells
  mxGraph.graphHandler.scrollOnMove = false;
  mxGraph.graphHandler.scaleGrid = true;

  // Disables cloning of connection sources by default
  mxGraph.connectionHandler.setCreateTarget(false);
  mxGraph.connectionHandler.insertBeforeSource = true;

  // Disables built-in connection starts
  mxGraph.connectionHandler.isValidSource = function (cell, me) {
    return false;
  };

  // Sets the style to be used when an elbow edge is double clicked
  mxGraph.alternateEdgeStyle = 'vertical';

  if (stylesheet == null) {
    mxGraph.loadStylesheet();
  }

  // Adds page centers to the guides for moving cells
  var graphHandlerGetGuideStates = this.graphHandler.getGuideStates;
  mxGraph.graphHandler.getGuideStates = function () {
    var result = graphHandlerGetGuideStates.apply(this, arguments);

    // Create virtual cell state for page centers
    if (this.graph.pageVisible) {
      var guides = [];

      var pf = this.graph.pageFormat;
      var ps = this.graph.pageScale;
      var pw = pf.width * ps;
      var ph = pf.height * ps;
      var t = this.graph.view.translate;
      var s = this.graph.view.scale;

      var layout = this.graph.getPageLayout();

      for (var i = 0; i < layout.width; i++) {
        guides.push(new mxRectangle(((layout.x + i) * pw + t.x) * s,
          (layout.y * ph + t.y) * s, pw * s, ph * s));
      }

      for (var j = 0; j < layout.height; j++) {
        guides.push(new mxRectangle((layout.x * pw + t.x) * s,
          ((layout.y + j) * ph + t.y) * s, pw * s, ph * s));
      }

      // Page center guides have predence over normal guides
      result = guides.concat(result);
    }

    return result;
  };

  // Overrides zIndex for dragElement
  mxDragSource.prototype.dragElementZIndex = mxPopupMenu.prototype.zIndex;

  // Overrides color for virtual guides for page centers
  mxGuide.prototype.getGuideColor = function (state, horizontal) {
    return (state.cell == null) ? '#ffa500' /* orange */ : mxConstants.GUIDE_COLOR;
  };

  // Changes color of move preview for black backgrounds
  mxGraph.graphHandler.createPreviewShape = function (bounds) {
    mxGraph.previewColor = (mxGraph.graph.background == '#000000') ? '#ffffff' : mxGraphHandler.prototype.previewColor;

    return mxGraphHandler.prototype.createPreviewShape.apply(this, arguments);
  };

  // Handles parts of cells by checking if part=1 is in the style and returning the parent
  // if the parent is not already in the list of cells. container style is used to disable
  // step into swimlanes and dropTarget style is used to disable acting as a drop target.
  // LATER: Handle recursive parts
  mxGraph.graphHandler.getCells = function (initialCell) {
    var cells = mxGraphHandler.prototype.getCells.apply(this, arguments);
    var newCells = [];

    for (var i = 0; i < cells.length; i++) {
      var state = this.graph.view.getState(cells[i]);
      var style = (state != null) ? state.style : this.graph.getCellStyle(cells[i]);

      if (mxUtils.getValue(style, 'part', '0') == '1') {
        var parent = this.graph.model.getParent(cells[i]);

        if (this.graph.model.isVertex(parent) && mxUtils.indexOf(cells, parent) < 0) {
          newCells.push(parent);
        }
      } else {
        newCells.push(cells[i]);
      }
    }

    return newCells;
  };

  // Handles parts of cells when cloning the source for new connections
  this.connectionHandler.createTargetVertex = function (evt, source) {
    var state = this.graph.view.getState(source);
    var style = (state != null) ? state.style : this.graph.getCellStyle(source);

    if (mxUtils.getValue(style, 'part', false)) {
      var parent = this.graph.model.getParent(source);

      if (this.graph.model.isVertex(parent)) {
        source = parent;
      }
    }

    return mxConnectionHandler.prototype.createTargetVertex.apply(this, arguments);
  };

  var rubberband = new mxRubberband(this);

  this.getRubberband = function () {
    return rubberband;
  };

  // Timer-based activation of outline connect in connection handler
  var startTime = new Date().getTime();
  var timeOnTarget = 0;

  var connectionHandlerMouseMove = this.connectionHandler.mouseMove;

  this.connectionHandler.mouseMove = function () {
    var prev = this.currentState;
    connectionHandlerMouseMove.apply(this, arguments);

    if (prev != this.currentState) {
      startTime = new Date().getTime();
      timeOnTarget = 0;
    } else {
      timeOnTarget = new Date().getTime() - startTime;
    }
  };

  // Activates outline connect after 1500ms with touch event or if alt is pressed inside the shape
  // outlineConnect=0 is a custom style that means do not connect to strokes inside the shape,
  // or in other words, connect to the shape's perimeter if the highlight is under the mouse
  // (the name is because the highlight, including all strokes, is called outline in the code)
  var connectionHandleIsOutlineConnectEvent = this.connectionHandler.isOutlineConnectEvent;

  this.connectionHandler.isOutlineConnectEvent = function (me) {
    return (this.currentState != null && me.getState() == this.currentState && timeOnTarget > 2000) ||
      ((this.currentState == null || mxUtils.getValue(this.currentState.style, 'outlineConnect', '1') != '0') &&
        connectionHandleIsOutlineConnectEvent.apply(this, arguments));
  };

  // Adds shift+click to toggle selection state
  var isToggleEvent = this.isToggleEvent;
  this.isToggleEvent = function (evt) {
    return isToggleEvent.apply(this, arguments) || mxEvent.isShiftDown(evt);
  };

  // Workaround for Firefox where first mouse down is received
  // after tap and hold if scrollbars are visible, which means
  // start rubberband immediately if no cell is under mouse.
  var isForceRubberBandEvent = rubberband.isForceRubberbandEvent;
  rubberband.isForceRubberbandEvent = function (me) {
    return isForceRubberBandEvent.apply(this, arguments) ||
      (mxUtils.hasScrollbars(this.graph.container) && mxClient.IS_FF &&
        mxClient.IS_WIN && me.getState() == null && mxEvent.isTouchEvent(me.getEvent()));
  };

  // Shows hand cursor while panning
  var prevCursor = null;

  this.panningHandler.addListener(mxEvent.PAN_START, mxUtils.bind(this, function () {
    if (this.isEnabled()) {
      prevCursor = this.container.style.cursor;
      this.container.style.cursor = 'move';
    }
  }));

  this.panningHandler.addListener(mxEvent.PAN_END, mxUtils.bind(this, function () {
    if (this.isEnabled()) {
      this.container.style.cursor = prevCursor;
    }
  }));

  this.popupMenuHandler.autoExpand = true;

  this.popupMenuHandler.isSelectOnPopup = function (me) {
    return mxEvent.isMouseEvent(me.getEvent());
  };

  // Handles links if graph is read-only or cell is locked
  var click = this.click;
  this.click = function (me) {
    var locked = me.state == null && me.sourceState != null && this.isCellLocked(me.sourceState.cell);

    if ((!this.isEnabled() || locked) && !me.isConsumed()) {
      var cell = (locked) ? me.sourceState.cell : me.getCell();

      if (cell != null) {
        var link = this.getLinkForCell(cell);

        if (link != null) {
          if (this.isCustomLink(link)) {
            this.customLinkClicked(link);
          } else {
            this.openLink(link);
          }
        }
      }
    } else {
      return click.apply(this, arguments);
    }
  };

  // Redirects tooltips for locked cells
  this.tooltipHandler.getStateForEvent = function (me) {
    return me.sourceState;
  };

  // Redirects cursor for locked cells
  var getCursorForMouseEvent = this.getCursorForMouseEvent;
  this.getCursorForMouseEvent = function (me) {
    var locked = me.state == null && me.sourceState != null && this.isCellLocked(me.sourceState.cell);

    return this.getCursorForCell((locked) ? me.sourceState.cell : me.getCell());
  };

  // Shows pointer cursor for clickable cells with links
  // ie. if the graph is disabled and cells cannot be selected
  var getCursorForCell = this.getCursorForCell;
  this.getCursorForCell = function (cell) {
    if (!this.isEnabled() || this.isCellLocked(cell)) {
      var link = this.getLinkForCell(cell);

      if (link != null) {
        return 'pointer';
      } else if (this.isCellLocked(cell)) {
        return 'default';
      }
    }

    return getCursorForCell.apply(this, arguments);
  };

  // Changes rubberband selection to be recursive
  this.selectRegion = function (rect, evt) {
    var cells = this.getAllCells(rect.x, rect.y, rect.width, rect.height);
    this.selectCellsForEvent(cells, evt);

    return cells;
  };

  // Recursive implementation for rubberband selection
  this.getAllCells = function (x, y, width, height, parent, result) {
    result = (result != null) ? result : [];

    if (width > 0 || height > 0) {
      var model = this.getModel();
      var right = x + width;
      var bottom = y + height;

      if (parent == null) {
        parent = this.getCurrentRoot();

        if (parent == null) {
          parent = model.getRoot();
        }
      }

      if (parent != null) {
        var childCount = model.getChildCount(parent);

        for (var i = 0; i < childCount; i++) {
          var cell = model.getChildAt(parent, i);
          var state = this.view.getState(cell);

          if (state != null && this.isCellVisible(cell) && mxUtils.getValue(state.style, 'locked', '0') != '1') {
            var deg = mxUtils.getValue(state.style, mxConstants.STYLE_ROTATION) || 0;
            var box = state;

            if (deg != 0) {
              box = mxUtils.getBoundingBox(box, deg);
            }

            if ((model.isEdge(cell) || model.isVertex(cell)) &&
              box.x >= x && box.y + box.height <= bottom &&
              box.y >= y && box.x + box.width <= right) {
              result.push(cell);
            }

            this.getAllCells(x, y, width, height, cell, result);
          }
        }
      }
    }

    return result;
  };

  // Never removes cells from parents that are being moved
  var graphHandlerShouldRemoveCellsFromParent = this.graphHandler.shouldRemoveCellsFromParent;
  this.graphHandler.shouldRemoveCellsFromParent = function (parent, cells, evt) {
    if (this.graph.isCellSelected(parent)) {
      return false;
    }

    return graphHandlerShouldRemoveCellsFromParent.apply(this, arguments);
  };

  // Unlocks all cells
  this.isCellLocked = function (cell) {
    var pState = this.view.getState(cell);

    while (pState != null) {
      if (mxUtils.getValue(pState.style, 'locked', '0') == '1') {
        return true;
      }

      pState = this.view.getState(this.model.getParent(pState.cell));
    }

    return false;
  };

  var tapAndHoldSelection = null;

  // Uses this event to process mouseDown to check the selection state before it is changed
  this.addListener(mxEvent.FIRE_MOUSE_EVENT, mxUtils.bind(this, function (sender, evt) {
    if (evt.getProperty('eventName') == 'mouseDown') {
      var me = evt.getProperty('event');
      var state = me.getState();

      if (state != null && !this.isSelectionEmpty() && !this.isCellSelected(state.cell)) {
        tapAndHoldSelection = this.getSelectionCells();
      } else {
        tapAndHoldSelection = null;
      }
    }
  }));

  // Tap and hold on background starts rubberband for multiple selected
  // cells the cell associated with the event is deselected
  this.addListener(mxEvent.TAP_AND_HOLD, mxUtils.bind(this, function (sender, evt) {
    if (!mxEvent.isMultiTouchEvent(evt)) {
      var me = evt.getProperty('event');
      var cell = evt.getProperty('cell');

      if (cell == null) {
        var pt = mxUtils.convertPoint(this.container,
          mxEvent.getClientX(me), mxEvent.getClientY(me));
        rubberband.start(pt.x, pt.y);
      } else if (tapAndHoldSelection != null) {
        this.addSelectionCells(tapAndHoldSelection);
      } else if (this.getSelectionCount() > 1 && this.isCellSelected(cell)) {
        this.removeSelectionCell(cell);
      }

      // Blocks further processing of the event
      tapAndHoldSelection = null;
      evt.consume();
    }
  }));

  // On connect the target is selected and we clone the cell of the preview edge for insert
  this.connectionHandler.selectCells = function (edge, target) {
    this.graph.setSelectionCell(target || edge);
  };

  // Shows connection points only if cell not selected
  this.connectionHandler.constraintHandler.isStateIgnored = function (state, source) {
    return source && state.view.graph.isCellSelected(state.cell);
  };

  // Updates constraint handler if the selection changes
  this.selectionModel.addListener(mxEvent.CHANGE, mxUtils.bind(this, function () {
    var ch = this.connectionHandler.constraintHandler;

    if (ch.currentFocus != null && ch.isStateIgnored(ch.currentFocus, true)) {
      ch.currentFocus = null;
      ch.constraints = null;
      ch.destroyIcons();
    }

    ch.destroyFocusHighlight();
  }));

  // Initializes touch interface
  if (Graph.touchStyle) {
    this.initTouch();
  }

  /**
   * Adds locking
   */
  var graphUpdateMouseEvent = this.updateMouseEvent;
  this.updateMouseEvent = function (me) {
    me = graphUpdateMouseEvent.apply(this, arguments);

    if (me.state != null && this.isCellLocked(me.getCell())) {
      me.state = null;
    }

    return me;
  };
}

//Create a unique offset object for each graph instance.
this.currentTranslate = new mxPoint(0, 0);

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
// !! Recurrsif 
// mxGraph.prototype.isSplitTarget = function (target, cells, evt) {
//   return !this.model.isEdge(cells[0]) &&
//     !mxEvent.isAltDown(evt) && !mxEvent.isShiftDown(evt) &&
//     mxGraph.prototype.isSplitTarget.apply(this, arguments);
// };

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
      } else {
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
    } else {
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
    } else {
      var ignored = this.builtInProperties;
      var attrs = cell.value.attributes;
      var temp = [];

      // Hides links in edit mode
      if (this.isEnabled()) {
        ignored.push('link');
      }

      for (var i = 0; i < attrs.length; i++) {
        if (mxUtils.indexOf(ignored, attrs[i].nodeName) < 0 && attrs[i].nodeValue.length > 0) {
          temp.push({
            name: attrs[i].nodeName,
            value: attrs[i].nodeValue
          });
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


(function () {
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
  /**
   * Forces repaint if routed points have changed.
   */
  var mxCellRendererIsShapeInvalid = mxCellRenderer.prototype.isShapeInvalid;

  mxCellRenderer.prototype.isShapeInvalid = function (state, shape) {
    return mxCellRendererIsShapeInvalid.apply(this, arguments) ||
      (state.routedPoints != null && shape.routedPoints != null &&
        !mxUtils.equalPoints(shape.routedPoints, state.routedPoints))
  };

  /**
   * Updates jumps for invalid edges.
   */
  var mxGraphViewUpdateCellState = mxGraphView.prototype.updateCellState;

  mxGraphView.prototype.updateCellState = function (state) {
    mxGraphViewUpdateCellState.apply(this, arguments);

    // Updates jumps on invalid edge before repaint
    if (this.graph.model.isEdge(state.cell) &&
      state.style[mxConstants.STYLE_CURVED] != 1) {
      this.updateLineJumps(state);
    }
  };

  /**
   * Updates the jumps between given state and processed edges.
   */
  mxGraphView.prototype.updateLineJumps = function (state) {
    var pts = state.absolutePoints;

    if (mxGraph.lineJumpsEnabled) {
      var changed = state.routedPoints != null;
      var actual = null;

      if (pts != null && this.validEdges != null &&
        mxUtils.getValue(state.style, 'jumpStyle', 'none') !== 'none') {
        var thresh = 0.5 * this.scale;
        changed = false;
        actual = [];

        // Type 0 means normal waypoint, 1 means jump
        function addPoint(type, x, y) {
          var rpt = new mxPoint(x, y);
          rpt.type = type;

          actual.push(rpt);
          var curr = (state.routedPoints != null) ? state.routedPoints[actual.length - 1] : null;

          return curr == null || curr.type != type || curr.x != x || curr.y != y;
        };

        for (var i = 0; i < pts.length - 1; i++) {
          var p1 = pts[i + 1];
          var p0 = pts[i];
          var list = [];

          // Ignores waypoints on straight segments
          var pn = pts[i + 2];

          while (i < pts.length - 2 &&
            mxUtils.ptSegDistSq(p0.x, p0.y, pn.x, pn.y,
              p1.x, p1.y) < 1 * this.scale * this.scale) {
            p1 = pn;
            i++;
            pn = pts[i + 2];
          }

          changed = addPoint(0, p0.x, p0.y) || changed;

          // Processes all previous edges
          for (var e = 0; e < this.validEdges.length; e++) {
            var state2 = this.validEdges[e];
            var pts2 = state2.absolutePoints;

            if (pts2 != null && mxUtils.intersects(state, state2) && state2.style['noJump'] != '1') {
              // Compares each segment of the edge with the current segment
              for (var j = 0; j < pts2.length - 1; j++) {
                var p3 = pts2[j + 1];
                var p2 = pts2[j];

                // Ignores waypoints on straight segments
                pn = pts2[j + 2];

                while (j < pts2.length - 2 &&
                  mxUtils.ptSegDistSq(p2.x, p2.y, pn.x, pn.y,
                    p3.x, p3.y) < 1 * this.scale * this.scale) {
                  p3 = pn;
                  j++;
                  pn = pts2[j + 2];
                }

                var pt = mxUtils.intersection(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

                // Handles intersection between two segments
                if (pt != null && (Math.abs(pt.x - p2.x) > thresh ||
                    Math.abs(pt.y - p2.y) > thresh) &&
                  (Math.abs(pt.x - p3.x) > thresh ||
                    Math.abs(pt.y - p3.y) > thresh)) {
                  var dx = pt.x - p0.x;
                  var dy = pt.y - p0.y;
                  var temp = {
                    distSq: dx * dx + dy * dy,
                    x: pt.x,
                    y: pt.y
                  };

                  // Intersections must be ordered by distance from start of segment
                  for (var t = 0; t < list.length; t++) {
                    if (list[t].distSq > temp.distSq) {
                      list.splice(t, 0, temp);
                      temp = null;

                      break;
                    }
                  }

                  // Ignores multiple intersections at segment joint
                  if (temp != null && (list.length == 0 ||
                      list[list.length - 1].x !== temp.x ||
                      list[list.length - 1].y !== temp.y)) {
                    list.push(temp);
                  }
                }
              }
            }
          }

          // Adds ordered intersections to routed points
          for (var j = 0; j < list.length; j++) {
            changed = addPoint(1, list[j].x, list[j].y) || changed;
          }
        }

        var pt = pts[pts.length - 1];
        changed = addPoint(0, pt.x, pt.y) || changed;
      }

      state.routedPoints = actual;

      return changed;
    } else {
      return false;
    }
  };

  /**
   * Overrides painting the actual shape for taking into account jump style.
   */
  var mxConnectorPaintLine = mxConnector.prototype.paintLine;

  mxConnector.prototype.paintLine = function (c, absPts, rounded) {
    // Required for checking dirty state
    this.routedPoints = (this.state != null) ? this.state.routedPoints : null;

    if (this.outline || this.state == null || this.style == null ||
      this.state.routedPoints == null || this.state.routedPoints.length == 0) {
      mxConnectorPaintLine.apply(this, arguments);
    } else {
      var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE,
        mxConstants.LINE_ARCSIZE) / 2;
      var size = (parseInt(mxUtils.getValue(this.style, 'jumpSize',
        Graph.defaultJumpSize)) - 2) / 2 + this.strokewidth;
      var style = mxUtils.getValue(this.style, 'jumpStyle', 'none');
      var f = Editor.jumpSizeRatio;
      var moveTo = true;
      var last = null;
      var len = null;
      var pts = [];
      var n = null;
      c.begin();

      for (var i = 0; i < this.state.routedPoints.length; i++) {
        var rpt = this.state.routedPoints[i];
        var pt = new mxPoint(rpt.x / this.scale, rpt.y / this.scale);

        // Takes first and last point from passed-in array
        if (i == 0) {
          pt = absPts[0];
        } else if (i == this.state.routedPoints.length - 1) {
          pt = absPts[absPts.length - 1];
        }

        var done = false;

        // Type 1 is an intersection
        if (last != null && rpt.type == 1) {
          // Checks if next/previous points are too close
          var next = this.state.routedPoints[i + 1];
          var dx = next.x / this.scale - pt.x;
          var dy = next.y / this.scale - pt.y;
          var dist = dx * dx + dy * dy;

          if (n == null) {
            n = new mxPoint(pt.x - last.x, pt.y - last.y);
            len = Math.sqrt(n.x * n.x + n.y * n.y);
            n.x = n.x * size / len;
            n.y = n.y * size / len;
          }

          if (dist > size * size && len > 0) {
            var dx = last.x - pt.x;
            var dy = last.y - pt.y;
            var dist = dx * dx + dy * dy;

            if (dist > size * size) {
              var p0 = new mxPoint(pt.x - n.x, pt.y - n.y);
              var p1 = new mxPoint(pt.x + n.x, pt.y + n.y);
              pts.push(p0);

              this.addPoints(c, pts, rounded, arcSize, false, null, moveTo);

              var f = (Math.round(n.x) < 0 || (Math.round(n.x) == 0 &&
                Math.round(n.y) <= 0)) ? 1 : -1;
              moveTo = false;

              if (style == 'sharp') {
                c.lineTo(p0.x - n.y * f, p0.y + n.x * f);
                c.lineTo(p1.x - n.y * f, p1.y + n.x * f);
                c.lineTo(p1.x, p1.y);
              } else if (style == 'arc') {
                f *= 1.3;
                c.curveTo(p0.x - n.y * f, p0.y + n.x * f,
                  p1.x - n.y * f, p1.y + n.x * f,
                  p1.x, p1.y);
              } else {
                c.moveTo(p1.x, p1.y);
                moveTo = true;
              }

              pts = [p1];
              done = true;
            }
          }
        } else {
          n = null;
        }

        if (!done) {
          pts.push(pt);
          last = pt;
        }
      }

      this.addPoints(c, pts, rounded, arcSize, false, null, moveTo);
      c.stroke();
    }
  };

  /**
   * Adds support for snapToPoint style.
   */
  var mxGraphViewUpdateFloatingTerminalPoint = mxGraphView.prototype.updateFloatingTerminalPoint;

  mxGraphView.prototype.updateFloatingTerminalPoint = function (edge, start, end, source) {
    if (start != null && edge != null &&
      (start.style['snapToPoint'] == '1' ||
        edge.style['snapToPoint'] == '1')) {
      start = this.getTerminalPort(edge, start, source);
      var next = this.getNextPoint(edge, end, source);

      var orth = this.graph.isOrthogonal(edge);
      var alpha = mxUtils.toRadians(Number(start.style[mxConstants.STYLE_ROTATION] || '0'));
      var center = new mxPoint(start.getCenterX(), start.getCenterY());

      if (alpha != 0) {
        var cos = Math.cos(-alpha);
        var sin = Math.sin(-alpha);
        next = mxUtils.getRotatedPoint(next, cos, sin, center);
      }

      var border = parseFloat(edge.style[mxConstants.STYLE_PERIMETER_SPACING] || 0);
      border += parseFloat(edge.style[(source) ?
        mxConstants.STYLE_SOURCE_PERIMETER_SPACING :
        mxConstants.STYLE_TARGET_PERIMETER_SPACING] || 0);
      var pt = this.getPerimeterPoint(start, next, alpha == 0 && orth, border);

      if (alpha != 0) {
        var cos = Math.cos(alpha);
        var sin = Math.sin(alpha);
        pt = mxUtils.getRotatedPoint(pt, cos, sin, center);
      }

      edge.setAbsoluteTerminalPoint(this.snapToAnchorPoint(edge, start, end, source, pt), source);
    } else {
      mxGraphViewUpdateFloatingTerminalPoint.apply(this, arguments);
    }
  };

  mxGraphView.prototype.snapToAnchorPoint = function (edge, start, end, source, pt) {
    if (start != null && edge != null) {
      var constraints = this.graph.getAllConnectionConstraints(start)
      var nearest = null;
      var dist = null;

      if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
          var cp = this.graph.getConnectionPoint(start, constraints[i]);

          if (cp != null) {
            var tmp = (cp.x - pt.x) * (cp.x - pt.x) + (cp.y - pt.y) * (cp.y - pt.y);

            if (dist == null || tmp < dist) {
              nearest = cp;
              dist = tmp;
            }
          }
        }
      }

      if (nearest != null) {
        pt = nearest;
      }
    }

    return pt;
  };

  /**
   * Adds support for placeholders in text elements of shapes.
   */
  var mxStencilEvaluateTextAttribute = mxStencil.prototype.evaluateTextAttribute;
  mxStencil.prototype.evaluateTextAttribute = function (node, attribute, shape) {
    var result = mxStencilEvaluateTextAttribute.apply(this, arguments);
    var placeholders = node.getAttribute('placeholders');

    if (placeholders == '1' && shape.state != null) {
      result = shape.state.view.graph.replacePlaceholders(shape.state.cell, result);
    }

    return result;
  };

  /**
   * Adds custom stencils defined via shape=stencil(value) style. The value is a base64 encoded, compressed and
   * URL encoded XML definition of the shape according to the stencil definition language of mxGraph.
   * 
   * Needs to be in this file to make sure its part of the embed client code. Also the check for ZLib is
   * different than for the Editor code.
   */
  var mxCellRendererCreateShape = mxCellRenderer.prototype.createShape;
  mxCellRenderer.prototype.createShape = function (state) {
    if (state.style != null && typeof (pako) !== 'undefined') {
      var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

      // Extracts and decodes stencil XML if shape has the form shape=stencil(value)
      if (shape != null && shape.substring(0, 8) == 'stencil(') {
        try {
          var stencil = shape.substring(8, shape.length - 1);
          var doc = mxUtils.parseXml(state.view.graph.decompress(stencil));

          return new mxShape(new mxStencil(doc.documentElement));
        } catch (e) {
          if (window.console != null) {
            console.log('Error in shape: ' + e);
          }
        }
      }
    }

    return mxCellRendererCreateShape.apply(this, arguments);
  };

})();

/**
 * Overrides stencil registry for dynamic loading of stencils.
 */
/**
 * Maps from library names to an array of Javascript filenames,
 * which are synchronously loaded. Currently only stencil files
 * (.xml) and JS files (.js) are supported.
 * IMPORTANT: For embedded diagrams to work entries must also
 * be added in EmbedServlet.java.
 */
mxStencilRegistry.libraries = {};

/**
 * Global switch to disable dynamic loading.
 */
mxStencilRegistry.dynamicLoading = true;

/**
 * Global switch to disable eval for JS (preload all JS instead).
 */
mxStencilRegistry.allowEval = true;

/**
 * Stores all package names that have been dynamically loaded.
 * Each package is only loaded once.
 */
mxStencilRegistry.packages = [];

// Extends the default stencil registry to add dynamic loading
mxStencilRegistry.getStencil = function (name) {
  var result = mxStencilRegistry.stencils[name];

  if (result == null && mxCellRenderer.defaultShapes[name] == null && mxStencilRegistry.dynamicLoading) {
    var basename = mxStencilRegistry.getBasenameForStencil(name);

    // Loads stencil files and tries again
    if (basename != null) {
      var libs = mxStencilRegistry.libraries[basename];

      if (libs != null) {
        if (mxStencilRegistry.packages[basename] == null) {
          for (var i = 0; i < libs.length; i++) {
            var fname = libs[i];

            if (fname.toLowerCase().substring(fname.length - 4, fname.length) == '.xml') {
              mxStencilRegistry.loadStencilSet(fname, null);
            } else if (fname.toLowerCase().substring(fname.length - 3, fname.length) == '.js') {
              try {
                if (mxStencilRegistry.allowEval) {
                  var req = mxUtils.load(fname);

                  if (req != null && req.getStatus() >= 200 && req.getStatus() <= 299) {
                    eval.call(window, req.getText());
                  }
                }
              } catch (e) {
                if (window.console != null) {
                  console.log('error in getStencil:', fname, e);
                }
              }
            } else {
              // FIXME: This does not yet work as the loading is triggered after
              // the shape was used in the graph, at which point the keys have
              // typically been translated in the calling method.
              //mxResources.add(fname);
            }
          }

          mxStencilRegistry.packages[basename] = 1;
        }
      } else {
        // Replaces '_-_' with '_'
        basename = basename.replace('_-_', '_');
        mxStencilRegistry.loadStencilSet(STENCIL_PATH + '/' + basename + '.xml', null);
      }

      result = mxStencilRegistry.stencils[name];
    }
  }

  return result;
};

// Returns the basename for the given stencil or null if no file must be
// loaded to render the given stencil.
mxStencilRegistry.getBasenameForStencil = function (name) {
  var tmp = null;

  if (name != null) {
    var parts = name.split('.');

    if (parts.length > 0 && parts[0] == 'mxgraph') {
      tmp = parts[1];

      for (var i = 2; i < parts.length - 1; i++) {
        tmp += '/' + parts[i];
      }
    }
  }

  return tmp;
};

// Loads the given stencil set
mxStencilRegistry.loadStencilSet = function (stencilFile, postStencilLoad, force, async) {
  force = (force != null) ? force : false;

  // Uses additional cache for detecting previous load attempts
  var xmlDoc = mxStencilRegistry.packages[stencilFile];

  if (force || xmlDoc == null) {
    var install = false;

    if (xmlDoc == null) {
      try {
        if (async) {
          mxStencilRegistry.loadStencil(stencilFile, mxUtils.bind(this, function (xmlDoc2) {
            if (xmlDoc2 != null && xmlDoc2.documentElement != null) {
              mxStencilRegistry.packages[stencilFile] = xmlDoc2;
              install = true;
              mxStencilRegistry.parseStencilSet(xmlDoc2.documentElement, postStencilLoad, install);
            }
          }));

          return;
        } else {
          xmlDoc = mxStencilRegistry.loadStencil(stencilFile);
          mxStencilRegistry.packages[stencilFile] = xmlDoc;
          install = true;
        }
      } catch (e) {
        if (window.console != null) {
          console.log('error in loadStencilSet:', stencilFile, e);
        }
      }
    }

    if (xmlDoc != null && xmlDoc.documentElement != null) {
      mxStencilRegistry.parseStencilSet(xmlDoc.documentElement, postStencilLoad, install);
    }
  }
};

// Loads the given stencil XML file.
mxStencilRegistry.loadStencil = function (filename, fn) {
  if (fn != null) {
    var req = mxUtils.get(filename, mxUtils.bind(this, function (req) {
      fn((req.getStatus() >= 200 && req.getStatus() <= 299) ? req.getXml() : null);
    }));
  } else {
    return mxUtils.load(filename).getXml();
  }
};

// Takes array of strings
mxStencilRegistry.parseStencilSets = function (stencils) {
  for (var i = 0; i < stencils.length; i++) {
    mxStencilRegistry.parseStencilSet(mxUtils.parseXml(stencils[i]).documentElement);
  }
};

// Parses the given stencil set
mxStencilRegistry.parseStencilSet = function (root, postStencilLoad, install) {
  if (root.nodeName == 'stencils') {
    var shapes = root.firstChild;

    while (shapes != null) {
      if (shapes.nodeName == 'shapes') {
        mxStencilRegistry.parseStencilSet(shapes, postStencilLoad, install);
      }

      shapes = shapes.nextSibling;
    }
  } else {
    install = (install != null) ? install : true;
    var shape = root.firstChild;
    var packageName = '';
    var name = root.getAttribute('name');

    if (name != null) {
      packageName = name + '.';
    }

    while (shape != null) {
      if (shape.nodeType == mxConstants.NODETYPE_ELEMENT) {
        name = shape.getAttribute('name');

        if (name != null) {
          packageName = packageName.toLowerCase();
          var stencilName = name.replace(/ /g, "_");

          if (install) {
            mxStencilRegistry.addStencil(packageName + stencilName.toLowerCase(), new mxStencil(shape));
          }

          if (postStencilLoad != null) {
            var w = shape.getAttribute('w');
            var h = shape.getAttribute('h');

            w = (w == null) ? 80 : parseInt(w, 10);
            h = (h == null) ? 80 : parseInt(h, 10);

            postStencilLoad(packageName, stencilName, name, w, h);
          }
        }
      }

      shape = shape.nextSibling;
    }
  }
};