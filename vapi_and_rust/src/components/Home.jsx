import React, { useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import Vapi from "@vapi-ai/web";

const Home = () => {
  const [username, setUsername] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [vapi, setVapi] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
      const utterance = new SpeechSynthesisUtterance(
        `Hello ${storedName}, welcome!`
      );
      speechSynthesis.speak(utterance);
    }

    const client = new Vapi("1cb375cb-4e3d-4d02-9c8f-20b74a165c7a");
    setVapi(client);

    return () => client?.stop();
  }, []);

  const handleMicClick = () => {
    if (!vapi) return;
    setIsRecording((prev) => {
      const next = !prev;
      if (next) {
        vapi.start("82538a5f-22d0-4389-9fe1-d5faa8a7209a");
      } else {
        vapi.stop();
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      
      {/* Left Side - Glassmorphic Panel */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full animate-fadeIn">
          <h1 className="text-4xl font-extrabold mb-4 text-center">
            Welcome,{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {username || "Guest"}
            </span>
            !
          </h1>
          <p className="text-gray-300 text-center mb-6">
            Your AI assistant is ready to chat. Click the mic and start talking!
          </p>

          <div className="flex flex-col items-center">
            <button
              onClick={handleMicClick}
              className={`p-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-yellow-400/40 ${
                isRecording
                  ? "bg-red-500 animate-pulse hover:shadow-red-400/40"
                  : "bg-green-500 hover:shadow-green-400/40"
              }`}
            >
              <FaMicrophone size={48} />
            </button>

            <p className="mt-4 text-lg italic text-gray-400">
              {isRecording
                ? "🎙️ Listening to you..."
                : "Tap the mic to talk to Vapi AI"}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image with Gradient Overlay */}
      <div className="w-full items-center justify-center flex h-screen md:w-1/2 relative">
        <img
          src="/tom.png"
          alt="AI Assistant"
          className="lg:h-[400px] w-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>
    </div>
  );
};

export default Home;
