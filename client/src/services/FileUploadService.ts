// import axios from 'axios';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { useState } from 'react';
// import { SERVER_URL } from '../constants/serverUrl';
// import storage from '../utils/Firebase';

// const upload = (e: any): any => {
//   const [percent, setPercent] = useState(0.0);
//   e.preventDefault();
//   const file = e.target[0]?.files[0];

//   if (!file) {
//     alert('Please provide a file');
//     return;
//   }
//   const storageRef = ref(storage, `/files/${file.name}`);
//   const uploadTask = uploadBytesResumable(storageRef, file);

//   uploadTask.on(
//     'state_changed',
//     (snapshot) => {
//       const progress = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );
//       setPercent(progress);
//     },
//     (error) => {
//       console.log(error);
//     },
//     () => {
//       //download URL
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log(downloadURL);
//       });
//     }
//   );
//   // update progress
// };

export default {};
