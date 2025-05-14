import { Home, Search, Bell, Mail } from "lucide-react"
import { Link } from "react-router-dom"

interface MobileNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function MobileNavigation({ activeTab, setActiveTab }: MobileNavigationProps) {
  const navItems = [
    { id: "home", icon: Home },
    { id: "explore", icon: Search },
    { id: "notifications", icon: Bell },
    { id: "messages", icon: Mail },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around py-3 z-50">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center space-y-1 text-sm ${
              activeTab === item.id ? "text-white" : "text-gray-400"
            }`}
          >
            <Icon className="w-6 h-6" />
          </button>
        )
      })}
    </div>
  )
}
