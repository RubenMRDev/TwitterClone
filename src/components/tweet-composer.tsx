import { ImageIcon, Smile, Calendar, MapPin } from "lucide-react"

export function TweetComposer() {
  return (
    <div className="p-4 border-b border-gray-800">
      <div className="flex gap-4">
        <div className="relative w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
          <img src="/placeholder.svg?height=48&width=48" alt="@usuario" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <textarea
              className="w-full bg-transparent text-xl outline-none resize-none placeholder:text-gray-500"
              placeholder="¿Qué está pasando?"
              rows={3}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 text-blue-500">
              <button className="p-2 rounded-full hover:bg-blue-500/10">
                <ImageIcon className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-blue-500/10">
                <Smile className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-blue-500/10">
                <Calendar className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-blue-500/10">
                <MapPin className="h-5 w-5" />
              </button>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-1 font-bold transition-colors">
              Twittear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
