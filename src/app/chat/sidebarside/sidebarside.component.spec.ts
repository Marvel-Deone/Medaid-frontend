import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarsideComponent } from './sidebarside.component';

describe('SidebarsideComponent', () => {
  let component: SidebarsideComponent;
  let fixture: ComponentFixture<SidebarsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarsideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
