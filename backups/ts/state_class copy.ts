import TooltipHandler from './tooltipHandler';
// import FlowChartingPlugin from './plugin';

declare var GFP: any;
// type typeColor = 'fillColor' | 'strokeColor' | 'fontColor' | 'imageBorder' | 'imageBackground';
interface TIStringStyles {
  fillColor: string | undefined;
  strokeColor: string | undefined;
  fontColor: string | undefined;
  imageBorder: string | undefined;
  imageBackground: string | undefined;
}

interface TIBooleanStyles {
  fillColor: boolean;
  strokeColor: boolean;
  fontColor: boolean;
  imageBorder: boolean;
  imageBackground: boolean;
}

interface TINumberStyles {
  fillColor: number;
  strokeColor: number;
  fontColor: number;
  imageBorder: number;
  imageBackground: number;
}

type TStyleColor = keyof TIStringStyles;

/**
 * Class for state of one cell
 *
 * @export
 * @class State
 */
export default class State {
  mxcell: any;
  cellId: any;
  xgraph: any;
  ctrl: any;
  templateSrv: any;
  changed: boolean;
  changedShape: boolean;
  changedStyle: TIBooleanStyles;
  changedText: boolean;
  changedLink: boolean;
  matched: boolean;
  matchedShape: boolean;
  matchedStyle: TIBooleanStyles;
  matchedText: boolean;
  matchedLink: boolean;
  globalLevel: number;
  styleKeys: TStyleColor[];
  level: TINumberStyles;
  tooltipHandler: TooltipHandler | undefined;
  currentColors: TIStringStyles;
  originalColors: TIStringStyles;
  originalStyle: any;
  originalText: any;
  currentText: any;
  originalLink: any;
  currentLink: any;
  overlayIcon: any;
  changedIcon: boolean | undefined;
  /**
   * Creates an instance of State.
   * @param {mxCell} mxcell
   * @param {XGraph} xgraph
   * @param {*} ctrl - ctrl panel
   * @memberof State
   */
  constructor(mxcell: any, xgraph: any, ctrl: any) {
    GFP.log.info('State.constructor()');
    this.mxcell = mxcell;
    this.cellId = mxcell.id;
    this.xgraph = xgraph;
    this.ctrl = ctrl;
    this.templateSrv = this.ctrl.templateSrv;
    // If Cell is modified
    this.changed = false;
    this.changedShape = false;
    this.changedStyle = State.getDefaultFlagStyles();
    this.changedText = false;
    this.changedLink = false;

    // If state is target
    this.matched = false;
    this.matchedShape = false;
    this.matchedStyle = State.getDefaultFlagStyles();
    this.matchedText = false;
    this.matchedLink = false;
    this.globalLevel = -1;
    this.styleKeys = ['fillColor', 'strokeColor', 'fontColor', 'imageBorder', 'imageBackground'];
    this.level = State.getDefaultLevelStyles();
    this.tooltipHandler = undefined;
    this.mxcell.GF_tooltipHandler = null;
    this.currentColors = State.getDefaultValueStyles();
    this.originalColors = State.getDefaultValueStyles();
    this.originalStyle = mxcell.getStyle();
    this.originalText = this.xgraph.getLabel(mxcell);
    this.currentText = this.originalText;
    let link = this.xgraph.getLink(mxcell);
    if (link === undefined) {
      link = null;
    }
    this.originalLink = link;
    this.currentLink = link;
    this.styleKeys.forEach(style => {
      const color: string = this.xgraph.getStyleCell(mxcell, style);
      this.currentColors[style] = color;
      this.originalColors[style] = color;
    });
  }

  static getDefaultValueStyles(): TIStringStyles {
    return {
      fillColor: undefined,
      strokeColor: undefined,
      fontColor: undefined,
      imageBorder: undefined,
      imageBackground: undefined,
    };
  }

  static getDefaultLevelStyles(): TINumberStyles {
    return {
      fillColor: -1,
      strokeColor: -1,
      fontColor: -1,
      imageBorder: -1,
      imageBackground: -1,
    };
  }

  static getDefaultFlagStyles(): TIBooleanStyles {
    return {
      fillColor: false,
      strokeColor: false,
      fontColor: false,
      imageBorder: false,
      imageBackground: false,
    };
  }

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
   * @param {Rule} rule
   * @param {Serie} serie
   * @memberof State
   */
  setState(rule, serie) {
    GFP.log.info('State.setState()');
    // GFP.log.debug('State.setState() Rule', rule);
    // GFP.log.debug('State.setState() Serie', serie);
    if (rule.matchSerie(serie)) {
      const shapeMaps = rule.getShapeMaps();
      const textMaps = rule.getTextMaps();
      const linkMaps = rule.getLinkMaps();
      const value = rule.getValueForSerie(serie);
      const FormattedValue = rule.getFormattedValue(value);
      const level = rule.getThresholdLevel(value);
      const color = rule.getColorForLevel(level);

      // SHAPE
      let cellProp = this.getCellProp(rule.data.shapeProp);
      shapeMaps.forEach(shape => {
        if (!shape.isHidden() && shape.match(cellProp)) {
          this.matchedShape = true;
          this.matched = true;
          // Test
          this.mxcell.serie = serie;
          // tooltips
          if (rule.toTooltipize(level)) {
            // Metrics
            if (this.tooltipHandler === undefined) {
              this.tooltipHandler = new TooltipHandler(this.mxcell);
            }
            let tpColor = null;
            const label = rule.data.tooltipLabel == null || rule.data.tooltipLabel.length === 0 ? serie.alias : rule.data.tooltipLabel;
            if (rule.data.tooltipColors) {
              tpColor = color;
            }
            const metric = this.tooltipHandler
              .addMetric()
              .setLabel(label)
              .setValue(FormattedValue)
              .setColor(tpColor)
              .setDirection(rule.data.tpDirection);
            // Graph
            if (rule.data.tpGraph) {
              const graph = metric.addGraph(rule.data.tpGraphType);
              graph
                .setColor(tpColor)
                .setSerie(serie)
                .setSize(rule.data.tpGraphSize)
                .setScaling(rule.data.tpGraphLow, rule.data.tpGraphHigh);
            }
            // Date
            this.tooltipHandler.updateDate();
          }

          // Color Shape
          if (this.globalLevel <= level) {
            this.setLevelStyle(rule.data.style, level);
            if (rule.toColorize(level)) {
              this.setColorStyle(rule.data.style, color);
              this.matchedStyle[rule.data.style] = true;
            } else if (this.changedShape) {
              if (this.changedStyle[rule.data.style]) {
                this.unsetColorStyle(rule.data.style);
              }
            }
            this.overlayIcon = rule.toIconize(level);
          }
        }
      });

      // TEXT
      cellProp = this.getCellProp(rule.data.textProp);
      textMaps.forEach(text => {
        if (!text.isHidden() && text.match(cellProp)) {
          this.matchedText = true;
          this.matched = true;
          if (rule.toLabelize(level)) {
            const textScoped = GFP.replaceWithText(FormattedValue);
            this.setText(rule.getReplaceText(this.currentText, textScoped));
          } else {
            // Hide text
            this.setText(rule.getReplaceText(this.currentText, ''));
          }
        }
      });

      // LINK
      cellProp = this.getCellProp(rule.data.linkProp);
      linkMaps.forEach(link => {
        if (!link.isHidden() && link.match(cellProp)) {
          this.matchedLink = true;
          this.matched = true;
          if (this.globalLevel <= level) {
            if (rule.toLinkable(level)) {
              const linkScoped = GFP.replaceWithText(rule.getLink());
              this.setLink(linkScoped);
            }
          }
        }
      });
    }
    GFP.log.debug('State.setState() state', this);
  }

  /**
   * Restore initial status of state without apply display.
   * Use applyState() to apply on graph (color, level and text)
   *
   * @memberof State
   */
  unsetState() {
    GFP.log.info('State.unsetState()');
    this.unsetLevel();
    // this.unsetColor(); Replace by reset
    this.resetStyle();
    this.unsetText();
    this.unsetLink();
    this.unsetTooltip();
    this.matched = false;
    this.matchedShape = false;
    this.styleKeys.forEach(key => {
      this.matchedStyle[key] = false;
    });
    this.matchedText = false;
    this.matchedLink = false;
  }

  /**
   * Flag to indicate state is matching by a rule and series
   *
   * @returns {boolean}
   * @memberof State
   */
  isMatched() {
    return this.matched;
  }

  /**
   * Flag to indicate state is changed, need apply state
   *
   * @returns {boolean}
   * @memberof State
   */
  isChanged() {
    return this.changed;
  }

  /**
   *
   *
   * @param {string} prop - id|value
   * @returns {string} return original value of id or label of cell
   * @memberof State
   */
  getCellProp(prop) {
    if (prop === 'id') {
      return this.cellId;
    }
    if (prop === 'value') {
      return this.originalText;
    }
    return '/!\\ Not found';
  }

  /**
   * Define color for a style
   *
   * @param {string} style - fillcolor|fontcolor|stroke
   * @param {string} color - html color
   * @memberof State
   */
  setColorStyle(style, color) {
    GFP.log.info('State.setColorStyle()');
    this.currentColors[style] = color;
  }

  /**
   * Reset color with initial color
   *
   * @param {string} style - fillcolor|fontcolor|stroke
   * @memberof State
   */
  unsetColorStyle(style) {
    this.currentColors[style] = this.originalColors[style];
  }

  /**
   * Restore initial color of cell
   *
   * @memberof State
   */
  unsetColor() {
    this.styleKeys.forEach(style => {
      this.unsetColorStyle(style);
    });
  }

  /**
   * Reset default level (-1) for the style
   *
   * @param {string} style - fillcolor|fontcolor|stroke
   * @memberof State
   */
  unsetLevelStyle(style) {
    this.level[style] = -1;
  }

  /**
   * Reset tooltip
   *
   * @memberof State
   */
  unsetTooltip() {
    if (this.tooltipHandler != null) {
      this.tooltipHandler.destroy();
    }
    this.tooltipHandler = undefined;
  }

  /**
   * Reset level to -1 for all style
   *
   * @memberof State
   */
  unsetLevel() {
    this.styleKeys.forEach(key => {
      this.unsetLevelStyle(key);
    });
    this.globalLevel = -1;
  }

  /**
   * Attribute a level for a style
   *
   * @param {string} style - fillcolor|fontcolor|stroke
   * @param {number} level
   * @memberof State
   */
  setLevelStyle(style, level) {
    GFP.log.info('State.setLevelStyle()');
    this.level[style] = level;
    if (this.globalLevel < level) {
      this.globalLevel = level;
    }
  }

  /**
   * Retrun the level for a style
   *
   * @param {string} style - fillcolor|fontcolor|stroke
   * @returns
   * @memberof State
   */
  getLevelStyle(style) {
    return this.level[style];
  }

  /**
   * Get the highest/global level
   *
   * @returns
   * @memberof State
   */
  getLevel() {
    return this.globalLevel;
  }

  /**
   * Return the label level of current level
   *
   * @returns
   * @memberof State
   */
  getTextLevel() {
    const level = this.getLevel();
    switch (level) {
      case -1:
        return 'NO DATA';
      case 0:
        return 'OK';
      case 1:
        return 'WARN';
      case 2:
        return 'ERROR';
      default:
        return 'NULL';
    }
  }

  /**
   * Attribute new label
   *
   * @param {string} text
   * @memberof State
   */
  setText(text) {
    this.currentText = text;
  }

  /**
   * Reset the current label with the initial label
   *
   * @memberof State
   */
  unsetText() {
    this.currentText = this.originalText;
  }

  /**
   * Assign new link
   *
   * @param {string} url
   * @memberof State
   */
  setLink(url) {
    this.currentLink = url;
  }

  /**
   * Reset current link with original/initial link
   *
   * @memberof State
   */
  unsetLink() {
    this.currentLink = this.originalLink;
  }

  /**
   * Add metric to tooltip of shape
   *
   * @param {string} label - Label to display in tooltip
   * @param {string} value - Formatted value
   * @param {string} color - Color for the value
   * @memberof State
   */
  addTooltip(name, label, value, color, direction) {
    GFP.log.info('State.addTooltipValue()');
    GFP.log.debug('State.addTooltipValue() label', label);
    GFP.log.debug('State.addTooltipValue() value', value);
    if (this.tooltipHandler == null) {
      this.tooltipHandler = new TooltipHandler(this.mxcell);
    }
    this.tooltipHandler.addMetric();
  }

  updateTooltipDate() {
    if (this.tooltipHandler) {
      this.tooltipHandler.updateDate();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isGradient() {
    // TODO: next version
  }

  /**
   * Return true if is a shape/vertex
   *
   * @returns
   * @memberof State
   */
  isShape() {
    return this.mxcell.isVertex();
  }

  /**
   * Return true if is a arrow/connector
   *
   * @returns
   * @memberof State
   */
  isConnector() {
    return this.mxcell.isEdge();
  }

  /**
   * Apply and draw new shape color and form
   *
   * @memberof State
   */
  applyShape() {
    this.changedShape = true;
    this.applyStyle();
    this.applyIcon();
  }

  applyStyle() {
    this.styleKeys.forEach(key => {
      if (this.matchedStyle[key]) {
        const color = this.currentColors[key];
        this.xgraph.setStyleCell(this.mxcell, key, color, true);
        if (color !== this.originalColors[key]) {
          this.changedStyle[key] = true;
        }
      }
    });
  }

  applyIcon() {
    // Apply icons
    if (this.overlayIcon) {
      this.changedIcon = true;
      this.xgraph.addOverlay(this.getTextLevel(), this.mxcell);
    } else {
      this.xgraph.removeOverlay(this.mxcell);
    }
  }

  resetShape() {
    this.changedShape = false;
    this.resetStyle();
    this.resetIcon();
  }

  resetIcon() {
    this.changedIcon = false;
    this.xgraph.removeOverlay(this.mxcell);
  }

  /**
   * unset et apply, reset to old style
   *
   * @memberof State
   */
  resetStyle() {
    this.unsetColor();
    this.mxcell.setStyle(this.originalStyle);
    this.styleKeys.forEach(key => {
      this.changedStyle[key] = false;
    });
  }

  /**
   * Apply new label
   *
   * @memberof State
   */
  applyText() {
    this.changedText = true;
    this.xgraph.setLabelCell(this.mxcell, this.currentText);
  }

  resetText() {
    this.changedText = false;
    this.unsetText();
    this.xgraph.setLabelCell(this.mxcell, this.originalText);
  }

  /**
   * Apply new link
   *
   * @memberof State
   */
  applyLink() {
    this.changedLink = true;
    this.xgraph.addLink(this.mxcell, this.currentLink);
  }

  resetLink() {
    this.changedLink = false;
    this.unsetLink();
    this.xgraph.addLink(this.mxcell, this.originalLink);
  }

  /**
   * Apply new tooltip
   *
   * @memberof State
   */
  applyTooltip() {
    if (this.tooltipHandler != null && this.tooltipHandler.isChecked()) {
      this.mxcell.GF_tooltipHandler = this.tooltipHandler;
    }
  }

  /**
   * Apply new state
   *
   * @memberof State
   */
  applyState() {
    GFP.log.info('State.applyState()');
    if (this.matched) {
      this.changed = true;

      // TOOLTIP
      this.applyTooltip();

      // SHAPES
      if (this.matchedShape) {
        this.applyShape();
      } else if (this.changedShape) {
        this.resetShape();
      }

      // TEXTS
      if (this.matchedText) {
        this.applyText();
      } else if (this.changedText) {
        this.resetText();
      }

      // LINKS
      if (this.matchedLink) {
        this.applyLink();
      } else if (this.changedLink) {
        this.resetLink();
      }
    } else if (this.changed) {
      this.reset();
    }
  }

  /**
   * Reset and restore state
   *
   * @memberof State
   */
  reset() {
    this.resetShape();
    this.resetText();
    this.resetLink();
    this.changed = false;
  }

  /**
   * Prepare state for a new rule and serie
   *
   * @memberof State
   */
  prepare() {
    if (this.changed) {
      this.unsetLevel();
      this.unsetTooltip();
      this.unsetText();
      this.matched = false;
      this.matchedShape = false;
      this.matchedText = false;
      this.matchedLink = false;
    }
  }

  /**
   * Highlight mxcell
   *
   * @memberof State
   */
  highlightCell() {
    this.xgraph.highlightCell(this.mxcell);
  }

  /**
   * Unhighlight mxcell
   *
   * @memberof State
   */
  unhighlightCell() {
    this.xgraph.unhighlightCell(this.mxcell);
  }
}
