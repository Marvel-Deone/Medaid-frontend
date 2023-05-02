import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeertopeerDialogueComponent } from './peertopeer-dialogue.component';

describe('PeertopeerDialogueComponent', () => {
  let component: PeertopeerDialogueComponent;
  let fixture: ComponentFixture<PeertopeerDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeertopeerDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeertopeerDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
