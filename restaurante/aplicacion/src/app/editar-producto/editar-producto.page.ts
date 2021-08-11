import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../shared/producto.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {

  updateProductoForm: FormGroup;
  id: any;

  constructor(
    private productoAPI: ProductoService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getProductoData(this.id);
    this.updateProductoForm = this.fb.group({
      nombre: [''],
      precio: [''],
      receta: ['']
    })
  }

  getProductoData(id) {
    this.productoAPI.getProducto(id).subscribe(res => {
      this.updateProductoForm.setValue({
        nombre: res['nombre '],
        precio: res['precio'],
        receta: res['receta']
      });
    });
  }

  updateForm() {
    if (!this.updateProductoForm.valid) {
      return false;
    } else {
      this.productoAPI.updateProducto(this.id, this.updateProductoForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateProductoForm.reset();
          this.router.navigate(['/']);
        })
    }
  }

}