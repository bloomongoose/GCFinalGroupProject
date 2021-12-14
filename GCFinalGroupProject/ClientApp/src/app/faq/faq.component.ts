import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../Hero';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
/** FAQ component*/
export class FaqComponent {
  /** FAQ ctor */
  display: boolean = false;
  exampleHero: Hero = {} as Hero;
  constructor(private heroService: HeroService) {

  }

  toggleDisplay(): void {
    this.display = !this.display;
  }


  showHero(): void {
    this.heroService.getRandomHero().subscribe((hero: Hero) => {
      console.log(hero);
      if (hero.powerstats.intelligence == "null") {
        this.showHero();
      }
      else {
        this.exampleHero = hero;
        console.log(this.exampleHero);
      }
      console.log(hero);

    });


  }
}
