import { Component, OnInit } from '@angular/core';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';
import { FileInformationService } from '../../../well-information/services/file-information.service';
import { PorosityParametersService } from '../../services/porosity-parameters.service';
import { PorosityEquationsService } from '../../services/porosity-equations.service'

import * as CanvasJS from '../../../../canvasjs.min.js';
import { GraphProperties } from 'src/app/shared/models/GraphProperties';


@Component({
  selector: 'app-density-porosity-log',
  templateUrl: './density-porosity-log.component.html',
  styleUrls: ['./density-porosity-log.component.css']
})
export class DensityPorosityLogComponent implements OnInit {

  private densityPorositySettings;
  private minDepth: number;
  private maxDepth: number;
  private densityLog: number[];
  private depthLog: number[];
  private matrixDensity: number;
  private fluidDensity: number;
  private densityPorosityDataPoints: any[] = []; //computed from porosity eqn service
  public columnOrder: ColumnOrder;
  public densityPorosityMinScale: number;
  public densityPorosityMaxScale: number;
  private densityPorosityDefaultMinScale: number;
  private densityPorosityDefaultMaxScale: number;
  private chart;
  public theme: string = "light1";
  public densityPorosityColor: string = "#10ac84";
  

  constructor(private fileInformationService: FileInformationService, private porosityParametersService: PorosityParametersService, private porosityEquationsService: PorosityEquationsService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current().columnOrder;

    if (this.columnOrder.Density) {
      this.densityLog = this.fileInformationService.current().logs[this.columnOrder.Density];
      this.depthLog = this.fileInformationService.current().logs[this.columnOrder.Depth];
      this.matrixDensity = this.porosityParametersService.getParamsFromLocal().MD;
      this.fluidDensity = this.porosityParametersService.getParamsFromLocal().FD;
      this.minDepth = this.depthLog[0] - 100;
      this.maxDepth = this.depthLog[(this.depthLog.length) - 2];
      this.densityPorosityDataPoints = this.porosityEquationsService.getDensityPorosityEquation(this.depthLog, this.densityLog, this.matrixDensity,this.fluidDensity)
      this.densityPorosityDefaultMinScale = this.densityPorosityMinScale =  this.densityPorosityDataPoints.reduce((min, p) => p.x < min ? p.x : min, this.densityPorosityDataPoints[0].x) ;
      this.densityPorosityDefaultMaxScale = this.densityPorosityMaxScale = this.densityPorosityDataPoints.reduce((max, p) => p.x > max ? p.x : max, this.densityPorosityDataPoints[0].x) ;
      this.render();
    
    }
  }





  private render() {
    this.densityPorositySettings = {
      animationEnabled: true,
      zoomEnabled: true,
      zoomType: "y",
      theme: this.theme,
      title: {
        text: "Density Porosity"
      },
      exportEnabled: true,
      axisX2: {
        title: "Density Porosity (%)",
        minimum: this.densityPorosityMinScale,
        maximum: this.densityPorosityMaxScale,
        gridColor: "#dcdcdc",
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
        color: this.densityPorosityColor,
        type: "spline",
        xValueType: "number",
        xValueFormatString: "##.####",
        yValueFormatString: "##.####",
        dataPoints: this.densityPorosityDataPoints
      }]
    }
  
    this.chart = new CanvasJS.Chart("densityPorosityLogId", this.densityPorositySettings);
    this.chart.render();
  }

  densityPorosityGraphSettingChange(newSetting: GraphProperties){
    this.densityPorosityColor = newSetting.color;
    this.densityPorosityMinScale = newSetting.minScale;
    this.densityPorosityMaxScale = newSetting.maxScale;
    this.theme = newSetting.theme;
    this.render();
  }

  densityPorosityDefaultSettings(){
    this.densityPorosityColor = "#10ac84";
    this.densityPorosityMinScale = this.densityPorosityDefaultMinScale;
    this.densityPorosityMaxScale = this.densityPorosityDefaultMaxScale;
    this.theme = "light1";
    this.render();
  }


}



