import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DebounceClickDirective } from './debounce/debounce-click.directive';
import { DebounceKeyupDirective } from './debounce/debounce-keyup.directive';
import { DecimalFormatterDirective } from './number/decimal-number-formatter.directive';
import { NumberFormatterDirective } from './number/number-formatter.directive';
import { NumbersCharacterBasicDirective } from './number/numbers-character-basic.directive';
import { NumbersOnlyDirective } from './number/numbers-only.directive';
import { ClickOutsideDirective } from './orther/click-outside.directive';
import { CurrencyFormatterDirective } from './orther/currency.directive';
import { RemoveOptionTitleDirective } from './orther/remove-option-title.directive';
import {TrimDirective} from '@shared/directive/orther/trim.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
  ],
  exports: [
  ],
})
export class DirectiveModule {}
