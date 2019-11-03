export default class EmptyOptionsCtrl {
  /* @ngInject */
  constructor($scope) {
  }
}

export function emptyOptionsTab($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/plugins/agenty-flowcharting-panel/empty_options.html',
    controller: EmptyOptionsCtrl
  };
}
