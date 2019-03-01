import _ from 'lodash';
import { plugin } from './plugin';

export class InspectOptionsCtrl {

    /** @ngInject */
    constructor($scope) {
        $scope.editor = this;
        this.panelCtrl = $scope.ctrl;
        this.panel = this.panelCtrl.panel;
        this.fontSizes = ['80%', '90%', '100%', '110%', '120%', '130%', '150%', '160%', '180%', '200%', '220%', '250%'];
    }

    render() {
        this.panelCtrl.render();

    }

    onMouseOver(id) {
        let model = this.panelCtrl.graph.getModel()
        let cell = model.getCell(id)
        this.panelCtrl.graph.setSelectionCell(cell);
    }

    onMouseLeave() {
        this.panelCtrl.graph.clearSelection();
    }

}

/** @ngInject */
export function inspectOptionsTab($q, uiSegmentSrv) {
    'use strict';
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'public/plugins/' + plugin.id + '/partials/inspect_options.html',
        controller: InspectOptionsCtrl,
    };
}
