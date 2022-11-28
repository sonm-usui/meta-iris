import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToSignComponent } from './text-to-sign.component';

describe('TextToSignComponent', () => {
  let component: TextToSignComponent;
  let fixture: ComponentFixture<TextToSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextToSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextToSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
