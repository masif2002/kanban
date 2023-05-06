import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  template: `
    <h1 mat-dialog-title>Boards<h1>
    
    <div mat-dialog-content>
      <p>What shall we call this board?</p>
        <mat-form-field>
          <mat-label>Title</mat-label>
          <input matInput [(ngModel)]="data.title">
        </mat-form-field>
    </div>

    <div mat-dialog-actions class="btn-container">
      <button mat-stroked-button (click)="onNoClick()"> Cancel </button>
      <button mat-raised-button color="accent" [mat-dialog-close]="data.title" cdkFocusInitial> Create </button>
    </div>
  `,
  styleUrls: ['./dialog.scss']

})
export class BoardDialogComponent {
  constructor (
    public dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
}
