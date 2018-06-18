import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {AppService} from './app.service';
import {FormsModule} from '@angular/forms';
import {OrderPipe} from './app.pipe';

 

@NgModule({
  declarations: [
    AppComponent,
    OrderPipe,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
