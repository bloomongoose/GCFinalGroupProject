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
  Heros: Hero[] = [];
  heroOneInt: number;
  heroOneStr: number;
  heroOneSp: number;
  heroOneDur: number;
  heroOnePow: number;
  heroOneCom: number;

  heroTwoInt: number;
  heroTwoStr: number;
  heroTwoSp: number;
  heroTwoDur: number;
  heroTwoPow: number;
  heroTwoCom: number;

  heroThreeInt: number;
  heroThreeStr: number;
  heroThreeSp: number;
  heroThreeDur: number;
  heroThreePow: number;
  heroThreeCom: number;

  heroStats: number[] = [];

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


  //creates a new account

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

  //gets a hero from the array.
  SelectHero(i: number) {
    let h: Hero = {} as Hero;
    h = this.Heros[i];
    this.NewAccount(h);
  }


  ProgressBarArrayFill() {
    this.heroOneInt = parseInt(this.Heros[0].powerstats.intelligence);
    this.heroOneStr = parseInt(this.Heros[0].powerstats.strength);
    this.heroOneSp = parseInt(this.Heros[0].powerstats.speed);
    this.heroOneDur = parseInt(this.Heros[0].powerstats.durability);
    this.heroOnePow = parseInt(this.Heros[0].powerstats.power);
    this.heroOneCom = parseInt(this.Heros[0].powerstats.combat);

    this.heroTwoInt = parseInt(this.Heros[1].powerstats.intelligence);
    this.heroTwoStr = parseInt(this.Heros[1].powerstats.strength);
    this.heroTwoSp = parseInt(this.Heros[1].powerstats.speed);
    this.heroTwoDur = parseInt(this.Heros[1].powerstats.durability);
    this.heroTwoPow = parseInt(this.Heros[1].powerstats.power);
    this.heroTwoCom = parseInt(this.Heros[1].powerstats.combat);

    this.heroThreeInt = parseInt(this.Heros[2].powerstats.intelligence);
    this.heroThreeStr = parseInt(this.Heros[2].powerstats.strength);
    this.heroThreeSp = parseInt(this.Heros[2].powerstats.speed);
    this.heroThreeDur = parseInt(this.Heros[2].powerstats.durability);
    this.heroThreePow = parseInt(this.Heros[2].powerstats.power);
    this.heroThreeCom = parseInt(this.Heros[2].powerstats.combat);

    this.heroStats.push(this.heroOneInt);
    this.heroStats.push(this.heroOneStr);
    this.heroStats.push(this.heroOneSp);
    this.heroStats.push(this.heroOneDur);
    this.heroStats.push(this.heroOnePow);
    this.heroStats.push(this.heroOneCom);

    this.heroStats.push(this.heroTwoInt);
    this.heroStats.push(this.heroTwoStr);
    this.heroStats.push(this.heroTwoSp);
    this.heroStats.push(this.heroTwoDur);
    this.heroStats.push(this.heroTwoPow);
    this.heroStats.push(this.heroTwoCom);

    this.heroStats.push(this.heroThreeInt);
    this.heroStats.push(this.heroThreeStr);
    this.heroStats.push(this.heroThreeSp);
    this.heroStats.push(this.heroThreeDur);
    this.heroStats.push(this.heroThreePow);
    this.heroStats.push(this.heroThreeCom);
  }


  //gives the player a new hero if they die or gives a choice of 3 heroes if it their first time playing.

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
      this.ProgressBarArrayFill();

      
     

    });


  }
}
