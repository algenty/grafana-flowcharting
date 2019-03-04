import _ from 'lodash';
import { plugin } from './plugin';

export class FlowchartOptionsCtrl {

    /** @ngInject */
    constructor($scope) {
        $scope.editor = this;
        this.panelCtrl = $scope.ctrl;
        this.panel = this.panelCtrl.panel;
        this.sourceTypes = [
            { text: 'Url', value: 'url' },
            { text: 'XML Content', value: 'xml' },
            // { text: 'JSON', value: 'json' },
            // { text: 'Editor', value: 'editor' },
        ];
        this.fontSizes = ['80%', '90%', '100%', '110%', '120%', '130%', '150%', '160%', '180%', '200%', '220%', '250%'];
    }

    render() {
        this.panelCtrl.render();

    }

    onSourceChange() {
        this.panelCtrl.changedSource = true;
        this.render();
    }

    validatePercent(percentText) {
        if (percentText == null || percentText.length == 0) {
            return true
        }
        let regexPattern = new RegExp(/^\d+(\.\d+)?%{0,1}/);
        let result = regexPattern.test(percentText);
        if (!result) {
            return false;
        }
        return true;
    }


}

/** @ngInject */
export function flowchartOptionsTab($q, uiSegmentSrv) {
    'use strict';
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'public/plugins/' + plugin.id + '/partials/flowchart_options.html',
        controller: FlowchartOptionsCtrl,
    };
}
