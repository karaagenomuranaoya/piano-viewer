import PdfViewer from "@/components/PdfViewer";

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