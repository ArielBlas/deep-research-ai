import QnA from "@/components/ui/deep-research/QnA";
import UserInput from "@/components/ui/deep-research/UserInput";
import Image from "next/image";
import bg from "../../public/background.jpg";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start gap-8 py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="fixed top-0 left-0 w-full h-full object-cover -z-10 bg-black/30">
          <Image
            src={bg}
            alt="Deep Research Ai Agent"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <h1 className="text-8xl font-bold font-dancing-script italic bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Deep Research
        </h1>
        <p className="text-gray-600 text-center">
          Enter a topic and answer a few questions to generate a comprehensive
          research report
        </p>
      </div>

      <UserInput />
      <QnA />
    </main>
  );
}
