import React, { useRef, useState, useEffect } from "react";

// SignLanguageTranslator.jsx
// A single-file React component for a sign-language translation UI.
// - Uses TailwindCSS for styling
// - Exposes webcam preview, transcript, live translation result, history, and settings
// - Designed for accessibility and large UI controls for users with hearing impairment
// Note: The actual ML model / ASL recognition is represented as stub functions (placeholders).

export default function SignLanguageTranslator() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [streamActive, setStreamActive] = useState(false);
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [results, setResults] = useState([]); // {text, confidence, timestamp}
    const [language, setLanguage] = useState("Vietnamese");
    const [fontSize, setFontSize] = useState(28);
    const [highContrast, setHighContrast] = useState(true);
    const [history, setHistory] = useState([]);
    const [statusMessage, setStatusMessage] = useState("Sẵn sàng");

    // Accessibility: big focusable control for keyboard users
    useEffect(() => {
        return () => stopCamera();

    }, []);

    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: false });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setStreamActive(true);
                setStatusMessage("Camera bật");
            }
        } catch (err) {
            console.error("Lỗi camera:", err);
            setStatusMessage("Không thể truy cập camera");
        }
    }

    function stopCamera() {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((t) => t.stop());
            if (videoRef.current) videoRef.current.srcObject = null;
            setStreamActive(false);
            setStatusMessage("Camera tắt");
        }
    }

    // Placeholder: capture a frame and send to model
    async function captureAndRecognize() {
        if (!videoRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Normally convert to tensor / image blob, then call ML model or server
        // We'll simulate with a fake async recognizer
        setStatusMessage("Đang phân tích... ");
        const fake = await fakeRecognizer();
        const item = {
            text: fake.text,
            confidence: fake.confidence,
            timestamp: new Date().toISOString(),
        };
        setTranscript(item.text);
        setResults((r) => [item, ...r].slice(0, 20));
        setHistory((h) => [item, ...h]);
        setStatusMessage("Phân tích hoàn thành");
    }

    // Simulate a recognizer. Replace with real model integration.
    function fakeRecognizer() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const examples = [
                    "Xin chào",
                    "Tôi cần giúp đỡ",
                    "Cảm ơn",
                    "Tôi tên là Trung",
                    "Bạn khỏe không",
                    "Tôi muốn đặt lịch hẹn",
                ];
                const pick = examples[Math.floor(Math.random() * examples.length)];
                resolve({ text: pick, confidence: Math.round((0.6 + Math.random() * 0.4) * 100) / 100 });
            }, 700);
        });
    }

    // Toggle live recognition (e.g., run capture periodically)
    useEffect(() => {
        let id;
        if (listening) {
            setStatusMessage("Đang lắng nghe (live)");
            id = setInterval(() => {
                captureAndRecognize();
            }, 1400);
        } else {
            setStatusMessage((s) => (s === "Đang lắng nghe (live)" ? "Tạm dừng" : s));
        }
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listening]);

    function toggleListening() {
        if (!streamActive) startCamera().then(() => setListening((l) => !l));
        else setListening((l) => !l);
    }

    function clearHistory() {
        setHistory([]);
        setResults([]);
        setTranscript("");
    }

    function exportHistory() {
        const csv = history
            .map((h) => `${h.timestamp},"${h.text.replace(/"/g, '""')}",${h.confidence}`)
            .join("\n");
        const blob = new Blob(["timestamp,text,confidence\n" + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sign_history.csv";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold">Phiên dịch ký hiệu</h1>
                    <p className="text-sm opacity-80 mt-1">Giao diện dành cho người khiếm thính — camera, phụ đề, lịch sử và cài đặt</p>
                </div>
                <div className="flex gap-3 items-center">
                    <div className="text-right">
                        <div className="text-xs">Trạng thái</div>
                        <div className="font-medium">{statusMessage}</div>
                    </div>
                    <button
                        onClick={() => {
                            if (streamActive) stopCamera();
                            else startCamera();
                        }}
                        className="rounded-xl px-4 py-2 border shadow-sm hover:shadow-md focus:outline-none focus:ring"
                        aria-pressed={streamActive}
                    >
                        {streamActive ? "Tắt camera" : "Bật camera"}
                    </button>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Video + Controls */}
                <section className="lg:col-span-2 rounded-2xl border p-4 bg-white shadow-sm">
                    <div className="relative rounded-lg overflow-hidden" style={{ background: highContrast ? "#0f172a" : undefined }}>
                        <video
                            ref={videoRef}
                            className="w-full h-64 md:h-96 object-cover bg-black"
                            playsInline
                            muted
                            aria-label="Video cam preview"
                        />
                        <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

                        {/* Big live caption overlay */}
                        <div
                            role="status"
                            aria-live="polite"
                            className={`absolute left-4 right-4 bottom-4 rounded-xl p-3 backdrop-blur-sm bg-white/80 dark:bg-black/60 border`}
                            style={{ fontSize: `${fontSize}px`, textAlign: "center" }}
                        >
                            <div className="font-semibold">{transcript || "Phụ đề sẽ hiển thị ở đây"}</div>
                            <div className="text-xs opacity-70">{results[0]?.confidence ? `Độ tin cậy: ${results[0].confidence}` : ""}</div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="mt-4 flex flex-wrap gap-3 items-center">
                        <button
                            onClick={toggleListening}
                            className="px-4 py-3 rounded-2xl bg-indigo-600 text-white font-medium shadow hover:brightness-105 focus:outline-none focus:ring"
                            aria-pressed={listening}
                        >
                            {listening ? "Tạm dừng" : "Bắt đầu (Live)"}
                        </button>

                        <button
                            onClick={captureAndRecognize}
                            className="px-4 py-3 rounded-2xl border font-medium hover:bg-gray-50 focus:outline-none focus:ring"
                        >
                            Phân tích 1 khung
                        </button>

                        <button onClick={clearHistory} className="px-3 py-2 rounded-xl border" aria-label="Xóa lịch sử">
                            Xóa lịch sử
                        </button>

                        <button onClick={exportHistory} className="px-3 py-2 rounded-xl border" aria-label="Xuất lịch sử">
                            Xuất CSV
                        </button>

                        <div className="ml-auto flex items-center gap-2">
                            <label className="text-sm">Cỡ chữ</label>
                            <input
                                type="range"
                                min={18}
                                max={56}
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                aria-label="Cỡ chữ phụ đề"
                            />
                            <label className="ml-2 flex items-center gap-2">
                                <input type="checkbox" checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} />
                                High contrast
                            </label>
                        </div>
                    </div>

                    {/* Recent results list */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">Kết quả gần đây</h2>
                        <ul className="space-y-2 max-h-48 overflow-y-auto">
                            {results.map((r, i) => (
                                <li key={i} className="p-3 rounded-lg border flex items-center justify-between bg-gray-50">
                                    <div>
                                        <div className="font-medium">{r.text}</div>
                                        <div className="text-xs opacity-70">{r.timestamp} · Độ tin cậy {r.confidence}</div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                setTranscript(r.text);
                                                setStatusMessage("Đã chọn từ lịch sử");
                                            }}
                                            className="px-3 py-1 rounded-lg border"
                                            aria-label={`Chọn kết quả ${i + 1}`}
                                        >
                                            Hiển thị
                                        </button>
                                    </div>
                                </li>
                            ))}
                            {results.length === 0 && <li className="text-sm opacity-60">Chưa có kết quả</li>}
                        </ul>
                    </div>
                </section>

                {/* Right: Settings & History */}
                <aside className="rounded-2xl border p-4 bg-white shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Cài đặt</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm">Ngôn ngữ đầu ra</label>
                            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 w-full rounded-lg border p-2">
                                <option>Vietnamese</option>
                                <option>English</option>
                                <option>Japanese</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm">Tùy chọn nhận diện</label>
                            <div className="mt-2 flex flex-col gap-2">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" /> Luôn hiển thị phụ đề
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" /> Hợp nhất nhiều khung
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm">Phím tắt</label>
                            <ul className="mt-2 text-sm opacity-80">
                                <li><kbd className="px-2 py-1 rounded border">C</kbd> — Phân tích 1 khung</li>
                                <li><kbd className="px-2 py-1 rounded border">L</kbd> — Bật/tắt live</li>
                                <li><kbd className="px-2 py-1 rounded border">S</kbd> — Bật/tắt camera</li>
                            </ul>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <h3 className="text-lg font-semibold mb-2">Lịch sử phiên dịch</h3>
                    <div className="max-h-56 overflow-y-auto space-y-2">
                        {history.length === 0 && <div className="text-sm opacity-60">Chưa có lịch sử</div>}
                        {history.map((h, i) => (
                            <div key={i} className="p-2 rounded-lg border flex justify-between items-start">
                                <div>
                                    <div className="font-medium">{h.text}</div>
                                    <div className="text-xs opacity-70">{new Date(h.timestamp).toLocaleString()}</div>
                                </div>
                                <div className="text-xs opacity-70">{h.confidence}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button onClick={exportHistory} className="px-3 py-2 rounded-xl border">Xuất</button>
                        <button onClick={clearHistory} className="px-3 py-2 rounded-xl border">Xóa</button>
                    </div>
                </aside>
            </main>

            <footer className="mt-6 text-sm opacity-70">Gợi ý: để tích hợp thực tế, thay fakeRecognizer() bằng mô-đun ML (tại client hoặc server) hoặc gọi API nhận diện hình ảnh ký hiệu</footer>
        </div>
    );
}
