import { collectionData, Firestore, collection } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { map } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';
import { inject } from '@angular/core';

export class FirestoreService {
  private firestore = inject(Firestore);

  getArticles() {
    const articlesRef = collection(this.firestore, 'Blog');
    return collectionData(articlesRef, { idField: 'id' }).pipe(
      map((articles: any[]) =>
        articles.map((article) => ({
          ...article,
          createdAt: article.createdAt?.seconds
            ? new Timestamp(article.createdAt.seconds, article.createdAt.nanoseconds).toDate()
            : null,
        }))
      )
    );
  }

  addArticle(article: any) {
    const articlesRef = collection(this.firestore, 'Blog');
    return addDoc(articlesRef, article);
  }
}