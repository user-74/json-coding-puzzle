import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { Line } from '../models/line';
import { Token, TokenType } from '../models/token';

@Component({
  selector: 'app-code-line',
  templateUrl: './code-line.component.html',
  styleUrls: ['./code-line.component.css'],
})
export class CodeLineComponent implements OnInit {
  @Input() line: Line;

  constructor(private codeService: CodeService) {}

  ngOnInit(): void {
    this.line.tokens.forEach((token) => this.processInputs(token));
  }

  /**
   * Returns the correct color for a string
   * @param token token object which color should be determined
   * @returns a css valid color string
   */
  getColor(token: Token): string {
    switch (token.type) {
      case TokenType.NUM:
        return 'green';
      case TokenType.OP:
        return '';
      case TokenType.KEY:
        return '#ff0783';
      case TokenType.FUNC:
        if (token.text.match('{input}')) {
          return 'green';
        } else {
          return 'blue';
        }
      default:
        return '';
    }
  }

  /**
   * Fires when an element is dropped, calculating its movements
   * Also indents or dedents if its location does not change
   * but has traveled a great enough distance
   * @param event a drag and drop event
   */
  drop(event: CdkDragDrop<Token[]>): void {
    event.item;

    if (
      event.previousContainer === event.container &&
      event.previousIndex === event.currentIndex
    ) {
      if (event.distance.x > 20) {
        this.line.indentations = this.line.indentations + 1;
      } else if (event.distance.x < -20) {
        const dedents = Math.floor(event.distance.x / 24);
        this.line.indentations = Math.max(0, this.line.indentations + dedents);
      }
    }
    this.codeService.drop(event);
  }

  /**
   * Splits a string on any input fields
   * @param token token text input from a JSON
   * @returns an array of strings split on any inputs
   */
  processInputs(token: Token): string[] {
    const split = token.text.split('{input}');
    if ((split.length > 1 && !token.value) || token.value === []) {
      token.value = Array(split.length - 1).fill('');
    }
    return split;
  }

  /**
   * Check the solution upon an input updating
   */
  checkSol(): void {
    this.codeService.checkSolution();
  }

  /**
   * Get completed state to disable inputs and buttons
   */
  get completed() {
    return this.codeService.complete
  }
}
