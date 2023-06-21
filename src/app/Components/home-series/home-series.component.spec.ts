import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSeriesComponent } from './home-series.component';

describe('HomeSeriesComponent', () => {
  let component: HomeSeriesComponent;
  let fixture: ComponentFixture<HomeSeriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSeriesComponent]
    });
    fixture = TestBed.createComponent(HomeSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
