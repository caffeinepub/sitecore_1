# SiteCore – Sürüm 13

## Current State
33 modüllü konut yönetim platformu. Frontend-only mimari, localStorage tabanlı veri. BuildingPanel.tsx içinde tab bazlı navigasyon, 6 kategorili sidebar. Tüm modüller birer sayfa bileşeni olarak pages/ klasöründe.

## Requested Changes (Diff)

### Add
- **RenovationPermits.tsx** – İzin & Tadilat Yönetimi: başvuru formu (tarih aralığı, çalışma türü, etkilenen katlar), yönetici onay/ret akışı, çalışma saati kısıtlaması, komşu bildirimi notu, tamamlanma kaydı
- **NeighborForum.tsx** – Komşu Forumu: konu başlıkları (kategori: genel/öneri/şikayet/etkinlik), yorum sistemi, beğeni, yönetici moderasyon (konu kapatma/silme), sabitlenmiş konular
- **VisitorPreAuth.tsx** – Dijital Ziyaretçi Ön İzni & QR: sakin önceden misafir kaydı oluşturur, 6 haneli erişim kodu üretilir, güvenlik görevlisi kod ile onay verir, geçmiş ve durum takibi
- **HelpCenter.tsx** – SSS & Yardım Merkezi: kategori bazlı SSS (genel/aidat/teknik/güvenlik), accordion görünümü, arama, yönetici ekleme/düzenleme/silme
- **BudgetPlanning.tsx** – Bütçe Planlama & Projeksiyon: yıllık bütçe hedefi belirleme, aylık projeksiyon tablosu, gerçekleşen vs hedef karşılaştırma, sapma uyarısı, kategori bazlı bütçe dağılımı
- **DuesPaymentPlan.tsx** – Aidat Ödeme Planı & Taksit: borçlu daire seçimi, taksit sayısı belirleme (2-12 ay), plan oluşturma ve onaylama, taksit takvimi görünümü, ödeme durumu güncelleme

### Modify
- **BuildingPanel.tsx** (maintenance tab) – Fotoğraf yükleme alanı (base64 preview), öncelik yükseltme butonu (Düşük→Orta→Yüksek→Kritik), öncelik badge gösterimi
- **BuildingPanel.tsx** (announcements tab) – Hedef kitle seçici (Tüm Sakinler / Belirli Katlar / Belirli Daireler), okundu takibi (okuyanlar listesi)
- **BuildingPanel.tsx** (overview tab) – Bina Sağlık Skoru: geciken aidat %, açık arızalar, şikayet çözüm oranı, toplantı katılımı metriklerinden 0-100 arası tek skor
- **CommonAreaReservation.tsx** – Alan bazlı kapasite limiti tanımlama, dolduğunda bekleme listesine ekleme, sıra bildirimi
- **StaffManagement.tsx** – İzin/devamsızlık talebi formu, izin takvimi görünümü, aylık toplam çalışma saati özeti
- **BuildingPanel.tsx** (tabs/sidebar) – 6 yeni modül eklenmesi: renovationPermits, forum, visitorPreAuth, helpCenter, budgetPlanning, duesPaymentPlan

### Remove
Hiçbir şey kaldırılmıyor.

## Implementation Plan
1. 6 yeni sayfa bileşeni oluştur (localStorage tabanlı, mock data içeren)
2. BuildingPanel.tsx'e 6 yeni tab ekle, sidebar kategorilerine dağıt
3. Arıza Bildirimi tabına fotoğraf + öncelik yükseltme ekle
4. Duyurular tabına hedef kitle + okundu takibi ekle
5. Overview tabına Bina Sağlık Skoru kartı ekle
6. CommonAreaReservation.tsx'e kapasite + bekleme listesi ekle
7. StaffManagement.tsx'e izin/devamsızlık + saat özeti ekle
