import XGraph from './graph_class';
import Rule from 'rule_class';
import Metric from './metric_class';
import TooltipHandler from './tooltipHandler';

/**
 * Class for state of one cell
 *
 * @export
 * @class State
 */
export default class State {
  mxcell: mxCell; // mxCell State
  cellId: string; // cell ID in mxcell
  newcellId: string | undefined; // for inspect mode
  previousId: string | undefined; // for inspect mode
  edited: boolean | undefined; // if modified in inspector
  edit: boolean | undefined; // if modified in inspector
  xgraph: XGraph;
  changed = false;
  // changedShape = false;
  // changedStyle: gf.TIStylesBoolean;
  // changedText = false;
  // changedEvent = false;
  // changedLink = false;
  matched = false;
  // matchedShape = false;
  // matchedStyle: gf.TIStylesBoolean;
  // matchedText = false;
  // matchedLink = false;
  // matchedEvent = false;
  // 0.8.0
  shapeState: ShapeState;
  tooltipState: TooltipState;
  iconState: IconState;
  eventState: EventState;
  textState: TextState;
  linkState: LinkState;
  globalLevel = -1;
  // colorKeys: gf.TStyleColorKey[] = ['fillColor', 'strokeColor', 'fontColor', 'imageBorder', 'imageBackground'];
  // eventKeys: gf.TStyleEventKey[] = ['shape', 'overflow'];
  // styleKeys: gf.TStyleKey[] = [...this.colorKeys, ...this.eventKeys];
  // styleKeys: gf.TStyleKey[] = [...this.colorKeys];
  // level: gf.TIStylesNumber;
  tooltipHandler: TooltipHandler | null = null;
  // currentStyles: gf.TIStylesString;
  // originalStyles: gf.TIStylesString;
  // fullStylesString: string;
  originalText: string;
  // currentText: string;
  // originalLink: string | null;
  // currentLink: string | null;
  overlayIcon = false;
  changedIcon = false;

  /**
   * Creates an instance of State.
   * @param {mxCell} mxcell
   * @param {XGraph} xgraph
   * @memberof State
   */
  constructor(mxcell: mxCell, xgraph: XGraph) {
    GFP.log.info('State.constructor()');
    this.mxcell = mxcell;
    this.cellId = mxcell.id;
    this.xgraph = xgraph;
    this.shapeState = new ShapeState(xgraph, mxcell);
    this.tooltipState = new TooltipState(xgraph, mxcell);
    this.iconState = new IconState(xgraph, mxcell);
    this.eventState = new EventState(xgraph, mxcell);
    this.textState = new TextState(xgraph, mxcell);
    this.linkState = new LinkState(xgraph, mxcell);

    // If Cell is modified
    // this.changedStyle = State.getDefaultFlagStyles();

    // If state is target
    // this.matchedStyle = State.getDefaultFlagStyles();
    // this.level = State.getDefaultLevelStyles();
    this.tooltipHandler = null;
    this.mxcell.GF_tooltipHandler = null;
    // this.currentStyles = State.getDefaultValueStyles();
    // this.originalStyles = State.getDefaultValueStyles();
    // this.fullStylesString = mxcell.getStyle();
    this.originalText = this.xgraph.getLabelCell(mxcell);
    // this.currentText = this.originalText;
    // let link = this.xgraph.getLink(mxcell);
    // if (link === undefined) {
    //   link = null;
    // }
    // this.originalLink = link;
    // this.currentLink = link;
    // this.styleKeys.forEach(style => {
    //   const value: string | null = this.xgraph.getStyleCell(mxcell, style);
    //   this.currentStyles[style] = value;
    //   this.originalStyles[style] = value;
    // });
    // console.debug('originalStyles', this.originalStyles);
  }

  // static getDefaultValueStyles(): gf.TIStylesString {
  //   return {
  //     fillColor: null,
  //     strokeColor: null,
  //     fontColor: null,
  //     imageBorder: null,
  //     imageBackground: null,
  //     shape: null,
  //     overflow: null,
  //   };
  // }

  // static getDefaultLevelStyles(): gf.TIStylesNumber {
  //   return {
  //     fillColor: -1,
  //     strokeColor: -1,
  //     fontColor: -1,
  //     imageBorder: -1,
  //     imageBackground: -1,
  //     shape: -1,
  //     overflow: -1,
  //   };
  // }

  // static getDefaultFlagStyles(): gf.TIStylesBoolean {
  //   return {
  //     fillColor: false,
  //     strokeColor: false,
  //     fontColor: false,
  //     imageBorder: false,
  //     imageBackground: false,
  //     shape: false,
  //     overflow: false,
  //   };
  // }

  /**
   * Call applyState() asynchronously
   *
   * @memberof State
   */
  async async_applyState() {
    // new Promise (this.applyState.bind(this));
    this.applyState();
  }

  /**
   * Define state according to 1 rule and 1 serie without apply display
   *
   * @returns {this}
   * @param {Rule} rule
   * @param {Metric} metric
   * @memberof State
   */
  setState(rule: Rule, metric: Metric): this {
    GFP.log.info('State.setState()');
    if (!rule.isHidden() && rule.matchMetric(metric)) {
      const shapeMaps = rule.getShapeMaps();
      const textMaps = rule.getTextMaps();
      const linkMaps = rule.getLinkMaps();
      const eventMaps = rule.getEventMaps();
      const value = rule.getValueForMetric(metric);
      const FormattedValue = rule.getFormattedValue(value);
      const level = rule.getThresholdLevel(value);
      const color = rule.data.gradient && rule.data.type === 'number' ? rule.getColorForValue(value) : rule.getColorForLevel(level);

      // SHAPE
      // let cellProp = this.getCellProp(rule.data.shapeProp);
      // shapeMaps.forEach(shape => {
      //   if (!shape.isHidden() && shape.match(cellProp, rule.data.shapeRegEx)) {
      //     this.matchedShape = true;
      //     this.matched = true;
      //     // tooltips
      //     if (rule.toTooltipize(level)) {
      //       // Metrics
      //       if (this.tooltipHandler === null || this.tooltipHandler === undefined) {
      //         this.tooltipHandler = new TooltipHandler(this.mxcell);
      //       }
      //       let tpColor: string | null = null;
      //       let label: string = rule.data.tooltipLabel;
      //       if (label === null || label.length === 0) {
      //         if (rule.data.metricType === 'serie') {
      //           label = metric.getName();
      //         }
      //         if (rule.data.metricType === 'table') {
      //           label = rule.data.column;
      //         }
      //       }
      //       if (rule.data.tooltipColors) {
      //         tpColor = color;
      //       }
      //       const metricToolip = this.tooltipHandler
      //         .addMetric()
      //         .setLabel(label)
      //         .setValue(FormattedValue)
      //         .setColor(tpColor)
      //         .setDirection(rule.data.tpDirection);
      //       // Graph
      //       if (rule.data.tpGraph) {
      //         const graph = metricToolip.addGraph(rule.data.tpGraphType);
      //         graph
      //           .setColor(tpColor)
      //           .setColumn(rule.data.column)
      //           .setMetric(metric)
      //           .setSize(rule.data.tpGraphSize)
      //           .setScaling(rule.data.tpGraphLow, rule.data.tpGraphHigh)
      //           .setScale(rule.data.tpGraphScale);
      //       }
      //       // Date
      //       this.tooltipHandler.updateDate();
      //     }

      //     // Color Shape
      //     if (this.globalLevel <= level) {
      //       this.setLevelStyle(shape.data.style, level);
      //       if (shape.toColorize(level)) {
      //         this.setColorStyle(shape.data.style, color);
      //         this.matchedStyle[shape.data.style] = true;
      //       } else if (this.changedShape) {
      //         if (this.changedStyle[shape.data.style]) {
      //           this.unsetColorStyle(shape.data.style);
      //         }
      //       }
      //       this.overlayIcon = rule.toIconize(level);
      //       if (level >= rule.highestLevel) {
      //         rule.highestLevel = level;
      //         rule.highestFormattedValue = FormattedValue;
      //         rule.highestColor = color;
      //       }
      //     }
      //   }
      // });

      // SHAPE
      let cellProp = this.getCellProp(rule.data.shapeProp);
      shapeMaps.forEach(shape => {
        const k = shape.data.style;
        GFP.log.debug('SHAPE - event', shape);
        GFP.log.debug('SHAPE - value', value);
        GFP.log.debug('SHAPE - level', level);
        GFP.log.debug('SHAPE - !shape.isHidden()', !shape.isHidden());
        GFP.log.debug('SHAPE - shape.match(cellProp, rule.data.eventRegEx)', shape.match(cellProp, rule.data.eventRegEx));
        GFP.log.debug('SHAPE - shape.toColorize(level)', shape.toColorize(level));
        GFP.log.debug('SHAPE - Global conditions', !shape.isHidden() && shape.match(cellProp, rule.data.eventRegEx) && shape.toColorize(level));
        if (!shape.isHidden() && shape.match(cellProp, rule.data.shapeRegEx) && shape.toColorize(level)) {
          this.matched = true;
          const v = color;
          this.shapeState.set(k, v, level);
          // TOOLTIP
          if (rule.toTooltipize(level)) {
            this.tooltipState.set('tooltip', true, level);
            this.tooltipState.setTooltip(rule, metric, color, FormattedValue);
          }
          // ICONS
          if (rule.toIconize(level)) {
            this.iconState.set('icon',true,level);
          }
          rule.toIconize(level);
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestValue = value;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
          }
        } else if (this.shapeState.isChanged(k) && !this.shapeState.isMatched(k)) {
          GFP.log.debug('SHAPE - Unset it');
          this.shapeState.unset(k);
          if(!this.shapeState.isMatched()) {
            this.tooltipState.unset();
            this.iconState.unset();
          }
        }
      });

      // TEXT
      cellProp = this.getCellProp(rule.data.textProp);
      textMaps.forEach(text => {
        const k = 'label';
        if (!text.isHidden() && text.match(cellProp, rule.data.textRegEx) && text.toLabelize(level)) {
          this.matched = true;
          const v = GFP.replaceWithText(FormattedValue);
          this.textState.set(k, v, level);
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestValue = value;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
          }
        } else if (this.textState.isChanged() && !this.textState.isMatched(k)) {
          this.textState.unset();
        }
      });

      // EVENTS
      cellProp = this.getCellProp(rule.data.eventProp);
      eventMaps.forEach(event => {
        const k = event.data.style;
        GFP.log.debug('EVENT - event', event);
        GFP.log.debug('EVENT - value', value);
        GFP.log.debug('EVENT - level', level);
        GFP.log.debug('EVENT - !event.isHidden()', !event.isHidden());
        GFP.log.debug('EVENT - event.match(cellProp, rule.data.eventRegEx)', event.match(cellProp, rule.data.eventRegEx));
        GFP.log.debug('EVENT - event.toEventable(level)', event.toEventable(level));
        GFP.log.debug('EVENT - Global conditions', !event.isHidden() && event.match(cellProp, rule.data.eventRegEx) && event.toEventable(level));
        if (!event.isHidden() && event.match(cellProp, rule.data.eventRegEx) && event.toEventable(level)) {
          this.matched = true;
          const v = event.data.value;
          this.eventState.set(k, v, level);
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestValue = value;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
          }
        } else if (this.eventState.isChanged(k) && !this.eventState.isMatched(k)) {
          GFP.log.debug('EVENT - Unset it');
          this.eventState.unset(k);
        }
      });

      // LINK
      // cellProp = this.getCellProp(rule.data.linkProp);
      // linkMaps.forEach(link => {
      //   if (!link.isHidden() && link.match(cellProp, rule.data.linkRegEx)) {
      //     this.matchedLink = true;
      //     this.matched = true;
      //     if (this.globalLevel <= level) {
      //       if (link.toLinkable(level)) {
      //         const linkScoped = GFP.replaceWithText(link.getLink());
      //         this.setLink(linkScoped);
      //       }
      //       if (level >= rule.highestLevel) {
      //         rule.highestLevel = level;
      //         rule.highestFormattedValue = FormattedValue;
      //         rule.highestColor = color;
      //       }
      //     }
      //   }
      // });

      // LINK
      cellProp = this.getCellProp(rule.data.linkProp);
      linkMaps.forEach(link => {
        const k = 'link';
        if (!link.isHidden() && link.match(cellProp, rule.data.linkRegEx) && link.toLinkable(level)) {
          this.matched = true;
          const v = GFP.replaceWithText(link.getLink());
          this.linkState.set(k, v, level);
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestValue = value;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
          }
        } else if (this.linkState.isChanged() && !this.linkState.isMatched(k)) {
          this.linkState.unset();
        }
      });
    }
    return this;
  }

  /**
   * Restore initial status of state without apply display.
   * Use applyState() to apply on graph (color, level and text)
   *
   * @returns {this}
   * @memberof State
   */
  unsetState(): this {
    GFP.log.info('State.unsetState()');
    // this.unsetLevel();
    // this.unsetColor(); Replace by reset
    // this.resetColorStyle();
    this.eventState.unset();
    this.textState.unset();
    this.linkState.unset();
    this.tooltipState.unset();
    this.iconState.unset();
    // this.unsetLink();
    // this.unsetTooltip();
    this.matched = false;
    // this.matchedShape = false;
    // this.styleKeys.forEach(key => {
    //   this.matchedStyle[key] = false;
    // });
    return this;
  }

  /**
   * Flag to indicate state is matching by a rule and series
   *
   * @returns {boolean}
   * @memberof State
   */
  // isMatched(): boolean {
  //   return this.matched;
  // }

  /**
   * Flag to indicate state is changed, need apply state
   *
   * @returns {boolean}
   * @memberof State
   */
  // isChanged(): boolean {
  //   return this.changed;
  // }

  /**
   *
   *
   * @param {string} prop - id|value
   * @returns {string|null} return original value of id or label of cell
   * @memberof State
   */
  getCellProp(prop: gf.TPropertieKey): string | null {
    if (prop === 'id') {
      return this.cellId;
    }
    if (prop === 'value') {
      return this.originalText;
    }
    return null;
  }

  /**
   * Define color for a style
   *
   * @return {this}
   * @param {string} style - fillcolor|fontcolor|stroke
   * @param {string} color - html color
   * @memberof State
   */
  // setColorStyle(style: gf.TStyleColorKey, color: string): this {
  //   GFP.log.info('State.setColorStyle()');
  //   this.currentStyles[style] = color;
  //   return this;
  // }

  /**
   * Return color of style
   *
   * @param {gf.TStyleColorKey} style
   * @memberof State
   */
  // getColorStyle(style: gf.TStyleColorKey): string | null {
  //   return this.currentStyles[style];
  // }

  /**
   * Reset color with initial color
   *
   * @returns {this}
   * @param {string} style - fillcolor|fontcolor|stroke
   * @memberof State
   */
  // unsetColorStyle(style: gf.TStyleColorKey): this {
  //   this.currentStyles[style] = this.originalStyles[style];
  //   return this;
  // }

  /**
   * Restore initial color of cell
   *
   * @returns {this}
   * @memberof State
   */
  // unsetColor(): this {
  //   this.colorKeys.forEach(style => {
  //     this.unsetColorStyle(style);
  //   });
  //   return this;
  // }

  /**
   * Reset default level (-1) for the style
   *
   * @returns {this}
   * @param {string} style - fillcolor|fontcolor|stroke
   * @memberof State
   */
  // unsetLevelStyle(style: gf.TStyleKey): this {
  //   this.level[style] = -1;
  //   return this;
  // }

  /**
   * Reset level to -1 for all style
   *
   * @returns {this}
   * @memberof State
   */
  // unsetLevel(): this {
  //   this.styleKeys.forEach((style: gf.TStyleKey) => {
  //     this.unsetLevelStyle(style);
  //   });
  //   this.globalLevel = -1;
  //   return this;
  // }

  /**
   * Attribute a level for a style
   *
   * @returns {this}
   * @param {TStyleKeyDisable} style
   * @param {number} level
   * @memberof State
   */
  // setLevelStyle(style: gf.TStyleKey, level: number): this {
  //   GFP.log.info('State.setLevelStyle()');
  //   this.level[style] = level;
  //   if (this.globalLevel < level) {
  //     this.globalLevel = level;
  //   }
  //   return this;
  // }

  /**
   * Retrun the level for a style
   *
   * @param {TStyleKey} style
   * @returns {number}
   * @memberof State
   */
  // getLevelStyle(style: gf.TStyleKey): number {
  //   return this.level[style];
  // }

  /**
   * Get the highest/global level
   *
   * @returns {number}
   * @memberof State
   */
  getLevel(): number {
    return this.globalLevel;
  }

  /**
   * Return the label level of current level
   *
   * @returns {string}
   * @memberof State
   */
  // getTextLevel(): string {
  //   const level = this.getLevel();
  //   switch (level) {
  //     case -1:
  //       return 'NO DATA';
  //     case 0:
  //       return 'OK';
  //     case 1:
  //       return 'WARN';
  //     case 2:
  //       return 'ERROR';
  //     default:
  //       return 'NULL';
  //   }
  // }

  /**
   * Attribute new label
   *
   * @returns {this}
   * @param {string} text
   * @memberof State
   */
  // setText(text: string): this {
  //   this.currentText = text;
  //   return this;
  // }

  /**
   * Reset the current label with the initial label
   *
   * @returns {this}
   * @memberof State
   */
  // unsetText(): this {
  //   this.currentText = this.originalText;
  //   return this;
  // }

  // --------------------------------------------------------------------
  // EVENTS
  // --------------------------------------------------------------------

  // setEvent(action: gf.TStyleEventKey, value: string): this {
  //   GFP.log.info('State.setColorStyle()');
  //   this.currentStyles[action] = value;
  //   return this;
  // }

  // getEvent(action: gf.TStyleEventKey): string | null {
  //   return this.currentStyles[action];
  // }

  // unsetEvent(action?: gf.TStyleEventKey): this {
  //   if (action !== undefined) {
  //     this.currentStyles[action] = this.originalStyles[action];
  //   } else {
  //     this.eventKeys.forEach(style => {
  //       this.currentStyles[style] = this.originalStyles[style];
  //     });
  //   }
  //   return this;
  // }

  /**
   * Apply events
   *
   * @returns {this}
   * @memberof State
   */
  // applyEvent(): this {
  //   this.eventKeys.forEach(key => {
  //     if (this.matchedStyle[key]) {
  //       const value = this.currentStyles[key];
  //       this.xgraph.setStyleCell(this.mxcell, key, value);
  //       if (value !== this.originalStyles[key]) {
  //         this.changedStyle[key] = true;
  //       }
  //     }
  //   });
  //   return this;
  // }

  /**
   * reset Events
   *
   * @returns {this}
   * @memberof State
   */
  // resetEvent(): this {
  //   this.changedEvent = false;
  //   this.resetEventStyle();
  //   return this;
  // }

  /**
   * Assign new link
   *
   * @returns {this}
   * @param {string} url
   * @memberof State
   */
  // setLink(url: string): this {
  //   this.currentLink = url;
  //   return this;
  // }

  /**
   * Reset current link with original/initial link
   *
   * @returns {this}
   * @memberof State
   */
  // unsetLink(): this {
  //   this.currentLink = this.originalLink;
  //   return this;
  // }

  // TOOLTIP

  /**
   * Add metric to tooltip of shape
   *
   * @returns {this}
   * @memberof State
   */
  addTooltip(): this {
    GFP.log.info('State.addTooltipValue()');
    if (this.tooltipHandler == null) {
      this.tooltipHandler = new TooltipHandler(this.mxcell);
    }
    this.tooltipHandler.addMetric();
    return this;
  }

  updateTooltipDate(): this {
    if (this.tooltipHandler) {
      this.tooltipHandler.updateDate();
    }
    return this;
  }

  /**
   * Reset tooltip
   *
   * @returns {this}
   * @memberof State
   */
  unsetTooltip(): this {
    if (this.tooltipHandler !== null) {
      this.tooltipHandler.destroy();
    }
    this.tooltipHandler = null;
    return this;
  }

  /**
   * Return true if is a shape/vertex
   *
   * @returns
   * @memberof State
   */
  isShape(): boolean {
    return this.mxcell.isVertex();
  }

  /**
   * Return true if is a arrow/connector
   *
   * @returns
   * @memberof State
   */
  isConnector(): boolean {
    return this.mxcell.isEdge();
  }

  /**
   * Apply and draw new shape color and form
   *
   * @memberof State
   */
  // applyShape(): this {
  //   this.changedShape = true;
  //   this.applyColor();
  //   this.applyIcon();
  //   return this;
  // }

  /**
   * Apply Styles to shape
   *
   * @returns {this}
   * @memberof State
   */
  // applyColor(): this {
  //   this.colorKeys.forEach(key => {
  //     if (this.matchedStyle[key]) {
  //       const color = this.currentStyles[key];
  //       this.xgraph.setColorCell(this.mxcell, key, color);
  //       if (color !== this.originalStyles[key]) {
  //         this.changedStyle[key] = true;
  //       }
  //     }
  //   });
  //   return this;
  // }

  /**
   * Apply icon warning
   *
   * @returns {this}
   * @memberof State
   */
  applyIcon(): this {
    // Apply icons
    if (this.overlayIcon) {
      this.changedIcon = true;
      this.xgraph.addOverlay(`Level state : ${this.getLevel()}`, this.mxcell);
    } else {
      this.xgraph.removeOverlay(this.mxcell);
    }
    return this;
  }

  /**
   * Restore initial state to shape
   *
   * @returns {this}
   * @memberof State
   */
  // resetShape(): this {
  //   this.changedShape = false;
  //   this.resetColorStyle();
  //   this.resetIcon();
  //   return this;
  // }

  /**
   * Remove icon from shape
   *
   * @returns {this}
   * @memberof State
   */
  resetIcon(): this {
    this.changedIcon = false;
    this.xgraph.removeOverlay(this.mxcell);
    return this;
  }

  /**
   * unset et apply, reset to old style
   *
   * @memberof State
   */
  // resetColorStyle(): this {
  //   this.unsetColor();
  //   this.xgraph.setStyles(this.mxcell, this.fullStylesString);
  //   this.colorKeys.forEach(key => {
  //     this.changedStyle[key] = false;
  //   });
  //   return this;
  // }

  /**
   * Reset style for events
   *
   * @returns {this}
   * @memberof State
   */
  // resetEventStyle(): this {
  //   this.unsetEvent();
  //   this.xgraph.setStyles(this.mxcell, this.fullStylesString);
  //   this.eventKeys.forEach(key => {
  //     this.changedStyle[key] = false;
  //   });
  //   return this;
  // }

  /**
   * Apply new label
   *
   * @memberof State
   */
  // applyText(): this {
  //   this.changedText = true;
  //   this.xgraph.setLabelCell(this.mxcell, this.currentText);
  //   return this;
  // }

  /**
   * Reset text with the source value
   *
   * @returns {this}
   * @memberof State
   */
  // resetText(): this {
  //   this.changedText = false;
  //   this.unsetText();
  //   this.xgraph.setLabelCell(this.mxcell, this.originalText);
  //   return this;
  // }

  /**
   * Apply new link
   *
   * @returns {this}
   * @memberof State
   */
  // applyLink(): this {
  //   this.changedLink = true;
  //   this.xgraph.addLink(this.mxcell, this.currentLink);
  //   return this;
  // }

  /**
   * Reset link
   *
   * @returns {this}
   * @memberof State
   */
  // resetLink(): this {
  //   this.changedLink = false;
  //   this.unsetLink();
  //   this.xgraph.addLink(this.mxcell, this.originalLink);
  //   return this;
  // }

  /**
   * Apply new tooltip
   *
   * @returns {this}
   * @memberof State
   */
  applyTooltip(): this {
    if (this.tooltipHandler != null && this.tooltipHandler.isChecked()) {
      this.mxcell.GF_tooltipHandler = this.tooltipHandler;
    }
    return this;
  }

  /**
   * Apply new state
   *
   * @returns {this}
   * @memberof State
   */
  applyState(): this {
    GFP.log.info('State.applyState()');
    if (this.matched) {
      this.changed = true;

      // TOOLTIP
      this.applyTooltip();

      // SHAPES
      // if (this.matchedShape) {
      //   this.applyShape();
      // } else if (this.changedShape) {
      //   this.resetShape();
      // }
      if (this.shapeState.isMatched()) {
        this.shapeState.apply();
      } else if (this.shapeState.isChanged()) {
        this.shapeState.reset();
      }

      // TOOLTIP
      if (this.tooltipState.isMatched()) {
        this.tooltipState.apply();
      } else if (this.tooltipState.isChanged()) {
        this.tooltipState.reset();
      }

      // ICON
      if (this.iconState.isMatched()) {
        this.iconState.apply();
      } else if (this.iconState.isChanged()) {
        this.iconState.reset();
      }


      // TEXTS
      if (this.textState.isMatched()) {
        this.textState.apply();
      } else if (this.textState.isChanged()) {
        this.textState.reset();
      }

      // EVENTS
      GFP.log.debug('EVENT(apply) - this.eventState.isMatched()', this.eventState.isMatched());
      GFP.log.debug('EVENT(apply) - this.eventState.isChanged()', this.eventState.isChanged());
      // debugger
      if (this.eventState.isMatched()) {
        this.eventState.apply();
      } else if (this.eventState.isChanged()) {
        this.eventState.reset();
      }

      // LINKS
      if (this.linkState.isMatched()) {
        this.linkState.apply();
      } else if (this.linkState.isChanged()) {
        this.linkState.reset();
      }
    } else if (this.changed) {
      this.reset();
    }
    return this;
  }

  /**
   * Reset and restore state
   *
   * @returns {this}
   * @memberof State
   */
  reset(): this {
    // this.resetShape();
    this.shapeState.reset();
    this.tooltipState.reset();
    this.iconState.reset();
    // this.resetText();
    this.textState.reset();
    // this.resetEvent();
    this.eventState.reset();
    this.linkState.reset();
    // this.resetLink();
    this.changed = false;
    return this;
  }

  /**
   * Prepare state for a new rule and serie
   *
   * @returns {this}
   * @memberof State
   */
  prepare(): this {
    if (this.changed) {
      // this.unsetLevel();
      // this.unsetTooltip();
      // this.unsetText();
      // this.textState.unset();
      // this.unsetEvent();
      // this.eventState.unset();
      // this.matchedShape = false;
      // this.matchedText = false;
      // this.matchedEvent = false;
      this.shapeState.prepare();
      this.tooltipState.prepare();
      this.iconState.prepare();
      this.textState.prepare();
      this.eventState.prepare();
      this.linkState.prepare();
      // this.matchedLink = false;
      this.matched = false;
    }
    return this;
  }

  /**
   * Highlight mxcell
   *
   * @returns {this}
   * @memberof State
   */
  highlightCell(): this {
    this.xgraph.highlightCell(this.mxcell);
    return this;
  }

  /**
   * Unhighlight mxcell
   *
   * @returns {this}
   * @memberof State
   */
  unhighlightCell(): this {
    this.xgraph.unhighlightCell(this.mxcell);
    return this;
  }
}

class GFState {
  changed = false;
  matched = false;
  xgraph: XGraph;
  mxcell: mxCell;
  keys: string[] = [];
  matchedKey: Map<string, boolean> = new Map();
  changedKey: Map<string, boolean> = new Map();
  originalValue: Map<string, any> = new Map();
  matchValue: Map<string, any> = new Map();
  // lastValue: Map<string, any> = new Map(); To not apply the same value
  matchLevel: Map<string, number> = new Map();

  constructor(xgraph: XGraph, mxcell: mxCell) {
    this.xgraph = xgraph;
    this.mxcell = mxcell;
    this.init();
  }

  init() {}

  addValue(key: string, value: any) {
    this.originalValue.set(key, value);
    this.matchValue.set(key, value);
    // this.lastValue.set(key, value); To not apply the same value
    this.matchLevel.set(key, -1);
    this.matchedKey.set(key, false);
    this.changedKey.set(key, false);
  }

  getOriginalValue(key: string): any | undefined {
    return this.originalValue.get(key);
  }

  getMatchValue(key: string): any | undefined {
    return this.matchValue.get(key);
  }

  // getLastValue(key: string): string | undefined {
  //   return this.lastValue.get(key);
  // }

  set(key: string, value: any, level: number): this {
    let matchLevel = this.getMatchLevel(key);
    if (matchLevel === undefined) {
      GFP.warn('Set Event with key undefined', key);
      this.addValue(key, value);
      matchLevel = -1;
    }
    if (matchLevel <= level) {
      this.matchLevel.set(key, level);
      this.matchValue.set(key, value);
      this.match(key, level);
    }
    return this;
  }

  apply(key?: string): this {
    if (key !== undefined) {
      if (this.isMatched(key)) {
        this.changed = true;
        this.changedKey.set(key, true);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  isMatched(key?: string): boolean {
    if (key !== undefined) {
      return this.matchedKey.get(key) === true;
    }
    return this.matched;
  }

  isChanged(key?: string): boolean {
    if (key !== undefined) {
      return this.changedKey.get(key) === true;
    }
    return this.changed;
  }

  getMatchLevel(key: string): number | undefined {
    return this.matchLevel.get(key);
  }

  unset(key?: string): this {
    if (key !== undefined) {
      this.matchValue.set(key, this.originalValue.get(key));
      this.matchedKey.set(key, false);
      this.matchLevel.set(key, -1);
    } else {
      this.keys.forEach(key => {
        this.unset(key);
      });
      this.matched = false;
    }
    return this;
  }

  match(key: string, level: number): this {
    this.matched = true;
    this.matchedKey.set(key, true);
    return this;
  }

  reset(key?: string): this {
    if (key !== undefined) {
      this.unset(key);
      this.changedKey.set(key, false);
      this.matchedKey.set(key, false);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
      this.changed = false;
      this.matched = false;
    }
    return this;
  }

  prepare(): this {
    if (this.changed) {
      this.unset();
      this.matched = false;
    }
    return this;
  }
}

class EventState extends GFState {
  keys: gf.TStyleEventKey[] = ['shape', 'overflow'];
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init();
  }

  init() {
    this.keys.forEach(key => {
      const value = this.xgraph.getStyleCell(this.mxcell, key);
      this.addValue(key, value);
    });
    GFP.log.debug('Original Event', this.originalValue);
  }

  apply(key?: gf.TStyleEventKey): this {
    if (key !== undefined) {
      if (this.isMatched(key)) {
        let value: any = this.getMatchValue(key);
        if (value === undefined) {
          value = null;
        }
        this.xgraph.setStyleCell(this.mxcell, key, value);
        super.apply(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  reset(key?: gf.TStyleEventKey): this {
    if (key !== undefined) {
      let value: any = this.getOriginalValue(key);
      if (value === undefined) {
        value = null;
      }
      this.xgraph.setStyleCell(this.mxcell, key, value);
      super.reset(key);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
      this.changed = false;
      this.matched = false;
    }
    return this;
  }
}

class TextState extends GFState {
  keys: string[] = ['label'];
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init();
  }

  init() {
    const value = this.xgraph.getLabelCell(this.mxcell);
    this.addValue('label', value);
    GFP.log.debug('Original Text', this.originalValue);
  }

  apply(key?: string): this {
    if (key !== undefined) {
      if (this.isMatched(key)) {
        let value: any = this.getMatchValue(key);
        if (value === undefined) {
          value = null;
        }
        this.xgraph.setLabelCell(this.mxcell, value);
        super.apply(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  reset(key?: string): this {
    if (key !== undefined) {
      let value: any = this.getOriginalValue(key);
      if (value === undefined) {
        value = null;
      }
      this.xgraph.setLabelCell(this.mxcell, value);
      super.reset(key);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
      this.changed = false;
      this.matched = false;
    }
    return this;
  }
}

class LinkState extends GFState {
  keys: string[] = ['link'];
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init();
  }

  init() {
    const value = this.xgraph.getLink(this.mxcell);
    this.addValue('link', value);
    GFP.log.debug('Original Link', this.originalValue);
  }

  apply(key?: string): this {
    if (key !== undefined) {
      if (this.isMatched(key)) {
        let value: any = this.getMatchValue(key);
        if (value === undefined) {
          value = null;
        }
        this.xgraph.addLink(this.mxcell, value);
        super.apply(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  reset(key?: string): this {
    if (key !== undefined) {
      let value: any = this.getOriginalValue(key);
      if (value === undefined) {
        value = null;
      }
      this.xgraph.addLink(this.mxcell, value);
      super.reset(key);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
      this.changed = false;
      this.matched = false;
    }
    return this;
  }
}

class ShapeState extends GFState {
  keys: gf.TStyleColorKey[] = ['fillColor', 'strokeColor', 'fontColor', 'imageBorder', 'imageBackground'];
  fullStylesString: string;
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.fullStylesString = mxcell.getStyle();
    this.init();
  }

  init() {
    this.keys.forEach(key => {
      const value = this.xgraph.getStyleCell(this.mxcell, key);
      this.addValue(key, value);
    });
    this.mxcell.GF_tooltipHandler = null;
    GFP.log.debug('Original Event', this.originalValue);
  }

  apply(key?: gf.TStyleColorKey): this {
    if (key !== undefined) {
      if (this.isMatched(key)) {
        let value: any = this.getMatchValue(key);
        if (value === undefined) {
          value = null;
        }
        this.xgraph.setStyleCell(this.mxcell, key, value);
        super.apply(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  reset(key?: gf.TStyleColorKey): this {
    if (key !== undefined) {
      let value: any = this.getOriginalValue(key);
      if (value === undefined) {
        value = null;
      }
      this.xgraph.setStyleCell(this.mxcell, key, value);
      super.reset(key);
    } else {
      this.xgraph.setStyles(this.mxcell, this.fullStylesString);
      super.reset();
      this.changed = false;
      this.matched = false;
    }
    return this;
  }
}

class TooltipState extends GFState {
  keys: string[] = ['tooltip'];
  tooltipHandler: TooltipHandler | undefined;
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init();
  }

  init() {
    this.addValue('tooltip', false);
    this.tooltipHandler = undefined;
    this.mxcell.GF_tooltipHandler = null;
  }

  setTooltip(rule: Rule, metric: Metric, color: string, value: string) {
    let tpColor: string | null = null;
    let label: string = rule.data.tooltipLabel;
    if (this.tooltipHandler === null || this.tooltipHandler === undefined) {
      this.tooltipHandler = new TooltipHandler(this.mxcell);
    }
    if (label === null || label.length === 0) {
      if (rule.data.metricType === 'serie') {
        label = metric.getName();
      }
      if (rule.data.metricType === 'table') {
        label = rule.data.column;
      }
    }
    if (rule.data.tooltipColors) {
      tpColor = color;
    }
    // METRIC
    const metricToolip = this.tooltipHandler
      .addMetric()
      .setLabel(label)
      .setValue(value)
      .setColor(tpColor)
      .setDirection(rule.data.tpDirection);
    // GRAPH
    if (rule.data.tpGraph) {
      const graph = metricToolip.addGraph(rule.data.tpGraphType);
      graph
        .setColor(tpColor)
        .setColumn(rule.data.column)
        .setMetric(metric)
        .setSize(rule.data.tpGraphSize)
        .setScaling(rule.data.tpGraphLow, rule.data.tpGraphHigh)
        .setScale(rule.data.tpGraphScale);
    }
    // Date
    this.tooltipHandler.updateDate();
  }

  apply(key?: string): this {
    if (key !== undefined && key === 'tooltip') {
      if (this.isMatched(key) && this.getMatchValue(key) === true) {
        if (this.tooltipHandler != null && this.tooltipHandler.isChecked()) {
          this.mxcell.GF_tooltipHandler = this.tooltipHandler;
        }
        super.apply(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  reset(key?: string): this {
    if (key !== undefined && key === 'tooltip') {
      this.mxcell.GF_tooltipHandler = null;
      if (this.tooltipHandler) this.tooltipHandler.destroy();
      this.tooltipHandler = undefined;
      super.reset(key);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
      this.changed = false;
      this.matched = false;
    }
    return this;
  }
}

class IconState extends GFState {
  keys: string[] = ['icon'];
  constructor(xgraph: XGraph, mxcell: mxCell) {
    super(xgraph, mxcell);
    this.init();
  }

  init() {
    this.addValue('icon', false);
  }

  apply(key?: string): this {
    if (key !== undefined && key === 'tooltip') {
      if (this.isMatched(key) && this.getMatchValue(key) === true) {
        this.xgraph.addOverlay(`WARNING/ERROR`, this.mxcell);
        super.apply(key);
      }
    } else {
      this.keys.forEach(key => {
        this.apply(key);
      });
    }
    return this;
  }

  reset(key?: string): this {
    if (key !== undefined && key === 'icon') {
      this.xgraph.removeOverlay(this.mxcell);
      super.reset(key);
    } else {
      this.keys.forEach(key => {
        this.reset(key);
      });
      this.changed = false;
      this.matched = false;
    }
    return this;
  }
}
