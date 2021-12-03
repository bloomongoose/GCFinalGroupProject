import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { ItemShopService } from '../item-shop.service';
import { ItemShop } from '../ItemShop';
import { UserInventory } from '../UserInventory';

@Component({
    selector: 'app-item-shop',
    templateUrl: './item-shop.component.html',
    styleUrls: ['./item-shop.component.css']
})
/** ItemShop component*/
export class ItemShopComponent {
  currentInv: UserInventory = {} as UserInventory;


    /** ItemShop ctor */
    constructor(private heroService:HeroService, private itemService:ItemShopService) {

  }

  ngOnInit() {
    this.heroService.GetInv().subscribe((inv:UserInve) => {
      console.log(item);
      this.currentInv = item;
    });
    console.log(this.currentInv);
  }

}
