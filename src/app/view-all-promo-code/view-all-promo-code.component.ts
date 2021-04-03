import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PromoCode } from '../models/promo-code';
import { Promo } from '../models/promo.enum';
import { PromoCodeServiceService } from '../services/promo-code-service.service';

@Component({
  selector: 'app-view-all-promo-code',
  templateUrl: './view-all-promo-code.component.html',
  styleUrls: ['./view-all-promo-code.component.css'],
  providers: [MessageService],
})
export class ViewAllPromoCodeComponent implements OnInit {

  promoCodes: PromoCode[]
  promoCodeToCreate: PromoCode
  createDisplay: Boolean
  discountTypeEnum: Promo[]
  availableError: Boolean;
  message: String;
  submitted: Boolean;
  startError: Boolean;
  endError: Boolean;
  resultError: Boolean;

  constructor(private promoCodeService: PromoCodeServiceService, private messageService: MessageService) {
    this.promoCodes = new Array();
    this.promoCodeToCreate = new PromoCode();
    this.createDisplay = false;
    this.discountTypeEnum = new Array();
    this.availableError = false;
    this.message = ""
    this.submitted = false;
    this.startError = false;
    this.endError = false;
    this.resultError = false;
  }

  ngOnInit(): void {
    this.promoCodeService.getPromoCodes().subscribe(response => {
      this.promoCodes = response;
    }, error => {
      console.log('************* ViewAllPromoCode.ts' + error);
    })

    this.discountTypeEnum = [Promo.FLAT, Promo.PERCENTAGE]
  }

  updateCode(code: PromoCode) {
    console.log(code)
    this.promoCodeService.updatePromoCode(code).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Promo Updated', life: 3000 });

      console.log("promoCode of ID: " + code.promoCodeId + "is updated!");
    }, error => {
      console.log(error)
    })
  }

  displayCreateDialog() {
    this.createDisplay = true;
    this.availableError = false;
    this.startError = false;
    this.endError = false;
    this.resultError = false;
    this.promoCodeToCreate = new PromoCode();
  }

  createPromo(createPromoForm: NgForm) {
    let allChecks = true;
    this.submitted = true;
    if (this.promoCodeToCreate.discountCodeTypeEnum == null) {
      this.availableError = true;
      allChecks = false;
    } else {
      this.availableError = false;
    }
    if (this.promoCodeToCreate.startDate == null) {
      this.startError = true;
      allChecks = false;
    } else {
      this.startError = false;
    }
    if (this.promoCodeToCreate.endDate == null) {
      this.endError = true;
      allChecks = false;
    } else {
      this.endError = false;
    }

    if (this.promoCodeToCreate.isAvailable != null && this.promoCodeToCreate.startDate != null && this.promoCodeToCreate.endDate != null) {
      allChecks = true;
    }
    if (allChecks) {
      if (createPromoForm.valid) {
        this.promoCodeToCreate.isAvailable = true;
        console.log(this.promoCodeToCreate.discountCodeTypeEnum);
        this.promoCodeService.createPromoCode(this.promoCodeToCreate).subscribe(response => {
          let numberReturned: Number = response;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Promo Created', life: 3000 });

          this.createDisplay = false;
          this.updateTable();
          // window.location.reload();
          console.log(numberReturned);
        }, error => {
          this.resultError = true;
          this.message = error;
        })
      }
    }
  }
  updateTable(): void {
    this.promoCodeService.getPromoCodes().subscribe(response => {
      this.promoCodes = response;
    }, error => {
      console.log('************* ViewAllPromoCode.ts' + error);
    })
  }

  clear() {
    this.promoCodeToCreate = new PromoCode();
  }
}
