import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ProductType} from "../../../types/product.type";
import {Observable} from "rxjs";
import {ActiveParamsType} from "../../../types/active-params.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  getBestProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.api + 'products/best');
  }

  getProducts(params: ActiveParamsType): Observable<{ totalCount: number, pages: number, items: ProductType[] }> {
    return this.http.get<{ totalCount: number, pages: number, items: ProductType[] }>(environment.api + 'products', {
      params
    });
  }

  searchProducts(query: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.api + 'products/search?query=' + query);
  }

  getProduct(url: string): Observable<ProductType> {
    return this.http.get<ProductType>(environment.api + 'products/' + url);
  }
}
