import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { Token } from '../models/token';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-empty-line',
  templateUrl: './empty-line.component.html',
  styleUrls: ['./empty-line.component.css'],
})
export class EmptyLineComponent implements OnInit {
  list: Token[] = [];

  constructor(private codeService: CodeService) {}

  ngOnInit(): void {}

  /**
   * If an element is dragged into this line, create a new line, add the element,
   * and remove it from the old line.
   * @param event drag and drop event
   */
  drop(event: CdkDragDrop<Token[]>) {
    this.codeService.lines.push({
      indentations: 0,
      tokens: event.previousContainer.data.splice(event.previousIndex, 1),
    });
  }
}
