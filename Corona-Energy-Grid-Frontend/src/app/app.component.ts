import { Component } from "@angular/core";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { AuthenticationService } from "./REST/authentication.service";
import { AppConfig } from "./app.config";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Corona Energy Grid";
  home = faHome;
  loggedIn: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.subscribeEvents();
  }

  subscribeEvents(): void {
    this.authService.loggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;

      if (loggedIn) {
        this.router.navigateByUrl("/dashboard");
      } else {
        localStorage.removeItem(AppConfig.LocalStorageKeys.TOKEN);
        this.router.navigateByUrl("/login");
      }
    });
  }
}
