'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var mxGenericChangeCodec;
  return {
    setters: [],
    execute: function () {
      mxGenericChangeCodec = function mxGenericChangeCodec(obj, variable) {
        var codec = new mxObjectCodec(obj, ['model', 'previous'], ['cell']);

        /**
         * Function: afterDecode
         *
         * Restores the state by assigning the previous value.
         */
        codec.afterDecode = function (dec, node, obj) {
          // Allows forward references in sessions. This is a workaround
          // for the sequence of edits in mxGraph.moveCells and cellsAdded.
          if (mxUtils.isNode(obj.cell)) {
            obj.cell = dec.decodeCell(obj.cell, false);
          }

          obj.previous = obj[variable];

          return obj;
        };

        return codec;
      };

      // Registers the codecs
      mxCodecRegistry.register(mxGenericChangeCodec(new mxValueChange(), 'value'));
      mxCodecRegistry.register(mxGenericChangeCodec(new mxStyleChange(), 'style'));
      mxCodecRegistry.register(mxGenericChangeCodec(new mxGeometryChange(), 'geometry'));
      mxCodecRegistry.register(mxGenericChangeCodec(new mxCollapseChange(), 'collapsed'));
      mxCodecRegistry.register(mxGenericChangeCodec(new mxVisibleChange(), 'visible'));
      mxCodecRegistry.register(mxGenericChangeCodec(new mxCellAttributeChange(), 'value'));

      __mxOutput.mxGenericChangeCodec = typeof mxGenericChangeCodec !== 'undefined' ? mxGenericChangeCodec : undefined;
    }
  };
});
//# sourceMappingURL=mxGenericChangeCodec.js.map
