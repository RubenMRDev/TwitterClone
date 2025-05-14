import { 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { firestore } from './firebase';

// Interfaz para el modelo de usuario en Firestore
export interface UserProfile {
  uid: string;
  displayName: string | null;
  username: string;
  email: string | null;
  photoURL: string | null;
  bio: string;
  location: string;
  website: string;
  joinDate: any; // Timestamp
  following: number;
  followers: number;
  coverImage: string;
  createdAt: any; // Timestamp
  updatedAt: any; // Timestamp
}

// Crear o actualizar un usuario en Firestore
export const createOrUpdateUser = async (user: User): Promise<void> => {
  try {
    // Verificar si el usuario está autenticado antes de intentar acceder a Firestore
    if (!user || !user.uid) {
      console.warn("No hay un usuario autenticado para guardar en Firestore");
      return;
    }
    
    const userRef = doc(firestore, 'users', user.uid);
    
    try {
      // Intentar obtener el documento del usuario
      const userDoc = await getDoc(userRef);
      
      const currentDate = serverTimestamp();
      const username = user.email ? user.email.split('@')[0] : user.uid.substring(0, 8);
      
      if (!userDoc.exists()) {
        // Si el usuario no existe, crear un nuevo documento
        const newUser: UserProfile = {
          uid: user.uid,
          displayName: user.displayName || username,
          username: username,
          email: user.email,
          photoURL: user.photoURL,
          bio: "No bio yet",
          location: "Not specified",
          website: "",
          joinDate: currentDate,
          following: 0,
          followers: 0,
          coverImage: "/placeholder.svg?height=200&width=600",
          createdAt: currentDate,
          updatedAt: currentDate
        };
        
        // Intentar crear el documento
        await setDoc(userRef, newUser);
        console.log("Usuario creado en Firestore:", user.uid);
      } else {
        // Si el usuario ya existe, solo actualizamos los campos que podrían haber cambiado
        await setDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          updatedAt: currentDate
        }, { merge: true });
        
        console.log("Usuario actualizado en Firestore:", user.uid);
      }
    } catch (docError) {
      console.error("Error de permisos o problema al acceder a Firestore:", docError);
      // No reenviamos el error para que la autenticación pueda continuar
    }
  } catch (error) {
    console.error("Error al crear/actualizar usuario en Firestore:", error);
    // No reenviamos el error para que la autenticación pueda continuar
  }
};

// Obtener el perfil de un usuario por su ID
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(firestore, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    } else {
      console.log(`No se encontró el usuario con ID: ${uid}`);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el perfil de usuario:", error);
    throw error;
  }
};

// Obtener el perfil de un usuario por su nombre de usuario
export const getUserByUsername = async (username: string): Promise<UserProfile | null> => {
  try {
    // Nota: Esta es una implementación simple. En una aplicación real,
    // necesitarías crear un índice en Firestore para buscar por username.
    // Aquí simplificamos, pero no es eficiente para bases de datos grandes.
    const userRef = doc(firestore, 'users', 'by-username', username);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    } else {
      console.log(`No se encontró el usuario con username: ${username}`);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el usuario por username:", error);
    throw error;
  }
};
