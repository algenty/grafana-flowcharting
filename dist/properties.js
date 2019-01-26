'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var pluginName, flowchartEditor, displayEditor, shapeEditor, valueEditor;
	return {
		setters: [],
		execute: function () {
			_export('pluginName', pluginName = 'agenty-flowcharting-panel');

			_export('flowchartEditor', flowchartEditor = 'public/plugins/' + pluginName + '/flowchartEditor.html');

			_export('displayEditor', displayEditor = 'public/plugins/' + pluginName + '/displayEditor.html');

			_export('shapeEditor', shapeEditor = 'public/plugins/' + pluginName + '/shapeEditor.html');

			_export('valueEditor', valueEditor = 'public/plugins/' + pluginName + '/valueEditor.html');

			_export('pluginName', pluginName);

			_export('flowchartEditor', flowchartEditor);

			_export('displayEditor', displayEditor);

			_export('shapeEditor', shapeEditor);

			_export('valueEditor', valueEditor);
		}
	};
});
//# sourceMappingURL=properties.js.map
