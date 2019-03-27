import 'jest-dom/extend-expect';
import * as angular from 'angular';
import MxGraph from "../src/graph_class";

document.body.innerHTML = '<div id="MyContainer">Beer</div>';
var xmlGraph = '<mxGraphModel dx="1073" dy="521" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="arrow-1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-grafana" target="shape-love" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><object label="Grafana" href="www.google.fr" id="shape-grafana"><mxCell style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" parent="1" vertex="1"><mxGeometry x="10" y="10" width="120" height="60" as="geometry"/></mxCell></object><mxCell id="arrow-2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="shape-love" target="shape-mxgraph" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="shape-love" value="loves" style="triangle;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;shadow=1;" parent="1" vertex="1"><mxGeometry x="210" width="60" height="80" as="geometry"/></mxCell><mxCell id="shape-mxgraph" value="mxGraph" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;shadow=1;" parent="1" vertex="1"><mxGeometry x="340" width="120" height="80" as="geometry"/></mxCell><mxCell id="text-grafana" value="MyText : TextVal" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="9" y="50" width="120" height="20" as="geometry"/></mxCell><mxCell id="text-arrow1" value="Text 2" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="150" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-arrow2" value="Text 3" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="280" y="20" width="40" height="20" as="geometry"/></mxCell><mxCell id="text-mxgraph" value="Text 4" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" parent="1" vertex="1"><mxGeometry x="380" y="50" width="40" height="20" as="geometry"/></mxCell></root></mxGraphModel>';
// var default_value = '<mxStylesheet></mxStylesheet>';
// var default_xml = new DOMParser().parseFromString(default_value, "application/xml");

describe("DOM", function () {

    test('container', () => {
        var container = document.getElementById("MyContainer");
        expect(container).toHaveTextContent(/Beer/);
    });

});

describe("Object", function () {
    var container = document.getElementById("MyContainer");
    test('with properties', () => {
        let mx = new MxGraph(container, xmlGraph);
        expect(mx).toMatchObject({ "lock": true, "xmlGraph": xmlGraph, "container": container });
    });

    test('have text Grafana', () => {
        let mx = new MxGraph(container, xmlGraph);
        mx.drawGraph();
        expect(container).toHaveTextContent(/Grafana/);
    });

    test('refresh', () => {
        let mx = new MxGraph(container, xmlGraph);
        mx.drawGraph();
        mx.refreshGraph();
        expect(container).toHaveTextContent(/Grafana/);
    });


    // test('contains SVG', () => {
    //     let mx = new MxGraph(container, xmlGraph);
    //     mx.drawGraph();
    //     console.log("container", container)
    //     expect(container).toContainHTML("SVG");
    // });
});

describe("Cells", function () {
    var container = document.getElementById("MyContainer");
    let mx = new MxGraph(container, xmlGraph);
    mx.drawGraph();

    test('original by id', () => {
        expect(mx.getOrignalCells("id")).toContain("text-mxgraph");
        expect(mx.getOrignalCells("id")).toContain("shape-mxgraph");
        expect(mx.getOrignalCells("id")).toContain("shape-grafana");
    });

    test('original by value', () => {
        expect(mx.getOrignalCells("value")).toContain("loves");
        expect(mx.getOrignalCells("value")).toContain("mxGraph");
        expect(mx.getOrignalCells("value")).toContain("Text 4");
    });


    test('Find shape-grafana', () => {
        var cell = mx.findCurrentMxCells("id", "shape-grafana");
        expect(cell.length).toBe(1);
    });

    test('Find all cell with id begins by shape', () => {
        var cell = mx.findCurrentMxCells("id", "shape.*");
        expect(cell.length).toBe(3);
    });

    test('get colors', () => {
        var cell = mx.findCurrentMxCells("id", "shape-grafana");
        expect(mx.getStyleCell("fillColor",cell[0])).toBe("#ffe6cc");
        expect(mx.getStyleCell("strokeColor",cell[0])).toBe("#d79b00");
        expect(mx.getStyleCell("fontColor",cell[0])).toBe("#774400");
    });

    test('set colors', () => {
        var cell = mx.findCurrentMxCells("id", "shape-grafana");
        mx.setStyleCell("fillColor",cell,"#112233");
        mx.setStyleCell("strokeColor",cell,"#334455");
        mx.setStyleCell("fontColor",cell,"#556677");
        expect(mx.getStyleCell("fillColor",cell[0])).toBe("#112233");
        expect(mx.getStyleCell("strokeColor",cell[0])).toBe("#334455");
        expect(mx.getStyleCell("fontColor",cell[0])).toBe("#556677");
    });

});

describe("Options", function () {
    var container = document.getElementById("MyContainer");
    test('Scale', () => {
        let mx = new MxGraph(container, xmlGraph);
        mx.scaleGraph(true);
        expect(mx.scale).toBeTruthy();
        mx.scaleGraph(false);
        expect(mx.scale).toBeFalsy();
    });
    test('Lock', () => {
        let mx = new MxGraph(container, xmlGraph);
        mx.lockGraph(true);
        expect(mx.lock).toBeTruthy();
        mx.lockGraph(false);
        expect(mx.lock).toBeFalsy();
    });
});
