import { collection, getDocs, getDoc,  query, where , addDoc , updateDoc , doc , serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchShopsByFloor(floorId) {
  const q = query(
    collection(db, "shops"),
    where("floorId", "==", floorId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function fetchProductsByShop(shopId) {
  const q = query(
    collection(db, "products"),
    where("shopId", "==", shopId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function fetchProductsByFloor(floorId) {
  const q = query(
    collection(db, "products"),
    where("floorId", "==", floorId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
export async function fetchFloors() {
  const snapshot = await getDocs(collection(db, "floor"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
export async function fetchShops() {
  const snapshot = await getDocs(collection(db, "shops"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
export async function fetchProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function fetchUsers() {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
export async function createShopAndAssignMerchant(data) {
  const shopRef = await addDoc(collection(db, "shops"), {
    ...data,
    createdAt: serverTimestamp()
  });

  await updateDoc(doc(db, "users", data.merchantId), {
    shopId: shopRef.id
  });

  return { id: shopRef.id, ...data };
}


export async function fetchShopByMerchantId(merchantId) {
  const q = query(
    collection(db, "shops"),
    where("merchantId", "==", merchantId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function updateShop(shopId, data) {
  await updateDoc(doc(db, "shops", shopId), data);
}


export async function createFloor(data) {
  const FloorRef = await addDoc(collection(db, "floor"), {
    ...data,
    createdAt: serverTimestamp()
  });



  return { id: FloorRef.id, ...data };
}



export async function promoteToMerchant(userId) {
  await updateDoc(doc(db, "users", userId), {
    role: "merchant"
  });
}


export async function fetchProductsById(id) {
  const snap = await getDoc(doc(db, "products", id));

  if (!snap.exists()) {
    return null;
  }

  return {
    id: snap.id,
    ...snap.data()
  };
}

export async function fetchShopById(id) {
  const snap = await getDoc(doc(db, "shops", id));

  if (!snap.exists()) {
    return null;
  }

  return {
    id: snap.id,
    ...snap.data()
  };
}

export async function fetchMerchantById(id) {
  const snap = await getDoc(doc(db, "users", id));

  if (!snap.exists()) {
    return null;
  }

  return {
    id: snap.id,
    ...snap.data()
  };
}