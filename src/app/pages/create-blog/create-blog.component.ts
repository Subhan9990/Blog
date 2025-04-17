import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-blog.component.html',
  styleUrls : ['./create-blog.component.css'],
  providers : [FirestoreService]
})
export class CreateBlogComponent {
  blog = {
    title: '',
    id: '',
    content: '',
    imageUrl: '',
    createdAt: Timestamp.now(),
  };

  constructor(private fs: FirestoreService) {}

  submitBlog() {
    this.fs.addArticle(this.blog).then(() => {
      alert('Blog created!');
    });
  }
}