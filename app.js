import firebase from "firebase/compat/app"
import 'firebase/compat/storage'
import {upload} from './upload.js'


const firebaseConfig = {
    apiKey: "AIzaSyAwKEkz1AkzCar45leOeQ9SJJ3Bu2cicnA",
    authDomain: "fe-upload-41572.firebaseapp.com",
    projectId: "fe-upload-41572",
    storageBucket: "fe-upload-41572.appspot.com",
    messagingSenderId: "367816511383",
    appId: "1:367816511383:web:fe3033c98c45763387fed2"
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()


upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage
            }, error => {
                console.log(error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Download URL', url)
                })
            })
        })
    }
})