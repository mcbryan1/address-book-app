import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleService } from '../module/module.service';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-address-add-edit-form',
  templateUrl: './address-add-edit-form.component.html',
  styleUrls: ['./address-add-edit-form.component.scss'],
})
export class AddressAddEditFormComponent implements OnInit {
  // Define the form
  addressForm: FormGroup;

  // Initialize the form
  constructor(
    private _fb: FormBuilder,
    private _addressService: AddressService,
    private _dialog: MatDialogRef<AddressAddEditFormComponent>,
    private _moduleService: ModuleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addressForm = this._fb.group({
      first_name: '',
      last_name: '',
      phone_number: '',
      id:""
    });
    _dialog.disableClose = true;
  }

  ngOnInit(): void {
    this.addressForm.patchValue(this.data)
   
  }



  //OnSubmit Function
  onSubmit() {
    const firstName = this.addressForm.value.first_name;
    const lastName = this.addressForm.value.last_name;
    const contact = this.addressForm.value.phone_number;
    if (firstName.length > 0 && lastName.length > 0 && contact.length > 0) {
      if (this.data) {
        this._addressService
          .updateAddress(this.data.id, this.addressForm.value)
          .subscribe({
            next: (value: any) => {
              this._moduleService.openSnackBar(
                'Address Updated Succesfully',
                'Okay'
              );
              this._dialog.close(true);
            },
            error: console.log,
          });
      } else {
        this._addressService.addAddress(this.addressForm.value).subscribe({
          next: (value: any) => {
            this._moduleService.openSnackBar(
              'Address Added Succesfully',
              'Okay'
            );
            this._dialog.close(true);
          },
          error: console.log,
        });
      }
    } else {
      this._moduleService.openSnackBar('Fields Cannot Be Empty', 'Okay');
    }
  }
}
