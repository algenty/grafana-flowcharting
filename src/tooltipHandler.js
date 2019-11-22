import moment from 'moment';
import Chartist from 'chartist';

/**
 *
 *
 * @export
 * @class TooltipHandler
 */
export default class TooltipHandler {
  constructor(mxcell) {
    this.defaultColor = '#8c8980';
    this.timeFormat = 'YYYY-MM-DD HH:mm:ss';
    this.mxcell = mxcell;
    this.checked = false;
    this.metrics = [];
    this.lineOptions = {
      showPoint: false,
      showLine: true,
      showArea: true,
      fullWidth: true,
      showLabel: false,
      axisX: {
        showGrid: true,
        showLabel: true,
      },
      axisY: {
        showGrid: true,
        showLabel: true,
      },
      chartPadding: 0,
    };
  }

  isChecked() {
    return this.checked;
  }

  /**
   *
   *
   * @param {*} name
   * @param {*} label
   * @param {*} value
   * @param {*} color
   * @param {*} direction
   * @returns
   * @memberof TooltipHandler
   */
  addMetric(name, label, value, color, direction) {
    let metric = this.findTooltipValue(name);
    this.checked = true;
    let found = (metric != null) ? true : false;
    if (!found) {
      metric = {
        graphOptions: {}
      };
    }
    metric.name = name;
    metric.label = label;
    metric.value = value;
    metric.color = color != null ? color : this.defaultColor;
    metric.direction = direction;
    if (!found) this.metrics.push(metric);
    return metric
  }

  addGraph(name, type, size, serie, low, high) {
    let metric = this.findTooltipValue(name);
    let found = metric != null ? true : false;
    if (!found) {
      metric = {
        graphOptions: {}
      };
    }
    metric.name = name;
    metric.graph = true;
    metric.graphOptions.type = type;
    metric.graphOptions.size = size;
    metric.graphOptions.serie = serie;
    metric.graphOptions.low = low;
    metric.graphOptions.high = high;
    if (!found) this.metrics.push(metric);
  }

  updateDate() {
    let current_datetime = new Date();
    this.lastChange =
      current_datetime.getFullYear() +
      '-' +
      (current_datetime.getMonth() + 1) +
      '-' +
      current_datetime.getDate() +
      ' ' +
      current_datetime.getHours() +
      ':' +
      current_datetime.getMinutes() +
      ':' +
      current_datetime.getSeconds();
  }

  findTooltipValue(name) {
    for (let index = 0; index < this.metrics.length; index += 1) {
      const metric = this.metrics[index];
      if (metric.name === name) return metric;
    }
    return null;
  }

  destroy() {
    if (this.mxcell.GF_tooltipHandler) delete this.mxcell.GF_tooltipHandler;
  }

  getTooltipDiv(parentDiv) {
    if (!this.checked) return null;
    if (this.div != null) {
      if (parentDiv != undefined) parentDiv.appendChild(this.div);
      return this.div;
    }
    this.div = document.createElement('div');
    let div = this.div;
    div.id = this.mxcell.mxObjectId + '_GLOBAL';
    if (parentDiv != undefined) parentDiv.appendChild(div);
    if (this.metrics.length > 0) {
      this.getDateDiv(div);
      let metricsDiv = document.createElement('div');
      div.appendChild(metricsDiv);
      for (let index = 0; index < this.metrics.length; index++) {
        const metric = this.metrics[index];
        if(metric.div) {
          metricsDiv.appendChild(metric.div);
          return metric.div;
        }
        let metricDiv = document.createElement('div');
        metricDiv.className = 'tooltip-metric';
        metricsDiv.appendChild(metricDiv);
        if (metric.direction != null && metric.direction === 'h')
        metricDiv.style = 'display:inline-block;*display:inline;*zoom:1';
        this.getMetricDiv(metric, metricDiv);
        this.getChartDiv(metric, metricDiv);
      }
    }
    return div;
  }

  getDateDiv(parentDiv) {
    let div = document.createElement('div');
    div.id = this.mxcell.mxObjectId + '_DATE';
    if (parentDiv != undefined) parentDiv.appendChild(div);
    div.className = 'graph-tooltip-time tooltip-date';
    div.innerHTML = `${this.lastChange}`;
    return div;
  }

  getMetricDiv(metric, parentDiv) {
    u.log(1,`TooltipHandler[${this.mxcell.mxObjectId}].getMetricDiv()`);
    u.log(0,`TooltipHandler[${this.mxcell.mxObjectId}].getMetricDiv() metric`, metric);
    let div = document.createElement('div');
    div.id = this.mxcell.mxObjectId + '_METRIC_' + metric.name;
    div.style = 'padding-bottom: 10px';
    let string = '';
    if (parentDiv != undefined) parentDiv.appendChild(div);
    if (metric !== undefined) {
      string += `${metric.label} : `;
      string += `<span style="color:${metric.color};"><b>${metric.value}</b></span>`;
    }
    div.innerHTML = string;
    return div;
  }

  getChartDiv(metric, parentDiv) {
    let div = document.createElement('div');
    div.className = 'tooltip-graph';
    if (parentDiv != undefined) parentDiv.appendChild(div);
    if (metric.graph) {
      if (metric.graphOptions.type === 'line') this.getLineChartDiv(metric, div);
    }
    return div;
  }

  getLineChartDiv(metric, parentDiv) {
    let serie = metric.graphOptions.serie;
    let data = TooltipHandler.array2Coor(serie.flotpairs);
    let div = document.createElement('div');
    if (parentDiv != undefined) parentDiv.appendChild(div);
    let color = metric.color;
    div.className = 'ct-chart ct-golden-section';
    if (metric.graphOptions.size != null) {
      div.style = `width:${metric.graphOptions.size.split('|')[0]};`;
      this.lineOptions.axisX.labelInterpolationFnc = function(value, index) {
	  return index % Math.ceil(data.labels.length / metric.graphOptions.size.split('|')[1]) === 0 ? value : null;
	}
    }
    if (metric.graphOptions.low != null) this.lineOptions.low = metric.graphOptions.low;
    if (metric.graphOptions.high != null) this.lineOptions.high = metric.graphOptions.high;
    let chart = new Chartist.Line(div, data, this.lineOptions);
    metric.graphOptions.chart = chart;
    chart.on('draw', function(_data) {
      if (_data.type === 'line' || _data.type === 'grid') {
        _data.element.attr({
          style: `stroke: ${color}`
        });
      }
      if (_data.type === 'area') {
        _data.element.attr({
          style: `fill: ${color}`
        });
      }
      if (_data.type === 'label') {
	_data.element.getNode().childNodes.forEach((child) => {
	  child.style.color = color;
	});
      }
      if (_data.type === 'line' || _data.type === 'area') {
        _data.element.animate({
          d: {
            begin: 1000 * _data.index,
            dur: 1000,
            from: _data.path
              .clone()
              .scale(1, 0)
              .translate(0, _data.chartRect.height())
              .stringify(),
            to: _data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      }
    });
    return div;
  }

  static array2Coor(arr) {
    const timeFormat = 'MM/DD HH:mm';
    let data = {
      labels: [], 
      series: []
    };
    let serie = [];

    for (let index = 0; index < arr.length; index++) {
      data.labels.push(moment.unix(arr[index][0]/1000).format(timeFormat))
    }
    for (let index = 0; index < arr.length; index++) {
      serie.push(arr[index][1]);
    }
    data.series.push(serie);

    return data;
  }
}
