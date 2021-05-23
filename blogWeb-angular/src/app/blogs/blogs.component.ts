import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Blog } from '../classes/blog';
import { BlogDialogComponent } from '../entryComponents/blog-dialog/blog-dialog.component';
import { DbHttpService } from '../services/db-http.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs: Blog[] = [];
  serverUrl: string = environment.serverUrl;

  constructor(
    private dbHttp: DbHttpService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getBlog();

  }

  getBlog() {
    this.dbHttp.getBlog();
    this.dbHttp.blogsList.subscribe(response => {
      this.blogs = response
    })
    // this.http.get(`${environment.serverUrl}/blogs`)
    //   .subscribe((response: Blog[]) => {
    //     console.log(response);
    //   })
  }

  completeUrl(imageUrl) {
    let url = environment.serverUrl + '/' + imageUrl;
    return url;
  }

  addComment(blog: Blog) {
    this.router.navigate(['blogs', blog._id], { state: { ...blog } })
  }

  async addNewBlog() {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');

    let formData = await this.dialog.open(BlogDialogComponent, { data: { obj: null }, panelClass: ['col-12', 'col-sm-4'] }).afterClosed().toPromise();
    if (formData != null && formData != undefined) {
      let data: any = new FormData();
      data.append("title", formData['title']);
      data.append("description", formData['description']);
      data.append("published", formData['published']);
      data.append("archived", formData['archived']);
      data.append("userId", formData['userId']);
      data.append("username", formData['username']);
      if (formData['imageUrl'] != null) data.append("imageUrl", formData['imageUrl'], formData['imageUrl']['name']);

      this.http.post(`${environment.serverUrl}/blogs`, data, { headers: headers })
        .subscribe(response => {
          // console.log(response);
          if (response['code'] == 200) {
            this.snackbar.open(response['message'], '', {
              duration: 2500,
              panelClass: ['alert', 'alert-success']
            });
            this.getBlog();
          }
          if (response['code'] == 500) {
            this.snackbar.open(response['message'], '', {
              duration: 2500,
              panelClass: ['alert', 'alert-warning']
            })
          }
        });
    }

  }

  // async updateBlog(blogObj: Blog) {
  //   let formData = await this.dialog.open(BlogDialogComponent, { data: { obj: blogObj }, panelClass: ['col-12', 'col-sm-6'] }).afterClosed().toPromise();
  //   console.log(formData);
  //   if (formData != null && formData != undefined) {
  //     this.http.put(`${environment.serverUrl}/blogs/${blogObj._id}`, formData)
  //       .subscribe(response => {
  //         console.log(response);
  //         // this.getBlog();
  //         if (response['code'] == 200) {
  //           this.snackbar.open(response['message'], '', {
  //             duration: 2500,
  //             panelClass: ['alert', 'alert-success']
  //           });
  //           this.getBlog();
  //         }
  //         if (response['code'] == 500) {
  //           this.snackbar.open(response['message'], '', {
  //             duration: 2500,
  //             panelClass: ['alert', 'alert-warning']
  //           })
  //         }
  //       });
  //   }
  // }

  // deleteBlog(blogId) {
  //   this.http.delete(`${environment.serverUrl}/blogs/${blogId}`)
  //     .subscribe(response => {
  //       if (response['code'] == 200) {
  //         this.snackbar.open(response['message'], '', {
  //           duration: 2500,
  //           panelClass: ['alert', 'alert-success']
  //         });
  //         this.getBlog();
  //       }
  //       if (response['code'] == 500) {
  //         this.snackbar.open(response['message'], '', {
  //           duration: 2500,
  //           panelClass: ['alert', 'alert-danger']
  //         })
  //       }
  //     })
  // }

}
