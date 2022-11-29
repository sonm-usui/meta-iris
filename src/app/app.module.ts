import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignToTextComponent } from './sign-to-text/sign-to-text.component';
import { TextToSignComponent } from './text-to-sign/text-to-sign.component';
import { HeaderComponent } from './header/header.component';
import { WebsiteComponent } from './website/website.component';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    SignToTextComponent,
    TextToSignComponent,
    HeaderComponent,
    WebsiteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
