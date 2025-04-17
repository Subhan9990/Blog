import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../services/firestore.service';
import { Observable } from 'rxjs';
import { Article } from '../../models/article.model';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { RouterModule, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    RouterModule,
    MatProgressSpinnerModule,
    CommonModule,
    ArticleCardComponent,
    LoadingSpinnerComponent
  ],
  providers: [FirestoreService]
})
export class HomeComponent implements OnInit {
  articles!: Observable<Article[]>;
  blogList: Article[] = [];

  constructor(private fs: FirestoreService, private router: Router) {}

  ngOnInit(): void {
    this.articles = this.fs.getArticles();
    this.articles.subscribe(data => {
      this.blogList = data;
    });
  }

  updateArticle(article: Article) {
    this.router.navigate(['/create'],{
      state:{article}
    });
  }

  deleteArticle(id: string){
    this.fs.deleteArticle(id).then(()=>{
      this.blogList=this.blogList.filter(article => article.id !== id);
      console.log('Article deleted');

    });
    console.log('Delete failed');
  }
}