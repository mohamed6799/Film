import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMoviesComponent } from './home-movies.component';

describe('HomeMoviesComponent', () => {
  let component: HomeMoviesComponent;
  let fixture: ComponentFixture<HomeMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMoviesComponent]
    });
    fixture = TestBed.createComponent(HomeMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
