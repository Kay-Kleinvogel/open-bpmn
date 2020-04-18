import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  lastProjects = Array();

  addProject(projectPath) {
    const projectObject = {
      path: projectPath,
      date: new Date()
    }
    if (this.lastProjects.length <= 4) {
      this.lastProjects.unshift(projectObject);
    } else {
      this.lastProjects.pop();
      this.lastProjects.unshift(projectPath);
    }
  }

  getProject(index) {
    if (this.lastProjects[index]) {
      return this.lastProjects[index];
    } else {
      return {};
    }
  }

  constructor() { }
}
