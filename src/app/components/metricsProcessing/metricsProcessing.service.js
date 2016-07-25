export class MetricsProcessingService {
  constructor ($log,$q,$timeout) {
    'ngInject';
    this.$log = $log;
    this.$q=$q;
    this.$timeout=$timeout;
  }
  processMetricsIssues(data){
    return this.$timeout(function(){
    //filter the issues that are open
    let openIssues=data.filter((issue) => issue.status == 'open');
    let timesPeriods={};
    for (let i=0;i<6;i++){
      let today = new Date();
      today.setMonth(today.getMonth() - i);
      timesPeriods[i]={};
      timesPeriods[i].period=(today.getMonth()+1)+'-'+today.getFullYear();
      timesPeriods[i].numberIssues=data.filter((issue) => (new Date(issue.submissiondate)).getMonth() == today.getMonth()).length;
    }
    return {numberOpenIssues:openIssues.length,reportedIssues:timesPeriods};
    },500);
  }
  processMetricsSells(data){
    return this.$timeout(function(){
    let timesPeriods={};
    for (let i=0;i<6;i++){
      let today = new Date();
      today.setMonth(today.getMonth() - i);
      timesPeriods[i]={};
      timesPeriods[i].period=(today.getMonth()+1)+'-'+today.getFullYear();
      let monthlySells=data.filter((sell) => (new Date(sell.selldate)).getMonth() == today.getMonth());
      timesPeriods[i].numberSells=monthlySells.length;
      let sum = 0;
      for (let sell = monthlySells.length - 1; sell >= 0; sell--) {
        sum += parseFloat(monthlySells[sell]['amount'].replace("$", ""));
      }
      timesPeriods[i].totalSales=sum.toFixed(2);
    }
    return timesPeriods;
    },500);
  }


}
