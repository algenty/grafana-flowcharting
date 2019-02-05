'use strict';

module.exports = {
  initAndCall: function initAndCall(pluginPath) {
    console.log("pluginPath :" + pluginPath);
    window.mxImageBasePath = pluginPath + '/libs/mxgraph/javascript/src/images';
    window.mxBasePath = pluginPath + '/libs/mxgraph/javascript/src';
    return System.import('/public/plugins/agenty-flowcharting-panel/libs/mxgraph-js/dist/mxgraph-js').then(function (mxgraph) {
      // if (window.mxGraph) return mxgraph
      // expose to global to allow mxGraph work correctly
      if (window.mxGraph) return mxgraph;
      console.log("System.import");
      window.mxGraph = mxgraph.mxGraph;
      window.mxShape = mxgraph.mxShape;
      window.mxConnectionConstraint = mxgraph.mxConnectionConstraint;
      window.mxPoint = mxgraph.mxPoint;
      window.mxPolyline = mxgraph.mxPolyline;
      window.mxEvent = mxgraph.mxEvent;
      window.mxRubberband = mxgraph.mxRubberband;
      window.mxCellState = mxgraph.mxCellState;
      window.mxClient = mxgraph.mxClient;
      window.mxUtils = mxgraph.mxUtils;
      window.mxConstants = mxgraph.mxConstants;
      window.mxPopupMenu = mxgraph.mxPopupMenu;
      window.mxDefaultPopupMenu = mxgraph.mxDefaultPopupMenu;
      window.mxEditor = mxgraph.mxEditor;
      window.mxGraphModel = mxgraph.mxGraphModel;
      window.mxGraphView = mxgraph.mxGraphView;
      window.mxToolbar = mxgraph.mxToolbar;
      window.mxDefaultToolbar = mxgraph.mxDefaultToolbar;
      window.mxGeometry = mxgraph.mxGeometry;
      window.mxKeyHandler = mxgraph.mxKeyHandler;
      window.mxDefaultKeyHandler = mxgraph.mxDefaultKeyHandler;
      window.mxVertexHandler = mxgraph.mxVertexHandler;
      window.mxStylesheet = mxgraph.mxStylesheet;
      window.mxCellRenderer = mxgraph.mxCellRenderer;
      window.mxCell = mxgraph.mxCell;
      window.mxCodec = mxgraph.mxCodec;
      window.mxDivResizer = mxgraph.mxDivResizer;
      window.mxOutline = mxgraph.mxOutline;
      window.mxUndoManager = mxgraph.mxUndoManager;
      window.mxEdgeStyle = mxgraph.mxEdgeStyle;
      window.mxCompactTreeLayout = mxgraph.mxCompactTreeLayout;
      window.mxLabel = mxgraph.mxLabel;
      window.mxRectangle = mxgraph.mxRectangle;
      window.mxCellOverlay = mxgraph.mxCellOverlay;
      window.mxImage = mxgraph.mxImage;
      window.mxPrintPreview = mxgraph.mxPrintPreview;
      console.log('mxClient.isBrowserSupported :' + mxClient.isBrowserSupported());
      return mxgraph;
    }).catch(function () {
      console.log("echec System.import");
    });
  }
};
