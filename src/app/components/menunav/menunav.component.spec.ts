import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenunavComponent } from './menunav.component';

describe('MenunavComponent', () => {
  let component: MenunavComponent;
  let fixture: ComponentFixture<MenunavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenunavComponent]
    });
    fixture = TestBed.createComponent(MenunavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
