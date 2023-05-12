import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssesementComponent } from './self-assesement.component';

describe('SelfAssesementComponent', () => {
  let component: SelfAssesementComponent;
  let fixture: ComponentFixture<SelfAssesementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfAssesementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfAssesementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
