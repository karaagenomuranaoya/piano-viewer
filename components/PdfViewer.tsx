"use client";

import { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// PDFワーカーの設定 (CDNを使うのが一番安定して早いです)
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";


interface Props {
  file: string;
}

export default function PdfViewer({ file }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(800);

  // ウィンドウサイズに合わせてPDFの幅を調整（レスポンシブ対応）
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // 初期実行
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // ページめくり機能
  const changePage = useCallback((offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPage = prevPageNumber + offset;
      // 範囲外に行かないように制限
      return Math.max(1, Math.min(newPage, numPages));
    });
  }, [numPages]);

  // キーボード操作対応 (スペース/右矢印で進む、左矢印で戻る)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowRight") {
        event.preventDefault(); // スクロール防止
        changePage(1);
      } else if (event.code === "ArrowLeft") {
        changePage(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changePage]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* クリックエリア (透明なオーバーレイ) */}
      <div className="fixed inset-0 z-10 flex">
        {/* 左半分クリックで戻る */}
        <div 
          className="w-1/2 h-full cursor-w-resize" 
          onClick={() => changePage(-1)}
          title="前のページへ"
        />
        {/* 右半分クリックで進む */}
        <div 
          className="w-1/2 h-full cursor-e-resize" 
          onClick={() => changePage(1)}
          title="次のページへ"
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
            width={windowWidth > 1000 ? 1000 : windowWidth} // 最大幅制限
            renderTextLayer={false} // ★軽量化: テキスト選択無効
            renderAnnotationLayer={false} // ★軽量化: リンク等無効
            loading="" // ページ切替時のチラつき防止のため空文字
          />
        </Document>
      </div>

      {/* ページ番号表示 */}
      <div className="fixed bottom-4 right-4 z-20 bg-black/50 px-4 py-2 rounded-full text-sm">
        {pageNumber} / {numPages || "--"}
      </div>
      
      {/* 戻るボタン */}
      <a href="/" className="fixed top-4 left-4 z-20 bg-black/50 px-4 py-2 rounded text-sm hover:bg-black/80">
        ← 一覧へ
      </a>
    </div>
  );
}