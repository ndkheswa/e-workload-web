import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  visible: Observable<boolean>;
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.visible = Observable.of(!this.visible);
  }

}
