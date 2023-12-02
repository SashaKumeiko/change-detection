import {ChangeDetectionStrategy, Component, ElementRef, inject, NgZone} from '@angular/core';
import {ClickService} from "../../services/click.service";
import {ChildComponent} from "../child/child.component";

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [
    ChildComponent
  ],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent {
  private element = inject(ElementRef);
  private zone = inject(NgZone);
  constructor(public clickService:ClickService) {
  }


  blink() {
    // Dirty Hack used to visualize the change detector
    this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = 'white';
      }, 1000);
    });

    return null;
  }
}
