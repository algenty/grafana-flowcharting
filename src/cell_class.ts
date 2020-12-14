declare var mxUtils: any;

declare interface gf {
    defaultValues : {
        id : string;
        value : string;
        metadata : {
            key : string,
            value : string,
        }[]
    }
}

export class XCell implements mxCell {
  mxcell: mxCell;
  gf:gf = {
      defaultValues : {
        id : '',
        value : '',
        metadata : [],
      }
  }
  constructor(mxcell) {
    this.mxcell = mxcell;
    this._init();
    mxcell.gf = this.gf;
  }

  refactore(mxcell: mxCell): XCell {
    const xcell = new XCell(mxcell);
    return xcell;
  }

  async _init() {
    this.gf.defaultValues.id = this.mxcell.getId();
    if (mxUtils.isNode(this.mxcell.value)) {
      this.gf.defaultValues.value = this.value.getAttribute('label');
    } else {
      this.gf.defaultValues.value = this.mxcell.getValue();
    }
  }
 
}
