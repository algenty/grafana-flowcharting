import { $GF } from 'globals_class';
import { Rule } from 'rule_class';
import { TooltipHandler } from 'tooltipHandler';

export class XCell {
  graph: any;
  mxcell: mxCell;
  isHidden: boolean = false;
  isHighlighting: boolean = false;
  isBlink: boolean = false;
  // isCollapsed: boolean = false;
  _mxcellHL: any = null;
  gf: gf.TXCellGF;

  constructor(graph, mxcell) {
    this.graph = graph;
    this.mxcell = mxcell;
    this.gf = this._getDefaultGFXCell();
    this.mxcell.gf = this.gf;
    this.isHidden = this.graph.model.isVisible(this.mxcell);
    this.isCollapsed = this.graph.isCellCollapsed(this.mxcell);
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
      },
      tooltip : {
        enableTooltip: false,
        displayMetadata : false,
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

      default:
        //TODO
        throw new Error(`Type ${type} not implemented in method getValue()`);
        break;
    }
  }

  getValues(options: gf.TRuleMapOptions = Rule.getDefaultMapOptions()): any {
    return this.getValue(options.identByProp);
  }

  _sameString(def, cur): boolean {
    return def === cur;
  }

  _isTypeChanged(type: gf.TXCellDefaultValueKeys): boolean {
    const def = this.getDefaultValue(type);
    const cur = this.getValue(type);
    if (['id', 'value', 'link'].includes(type)) {
      return this._sameString(def, cur);
    }
    return false;
  }

  _setDefaultValue(type: gf.TXCellDefaultValueKeys): gf.TXCellValueGF {
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
      case 'metadata':
        return this._setDefaultMetadatas();
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
  getMetadatasKeys(): string[] {
    const a: any = this._getDefaultValue('metadata');
    const defaultValue: gf.TXCellMetadata = a;
    if (defaultValue !== undefined) {
      return Array.from(defaultValue.keys());
    }
    return [];
  }

  getMetadataValues(name: string, regex: boolean = true): string[] {
    const a: any = this._getDefaultValue('metadata');
    const mds: gf.TXCellMetadata = a;
    if (!regex && mds.has(name)) {
      const value = mds.get(name);
      if (value !== undefined && value !== null) {
        return [value];
      }
      return [];
    }
    const keys = this.getMetadatasKeys();
    if (keys !== undefined) {
      const values: string[] = [];
      const length = keys.length;
      for (let index = 0; index < length; index++) {
        const key = keys[index];
        if ($GF.utils.matchString(key, name, regex)) {
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
    return this.getMetadatasKeys().includes(name);
  }

  _matchMetadata(pattern: string, options: gf.TRuleMapOptions): boolean {
    const values = this.getMetadataValues(options.metadata, options.enableRegEx);
    const length = values.length;
    for (let i = 0; i < length; i++) {
      const v = values[i];
      if ($GF.utils.matchString(v, pattern, options.enableRegEx)) {
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
      return $GF.utils.matchString(value, pattern, options.enableRegEx);
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
  async hide(bool: boolean = true) {
    if (!this.isHidden && bool) {
      this.isHidden = true;
      this.graph.model.setVisible(this.mxcell, false);
    } else if (this.isHidden && !bool) {
      this.graph.model.setVisible(this.mxcell, true);
    }
  }

  /**
   *
   * @deprecated
   * @param {boolean} [bool=true]
   * @memberof XCell
   */
  async show() {
    this.hide(false);
  }

  /**
   * Hightlight cell
   *
   * @param {boolean} [bool=true]
   * @memberof XCell
   */
  async highlight(bool: boolean = true) {
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
    } else if (this.isHighlighting !== null && !bool) {
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

  /**
   * Unhightlight cell
   * @deprecated
   * @memberof XCell
   */
  async unhighlight() {
    this.highlight(false);
  }

  /**
   * Collapse Cell
   *
   * @param {boolean} [bool=true]
   * @memberof XCell
   */
  async collapse(bool = true) {
    const isCollapsed = this.graph.isCellCollapsed(this.mxcell);
    if (!isCollapsed && bool) {
      this.graph.foldCells(true, false, [this.mxcell], null, null);
    } else if (isCollapsed && !bool) {
      this.graph.foldCells(false, false, [this.mxcell], null, null);
    }
  }

  isCollapsed(): boolean {
    return this.graph.isCellCollapsed(this.mxcell);
  }

  /**
   * Expand Cell
   *
   * @deprecated
   * @memberof XCell
   */
  async expand() {
    this.collapse(false);
  }

  enableTooltip(bool = true) {
    this.gf.tooltip.enableTooltip = bool;
    if(!bool) {
      if(this.gf.tooltip.tooltipHandler) {
        this.gf.tooltip.tooltipHandler.destroy();
      }
      this.gf.tooltip.tooltipHandler = undefined;
    }
    return this;
  }

  setTooltipHandler(tp : TooltipHandler) {
    this.gf.tooltip.tooltipHandler = tp;
    return this;
  }

  async addOverlay(state: string) {
    const _createOverlay = (image, tooltip) => {
      const overlay = new mxCellOverlay(image, tooltip);
      overlay.addListener(mxEvent.CLICK, (_sender, _evt) => {
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
