# Deploy — Docker والنشر المؤقت

## 1. الـDocker في مشروعنا

| الملف | دوره |
|---|---|
| `Dockerfile` | وصفة بناء الـ**image**: بيسطّب الـpackages، ويعمل build، ويطلّع image صغيرة فيها السيرفر بس |
| `docker-compose.yml` | بيشغّل **container** للتطبيق و**container** لـ PostgreSQL مع بعض، ويربطهم ببعض |
| `.dockerignore` | الملفات اللي ما تدخلش الـimage (`node_modules` · `.env` · `.git`) |
| `/api/health` | Docker بيسأله كل 30 ثانية: «إنت شغال؟ والداتابيز شغالة؟» |

**الـDockerfile مقسوم 3 مراحل (multi-stage):**

```
deps   ← pnpm install                 (الـpackages بس)
build  ← pnpm build                   (بيطلّع .next/standalone)
run    ← node:22-alpine + standalone  ← الـimage النهائية، من غير أدوات البناء
```

**لما الـcontainer يشتغل:** بيعمل `migrate` الأول (ويستنى لحد ما الداتابيز تصحى)، وبعدين يشغّل السيرفر. والسيرفر بيشتغل بـ user عادي، مش root.

### الأوامر

```bash
docker compose up -d --build     # يبني ويشغّل كل حاجة → http://localhost:3000
docker compose ps                # الحالة (لازم web يبقى healthy)
docker compose logs -f web       # الـlogs
docker compose down              # يقفل (البيانات بتفضل محفوظة في volume)
docker compose up -d db          # الداتابيز بس، لو هتشتغل بـ pnpm dev
```

## 2. نشر مؤقت عشان نعرض على هاني

### الطريقة (أ): لينك فوري من جهازك — Cloudflare Tunnel

- مجاني، ومن غير حساب.
- اللينك شغال **طول ما جهازك صاحي والأمر شغال**.

```bash
docker compose up -d --build
# تسطيب cloudflared مرة واحدة (Ubuntu):
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
cloudflared tunnel --url http://localhost:3000
```

هيطبع لينك زي `https://something-random.trycloudflare.com`، ابعته لهاني.

### الطريقة (ب): لينك ثابت — Render (من الـ`render.yaml`)

- شغال حتى لو جهازك مقفول.
- الخطة المجانية: السيرفر **بينام بعد 15 دقيقة من غير زوار**، فأول فتحة بعدها بتاخد حوالي دقيقة.
- الداتابيز المجانية **بتتمسح بعد 30 يوم**. ده كفاية للعرض المؤقت، ومش للـproduction.

**الخطوات:**

1. اعمل push لآخر نسخة على GitHub.
2. ادخل [render.com](https://render.com) وسجّل بحساب GitHub.
3. **New → Blueprint** واختار الريبو `Experts-Live-LandingPage`.
4. Render هيقرا `render.yaml` ويعمل الـweb service والداتابيز. دوس **Apply**.
5. لما يخلص، اللينك هيبقى زي `https://elksa-landing.onrender.com`.
6. لو اللينك طلع مختلف، غيّر `NEXT_PUBLIC_SITE_URL` في الـEnvironment بتاع الـservice، وبعدين **Manual Deploy**.

## 3. قبل الـproduction الحقيقي

شوف قسم «مطلوب وقت الـdeploy» في `docs/TEST-REPORT.md`: HTTPS و HSTS، والدومين، و`IP_HASH_SALT`، والـbackup.
