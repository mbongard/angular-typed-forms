import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label?: string;
  @Input() icon?: IconProp;
  @Input() disabled = false;
  @Input() type: 'default' | 'success' | 'danger' = 'default';
  @Input() rounded = false;
  @Input() iconPlacement: 'left' | 'right' = 'left';
  @Input() inverted = false;
  @Input() fullWidth = false;
  @Input() size: 'normal' | 'large' = 'normal';

  @Output() btnClick = new EventEmitter<MouseEvent>();
}
