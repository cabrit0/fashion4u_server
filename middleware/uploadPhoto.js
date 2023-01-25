const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { initializeApp } = require("firebase/app");
const { getStorage, uploadBytes, ref } = require("firebase/storage");

function fileUploadAndFirebase(fieldName) {
  return async (req, res, next) => {
    upload.single(fieldName)(req, res, async (err) => {
      if (err) {
        return next(err);
      }
      //firebaseConfig
      const firebaseConfig = {
        apiKey: process.env.FIREBASE_APIKEY,
        authDomain: process.env.FIREBASE_AUTHDOMAIN,
        projectId: process.env.FIREBASE_PROJECTID,
        storageBucket: process.env.FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
        appId: process.env.FIREBASE_APIID,
        measurementId: process.env.FIREBASE_MEASUREMENTID,
      };
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      // Initialize Cloud Storage and get a reference to the service
      const storage = getStorage(app);
      // Assign the Firebase app and storage objects to the request object
      req.firebase = { app, storage };
      try {
        const file = req.file;
        //console.log(file);
        const imageRef = ref(storage, file.originalname);
        const metatype = {
          contentType: file.mimetype,
          name: file.originalname,
        };
        await uploadBytes(imageRef, file.buffer, metatype)
          .then(async (snapshot) => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
              imageRef._location.bucket
            }/o/${encodeURIComponent(imageRef._location.path_)}?alt=media`;
            req.avatar = publicUrl;
            //console.log(req.avatar);
            next();
          })
          .catch((error) => next(error));
      } catch (err) {
        next(err);
      }
    });
  };
}

module.exports = fileUploadAndFirebase;
