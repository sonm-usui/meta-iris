import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignToTextComponent } from './sign-to-text.component';

describe('SignToTextComponent', () => {
  let component: SignToTextComponent;
  let fixture: ComponentFixture<SignToTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignToTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignToTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
