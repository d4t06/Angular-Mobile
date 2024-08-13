import {

  Component,

} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-modal',
  template: `
    <div class="container" #container>
      <p>this is modal component</p>
      <ng-content />
    </div>
  `,
  providers: [Document],
})
export class ModalComponent {
}
