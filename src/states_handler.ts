import { State } from './state_class';
// import { each as _each } from 'lodash';
import { XGraph } from 'graph_class';
import { $GF, GFLog } from 'globals_class';
import { XCell } from 'cell_class';
import { GFEvents } from 'flowcharting_base';

// Debug
const DEBUG=false
const _log = (...args: any) => {DEBUG && console.log(...args)}

// Define signals
const stateHandlerSignalsArray = ['state_created', 'state_updated', 'state_changed', 'state_deleted'] as const;
type stateHandlerSignals = typeof stateHandlerSignalsArray[number];

/**
 * States Handler class
 *
 * @export
 * @class StateHandler
 */
export class StateHandler {
  private readonly $gf: $GF;
  states: Map<string, State>;
  xgraph: XGraph;
  edited = false;
  uid: string;
  events: GFEvents<stateHandlerSignals> = GFEvents.create(stateHandlerSignalsArray);

  /**
   * Creates an instance of StateHandler.
   * @param {XGraph} xgraph
   * @memberof StateHandler
   */
  constructor($gf: $GF, xgraph: XGraph) {
    this.$gf = $gf;
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
    this.states.forEach((s) => s.update());
    // this.onRefreshed();
    return this;
  }

  change(): this {
    const funcName = 'change';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this.states.forEach((s) => s.change());
    // this.onChanged();
    return this;
  }

  init(): this {
    const funcName = 'init';
    GFLog.debug(`${this.constructor.name}.${funcName}() : ${this.uid}`);
    this._eventsConnect();
    this.init_states();
    // this.onInitialized();
    return this;
  }

  free() {
    this.states.forEach(async (s) => {
      s.free();
      await this.events.emit('state_deleted', s);
    });
    this.clear();
    this.events.clear();
    this._eventsDisconnect();
  }

  clear(): this {
    this.states.forEach((s) => {
      s.free();
      this.events.emit('state_deleted', s);
    });
    this.states.clear();
    return this;
  }

  //############################################################################
  //### LOGIC
  //############################################################################
  private _eventsConnect() {
    this.$gf.events.connect('debug_asked', this, this._on_global_debug_asked.bind(this));
    // Moved to parent Flowchart
    // this.xgraph.events.connect('graph_changed', this, this._on_flowchart_graph_changed.bind(this))
  }

  private _eventsDisconnect() {
    this.$gf.events.disconnect('debug_asked', this);
  }

  /**
   * Initialisation of states
   *
   * @returns {this}
   * @param {XGraph} xgraph
   * @memberof StateHandler
   */
  async init_states() {
    this.clear();
    const xcells = this.xgraph.getXCells();
    Promise.all(
      xcells.map(async (xcell: XCell) => {
        this.addState(xcell);
      })
    );
    return this;
  }

  setXGraph(xgraph: XGraph): this {
    this.xgraph = xgraph;
    return this;
  }

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
    return Array.from(this.states.values());
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
    const state = new State(this.$gf, xcell, this.xgraph);
    this.states.set(state.uid, state);
    this.events.emit('state_created', state);
    return state;
  }



  /**
   * @param  {XGraph} xgraph
   * @returns boolean
   */
  matchXGraph(xgraph: XGraph): boolean {
    return this.xgraph.uid === xgraph.uid;
  }


  //#########################################################################
  //### Events
  //#########################################################################
  private _on_global_debug_asked() {
    _log('📬', this.constructor.name, "_on_global_debug_asked");
    _log("🗃️", this.constructor.name, this);
  }

}
