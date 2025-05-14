import { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { createOrUpdateUser } from '../firebase/user-service';

interface AuthContextValue {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<any>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthContextValue;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  async function signup(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Guardar la información del usuario en Firestore
      await createOrUpdateUser(result.user);
      return result;
    } catch (error) {
      console.error("Error al crear cuenta:", error);
      throw error;
    }
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      // Solución para manejar problemas de COOP
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      
      // Intentar guardar/actualizar información del usuario, pero no bloquear la autenticación si falla
      try {
        await createOrUpdateUser(result.user);
      } catch (firestoreError) {
        console.warn("No se pudo guardar el perfil en Firestore, pero la autenticación fue exitosa:", firestoreError);
        // Seguimos adelante con la autenticación aunque falle Firestore
      }
      
      return result;
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      throw error;
    }
  }
  async function logout() {
    try {
      // Asegurándonos de que se limpia correctamente la sesión
      await signOut(auth);
      // Podríamos limpiar cualquier otro estado de la aplicación aquí si es necesario
      return true;
    } catch (error) {
      console.error("Error durante el cierre de sesión:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    loginWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}