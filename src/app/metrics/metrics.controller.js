export class MetricsController {
  constructor($scope,corporateData) {
    'ngInject';
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    corporateData.getIssuesCsv('MOCK_ISSUES.csv').then((data)=> {
      console.log(data);
      //filter the issues that are open
      let openIssues=data.data.filter((issue) => issue.status == 'open');
      console.log(openIssues);
      this.numberIssues=openIssues.length;
    });
  }
  add(){
    let self=this;
    let file = document.getElementById('file').files[0],
      r = new FileReader();
    console.log(file.name);
    r.onloadend = function(e){
      let data = e.target.result;
      self.corporateData.uploadEmployeesCsv(file.name,data);
    }
    r.readAsBinaryString(file);
  }
}

