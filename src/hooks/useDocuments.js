import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestoreDb } from "../firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useDocuments = (tableName) => {
  const [data, setData] = useState(null);

  // Create a new doc
  const createDocument = async (docData, tableName) => {
    try {
      const collectionRef = collection(firestoreDb, `${tableName}`);
      const blog = await addDoc(collectionRef, docData);
      toast.success("Product Added Successfully")
    } catch (error) {
      console.error("Error creating document: ", error);
    }
  };

  // Update an existing doc
  const updateDocument = async (docId, docData, tableName) => {
    try {
      const docRef = doc(firestoreDb, `${tableName}`, docId);
      await updateDoc(docRef, docData);
      console.log("updated successfully");
    } catch (error) {
      console.error("Error updating blog: ", error);
    }
  };

  // Delete a doc
  const deleteDocument = async (docId, tableName) => {
    try {
      const docRef = doc(firestoreDb, `${tableName}`, docId);
      await deleteDoc(docRef);
      console.log("Deleted successfully");
      toast.success("Product Deleted successfully");
    } catch (error) {
      console.error("Error deleting : ", error);
    }
  };

  // Get a single doc
  const getDocument = async (docId, tableName) => {
    try {
      // console.log("Fetching document from:", tableName, "with ID:", docId);

      const docSnap = await getDoc(doc(firestoreDb, tableName, docId));
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching doc: ", error);
    }
  };

  useEffect(() => {
    const collectionRef = collection(firestoreDb, `${tableName}`);

    // Set up the real-time listener
    const unsubscribe = onSnapshot(
      collectionRef,
      (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
        // console.log(`${tableName} data :`, documents);
      },
      (error) => {
        console.error("Error with real-time listener: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    data,
    createDocument,
    getDocument,
    deleteDocument,
    updateDocument,
  };
};
