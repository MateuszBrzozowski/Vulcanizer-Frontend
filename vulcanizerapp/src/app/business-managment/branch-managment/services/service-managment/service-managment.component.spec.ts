import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceManagmentComponent } from './service-managment.component';

describe('ServiceManagmentComponent', () => {
  let component: ServiceManagmentComponent;
  let fixture: ComponentFixture<ServiceManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
