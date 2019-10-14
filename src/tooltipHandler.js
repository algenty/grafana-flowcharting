/**
 *
 *
 * @export
 * @class TooltipHandler
 */
export default class TooltipHandler {
  constructor(cell) {
    this.defaultColor = '#8c8980';
    this.timeFormat = 'YYYY-MM-DD HH:mm:ss'
    this.metrics = [];
    cell.GF_tooltip = this;
  }

  addMetric(name, label, value, color, direction) {
    let metric = this.findTooltipValue(name);
    this.checked = true;
    let found = (metric != null ? true : false);
    if(!found) {
      metric = {
        graphOptions: {}
      }
    }
    metric.name = name;
    metric.label = label;
    metric.value = value;
    metric.color = (color!= null? color: this.defaultColor);
    metric.direction = direction;
    if(!found) this.metrics.push(metric)
  }

  addGraph(name, type, size, serie) {
    let metric = this.findTooltipValue(name);
    let found = (metric != null ? true : false);
    if (!found) {
      metric = {
        graphOptions: {}
      }
    }
    metric.name = name;
    metric.graph = true;
    metric.graphOptions.type = type;
    metric.graphOptions.size = size;
    metric.graphOptions.serie = serie
    if(!found) this.metrics.push(metric);
  }

  updateDate() {
    this.lastChange = this.ctrl.dashboard.formatDate(new Date(), this.timeFormat);
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

  getTooltipDiv(parentDiv) {
    if (this.div != null) return this.div;
    if (!this.checked) return null;
    this.div = document.createElement('div');
    if (parentdiv) parentDiv.appendChild(this.div);
    if(this.metrics.length > 0) {
      this.getDateDiv(div);
      let metricsDiv = document.createElement('div');
    }
  }

  getDateDiv(parentDiv) {
    let div = document.createElement('div');
    if (parentdiv) parentDiv.appendChild(this.div);
    div.className = 'graph-tooltip-time';
    div.innerHTML = `</br>${date}`;
    return div;
  }

  getMetricDiv(metric,parentDiv) {
    
  }

}