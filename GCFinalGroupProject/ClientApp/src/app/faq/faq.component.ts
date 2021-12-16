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

  int: number;
  str: number;
  sp: number;
  dur: number;
  pow: number;
  com: number;


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
        this.int = parseInt(this.exampleHero.powerstats.intelligence);
        this.str = parseInt(this.exampleHero.powerstats.strength);
        console.log(this.int);
        console.log(this.exampleHero);
      }
      console.log(hero);
      this.int = parseInt(this.exampleHero.powerstats.intelligence);
      this.str = parseInt(this.exampleHero.powerstats.strength);
      this.sp = parseInt(this.exampleHero.powerstats.speed);
      this.dur = parseInt(this.exampleHero.powerstats.durability);
      this.pow = parseInt(this.exampleHero.powerstats.power);
      this.com  = parseInt(this.exampleHero.powerstats.combat);

    });


  }
}
