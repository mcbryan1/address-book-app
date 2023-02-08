import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-address-add-edit-form',
  templateUrl: './address-add-edit-form.component.html',
  styleUrls: ['./address-add-edit-form.component.scss'],
})
export class AddressAddEditFormComponent {
  // Define the form
  addressForm: FormGroup;

  // Initialize the form
  constructor(
    private _fb: FormBuilder,
    private _addressService: AddressService,
    private _dialog: MatDialogRef<AddressAddEditFormComponent>
  ) {
    this.addressForm = this._fb.group({
      firstName: '',
      lastName: '',
      contact: '',
    });
  }

  //OnSubmit Function
  onSubmit() {
    const firstName = this.addressForm.value.firstName;
    const lastName = this.addressForm.value.lastName;
    const contact = this.addressForm.value.contact;
    if (firstName.length > 0 && lastName.length > 0 && contact.length > 0) {
      this._addressService.addAddress(this.addressForm.value).subscribe({
        next: (value: any) => {
          alert('Employee Added Successfully');
          this._dialog.close(true);
        },
        error: console.log
      });
    } else{
      alert('Field Cannot be empty')
    }
  }
}
