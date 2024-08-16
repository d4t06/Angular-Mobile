import { Injectable } from '@angular/core';

@Injectable()
export class SliderService {
  curIndex = 1;
  sliderLength = 0;
  sliderWidth = 0;
  maxScroll = 0;

  sliderEle: HTMLDivElement;

  init() {
    if (!this.sliderEle || !this.sliderLength) return;

    const width = Math.ceil(this.sliderEle.clientWidth);

    this.sliderWidth = width;
    this.maxScroll = width * this.sliderLength;
  }

  updateSliderEle() {
    if (!this.sliderEle) return;

    const needToScroll = (this.curIndex - 1) * this.sliderWidth;
    this.sliderEle.scrollLeft = needToScroll;
  }

  checkIsScrollFinish = () => {
    const sliderEle = this.sliderEle;
    if (!sliderEle) return;

    const expectScroll = (this.curIndex - 1) * this.sliderWidth;
    const diff = Math.ceil(sliderEle.scrollLeft) - Math.ceil(expectScroll);

    return !(Math.abs(diff) > 1);
  };

  next = () => {
    const sliderEle = this.sliderEle;

    if (!sliderEle || !this.sliderLength) return;

    sliderEle.style.scrollBehavior = 'smooth';
    const isFinish = this.checkIsScrollFinish();

    if (isFinish) {
      const isLast = this.curIndex === this.sliderLength;

      if (isLast) this.curIndex = 1;
      else this.curIndex++;
    }
  };

  previous = () => {
    const sliderEle = this.sliderEle;
    if (!sliderEle || !this.sliderLength) return;

    sliderEle.style.scrollBehavior = 'smooth';
    const isFinish = this.checkIsScrollFinish();

    if (isFinish) {
      const isHead = this.curIndex === 1;

      if (isHead) this.curIndex = this.sliderLength;
      else this.curIndex--;
    }
  };
}
