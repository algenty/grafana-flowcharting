/* eslint-disable new-cap */
/* global $App, Ext, mxPrintPreview, mxCellOverlay, mxImage, mxPoint, mxGeometry mxConstants, mxEvent, mxDivResizer, mxGraph, mxRubberband, mxOutline, mxUndoManager, mxClient, mxCompactTreeLayout, mxKeyHandler, mxEdgeStyle, mxUtils, mxCodec, mxRectangle */
const mxLoader = require('../../ux/form/mxGraph.js')
const UB = require('@unitybase/ub-pub')
/**
 * Organization Chart Diagram
 */
Ext.define('UB.ux.UBOrgChart', {
  extend: 'Ext.Panel',
  alias: 'widget.UBOrgChart',
  width: '100%',
  height: '100%',
  layout: 'fit',

  loadData: function() {
    let me = this
    return this.xmInitPromise.then(() => {
      let diagramId
      let basepanel = me.up('basepanel')
      if (basepanel && basepanel.record) {
        diagramId = basepanel.record.get('ID')
      }
      if (diagramId) {
        return UB.Repository('org_diagram').attrs(['ID', 'orgunitID']).selectById(diagramId)
          .then((diagramData) => {
            if (diagramData) me.rootElementID = diagramData.orgunitID
            return me.rootElementID ?
              UB.Repository('org_unit').attrs(['ID', 'mi_treePath']).selectById(me.rootElementID)
              .then((orgUnitData) => {
                if (orgUnitData) me.rootTreePath = orgUnitData.mi_treePath
                return true
              }) :
              true
          })
      }
    }).then(me.doLoadData.bind(me))
  },

  doLoadData: function() {
    let me = this
    let query = UB.Repository('org_unit')
      .attrs(['ID', 'parentID', 'code', 'caption', 'unitType', 'mi_treePath'])
      .orderBy('mi_treePath')

    if (me.rootTreePath) { // rootElementID
      query = query.where('[mi_treePath]', 'startWith', me.rootTreePath)
    }

    return query.selectAsObject().then(me.makeTree.bind(me))
  },

  treeData: [],

  makeTree: function(store) {
    let me = this
    let data = {}

    me.treeData = []

    store.forEach(function(row) {
      let id = row.ID
      let parentID = row.parentID
      let idEl = data[id]
      if (!idEl) {
        idEl = data[id] = {
          child: []
        }
      }
      Object.assign(idEl, row)
      if (me.rootElementID && me.rootElementID === id) {
        parentID = null
        idEl.parentID = null
      }

      if (parentID) {
        let parentEl = data[parentID]
        if (!parentEl) {
          parentEl = data[parentID] = {
            child: []
          }
        }
        parentEl.child.push(idEl)
      } else {
        me.treeData.push(idEl)
      }
    })
    me.allData = data
  },

  showElement: function(parentCell, element, pt) {
    return this.addChild(this.graph, parentCell, element, true, pt)
  },

  showChild: function(parentCell, element, expandChild, deep, level) {
    let me = this
    let model
    if (!expandChild) {
      model = me.graph.getModel()
      model.beginUpdate()
    }
    try {
      if (element.child) {
        element.child.forEach(function(item) {
          let cell = me.showElement(parentCell, item)
          if (expandChild && (!deep || (deep > level))) {
            me.showChild(cell, item, deep, level + 1)
          }
        })
      }
    } finally {
      if (!expandChild) {
        model.endUpdate()
      }
    }
  },

  defaultLayout: 'V', // vertical

  showTree: function() {
    let me = this
    let deep = 1
    let level = 1
    let expandChild = true

    if (me.treeData.length === 1) {
      me.addChild(me.graph, null, me.treeData[0])
    } else {
      me.initRoot(me.treeData)
    }

    let model = me.graph.getModel()
    model.beginUpdate()
    try {
      if (me.treeData.length === 1) {
        me.showChild(me.rootVarex, expandChild, true, deep + 1, level)
      } else {
        me.treeData.forEach(function(item) {
          let cell = me.showElement(me.rootVarex, item)
          if (expandChild && (!deep || (deep > level))) {
            me.showChild(cell, expandChild, true, deep, level)
          }
        })
      }
    } finally {
      model.endUpdate()
    }
    me.autoLayout(me.rootVarex, me.defaultLayout)
    me.changeFired = false
    me.undoManager.clear()
  },

  initComponent: function() {
    let me = this
    me.layout = 'fit'

    this.expandImage = $App.getImagePath('expandLG.png')
    this.collapseImage = $App.getImagePath('collapseLG.png')
    this.appendImage = $App.getImagePath('download.png')

    me.initMetaInfo()
    me.tbar = me.createToolBar()

    me.idPrefix = Ext.id()
    let id = me.idPrefix + 'graph'
    me.containerId = id
    let html = '<div id="' + id + '" class="graph-editor-holder" style="width: 100%; height: 100%; background-color: white; overflow: scroll; -moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;" tabindex="0"></div>'

    me.outlineId = id = me.idPrefix + 'outline'
    let outlineHtml = '<div id="' + id + '" style="width: 100%; height: 100%; overflow: scroll;" ></div>'

    me.outlineWnd = Ext.create('Ext.Window', {
      title: UB.i18n('Overview'),
      width: 200,
      height: 200,
      closable: false,
      layout: 'fit',
      constrain: true,
      items: [{
        html: outlineHtml
      }]
    })

    me.xmInitPromise = new Promise((resolve, reject) => {
      me.mainPnl = Ext.create('Ext.panel.Panel', {
        flex: 1,
        html: html,
        items: [
          me.outlineWnd,
          {
            xtype: 'text',
            text: 'text',
            degrees: 90
          }
        ],
        listeners: {
          boxready: function() {
            mxLoader.initAndCall().then(
              () => {
                me.initGraph();
                resolve(me)
              }
            ).catch(
              (reason) => reject(reason)
            )
          },
          resize: function() {
            if (me.graph) {
              me.graph.sizeDidChange()
            }
          },
          scope: me
        }
      })
    })

    if (!me.items) {
      me.items = []
    }

    me.items.push(me.mainPnl)
    me.callParent(arguments)

    me.isLoadContent = false
  },

  beforeDestroy: function() {
    if (this.outlineWnd) {
      this.outlineWnd.destroy()
    }
    if (this.toolbarWnd) {
      this.toolbarWnd.destroy()
    }
    if (this.rubberband) {
      this.rubberband.destroy()
    }

    if (this.keyHandler) {
      this.keyHandler.destroy()
    }
    if (this.toolbar) {
      this.toolbar.destroy()
    }
    if (this.outline) {
      this.outline.destroy()
    }
    if (this.graph) {
      this.graph.destroy()
    }

    this.callParent(arguments)
  },

  initGraph: function() {
    let me = this
    me.graphDivEl = Ext.get(me.containerId)
    let mainWin = me.up('basewindow') || $App.getViewport()

    let baseZIndex = mainWin.getEl().dom.style.zIndex || 1

    let container = me.graphDivEl.dom
    container.style.position = 'absolute'
    container.style.overflow = 'hidden'
    container.style.left = '0px'
    container.style.top = '0px'
    container.style.right = '0px'
    container.style.bottom = '0px'

    const pnlBox = me.mainPnl.getBox()

    // me.toolbarWnd.showAt(0, 0);
    me.outlineWnd.showAt(pnlBox.width - me.outlineWnd.width, 0)
    // me.toolbarWnd.setXY([pnlBox.left, pnlBox.top]);
    me.outlineWnd.setXY([pnlBox.right - me.outlineWnd.width, pnlBox.top])

    let outline = document.getElementById(me.outlineId)
    // outline.style.overflow = 'scroll';

    mxEvent.disableContextMenu(container)

    new mxDivResizer(container)
    new mxDivResizer(outline)

    // Creates the graph inside the given container
    let graph = new mxGraph(container)
    me.graph = graph

    // Enables automatic sizing for vertices after editing and
    // panning by using the left mouse button.
    graph.setCellsMovable(true) // false
    graph.setAutoSizeCells(true)
    graph.setPanning(true)
    graph.setTooltips(true)
    graph.centerZoom = false

    // graph.allowAutoPanning = true;
    // graph.ignoreScrollbars = true;
    graph.panningHandler.useLeftButtonForPanning = true

    // Displays a popupmenu when the user clicks
    // on a cell (using the left mouse button) but
    // do not select the cell when the popup menu
    // is displayed
    graph.panningHandler.selectOnPopup = false
    graph.panningHandler.panningEnabled = true

    graph.cellsDisconnectable = false
    graph.cellsCloneable = false
    graph.allowDanglingEdges = false
    graph.disconnectOnMove = false
    graph.gridEnabled = false

    me.isGraphChanged = false
    graph.getModel().addListener(mxEvent.CHANGE, function() {
      me.graphChanged()
    })
    me.installDblClickHandler(graph)

    me.rubberband = new mxRubberband(graph)

    // Creates the outline (navigator, overview) for moving
    // around the graph in the top, right corner of the window.
    me.outline = new mxOutline(graph, outline)
    // me.outline.updateOnPan = true;

    // Disables tooltips on touch devices
    graph.setTooltips(!mxClient.IS_TOUCH)
    graph.tooltipHandler.zIndex = baseZIndex + 100

    me.undoManager = new mxUndoManager()
    me.installUndoHandler(graph)

    graph.setHtmlLabels(true)

    // Set some stylesheet options for the visual appearance of vertices
    let style = graph.getStylesheet().getDefaultVertexStyle()
    style[mxConstants.STYLE_SHAPE] = 'label'
    style[mxConstants.STYLE_WHITE_SPACE] = 'wrap'

    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE
    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT
    style[mxConstants.STYLE_SPACING_LEFT] = 4 // 54
    // style[mxConstants.STYLE_SPACING_LEFT] = 24; // 54

    style[mxConstants.STYLE_GRADIENTCOLOR] = '#7d85df'
    style[mxConstants.STYLE_STROKECOLOR] = '#5d65df'
    style[mxConstants.STYLE_FILLCOLOR] = '#adc5ff'

    style[mxConstants.STYLE_FONTCOLOR] = '#1d258f'
    style[mxConstants.STYLE_FONTFAMILY] = 'Verdana'
    style[mxConstants.STYLE_FONTSIZE] = '10' // 12
    style[mxConstants.STYLE_FONTSTYLE] = '1'

    style[mxConstants.STYLE_SHADOW] = '1'
    style[mxConstants.STYLE_ROUNDED] = '1'
    style[mxConstants.STYLE_GLASS] = '1'

    // style[mxConstants.STYLE_IMAGE] = 'images/person.png';
    // style[mxConstants.STYLE_IMAGE_WIDTH] = '16'; // 48
    // style[mxConstants.STYLE_IMAGE_HEIGHT] = '16';
    style[mxConstants.STYLE_SPACING] = 12 // 8

    style = Ext.clone(style)
    // 'images/person.png';
    style[mxConstants.STYLE_GRADIENTCOLOR] = '#7DDF94'
    style[mxConstants.STYLE_STROKECOLOR] = '#5DDF71'
    style[mxConstants.STYLE_FILLCOLOR] = '#ADFFBD'
    graph.getStylesheet().putCellStyle('org_staffunit', style)

    style = Ext.clone(style)
    // style[mxConstants.STYLE_IMAGE] = 'images/user-group.png';
    style[mxConstants.STYLE_GRADIENTCOLOR] = '#D5DF7D'
    style[mxConstants.STYLE_STROKECOLOR] = '#D2DF5D'
    style[mxConstants.STYLE_FILLCOLOR] = '#F7FFAD'
    graph.getStylesheet().putCellStyle('org_department', style)

    style = Ext.clone(style)
    // style[mxConstants.STYLE_IMAGE] = 'images/office.png';
    style[mxConstants.STYLE_GRADIENTCOLOR] = '#7d85df'
    style[mxConstants.STYLE_STROKECOLOR] = '#5d65df'
    style[mxConstants.STYLE_FILLCOLOR] = '#adc5ff'
    graph.getStylesheet().putCellStyle('org_organization', style)

    // Sets the default style for edges
    style = graph.getStylesheet().getDefaultEdgeStyle()
    style[mxConstants.STYLE_ROUNDED] = true
    style[mxConstants.STYLE_STROKEWIDTH] = 3

    // Disable the following for straight lines
    // style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.OrthConnector // SideToSide ElbowConnector EntityRelation SegmentConnector

    // Stops editing on enter or escape keypress
    me.keyHandler = new mxKeyHandler(graph)

    // Enables automatic layout on the graph and installs
    // a tree layout for all groups who's children are
    // being changed, added or removed.
    let layout = new mxCompactTreeLayout(graph, false)
    layout.useBoundingBox = false
    layout.edgeRouting = false
    layout.levelDistance = 60
    layout.nodeDistance = 16

    // Allows the layout to move cells even though cells
    // aren't movable in the graph
    layout.isVertexMovable = function(cell) {
      return true
    }

    me.verticalLayout = layout

    layout = new mxCompactTreeLayout(graph, true)
    layout.useBoundingBox = false
    layout.edgeRouting = false
    layout.levelDistance = 60
    layout.nodeDistance = 16

    // Allows the layout to move cells even though cells
    // aren't movable in the graph
    layout.isVertexMovable = function(cell) {
      return true
    }

    me.horisontalLayout = layout

    // Installs a popup menu handler using local function (see below).
    graph.popupMenuHandler.factoryMethod = function(menu, cell, evt) {
      let frmDom = mainWin.getEl().dom
      let baseZ = frmDom.style.zIndex || 9999999999999
      menu.div.parent = frmDom
      menu.zIndex = baseZ + 1
      menu.div.style.zIndex = baseZ + 1
      return me.createPopupMenu(graph, menu, cell, evt)
    }

    // Fix for wrong preferred size
    var oldGetPreferredSizeForCell = graph.getPreferredSizeForCell
    graph.getPreferredSizeForCell = function(cell) {
      var result = oldGetPreferredSizeForCell.apply(this, arguments)

      if (result !== null) {
        result.width = Math.max(120, result.width - 40)
      }

      return result
    }

    // Sets the maximum text scale to 1
    graph.cellRenderer.getTextScale = function(state) {
      return Math.min(1, state.view.scale)
    }

    graph.convertValueToString = function(cell) {
      if (Ext.isString(cell.value)) {
        return cell.value
      } else {
        return cell.getAttribute('label')
      }
    }

    graph.getPreferredSizeForCell = Ext.bind(me.getPreferredSizeForCell, graph)

    if (me.graph && me.dataUrl && !me.isActulData) {
      me.startLoadData().done(function(result) {
        if (me.loadDataDefer) {
          me.loadDataDefer.resolve(result)
        }
      }, function(reason) {
        me.loadDataDefer.reject(reason)
      })
    }
  },

  installUndoHandler: function(graph) {
    var listener = mxUtils.bind(this, function(sender, evt) {
      var edit = evt.getProperty('edit')
      this.undoManager.undoableEditHappened(edit)
    })

    graph.getModel().addListener(mxEvent.UNDO, listener)
    graph.getView().addListener(mxEvent.UNDO, listener)

    // Keeps the selection state in sync
    const undoHandler = function(sender, evt) {
      var changes = evt.getProperty('edit').changes
      graph.setSelectionCells(graph.getSelectionCellsForChanges(changes))
    }

    this.undoManager.addListener(mxEvent.UNDO, undoHandler)
    this.undoManager.addListener(mxEvent.REDO, undoHandler)
  },

  initRoot: function() {
    let me = this
    let graph = me.graph

    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    let parent = graph.getDefaultParent()

    if (!graph || !graph.container) {
      return
    }

    // Adds the root vertex of the tree
    graph.getModel().beginUpdate()
    try {
      let doc = mxUtils.createXmlDocument()
      let node = doc.createElement('ubOrgChart')
      node.setAttribute('label', UB.i18n('Organization'))
      node.setAttribute('unitType', 'ORG')
      node.setAttribute('isRoot', true)

      let w = graph.container.offsetWidth
      let v1 = graph.insertVertex(parent, 'treeRoot',
        node, w / 2 - 30, 20, 140, 60) // , 'image=' + 'models/adminui-pub/themes/UBGrayTheme/ubimages/office.png'/* $App.getImagePath('office.png') */)

      graph.updateCellSize(v1)

      me.addExpandOverlay(graph, v1, true)
      me.addIconOverlay(v1)

      v1.isRoot = true
      me.rootVarex = v1
    } finally {
      // Updates the display
      graph.getModel().endUpdate()
    }
  },

  installDblClickHandler: function(graph) {
    graph.addListener(mxEvent.DOUBLE_CLICK,
      mxUtils.bind(this, function(sender, evt) {
        var cell = evt.getProperty('cell')

        if (cell && graph.isEnabled() && this.dblClickAction !== null) {
          this.dblClickAction(cell, evt)
          graph.tooltipHandler.hide()
          evt.consume()
        }
      })
    )
  },

  dblClickAction: function(cell) {
    let me = this
    let unitType = cell.getAttribute('unitType')
    let ID = cell.getAttribute('ID')
    let entity = me.getEntityByUnitType(unitType)
    if (entity && ID) {
      me.openForm(entity, ID, null, function(sender) {
        me.refreshDiagram()
      })
    }
  },

  getEntityByUnitType: function(unitType) {
    let mObj = this.orgUnity[unitType]
    return mObj ? mObj.code : ''
  },

  openForm: function(entityCode, instanceID, initialFieldValues, onClose) {
    this.openFormC({
      entityCode: entityCode,
      instanceID: instanceID,
      initialFieldValues: initialFieldValues,
      onClose: onClose
    })
  },

  openFormC: function(config) {
    let me = this
    let formCode, description
    config.isModal = !Ext.isEmpty(config.isModal) ? config.isModal : true

    let form = UB.core.UBFormLoader.getFormByEntity(config.entityCode)
    if (form) {
      formCode = form.get('code')
      description = UB.i18n(form.get('description'))
    }
    let cfg = {
      cmdType: UB.core.UBCommand.commandType.showForm,
      formCode: formCode,
      description: description,
      entity: config.entityCode,
      instanceID: config.instanceID,
      initialFieldValues: config.initialFieldValues,
      customParams: config.customParams,
      isModal: config.isModal,
      callback: function(results) {
        if (config.onClose && results) {
          var bv = results.up('window')
          if (bv) {
            bv.on({
              beforeclose: config.onClose,
              scope: me
            })
          }
        }
      }
    }

    UB.core.UBApp.doCommand(cfg)
  },

  createToolBar: function() {
    var me = this
    Ext.define('SelectPrinterFmt', {
      extend: 'Ext.data.Model',
      fields: [{
          name: 'ID',
          type: 'object'
        },
        {
          name: 'Caption',
          type: 'string'
        }
      ]
    })

    return {
      xtype: 'toolbar',
      items: [{
        xtype: 'button',
        text: UB.i18n('Undo'),
        iconCls: 'icon-undo',
        handler: function() {
          me.undoManager.undo()
        },
        scope: me
      }, {
        xtype: 'button',
        text: UB.i18n('Redo'),
        iconCls: 'icon-redo',
        handler: function() {
          me.undoManager.redo()
        },
        scope: me
      }, {
        xtype: 'button',
        text: UB.i18n('Zoom'),
        iconCls: 'icon-zoom-in',
        handler: function() {
          me.graph.zoomIn()
        },
        scope: me
      }, {
        xtype: 'button',
        text: UB.i18n('Zoom Out'),
        iconCls: 'icon-zoom-out',
        handler: function() {
          me.graph.zoomOut()
        },
        scope: me
      }, {
        xtype: 'button',
        text: UB.i18n('Actual Size'),
        iconCls: 'icon-view11',
        handler: function() {
          me.graph.zoomActual()
        },
        scope: me
      }, {
        xtype: 'combobox',
        store: Ext.create('Ext.data.Store', {
          model: 'SelectPrinterFmt',
          data: [{
              ID: 'A4P',
              Caption: UB.i18n('A4 portrait')
            },
            {
              ID: 'A4L',
              Caption: UB.i18n('A4 landscape')
            },
            {
              ID: 'A5P',
              Caption: UB.i18n('A5 portrait')
            },
            {
              ID: 'A5L',
              Caption: UB.i18n('A5 landscape')
            }
          ]
        }),
        forceSelection: true,
        editable: false,
        allowBlank: false,
        displayField: 'Caption',
        valueField: 'Caption',
        value: UB.i18n('A4 portrait'),
        width: 150,
        labelWidth: 0,
        queryMode: 'local',
        listeners: {
          select: function(combo, records) {
            if (records.length > 0) {
              switch (records[0].get('ID')) {
                case 'A4P':
                  me.printerFormat = mxConstants.PAGE_FORMAT_A4_PORTRAIT
                  break
                case 'A4L':
                  me.printerFormat = mxConstants.PAGE_FORMAT_A4_LANDSCAPE
                  break
                case 'A5P':
                  me.printerFormat = new mxRectangle(0, 0, 1652, 1169)
                  break
                case 'A5L':
                  me.printerFormat = new mxRectangle(0, 0, 1169, 1652)
                  break
              }
            }
          },
          scope: me
        }
      }, {
        xtype: 'button',
        text: UB.i18n('Print'),
        iconCls: 'icon-printer',
        handler: function() {
          // 1652, 1169
          var preview = new mxPrintPreview(me.graph, 1, me.printerFormat || null)
          preview.open()
        },
        scope: me
      }, {
        xtype: 'button',
        text: UB.i18n('Poster Print'),
        iconCls: 'icon-print',
        handler: function() {
          Ext.Msg.prompt({
            msg: UB.i18n('Enter maximum page count'),
            prompt: true,
            title: '',
            minWidth: Ext.Msg.minPromptWidth,
            buttons: Ext.Msg.OKCANCEL,
            callback: function(btn, value) {
              if (btn !== 'ok') {
                return
              }
              var pageCount = value
              if (pageCount !== null) {
                var scale = mxUtils.getScaleForPageCount(pageCount, me.graph)
                var preview = new mxPrintPreview(me.graph, scale, me.printerFormat || null)
                preview.open()
              }
            },
            scope: me,
            multiline: false,
            value: '1'
          })
        },
        scope: me
      }, {
        xtype: 'button',
        text: UB.i18n('Select'),
        icon: 'models/adminui-pub/resources/images/select.gif',
        handler: function() {
          me.graph.panningHandler.useLeftButtonForPanning = false
          me.graph.setConnectable(false)
        },
        scope: me
      }, {
        xtype: 'button',
        text: UB.i18n('Pan'),
        icon: 'models/adminui-pub/resources/images/pan.gif',
        handler: function() {
          me.graph.panningHandler.useLeftButtonForPanning = true
          me.graph.setConnectable(false)
        },
        scope: me
      }, {
        xtype: 'button',
        text: UB.i18n('Select all'),
        handler: function() {
          me.graph.selectAll()
        },
        scope: me
      }]
    }
  },

  // Function to create the entries in the popup menu
  createPopupMenu: function(graph, menu, cell) {
    let me = this
    let model = graph.getModel()

    if (!me.isLoadContent) {
      menu.addItem(UB.i18n('New organizational chart'), '', function() {
        me.loadData().then(() => {
          me.showTree()
          me.isLoadContent = true
        })
      })
    }

    if (cell !== null) {
      if (model.isVertex(cell)) {
        // {code: metaObjName, unitType: unitType, caption: metaObj.caption }
        Ext.Object.each(me.orgUnity, function(unitType, mObj) {
          menu.addItem(UB.i18n('Create child') + ' ' + mObj.caption, '', function() {
            me.createChildElement(cell, unitType)
          })
        }, me)

        menu.addSeparator()

        menu.addItem(UB.i18n('Open subordinate chart from this node'), '', function() {
          me.openDiagram(cell)
        })

        menu.addSeparator()

        menu.addItem(UB.i18n('Remove all child'), '', function() {
          me.deleteSubtree(graph, cell)
          me.graph.removeCellOverlays(cell)
          me.addIconOverlay(cell)
          me.addAddOverlay(me.graph, cell)
        })

        menu.addItem(UB.i18n('Select all child'), '', function() {
          me.selectAllChild(cell)
        })

        menu.addSeparator()

        menu.addItem(UB.i18n('Align child to right'), '', function() {
          me.autoLayout(cell, 'H')
          me.selectAllChild(cell)
        })

        menu.addItem(UB.i18n('Align child down me'), '', function() {
          me.autoLayout(cell, 'V')
          me.selectAllChild(cell)
        })
      } else {
        var cstyle = cell.getStyle() || 'edgeStyle=orthogonalEdgeStyle;'
        if (cstyle.indexOf('topToBottomEdgeStyle') < 0) {
          menu.addItem(UB.i18n('Format edge top to bottom'), '', function() {
            graph.setCellStyle('edgeStyle=topToBottomEdgeStyle;', [cell])
          })
        }
        if (cstyle.indexOf('sideToSideEdgeStyle') < 0) {
          menu.addItem(UB.i18n('Format edge left to right'), '', function() {
            graph.setCellStyle('edgeStyle=sideToSideEdgeStyle;', [cell])
          })
        }
        if (cstyle.indexOf('orthogonalEdgeStyle') < 0) {
          menu.addItem(UB.i18n('Format edge orthogonal'), '', function() {
            graph.setCellStyle('edgeStyle=orthogonalEdgeStyle;', [cell])
          })
        }
      }
      menu.addSeparator()
    }

    menu.addItem(UB.i18n('Fit'), $App.getImagePath('zoom_in.png'), function() {
      graph.fit()
    })

    menu.addItem(UB.i18n('Actual Size'), $App.getImagePath('view_1_1.png'), function() {
      graph.zoomActual()
    })

    menu.addSeparator()

    menu.addItem(UB.i18n('Print'), $App.getImagePath('print.png'), function() {
      var preview = new mxPrintPreview(graph, 1)
      preview.open()
    })

    menu.addItem(UB.i18n('Poster Print'), $App.getImagePath('print.png'), function() {
      var pageCount = mxUtils.prompt(UB.i18n('Enter maximum page count'), '1')

      if (pageCount !== null) {
        var scale = mxUtils.getScaleForPageCount(pageCount, graph)
        var preview = new mxPrintPreview(graph, scale)
        preview.open()
      }
    })
  },

  setDetaileEdgeStyle: function(cell, style) {
    let me = this
    let edges = []
    let model = me.graph.model

    me.graph.traverse(cell, true, function(vertex) {
      let edgeCount = model.getEdgeCount(vertex)
      if (edgeCount > 0) {
        for (var i = 0; i < edgeCount; i++) {
          var e = model.getEdgeAt(vertex, i)
          var isSource = model.getTerminal(e, true) === vertex
          if (isSource) {
            edges.push(e)
          }
        }
      }
      return true
    })

    me.graph.setCellStyle('edgeStyle=' + style + ';', edges)
  },

  autoLayout: function(cell, type) {
    var me = this
    switch (type) {
      case 'H':
        me.setDetaileEdgeStyle(cell, 'sideToSideEdgeStyle')
        me.horisontalLayout.execute(me.graph.getDefaultParent(), cell)
        break
      case 'V':
        me.setDetaileEdgeStyle(cell, 'topToBottomEdgeStyle')
        me.verticalLayout.execute(me.graph.getDefaultParent(), cell)
        break
    }
  },

  addExpandOverlay: function(graph, cell, expanded) {
    let me = this
    let overlay = new mxCellOverlay(new mxImage(expanded ? me.collapseImage : me.expandImage, 24, 24), expanded ? UB.i18n('Collapse') : UB.i18n('Expand'))
    overlay.cursor = 'hand'
    overlay.align = mxConstants.ALIGN_CENTER

    overlay.addListener(mxEvent.CLICK, mxUtils.bind(this, function(sender, evt) {
      me.expandORCollapse(cell, overlay)
    }))
    overlay.isExpandOvelay = true
    overlay.expanded = !expanded
    graph.addCellOverlay(cell, overlay)
  },

  addAddOverlay: function(graph, cell) {
    let me = this
    let addOverlay = new mxCellOverlay(new mxImage(me.appendImage, 24, 24), UB.i18n('Append element'))
    addOverlay.cursor = 'hand'
    addOverlay.offset = new mxPoint(-4, 8)
    addOverlay.align = mxConstants.ALIGN_RIGHT
    addOverlay.verticalAlign = mxConstants.ALIGN_TOP
    addOverlay.addListener(mxEvent.CLICK, mxUtils.bind(this, function(sender, evt) {
      me.addChildElement(cell, addOverlay)
    }))
    addOverlay.isAddOverlay = true
    graph.addCellOverlay(cell, addOverlay)
  },

  addIconOverlay: function(cell) {
    let me = this
    let unitType = cell.getAttribute('unitType')
    let name = cell.getAttribute('label')

    let orgUnity = me.orgUnity[unitType]
    let image = orgUnity ? orgUnity.image : $App.getImagePath('office.png')
    let addOverlay = new mxCellOverlay(new mxImage(image, 24, 24), name)
    // addOverlay.cursor = 'hand';
    addOverlay.offset = new mxPoint(4, 8)
    addOverlay.align = mxConstants.ALIGN_LEFT
    addOverlay.verticalAlign = mxConstants.ALIGN_TOP
    addOverlay.isIconOverlay = true
    me.graph.addCellOverlay(cell, addOverlay)
  },

  updateCell: function(cell) {
    this.graph.refresh(cell)
  },

  getAddOvelay: function(cell) {
    var me = this,
      result = null
    if (!cell.overlays || !cell.overlays.length) {
      return null
    }
    Ext.Array.each(cell.overlays, function(elm) {
      if (elm.isAddOverlay) {
        result = elm
        return false
      }
    }, me)
    return result
  },

  getExpandOvelay: function(cell) {
    if (!cell.overlays || cell.overlays.length === 0) {
      return null
    }
    let result = cell.overlays.find(elm => elm.isExpandOvelay)
    return result
  },

  /**
   * добавление на диаграмму подчиненных елементов (если они еще не присуктствуют на схеме)
   * для запуска из оверлея
   * @param cell
   * @param overlay
   */
  addChildElement: function(cell, overlay) {
    var me = this,
      ID = cell.getAttribute('ID'),
      element = me.allData[ID],
      model = me.graph.getModel(),
      expandOverlay,
      existsCell, eID, pt,
      existIDs = {},
      existIDCount = 0,
      cellToAdd = []

    existsCell = me.findChildCell(cell)
    Ext.Array.each(existsCell, function(ecell) {
      eID = ecell.getAttribute('ID')
      existIDs[eID * 1] = ecell
      existIDCount++
    })

    if (element && element.child.length > 0) {
      model.beginUpdate()
      try {
        pt = {
          x: cell.geometry.x,
          y: cell.geometry.y + 120
        }
        element.child.forEach(function(childElm) {
          if (!existIDs[childElm.ID]) {
            me.showElement(cell, childElm, pt)
            cellToAdd.push(cell)
            pt.x += 100
          }
          // me.showChild( cell, element, false);
        })
      } finally {
        model.endUpdate()
      }

      if (existIDCount === 0) {
        me.autoLayout(cell, me.defaultLayout)
      }
      me.graph.removeCellOverlay(cell, overlay)
      expandOverlay = me.getExpandOvelay(cell)
      if (!expandOverlay) {
        me.addExpandOverlay(me.graph, cell, true)
      } else {
        if (expandOverlay.expanded) {
          me.expandORCollapse(cell)
        }
      }
      if (existIDCount === 0) {
        me.selectAllChild(cell)
      } else {
        me.graph.setSelectionCells(cellToAdd)
      }
    }
  },

  expandORCollapse: function(cell, overlay) {
    var me = this,
      ID = cell.getAttribute('ID'),
      element = me.allData[ID],
      child

    if (element) {
      child = element.child
    }
    if (cell.isRoot && !ID) {
      child = me.treeData
    }

    if (child.length > 0) {
      me.hideOrShowCells(me.graph, cell, overlay.expanded)
      overlay.expanded = !overlay.expanded
      overlay.image.src = !overlay.expanded ? me.collapseImage : me.expandImage
      overlay.tooltip = !overlay.expanded ? UB.i18n('Collapse') : UB.i18n('Expand')
    }

    me.updateCell(cell)
  },

  hideOrShowCells: function(graph, cell, show) {
    var me = this,
      cells = [],
      overlay
    var hasInvisible = false
    graph.traverse(cell, true, function(vertex) {
      if (cell !== vertex) {
        cells.push(vertex)
        hasInvisible = hasInvisible || !vertex.isVisible()
      }
      return true
    })
    if (show === null) {
      show = hasInvisible
    }

    graph.toggleCells(show, cells, true)
    if (show) {
      Ext.Array.each(cells, function(cell) {
        overlay = me.getExpandOvelay(cell)
        if (overlay && overlay.expanded) {
          overlay.image.src = me.collapseImage
          me.updateCell(cell)
        }
      })
    }
    return show
  },

  changeElementParent: function(cell, newParent, item) {
    var me = this,
      model = me.graph.getModel(),
      edgeCount, e, src
    edgeCount = model.getEdgeCount(cell)
    // remove old link
    if (edgeCount > 0) {
      for (let i = 0; i < edgeCount; i++) {
        e = model.getEdgeAt(cell, i)
        src = model.getTerminal(e, true)
        if (src !== cell) {
          me.graph.cellsRemoved([e])
          break
        }
      }
    }
    me.addElementEdge(cell, newParent, item)
  },

  /**
   * Add new element to diagram
   * @param {mxGraph} graph
   * @param {mxCell} cell Main element
   * @param {Object} item Element data
   * @param {boolean} [inUpdateMode=false]
   * @param {Object} [pt] page position
   * @return {*}
   */
  addChild: function(graph, cell, item, inUpdateMode, pt) {
    var doc, node, x, y
    var me = this,
      model = graph.getModel()
    var parent = graph.getDefaultParent()
    var vertex

    if (!inUpdateMode) {
      model.beginUpdate()
    }
    try {
      doc = mxUtils.createXmlDocument()
      node = doc.createElement('ubOrgChart')
      node.setAttribute('label', item.caption) // item.ID + ': ' +
      node.setAttribute('ID', item.ID)
      node.setAttribute('parentID', item.parentID)
      node.setAttribute('code', item.code)
      node.setAttribute('unitType', item.unitType)
      if (!cell) {
        node.setAttribute('isRoot', true)
      }

      if (pt) {
        x = pt.x
        y = pt.y
      }

      vertex = graph.insertVertex(parent, null, node, x, y)
      vertex.setStyle(me.getEntityByUnitType(item.unitType))
      // vertex.item = item;
      var geometry = model.getGeometry(vertex)

      // Updates the geometry of the vertex with the
      // preferred size computed in the graph
      var size = graph.getPreferredSizeForCell(vertex)
      geometry.width = size.width
      geometry.height = size.height

      if (cell) {
        me.addElementEdge(vertex, cell, item)
      } else {
        vertex.isRoot = true
        me.rootVarex = vertex
      }

      // me.addExpandOverlay(graph, vertex, true);
      if (item.child.length > 0) {
        me.addAddOverlay(graph, vertex)
      }
      me.addIconOverlay(vertex)
    } finally {
      if (!inUpdateMode) {
        model.endUpdate()
      }
    }

    return vertex
  },

  addElementEdge: function(cell, parentCell, item) {
    var graph = this.graph,
      parent = graph.getDefaultParent()
    // Adds the edge between the existing cell
    // and the new vertex and executes the
    // automatic layout on the parent
    var edge = graph.insertEdge(parent, null, '', parentCell, cell)

    edge.setAttribute('fromID', item.ID)
    edge.fromID = item.ID
    edge.setGeometry(new mxGeometry(0, 0, 0, 0))
    edge.geometry.relative = true

    // Configures the edge label "in-place" to reside
    // at the end of the edge (x = 1) and with an offset
    // of 20 pixels in negative, vertical direction.
    edge.geometry.setTerminalPoint(new mxPoint(0, 0), true)
    edge.geometry.setTerminalPoint(new mxPoint(80, 0), true)
    edge.geometry.setTerminalPoint(new mxPoint(160, 0), false)
  },

  selectAllChild: function(cell) {
    var me = this
    var cells = []
    me.graph.traverse(cell, true, function(vertex) {
      if (cell !== vertex) {
        cells.push(vertex)
      }
      return true
    })

    me.graph.setSelectionCells(cells)
  },

  deleteSubtree: function(graph, cell) {
    // Gets the subtree from cell downwards
    var cells = []
    graph.traverse(cell, true, function(vertex) {
      if (cell !== vertex) {
        cells.push(vertex)
      }
      return true
    })
    graph.removeCells(cells)
  },

  getPreferredSizeForCell: function(cell) {
    /* max wide for cell in auto format mode */
    var maxWidth = 100
    var result = null

    if (cell !== null) {
      var state = this.view.getState(cell)
      var style = state ? state.style : this.getCellStyle(cell)

      if (style !== null && !this.model.isEdge(cell)) {
        var fontSize = style[mxConstants.STYLE_FONTSIZE] || mxConstants.DEFAULT_FONTSIZE
        var dx = 0
        var dy = 0

        // Adds dimension of image if shape is a label
        if (this.getImage(state) || style[mxConstants.STYLE_IMAGE]) {
          if (style[mxConstants.STYLE_SHAPE] === mxConstants.SHAPE_LABEL) {
            if (style[mxConstants.STYLE_VERTICAL_ALIGN] === mxConstants.ALIGN_MIDDLE) {
              dx += parseFloat(style[mxConstants.STYLE_IMAGE_WIDTH]) || mxLabel.prototype.imageSize
            }

            if (style[mxConstants.STYLE_ALIGN] !== mxConstants.ALIGN_CENTER) {
              dy += parseFloat(style[mxConstants.STYLE_IMAGE_HEIGHT]) || mxLabel.prototype.imageSize
            }
          }
        }

        // Adds spacings
        dx += 2 * (style[mxConstants.STYLE_SPACING] || 0)
        dx += style[mxConstants.STYLE_SPACING_LEFT] || 0
        dx += style[mxConstants.STYLE_SPACING_RIGHT] || 0

        dy += 2 * (style[mxConstants.STYLE_SPACING] || 0)
        dy += style[mxConstants.STYLE_SPACING_TOP] || 0
        dy += style[mxConstants.STYLE_SPACING_BOTTOM] || 0

        // Add spacing for collapse/expand icon
        // LATER: Check alignment and use constants
        // for image spacing
        var image = this.getFoldingImage(state)

        if (image !== null) {
          dx += image.width + 8
        }

        // Adds space for label
        var value = this.getLabel(cell)

        if (value && value.length > 0) {
          if (!this.isHtmlLabel(cell)) {
            value = value.replace(/\n/g, '<br>')
          }

          var size = mxUtils.getSizeForString(value,
            fontSize, style[mxConstants.STYLE_FONTFAMILY])
          if (size.width + dx > maxWidth) {
            size = mxUtils.getSizeForString(value,
              fontSize, style[mxConstants.STYLE_FONTFAMILY], maxWidth)
          }
          var width = size.width + dx
          var height = size.height + dy

          if (!mxUtils.getValue(style, mxConstants.STYLE_HORIZONTAL, true)) {
            var tmp = height

            height = width
            width = tmp
          }

          if (this.gridEnabled) {
            width = this.snap(width + this.gridSize / 2)
            height = this.snap(height + this.gridSize / 2)
          }

          result = new mxRectangle(0, 0, width, height)
        } else {
          var gs2 = 4 * this.gridSize
          result = new mxRectangle(0, 0, gs2, gs2)
        }
      }
    }

    return result
  },

  getValue: function() {
    let me = this
    let enc = new mxCodec()
    let data = enc.encode(me.graph.getModel())
    return mxUtils.getXml(data)
  },

  resetOriginalValue: function() {
    this.changeFired = false
    this.isGraphChanged = false
    return null
  },

  graphChanged: function() {
    let me = this
    if (!me.isLoadComlete) {
      return
    }
    me.isGraphChanged = true
    if (!me.changeFired) {
      this.fireEvent('change', this, true)
    }
    me.changeFired = true
  },

  isDirty: function() {
    return this.isGraphChanged
  },

  updateDataBlob: function(inblob) {
    var me = this
    if (!me.useBlobForData) {
      Ext.Error.raise('object does not use Blob')
    }
    if (me.dataBlob && !Ext.isEmpty(this.objUrl)) {
      window.URL.revokeObjectURL(this.objUrl)
    }
    me.data = null
    me.dataBlob = inblob
    me.objUrl = window.URL.createObjectURL(inblob)
    me.data = me.objUrl
  },

  onDestroy: function() {
    var me = this
    me.dataBlob = null
    me.data = null
    if (me.useBlobForData && !Ext.isEmpty(me.objUrl)) {
      window.URL.revokeObjectURL(me.objUrl)
    }
    me.objUrl = null
    this.callParent()
  },

  /**
   *
   * @param {Object} cfg
   * @param {Blob|File} [cfg.blobData]
   * @param {String} [cfg.url]
   * @returns {Promise}
   */
  setSrc: function(cfg) {
    var
      me = this,
      data = cfg.url,
      blobData = cfg.blobData,
      result

    if (cfg.rawValue) {
      throw new Error('The UBOrgChart component does not support rawValue')
    }

    me.dataUrl = data
    if (me.useBlobForData && blobData) {
      me.updateDataBlob(blobData)
    }

    me.isActulData = false
    me.changeFired = true
    if (me.graph) {
      result = me.startLoadData()
    } else {
      // возможно гдето понадобиться знать о завершении загрузки
      me.loadDataDefer = Q.defer()
      result = me.loadDataDefer.promise
      me.loadDataDefer.resolve(true)
    }
    me.changeFired = false
    return result
  },

  startLoadData: function() {
    var me = this,
      dec, xml, err, defer = Q.defer()
    if (!me.dataUrl || !me.graph) {
      return
    }
    me.isLoadComlete = false
    me.getEl().mask(UB.i18n('loadingData'))
    $App.connection.get(me.dataUrl).then(function(response) {
      xml = response.data
      if (typeof(xml) === 'string') {
        var parser = new DOMParser()
        xml = parser.parseFromString(xml, 'application/xml')
        err = xml.getElementsByTagName('parsererror')
        if (err.length > 0) {
          throw new Error(err[0].innerHTML)
        }
      }
      dec = new mxCodec(xml.documentElement.ownerDocument)
      dec.decode(xml.documentElement, me.graph.getModel())
      this.baseUrl = me.dataUrl

      me.isLoadComlete = true
      me.isLoadContent = true
      me.isGraphChanged = false
      me.undoManager.clear()
      me.isActulData = true
      return true
    }).done(function() {
      try {
        me.loadData().then(() => {
          try {
            me.validateDiagram()
            defer.resolve()
          } finally {
            me.getEl().unmask()
          }
        })
      } catch (err) {
        me.getEl().unmask()
        defer.reject(err)
        throw err
      }
    }, function(reason) {
      defer.reject(reason)
      me.getEl().unmask()
    })
    return defer.promise
  },

  // инициация нового документа
  initNewSrc: function() {
    var me = this
    me.loadData().then(() => {
      me.showTree()
      me.isLoadContent = true
      me.isLoadComlete = true
    })
    return null
  },

  findParentCell: function(cell) {
    var me = this,
      model = me.graph.getModel(),
      edgeCount, e, dest
    edgeCount = model.getEdgeCount(cell)
    if (edgeCount > 0) {
      for (var i = 0; i < edgeCount; i++) {
        e = model.getEdgeAt(cell, i)
        dest = model.getTerminal(e, true)
        if (dest !== cell) {
          return dest
        }
      }
    }
    return null
  },

  findChildCell: function(cell) {
    var me = this,
      model = me.graph.getModel(),
      edgeCount, e, dest, result = []
    edgeCount = model.getEdgeCount(cell)
    if (edgeCount > 0) {
      for (var i = 0; i < edgeCount; i++) {
        e = model.getEdgeAt(cell, i)
        dest = model.getTerminal(e, false)
        if (dest !== cell) {
          result.push(dest)
        }
      }
    }
    return result
  },

  refreshDiagram: function() {
    var me = this
    return me.loadData().then(() => me.validateDiagram(true))
  },

  validateDiagram: function(isUpdateMode) {
    var me = this,
      model = me.graph.getModel(),
      ID, hasItem = false,
      cellToDel = [],
      isRoot, parentCell, parentID, elmTree, cellChParent = [],
      dCells = {},
      elm

    me.rootVarex = null

    // по всем вершинам в диаграмме
    Ext.Object.each(model.cells, function(id, cell) {
      if (cell.vertex) {
        ID = cell.getAttribute('ID')
        if (ID) {
          ID = ID * 1
        }
        isRoot = cell.getAttribute('isRoot')

        if (isRoot) {
          me.rootVarex = cell
          cell.isRoot = true
        }
        if (!ID) { // теоритически кроме рута без нашей ид не должно быть элементов
          return true
        }
        parentCell = me.findParentCell(cell)
        parentID = parentCell ? (parentCell.getAttribute('ID') || null) : null
        if (parentID) {
          parentID = parentID * 1
        }

        hasItem = true
        elmTree = me.allData[ID]
        if (!elmTree) { // в базе видно удалили такой элемент
          cellToDel.push(cell)
        } else {
          // освежим параметры
          if (cell.getAttribute('label') !== elmTree.caption) {
            cell.setAttribute('label', elmTree.caption)
          }
          if (cell.getAttribute('code') !== elmTree.code) {
            cell.setAttribute('code', elmTree.code)
          }
          if (cell.getAttribute('unitType') !== elmTree.unitType) {
            cell.setAttribute('unitType', elmTree.unitType)
          }

          if (elmTree.parentID !== parentID) { // у узла сменлся родитель
            cellChParent.push(cell)
          }

          // заносим все в древовидную стрктуру для дальнейшей проверки
          elm = dCells[ID]
          if (!elm) {
            dCells[ID] = elm = {
              cell: cell,
              child: []
            }
          } else {
            elm.cell = cell
          }
          elm = dCells[elmTree.parentID || 'root']
          if (!elm) {
            dCells[elmTree.parentID || 'root'] = elm = {
              child: [cell]
            }
          } else {
            elm.child.push(cell)
          }
        }
      }
    })

    // перенаправляем дугу, если сменлся родитель и если новый родитель на схеме иначе удаляем
    cellChParent.forEach(function(cell) {
      ID = cell.getAttribute('ID')
      if (ID) {
        ID = ID * 1
      }
      elmTree = me.allData[ID]
      elm = dCells[elmTree.parentID]
      if (elm) { // всеже новый родитель есть на схеме
        me.changeElementParent(cell, elm.cell, elmTree)
      } else {
        cellToDel.push(cell)
      }
    })

    me.graph.removeCells(cellToDel, true)

    // осталось найти все элемнты схемы где сменилось количество деток
    Ext.Object.each(dCells, function(eID, eCell) {
      if (eID === 'root') {
        me.updateCellOverlay(me.rootVarex, eCell.child, me.treeData.length, isUpdateMode)
        return true
      }
      elm = me.allData[eID]
      if (elm) {
        me.updateCellOverlay(eCell.cell, eCell.child, elm.child.length, isUpdateMode)
      }
    }, me)

    me.undoManager.clear()

    if (!me.rootVarex) {
      Ext.Msg.alert('', UB.i18n('Root is not found'))
      return
    }

    me.changeFired = false
    me.isGraphChanged = false
    me.isLoadComlete = true
  },

  updateCellOverlay: function(cell, childCell, newCount, isUpdateMode) {
    var me = this,
      hasInvisible = false,
      overlay
    Ext.Array.each(childCell, function(elm) {
      if (elm.isVisible()) {
        hasInvisible = true
        return false
      }
    }, me)
    if (isUpdateMode) {
      overlay = me.getAddOvelay(cell)
      if (childCell.length !== newCount && !overlay) {
        me.addAddOverlay(me.graph, cell)
      }
      if (newCount === 0 && overlay) {
        me.graph.removeCellOverlay(cell, overlay)
      }
      overlay = me.getExpandOvelay(cell)
      if (childCell.length === 0 && overlay) {
        me.graph.removeCellOverlay(cell, overlay)
      }
    } else {
      if (childCell.length !== newCount) {
        me.addAddOverlay(me.graph, cell)
      }
      if (newCount > 0 && childCell.length > 0) {
        me.addExpandOverlay(me.graph, cell, hasInvisible)
      }
      me.addIconOverlay(cell)
    }
  },

  createNewDiagram: function(parentID, caption) {
    return $App.connection.insert({
      fieldList: ['ID', 'orgunitID', 'caption'],
      entity: 'org_diagram',
      execParams: {
        orgunitID: parentID,
        caption: caption
      }
    }).then(function(result) {
      if (result.serverFailure) {
        return null
      } else {
        return result.resultData.data[0][0]
      }
    })
  },

  openDiagram: function(cell) {
    var me = this,
      ID, caption
    ID = cell.getAttribute('ID') * 1
    caption = cell.getAttribute('label')

    UB.Repository('org_diagram').attrs(['ID', 'orgunitID', 'caption']).where('orgunitID', '=', ID)
      .selectSingle()
      .then((diagramData) => {
        if (!diagramData) {
          return $App.dialogYesNo('', 'Chart for this item does not exist. Create a new one?')
            .then((choice) => {
              if (choice) return me.createNewDiagram(ID, caption)
            })
        } else {
          return diagramData.ID
        }
      }).then((diagramID) => {
        if (diagramID) {
          this.openFormC({
            entityCode: 'org_diagram',
            instanceID: diagramID,
            isModal: false
          })
        }
      })
  },

  createChildElement: function(cell, unitType) {
    let me = this
    let entity = me.getEntityByUnitType(unitType)
    let ID = cell.getAttribute('ID')
    ID = ID ? ID * 1 : null
    if (entity) {
      me.openForm(entity, null, {
        parentID: ID
      }, function(sender) {
        let panel = sender.down('basepanel')
        if (panel && panel.record) {
          me.checkElementId(panel.record.get('ID'), cell)
        }
      })
    }
  },

  /**
   * Display newly added element
   * @param ID
   * @param parentCell
   */
  checkElementId: function(ID, parentCell) {
    let me = this
    UB.Repository('org_unit').attrs(['ID', 'parentID', 'code', 'caption', 'unitType'])
      .selectById(ID)
      .then((orgUnit) => {
        if (!orgUnit) return
        me.refreshDiagram().then(() => {
          let parentItem = me.allData[parentCell.getAttribute('ID') * 1]
          let item = me.allData[ID]
          let childCells = me.findChildCell(parentCell)

          let overlay = me.getAddOvelay(parentCell)
          if (parentItem.child.length === childCells.length + 1) {
            // var pt = mxUtils.convertPoint( me.graph.container, x, y);
            let pt = {
              x: parentCell.geometry.x,
              y: parentCell.geometry.y + 120
            }
            let model = me.graph.getModel()
            model.beginUpdate()
            try {
              me.showElement(parentCell, item, pt)
              if (overlay) {
                me.graph.removeCellOverlay(parentCell, overlay)
              }
            } finally {
              model.endUpdate()
            }
          }
        })
      })
  },

  initMetaInfo: function() {
    let me = this
    let unity, orgUnity

    me.orgUnity = {}
    $App.domainInfo.eachEntity(function(metaObj, metaObjName) {
      if (metaObj.mixins && (unity = metaObj.mixins.unity) && unity.enabled &&
        unity.entity && (unity.entity.toLowerCase() === 'org_unit') &&
        unity.defaults) {
        let unitType = unity.defaults.unitType
        me.orgUnity[unitType] = orgUnity = {
          code: metaObjName,
          unitType: unitType,
          caption: metaObj.caption
        }
        switch (unitType) {
          case 'ORG':
            orgUnity.image = $App.getImagePath('office.png')
            break
          case 'DEP':
            orgUnity.image = $App.getImagePath('user-group.png')
            break
          default:
            orgUnity.image = $App.getImagePath('person.png')
            break
        }
      }
    })
  }
})
