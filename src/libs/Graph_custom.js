mxTooltipHandler.prototype.show = function (tip, x, y) {
  // TYPE STRING
  if (this.destroyed) return;
  if (tip == null) return;
  if (tip.length == 0) return;
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
    for (var i = 0; i < attrs.length; i++) {
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
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].name != 'link' || !this.isCustomLink(temp[i].value)) {
          attrString +=
            (temp[i].name != 'link' ? '<b>' + temp[i].name + ':</b> ' : '') +
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
  if (hasTips) return div;
  return '';
};

// Graph.prototype.importCsv = function (text, done) {
//   var graph = this;
//   const csvToArray = function (text) {
//     var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
//     var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
//     // Return NULL if input string is not well formed CSV string.
//     if (!re_valid.test(text)) return null;
//     var a = [];                     // Initialize array to receive values.
//     text.replace(re_value, // "Walk" the string using replace with callback.
//       function (m0, m1, m2, m3) {
//         // Remove backslash from \' in single quoted values.
//         if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
//         // Remove backslash from \" in double quoted values.
//         else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
//         else if (m3 !== undefined) a.push(m3);
//         return ''; // Return empty string.
//       });
//     // Handle special case of empty last value.
//     if (/,\s*$/.test(text)) a.push('');
//     return a;
//   };

//   const executeLayout = function (change, post) {
//     graph.getModel().beginUpdate();
//     try {
//       if (change != null) {
//         change();
//       }

//       layout.execute(graph.getDefaultParent());
//     }
//     catch (e) {
//       throw e;
//     }
//     finally {
//       // New API for animating graph layout results asynchronously
//       var morph = new mxMorphing(graph);
//       morph.addListener(mxEvent.DONE, mxUtils.bind(this, function () {
//         graph.getModel().endUpdate();

//       }));

//       morph.startAnimation();
//     }
//   };
//   const executeLayoutList = function (layoutList, done) {
//     var cells = graph.getSelectionCells();

//     for (var i = 0; i < layoutList.length; i++) {
//       var layout = new window[layoutList[i].layout](graph);

//       if (layoutList[i].config != null) {
//         for (var key in layoutList[i].config) {
//           layout[key] = layoutList[i].config[key];
//         }
//       }

//       executeLayout(function () {
//         layout.execute(graph.getDefaultParent(), cells.length == 0 ? null : cells);
//       }, i == layoutList.length - 1, done);
//     }
//   };


//   // try {
//   var lines = text.split('\n');
//   var allCells = [];
//   var cells = [];
//   var dups = {};

//   if (lines.length > 0) {
//     // Internal lookup table
//     var lookups = {};

//     // Default values
//     var style = null;
//     var styles = null;
//     var stylename = null;
//     var labelname = null;
//     var labels = null;
//     var parentstyle = null;
//     var identity = null;
//     var parent = null;
//     var namespace = '';
//     var width = 'auto';
//     var height = 'auto';
//     var left = null;
//     var top = null;
//     var edgespacing = 40;
//     var nodespacing = 40;
//     var levelspacing = 100;
//     var padding = 0;

//     // var graph = this.editor.graph;
//     var graph = this;
//     var view = graph.view;
//     var bds = graph.getGraphBounds();

//     // Delayed after optional layout
//     var afterInsert = function () {
//       if (done != null) {
//         done(select);
//       }
//       else {
//         graph.setSelectionCells(select);
//         graph.scrollCellToVisible(graph.getSelectionCell());
//       }
//     };

//     // Computes unscaled, untranslated graph bounds
//     var pt = graph.getFreeInsertPoint();
//     var x0 = pt.x;
//     var y0 = pt.y;
//     var y = y0;

//     // Default label value depends on column names
//     var label = null;

//     // Default layout to run.
//     var layout = 'auto';


//     // Name of the attribute that contains the references for creating edges
//     var edges = [];

//     // Name of the column for hyperlinks
//     var link = null;

//     // String array of names to remove from metadata
//     var ignore = null;

//     // Read processing instructions first
//     var index = 0;

//     while (index < lines.length && lines[index].charAt(0) == '#') {
//       var text = lines[index];
//       index++;

//       while (index < lines.length && text.charAt(text.length - 1) == '\\' &&
//         lines[index].charAt(0) == '#') {
//         text = text.substring(0, text.length - 1) + mxUtils.trim(lines[index].substring(1));
//         index++;
//       }

//       if (text.charAt(1) != '#') {
//         // Processing instruction
//         var idx = text.indexOf(':');

//         if (idx > 0) {
//           var key = mxUtils.trim(text.substring(1, idx));
//           var value = mxUtils.trim(text.substring(idx + 1));

//           if (key == 'label') {
//             label = graph.sanitizeHtml(value);
//           }
//           else if (key == 'labelname' && value.length > 0 && value != '-') {
//             labelname = value;
//           }
//           else if (key == 'labels' && value.length > 0 && value != '-') {
//             labels = JSON.parse(value);
//           }
//           else if (key == 'style') {
//             style = value;
//           }
//           else if (key == 'parentstyle') {
//             parentstyle = value;
//           }
//           else if (key == 'stylename' && value.length > 0 && value != '-') {
//             stylename = value;
//           }
//           else if (key == 'styles' && value.length > 0 && value != '-') {
//             styles = JSON.parse(value);
//           }
//           else if (key == 'identity' && value.length > 0 && value != '-') {
//             identity = value;
//           }
//           else if (key == 'parent' && value.length > 0 && value != '-') {
//             parent = value;
//           }
//           else if (key == 'namespace' && value.length > 0 && value != '-') {
//             namespace = value;
//           }
//           else if (key == 'width') {
//             width = value;
//           }
//           else if (key == 'height') {
//             height = value;
//           }
//           else if (key == 'left' && value.length > 0) {
//             left = value;
//           }
//           else if (key == 'top' && value.length > 0) {
//             top = value;
//           }
//           else if (key == 'ignore') {
//             ignore = value.split(',');
//           }
//           else if (key == 'connect') {
//             edges.push(JSON.parse(value));
//           }
//           else if (key == 'link') {
//             link = value;
//           }
//           else if (key == 'padding') {
//             padding = parseFloat(value);
//           }
//           else if (key == 'edgespacing') {
//             edgespacing = parseFloat(value);
//           }
//           else if (key == 'nodespacing') {
//             nodespacing = parseFloat(value);
//           }
//           else if (key == 'levelspacing') {
//             levelspacing = parseFloat(value);
//           }
//           else if (key == 'layout') {
//             layout = value;
//           }
//         }
//       }
//     }

//     if (lines[index] == null) {
//       throw new Error(mxResources.get('invalidOrMissingFile'));
//     }

//     // Converts identity and parent to index and validates XML attribute names
//     var keys = csvToArray(lines[index]);
//     var identityIndex = null;
//     var parentIndex = null;
//     var attribs = [];

//     for (var i = 0; i < keys.length; i++) {
//       if (identity == keys[i]) {
//         identityIndex = i;
//       }

//       if (parent == keys[i]) {
//         parentIndex = i;
//       }

//       attribs.push(mxUtils.trim(keys[i]).replace(/[^a-z0-9]+/ig, '_').
//         replace(/^\d+/, '').replace(/_+$/, ''));
//     }

//     if (label == null) {
//       label = '%' + attribs[0] + '%';
//     }

//     if (edges != null) {
//       for (var e = 0; e < edges.length; e++) {
//         if (lookups[edges[e].to] == null) {
//           lookups[edges[e].to] = {};
//         }
//       }
//     }

//     // Parse and validate input
//     var arrays = [];

//     for (var i = index + 1; i < lines.length; i++) {
//       var values = csvToArray(lines[i]);

//       if (values == null) {
//         var short = lines[i].length > 40 ? lines[i].substring(0, 40) + '...' : lines[i];

//         throw new Error(short + ' (' + i + '):\n' + mxResources.get('containsValidationErrors'));
//       }
//       else if (values.length > 0) {
//         arrays.push(values);
//       }
//     }

//     graph.model.beginUpdate();
//     try {
//       for (var i = 0; i < arrays.length; i++) {
//         var values = arrays[i];
//         var cell = null;
//         var id = (identityIndex != null) ? namespace + values[identityIndex] : null;

//         if (id != null) {
//           cell = graph.model.getCell(id);
//         }

//         var exists = cell != null;
//         var newCell = new mxCell(label, new mxGeometry(x0, y,
//           0, 0), style || 'whiteSpace=wrap;html=1;');
//         newCell.vertex = true;
//         newCell.id = id;

//         for (var j = 0; j < values.length; j++) {
//           graph.setAttributeForCell(newCell, attribs[j], values[j]);
//         }

//         if (labelname != null && labels != null) {
//           var tempLabel = labels[newCell.getAttribute(labelname)];

//           if (tempLabel != null) {
//             graph.labelChanged(newCell, tempLabel);
//           }
//         }

//         if (stylename != null && styles != null) {
//           var tempStyle = styles[newCell.getAttribute(stylename)];

//           if (tempStyle != null) {
//             newCell.style = tempStyle;
//           }
//         }

//         graph.setAttributeForCell(newCell, 'placeholders', '1');
//         newCell.style = graph.replacePlaceholders(newCell, newCell.style);

//         if (exists) {
//           graph.model.setGeometry(cell, newCell.geometry);
//           graph.model.setStyle(cell, newCell.style);

//           if (mxUtils.indexOf(cells, cell) < 0) {
//             cells.push(cell);
//           }
//         }

//         cell = newCell;

//         if (!exists) {
//           for (var e = 0; e < edges.length; e++) {
//             lookups[edges[e].to][cell.getAttribute(edges[e].to)] = cell;
//           }
//         }

//         if (link != null && link != 'link') {
//           graph.setLinkForCell(cell, cell.getAttribute(link));

//           // Removes attribute
//           graph.setAttributeForCell(cell, link, null);
//         }

//         // Sets the size
//         graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
//         var size = graph.getPreferredSizeForCell(cell);

//         if (cell.vertex) {
//           if (left != null && cell.getAttribute(left) != null) {
//             cell.geometry.x = x0 + parseFloat(cell.getAttribute(left));
//           }

//           if (top != null && cell.getAttribute(top) != null) {
//             cell.geometry.y = y0 + parseFloat(cell.getAttribute(top));
//           }

//           if (width.charAt(0) == '@' && cell.getAttribute(width.substring(1)) != null) {
//             cell.geometry.width = parseFloat(cell.getAttribute(width.substring(1)));
//           }
//           else {
//             cell.geometry.width = (width == 'auto') ? size.width + padding : parseFloat(width);
//           }

//           if (height.charAt(0) == '@' && cell.getAttribute(height.substring(1)) != null) {
//             cell.geometry.height = parseFloat(cell.getAttribute(height.substring(1)));
//           }
//           else {
//             cell.geometry.height = (height == 'auto') ? size.height + padding : parseFloat(height);
//           }

//           y += cell.geometry.height + nodespacing;
//         }

//         if (!exists) {
//           var parent = (parentIndex != null) ? graph.model.getCell(
//             namespace + values[parentIndex]) : null;
//           allCells.push(cell);

//           if (parent != null) {
//             parent.style = graph.replacePlaceholders(parent, parentstyle);
//             graph.addCell(cell, parent);
//           }
//           else {
//             cells.push(graph.addCell(cell));
//           }
//         }
//         else {
//           if (dups[id] == null) {
//             dups[id] = [];
//           }

//           dups[id].push(cell);
//         }
//       }

//       var roots = cells.slice();
//       var select = cells.slice();

//       for (var e = 0; e < edges.length; e++) {
//         var edge = edges[e];

//         for (var i = 0; i < allCells.length; i++) {
//           var cell = allCells[i];

//           var insertEdge = mxUtils.bind(this, function (realCell, dataCell, edge) {
//             var tmp = dataCell.getAttribute(edge.from);

//             if (tmp != null) {
//               // Removes attribute
//               graph.setAttributeForCell(dataCell, edge.from, null);

//               if (tmp != '') {
//                 var refs = tmp.split(',');

//                 for (var j = 0; j < refs.length; j++) {
//                   var ref = lookups[edge.to][refs[j]];

//                   if (ref != null) {
//                     var label = edge.label;

//                     if (edge.fromlabel != null) {
//                       label = (dataCell.getAttribute(edge.fromlabel) || '') + (label || '');
//                     }

//                     if (edge.tolabel != null) {
//                       label = (label || '') + (ref.getAttribute(edge.tolabel) || '');
//                     }

//                     var placeholders = ((edge.placeholders == 'target') ==
//                       !edge.invert) ? ref : realCell;
//                     var style = (edge.style != null) ?
//                       graph.replacePlaceholders(placeholders, edge.style) :
//                       graph.createCurrentEdgeStyle();

//                     select.push(graph.insertEdge(null, null, label || '', (edge.invert) ?
//                       ref : realCell, (edge.invert) ? realCell : ref, style));
//                     mxUtils.remove((edge.invert) ? realCell : ref, roots);
//                   }
//                 }
//               }
//             }
//           });

//           insertEdge(cell, cell, edge);

//           // Checks more entries
//           if (dups[cell.id] != null) {
//             for (var j = 0; j < dups[cell.id].length; j++) {
//               insertEdge(cell, dups[cell.id][j], edge);
//             }
//           }
//         }
//       }

//       // Removes ignored attributes after processing above
//       if (ignore != null) {
//         for (var i = 0; i < allCells.length; i++) {
//           var cell = allCells[i];

//           for (var j = 0; j < ignore.length; j++) {
//             graph.setAttributeForCell(cell, mxUtils.trim(ignore[j]), null);
//           }
//         }
//       }

//       if (cells.length > 0) {
//         var edgeLayout = new mxParallelEdgeLayout(graph);
//         edgeLayout.spacing = edgespacing;

//         var postProcess = function () {
//           if (edgeLayout.spacing > 0) {
//             edgeLayout.execute(graph.getDefaultParent());
//           }

//           // Aligns cells to grid and/or rounds positions
//           for (var i = 0; i < cells.length; i++) {
//             var geo = graph.getCellGeometry(cells[i]);
//             geo.x = Math.round(graph.snap(geo.x));
//             geo.y = Math.round(graph.snap(geo.y));

//             if (width == 'auto') {
//               geo.width = Math.round(graph.snap(geo.width));
//             }

//             if (height == 'auto') {
//               geo.height = Math.round(graph.snap(geo.height));
//             }
//           }
//         };

//         if (layout.charAt(0) == '[') {
//           // Required for layouts to work with new cells
//           var temp = afterInsert;
//           graph.view.validate();
//           executeLayoutList(JSON.parse(layout), function () {
//             postProcess();
//             temp();
//           });
//           afterInsert = null;
//         }
//         else if (layout == 'circle') {
//           var circleLayout = new mxCircleLayout(graph);
//           circleLayout.resetEdges = false;

//           var circleLayoutIsVertexIgnored = circleLayout.isVertexIgnored;

//           // Ignore other cells
//           circleLayout.isVertexIgnored = function (vertex) {
//             return circleLayoutIsVertexIgnored.apply(this, arguments) ||
//               mxUtils.indexOf(cells, vertex) < 0;
//           };

//           executeLayout(function () {
//             circleLayout.execute(graph.getDefaultParent());
//             postProcess();
//           }, true, afterInsert);

//           afterInsert = null;
//         }
//         else if (layout == 'horizontaltree' || layout == 'verticaltree' ||
//           (layout == 'auto' && select.length == 2 * cells.length - 1 && roots.length == 1)) {
//           // Required for layouts to work with new cells
//           graph.view.validate();

//           var treeLayout = new mxCompactTreeLayout(graph, layout == 'horizontaltree');
//           treeLayout.levelDistance = nodespacing;
//           treeLayout.edgeRouting = false;
//           treeLayout.resetEdges = false;

//           executeLayout(function () {
//             treeLayout.execute(graph.getDefaultParent(), (roots.length > 0) ? roots[0] : null);
//           }, true, afterInsert);

//           afterInsert = null;
//         }
//         else if (layout == 'horizontalflow' || layout == 'verticalflow' ||
//           (layout == 'auto' && roots.length == 1)) {
//           // Required for layouts to work with new cells
//           graph.view.validate();

//           var flowLayout = new mxHierarchicalLayout(graph,
//             (layout == 'horizontalflow') ? mxConstants.DIRECTION_WEST : mxConstants.DIRECTION_NORTH);
//           flowLayout.intraCellSpacing = nodespacing;
//           flowLayout.parallelEdgeSpacing = edgespacing;
//           flowLayout.interRankCellSpacing = levelspacing;
//           flowLayout.disableEdgeStyle = false;

//           executeLayout(function () {
//             flowLayout.execute(graph.getDefaultParent(), select);

//             // Workaround for flow layout moving cells to origin
//             graph.moveCells(select, x0, y0);
//           }, true, afterInsert);

//           afterInsert = null;
//         }
//         else if (layout == 'organic' || (layout == 'auto' &&
//           select.length > cells.length)) {
//           // Required for layouts to work with new cells
//           graph.view.validate();

//           var organicLayout = new mxFastOrganicLayout(graph);
//           organicLayout.forceConstant = nodespacing * 3;
//           organicLayout.resetEdges = false;

//           var organicLayoutIsVertexIgnored = organicLayout.isVertexIgnored;

//           // Ignore other cells
//           organicLayout.isVertexIgnored = function (vertex) {
//             return organicLayoutIsVertexIgnored.apply(this, arguments) ||
//               mxUtils.indexOf(cells, vertex) < 0;
//           };

//           var edgeLayout = new mxParallelEdgeLayout(graph);
//           edgeLayout.spacing = edgespacing;

//           executeLayout(function () {
//             organicLayout.execute(graph.getDefaultParent());
//             postProcess();
//           }, true, afterInsert);

//           afterInsert = null;
//         }
//       }

//       this.hideDialog();
//     }
//     finally {
//       graph.model.endUpdate();
//     }

//     if (afterInsert != null) {
//       afterInsert();
//     }
//   }
//   // }
//   // catch (e) {
//   //   this.handleError(e);
//   // }
// };


mxEvent.addMouseWheelListener = function (func, container) {
  if (null != func) {
    var c = function (container) {
      null == container && (container = window.event);
      var c;
      c = mxClient.IS_FF ? -container.detail / 2 : container.wheelDelta / 120;
      0 != c && func(container, 0 < c);
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