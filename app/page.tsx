"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Typ für Spieler
type Spieler = {
  name: string;
  nummer: string;
  image: string;
};

// Spielerdaten direkt in der Komponente mit lokalen Bildpfaden
const kader: Spieler[] = [
  {
    name: "NICO MANTL",
    nummer: "58",
    image: "/images/NICO_MANTL_58.png",
  },
  {
    name: "THOMAS TURNER",
    nummer: "24",
    image: "/images/THOMAS_TURNER_24.png",
  },
  {
    name: "KEVIN RADULOVIC",
    nummer: "31",
    image: "/images/KEVIN_RADULOVIC_31.png",
  },
  {
    name: "VALENTIN OELZ",
    nummer: "13",
    image: "/images/VALENTIN_OELZ_13.png",
  },
  {
    name: "FABIO VARESI-STRAUSS",
    nummer: "2",
    image: "/images/FABIO_VARESISTRAUSS_2.png",
  },
  {
    name: "MANUEL MARANDA",
    nummer: "15",
    image: "/images/MANUEL_MARANDA_15.png",
  },
  {
    name: "ALEM PASIC",
    nummer: "17",
    image: "/images/ALEM_PASIC_17.png",
  },
  {
    name: "MARTIN MOORMANN",
    nummer: "16",
    image: "/images/MARTIN_MOORMANN_16.png",
  },
  {
    name: "ELIAS BAKATUKANDA",
    nummer: "4",
    image: "/images/ELIAS_BAKATUKANDA_4.png",
  },
  {
    name: "MATTHIAS WETSCHKA",
    nummer: "32",
    image: "/images/MATTHIAS_WETSCHKA_32.png",
  },
  {
    name: "DAVID BUMBERGER",
    nummer: "23",
    image: "/images/DAVID_BUMBERGER_23.png",
  },
  {
    name: "DAVID RIEGLER",
    nummer: "22",
    image: "/images/DAVID_RIEGLER_22.png",
  },
  {
    name: "CHEICK CONDÉ",
    nummer: "26",
    image: "/images/CHEICK_COND_26.png",
  },
  {
    name: "ISAK DAHLQVIST",
    nummer: "5",
    image: "/images/ISAK_DAHLQVIST_5.png",
  },
  {
    name: "DOMINIK REITER",
    nummer: "29",
    image: "/images/DOMINIK_REITER_29.png",
  },
  {
    name: "MAMADOU „DOUMS“ FOFANA",
    nummer: "6",
    image: "/images/MAMADOU_DOUMS_FOFANA_6.png",
  },
  {
    name: "CHRISTOPHER CVETKO",
    nummer: "14",
    image: "/images/CHRISTOPHER_CVETKO_14.png",
  },
  {
    name: "FELIX GERSTMAYER",
    nummer: "21",
    image: "/images/FELIX_GERSTMAYER_21.png",
  },
  {
    name: "OLIVER WÄHLING",
    nummer: "8",
    image: "/images/OLIVER_WHLING_8.png",
  },
  {
    name: "ANDERSON DOS SANTOS GOMES",
    nummer: "28",
    image: "/images/ANDERSON_DOS_SANTOS_GOMES_28.png",
  },
  {
    name: "JOAO LUIZ SOARES",
    nummer: "11",
    image: "/images/JOAO_LUIZ_SOARES_11.png",
  },
  {
    name: "ALEXANDER BRIEDL",
    nummer: "19",
    image: "/images/ALEXANDER_BRIEDL_19.png",
  },
  {
    name: "SIMON PIRKL",
    nummer: "60",
    image: "/images/SIMON_PIRKL_60.png",
  },
  {
    name: "SHON WEISSMAN",
    nummer: "18",
    image: "/images/SHON_WEISSMAN_18.png",
  },
  {
    name: "NICO MAIER",
    nummer: "30",
    image: "/images/NICO_MAIER_30.png",
  },
  {
    name: "JAKOB KNOLLMÜLLER",
    nummer: "7",
    image: "/images/JAKOB_KNOLLMLLER_7.png",
  },
  {
    name: "THOMAS GOIGINGER",
    nummer: "27",
    image: "/images/THOMAS_GOIGINGER_27.png",
  },
  {
    name: "SIMON SEIDL",
    nummer: "20",
    image: "/images/SIMON_SEIDL_20.png",
  },
  {
    name: "RONIVALDO BERNARDO SALES",
    nummer: "9",
    image: "/images/RONIVALDO_BERNARDO_SALES_9.png",
  },
  {
    name: "PAUL MENSAH",
    nummer: "10",
    image: "/images/PAUL_MENSAH_10.png",
  },
];

export default function Home() {
  const [spieler, setSpieler] = useState<Spieler | null>(null);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [gamePhase, setGamePhase] = useState<"image" | "guess" | "result">(
    "image",
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Initialisiere mit zufälligem Spieler
  useEffect(() => {
    if (kader.length > 0) {
      const randomSpieler = kader[Math.floor(Math.random() * kader.length)];
      setSpieler(randomSpieler);
      generateGuesses(randomSpieler.name);
      setLoading(false);
    }
  }, []);

  // Erzeuge 4 Möglichkeiten inklusive des richtigen Namens
  const generateGuesses = (correctName: string) => {
    const allNames = kader.map((spieler) => spieler.name);
    const uniqueNames = [...new Set(allNames)];

    // Entferne den richtigen Namen aus der Liste der möglichen Antworten
    const possibleGuesses = uniqueNames.filter((name) => name !== correctName);

    // Wähle zufällig 3 weitere Namen aus
    const shuffled = [...possibleGuesses].sort(() => 0.5 - Math.random());
    const randomGuesses = shuffled.slice(0, 3);

    // Füge den richtigen Namen hinzu
    const allGuesses = [...randomGuesses, correctName].sort(
      () => 0.5 - Math.random(),
    );

    setGuesses(allGuesses);
  };

  const handleGuess = (guess: string) => {
    if (selectedGuess !== null) return; // Verhindere mehrfache Auswahl

    setSelectedGuess(guess);
    const isCorrect = guess === spieler?.name;
    setCorrect(isCorrect);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setGamePhase("result");
  };

  const handleNextQuestion = () => {
    if (kader.length > 0) {
      const randomSpieler = kader[Math.floor(Math.random() * kader.length)];
      setSpieler(randomSpieler);
      generateGuesses(randomSpieler.name);
      setSelectedGuess(null);
      setCorrect(null);
      setGamePhase("image");
    }
  };

  const resetGame = () => {
    if (kader.length > 0) {
      const randomSpieler = kader[Math.floor(Math.random() * kader.length)];
      setSpieler(randomSpieler);
      generateGuesses(randomSpieler.name);
      setSelectedGuess(null);
      setCorrect(null);
      setScore(0);
      setGamePhase("image");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <p className="text-lg">Lade Spielerdaten...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold mb-2">💙🤍 Linz Kader Quiz</h1>
          <p className="text-xl mb-8">Punkte: {score}</p>
        </div>

        {spieler ? (
          <div className="flex flex-col items-center w-full">
            {/* Spiel-Phase: Nur Bild anzeigen */}
            {gamePhase === "image" && (
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-64 h-64 mb-6">
                  <Image
                    src={spieler.image}
                    alt={spieler.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <p className="text-lg mb-4">Wer ist das?</p>
                <button
                  onClick={() => setGamePhase("guess")}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Antworten anzeigen
                </button>
              </div>
            )}

            {/* Spiel-Phase: Antwortmöglichkeiten anzeigen */}
            {gamePhase === "guess" && (
              <div className="flex flex-col items-center mb-8 w-full">
                <div className="relative w-64 h-64 mb-6">
                  <Image
                    src={spieler.image}
                    alt={spieler.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-6">Wer ist das?</h2>
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {guesses.map((guess, index) => (
                    <button
                      key={index}
                      onClick={() => handleGuess(guess)}
                      disabled={selectedGuess !== null}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        selectedGuess === guess
                          ? correct
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {guess}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Spiel-Phase: Ergebnis anzeigen */}
            {gamePhase === "result" && (
              <div className="flex flex-col items-center mb-8 w-full">
                <div className="relative w-64 h-64 mb-6">
                  <Image
                    src={spieler.image}
                    alt={spieler.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {correct ? "✅ Richtig!" : "❌ Leider falsch!"}
                  </h2>
                  <p className="text-xl">
                    {correct
                      ? "Super gemacht!"
                      : `Die richtige Antwort ist: ${spieler.name}`}
                  </p>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Nächster Spieler
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-lg">Keine Spielerdaten verfügbar</p>
        )}

        <button
          onClick={resetGame}
          className="mt-8 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Spiel zurücksetzen
        </button>
      </main>
    </div>
  );
}
