import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../shared/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Producto: any = [];

  constructor(
    private productoService: ProductoService
  ) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.productoService.getProductoList().subscribe((res) => {
      console.log(res)
      this.Producto = res;
    })
  }

  deleteProducto(producto, i) {
    if (window.confirm('Desea eliminar el producto?')) {
      this.productoService.deleteProducto(producto._id)
        .subscribe(() => {
          this.Producto.splice(i, 1);
          console.log('Producto eliminado!')
        }
        )
    }
  }
}
