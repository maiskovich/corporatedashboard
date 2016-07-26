/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { GeospatialController } from './geospatial/geospatial.controller';
import { DatasetmanagerController } from './datasetmanager/datasetmanager.controller';
import { MetricsController } from './metrics/metrics.controller';
import { SpreadsheetController } from './spreadsheet/spreadsheet.controller';
import { CorporateDataService } from '../app/components/corporateData/corporateData.service';
import { MetricsProcessingService } from '../app/components/metricsProcessing/metricsProcessing.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';

angular.module('4Corporatedashboard', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'leaflet-directive','LocalStorageModule','chart.js','ngTable'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('corporateData', CorporateDataService)
  .service('metricsProcessing', MetricsProcessingService)
  .controller('GeospatialController', GeospatialController)
  .controller('DatasetmanagerController', DatasetmanagerController)
  .controller('MetricsController', MetricsController)
  .controller('SpreadsheetController', SpreadsheetController)
  .directive('navBar', NavbarDirective);
