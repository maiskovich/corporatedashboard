export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('instructions', {
      url: '/',
      templateUrl: 'app/instructions/instructions.html'
    })
    .state('geospatial', {
      url: '/geospatial',
      templateUrl: 'app/geospatial/geospatial.html',
      controller: 'GeospatialController',
      controllerAs: 'geo'
    })
    .state('metrics', {
      url: '/metrics',
      templateUrl: 'app/metrics/metrics.html',
      controller: 'MetricsController',
      controllerAs: 'metrics'
    })
    .state('spreadsheet', {
      url: '/spreadsheet',
      templateUrl: 'app/spreadsheet/spreadsheet.html',
      controller: 'SpreadsheetController',
      controllerAs: 'spread'
    })
    .state('datasetmanager', {
      url: '/datasetmanager',
      templateUrl: 'app/datasetmanager/datasetmanager.html',
      controller: 'DatasetmanagerController',
      controllerAs: 'manager'
    });

  $urlRouterProvider.otherwise('/');
}
