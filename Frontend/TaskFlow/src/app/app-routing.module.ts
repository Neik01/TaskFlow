import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SearchComponent } from './components/search/search.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { BoardComponent } from './components/board/board.component';
import { BoardListComponent } from './components/board-list/board-list.component';

const routes: Routes = [
  {path:"", component:MainPageComponent,children:[
    {path:"", component:TasklistComponent},
    {path:"search",component:TasklistComponent},
    {path:"search/:keyword",component:TasklistComponent},
    {path:"boards",component:BoardListComponent},
    {path:"boards/:id",component:BoardComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
