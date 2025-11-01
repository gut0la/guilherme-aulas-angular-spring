import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraDetalhesComponent } from './obra-detalhes.component';

describe('ObraDetalhesComponent', () => {
  let component: ObraDetalhesComponent;
  let fixture: ComponentFixture<ObraDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObraDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObraDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
