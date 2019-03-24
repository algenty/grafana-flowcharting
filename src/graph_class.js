
window.mxLanguages = window.mxLanguages || ["en"];

var sanitizer = require("sanitizer");
var mxgraph = require("mxgraph")({
    mxImageBasePath:
        "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/src/images",
    mxBasePath:
        "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist",
    mxLoadStylesheets: false,
    mxLanguage: "en",
    mxLoadResources: false
});

window.BASE_PATH =
    window.BASE_PATH ||
    "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist/";
window.RESOURCES_PATH = window.BASE_PATH || window.BASE_PATH + "resources";
window.RESOURCE_BASE =
    window.RESOURCE_BASE || window.RESOURCES_PATH + "/grapheditor";
window.STENCIL_PATH = window.STENCIL_PATH || window.BASE_PATH + "stencils";
window.IMAGE_PATH = window.IMAGE_PATH || window.BASE_PATH + "images";
window.STYLE_PATH = window.STYLE_PATH || window.BASE_PATH + "styles";
window.CSS_PATH = window.CSS_PATH || window.BASE_PATH + "styles";
window.mxLanguages = window.mxLanguages || ["en"];

// Put to global vars to work
window.mxActor = window.mxActor || mxgraph.mxActor;
window.mxArrow = window.mxArrow || mxgraph.mxArrow;
window.mxArrowConnector = window.mxArrowConnector || mxgraph.mxArrowConnector;
window.mxCell = window.mxCell || mxgraph.mxCell;
window.mxCellEditor = window.mxCellEditor || mxgraph.mxCellEditor;
window.mxCellHighlight = window.mxCellHighlight || mxgraph.mxCellHighlight;
window.mxCellOverlay = window.mxCellOverlay || mxgraph.mxCellOverlay;
window.mxCellRenderer = window.mxCellRenderer || mxgraph.mxCellRenderer;
window.mxCellState = window.mxCellState || mxgraph.mxCellState;
window.mxClient = window.mxClient || mxgraph.mxClient;
mxClient.mxBasePath =
    "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist";
mxClient.mxImageBasePath =
    "public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/src/images";
mxClient.mxLoadResources = true;
mxClient.mxLanguage = "en";
mxClient.mxLoadStylesheets = true;
window.mxCloud = window.mxCloud || mxgraph.mxCloud;
window.mxCodec = window.mxCodec || mxgraph.mxCodec;
window.mxCompactTreeLayout =
    window.mxCompactTreeLayout || mxgraph.mxCompactTreeLayout;
window.mxConnectionConstraint =
    window.mxConnectionConstraint || mxgraph.mxConnectionConstraint;
window.mxConnectionHandler =
    window.mxConnectionHandler || mxgraph.mxConnectionHandler;
window.mxConnector = window.mxConnector || mxgraph.mxConnector;
window.mxConstants = window.mxConstants || mxgraph.mxConstants;
window.mxConstraintHandler =
    window.mxConstraintHandler || mxgraph.mxConstraintHandler;
window.mxCylinder = window.mxCylinder || mxgraph.mxCylinder;
window.mxDefaultKeyHandler =
    window.mxDefaultKeyHandler || mxgraph.mxDefaultKeyHandler;
window.mxDefaultPopupMenu =
    window.mxDefaultPopupMenu || mxgraph.mxDefaultPopupMenu;
window.mxDefaultToolbar = window.mxDefaultToolbar || mxgraph.mxDefaultToolbar;
window.mxDivResizer = window.mxDivResizer || mxgraph.mxDivResizer;
window.mxDoubleEllipse = window.mxDoubleEllipse || mxgraph.mxDoubleEllipse;
window.mxDragSource = window.mxDragSource || mxgraph.mxDragSource;
window.mxEdgeStyle = window.mxEdgeStyle || mxgraph.mxEdgeStyle;
window.mxEdgeHandler = window.mxEdgeHandler || mxgraph.mxEdgeHandler;
window.mxEditor = window.mxEditor || mxgraph.mxEditor;
window.mxElbowEdgeHandler =
    window.mxElbowEdgeHandler || mxgraph.mxElbowEdgeHandler;
window.mxEllipse = window.mxEllipse || mxgraph.mxEllipse;
window.mxEvent = window.mxEvent || mxgraph.mxEvent;
window.mxEventObject = window.mxEventObject || mxgraph.mxEventObject;
window.mxFile = window.mxFile || mxgraph.mxFile;
window.mxGeometry = window.mxGeometry || mxgraph.mxGeometry;
window.mxGraph = window.mxGraph || mxgraph.mxGraph;
window.mxGraphHandler = window.mxGraphHandler || mxgraph.mxGraphHandler;
window.mxGraphModel = window.mxGraphModel || mxgraph.mxGraphModel;
window.mxGraphView = window.mxGraphView || mxgraph.mxGraphView;
window.mxGuide = window.mxGuide || mxgraph.mxGuide;
window.mxHexagon = window.mxHexagon || mxgraph.mxHexagon;
window.mxHandle = window.mxHandle || mxgraph.mxHandle;
window.mxImage = window.mxImage || mxgraph.mxImage;
window.mxImageShape = window.mxImageShape || mxgraph.mxImageShape;
window.mxKeyHandler = window.mxKeyHandler || mxgraph.mxKeyHandler;
window.mxLabel = window.mxLabel || mxgraph.mxLabel;
window.mxLayoutManager = window.mxLayoutManager || mxgraph.mxLayoutManager;
window.mxLine = window.mxLine || mxgraph.mxLine;
window.mxMarker = window.mxMarker || mxgraph.mxMarker;
window.mxOutline = window.mxOutline || mxgraph.mxOutline;
window.mxPanningHandler = window.mxPanningHandler || mxgraph.mxPanningHandler;
window.mxPerimeter = window.mxPerimeter || mxgraph.mxPerimeter;
window.mxPoint = window.mxPoint || mxgraph.mxPoint;
window.mxPolyline = window.mxPolyline || mxgraph.mxPolyline;
window.mxPopupMenu = window.mxPopupMenu || mxgraph.mxPopupMenu;
window.mxPopupMenuHandler =
    window.mxPopupMenuHandler || mxgraph.mxPopupMenuHandler;
window.mxPrintPreview = window.mxPrintPreview || mxgraph.mxPrintPreview;
window.mxRectangle = window.mxRectangle || mxgraph.mxRectangle;
window.mxRectangleShape = window.mxRectangleShape || mxgraph.mxRectangleShape;
window.mxResources = window.mxResources || mxgraph.mxResources;
window.mxRhombus = window.mxRhombus || mxgraph.mxRhombus;
window.mxRubberband = window.mxRubberband || mxgraph.mxRubberband;
window.mxShape = window.mxShape || mxgraph.mxShape;
window.mxStackLayout = window.mxStackLayout || mxgraph.mxStackLayout;
window.mxStencil = window.mxStencil || mxgraph.mxStencil;
window.mxStencilRegistry =
    window.mxStencilRegistry || mxgraph.mxStencilRegistry;
window.mxStylesheet = window.mxStylesheet || mxgraph.mxStylesheet;
window.mxStyleRegistry = window.mxStyleRegistry || mxgraph.mxStyleRegistry;
window.mxSvgCanvas2D = window.mxSvgCanvas2D || mxgraph.mxSvgCanvas2D;
window.mxSwimlane = window.mxSwimlane || mxgraph.mxSwimlane;
window.mxText = window.mxText || mxgraph.mxText;
window.mxToolbar = window.mxToolbar || mxgraph.mxToolbar;
window.mxTriangle = window.mxTriangle || mxgraph.mxTriangle;
window.mxUndoManager = window.mxUndoManager || mxgraph.mxUndoManager;
window.mxUtils = window.mxUtils || mxgraph.mxUtils;
window.mxValueChange = window.mxValueChange || mxgraph.mxValueChange;
window.mxVertexHandler = window.mxVertexHandler || mxgraph.mxVertexHandler;

export default class MxGraph {
    /** @ngInject */
    constructor($scope, elem, container, xmlGraph) {
        this.$scope = $scope;
        this.container = container;
        this.xmlGraph;
        if (u.isencoded(xmlGraph)) this.xmlGraph = u.decode(xmlGraph, true, true, true);
        else this.xmlGraph = xmlGraph;
        this.xmlGraph = xmlGraph;
        this.graph;
        this.scale = true;
        this.lock = true;
        this.center = true;
        this.zoom = false;
        this.zoomPercent = "1";
    }

    initGraph() {
        this.$elem.html(this.$graphCanvas);
        let Graph = require("./Graph")({
            "libs": "arrows;basic;bpmn;flowchart"
        });
        let Shapes = requires("./Shapes");
        this.graph = new Graph(this.container);
    };

    drawGraph() {
        this.graph.getModel().beginUpdate();
        this.graph.getModel().clear();
        try {
            let xmlDoc = mxUtils.parseXml(text);
            let codec = new mxCodec(xmlDoc);
            codec.decode(xmlDoc.documentElement, this.graph.getModel());
        } catch (error) {
            console.error(error);
        } finally {
            this.graph.getModel().endUpdate();
        }
    }

    refreshGraph() {
        var width = this.container.width()
        var heigth = this.container.heigth();
        var size = Match.min(width, heigth);
        var cssGraph = {
            margin: "auto",
            position: "relative",
            height: size - 30 + "px"
        }
        this.$graphCanvas.css(cssGraph);

        if(this.lock) this.lockGraph();
        else this.unlock();

        if (this.center) this.centerGraph();
        else this.uncenterGraph();

        if (this.scale) this.scaleGraph();
        else this.unscaleGraph();

        if(this.zoom) this.zoomGraph(this.zoom);
        else this.unzoomGraph();
    }

    lockGraph() {
        this.graph.setEnabled(false);
        this.lock = true;
    }

    unlockGraph() {
        this.graph.setEnabled(false);
        this.lock = false;
    }

    centerGraph() {
        this.graph.center(true, true);
        this.center = true;
    }

    uncenterGraph() {
        this.graph.center(false, false);
        this.center = false
    }

    scaleGraph() {
        this.graph.fit();
        this.graph.view.rendering = true;
        this.scale = true;
    }

    unscaleGraph() {
        this.scale = false;
    }

    zoomGraph(percent) {
        if( percent && percent.legth > 0 &&  percent != "100%" && percent != "0%") {
            let ratio = percent.replace("%","") / 100;
            this.graph.zoomTo(ration,true);
            this.zoomPercent = percent;
        }
        this.zoom = true;
    }

    unzoomGraph() {
        this.zoom = false;
        this.graph.zoomActual();
    }

    getMxGraph() { return this.graph }
    getxmlGraph() { return this.xmlGraph }
    setXmlGraph(xmlGraph) {
        if (u.isencoded(xmlGraph)) this.xmlGraph = u.decode(xmlGraph, true, true, true);
        else this.xmlGraph = xmlGraph;
        this.drawGraph();
    }

    updateCells(states) { 

    };

}