import Chartist from 'chartist';
import Rule from 'rule_class';
import moment from 'moment';
import Metric from './metric_class';

/**
 *
 *
 * @export
 * @class TooltipHandler
 */
export default class TooltipHandler {
  timeFormat = 'YYYY-MM-DD HH:mm:ss';
  mxcell: mxCell;
  checked = false;
  metrics: Set<MetricTooltip>;
  lastValue: string | undefined;
  div: HTMLHeadingElement | null = null;
  constructor(mxcell: any) {
    this.mxcell = mxcell;
    this.checked = false;
    this.metrics = new Set();
  }

  /**
   * Return if tooltip is available
   *
   * @returns {boolean}
   * @memberof TooltipHandler
   */
  isChecked(): boolean {
    return this.checked;
  }

  /**
   * Add a metric (one value) for tooltip
   * @returns {MetricTooltip}
   * @memberof TooltipHandler
   */
  addMetric(): MetricTooltip {
    this.checked = true;
    const metric = new MetricTooltip();
    this.metrics.add(metric);
    return metric;
  }

  /**
   * Update date in tooltip
   *
   * @memberof TooltipHandler
   */
  updateDate(rule: Rule, metric: Metric) {
    const timeFormat = 'MM/DD/YYYY HH:mm';
    const data = metric.getData(rule.data.column).pop();
    if (data) {
      this.lastValue = moment.unix(data['x'] / 1000).format(timeFormat);
    } else {
      this.lastValue = 'N/A';
    }
  }

  destroy() {
    this.metrics.clear();
    if (this.mxcell.GF_tooltipHandler) {
      delete this.mxcell.GF_tooltipHandler;
    }
  }

  getDiv(parentDiv: HTMLDivElement): HTMLDivElement | null {
    if (this.div !== null && this.div !== undefined) {
      if (parentDiv && this.div) {
        parentDiv.appendChild(this.div);
      }
      return this.div;
    }
    if (!this.checked) {
      return null;
    }
    const div = document.createElement('div');
    if (parentDiv !== undefined) {
      parentDiv.appendChild(div);
    }
    if (this.metrics.size > 0) {
      this.getDateDiv(div);
      this.metrics.forEach((metric: MetricTooltip) => {
        metric.getDiv(div);
      });
    }
    this.div = div;
    return div;
  }

  getDateDiv(parentDiv: HTMLDivElement) {
    const div = document.createElement('div');
    div.id = this.mxcell.mxObjectId + '_DATE';
    if (parentDiv !== undefined) {
      parentDiv.appendChild(div);
    }
    div.className = 'graph-tooltip-time tooltip-date';
    div.innerHTML = `Last value at ${this.lastValue}`;
    return div;
  }
}

/**
 * Create a metric for tooltip
 *
 * @class MetricTooltip
 */
export class MetricTooltip {
  color: string;
  graphs: Set<GraphTooltip>;
  label: string;
  value: string;
  direction: gf.TDirection = 'v';
  div: HTMLDivElement | undefined;
  constructor() {
    this.color = '#8c8980';
    this.graphs = new Set();
    this.label = '';
    this.value = '';
  }

  setLabel(label: string): this {
    this.label = label;
    return this;
  }

  setValue(value: string): this {
    this.value = value;
    return this;
  }

  setColor(color: string | null): this {
    if (color !== null) {
      this.color = color;
    }
    return this;
  }

  setDirection(direction: gf.TDirection): this {
    this.direction = direction;
    return this;
  }

  getDiv(parentDiv: HTMLDivElement): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'tooltip-metric';
    if (this.direction === 'h') {
      div.style.display = 'inline-block';
    }
    if (parentDiv !== undefined) {
      parentDiv.appendChild(div);
    }
    this.div = div;
    this.getTextDiv(div);
    this.getGraphsDiv(div);
    return div;
  }

  getTextDiv(parentDiv: HTMLDivElement): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'tooltip-text';
    let str = '';
    if (parentDiv !== undefined) {
      parentDiv.appendChild(div);
    }
    if (this.label !== undefined) {
      str += `${this.label} : `;
      str += `<span style="color:${this.color}"><b>${this.value}</b></span>`;
    }
    div.innerHTML = str;
    return div;
  }

  getGraphsDiv(parentDiv: HTMLDivElement): HTMLDivElement {
    const div = document.createElement('div');
    if (parentDiv !== undefined) {
      parentDiv.appendChild(div);
    }
    if (this.graphs.size > 0) {
      this.graphs.forEach(graph => {
        graph.getDiv(div);
      });
    }
    return div;
  }

  addGraph(type: gf.TGraphType): GraphTooltip {
    let graph: GraphTooltip;
    switch (type) {
      case 'line':
        graph = new LineGraphTooltip();
        break;
      case 'bar':
        graph = new BarGraphTooltip();
        break;
      default:
        GFP.log.error('Graph type unknow', type);
        graph = new BarGraphTooltip();
        break;
    }
    this.graphs.add(graph);
    return graph;
  }
}

/**
 * Create a graph for tooltip
 *
 * @class GraphTooltip
 */
class GraphTooltip {
  color = '#8c8980';
  type: gf.TGraphType = 'line';
  data: Chartist.IChartistData = {
    series: [
      {
        data: [{ x: 0, y: 0 }],
      },
    ],
  };
  name: string | undefined;
  column: string | undefined;
  size: gf.TGraphSize = '100%';
  metric: Metric | undefined;
  low: number | null = null;
  high: number | null = null;
  scaleType: gf.TGraphScale = 'linear';
  div: HTMLDivElement | undefined;
  chart: any;
  parentDiv: HTMLDivElement | undefined;
  constructor() {}

  getDiv(div: HTMLDivElement): HTMLDivElement | undefined {
    return this.div;
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setColumn(column: string): this {
    this.column = column;
    return this;
  }

  setType(type: gf.TGraphType): this {
    this.type = type;
    return this;
  }

  setSize(size: gf.TGraphSize): this {
    this.size = size;
    return this;
  }

  setMetric(metric: any): this {
    this.metric = metric;
    return this;
  }

  setScaling(low: number | null, high: number | null): this {
    this.low = low;
    this.high = high;
    return this;
  }

  setScale(type: gf.TGraphScale) {
    this.scaleType = type;
  }

  setColor(color: string | null): this {
    if (color !== null) {
      this.color = color;
    }
    return this;
  }

  setParentDiv(div: HTMLDivElement): this {
    this.parentDiv = div;
    return this;
  }

  getChart() {
    return this.chart;
  }
}

class LineGraphTooltip extends GraphTooltip {
  chartistOptions: Chartist.ILineChartOptions;
  div: HTMLDivElement | undefined;
  // data: { series: Array<{ x: any; y: any }>[] } | undefined;
  chart: Chartist.IChartistLineChart | undefined;
  constructor() {
    super();
    this.type = 'line';
    this.chartistOptions = {
      showPoint: false,
      showLine: true,
      showArea: true,
      fullWidth: true,
      axisX: {
        showGrid: true,
        showLabel: true,
      },
      axisY: {
        showGrid: true,
        showLabel: true,
      },
      chartPadding: { top: 0, left: 0, right: 0, bottom: 0 },
    };
  }

  getDiv(parentDiv: HTMLDivElement): HTMLDivElement {
    const thisArg = this;

    if (this.metric) {
      this.data.series[0]['data'] = this.metric.getData(this.column);
      this.data.labels = this.metric.getLabels(this.column);
    }
    const div = document.createElement('div');
    const color = this.color;
    this.div = div;
    if (parentDiv !== undefined) {
      parentDiv.appendChild(div);
    }
    div.className = 'ct-chart ct-golden-section';
    if (this.size !== null) {
      div.style.width = this.size;
      if (this.chartistOptions.axisX) {
        this.chartistOptions.axisX.labelInterpolationFnc = (value, index, labels) => {
          const labelSize = 100;

          return index % Math.ceil(labels.length / (parseInt(thisArg.size, 10) / labelSize)) === 0 ? value : null;
        };
      }
    }
    if (this.low !== null) {
      this.chartistOptions.low = this.low;
    }
    if (this.high !== null) {
      this.chartistOptions.high = this.high;
    }

    if (this.scaleType !== null && this.scaleType !== undefined && this.scaleType === 'log') {
      // this.chartistOptions.axisY.type = this.scaleType;
      // NOT SUPPORTED AT THIS TIME
    }

    this.chart = new Chartist.Line(div, this.data, this.chartistOptions);
    this.chart.on('draw', (data: any) => {
      // GFP.log.info( 'Chartis.on() context ', data);
      if (data.type === 'line' || data.type === 'area' || data.type === 'label' || data.type === 'grid') {
        if (data.type === 'grid' && data.index === 0) {
          data.element.attr({
            style: `stroke: ${color}`,
          });
        }
        if (data.type === 'label') {
          data.element.getNode().childNodes.forEach(child => {
            child.style.color = color;
          });
        }
        if (data.type === 'line') {
          data.element.attr({
            style: `stroke: ${color}`,
          });
        }
        if (data.type === 'area') {
          data.element.attr({
            style: `fill: ${color}`,
          });
        }
        if (data.type === 'area' || data.type === 'line') {
          data.element.animate({
            d: {
              begin: 1000 * data.index,
              dur: 1000,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        }
      }
    });

    return div;
  }
}

class BarGraphTooltip extends GraphTooltip {
  chartistOptions: Chartist.IBarChartOptions;
  chart: Chartist.IChartistBarChart | undefined;
  constructor() {
    super();
    this.type = 'bar';
    this.chartistOptions = {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0,
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0,
      },
      chartPadding: { top: 0, left: 0, right: 0, bottom: 0 },
    };
  }

  getDiv(parentDiv: HTMLDivElement): HTMLDivElement {
    if (this.metric) {
      this.data.series[0]['data'] = this.metric.getData(this.column);
    }
    const div = document.createElement('div');
    const color = this.color;
    this.div = div;
    if (parentDiv !== undefined) {
      parentDiv.appendChild(div);
    }
    div.className = 'ct-chart ct-golden-section';
    if (this.size !== null) {
      div.style.width = this.size;
    }
    if (this.low !== null) {
      this.chartistOptions.low = this.low;
    }
    if (this.high !== null) {
      this.chartistOptions.high = this.high;
    }

    if (this.scaleType !== null && this.scaleType !== undefined && this.scaleType === 'log') {
      // this.chartistOptions.axisY.type = this.scaleType;
    }

    this.chart = new Chartist.Bar(div, this.data, this.chartistOptions);
    let seq = 0;
    const length = this.data.series[0]['data'].length;
    const delays = Math.round(50 / (length / 10));
    const durations = Math.round(250 / (length / 10));
    this.chart.on('draw', (data: any) => {
      if (data.type === 'bar') {
        data.element.attr({
          style: `stroke: ${color}`,
        });
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    });
    return div;
  }
}
