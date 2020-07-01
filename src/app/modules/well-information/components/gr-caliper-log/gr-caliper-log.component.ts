import { Component, OnInit } from '@angular/core';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';
import { FileInformationService } from '../../services/file-information.service';
import * as CanvasJS from '../../../../canvasjs.min.js';
import { GraphProperties } from 'src/app/shared/models/GraphProperties';

@Component({
  selector: 'app-gr-caliper-log',
  templateUrl: './gr-caliper-log.component.html',
  styleUrls: ['./gr-caliper-log.component.css']
})
export class GrCaliperLogComponent implements OnInit {
  private grCaliperSettings;
  private minDepth: number;
  private maxDepth: number;
  private grLog: number[];
  private caliperLog: number[];
  private depthLog: number[];
  public columnOrder: ColumnOrder;

  private chart;
  private grDataPoints: [{}] = [{}];
  private grDefaultMinScale: number;
  private grDefaultMaxScale: number;
  public grColor: string = "#10ac84";
  public grMinScale: number;
  public grMaxScale: number;
  public theme: string = "light1";

  private caliperDataPoints: [{}] = [{}];
  private caliperDefaultMinScale: number;
  private caliperDefaultMaxScale: number;
  public caliperColor: string = "#7f8c8d";
  public caliperMinScale: number;
  public caliperMaxScale: number;

  constructor(private fileInformationService: FileInformationService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current().columnOrder;

    if (this.columnOrder.Gr) {
      this.grLog = this.fileInformationService.current().logs[this.columnOrder.Gr];
      this.grDefaultMinScale = this.grMinScale = Math.min.apply(null, this.grLog.filter(x => { return x > -900 }));
      this.grDefaultMaxScale = this.grMaxScale = Math.max.apply(null, this.grLog.filter(x => { return x > -900 }));
    }

    if (this.columnOrder.Caliper) {
      this.caliperLog = this.fileInformationService.current().logs[this.columnOrder.Caliper];
      this.caliperDefaultMinScale = this.caliperMinScale = Math.min.apply(null, this.caliperLog.filter(x => { return x > -900 }));
      this.caliperDefaultMaxScale = this.caliperMaxScale = Math.max.apply(null, this.caliperLog.filter(x => { return x > -900 }));
    }

    if (this.columnOrder.Gr || this.columnOrder.Caliper) {
      this.depthLog = this.fileInformationService.current().logs[this.columnOrder.Depth];
      this.minDepth = this.depthLog[0] - 100;
      this.maxDepth = this.depthLog[(this.depthLog.length) - 2];
      this.GrCaliperDraw();
    }
  }

  private GrCaliperDraw() {
    if (this.columnOrder.Gr)
      this.getPoints(this.grDataPoints, this.grLog);
    if (this.columnOrder.Caliper)
      this.getPoints(this.caliperDataPoints, this.caliperLog);
    this.render();
  }

  private getPoints(dataPoints: [{}], logData: number[]) {
    for (let i = 0; i < this.depthLog.length; i++) {
      if (logData[i] > -999) {
        dataPoints.push({
          x: logData[i],
          y: this.depthLog[i],
        });
      }
    }
  }

  private render() {
    this.grCaliperSettings = {
      animationEnabled: true,
      zoomEnabled: true,
      zoomType: "y",
      theme: this.theme,
      title: {
        text: "GR & Caliper"
      },
      exportEnabled: true,
      axisX2: [{
        title: "GR (API)",
        minimum: this.grMinScale,
        maximum: this.grMaxScale,
        titleFontColor: "#10ac84",
        gridColor: "#bfbfbf",
        lineColor: "#10ac84",
        tickColor: "#10ac84",
        labelFontColor: "#10ac84",
        gridThickness: 1,
      },
      {
        title: "Caliper (in)",
        minimum: this.caliperMinScale,
        //interval: 2,
        maximum: this.caliperMaxScale,
        reversed: false,
      }],
      axisY: {
        reversed: true,
        interval: 100,
        minimum: this.minDepth,
        maximum: this.maxDepth,
        includeZero: true,
        gridColor: "#bfbfbf",
        gridThickness: 1,
      },
      data: [{
        axisXType: "secondary",
        color: this.grColor,
        type: "spline",
        xValueType: "number",
        xValueFormatString: "##.####",
        yValueFormatString: "##.####",
        dataPoints: this.grDataPoints
      },
      {
        type: "spline",
        axisXType: "secondary",
        axisXIndex: 1, //defaults to 0
        color: this.caliperColor,
        xValueFormatString: "##.####",
        yValueFormatString: "##.####",
        dataPoints: this.caliperDataPoints
      }]
    }

    this.chart = new CanvasJS.Chart("grCaliperId", this.grCaliperSettings);
    this.chart.render();
  }

  grGraphSettingChange(newSetting: GraphProperties) {
    this.grColor = newSetting.color;
    this.grMinScale = newSetting.minScale;
    this.grMaxScale = newSetting.maxScale;
    this.theme = newSetting.theme;
    this.render();
  }

  caliperGraphSettingChange(newSetting: GraphProperties) {
    this.caliperColor = newSetting.color;
    this.caliperMinScale = newSetting.minScale;
    this.caliperMaxScale = newSetting.maxScale;
    this.theme = newSetting.theme;
    this.render();
  }

  grDefaultSettings() {
    this.grColor = "#10ac84";
    this.grMinScale = this.grDefaultMinScale;
    this.grMaxScale = this.grDefaultMaxScale;
    this.theme = "light1";
    this.render();
  }

  caliperDefaultSettings() {
    this.caliperColor = "#7f8c8d";
    this.caliperMinScale = this.caliperDefaultMinScale;
    this.caliperMaxScale = this.caliperDefaultMaxScale;
    this.theme = "light1";
    this.render();
  }

}
