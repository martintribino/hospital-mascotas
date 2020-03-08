import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenMascotaComponent } from './imagen-mascota.component';

describe('ImagenMascotaComponent', () => {
  let component: ImagenMascotaComponent;
  let fixture: ComponentFixture<ImagenMascotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenMascotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
