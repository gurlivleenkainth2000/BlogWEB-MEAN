import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogsComponent } from './blogs/blogs.component';

const routes: Routes = [
  { path: '', redirectTo: 'blogs', pathMatch: 'full' },
  { path: 'blogs/:blogId', component: BlogDetailsComponent },
  { path: 'blogs', component: BlogsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
