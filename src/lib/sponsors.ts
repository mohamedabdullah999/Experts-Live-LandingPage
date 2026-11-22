/**
 * Logos shown on expertslive.sa/sponsors (checked 22 Nov 2026), same groups and order.
 * Files are served from the official site, so a logo updated there updates here too.
 * All artwork is white on transparent; x/y/bw/bh is the visible area inside each file,
 * used to crop away the padding so every logo sits at the same optical size.
 * Some files on the site have misleading names (e.g. Tier3Tech_logo-1-5.png is ZAT.VC); names here were checked visually.
 */
export const SPONSOR_BASE = 'https://expertslive.sa/wp-content/uploads/';

export interface SponsorLogo { name: string; src: string; w: number; h: number; x: number; y: number; bw: number; bh: number }

export type SponsorGroupId = 'powered' | 'main' | 'diamond' | 'platinum' | 'gold' | 'bronze' | 'partners';

export const SPONSOR_GROUPS: { id: SponsorGroupId; logos: SponsorLogo[] }[] = [
  {
    id: 'powered',
    logos: [
      {name: "AI in Healthcare Chair", src: "2026/05/RCAI-2.png", w: 500, h: 372, x: 23, y: 79, bw: 453, bh: 215},
      {name: "Year of AI 2026", src: "2026/05/AIYear-2.png", w: 500, h: 372, x: 42, y: 109, bw: 417, bh: 154},
      {name: "Cloud Mechanics", src: "2026/05/cloud-mechanics-logo-Transparent-2026.png", w: 500, h: 372, x: 14, y: 124, bw: 471, bh: 124},
    ],
  },
  {
    id: 'main',
    logos: [
      {name: "Microsoft", src: "2026/11/microsoft-white.png", w: 1000, h: 470, x: 50, y: 129, bw: 900, bh: 211},
      {name: "MCIT", src: "2026/11/mcit-white-1.png", w: 1000, h: 470, x: 50, y: 110, bw: 900, bh: 249},
      {name: "Saudi Digital Academy", src: "2026/11/sda-white.png", w: 1000, h: 470, x: 50, y: 163, bw: 900, bh: 144},
      {name: "Smart Code", src: "2026/11/smartcode-white.png", w: 900, h: 574, x: 46, y: 47, bw: 808, bh: 481},
      {name: "ZAT.VC", src: "2026/06/Tier3Tech_logo-1-5.png", w: 793, h: 589, x: 242, y: 125, bw: 304, bh: 326},
      {name: "Mindware", src: "2026/11/elksa-partner-mindware-white-v3.png", w: 1000, h: 470, x: 50, y: 103, bw: 900, bh: 262},
    ],
  },
  {
    id: 'diamond',
    logos: [
      {name: "Robopack", src: "2025/06/robopack-Logo_big-1-300x86.png", w: 300, h: 86, x: 27, y: 13, bw: 273, bh: 53},
    ],
  },
  {
    id: 'platinum',
    logos: [
      {name: "Microsoft", src: "2025/08/microsoft-300x223.png", w: 300, h: 223, x: 39, y: 87, bw: 222, bh: 48},
      {name: "Zerotouch", src: "2025/08/zerotouch-300x223.png", w: 300, h: 223, x: 68, y: 29, bw: 164, bh: 164},
      {name: "Sulava", src: "2025/11/W_Sulava_logo_black_rgb_centered_plain-768x570-1-300x223.png", w: 300, h: 223, x: 23, y: 43, bw: 252, bh: 148},
      {name: "Admin By Request", src: "2025/08/adminbyrequest-white-300x223.png", w: 300, h: 223, x: 22, y: 90, bw: 256, bh: 42},
    ],
  },
  {
    id: 'gold',
    logos: [
      {name: "Bespin Global", src: "2025/10/Bespin_Global_Logo_White.png", w: 300, h: 223, x: 22, y: 80, bw: 256, bh: 63},
    ],
  },
  {
    id: 'bronze',
    logos: [
      {name: "LogiSam", src: "2025/10/LogiSam_white.png", w: 300, h: 223, x: 17, y: 57, bw: 267, bh: 108},
      {name: "Patch My PC", src: "2025/08/patchmypc.png", w: 793, h: 589, x: 94, y: 222, bw: 604, bh: 144},
      {name: "Onyx Data", src: "2025/08/onyxdatav2-300x223.png", w: 300, h: 223, x: 91, y: 26, bw: 118, bh: 171},
      {name: "Login VSI", src: "2025/08/loginvsi.png", w: 793, h: 589, x: 90, y: 245, bw: 611, bh: 96},
      {name: "Tier3Tech", src: "2025/06/Tier3Tech_logo-1.png", w: 793, h: 589, x: 201, y: 169, bw: 389, bh: 251},
    ],
  },
  {
    id: 'partners',
    logos: [
      {name: "Tawwaq", src: "2026/11/tawwaq-white.png", w: 900, h: 391, x: 47, y: 47, bw: 806, bh: 297},
      {name: "FutureLeap", src: "2026/11/futureleap-white-1024x262.png", w: 1024, h: 262, x: 54, y: 54, bw: 916, bh: 154},
      {name: "CapNest", src: "2026/11/capnest-white-1024x447.png", w: 1024, h: 447, x: 54, y: 54, bw: 916, bh: 339},
      {name: "Alfia", src: "2026/11/alfia-white-1024x406.png", w: 1024, h: 406, x: 54, y: 54, bw: 916, bh: 298},
      {name: "Raseel", src: "2026/11/raseel-white.png", w: 1000, h: 470, x: 50, y: 89, bw: 900, bh: 291},
      {name: "Voice of FM", src: "2026/06/Tier3Tech_logo-1.png", w: 793, h: 589, x: 127, y: 199, bw: 480, bh: 142},
      {name: "Convz", src: "2026/06/Tier3Tech_logo-1-1.png", w: 793, h: 589, x: 0, y: 243, bw: 793, bh: 102},
      {name: "AYEN", src: "2026/06/ChatGPT-Image-2-يونيو-2026،-08_34_03-م-1024x683.png", w: 1024, h: 683, x: 315, y: 142, bw: 393, bh: 392},
      {name: "Plus", src: "2026/11/plus-white-1-1024x570.png", w: 1024, h: 570, x: 54, y: 54, bw: 916, bh: 462},
      {name: "STF", src: "2026/06/Tier3Tech_logo-1-7.png", w: 793, h: 589, x: 172, y: 177, bw: 436, bh: 275},
      {name: "Beetleware", src: "2026/06/Tier3Tech_logo-1-9.png", w: 793, h: 589, x: 177, y: 190, bw: 362, bh: 197},
      {name: "Blend", src: "2026/11/elksa-partner-blend-white-v3.png", w: 1000, h: 470, x: 385, y: 100, bw: 230, bh: 270},
      {name: "Thabat", src: "2026/11/thabat-white.png", w: 900, h: 473, x: 47, y: 46, bw: 807, bh: 381},
      {name: "ThaatAi", src: "2026/11/elksa-partner-thaat-white.png", w: 1000, h: 470, x: 345, y: 72, bw: 310, bh: 325},
      {name: "Cloudativ", src: "2026/11/elksa-partner-cloudativ-white-v3.png", w: 1000, h: 470, x: 50, y: 150, bw: 900, bh: 169},
      {name: "CoreSys", src: "2026/11/coresys-white.png", w: 1000, h: 470, x: 327, y: 70, bw: 345, bh: 330},
      {name: "INFINIARC Pro", src: "2026/11/elksa-partner-infiniarc-white-v3.png", w: 1000, h: 470, x: 50, y: 200, bw: 900, bh: 69},
      {name: "System Center Dudes", src: "2026/11/systemcenterdudes-white.png", w: 1000, h: 470, x: 50, y: 150, bw: 899, bh: 170},
      {name: "Lenks.ai", src: "2026/11/elksa-partner-lenks-white.png", w: 1000, h: 470, x: 50, y: 149, bw: 900, bh: 171},
      {name: "Rifqa", src: "2026/11/elksa-partner-rifqa-white.png", w: 1000, h: 470, x: 94, y: 71, bw: 811, bh: 327},
      {name: "Majlis Business", src: "2026/11/elksa-partner-majlis-white-v3.png", w: 1000, h: 470, x: 50, y: 139, bw: 900, bh: 192},
      {name: "Code Founders", src: "2026/11/elksa-partner-codefounders-white-v3.png", w: 1000, h: 470, x: 50, y: 122, bw: 900, bh: 225},
      {name: "Echora", src: "2026/11/elksa-partner-echora-white.png", w: 1000, h: 470, x: 50, y: 140, bw: 900, bh: 189},
      {name: "ALS – Alhazmi Legal Services", src: "2026/11/elksa-partner-alhazmi-white-v3.png", w: 1000, h: 470, x: 263, y: 70, bw: 474, bh: 330},
      {name: "AK Events", src: "2026/11/elksa-partner-akevent-white-v3.png", w: 1000, h: 470, x: 354, y: 85, bw: 292, bh: 300},
      {name: "VirtuWa", src: "2026/11/elksa-partner-virtua-white.png", w: 1000, h: 470, x: 50, y: 129, bw: 900, bh: 211},
      {name: "Unbound Focus 30", src: "2026/11/elksa-partner-uf30-white.png", w: 1000, h: 470, x: 214, y: 70, bw: 572, bh: 330},
      {name: "DataCode", src: "2026/11/elksa-partner-datacode-white.png", w: 1000, h: 470, x: 50, y: 159, bw: 900, bh: 151},
      {name: "Khallak Fahim", src: "2026/11/elksa-partner-khallak-white.png", w: 1000, h: 470, x: 316, y: 70, bw: 368, bh: 330},
      {name: "StartupKit", src: "2026/11/elksa-partner-startupkit-white.png", w: 1000, h: 470, x: 241, y: 70, bw: 517, bh: 330},
      {name: "esense", src: "2026/11/elksa-partner-esense-white-v3.png", w: 1000, h: 470, x: 50, y: 94, bw: 900, bh: 282},
      {name: "IDARK360", src: "2026/11/elksa-partner-idark360-white.png", w: 1000, h: 470, x: 50, y: 138, bw: 900, bh: 191},
      {name: "TabSense", src: "2026/11/elksa-partner-tabsense-white.png", w: 1000, h: 470, x: 50, y: 168, bw: 900, bh: 134},
      {name: "Jmaa", src: "2026/11/elksa-partner-jmaa-white-v3.png", w: 1000, h: 470, x: 82, y: 70, bw: 835, bh: 330},
      {name: "Prime Digital Innovations", src: "2026/11/elksa-partner-primedigital-white-v3.png", w: 1000, h: 470, x: 251, y: 70, bw: 497, bh: 330},
      {name: "Tamkeen Intelligent", src: "2026/11/elksa-partner-tamkeen-white-v3.png", w: 1000, h: 470, x: 50, y: 123, bw: 900, bh: 224},
    ],
  },
];
