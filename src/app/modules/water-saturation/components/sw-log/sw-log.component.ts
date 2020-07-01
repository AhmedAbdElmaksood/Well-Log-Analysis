import { Component, OnInit } from '@angular/core';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';
import { PorosityParametersService } from '../../../porosity/services/porosity-parameters.service';
import { PorosityEquationsService } from '../../../porosity/services/porosity-equations.service'
import { FileInformationService } from '../../../well-information/services/file-information.service';
import { EquationsParametersService } from '../../../vsh/services/equations-parameters.service';
import { VshEquationsService } from '../../../vsh/services/vsh-equations.service';
import * as CanvasJS from '../../../../canvasjs.min.js';
import { GraphProperties } from 'src/app/shared/models/GraphProperties';
import { EffectivePorosityVariablesService } from '../../../porosity/services/effective-porosity-variables.service';

import { SwParametersService } from '../../services/sw-parameters.service';


@Component({
  selector: 'app-sw-log',
  templateUrl: './sw-log.component.html',
  styleUrls: ['./sw-log.component.css']
})
export class SwLogComponent implements OnInit {
  private waterSaturationSettings;
  private minDepth: number;
  private maxDepth: number;
  private densityLog: number[];
  private neutronLog: number[];
  private depthLog: number[];
  private grLog: number[];
  private vshLog: number[];
  private neutronCorrection: number;
  private matrixDensity: number;
  private fluidDensity: number;
  private bulkDensity: number;
  private vshMethodName: string;
  private waterSaturationDataPoints: any[] = []; //computed from porosity eqn service
  public columnOrder: ColumnOrder;
  public waterSaturationMinScale: number;
  public waterSaturationMaxScale: number;
  private waterSaturationDefaultMinScale: number;
  private waterSaturationDefaultMaxScale: number;
  private chart;
  public theme: string = "light1";
  public waterSaturationColor: string = "#369EAD"
  private lldLog: number[];
  private lldDataPoints: any[] = [];
  private effectivePorosityLog: any[] = [];
  constructor(private fileInformationService: FileInformationService,
    private porosityEquationsService: PorosityEquationsService,
    private porosityParametersService: PorosityParametersService,
    private equationsParametersService: EquationsParametersService,
    private vshEquationsService: VshEquationsService,
    private swParametersService: SwParametersService,
    private effectivePorosityVariablesService: EffectivePorosityVariablesService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current().columnOrder;

    if (this.columnOrder.Density && this.columnOrder.Neutron && this.columnOrder.Gr && this.columnOrder.Lld) {
      this.densityLog = this.fileInformationService.current().logs[this.columnOrder.Density];
      this.depthLog = this.fileInformationService.current().logs[this.columnOrder.Depth];
      this.neutronLog = this.fileInformationService.current().logs[this.columnOrder.Neutron];
      this.grLog = this.fileInformationService.current().logs[this.columnOrder.Gr];
      this.lldLog = this.fileInformationService.current().logs[this.columnOrder.Lld];
      let porosityParams = this.porosityParametersService.getParamsFromLocal();
      this.neutronCorrection = porosityParams.NC;
      this.matrixDensity = porosityParams.MD;
      this.fluidDensity = porosityParams.FD;
      this.computeVshell();
      let swParams = this.swParametersService.getSwParameters();
      this.getLLDPoints();//compute LLD Points
      this.waterSaturationDataPoints = this.porosityEquationsService.getWaterSaturationEquation(this.depthLog, this.neutronCorrection, this.densityLog, this.matrixDensity, this.fluidDensity, this.neutronLog, this.vshLog, this.bulkDensity, swParams.a, swParams.m, swParams.Rw, swParams.n, this.lldDataPoints);
      this.waterSaturationDefaultMinScale = this.waterSaturationMinScale = this.waterSaturationDataPoints.reduce((min, p) => p.x < min ? p.x : min, this.waterSaturationDataPoints[0].x);
      this.waterSaturationDefaultMaxScale = this.waterSaturationMaxScale = this.waterSaturationDataPoints.reduce((max, p) => p.x > max ? p.x : max, this.waterSaturationDataPoints[0].x);
      this.minDepth = this.depthLog[0] - 100;
      this.maxDepth = this.depthLog[(this.depthLog.length) - 2];
      this.render();
    }
  }

  private getLLDPoints() {
    for (let i = 0; i < this.depthLog.length; i++) {
      if (this.lldLog[i] > -999) {
        this.lldDataPoints.push({
          x: this.lldLog[i],
          y: this.depthLog[i],
        });
      }
    }
  }

  private computeVshell() {
    let effectiveParams = this.effectivePorosityVariablesService.getEffectiveVariables();
    this.bulkDensity = effectiveParams.bulkDensity;
    this.vshMethodName = effectiveParams.vshMethodName;
    let vshParams = this.equationsParametersService.current();
    if (this.vshMethodName === 'linear' && vshParams)
      this.vshLog = this.vshEquationsService.getLinearResponsePoints(this.depthLog, this.grLog, vshParams.minGr, vshParams.maxGr);
    else if (this.vshMethodName === 'Larionov' && vshParams)
      this.vshLog = this.vshEquationsService.getLarionovPoints(this.depthLog, this.grLog, vshParams.minGr, vshParams.maxGr);
    else if (this.vshMethodName === 'Steiber' && vshParams)
      this.vshLog = this.vshEquationsService.getSteiberPoints(this.depthLog, this.grLog, vshParams.minGr, vshParams.maxGr);
    else if (this.vshMethodName === 'Older' && vshParams)
      this.vshLog = this.vshEquationsService.getOlderPoints(this.depthLog, this.grLog, vshParams.minGr, vshParams.maxGr);
    else if (this.vshMethodName === 'Clavier' && vshParams)
      this.vshLog = this.vshEquationsService.getClavierPoints(this.depthLog, this.grLog, vshParams.minGr, vshParams.maxGr);
  }

  private render() {
    this.waterSaturationSettings = {
      animationEnabled: true,
      zoomEnabled: true,
      zoomType: "y",
      theme: this.theme,
      title: {
        text: "SW"
      },
      exportEnabled: true,
      axisX2: [{
        title: "SW (%)",
        titleFontColor: "#369EAD",
        lineColor: "#369EAD",
        tickColor: "#369EAD",
        labelFontColor: "#369EAD",
        minimum: this.waterSaturationMinScale,
        //interval: 10,
        maximum: this.waterSaturationMaxScale,
        gridColor: "#dcdcdc",
        gridThickness: 1,

      },
      ],
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
        axisXIndex: 0,
        color: this.waterSaturationColor,
        type: "spline",
        xValueFormatString: "##.####",
        yValueFormatString: "##.####",
        dataPoints: this.waterSaturationDataPoints
      }]
    }

    this.chart = new CanvasJS.Chart("waterSaturationLogId", this.waterSaturationSettings);
    this.chart.render();
  }

  waterSaturationLogGraphSettingChange(newSetting: GraphProperties) {
    this.waterSaturationColor = newSetting.color;
    this.waterSaturationMinScale = newSetting.minScale;
    this.waterSaturationMaxScale = newSetting.maxScale;
    this.theme = newSetting.theme;
    this.render();
  }

  waterSaturationLogDefaultSettings() {
    this.waterSaturationColor = "#369EAD";
    this.waterSaturationMinScale = this.waterSaturationDefaultMinScale;
    this.waterSaturationMaxScale = this.waterSaturationDefaultMaxScale;
    this.theme = "light1";
    this.render();
  }


}
