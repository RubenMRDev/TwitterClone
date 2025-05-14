import { MapPin, Calendar, LinkIcon } from "lucide-react"

interface ProfileHeaderProps {
  profile: {
    name: string
    username: string
    bio: string
    location: string
    website: string
    joinDate: string
    following: number
    followers: number
    coverImage: string
    profileImage: string
  }
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div>
      {/* Imagen de portada */}
      <div className="h-48 bg-gray-800 relative">
        <img src={profile.coverImage || "/placeholder.svg"} alt="Portada" className="w-full h-full object-cover" />

        {/* Foto de perfil */}
        <div className="absolute -bottom-16 left-4 border-4 border-black rounded-full">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700">
            <img
              src={profile.profileImage || "/placeholder.svg"}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end p-4">
        <button className="border border-gray-600 text-white px-4 py-1.5 rounded-full font-bold hover:bg-gray-900">
          Seguir
        </button>
      </div>

      {/* Información del perfil */}
      <div className="px-4 pt-6 pb-3">
        <h1 className="font-bold text-xl">{profile.name}</h1>
        <p className="text-gray-500">@{profile.username}</p>

        <p className="my-3">{profile.bio}</p>

        <div className="flex flex-wrap gap-y-1 text-gray-500 text-sm mt-3">
          {profile.location && (
            <div className="flex items-center mr-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{profile.location}</span>
            </div>
          )}

          {profile.website && (
            <div className="flex items-center mr-4">
              <LinkIcon className="h-4 w-4 mr-1" />
              <a href={`https://${profile.website}`} className="text-blue-500 hover:underline">
                {profile.website}
              </a>
            </div>
          )}

          {profile.joinDate && (
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Se unió en {profile.joinDate}</span>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-3 text-sm">
          <div>
            <span className="font-bold">{formatNumber(profile.following)}</span>{" "}
            <span className="text-gray-500">Siguiendo</span>
          </div>
          <div>
            <span className="font-bold">{formatNumber(profile.followers)}</span>{" "}
            <span className="text-gray-500">Seguidores</span>
          </div>
        </div>
      </div>
    </div>
  )
}
