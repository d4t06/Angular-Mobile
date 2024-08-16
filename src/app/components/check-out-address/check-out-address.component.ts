import { Component } from '@angular/core';

@Component({
   selector: 'app-check-out-address',
   standalone: true,
   imports: [],
   templateUrl: './check-out-address.component.html',
   styles: ``,
})
export class CheckOutAddressComponent {
   classes = {
      formLabel: 'text-[16px] text-[#3f3f3f] font-[500]',
      input: 'p-[6px] font-[500] text-[#333] pl-[12px] bg-[#f1f1f1] w-full h-full rounded-xl placeholder:text-[#808080] outline-none border',
   };
}
