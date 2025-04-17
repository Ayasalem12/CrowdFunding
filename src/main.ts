import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './app/login/login.component';
import { ProjectsComponent } from './app/projects/projects.component';
import { RegisterComponent } from './app/register/register.component';
import { VerifyAccountComponent } from './app/verify-account/verify-account.component';
import { ProjectDetailsComponent } from './app/project-details/project-details.component';
import { PasswordResetComponent } from './app/password-reset/password-reset.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'project/:id', component: ProjectDetailsComponent },
      { path: 'verify-account', component: VerifyAccountComponent }, 
      { path: 'password-reset', component: PasswordResetComponent }, 
      { path: '', redirectTo: '/projects', pathMatch: 'full' },
    ]),
    provideHttpClient(),
    importProvidersFrom(FormsModule),
  ],
}).catch((err) => console.error(err));
