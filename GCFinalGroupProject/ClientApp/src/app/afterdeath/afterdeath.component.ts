import { Component } from '@angular/core';
import { Hero } from '../Hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-afterdeath',
    templateUrl: './afterdeath.component.html',
    styleUrls: ['./afterdeath.component.css']
})
/** afterdeath component*/
export class AfterdeathComponent {
    /** afterdeath ctor */

  newHero: Hero = {} as Hero;
  exists: boolean;
  Heros: Hero[] = [];
  int: number;
  str: number;
  sp: number;
  dur: number;
  pow: number;
  com: number;

  constructor(private heroService: HeroService) {

  }

  ngOnInit() {
    this.exists = true;
    setTimeout(() => { this.CheckHeroExists() }, 1000 * 1);
  }

  SetUpStats() {
  }


  CheckHeroExists(): boolean {
    return this.heroService.CheckHeroExists().subscribe((response: boolean) => {
      console.log(response);
      this.exists = response;
      if (this.exists == true) {
        this.heroService.GetInv().subscribe((response: any) => {
          console.log(response);
          this.heroService.getById(response.heroID).subscribe((resultHero: Hero) => {
            this.newHero = resultHero;
            console.log(this.newHero);
            this.int = parseInt(this.newHero.powerstats.intelligence);
            this.str = parseInt(this.newHero.powerstats.strength);
            this.sp = parseInt(this.newHero.powerstats.speed);
            this.dur = parseInt(this.newHero.powerstats.durability);
            this.pow = parseInt(this.newHero.powerstats.power);
            this.com = parseInt(this.newHero.powerstats.combat);

          });
        });
      }
    });
  }
}
