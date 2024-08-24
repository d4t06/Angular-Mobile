import { Component, Input } from '@angular/core';

@Component({
   standalone: true,
   selector: 'app-no-result',
   template: `
      <div class="my-8">
         <img
            class="mx-auto"
            src="https://d4t06.github.io/Vue-Mobile/assets/search-empty-ChRLxitn.png"
            alt="" />

         <!-- <span style="display:none;" #tempChildren>
               <ng-content></ng-content>
             </span> -->

         <p class="mt-3 text-center font-medium">
            {{ desc || 'No result found, ¯_(ツ)_/¯' }}
         </p>
      </div>
   `,
})
export class NoResultComponent {
   @Input() desc: string = '';

   // public myText: string;
   // @ViewChild("tempChildren")
   // public tempChildren: ElementRef;

   // public ngAfterContentChecked() {
   //    const newText =
   //    this.contentWrapper.nativeElement.innerHTML;
   //    if (newText !== this.myText){
   //      this.myText = newText;
   //      // do some extra stuff with the text you got
   //    }
   //  }
}
