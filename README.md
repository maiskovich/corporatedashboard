# Corporate dashboard

Udacity Senior web developer 4st project

**Demo: https://corporatedashboard.firebaseapp.com/#/**

Corporate dashboard is a web app for visualizing corporate data with features as:
* CSV parsing
* Responsive Design
* ES6
* Interactive map
* Local Storage

Its build with angularJS and based in the [Yeoman gulp-AngularJS generator](https://github.com/Swiip/generator-gulp-angular).

The app have different menus for visualizing data from CSV files, these files are being parsed with [Papa Parse](http://papaparse.com/),
stored in local storage using [angular-local-storage](https://github.com/grevory/angular-local-storage) and shown to the
user in a interactive map using [Leaflet](http://leafletjs.com/), bar and line charts using [angular-chart.js](https://jtblin.github.io/angular-chart.js/)
and a spreadsheet using [ngTable](http://ng-table.com/).

Mock data is provided for using the demo and as an example of the fields name required in the CSV files.


## Install

After cloning the repository you should run:

`npm install`

`bower install`


##### Being inside of the directory of the project you can run:


#### `serve`

For the development phase, use the command `gulp serve` to lunch server which supports live reload of your modifications.


#### `build`

For production, use the command `gulp` or `gulp build` to optimize the files for production, they will be saved optimized in the dist directory.
[More info](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/user-guide.md#optimization-process)


