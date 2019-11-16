//import FlowChartingPlugin from './plugin';
import Chartist from 'chartist';

declare var GFP: any;
/**
 *
 *
 * @export
 * @class TooltipHandler
 */
export default class TooltipHandler {
  timeFormat: string;
  mxcell: any;
  checked: boolean;
  metrics: Set<MetricTooltip>;
  lastChange: string | undefined;
  div: HTMLHeadingElement | undefined;
  constructor(mxcell: any) {
    this.timeFormat = 'YYYY-MM-DD HH:mm:ss';
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
  updateDate() {
    const currentDateTime = new Date();
    this.lastChange =
      currentDateTime.getFullYear() +
      '-' +
      (currentDateTime.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      '-' +
      currentDateTime.getDate().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ' ' +
      currentDateTime.getHours().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ':' +
      currentDateTime.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ':' +
      currentDateTime.getSeconds().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
  }

  destroy() {
    this.metrics.clear();
    if (this.mxcell.GF_tooltipHandler) {
      delete this.mxcell.GF_tooltipHandler;
    }
  }

  getDiv(parentDiv: HTMLDivElement): HTMLDivElement | null {
    if (this.div !== undefined) {
      if (parentDiv !== undefined) {
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
    div.innerHTML = `${this.lastChange}`;
    return div;
  }
}

type directionType = 'v' | 'h';
type graphType = 'line' | 'bar';
/**
 * Create a metric for tooltip
 *
 * @class MetricTooltip
 */
class MetricTooltip {
  color: string;
  graphs: Set<GraphTooltip>;
  label: any;
  value: any;
  direction: directionType = 'v';
  div: HTMLDivElement | undefined;
  constructor() {
    this.color = '#8c8980';
    this.graphs = new Set();
  }

  setLabel(label: string): this {
    this.label = label;
    return this;
  }

  setValue(value: string): this {
    this.value = value;
    return this;
  }

  setColor(color: string|null): this {
    if (color !== null) {
      this.color = color;
    }
    return this;
  }

  setDirection(direction: directionType): this {
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

  addGraph(type: graphType): GraphTooltip {
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
  color: string | undefined;
  type: graphType | undefined;
  name: string | undefined;
  size: string | null = '100%';
  serie: any | undefined;
  low: number | undefined;
  high: any;
  div: HTMLDivElement | undefined;
  parentDiv: any;
  constructor() {
    this.color = '#8c8980';
  }

  getDiv(div: HTMLDivElement): HTMLDivElement | undefined {
    return this.div;
  }
  setName(name: string): this {
    this.name = name;
    return this;
  }

  setType(type: graphType): this {
    this.type = type;
    return this;
  }

  setSize(size: string): this {
    this.size = size;
    return this;
  }

  setSerie(serie: any): this {
    this.serie = serie;
    return this;
  }

  setScaling(low: number, high: string): this {
    this.low = low;
    this.high = high;
    return this;
  }

  setColor(color: string): this {
    if (color !== null) {
      this.color = color;
    }
    return this;
  }

  setParentDiv(div: HTMLDivElement): this {
    this.parentDiv = div;
    return this;
  }

  static array2Coor(arr: any) {
    const result = [];
    for (let index = 0; index < arr.length; index++) {
      result.push({
        x: arr[index][0],
        y: arr[index][1],
      });
    }
    return result;
  }
}

class LineGraphTooltip extends GraphTooltip {
  chartistOptions: any;
  div: HTMLDivElement | undefined;
  // data: { series: Array<{ x: any; y: any }>[] } | undefined;
  data: any;
  chart: any;
  constructor() {
    super();
    this.type = 'line';
    this.chartistOptions = {
      showPoint: false,
      showLine: true,
      showArea: true,
      fullWidth: true,
      showLabel: false,
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
      chartPadding: 0,
    };
  }

  getDiv(parentDiv: HTMLDivElement): HTMLDivElement {
    const coor = GraphTooltip.array2Coor(this.serie.flotpairs);
    const div = document.createElement('div');
    const color = this.color;
    this.div = div;
    if (parentDiv !== undefined) {
      parentDiv.appendChild(div);
    }
    div.className = 'ct-chart ct-golden-section';
    this.data = {
      series: [coor],
    };
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
      // GFP.log.info( 'Chartis.on() context ', data);
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

class BarGraphTooltip extends GraphTooltip {
  chartistOptions: any;
  // data: { series: Array<{ x: any; y: any }>[] } | undefined;
  data: any;
  constructor() {
    super();
    this.type = 'bar';
    this.chartistOptions = {
      showPoint: false,
      showLine: true,
      showArea: true,
      fullWidth: true,
      showLabel: false,
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
      chartPadding: 0,
    };
  }

  getDiv(parentDiv: HTMLDivElement): HTMLDivElement {
    const coor = GraphTooltip.array2Coor(this.serie.flotpairs);
    const div = document.createElement('div');
    const color = this.color;
    if (parentDiv !== undefined) {
      parentDiv.appendChild(div);
    }
    this.data = {
      series: [coor],
    };
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
    const chart = new Chartist.Bar(div, this.data, this.chartistOptions);
    let seq = 0;
    const delays = Math.round(50 / (coor.length / 10));
    const durations = Math.round(250 / (coor.length / 10));
    chart.on('draw', (data: any) => {
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
