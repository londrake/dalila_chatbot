import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPanelComponent } from './carousel-panel.component';

describe('CarouselPanelComponent', () => {
  let component: CarouselPanelComponent;
  let fixture: ComponentFixture<CarouselPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
