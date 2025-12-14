import { useState, useEffect } from "react";
import noxCharacter from "@/assets/nox-character.png";
import owlAudio1 from "@/assets/owl-audio-1.mp3";
import owlAudio2 from "@/assets/owl-audio-2.mp3";

export default function NoxOwl() {
  const [greeting, setGreeting] = useState("");
  const [noxMessage, setNoxMessage] = useState("");
  const [showMessage, setShowMessage] = useState(true);
  const [isHooting, setIsHooting] = useState(false);

  // Owl sound texts to display when audio plays
  const owlSounds = [
    "Hoo... Hoo...",
    "Hoot hoot! 🦉",
    "Whoo... whoo...",
    "Hoo-hoo-hoo...",
  ];

  // Set greeting and message based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
      setNoxMessage("Ready to start your reading journey today?");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
      setNoxMessage("Perfect time for some quiet reading...");
    } else {
      setGreeting("Good Evening");
      setNoxMessage("Let's unwind with a good book tonight.");
    }

    // Show message after brief delay
    const timer = setTimeout(() => setShowMessage(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Ambient owl sound effect
  useEffect(() => {
    const audio1 = new Audio(owlAudio1);
    const audio2 = new Audio(owlAudio2);
    audio1.volume = 0.3;
    audio2.volume = 0.3;

    const playRandomOwlSound = () => {
      const randomAudio = Math.random() > 0.5 ? audio1 : audio2;
      randomAudio.currentTime = 0;

      // Show hooting message when audio plays
      setIsHooting(true);
      setShowMessage(true);

      randomAudio.play().catch((err) => {
        console.log("Audio autoplay prevented:", err);
      });

      // Hide hooting message after 3 seconds
      setTimeout(() => {
        setIsHooting(false);
      }, 3000);
    };

    const scheduleNextSound = () => {
      const minInterval = 20_000; // 20 seconds
      const maxInterval = 60_000; // 1 minute
      const randomInterval =
        Math.random() * (maxInterval - minInterval) + minInterval;

      return setTimeout(() => {
        playRandomOwlSound();
        timeoutId = scheduleNextSound();
      }, randomInterval);
    };

    // Start first sound after 10-30 seconds delay
    const initialDelay = Math.random() * 20000 + 10000;
    let timeoutId = setTimeout(() => {
      playRandomOwlSound();
      timeoutId = scheduleNextSound();
    }, initialDelay);

    // Cleanup on unmount
    return () => {
      clearTimeout(timeoutId);
      audio1.pause();
      audio2.pause();
    };
  }, []);

  return (
    <div className="nox-house">
      <div className="house-background">
        <div className="moon">🌙</div>
        <div className="stars">
          <span className="star">✨</span>
          <span className="star">✨</span>
          <span className="star">✨</span>
        </div>

        {/* Nox Character */}
        <div className="nox-container">
          <img src={noxCharacter} alt="Nox the Owl" className="nox-character" />

          {/* Speech Bubble */}
          {showMessage && (
            <div
              className="speech-bubble"
              onClick={() => setShowMessage(false)}
            >
              {isHooting ? (
                <>
                  <div
                    className="greeting-text"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {
                      owlSounds[Math.floor(Math.random() * owlSounds.length)]
                    }
                  </div>
                </>
              ) : (
                <>
                  <div className="greeting-text">{greeting}! 🦉</div>
                  <div className="message-text">{noxMessage}</div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Perch/Branch */}
        <div className="perch"></div>
      </div>

      {/* Welcome Text */}
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to Your Reading Space</h1>
        <p className="welcome-subtitle">Nox is here to guide your journey</p>
      </div>
    </div>
  );
}
