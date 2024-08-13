import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushFrameComponent } from './push-frame.component';

describe('PushFrameComponent', () => {
  let component: PushFrameComponent;
  let fixture: ComponentFixture<PushFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PushFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
