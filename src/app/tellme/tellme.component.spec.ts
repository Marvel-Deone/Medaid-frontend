import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TellmeComponent } from './tellme.component';

describe('TellmeComponent', () => {
  let component: TellmeComponent;
  let fixture: ComponentFixture<TellmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TellmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TellmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
