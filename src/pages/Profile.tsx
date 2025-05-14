import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { ProfileHeader } from "../components/profile-header"
import { ProfileTabs } from "../components/profile-tabs"
import { Tweet } from "../components/tweet"

interface ProfilePageProps {
  params: {
    username: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params

  // Datos de ejemplo para el perfil
  const profileData = {
    name: "Elon Musk",
    username: "elonmusk",
    bio: "Dueño de X, SpaceX, Tesla, Neuralink, The Boring Company. Trabajando para hacer que la vida sea multiplanetaria.",
    location: "Marte",
    website: "tesla.com",
    joinDate: "Junio 2009",
    following: 178,
    followers: 181500000,
    coverImage: "/placeholder.svg?height=200&width=600",
    profileImage: "/placeholder.svg?height=150&width=150",
  }

  // Tweets de ejemplo
  const tweets = [
    {
      id: 1,
      user: {
        name: profileData.name,
        handle: `@${profileData.username}`,
        avatar: profileData.profileImage,
      },
      content: "La inteligencia artificial transformará el mundo más rápido de lo que pensamos.",
      time: "2h",
      stats: {
        replies: 1024,
        retweets: 5678,
        likes: 45678,
        views: "2.3M",
      },
    },
    {
      id: 2,
      user: {
        name: profileData.name,
        handle: `@${profileData.username}`,
        avatar: profileData.profileImage,
      },
      content: "Los cohetes de SpaceX son reutilizables. Esto reduce drásticamente el costo de acceso al espacio.",
      time: "1d",
      stats: {
        replies: 3456,
        retweets: 12345,
        likes: 98765,
        views: "5.7M",
      },
    },
    {
      id: 3,
      user: {
        name: profileData.name,
        handle: `@${profileData.username}`,
        avatar: profileData.profileImage,
      },
      content: "Tesla está trabajando en robots humanoides. El futuro será interesante.",
      time: "3d",
      stats: {
        replies: 2345,
        retweets: 7890,
        likes: 34567,
        views: "4.1M",
      },
    },
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

        <ProfileHeader profile={profileData} />

        <ProfileTabs />

        <div className="pb-16">
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </div>
    </main>
  )
}
