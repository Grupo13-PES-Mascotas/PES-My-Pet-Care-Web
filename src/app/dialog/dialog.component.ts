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
    this.petApiService.deletePetOld(pet.owner, pet.name).subscribe(() =>
      console.log(this.petApiService.getAllPetsOld(pet.owner))
    );
    this.dialogRef.close();
  }

  getDate(dateTime: string): string {
    let index = dateTime.indexOf('T');
    let date = dateTime.substring(0, index);
    let dateParts = date.split('-');

    return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
  }

}

export class DialogComponent {
}
