module.exports = {
    executeLayout(graph, exec, animate, post) {
        if (graph.isEnabled()) {
            graph.getModel().beginUpdate();
            try {
                exec();
            }
            catch (e) {
                throw e;
            }
            finally {
                graph.getModel().endUpdate();
                if (post != null) {
                    post();
                }
            }
        }
    },
    executeLayoutList(graph, layoutList, done) {
        var cells = graph.getSelectionCells();

        for (var i = 0; i < layoutList.length; i++) {
            var layout = new window[layoutList[i].layout](graph);

            if (layoutList[i].config != null) {
                for (var key in layoutList[i].config) {
                    layout[key] = layoutList[i].config[key];
                }
            }

            this.executeLayout(graph, function () {
                layout.execute(graph.getDefaultParent(), cells.length == 0 ? null : cells);
            }, i == layoutList.length - 1, done);
        }
    },
    csvToArray(text) {
        var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        // Return NULL if input string is not well formed CSV string.
        if (!re_valid.test(text)) return null;
        var a = [];                     // Initialize array to receive values.
        text.replace(re_value, // "Walk" the string using replace with callback.
            function (m0, m1, m2, m3) {
                // Remove backslash from \' in single quoted values.
                if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
                // Remove backslash from \" in double quoted values.
                else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
                else if (m3 !== undefined) a.push(m3);
                return ''; // Return empty string.
            });
        // Handle special case of empty last value.
        if (/,\s*$/.test(text)) a.push('');
        return a;
    },
    importCsv(graph, text) {
        try {
            var lines = text.split('\n');
            var allCells = [];
            var cells = [];
            var dups = {};

            if (lines.length > 0) {
                // Internal lookup table
                var lookups = {};

                // Default values
                var style = null;
                var styles = null;
                var stylename = null;
                var labelname = null;
                var labels = null;
                var parentstyle = null;
                var identity = null;
                var parent = null;
                var namespace = '';
                var width = 'auto';
                var height = 'auto';
                var left = null;
                var top = null;
                var edgespacing = 40;
                var nodespacing = 40;
                var levelspacing = 100;
                var padding = 0;
                var view = graph.view;
                var bds = graph.getGraphBounds();

                // Delayed after optional layout
                var afterInsert = function () {
                    // graph.setSelectionCells(select);
                    // graph.scrollCellToVisible(graph.getSelectionCell());
                };

                // Computes unscaled, untranslated graph bounds
                var pt = graph.getFreeInsertPoint();
                var x0 = pt.x;
                var y0 = pt.y;
                var y = y0;

                // Default label value depends on column names
                var label = null;

                // Default layout to run.
                var layout = 'auto';

                // Name of the attribute that contains the parent reference
                var parent = null;

                // Name of the attribute that contains the references for creating edges
                var edges = [];

                // Name of the column for hyperlinks
                var link = null;

                // String array of names to remove from metadata
                var ignore = null;

                // Read processing instructions first
                var index = 0;

                while (index < lines.length && lines[index].charAt(0) == '#') {
                    var text = lines[index];
                    index++;

                    while (index < lines.length && text.charAt(text.length - 1) == '\\' &&
                        lines[index].charAt(0) == '#') {
                        text = text.substring(0, text.length - 1) + mxUtils.trim(lines[index].substring(1));
                        index++;
                    }

                    if (text.charAt(1) != '#') {
                        // Processing instruction
                        var idx = text.indexOf(':');

                        if (idx > 0) {
                            var key = mxUtils.trim(text.substring(1, idx));
                            var value = mxUtils.trim(text.substring(idx + 1));

                            if (key == 'label') {
                                label = graph.sanitizeHtml(value);
                            }
                            else if (key == 'labelname' && value.length > 0 && value != '-') {
                                labelname = value;
                            }
                            else if (key == 'labels' && value.length > 0 && value != '-') {
                                labels = JSON.parse(value);
                            }
                            else if (key == 'style') {
                                style = value;
                            }
                            else if (key == 'parentstyle') {
                                parentstyle = value;
                            }
                            else if (key == 'stylename' && value.length > 0 && value != '-') {
                                stylename = value;
                            }
                            else if (key == 'styles' && value.length > 0 && value != '-') {
                                styles = JSON.parse(value);
                            }
                            else if (key == 'identity' && value.length > 0 && value != '-') {
                                identity = value;
                            }
                            else if (key == 'parent' && value.length > 0 && value != '-') {
                                parent = value;
                            }
                            else if (key == 'namespace' && value.length > 0 && value != '-') {
                                namespace = value;
                            }
                            else if (key == 'width') {
                                width = value;
                            }
                            else if (key == 'height') {
                                height = value;
                            }
                            else if (key == 'left' && value.length > 0) {
                                left = value;
                            }
                            else if (key == 'top' && value.length > 0) {
                                top = value;
                            }
                            else if (key == 'ignore') {
                                ignore = value.split(',');
                            }
                            else if (key == 'connect') {
                                edges.push(JSON.parse(value));
                            }
                            else if (key == 'link') {
                                link = value;
                            }
                            else if (key == 'padding') {
                                padding = parseFloat(value);
                            }
                            else if (key == 'edgespacing') {
                                edgespacing = parseFloat(value);
                            }
                            else if (key == 'nodespacing') {
                                nodespacing = parseFloat(value);
                            }
                            else if (key == 'levelspacing') {
                                levelspacing = parseFloat(value);
                            }
                            else if (key == 'layout') {
                                layout = value;
                            }
                        }
                    }
                }

                if (lines[index] == null) {
                    throw new Error(mxResources.get('invalidOrMissingFile'));
                }

                // Converts identity and parent to index and validates XML attribute names
                var keys = this.csvToArray(lines[index]);
                var identityIndex = null;
                var parentIndex = null;
                var attribs = [];

                for (var i = 0; i < keys.length; i++) {
                    if (identity == keys[i]) {
                        identityIndex = i;
                    }

                    if (parent == keys[i]) {
                        parentIndex = i;
                    }

                    attribs.push(mxUtils.trim(keys[i]).replace(/[^a-z0-9]+/ig, '_').
                        replace(/^\d+/, '').replace(/_+$/, ''));
                }

                if (label == null) {
                    label = '%' + attribs[0] + '%';
                }

                if (edges != null) {
                    for (var e = 0; e < edges.length; e++) {
                        if (lookups[edges[e].to] == null) {
                            lookups[edges[e].to] = {};
                        }
                    }
                }

                // Parse and validate input
                var arrays = [];

                for (var i = index + 1; i < lines.length; i++) {
                    var values = this.csvToArray(lines[i]);

                    if (values == null) {
                        var short = (lines[i].length > 40) ? lines[i].substring(0, 40) + '...' : lines[i];

                        throw new Error(short + ' (' + i + '):\n' + mxResources.get('containsValidationErrors'));
                    }
                    else if (values.length > 0) {
                        arrays.push(values);
                    }
                }

                graph.model.beginUpdate();
                try {
                    for (var i = 0; i < arrays.length; i++) {
                        var values = arrays[i];
                        var cell = null;
                        var id = (identityIndex != null) ? namespace + values[identityIndex] : null;

                        if (id != null) {
                            cell = graph.model.getCell(id);
                        }

                        var exists = cell != null;
                        var newCell = new mxCell(label, new mxGeometry(x0, y,
                            0, 0), style || 'whiteSpace=wrap;html=1;');
                        newCell.vertex = true;
                        newCell.id = id;

                        for (var j = 0; j < values.length; j++) {
                            graph.setAttributeForCell(newCell, attribs[j], values[j]);
                        }

                        if (labelname != null && labels != null) {
                            var tempLabel = labels[newCell.getAttribute(labelname)];

                            if (tempLabel != null) {
                                graph.labelChanged(newCell, tempLabel);
                            }
                        }

                        if (stylename != null && styles != null) {
                            var tempStyle = styles[newCell.getAttribute(stylename)];

                            if (tempStyle != null) {
                                newCell.style = tempStyle;
                            }
                        }

                        graph.setAttributeForCell(newCell, 'placeholders', '1');
                        newCell.style = graph.replacePlaceholders(newCell, newCell.style);

                        if (exists) {
                            graph.model.setGeometry(cell, newCell.geometry);
                            graph.model.setStyle(cell, newCell.style);

                            if (mxUtils.indexOf(cells, cell) < 0) {
                                cells.push(cell);
                            }
                        }

                        cell = newCell;

                        if (!exists) {
                            for (var e = 0; e < edges.length; e++) {
                                lookups[edges[e].to][cell.getAttribute(edges[e].to)] = cell;
                            }
                        }

                        if (link != null && link != 'link') {
                            graph.setLinkForCell(cell, cell.getAttribute(link));

                            // Removes attribute
                            graph.setAttributeForCell(cell, link, null);
                        }

                        // Sets the size
                        graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
                        var size = graph.getPreferredSizeForCell(cell);

                        if (cell.vertex) {
                            if (left != null && cell.getAttribute(left) != null) {
                                cell.geometry.x = x0 + parseFloat(cell.getAttribute(left));
                            }

                            if (top != null && cell.getAttribute(top) != null) {
                                cell.geometry.y = y0 + parseFloat(cell.getAttribute(top));
                            }

                            if (width.charAt(0) == '@' && cell.getAttribute(width.substring(1)) != null) {
                                cell.geometry.width = parseFloat(cell.getAttribute(width.substring(1)));
                            }
                            else {
                                cell.geometry.width = (width == 'auto') ? size.width + padding : parseFloat(width);
                            }

                            if (height.charAt(0) == '@' && cell.getAttribute(height.substring(1)) != null) {
                                cell.geometry.height = parseFloat(cell.getAttribute(height.substring(1)));
                            }
                            else {
                                cell.geometry.height = (height == 'auto') ? size.height + padding : parseFloat(height);
                            }

                            y += cell.geometry.height + nodespacing;
                        }

                        if (!exists) {
                            var parent = (parentIndex != null) ? graph.model.getCell(
                                namespace + values[parentIndex]) : null;
                            allCells.push(cell);

                            if (parent != null) {
                                parent.style = graph.replacePlaceholders(parent, parentstyle);
                                graph.addCell(cell, parent);
                            }
                            else {
                                cells.push(graph.addCell(cell));
                            }
                        }
                        else {
                            if (dups[id] == null) {
                                dups[id] = [];
                            }

                            dups[id].push(cell);
                        }
                    }

                    var roots = cells.slice();
                    var select = cells.slice();

                    for (var e = 0; e < edges.length; e++) {
                        var edge = edges[e];

                        for (var i = 0; i < allCells.length; i++) {
                            var cell = allCells[i];

                            var insertEdge = mxUtils.bind(this, function (realCell, dataCell, edge) {
                                var tmp = dataCell.getAttribute(edge.from);

                                if (tmp != null) {
                                    // Removes attribute
                                    graph.setAttributeForCell(dataCell, edge.from, null);

                                    if (tmp != '') {
                                        var refs = tmp.split(',');

                                        for (var j = 0; j < refs.length; j++) {
                                            var ref = lookups[edge.to][refs[j]];

                                            if (ref != null) {
                                                var label = edge.label;

                                                if (edge.fromlabel != null) {
                                                    label = (dataCell.getAttribute(edge.fromlabel) || '') + (label || '');
                                                }

                                                if (edge.tolabel != null) {
                                                    label = (label || '') + (ref.getAttribute(edge.tolabel) || '');
                                                }

                                                var placeholders = ((edge.placeholders == 'target') ==
                                                    !edge.invert) ? ref : realCell;
                                                var style = (edge.style != null) ?
                                                    graph.replacePlaceholders(placeholders, edge.style) :
                                                    graph.createCurrentEdgeStyle();

                                                select.push(graph.insertEdge(null, null, label || '', (edge.invert) ?
                                                    ref : realCell, (edge.invert) ? realCell : ref, style));
                                                mxUtils.remove((edge.invert) ? realCell : ref, roots);
                                            }
                                        }
                                    }
                                }
                            });

                            insertEdge(cell, cell, edge);

                            // Checks more entries
                            if (dups[cell.id] != null) {
                                for (var j = 0; j < dups[cell.id].length; j++) {
                                    insertEdge(cell, dups[cell.id][j], edge);
                                }
                            }
                        }
                    }
                    // Removes ignored attributes after processing above
                    if (ignore != null) {
                        for (var i = 0; i < allCells.length; i++) {
                            var cell = allCells[i];

                            for (var j = 0; j < ignore.length; j++) {
                                graph.setAttributeForCell(cell, mxUtils.trim(ignore[j]), null);
                            }
                        }
                    }

                    if (cells.length > 0) {
                        var edgeLayout = new mxParallelEdgeLayout(graph);
                        edgeLayout.spacing = edgespacing;

                        var postProcess = function () {
                            if (edgeLayout.spacing > 0) {
                                edgeLayout.execute(graph.getDefaultParent());
                            }

                            // Aligns cells to grid and/or rounds positions
                            for (var i = 0; i < cells.length; i++) {
                                var geo = graph.getCellGeometry(cells[i]);
                                geo.x = Math.round(graph.snap(geo.x));
                                geo.y = Math.round(graph.snap(geo.y));

                                if (width == 'auto') {
                                    geo.width = Math.round(graph.snap(geo.width));
                                }

                                if (height == 'auto') {
                                    geo.height = Math.round(graph.snap(geo.height));
                                }
                            }
                        };
                        if (layout.charAt(0) == '[') {
                            // Required for layouts to work with new cells
                            var temp = afterInsert;
                            graph.view.validate();
                            this.executeLayoutList(graph, JSON.parse(layout), function () {
                                postProcess();
                                temp();
                            });
                            afterInsert = null;
                        }
                        else if (layout == 'circle') {
                            var circleLayout = new mxCircleLayout(graph);
                            circleLayout.resetEdges = false;

                            var circleLayoutIsVertexIgnored = circleLayout.isVertexIgnored;

                            // Ignore other cells
                            circleLayout.isVertexIgnored = function (vertex) {
                                return circleLayoutIsVertexIgnored.apply(this, arguments) ||
                                    mxUtils.indexOf(cells, vertex) < 0;
                            };

                            this.executeLayout(graph, function () {
                                circleLayout.execute(graph.getDefaultParent());
                                postProcess();
                            }, true, afterInsert);

                            afterInsert = null;
                        }
                        else if (layout == 'horizontaltree' || layout == 'verticaltree' ||
                            (layout == 'auto' && select.length == 2 * cells.length - 1 && roots.length == 1)) {
                            // Required for layouts to work with new cells
                            graph.view.validate();

                            var treeLayout = new mxCompactTreeLayout(graph, layout == 'horizontaltree');
                            treeLayout.levelDistance = nodespacing;
                            treeLayout.edgeRouting = false;
                            treeLayout.resetEdges = false;

                            this.executeLayout(graph, function () {
                                treeLayout.execute(graph.getDefaultParent(), (roots.length > 0) ? roots[0] : null);
                            }, true, afterInsert);

                            afterInsert = null;
                        }
                        else if (layout == 'horizontalflow' || layout == 'verticalflow' ||
                            (layout == 'auto' && roots.length == 1)) {
                            // Required for layouts to work with new cells
                            graph.view.validate();

                            var flowLayout = new mxHierarchicalLayout(graph,
                                (layout == 'horizontalflow') ? mxConstants.DIRECTION_WEST : mxConstants.DIRECTION_NORTH);
                            flowLayout.intraCellSpacing = nodespacing;
                            flowLayout.parallelEdgeSpacing = edgespacing;
                            flowLayout.interRankCellSpacing = levelspacing;
                            flowLayout.disableEdgeStyle = false;

                            this.executeLayout(graph, function () {
                                flowLayout.execute(graph.getDefaultParent(), select);

                                // Workaround for flow layout moving cells to origin
                                graph.moveCells(select, x0, y0);
                            }, true, afterInsert);

                            afterInsert = null;
                        }
                        else if (layout == 'organic' || (layout == 'auto' &&
                            select.length > cells.length)) {
                            // Required for layouts to work with new cells
                            graph.view.validate();

                            var organicLayout = new mxFastOrganicLayout(graph);
                            organicLayout.forceConstant = nodespacing * 3;
                            organicLayout.resetEdges = false;

                            var organicLayoutIsVertexIgnored = organicLayout.isVertexIgnored;

                            // Ignore other cells
                            organicLayout.isVertexIgnored = function (vertex) {
                                return organicLayoutIsVertexIgnored.apply(this, arguments) ||
                                    mxUtils.indexOf(cells, vertex) < 0;
                            };

                            var edgeLayout = new mxParallelEdgeLayout(graph);
                            edgeLayout.spacing = edgespacing;

                            this.executeLayout(graph, function () {
                                organicLayout.execute(graph.getDefaultParent());
                                postProcess();
                            }, true, afterInsert);

                            afterInsert = null;
                        }
                    }
                }
                finally {
                    graph.model.endUpdate();
                }
                if (afterInsert != null) {
                    afterInsert();
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    },
    anonymize(graph) {
        const div = document.createElement('div');
        const model = graph.model;
        const ignoredAnonymizedChars = '\n\t`~!@#$%^&*()_+{}|:"<>?-=[]\;\'.\/,\n\t';
        const anonymizeString = (text, zeros) => {
            var result = [];

            for (let i = 0; i < text.length; i++) {
                const c = text.charAt(i);
                if (ignoredAnonymizedChars.indexOf(c) >= 0) {
                    result.push(c);
                }
                else if (!isNaN(parseInt(c))) {
                    result.push((zeros) ? '0' : Math.round(Math.random() * 9));
                }
                else if (c.toLowerCase() != c) {
                    result.push(String.fromCharCode(65 + Math.round(Math.random() * 25)));
                }
                else if (c.toUpperCase() != c) {
                    result.push(String.fromCharCode(97 + Math.round(Math.random() * 25)));
                }
                else if (/\s/.test(c)) {
                    result.push(' ');
                }
                else {
                    result.push('?');
                }
            }
            return result.join('');
        };
        const replaceTextContent = (elt) => {
            if (elt.nodeValue != null) {
                elt.nodeValue = anonymizeString(elt.nodeValue);
            }

            if (elt.nodeType == mxConstants.NODETYPE_ELEMENT) {
                let tmp = elt.firstChild;

                while (tmp != null) {
                    replaceTextContent(tmp);
                    tmp = tmp.nextSibling;
                }
            }
        };
        const anonymizeHtml = (html) => {
            div.innerHTML = html;

            replaceTextContent(div);

            return div.innerHTML;
        };

        model.beginUpdate();
        try {
            // Queue used to fix ancestor placeholders
            const queue = [];

            for (var id in model.cells) {
                var cell = model.cells[id];
                var label = graph.getLabel(cell);

                if (graph.isHtmlLabel(cell)) {
                    label = anonymizeHtml(label);
                }
                else {
                    label = anonymizeString(label);
                }

                queue.push({ cell: cell, label: label });
            }

            for (var i = 0; i < queue.length; i++) {
                model.setValue(queue[i].cell, queue[i].label);
            }

        }
        finally {
            model.endUpdate();
        }

    },
    addExtFont(fontName, fontUrl, dontRemember) {
        // KNOWN: Font not added when pasting cells with custom fonts
        if (fontName && fontUrl) {
            var fontId = 'extFont_' + fontName;

            if (document.getElementById(fontId) == null) {
                if (fontUrl.indexOf(Editor.GOOGLE_FONTS) == 0) {
                    mxClient.link('stylesheet', fontUrl, null, fontId);
                }
                else {
                    var head = document.getElementsByTagName('head')[0];

                    // KNOWN: Should load fonts synchronously
                    var style = document.createElement('style');

                    style.appendChild(document.createTextNode('@font-face {\n' +
                        '\tfont-family: "' + fontName + '";\n' +
                        '\tsrc: url("' + fontUrl + '");\n' +
                        '}'));

                    style.setAttribute('id', fontId);
                    var head = document.getElementsByTagName('head')[0];
                    head.appendChild(style);
                }
            }

            if (!dontRemember) {
                if (this.extFonts == null) {
                    this.extFonts = [];
                }

                var extFonts = this.extFonts, notFound = true;

                for (var i = 0; i < extFonts.length; i++) {
                    if (extFonts[i].name == fontName) {
                        notFound = false;
                        break;
                    }
                }

                if (notFound) {
                    this.extFonts.push({ name: fontName, url: fontUrl });
                }
            }
        }
    },
}