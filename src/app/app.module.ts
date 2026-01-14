import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as CanvasJSAngularChart from '../assets/lib/canvasjs.angular.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { EncrDecrService } from './shared/services/EncrDecrService';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInceptorService } from './shared/services/cache-inceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    CanvasJSChart,
    LayoutComponent,
    DashboardComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpModule,
    MatProgressBarModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [AuthGuard,DatePipe,EncrDecrService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInceptorService, multi: true }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
