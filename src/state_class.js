export default class State {
  constructor(mxcell, xgraph) {
    u.log(1,"State.constructor()");
    this.mxcell = mxcell;
    this.cellId = mxcell.id;
    this.xgraph = xgraph;
    this.matched = false;
    this.matchedShape = false;
    this.matchedText = false;
    this.matchedLink = false;
    this.globalLevel = -1;
    this.styles = ["fillColor", "strokeColor", "fontColor"]
    this.level = {
      fillColor: -1,
      strokeColor: -1,
      fontColor: -1
    }
    this.currentColors = {}
    this.originalColors = {}
    this.originalValue = this.xgraph.getValueCell(mxcell);
    this.currentValue = this.originalValue;
    this.originalLink = mxcell.getAttribute("link");
    this.currentLink = mxcell.getAttribute("link");

    this.styles.forEach(style => {
      let color = this.xgraph.getStyleCell(mxcell, style);
      this.currentColors[style] = color;
      this.originalColors[style] = color;
    });

  }

  setState(rule, serie) {
    u.log(1,"state_class.setState()");
    u.log(0,"state_class.setState() Rule",rule);
    u.log(0,"state_class.setState() Serie",serie);
    if (rule.matchSerie(serie)) {
      let shapeMaps = rule.getShapeMaps();
      let textMaps = rule.getTextMaps();
      let linkMaps = rule.getTextMaps();
      let value = rule.getValueForSerie(serie);
      let FormattedValue = rule.getFormattedValue(value);
      let level = rule.getThresholdLevel(value);
      //SHAPE
      let cellProp = this.getCellProp(rule.data.shapeProp);
      shapeMaps.forEach(shape => {
        if (!shape.isHidden() && shape.match(cellProp)) {
          this.matchedShape = true;
          this.matched = true;
          if (this.globalLevel <= level) {
            this.setLevelStyle(rule.data.style, level);
            if (rule.toColorize()) {
              this.setColorStyle(rule.data.style, rule.getColorForValue(value));
            }
          }
        }
      });
      //TEXT
      cellProp = this.getCellProp(rule.data.textProp);
      textMaps.forEach(text => {
        if (!text.isHidden() && text.match(cellProp)) {
          this.matchedText = true;
          this.matched = true;
          if (this.globalLevel <= level) {
            this.setText(rule.getReplaceText(this.originalValue, FormattedValue))
          }
        }
      });
      // LINK
      cellProp = this.getCellProp(rule.data.linkProp);
      linkMaps.forEach(link => {
        if (!link.isHidden() && link.match(cellProp)) {
          this.matchedLink = true;
          this.matched = true;

        }
      });
    }
  }

  unsetState() {
    u.log(1,"State.unsetState()");
    this.unsetLevel();
    this.unsetColor();
    this.unsetText();
    this.unsetLink();
    this.matched = false;
    this.matchedShape = false;
    this.matchedText = false;
    this.matchedLink = false;
  }

  getCellProp(prop) {
    if (prop === "id") return this.cellId;
    if (prop === "value") return this.originalValue;
  }

  setColorStyle(style, color) {
    u.log(1,"State.setColorStyle()");
    this.currentColors[style] = color;
  }

  unsetColorStyle(style) {
    this.currentColors[style] = this.originalColors[style];
    this.currentColors[style]
  }

  unsetColor() {
    this.styles.forEach(style => {
      this.unsetColorStyle(style);
    });
  }

  getCurrentColorStyle(style) {
    return this.currentColors[style];
  }

  unsetLevelStyle(style) {
    this.level[style] = -1;
  }

  unsetLevel() {
    this.styles.forEach(style => {
      this.unsetLevelStyle(style);
    });
    this.globalLevel = -1;
  }

  setLevelStyle(style, level) {
    u.log(1,"State.setLevelStyle()");
    this.level[style] = level;
    if (this.globalLevel < level) this.globalLevel = level;
  }

  getLevelStyle(style) {
    return this.level[style];
  }

  getLevel() {
    return this.globalLevel;
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

  isGradient() {
    //TODO:
  }

  isShape() {
    return this.mxcell.isVertex();
  }

  isConnector() {
    return this.mxcell.isEdge();
  }

  applyState() {
    u.log(1,"State.applyState()");
    if (this.matched) {
      if (this.matchedShape) {
        this.styles.forEach(style => {
          this.xgraph.setStyleCell(this.mxcell, style, this.getCurrentColorStyle(style))
        });
      }
      if (this.matchedText) {
        this.xgraph.setValueCell(this.mxcell, this.getCurrentText());
      }
      //TODO:LINK
    }
    else this.restoreCell();
  }

  restoreCell() {
    this.unsetState();
    this.styles.forEach(style => {
      this.xgraph.setStyleCell(this.mxcell, style, this.getCurrentColorStyle(style));
    });
    this.xgraph.setValueCell(this.mxcell,this.getCurrentText());
    this.mxcell.setAttribute("link", this.getCurrentLink());
  }

  prepare() {
    this.unsetState()
  }
}
