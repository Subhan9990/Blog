import { Component, Input , Output , EventEmitter} from '@angular/core';
import { Article }          from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { MatCardModule  } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-article-card',
  standalone : true,
  imports : [CommonModule , MatCardModule , MatIconModule],
  templateUrl: './article-card.component.html',
  styleUrls:   ['./article-card.component.css']
})
export class ArticleCardComponent {
  @Input() article!: Article;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Article>();
  onDelete(){
    this.delete.emit(this.article.id);
  }
  onEdit(){
    this.edit.emit(this.article);
  }
}