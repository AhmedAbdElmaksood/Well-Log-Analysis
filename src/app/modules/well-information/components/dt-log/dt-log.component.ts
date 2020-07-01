import { Component, OnInit } from '@angular/core';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';
import { FileInformationService } from '../../services/file-information.service';
import * as CanvasJS from '../../../../canvasjs.min.js';
import { GraphProperties } from 'src/app/shared/models/GraphProperties';

@Component({
  selector: 'app-dt-log',
  templateUrl: './dt-log.component.html',
  styleUrls: ['./dt-log.component.css']
})
export class DtLogComponent implements OnInit {
  private dtSettings;
  private minDepth: number;
  private maxDepth: number;
  private dtLog: number[];
  private depthLog: number[];
  private defaultMinScale: number;
  private defaultMaxScale: number;
  public columnOrder: ColumnOrder;

  private chart;
  private dtDataPoints = [];
  public color: string = "#bfbfbf";
  public minScale: number;
  public maxScale: number;
  public theme: string = "light1";
  
  constructor(private fileInformationService: FileInformationService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current().columnOrder;
    if(this.columnOrder.Dt){
      this.dtLog = this.fileInformationService.current().logs[this.columnOrder.Dt];
      this.depthLog = this.fileInformationService.current().logs[this.columnOrder.Depth];
  
      this.minDepth = this.depthLog[0] - 100;
      this.maxDepth = this.depthLog[(this.depthLog.length) - 2];

      this.defaultMinScale = this.minScale = Math.min.apply(null, this.dtLog.filter(x=> {return x > -900}));
      this.defaultMaxScale = this.maxScale = Math.max.apply(null, this.dtLog.filter(x=> {return x > -900}));
      this.DtDraw();
    }

    let chart = new CanvasJS.Chart("dtId", this.dtSettings);
    chart.render();
  }

  private DtDraw() {
    this.getPoints();
    this. render();
  }

  private getPoints() {
    for (let i = 0; i < this.depthLog.length; i++) {
      if (this.dtLog[i] > -999) {
        this.dtDataPoints.push({
          x: this.dtLog[i],
          y: this.depthLog[i],
        });
      }
    }
  }

  private render(){
    this.dtSettings = {
      animationEnabled: true,
      zoomEnabled: true,
      zoomType: "y",
      theme: this.theme,
      title: {
        text: "DT Log",
        horizontalAlign: "center",
      },
      exportEnabled: true,
      axisX2: {
        title: "DT (usec)",
        minimum: this.minScale,
        maximum: this.maxScale,
        reversed: true,
        //interval: 50,
        gridColor: "#dcdcdc",
        gridThickness: 1,
      },
      axisY: {
        reversed: true,
        interval: 100,
        includeZero: true,
        margin: 0,
        gridColor: "#bfbfbf",
        gridThickness: 1,
        minimum: this.minDepth,
        maximum: this.maxDepth,
      },
      data: [{
        axisXType: "secondary",
        type: "spline",
        xValueType: "number",
        xValueFormatString: "####",
        yValueFormatString: "####",
        color: this.color,
        dataPoints: this.dtDataPoints
      }]
    }

    this.chart = new CanvasJS.Chart("dtId", this.dtSettings);
    this.chart.render();
  }

  graphSettingChange(newSetting: GraphProperties){
    this.color = newSetting.color;
    this.minScale = newSetting.minScale;
    this.maxScale = newSetting.maxScale;
    this.theme = newSetting.theme;
    this.render();
  }

  defaultSettings(){
    this.color = "#bfbfbf";
    this.minScale = this.defaultMinScale;
    this.maxScale = this.defaultMaxScale;
    this.theme = "light1";
    this.render();
  }

}
