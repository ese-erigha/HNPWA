import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getFeed(feed: string): Observable<any> {
    let url = `${environment.apiBaseUrl}/${feed}.json`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  getItem(itemId: number): Observable<any> {
    return this.http
      .get(`${environment.apiBaseUrl}/item/${itemId}.json`)
      .pipe(catchError(this.handleError));
  }

  getUser(userId: string): Observable<any> {
    return this.http
      .get(`${environment.apiBaseUrl}/user/${userId}.json`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {

    return throwError(error);
  }
}
