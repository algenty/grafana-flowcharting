import _ from 'lodash';
import kbn from 'app/core/utils/kbn';
import { plugin } from './plugin';

export class MappingOptionsCtrl {

    /** @ngInject */
    constructor($scope) {
        $scope.editor = this;
        $scope.mapping = this;
        this.activeStyleIndex = 0;
        this.panelCtrl = $scope.ctrl;
        this.panel = this.panelCtrl.panel;
        this.mx = this.panelCtrl.mx;
        $scope.mx = this.panelCtrl.mx;
        this.unitFormats = kbn.getUnitFormats();
        this.colorModes = [
            { text: 'Disabled', value: null },
            { text: 'Stroke', value: this.mx.STYLE_STROKECOLOR },
            { text: 'Fill', value: this.mx.STYLE_FILLCOLOR },
            { text: 'Text', value: this.mx.STYLE_FONTCOLOR },
        ];
        this.metricTypes = [
            { text: 'Number', value: 'number' },
            { text: 'String', value: 'string' },
            { text: 'Date', value: 'date' },
            { text: 'Hidden', value: 'hidden' },
        ];
        this.fontSizes = ['80%', '90%', '100%', '110%', '120%', '130%', '150%', '160%', '180%', '200%', '220%', '250%'];
        this.dateFormats = [
            { text: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
            { text: 'YYYY-MM-DD HH:mm:ss.SSS', value: 'YYYY-MM-DD HH:mm:ss.SSS' },
            { text: 'MM/DD/YY h:mm:ss a', value: 'MM/DD/YY h:mm:ss a' },
            { text: 'MMMM D, YYYY LT', value: 'MMMM D, YYYY LT' },
            { text: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
        ];
        this.aggregationTypes = [
            { text: 'First', value: 'first' },
            { text: 'Last', value: 'current' },
            { text: 'Min', value: 'min' },
            { text: 'Max', value: 'max' },
            { text: 'Sum', value: 'total' },
            { text: 'Avg', value: 'avg' },
            { text: 'Count', value: 'count' },
            { text: 'Delta', value: 'delta' },
            { text: 'Range', value: 'range' },
            { text: 'Diff', value: 'diff' },
        ];
        this.mappingTypes = [{ text: 'Value to text', value: 1 }, { text: 'Range to text', value: 2 }];

        this.getMetricNames = () => {
            if (!this.panelCtrl.series) {
                return [];
            }
            return _.map(this.panelCtrl.series, (t) => {
                return t.alias;
            });
        };

        this.getCellNames = () => {
            if (!this.panelCtrl.cells) {
                return [];
            }
            return _.map(this.panelCtrl.cells.rows, (t) => {
                return t.id;
            });
        }

        this.onColorChange = this.onColorChange.bind(this);
    }

    render() {
        this.panelCtrl.render();
    }

    setUnitFormat(column, subItem) {
        column.unit = subItem.value;
        this.panelCtrl.render();
    }

    addMetricStyle() {
        const newStyleRule = {
            id: ++this.panel.styleSeq,
            unit: 'short',
            type: 'number',
            alias: '',
            decimals: 2,
            colors: ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'],
            colorMode: null,
            pattern: '',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            thresholds: [],
            shapeSeq: 1,
            textSeq: 1,
            mappingType: 1,
        };

        const styles = this.panel.styles;
        const stylesCount = styles.length;
        let indexToInsert = stylesCount;

        // check if last is a catch all rule, then add it before that one
        if (stylesCount > 0) {
            const last = styles[stylesCount - 1];
            if (last.pattern === '/.*/') {
                indexToInsert = stylesCount - 1;
            }
        }

        styles.splice(indexToInsert, 0, newStyleRule);
        this.activeStyleIndex = indexToInsert;
    }

    removeMetricStyle(style) {
        this.panel.styles = _.without(this.panel.styles, style);
    }

    invertColorOrder(index) {
        const ref = this.panel.styles[index].colors;
        const copy = ref[0];
        ref[0] = ref[2];
        ref[2] = copy;
        this.panelCtrl.render();
    }

    onColorChange(styleIndex, colorIndex) {
        return newColor => {
            this.panel.styles[styleIndex].colors[colorIndex] = newColor;
            this.render();
        };
    }

    onOptionsChange() {

    }

    // onMouseOver(id) {
    //     let model = this.panelCtrl.graph.getModel()
    //     let cell = model.getCell(id)
    //     this.panelCtrl.graph.setSelectionCell(cell);

    // }

    // onMouseLeave() {
    //     this.panelCtrl.graph.clearSelection();
    // }

    addValueMap(style) {
        if (!style.valueMaps) {
            style.valueMaps = [];
        }
        style.valueMaps.push({ value: '', text: '' });
        this.panelCtrl.render();
    }

    removeValueMap(style, index) {
        style.valueMaps.splice(index, 1);
        this.panelCtrl.render();
    }

    addRangeMap(style) {
        if (!style.rangeMaps) {
            style.rangeMaps = [];
        }
        style.rangeMaps.push({ from: '', to: '', text: '' });
        this.panelCtrl.render();
    }

    removeRangeMap(style, index) {
        style.rangeMaps.splice(index, 1);
        this.panelCtrl.render();
    }

    addShapeToStyle(style) {
        console.debug("mapping.addShapeToStyle")
        if (!style.shapeMaps) {
            style.shapeMaps = [];
        }
        style.shapeMaps.push({ pattern : '/.*/', prop : 'id', id : style.shapeSeq++ })
        this.panelCtrl.render();
        console.debug(this.panel.styles)
    }

    removeShapeFromStyle(style, shape) {
        console.debug("mapping.removeShapeFromStyle")
        style.shapeMaps = _.without(style.shapeMaps, shape)
        this.panelCtrl.render();
        console.debug(this.panel.styles)
    }
}

/** @ngInject */
export function mappingOptionsTab($q, uiSegmentSrv) {
    'use strict';
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'public/plugins/' + plugin.id + '/partials/mapping_options.html',
        controller: MappingOptionsCtrl,
    };
}
