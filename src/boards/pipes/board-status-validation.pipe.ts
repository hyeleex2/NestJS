import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value}는 status options 아님여`);
    }
    return value;
  }

  private isStatusValid(stats: any) {
    const index = this.StatusOptions.indexOf(stats);
    return index !== -1;
  }
}
