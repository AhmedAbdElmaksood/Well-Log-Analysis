import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GraphProperties } from 'src/app/shared/models/GraphProperties';

@Component({
  selector: 'app-log-control',
  templateUrl: './log-control.component.html',
  styleUrls: ['./log-control.component.css']
})
export class LogControlComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  @Input() title: string;
  @Input() id: string;
  @Input() color: string;
  @Input() minScale: number;
  @Input() maxScale: number;
  @Input() theme: string;
  @Input() logType: string;

  @Output() changeGraphSettings = new EventEmitter<GraphProperties>();
  @Output() defaultSettings = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    this.changeGraphSettings.emit({color: this.color, minScale: this.minScale, maxScale: this.maxScale, theme: this.theme});
    this.closebutton.nativeElement.click();
  }

  default(){
    this.defaultSettings.emit();
    this.closebutton.nativeElement.click();
  }

}
