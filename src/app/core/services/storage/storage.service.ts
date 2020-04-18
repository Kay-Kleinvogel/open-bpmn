import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  lastProjects = Array<String>();

  addProject(projectPath) {
    if (this.lastProjects.length <= 4) {
      this.lastProjects.pop();
      this.lastProjects.unshift(projectPath);
    } else {
      this.lastProjects.unshift(projectPath);
    }
  }

  getProject(index) {
    if (this.lastProjects[index]) {
      return this.lastProjects[index];
    } else {
      return "";
    }
  }

  constructor() { }
}
