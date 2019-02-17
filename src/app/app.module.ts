import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
