import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatToolbarModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatBadgeModule,
  MatSelectModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatRippleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatExpansionModule,
  MatTabsModule,
  MatChipsModule,
  MatMenuModule,
  MatStepperModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSlideToggleModule
} from "@angular/material";

const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatBadgeModule,
  MatSelectModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatRippleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatExpansionModule,
  MatTabsModule,
  MatChipsModule,
  MatMenuModule,
  MatStepperModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSlideToggleModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialsModule { }
