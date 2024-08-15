import { Component } from '@angular/core';
import { HeaderComponent } from '../_components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-check-out-layout',
  template: `
    <div class="bg-white">
      <app-header />

      <div
        class="container lg:max-w-[800px] mx-auto pb-[200px] mt-[110px] md:pb-[160px] md:mt-[20px]"
      >
        <router-outlet />
      </div>
    </div>
  `,
  imports: [HeaderComponent, RouterOutlet],
})
export class CheckOutLayoutComponent {}
