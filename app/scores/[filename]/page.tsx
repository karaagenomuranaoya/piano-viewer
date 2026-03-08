import dynamic from "next/dynamic";

// SSR無効化設定はそのまま
const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
  loading: () => <div className="text-white p-4">Viewer Loading...</div>,
});

// ★修正ポイント: params の型定義を Promise に変更
interface Props {
  params: Promise<{ filename: string }>;
}

export default async function ScorePage(props: Props) {
  // ★修正ポイント: await で中身を取り出す
  const params = await props.params;
  
  const filename = decodeURIComponent(params.filename);
  
  return (
    <main>
       <PdfViewer file={`/scores/${filename}`} />
    </main>
  );
}