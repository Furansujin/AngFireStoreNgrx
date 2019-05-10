import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import {FirebaseListObservable} from "@angular/fire/database-deprecated";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

declare var firebase: any;

interface Image {
  path: string;
  filename: string;
  downloadURL?: string;
  $key?: string;
}

@Component({
  selector: 'image-upload',
  template: `
    <input type="file" (change)="uploadFile($event)">
  `
})
export class UploadComponent {
  /**
   * The name of the folder for images
   * eg. posts/angular-is-awesome
   */
  @Input() folder: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  uploadProgress: Observable<number>;

  constructor(private storage: AngularFireStorage) { }


  uploadFile(event) {
    // this.storage.upload('/up', event.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    this.ref = this.storage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          console.log(url); // <-- do what ever you want with the url..
        });
      }))
      .subscribe();
    // this.uploadProgress =  this.task.percentageChanges();
    // this.downloadURL = this.ref.getDownloadURL()
  }
}
