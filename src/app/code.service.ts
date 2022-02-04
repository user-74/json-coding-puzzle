import { Injectable } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Token } from './models/token';
import * as start from '../assets/start.json';
import * as solution from '../assets/solution.json';
import { Line } from './models/line';

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  public lines: Line[];
  public complete: boolean = false;

  constructor() {
    this.lines = start.lines;
  }

  /**
   * Moves the element to the correct line and index it was dropped to
   * @param event drag and drop event
   */
  public drop(event: CdkDragDrop<Token[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.checkSolution();
  }

  /**
   * Check if the current solution matches the provided solution
   */
  public checkSolution(): void {
    this.complete =
      JSON.stringify(this.lines.filter((line) => line.tokens.length > 0)) ==
      JSON.stringify(solution.lines);
  }
}
