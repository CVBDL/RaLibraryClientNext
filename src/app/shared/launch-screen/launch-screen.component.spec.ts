import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchScreenComponent } from './launch-screen.component';

describe('LaunchScreenComponent', () => {
  let component: LaunchScreenComponent;
  let fixture: ComponentFixture<LaunchScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
