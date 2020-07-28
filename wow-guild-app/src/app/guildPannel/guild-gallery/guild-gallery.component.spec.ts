import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildGalleryComponent } from './guild-gallery.component';

describe('GuildGalleryComponent', () => {
  let component: GuildGalleryComponent;
  let fixture: ComponentFixture<GuildGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
