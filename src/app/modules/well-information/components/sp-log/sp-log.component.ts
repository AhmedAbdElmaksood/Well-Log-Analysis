import { Component, OnInit } from '@angular/core';
import { FileInformationService } from '../../services/file-information.service';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';
import * as CanvasJS from '../../../../canvasjs.min.js';
import { GraphProperties } from 'src/app/shared/models/GraphProperties';

@Component({
  selector: 'app-sp-log',
  templateUrl: './sp-log.component.html',
  styleUrls: ['./sp-log.component.css']
})
export class SpLogComponent implements OnInit {
  private spSettings;
  private minDepth: number;
  private maxDepth: number;
  private spLog: number[];
  private depthLog: number[];
  private defaultMinScale: number;
  private defaultMaxScale: number;
  public columnOrder: ColumnOrder;

  private chart;
  private spDataPoints = [];
  public color: string = "#222f3e";
  public minScale: number;
  public maxScale: number;
  public theme: string = "light1";

  constructor(private fileInformationService: FileInformationService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current().columnOrder;
    if(this.columnOrder.Sp){
      this.spLog = this.fileInformationService.current().logs[this.columnOrder.Sp];
      this.depthLog = this.fileInformationService.current().logs[this.columnOrder.Depth];
  
      this.minDepth = this.depthLog[0] - 100;
      this.maxDepth = this.depthLog[(this.depthLog.length) - 2];

      this.defaultMinScale = this.minScale = Math.min.apply(null, this.spLog.filter(x=> {return x > -900}));
      this.defaultMaxScale = this.maxScale = Math.max.apply(null, this.spLog.filter(x=> {return x > -900}));
      this.SpDraw();
    }
  }


  private SpDraw() {
    this.getPoints();
    this.render();
  }

  private getPoints() {
    for (let i = 0; i < this.depthLog.length; i++) {
      if (this.spLog[i] > -999) {
        this.spDataPoints.push({
          x: this.spLog[i],
          y: this.depthLog[i],
        });
      }
    }
  }

  private render(){
    this.spSettings = {
      animationEnabled: true,
      zoomEnabled: true,
      zoomType: "y",
      theme: this.theme,
      title: {
        text: "SP Log"
      },
      exportEnabled: true,
      axisX2: {
        title: "SP (mv)",
        gridColor: "#dcdcdc",
        gridThickness: 1,
        minimum: this.minScale,
        maximum: this.maxScale,
      },
      axisY: {
        reversed: true,
        interval: 100,
        includeZero: true,
        gridColor: "#bfbfbf",
        gridThickness: 1,
        minimum: this.minDepth,
        maximum: this.maxDepth,
      },
      data: [{
        axisXType: "secondary",
        type: "spline",
        color: this.color,
        xValueType: "number",
        xValueFormatString: "##.####",
        yValueFormatString: "##.####",
        dataPoints: this.spDataPoints
      }]
    }

    this.chart = new CanvasJS.Chart("spId", this.spSettings);
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
    this.color = "#222f3e";
    this.minScale = this.defaultMinScale;
    this.maxScale = this.defaultMaxScale;
    this.theme = "light1";
    this.render();
  }

}
