import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Client } from '../../models/client.model';
import { ClientService } from '../../service/client.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  public clientForm: FormGroup;
  private dialogConfig;

  // tslint:disable-next-line:max-line-length
  constructor(private clientService: ClientService, private dialogRef: MatDialogRef<SuccessDialogComponent>,
              private dialog: MatDialog, private location: Location, @Inject(MAT_DIALOG_DATA) public data: any,
              private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.clientForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      occupation: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      gender: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      birthDate: new FormControl(new Date()),
      phone: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    };
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.clientForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public registerClient = (clientFormValue) => {
    if (this.clientForm.valid) {
      this.executeCreateClient(clientFormValue);
    }
  }

  public executeCreateClient = (clientFormValue) => {

    const client: Client = {
      id: clientFormValue.id,
      firstName: clientFormValue.firstName,
      lastName: clientFormValue.lastName,
      occupation: clientFormValue.occupation,
      gender: clientFormValue.gender,
      birthDate: clientFormValue.birthDate,
      phone: clientFormValue.phone,
      email: clientFormValue.email,
    };

    this.clientService.create(client)
      .subscribe(
        result => {
          this.dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

          this.dialogRef.afterClosed()
            .subscribe(() => {
              this.location.back();
            });
        },
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
        })
      );
  }

}
