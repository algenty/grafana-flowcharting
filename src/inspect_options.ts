import { FlowchartHandler } from './flowchartHandler';
import { State } from 'state_class';
import { $GF, GFTable } from 'globals_class';
import { StateHandler } from 'statesHandler';
import _ from 'lodash';
// import { MetricHandler } from './metricHandler';

export class InspectOptionsCtrl {
  enable = false; // enable inspector or not
  ctrl: any; //TODO: define type
  flowchartHandler: FlowchartHandler;
  stateHandler: StateHandler | undefined;
  statesTableData: gf.TTableData;
  statesTable : GFTable;
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
    this.statesTableData = {
      data: this.getStates(),
      columns: [
        {
          index: 0,
          id: 'id',
          label: 'ID',
          desc: 'Uniq Id',
          size : '25px',
          sort: 'asc',
          select: false,
        },
        {
          index: 1,
          id: 'label',
          label: 'Label',
          desc: 'Text/Label',
          size : '100px',
          sort: 'asc',
          select: false,
        },
        {
          index: 2,
          id: 'level',
          label: 'Lvl',
          desc: 'Current level',
          size : '45px',
          sort: 'asc',
          select: false,
        },
        {
          index: 3,
          id: 'rval',
          label: 'R.Val.',
          desc: 'Raw value',
          size : '80px',
          sort: 'asc',
          select: false,
        },
        {
          index: 4,
          id: 'fval',
          label: 'F.Val.',
          desc: 'Formated value',
          size : '80px',
          sort: 'asc',
          select: false,
        },
        {
          index: 4,
          id: 'colors',
          label: 'Colors',
          desc: 'Shape ID',
          size : '80px',
          sort: 'asc',
          select: false,
        },
        {
          index: 6,
          id: 'tags',
          label: 'Tags',
          desc: 'Tags',
          size : '100px',
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
    this.flowchartHandler.draw();
    this.flowchartHandler.refresh();
    const flowchart = this.flowchartHandler.getFlowchart();
    const sh = flowchart.getStateHandler();
    if (sh !== undefined) {
      const states = sh.getStates();
      states.forEach(state => {
        state.edit = false;
        if(state.edited && state.cellId && state.previousId) {
          state.cellId = state.previousId;
          state.edited = false;
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
    this.ctrl.notify("Save the dashboard to apply the modifications");
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
      case 'id':
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

  onMouseMove(event: MouseEvent) {
    if (this.pressed && this.headerTable && this.headerTable.parentNode) {
      const decaleColumns = function(node : HTMLElement | null) {
        while (node !== null) {
          const prec = node.previousElementSibling as HTMLElement;
          let newLeft = 0;
          if (prec) {
            newLeft = parseInt(prec.style.width, 10) + parseInt(prec.style.left, 10);
          }
          node.style.left = `${newLeft}px`;
          node = node.nextElementSibling as HTMLElement;
        }
      }
      const delta = event.pageX - this.startX;
      const width = this.startWidth + delta;
      this.headerTable.style.width = `${width}px`;
      decaleColumns(<HTMLElement >this.headerTable.nextElementSibling)

      if (this.bodyTable) {
        const rows = this.bodyTable.querySelectorAll('.GF_table-rows');
        Array.from(rows).forEach(r => { 
          let cell = r.firstElementChild as HTMLElement;
          for (let index = 0; index < this.indexTable; index++) {
            cell = cell.nextElementSibling as HTMLElement;
          }
          cell.style.width = `${width}px`;
          decaleColumns(<HTMLElement > cell.nextElementSibling)
        });
      }
    }
  }

  onMouseDown(event: any) {
    this.pressed = true;
    this.startX = event.pageX;
    // console.log('onMouseDown',event);
    this.headerTable = event.currentTarget.parentElement;
    if (this.headerTable) {
      if (this.headerTable.parentNode) {
        this.indexTable = Array.from(this.headerTable.parentNode.children).indexOf(this.headerTable);
      }
      this.headerTable.classList.add('GF_resizing');
      this.startWidth = parseInt(this.headerTable.style.width, 10);
      this.bodyTable = <HTMLDivElement>this.parentDiv.getElementsByClassName('GF_table-body')[0];
    }
  }

  onMouseUp(event: MouseEvent) {
    this.pressed = false;
    if (this.headerTable) {
      this.headerTable.classList.remove('GF_resizing');
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
