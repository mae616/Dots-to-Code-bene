var admin = require("firebase-admin");

var serviceAccount = require("../_config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

const seed = () => {
    const users = [
        {
            email: "test@example.com",
            password: "password",
            displayName: "しほ",
            photoURL: "https://placehold.jp/3d4070/ffffff/150x150.png",
        },
        {
            email: "test2@example.com",
            password: "password",
            displayName: "まい",
            photoURL: "https://placehold.jp/de79ec/ffffff/150x150.png",
            
        },
    ];
    const registeredUsers = users.map((user) => {
        
        auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            user.updateProfile({
                displayName: user.displayName,
                photoURL: user.photoURL,
            }).then(() => {
                // Update successful
                return user;
                // ...
            }).catch((error) => {
                console.log(error);
            });
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });
    });

    const tags = [
        {
            text: "がんばりを褒めたい",
        },
        {
            text: "感謝を伝えたい",
        },
        {
            text: "気持ちを褒めたい",
        },
    ];
    let tagDocRef = [];
    tags.forEach( async (tag) => {
        const docRef = await addDoc(collection(db, "tags"), tag);
        console.log("tags", docRef);
        tagDocRef.push(docRef);
    }).then(() => {
        console.log("tags", tagDocRef);
    });

    const toCategory = [
        {
            text: "娘",
        },
        {
            text: "息子",
        },
        {
            text: "友達",
        }
    ];
    let toCategoryDocRef = [];
    toCategory.forEach( async (category) => {
        const docRef = await addDoc(collection(db, "to_categories"), category);
        console.log("toCategory", docRef);
        toCategoryDocRef.push(docRef);
    }).then(() => {
        console.log("toCategory", toCategoryDocRef);
    });

    const compliments = [
        {
            user_id: registeredUsers[0].uuid,
            to_name: "なおちゃん",
            to_category: toCategoryDocRef[0].uuid,
            body: "なおちゃんはいつも笑顔で、みんなを元気にしてくれる。",
            thoughts: "もっともっとみんなに知ってもらいたい。",
            tags: [tagDocRef[0].uuid, tagDocRef[1].uuid],
            message: "いつもありがとう！",
            count_of_likes: 1,
            count_of_comments: 2,

            created_at: Timestamp.fromDate(new Date()),
        },
        {
            user_id: registeredUsers[1].uuid,
            to_name: "しほちゃん",
            to_category: toCategoryDocRef[0].uuid,
            body: "しほちゃんはいつも笑顔で、みんなを元気にしてくれる。",
            thoughts: "もっともっとみんなに知ってもらいたい。",
            tags: [tagDocRef[0].uuid, tagDocRef[1].uuid, tagDocRef[3].uuid],
            message: "いつもありがとう！",
            count_of_likes: 0,
            count_of_comments: 0,
            created_at: Timestamp.fromDate(new Date()),
        }
    ];
    compliments.forEach((compliment) => {
        addDoc(collection(db, "compliments"), compliment);
    });

    const likes = [
        {
            user_id: registeredUsers[1].uuid,
            compliment_id: compliments[0].uuid,
            created_at: Timestamp.fromDate(new Date()),
        }
    ];
    likes.forEach((like) => {
        addDoc(collection(db, "likes"), like);
    });

    const comments = [
        {
            user_id: registeredUsers[1].uuid,
            compliment_id: compliments[0].uuid,
            body: "いいですねーーー！",
            created_at: Timestamp.fromDate(new Date()),
        },
        {
            user_id: registeredUsers[0].uuid,
            compliment_id: compliments[0].uuid,
            body: "ありがとうございます！",
            created_at: Timestamp.fromDate(new Date()),
        }
    ];
}
