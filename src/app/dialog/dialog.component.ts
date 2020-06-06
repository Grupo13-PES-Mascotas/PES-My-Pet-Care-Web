import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Pet} from '../../interfaces/pet';
import {PetApiService} from '../../services/api-services/pet-api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogPetComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogPetComponent>,
    private petApiService: PetApiService,
    @ Inject(MAT_DIALOG_DATA) public data: Pet) {}

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  deletePet(pet: Pet) {
    console.log('Pet', pet);
    this.petApiService.deletePetOld(pet.owner, pet.name).subscribe(() =>
      console.log(`Delete ${pet.name} of ${pet.owner}`)
    );
    this.dialogRef.close();
  }

  getDate(dateTime: string): string {
    const index = dateTime.indexOf('T');
    const date = dateTime.substring(0, index);
    const dateParts = date.split('-');

    return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
  }
}
