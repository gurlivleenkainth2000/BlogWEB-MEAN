import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog } from '../classes/blog';

@Injectable({
  providedIn: 'root'
})
export class DbHttpService {

  blogsList = new BehaviorSubject<Blog[]>([]);

  constructor(
    private http: HttpClient
  ) { }


  getBlog() {
    this.http.get(`${environment.serverUrl}/blogs`)
      .subscribe((response: Blog[]) => {
        // console.log(response);
        this.blogsList.next(response);
      })
  }
}
