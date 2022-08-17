import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandRemoveComponent } from './stand-remove.component';

describe('StandRemoveComponent', () => {
  let component: StandRemoveComponent;
  let fixture: ComponentFixture<StandRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
