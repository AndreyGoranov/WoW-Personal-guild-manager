import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildTableComponent } from './guild-table.component';

describe('GuildTableComponent', () => {
  let component: GuildTableComponent;
  let fixture: ComponentFixture<GuildTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
