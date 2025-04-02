import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { DonationHistoryComponent } from './components/donation-history/donation-history.component';

export const routes: Routes = [
{path: 'profile', component: ProfileComponent},
{path: 'edit-profile', component: EditProfileComponent},
{path: 'donation-history', component: DonationHistoryComponent},
];
