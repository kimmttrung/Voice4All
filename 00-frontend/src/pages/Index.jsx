import { Button } from "../components/ui/button";
// import { useI18n } from "@/lib/i18n";
import { ArrowRight, Bot, LanguagesIcon, Video, Archive, Facebook, Youtube, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { siteConfig } from "../components/lib/site";
import { useI18n } from "../components/lib/i18n";

function Section({ children, className = "" }) {
    return <section className={`py-16 md:py-24 ${className}`}>{children}</section>;
}

export default function Index() {
    // const { t } = useI18n();

    return (
        <main>
            <TopBanner />
            <Hero />
            <Features />
            <HowItWorks />
            <Achievements />
            <DemoWide />
            <Testimonials />
            <CaseStudy />
            <FAQ />
            <FinalCTA />
        </main>
    );
}

function TopBanner() {
    return (
        <div className="relative">
            <img
                src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1400&auto=format&fit=crop"
                alt="Abstract colorful waves background"
                className="h-56 w-full object-cover md:h-72 lg:h-80 opacity-90"
                loading="eager"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/10 to-background" />
        </div>
    );
}

function Hero() {
    const { t } = useI18n();
    return (
        <Section className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 blur-3xl" />
            </div>
            <div className="container mx-auto">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        {t("hero_title")}
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                        {t("hero_sub")}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Link to="/signup">
                            <Button size="lg" className="rounded-full">
                                {t("cta")} <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                        <a href="#demo" className="text-primary hover:underline text-sm md:text-base">
                            Try demo →
                        </a>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex h-6 items-center rounded-full bg-accent px-3">AA accessible</span>
                        <span className="inline-flex h-6 items-center rounded-full bg-accent px-3">Multilingual</span>
                        <span className="inline-flex h-6 items-center rounded-full bg-accent px-3">Inclusive by design</span>
                    </div>
                </div>
            </div>
        </Section>
    );
}

function Features() {
    const { t } = useI18n();
    const items = [
        { icon: Bot, title: t("f1"), desc: "Chat with AI using voice or text for instant assistance." },
        { icon: LanguagesIcon, title: t("f2"), desc: "Translate between sign language and spoken text." },
        { icon: Video, title: t("f3"), desc: "Join calls with live captions and sign avatar support." },
        { icon: Archive, title: t("f4"), desc: "Search your conversations and revisit transcripts anytime." },
    ];
    return (
        <Section>
            <div className="container mx-auto">
                <h2 className="text-center text-2xl md:text-4xl font-extrabold tracking-tight">
                    {t("features_title")}
                </h2>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            role="button"
                            tabIndex={0}
                            className="group cursor-pointer rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <Icon />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

function HowItWorks() {
    const { t } = useI18n();
    const steps = [t("how_1"), t("how_2"), t("how_3")];
    return (
        <Section className="bg-secondary/60">
            <div className="container mx-auto">
                <h2 className="text-center text-2xl md:text-4xl font-extrabold tracking-tight">
                    {t("how_title")}
                </h2>
                <ol className="mt-10 grid items-center gap-8 md:grid-cols-3">
                    {steps.map((s, i) => (
                        <li
                            key={i}
                            role="button"
                            tabIndex={0}
                            className="relative cursor-pointer rounded-2xl border bg-background p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                        >
                            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground font-bold">
                                {i + 1}
                            </div>
                            <p className="mt-4 text-sm md:text-base text-foreground/90">{s}</p>
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute right-[-24px] top-1/2 h-1 w-12 -translate-y-1/2 rounded bg-gradient-to-r from-primary/50 to-primary" />
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </Section>
    );
}

function Achievements() {
    return (
        <Section>
            <div className="container mx-auto">
                <div className="grid gap-8 md:grid-cols-3 items-start">
                    <div className="rounded-2xl border p-6 shadow-sm bg-background">
                        <p className="text-4xl font-extrabold">5,000+</p>
                        <p className="mt-1 text-muted-foreground">người ��ã sử dụng</p>
                    </div>
                    <div className="rounded-2xl border p-6 shadow-sm">
                        <p className="font-semibold">Đối tác</p>
                        <div className="mt-4 flex flex-wrap items-center gap-4 opacity-80">
                            {siteConfig.partners.map((p) => (
                                <Partner key={p.name} name={p.name} logo={p.logo} href={p.href} />
                            ))}
                        </div>
                    </div>
                    <div className="rounded-2xl border p-6 shadow-sm">
                        <p className="font-semibold">Thành tựu</p>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li>🏆 Top 10 Hackathon 2025</li>
                            <li>🤝 Ứng dụng hỗ trợ cộng đồng khiếm thính tại Việt Nam</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Section>
    );
}

function Partner({ name, logo, href }) {
    const content = logo ? (
        <img src={logo} alt={name} className="h-6 w-auto" loading="lazy" />
    ) : (
        <div className="text-xs font-medium">{name}</div>
    );
    const inner = (
        <div className="flex items-center gap-2 rounded-full border px-3 py-1 transition-all duration-200 hover:border-primary/60 hover:bg-primary/5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-primary">★</span>
            {content}
        </div>
    );
    return href ? (
        <a href={href} target="_blank" rel="noreferrer" aria-label={name}>
            {inner}
        </a>
    ) : (
        inner
    );
}

function DemoWide() {
    let embed = siteConfig.demoEmbed?.trim();
    try {
        if (embed && embed.includes("watch?v=")) {
            const u = new URL(embed);
            const id = u.searchParams.get("v");
            const t = u.searchParams.get("t");
            const start = t ? parseInt(t) : undefined;
            embed = `https://www.youtube.com/embed/${id ?? ""}${start ? `?start=${start}` : ""}`;
        }
    } catch (error) {
        console.log(error);
    }
    const mp4 = siteConfig.demoVideoUrl?.trim();
    return (
        <Section className="pt-0">
            <div id="demo" className="container mx-auto">
                <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border shadow-2xl">
                    <div className="aspect-video w-full relative bg-black">
                        {embed ? (
                            <iframe
                                title="Voice4All demo"
                                src={embed}
                                className="absolute inset-0 h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />)
                            : (
                                <video className="absolute inset-0 h-full w-full" controls playsInline poster="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop">
                                    {mp4 && <source src={mp4} type="video/mp4" />}
                                </video>
                            )}
                    </div>
                </div>
            </div>
        </Section>
    );
}

function Testimonials() {
    const items = [
        {
            quote: "\"Voice4All đã giúp tôi trò chuyện dễ dàng với bạn bè nghe bình thường.\"",
            name: "Nguyễn An",
            role: "Sinh viên",
            emoji: "🧑‍🎓",
        },
        {
            quote: "\"Ứng dụng thân thiện, phụ đề và giọng nói hoạt động mượt.\"",
            name: "Ẩn danh",
            role: "Người dùng",
            emoji: "🙂",
        },
    ];
    return (
        <Section>
            <div className="container mx-auto">
                <h2 className="text-center text-2xl md:text-4xl font-extrabold tracking-tight">Người dùng nói gì</h2>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {items.map((t) => (
                        <figure key={t.name} className="rounded-2xl border p-6 shadow-sm bg-background">
                            <div className="flex items-center gap-3">
                                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-lg">{t.emoji}</div>
                                <div>
                                    <figcaption className="font-semibold">{t.name}</figcaption>
                                    <p className="text-xs text-muted-foreground">{t.role}</p>
                                </div>
                            </div>
                            <blockquote className="mt-4 text-base text-foreground/90">{t.quote}</blockquote>
                        </figure>
                    ))}
                </div>
            </div>
        </Section>
    );
}

function CaseStudy() {
    return (
        <Section className="bg-secondary/60">
            <div className="container mx-auto grid items-center gap-10 md:grid-cols-2">
                <div>
                    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Case study</h2>
                    <p className="mt-4 text-muted-foreground">
                        "Một giáo viên dùng Voice4All để dạy học sinh khiếm thính" — kết hợp phụ đề trực tiếp và
                        avatar ký hiệu để toàn bộ lớp đều hiểu bài.
                    </p>
                </div>
                <div className="overflow-hidden rounded-2xl border shadow-lg">
                    <img
                        src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop"
                        alt="Giáo viên và học sinh trong lớp học"
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
        </Section>
    );
}

function FAQ() {
    return (
        <Section>
            <div className="container mx-auto max-w-3xl">
                <h2 className="text-center text-2xl md:text-4xl font-extrabold tracking-tight">FAQ</h2>
                <Accordion type="single" collapsible className="mt-8">
                    <AccordionItem value="q1">
                        <AccordionTrigger>Voice4All có miễn phí không?</AccordionTrigger>
                        <AccordionContent>
                            Có gói miễn phí để trải nghiệm. Các gói nâng cao thêm tính năng và dung lượng lưu trữ.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="q2">
                        <AccordionTrigger>Ứng dụng hỗ trợ ngôn ngữ ký hiệu nào?</AccordionTrigger>
                        <AccordionContent>
                            Hỗ trợ các biến thể ký hiệu phổ biến và đang mở rộng thêm dựa trên phản hồi cộng đồng.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="q3">
                        <AccordionTrigger>Dữ liệu có an toàn không?</AccordionTrigger>
                        <AccordionContent>
                            Dữ liệu được truyền qua HTTPS và lưu trữ an toàn. Bạn có thể xoá lịch sử bất cứ lúc nào.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </Section>
    );
}

function FinalCTA() {
    return (
        <Section>
            <div className="container mx-auto text-center">
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Đăng ký ngay để kết nối không rào cản</h2>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Link to="/signup"><Button size="lg" className="rounded-full">Sign Up</Button></Link>
                    <a href="#demo" className="text-primary hover:underline text-lg">Try Demo →</a>
                </div>
                <div className="mt-6 flex items-center justify-center gap-3 text-muted-foreground">
                    <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-foreground"><Facebook className="h-5 w-5" /></a>
                    <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-foreground"><Youtube className="h-5 w-5" /></a>
                    <a aria-label="GitHub" href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground"><Github className="h-5 w-5" /></a>
                </div>
            </div>
        </Section>
    );
}
