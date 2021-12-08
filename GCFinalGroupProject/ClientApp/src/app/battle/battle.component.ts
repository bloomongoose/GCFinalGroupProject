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
  itemOneUsed: boolean;
  itemTwoUsed: boolean;
  creditsCollected: boolean;
  consecutiveWins: number = parseInt(document.cookie.split(";")[1].substring(1)); //since this login instance.
  earnings: number = 100;
  checkItem: number = 0;

  constructor(private heroService: HeroService, private itemService: ItemShopService) {

  }

  getItemDetails() {
    if (this.playerInv.itemOne == 1) {
      this.itemOne = "Health Kit";
    }
    else if (this.playerInv.itemOne == 2) {
      this.itemOne = "Attack Kit";
    }
    else if (this.playerInv.itemOne == 3) {
      this.itemOne = "Super Health Kit";
    }
    else if (this.playerInv.itemOne == 4) {
      this.itemOne = "Super Attack Kit";
    }
    else if (this.playerInv.itemOne == 5) {
      this.itemOne = "Speed Kit";
    }
    else if (this.playerInv.itemOne == 6) {
      this.itemOne = "Reflection Potion";
    }

    if (this.playerInv.itemTwo == 1) {
      this.itemTwo = "Health Kit";
    }
    else if (this.playerInv.itemTwo == 2) {
      this.itemTwo = "Attack Kit";
    }
    else if (this.playerInv.itemTwo == 3) {
      this.itemTwo = "Super Health Kit";
    }
    else if (this.playerInv.itemTwo == 4) {
      this.itemTwo = "Super Attack Kit";
    }
    else if (this.playerInv.itemTwo == 5) {
      this.itemTwo = "Speed Kit";
    }
    else if (this.playerInv.itemTwo == 6) {
      this.itemTwo = "Reflection Potion";
    }
  }

  ngOnInit() {
    this.heroService.getRandomHero().subscribe((villain: any) => {
      if (villain.powerstats.intelligence != "null") {
        this.villain = villain;
        this.SetupBattlePage();
      }
      else {
        this.ngOnInit();
      }
      this.earnings = 100;
      this.earnings += ((this.consecutiveWins) * 10)
    });
  }

  UseItemOne(item: number) {
    if (item == 1) {
      this.HP += 50;
      this.itemOneUsed = true;
    }
    if (item == 2) {
      this.Damage += 50;
      this.itemOneUsed = true;
    }
    if (item == 3) {
      this.HP += 100;
      this.itemOneUsed = true;
    }
    if (item == 4) {
      this.Damage += 100;
      this.itemOneUsed = true;
    }
    if (item == 5) {
      this.playerHero.powerstats.speed += 80;
      this.itemOneUsed = true;
    }
    //0 damage, returns X% VillainDMG back to them. Reflect. 
    if (item == 6) {
      this.checkItem = 6;
      this.itemOneUsed = true;
    }
    this.EmptyItem(1);
  }
  UseItemTwo(item: number) {
    if (item == 1) {
      this.HP += 50;
      this.itemTwoUsed = true;
    }
    if (item == 2) {
      this.Damage += 50;
      this.itemTwoUsed = true;
    }
    if (item == 3) {
      this.HP += 100;
      this.itemTwoUsed = true;
    }
    if (item == 4) {
      this.Damage += 100;
      this.itemTwoUsed = true;
    }
    if (item == 5) {
      this.playerHero.powerstats.speed += 80;
      this.itemTwoUsed = true;
    }
    if (item == 6) {
      this.checkItem = 6;
      this.itemTwoUsed = true;
    }
    this.EmptyItem(2);
  }

  EmptyItem(slot: number) {
    this.itemService.EmptySlot(slot).subscribe((response: any) => {
      console.log(response);
      this.playerInv = response;
    });
  }

  Run() {
    this.consecutiveWins = 0;
    document.cookie = "0";
    this.itemService.Earns(-100).subscribe((response: any) => {
      console.log(response);
    });
  }

  Fight() {
    //speed stat determines who goes first. if the next attack kills the enemy, dont allow enemy to attack back. 
    //for reflection item only. otherwise executes normal fight conditions. 
    if (this.checkItem == 6) {
      this.villainHP -= (this.villainDmg * 1.5);    
      this.checkItem = 0;
    }
    else {
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
  }
  AfterWin() {
    this.itemService.Earns(this.earnings).subscribe((response: any) => {
      console.log(response);
      this.creditsCollected = true;
    });
    this.consecutiveWins += 1;
    let updatedValue: number = parseInt(document.cookie.split(";")[1].substring(1)) + 1;
    console.log(document.cookie.split(";")[1].substring(1));
    document.cookie = updatedValue.toString();

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
    this.consecutiveWins = 0;
    document.cookie = "0";
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
