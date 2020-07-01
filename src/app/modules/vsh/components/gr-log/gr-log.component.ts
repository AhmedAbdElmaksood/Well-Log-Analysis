import { Component, OnInit, Input, AfterViewInit, SimpleChanges } from '@angular/core';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';
import { FileInformationService } from 'src/app/modules/well-information/services/file-information.service';
import * as CanvasJS from '../../../../canvasjs.min.js';
import { GraphProperties } from 'src/app/shared/models/GraphProperties.js';
import { VshEquationsService } from '../../services/vsh-equations.service.js';
import { Observable } from 'rxjs';
import { vshParameters } from 'src/app/shared/models/VshParameters.js';
import { EquationsParametersService } from '../../services/equations-parameters.service.js';

@Component({
  selector: 'app-gr-log',
  templateUrl: './gr-log.component.html',
  styleUrls: ['./gr-log.component.css']
})
export class GrLogComponent implements OnInit, AfterViewInit {

  @Input() set id(id: string){
    this._id = id;
    if(this.columnOrder){
      let params = this.equationsParametersService.current();
      this.getPoints(params)
      this.render();
    }
  };
  @Input() enableCrosshair: boolean = false;
  @Input() title: string;
  @Input() logType: string;
  @Input() xAxisTitle: string;
  @Input() divId: string;
  @Input() containerWidth: string;
  @Input() getCurrent: boolean;
  @Input() paramiterChangeEvent: Observable<vshParameters>;

  public _id: string;
  private grSettings;
  private minDepth: number;
  private maxDepth: number;
  private grLog: number[];
  private depthLog: number[];
  private defaultMinScale: number;
  private defaultMaxScale: number;
  public columnOrder: ColumnOrder;

  private chart;
  private DataPoints = [];
  public color: string = "#10ac84";
  public minScale: number;
  public maxScale: number;
  public theme: string = "light1";

  constructor(private fileInformationService: FileInformationService,
    private vshEquationsService: VshEquationsService,
    private equationsParametersService: EquationsParametersService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current().columnOrder;

    if (this.columnOrder.Gr) {
      this.grLog = this.fileInformationService.current().logs[this.columnOrder.Gr];
      this.depthLog = this.fileInformationService.current().logs[this.columnOrder.Depth];

      this.minDepth = this.depthLog[0] - 100;
      this.maxDepth = this.depthLog[(this.depthLog.length) - 2];

      if (this._id === 'gr') {
        this.DataPoints = this.vshEquationsService.getGrPoints(this.depthLog, this.grLog);
        this.defaultMinScale = this.minScale = Math.min.apply(null, this.grLog.filter(x => { return x > -900 }));
        this.defaultMaxScale = this.maxScale = Math.max.apply(null, this.grLog.filter(x => { return x > -900 }));
        this.render();
      }

      if (this._id === 'linear' || this._id === 'Larionov' || this._id === 'Steiber' || this._id === 'Older' || this._id === 'Clavier') {
        if (!this.getCurrent) {
          this.paramiterChangeEvent.subscribe(params => {
            this.getPoints(params)
            this.render();
          })
        } else {
          let params = this.equationsParametersService.current();
          this.getPoints(params)
        }
      }
    }
  }

  ngAfterViewInit() {
    this.render();
  }

  getPoints(params) {
    if (this._id === 'linear' && params)
      this.DataPoints = this.vshEquationsService.getLinearResponsePoints(this.depthLog, this.grLog, params.minGr, params.maxGr);
    else if (this._id === 'Larionov' && params)
      this.DataPoints = this.vshEquationsService.getLarionovPoints(this.depthLog, this.grLog, params.minGr, params.maxGr);
    else if (this._id === 'Steiber' && params)
      this.DataPoints = this.vshEquationsService.getSteiberPoints(this.depthLog, this.grLog, params.minGr, params.maxGr);
    else if (this._id === 'Older' && params)
      this.DataPoints = this.vshEquationsService.getOlderPoints(this.depthLog, this.grLog, params.minGr, params.maxGr);
    else if (this._id === 'Clavier' && params)
      this.DataPoints = this.vshEquationsService.getClavierPoints(this.depthLog, this.grLog, params.minGr, params.maxGr);

    this.defaultMinScale = this.minScale = this.DataPoints.reduce((min, p) => p.x < min ? p.x : min, this.DataPoints[0].x);
    this.defaultMaxScale = this.maxScale = this.DataPoints.reduce((max, p) => p.x > max ? p.x : max, this.DataPoints[0].x);
  }

  private render() {
    this.grSettings = {
      animationEnabled: true,
      zoomEnabled: true,
      zoomType: "y",
      theme: this.theme,
      title: {
        text: this.logType
      },
      exportEnabled: true,
      axisX2: {
        title: this.xAxisTitle,
        minimum: this.minScale,
        maximum: this.maxScale,
        gridColor: "#dcdcdc",
        gridThickness: 1,
        crosshair: {
          enabled: this.enableCrosshair,
          labelFontColor: "#10ac84",
          labelFontSize: 16,
          labelMaxWidth: 100,
          valueFormatString: "##.####",
        }
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
        color: this.color,
        type: "spline",
        xValueType: "number",
        xValueFormatString: "##.####",
        yValueFormatString: "##.####",
        dataPoints: this.DataPoints
      }]
    }

    this.chart = new CanvasJS.Chart(this.divId, this.grSettings);
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
    this.color = "#10ac84";
    this.minScale = this.defaultMinScale;
    this.maxScale = this.defaultMaxScale;
    this.theme = "light1";
    this.render();
  }


}
