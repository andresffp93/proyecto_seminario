import { Component, OnInit, NgZone } from '@angular/core';
import { ProductoService } from '../../../shared/producto.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";


@Component({
  selector: 'app-add-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})

export class CrearProductoPage implements OnInit {
  productoForm: FormGroup;

  constructor(
    private productoAPI: ProductoService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone
  ) {
    this.productoForm = this.fb.group({
      nombre: [''],
      precio: [''],
      receta: ['']
    })
  }

  ngOnInit() { }

  onFormSubmit() {
    if (!this.productoForm.valid) {
      return false;
    } else {
      this.productoAPI.addProducto(this.productoForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.productoForm.reset();
            this.router.navigate(['/home']);
          })
        });
    }
  }
}
