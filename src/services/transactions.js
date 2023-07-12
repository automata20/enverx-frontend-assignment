import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase.config';

const transactionsCollectionRef = collection(db, 'transactions');

export const getTransactionsList = async () => {
  try {
    const data = await getDocs(transactionsCollectionRef);
    const filteredData = data.docs.map((d) => ({ ...d.data(), id: d.id }));
    console.log(filteredData);
  } catch (err) {
    console.error(err);
  }
};

export const onSubmitTransaction = async (data) => {
  try {
    await addDoc(transactionsCollectionRef, {
      ...data
      // amount: '1000',
      // category: 'Grociers',
      // created_at: 'this',
      // type: 'EXPENSE'
      // userId: auth?.currentUser?.uid
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteTransaction = async (id) => {
  try {
    const transactionDoc = doc(db, 'transactions', id);
    await deleteDoc(transactionDoc);
  } catch (err) {
    console.error(err);
  }
};

export const updateTransaction = async (id, data) => {
  try {
    const transactionDoc = doc(db, 'transactions', id);
    await updateDoc(transactionDoc, {
      ...data
    });
  } catch (err) {
    console.error(err);
  }
};
