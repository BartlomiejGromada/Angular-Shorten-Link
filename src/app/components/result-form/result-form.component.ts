import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ShortURL } from 'src/app/models/short-url';

@Component({
  selector: 'app-result-form',
  templateUrl: './result-form.component.html',
  styleUrls: ['./result-form.component.css'],
})
export class ResultFormComponent {
  constructor(private clipboardService: ClipboardService) {}

  @Input() shortURL: Partial<ShortURL> = {};
  copied: boolean = false;

  copyText(): void {
    if (this.shortURL.link !== undefined && this.copied !== true) {
      this.clipboardService.copy(this.shortURL.link);
      this.copied = true;
    }
    setTimeout(() => {
      this.copied = false;
    }, 3000);
  }
}
