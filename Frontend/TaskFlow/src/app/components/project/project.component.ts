import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{

  columns = [
    {
      id: 'col-1',
      title: 'frontend',
      tasks: [
        { title: 'Task 1', description: 'Description 1' },
        { title: 'Task 2', description: 'Description 2' },
      ],
    },
    {
      id: 'col-2',
      title: 'backend',
      tasks: [{ title: 'Task 3', description: 'Description 3' }],
    },
  ];
  columnCounter = 3;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    // Get the project ID from the route
  };
  // List of connected task drop lists
  get connectedDropLists(): any[] {
    return this.columns.map(x => x.id);
  }

  // Add a new task to a specific column
  addTask(column: any) {
    column.tasks.push({ title: 'New Task', description: '' });
  }

  // Add a new column
  addColumn() {
    this.columns.push({
      id: `col-${this.columnCounter++}`,
      title: 'New Section',
      tasks: [],
    });
  }

  // Handle reordering of tasks within and across columns
  dropTask(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.previousContainer.data);
      
      // Reorder tasks within the same column
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Move tasks between columns
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // Handle reordering of columns
  dropColumn(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.columns,
      event.previousIndex,
      event.currentIndex
    );
  }
}


