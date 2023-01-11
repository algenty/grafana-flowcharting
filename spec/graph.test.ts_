import { XGraph } from '../src/graph_class';
import { GFDrawio } from '../src/drawio_base';
import { $GF } from '../src/globals_class';
import fs from 'fs';
const xml = fs.readFileSync('src/static/defaultGraph.drawio').toString();
const csv = fs.readFileSync('src/static/defaultGraph.csv').toString();

const $scope = require('$scope');
const templateSrv = {};
const dashboard = {};
const ctrl = {
  notify: jest.fn(),
  clearNotify: jest.fn(),
};

// document.body.innerHTML = '<div id="MyContainer">Beer</div>';
describe('Xgraph class test', () => {
  // await loadLibs();
  // const xmlGraph = `<mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  //   <root>
  //     <mxCell id="0" />
  //     <mxCell id="1" parent="0" />
  //     <mxCell id="100" value="A" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#123456;" vertex="1" parent="1">
  //       <mxGeometry x="240" y="120" width="120" height="60" as="geometry" />
  //     </mxCell>
  //     <mxCell id="200" value="B" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#654321;" vertex="1" parent="1">
  //       <mxGeometry x="400" y="120" width="120" height="60" as="geometry" />
  //     </mxCell>
  //   </root>
  // </mxGraphModel>`;
  describe('DOM', () => {
    describe('Xgraph', () => {
      let $gf;
      beforeAll(async () => {
        $gf = $GF.create($scope, templateSrv, dashboard, ctrl);
        await GFDrawio.init({ mode: 'local' });
        expect(GFDrawio.isInitalized()).toBe(true);
      });
      test('should not null', () => {
        const div = document.createElement('div');
        const xgraph = new XGraph($gf, div, 'xml', xml);
        expect(xgraph).not.toBeUndefined();
      });
      describe('XML graph', () => {
        let div, xgraph;
        beforeEach(async () => {
          div = document.createElement('div');
          xgraph = new XGraph($gf, div, 'xml', xml);
          await xgraph.init_graph();
          expect(xgraph.isInitialized()).toBeTruthy();
        });
        test('get properties', async () => {
          expect(xgraph.getXCell('30')).not.toBeUndefined();
          const cell_star = xgraph.getXCell('30');
          //TODO : id for state or xcell ?
          // expect(cell_star.iud).toBe(cell_star.mxcell.id);
          expect(cell_star.getLabel()).toBe('Star the project');
          expect(cell_star.getLink()).toBe('https://github.com/algenty/grafana-flowcharting');
          expect(cell_star.getStyle('fontColor')).toBe('#6E6E6E');
          expect(cell_star.getId()).toBe('30');
        });
        test('set/get style', async () => {
          expect(xgraph.getXCell('27')).not.toBeUndefined();
          const cell_prometheus = xgraph.getXCell('27');
          expect(cell_prometheus.getStyle('fillColor')).toBe('#FFFFFF');
          cell_prometheus.setStyle('fillColor', '#AAAAAA');
          expect(cell_prometheus.getStyle('fillColor')).toBe('#AAAAAA');
          cell_prometheus.restoreStyle('fillColor');
          expect(cell_prometheus.getStyle('fillColor')).toBe('#FFFFFF');
          expect(cell_prometheus.getStyle('strokeColor')).toBe('#F9B11F');
        });
      });
    });
  });
});
