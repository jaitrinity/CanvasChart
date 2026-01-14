import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  {path : '' ,  redirectTo: '/layout', pathMatch: 'full'},
  // {path : 'layout', component :LayoutComponent,  canActivate: [AuthGuard],
  {path : 'layout', component :LayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
    ]
  },
  {path : 'access-denied' ,  component : AccessDeniedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
