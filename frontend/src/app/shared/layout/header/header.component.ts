import {Component, HostListener, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {debounceTime, Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CategoryWithTypeType} from "../../../../types/category-with-type.type";
import {CartService} from "../../services/cart.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {ProductService} from "../../services/product.service";
import {ProductType} from "../../../../types/product.type";
import {environment} from "../../../../environments/environment";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() categories: CategoryWithTypeType[] = [];
  protected isLogged: boolean = false;
  private loggedSubscription: Subscription | null = null;
  private countSubscription: Subscription | null = null;
  protected count: number = 0;
  // protected searchValue: string = '';
  protected products: ProductType[] = [];

  private authService = inject(AuthService);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  serverStaticPath = environment.serverStaticPath;
  protected showedSearch: boolean = false;

  searchedField = new FormControl('');

  constructor() {
    this.isLogged = this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.doLogout();
      },
      error: () => {
        this.doLogout();
      }
    })
  }

  private doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы успешно вышли из системы');
    this.cartService.count$.next(0);
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.searchedField.valueChanges
      .pipe(
        debounceTime(500),
      )
      .subscribe(value => {
        if (value && value.length > 2) {
          this.productService.searchProducts(value)
            .subscribe((data: ProductType[]) => {
              this.products = data;
              this.showedSearch = true;
            });
        } else {
          this.products = [];
        }
      });

    this.loggedSubscription = this.authService.isLogged$.subscribe((isLoggedIn: boolean) => this.isLogged = isLoggedIn);

    this.cartService.getCartCount()
      .subscribe((data: { count: number } | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.count = (data as { count: number }).count;
      })

    this.countSubscription = this.cartService.count$
      .subscribe((count: number) => {
        this.count = count;
      });
  }

  ngOnDestroy() {
    this.loggedSubscription?.unsubscribe();
    this.countSubscription?.unsubscribe();
  }

  // changedSearchValue(newValue: string): void {
  //   this.searchValue = newValue;
  //
  //   if (this.searchValue && this.searchValue.length > 2) {
  //     this.productService.searchProducts(this.searchValue)
  //       .subscribe((data: ProductType[]) => {
  //         this.products = data;
  //         this.showedSearch = true;
  //       });
  //   } else {
  //     this.products = [];
  //   }
  // }

  selectProduct(url: string): void {
    this.router.navigate(['/product/' + url]);
    this.searchedField.setValue('');
    // this.searchValue = '';
    this.products = [];
  }

  // changeShowedSearch(value: boolean): void {
  //   setTimeout(() => {
  //     this.showedSearch = value;
  //   }, 100);
  // }

  @HostListener('document:click', ['$event'])
  click(event: MouseEvent) {
    if (this.showedSearch && (event.target as HTMLElement).className.indexOf('search-product') === -1) {
      this.showedSearch = false;
    }
  }
}
