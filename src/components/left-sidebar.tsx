import { Link, useNavigate } from "react-router-dom"
import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal, Twitter, Settings, LogOut } from 'lucide-react'
import { useAuth } from "../lib/contexts/auth-context"
import { useState, useEffect } from "react"

interface LeftSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function LeftSidebar({ activeTab, setActiveTab }: LeftSidebarProps) {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  
  const handleLogout = async () => {
    try {
      await logout()
      setShowMenu(false)
      // Redirigir al usuario a la página de login después de cerrar sesión
      navigate('/login')
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }
  
  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showMenu && event.target instanceof HTMLElement && !event.target.closest('.user-menu-container')) {
        setShowMenu(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])
  
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
      </button>        <div className="mt-auto relative user-menu-container">
          <Link 
            to={`/profile/${currentUser?.displayName || currentUser?.email?.split('@')[0] || 'usuario'}`} 
            className="p-3 flex items-center gap-3 rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
              {currentUser?.photoURL ? (
                <img 
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || "Usuario"} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-500">
                  <User className="text-white h-6 w-6" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate">{currentUser?.displayName || "Usuario"}</p>
              <p className="text-gray-500 truncate">
                @{currentUser?.email?.split('@')[0] || "usuario"}
              </p>
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setShowMenu(!showMenu);
              }}
              className="p-2 rounded-full hover:bg-gray-700"
            >
              <Settings className="h-5 w-5 text-gray-400" />
            </button>
          </Link>
            {showMenu && (
            <div className="absolute bottom-full mb-2 right-0 w-48 bg-black border border-gray-800 rounded-lg shadow-lg overflow-hidden z-10 animate-fadeIn">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 p-3 hover:bg-gray-800 text-left text-white transition-colors"
              >
                <LogOut className="h-5 w-5 text-red-500" />
                <span>Salir de sesión</span>
              </button>
            </div>
          )}</div>
    </div>
  )
}
