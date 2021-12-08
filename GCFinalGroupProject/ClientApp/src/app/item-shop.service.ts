import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ItemShop } from './ItemShop';

@Injectable({
  providedIn: 'root'
})

export class ItemShopService {



  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  GetAllItems(): any {
    return this.http.get(this.baseUrl + "api/item/AllItems", {});
  }

  Buy(id:number, price:number):any {
    return this.http.patch(this.baseUrl + `api/item/Buy?id=${id}&price=${price}`, {})
  }

  EmptySlot(slot: number): any {
    return this.http.put(this.baseUrl + `api/item/EmptySlot?slot=${slot}`, {});
  }

  Earns(money: number): any{
    return this.http.put(this.baseUrl + `api/item/Earns?money=${money}`, {});
  }

}
