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
  exists: boolean;
  Heros: Hero[]=[];

  constructor(private heroService: HeroService) {

  }

  ngOnInit() {
    this.exists = true;  
    setTimeout(() => { this.CheckHeroExists() }, 1000 * 1);
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
          });
        });
      }
    });
  }
  NewAccount(hero: Hero): void {


    let userInv: UserInventory = {
      heroID: hero.id,
      itemOne: 0,
      itemTwo: 0,
      money: 300,
      consecutiveWins: 0
    };

    this.heroService.newAccount(userInv).subscribe((response: any) => {
      console.log(response);

    });
  }

  SelectHero(i: number) {
    let h: Hero = {} as Hero;
    h = this.Heros[i];
    this.NewAccount(h);
  }


  getHero(): void {
    this.exists = true;
    this.heroService.getRandomHero().subscribe((hero: Hero) => {
      console.log(hero);


      if (hero.powerstats.intelligence == "null") {
        this.getHero();
      }


      else if (this.Heros.length < 3) {
        this.newHero = hero;
       
        this.Heros.push(this.newHero);
        console.log(this.newHero);
        this.getHero();
      }
      console.log(hero);
      console.log(this.Heros);

    });


  }
}
