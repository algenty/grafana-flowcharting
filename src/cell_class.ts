declare type mxUtils = any;
declare type Graph =  any;

export class XCell {
  graph : Graph;
  mxcell: mxCell;
  gf: gf.TXCellGF;

  constructor(graph, mxcell) {
    this.graph = graph;
    this.mxcell = mxcell;
    this.gf = this._getDefaultGF();
    this.mxcell.gf = this.gf;
    this._init();
  }

  refactore(graph : Graph, mxcell: mxCell): XCell {
    const xcell = new XCell(graph, mxcell);
    return xcell;
  }

  _getDefaultGF(): gf.TXCellGF {
    return {
      defaultValues : {
        id : null,
        value : null,
        metadata : [],
      },
      getDefaultValue : this._getDefaultValue,
    }
  }

  async _init() {
    this.gf = this._getDefaultGF();
    this.mxcell.gf.defaultValues.id = this.mxcell.getId();
    if (mxUtils.isNode(this.mxcell.value)) {
      this.mxcell.gf.defaultValues.value = this.mxcell.getAttribute('label');
    } else {
      this.gf.defaultValues.value = this.mxcell.getValue();
    }
  }

  _getDefaultValue(type : gf.TPropertieKey) : gf.TXCellValueGF {
    return this.gf[type];
  }

  getMxCell(): mxCell {
    return this.mxcell;
  }
 
}
