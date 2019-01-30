var mxGraphPah = "./libs/mxgraph-js/dist/mxgraph-js.js";
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
  }
  mxInt.include(mxGraphPah);
  
}());
