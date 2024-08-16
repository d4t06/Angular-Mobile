import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { SliderService } from './slider.service';

const classes = {
   container:
      'absolute inset-0 rounded-[14px] whitespace-nowrap overflow-hidden shadow-[2px_4px_16px_rgba(0,0,0,.15)]',
   button:
      '!absolute top-[50%] translate-y-[-50%] flex items-center justify-center bg-white rounded-[99px] shadow-[1px_2px_8px_rgba(0,0,0,.15)] text-[#999]  z-[1] transition-transform hover:scale-[1.05] hover:text-[#333] h-[32px] md:h-[40px] w-[32px] md:w-[40px]',
   leftArrow: 'left-[16px]',
   rightArrow: 'right-[16px]',
   sliderItem: 'inline-block h-full w-full',
   sliderIndex:
      'absolute text-white space-x-[2px] text-[12px] bottom-[8px] left-[16px] flex px-[10px] rounded-[99px] bg-black/40',
};

@Component({
   selector: 'app-slider',
   standalone: true,
   imports: [],
   templateUrl: './slider.component.html',
   providers: [SliderService],
})
export class SliderComponent {
   @Input({ required: true }) sliderImages: SliderImage[];
   @Input() className: string = '';

   @ViewChild('slider', { static: true }) sliderRef: ElementRef;

   sliderService = inject(SliderService);

   ngOnInit() {
      const sliderEle = this.sliderRef.nativeElement;
      const length = this.sliderImages.length;

      this.sliderService.sliderLength = length;
      this.sliderService.sliderEle = sliderEle;

      this.sliderService.init();
   }

   ngDoCheck() {
      this.sliderService.updateSliderEle();
   }

   classes = classes;
}
