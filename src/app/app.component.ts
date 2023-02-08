import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressAddEditFormComponent } from './address-add-edit-form/address-add-edit-form.component';
import { AddressService } from './services/address.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Table
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'contact', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _alertDialog: MatDialog, private _addressService: AddressService) {}

  // App Mounts
  ngOnInit(): void {
      this.getAddressList();
  }

  // function to open the add and edit dialog
  openAddEditDialog(){
    //Store reference of dialog
    const dialogRef = this._alertDialog.open(AddressAddEditFormComponent);

    // Listen to after it is closed and call get address list
    dialogRef.afterClosed().subscribe({
      // it returns a bool 
      next: (value) => {
        if(value){
          this.getAddressList();
        }
      },
      error: console.log
    })
  } 

  // Method to get list of addresses
  getAddressList (){
    this._addressService.getAddress().subscribe({
      next:(response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    })
  }

  // Method to delete an address
  deleteAddress (id: number){
    this._addressService.deleteAddress(id).subscribe({
      next: (response) => {
        alert('Address Deleted Succesfully');
        this.getAddressList()
      },
      error: console.log
    })
  }

  // Defining filter apply
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
