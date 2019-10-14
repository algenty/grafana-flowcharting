/**
 *
 *
 * @export
 * @class TooltipHandler
 */
export default class TooltipHandler {
  constructor(cell) {
    this.mxcell = cell;
    this.metrics = [];
  }

  addMetric(name,label,value,color) {
    let metric = this.findTooltipValue(name);
    this.checked = true;
    if (metric === null) {
      metric = {
        name: name,
        label:label,
        value: value,
        color: color,
        direction: direction,
      };
      this.metrics.push(metric);
    } else {
      metric.value = value;
      metric.color = color;
      metric.direction = direction; 
    }
  }

  findTooltipValue(name) {
    for (let index = 0; index < this.metrics.length; index += 1) {
      const metric = this.metrics[index];
      if (metric.name === name) return metric;
    }
    return null;
  }

  destroy() {
    delete this.cell.GF_tooltip;
  }
}