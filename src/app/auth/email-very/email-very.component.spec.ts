import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVeryComponent } from './email-very.component';

describe('EmailVeryComponent', () => {
  let component: EmailVeryComponent;
  let fixture: ComponentFixture<EmailVeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVeryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailVeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
