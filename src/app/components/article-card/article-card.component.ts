import { Component, Input } from '@angular/core';
import { Article }          from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-article-card',
  standalone : true,
  imports : [CommonModule , MatCardModule],
  templateUrl: './article-card.component.html',
  styleUrls:   ['./article-card.component.css']
})
export class ArticleCardComponent {
  @Input() article!: Article;
}