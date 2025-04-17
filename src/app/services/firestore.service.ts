import { collectionData, Firestore, collection , addDoc , updateDoc , deleteDoc , doc , DocumentData } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';
import { inject , Injectable } from '@angular/core';


@Injectable({
  providedIn : 'root'
})
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
  };
  updateArticle(id:string , updatedData : any){
        const docRef = doc(this.firestore ,'Blog', id);
        return updateDoc(docRef , updatedData);
  };
  deleteArticle(id: string){
    const docRef = doc(this.firestore ,'Blog',id);
    return deleteDoc(docRef);
  };
}