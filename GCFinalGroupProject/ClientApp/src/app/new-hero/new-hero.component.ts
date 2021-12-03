import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../Hero';

@Component({
    selector: 'app-new-hero',
    templateUrl: './new-hero.component.html',
    styleUrls: ['./new-hero.component.css']
})
/** NewHero component*/
export class NewHeroComponent {
  /** NewHero ctor */

  newHero: Hero = {} as Hero;

    constructor(private heroService: HeroService) {
     
  }

  ngOnInit() {
    this.getHero();
 
  }

  

  getHero(): void {
    this.heroService.getRandomHero().subscribe((hero: Hero) => {
      console.log(hero);
      this.newHero = hero;
     
     
    });
    this.heroService.NewAccount(this.newHero.id);
    
  }
}
