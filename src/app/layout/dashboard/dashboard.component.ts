import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/shared/constant/Contant';
import { GraphService } from 'src/app/shared/services/GraphService';
import * as alasql from 'alasql';
import { EncrDecrService } from 'src/app/shared/services/EncrDecrService';
import { EncryptionService } from 'src/app/shared/services/EncryptionService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  tabColor = "accent";
  tabBackground = "accent";
  punchpointList = []

  trainingResultList = [
    // {type : 'Pass', count : "80", percentage : '40'},
    // {type : 'Fail', count : "20", percentage : '10'},
    // {type : 'Pending', count : "100", percentage : '50'}
  ]

  trainingEmpList = [
    // {name : "JP", status : "Fail", percentage : "30 %"},
    // {name : "Saurab", status : "Pass", percentage : "64 %"},
    // {name : "Sudhakant", status : "Pass", percentage : " 80 %"},
  ]

  questionList = [
    // {question : "a b c d", correctPercent : "65%", incorrectPercent : "35%"},
    // {question : "e f g h", correctPercent : "75%", incorrectPercent : "25%"},
    // {question : "i j k l", correctPercent : "5%", incorrectPercent : "95%"}
  ]

  public quarterList = [
    {paramCode : 'Q1', paramDesc : 'AMJ (Q1)'},
    {paramCode : 'Q2', paramDesc : 'JAS (Q2)'},
    {paramCode : 'Q3', paramDesc : 'OND (Q3)'},
    {paramCode : 'Q4', paramDesc : 'JFM (Q4)'},
  ]
  public isFiberCut = false;
  public isPM = false;
  public isSTWPM = false;
  public isWPM = false;
  public isMASPM2 = false;
  public isMASPM = false;
  public isTG = false;
  public isIMG = false;
  public isFCI = false;
  public isMFC = false;
  public isFFFCCW = false;
  public graphHeight = 280;
  public dataPointMaxWidth = 20; // bar and column graph bar width
  public incidentCategory1 = "";
  public monthYear1 = "";
  public monthYear3 = "";
  public quarter = "";
  public quarter1 = "";
  public quarter2 = "";
  public quarter3 = "";
  public quarter4 = "";
  public quarter5 = "";
  public quarter6 = "";
  public quarter7 = "";
  public state = "";
  public stateList = [];
  public trainingName = "";
  public trainingName2 = "";
  public trainingNameList = [];
  public metroSiteTypeList = [];
  public siteTypeList = [];
  public incidentCategoryList = [];
  public metroSiteType = "";
  public siteType = "";
  public isTechnician : boolean = false;
  public monthList = [];
  public financialYearList = [];
  public financialYear = "";
  public currentYear = "";
  public dataPoints = [];
  public tableColumn = "";
  public loginEmpId = "";
  public loginEmpRole = "";
  public loginEmpRoleId = "";
  constructor(private graphService : GraphService, private datePipe : DatePipe,
    private EncrDecr: EncrDecrService, private encrypt: EncryptionService) { 
    this.loginEmpId = "";
    this.loginEmpRole = "SpaceWorld";
    this.loginEmpRoleId = localStorage.getItem("empRoleId");
    let state = localStorage.getItem("state");
    if(this.loginEmpRoleId == "43"){
      this.isTechnician = true;
    }
    else{
      // CDH || O&M Lead
      if(this.loginEmpRoleId == "44" || this.loginEmpRoleId == "45")
        this.state = state;
      else
        this.state = "APTL";
    }
  }

  ngOnInit(): void {
    let currentMonth = this.datePipe.transform(new Date(),'MMM');
    this.currentYear = this.datePipe.transform(new Date(),'yyyy');
    let previousYear = parseInt(this.currentYear) - 1;
    let nextYear = parseInt(this.currentYear) + 1;
    if(currentMonth == 'Jan' || currentMonth == 'Feb' || currentMonth == 'Mar'){
      this.monthList  = [
        {"paramCode" : "Apr-"+previousYear,"paramDesc":"Apr-"+previousYear},
        {"paramCode" : "May-"+previousYear,"paramDesc":"May-"+previousYear},
        {"paramCode" : "Jun-"+previousYear,"paramDesc":"Jun-"+previousYear},
        {"paramCode" : "Jul-"+previousYear,"paramDesc":"Jul-"+previousYear},
        {"paramCode" : "Aug-"+previousYear,"paramDesc":"Aug-"+previousYear},
        {"paramCode" : "Sep-"+previousYear,"paramDesc":"Sep-"+previousYear},
        {"paramCode" : "Oct-"+previousYear,"paramDesc":"Oct-"+previousYear},
        {"paramCode" : "Nov-"+previousYear,"paramDesc":"Nov-"+previousYear},
        {"paramCode" : "Dec-"+previousYear,"paramDesc":"Dec-"+previousYear},
        {"paramCode" : "Jan-"+this.currentYear,"paramDesc":"Jan-"+this.currentYear},
        {"paramCode" : "Feb-"+this.currentYear,"paramDesc":"Feb-"+this.currentYear},
        {"paramCode" : "Mar-"+this.currentYear,"paramDesc":"Mar-"+this.currentYear}
      ]
      
    }
    else{
      this.monthList  = [
        {"paramCode" : "Apr-"+this.currentYear,"paramDesc":"Apr-"+this.currentYear},
        {"paramCode" : "May-"+this.currentYear,"paramDesc":"May-"+this.currentYear},
        {"paramCode" : "Jun-"+this.currentYear,"paramDesc":"Jun-"+this.currentYear},
        {"paramCode" : "Jul-"+this.currentYear,"paramDesc":"Jul-"+this.currentYear},
        {"paramCode" : "Aug-"+this.currentYear,"paramDesc":"Aug-"+this.currentYear},
        {"paramCode" : "Sep-"+this.currentYear,"paramDesc":"Sep-"+this.currentYear},
        {"paramCode" : "Oct-"+this.currentYear,"paramDesc":"Oct-"+this.currentYear},
        {"paramCode" : "Nov-"+this.currentYear,"paramDesc":"Nov-"+this.currentYear},
        {"paramCode" : "Dec-"+this.currentYear,"paramDesc":"Dec-"+this.currentYear},
        {"paramCode" : "Jan-"+nextYear,"paramDesc":"Jan-"+nextYear},
        {"paramCode" : "Feb-"+nextYear,"paramDesc":"Feb-"+nextYear},
        {"paramCode" : "Mar-"+nextYear,"paramDesc":"Mar-"+nextYear}
      ]
    }
    let previousFinancialYear = previousYear+" - "+this.currentYear;
    let currentFinancialYear = this.currentYear+" - "+nextYear;
    this.financialYearList.push(previousFinancialYear);
    this.financialYearList.push(currentFinancialYear);
    this.financialYear = currentFinancialYear;
    if(!this.isTechnician){
      this.siteType = "Small Cell";
      this.metroSiteType = "DMRC";
      this.getIncidentCategoryList();
      this.getSiteTypeList();
      this.findQuarterValue();
    }
    // var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'password@123456');
    // var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
    // console.log('Encrypted :' + encrypted);
    // console.log('Encrypted :' + decrypted);

    // const encrypted = this.encrypt.encryptionAES('hello world');
    // const decrypted = this.encrypt.decryptionAES(encrypted);
    // console.log(encrypted);
    // console.log(decrypted);

  }

  ngAfterViewInit() : void{
    if(!this.isTechnician){
      this.incidentCategory1 = 'Fiber Cut';
      this.generateGraph1();
      this.quarter5 = this.quarter;
      this.generateGraph2();
      this.monthYear3 = this.monthYear1;
      this.generateGraph3();
      this.generateAllPMGraph(this.quarter);
      this.quarter6 = this.quarter;
      this.generateGraph9();
      this.trainingName = 'Coslight Batteries';
      this.generateAllTrainingGraph(this.trainingName);
    }
  }

  findQuarterValue(){
    let currentMonth = this.datePipe.transform(new Date(),'MMM');
    this.monthYear1 = currentMonth+"-"+this.currentYear;
    if(currentMonth == 'Apr' || currentMonth == 'May' || currentMonth == 'Jun')
      this.quarter = 'Q1';
    else if(currentMonth == 'Jul' || currentMonth == 'Aug' || currentMonth == 'Sep')
      this.quarter = 'Q2';
    else if(currentMonth == 'Oct' || currentMonth == 'Nov' || currentMonth == 'Dec')
      this.quarter = 'Q3';
    else if(currentMonth == 'Jan' || currentMonth == 'Feb' || currentMonth == 'Mar')
      this.quarter = 'Q4';
  }

  getIncidentCategoryList(){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole
    };
    this.graphService.getAllListBySelectType(jsonData, 'incidentCategory')
    .subscribe(
      (result)=>{
        let ic = result.incidentCategory;
        let splitList = ic.split(",");
        let tempData = [];
        for(let i=0;i<splitList.length;i++){
          let tempJson = {
            'paramCode':splitList[i],'paramDesc':splitList[i]+" "
          };
          tempData.push(tempJson)
        }
        this.incidentCategoryList = tempData;
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("getIncidentCategoryList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    );
  }

  getSiteTypeList(){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole
    };
    this.graphService.getAllListBySelectType(jsonData, 'siteType')
    .subscribe(
      (result)=>{
        let st = result.siteType;
        this.siteTypeList = st;

        let mst = result.metroSiteType;
        this.metroSiteTypeList = mst;

        let trn = result.trainingName;
        this.trainingNameList = trn;

        let state = result.state;
        this.stateList = state;
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("getSiteTypeList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    );
  }

  public generateInciGraphMonthWise(monthYear : any){
    this.monthYear1 = monthYear;
    this.generateGraph1();

    this.monthYear3 = monthYear;
    this.generateGraph3();
  }

  public generateInciGraphQuarterWise(quarter : any){
    this.quarter5 = quarter;
    this.generateGraph2()

    this.quarter6 = quarter;
    this.generateGraph9()
  }

  public generateAllPMGraph(quarter : any){
    this.quarter = quarter;
    this.generateGraph4();

    this.quarter1 = quarter;
    this.generateGraph5();

    this.quarter3 = quarter;
    this.generateGraph7();

    this.quarter2 = quarter;
    this.generateGraph8();

    this.quarter4 = quarter;
    this.generateGraph6();

    this.quarter7 = quarter;
    this.generateGraph11();
  }

  public generateAllTrainingGraph(trainingName : any){
    this.trainingName = trainingName;
    this.generateGraph10();

    this.trainingName2 = trainingName;
    this.generateGraph12();

    this.generateGraph14();
  }

  chartIMG;
  generateGraph1(){
    if(this.incidentCategory1 == 'Fiber Cut') 
      this.isFiberCut = true 
    else 
      this.isFiberCut = false;

    this.isIMG = false;
    this.dataPoints = [];
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      period : this.monthYear1,
      incidentCategory : this.incidentCategory1,
      graphType : 1
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.dataPoints = result.dataPoints;
        this.tableColumn = result.tableColumn;
        this.isIMG = true;
        this.chartIMG = {
          width: 420,
          height: this.graphHeight,
          legend : {
            verticalAlign: "center",
            horizontalAlign: "right"
          },
          data: [{
            type: "pie",
            showInLegend : true,
            legendText : "{label}",
            dataPoints : this.dataPoints
          }]
        }
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph1"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  chartFFFCCW;
  public generateGraph2(){
    this.isFFFCCW = false;
    if(this.quarter5 == ""){
      alert("Please select quarter");
      return ;
    }
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter5,
      graphType : 2
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        let dataArr = result.dataArr;
        this.isFFFCCW = true;
          this.chartFFFCCW = {
            height: this.graphHeight,
            axisX : {
              title : "Circle"
            },
            axisY : {
              title : "No of Fiber Cut"
            },
            dataPointMaxWidth : this.dataPointMaxWidth,
            data: [{
              type: "column",
              indexLabel: "{y}",
              indexLabelPlacement: "outside",
              dataPoints: dataArr
            }]
                
          }
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph2"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  chartFCI;
  chartMFC;
  public generateGraph3(){
    this.isFCI = false;
    this.isMFC = false;
    if(this.monthYear3 == ""){
      alert("Please select month");
      return ;
    }
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      period : this.monthYear3,
      graphType : 3
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
          let dataArr = result.dataArr;
          let dataArr1 = result.dataArr1;
          this.isFCI = true;
          this.chartFCI = {
            height: this.graphHeight,
            axisX : {
              title : "Circle"
            },
            axisY : {
              title : "No of Fiber Cut"
            },
            dataPointMaxWidth : this.dataPointMaxWidth,
            data: [{
              type: "column",
              indexLabel: "{y}",
              indexLabelPlacement: "outside",
              dataPoints: dataArr
            }]
                
          }
          this.isMFC = true;
          this.chartMFC = {
            height: this.graphHeight,
            axisX : {
              title : "Circle"
            },
            axisY : {
              title : "MTTR"
            },
            dataPointMaxWidth : this.dataPointMaxWidth,
            data: [{
              type: "column",
              indexLabel: "{y}",
              indexLabelPlacement: "outside",
              dataPoints: dataArr1
            }]
                
          }
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph3"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  pmPercentage = "";
  chartPM = {};
  public generateGraph4(){
    this.isPM = false;
    if(this.quarter == ""){
      alert("Please select a quarter");
      return ;
    }

    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter,
      graphType : 4
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
          let dataArr = result.dataArr;
          this.pmPercentage = result.total;
          this.isPM = true;
          this.chartPM = {
            height: this.graphHeight,
            axisX : {
              title : "Circle"
            },
            axisY : {
              title : "PM %"
            },
            dataPointMaxWidth : this.dataPointMaxWidth,
            data: [{
              type: "column",
              indexLabel: "{y} %",
              indexLabelPlacement: "outside",
              dataPoints: dataArr
            }]
                
          }

          
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph4"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  pmPercentage1 = "";
  chartSTWPM;
  public generateGraph5(){
    this.isSTWPM = false;
    if(this.quarter1 == ""){
      this.siteType = "";
      alert("Please select a quarter");
      return ;
    }
    
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter1,
      siteType : this.siteType,
      graphType : 5
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
          let dataArr = result.dataArr;
          this.pmPercentage1 = result.total;
          this.isSTWPM = true;
          this.chartSTWPM = {
            height: this.graphHeight,
            axisX : {
              title : "Circle"
            },
            axisY : {
              title : "PM %"
            },
            dataPointMaxWidth : this.dataPointMaxWidth,
            data: [{
              type: "column",
              indexLabel: "{y} %",
              indexLabelPlacement: "outside",
              dataPoints: dataArr
            }]
                
          }
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph5"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  chartMASPM;
  generateGraph6(){
    this.isMASPM = false;
    if(this.quarter4 == ""){
      alert("Please select quarter");
      return ;
    }
    else if(this.metroSiteType == ""){
      alert("Please select site type");
      return ;
    }
    this.generateGraph13();
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter4,
      metroSiteType : this.metroSiteType,
      graphType : 6
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        let dataArr = result.dataArr;
        this.isMASPM = true;
        this.chartMASPM = {
          width: 420,
          height: this.graphHeight,
          data: [{
            indexLabel : '{y}',
            showInLegend : true,
            legendText : "{label}",
            type: "doughnut",
            dataPoints: dataArr
          }]
              
        }
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph6"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  chartWPM;
  generateGraph7(){
    this.isWPM = false;
    if(this.quarter3 == ""){
      alert("Please select a quarter");
      return ;
    }
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter3,
      graphType : 7
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
          let weekPM = result.dataArr;
          let cumulative = result.dataArr1;
          let target = result.dataArr2;
          this.isWPM = true;
          this.chartWPM = {
          legend : {
            verticalAlign: "top",
          },
          data: [{
            showInLegend: true,
            name : "Cumulative",
            type: "area",
            color : '#f28f05',
            dataPoints: cumulative
          },{
            showInLegend: true,
            name : "Weekly PM",
            type: "area",
            color : '#28c1f4',
            dataPoints: weekPM
          }
          ,{
            showInLegend: true,
            name : 'Target',
            type: "area",
            color : '#000000',
            dataPoints: target
          }]       
        }
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph7"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  generateGraph8(){
    if(this.quarter2 == ""){
      alert("Please select a quarter");
      return ;
    }
    
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter2,
      graphType : 8
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.punchpointList = result.dataArr;
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph8"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  tableColumnFFFCSW = [];
  tableDataFFFCSW = [];
  generateGraph9(){
    if(this.quarter6 == ""){
      alert("Please select a quarter");
      return ;
    }
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter6,
      graphType : 9
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.tableColumnFFFCSW = result.tableColumn;
        this.tableDataFFFCSW = result.tableData;
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph9"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  chartTG;
  generateGraph10(){
    this.isTG = false;
    if(this.trainingName == ""){
      alert("Please select a training");
      return ;
    }
    
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      trainingName : this.trainingName,
      state : this.state,
      graphType : 10
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        let dataArr = result.dataArr;
        this.isTG = true;
        this.chartTG = {
          height: this.graphHeight,
          axisX : {
            title : "Circle"
          },
          axisY : {
            title : "Pass %"
          },
          dataPointMaxWidth : this.dataPointMaxWidth,
          data: [{
            type: "column",
            indexLabel: "{y} %",
            indexLabelPlacement: "outside",
            dataPoints: dataArr
          }]
              
        }
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph10"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  chartMASPM2;
  generateGraph11(){
    this.isMASPM2 = false;
    if(this.quarter7 == ""){
      alert("Please select a quarter");
      return ;
    }
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter7,
      graphType : 11
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
          let dattArr = result.dataArr;
          this.isMASPM2 = true;
          this.chartMASPM2 = {
            axisX : {
              title : "Metro Sites"
            },
            axisY : {
              title : "Percentage"
            },
            dataPointMaxWidth : this.dataPointMaxWidth,
            data: [{
              type: "bar",
              indexLabel: "{y} %",
              indexLabelPlacement: "outside",
              dataPoints:dattArr
            }]
                
          }
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph11"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  generateGraph12(){
    if(this.trainingName2 == ""){
      alert("Please select training name");
      return;
    }
    else if(this.state == ""){
      alert("Please select a state");
      return ;
    }
    
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      trainingName : this.trainingName2,
      state : this.state,
      graphType : 12
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.trainingResultList = result.dataArr;
        this.trainingEmpList = result.tableData;
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph12"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  tableDataMASPM3 = [];
  public generateGraph13(){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter4,
      metroSiteType : this.metroSiteType,
      graphType : 13
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.tableDataMASPM3 = result.dataArr;
        
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph13"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  public generateGraph14(){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      trainingName : this.trainingName,
      graphType : 14
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.questionList = result.dataArr;
        
      },
      (error)=>{
        // this.toastr.warning(Constant.returnServerErrorMessage("generateGraph14"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  public downloadGraphReport(graphType : any){
    let period = "";
    let incidentCategory = "";
    let quarter = "";
    let siteType = "";
    let metroSiteType = "";
    let trainingName = "";
    if(graphType == 1){
      period = this.monthYear1;
      incidentCategory = this.incidentCategory1;
    }
    else if(graphType == 2){
      quarter = this.quarter5;
    }
    else if(graphType == 3){
      period = this.monthYear3;
    }
    else if(graphType == 4){
      quarter = this.quarter;
    }
    else if(graphType == 5){
      quarter = this.quarter1;
      siteType = this.replaceAll(this.siteType,"+","plus");
    } 
    else if(graphType == 6){
      quarter = this.quarter4;
      metroSiteType = this.metroSiteType;
    }
    else if(graphType == 7){
      quarter = this.quarter3;
    }
    else if(graphType == 8){
      quarter = this.quarter2;
    }
    else if(graphType == 9){
      quarter = this.quarter6;
    }
    else if(graphType == 10){
      trainingName = this.replaceAll(this.trainingName,"&","nnn");
    }
    else if(graphType == 11){
      quarter = this.quarter7;
    }
    else if(graphType == 13){
      let sql = "SELECT siteId as `Site Id`, status as `Status` ";
      sql += 'INTO XLSXML("Airport_Metro_Report.xls",{headers:true}) FROM ?';
      alasql(sql,[this.tableDataMASPM3]);
      return;
    }
    else if(graphType == 14){
      let sql = "SELECT question as `Question`, correctPercent as `Correct %`, incorrectPercent as `Incorrect %` ";
      sql += 'INTO XLSXML("Question_Report.xls",{headers:true}) FROM ?';
      alasql(sql,[this.questionList]);
      return;
    }
    var time = new Date();
    let millisecond = Math.round(time.getTime()/1000);
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      period : period,
      incidentCategory : incidentCategory,
      financialYear : this.financialYear,
      quarter : quarter,
      siteType : siteType,
      metroSiteType : metroSiteType,
      trainingName : trainingName,
      graphType : graphType,
      millisecond : millisecond
    }
    window.open(Constant.phpServiceURL+'downloadGraphReport.php?jsonData='+JSON.stringify(jsonData));
  }

  public replaceAll(str, find, replace){
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }

  public selectFinancialYear(){
    let fny = this.financialYear.split(" - ");
    let fnyStart = fny[0];
    let fnyEnd = fny[1];
    this.monthList  = [
      {"paramCode" : "Apr-"+fnyStart,"paramDesc":"Apr-"+fnyStart},
      {"paramCode" : "May-"+fnyStart,"paramDesc":"May-"+fnyStart},
      {"paramCode" : "Jun-"+fnyStart,"paramDesc":"Jun-"+fnyStart},
      {"paramCode" : "Jul-"+fnyStart,"paramDesc":"Jul-"+fnyStart},
      {"paramCode" : "Aug-"+fnyStart,"paramDesc":"Aug-"+fnyStart},
      {"paramCode" : "Sep-"+fnyStart,"paramDesc":"Sep-"+fnyStart},
      {"paramCode" : "Oct-"+fnyStart,"paramDesc":"Oct-"+fnyStart},
      {"paramCode" : "Nov-"+fnyStart,"paramDesc":"Nov-"+fnyStart},
      {"paramCode" : "Dec-"+fnyStart,"paramDesc":"Dec-"+fnyStart},
      {"paramCode" : "Jan-"+fnyEnd,"paramDesc":"Jan-"+fnyEnd},
      {"paramCode" : "Feb-"+fnyEnd,"paramDesc":"Feb-"+fnyEnd},
      {"paramCode" : "Mar-"+fnyEnd,"paramDesc":"Mar-"+fnyEnd}
    ];
    let my = this.monthYear1;
    let mySplit = my.split("-");
    let m = mySplit[0];
    if(m == "Jan" || m == "Feb" || m == "Mar"){
      this.monthYear1 = m+"-"+fnyEnd;
    }
    else{
      this.monthYear1 = m+"-"+fnyStart;
    }
    this.generateInciGraphMonthWise(this.monthYear1);
    this.generateInciGraphQuarterWise(this.quarter5);
    this.generateAllPMGraph(this.quarter);
  }

  // chartOptions;
  // chartOptions1;
  // chartOptions2;
  // chartOptions3;
  // chartOptions4;
  // loadChart(){
  //   this.chartOptions = {
  //     // title: {
  //     //   text: "Basic Column Chart in Angular"
  //     // },
  //     // width: 420,
  //     // height: 320,
  //     legend : {
  //       verticalAlign: "center",
  //       horizontalAlign: "right"
  //     },
  //     data: [{
  //       type: "pie",
  //       showInLegend : true,
  //       legendText : "{label}",
  //       dataPoints: [
  //         { label: "Apple",  y: 10, color:'red'  },
  //         { label: "Orange", y: 15  },
  //         { label: "Banana", y: 25  },
  //         { label: "Mango",  y: 30  },
  //         { label: "Grape",  y: 28  }
  //       ]
  //     }]
          
  //   }

  //   this.chartOptions1 = {
  //     // title: {
  //     //   text: "Basic Column Chart in Angular 1"
  //     // },
  //     width: 420,
  //     height: 320,
  //     data: [{
  //       indexLabel : '{y} %',
  //       showInLegend : true,
  //       legendText : "{label}",
  //       type: "doughnut",
  //       dataPoints: [
  //         { label: "PM",  y: 75  },
  //         { label: "Pending", y: 25}
  //       ]
  //     }]
          
  //   }

  //   this.chartOptions2 = {
  //     // title: {
  //     //   text: "Basic Column Chart in Angular 2"
  //     // },
  //     data: [{
  //       type: "bar",
  //       dataPoints: [
  //         { label: "Apple",  y: 10  },
  //         { label: "Orange", y: 15  },
  //         { label: "Banana", y: 25, color : 'orange'  },
  //         { label: "Mango",  y: 30  },
  //         { label: "Grape",  y: 28  }
  //       ]
  //     }]
          
  //   }
    
  //   this.chartOptions3 = {
  //     // title: {
  //     //   text: "Basic Column Chart in Angular 3"
  //     // },
  //     legend : {
  //       verticalAlign: "top",
  //       // horizontalAlign: "right"
  //     },
  //     data: [{
  //       showInLegend: true,
  //       name : "Cumulative",
  //       type: "area",
  //       color : 'red',
  //       dataPoints: [
  //         { label: "Apple",  y: 12  },
  //         { label: "Orange", y: 17  },
  //         { label: "Banana", y: 27  },
  //         { label: "Mango",  y: 42  },
  //         { label: "Grape",  y: 62  }
  //       ]
  //     },{
  //       showInLegend: true,
  //       name : "Weekly PM",
  //       type: "area",
  //       color : 'green',
  //       dataPoints: [
  //         { label: "Apple",  y: 10, color : 'green'  },
  //         { label: "Orange", y: 15, color: 'red'  },
  //         { label: "Banana", y: 25  },
  //         { label: "Mango",  y: 30  },
  //         { label: "Grape",  y: 28  }
  //       ]
  //     }
  //     ,{
  //       showInLegend: true,
  //       name : 'Target',
  //       type: "area",
  //       color : 'blue',
  //       dataPoints: [
  //         { label: "Apple",  y: 2  },
  //         { label: "Orange", y: 5  },
  //         { label: "Banana", y: 10  },
  //         { label: "Mango",  y: 15  },
  //         { label: "Grape",  y: 20  }
  //       ]
  //     }]
          
  //   }
  //   this.chartOptions4 = {
  //     // title: {
  //     //   text: "Basic Column Chart in Angular 4",
  //     // },
  //     axisX : {
  //       title : "X axis"
  //     },
  //     axisY : {
  //       title : "Y axis"
  //     },
  //     dataPointMaxWidth : 20,
  //     data: [{
  //       type: "column",
  //       indexLabel: "{y}",
  //       indexLabelPlacement: "outside",
  //       dataPoints: [
  //         { label: "Apple",  y: 10  },
  //         { label: "Orange", y: 15  },
  //         { label: "Banana", y: 25  },
  //         { label: "Mango",  y: 30  },
  //         { label: "Grape",  y: 39  }
  //       ]
  //     }]
          
  //   }

  // }
  
  
  

}
