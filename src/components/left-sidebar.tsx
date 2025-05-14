import { Link } from "react-router-dom"
import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal, Twitter, Settings } from 'lucide-react'

interface LeftSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function LeftSidebar({ activeTab, setActiveTab }: LeftSidebarProps) {
  const menuItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "explore", label: "Explorar", icon: Search },
    { id: "notifications", label: "Notificaciones", icon: Bell },
    { id: "messages", label: "Mensajes", icon: Mail },
    { id: "bookmarks", label: "Guardados", icon: Bookmark },
    { id: "profile", label: "Perfil", icon: User },
    { id: "more", label: "Más opciones", icon: MoreHorizontal },
  ]

  return (
    <div className="w-64 border-r border-gray-800 p-4 flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="mb-4 p-2">
        <Twitter className="h-8 w-8 text-white" />
      </div>
      
      <nav className="space-y-2 mb-8">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (            <Link
              key={item.id}
              to="#"
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 p-3 rounded-full hover:bg-gray-800 transition-colors ${
                activeTab === item.id ? "font-bold" : ""
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xl">{item.label}</span>
            </Link>
          )
        })}
      </nav>
      
      <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-4 w-full text-lg font-bold transition-colors">
        Twittear
      </button>
      
      <div className="mt-auto p-3 flex items-center gap-3 rounded-full hover:bg-gray-800 cursor-pointer">
        <div className="relative w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
          <img 
            src="/placeholder.svg?height=40&width=40" 
            alt="@usuario" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold truncate">Usuario</p>
          <p className="text-gray-500 truncate">@usuario</p>
        </div>
        <Settings className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  )
}
