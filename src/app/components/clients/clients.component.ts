import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { Client } from '../../models/client.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  dataSource: MatTableDataSource<Client>;

  clientColumns = ['clientId', 'firstName', 'lastName', 'occupation', 'gender', 'dob', 'phone', 'email', 'details'];
  clientList = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(
        response => {
          this.clientList = response["content"];
          this.dataSource = new MatTableDataSource(this.clientList);
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
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

  applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
