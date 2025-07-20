import {Component, inject, OnInit} from '@angular/core';
import {FavoriteService} from "../../../shared/services/favorite.service";
import {FavoriteType} from "../../../../types/favorite.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environments/environment";
import {throwError} from "rxjs";
import {CartType} from "../../../../types/cart.type";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  private favoriteService = inject(FavoriteService);

  protected products: FavoriteType[] = [];
  protected serverStaticPath = environment.serverStaticPath;

  ngOnInit(): void {
    this.favoriteService.getFavorites()
      .subscribe((data: FavoriteType[] | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          const error = (data as DefaultResponseType).message;
          throwError(() => error);
        }

        this.products = data as FavoriteType[];
      });
  }

  removeFromFavorites(id: string): void {
    this.favoriteService.removeFromFavorites(id)
      .subscribe((data: DefaultResponseType) => {
        if (data.error) {
          //..
          throw new Error(data.message);
        }

        this.products = this.products.filter(item => item.id !== id);
      });
  }

  addToCart(id: string): void {
    // count?
    this.cartService.updateCart(id, this.count)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.product.countInCart = this.count;
      });
  }

  // updateCount(value: number): void {
  //   this.count = value;
  //   if (this.countInCart) {
  //     this.cartService.updateCart(this.product.id, this.count)
  //       .subscribe((data: CartType | DefaultResponseType) => {
  //         if ((data as DefaultResponseType).error !== undefined) {
  //           throw new Error((data as DefaultResponseType).message);
  //         }
  //         this.countInCart = this.count;
  //       })
  //   }
  // }
}
