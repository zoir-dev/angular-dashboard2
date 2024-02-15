import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeImageComponent } from './custome-image.component';

describe('CustomeImageComponent', () => {
  let component: CustomeImageComponent;
  let fixture: ComponentFixture<CustomeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
