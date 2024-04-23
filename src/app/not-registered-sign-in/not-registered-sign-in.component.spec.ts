import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotRegisteredSignInComponent } from './not-registered-sign-in.component';

describe('NotRegisteredSignInComponent', () => {
  let component: NotRegisteredSignInComponent;
  let fixture: ComponentFixture<NotRegisteredSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotRegisteredSignInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotRegisteredSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
