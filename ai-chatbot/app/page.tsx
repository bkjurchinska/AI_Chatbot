import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <Image
        src="/tomato-smiling.png"
        alt="pomodoro-logo"
        width={250}
        height={250}
      ></Image>
      <h1 className="text-2xl font-bold mb-4">Welcome to Pomodoro AI</h1>
      <p className="text-gray-400">
        Select a conversation from the sidebar or start a new chat :))
      </p>
    </div>
  );
}
