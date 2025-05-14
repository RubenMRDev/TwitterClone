"use client"

import { useState } from "react"

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("tweets")

  const tabs = [
    { id: "tweets", label: "Tweets" },
    { id: "replies", label: "Respuestas" },
    { id: "media", label: "Fotos y videos" },
    { id: "likes", label: "Me gusta" },
  ]

  return (
    <div className="border-b border-gray-800">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 text-center hover:bg-gray-900 transition-colors ${
              activeTab === tab.id ? "font-bold border-b-4 border-blue-500" : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
