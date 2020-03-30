import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  @Input() public clientForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.clientForm = new FormGroup({
      dateOfBirth: new FormControl(new Date()),
      firstName: new FormControl(),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public addClient(clientFormValue) {
    console.log('TODO');
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.clientForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    console.log('TODO');
  }

}
