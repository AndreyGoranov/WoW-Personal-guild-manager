import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildAchivementsComponent } from './guild-achivements.component';

describe('GuildAchivementsComponent', () => {
  let component: GuildAchivementsComponent;
  let fixture: ComponentFixture<GuildAchivementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildAchivementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildAchivementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
