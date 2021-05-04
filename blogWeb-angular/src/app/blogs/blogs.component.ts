import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Blog } from '../classes/blog';
import { BlogDialogComponent } from '../entryComponents/blog-dialog/blog-dialog.component';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs: Blog[] = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBlog();

  }

  getBlog() {
    this.http.get(`${environment.serverUrl}/blogs`)
      .subscribe((response: Blog[]) => {
        console.log(response);
        this.blogs = response
      })
  }

  async addNewBlog() {
    let formData = await this.dialog.open(BlogDialogComponent, { panelClass: ['col-12', 'col-sm-4'] }).afterClosed().toPromise();
    console.log(formData);
    this.http.post(`${environment.serverUrl}/blogs`, formData)
    .subscribe(response => {
      console.log(response);
      this.getBlog();
      // if(response['code'] == 200) {
      // }
    });

  }

}
