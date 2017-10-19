import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowBookDetailComponent } from './borrow-book-detail.component';

describe('BorrowBookDetailComponent', () => {
  let component: BorrowBookDetailComponent;
  let fixture: ComponentFixture<BorrowBookDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowBookDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowBookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
