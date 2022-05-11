import { XGraph } from '../src/graph_class';
import { $GF } from '../src/globals_class';
const fs = require('fs');
async function loadLibs() {
  await fs.readFile('src/libs/drawio/js/viewer-static.min.js', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    window.eval(data);
  });
}


// document.body.innerHTML = '<div id="MyContainer">Beer</div>';
describe.skip('Xgraph class test', async () => {
  // await loadLibs();
  const xmlGraph =
    '<mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">  <root>    <mxCell id="0" />    <mxCell id="1" parent="0" />    <mxCell id="100" value="A" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#123456;" vertex="1" parent="1">      <mxGeometry x="240" y="120" width="120" height="60" as="geometry" />    </mxCell>    <mxCell id="200" value="B" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#654321;" vertex="1" parent="1">      <mxGeometry x="400" y="120" width="120" height="60" as="geometry" /></mxCell></root></mxGraphModel>';
  describe('DOM', () => {
    describe('Xgraph', () => {
      test('should not null', () => {
        const div = document.createElement('div');
        const xgraph = new XGraph(div, 'xml',xmlGraph);
        expect(xgraph).not.toBeUndefined();
      });

      test('inspect ', () => {
        const div = document.createElement('div');
        const xgraph = new XGraph(div, 'xml', xmlGraph);
        const cells = xgraph.getXCells();
        expect(cells.includes('100')).toBe(true);
        expect(cells.includes('200')).toBe(true);
      });
    });
  });
});
