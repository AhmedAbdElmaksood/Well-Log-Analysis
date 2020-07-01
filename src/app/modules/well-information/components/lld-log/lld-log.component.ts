import { Component, OnInit, Input } from '@angular/core';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';
import { FileInformationService } from '../../services/file-information.service';
import * as CanvasJS from '../../../../canvasjs.min.js';
import { GraphProperties } from 'src/app/shared/models/GraphProperties';

@Component({
  selector: 'app-lld-log',
  templateUrl: './lld-log.component.html',
  styleUrls: ['./lld-log.component.css']
})
export class LldLogComponent implements OnInit {
  @Input() divId: string;
  @Input() containerWidth: string;

  private lldSettings;
  private minDepth: number;
  private maxDepth: number;
  private lldLog: number[];
  private depthLog: number[];
  private defaultMinScale: number;
  private defaultMaxScale: number;
  public columnOrder: ColumnOrder;

  private chart;
  private lldDataPoints = [];
  public color: string = "#AE178A";
  public minScale: number;
  public maxScale: number;
  public theme: string = "light1";


  constructor(private fileInformationService: FileInformationService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current().columnOrder;
    if (this.columnOrder.Lld) {
      this.lldLog = this.fileInformationService.current().logs[this.columnOrder.Lld];
      this.depthLog = this.fileInformationService.current().logs[this.columnOrder.Depth];

      this.minDepth = this.depthLog[0] - 100;
      this.maxDepth = this.depthLog[(this.depthLog.length) - 2];

      this.defaultMinScale = this.minScale = Math.min.apply(null, this.lldLog.filter(x => { return x > -900 }));
      this.defaultMaxScale = this.maxScale = Math.max.apply(null, this.lldLog.filter(x => { return x > -900 }));
      this.LldDraw();
    }
  }

  ngAfterViewInit() {
    this.render();
  }

  private LldDraw() {
    this.getPoints();
    this.render();
  }

  private getPoints() {
    for (let i = 0; i < this.depthLog.length; i++) {
      if (this.lldLog[i] > -999) {
        this.lldDataPoints.push({
          x: this.lldLog[i],
          y: this.depthLog[i],
        });
      }
    }
  }

  private render() {
    this.lldSettings = {
      animationEnabled: true,
      zoomEnabled: true,
      zoomType: "y",
      theme: this.theme,
      title: {
        text: "Resistivity",
      },
      exportEnabled: true,
      axisX2: [{
        title: "LLD",
        titleFontColor: "#AE178A",
        lineColor: "#AE178A",
        tickColor: "#AE178A",
        labelFontColor: "#AE178A",
        gridColor: "#dcdcdc",
        gridThickness: 1,
        minimum: this.minScale,
        maximum: this.maxScale,
      }],
      axisY: {
        reversed: true,
        interval: 100,
        includeZero: true,
        gridColor: "#bfbfbf",
        gridThickness: 1,
        minimum: this.minDepth,
        maximum: this.maxDepth,
      },
      data: [
        {
          type: "spline",
          color: this.color,
          axisXType: "secondary",
          axisXIndex: 0, //defaults to 0
          xValueFormatString: "##.####",
          yValueFormatString: "##.####",
          dataPoints: this.lldDataPoints
        }
      ]
    }

    this.chart = new CanvasJS.Chart(this.divId, this.lldSettings);
    this.chart.render();
  }

  graphSettingChange(newSetting: GraphProperties) {
    this.color = newSetting.color;
    this.minScale = newSetting.minScale;
    this.maxScale = newSetting.maxScale;
    this.theme = newSetting.theme;
    this.render();
  }

  defaultSettings() {
    this.color = "#AE178A";
    this.minScale = this.defaultMinScale;
    this.maxScale = this.defaultMaxScale;
    this.theme = "light1";
    this.render();
  }

}
