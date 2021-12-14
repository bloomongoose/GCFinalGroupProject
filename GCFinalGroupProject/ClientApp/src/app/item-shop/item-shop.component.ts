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
  item: ItemShop = {} as ItemShop;
  secret: boolean = false;


  allItems: ItemShop[] = [];
    /** ItemShop ctor */
    constructor(private heroService:HeroService, private itemService:ItemShopService) {

  }

  ngOnInit() {
    this.updateInventory();

  }
  //create array of itemshop. for loop on array. 
  fillArray() {
    this.allItems.push(this.itemService.GetAllItems().subscribe((response: ItemShop[]) => {
      this.allItems = response;
      if (this.secret == false) { this.allItems.splice(this.allItems.findIndex(x => x.id == 7), 1); }
      console.log(this.allItems);
    }));  
  }

  purchaseItem(itemID: number, itemPrice: number) {
    this.itemService.Buy(itemID, itemPrice).subscribe((response: any) => {
      console.log(response);
      this.updateInventory();
      ;
    });
  }

  updateInventory() {
    this.heroService.GetInv().subscribe((inv: UserInventory) => {
      console.log(inv);
      if (inv.consecutiveWins >= 10) { this.secret = true; }
      else { this.secret = false;}
      this.currentInv = inv;
      this.fillArray();
    });
  }
}
