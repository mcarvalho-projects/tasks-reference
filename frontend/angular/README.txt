Angular (CHEAT REFERENCE, simple but working)

Setup:
- Install CLI:
  npm install -g @angular/cli
- Create:
  ng new angular-tasks
  cd angular-tasks
- Replace:
  src/app/app.component.ts
  src/app/app.component.html
  (use files from this folder)
- Run:
  ng serve

Backend URL used:
- http://localhost:5101

Required modules (in app.module.ts):
- FormsModule (for ngModel)
- HttpClientModule (for HTTP)

CORS note:
- If backend blocks the browser, enable CORS for localhost in the backend.
