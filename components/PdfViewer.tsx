"use client";

import { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// ★修正ポイント: Next.js環境における最新の公式推奨ワーカー設定
// import.meta.url を使うことで、Webpackが自動でワーカーファイルをバンドルしてくれます
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface Props {
  file: string;
}

export default function PdfViewer({ file }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(800);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const changePage = useCallback((offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPage = prevPageNumber + offset;
      return Math.max(1, Math.min(newPage, numPages));
    });
  }, [numPages]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // JSX部分はそのまま変更なし
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white overflow-hidden">
      <div className="fixed inset-0 z-10 flex">
        <div 
          className="w-1/2 h-full cursor-w-resize" 
          onClick={() => changePage(-1)}
        />
        <div 
          className="w-1/2 h-full cursor-e-resize" 
          onClick={() => changePage(1)}
        />
      </div>

      <div className="z-0 mt-4">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-white text-xl">楽譜を読み込み中...</div>}
          error={<div className="text-red-500">読み込みエラー</div>}
        >
          <Page 
            pageNumber={pageNumber} 
            width={windowWidth > 1000 ? 1000 : windowWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading=""
          />
        </Document>
      </div>

      <div className="fixed bottom-4 right-4 z-20 bg-black/50 px-4 py-2 rounded-full text-sm">
        {pageNumber} / {numPages || "--"}
      </div>
      
      <a href="/" className="fixed top-4 left-4 z-20 bg-black/50 px-4 py-2 rounded text-sm hover:bg-black/80">
        ← 一覧へ
      </a>
    </div>
  );
}