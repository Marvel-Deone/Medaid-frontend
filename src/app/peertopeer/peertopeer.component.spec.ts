import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeertopeerComponent } from './peertopeer.component';

describe('PeertopeerComponent', () => {
  let component: PeertopeerComponent;
  let fixture: ComponentFixture<PeertopeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeertopeerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeertopeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
