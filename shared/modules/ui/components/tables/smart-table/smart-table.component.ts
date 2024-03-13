import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'table-smart',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './smart-table.component.html',
  styleUrl: './smart-table.component.scss',
})
export class SmartTableComponent {}
