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
    <div className="w-80 p-4 space-y-4 sticky top-0 h-screen overflow-y-auto overflow-x-hidden shrink-0">
      <div className="sticky top-0 pt-1 pb-3 bg-black">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar en Twitter"
            className="w-full bg-gray-800 text-white rounded-full pl-10 pr-4 py-2 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold text-white">Tendencias</h2>
        <ul className="space-y-3">
          {trends.map((trend) => (
            <li key={trend.id} className="text-gray-400">
              <p className="text-sm">{trend.category}</p>
              <p className="text-white font-bold">{trend.title}</p>
              <p className="text-sm">{trend.tweets} Tweets</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
