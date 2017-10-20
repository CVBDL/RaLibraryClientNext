import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserToolbarComponent } from './user-toolbar.component';

describe('UserToolbarComponent', () => {
  let component: UserToolbarComponent;
  let fixture: ComponentFixture<UserToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
