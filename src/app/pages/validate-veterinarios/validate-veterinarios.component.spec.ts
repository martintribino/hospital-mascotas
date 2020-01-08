import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateVeterinariosComponent } from './validate-veterinarios.component';

describe('ValidateVeterinariosComponent', () => {
  let component: ValidateVeterinariosComponent;
  let fixture: ComponentFixture<ValidateVeterinariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateVeterinariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateVeterinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
