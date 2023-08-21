import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayautComponentComponent } from './layaut-component.component';

describe('LayautComponentComponent', () => {
  let component: LayautComponentComponent;
  let fixture: ComponentFixture<LayautComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayautComponentComponent]
    });
    fixture = TestBed.createComponent(LayautComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
