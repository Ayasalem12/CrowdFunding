import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  project: any = null;
  isEditing: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  currentUserId: number | null = null;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUserId = Number(this.authService.getUserId());
    this.isAdmin = this.authService.isAdmin();

    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProject(+projectId);
    } else {
      this.errorMessage = 'Project ID not found';
    }
  }

  loadProject(id: number) {
    this.projectService.getProject(id).subscribe({
      next: (response) => {
        this.project = response;
      },
      error: (error) => {
        this.errorMessage =
          'Failed to load project: ' + (error.message || 'Unknown error');
        console.error('Error loading project:', error);
      },
    });
  }

  canEdit(): boolean {
    return (
      this.isAdmin ||
      (this.project &&
        this.project.user &&
        this.project.user.id === this.currentUserId)
    );
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    if (!this.project) return;

    this.errorMessage = null;
    this.successMessage = null;

    this.projectService.updateProject(this.project.id, this.project).subscribe({
      next: () => {
        this.successMessage = 'Project updated successfully!';
        this.isEditing = false;
        this.loadProject(this.project.id);
      },
      error: (error) => {
        this.errorMessage =
          'Failed to update project: ' +
          (error.message || JSON.stringify(error));
        console.error('Error updating project:', error);
      },
    });
  }
}
