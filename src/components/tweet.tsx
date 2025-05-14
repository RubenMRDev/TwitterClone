import { MessageCircle, Repeat2, Heart, BarChart2, Share } from "lucide-react"

interface TweetProps {
  tweet: {
    id: number
    user: {
      name: string
      handle: string
      avatar: string
    }
    content: string
    time: string
    stats: {
      replies: number
      retweets: number
      likes: number
      views: string
    }
  }
}

export function Tweet({ tweet }: TweetProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="p-4 border-b border-gray-800 hover:bg-gray-900/50 transition-colors cursor-pointer max-w-full">
      <div className="flex gap-3 max-w-full">
        <div className="relative w-12 h-12 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
          <img
            src={tweet.user.avatar || "/placeholder.svg"}
            alt={tweet.user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center gap-1">
            <span className="font-bold hover:underline truncate">{tweet.user.name}</span>
            <span className="text-gray-500 truncate">{tweet.user.handle}</span>
            <span className="text-gray-500 flex-shrink-0">·</span>
            <span className="text-gray-500 hover:underline flex-shrink-0">{tweet.time}</span>
          </div>
          <p className="mt-1 text-[15px] break-words">{tweet.content}</p>

          <div className="flex justify-between mt-3 text-gray-500 max-w-full">
            <button className="flex items-center gap-1 group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 group-hover:text-blue-500">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span>{formatNumber(tweet.stats.replies)}</span>
            </button>
            <button className="flex items-center gap-1 group">
              <div className="p-2 rounded-full group-hover:bg-green-500/10 group-hover:text-green-500">
                <Repeat2 className="h-5 w-5" />
              </div>
              <span>{formatNumber(tweet.stats.retweets)}</span>
            </button>
            <button className="flex items-center gap-1 group">
              <div className="p-2 rounded-full group-hover:bg-pink-500/10 group-hover:text-pink-500">
                <Heart className="h-5 w-5" />
              </div>
              <span>{formatNumber(tweet.stats.likes)}</span>
            </button>
            <button className="flex items-center gap-1 group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 group-hover:text-blue-500">
                <BarChart2 className="h-5 w-5" />
              </div>
              <span>{tweet.stats.views}</span>
            </button>
            <button className="p-2 rounded-full hover:bg-blue-500/10 hover:text-blue-500">
              <Share className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
