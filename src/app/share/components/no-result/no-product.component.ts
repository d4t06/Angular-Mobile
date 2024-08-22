import { Component } from '@angular/core';

// import simonCat from '@/assets/idontknow.png';

@Component({
   standalone: true,
   selector: 'app-no-result',
   template: `
      <div class="my-8">
         <img
            class="mx-auto"
            src="https://d4t06.github.io/Vue-Mobile/assets/search-empty-ChRLxitn.png"
            alt="" />
         <p class="mt-3 text-center font-medium">No result found, ¯_(ツ)_/¯</p>
      </div>
   `,
})
export class NoResultComponent {
}
