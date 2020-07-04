import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceSceneComponent } from './entrance-scene.component';

describe('EntranceSceneComponent', () => {
  let component: EntranceSceneComponent;
  let fixture: ComponentFixture<EntranceSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntranceSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
