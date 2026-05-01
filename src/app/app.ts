import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleSheetsService } from './services/google-sheets.service';
import { HomeConstructionData } from './models/home-construction.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('Home Construction Data');
  private readonly sheetsService = inject(GoogleSheetsService);
  public homeConstructionData: HomeConstructionData[] = [];
  public showForm: boolean = false;
  public newRecord: HomeConstructionData = { Date: '', Reason: '', Rs: '' };

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.sheetsService.getAllDataFromHomeConstructionSheet().subscribe({
      next: (data) => {
        this.homeConstructionData = data.reverse();
      },
      error: (err) => {
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        console.error('Full error:', err);
      }
    });
  }

  showAddForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.newRecord = { Date: '', Reason: '', Rs: '' };
    }
  }

  addRecord() {
    if (this.newRecord.Date && this.newRecord.Reason && this.newRecord.Rs) {
      this.sheetsService.createRecord(this.newRecord).subscribe({
        next: (result) => {
          console.log('Record created:', result);
          this.loadData();
          this.showAddForm();
          this.newRecord = { Date: '', Reason: '', Rs: '' };
        },
        error: (err) => console.error('Error creating record:', err)
      });
    }
  }
}
