export class EmptyOptionsCtrl {
  /* @ngInject */
  constructor($scope) {
  }
}

EmptyOptionsCtrl.templateUrl = './partials/empty_options.html';
export function emptyOptionsTab($q, uiSegmentSrv) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: `./partials/empty_options.html`,
    controller: EmptyOptionsCtrl
  };
}
