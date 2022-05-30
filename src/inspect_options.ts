import { FlowchartHandler } from './flowchart_handler';
import { State } from 'state_class';
import { $GF, GFPlugin, GFTable } from 'globals_class';
import { StateHandler } from 'states_handler';
import { orderBy as _orderBy } from 'lodash';
import { XGraph } from 'graph_class';
import { FlowchartCtrl } from 'flowchart_ctrl';


export class InspectOptionsCtrl {
  $gf: $GF;
  enable = false; // enable inspector or not
  ctrl: FlowchartCtrl;
  flowchartHandler: FlowchartHandler | undefined;
  stateHandler: StateHandler | undefined;
  statesTableData: gf.TTableData;
  statesTable: GFTable;
  // panel: any;
  parentDiv: HTMLDivElement;
  headerTable: HTMLDivElement | undefined;
  bodyTable: HTMLDivElement | undefined;
  indexTable = 0;
  pressed = false;
  // traceEnable: boolean = $GF.trace.isEnabled();
  startX = 0;
  startWidth: any = 0;
  column: any;
  $sce: any;

  /** @ngInject */
  constructor($scope: gf.TInspectOptionsScope, $element: any, $sce: any) {
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
    const $div = $element.find('#templateInspect');
    this.parentDiv = $div[0];
    const $statesTable = $div.find('#StatesTable');
    const statesTable = $statesTable[0];
    this.statesTable = new GFTable(this.statesTableData, statesTable);
    this.ctrl = $scope.ctrl;
    $scope.GFPlugin = this.ctrl.GFPlugin;
    $scope.$GF = this.ctrl.$gf;
    this.$sce = $sce;
    this.$gf = this.ctrl.$gf; // this.panel = this.ctrl.panel;
    this.flowchartHandler = this.ctrl.flowchartHandler;
    this.stateHandler = this.flowchartHandler?.getFlowchart().getStateHandler();
    // add unsafe to angular module
    // console.log(angular);
    // angular.module("grafana.filters").filter('gf_unsafe', ['$sce', ($sce: any) => {
    //   return (input: any) =>{
    //     return $sce.trustAs('html', input);
    //   }
    // }]);
  }

  // render() {
  //   this.ctrl.render();
  // }

  // onChangeId(state: State) {
  //   const xcell = state.getXCell();
  //   if (xcell.getId() !== xcell.getDefaultId()) {
  //     const sh = this.flowchartHandler?.getFlowchart().getStateHandler();
  //     if (sh !== undefined) {
  //       sh.edited = true;
  //     }
  //   }
  // }

  // isEdited(state: State): boolean {
  //   const xcell = state.getXCell();
  //   return xcell.getId() !== xcell.getDefaultId();
  // }

  // undo(state: State) {
  //   const xcell = state.getXCell();
  //   if (this.isEdited(state)) {
  //     xcell.restoreId();
  //   }
  // }

  initPreview(state: State): boolean {
    const div = document.getElementById(`preview-${state.xcell.getId()}`);
    if (div !== null) {
      div.innerHTML = '';
      XGraph.preview(div, state.getXCell());
    }
    return true;
  }

  renderStyles(state: State) {
    let htmlStyles = '<div class="gf-table-content" style="text-align: center;">';
    const tbl: gf.TStyleColorKeys[] = ['fontColor', 'fillColor', 'strokeColor']
    tbl.forEach((style: gf.TStyleColorKeys) => {
      htmlStyles = `${htmlStyles}\n
      <div style="display:table-cell;vertical-align:middle;">
        ${this.renderStyle(state, style)}
      </div>
      `;
    });
    htmlStyles = htmlStyles + '</div>';
    return this.$sce.trustAsHtml(htmlStyles);
  }

  renderStyle(state: State, style: gf.TStyleColorKeys) {
    const color = state.getStatus(style);
    const toShow = state.haveStatus(style) && color.length > 0 && color !== 'none';
    let html = '';
    if (!toShow) {
      return this.$sce.trustAsHtml(html);
    }
    let letter, desc;
    switch (style) {
      case 'fillColor':
        letter = 'F';
        desc = 'Fill color';
        break;
      case 'strokeColor':
        letter = 'S';
        desc = 'Border/stroke color';
        break;
      case 'fontColor':
        letter = 'T';
        desc = 'Text/Font color';
        break;
    }
    html = `
      <div title="${desc} : ${color}"
          class="gf-inspect-color-picker"
          style="background-color: ${color};">
          <span>${letter}</span>
      </div>
    `;
    return this.$sce.trustAsHtml(html);
  }

  // reset() {
  //   const flowchart = this.flowchartHandler?.getFlowchart();
  //   const sh = flowchart?.getStateHandler();
  //   if (sh) {
  //     const states = sh.getStates();
  //     states.forEach(state => {
  //       if (this.isEdited(state)) {
  //         const xcell = state.getXCell();
  //         xcell.restoreId();
  //       }
  //     });
  //     sh.edited = false;
  //     this.flowchartHandler?.change();
  //   }
  // }

  // apply() {
  //   const flowchart = this.flowchartHandler?.getFlowchart();
  //   const sh = flowchart?.getStateHandler();
  //   if (sh) {
  //     sh.edited = false;
  //   }
  //   flowchart?.applyModel();
  //   this.$gf.notify('Save the dashboard to apply the modifications');
  // }

  // selectCell(state: State) {
  //   state.highlightCell();
  // }

  // unselectCell(state: State) {
  //   state.unhighlightCell();
  // }

  getStates(): State[] {
    if (this.stateHandler) {
      const states = this.stateHandler.getStatesForInspect();
      return _orderBy(states, ['cellId', 'globalLevel'], ['asc']);
    }
    return [];
  }

  // getStateValue(state: State, col: string): string | null {
  //   const xcell = state.getXCell();
  //   switch (col) {
  //     case 'id':
  //       return xcell.getId();
  //       break;
  //     case 'level':
  //       return state.getTextLevel();
  //       break;
  //     case 'label':
  //       return xcell.getLabel();
  //       break;
  //     default:
  //       return null;
  //       break;
  //   }
  // }

  // tracePerf() {
  //   if (this.traceEnable) {
  //     $GF.trace.enable();
  //   } else {
  //     $GF.trace.disable();
  //   }
  // }

  anonymize() {
    const fc = this.flowchartHandler?.getFlowchart();
    const xg = fc?.getXGraph();
    if (xg) {
      xg.anonymize();
    }
  }

  // debugCtrl() {
  //   console.log(this.ctrl);
  // }
}

/** @ngInject */
export function inspectOptionsTab($q: any, uiSegmentSrv: any) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `${GFPlugin.getPartialPath()}inspect/inspectTab.html`,
    controller: InspectOptionsCtrl,
  };
}
