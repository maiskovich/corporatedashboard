export class GeospatialController {
  constructor($scope) {
    'ngInject';
    angular.extend($scope, {
      center: {
        lat: 40.095,
        lng: -3.823,
        zoom: 4
      },
      defaults: {
        scrollWheelZoom: false
      }
    });
  }
}

