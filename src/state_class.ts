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
  changedShape = false;
  changedStyle: gf.TIStylesBoolean;
  changedText = false;
  changedLink = false;
  matched = false;
  matchedShape = false;
  matchedStyle: gf.TIStylesBoolean;
  matchedText = false;
  matchedLink = false;
  globalLevel = -1;
  styleKeys: gf.TStyleArray = ['fillColor', 'strokeColor', 'fontColor', 'imageBorder', 'imageBackground'];
  level: gf.TIStylesNumber;
  tooltipHandler: TooltipHandler | null = null;
  currentColors: gf.TIStylesString;
  originalColors: gf.TIStylesString;
  originalStyle: string;
  originalText: string;
  currentText: string;
  originalLink: string | null;
  currentLink: string | null;
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
    // If Cell is modified
    this.changedStyle = State.getDefaultFlagStyles();

    // If state is target
    this.matchedStyle = State.getDefaultFlagStyles();
    this.level = State.getDefaultLevelStyles();
    this.tooltipHandler = null;
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
      const color: string | null = this.xgraph.getStyleCell(mxcell, style);
      this.currentColors[style] = color;
      this.originalColors[style] = color;
    });
  }

  static getDefaultValueStyles(): gf.TIStylesString {
    return {
      fillColor: null,
      strokeColor: null,
      fontColor: null,
      imageBorder: null,
      imageBackground: null,
    };
  }

  static getDefaultLevelStyles(): gf.TIStylesNumber {
    return {
      fillColor: -1,
      strokeColor: -1,
      fontColor: -1,
      imageBorder: -1,
      imageBackground: -1,
    };
  }

  static getDefaultFlagStyles(): gf.TIStylesBoolean {
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
      const value = rule.getValueForMetric(metric);
      const FormattedValue = rule.getFormattedValue(value);
      const level = rule.getThresholdLevel(value);
      const color = rule.getColorForLevel(level);

      // SHAPE
      let cellProp = this.getCellProp(rule.data.shapeProp);
      shapeMaps.forEach(shape => {
        if (!shape.isHidden() && shape.match(cellProp)) {
          this.matchedShape = true;
          this.matched = true;
          // tooltips
          if (rule.toTooltipize(level)) {
            // Metrics
            if (this.tooltipHandler === null || this.tooltipHandler === undefined) {
              this.tooltipHandler = new TooltipHandler(this.mxcell);
            }
            let tpColor: string | null = null;
            let label: string = rule.data.tooltipLabel;
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
            const metricToolip = this.tooltipHandler
              .addMetric()
              .setLabel(label)
              .setValue(FormattedValue)
              .setColor(tpColor)
              .setDirection(rule.data.tpDirection);
            // Graph
            if (rule.data.tpGraph) {
              const graph = metricToolip.addGraph(rule.data.tpGraphType);
              graph
                .setColor(tpColor)
                .setColumn(rule.data.column)
                .setMetric(metric)
                .setSize(rule.data.tpGraphSize)
                .setScaling(rule.data.tpGraphLow, rule.data.tpGraphHigh);
            }
            // Date
            this.tooltipHandler.updateDate();
          }

          // Color Shape
          if (this.globalLevel <= level) {
            this.setLevelStyle(shape.data.style, level);
            if (shape.toColorize(level)) {
              this.setColorStyle(shape.data.style, color);
              this.matchedStyle[shape.data.style] = true;
            } else if (this.changedShape) {
              if (this.changedStyle[shape.data.style]) {
                this.unsetColorStyle(shape.data.style);
              }
            }
            this.overlayIcon = rule.toIconize(level);
            if (level >= rule.highestLevel) {
              rule.highestLevel = level;
              rule.highestFormattedValue = FormattedValue;
              rule.highestColor = color;
            }
          }
        }
      });

      // TEXT
      cellProp = this.getCellProp(rule.data.textProp);
      textMaps.forEach(text => {
        if (!text.isHidden() && text.match(cellProp)) {
          this.matchedText = true;
          this.matched = true;
          if (text.toLabelize(level)) {
            const textScoped = GFP.replaceWithText(FormattedValue);
            this.setText(text.getReplaceText(this.currentText, textScoped));
          } else {
            // Hide text
            this.setText(text.getReplaceText(this.currentText, ''));
          }
          if (level >= rule.highestLevel) {
            rule.highestLevel = level;
            rule.highestFormattedValue = FormattedValue;
            rule.highestColor = color;
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
            if (link.toLinkable(level)) {
              const linkScoped = GFP.replaceWithText(link.getLink());
              this.setLink(linkScoped);
            }
            if (level >= rule.highestLevel) {
              rule.highestLevel = level;
              rule.highestFormattedValue = FormattedValue;
              rule.highestColor = color;
            }
          }
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
    return this;
  }

  /**
   * Flag to indicate state is matching by a rule and series
   *
   * @returns {boolean}
   * @memberof State
   */
  isMatched(): boolean {
    return this.matched;
  }

  /**
   * Flag to indicate state is changed, need apply state
   *
   * @returns {boolean}
   * @memberof State
   */
  isChanged(): boolean {
    return this.changed;
  }

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
  setColorStyle(style: gf.TStyleKey, color: string): this {
    GFP.log.info('State.setColorStyle()');
    this.currentColors[style] = color;
    return this;
  }

  /**
   * Return color of style
   *
   * @param {gf.TStyleKey} style
   * @memberof State
   */
  getColorStyle(style: gf.TStyleKey): string | null {
    return this.currentColors[style];
  }

  /**
   * Reset color with initial color
   *
   * @returns {this}
   * @param {string} style - fillcolor|fontcolor|stroke
   * @memberof State
   */
  unsetColorStyle(style: gf.TStyleKey): this {
    this.currentColors[style] = this.originalColors[style];
    return this;
  }

  /**
   * Restore initial color of cell
   *
   * @returns {this}
   * @memberof State
   */
  unsetColor(): this {
    this.styleKeys.forEach(style => {
      this.unsetColorStyle(style);
    });
    return this;
  }

  /**
   * Reset default level (-1) for the style
   *
   * @returns {this}
   * @param {string} style - fillcolor|fontcolor|stroke
   * @memberof State
   */
  unsetLevelStyle(style: gf.TStyleKey): this {
    this.level[style] = -1;
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
   * Reset level to -1 for all style
   *
   * @returns {this}
   * @memberof State
   */
  unsetLevel(): this {
    this.styleKeys.forEach((style: gf.TStyleKey) => {
      this.unsetLevelStyle(style);
    });
    this.globalLevel = -1;
    return this;
  }

  /**
   * Attribute a level for a style
   *
   * @returns {this}
   * @param {TStyleKeyDisable} style
   * @param {number} level
   * @memberof State
   */
  setLevelStyle(style: gf.TStyleKey, level: number): this {
    GFP.log.info('State.setLevelStyle()');
    this.level[style] = level;
    if (this.globalLevel < level) {
      this.globalLevel = level;
    }
    return this;
  }

  /**
   * Retrun the level for a style
   *
   * @param {TStyleKey} style
   * @returns {number}
   * @memberof State
   */
  getLevelStyle(style: gf.TStyleKey): number {
    return this.level[style];
  }

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
  getTextLevel(): string {
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
   * @returns {this}
   * @param {string} text
   * @memberof State
   */
  setText(text: string): this {
    this.currentText = text;
    return this;
  }

  /**
   * Reset the current label with the initial label
   *
   * @returns {this}
   * @memberof State
   */
  unsetText(): this {
    this.currentText = this.originalText;
    return this;
  }

  /**
   * Assign new link
   *
   * @returns {this}
   * @param {string} url
   * @memberof State
   */
  setLink(url: string): this {
    this.currentLink = url;
    return this;
  }

  /**
   * Reset current link with original/initial link
   *
   * @returns {this}
   * @memberof State
   */
  unsetLink(): this {
    this.currentLink = this.originalLink;
    return this;
  }

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
  applyShape(): this {
    this.changedShape = true;
    this.applyStyle();
    this.applyIcon();
    return this;
  }

  /**
   * Apply Styles to shape
   *
   * @returns {this}
   * @memberof State
   */
  applyStyle(): this {
    this.styleKeys.forEach(key => {
      if (this.matchedStyle[key]) {
        const color = this.currentColors[key];
        this.xgraph.setStyleCell(this.mxcell, key, color);
        if (color !== this.originalColors[key]) {
          this.changedStyle[key] = true;
        }
      }
    });
    return this;
  }

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
      this.xgraph.addOverlay(this.getTextLevel(), this.mxcell);
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
  resetShape(): this {
    this.changedShape = false;
    this.resetStyle();
    this.resetIcon();
    return this;
  }

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
  resetStyle(): this {
    this.unsetColor();
    this.xgraph.setStyles(this.mxcell, this.originalStyle);
    this.styleKeys.forEach(key => {
      this.changedStyle[key] = false;
    });
    return this;
  }

  /**
   * Apply new label
   *
   * @memberof State
   */
  applyText(): this {
    this.changedText = true;
    this.xgraph.setLabelCell(this.mxcell, this.currentText);
    return this;
  }

  /**
   * Reset text with the source value
   *
   * @returns {this}
   * @memberof State
   */
  resetText(): this {
    this.changedText = false;
    this.unsetText();
    this.xgraph.setLabelCell(this.mxcell, this.originalText);
    return this;
  }

  /**
   * Apply new link
   *
   * @returns {this}
   * @memberof State
   */
  applyLink(): this {
    this.changedLink = true;
    this.xgraph.addLink(this.mxcell, this.currentLink);
    return this;
  }

  /**
   * Reset link
   *
   * @returns {this}
   * @memberof State
   */
  resetLink(): this {
    this.changedLink = false;
    this.unsetLink();
    this.xgraph.addLink(this.mxcell, this.originalLink);
    return this;
  }

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
    return this;
  }

  /**
   * Reset and restore state
   *
   * @returns {this}
   * @memberof State
   */
  reset(): this {
    this.resetShape();
    this.resetText();
    this.resetLink();
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
      this.unsetLevel();
      this.unsetTooltip();
      this.unsetText();
      this.matched = false;
      this.matchedShape = false;
      this.matchedText = false;
      this.matchedLink = false;
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
