import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  tabColor = "accent";
  tabBackground = "accent";
  punchpointList = [
    {number : 20, circle : "Delhi", color : "red"},
    {number : 21, circle : "UP", color : "blue"},
    {number : 22, circle : "KTK", color : "green"}
  ]

  trainingList = [
    {type : 'Pass', count : "80", percentage : '40'},
    {type : 'Fail', count : "20", percentage : '10'},
    {type : 'Pending', count : "100", percentage : '50'}
  ]

  trainingEmpList = [
    {name : "JP", status : "Fail", percentage : "30 %"},
    {name : "Saurab", status : "Pass", percentage : "64 %"},
    {name : "Sudhakant", status : "Pass", percentage : " 80 %"},
  ]

  questionList = [
    {question : "a b c d", correctPercent : "65%", incorrectPercent : "35%"},
    {question : "e f g h", correctPercent : "75%", incorrectPercent : "25%"},
    {question : "i j k l", correctPercent : "5%", incorrectPercent : "95%"}
  ]

  constructor() { }

  ngOnInit(): void {
    this.loadChart();
  }

  ngAfterViewInit() : void{
    
  }

  chartOptions;
  chartOptions1;
  chartOptions2;
  chartOptions3;
  chartOptions4;
  loadChart(){
    this.chartOptions = {
      // title: {
      //   text: "Basic Column Chart in Angular"
      // },
      // width: 420,
      // height: 320,
      legend : {
        verticalAlign: "center",
        horizontalAlign: "right"
      },
      data: [{
        type: "pie",
        showInLegend : true,
        legendText : "{label}",
        dataPoints: [
          { label: "Apple",  y: 10, color:'red'  },
          { label: "Orange", y: 15  },
          { label: "Banana", y: 25  },
          { label: "Mango",  y: 30  },
          { label: "Grape",  y: 28  }
        ]
      }]
          
    }

    this.chartOptions1 = {
      // title: {
      //   text: "Basic Column Chart in Angular 1"
      // },
      width: 420,
      height: 320,
      data: [{
        indexLabel : '{y} %',
        showInLegend : true,
        legendText : "{label}",
        type: "doughnut",
        dataPoints: [
          { label: "PM",  y: 75  },
          { label: "Pending", y: 25}
        ]
      }]
          
    }

    this.chartOptions2 = {
      // title: {
      //   text: "Basic Column Chart in Angular 2"
      // },
      data: [{
        type: "bar",
        dataPoints: [
          { label: "Apple",  y: 10  },
          { label: "Orange", y: 15  },
          { label: "Banana", y: 25, color : 'orange'  },
          { label: "Mango",  y: 30  },
          { label: "Grape",  y: 28  }
        ]
      }]
          
    }
    
    this.chartOptions3 = {
      // title: {
      //   text: "Basic Column Chart in Angular 3"
      // },
      legend : {
        verticalAlign: "top",
        // horizontalAlign: "right"
      },
      data: [{
        showInLegend: true,
        name : "Cumulative",
        type: "area",
        color : 'red',
        dataPoints: [
          { label: "Apple",  y: 12  },
          { label: "Orange", y: 17  },
          { label: "Banana", y: 27  },
          { label: "Mango",  y: 42  },
          { label: "Grape",  y: 62  }
        ]
      },{
        showInLegend: true,
        name : "Weekly PM",
        type: "area",
        color : 'green',
        dataPoints: [
          { label: "Apple",  y: 10, color : 'green'  },
          { label: "Orange", y: 15, color: 'red'  },
          { label: "Banana", y: 25  },
          { label: "Mango",  y: 30  },
          { label: "Grape",  y: 28  }
        ]
      }
      ,{
        showInLegend: true,
        name : 'Target',
        type: "area",
        color : 'blue',
        dataPoints: [
          { label: "Apple",  y: 2  },
          { label: "Orange", y: 5  },
          { label: "Banana", y: 10  },
          { label: "Mango",  y: 15  },
          { label: "Grape",  y: 20  }
        ]
      }]
          
    }
    this.chartOptions4 = {
      // title: {
      //   text: "Basic Column Chart in Angular 4",
      // },
      axisX : {
        title : "X axis"
      },
      axisY : {
        title : "Y axis"
      },
      dataPointMaxWidth : 20,
      data: [{
        type: "column",
        indexLabel: "{y}",
        indexLabelPlacement: "outside",
        dataPoints: [
          { label: "Apple",  y: 10  },
          { label: "Orange", y: 15  },
          { label: "Banana", y: 25  },
          { label: "Mango",  y: 30  },
          { label: "Grape",  y: 39  }
        ]
      }]
          
    }

  }
  
  
  

}
