import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { DocumentModel } from 'src/app/models/document/document';
import { DocumentLookup } from 'src/app/models/document/document-lookup';
import { tap } from 'rxjs/operators';
import { Attribute } from 'src/app/models/document/attribute';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  apiURL = 'http://localhost:8191/';
  messages: Message[];

  private messageInUser = new BehaviorSubject(this.messages);
  currentMessageInUser = this.messageInUser.asObservable();
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  changeMessageInUser(status: string, message: string) {
    let messages: Message[] = [];
    if (status === 'success') {
      messages.push({ severity: 'success', summary: 'Success', detail: message });
      this.messageInUser.next(messages);
    }
    else {
      messages.push({ severity: 'error', summary: 'Error', detail: message });
      this.messageInUser.next(messages);
    }
  }

  clearMessageInUser() {
    this.messageInUser.next([]);
  }

  addDocument(doc: DocumentModel) {
    return this.http.post(this.apiURL + '/document/', JSON.stringify(doc), this.httpOptions).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  getDocList() {
    return this.http.get(this.apiURL + 'document/list');
  }

  getTypeName() {
    return this.http.get(this.apiURL + 'document/attribute/name');
  }

  updateDoc(docId: string, doc: DocumentModel) {
    return this.http.put(this.apiURL + 'document/' + docId, JSON.stringify(doc), this.httpOptions).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  addCriteria(docId: string, doc: {}) {
    return this.http.post(this.apiURL + 'document/' + docId + '/attribute', JSON.stringify(doc), this.httpOptions)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        })
      );
  }

  updateCriteriaByUUID(docId: string, docAttId: string, att: Attribute) {
    return this.http.put(this.apiURL + 'document/' + docId + '/attribute/' + docAttId,
      JSON.stringify(att), this.httpOptions).pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  getKnockoutById(docId: string): Observable<DocumentModel> {
    return this.http.get<DocumentModel>(this.apiURL + 'document/' + docId);
  }

  getDocumentAttributeById(docId: string, docAttId: string): Observable<Attribute> {
    return this.http.get<Attribute>(this.apiURL + 'document/' + docId + '/attribute/' + docAttId);
  }

  getDocById(docId: string) {
    return this.http.get(this.apiURL + 'document/' + docId);
  }

  getListDocumentName() {
    return this.http.get(this.apiURL + 'document/head');
  }

}
