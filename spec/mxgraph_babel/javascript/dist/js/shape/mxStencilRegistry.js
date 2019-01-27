'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var mxStencilRegistry;
	return {
		setters: [],
		execute: function () {
			mxStencilRegistry = {
				/**
     * Class: mxStencilRegistry
     * 
     * A singleton class that provides a registry for stencils and the methods
     * for painting those stencils onto a canvas or into a DOM.
     */
				stencils: {},

				/**
     * Function: addStencil
     * 
     * Adds the given <mxStencil>.
     */
				addStencil: function addStencil(name, stencil) {
					mxStencilRegistry.stencils[name] = stencil;
				},

				/**
     * Function: getStencil
     * 
     * Returns the <mxStencil> for the given name.
     */
				getStencil: function getStencil(name) {
					return mxStencilRegistry.stencils[name];
				}

			};


			__mxOutput.mxStencilRegistry = typeof mxStencilRegistry !== 'undefined' ? mxStencilRegistry : undefined;
		}
	};
});
//# sourceMappingURL=mxStencilRegistry.js.map
