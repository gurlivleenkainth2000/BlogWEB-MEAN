import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private dialog: MatDialog,
    private snackbar: MatSnackBar
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
    let formData = await this.dialog.open(BlogDialogComponent, { data: { obj: null }, panelClass: ['col-12', 'col-sm-4'] }).afterClosed().toPromise();
    console.log(formData);
    if(formData != null && formData != undefined) {
      this.http.post(`${environment.serverUrl}/blogs`, formData)
        .subscribe(response => {
          console.log(response);
          // this.getBlog();
          if(response['code'] == 200) {
            this.snackbar.open(response['message'], '', {
              duration: 2500,
              panelClass: ['alert', 'alert-success']
            });
            this.getBlog();
          }
          if(response['code'] == 500) {
            this.snackbar.open(response['message'], '', {
              duration: 2500,
              panelClass: ['alert', 'alert-warning']
            })
          }
        });
    }

  }

  async updateBlog(blogObj: Blog) {
    let formData = await this.dialog.open(BlogDialogComponent, { data: { obj: blogObj }, panelClass: ['col-12', 'col-sm-6'] }).afterClosed().toPromise();
    console.log(formData);
    if(formData != null && formData != undefined) {
      this.http.put(`${environment.serverUrl}/blogs/${blogObj._id}`, formData)
        .subscribe(response => {
          console.log(response);
          // this.getBlog();
          if(response['code'] == 200) {
            this.snackbar.open(response['message'], '', {
              duration: 2500,
              panelClass: ['alert', 'alert-success']
            });
            this.getBlog();
          }
          if(response['code'] == 500) {
            this.snackbar.open(response['message'], '', {
              duration: 2500,
              panelClass: ['alert', 'alert-warning']
            })
          }
        });
    }
  }

  deleteBlog(blogId) {
    this.http.delete(`${environment.serverUrl}/blogs/${blogId}`)
      .subscribe(response => {
        if(response['code'] == 200) {
          this.snackbar.open(response['message'], '', {
            duration: 2500,
            panelClass: ['alert', 'alert-success']
          });
          this.getBlog();
        }
        if(response['code'] == 500) {
          this.snackbar.open(response['message'], '', {
            duration: 2500,
            panelClass: ['alert', 'alert-danger']
          })
        }
      })
  }

}
