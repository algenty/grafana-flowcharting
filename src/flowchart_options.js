import _ from "lodash";
import { plugin } from "./plugin";

export class FlowchartOptionsCtrl {
  /** @ngInject */
  constructor($scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.mx = this.panelCtrl.mx;
    this.sourceTypes = [
      { text: "Url", value: "url" },
      { text: "XML Content", value: "xml" }
      // { text: 'CSV', value: 'csv' },
    ];

  }

  render() {
    this.panelCtrl.render();
  }

  onSourceChange() {
    this.panelCtrl.changedSource = true;
    this.render();
  }

  openDrawEditor() {
    // source : 
    // https://desk.draw.io/support/solutions/articles/16000042542-how-to-embed-html-
    // https://support.draw.io/display/DOB/2016/05/09/Simple+draw.io+embedding+walk-through
    let myWindow = window.open(
      "https://draw.io?embed=1",
      "MxGraph Editor",
      "width=1280, height=720"
    );
    let opened = false;
    window.addEventListener("message", event => {
      console.log("Draw is open :" + event);
      console.log("event.origin : ", event.origin);
      console.log("event.lastEventId : ", event.lastEventId);
      console.log("event.data :", event.data);
      console.log("event.ports :", event.ports);

      if (event.origin !== "https://www.draw.io") return;
      if (event.data == "ready") {
        event.source.postMessage(
          this.panel.flowchart.source.xml.value,
          event.origin
        );
        opened = false;
      } else {
        this.panel.flowchart.source.xml.value= this.mx.decodeXml(event.data);
        this.panelCtrl.changedSource=true;
        this.render()
      }
    });
  }

  validatePercent(percentText) {
    if (percentText == null || percentText.length == 0) {
      return true;
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
  "use strict";
  return {
    restrict: "E",
    scope: true,
    templateUrl:
      "public/plugins/" + plugin.id + "/partials/flowchart_options.html",
    controller: FlowchartOptionsCtrl
  };
}
