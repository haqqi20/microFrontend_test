import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '@app/services/acquisition/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products = [];
  clonedProducts = [];
  cols: any[];

  priority: number;

  statuss = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];
  selectedStatuss: any[];

  types = [
    { label: 'Kredit Mobil Baru', value: 'Kredit Mobil Baru' },
    { label: 'Kredit Mobil Bekas', value: 'Kredit Mobil Bekas' }
  ];
  selectedTypes: any[];

  fees = [
    { label: 'Fee Basic Kredit Mobil Baru', value: 'Fee Basic Kredit Mobil Baru' }
  ];
  selectedFees: any[];

  knockouts = [
    { label: 'Knockout Kredit Mobil Baru', value: 'Knockout Kredit Mobil Baru' },
    { label: 'Knockout Basic Kredit Mobil Baru', value: 'Knockout Basic Kredit Mobil Baru' }
  ];
  selectedKnockouts: any[];

  documents = [
    { label: 'Document Basic Kredit Mobil Baru', value: 'Document Basic Kredit Mobil Baru' }
  ];
  selectedDocuments: any[];

  selectedStartDate: Date;
  selectedEndDate: Date;

  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.productService.currentProduct.subscribe(data => {
      this.products = data;
      this.clonedProducts = data;
    });

    this.cols = [
      { header: 'Product Information', width: '23%' },
      { header: 'Fee Category', width: '22%' },
      { header: 'Knockout Category', width: '22%' },
      { header: 'Document Category', width: '22%' },
      { header: 'Active', width: '8%' },
    ];
  }

  onDateSelect() {
    this.products = this.clonedProducts.filter(product => new Date(product.startDate) >= this.selectedStartDate && new Date(product.endDate) <= this.selectedEndDate);
  }

  onChecked() {
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    this.products = this.clonedProducts;
  }

  clearFilters() {
    this.priority = null;
    this.selectedStatuss = [];
    this.selectedTypes = [];
    this.selectedFees = [];
    this.selectedKnockouts = [];
    this.selectedDocuments = [];
    this.products = this.clonedProducts;
  }

  onItemClick(uuid: string) {
    this.router.navigateByUrl('acquisition/product-management/details/' + uuid);
  }

  showAdd() {
    this.router.navigateByUrl('acquisition/product-management/create');
  }

}
