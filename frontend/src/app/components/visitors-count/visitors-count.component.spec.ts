import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsCountComponent } from './visitors-count.component';

describe('VisitorsCountComponent', () => {
  let component: VisitorsCountComponent;
  let fixture: ComponentFixture<VisitorsCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorsCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
