import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteuploadComponent } from './quoteupload.component';

describe('QuoteuploadComponent', () => {
  let component: QuoteuploadComponent;
  let fixture: ComponentFixture<QuoteuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteuploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
