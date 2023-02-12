import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleService } from 'src/app/module/module.service';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
})
export class PromptComponent {
  constructor(
    private _dialog: MatDialogRef<PromptComponent>,
    private _addressService: AddressService,
    private _moduleService: ModuleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    _dialog.disableClose = true;
  }

  ngOnInit(): void {}

  // Method to delete an address
  deleteAddress(id: number) {
    this._addressService.deleteAddress(id).subscribe({
      next: (response) => {
        this._moduleService.openSnackBar(
          'Address Deleted Succesfully',
          'Close'
        ),
          this._dialog.close(true);
      },
      error: console.log,
    });
  }
}
