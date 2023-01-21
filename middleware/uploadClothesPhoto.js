const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { initializeApp } = require("firebase/app");
const { getStorage, uploadBytes, ref } = require("firebase/storage");

const uploadClothesPhotos = (fieldName) => {
  return async (req, res, next) => {
    upload.array(fieldName)(req, res, async (err) => {
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
        const files = req.files;
        if (!files) {
          return next();
        }
        const images = [];
        for (let file of files) {
          const imageRef = ref(storage, file.originalname);
          const url = await uploadBytes(imageRef, file.buffer);
          images.push(url);
        }
        req.body.images = images;
        next();
      } catch (error) {
        return next(error);
      }
    });
  };
};

module.exports = uploadClothesPhotos;
