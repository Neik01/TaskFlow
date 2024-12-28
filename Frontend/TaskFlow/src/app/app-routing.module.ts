import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SearchComponent } from './components/search/search.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';

const routes: Routes = [
  {path:"", component:MainPageComponent,children:[
    {path:"", component:TasklistComponent},
    {path:"search",component:SearchComponent},
    {path:"search/:keyword",component:SearchComponent},
    
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
