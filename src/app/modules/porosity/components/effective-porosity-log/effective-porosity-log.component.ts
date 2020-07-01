import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';
import { PorosityParametersService } from '../../services/porosity-parameters.service';
import { PorosityEquationsService } from '../../services/porosity-equations.service'
import { FileInformationService } from '../../../well-information/services/file-information.service';
import { EquationsParametersService } from '../../../vsh/services/equations-parameters.service';
import { VshEquationsService } from '../../../vsh/services/vsh-equations.service';
import * as CanvasJS from '../../../../canvasjs.min.js';
import { GraphProperties } from 'src/app/shared/models/GraphProperties';
import { EffectivePorosityVariablesService } from '../../services/effective-porosity-variables.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-effective-porosity-log',
  templateUrl: './effective-porosity-log.component.html',
  styleUrls: ['./effective-porosity-log.component.css']
})
export class EffectivePorosityLogComponent implements OnInit {
  @Input() containerWidth: string;
  @Input() divId: string;
  
  private effectivePorositySettings;
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
  private effectivePorosityDataPoints: any[] = []; //computed from porosity eqn service
  public columnOrder: ColumnOrder;
  public effectivePorosityMinScale: number;
  public effectivePorosityMaxScale: number;
  private effectivePorosityDefaultMinScale: number;
  private effectivePorosityDefaultMaxScale: number;
  private chart;
  public theme: string = "light1";
  public effectivePorosityColor: string = "#369EAD";


  @Input() iseffectiveVariablesChanged: boolean;
  @Input() paramiterChangeEvent: Observable<void>;


  constructor(private fileInformationService: FileInformationService, private porosityEquationsService: PorosityEquationsService, private porosityParametersService: PorosityParametersService, private equationsParametersService: EquationsParametersService, private vshEquationsService: VshEquationsService, private effectivePorosityVariablesService: EffectivePorosityVariablesService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current().columnOrder;

    if (this.columnOrder.Density && this.columnOrder.Neutron && this.columnOrder.Gr) {
      this.densityLog = this.fileInformationService.current().logs[this.columnOrder.Density];
      this.depthLog = this.fileInformationService.current().logs[this.columnOrder.Depth];
      this.neutronLog = this.fileInformationService.current().logs[this.columnOrder.Neutron];
      this.grLog = this.fileInformationService.current().logs[this.columnOrder.Gr];
      let porosityParams = this.porosityParametersService.getParamsFromLocal();
      this.neutronCorrection = porosityParams.NC;
      this.matrixDensity = porosityParams.MD;
      this.fluidDensity = porosityParams.FD;
      this.computeVshell();

      this.effectivePorosityDataPoints = this.porosityEquationsService.getEffectivePorosityEquation(this.depthLog, this.neutronCorrection, this.densityLog, this.matrixDensity, this.fluidDensity, this.neutronLog, this.vshLog, this.bulkDensity);
      this.effectivePorosityDefaultMinScale = this.effectivePorosityMinScale = this.effectivePorosityDataPoints.reduce((min, p) => p.x < min ? p.x : min, this.effectivePorosityDataPoints[0].x);
      this.effectivePorosityDefaultMaxScale = this.effectivePorosityMaxScale = this.effectivePorosityDataPoints.reduce((max, p) => p.x > max ? p.x : max, this.effectivePorosityDataPoints[0].x);
      this.minDepth = this.depthLog[0] - 100;
      this.maxDepth = this.depthLog[(this.depthLog.length) - 2];
      this.render();
      if (this.paramiterChangeEvent != undefined) {
        this.paramiterChangeEvent.subscribe(() => {
          this.computeVshell();

          this.effectivePorosityDataPoints = this.porosityEquationsService.getEffectivePorosityEquation(this.depthLog, this.neutronCorrection, this.densityLog, this.matrixDensity, this.fluidDensity, this.neutronLog, this.vshLog, this.bulkDensity);
          this.effectivePorosityDefaultMinScale = this.effectivePorosityMinScale = this.effectivePorosityDataPoints.reduce((min, p) => p.x < min ? p.x : min, this.effectivePorosityDataPoints[0].x);
          this.effectivePorosityDefaultMaxScale = this.effectivePorosityMaxScale = this.effectivePorosityDataPoints.reduce((max, p) => p.x > max ? p.x : max, this.effectivePorosityDataPoints[0].x);
          this.render();
        })
      }

    }
  }

  ngAfterViewInit() {
    this.render();
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
    this.effectivePorositySettings = {
      animationEnabled: true,
      zoomEnabled: true,
      zoomType: "y",
      theme: this.theme,
      title: {
        text: "Effective porosity"
      },
      exportEnabled: true,
      axisX2: [{
        title: "Effective porosity (%)",
        titleFontColor: "#369EAD",
        lineColor: "#369EAD",
        tickColor: "#369EAD",
        labelFontColor: "#369EAD",
        minimum: this.effectivePorosityMinScale,
        //interval: 10,
        maximum: this.effectivePorosityMaxScale,
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
        color: this.effectivePorosityColor,
        type: "spline",
        xValueFormatString: "##.####",
        yValueFormatString: "##.####",
        dataPoints: this.effectivePorosityDataPoints
      }]
    }

    this.chart = new CanvasJS.Chart(this.divId, this.effectivePorositySettings);
    this.chart.render();
  }

  effectiveLogGraphSettingChange(newSetting: GraphProperties) {
    this.effectivePorosityColor = newSetting.color;
    this.effectivePorosityMinScale = newSetting.minScale;
    this.effectivePorosityMaxScale = newSetting.maxScale;
    this.theme = newSetting.theme;
    this.render();
  }

  effectiveLogDefaultSettings() {
    this.effectivePorosityColor = "#369EAD";
    this.effectivePorosityMinScale = this.effectivePorosityDefaultMinScale;
    this.effectivePorosityMaxScale = this.effectivePorosityDefaultMaxScale;
    this.theme = "light1";
    this.render();
  }
}
