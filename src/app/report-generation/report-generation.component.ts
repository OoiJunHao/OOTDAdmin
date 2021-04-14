import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SaleTransactionManagementService } from '../services/sale-transaction-management.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-report-generation',
  templateUrl: './report-generation.component.html',
  styleUrls: ['./report-generation.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ReportGenerationComponent implements OnInit {

  start: Date | undefined;
  end: Date | undefined;

  constructor(private saleTransactionService: SaleTransactionManagementService, private sessionService: SessionService, private router: Router, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.checkAccessRight();
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(["/accessRightError"]);
    }
  }

  generateReport() {
    console.log(this.start);
    console.log(this.end);
    if (this.start == undefined || this.end == undefined) {
      this.messageService.add({ severity: 'error', summary: 'Empty field', detail: "Please select start and end both months" })
    } else if (this.start >= this.end) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Entry', detail: "Please ensure that start comes before end" })
    } else {
      this.saleTransactionService.generateReport(this.start, this.end).subscribe(
        response => {
          window.location.href = 'http://localhost:8080/OTFood-war/uploadedFiles/report/report.pdf' // Sorry prof... really tried many hours to send the pdf over RESTful but failed. This will do for now i hope
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Report generation failed', detail: "Please try again" })
          console.log('********** ViewAllSalesTransaction.ts: ' + error);
        }
      );
    }
  }
}
