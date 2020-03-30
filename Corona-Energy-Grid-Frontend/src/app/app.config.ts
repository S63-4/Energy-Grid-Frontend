export class AppConfig {
  static ApiBaseURL = "http://localhost:8762";

  static ApiUrls = {
    GETSTATUSFORPERIOD: "/status/status/getStatusForPeriod",
    GETUSERPROFILE: "/user/UserController/profile"
  };
  static LocalStorageKeys = {
    TOKEN: "token"
  };
}
