import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { ProfileHeader } from "../components/profile-header"
import { ProfileTabs } from "../components/profile-tabs"
import { Tweet } from "../components/tweet"
import { useAuth } from "../lib/contexts/auth-context"
import { getUserProfile } from "../lib/firebase/user-service"
import type { UserProfile } from "../lib/firebase/user-service"

export default function ProfilePage() {
  const { username } = useParams()
  const { currentUser } = useAuth()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Verificar si el perfil corresponde al usuario actual
  const isCurrentUserProfile = username === (currentUser?.displayName || currentUser?.email?.split('@')[0])
  
  // Determinar el usuario a mostrar
  const currentUsername = username || (currentUser?.displayName || currentUser?.email?.split('@')[0] || "usuario")
  
  useEffect(() => {
    async function fetchUserProfile() {
      setLoading(true)
      
      try {
        if (currentUser) {
          const profile = await getUserProfile(currentUser.uid)
          setUserProfile(profile)
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUserProfile()
  }, [currentUser])
  
  // Datos del perfil basados en el usuario desde Firestore o valores predeterminados
  const profileData = {
    name: userProfile?.username || currentUsername,
    username: userProfile?.displayName || (isCurrentUserProfile ? 
      (currentUser?.displayName || currentUser?.email?.split('@')[0] || currentUsername) : 
      currentUsername.toLowerCase().replace(/\s/g, '')),
    bio: userProfile?.bio || "No bio yet",
    location: userProfile?.location || "Not specified",
    website: userProfile?.website || "",
    joinDate: "Mayo 2025",
    following: userProfile?.following || 0,
    followers: userProfile?.followers || 0,
    coverImage: userProfile?.coverImage || "/placeholder.svg?height=200&width=600",
    profileImage: userProfile?.photoURL || (isCurrentUserProfile && currentUser?.photoURL ? 
      currentUser.photoURL : 
      "/placeholder.svg?height=150&width=150"),
  }
  // Tweets de ejemplo - adaptados para mostrar tweets genéricos o personalizados
  const tweets = isCurrentUserProfile ? [
    {
      id: 1,
      user: {
        name: profileData.name,
        handle: `@${profileData.username}`,
        avatar: profileData.profileImage,
      },
      content: "¡Hola Twitter! Este es mi primer tweet en esta plataforma. Estoy emocionado de comenzar a compartir.",
      time: "2h",
      stats: {
        replies: 0,
        retweets: 0,
        likes: 0,
        views: "0",
      },
    }
  ] : [
    {
      id: 1,
      user: {
        name: profileData.name,
        handle: `@${profileData.username}`,
        avatar: profileData.profileImage,
      },
      content: "Este perfil aún no ha publicado ningún tweet.",
      time: "1h",
      stats: {
        replies: 0,
        retweets: 0,
        likes: 0,
        views: "0",
      },
    }
  ]
  return (
    <main className="min-h-screen bg-black text-white w-full">
      <div className="w-full max-w-screen-xl mx-auto lg:max-w-full" style={{ overflowX: 'clip' }}>
        <div className="border-b border-gray-800">
          <div className="p-4 flex items-center gap-6">
            <Link to="/" className="p-2 rounded-full hover:bg-gray-800">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-bold text-xl">{profileData.name}</h1>
              <p className="text-gray-500 text-sm">{tweets.length} Tweets</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <ProfileHeader 
              profile={profileData} 
              isCurrentUserProfile={isCurrentUserProfile} 
            />

            <ProfileTabs />

            <div className="pb-16">
              {tweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
