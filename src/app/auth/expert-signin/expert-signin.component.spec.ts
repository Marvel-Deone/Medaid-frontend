import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertSigninComponent } from './expert-signin.component';

describe('ExpertSigninComponent', () => {
  let component: ExpertSigninComponent;
  let fixture: ComponentFixture<ExpertSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertSigninComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
