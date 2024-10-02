import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './models/product.model';
import { IOrder, IResponseSendOrder } from './models/order.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  sendOrder(data: IOrder) {
    return this.http.post<IResponseSendOrder>('https://testologia.ru/burgers-order', data);
  }

  getData() {
    return this.http.get<IProduct[]>('https://testologia.ru/burgers-data?extra=black');
  }
}
