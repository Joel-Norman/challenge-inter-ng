import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardproductoComponent } from './cardproducto.component';

describe('CardproductoComponent', () => {
  let component: CardproductoComponent;
  let fixture: ComponentFixture<CardproductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardproductoComponent]
    });
    fixture = TestBed.createComponent(CardproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
