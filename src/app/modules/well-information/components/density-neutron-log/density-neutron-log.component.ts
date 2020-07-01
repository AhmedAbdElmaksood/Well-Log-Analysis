import { Component, OnInit, Input } from '@angular/core';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';
import { FileInformationService } from '../../services/file-information.service';
import * as CanvasJS from '../../../../canvasjs.min.js';
import { GraphProperties } from 'src/app/shared/models/GraphProperties';

@Component({
  selector: 'app-density-neutron-log',
  templateUrl: './density-neutron-log.component.html',
  styleUrls: ['./density-neutron-log.component.css']
})
export class DensityNeutronLogComponent implements OnInit {
  @Input() enableCross: boolean = false;
  @Input() divId: string;

  private densityNeutronSettings;
  private minDepth: number;
  private maxDepth: number;
  private densityLog: number[];
  private neutronLog: number[];
  private depthLog: number[];
  public columnOrder: ColumnOrder;

  private chart;
  private densityDataPoints: [{}] = [{}];
  private densityDefaultMinScale: number;
  private densityDefaultMaxScale: number;
  public densityColor: string = "#369EAD";
  public densityMinScale: number;
  public densityMaxScale: number;
  public theme: string = "light1";

  private neutronDataPoints: [{}] = [{}];
  private neutronDefaultMinScale: number;
  private neutronDefaultMaxScale: number;
  public neutronColor: string = "#C24642";
  public neutronMinScale: number;
  public neutronMaxScale: number;

  constructor(private fileInformationService: FileInformationService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current().columnOrder;

    if (this.columnOrder.Neutron) {
      this.neutronLog = this.fileInformationService.current().logs[this.columnOrder.Neutron];
      this.neutronDefaultMinScale = this.neutronMinScale = Math.min.apply(null, this.neutronLog.filter(x => { return x > -900 }));
      this.neutronDefaultMaxScale = this.neutronMaxScale = Math.max.apply(null, this.neutronLog.filter(x => { return x > -900 }));
    }

    if (this.columnOrder.Density) {
      this.densityLog = this.fileInformationService.current().logs[this.columnOrder.Density];
      this.densityDefaultMinScale = this.densityMinScale = Math.min.apply(null, this.densityLog.filter(x => { return x > -900 }));
      this.densityDefaultMaxScale = this.densityMaxScale = Math.max.apply(null, this.densityLog.filter(x => { return x > -900 }));
    }

    if (this.columnOrder.Neutron || this.columnOrder.Density) {
      this.depthLog = this.fileInformationService.current().logs[this.columnOrder.Depth];
      this.minDepth = this.depthLog[0] - 100;
      this.maxDepth = this.depthLog[(this.depthLog.length) - 2];
      this.DensityNeutronDraw();
    }
  }

  private DensityNeutronDraw() {
    if (this.columnOrder.Density)
      this.getPoints(this.densityDataPoints, this.densityLog);
    if (this.columnOrder.Neutron)
      this.getPoints(this.neutronDataPoints, this.neutronLog);
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
    this.densityNeutronSettings = {
      animationEnabled: true,
      zoomEnabled: true,
      zoomType: "y",
      theme: this.theme,
      title: {
        text: "Neutron & Density",
      },
      exportEnabled: true,
      axisX2: [{
        title: "Density (gm/cc)",
        titleFontColor: "#369EAD",
        lineColor: "#369EAD",
        tickColor: "#369EAD",
        labelFontColor: "#369EAD",
        minimum: this.densityMinScale,
        //interval: .10,
        maximum: this.densityMaxScale,
        gridColor: "#dcdcdc",
        gridThickness: 1,
        crosshair: {
          enabled: this.enableCross,
          labelFontColor: "#369EAD",
          labelFontSize: 16,
          labelMaxWidth: 100,
          valueFormatString: "##.####",
        }
      },
      {
        title: "Neutron (%)",
        titleFontColor: "#C24642",
        lineColor: "#C24642",
        tickColor: "#C24642",
        labelFontColor: "#C24642",
        minimum: this.neutronMinScale,
        //interval: .15,
        maximum: this.neutronMaxScale,
        reversed: true,
        crosshair: {
          enabled: this.enableCross,
          labelFontColor: "#C24642",
          labelFontSize: 16,
          labelMaxWidth: 100,
          valueFormatString: "##.####",
        }
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
          color: this.densityColor,
          axisXType: "secondary",
          axisXIndex: 0, //defaults to 0
          xValueFormatString: "##.####",
          yValueFormatString: "##.####",
          dataPoints: this.densityDataPoints
        },
        {
          type: "spline",
          axisXType: "secondary",
          axisXIndex: 1, //defaults to 0
          color: this.neutronColor,
          xValueFormatString: "##.####",
          yValueFormatString: "##.####",
          dataPoints: this.neutronDataPoints
        }
      ]
    }

    this.chart = new CanvasJS.Chart(this.divId, this.densityNeutronSettings);
    this.chart.render();
  }

  densityGraphSettingChange(newSetting: GraphProperties) {
    this.densityColor = newSetting.color;
    this.densityMinScale = newSetting.minScale;
    this.densityMaxScale = newSetting.maxScale;
    this.theme = newSetting.theme;
    this.render();
  }

  neutronGraphSettingChange(newSetting: GraphProperties) {
    this.neutronColor = newSetting.color;
    this.neutronMinScale = newSetting.minScale;
    this.neutronMaxScale = newSetting.maxScale;
    this.theme = newSetting.theme;
    this.render();
  }

  densityDefaultSettings() {
    this.densityColor = "#369EAD";
    this.densityMinScale = this.densityDefaultMinScale;
    this.densityMaxScale = this.densityDefaultMaxScale;
    this.theme = "light1";
    this.render();
  }

  neutronDefaultSettings() {
    this.neutronColor = "#C24642";
    this.neutronMinScale = this.neutronDefaultMinScale;
    this.neutronMaxScale = this.neutronDefaultMaxScale;
    this.theme = "light1";
    this.render();
  }

}
