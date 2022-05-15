import { State } from './state_class';
// import { each as _each } from 'lodash';
import { XGraph } from 'graph_class';
import { $GF, GFLog } from 'globals_class';
import { XCell } from 'cell_class';
import { GFEvents } from 'flowcharting_base';

const stateHandlerSignalsArray = ['state_created', 'state_updated', 'state_changed', 'state_deleted'] as const;
type stateHandlerSignals = typeof stateHandlerSignalsArray[number];

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
  rulesCompleted = true;
  uid: string;
  events: GFEvents<stateHandlerSignals> = GFEvents.create(stateHandlerSignalsArray);

  /**
   * Creates an instance of StateHandler.
   * @param {XGraph} xgraph
   * @memberof StateHandler
   */
  constructor(xgraph: XGraph) {
    this.uid = $GF.genUid(this.constructor.name);
    this.states = new Map();
    this.xgraph = xgraph;
    // this.initStates();
    this.init();
  }

  //############################################################################
  //### INIT/UPDATE/CHANGE/FREE
  //############################################################################
  update(): this {
    const funcName = 'refresh';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.rulesCompleted = false;
    this.states.forEach((s) => s.update());
    // this.onRefreshed();
    return this;
  }

  change(): this {
    const funcName = 'change';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.rulesCompleted = false;
    this.states.forEach((s) => s.change());
    // this.onChanged();
    return this;
  }

  init(): this {
    const funcName = 'init';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    $GF.events.connect('debug_asked', this, this._on_global_debug_asked.bind(this));
    this.initStates();
    // this.onInitialized();
    return this;
  }

  clear(): this {
    //TODO : Why commented
    // if (this.states) {
    //   this.states.forEach((st) => {
    //     st.clear();
    //   });
    //   this.states.clear();
    // }
    this.states.forEach((s) => {
      s.free();
      this.events.emit('state_deleted', s);
    });
    $GF.events.disconnect('debug_asked', this);
    return this;
  }

  //############################################################################
  //### LOGIC
  //############################################################################

  /**
   * Initialisation of states
   *
   * @returns {this}
   * @param {XGraph} xgraph
   * @memberof StateHandler
   */
  async initStates() {
    const trc = $GF.trace.before(this.constructor.name + '.' + 'initStates()');
    this.states.clear();
    const xcells = this.xgraph.getXCells();
    await Promise.all(
      xcells.map(async (xcell: XCell) => {
        this.addState(xcell);
      })
    );
    // _each(xcells, x => {
    //   this.addState(x);
    // });
    trc.after();
    return this;
  }

  setXGraph(xgraph: XGraph): this {
    this.xgraph = xgraph;
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
  //   GFLog.info('StateHandler.updateStates()');
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
    this.states.forEach((state) => {
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
    const state = new State(xcell, this.xgraph);
    this.states.set(state.uid, state);
    if ($GF.DEBUG) {
      $GF.setVar(`STATE_${state.uid}`, state);
    }
    this.events.emit('state_created', state);
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

  // free(rule?: Rule): this {
  //   const funcName = 'destroy';
  //   GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  //   // this.onDestroyed();
  //   return this;
  // }

  // complete(): this {
  //   const funcName = 'complete';
  //   GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
  //   this.states.forEach(s => s.complete());
  //   this.onCompleted();
  //   return this;
  // }

  //
  // Rules
  //
  // updateWithRule(rule: Rule): this {
  //   this.rulesCompleted = false;
  //   this.states.forEach(state => state.updateWithRule(rule));
  //   // this.onRefreshed();
  //   return this;
  // }

  // changeWithRule(rule: Rule): this {
  //   this.rulesCompleted = false;
  //   this.states.forEach(state => state.changeWithRule(rule));
  //   // this.onChanged();
  //   return this;
  // }

  //
  // XGraph
  //
  changeWithXGraph(xgraph: XGraph): this {
    this.xgraph = xgraph;
    this.clear();
    this.init();
    this.change();
    return this;
  }

  //#########################################################################
  //### Events
  //#########################################################################
  private _on_global_debug_asked() {
    console.log('📩', this.constructor.name, "_on_global_debug_asked");
    console.log("🧰", this.constructor.name, this);
  }


}
