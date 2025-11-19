import { JaLink, JaLogo } from "./items/BaseItems";

export default function TailwindPlanner(){

  return(
    <>
    <div className="flex flex-row justify-evenly text-space-800">
      <div className="flex flex-col items-center mt-10">
        <h1 className="font-[Montserrat] text-lg font-normal">The quick brown fox</h1>
        <h1 className="font-[Lato] text-lg font-normal">The quick brown fox</h1>
        <h1 className="font-[Poppins] text-lg font-normal">The quick brown fox</h1>
        <h1 className="font-[Inter] text-lg font-normal">The quick brown fox</h1>
        <h1 className="font-space-grotesk text-lg font-normal">The quick brown fox</h1>
        <h1 className="font-[Outfit] text-lg font-normal">The quick brown fox</h1>
        <h1 className="font-league-spartan text-lg font-normal">The quick brown fox</h1>
        <h1 className="font-exo-2 text-lg font-normal">The quick brown fox gG</h1>
        <h1 className="font-[Audiowide] text-xl font-normal">Gravity is gratitude</h1>
      </div>
      <div className="flex flex-col items-center mt-10">
        <h1 className="font-[Montserrat] text-xl font-semibold">The quick brown fox</h1>
        <h1 className="font-[Lato] text-xl font-semibold">The quick brown fox</h1>
        <h1 className="font-[Poppins] text-xl font-semibold">The quick brown fox</h1>
        <h1 className="font-[Inter] text-xl font-semibold">The quick brown fox</h1>
        <h1 className="font-space-grotesk text-xl font-semibold">The quick brown fox</h1>
        <h1 className="font-[Outfit] text-xl font-semibold">The quick brown fox</h1>
        <h1 className="font-league-spartan text-xl font-semibold">The quick brown fox</h1>
        <h1 className="font-exo-2 text-xl font-semibold">Gravity is gratitude</h1>
        <h1 className="font-[Audiowide] text-xl font-semibold">Gravity is gratitude</h1>
      </div>
    </div>
    <div className="p-10">
      <JaLink>Test Link</JaLink>
      <JaLogo />
    </div>
    </>
  )
}