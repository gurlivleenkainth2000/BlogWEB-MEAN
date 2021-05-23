import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Blog } from '../classes/blog';
import { BlogDialogComponent } from '../entryComponents/blog-dialog/blog-dialog.component';
import { DbHttpService } from '../services/db-http.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  blogId: string;
  blogObj: Blog;
  serverUrl: string = environment.serverUrl;

  commentForm: FormGroup;
  commentsList: Comment[] = [];

  constructor(
    private fb: FormBuilder,
    private dbHttp: DbHttpService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(response => this.blogId = response['blogId']);

    this.dbHttp.getBlog();
    this.dbHttp.blogsList.subscribe(response => {
      if (response.length != 0) {
        this.blogObj = response.find(x => x._id == this.blogId);
        this.commentForm = this.fb.group({
          message: [null, Validators.required],
          blogId: [this.blogObj._id],
          username: [this.blogObj.username],
          userId: [this.blogObj.userId]
        });
        this.getComments(this.blogObj._id);
      }
    })
  }

  getComments(blogId) {
    this.http.get(`${environment.serverUrl}/comments/${blogId}`)
      .subscribe((response: Comment[]) => {
        console.log(response);
        this.commentsList = response;
      })
  }


  commented(form: FormGroup) {
    let comment = { ...form.value };
    if (comment['message'] == null) {
      return;
    }
    this.http.post(`${environment.serverUrl}/comments`, comment)
      .subscribe(response => {
        console.log(response);
        // this.getBlog();
        if (response['code'] == 200) {
          this.snackbar.open(response['message'], '', {
            duration: 2500,
            panelClass: ['alert', 'alert-success']
          });
          this.dbHttp.getBlog();
          this.getComments(this.blogObj._id);
        }
        if (response['code'] == 500) {
          this.snackbar.open(response['message'], '', {
            duration: 2500,
            panelClass: ['alert', 'alert-warning']
          })
        }
      });

  }

  async updateBlog(blogObj: Blog) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');

    let formData = await this.dialog.open(BlogDialogComponent, { data: { obj: blogObj }, panelClass: ['col-12', 'col-sm-6'] }).afterClosed().toPromise();
    // console.log(formData);

    if (formData != null && formData != undefined) {
      let data: any = new FormData();
      data.append("title", formData['title']);
      data.append("description", formData['description']);
      data.append("published", formData['published']);
      data.append("archived", formData['archived']);
      data.append("userId", formData['userId']);
      data.append("username", formData['username']);
      if (typeof formData['imageUrl'] != "string" && formData['imageUrl'] != null) {
        data.append("imageUrl", formData['imageUrl'], formData['imageUrl']['name'])
      }
      if (typeof formData['imageUrl'] == "string" && formData['imageUrl'] != null) {
        data.append("imageUrl", formData['imageUrl'])
      }

      this.http.patch(`${environment.serverUrl}/blogs/${blogObj._id}`, data, { headers: headers })
        .subscribe(response => {
          console.log(response);
          // this.getBlog();
          if (response['code'] == 200) {
            this.snackbar.open(response['message'], '', {
              duration: 2500,
              panelClass: ['alert', 'alert-success']
            });
            this.dbHttp.getBlog();
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

  getPara(description: string) {
    return description.split(/\n/g).map(e => e).filter(e => e != "");
  }

  deleteBlog(blogId) {
    this.http.delete(`${environment.serverUrl}/blogs/${blogId}`)
      .subscribe(response => {
        if (response['code'] == 200) {
          this.snackbar.open(response['message'], '', {
            duration: 2500,
            panelClass: ['alert', 'alert-success']
          });
          this.dbHttp.getBlog();
          this.location.back();
        }
        if (response['code'] == 500) {
          this.snackbar.open(response['message'], '', {
            duration: 2500,
            panelClass: ['alert', 'alert-danger']
          })
        }
      })
  }

}
