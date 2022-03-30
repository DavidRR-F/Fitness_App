import { Component, Input, OnInit } from '@angular/core';
import { MacroModel } from '../shared/models/macro-graph.model';

@Component({
  selector: 'app-macro-graph',
  templateUrl: './macro-graph.component.html',
  styleUrls: ['./macro-graph.component.css']
})
export class MacroGraphComponent implements OnInit {

  @Input() title: string;
  @Input() list: Array<MacroModel>;

  public Total=0;
  public MaxHeight= 160;

  constructor() { }

  ngOnInit(): void {
    this.MontarGrafico();
  }

  MontarGrafico(){
    this.list.forEach(element => {
      this.Total += element.value;
    });

    this.list.forEach(element => {
      element.size = Math.round((element.value*this.MaxHeight)/this.Total) + '%';
    });
  }

}
