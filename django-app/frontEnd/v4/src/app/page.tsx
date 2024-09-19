import Image from "next/image";
import {PageSignUp} from "@/components/buttons"

const links = [
  {
    href: "",
    title: "Digitise",
    description: "Bring your employees and clients online",
  },
  {
    href: "",
    title: "Share",
    description: "NFC swap your favorite business",
  },
  {
    href: "",
    title: "Own",
    description: "Keep hold of your clients",
  },
];

const PageWhatWeDo = () => {
  return (
    <div className="my-32 flex justify-center gap-5 max-w-2xl mx-auto">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="w-full group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            {link.title}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            {link.description}
          </p>
        </a>
      ))}
    </div>
  )
}



const PageLanding = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-40 p-14">
      <Image
        src="/logo-one.webp"
        alt="Token"
        width={200}
        height={200}
        className="border rounded-xl"
        priority
      />
      <div className="text-center">
        <div>Revolutionsise your business.</div>
        <div>Digitalize custom card swaps</div>
        </div>
    </main>
  )
}

const UserNotLoggedInPage = () => {
  const getEnv = () => {
    return process.env.NEXT_PUBLIC_BACK_END_URL
  }

  return (
    <div className="home-container">
      <PageLanding />
      <div className="min-h-screen">
        <PageWhatWeDo />
        <PageSignUp />
      </div>
    </div>
  )
}

const UserLoggedInPage = () => {
  return (
    <>
      Hello nobody
    </>
  )
}


export default function Home() {
  return (
    <UserNotLoggedInPage />
    // <UserLoggedInPage />
  );
}
