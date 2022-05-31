import { $GF, GFCONSTANT, GFTimer } from 'globals_class';
import { XGraph } from 'graph_class';
import { Rule } from 'rule_class';
import { TooltipHandler } from 'tooltipHandler';

export class XCell {
  private graph: any;
  readonly mxcell: mxCell;
  readonly uid: string;
  private _isHidden = false;
  private _isHighlighted = false;
  private _isBlink = false;
  _surroundHL: Map<string, any> = new Map();
  percent = 100;
  _mxcellHL: any = null;
  gf: gf.TXCellGF;

  constructor(graph: XGraph, mxcell: mxCell) {
    this.uid = $GF.genUid('xcell');
    this.graph = graph;
    this.mxcell = mxcell;
    this.uid = mxcell.getId();
    this.gf = this._getDefaultGFXCell();
    this.mxcell.gf = this.gf;
    this._isHidden = !this.graph.model.isVisible(this.mxcell);
  }

  static refactore(graph: any, mxcell: mxCell): XCell {
    const xcell = new XCell(graph, mxcell);
    return xcell;
  }

  _getDefaultGFXCell(): gf.TXCellGF {
    return {
      defaultValues: {
        id: undefined,
        value: undefined,
        metadata: undefined,
        link: undefined,
        styles: undefined,
        dimension: undefined,
      },
      tooltip: {
        enableTooltip: false,
        displayMetadata: false,
        tooltipHandler: undefined,
      },
    };
  }

  _getDefaultValue(type: gf.TXCellDefaultValueKeys): gf.TXCellValueGF {
    this._initDefaultValue(type);
    const value = this.gf.defaultValues[type];
    if (value === undefined) {
      return null;
    }
    return value;
  }

  _initDefaultValue(type: gf.TXCellDefaultValueKeys): this {
    const value = this.gf.defaultValues[type];
    if (value === undefined) {
      this._setDefaultValue(type);
    }
    return this;
  }

  getDefaultValue(type: gf.TXCellDefaultValueKeys): any {
    return this._getDefaultValue(type);
  }

  getValue(type: gf.TXCellDefaultValueKeys): gf.TXCellValueGF {
    switch (type) {
      case 'id':
        return this.getId();
        break;
      case 'value':
        return this.getLabel();
        break;
      case 'link':
        return this.getLink();
        break;
      case 'metadata':
        return this.getDefaultValue('metadata');
        break;
      default:
        //TODO
        throw new Error(`Type ${type} not implemented in method getValue()`);
        break;
    }
  }

  getValues(options: gf.TRuleMapOptions = Rule.getDefaultMapOptions()): any {
    let value: any = this.getValue(options.identByProp);
    if (options.identByProp === 'metadata') {
      value = this.getDefaultMetadatasValues(options.metadata, options.enableRegEx);
    }
    return value;
  }

  getDefaultValues(options: gf.TRuleMapOptions = Rule.getDefaultMapOptions()): any {
    let value: any = this.getDefaultValue(options.identByProp);
    if (options.identByProp === 'metadata') {
      value = this.getDefaultMetadatasValues(options.metadata, options.enableRegEx);
    }
    return value;
  }

  // private _sameString(def: any, cur: any): boolean {
  //   return def === cur;
  // }

  // private _isTypeChanged(type: gf.TXCellDefaultValueKeys): boolean {
  //   const def = this.getDefaultValue(type);
  //   const cur = this.getValue(type);
  //   if (['id', 'value', 'link'].includes(type)) {
  //     return this._sameString(def, cur);
  //   }
  //   return false;
  // }

  private _setDefaultValue(type: gf.TXCellDefaultValueKeys): gf.TXCellValueGF {
    switch (type) {
      case 'id':
        const id = this.mxcell.getId();
        this.gf.defaultValues.id = id;
        return id;
        break;
      case 'value':
        const value = this.getLabel();
        this.gf.defaultValues.value = value;
        return value;
        break;
      case 'link':
        const link = this.getLink();
        this.gf.defaultValues.link = link;
      case 'dimension':
        this.gf.defaultValues.dimension = this.getDimension();
      case 'metadata':
        return (this.gf.defaultValues.metadata = this.getMetadatas());
        break;
      case 'styles':
        return this._setDefaultStyles();
        break;
      default:
        throw new Error('Unknow type : ' + type);
        break;
    }
  }

  //
  // ID
  //
  getId(): string {
    return this.mxcell.getId();
  }

  getDefaultId(): string {
    return this.getDefaultValue('id');
  }

  setId(id: string): this {
    this._initDefaultValue('id');
    this.mxcell.id = id;
    return this;
  }

  restoreId(): this {
    this.setId(this.getDefaultId());
    return this;
  }

  //
  // LABEL
  //
  getDefaultLabel(): string {
    return this.getDefaultValue('value');
  }

  getLabel() {
    let value = '';
    if (mxUtils.isNode(this.mxcell.value)) {
      value = this.mxcell.getAttribute('label');
    } else {
      value = this.mxcell.getValue();
    }
    return value;
  }

  setLabel(label: string): this {
    this._initDefaultValue('value');
    this.graph.cellLabelChanged(this.mxcell, label, false);
    return this;
  }

  restoreLabel(): this {
    this.setLabel(this.getDefaultLabel());
    return this;
  }

  //
  // LINK
  //
  getDefaultLink(): string | null {
    return this.getDefaultValue('link');
  }

  getLink(): string | null {
    return this.graph.getLinkForCell(this.mxcell);
  }

  setLink(link: string | null): this {
    this._initDefaultValue('link');
    this.graph.setLinkForCell(this.mxcell, link);
    return this;
  }

  restoreLink() {
    this.setLink(this.getDefaultLink());
  }

  //
  // METADATA
  //
  getMetadatas(): gf.TXCellMetadata {
    const result: gf.TXCellMetadata = new Map();
    if (this.mxcell && mxUtils.isNode(this.mxcell.value)) {
      const ignored = ['label', 'tooltip', 'placeholders', 'placeholder', 'link'];
      const attrs = this.mxcell.value.attributes;
      const length = attrs.length;
      for (var i = 0; i < length; i++) {
        if (!ignored.includes(attrs[i].nodeName)) {
          const key = attrs[i].nodeName;
          const value = attrs[i].nodeValue;
          result.set(key, value);
        }
      }
    }
    return result;
  }

  setMetadata(key: string, value: string | null): this {
    this._initDefaultValue('metadata');
    this.mxcell.setAttribute(key, value);
    return this;
  }

  getMetadata(key: string): any {
    return this.mxcell.getAttribute(key);
  }

  getDefaultMetadatasKeys(): string[] {
    const a: any = this._getDefaultValue('metadata');
    const defaultValue: gf.TXCellMetadata = a;
    if (defaultValue !== undefined) {
      return Array.from(defaultValue.keys());
    }
    return [];
  }

  getDefaultMetadatasValues(name: string, regex = true): string[] {
    const a: any = this._getDefaultValue('metadata');
    const mds: gf.TXCellMetadata = a;
    if (!regex && mds.has(name)) {
      const value = mds.get(name);
      if (value !== undefined && value !== null) {
        return [value];
      }
      return [];
    }
    const keys = this.getDefaultMetadatasKeys();
    if (keys !== undefined) {
      const values: string[] = [];
      const length = keys.length;
      for (let index = 0; index < length; index++) {
        const key = keys[index];
        if ($GF.matchString(key, name, regex)) {
          const value = mds.get(name);
          if (value !== undefined && value !== null) {
            values.push(value);
          }
        }
      }
      return values;
    }
    return [];
  }

  hasMetadataName(name: string): boolean {
    return this.getDefaultMetadatasKeys().includes(name);
  }

  _matchMetadata(pattern: string, options: gf.TRuleMapOptions): boolean {
    const values = this.getDefaultMetadatasValues(options.metadata, options.enableRegEx);
    const length = values.length;
    for (let i = 0; i < length; i++) {
      const v = values[i];
      if ($GF.matchString(v, pattern, options.enableRegEx)) {
        return true;
      }
    }
    return false;
  }

  _setDefaultMetadatas(): gf.TXCellMetadata {
    const result: gf.TXCellMetadata = new Map();
    if (this.mxcell && mxUtils.isNode(this.mxcell.value)) {
      const ignored = ['label', 'tooltip', 'placeholders', 'placeholder', 'link'];
      const attrs = this.mxcell.value.attributes;
      const length = attrs.length;
      for (var i = 0; i < length; i++) {
        if (!ignored.includes(attrs[i].nodeName)) {
          const key = attrs[i].nodeName;
          const value = attrs[i].nodeValue;
          result.set(key, value);
        }
      }
    }
    this.gf.defaultValues.metadata = result;
    return result;
  }

  //
  // Styles
  //
  _initDefaultStyle(style: gf.TXCellStyleKeys): this {
    if (this.gf.defaultValues.styles === undefined || !this.gf.defaultValues.styles.has(style)) {
      this._setDefaultStyle(style);
    }
    return this;
  }

  _setDefaultStyles(): gf.TXCellStyles {
    if (this.gf.defaultValues.styles === undefined) {
      this.gf.defaultValues.styles = new Map();
    }
    return this.gf.defaultValues.styles;
  }

  _setDefaultStyle(style: gf.TXCellStyleKeys): string | null {
    if (this.gf.defaultValues.styles === undefined) {
      this._setDefaultStyles();
    }
    const state = this.graph.view.getState(this.mxcell);
    let value = null;
    if (state) {
      value = state.style[style];
    }
    if (this.gf.defaultValues.styles !== undefined) {
      this.gf.defaultValues.styles.set(style, value);
    }
    return value;
  }

  /**
   * Get initial value of style
   *
   * @param {string} style
   * @returns {(string | null)}
   * @memberof XCell
   */
  getDefaultStyle(style: gf.TXCellStyleKeys): string | null {
    if (this.gf.defaultValues.styles === undefined || !this.gf.defaultValues.styles.has(style)) {
      return this._setDefaultStyle(style);
    }
    return this.gf.defaultValues.styles.get(style);
  }

  setStyle(style: gf.TXCellStyleKeys, value: string | null): this {
    this._initDefaultStyle(style);
    this.graph.setCellStyles(style, value, [this.mxcell]);
    return this;
  }

  getStyle(style: gf.TXCellStyleKeys): string | null {
    const state = this.graph.view.getState(this.mxcell);
    if (state) {
      return state.style[style];
    }
    return null;
  }

  isStyleChanged(style: gf.TXCellStyleKeys): boolean {
    const def = this.getDefaultStyle(style);
    const cur = this.getStyle(style);
    return def === cur;
  }

  restoreStyle(style: gf.TXCellStyleKeys): this {
    const old = this.getDefaultStyle(style);
    this.setStyle(style, old);
    return this;
  }

  //
  // DIMENSION
  //
  getDefaultDimension(): mxGeometry {
    return this.getDefaultValue('dimension');
  }

  getDimension(): mxGeometry {
    return this.graph.model.getGeometry(this.mxcell);
  }

  async setDimension(dim: mxGeometry) {
    this.graph.resizeCell(this.mxcell, dim, true);
  }

  async restoreDimension() {
    const dim = this.getDefaultValue('dimension');
    this.setDimension(dim);
  }

  //
  // OTHERS
  //

  /**
   * Return mxCell
   *
   * @returns {mxCell}
   * @memberof XCell
   */
  getMxCell(): mxCell {
    return this.mxcell;
  }

  /**
   * Return mxCellState
   *
   * @returns {mxCellState}
   * @memberof XCell
   */
  getMxCellState(): mxCellState {
    return this.graph.view.getState(this.mxcell);
  }

  isVertex(): boolean {
    return this.mxcell.isVertex();
  }

  //
  // SVG
  //
  getSvgNode(): HTMLElement | null {
    const state = this.getMxCellState();
    if (state && state.shape.node) {
      return state.shape.node;
    }
    return null;
  }

  cloneSVG(): HTMLElement {
    const svg = document.createElement('svg');
    const node = this.getSvgNode();
    if (node !== null) {
      const n = node.cloneNode(true);
      svg.appendChild(n);
      return svg;
    }
    return svg;
  }

  cloneMxCell(): any {
    return this.graph.cloneCell(this.mxcell, true);
  }

  /**
   * Match XCell
   *
   * @param {string} pattern
   * @param {gf.TRuleMapOptions} options
   * @returns {boolean}
   * @memberof XCell
   */
  match(pattern: string, options: gf.TRuleMapOptions): boolean {
    if (options.identByProp === 'id' || options.identByProp === 'value') {
      const v: any = this.getDefaultValue(options.identByProp);
      const value: string = v;
      return $GF.matchString(value, pattern, options.enableRegEx);
    }
    if (options.identByProp === 'metadata') {
      return this._matchMetadata(pattern, options);
    }
    throw new Error('Type is unknown : ' + options);
  }

  /**
   * Hide this cell
   *
   * @param {boolean} [bool=true]
   * @memberof XCell
   */
  hide(bool = true) {
    if (!this._isHidden && bool) {
      this.graph.model.setVisible(this.mxcell, false);
    } else if (this._isHidden && !bool) {
      this.graph.model.setVisible(this.mxcell, true);
    }
    this._isHidden = bool;
  }

  /**
   *
   * @deprecated
   * @param {boolean} [bool=true]
   * @memberof XCell
   */
  show() {
    this.hide(false);
  }

  isHidden() {
    return this._isHidden;
  }

  /**
   * Hightlight cell
   *
   * @param {boolean} [bool=true]
   * @memberof XCell
   */
  highlight(bool = true) {
    const color = GFCONSTANT.CONF_HIGHTLIGHT_COLOR;
    if (!this._isHighlighted && bool) {
      this._isHighlighted = true;
      this.surround(color, true, true);
    } else if (this._isHighlighted && !bool) {
      this.surround(color, true, false);
      this._isHighlighted = false;
    }
    this._isHighlighted = bool;
  }

  /**
   * Unhightlight cell
   * @deprecated
   * @memberof XCell
   */
  unhighlight() {
    this.highlight(false);
  }

  isHighlighted() {
    return this._isHighlighted;
  }

  /**
   * Collapse Cell
   *
   * @param {boolean} [bool=true]
   * @memberof XCell
   */
  collapse(bool = true) {
    const coll = this.graph.isCellCollapsed(this.mxcell);
    if (!coll && bool) {
      this.graph.foldCells(true, false, [this.mxcell], null, null);
    } else if (coll && !bool) {
      this.graph.foldCells(false, false, [this.mxcell], null, null);
    }
  }

  /**
   * return if xcell is collapse
   *
   * @returns {boolean}
   * @memberof XCell
   */
  isCollapsed(): boolean {
    return this.graph.isCellCollapsed(this.mxcell);
  }

  /**
   * Expand Cell
   *
   * @deprecated
   * @memberof XCell
   */
  expand() {
    this.collapse(false);
  }

  enableTooltip(bool = true) {
    this.gf.tooltip.enableTooltip = bool;
    if (!bool) {
      if (this.gf.tooltip.tooltipHandler) {
        this.gf.tooltip.tooltipHandler.destroy();
      }
      this.gf.tooltip.tooltipHandler = undefined;
    }
    return this;
  }

  setTooltipHandler(tp: TooltipHandler) {
    this.gf.tooltip.tooltipHandler = tp;
    return this;
  }

  async zoom(percent = 100) {
    const dim: mxGeometry = this.getDefaultDimension();
    if (percent !== 100) {
      this._initDefaultValue('dimension');
      if (dim !== null) {
        let _x = dim.x;
        let _ow = dim.width;
        let _y = dim.y;
        let _oh = dim.height;
        let _w = _ow * (percent / 100);
        let _h = _oh * (percent / 100);
        _x = _x - (_w - _ow) / 2;
        _y = _y - (_h - _oh) / 2;
        const rec = new mxRectangle(_x, _y, _w, _h);
        this.setDimension(rec);
        this.percent = percent;
      }
    } else if (this.percent !== 100) {
      this.setDimension(dim);
      this.percent = 100;
    }
  }

  async resize(width: number | undefined, height: number | undefined) {
    this._initDefaultValue('dimension');
    const dim = this.getDimension();
    if (dim !== null) {
      let _x = dim.x;
      let _ow = dim.width;
      let _y = dim.y;
      let _oh = dim.height;
      _x = width !== undefined && width < 0 ? _x + width + _ow : _x;
      _y = height !== undefined && height < 0 ? _y + height + _oh : _y;
      let _h = height !== undefined ? Math.abs(height) : dim.height;
      let _w = width !== undefined ? Math.abs(width) : dim.width;
      const _rec = new mxRectangle(_x, _y, _w, _h);
      this.setDimension(_rec);
    }
  }

  isSurrounded(color: string): boolean {
    if (this._surroundHL !== undefined) {
      return this._surroundHL.has(color);
    } else {
      this._surroundHL = new Map();
    }
    return false;
  }

  surround(color: string, anim = true, bool = true): this {
    if (bool && !this.isSurrounded(color)) {
      const opacity = 100;
      const state = this.getMxCellState();
      if (state !== null) {
        const sw = Math.max(5, mxUtils.getValue(state.style, mxConstants.STYLE_STROKEWIDTH, 1) + 4);
        const hl = new mxCellHighlight(this.graph, color, sw, false);
        if (opacity !== null) {
          hl.opacity = opacity;
        }
        hl.highlight(state);
        this._surroundHL.set(color, hl);
      }
    } else if (!bool && this.isSurrounded(color)) {
      const hl = this._surroundHL.get(color);
      const transition = 300;
      if (hl && hl.shape !== null && hl.shape !== undefined) {
        if (anim) {
          mxUtils.setPrefixedStyle(hl.shape.node.style, 'transition', `all ${transition}ms ease-in-out`);
        }
        hl.shape.node.style.opacity = 0;
        // hl.destroy();
        // this._surroundHL = undefined;
        if (anim) {
          window.setTimeout(() => {
            hl.destroy();
            this._surroundHL.delete(color);
          }, transition);
        } else {
          hl.destroy();
          this._surroundHL.delete(color);
        }
      }
    }
    return this;
  }

  unsurround(): this {
    this.surround('', false);
    return this;
  }

  /**
   * Blink this cell
   *
   * @param {number} [ms=1000]
   * @param {boolean} [bool=true]
   * @memberof XCell
   */
  blink(ms = 1000, bool = true) {
    const timeId = `blink-${this.uid}`;
    const color = GFCONSTANT.CONF_BLINK_COLOR;
    if (bool && !this._isBlink) {
      this._isBlink = true;
      const timer = GFTimer.create(timeId);
      timer.addStep(this.surround.bind(this, color, false), ms);
      timer.addStep(this.surround.bind(this, color, false, false), ms * 2);
      timer.setCyclic();
      timer.start();
    } else if (!bool && this._isBlink) {
      GFTimer.stop(timeId);
      this.surround(color, false, false);
      this._isBlink = false;
    }
    this._isBlink = bool;
  }

  /**
   * Stop blink
   *
   * @deprecated use blink(number, false)
   * @memberof XCell
   */
  unblink() {
    this.blink(1000, false);
  }

  isBlink() {
    return this._isBlink
  }



  addOverlay(state: string) {
    const _createOverlay = (image: any, tooltip: any) => {
      const overlay = new mxCellOverlay(image, tooltip);
      overlay.addListener(mxEvent.CLICK, (_sender: any, _evt: any) => {
        mxUtils.alert(`${tooltip}\nLast update: ${new Date()}`);
      });
      return overlay;
    };
    this.graph.addCellOverlay(this.mxcell, _createOverlay(this.graph.warningImage, `State: ${state}`));
    return this;
  }

  async removeOverlay() {
    this.graph.removeCellOverlays(this.mxcell);
    return this;
  }
}
