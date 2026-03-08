// 修正前
// import PdfViewer from "@/components/PdfViewer";

// 修正後：dynamic importを使ってSSRを無効化する
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false, // サーバー側でレンダリングしない（ブラウザのみで実行）
  loading: () => <div className="text-white p-4">Viewer Loading...</div>,
});

export default async function ScorePage({ params }: { params: { filename: string } }) {
  // ...中身は同じ
  const filename = decodeURIComponent(params.filename);
  
  return (
    <main>
       <PdfViewer file={`/scores/${filename}`} />
    </main>
  );
}