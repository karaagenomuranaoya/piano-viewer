import Link from "next/link";

// ここに楽譜リストを定義 (あなたが東京でここを編集してpushすれば増える)
const SCORES = [
  { id: "cat.pdf", title: "猫/DISH" },
  // ここに追加していく
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🎹 お母さんのピアノ楽譜集
      </h1>

      <div className="max-w-2xl mx-auto grid gap-4">
        {SCORES.map((score) => (
          <Link
            key={score.id}
            href={`/scores/${score.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-700">
              {score.title}
            </h2>
          </Link>
        ))}
        
        {SCORES.length === 0 && (
          <p className="text-center text-gray-500">まだ楽譜がありません</p>
        )}
      </div>
    </main>
  );
}