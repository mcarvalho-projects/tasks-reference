// Why this file exists:
// - Minimal Angular UI that calls http://localhost:5101
// - Shows: ngModel, *ngFor, click handler, toggle done, simple toast

import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const API = "http://localhost:5101";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  titleInput = "";
  toast = false;

  tasks: any[] = [];

  constructor(private http: HttpClient) {}

  showToast() {
    this.toast = true;
    setTimeout(() => (this.toast = false), 900);
  }

  load() {
    this.http.get<any[]>(`${API}/tasks`).subscribe((data) => (this.tasks = data));
  }

  addTask() {
    this.http
      .post(`${API}/tasks`, { title: this.titleInput })
      .subscribe(() => {
        this.titleInput = "";
        this.showToast();
        this.load();
      });
  }

  toggleDone(id: number) {
    this.http.patch(`${API}/tasks/${id}/done`, {}).subscribe(() => {
      this.showToast();
      this.load();
    });
  }

  ngOnInit() {
    this.load();
  }
}
