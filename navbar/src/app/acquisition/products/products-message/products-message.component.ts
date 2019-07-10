import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';
import {ProductService} from 'src/app/services/acquisition/product/product.service';

@Component({
  selector: 'app-products-message',
  templateUrl: './products-message.component.html',
  styleUrls: ['./products-message.component.css']
})
export class ProductsMessageComponent implements OnInit {

    messages: Message[];

    constructor(private prdService: ProductService) { }

    ngOnInit() {
        this.prdService.currentMessageInUser.subscribe(data => {
            if(data !== []) {
                this.messages = data;
            }
        });
    }

    clearMessage() {
        this.prdService.clearMessageInProduct;
    }

}
