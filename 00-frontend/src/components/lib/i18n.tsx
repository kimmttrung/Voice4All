import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Locale = "en" | "vi" | "jp";

type Dict = Record<string, string>;

type I18nContextValue = {
    locale: Locale;
    t: (key: string) => string;
    setLocale: (l: Locale) => void;
};

const dictionaries: Record<Locale, Dict> = {
    en: {
        brand: "Voice4All",
        home: "Home",
        features: "Features",
        about: "About",
        login: "Login",
        signup: "Sign Up",
        cta: "Get Started",
        hero_title: "Voice4All – Connection Without Barriers",
        hero_sub: "Speak, sign, or type. Instant translation to voice, text, or sign avatar.",
        features_title: "What you can do",
        f1: "Voice & text AI chatbot",
        f2: "Sign language translation",
        f3: "Video calls with live captions",
        f4: "Save & search conversation history",
        how_title: "How it works",
        how_1: "Input: text / voice / sign",
        how_2: "AI translates to your target",
        how_3: "Output: text, voice, or sign avatar",
        footer_about: "About",
        footer_contact: "Contact",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms",
    },
    vi: {
        brand: "Voice4All",
        home: "Trang chủ",
        features: "Tính năng",
        about: "Giới thiệu",
        login: "Đăng nhập",
        signup: "Đăng ký",
        cta: "Bắt đầu ngay",
        hero_title: "Voice4All – Kết nối không rào cản",
        hero_sub: "Nói, ký hiệu hoặc nhập liệu. AI dịch tức thời sang giọng nói, văn bản học avatar ký hiệu.",
        features_title: "Bạn có thể làm gì",
        f1: "Chatbot hỗ trợ giọng nói & văn bản",
        f2: "Phiên dịch ngôn ngữ ký hiệu",
        f3: "Video call với phụ đề trực tiếp",
        f4: "Lưu trữ & tra cứu lịch sử hội thoại",
        how_title: "Cách hoạt động",
        how_1: "Nhập: văn bản / giọng nói / ký hiệu",
        how_2: "AI dịch sang định dạng mong muốn",
        how_3: "Hiển thị: văn bản, giọng nói, hoặc avatar ký hiệu",
        footer_about: "Giới thiệu",
        footer_contact: "Liên hệ",
        footer_privacy: "Chính sách riêng tư",
        footer_terms: "Điều khoản",
    },
    jp: {
        brand: "Voice4All",
        home: "ホーム",
        features: "機能",
        about: "概要",
        login: "ログイン",
        signup: "新規登録",
        cta: "今すぐ始める",
        hero_title: "Voice4All – 障壁のないコミュニケーション",
        hero_sub: "話す・手話・入力。AI が音声、テキスト、手話アバターへ即時翻訳。",
        features_title: "できること",
        f1: "音声・テキスト対応チャットボット",
        f2: "手話翻訳",
        f3: "ビデオ通話とライブ字幕",
        f4: "会話履歴の保存と検���",
        how_title: "使い方",
        how_1: "入力：テキスト／音声／手話",
        how_2: "AI が希望の形式に翻訳",
        how_3: "出力：テキスト・音声・手話アバター",
        footer_about: "概要",
        footer_contact: "お問い合わせ",
        footer_privacy: "プライバシー",
        footer_terms: "利用規約",
    },
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>(() => {
        const saved = localStorage.getItem("v4a.locale") as Locale | null;
        return saved ?? "vi";
    });

    useEffect(() => {
        localStorage.setItem("v4a.locale", locale);
        document.documentElement.lang = locale;
    }, [locale]);

    const t = useMemo(() => {
        const dict = dictionaries[locale];
        return (key: string) => dict[key] ?? key;
    }, [locale]);

    const value = useMemo(() => ({ locale, t, setLocale }), [locale, t]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n must be used within I18nProvider");
    return ctx;
}
