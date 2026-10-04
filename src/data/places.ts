import type { CatId, Place, Tag } from './types'

type Row = [
  id: string,
  cat: CatId,
  emoji: string,
  tr: string,
  en: string,
  dtr: string,
  den: string,
  lat: number,
  lng: number,
  tags: Tag[],
  mins: number,
  wiki?: string,
  wtr?: string,
]

const rows: Row[] = [
  // ---- Tarihi Yarımada
  ['ayasofya', 'tarih', '🕌', 'Ayasofya', 'Hagia Sophia', 'Bin beş yüz yıllık dev kubbe; Roma, Bizans ve Osmanlı\'nın tek çatı altında buluştuğu efsane.', 'A 1,500-year-old giant dome where Roman, Byzantine and Ottoman worlds meet under one roof.', 41.0086, 28.9802, ['culture', 'photo'], 90, 'Hagia_Sophia', 'Ayasofya'],
  ['sultanahmet', 'tarih', '🔵', 'Sultanahmet Camii', 'Blue Mosque', 'Altı minaresi ve mavi İznik çinileriyle meşhur, İstanbul silüetinin yıldızı.', 'Famous for six minarets and blue İznik tiles, the star of the Istanbul skyline.', 41.0054, 28.9768, ['culture', 'photo'], 45, 'Sultan_Ahmed_Mosque'],
  ['yerebatan', 'tarih', '🏛️', 'Yerebatan Sarnıcı', 'Basilica Cistern', 'Yer altında 336 sütunun uzandığı, Medusa başlarıyla ünlü gizemli su sarayı.', 'A mysterious underground water palace of 336 columns and legendary Medusa heads.', 41.0084, 28.9778, ['culture', 'photo'], 45, 'Basilica_Cistern'],
  ['topkapi', 'tarih', '👑', 'Topkapı Sarayı', 'Topkapı Palace', 'Osmanlı padişahlarının 400 yıl yaşadığı saray; Harem, hazine ve Boğaz manzarası.', 'Home of Ottoman sultans for 400 years: harem, treasury and a Bosphorus panorama.', 41.0115, 28.9833, ['culture', 'view'], 150, 'Topkapi_Palace'],
  ['tiem', 'tarih', '🧵', 'Türk ve İslam Eserleri Müzesi', 'Museum of Turkish and Islamic Arts', 'İbrahim Paşa Sarayı\'nda dünyaca ünlü halı ve el yazması koleksiyonu.', 'World-class carpet and manuscript collection inside Ibrahim Pasha Palace.', 41.0066, 28.9754, ['culture'], 75, 'Museum_of_Turkish_and_Islamic_Arts'],
  ['dikilitas', 'tarih', '🗿', 'Hipodrom & Dikilitaş', 'Hippodrome & Obelisk', 'Roma\'nın at yarışı meydanında 3500 yıllık Mısır dikilitaşı ve Yılanlı Sütun.', 'A 3,500-year-old Egyptian obelisk and the Serpent Column on the Roman chariot arena.', 41.0059, 28.9755, ['walk', 'culture', 'photo'], 20, 'Hippodrome_of_Constantinople'],
  ['gulhane', 'tarih', '🌷', 'Gülhane Parkı', 'Gülhane Park', 'Topkapı\'nın eski bahçesi; laleler, yüzyıllık çınarlar ve Boğaz\'a bakan seyir noktası.', 'The old Topkapı garden: tulips, century-old plane trees and a Bosphorus lookout.', 41.0131, 28.9814, ['walk', 'relax', 'photo'], 60, 'Gülhane_Park'],
  ['arkeoloji', 'tarih', '⚱️', 'İstanbul Arkeoloji Müzeleri', 'Istanbul Archaeology Museums', 'İskender Lahdi\'nden Kadeş Antlaşması\'na kadar antik dünyanın hazineleri.', 'Treasures of the ancient world, from the Alexander Sarcophagus to the Treaty of Kadesh.', 41.0117, 28.9812, ['culture'], 90, 'Istanbul_Archaeology_Museums'],
  ['arasta', 'tarih', '🏺', 'Arasta Çarşısı', 'Arasta Bazaar', 'Sultanahmet\'in arkasında seramik, kilim ve lokum dükkânlarıyla sakin bir çarşı.', 'A calm bazaar behind Sultanahmet with ceramics, kilims and Turkish delight.', 41.0053, 28.9786, ['shop', 'walk'], 40, 'Arasta_Bazaar'],
  ['kucukayasofya', 'tarih', '⛪', 'Küçük Ayasofya', 'Little Hagia Sophia', 'Ayasofya\'nın prototipi sayılan, huzurlu avlusuyla sakin bir Bizans kilisesi.', 'A peaceful Byzantine church seen as the prototype of Hagia Sophia, with a quiet courtyard.', 41.0030, 28.9724, ['culture', 'relax'], 30, 'Little_Hagia_Sophia'],
  ['suleymaniye', 'tarih', '🌙', 'Süleymaniye Camii', 'Süleymaniye Mosque', 'Mimar Sinan\'ın ustalık eseri; avlusundan Haliç ve Boğaz\'a kuşbakışı manzara.', 'Sinan\'s masterpiece with sweeping views of the Golden Horn and Bosphorus from its terrace.', 41.0161, 28.964, ['culture', 'view', 'photo'], 60, 'Süleymaniye_Mosque'],
  ['rustempasa', 'tarih', '🟦', 'Rüstem Paşa Camii', 'Rüstem Pasha Mosque', 'Duvarları baştan sona İznik çinileriyle kaplı, çarşının arasına saklanmış mücevher.', 'A jewel hidden above the market, covered floor to ceiling in İznik tiles.', 41.017, 28.9695, ['culture', 'photo'], 30, 'Rüstem_Pasha_Mosque'],
  ['kariye', 'tarih', '🖼️', 'Kariye (Chora)', 'Chora Church', 'Bizans mozaik ve freskolarının dünyadaki en güzel örneklerinden biri.', 'Home to some of the finest Byzantine mosaics and frescoes in the world.', 41.0308, 28.9394, ['culture', 'photo'], 60, 'Chora_Church'],

  // ---- Boğaz ve Sahiller
  ['ortakoy', 'bogaz', '🥔', 'Ortaköy', 'Ortaköy', 'Boğaz Köprüsü\'nün dibinde cami, kumpir, waffle ve martı sesi.', 'Mosque, loaded baked potatoes, waffles and seagulls under the Bosphorus Bridge.', 41.0476, 29.0268, ['walk', 'food', 'photo', 'sea'], 90, 'Ortaköy_Mosque'],
  ['dolmabahce', 'bogaz', '💎', 'Dolmabahçe Sarayı', 'Dolmabahçe Palace', 'Kristal avizeleri ve Boğaz\'a açılan cephesiyle Osmanlı\'nın görkemli son sarayı.', 'The last grand Ottoman palace with crystal chandeliers and a Bosphorus-front facade.', 41.0392, 29.0004, ['culture', 'photo'], 120, 'Dolmabahçe_Palace'],
  ['beylerbeyi', 'bogaz', '🏰', 'Beylerbeyi Sarayı', 'Beylerbeyi Palace', 'Anadolu yakasında Boğaz kıyısında küçük bir mermer yazlık saray.', 'A small marble summer palace on the Asian shore of the Bosphorus.', 41.0425, 29.04, ['culture', 'sea'], 75, 'Beylerbeyi_Palace'],
  ['kizkulesi', 'bogaz', '🗼', 'Kız Kulesi', 'Maiden\'s Tower', 'Üsküdar açığında denizin ortasındaki efsane kule; kafe ve manzara.', 'The legendary tower in the sea off Üsküdar, with a café and views.', 41.0211, 29.0041, ['photo', 'sea', 'view'], 60, 'Maiden\'s_Tower'],
  ['rumelihisari', 'bogaz', '🏯', 'Rumeli Hisarı', 'Rumelihisarı Fortress', 'Fatih\'in 4 ayda yaptırdığı kale; Boğaz\'ın en dar noktasında surlar.', 'The fortress Mehmed II built in four months, at the narrowest point of the strait.', 41.0847, 29.0564, ['culture', 'view', 'walk'], 60, 'Rumelihisarı'],
  ['emirgan', 'bogaz', '🌺', 'Emirgan Korusu', 'Emirgan Park', 'Nisanda lale festivaliyle, yılın geri kalanında köşklerle çevrili sakin koru.', 'Tulip festival in April, a calm grove with pavilions the rest of the year.', 41.1085, 29.0553, ['walk', 'relax', 'photo'], 90, 'Emirgan_Park'],
  ['bebek', 'bogaz', '🍦', 'Bebek Sahili', 'Bebek Waterfront', 'Dondurma, kahve ve yürüyüş yolu; İstanbul\'un en şık sahil mahallesi.', 'Ice cream, coffee and a seaside promenade in the city\'s chicest waterfront district.', 41.077, 29.0434, ['walk', 'relax', 'sea'], 90, 'Bebek,_Istanbul'],
  ['arnavutkoy', 'bogaz', '🏠', 'Arnavutköy Sokakları', 'Arnavutköy Streets', 'Ahşap yalılar, balıkçı restoranlar ve rengârenk evlerle Boğaz\'ın tatlı köşesi.', 'Wooden mansions, fish restaurants and colorful houses on a sweet corner of the Bosphorus.', 41.0661, 29.0426, ['walk', 'photo', 'food'], 75, 'Arnavutköy,_Istanbul'],
  ['kanlica', 'bogaz', '🥛', 'Kanlıca', 'Kanlıca', 'İskele önünde ünlü Kanlıca yoğurdu yiyip Boğaz\'ı izleyin.', 'Eat the famous Kanlıca yoghurt on the pier and watch the Bosphorus drift by.', 41.0983, 29.064, ['food', 'relax', 'sea'], 60, 'Kanlıca'],
  ['cengelkoy', 'bogaz', '🥒', 'Çengelköy', 'Çengelköy', 'Meşhur çengelköy salatalığı, çınar altı çay bahçeleri ve Boğaz\'a bakan tarihi iskele.', 'Famed cucumbers, plane-tree tea gardens and a historic pier facing the Bosphorus.', 41.0556, 29.0507, ['walk', 'relax', 'sea'], 75, 'Çengelköy'],
  ['kuzguncuk', 'bogaz', '🎨', 'Kuzguncuk', 'Kuzguncuk', 'Cami, kilise ve sinagogun yan yana durduğu renkli, kasaba sakinliğinde mahalle.', 'A colorful village-like quarter where a mosque, church and synagogue stand side by side.', 41.0372, 29.0302, ['walk', 'photo', 'relax'], 90, 'Kuzguncuk'],
  ['salacak', 'bogaz', '🌇', 'Salacak Sahili', 'Salacak Shore', 'Kız Kulesi\'ni karşıdan seyredip gün batımını izlemek için en iyi nokta.', 'The best spot to watch Maiden\'s Tower and the sunset from across the water.', 41.0209, 29.0095, ['view', 'relax', 'photo', 'sea'], 60, 'Üsküdar'],
  ['yildiz', 'bogaz', '🌳', 'Yıldız Parkı', 'Yıldız Park', 'Beşiktaş\'ın yamacında göletleri, köşkleri ve ağaçlarıyla bir orman parkı.', 'A forested hillside park above Beşiktaş with ponds and pavilions.', 41.048, 29.0125, ['walk', 'relax'], 90, 'Yıldız_Park'],
  ['besiktas', 'bogaz', '🐟', 'Beşiktaş Çarşısı', 'Beşiktaş Market', 'Balıkçılar, meyhaneler ve gençlerin kalbi; yerel bir İstanbul akşamı.', 'Fishmongers, taverns and youthful energy; a local Istanbul evening.', 41.043, 29.007, ['food', 'walk'], 75, 'Beşiktaş,_Istanbul'],

  // ---- Müzeler ve Sanat
  ['istanbulmodern', 'muze', '🖼️', 'İstanbul Modern', 'Istanbul Modern', 'Karaköy\'de Renzo Piano tasarımı binada Türk modern sanatının kalbi.', 'The heart of Turkish modern art in a Renzo Piano building in Karaköy.', 41.0268, 28.976, ['culture', 'photo'], 90, 'Istanbul_Modern'],
  ['pera', 'muze', '🎭', 'Pera Müzesi', 'Pera Museum', 'Osman Hamdi Bey\'in Kaplumbağa Terbiyecisi\'ni gördüğünüz Beyoğlu müzesi.', 'The Beyoğlu museum home to Osman Hamdi Bey\'s "The Tortoise Trainer".', 41.0313, 28.9742, ['culture'], 75, 'Pera_Museum'],
  ['sakip', 'muze', '🏡', 'Sakıp Sabancı Müzesi', 'Sakıp Sabancı Museum', 'Emirgan\'da Boğaz\'a bakan köşk; hat koleksiyonu ve dünya çapında sergiler.', 'A Bosphorus-side mansion in Emirgan with calligraphy and world-class exhibitions.', 41.107, 29.056, ['culture', 'view'], 90, 'Sakıp_Sabancı_Museum'],
  ['rahmikoc', 'muze', '🚂', 'Rahmi Koç Müzesi', 'Rahmi M. Koç Museum', 'Haliç kıyısında denizaltı, uçak, lokomotif ve eski otomobillerle dolu eğlenceli müze.', 'A fun Golden Horn museum filled with a submarine, planes, locomotives and vintage cars.', 41.0446, 28.9489, ['culture'], 120, 'Rahmi_M._Koç_Museum'],
  ['salt', 'muze', '📚', 'SALT Galata', 'SALT Galata', 'Eski Osmanlı Bankası binasında ücretsiz sergiler ve arşivler.', 'Free exhibitions and archives inside the old Ottoman Bank building.', 41.0243, 28.974, ['culture'], 60, 'SALT_(cultural_institution)'],
  ['panorama1453', 'muze', '⚔️', 'Panorama 1453', 'Panorama 1453 History Museum', 'İstanbul\'un fethini 360 derecelik dev bir resimle yaşayın.', 'Relive the 1453 conquest inside a giant 360° painting.', 41.0166, 28.9235, ['culture'], 45, 'Panorama_1453_History_Museum'],
  ['borusan', 'muze', '🎷', 'Borusan Contemporary', 'Borusan Contemporary', 'Rumeli Hisarı yakınında modern sanat ve Boğaz manzaralı çağdaş koleksiyon.', 'Contemporary art with Bosphorus views near Rumelihisarı.', 41.0846, 29.0562, ['culture'], 60, 'Borusan_Contemporary'],
  ['akm', 'muze', '🎻', 'Atatürk Kültür Merkezi', 'Atatürk Cultural Center', 'Taksim Meydanı\'nda opera, bale ve tiyatro sahnesi.', 'Opera, ballet and theatre on Taksim Square.', 41.0369, 28.9857, ['culture'], 60, 'Atatürk_Cultural_Center'],
  ['zorlu', 'muze', '🎤', 'Zorlu PSM', 'Zorlu PSM', 'Konserler, müzikaller ve tiyatro; İstanbul\'un modern sahne merkezlerinden.', 'Concerts, musicals and theatre at one of Istanbul\'s modern stages.', 41.0675, 29.0165, ['culture'], 120, 'Zorlu_Performing_Arts_Center'],
  ['babylon', 'muze', '🎶', 'Babylon', 'Babylon', 'Şişhane\'de canlı müziğin ve caz gecelerinin kalbi.', 'The beating heart of live music and jazz nights in Şişhane.', 41.0295, 28.9776, ['culture'], 120, 'Babylon_(club)'],
  ['asiyan', 'muze', '📖', 'Aşiyan Müzesi', 'Aşiyan Museum', 'Tevfik Fikret\'in Boğaz\'a bakan ahşap evi; şiir ve deniz bir arada.', 'Poet Tevfik Fikret\'s wooden house over the Bosphorus; poetry and sea together.', 41.0872, 29.0558, ['culture', 'view'], 45, 'Tevfik_Fikret'],
  ['miniaturk', 'muze', '🗺️', 'Miniatürk', 'Miniatürk', 'Türkiye\'nin ünlü yapıları minyatür olarak; çocuklarla keyifli bir gün.', 'Turkey\'s famous landmarks in miniature; a joyful day out with kids.', 41.0627, 28.94, ['culture', 'walk'], 120, 'Miniatürk'],

  // ---- Semtler ve Sokaklar
  ['galatakulesi', 'semt', '🗼', 'Galata Kulesi', 'Galata Tower', '700 yıllık taş kulenin tepesinden İstanbul\'un en meşhur 360° manzarası.', 'The most famous 360° view of Istanbul from a 700-year-old stone tower.', 41.0256, 28.9744, ['view', 'photo', 'culture'], 60, 'Galata_Tower'],
  ['karakoy', 'semt', '⚓', 'Karaköy İskelesi & Galataport', 'Karaköy Pier & Galataport', 'Vapur sesleri, sokak sanatı ve yeni sahil yürüyüş yolu.', 'Ferry horns, street art and a new waterfront promenade.', 41.023, 28.978, ['walk', 'photo', 'sea'], 60, 'Karaköy'],
  ['istiklal', 'semt', '🚋', 'İstiklal Caddesi', 'İstiklal Avenue', 'Nostaljik tramvay, kitapçılar, pasajlar ve sokak müzisyenleri.', 'Nostalgic tram, bookshops, arcades and street musicians.', 41.034, 28.977, ['walk', 'shop', 'food'], 90, 'İstiklal_Avenue'],
  ['cicekpasaji', 'semt', '💐', 'Çiçek Pasajı', 'Çiçek Pasajı', 'Tarihi pasajda meyhane tezgâhları ve canlı müzik.', 'Taverns and live music inside a historic arcade.', 41.0344, 28.9757, ['food', 'culture'], 60, 'Çiçek_Pasajı'],
  ['asmalimescit', 'semt', '🍷', 'Asmalımescit', 'Asmalımescit', 'Bar, meyhane ve butik dolu dar sokaklarda gece hayatı.', 'Nightlife in narrow streets full of bars, taverns and boutiques.', 41.031, 28.9745, ['food', 'walk'], 90, 'Asmalımescit'],
  ['cihangir', 'semt', '🐈', 'Cihangir Sokakları', 'Cihangir Streets', 'Kediler, kafeler ve Boğaz\'a bakan bohem teras.', 'Cats, cafés and bohemian terraces overlooking the Bosphorus.', 41.0316, 28.9843, ['walk', 'relax', 'photo'], 90, 'Cihangir'],
  ['balat', 'semt', '🌈', 'Balat Renkli Evler', 'Balat Colorful Houses', 'Merdivenlerle çıkılan rengârenk evler ve fotoğraf çekmeye doyamayacağınız sokaklar.', 'Staircase-climbing colorful houses and streets you\'ll never tire of photographing.', 41.0295, 28.949, ['walk', 'photo'], 90, 'Balat,_Istanbul'],
  ['fener', 'semt', '⛪', 'Fener Rum Lisesi', 'Phanar Greek Orthodox College', 'Kırmızı tuğlalı kale görünümlü okul; Haliç tepesinde ikonik bir bina.', 'A castle-like red brick school: an iconic building above the Golden Horn.', 41.029, 28.949, ['walk', 'photo', 'culture'], 30, 'Phanar_Greek_Orthodox_College'],
  ['kamondo', 'semt', '🌀', 'Kamondo Merdivenleri', 'Camondo Stairs', 'Karaköy\'de art nouveau kıvrımlı, İstanbul\'un en sevilen merdiveni.', 'Karaköy\'s beloved art nouveau curved staircase.', 41.0224, 28.9756, ['photo', 'walk'], 15, 'Camondo_Stairs'],
  ['bankalar', 'semt', '🏦', 'Bankalar Caddesi', 'Bankalar Street', 'Osmanlı döneminin finans merkezinde neoklasik binalar.', 'Neoclassical buildings in the Ottoman-era financial district.', 41.0215, 28.974, ['walk', 'culture', 'photo'], 30, 'Bankalar_Caddesi'],
  ['moda', 'semt', '🌅', 'Moda Sahili', 'Moda Seafront', 'Kadıköy\'ün gün batımı, dondurma ve çimlerde piknik mekânı.', 'Kadıköy\'s sunset, ice cream and picnic-on-the-grass spot.', 40.9776, 29.025, ['walk', 'relax', 'view', 'sea'], 90, 'Moda,_Istanbul'],
  ['yeldegirmeni', 'semt', '🎨', 'Yeldeğirmeni', 'Yeldeğirmeni', 'Sokaklarını kaplayan duvar resimleriyle açık hava galerisi gibi mahalle.', 'A neighbourhood like an open-air gallery with murals on every street.', 40.9918, 29.025, ['walk', 'photo'], 60, 'Kadıköy'],
  ['bahariye', 'semt', '🚃', 'Bahariye Caddesi', 'Bahariye Avenue', 'Nostaljik tramvay, kitapçılar ve kafelerle Kadıköy\'ün ana caddesi.', 'Kadıköy\'s main street with its nostalgic tram, bookshops and cafés.', 40.989, 29.029, ['walk', 'shop'], 60, 'Kadıköy'],
  ['kadifesokak', 'semt', '🎸', 'Kadife Sokak', 'Kadife Street', 'Kadıköy\'ün bar ve canlı müzik sokağı; akşam burada başlar.', 'Kadıköy\'s street of bars and live music; the evening starts here.', 40.9878, 29.0275, ['food', 'walk'], 90, 'Kadıköy'],

  // ---- Yeme ve İçme
  ['gulluoglu', 'yeme', '🍯', 'Karaköy Güllüoğlu', 'Karaköy Güllüoğlu', 'Çıtır baklava ve sıcak börek; İstanbul\'un en sevilen tatlıcısı.', 'Crispy baklava and hot börek at one of Istanbul\'s favorite pastry shops.', 41.023, 28.9785, ['food'], 30, 'Baklava'],
  ['hafizmustafa', 'yeme', '🍬', 'Hafız Mustafa', 'Hafız Mustafa', 'Lokum, baklava ve sütlü tatlılarda 1864\'ten beri klasik.', 'A classic since 1864 for lokum, baklava and milk desserts.', 41.0145, 28.9715, ['food'], 30, 'Turkish_delight'],
  ['karakoylokantasi', 'yeme', '🍲', 'Karaköy Lokantası', 'Karaköy Lokantası', 'Modern lokanta yemekleri, mezeler ve Boğaz esintisi.', 'Modern lokanta classics and meze with a Bosphorus breeze.', 41.0225, 28.9775, ['food'], 75, 'Meze'],
  ['pandeli', 'yeme', '🐟', 'Pandeli', 'Pandeli', 'Mısır Çarşısı üstünde 1901\'den beri çinili salonuyla İstanbul klasiği.', 'An Istanbul classic since 1901 in a tiled hall above the Spice Bazaar.', 41.0166, 28.9709, ['food', 'culture'], 75, 'Egyptian_Bazaar'],
  ['balikekmek', 'yeme', '🥪', 'Eminönü Balık Ekmek', 'Eminönü Fish Sandwich', 'Teknede pişen balık ekmek, turşu ve şalgam; İstanbul\'un klasik lezzeti.', 'Boat-grilled fish sandwich with pickles and turnip juice, an Istanbul staple.', 41.0178, 28.9738, ['food', 'sea'], 30, 'Balık_ekmek'],
  ['islak', 'yeme', '🍔', 'Islak Hamburger', 'Wet Burger (Islak)', 'Taksim\'in buharlı, sosa batmış gece atıştırmalığı.', 'Taksim\'s steamy, sauce-soaked late-night snack.', 41.037, 28.985, ['food'], 20, 'Slider_(sandwich)'],
  ['vankahvalti', 'yeme', '🍳', 'Van Kahvaltı Evi', 'Van Breakfast House', 'Cihangir\'de şöhretli serpme Van kahvaltısı; uzun masalar, bol çay.', 'Cihangir\'s famed Van-style breakfast spread: long tables and endless tea.', 41.031, 28.9835, ['food'], 75, 'Turkish_breakfast'],
  ['modacay', 'yeme', '🍵', 'Moda Çay Bahçesi', 'Moda Tea Garden', 'Denize bakan çay bahçesi; gün batımında çay ve simit.', 'A seaside tea garden: tea and simit at sunset.', 40.981, 29.0245, ['relax', 'food', 'view'], 60, 'Turkish_tea'],
  ['ciya', 'yeme', '🥘', 'Çiya Sofrası', 'Çiya Sofrası', 'Anadolu mutfağını arşivleyen Kadıköy\'ün efsane lokantası.', 'Kadıköy\'s legendary restaurant archiving Anatolian regional cuisine.', 40.9902, 29.0258, ['food', 'culture'], 75, 'Turkish_cuisine'],
  ['kumpir', 'yeme', '🥔', 'Ortaköy Kumpir', 'Ortaköy Kumpir', 'Dev patates, onlarca malzeme; Ortaköy\'ün en eğlenceli yemeği.', 'Giant baked potato with dozens of toppings: Ortaköy\'s most fun meal.', 41.0478, 29.027, ['food'], 30, 'Kumpir'],
  ['hamdi', 'yeme', '🍢', 'Hamdi Restaurant', 'Hamdi Restaurant', 'Eminönü\'nde Haliç manzaralı teras ve kebap-ciğer sofraları.', 'Eminönü terrace over the Golden Horn with kebab and liver feasts.', 41.0178, 28.9707, ['food', 'view'], 75, 'Kebab'],

  // ---- Manzara ve Dinlenme
  ['pierreloti', 'manzara', '☕', 'Pierre Loti Tepesi', 'Pierre Loti Hill', 'Haliç\'e bakan teleferikli tepe; çay eşliğinde klasik İstanbul manzarası.', 'A cable-car hill over the Golden Horn; classic Istanbul views with tea.', 41.0547, 28.934, ['view', 'relax', 'photo'], 75, 'Pierre_Loti_Hill'],
  ['camlica', 'manzara', '🌄', 'Büyük Çamlıca Tepesi', 'Büyük Çamlıca Hill', 'İstanbul\'un en yüksek noktalarından 360° şehir panoraması.', 'A 360° city panorama from one of Istanbul\'s highest points.', 41.0273, 29.0702, ['view', 'photo', 'relax'], 90, 'Çamlıca_Hill'],
  ['belgrad', 'manzara', '🌲', 'Belgrad Ormanı', 'Belgrad Forest', 'Şehrin akciğeri; koşu parkurları, göletler ve piknik alanları.', 'The city\'s lungs: running trails, ponds and picnic spots.', 41.1858, 28.9772, ['walk', 'relax'], 180, 'Belgrad_Forest'],
  ['ulus', 'manzara', '🌉', 'Ulus Parkı', 'Ulus Park', 'Boğaz\'ı yüksekten izlediğiniz sakin bir park.', 'A calm park with a high-up Bosphorus view.', 41.055, 29.0243, ['view', 'relax'], 60, 'Ulus,_Beşiktaş'],
  ['macka', 'manzara', '🌿', 'Maçka Parkı', 'Maçka Park', 'Şehir ortasında Boğaz\'a doğru uzanan yeşil kaçış.', 'A green escape in the city sloping toward the Bosphorus.', 41.047, 28.993, ['walk', 'relax'], 60, 'Maçka_Democracy_Park'],
  ['eyup', 'manzara', '🚡', 'Eyüpsultan', 'Eyüpsultan', 'Teleferik, türbeler ve Haliç boyunca nostaljik sahil.', 'Cable car, shrines and a nostalgic shore along the Golden Horn.', 41.0477, 28.9338, ['walk', 'culture', 'view'], 90, 'Eyüp_Sultan_Mosque'],
  ['caddebostan', 'manzara', '🚴', 'Caddebostan Sahili', 'Caddebostan Shore', 'Bisiklet yolu, çimler ve geniş deniz ufku.', 'Cycle path, lawns and a wide sea horizon.', 40.968, 29.06, ['walk', 'relax', 'sea'], 90, 'Caddebostan'],
  ['galataportsahil', 'manzara', '🛳️', 'Galataport Sahili', 'Galataport Waterfront', 'Yeni sahil yürüyüşünde Kız Kulesi ve Topkapı manzarası.', 'A fresh waterfront stroll with views toward Maiden\'s Tower and Topkapı.', 41.0245, 28.9815, ['walk', 'view', 'sea'], 45, 'Galataport_Istanbul'],

  // ---- Adalar ve Kaçamaklar
  ['buyukada', 'adalar', '🐴', 'Büyükada', 'Büyükada', 'Faytonlar, ahşap köşkler ve çam kokulu yollarla İstanbul\'dan kaçış.', 'Horse carriages, wooden villas and pine-scented lanes: a real escape from Istanbul.', 40.8749, 29.1295, ['walk', 'relax', 'sea', 'photo'], 300, 'Büyükada'],
  ['ayayorgi', 'adalar', '⛪', 'Aya Yorgi Manastırı', 'Aya Yorgi Monastery', 'Büyükada\'nın zirvesine yürüyüşle çıkılan tepede kutsal manastır ve Marmara manzarası.', 'A hilltop monastery on Büyükada\'s summit with Marmara views, reached on foot.', 40.8697, 29.1217, ['walk', 'view', 'culture'], 150, 'Büyükada'],
  ['heybeliada', 'adalar', '🚲', 'Heybeliada', 'Heybeliada', 'Ruhban Okulu tepesi, sakin sahiller ve çam ormanları.', 'The seminary hill, quiet beaches and pine forests.', 40.8765, 29.0953, ['walk', 'relax', 'sea'], 240, 'Heybeliada'],
  ['burgazada', 'adalar', '📚', 'Burgazada', 'Burgazada', 'Sait Faik\'in adası; çınarlar, sessizlik ve sahil balık restoranları.', 'Sait Faik\'s island: plane trees, silence and seaside fish restaurants.', 40.883, 29.067, ['walk', 'relax', 'food', 'sea'], 240, 'Burgazada'],
  ['kinaliada', 'adalar', '🏝️', 'Kınalıada', 'Kınalıada', 'Adaların en yakını; kızıl topraklı tepeleri ve küçük sahilleriyle günübirlik kaçamak.', 'The closest of the islands: red-earth hills and small beaches for a day trip.', 40.911, 29.048, ['walk', 'sea', 'relax'], 180, 'Kınalıada'],
  ['polonezkoy', 'adalar', '🌲', 'Polonezköy', 'Polonezköy', 'Ormanlar içinde Polonyalı göçmenlerin kurduğu köy; kahvaltı ve doğa yürüyüşü.', 'A forest village founded by Polish settlers; breakfasts and nature walks.', 41.121, 29.21, ['walk', 'relax', 'food'], 240, 'Polonezköy'],

  // ---- Alışveriş ve Pazarlar
  ['kapalicarsi', 'alisveris', '🏺', 'Kapalıçarşı', 'Grand Bazaar', 'Dünyanın en eski ve büyük kapalı çarşısı; 4000 dükkân, altın, halı ve fener.', 'One of the world\'s oldest and largest covered markets: 4,000 shops of gold, carpets and lamps.', 41.0107, 28.968, ['shop', 'walk', 'culture'], 120, 'Grand_Bazaar,_Istanbul'],
  ['misircarsisi', 'alisveris', '🌶️', 'Mısır Çarşısı', 'Spice Bazaar', 'Baharat, lokum ve kuru meyve kokulu 1660\'tan kalma çarşı.', 'A 1660 market that smells of spices, lokum and dried fruit.', 41.0166, 28.9708, ['shop', 'food', 'photo'], 60, 'Spice_Bazaar'],
  ['sahaflar', 'alisveris', '📖', 'Sahaflar Çarşısı', 'Booksellers\' Bazaar', 'Beyazıt\'ta nadir kitap, eski harita ve el yazması avı.', 'Hunt for rare books, old maps and manuscripts in Beyazıt.', 41.0105, 28.967, ['shop', 'culture'], 45, 'Sahaflar_Çarşısı'],
  ['mahmutpasa', 'alisveris', '👗', 'Mahmutpaşa', 'Mahmutpaşa', 'Çarşının yanında kıyafet, ev tekstili ve uygun fiyatlı tarihi alışveriş yolu.', 'A historic bargain-shopping road by the bazaar for clothes and textiles.', 41.0125, 28.97, ['shop', 'walk'], 60, 'Mahmutpaşa,_Istanbul'],
  ['cukurcuma', 'alisveris', '🪑', 'Çukurcuma Antikacıları', 'Çukurcuma Antiques', 'Eskici dükkânlar, Masumiyet Müzesi ve nostalji tutkunlarına sokaklar.', 'Antique shops, the Museum of Innocence and streets for nostalgia lovers.', 41.0322, 28.9795, ['shop', 'walk', 'photo'], 90, 'Çukurcuma'],
  ['balatantika', 'alisveris', '🕰️', 'Balat Antikacılar', 'Balat Antiques', 'Vintage eşyalar ve sevimli kafelerle Balat\'ın kıyı sokakları.', 'Vintage finds and cute cafés on Balat\'s lanes.', 41.03, 28.949, ['shop', 'walk'], 75, 'Balat,_Istanbul'],
  ['ferikoyantika', 'alisveris', '🎻', 'Feriköy Antika Pazarı', 'Feriköy Antique Market', 'Pazar günleri kurulan antika, plak ve koleksiyon pazarı.', 'A Sunday market of antiques, vinyl and collectibles.', 41.0584, 28.9798, ['shop', 'culture'], 90, 'Feriköy'],
  ['homer', 'alisveris', '📘', 'Homer Kitabevi', 'Homer Bookstore', 'Beyoğlu\'nda edebiyat meraklılarının en sevdiği kitabevi.', 'Beyoğlu\'s favorite bookstore for literature lovers.', 41.033, 28.9764, ['shop', 'relax'], 45, 'Bookselling'],
  ['kadikoypazari', 'alisveris', '🧀', 'Kadıköy Çarşısı', 'Kadıköy Market', 'Peynirciler, balıkçılar ve turşucularla İstanbul\'un en canlı yerel pazarı.', 'Cheesemongers, fishmongers and pickle shops in Istanbul\'s liveliest local market.', 40.9905, 29.025, ['shop', 'food', 'walk'], 90, 'Kadıköy'],
]

export const PLACES: Place[] = rows.map(
  ([id, cat, emoji, tr, en, dtr, den, lat, lng, tags, mins, wiki, wtr]) => ({
    id,
    cat,
    emoji,
    tr,
    en,
    dtr,
    den,
    lat,
    lng,
    tags,
    mins,
    wiki,
    wtr,
  }),
)

export const PLACE_BY_ID = Object.fromEntries(PLACES.map((p) => [p.id, p])) as Record<string, Place>
