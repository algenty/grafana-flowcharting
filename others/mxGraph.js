module.exports = {
  initAndCall: function () {
    window.mxImageBasePath = 'models/adminui-pub/resources/images'
    window.mxBasePath = 'models/adminui-pub/resources'
    return System.import('mxgraph-js')
      .then(function (mxgraph) {
        if (window.mxGraph) return mxgraph
        // expose to global to allow mxGraph work correctly
        window.mxGraph = mxgraph.mxGraph
        window.mxShape = mxgraph.mxShape
        window.mxConnectionConstraint = mxgraph.mxConnectionConstraint
        window.mxPoint = mxgraph.mxPoint
        window.mxPolyline = mxgraph.mxPolyline
        window.mxEvent = mxgraph.mxEvent
        window.mxRubberband = mxgraph.mxRubberband
        window.mxCellState = mxgraph.mxCellState
        window.mxClient = mxgraph.mxClient
        window.mxUtils = mxgraph.mxUtils
        window.mxConstants = mxgraph.mxConstants
        window.mxPopupMenu = mxgraph.mxPopupMenu
        window.mxDefaultPopupMenu = mxgraph.mxDefaultPopupMenu
        window.mxEditor = mxgraph.mxEditor
        window.mxGraphModel = mxgraph.mxGraphModel
        window.mxGraphView = mxgraph.mxGraphView
        window.mxToolbar = mxgraph.mxToolbar
        window.mxDefaultToolbar = mxgraph.mxDefaultToolbar
        window.mxGeometry = mxgraph.mxGeometry
        window.mxKeyHandler = mxgraph.mxKeyHandler
        window.mxDefaultKeyHandler = mxgraph.mxDefaultKeyHandler
        window.mxVertexHandler = mxgraph.mxVertexHandler
        window.mxStylesheet = mxgraph.mxStylesheet
        window.mxCellRenderer = mxgraph.mxCellRenderer
        window.mxCell = mxgraph.mxCell
        window.mxCodec = mxgraph.mxCodec
        window.mxDivResizer = mxgraph.mxDivResizer
        window.mxOutline = mxgraph.mxOutline
        window.mxUndoManager = mxgraph.mxUndoManager
        window.mxEdgeStyle = mxgraph.mxEdgeStyle
        window.mxCompactTreeLayout = mxgraph.mxCompactTreeLayout
        window.mxLabel = mxgraph.mxLabel
        window.mxRectangle = mxgraph.mxRectangle
        window.mxCellOverlay = mxgraph.mxCellOverlay
        window.mxImage = mxgraph.mxImage
        window.mxPrintPreview = mxgraph.mxPrintPreview
        return mxgraph
      })
  }
}
