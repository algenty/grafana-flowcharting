import { State } from './state_class';
import { each as _each } from 'lodash';
import { XGraph } from 'graph_class';
import { $GF } from 'globals_class';
import { XCell } from 'cell_class';
import { FlowchartCtrl } from 'flowchart_ctrl';
import { Observer } from 'rxjs';

/**
 * States Handler class
 *
 * @export
 * @class StateHandler
 */
export class StateHandler {
  states: Map<string, State>;
  xgraph: XGraph;
  edited = false;
  uid: string = $GF.utils.uniqueID();
  ctrl: FlowchartCtrl;

  /**
   * Creates an instance of StateHandler.
   * @param {XGraph} xgraph
   * @memberof StateHandler
   */
  constructor(xgraph: XGraph, ctrl: FlowchartCtrl) {
    this.states = new Map();
    this.xgraph = xgraph;
    // this.initStates();
    this.ctrl = ctrl;
    this.init();
  }

  /**
   * Initialisation of states
   *
   * @returns {this}
   * @param {XGraph} xgraph
   * @memberof StateHandler
   */
  initStates(): this {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'initStates()');
    this.states.clear();
    const xcells = this.xgraph.getXCells();
    _each(xcells, x => {
      this.addState(x);
    });
    trc.after();
    return this;
  }

  setXGraph(xgraph: XGraph): this {
    this.xgraph = xgraph;
    return this;
  }

  /**
   * Reset/empty/destroy StateHandler
   *
   * @returns {this}
   * @memberof StateHandler
   */
  clear(): this {
    if (this.states) {
      this.states.forEach(st => {
        st.clear();
      });
      this.states.clear();
    }
    return this;
  }

  /**
   * Return states array for a rule
   *
   * @param {Rule} rule - rule mapping
   * @returns {Array<State>}
   * @memberof StateHandler
   */
  // getStatesForRule(rule: Rule) {
  //   const trc = $GF.trace.before(this.constructor.name + '.' + 'getStatesForRule()');
  //   const result = new Map();
  //   let name: string | null;
  //   this.states.forEach(state => {
  //     const xcell: XCell = state.xcell;
  //     const id: string = xcell.getId();
  //     let found = false;
  //     // SHAPES
  //     let options = rule.getShapeMapOptions();
  //     name = xcell.getValues(options);
  //     if (name !== null && rule.matchShape(name, options)) {
  //       result.set(id, state);
  //       found = true;
  //     }

  //     // TEXTS
  //     if (!found) {
  //       let options = rule.getTextMapOptions();
  //       // name = XGraph.getValuePropOfMxCell(mxcell, options);
  //       name = xcell.getValues(options);
  //       if (rule.matchText(name, options)) {
  //         result.set(id, state);
  //         found = true;
  //       }
  //     }

  //     // LINKS
  //     if (!found) {
  //       let options = rule.getLinkMapOptions();
  //       // name = XGraph.getValuePropOfMxCell(mxcell, options);
  //       name = xcell.getValues(options);
  //       if (rule.matchLink(name, options)) {
  //         result.set(id, state);
  //         found = true;
  //       }
  //     }

  //     // EVENTS
  //     if (!found) {
  //       let options = rule.getEventMapOptions();
  //       // name = XGraph.getValuePropOfMxCell(mxcell, options);
  //       name = xcell.getValues(options);
  //       if (rule.matchEvent(name, options)) {
  //         result.set(id, state);
  //         found = true;
  //       }
  //     }
  //   });
  //   trc.after();
  //   return result;
  // }

  /**
   * Update States : Add or remove state in states when rules changed
   *
   * @param {XGraph} xgraph
   * @param {Array<Rule>} rules
   * @memberof StateHandler
   */
  // updateStates(rules: Rule[]) {
  //   $GF.log.info('StateHandler.updateStates()');
  //   rules.forEach(rule => {
  //     rule.states = this.getStatesForRule(rule);
  //   });
  // }

  /**
   * Return array of state
   *
   * @returns Map<States>
   * @memberof StateHandler
   */
  getStates() {
    return this.states;
  }

  /**
   * get array states
   *
   * @returns {State[]}
   * @memberof StateHandler
   */
  getStatesForInspect(): State[] {
    const states: State[] = [];
    this.states.forEach(state => {
      states.push(state);
    });
    return states;
  }

  /**
   * Find state by Id
   * @param  {string} cellId - Id of cell
   * @returns {state}
   */
  getState(cellId: string): State | undefined {
    return this.states.get(cellId);
  }

  /**
   * Add a state
   *
   * @param {mxCell} xcell
   * @returns {State} created state
   * @memberof StateHandler
   */
  addState(xcell: XCell): State {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'addState()');
    const state = new State(xcell, this.xgraph, this.ctrl);
    this.states.set(state.uid, state);
    if ($GF.DEBUG) {
      $GF.setVar(`STATE_${state.uid}`, state);
    }
    trc.after();
    return state;
  }

  /**
   * Count number of state
   *
   * @returns {Number}
   * @memberof StateHandler
   */
  // countStates(): number {
  //   return this.states.size;
  // }

  /**
   * Restore initial status and prepare states object
   */
  // prepare(): this {
  //   const trc = $GF.trace.before(this.constructor.name + '.' + 'prepare()');
  //   this.states.forEach(state => {
  //     state.prepare();
  //   });
  //   trc.after();
  //   return this;
  // }

  /**
   * Change states according to rules and datas from grafana
   * @param  {Array<Rule>} rules - Array of Rule object
   * @param  {Array<Metric>} metrics - Array of serie object
   */
  // setStates(rules: Rule[]): this {
  //   const trc = $GF.trace.before(this.constructor.name + '.' + 'setStates()');
  //   this.prepare();
  //   rules.forEach(rule => {
  //     rule.highestLevel = -1;
  //     rule.highestFormattedValue = '';
  //     rule.highestColor = '';
  //     rule.highestValue = '';
  //     rule.execTimes = 0;
  //     if (rule.states === undefined || rule.states.size === 0) {
  //       rule.states = this.getStatesForRule(rule);
  //     }
  //     rule.states.forEach(state => {
  //       state.setState(rule);
  //     });
  //   });
  //   trc.after();
  //   return this;
  // }

  /**
   * Apply color and text
   */
  // applyStates(): this {
  //   const trc = $GF.trace.before(this.constructor.name + '.' + 'applyStates()');
  //   this.states.forEach(state => {
  //     state.async_applyState();
  //   });
  //   trc.after();
  //   return this;
  // }

  // /**
  //  * Call applyStates asynchronously
  //  *
  //  * @memberof StateHandler
  //  */
  // async async_applyStates() {
  //   this.applyStates();
  // }
  matchXGraph(xgraph: XGraph): boolean {
    return this.xgraph.uid === xgraph.uid;
  }

  //
  // Updates
  //
  destroy(): this {
    $GF.log.debug(this.constructor.name + '.destroy()');
    this.states.forEach(s => s.destroy());
    this.clear();
    this.onDestroyed();
    return this;
  }

  refresh(): this {
    $GF.log.debug(this.constructor.name + '.refresh()');
    this.states.forEach(s => s.refresh());
    this.onRefreshed();
    return this;
  }

  change(): this {
    $GF.log.debug(this.constructor.name + '.change()');
    this.states.forEach(s => s.change());
    this.onChanged();
    return this;
  }

  init(): this {
    $GF.log.debug(this.constructor.name + '.init()');
    this.initStates();
    this.onInitialized();
    return this;
  }

  //
  // Events
  //
  async onDestroyed() {
    $GF.log.debug(this.constructor.name + '/onDestroyed : ' + this.uid);
    this.ctrl.eventHandler.unsubscribes(this);
  }

  async onRefreshed() {
    $GF.log.debug(this.constructor.name + '/onRefreshed : ' + this.uid);
  }

  async onInitialized() {
    $GF.log.debug(this.constructor.name + '/onInitialized : ' + this.uid);
    this.ctrl.eventHandler.subscribes(this);
    this.ctrl.eventHandler.ack('state', 'initialized');
  }

  async onChanged() {
    $GF.log.debug(this.constructor.name + '/onChanged : ' + this.uid);
  }

  //
  // RXJS
  //
  getGraph$changed(): Observer<XGraph> {
    const self = this;
    return {
      next: (xgraph: XGraph) => {
        if (xgraph !== null && this.matchXGraph(xgraph)) {
          self.destroy();
          self.setXGraph(xgraph);
          self.init();
          self.change();
        }
      },
      error: err => {
        $GF.log.error(err);
      },
      complete: () => {
        $GF.log.debug(this.constructor.name + '.getGraph$changed().complete()');
      },
    };
  }
}
