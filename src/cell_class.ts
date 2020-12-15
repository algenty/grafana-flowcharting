import { $GF } from 'globals_class';

export class XCell {
  graph : Graph;
  mxcell: mxCell;
  _mxcellHL: any = null;
  isHighlighting = false;
  gf: gf.TXCellGF;

  constructor(graph, mxcell) {
    this.graph = graph;
    this.mxcell = mxcell;
    this.gf = this._getDefaultGF();
    this.mxcell.gf = this.gf;
  }

  static refactore(graph : Graph, mxcell: mxCell): XCell {
    const xcell = new XCell(graph, mxcell);
    return xcell;
  }

  _getDefaultGF(): gf.TXCellGF {
    return {
      defaultValues : {
        id : undefined,
        value : undefined,
        metadata : undefined,
        link : undefined,
        styles : undefined,
      },
      defaultStyles : [],
      getDefaultValue : this.getDefaultValue,
      hasMetadataName : this.hasMetadataName,
      getMetadataValue: this.getMetadataValue
    }
  }

  getDefaultValue(type : gf.TPropertieKey) : gf.TXCellValueGF {
    const value = this.gf.defaultValues[type];
    if(value === undefined) {
      return this._setDefaultValue(type);
    }
    return value;
  }

  _setDefaultValue(type : gf.TPropertieKey): gf.TXCellValueGF {
    switch (type) {
      case 'id':
        const id = this.mxcell.getId();
        this.mxcell.gf.defaultValues.id = id;
        return id;
        break;
      case 'value':
        let value = '';
        if (mxUtils.isNode(this.mxcell.value)) {
          value = this.mxcell.getAttribute('label');
        } else {
          value = this.mxcell.getValue();
        }
        this.mxcell.gf.defaultValues.value = value;
        return value;
        break;
      case 'metadata':
        return this._setDefaultMetadatas();
        break;
      default:
        throw new Error("Unknow type : " + type);
        break;
    }
  }

  _setDefaultMetadatas():gf.TXCellMetadatasGF {
    const result: gf.TXCellMetadatasGF = [];
    if (this.mxcell && mxUtils.isNode(this.mxcell.value)) {
      const ignored = ['label', 'tooltip', 'placeholders', 'placeholder', 'link'];
      const attrs = this.mxcell.value.attributes;
      const length = attrs.length;
      for (var i = 0; i < length; i++) {
           if (mxUtils.indexOf(ignored, attrs[i].nodeName) < 0 && attrs[i].nodeValue.length > 0) {
            result.push({ key: attrs[i].nodeName, value: attrs[i].nodeValue });
          } else {
          result.push({ key: attrs[i].nodeName, value: attrs[i].nodeValue });
          }
        }
    }
    this.gf.defaultValues.metadata = result;
    return result;
  }

  getDefaultStyle(style : string) : string |null {
    if(this.gf.defaultStyles[style] === undefined) {
      return this._setDefaultStyle(style);
    }
    return this.gf.defaultStyles[style];
  }

  _setDefaultStyle(style : string): string | null {
    const state = this.graph.view.getState(this.mxcell);
    if (state) {
      this.gf.defaultStyles[style] = state.style[style];
    } else {
      this.gf.defaultStyles[style] = null;
    }
    return this.gf.defaultStyles[style];
  }

  getMxCell(): mxCell {
    return this.mxcell;
  }

  getMxCellState(): mxCellState {
    return this.graph.view.getState(this.mxcell);
  }

  match(pattern : string, options : gf.TRuleMapOptions):boolean {
    if(options.identByProp === 'id' || options.identByProp === 'value') {
      const v:any = this.getDefaultValue(options.identByProp);
      const value:string = v;
      return $GF.utils.matchString(value, pattern, options.enableRegEx);
    }
    if(options.identByProp === 'metadata') {
      return this._matchMetadata(pattern, options)
    }
    throw new Error("Type is unknown : " + options);
  }

  _matchMetadata(pattern : string, options : gf.TRuleMapOptions):boolean {
    const m:any = this.getDefaultValue('metadata');
    const mds:gf.TXCellMetadatasGF = m;
    const length = mds.length;
    for (let index = 0; index < length; index++) {
      const md = mds[index];
      if($GF.utils.matchString(md.key, options.metadata, options.enableRegEx)) {
        if($GF.utils.matchString(md.value, pattern, options.enableRegEx)) {
          return true;
        }
      }
    }
    return false;
  }

  async highlight(bool : boolean = true) {
    if (!this.isHighlighting && bool) {
      this.isHighlighting = true;
      const color = '#99ff33';
      const opacity = 100;
      const state = this.getMxCellState();

      if (state != null) {
        const sw = Math.max(5, mxUtils.getValue(state.style, mxConstants.STYLE_STROKEWIDTH, 1) + 4);
        const hl = new mxCellHighlight(this.graph, color, sw, false);
        this._mxcellHL = hl;
        if (opacity != null) {
          hl.opacity = opacity;
        }
        hl.highlight(state);
      }
    }
    else if(this.isHighlighting !== null && !bool) {
        // Fades out the highlight after a duration
        const hl = this._mxcellHL;
        if (this._mxcellHL.shape !== null) {
          mxUtils.setPrefixedStyle(hl.shape.node.style, 'transition', 'all 500ms ease-in-out');
          hl.shape.node.style.opacity = 0;
        }
        // Destroys the highlight after the fade
        window.setTimeout(() => {
          hl.destroy();
        }, 500);
        this._mxcellHL = null;
    }
  }

  async unhighlight() {
    this.highlight(false);
  }

  hasMetadataName(name : string, regex : boolean = true):boolean {
    const a:any = this.getDefaultValue('metadata');
    const mds : gf.TXCellMetadatasGF = a;
    if(mds !== null ) {
      const length = mds.length;
      for (let index = 0; index < length; index++) {
        const md = mds[index];
        if($GF.utils.matchString(md.key, name, regex)) {
          return true;
        }
      }
    }
    return false;
  }

  getMetadataValue(name : string, regex : boolean = true):string | null {
    const a:any = this.getDefaultValue('metadata');
    const mds : gf.TXCellMetadatasGF = a;
    if(mds !== null) {
      const length = mds.length;
      for (let index = 0; index < length; index++) {
        const md = mds[index];
        if($GF.utils.matchString(md.key, name, regex)) {
          return md.value;
        }
      }
    }
    return null;
  }

  _createOverlay(image, tooltip): any {
    const overlay = new mxCellOverlay(image, tooltip);
    overlay.addListener(mxEvent.CLICK, (_sender, _evt) => {
      mxUtils.alert(`${tooltip}\nLast update: ${new Date()}`);
    });
    return overlay;
  }

  async addOverlay(state : string) {
    this.graph.addCellOverlay(this.mxcell, this._createOverlay(this.graph.warningImage, `State: ${state}`));
    return this;
  }
 
  async removeOverlay() {
    this.graph.removeCellOverlays(this.mxcell);
    return this;
  }
}
