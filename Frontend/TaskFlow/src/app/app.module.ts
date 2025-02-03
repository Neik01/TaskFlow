import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateTaskModalComponent } from './components/modal/create-task-modal/create-task-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModalComponent } from './components/modal/search-modal/search-modal.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { SearchComponent } from './components/search/search.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { TaskDetailModalComponent } from './components/modal/task-detail-modal/task-detail-modal.component';
import { BoardComponent } from './components/board/board.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateBoardModalComponent } from './components/modal/create-board-modal/create-board-modal.component';
import { BoardListComponent } from './components/board-list/board-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SidebarComponent,
    CreateTaskModalComponent,
    SearchModalComponent,
    TasklistComponent,
    SearchComponent,
    TaskStatusPipe,
    TaskDetailModalComponent,
    BoardComponent,
    HeaderComponent,
    CreateBoardModalComponent,
    BoardListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
