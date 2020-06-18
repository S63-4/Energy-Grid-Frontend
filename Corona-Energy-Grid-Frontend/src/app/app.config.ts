export class AppConfig {
  // static WebSocketBaseUrl = "http://localhost:9060/";
  static WebSocketBaseUrl = "http://34.105.162.130:9060/";

  //static ApiBaseURL = "http://localhost:8762";
  static ApiBaseURL = "http://35.189.86.8";
  static ApiUrls = {
    GETSTATUSFORPERIOD: "/status/customer-hour",
    GETUSERPROFILE: "/user/customer/profile",
  };
  static LocalStorageKeys = {
    TOKEN: "token",
  };
}
