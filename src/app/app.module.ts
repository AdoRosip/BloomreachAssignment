import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomerFilterComponent } from './components/custom-filter/customer-filter.component';
import { FunnelStepComponent } from './components/funnel-step/funnel-step.component';
import { HttpClientModule } from '@angular/common/http';
import { AttributeFilterRowComponent } from './components/attribute-filter-row/attribute-filter-row.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomSearchBarComponent } from './components/custom-search-bar/custom-search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerFilterComponent,
    FunnelStepComponent,
    AttributeFilterRowComponent,
    CustomSearchBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
