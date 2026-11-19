# Open items — مستني تأكيد من هاني

> كل حاجة هنا اتبنت **بأحسن تخمين** عشان الشغل ما يقفش. أول ما هاني يرد، بنعدّل المكان المكتوب جنب كل بند.
> في الكود، كل بند مؤقت عليه تعليق `// TBC:` — تقدر تلاقيهم كلهم بـ `grep -rn "TBC" src`.

**آخر تحديث:** 2026-11-19

---

## 1. محتوى محتاج تأكيد

| # | البند | اللي اتعمل دلوقتي | يتعدّل فين |
|---|---|---|---|
| 1 | **ترجمة الـtagline للعربي** | «تعلّم. شارك. قُد.» | `src/content/ar.ts` → `hero.tagline` |
| 2 | **ميعاد وقاعة Demo Day** | «الوقت والقاعة يُعلنان لاحقًا» | `src/content/*.ts` → `demoDay.facts` |
| 3 | **خطوات اختيار الـstartups** | 3 خطوات عامة: تقديم ← مراجعة ← إيميل | `src/content/*.ts` → `demoDay.steps` |
| 4 | **الـEarly Bird (99 SAR) لسه شغال؟** | ظاهر مع باقي الأسعار | `src/content/*.ts` → `tickets.tiers` + `page.tsx` (JSON-LD) |
| 5 | **تذاكر الطلاب** | «تُتاح عبر PNU والأكاديمية السعودية الرقمية» من غير لينك | `tickets.student` |
| 6 | **أسماء المتحدثين بالعربي** | الأسماء والمناصب بالإنجليزي في الصفحة العربية كمان | `src/content/ar.ts` → `speakers.list` |
| 7 | **سياسة الخصوصية (PDPL)** | جملة قصيرة تحت الفورم، من غير لينك | `form.privacyNote` |

## 2. ملفات ناقصة

| # | الملف | اللي اتعمل دلوقتي |
|---|---|---|
| 8 | **لوجو PNU 2026 الرسمي** (`assets/logos/pnu-2026/PNU-logo-official-white.png`) — مش موجود في الـkit | استخدمنا `t-pnu-white.png` القديم. يتبدّل في `public/logos/pnu-white.png` |
| 9 | **لوجوهات SVG** (ZAT.VC · iyelo · ThaatAi · Thabat) — الـconnector مش بيقرا SVG | ظاهرين كاسم مكتوب. يتحطوا في `public/logos/` ويتضافوا في `src/lib/logos.ts` |
| 10 | **لوجوهات ناقصة من الـkit** (JOFOUZ · Companyx · Cloudative · Linx) | ظاهرين كاسم مكتوب |
| 11 | **حقوق صورة Red Hall** (`photos/redhall.jpg`) | مستخدمة في قسم المكان |

## 3. قرارات تقنية

| # | البند | التخمين اللي شغالين عليه |
|---|---|---|
| 12 | **الـhosting والـdomain** | Docker image (Node + PostgreSQL). ينفع على Azure أو DigitalOcean حسب الـZAT standard |
| 13 | **مين يستلم طلبات الفورم** | بتتخزن في PostgreSQL بس. هاني (أو أي حد) ياخدها CSV بـ `pnpm db:export` |
| 14 | **إشعار بإيميل لكل طلب جديد** | مش معمول. محتاج SMTP أو خدمة إيميل |
| 15 | **Analytics** (GA4 / Meta Pixel) | مفيش |
| 16 | **الصفحة بعد الحدث** (من 1 Dec) | العدّاد بيقول «Thank you for joining us» أوتوماتيك. باقي الصفحة زي ما هي |

## 4. تعارضات في المصادر (ما اتبنيش عليها)

- **عدد الـbooths:** 32 في الملف الرسمي، و27 في `VENUE.md` ← **مش مذكور في الصفحة**.
- **MCIT:** «In collaboration with» في الملف الرسمي، و«target partner» في `DEMODAY-INVITE.md` ← **مشينا على الملف الرسمي**.
- **الموقع الحالي** `expertslive.sa` مكتوب فيه «Where Microsoft Experts Unite» ← **مخالف لقاعدة الـbrand، ومش متكرر عندنا**.
