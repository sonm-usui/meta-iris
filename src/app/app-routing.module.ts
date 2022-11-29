import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignToTextComponent } from './sign-to-text/sign-to-text.component';
import { TextToSignComponent } from './text-to-sign/text-to-sign.component';
import { AppComponent } from './app.component';

const routes: Routes = [
{
    path: 'app',
    component: AppComponent,
  },
  {
   path: '',
   pathMatch: 'full',
   redirectTo: 'app'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
