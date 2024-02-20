import { Injectable, WritableSignal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'src/firebase';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private snackBar: MatSnackBar) {}

  add(
    file: any,
    signal: WritableSignal<any>,
    loading: WritableSignal<boolean>,
    isArray?: boolean
  ) {
    loading.set(true);
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        this.snackBar.open(error.message, 'close');
        loading.set(false);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (isArray && isArray === true) {
            signal.update((value) => [...value, downloadURL]);
            loading.set(false);
          } else {
            signal.set(downloadURL);
            loading.set(false);
          }
        });
      }
    );
  }
}
