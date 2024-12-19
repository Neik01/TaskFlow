import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateTaskModalComponent } from './components/modal/create-task-modal/create-task-modal.component';
import { FormsModule } from '@angular/forms';
import { SearchModalComponent } from './components/modal/search-modal/search-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SidebarComponent,
    CreateTaskModalComponent,
    SearchModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
