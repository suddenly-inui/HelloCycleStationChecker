import http from "@/http-common";

class StationsApiService {
  getAll(): Promise<any> {
    return http.get("/all_stations");
  }

  get(param: any): Promise<any> {
    if (typeof param === "string") {
      return http.get(`/station?name=${param}`);
    } else  {
      return http.get(`/station?id=${param}`)
    }
  }
}

export default new StationsApiService();
