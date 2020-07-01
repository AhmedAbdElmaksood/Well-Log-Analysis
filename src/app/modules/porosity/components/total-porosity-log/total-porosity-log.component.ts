import { Component, OnInit, Input } from '@angular/core';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';
import { FileInformationService } from '../../../well-information/services/file-information.service';
import { PorosityParametersService } from '../../services/porosity-parameters.service';
import { PorosityEquationsService } from '../../services/porosity-equations.service'

import * as CanvasJS from '../../../../canvasjs.min.js';
import { GraphProperties } from 'src/app/shared/models/GraphProperties';

@Component({
  selector: 'app-total-porosity-log',
  templateUrl: './total-porosity-log.component.html',
  styleUrls: ['./total-porosity-log.component.css']
})
export class TotalPorosityLogComponent implements OnInit {
  @Input() divId: string;

  private totalPorositySettings;
  private minDepth: number;
  private maxDepth: number;
  private densityLog: number[];
  private neutronLog: number[];
  private depthLog: number[];
  private neutronCorrection: number;
  private matrixDensity: number;
  private fluidDensity: number;
  private totalPorosityDataPoints: any[] = []; //computed from porosity eqn service
  public columnOrder: ColumnOrder;
  public totalPorosityMinScale: number;
  public totalPorosityMaxScale: number;
  private totalPorosityDefaultMinScale: number;
  private totalPorosityDefaultMaxScale: number;
  private chart;
  public theme: string = "light1";
  public totalPorosityColor: string = "#10ac84";

  constructor(private fileInformationService: FileInformationService, private porosityParametersService: PorosityParametersService, private porosityEquationsService: PorosityEquationsService) { }


  ngOnInit(): void {
    
    this.columnOrder = this.fileInformationService.current().columnOrder;

    if (this.columnOrder.Density && this.columnOrder.Neutron) {
      this.densityLog = this.fileInformationService.current().logs[this.columnOrder.Density];
      this.depthLog = this.fileInformationService.current().logs[this.columnOrder.Depth];
      this.neutronLog = this.fileInformationService.current().logs[this.columnOrder.Neutron];
      this.neutronCorrection = this.porosityParametersService.getParamsFromLocal().NC;
      this.matrixDensity = this.porosityParametersService.getParamsFromLocal().MD;
      this.fluidDensity = this.porosityParametersService.getParamsFromLocal().FD;
      this.totalPorosityDataPoints = this.porosityEquationsService.getTotalPorosityEquation(this.depthLog,this.neutronCorrection,this.densityLog,this.matrixDensity,this.fluidDensity,this.neutronLog);
      this.totalPorosityDefaultMinScale = this.totalPorosityMinScale =  this.totalPorosityDataPoints.reduce((min, p) => p.x < min ? p.x : min, this.totalPorosityDataPoints[0].x) ;
      this.totalPorosityDefaultMaxScale = this.totalPorosityMaxScale = this.totalPorosityDataPoints.reduce((max, p) => p.x > max ? p.x : max, this.totalPorosityDataPoints[0].x) ;
      this.minDepth = this.depthLog[0] - 100;
      this.maxDepth = this.depthLog[(this.depthLog.length) - 2];
      this.render();
    }
  }

  private render() {
    this.totalPorositySettings = {
      animationEnabled: true,
      zoomEnabled: true,
      zoomType: "y",
      theme: this.theme,
      title: {
        text: "Total Porosity"
      },
      exportEnabled: true,
      axisX2: {
        title: "Total Porosity (%)",
        minimum: this.totalPorosityMinScale,
        maximum: this.totalPorosityMaxScale,
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
        color: this.totalPorosityColor,
        type: "spline",
        xValueType: "number",
        xValueFormatString: "##.####",
        yValueFormatString: "##.####",
        dataPoints: this.totalPorosityDataPoints
      }]
    }
  
    this.chart = new CanvasJS.Chart(this.divId, this.totalPorositySettings);
    this.chart.render();
  }

  totalPorosityGraphSettingChange(newSetting: GraphProperties){
    this.totalPorosityColor = newSetting.color;
    this.totalPorosityMinScale = newSetting.minScale;
    this.totalPorosityMaxScale = newSetting.maxScale;
    this.theme = newSetting.theme;
    this.render();
  }

  totalPorosityDefaultSettings(){
    this.totalPorosityColor = "#10ac84";
    this.totalPorosityMinScale = this.totalPorosityDefaultMinScale;
    this.totalPorosityMaxScale = this.totalPorosityDefaultMaxScale;
    this.theme = "light1";
    this.render();
  }


}





