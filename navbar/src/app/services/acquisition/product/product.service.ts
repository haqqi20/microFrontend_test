import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/acquisition/product/product';
import { Message } from 'primeng/api';
import { ProductParameter } from 'src/app/models/acquisition/product/product-parameter';
import { ProductFee } from 'src/app/models/acquisition/product/product-fee';
import { ProductKnockout } from 'src/app/models/acquisition/product/product-knockout';
import { ProductDocument } from 'src/app/models/acquisition/product/product-document';
import json from 'src/assets/demo/data/product-data.json';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  apiURL = 'http://localhost:8190/';
  messages: Message[];

  private product = new BehaviorSubject(json.data);
  currentProduct = this.product.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private messageInProduct = new BehaviorSubject(this.messages);
  currentMessageInUser = this.messageInProduct.asObservable();

  // Observable string sources
  private inputProduct = new Subject<string>();
  // private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this.inputProduct.asObservable();
  // missionConfirmed$ = this.missionConfirmedSource.asObservable();

  getPrdList(): Observable<Product> {
    return this.http.get<Product>(this.apiURL + 'product/list');
  }

  getPrdTypes(): Observable<Product> {
    return this.http.get<Product>(this.apiURL + 'product/type');
  }
  addPrd(product: Product) {
    return this.http.post(this.apiURL + 'product', JSON.stringify(product), this.httpOptions);
  }

  addPrdParam(param: ProductParameter, prodId: string) {
    return this.http.post(this.apiURL + 'product/' + prodId + '/parameter', JSON.stringify(param), this.httpOptions);
  }

  addPrdFee(fee: ProductFee, prodId: string) {
    return this.http.post(this.apiURL + 'product/' + prodId + '/fee', JSON.stringify(fee), this.httpOptions);
  }

  addPrdKnockout(knockout: ProductKnockout, prodId: string) {
    return this.http.post(this.apiURL + 'product/' + prodId + '/knockout', JSON.stringify(knockout), this.httpOptions);
  }

  addPrdDocument(document: ProductDocument, prodId: string) {
    return this.http.post(this.apiURL + 'product/' + prodId + '/document', JSON.stringify(document), this.httpOptions);
  }

  changeMessageInProduct(status: string, message: string) {
    let messages: Message[] = [];
    if (status === 'success') {
      messages.push({ severity: 'success', summary: 'Success', detail: message });
      this.messageInProduct.next(messages);
    }
    else {
      messages.push({ severity: 'error', summary: 'Error', detail: message });
      this.messageInProduct.next(messages);
    }
  }

  clearMessageInProduct() {
    this.messageInProduct.next([]);
  }
  // di knockout service seharusnya------------------------------------
  getListKnockoutName() {
    return this.http.get('http://localhost:8100/knockout/name')
  }

  getKnockout(knocId: string) {
    return this.http.get('http://localhost:8100/knockout/' + knocId);
  }
  // ------------------------------------------------------------------

  changeProductDemo(products: any[]) {
    this.product.next(products);
  }

}
