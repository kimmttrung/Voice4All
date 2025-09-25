export type Partner = {
    name: string;
    logo?: string; // image URL
    href?: string;
};

export type SiteConfig = {
    // If demoEmbed is provided (YouTube/Vimeo embed URL), it takes precedence
    demoEmbed?: string;
    // Fallback direct MP4 video URL
    demoVideoUrl?: string;
    partners: Partner[];
};

export const siteConfig: SiteConfig = {
    // YouTube demo (start at 225s)
    demoEmbed: "https://www.youtube.com/embed/oxVCXuJaLV4?start=225",
    // Fallback mp4 can remain as backup
    demoVideoUrl:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    partners: [
        { name: "Hands for Vietnam", href: "https://handsforvietnam.org/" },
        { name: "World Federation of the Deaf (WFD)", href: "https://wfdeaf.org/" },
        { name: "DeafLoud (PARD / Voice.Global)", href: "https://voice.global/" },
    ],
};
