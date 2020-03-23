import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../app.config";
import { MyProfile } from "../models/myprofile.model";

@Component({
  selector: "app-myprofile",
  templateUrl: "./myprofile.component.html",
  styleUrls: ["./myprofile.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class MyprofileComponent implements OnInit {
  model: MyProfile;
  constructor(private http: HttpClient) {
    http
      .get(AppConfig.ApiBaseURL + AppConfig.ApiUrls.GETUSERPROFILE)
      .subscribe((data: MyProfile) => {
        this.model = data;
      });
  }

  ngOnInit(): void {}
}
