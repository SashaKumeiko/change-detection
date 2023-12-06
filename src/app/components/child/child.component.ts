import {ChangeDetectionStrategy, Component, ElementRef, inject, NgZone} from '@angular/core';
import {ClickService} from "../../services/click.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  private element = inject(ElementRef);
  private zone = inject(NgZone);
  constructor(public clickService:ClickService) {
  }


  blink() {
    // Dirty Hack used to visualize the change detector
    this.element.nativeElement.firstChild.style.backgroundColor = 'gray';

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = 'white';
      }, 1000);
    });

    return null;
  }
}
