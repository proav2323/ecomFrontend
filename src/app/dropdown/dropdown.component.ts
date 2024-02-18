import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  @Input() title!: string;
  @Input() actions!: {
    classname: string;
    ariaLabelledby: string;
    routerLink?: string;
    title: string;
  }[];
}
