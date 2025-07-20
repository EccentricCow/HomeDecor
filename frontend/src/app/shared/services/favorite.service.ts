import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";
import {FavoriteType} from "../../../types/favorite.type";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private http = inject(HttpClient);

  getFavorites(): Observable<FavoriteType[] | DefaultResponseType> {
    return this.http.get<FavoriteType[] | DefaultResponseType>(environment.api + 'favorites');
  }

  removeFromFavorites(productId: string): Observable<DefaultResponseType> {
    return this.http.delete<DefaultResponseType>(environment.api + 'favorites', {
      body: {productId},
    });
  }

  addFavorite(productId: string): Observable<FavoriteType | DefaultResponseType> {
    return this.http.post<FavoriteType | DefaultResponseType>(environment.api + 'favorites', {
      productId,
    });
  }
}
