import { Sun, TriangleAlert, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white px-2">
      <h1 className="text-5xl font-bold mb-20">Higgins AI</h1>
      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5 space-y-1">
            <Sun className="h-7 w-7" />
            <h2 className="font-semibold">Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">
              &ldquo;Explain quantum computing in simple terms&rdquo;
            </p>
            <p className="infoText">
              &ldquo;What is the capital of France?&rdquo;
            </p>
            <p className="infoText">
              &ldquo;Whats the difference between a dog and a cat?&rdquo;
            </p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center mb-5 space-y-1">
            <Zap className="h-7 w-7" />
            <h2 className="font-semibold">Capabilities</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">
              Messages are stored securely in chat history
            </p>
            <p className="infoText">
              Strong knowledge of everything, including world and events after
              2021
            </p>
            <p className="infoText">
              Fast and accurate response time, but not always up to date
            </p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center mb-5 space-y-1">
            <TriangleAlert className="h-7 w-7" />
            <h2 className="font-semibold">Limitations</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">
              May occasionally generate incorrect information
            </p>
            <p className="infoText">
              May occasionally produce harmful instructions or biased content
            </p>
            <p className="infoText">
              Limited knowledge of world and events after 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
