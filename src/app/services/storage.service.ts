import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private uid: string;

  constructor(private storage: AngularFireStorage,
  ) {
  }

  uploadRecord(path, userUid, name, img): Promise<string> {
    return this.storage.upload(`${path}/${userUid}/${name}`, img)
      .then(task => task.ref.getDownloadURL());
  }

  download(path) {
    return this.storage.ref(path).getDownloadURL();
  }

  deleteRecord(downloadUrl): Promise<string> {
    return this.storage.storage.refFromURL(downloadUrl).delete()
      .then(() => {
        return `Archivo eliminado`;
      })
      .catch(err => {
        return `Error: ${err}`;
      });
  }
}
