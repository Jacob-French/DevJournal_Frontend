export default function TipsFrame({ tips }){

  return (
    <div className="p-3">
      {tips && tips.map((tip, id) => (
        <button key={id} className={`
          font-[Poppins] text-sm text-space-700 cursor-pointer mb-[var(--sd-gap-small)]
          bg-transparent hover:bg-space-300 border-1 border-transparent
          hover:border-space-400 rounded-lg px-2 py-1 w-full text-left
        `}>
          {tip.title}
        </button>
      ))}
    </div>
  )
}