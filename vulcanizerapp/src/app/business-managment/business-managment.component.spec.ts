import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessManagmentComponent } from './business-managment.component';

describe('BusinessManagmentComponent', () => {
  let component: BusinessManagmentComponent;
  let fixture: ComponentFixture<BusinessManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
