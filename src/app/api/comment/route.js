import { adminDB } from '@/app/_config/server';
import { addDoc, collection, getDoc, getDocs, doc, query, where, deleteDoc, Timestamp, FieldValue } from "firebase-admin/firestore"; 

export async function POST(request) {
    const body = await request.json();
    const { user_id, user_name, compliment_id, body: commentBody } = body;
    try {
        const commentRef = adminDB.collection('comments');
        await commentRef.add({
            user_id: user_id,
            user_name: user_name,
            compliment_id: compliment_id,
            body: commentBody,
            created_at: Timestamp.fromDate(new Date()), 
        });
      } catch (e) {
        return Response.json({
            status: 500,
            body: {
                message: "Error adding comment" + e
            }
        });
      }

      try {
        const complimentsRef = adminDB.collection('compliments');
        const complimentRef = complimentsRef.doc(compliment_id);
        await complimentRef.update({
          count_of_comments: FieldValue.increment(1)
        });
      } catch (e) {
        return Response.json({
            status: 500,
            body: {
                message: "Error adding document" + e
            }
        
        });
      }

    return Response.json({
        status: 200,
        body: {
        message: "POST request was sent"
        }
    });
}

export async function DELETE(request) {
    const body = await request.json();
    const { comment_id, compliment_id } = body;

    try {
        const likesRef = adminDB.collection('comments').doc(comment_id);
        await likesRef.delete();
      } catch (e) {
        return Response.json({
            status: 500,
            body: {
                message: "Error delete document" + e
            }
        });
      }

      try {
        const complimentsRef = adminDB.collection('compliments');
        const complimentRef = complimentsRef.doc(compliment_id);
        await complimentRef.update({
          count_of_comments: FieldValue.increment(-1)
        });
      } catch (e) {
        return Response.json({
            status: 500,
            body: {
                message: "Error delete document" + e
            }
        });
      }

    return Response.json({
        status: 200,
        body: {
        message: "DELETE request was sent"
        }
    });
}
