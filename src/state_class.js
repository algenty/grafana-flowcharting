/**
 *Class for state of one cell
 *
 * @export
 * @class State
 */
export default class State {
  /**
   *Creates an instance of State.
   * @param {mxCell} mxcell
   * @param {XGraph} xgraph
   * @param {*} ctrl - ctrl panel
   * @memberof State
   */
  constructor(mxcell, xgraph, ctrl) {
    u.log(1, 'State.constructor()');
    this.mxcell = mxcell;
    this.cellId = mxcell.id;
    this.xgraph = xgraph;
    this.ctrl = ctrl;
    this.templateSrv = this.ctrl.templateSrv;
    this.changed = false;
    this.matched = false;
    this.matchedShape = false;
    this.matchedText = false;
    this.matchedLink = false;
    this.globalLevel = -1;
    this.styles = ['fillColor', 'strokeColor', 'fontColor'];
    this.level = {
      fillColor: -1,
      strokeColor: -1,
      fontColor: -1
    };
    this.tooltips = [];
    this.currentColors = {};
    this.originalColors = {};
    this.originalValue = this.xgraph.getLabel(mxcell);
    this.currentValue = this.originalValue;
    let link = this.xgraph.getLink(mxcell);
    if (link === undefined) link = null;
    this.originalLink = link;
    this.currentLink = link;

    this.styles.forEach(style => {
      const color = this.xgraph.getStyleCell(mxcell, style);
      this.currentColors[style] = color;
      this.originalColors[style] = color;
    });
  }

  /**
   *Define state according to 1 rule and 1 serie without apply display
   *
   * @param {Rule} rule
   * @param {Serie} serie
   * @memberof State
   */
  setState(rule, serie) {
    u.log(1, 'State.setState()');
    u.log(0, 'State.setState() Rule', rule);
    u.log(0, 'State.setState() Serie', serie);
    if (rule.matchSerie(serie)) {
      const shapeMaps = rule.getShapeMaps();
      const textMaps = rule.getTextMaps();
      const linkMaps = rule.getLinkMaps();
      const value = rule.getValueForSerie(serie);
      const FormattedValue = rule.getFormattedValue(value);
      const level = rule.getThresholdLevel(value);
      const color = rule.getColorForLevel(level);
      const tooltipTimeFormat = 'YYYY-MM-DD HH:mm:ss';
      const time = this.ctrl.dashboard.formatDate(new Date(), tooltipTimeFormat);

      // SHAPE
      let cellProp = this.getCellProp(rule.data.shapeProp);
      shapeMaps.forEach(shape => {
        if (!shape.isHidden() && shape.match(cellProp)) {
          this.matchedShape = true;
          this.matched = true;
          // tooltips
          if (rule.toTooltipize(level)) {
            if (rule.data.tooltipColors)
              this.addTooltipValue(rule.data.tooltipLabel, FormattedValue, color);
            else this.addTooltipValue(rule.data.tooltipLabel, FormattedValue, null);
            this.lastChange = time;
          }

          // Color Shape
          if (this.globalLevel <= level) {
            this.setLevelStyle(rule.data.style, level);
            if (rule.toColorize(level)) {
              this.setColorStyle(rule.data.style, color);
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
            const textScoped = this.templateSrv.replaceWithText(FormattedValue);
            this.setText(rule.getReplaceText(this.originalValue, textScoped));
          } else {
            // Hide text
            this.setText(rule.getReplaceText(this.originalValue, ''));
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
              const linkScoped = this.templateSrv.replaceWithText(rule.getLink());
              this.currentLink = linkScoped;
            }
          }
        }
      });
    }
    u.log(0, 'State.setState() state', this);
  }

  /**
   *Restore initial status of state without apply display.
   * Use applyState() to apply on graph (color, level and text)
   *
   * @memberof State
   */
  unsetState() {
    u.log(1, 'State.unsetState()');
    this.lastChange = null;
    this.unsetLevel();
    this.unsetColor();
    this.unsetText();
    this.unsetLink();
    this.unsetTooltip();
    this.matched = false;
    this.matchedShape = false;
    this.matchedText = false;
    this.matchedLink = false;
    u.log(0, 'State.unsetState() state', this);
  }

  /**
   *Flag to indicate state is matching by a rule and series
   *
   * @returns {boolean}
   * @memberof State
   */
  isMatched() {
    return this.matched;
  }

  /**
   *Flag to indicate state is changed, need apply state
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
    if (prop === 'id') return this.cellId;
    if (prop === 'value') return this.originalValue;
    return '/!\\ Not found';
  }

  /**
   *Define color for a style
   *
   * @param {string} style - fillcolor|fontcolor|stroke
   * @param {string} color - html color
   * @memberof State
   */
  setColorStyle(style, color) {
    u.log(1, 'State.setColorStyle()');
    this.currentColors[style] = color;
  }

  /**
   *Restore initial color of cell for a style
   *
   * @param {string} style - fillcolor|fontcolor|stroke
   * @memberof State
   */
  unsetColorStyle(style) {
    this.currentColors[style] = this.originalColors[style];
  }

  /**
   *Restore initial color of cell
   *
   * @memberof State
   */
  unsetColor() {
    this.styles.forEach(style => {
      this.unsetColorStyle(style);
    });
  }


  /**
   *Return current html color for a style
   *
   * @param {string} style - fillcolor|fontcolor|stroke
   * @returns {string} HTML color
   * @memberof State
   */
  getCurrentColorStyle(style) {
    return this.currentColors[style];
  }

  /**
   *Return initial html color for a style
   *
   * @param {string} style - fillcolor|fontcolor|stroke
   * @returns {string} HTML color
   * @memberof State
   */
  getOriginalColorStyle(style) {
    return this.originalColors[style];
  }

  unsetLevelStyle(style) {
    this.level[style] = -1;
  }

  unsetTooltip() {
    this.tooltips = [];
    this.mxcell.GF_tooltips = undefined;
    this.mxcell.GF_lastChange = undefined;
  }

  unsetLevel() {
    this.styles.forEach(style => {
      this.unsetLevelStyle(style);
    });
    this.globalLevel = -1;
  }

  setLevelStyle(style, level) {
    u.log(1, 'State.setLevelStyle()');
    this.level[style] = level;
    if (this.globalLevel < level) this.globalLevel = level;
  }

  getLevelStyle(style) {
    return this.level[style];
  }

  getLevel() {
    return this.globalLevel;
  }

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

  setText(text) {
    this.currentValue = text;
  }

  getCurrentText() {
    return this.currentValue;
  }

  unsetText() {
    this.currentValue = this.originalValue;
  }

  setLink(url) {
    this.currentLink = url;
  }

  unsetLink() {
    this.currentLink = this.originalLink;
  }

  getCurrentLink() {
    return this.currentLink;
  }

  addTooltipValue(name, value, color) {
    u.log(1, 'State.addTooltipValue()');
    u.log(0, 'State.addTooltipValue() name', name);
    u.log(0, 'State.addTooltipValue() value', value);
    let element = this.findTooltipValue(name);
    if (element === null) {
      element = {
        name: name,
        value: value,
        color: color
      };
      this.tooltips.push(element);
    } else {
      element.value = value;
      element.color = color;
    }
  }

  // removeTooltipValue(name) {
  //   u.log(1, 'State.removeTooltipValue()');
  //   u.log(0, 'State.removeTooltipValue() name', name);
  //   for (let index = 0; index < this.tooltips.length; index += 1) {
  //     const element = this.tooltips[index];
  //     if (element.name === name) {
  //       this.tooltips.slice(index, 1);
  //       return;
  //     }
  //   }
  // }

  findTooltipValue(name) {
    for (let index = 0; index < this.tooltips.length; index += 1) {
      const element = this.tooltips[index];
      if (element.name === name) return element;
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  isGradient() {
    // TODO:
  }

  isShape() {
    return this.mxcell.isVertex();
  }

  isConnector() {
    return this.mxcell.isEdge();
  }

  applyShape() {
    // Apply colors
    this.styles.forEach(style => {
      const color = this.getCurrentColorStyle(style);
      this.xgraph.setStyleCell(this.mxcell, style, color);
    });
    // Apply icons
    if (this.overlayIcon) {
      this.xgraph.addOverlay(this.getTextLevel(), this.mxcell);
    } else {
      this.xgraph.removeOverlay(this.mxcell);
    }
  }

  applyText() {
    let text = this.getCurrentText();
    this.xgraph.setLabelCell(this.mxcell, this.getCurrentText());
  }

  applyLink() {
    this.xgraph.addLink(this.mxcell, this.currentLink);
  }

  applyTooltip() {
    if (this.tooltips.length > 0) {
      this.mxcell.GF_lastChange = this.lastChange;
      this.mxcell.GF_tooltips = this.tooltips;
    }
  }

  applyState() {
    u.log(1, 'State.applyState()');
    if (this.matched) {
      this.changed = true;

      // TOOLTIP
      this.applyTooltip();

      // SHAPES
      if (this.matchedShape) {
        this.applyShape();
        this.changedShape = true;
      } else if (this.changedShape) {
        this.unsetColor();
        this.applyShape();
        this.changedShape = false;
      }

      // TEXTS
      if (this.matchedText) {
        this.applyText();
        this.changedText = true;
      } else if (this.changedText) {
        this.unsetText();
        this.applyText();
        this.changedText = false;
      }

      // LINKS
      if (this.matchedLink) {
        this.applyLink();
        this.changedLink = true;
      } else if (this.changedLink) {
        this.unsetLink();
        this.applyLink();
        this.changedLink = false;
      }
    } else if (this.changed) this.restore();
  }

  restore() {
    this.unsetState();
    this.applyShape();
    this.applyText()
    this.applyLink();
    this.changed = false;
    this.changedShape = false;
    this.changedText = false;
    this.changedLink = false;

  }

  prepare() {
    // this.unsetState();
    this.lastChange = null;
    this.unsetLevel();
    this.unsetTooltip();
    this.matched = false;
    this.matchedShape = false;
    this.matchedText = false;
    this.matchedLink = false;
    this.tooltips = [];
  }
}
