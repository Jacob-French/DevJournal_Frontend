//Component that lists all topics for the user to browse

import { Topic } from "../items/BaseItems"

export default function TopicManager({ topics }){

  return (
    <div className="border-purple-400 h-full flex flex-col justify-center">
      <div className={`
        flex flex-row flex-wrap gap-5 justify-center items-center content-start p-[var(--sd-gap-small)] pb-10
        text-space-800
      `}>
        {topics && topics.map(topic => (
          <div key={topic.id}>
            <Topic topic={topic} />
          </div>
        ))}
      </div>
    </div>
  )
}