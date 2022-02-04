import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { Line } from '../models/line';

@Component({
  selector: 'app-code-container',
  templateUrl: './code-container.component.html',
  styleUrls: ['./code-container.component.css'],
})
export class CodeContainerComponent implements OnInit {
  lines: Line[] = [];
  
  constructor(private codeService: CodeService) {}

  ngOnInit(): void {
    this.lines = this.codeService.lines;
  }

  /**
   * Get completed state to display congratulations message
   */
  get completed() {
    return this.codeService.complete
  }
}
