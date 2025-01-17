import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css']
})
export class CreateTaskModalComponent implements OnInit{
  @Output() close = new EventEmitter<void>();
  @Input() mode: "small"| "large" = "small";
  showDatePicker: boolean = false;
  selectedPriority: string = 'LOW';
  selectedDate: string = ''; 
  selectedTime: string = ''; 
  combinedDateTime: string =''
  createForm!:FormGroup;
  
  constructor(readonly fb:FormBuilder, readonly ts:TaskServiceService){}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title :[''],
      description:[''],
      deadline:[''],
      priority:[''],
      
    })
  }

  submitCreateForm(){
    if(this.createForm.valid){
      this.createForm.patchValue({deadline:this.combinedDateTime.replace(" ","T")})
      this.createForm.patchValue({priority:this.selectedPriority})

      this.ts.createTask(this.createForm.value).subscribe(res => console.log(res));
    }
  }

  onCancel() {
    this.close.emit();
  }

  openDatePicker(): void {
    this.showDatePicker = true;
  }

  closeDatePicker(): void {
    this.showDatePicker = false;
  }


  //if select date, not select time, auto set time to 00:00 that day, if selected date is today, set it to 23:59
  //if select time, not date, set it to tomorrow if selected time less than right now, otherwise set date today

  saveDateTime(): void {
    
    const now = new Date(); // Current date and time
    let adjustedDateTime;

    if (this.selectedDate && !this.selectedTime) {
        // Only date selected
        adjustedDateTime = new Date(this.selectedDate);
        if (adjustedDateTime.toDateString() === now.toDateString()) {
            // If the selected date is today, set the time to 23:59
            adjustedDateTime.setHours(23, 59, 0, 0);
        } else {
            // Otherwise, set the time to 00:00
            adjustedDateTime.setHours(0, 0, 0, 0);
        }
    } else if (!this.selectedDate && this.selectedTime) {
        // Only time selected
        const [hours, minutes] = this.selectedTime.split(':').map(Number);
        adjustedDateTime = new Date(now);
        adjustedDateTime.setHours(hours, minutes, 0, 0);

        if (adjustedDateTime < now) {
            // If the selected time is earlier than now, set the date to tomorrow
            adjustedDateTime.setDate(adjustedDateTime.getDate() + 1);
        }
    } else if(!this.selectedDate&&!this.selectedTime) {
        return;
    }
     else if (this.selectedDate && this.selectedTime){
      adjustedDateTime = new Date(this.selectedDate)
      const [hours, minutes] = this.selectedTime.split(':').map(Number);
      adjustedDateTime = new Date(now);
      adjustedDateTime.setHours(hours, minutes, 0, 0);
     
     }

    console.log(adjustedDateTime?.toLocaleDateString("vi-VN"));
     
    
    this.combinedDateTime = this.formatDateTime(adjustedDateTime!)
    this.closeDatePicker();
  }

 
  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

}
