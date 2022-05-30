import Chartist from 'chartist';
// import ctAreaGradient from 'chartist-plugin-gradient';
import { Metric } from './metric_class';
import { $GF, GFLog } from 'globals_class';
import { XCell } from 'cell_class';

/**
 *
 *
 * @export
 * @class TooltipHandler
 */
export class TooltipHandler {
  timeFormat = 'YYYY-MM-DD HH:mm:ss';
  checked = false;
  metrics: Set<MetricTooltip>;
  metadata: MetadataTooltip | null = null;
  lastChange: string | undefined;
  div: HTMLHeadingElement | null = null;
  // constructor(mxcell: any) {
  constructor() {
    // this.mxcell = mxcell;
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

  addMetadata(): MetadataTooltip {
    this.checked = true;
    this.metadata = new MetadataTooltip();
    return this.metadata;
  }

  /**
   * Update date in tooltip
   *
   * @memberof TooltipHandler
   */
  updateDate() {
    this.lastChange = $GF.getCurrentDate();
  }

  destroy() {
    this.metrics.clear();
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
    // Values + Graphs
    if (this.metrics.size > 0) {
      this.getDateDiv(div);
      this.metrics.forEach((metric: MetricTooltip) => {
        metric.getDiv(div);
      });
    }

    // Metadatas
    if (this.metadata !== undefined && this.metadata !== null) {
      this.metadata.getDiv(div);
    }
    this.div = div;
    return div;
  }

  getDateDiv(parentDiv: HTMLDivElement) {
    const div = document.createElement('div');
    // div.id = this.mxcell.mxObjectId + '_DATE';
    if (parentDiv !== undefined) {
      parentDiv.appendChild(div);
    }
    div.className = 'graph-tooltip-time tooltip-date';
    div.innerHTML = `${this.lastChange}`;
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
  direction: gf.TDirectionKeys = 'v';
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

  setDirection(direction: gf.TDirectionKeys): this {
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

  addGraph(type: gf.TGraphTypeKeys): GraphTooltip {
    let graph: GraphTooltip;
    switch (type) {
      case 'line':
        graph = new LineGraphTooltip();
        break;
      case 'bar':
        graph = new BarGraphTooltip();
        break;
      default:
        GFLog.error('Graph type unknow', type);
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
export class GraphTooltip {
  color = '#8c8980';

  type: gf.TGraphTypeKeys = 'line';
  data: Chartist.IChartistData = {
    series: [
      {
        data: [{ x: 0, y: 0 }],
      },
    ],
  };
  name: string | undefined;
  column: string | undefined;
  size: gf.TGraphSizeKeys = '100%';
  metric: Metric | undefined;
  low: number | null = null;
  high: number | null = null;
  scaleType: gf.TGraphScaleKeys = 'linear';
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

  setType(type: gf.TGraphTypeKeys): this {
    this.type = type;
    return this;
  }

  setSize(size: gf.TGraphSizeKeys): this {
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

  setScale(type: gf.TGraphScaleKeys) {
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

/**
 * tooltip for line graph
 *
 * @class LineGraphTooltip
 * @extends {GraphTooltip}
 */
class LineGraphTooltip extends GraphTooltip {
  chartistOptions: Chartist.ILineChartOptions;
  div: HTMLDivElement | undefined;
  // data: { series: Array<{ x: any; y: any }>[] } | undefined;
  chart: Chartist.IChartistLineChart | undefined;
  /**
   * Creates an instance of LineGraphTooltip.
   * @memberof LineGraphTooltip
   */
  constructor() {
    super();
    this.type = 'line';
    this.chartistOptions = {
      showPoint: false,
      showLine: true,
      showArea: true,
      fullWidth: true,
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

  /**
   * get current Div
   *
   * @param {HTMLDivElement} parentDiv
   * @returns {HTMLDivElement}
   * @memberof LineGraphTooltip
   */
  getDiv(parentDiv: HTMLDivElement): HTMLDivElement {
    if (this.metric) {
      let log = this.scaleType === 'log' ? true : false;
      let series: any = this.data.series[0];
      series['data'] = this.metric.getData(this.column, log);
    }
    const div = document.createElement('div');
    const color = this.color;
    // const svg = '<svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">  <linearGradient id="my-cool-gradient" x2="1" y2="1">    <stop offset="0%" stop-color="#447799" />    <stop offset="50%" stop-color="#224488" />    <stop offset="100%" stop-color="#112266" />  </linearGradient></svg>';
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

    this.chart = new Chartist.Line(div, this.data, this.chartistOptions);
    this.chart.on('draw', (data: any) => {
      if (data.type === 'line' || data.type === 'area') {
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
    });
    return div;
  }
}

/**
 * Tooltip for Histogram
 *
 * @class BarGraphTooltip
 * @extends {GraphTooltip}
 */
class BarGraphTooltip extends GraphTooltip {
  chartistOptions: Chartist.IBarChartOptions;
  chart: Chartist.IChartistBarChart | undefined;
  /**
   * Creates an instance of BarGraphTooltip.
   * @memberof BarGraphTooltip
   */
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

  /**
   * Get current div
   *
   * @param {HTMLDivElement} parentDiv
   * @returns {HTMLDivElement}
   * @memberof BarGraphTooltip
   */
  getDiv(parentDiv: HTMLDivElement): HTMLDivElement {
    if (this.metric) {
      let log = this.scaleType === 'log' ? true : false;
      let series: any = this.data.series[0];
      series['data'] = this.metric.getData(this.column, log);
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

    this.chart = new Chartist.Bar(div, this.data, this.chartistOptions);
    let seq = 0;
    const series: any = this.data.series[0]
    const length = series['data'].length;
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

class MetadataTooltip {
  enableMetadata =true;
  div: HTMLDivElement | undefined = undefined;
  xcell: XCell | undefined = undefined;
  constructor() {}

  setXCell(cell: XCell): this {
    this.xcell = cell;
    return this;
  }

  getDiv(parentDiv: HTMLDivElement): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'tooltip-metric';
    this.div = div;
    if (parentDiv !== undefined) {
      parentDiv.appendChild(div);
    }
    if (this.xcell !== undefined) {
      const md = this.xcell.getMetadatas();
      md.forEach((v, k, m) => {
        if (k !== undefined && k !== null && k.length > 0 && v !== undefined && v !== null && v.length > 0) {
          const md = document.createElement('div');
          md.innerHTML = `${k} : <b>${mxUtils.htmlEntities(v)}</b>`;
          div.appendChild(md);
        }
      });
    }
    return div;
  }
}
