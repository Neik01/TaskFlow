import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SearchComponent } from './components/search/search.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { ProjectComponent } from './components/project/project.component';

const routes: Routes = [
  {path:"", component:MainPageComponent,children:[
    {path:"", component:TasklistComponent},
    {path:"search",component:TasklistComponent},
    {path:"search/:keyword",component:TasklistComponent},
    {path:"project/:id",component:ProjectComponent}
    
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
