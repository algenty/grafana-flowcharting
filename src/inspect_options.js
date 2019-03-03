import _ from 'lodash';
import {
    plugin
} from './plugin';

export class InspectOptionsCtrl {

    /** @ngInject */
    constructor($scope) {
        $scope.editor = this;
        this.panelCtrl = $scope.ctrl;
        this.panel = this.panelCtrl.panel;
        this.mx = this.panelCtrl.mx;
        this.colors = ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'];
        this.colorModes = [{
                text: 'Disabled',
                value: null
            },
            {
                text: 'Stroke',
                value: this.mx.STYLE_STROKECOLOR
            },
            {
                text: 'Fill',
                value: this.mx.STYLE_FILLCOLOR
            },
            {
                text: 'Text',
                value: this.mx.STYLE_FONTCOLOR
            },
        ];
        this.colorMode = this.mx.STYLE_FILLCOLOR;
        $scope.mx = this.panelCtrl.mx;
        this.fontSizes = ['80%', '90%', '100%', '110%', '120%', '130%', '150%', '160%', '180%', '200%', '220%', '250%'];
    }

    render() {
        this.panelCtrl.render();
    }

    onColorChange(styleIndex, colorIndex) {
        return newColor => {
            this.colors[colorIndex] = newColor;
        };
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