/* eslint-disable prefer-destructuring */
import Flowchart from './flowchart_class';

/**
 * Class FlowchartHandler
 */
export default class FlowchartHandler {
  /**
   *Creates an instance of FlowchartHandler to handle flowchart
   * @param {*} $scope - angular scope
   * @param {*} elem - angular elem
   * @param {*} ctrl - ctrlPanel
   * @param {*} data - Empty data to store
   * @memberof FlowchartHandler
   */
  constructor($scope, elem, ctrl, data) {
    u.log(1, 'FlowchartHandler.constructor()');
    u.log(0, 'FlowchartHandler.constructor() data', data);
    this.$scope = $scope || null;
    this.$elem = elem.find('.flowchart-panel__chart');
    this.ctrl = ctrl;
    this.flowcharts = [];
    this.data = data;
    this.changeSourceFlag = false;
    this.changeOptionFlag = false;
    this.changeDataFlag = false;
    this.changedRuleFlag = false;
    this.defaultXml = '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';
    this.xgraph = undefined;
    this.$container = undefined;
    this.onMapping = {
      active: false, // boolean if pointer mapping is active
      object: undefined, // ojb to return id of mapping
      id: undefined // id of dom
    };

    this.import(this.data);

    // Events Render
    ctrl.events.on('render', () => {
      this.render();
    });

    this.mousedownTimeout = 0;
    this.mousedown = 0;

    document.body.onmousedown = () => {
      this.mousedown = 0;
      window.clearInterval(this.mousedownTimeout);
      this.mousedownTimeout = window.setInterval(() => {
        this.mousedown += 1;
      }, 200);
    };

    document.body.onmouseup = () => {
      this.mousedown = 0;
      window.clearInterval(this.mousedownTimeout);
    };
  }

  /**
   * import data into
   *
   * @param {Object} obj
   * @memberof FlowchartHandler
   */
  import(obj) {
    u.log(1, 'FlowchartHandler.import()');
    u.log(0, 'FlowchartHandler.import() obj', obj);
    this.flowcharts = [];
    if (obj !== undefined && obj !== null && obj.length > 0) {
      obj.forEach(map => {
        const container = this.createContainer();
        const newData = {};
        const fc = new Flowchart(map.name, map.xml, container, this.ctrl, newData);
        fc.import(map);
        this.flowcharts.push(fc);
        this.data.push(newData);
      });
    }
  }

  /**
   * Get flowchart in index position
   *
   * @param {Number} index
   * @returns {Flowchart}
   * @memberof FlowchartHandler
   */
  getFlowchart(index) {
    return this.flowcharts[index];
  }

  /**
   * Return array of flowchart
   *
   * @returns {Array} Array of flowchart
   * @memberof FlowchartHandler
   */
  getFlowcharts() {
    return this.flowcharts;
  }

  /**
   *Return number of flowchart
   *
   * @returns {number} Nulber of flowchart
   * @memberof FlowchartHandler
   */
  countFlowcharts() {
    if (this.flowcharts !== undefined && Array.isArray(this.flowcharts))
      return this.flowcharts.length;
    return 0;
  }

  /**
   *Create a div container for graph
   *
   * @returns {DOM}
   * @memberof FlowchartHandler
   */
  createContainer() {
    const $container = $(
      `<div id="flowchart_${u.uniqueID}" style="margin:auto;position:relative,width:100%;height:100%"></div>`
    );
    this.$elem.html($container);
    return $container[0];
  }

  /**
   *Add a flowchart
   *
   * @param {string} name
   * @memberof FlowchartHandler
   */
  addFlowchart(name) {
    u.log(1, 'FlowchartHandler.addFlowchart()');
    const container = this.createContainer();
    const data = {};
    const flowchart = new Flowchart(name, this.defaultXml, container, this.ctrl, data);
    this.data.push(data);
    this.flowcharts.push(flowchart);
  }

  /**
   *Render for draw
   *
   * @memberof FlowchartHandler
   */
  render() {
    u.log(1, 'flowchartHandler.render()');
    // not repeat render if mouse down
    if (!this.mousedown) {
      if (this.changeSourceFlag) {
        this.load();
        this.changeSourceFlag = false;
        this.changeRuleFlag = true;
      }
      if (this.changeOptionFlag) {
        this.setOptions();
        this.changeOptionFlag = false;
      }
      if (this.changeRuleFlag || this.changeDataFlag) {
        const rules = this.ctrl.rulesHandler.getRules();
        const series = this.ctrl.series;
        if (this.changeRuleFlag) {
          this.flowcharts.forEach(flowchart => {
            flowchart.updateStates(rules);
          });
          this.changeRuleFlag = false;
        }
        this.setStates(rules,series);
        this.applyStates();

        this.changeDataFlag = false;
      }
      const width = this.$elem.width();
      const height = this.ctrl.height;
      this.refresh(width, height);
      // console.log("FlowcharHandler.render() states",this.flowcharts[0].getStateHandler().getStates());
      
    }
  }

  /**
   *Flag source change
   *
   * @memberof FlowchartHandler
   */
  sourceChanged() {
    this.changeSourceFlag = true;
  }

  /**
   *Flag options change
   *
   * @memberof FlowchartHandler
   */
  optionChanged() {
    this.changeOptionFlag = true;
  }

  /**
   *Flag rule change
   *
   * @memberof FlowchartHandler
   */
  ruleChanged() {
    this.changeRuleFlag = true;
  }

  /**
   *Flag data change
   *
   * @memberof FlowchartHandler
   */
  dataChanged() {
    this.changeDataFlag = true;
  }

  /**
   *Refresh flowchart then graph
   *
   * @param {*} width
   * @param {*} height
   * @memberof FlowchartHandler
   */
  refresh(width, height) {
    u.log(1, `FlowchartHandler.refresh()`);
    this.flowcharts.forEach(flowchart => {
      flowchart.refresh(width, height);
    });
  }

  /**
   * Change states of cell according to rules and series
   *
   * @memberof FlowchartHandler
   */
  setStates(rules,series) {
    this.flowcharts.forEach(flowchart => {
      flowchart.setStates(rules,series);
    });
  }

  updateStates(rules) {
    this.flowcharts.forEach(flowchart => {
      flowchart.updateStates(rules);
    });
  }

  /**
   * Apply state of cell after setStates
   *
   * @memberof FlowchartHandler
   */
  applyStates() {
    this.flowcharts.forEach(flowchart => {
      flowchart.applyStates();
    });
  }

  /**
   *Apply and set options
   *
   * @memberof FlowchartHandler
   */
  setOptions() {
    this.flowcharts.forEach(flowchart => {
      flowchart.setScale(flowchart.data.scale);
      flowchart.setCenter(flowchart.data.center);
      flowchart.setGrid(flowchart.data.grid);
      flowchart.setTooltip(flowchart.data.tooltip);
      flowchart.setLock(flowchart.data.lock);
      flowchart.setZoom(flowchart.data.zoom);
      flowchart.setBgColor(flowchart.data.bgColor);
    });
  }

  /**
   *(re)draw graph
   *
   * @memberof FlowchartHandler
   */
  draw() {
    u.log(1, `FlowchartHandler.draw()`);
    this.flowcharts.forEach(flowchart => {
      flowchart.redraw();
    });
  }

  /**
   *(re)load graph
   *
   * @memberof FlowchartHandler
   */
  load() {
    u.log(1, `FlowchartHandler.load()`);
    this.flowcharts.forEach(flowchart => {
      flowchart.reload();
    });
  }

  /**
   *Active option link/map
   *
   * @param {Object} objToMap
   * @memberof FlowchartHandler
   */
  setMap(objToMap) {
    const flowchart = this.getFlowchart(0);
    this.onMapping.active = true;
    this.onMapping.object = objToMap;
    this.onMapping.id = objToMap.getId();
    this.onMapping.$scope = this.$scope;
    flowchart.setMap(this.onMapping);
  }

  /**
   *Desactivate option
   *
   * @memberof FlowchartHandler
   */
  unsetMap() {
    const flowchart = this.getFlowchart(0);
    this.onMapping.active = false;
    this.onMapping.object = undefined;
    this.onMapping.id = '';
    flowchart.unsetMap();
  }

  /**
   *Return true if mapping object is active
   *
   * @param {properties} objToMap
   * @returns true - true if mapping mode
   * @memberof FlowchartHandler
   */
  isMapping(objToMap) {
    if (objToMap === undefined || objToMap == null) return this.onMapping.active;
    if (this.onMapping.active === true && objToMap === this.onMapping.object) return true;
    return false;
  }

  listenMessage(event) {
    // debugger
    // if (event.origin !== urlEditor) return;
    // when editor is open
    let index = this.currentFlowchartIndex;
    if (event.data === 'ready') {
      // send xml
      event.source.postMessage(this.flowcharts[index].data.xml, event.origin);
    } else {
      if (this.onEdit && event.data !== undefined && event.data.length > 0) {
        this.flowcharts[index].redraw(event.data);
        this.sourceChanged();
        this.$scope.$apply();
        this.render();
      }
      if (this.onEdit && event.data !== undefined || event.data.length === 0) {
        this.editorWindow.close();
        this.onEdit = false;
        window.removeEventListener('message', this.listenMessage.bind(this) ,false);
      }
    }
  }

  /**
   *Open graph in draw.io
   *
   * @param {number} index - index of flowchart
   * @memberof FlowchartHandler
   */
  openDrawEditor(index) {
    const urlEditor = this.getFlowchart(index).getUrlEditor();
    this.currentFlowchartIndex = index;
    const theme = this.getFlowchart(index).getThemeEditor();
    const urlParams = `${urlEditor}?embed=1&spin=1&libraries=1&ui=${theme}`;
    this.editorWindow = window.open(urlParams, 'MxGraph Editor', 'width=1280, height=720');
    this.onEdit = true;
    window.addEventListener('message', this.listenMessage.bind(this) ,false);
  }
}
