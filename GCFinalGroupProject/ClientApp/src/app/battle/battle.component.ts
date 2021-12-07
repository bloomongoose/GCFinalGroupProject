import { Hero } from '../Hero';
import { HeroService } from '../hero.service';
import { ItemShopService } from '../item-shop.service';
import { UserInventory } from '../UserInventory';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
/** Battle component*/
export class BattleComponent {
  /** Battle ctor */
  villain: Hero = {} as Hero;
  playerInv: UserInventory = {} as UserInventory;
  playerHero: Hero = {} as Hero;
  itemOne: string;
  itemTwo: string;
  HP: number;
  Damage: number;
  villainHP: number;
  villainDmg: number;
 
  constructor(private heroService: HeroService, private itemService: ItemShopService) {

  }

  //figure out await timing with generating after death hero. 
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getItemDetails() {
    if (this.playerInv.itemOne == 1) {
      this.itemOne = "Health Kit";
    }
    else if (this.playerInv.itemOne == 2) {
      this.itemOne = "Attack Kit";
    }

    if (this.playerInv.itemTwo == 1) {
      this.itemTwo = "Health Kit";
    }
    else if (this.playerInv.itemTwo == 2) {
      this.itemTwo = "Attack Kit";
    }
  }

  ngOnInit() {
    this.heroService.getRandomHero().subscribe((villain: any) => {
      if (villain.powerstats.intelligence != "null") {
        this.villain = villain;
        this.SetupBattlePage();
      }
      else
      {
        this.ngOnInit();
      }
    });
  }

  //speed stat determines who goes first. if the next attack kills the enemy, dont allow enemy to attack back. 
  Fight() {
    if (this.villain.powerstats.speed < this.playerHero.powerstats.speed) {
      this.villainHP -= this.Damage;
      if (this.villainHP > 0) {
        this.HP -= this.villainDmg;
      }
    }
    else {
      this.HP -= this.villainDmg;
      if (this.HP > 0) {
        this.villainHP -= this.Damage;
      }
    }
    
  }

  //newhero after death method. 
  AfterDeath(currentInv: UserInventory) {
    this.heroService.getRandomHero().subscribe((hero: Hero) => {
      console.log(hero);   
      if (hero.powerstats.intelligence != "null") {
        this.playerInv =
        {      
          heroID: hero.id,        
          itemOne: currentInv.itemOne,
          itemTwo: currentInv.itemTwo,
          money: currentInv.money,         
        };
      }
      else {
        this.AfterDeath(currentInv);
      }
      this.heroService.AfterDeath(this.playerInv.heroID).subscribe((response: any) => {
        console.log(response);
      });
      console.log(this.playerInv);
    });
 
  }

  getHeroStats() {
    this.Damage = (
      (parseInt((this.playerHero.powerstats.strength)) * 1.3)
      + (parseInt((this.playerHero.powerstats.power)) * 1.5)
      + (parseInt(this.playerHero.powerstats.combat))
    );
    this.HP = (
      (parseInt((this.playerHero.powerstats.durability)) * 5)
      + ((parseInt((this.playerHero.powerstats.speed)) / 20) * 10)
      + ((parseInt((this.playerHero.powerstats.intelligence)) / 20) * 10)
    );
  }
  getVillainStats() {
    this.villainDmg = (
      (parseInt((this.villain.powerstats.strength)) * 1.3)
      + (parseInt((this.villain.powerstats.power)) * 1.5)
      + (parseInt(this.villain.powerstats.combat))
    );
    this.villainHP = (
      (parseInt((this.villain.powerstats.durability)) * 5)
      + ((parseInt((this.villain.powerstats.speed)) / 20) * 10)
      + ((parseInt((this.villain.powerstats.intelligence)) / 20) * 10)
    );
  }

  SetupBattlePage() {
    this.heroService.GetInv().subscribe((inv: any) => {
      console.log(inv);
      this.playerInv = inv;
      this.heroService.getById(`${this.playerInv.heroID}`).subscribe((hero: any) => {
        this.playerHero = hero;
        console.log(hero);
        this.getItemDetails();
        this.getHeroStats();
        this.getVillainStats();
      });
    });
  }
}
