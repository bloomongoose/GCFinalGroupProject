import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../Hero';
import { UserInventory } from '../UserInventory';

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


  NewAccount(hero:Hero): void {
    
    let userInv: UserInventory = {
      HeroID: hero.id,
      ItemOne: 0,
      ItemTwo: 0,
      Money: 300,
  };

    this.heroService.newAccount(userInv).subscribe((response: any) => {
      console.log(response);
  });
  }
  

  getHero(): void {
    this.heroService.getRandomHero().subscribe((hero: Hero) => {
      console.log(hero);
      this.newHero = hero;
      this.NewAccount(hero);
    });
   
  }
}
