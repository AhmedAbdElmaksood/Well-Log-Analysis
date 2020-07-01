import { Component, OnInit } from '@angular/core';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';
import { FileInformationService } from '../../../well-information/services/file-information.service';
import { PorosityParametersService } from '../../services/porosity-parameters.service';
import { PorosityEquationsService } from '../../services/porosity-equations.service'

import * as CanvasJS from '../../../../canvasjs.min.js';
import { GraphProperties } from 'src/app/shared/models/GraphProperties';

@Component({
  selector: 'app-neutron-log',
  templateUrl: './neutron-log.component.html',
  styleUrls: ['./neutron-log.component.css']
})
export class NeutronLogComponent implements OnInit {
  private neutronSettings;
  private minDepth: number;
  private maxDepth: number;
  private neutronLog: number[];
  private depthLog: number[];
  private neutronCorrection: number;
  private neutronDataPoints: any[] = []; //computed from porosity eqn service
  public columnOrder: ColumnOrder;
  public neutronMinScale: number;
  public neutronMaxScale: number;
  private neutronDefaultMinScale: number;
  private neutronDefaultMaxScale: number;
  private chart;
  public theme: string = "light1";
  public neutronColor: string = "#C24642";
 

  constructor(private fileInformationService: FileInformationService, private porosityParametersService: PorosityParametersService, private porosityEquationsService: PorosityEquationsService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current().columnOrder;

    if (this.columnOrder.Neutron) {
      this.neutronLog = this.fileInformationService.current().logs[this.columnOrder.Neutron];
      this.depthLog = this.fileInformationService.current().logs[this.columnOrder.Depth];
      this.neutronCorrection = this.porosityParametersService.getParamsFromLocal().NC;
      this.minDepth = this.depthLog[0] - 100;
      this.maxDepth = this.depthLog[(this.depthLog.length) - 2];
      this.neutronDataPoints = this.porosityEquationsService.getNeutronLogEquation(this.depthLog, this.neutronLog, this.neutronCorrection)
      this.neutronDefaultMinScale = this.neutronMinScale = this.neutronDataPoints.reduce((min, p) => p.x < min ? p.x : min, this.neutronDataPoints[1].x);
      this.neutronDefaultMaxScale = this.neutronMaxScale = this.neutronDataPoints.reduce((max, p) => p.x > max ? p.x : max, this.neutronDataPoints[1].x);
   
      this.render();
    }
  }

  

  private render() {
    this.neutronSettings = {
      animationEnabled: true,
      zoomEnabled: true,
      zoomType: "y",
      theme: this.theme,
      title: {
        text: "Neutron Log"
      },
      exportEnabled: true,
      axisX2: {
        title: "Neutron (%)",
        minimum: this.neutronMinScale,
        maximum: this.neutronMaxScale,
        gridColor: "#dcdcdc",
        titleFontColor: "#C24642",
        lineColor: "#C24642",
        tickColor: "#C24642",
        labelFontColor: "#C24642",
        gridThickness: 1,

      },
     
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
        color: this.neutronColor,
        type: "spline",
        xValueType: "number",
        xValueFormatString: "##.####",
        yValueFormatString: "##.####",
        dataPoints: this.neutronDataPoints
      }]
    }
  
    this.chart = new CanvasJS.Chart("neutronLogId", this.neutronSettings);
    this.chart.render();
  }

  neutronGraphSettingChange(newSetting: GraphProperties){
    this.neutronColor = newSetting.color;
    this.neutronMinScale = newSetting.minScale;
    this.neutronMaxScale = newSetting.maxScale;
    this.theme = newSetting.theme;
    this.render();
  }

  neutronDefaultSettings(){
    this.neutronColor = "#C24642";
    this.neutronMinScale = this.neutronDefaultMinScale;
    this.neutronMaxScale = this.neutronDefaultMaxScale;
    this.theme = "light1";
    this.render();
  }


}
