import { Component, effect, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Colors } from 'src/models/colors';
import { AddColorComponent } from '../add-color/add-color.component';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.css',
})
export class ColorsComponent {
  theme: string = '';
  colors: Colors[] = [];
  displayedColumns: string[] = ['id', 'name', 'color', 'actions'];
  dataSource = [...this.colors];
  @ViewChild(MatTable) table!: MatTable<Colors>;
  constructor(
    private themeService: ThemeService,
    private colorsService: ColorService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.colorsService.getAll();
    effect(() => {
      this.theme = this.themeService.theme();
      this.colors = this.colorsService.colors();
      this.dataSource = [...this.colors];
    });
  }

  openAdd() {
    if (window.innerWidth > 760) {
      const ref = this.matDialog.open(AddColorComponent, {
        width: '50%',
        data: {
          isEditing: false,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    } else {
      const ref = this.matDialog.open(AddColorComponent, {
        width: '100%',
        data: {
          isEditing: false,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    }
  }

  deleteH(id: string) {
    const ref = this.colorsService.delete(id);
    ref.subscribe(
      () => {
        this.colorsService.getAll();
        this.table.renderRows();
        this.snackBar.open('color deleted', 'close');
      },
      (Err) => {
        this.snackBar.open(Err.error.message, 'close');
      }
    );
  }

  openEdit(color: Colors) {
    if (window.innerWidth > 760) {
      const ref = this.matDialog.open(AddColorComponent, {
        width: '50%',
        data: {
          isEditing: true,
          color: color,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    } else {
      const ref = this.matDialog.open(AddColorComponent, {
        width: '100%',
        data: {
          isEditing: true,
          color: color,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    }
  }
}
