import {XGraph} from '../src/graph_class';
import { GFDrawio } from '../src/drawio_base';
import { $GF } from '../src/globals_class';
import { XCell } from '../src/cell_class';

const $scope = require('$scope');
const templateSrv = {};
const dashboard = {};
const ctrl = {
  notify: jest.fn(),
  clearNotify: jest.fn(),
};
const xmlGraph=`
<mxGraphModel dx="1376" dy="768" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <object label="myLabel" DATA="myData" id="myId">
      <mxCell style="rounded=1;whiteSpace=wrap;html=1;" parent="1" vertex="1">
        <mxGeometry x="320" y="80" width="120" height="60" as="geometry" />
      </mxCell>
    </object>
  </root>
</mxGraphModel>
`;

describe('Transerval testing',() => {
  describe('Xcell infromation',() => {
    let xgraph, options, $gf, div;
    beforeEach(async () => {
      div = document.createElement('div');
      $gf = $GF.create($scope, templateSrv, dashboard, ctrl);
      await GFDrawio.init({ mode: 'local' });
      xgraph = new XGraph($gf, div, 'xml', xmlGraph);
      await xgraph.init_graph();
      expect(xgraph.isInitialized()).toBeTruthy();
    });
    test('get Xcell', () => {
      const xcell: XCell = xgraph.getXCell('myId');
      expect(xcell).not.toBeUndefined();
      expect(xcell.getLabel()).toBe('myLabel');
      expect(xcell.getMetadata('DATA')).toBe('myData');
    });

    test('get Xcell by id', () => {
      const xcell: XCell = xgraph.getXCell('myId');
      const options = {
        identByProp: 'id',
        metadata: undefined,
        enableRegEx: false,
      }
      expect(xcell.getDefaultValues(options)).toBe('myId');
    });
    test('get Xcell by label', () => {
      const xcell: XCell = xgraph.getXCell('myId');
      const options = {
        identByProp: 'value',
        metadata: undefined,
        enableRegEx: false,
      }
      expect(xcell.getDefaultValues(options)).toBe('myLabel');
    });

    test('get Xcell by metadata', () => {
      const xcell: XCell = xgraph.getXCell('myId');
      const options = {
        identByProp: 'metadata',
        metadata: 'DATA',
        enableRegEx: false,
      }
      expect(xcell.getDefaultValues(options)).toBe('myData');
    });

  });

});
