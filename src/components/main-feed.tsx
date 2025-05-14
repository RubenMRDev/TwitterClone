import { TweetComposer } from "./tweet-composer"
import { Tweet } from "./tweet"

export function MainFeed() {
  // Datos de ejemplo para los tweets
  const tweets = [
    {
      id: 1,
      user: {
        name: "Elon Musk",
        handle: "@elonmusk",
        avatar: "/placeholder.svg?height=48&width=48",
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
        name: "Bill Gates",
        handle: "@BillGates",
        avatar: "/placeholder.svg?height=48&width=48",
      },
      content:
        "La innovación es la clave para resolver los mayores desafíos del mundo. Estamos viendo avances increíbles en energía limpia y salud global.",
      time: "5h",
      stats: {
        replies: 342,
        retweets: 1234,
        likes: 8901,
        views: "1.1M",
      },
    },
    {
      id: 3,
      user: {
        name: "NASA",
        handle: "@NASA",
        avatar: "/placeholder.svg?height=48&width=48",
      },
      content:
        "¡Increíbles imágenes del espacio profundo capturadas por el telescopio James Webb! Estamos descubriendo nuevos secretos del universo cada día.",
      time: "1d",
      stats: {
        replies: 2345,
        retweets: 7890,
        likes: 34567,
        views: "4.5M",
      },
    },
    {
      id: 4,
      user: {
        name: "Tim Cook",
        handle: "@tim_cook",
        avatar: "/placeholder.svg?height=48&width=48",
      },
      content:
        "La tecnología debe mejorar vidas, no solo impresionar. Estamos comprometidos con la accesibilidad y la privacidad en todos nuestros productos.",
      time: "7h",
      stats: {
        replies: 567,
        retweets: 2345,
        likes: 12345,
        views: "1.7M",
      },
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden max-w-full">
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-sm z-10 border-b border-gray-800">
        <div className="p-4 font-bold text-xl">Inicio</div>
        <div className="flex border-b border-gray-800">
          <button className="flex-1 py-4 font-bold text-center hover:bg-gray-900 border-b-4 border-blue-500">
            Para ti
          </button>
          <button className="flex-1 py-4 text-gray-500 text-center hover:bg-gray-900">Siguiendo</button>
        </div>
      </div>

      <TweetComposer />

      <div className="space-y-4 max-w-full">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}
