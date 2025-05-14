import { Search } from "lucide-react"

export function RightSidebar() {
  const trends = [
    { id: 1, category: "Tendencia en España", title: "#ReactJS", tweets: "25.4K" },
    { id: 2, category: "Deportes · Tendencia", title: "Champions League", tweets: "124K" },
    { id: 3, category: "Tecnología · Tendencia", title: "Inteligencia Artificial", tweets: "98.2K" },
    { id: 4, category: "Política · Tendencia", title: "Elecciones 2024", tweets: "45.7K" },
    { id: 5, category: "Entretenimiento", title: "#NuevaTemporada", tweets: "32.1K" },
  ]

  const suggestions = [
    { id: 1, name: "Mark Zuckerberg", handle: "@zuck", avatar: "/placeholder.svg?height=48&width=48" },
    { id: 2, name: "Satya Nadella", handle: "@satyanadella", avatar: "/placeholder.svg?height=48&width=48" },
    { id: 3, name: "Sundar Pichai", handle: "@sundarpichai", avatar: "/placeholder.svg?height=48&width=48" },
  ]

  return (
    <div className="w-80 p-4 space-y-4 sticky top-0 h-screen overflow-y-auto">
      <div className="sticky top-0 pt-1 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Buscar en Twitter"
            className="bg-gray-800 w-full pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-black"
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-4">
        <h2 className="font-bold text-xl mb-4">Qué está pasando</h2>
        {trends.map((trend) => (
          <div key={trend.id} className="py-3 hover:bg-gray-700/30 rounded-lg cursor-pointer px-2">
            <p className="text-xs text-gray-500">{trend.category}</p>
            <p className="font-bold">{trend.title}</p>
            <p className="text-xs text-gray-500">{trend.tweets} Tweets</p>
          </div>
        ))}
        <button className="text-blue-500 hover:bg-gray-700/30 w-full text-left p-3 rounded-lg mt-1">Mostrar más</button>
      </div>

      <div className="bg-gray-800 rounded-2xl p-4">
        <h2 className="font-bold text-xl mb-4">A quién seguir</h2>
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="flex items-center justify-between py-3 hover:bg-gray-700/30 rounded-lg px-2"
          >
            <div className="flex items-center">
              <div className="relative w-12 h-12 rounded-full bg-gray-700 overflow-hidden mr-3">
                <img
                  src={suggestion.avatar || "/placeholder.svg"}
                  alt={suggestion.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold leading-tight">{suggestion.name}</p>
                <p className="text-gray-500 text-sm">{suggestion.handle}</p>
              </div>
            </div>
            <button className="bg-white text-black hover:bg-gray-200 rounded-full font-bold text-sm px-4 py-1 transition-colors">
              Seguir
            </button>
          </div>
        ))}
        <button className="text-blue-500 hover:bg-gray-700/30 w-full text-left p-3 rounded-lg mt-1">Mostrar más</button>
      </div>

      <div className="text-xs text-gray-500 flex flex-wrap gap-2 px-4">
        <a href="#" className="hover:underline">
          Términos de Servicio
        </a>
        <a href="#" className="hover:underline">
          Política de Privacidad
        </a>
        <a href="#" className="hover:underline">
          Política de cookies
        </a>
        <a href="#" className="hover:underline">
          Accesibilidad
        </a>
        <a href="#" className="hover:underline">
          Información de anuncios
        </a>
        <a href="#" className="hover:underline">
          Más opciones
        </a>
        <span>© 2025 X Corp.</span>
      </div>
    </div>
  )
}
