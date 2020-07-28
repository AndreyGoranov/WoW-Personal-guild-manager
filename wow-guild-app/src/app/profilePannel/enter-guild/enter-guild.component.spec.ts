import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterGuildComponent } from './enter-guild.component';

describe('EnterGuildComponent', () => {
  let component: EnterGuildComponent;
  let fixture: ComponentFixture<EnterGuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterGuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterGuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
