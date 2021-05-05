import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Blog } from 'src/app/classes/blog';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.scss']
})
export class BlogDialogComponent implements OnInit {

  blogForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if(this.data['obj'] == null) {
      this.blogForm = this.fb.group({
        title: [""],
        description: [""],
        published: [true],
        archived: [false],
        username: [""],
        userId: [""]
      })
    } else {
      let blog: Blog = this.data['obj'];
      this.blogForm = this.fb.group({
        title: [blog.title],
        description: [blog.description],
        published: [blog.published],
        archived: [blog.archived],
        username: [blog.username],
        userId: [blog.userId]
      })
    }
  }

}
