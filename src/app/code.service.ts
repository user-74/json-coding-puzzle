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
  private solution: Line[];
  private start: Line[];

  constructor() {
    this.start = start.lines;
    this.solution = solution.lines;
    this.lines = Array(this.start.length).fill(null);
    this.resetSolution();
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
      JSON.stringify(
        this.lines.filter((line: Line) => line.tokens.length > 0)
      ) == JSON.stringify(this.solution);
  }

  /**
   * Display solution
   */
  displaySolution(): void {
    this._updateSolution(this.solution);
  }

  resetSolution(): void {
    this.start = JSON.parse(JSON.stringify(start.lines));
    this._updateSolution(this.start);
  }

  _updateSolution(solution: Line[]): void {
    for (let i = 0; i < solution.length; i++) {
      if (!this.lines[i]) {
        const newLine = { indentations: 0, tokens: [] };
        this.lines[i] = newLine;
      }

      this.lines[i].indentations = solution[i].indentations;

      for (let j = 0; j < this.lines[i].tokens.length; j++) {
        this.lines[i].tokens.splice(j--, 1);
      }

      solution[i].tokens.forEach((token) => {
        this.lines[i].tokens.push(token);
      });
    }

    this.lines.splice(solution.length, this.lines.length - solution.length);
    this.checkSolution();
  }
}
