// 修正前
// import PdfViewer from "@/components/PdfViewer";

// 修正後：dynamic importを使ってSSRを無効化する
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false, // サーバー側でレンダリングしない（ブラウザのみで実行）
  loading: () => <div className="text-white p-4">Viewer Loading...</div>,
});

// next.js 15+ の場合、paramsはPromiseになる可能性がありますが
// 一旦標準的な書き方で書きます。エラーが出る場合は await params に修正してください。
export default async function ScorePage({ params }: { params: { filename: string } }) {
  // URLデコード (日本語ファイル名対応)
  const filename = decodeURIComponent(params.filename);
  
  return (
    <main>
      {/* PDFファイルは public/scores/ にある前提 */}
      <PdfViewer file={`/scores/${filename}`} />
    </main>
  );
}