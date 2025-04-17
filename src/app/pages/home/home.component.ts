import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../services/firestore.service';
import { Observable } from 'rxjs';
import { Article } from '../../models/article.model';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // <-- Yeh zaroori hai
import { RouterModule } from '@angular/router';

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
  providers :[FirestoreService]
})
export class HomeComponent {
  articles!: Observable<Article[]>;

  constructor(private fs: FirestoreService) {}

  ngOnInit(): void {
    this.articles = this.fs.getArticles();
  }
}