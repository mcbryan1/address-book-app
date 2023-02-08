import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAddEditFormComponent } from './address-add-edit-form.component';

describe('AddressAddEditFormComponent', () => {
  let component: AddressAddEditFormComponent;
  let fixture: ComponentFixture<AddressAddEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressAddEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
