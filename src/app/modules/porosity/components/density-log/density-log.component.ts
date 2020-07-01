import { Component, OnInit } from '@angular/core';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';
import { FileInformationService } from '../../../well-information/services/file-information.service';
import * as CanvasJS from '../../../../canvasjs.min.js';
import { GraphProperties } from 'src/app/shared/models/GraphProperties';


@Component({
  selector: 'app-density-log',
  templateUrl: './density-log.component.html',
  styleUrls: ['./density-log.component.css']
})
export class DensityLogComponent implements OnInit {

  public columnOrder: ColumnOrder;
  private densityLog: number[];
  private depthLog: number[];
  public densityMinScale: number;
  public densityMaxScale: number;
  private densityDefaultMinScale: number;
  private densityDefaultMaxScale: number;
  private minDepth: number;
  private maxDepth: number;
  private densityDataPoints: [{}] = [{}];
  private densitySettings;
  public theme: string =  "light1";
  public densityColor: string = "#369EAD";
  private chart;

  constructor(private fileInformationService: FileInformationService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current().columnOrder;

    if (this.columnOrder.Density) {
      this.densityLog = this.fileInformationService.current().logs[this.columnOrder.Density];
      this.depthLog = this.fileInformationService.current().logs[this.columnOrder.Depth];
      this.densityDefaultMinScale = this.densityMinScale = Math.min.apply(null, this.densityLog.filter(x => { return x > -900 }));
      this.densityDefaultMaxScale = this.densityMaxScale = Math.max.apply(null, this.densityLog.filter(x => { return x > -900 }));
      this.minDepth = this.depthLog[0] - 100;
      this.maxDepth = this.depthLog[(this.depthLog.length) - 2];
      
      this.DensityDraw();
    }
   
  }

  private DensityDraw() {
    if (this.columnOrder.Density)
    {
      for(let i=0;i<this.depthLog.length;i++)
      {
        if(this.densityLog[i]>-900)
        {
          this.densityDataPoints.push({
            x:this.densityLog[i],
            y:this.depthLog[i]
          })
        }
      }
    }
    this.render();
  }

  private render() {
    this.densitySettings = {
      animationEnabled: true,
      zoomEnabled: true,
      zoomType: "y",
      theme: this.theme,
      title: {
        text: "Density Log"
      },
      exportEnabled: true,
      axisX2: {
        title: "Density (gm/cc)",
        minimum: this.densityMinScale,
        maximum: this.densityMaxScale,
        gridColor: "#dcdcdc",
        titleFontColor: "#369EAD",
        lineColor: "#369EAD",
        tickColor: "#369EAD",
        labelFontColor: "#369EAD",
        gridThickness: 1,

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
        color: this.densityColor,
        type: "spline",
        xValueType: "number",
        xValueFormatString: "##.####",
        yValueFormatString: "##.####",
        dataPoints: this.densityDataPoints,
      }]
    }
    
  

    this.chart = new CanvasJS.Chart("densityLogId", this.densitySettings);
    this.chart.render();
  }
  densityGraphSettingChange(newSetting: GraphProperties){
    this.densityColor = newSetting.color;
    this.densityMinScale = newSetting.minScale;
    this.densityMaxScale = newSetting.maxScale;
    this.theme = newSetting.theme;
    this.render();
  }

  densityDefaultSettings(){
    this.densityColor = "#369EAD";
    this.densityMinScale = this.densityDefaultMinScale;
    this.densityMaxScale = this.densityDefaultMaxScale;
    this.theme = "light1";
    this.render();
  }


}
