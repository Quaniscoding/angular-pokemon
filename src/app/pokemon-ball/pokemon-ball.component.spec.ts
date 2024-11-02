import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBallComponent } from './pokemon-ball.component';

describe('PokemonBallComponent', () => {
  let component: PokemonBallComponent;
  let fixture: ComponentFixture<PokemonBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonBallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
