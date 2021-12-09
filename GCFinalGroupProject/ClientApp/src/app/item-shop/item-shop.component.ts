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
  message: string = "";


  allItems: ItemShop[] = [];
    /** ItemShop ctor */
    constructor(private heroService:HeroService, private itemService:ItemShopService) {

  }

  ngOnInit() {
    this.updateInventory();
    this.fillArray();
   
  }
  //create array of itemshop. for loop on array. 
  fillArray() {
    this.allItems.push(this.itemService.GetAllItems().subscribe((response: ItemShop[]) => {
      console.log(response);
      this.allItems = response;
    }));
  }

  purchaseItem(itemID: number, itemPrice: number) {
    this.itemService.Buy(itemID, itemPrice).subscribe((response: any) => {
      console.log(response);
      this.updateInventory();
      this.message = `You have purchased item ${itemID}`;
    });
  }

  updateInventory() {
    this.heroService.GetInv().subscribe((inv: UserInventory) => {
      console.log(inv);
      this.currentInv = inv;
    });
  }
}
