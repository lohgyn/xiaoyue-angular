import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanguokushiComponent } from './sanguokushi.component';

describe('SanguokushiComponent', () => {
  let component: SanguokushiComponent;
  let fixture: ComponentFixture<SanguokushiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanguokushiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanguokushiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
