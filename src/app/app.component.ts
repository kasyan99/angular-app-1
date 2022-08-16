import { Component, OnInit } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { IProduct } from './models/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-app-1'
  // products: IProduct[] = []
  loading = false
  products$: Observable<IProduct[]>

  constructor(private productsService: ProductService){

  }
  ngOnInit(): void {
    this.loading = true
    this.products$ = this.productsService.getAll().pipe(
      tap(()=>this.loading = false)
    )
    // this.productsService.getAll().subscribe(products => {
    //   this.products = products
    //   this.loading = false
    // })
  }
}
