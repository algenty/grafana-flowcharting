var mxGraphPah = './libs/mxgraph-js/dist/mxgraph-js.js';
var mxInt =
{
  /**
   * Function: include
   *
   * Dynamically adds a script node to the document header.
   *
   * In production environments, the includes are resolved in the mxClient.js
   * file to reduce the number of requests required for client startup. This
   * function should only be used in development environments, but not in
   * production systems.
   */
  include: function(src)
  {
    document.write('<script src="'+src+'"></script>');
  },

  // Test Graph
  test: function(cont)
  {
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported())
    {
      // Displays an error message if the browser is not supported.
      mxUtils.error('Browser is not supported!', 200, false);
    }
    else
    {
      // Disables the built-in context menu
      mxEvent.disableContextMenu(cont);

      // Creates the graph inside the given container
      var graph = new mx.mxGraph(container);

      // Enables rubberband selection
      new mxRubberband(graph);

      // Gets the default parent for inserting new cells. This
      // is normally the first child of the root (ie. layer 0).
      var parent = graph.getDefaultParent();

      // Adds cells to the model in a single step
      graph.getModel().beginUpdate();
      try
      {
        var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
        var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
        var e1 = graph.insertEdge(parent, null, '', v1, v2);
      }
      finally
      {
        // Updates the display
        graph.getModel().endUpdate();
      }
    }
  };

  mxInt.include(mxGraphPah);

};
