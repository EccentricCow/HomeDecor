import {Component, inject, OnInit} from '@angular/core';
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  protected isShowed: boolean = false;

  private loaderService = inject(LoaderService);

  ngOnInit(): void {
    this.loaderService.isShowed$
      .subscribe((isShowed: boolean): void => {
        this.isShowed = isShowed;
      });
  }
}
