# İstanbul Gezi Rehberi 🎡

"Bugün İstanbul'un neresini gezsem?" sorusuna cevap veren, oyunlaştırılmış ve animasyonlu bir gezi sitesi (React + TypeScript + Vite + Motion + Leaflet).

- **Çark:** ruh hali / süre / yakınlık filtresi seç, çarkı çevir, rastgele bir durak çıksın.
- **Keşfet:** 128 mekan, favoriler (❤️); kategori, etiket ve arama; konuma göre sıralama.
- **Harita:** Leaflet ile tüm mekanlar, konumunu göster.
- **Dev poster çarkı:** 128 dilimli halka, "Beni rastgele bir yere yolla!"
- **Günün görevi:** her gün 3 yeni mekan, +30 XP
- **Turlar:** 30 hazır rota, tema filtresi (tarih, lezzet, doğa, sanat, deniz, gece)
- **Mekan detayı:** ilçe, ulaşım, giriş, en iyi zaman, ipucu; Vikipedi açıklaması ve fotoğraf galerisi. Turlarda adım adım ilerleme ve Google Maps rota linki.
- **Pasaport:** XP, seviye, rozet ve damgalar (tarayıcıda saklanır).
- Türkçe / English.

Görseller çalışma anında Vikipedi REST API'sinden çekilir; yüklenemezse renkli yedek görünür.

```bash
npm install
npm run dev
npm run build
```
