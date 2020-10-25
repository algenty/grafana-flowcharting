import { FlowchartHandler } from './flowchartHandler';
import { State } from 'state_class';
import { $GF } from 'globals_class';
import { StateHandler } from 'statesHandler';
import _ from 'lodash';
// import { MetricHandler } from './metricHandler';

declare interface TColumn {
  id: string;
  desc: string;
  sort: 'asc' | 'desc';
  select: boolean;
}

declare interface TTable {
  data: State[];
  columns: TColumn[];
}

export class InspectOptionsCtrl {
  enable = false; // enable inspector or not
  ctrl: any; //TODO: define type
  flowchartHandler: FlowchartHandler;
  stateHandler: StateHandler | undefined;
  state: TTable;
  panel: any;
  traceEnable: boolean = $GF.trace.isEnabled();

  /** @ngInject */
  constructor($scope: gf.TInspectOptionsScope) {
    $scope.editor = this;
    $scope.$GF = $GF.me();

    this.state = {
      data: this.getStates(),
      columns: [
        {
          id: 'cellId',
          desc: 'Shape ID',
          sort: 'asc',
          select: false,
        },
        {
          id: 'label',
          desc: 'Label',
          sort: 'asc',
          select: false,
        },
        {
          id: 'cellId',
          desc: 'Shape ID',
          sort: 'asc',
          select: false,
        },
        {
          id: 'font',
          desc: 'Font color',
          sort: 'asc',
          select: false,
        },
        {
          id: 'fill',
          desc: 'Fill color',
          sort: 'asc',
          select: false,
        },
        {
          id: 'stroke',
          desc: 'Stroke color',
          sort: 'asc',
          select: false,
        },
        {
          id: 'tags',
          desc: 'Tags Mapping',
          sort: 'asc',
          select: false,
        },
      ],
    };
    this.ctrl = $scope.ctrl;
    this.panel = this.ctrl.panel;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    this.stateHandler = this.flowchartHandler.getFlowchart().getStateHandler();
  }

  render() {
    this.panel.render();
  }

  // onDebug() {
  //   GFP.log.logLevel = this.logLevel;
  //   GFP.log.logDisplay = this.logDisplay;
  // }

  onChangeId(state: State) {
    if (state.newcellId !== undefined && state.cellId !== state.newcellId) {
      state.edited = true;
      const sh = this.flowchartHandler.getFlowchart().getStateHandler();
      if (sh !== undefined) {
        sh.edited = true;
      }
      if (state.previousId === undefined) {
        state.previousId = state.cellId;
      }
      state.cellId = state.newcellId;
      state.edited = true;
    }
    state.edit = false;
  }

  onEdit(state: State) {
    state.edit = true;
    state.newcellId = state.cellId;
    // let stateHandler = this.flowchartHandler.getFlowchart().getStateHandler();
    // stateHandler.edited = true;
    const elt = document.getElementById(state.cellId);
    setTimeout(() => {
      if (elt) {
        elt.focus();
      }
    }, 100);
  }

  reset() {
    const flowchart = this.flowchartHandler.getFlowchart();
    const sh = flowchart.getStateHandler();
    if (sh !== undefined) {
      const states = sh.getStates();
      states.forEach(state => {
        if (state.edited && state.previousId) {
          state.cellId = state.previousId;
          state.edited = false;
        }
      });
      sh.edited = false;
    }
    flowchart.applyModel();
    this.flowchartHandler.draw();
    this.flowchartHandler.refresh();
    // this.$scope.$apply();
  }

  apply() {
    const flowchart = this.flowchartHandler.getFlowchart();
    const sh = flowchart.getStateHandler();
    if (sh !== undefined) {
      const states = sh.getStates();
      states.forEach(state => {
        if (state.edited && state.previousId) {
          flowchart.renameId(state.previousId, state.cellId);
          state.edited = false;
        }
      });
      sh.edited = false;
    }
    flowchart.applyModel();
  }

  selectCell(state: State) {
    state.highlightCell();
  }

  unselectCell(state: State) {
    state.unhighlightCell();
  }

  getStates(): State[] {
    if (this.stateHandler) {
      const states = this.stateHandler.getStatesForInspect();
      return _.orderBy(states, ['cellId', 'globalLevel'], ['asc']);
    }
    return [];
  }

  getStateValue(state: State, col: string): string | null {
    switch (col) {
      case 'cellId':
        return state.cellId;
        break;
      case 'level':
        return state.getTextLevel();
        break;
      case 'label':
        return state.getCellProp('value');
        break;

      default:
        return null;
        break;
    }
  }

  tracePerf() {
    if (this.traceEnable) {
      $GF.trace.enable();
    } else {
      $GF.trace.disable();
    }
  }

  anonymize() {
    const fc = this.flowchartHandler.getFlowchart();
    const xg = fc.getXGraph();
    if (xg) {
      xg.anonymize();
    }
  }
}

/** @ngInject */
export function inspectOptionsTab($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `${$GF.plugin.getPartialPath()}inspect/index.html`,
    controller: InspectOptionsCtrl,
  };
}
