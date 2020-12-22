import { FlowchartHandler } from './flowchartHandler';
import { State } from 'state_class';
import { $GF, GFTable } from 'globals_class';
import { StateHandler } from 'statesHandler';
import _ from 'lodash';
import XGraph from 'graph_class';
// import { MetricHandler } from './metricHandler';

export class InspectOptionsCtrl {
  enable = false; // enable inspector or not
  ctrl: any; //TODO: define type
  flowchartHandler: FlowchartHandler;
  stateHandler: StateHandler | undefined;
  statesTableData: gf.TTableData;
  statesTable: GFTable;
  panel: any;
  parentDiv: HTMLDivElement;
  headerTable: HTMLDivElement | undefined;
  bodyTable: HTMLDivElement | undefined;
  indexTable: number = 0;
  pressed: boolean = false;
  traceEnable: boolean = $GF.trace.isEnabled();
  startX: number = 0;
  startWidth: any = 0;
  column: any;

  /** @ngInject */
  constructor($scope: gf.TInspectOptionsScope, $element) {
    let n = 0;
    this.statesTableData = {
      data: this.getStates(),
      columns: [
        {
          index: n++,
          id: 'expand',
          label: '<>',
          desc: 'Show/Hide detail',
          width: '30px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'id',
          label: 'ID',
          desc: 'Uniq Id',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'label',
          label: 'Label',
          desc: 'Text/Label',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'shape',
          label: 'Shape',
          desc: 'Draw.io shape model',
          width: '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'level',
          label: 'Lvl',
          desc: 'Current level',
          width: '45px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'rval',
          label: 'R.Val.',
          desc: 'Raw value',
          width: '80px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'fval',
          label: 'F.Val.',
          desc: 'Formated value',
          width: '80px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'colors',
          label: 'Colors',
          desc: 'Shape ID',
          width: '80px',
          sort: 'asc',
          select: false,
        },
        {
          index: n++,
          id: 'tags',
          label: 'Tags',
          desc: 'Tags',
          width: '100px',
          sort: 'asc',
          select: false,
        },
      ],
    };
    $scope.editor = this;
    $scope.$GF = $GF.me();
    const $div = $element.find('#templateInspect');
    this.parentDiv = $div[0];
    const $statesTable = $div.find('#StatesTable');
    const statesTable = $statesTable[0];
    this.statesTable = new GFTable(this.statesTableData, statesTable);
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
    const xcell = state.getXCell();
    if (xcell.getId() !== xcell.getDefaultId()) {
      const sh = this.flowchartHandler.getFlowchart().getStateHandler();
      if (sh !== undefined) {
        sh.edited = true;
      }
    }
  }

  isEdited(state: State): boolean {
    const xcell = state.getXCell();
    return xcell.getId() !== xcell.getDefaultId();
  }

  // onEdit(state: State) {
  //   // state.edit = true;
  //   // state.newcellId = state.id;
  //   // let stateHandler = this.flowchartHandler.getFlowchart().getStateHandler();
  //   // stateHandler.edited = true;
  //   const elt = document.getElementById(state.id);
  //   setTimeout(() => {
  //     if (elt) {
  //       elt.focus();
  //     }
  //   }, 100);
  // }

  undo(state: State) {
    const xcell = state.getXCell();
    if (this.isEdited(state)) {
      xcell.restoreId();
    }
  }

  initPreview(state : State):boolean {
    const div = document.getElementById(`preview-${state.xcell.uniqId}`)
    if(div !== null) {
      div.innerHTML = '';
      XGraph.preview(div, state.getXCell());
    }
    return true;
  }

  reset() {
    this.flowchartHandler.draw();
    this.flowchartHandler.refresh();
    const flowchart = this.flowchartHandler.getFlowchart();
    const sh = flowchart.getStateHandler();
    if (sh !== undefined) {
      const states = sh.getStates();
      states.forEach(state => {
        if (this.isEdited(state)) {
          const xcell = state.getXCell();
          xcell.restoreId();
        }
      });
      sh.edited = false;
    }
    // this.$scope.$apply();
  }

  apply() {
    const flowchart = this.flowchartHandler.getFlowchart();
    const sh = flowchart.getStateHandler();
    if (sh !== undefined) {
      // const states = sh.getStates();
      // states.forEach(state => {
      //   if (state.edited && state.previousId) {
      //     flowchart.renameId(state.previousId, state.id);
      //     state.edited = false;
      //   }
      // });
      sh.edited = false;
    }
    flowchart.applyModel();
    this.ctrl.notify('Save the dashboard to apply the modifications');
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
    const xcell = state.getXCell();
    switch (col) {
      case 'id':
        return xcell.getId();
        break;
      case 'level':
        return state.getTextLevel();
        break;
      case 'label':
        return xcell.getLabel();
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
    templateUrl: `${$GF.plugin.getPartialPath()}inspect/inspectTab.html`,
    controller: InspectOptionsCtrl,
  };
}
