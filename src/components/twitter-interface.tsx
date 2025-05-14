import { useState, useEffect } from "react"
import { LeftSidebar } from "./left-sidebar"
import { MainFeed } from "./main-feed"
import { RightSidebar } from "./right-sidebar"
import { MobileNavigation } from "./mobile-navigation"

export function TwitterInterface() {
  const [activeTab, setActiveTab] = useState("home")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar inicialmente
    checkIfMobile()

    // Agregar event listener para cambios de tamaño
    window.addEventListener("resize", checkIfMobile)

    // Limpiar event listener
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <div className="max-w-[100vw] bg-black text-white overflow-x-hidden">
      <div className="flex max-w-full">
        {!isMobile && (
          <aside className="w-64 shrink-0">
            <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </aside>
        )}
        <main className="flex-1 min-w-0 border-x border-gray-800">
          <MainFeed />
        </main>
        {!isMobile && (
          <aside className="w-80 shrink-0">
            <RightSidebar />
          </aside>
        )}
      </div>
      {isMobile && <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  )
}
