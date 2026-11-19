# Experts Live Saudi 2026 — Landing Page: Discovery & Plan

> **الحالة:** مرحلة الـDiscovery خلصت (2026-11-19)، والتنفيذ بدأ. الحاجات المفتوحة الحالية في `docs/OPEN-ITEMS.md`.
> **التاريخ:** 2026-11-19 · **المشروع:** `EL` · **المسار المحلي:** `Experts-live/landingPage/`
> **المصادر:** `EXPERTS-LIVE-SAUDI.md` (نسخة 19 Nov من OneDrive) · `BRAND.md` · `BRIEF.md` · `VENUE.md` · `PROJECT-MAP.md` · `DEMODAY-INVITE.md` · المواقع الحية (expertslive.sa · d.zat.vc/ELKSA/launch · d.zat.vc/ELKSA/ppt/final)

---

## 0. الـSkills والأدوات اللي هنستخدمها

| الأداة / Skill | هتتستخدم في إيه | ليه |
|---|---|---|
| **`frontend-design`** | كل مراحل الـUI: الـtokens، الـlayout، الـtypography، مراجعة كل section بعد البناء | هي المرجع لجودة التصميم. الـbrand الرسمي بيكسبها لو في تعارض |
| **Playwright** (في الـcloud) | Screenshots على `375 / 768 / 1280 / 1440`، فحص الـconsole errors، فحص الـRTL | مراجعة النتيجة الفعلية، مش الكود بس |
| **Built-in browser** (على جهازك) | فتح المواقع الحية اللي الـcloud مش قادر يوصلها، ومراجعة الصفحة النهائية | الـcloud network محجوب عن `expertslive.sa` و`d.zat.vc` |
| **Microsoft 365 connector** | قراءة الـagent kit واللوجوهات والصور من OneDrive | ده مصدر الحقيقة |
| `theme-factory` · `web-artifacts-builder` · `brand-guidelines` | **مش هنستخدمهم** | الأول بيقترح themes جاهزة، والتاني لـclaude.ai artifacts، والتالت خاص بهوية Anthropic. عندنا هوية رسمية |

**تعارضات بين الـskill والـbrand، واتحسمت لصالح الـbrand:**

- الـbrand بيطلب **Kickers بـUPPERCASE** وcyan، والـskill بتحذّر منها. **القرار:** نستخدمها، بس في أماكن قليلة ولها معنى (مش فوق كل عنوان).
- الـbrand عنده **gradient** `#FFB13B → #FF7A59` و**glass cards** بـ`border-radius:22px`، والـbrief بتاعك بيقول «avoid unnecessary gradients and excessive rounded cards». **القرار:** الـgradient لمكان واحد بس في الصفحة، والـcards تبقى استثناء مش الأساس.

---

## 1. فهم المشروع

### 1.1 الحدث في سطرين
**Experts Live Saudi 2026** هو أول نسخة سعودية من Experts Live العالمي (من 2009، 16 دولة). مؤتمر **Digital Economy** يومين، **29–30 نوفمبر 2026**، في **PNU Conference & Convention Center، الرياض**.
الـpositioning الرسمي: **«Experts Live — Digital Conference»** · الـtagline: **Learn. Share. Lead.**

### 1.2 ⚠️ أهم ملاحظة: تعارض في تعريف المنتج

| المصدر | بيقول إن الحدث |
|---|---|
| **وصف الـProject** (اللي إنت كاتبه) | حدث بيجمع رواد الأعمال وأصحاب الأفكار عشان **يعرضوا أفكارهم على المستثمرين** |
| **ملف الحقائق الرسمي** | **مؤتمر تقني** للاقتصاد الرقمي: 6 tracks، 55+ speaker، 8 ورش. والـpitching للمستثمرين هو **جزء واحد** اسمه **Demo Day** + **Startup Corner** |

يعني الـ**Demo Day** هو الجزء اللي بيطابق وصفك، لكنه مش الحدث كله. **لازم نحسم ده قبل أي تصميم** (سؤال Q1 تحت)، لأنه بيغيّر الـhero والـCTA الأساسي وترتيب الأقسام.

### 1.3 الجمهور (8 شرائح من الملف الرسمي، تحديث هاني 18 Nov)

| # | الشريحة | الدافع | الـCTA المناسب |
|---|---|---|---|
| 1 | **Startup founders** | يقابلوا مستثمرين وشركات وجهات حكومية | Pitch at Demo Day / Startup pod |
| 2 | **VCs & investors** | Deal flow مؤهّل | Request a Demo Day invite |
| 3 | **Tech leaders** (CIO · CTO · CISO) | Peers، vendors، shortlist | Register / VIP |
| 4 | **Business executives** | يعرفوا يستثمروا فين في الـdigital | Register |
| 5 | **Government digital leaders** | أفكار لخدمات أفضل للمواطن | Register |
| 6 | **IT practitioners** | Level 300–400، ورش، MVPs | Register |
| 7 | **Educators** | محتوى وشركاء للتدريس | Register |
| 8 | **Graduates** | «Ask the Experts»، فرص عمل | Student pass |
| + | **Partners & sponsors** | Leads وظهور | Partner with us |

### 1.4 أهداف التحويل (Conversion goals)

> **ملحوظة:** الترتيب ده بيتغيّر حسب إجابة Q1.

- **الـPrimary (لو الصفحة للمؤتمر كله):** شراء تذكرة على `https://elksa26.expertslive.sa`
- **الـPrimary (لو الصفحة لـDemo Day):** تقديم startup + طلب دعوة مستثمر
- **الـSecondary:** Partner with us (`hany@expertslive.sa`) · Startup pod (7K SAR) · متابعة السوشيال

### 1.5 قيد زمني مهم
النهارده **19 نوفمبر** والحدث **29 نوفمبر** — يعني **10 أيام**. ده بيأثر على القرارات:
- أي feature محتاجة backend (زي فورم تقديم أفكار) لازم يكون ليها endpoint جاهز أو نستخدم أداة موجودة.
- الـscope لازم يتقسم: **v1 تنزل خلال أيام**، والتحسينات بعدها.
- لازم نفكر في **حالة بعد الحدث** (الصفحة هتقول إيه يوم 1 ديسمبر؟).

---

## 2. الهوية البصرية (من `BRAND.md` — v2 «night stage»)

### 2.1 الألوان

| Token | Hex | الاستخدام عندنا |
|---|---|---|
| `--bg` | `#05071A` | خلفية الصفحة |
| `--bg-2` | `#0B0E2E` | الأقسام المتبادلة |
| `--navy` | `#131640` | الأسطح المرفوعة (قليل) |
| `--indigo` | `#2B3A8C` | Borders، خطوط المسرح |
| `--blue` | `#328DC7` | Links |
| `--cyan` | `#45CAFF` | **Primary accent:** المعلومات، الـfocus ring، الأيقونات |
| `--amber` | `#FFB13B` | **Highlight:** الأرقام والـCTA **بس** |
| `--amber-soft` | `#FFE3A3` | نص مُبرز ناعم |
| `--text` | `#F7F9FF` | النص الأساسي |
| `--pale` | `#C9D4F2` | الـbody copy |
| `--muted` | `#9FB0D8` | نص ثانوي، footer |
| `--white` | `#FFFFFF` | Logo chips |

> **Contrast check (هيتعمل فعلياً قبل البناء):** `--muted` على `--bg` محتاج يتأكد إنه ≥ 4.5:1 للنص الصغير. الـamber على الكحلي ممتاز.

### 2.2 الخطوط

| الدور | Latin | Arabic |
|---|---|---|
| Display / Headlines | **Montserrat** 800–900، `line-height: 1.0–1.1` | **Reem Kufi** 600–700 |
| Body / UI | Montserrat 400–600 | **IBM Plex Sans Arabic** 400–700 |

- تحميل عن طريق `next/font` (self-hosted، بدون layout shift).
- الـArabic body محتاج `line-height` أعلى (~1.8) من الـLatin (~1.6).

### 2.3 قواعد اللوجو (إلزامية)

- **PNU دايماً أول لوجو، فوق يمين** (قرار هاني 18 Nov)، ومن ملفات `pnu-2026/` بس. ⚠️ **الفولدر ده مش موجود في الـkit** (سؤال Q5).
- لوجو **Experts Live Saudi** دايماً على **chip أبيض بحواف مدوّرة** فوق الخلفية الغامقة. اللوجو الرسمي موجود: `ExpertsLive_Saudi_Logo.svg`.
- ترتيب لوجوهات الشركاء: PNU ← Microsoft · MCIT · AI in Healthcare Chair · ZAT.VC · Cloud Mechanics · Smart Code · SDA · SDA thehub.

### 2.4 خطوط حمرا في المحتوى

- **ممنوع** «Microsoft event». ⚠️ الموقع الحالي `expertslive.sa` مكتوب فيه **«Where Microsoft Experts Unite»** — ده مخالف للقاعدة، وإحنا مش هنكرره.
- ممنوع نخترع راعي أو سعر أو منصب أو حالة شراكة. أي حاجة مش مؤكدة = **«to be confirmed»**.
- صور النسخ السابقة حقوقها **مش مؤكدة**، وأي صورة تخيلية تتكتب **«concept»**.
- مفيش testimonials في المصادر، فـ**مش هيبقى في testimonials**.

---

## 3. الاتجاه البصري المقترح

### 3.1 الفكرة: **«The Stage, in two languages»**

الهوية الرسمية اسمها «night stage»، والحدث نفسه مبني حوالين **Red Hall**. والميزة اللي محدش تاني عنده: **أول نسخة عربية بالكامل**.

الفكرة إن الصفحة تتصمم كأنها **المسرح**: خلفية ليلية، و**محور مركزي (spotlight axis)** في الـhero بيفصل **الإنجليزي شمال** و**العربي يمين** — نفس قاعدة الـbrand «English left, Arabic right» — بس متحوّلة لعنصر تصميم أساسي بدل ما تبقى مجرد ترجمة.

```
┌───────────────────────────────────────────────────────────────┐
│ [Register]                         [ELKSA chip]  [PNU logo]   │ ← PNU فوق يمين
│                                                               │
│  EXPERTS LIVE           ┃            إكسبيرتس لايف              │
│  SAUDI 2026             ┃            السعودية ٢٠٢٦              │
│                         ┃  ← spotlight axis                   │
│  Learn. Share. Lead.    ┃            تعلّم. شارك. قُد.           │
│                         ┃                                     │
│  29–30 Nov · PNU, Riyadh               ٢٩–٣٠ نوفمبر · الرياض   │
│                                                               │
│        [ Get your ticket ]   [ Pitch at Demo Day ]            │
└───────────────────────────────────────────────────────────────┘
```

> ⚠️ ترجمة الـtagline للعربي **مش موجودة في المصادر** — «تعلّم. شارك. قُد.» اقتراح بس ومحتاج موافقة.

### 3.2 مبادئ التصميم

1. **الجرأة في مكان واحد:** الـhero الثنائي اللغة هو العنصر اللي هيتفتكر. باقي الصفحة هادي ومنضبط.
2. **Motion واحدة مدروسة:** الـspotlight بيفتح عند التحميل ويكشف اللغتين. مفيش fade-up على كل section. وكل الـmotion بتحترم `prefers-reduced-motion`.
3. **الأرقام بدل الصفات:** `1,000+ · 500+ C-level · 55+ speakers · 16 countries · 6 tracks · 8 labs` — كلها من الملف الرسمي.
4. **الـstructure له معنى:** الترقيم (01/02) بس للحاجات اللي فعلاً تسلسل (زي خطوات التقديم في Demo Day). الـ6 tracks مش تسلسل، فمش هتترقم.
5. **الـamber للفعل بس:** أي حاجة amber = رقم مهم أو زرار. ده بيخلّي الـCTA واضح فوراً.
6. **Layout غير متكرر:** كل section ليه شكل حسب محتواه (جدول للتذاكر، قائمة للـtracks، صف لوجوهات للشركاء) — مش grid كروت متطابقة.

### 3.3 مراجعة الخطة ضد الـskill (self-critique)

| الجزء | هل هو default؟ | القرار |
|---|---|---|
| خلفية كحلي غامق + accent واحد | **أيوه** (trait #2 في الـskill) | **مفروض من الـbrand** فهيفضل، بس عندنا accent تاني (amber) ووظيفة واضحة لكل لون |
| Stat tiles (رقم كبير + label) | **أيوه** | هتتعمل **مرة واحدة** كشريط بيانات، مش كـhero |
| Glass cards في كل مكان | **أيوه** (SaaS-card kit) | **اتشالت** كأساس. هتبقى بس في Ticket tiers |
| Hero ثنائي اللغة على محور مسرح | **لأ** | خاص بالحدث ده تحديداً — **ده العنصر المميز** |

---

## 4. الـSitemap وترتيب الأقسام

> **ملحوظة:** ده الهيكل المقترح لو الإجابة على Q1 هي «المؤتمر كله مع إبراز Demo Day». لو الصفحة لـDemo Day بس، الترتيب هيتغيّر.

| # | Section | المحتوى (من المصادر بس) | الهدف |
|---|---|---|---|
| 0 | **Header** | PNU فوق يمين · ELKSA chip · Nav · زرار `Register` · تبديل EN / ع | توجيه + CTA دايم |
| 1 | **Hero** | الاسم · التاريخ · المكان · tagline · زرارين | الانطباع الأول + الـconversion |
| 2 | **Proof strip** | 1,000+ · 500+ C-level · 55+ speakers · 16 countries · 6 tracks · 8 labs | المصداقية |
| 3 | **Why Experts Live Saudi** | الـ4 pillars: Proven global brand · Arabic first · Real technical depth · Vision 2030 | الإقناع |
| 4 | **Find your path** | 8 شرائح → كل واحدة ليها رابط للـsection بتاعها | توجيه كل زائر |
| 5 | **Demo Day & Startup Corner** | Startups pitch to investors, corporates and government buyers · Startup pod 7K SAR · الوقت والقاعة **TBC** | Founders + Investors |
| 6 | **Super Nourah** | Day 1 · 10:30 · Red Hall | لحظة «الحدث» |
| 7 | **Six tracks + 8 labs** | Automation · Governance & Security · AI · Cloud & Hyperscale · Data & IoT · Endpoint | المحتوى |
| 8 | **Speakers** | الـselection من الملف + رابط `expertslive.sa/speakers` | المصداقية |
| 9 | **More at the event** | Hackathon · Ask the Experts · Podcast studio · VIP Majlis · Gala (Day 2) | الحماس |
| 10 | **Venue** | PNU Conference & Convention Center · رابط الـ3D twin | الثقة + اللوجستيات |
| 11 | **Tickets** | Early Bird 99 · Standard 399.90 · VIP 1,299.90 · Team ×5 1,499.90 (SAR) | **الـconversion الأساسي** |
| 12 | **Partners** | Organised by · In collaboration with · Official partners · Sponsors | المصداقية |
| 13 | **Partner with us** | CTA → `hany@expertslive.sa` | Secondary conversion |
| 14 | **Footer** | السطر المعتمد بالحرف | — |

**السطر المعتمد للـfooter:**
`Experts Live Saudi · PNU, Riyadh · 29–30 Nov 2026 · Presented by ZAT.VC & Cloud Mechanics · In partnership with Microsoft, MCIT, PNU & AI Chair`

---

## 5. الـUser Journey

### 5.1 Startup founder (اللي وصفك بيركّز عليه)
```
Social / WhatsApp → Hero → يضغط «Pitch at Demo Day»
  → Demo Day section: مين هيحضر (investors · corporates · government buyers)
  → الخطوات (01 قدّم · 02 اتراجع · 03 اعرض)  ← ⚠️ الخطوات دي محتاجة تأكيد
  → CTA: Apply  ← ⚠️ مفيش فورم أو لينك تقديم في المصادر
```

### 5.2 Investor
```
دعوة شخصية / LinkedIn → Hero → «Find your path: Investor»
  → Demo Day + Startup Corner + VIP Majlis
  → CTA: Request an invite  ← ⚠️ الـRSVP «confirm with the organising team» بس
```

### 5.3 Tech leader / Practitioner
```
Search / Social → Hero → Proof strip → Tracks → Speakers → Tickets → elksa26 (خارجي)
```

### 5.4 Partner
```
Deck / Email → Partners section → «Partner with us» → mailto: hany@expertslive.sa
```

---

## 6. الخطة التقنية

### 6.1 الـStack
حسب **ZAT Engineering Standard** (`Next.js + TypeScript` · pnpm)، بس بالحجم المناسب لـlanding page:

| القرار | الاختيار | السبب |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | الـstandard بتاع الفريق |
| Output | ~~Static export~~ ← **Server (Node) build** بعد قرار الفورم (شوف §8) | الفورم محتاج endpoint، والصفحات نفسها تفضل static (SSG) |
| Styling | **CSS Modules + CSS custom properties** (design tokens) | Tokens واضحة، بدون dependency زيادة |
| shadcn | **مش هنستخدمه** هنا | مفيش UI معقد، وشكله الافتراضي generic |
| Fonts | `next/font/google` | Self-hosted، بدون CLS |
| i18n | Routes `/en` و`/ar` + `dir="rtl"` + `hreflang` | SEO لكل لغة، وRTL حقيقي |
| Content | ملف `content/en.ts` و`content/ar.ts` | كل النصوص في مكان واحد، سهل التعديل والتأكيد |
| Images | `next/image` (unoptimized في static) + WebP | Performance |
| Package manager | **pnpm** | الـstandard |

### 6.2 هيكل الفولدرات
```
landingPage/
├── docs/DISCOVERY.md          ← الملف ده
├── public/
│   ├── logos/                 ← من agent-kit/assets/logos
│   └── images/
├── src/
│   ├── app/
│   │   ├── [locale]/page.tsx
│   │   └── layout.tsx
│   ├── components/            ← Header, Hero, ProofStrip, Tracks, Tickets...
│   ├── content/  en.ts · ar.ts
│   └── styles/   tokens.css · globals.css
├── package.json
└── README.md
```

### 6.3 الجودة (Quality floor)
- **Accessibility:** WCAG 2.2 AA · semantic HTML · keyboard focus واضح بالـcyan · `prefers-reduced-motion` · alt text لكل لوجو.
- **SEO:** `metadata` لكل لغة · Open Graph · **`Event` JSON-LD schema** (التاريخ، المكان، الأسعار) · `sitemap.xml`.
- **Performance:** هدف Lighthouse ≥ 95 · LCP < 2.5s · بدون JS ثقيل.
- **Responsive:** `375 / 768 / 1024 / 1440`.

### 6.4 طريقة المراجعة (بعد كل section)
1. Playwright screenshots على 4 مقاسات (EN + AR).
2. مراجعة ضد `frontend-design` + `BRAND.md`.
3. فحص الـconsole errors والـcontrast.
4. Lighthouse في الآخر.

### 6.5 مراحل التنفيذ
| المرحلة | التسليم |
|---|---|
| **1** | Tokens + Header + Hero (EN/AR) → مراجعة معاك |
| **2** | باقي الأقسام بالمحتوى الحقيقي |
| **3** | Responsive + a11y + SEO + Lighthouse |
| **4** | Push على GitHub + deploy |

---

## 7. ⚠️ تعارضات اتكشفت في المصادر

| # | التعارض | المصدر 1 | المصدر 2 |
|---|---|---|---|
| 1 | **تعريف الحدث** | وصف الـProject: pitching للمستثمرين | الملف الرسمي: مؤتمر تقني، والـpitching جزء (Demo Day) |
| 2 | **عدد الـbooths** | الملف الرسمي: 32 stand · Startup pods ×12 | `VENUE.md`: 27 slot · Startup pods ×10 |
| 3 | **MCIT** | الملف الرسمي: «In collaboration with» | `DEMODAY-INVITE.md` (15 Nov): «MCIT is still a target partner» |
| 4 | **Microsoft في الرسالة** | قاعدة الـbrand: ممنوع «Microsoft event» | الموقع الحالي: «Where Microsoft Experts Unite» |
| 5 | **نسخة ملف الحقائق** | النسخة المحلية في `assets/`: 16 Nov | نسخة OneDrive: 19 Nov (الجمهور اتحدّث وزادت شرائح Startups وInvestors) — **اشتغلنا على الأحدث** |
| 6 | **الـRepo** | طلبك: GitHub repo | `elksa/tech/README.md`: «مفيش ريبو» · الـstandard: org اسمها `zat-engine` |

---

## 8. القرارات اللي اتحسمت (2026-11-19)

| # | القرار |
|---|---|
| **Q1** ✅ | **المؤتمر كله + Demo Day بارز** — Demo Day ليه section خاص وزرار تاني في الـhero |
| **Q4** ✅ | **نسختين منفصلتين** `/en` و`/ar` (RTL كامل)، والـhero بس فيه اللغتين |
| **Q3** ✅ | **فورم بـbackend** لتقديم الـstartups وطلبات دعوة المستثمرين. **لسه محتاج يتحدد:** البيانات هتتخزن فين، ومين بيستلمها، والحقول المطلوبة (سؤال Q16) |

> **أثر قرار الـbackend:** الـstatic export مش هيكفي لوحده. المقترح: Next.js **Route Handler** (أو function صغيرة) بتستقبل الفورم، مع validation على الـclient والـserver، وhoneypot ضد الـspam، وحالات `loading · success · error` واضحة. وده محتاج hosting بيدعم server functions، أو API منفصل حسب الـZAT standard (NestJS + PostgreSQL).

**Q16 (جديد):** فين تتخزن طلبات الفورم؟ (PostgreSQL على Azure/DigitalOcean حسب الـstandard؟ إيميل لهاني؟ الاتنين؟) · ومين يوصله إشعار؟ · وإيه الحقول المطلوبة لكل فورم؟ · وإيه سياسة الخصوصية (PDPL السعودي) اللي هنربطها؟

---

## 9. أسئلة وحاجات ناقصة

### 🔴 بتمنع البدء

| # | السؤال | التخمين اللي هنشتغل عليه لو مفيش رد |
|---|---|---|
| **Q1** | الصفحة لـ**المؤتمر كله** ولا لـ**Demo Day** بس (founders + investors)؟ | المؤتمر كله، مع Demo Day كـsection بارز وCTA تاني في الـhero |
| **Q2** | **لينك الـGitHub repo** — مش موجود في رسالتك. وكمان الـ`gh` token على الـsession دي **invalid** | أجهّز الكود في `landingPage/` على جهازك، والـpush يستنى اللينك والصلاحية |
| **Q3** | تقديم الـstartups وطلبات المستثمرين: **فين بيروحوا؟** (فورم موجود؟ إيميل؟ Google Form؟) | زرار `mailto:hany@expertslive.sa` بموضوع جاهز، لحد ما يبقى في endpoint |
| **Q4** | **اللغة:** نسختين منفصلتين (`/en` + `/ar`) ولا صفحة واحدة ثنائية اللغة جنب بعض؟ | نسختين، والـhero بس فيه اللغتين |

### 🟡 محتاجة تأكيد قبل الـlaunch

| # | الناقص |
|---|---|
| Q5 | فولدر لوجو **PNU 2026** (`assets/logos/pnu-2026/`) مش موجود في الـkit — وده إلزامي فوق يمين |
| Q6 | **Demo Day:** الوقت، القاعة، خطوات التقديم، معايير الاختيار، عدد الـstartups |
| Q7 | **أسعار التذاكر:** الـEarly Bird (99 SAR) لسه شغال؟ |
| Q8 | **صور المتحدثين:** مسموح نستخدمها؟ (الـBRIEF: «صور الضيوف الحقيقيين ما تتحطش في عينات») · وصور النسخ السابقة حقوقها مش مؤكدة |
| Q9 | صورة **Red Hall** (`redhall.jpg`): صورة حقيقية للمكان ولا render؟ مسموح نستخدمها في الـhero؟ |
| Q10 | ترجمة الـtagline للعربي «Learn. Share. Lead.» |
| Q11 | **الـdomain والـhosting:** الصفحة هتنزل فين؟ (`expertslive.sa`؟ subdomain؟ `d.zat.vc`؟) |
| Q12 | **بعد الحدث** (من 1 Dec): الصفحة تتحوّل لـ«شكراً + الصور + 2027»؟ |
| Q13 | لوجوهات ناقصة: **JOFOUZ · Companyx · Cloudative · Linx** |
| Q14 | الـAnalytics: GA4؟ Meta Pixel؟ ولا مفيش؟ |
| Q15 | **مين يختبر:** حسب `ROSTER.md` شغل التطوير بتختبره **زينب**، والموافقة النهائية لـ**أشرف** — صح كده للصفحة دي؟ |
