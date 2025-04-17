import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timestamp, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { FirestoreService } from '../../services/firestore.service';
import { FormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
  imports: [FormsModule]
})
export class CreateBlogComponent implements OnInit {
  blog = {
    title: '',
    id: '',
    content: '',
    imageUrl: '',
    createdAt: Timestamp.now()
  };

  constructor(
    private fs: FirestoreService,
    private router: Router,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { article: any };
    if (state?.article) {
      this.blog = { ...state.article };
    }
  }

  async submitBlog() {
    if (this.blog && this.blog.id) {
      const blogRef = doc(this.firestore, 'Blog', this.blog.id);
      const docSnap = await getDoc(blogRef);

      if (docSnap.exists()) {
        updateDoc(blogRef, {
          title: this.blog.title,
          content: this.blog.content,
          imageUrl: this.blog.imageUrl,
          createdAt: this.blog.createdAt
        })
        .then(() => {
          alert('Blog updated successfully!');
          this.router.navigate(['/']);
        })
        .catch(err => {
          console.error('Update failed :', err);
        });
      } else {
        this.blog.createdAt = Timestamp.now();
        setDoc(blogRef, this.blog)
          .then(() => {
            alert('Blog created successfully!');
            this.router.navigate(['/']);
          })
          .catch(error => {
            console.error('Error creating blog :', error);
          });
      }
    }
  }

  deleteBlog() {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.fs.deleteArticle(this.blog.id).then(() => {
        alert('Blog Deleted');
        this.router.navigate(['/']);
      });
    }
  }
}