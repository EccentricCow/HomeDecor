import {Component, inject, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {environment} from "../../../../environments/environment";
import {CartService} from "../../services/cart.service";
import {CartType} from "../../../../types/cart.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {FavoriteType} from "../../../../types/favorite.type";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FavoriteService} from "../../services/favorite.service";
import {Router} from "@angular/router";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private _snackBar = inject(MatSnackBar);
  private favoriteService = inject(FavoriteService);
  private router = inject(Router);

  @Input() product!: ProductType;
  serverStaticPath = environment.serverStaticPath;

  @Input() isLight: boolean = false;
  @Input() countInCart: number | undefined = 0;

  count: number = 1;

  ngOnInit(): void {
    if (this.countInCart && this.countInCart > 1) {
      this.count = this.countInCart;
    }
  }

  addToCart(): void {
    this.cartService.updateCart(this.product.id, this.count)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.countInCart = this.count;
      })
  }

  updateCount(value: number): void {
    this.count = value;
    if (this.countInCart) {
      this.cartService.updateCart(this.product.id, this.count)
        .subscribe((data: CartType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          this.countInCart = this.count;
        })
    }
  }

  removeFromCart(): void {
    this.cartService.updateCart(this.product.id, 0)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.countInCart = 0;
        this.count = 1;
      })
  }

  updateFavorite() {
    if (!this.authService.isLoggedIn) {
      this._snackBar.open('Для добавления в избранное необходимо авторизоваться');
      return;
    }

    if (this.product.isInFavorite) {
      this.favoriteService.removeFromFavorites(this.product.id)
        .subscribe((data: DefaultResponseType) => {
          if (data.error) {
            //..
            throw new Error(data.message);
          }

          this.product.isInFavorite = false;
        });
    } else {
      this.favoriteService.addFavorite(this.product.id)
        .subscribe((data: FavoriteType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }

          this.product.isInFavorite = true;
        });
    }
  }

  navigate() {
    if (this.isLight) {
      this.router.navigate(['/product/' + this.product.url]);
    }
  }
}
