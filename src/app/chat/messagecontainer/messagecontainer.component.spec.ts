import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagecontainerComponent } from './messagecontainer.component';

describe('MessagecontainerComponent', () => {
  let component: MessagecontainerComponent;
  let fixture: ComponentFixture<MessagecontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagecontainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagecontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
