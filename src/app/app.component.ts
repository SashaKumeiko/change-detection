import {ChangeDetectionStrategy, Component, ElementRef, inject, NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ClickService} from "./services/click.service";
import {WrapperComponent} from "./components/wrapper/wrapper.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  name = "init"
  private element = inject(ElementRef);
  private zone = inject(NgZone);
  clickService = inject(ClickService)
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

  setName() {
    this.name = "new";
  }
}
