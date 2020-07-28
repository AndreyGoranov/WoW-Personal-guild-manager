import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildCalendarComponent } from './guild-calendar.component';

describe('GuildCalendarComponent', () => {
  let component: GuildCalendarComponent;
  let fixture: ComponentFixture<GuildCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
