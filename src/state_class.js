export default class State {
  constructor(mxcell, xgraph) {
    u.log(1, 'State.constructor()');
    this.mxcell = mxcell;
    this.cellId = mxcell.id;
    this.xgraph = xgraph;
    this.matched = false;
    this.matchedShape = false;
    this.matchedText = false;
    this.matchedLink = false;
    this.globalLevel = -1;
    this.styles = ['fillColor', 'strokeColor', 'fontColor'];
    this.level = {
      fillColor: -1,
      strokeColor: -1,
      fontColor: -1,
    };
    this.currentColors = {};
    this.originalColors = {};
    this.originalValue = this.xgraph.getValueCell(mxcell);
    this.currentValue = this.originalValue;
    let link = this.xgraph.getLink(mxcell);
    if (link === undefined) link = null;
    this.originalLink = link;
    this.currentLink = link;

    this.styles.forEach((style) => {
      const color = this.xgraph.getStyleCell(mxcell, style);
      this.currentColors[style] = color;
      this.originalColors[style] = color;
    });
  }

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

      // SHAPE
      let cellProp = this.getCellProp(rule.data.shapeProp);
      shapeMaps.forEach((shape) => {
        if (!shape.isHidden() && shape.match(cellProp)) {
          this.matchedShape = true;
          this.matched = true;
          if (this.globalLevel <= level) {
            this.setLevelStyle(rule.data.style, level);
            if (rule.toColorize(value)) {
              this.setColorStyle(rule.data.style, rule.getColorForValue(value));
            }
            this.overlayIcon = rule.toIconize(value);
          }
        }
      });

      // TEXT
      cellProp = this.getCellProp(rule.data.textProp);
      textMaps.forEach((text) => {
        if (!text.isHidden() && text.match(cellProp)) {
          this.matchedText = true;
          this.matched = true;
          if (this.globalLevel <= level) {
            if (rule.toValorize(value)) {
              this.setText(rule.getReplaceText(this.originalValue, FormattedValue));
            } else {
              // Hide text
              this.setText(rule.getReplaceText(this.originalValue, ''));
            }
          }
        }
      });
      // LINK
      cellProp = this.getCellProp(rule.data.linkProp);
      linkMaps.forEach((link) => {
        if (!link.isHidden() && link.match(cellProp)) {
          this.matchedLink = true;
          this.matched = true;
          if (this.globalLevel <= level) {
            if (rule.toLinkable(value)) {
              this.currentLink = rule.getLink();
            }
          }
        }
      });
    }
    u.log(0, 'State.setState() state', this);
  }

  unsetState() {
    u.log(1, 'State.unsetState()');
    this.unsetLevel();
    this.unsetColor();
    this.unsetText();
    this.unsetLink();
    this.matched = false;
    this.matchedShape = false;
    this.matchedText = false;
    this.matchedLink = false;
    u.log(0, 'State.unsetState() state', this);
  }

  getCellProp(prop) {
    if (prop === 'id') return this.cellId;
    if (prop === 'value') return this.originalValue;
    return '/!\\ Not found';
  }

  setColorStyle(style, color) {
    u.log(1, 'State.setColorStyle()');
    this.currentColors[style] = color;
  }

  unsetColorStyle(style) {
    this.currentColors[style] = this.originalColors[style];
  }

  unsetColor() {
    this.styles.forEach((style) => {
      this.unsetColorStyle(style);
    });
  }

  getCurrentColorStyle(style) {
    return this.currentColors[style];
  }

  getOriginalColorStyle(style) {
    return this.originalColors[style];
  }

  unsetLevelStyle(style) {
    this.level[style] = -1;
  }

  unsetLevel() {
    this.styles.forEach((style) => {
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
    // this.cell.setValue(text);
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

  applyState() {
    u.log(1, 'State.applyState()');
    if (this.matched) {
      if (this.matchedShape) {
        this.styles.forEach((style) => {
          // Apply colors
          this.xgraph.setStyleCell(this.mxcell, style, this.getCurrentColorStyle(style));
        });
        // Apply icons
        if (this.overlayIcon) {
          this.xgraph.addOverlay(this.getTextLevel(), this.mxcell);
        } else {
          this.xgraph.removeOverlay(this.mxcell);
        }
      }
      if (this.matchedText) {
        this.xgraph.setValueCell(this.mxcell, this.getCurrentText());
      }
      if (this.matchedLink) {
        this.xgraph.addLink(this.mxcell, this.currentLink);
      }
    } else this.restoreCell();
  }

  restoreCell() {
    this.unsetState();
    this.styles.forEach((style) => {
      this.xgraph.setStyleCell(this.mxcell, style, this.getCurrentColorStyle(style));
    });
    this.xgraph.setValueCell(this.mxcell, this.getCurrentText());
    // this.mxcell.setAttribute('link', this.getCurrentLink());
    this.xgraph.removeOverlay(this.mxcell);
    this.xgraph.addLink(this.mxcell, this.originalLink);
  }

  prepare() {
    this.unsetState();
  }
}
