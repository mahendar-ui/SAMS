import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpUtilsService } from '../../_base/crud';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Project } from '../_models/project.model';


const API_PROJECT_URL ='http://localhost:3000/api/create-project';
const API_PROJECTS_URL ='http://localhost:3000/api/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(public http:HttpClient,
    private httpUtils: HttpUtilsService) { }
   ;
    saveProject(projectForm : FormGroup): Observable<Project> {
      const httpHeaders = new HttpHeaders();   httpHeaders.set('Content-Type', 'application/json');
           return this.http.post<Project>(API_PROJECT_URL, projectForm, { headers: httpHeaders});
       }

       getAllProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(API_PROJECTS_URL);
      }
      getProjectById(projectId: number): Observable<Project> {
        return this.http.get<Project>(API_PROJECTS_URL + `/${projectId}`);
      }
      updateProject(project: Project): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
          return this.http.put(API_PROJECTS_URL, project, { headers: httpHeaders });
    }
    deleteProject(projectId: number) {
      const url = `${API_PROJECTS_URL}/${projectId}`;
      return this.http.delete<Project>(url);
      }
}
