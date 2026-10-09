import { Send } from "lucide-react";

// lucide-react brend ikonkalarini o'z ichiga olmaydi, shuning uchun soddalashtirilgan
// chiziqli (stroke) ikonkalar shu yerda chiziladi.
const strokeIcon = (children) =>
  function SocialIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        {children}
      </svg>
    );
  };

const InstagramIcon = strokeIcon(
  <>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </>,
);
const FacebookIcon = strokeIcon(<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />);
const YoutubeIcon = strokeIcon(
  <>
    <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </>,
);
const LinkedinIcon = strokeIcon(
  <>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </>,
);

const NETWORKS = [
  { key: "social_telegram", label: "Telegram", icon: Send },
  { key: "social_instagram", label: "Instagram", icon: InstagramIcon },
  { key: "social_facebook", label: "Facebook", icon: FacebookIcon },
  { key: "social_youtube", label: "YouTube", icon: YoutubeIcon },
  { key: "social_linkedin", label: "LinkedIn", icon: LinkedinIcon },
];

export default function SocialLinks({ settings }) {
  const networks = NETWORKS.filter((network) => settings[network.key]);
  if (!networks.length) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {networks.map(({ key, label, icon: Icon }) => (
        <li key={key}>
          <a
            href={settings[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="grid size-10 place-items-center border border-white/15 text-brand-200 transition hover:border-gold-400 hover:text-gold-300"
          >
            <Icon className="size-[18px]" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
