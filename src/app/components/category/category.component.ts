import { Component, effect, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Colors } from 'src/models/colors';
import { AddColorComponent } from '../add-color/add-color.component';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Catgeory } from 'src/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { AddCategoryComponent } from 'src/app/add-category/add-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  theme: string = '';
  colors: Catgeory[] = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];
  dataSource = [...this.colors];
  @ViewChild(MatTable) table!: MatTable<Catgeory>;
  constructor(
    private themeService: ThemeService,
    private colorsService: CategoryService,
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
      const ref = this.matDialog.open(AddCategoryComponent, {
        width: '50%',
        data: {
          isEditing: false,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    } else {
      const ref = this.matDialog.open(AddCategoryComponent, {
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
        this.snackBar.open('category deleted', 'close');
      },
      (Err) => {
        this.snackBar.open(Err.error.message, 'close');
      }
    );
  }

  openEdit(color: Catgeory) {
    if (window.innerWidth > 760) {
      const ref = this.matDialog.open(AddCategoryComponent, {
        width: '50%',
        data: {
          isEditing: true,
          category: color,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    } else {
      const ref = this.matDialog.open(AddCategoryComponent, {
        width: '100%',
        data: {
          isEditing: true,
          category: color,
        },
      });

      ref.afterClosed().subscribe(() => {
        this.table.renderRows();
      });
    }
  }
}
