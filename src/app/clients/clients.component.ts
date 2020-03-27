import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  dataSource = [];

  clientColumns = ['clientId', 'firstName', 'lastName', 'occupation', 'gender', 'dob', 'phone', 'email', 'details'];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(
        response => {
          this.dataSource = response["content"];
        }
      );
  }

  onRowClicked(row): void {
    console.log('Row clicked', row);
  }

  deleteCustomer(id: number): void {
    console.log('customer deleted');
  }

  editCustomer(id: number) {
    console.log('edit customer');
  }

}
