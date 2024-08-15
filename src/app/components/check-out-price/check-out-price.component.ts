import { MoneyPipe } from "@/app/pipes/money.pipe";
import { Component } from "@angular/core";
import { ButtonComponent } from "../../share/components/button/button.component";


@Component({
   standalone: true,
   selector: 'app-check-out-price',
   templateUrl: './check-out-price.component.html',
   imports: [MoneyPipe, ButtonComponent]
   
})

export class CheckOutPriceComponent {



   classes = {
      h5: "text-[14px] md:text-[16px] text-[#3f3f3f] font-[500]",
   }
}