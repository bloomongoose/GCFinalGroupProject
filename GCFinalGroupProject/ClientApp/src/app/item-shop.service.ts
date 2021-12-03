import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ItemShop } from './ItemShop';

@Injectable({
  providedIn: 'root'
})

export class ItemShopService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  GetAllItems() {
    this.http.get(this.baseUrl + "api/item/AllItems", {});
  }

  Buy(item:ItemShop) {
    this.http.patch(this.baseUrl + `api/item/Buy?item=${item.ItemPrice}`, {})
  }

}
