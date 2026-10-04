// Practical info for every place: district, nearest stop, price, best time, tip (tr/en)
export type Price = 'free' | 'paid' | 'food'
export type Best = 'morning' | 'day' | 'sunset' | 'evening' | 'any'

export interface PlaceInfo {
  district: string
  stop: string
  price: Price
  best: Best
  tipTr: string
  tipEn: string
}

type Row = [string, string, Price, Best, string, string]

const T: Record<string, Row> = {
  // ---- Tarihi Yarımada
  ayasofya: ['Fatih', 'T1 Sultanahmet', 'paid', 'morning', 'Namaz vakitlerinde ziyarete kapanır; açılışta gitmek kuyruğu kısaltır.', 'Closes to visitors at prayer times; go at opening to beat the queue.'],
  sultanahmet: ['Fatih', 'T1 Sultanahmet', 'free', 'morning', 'Omuz ve dizleri örten kıyafet giyin; girişte başörtüsü verilir.', 'Cover shoulders and knees; headscarves are provided at the door.'],
  yerebatan: ['Fatih', 'T1 Sultanahmet', 'paid', 'day', 'Akşam saatlerindeki ışık gösterileri ayrı bir deneyim sunar.', 'Evening light installations make it a different experience.'],
  topkapi: ['Fatih', 'T1 Gülhane', 'paid', 'morning', 'Salı günleri kapalıdır; Harem için ayrı bilet gerekir.', 'Closed on Tuesdays; the Harem needs a separate ticket.'],
  tiem: ['Fatih', 'T1 Sultanahmet', 'paid', 'day', 'Hipodrom tarafındaki kafesinden Sultanahmet Camii görünür.', 'Its café on the Hippodrome side faces the Blue Mosque.'],
  dikilitas: ['Fatih', 'T1 Sultanahmet', 'free', 'any', 'Alman Çeşmesi de meydanın kuzey ucundadır, kaçırmayın.', 'Don\'t miss the German Fountain at the square\'s north end.'],
  gulhane: ['Fatih', 'T1 Gülhane', 'free', 'morning', 'Nisan ayında lale açar; parkın ucundaki Seyir Köşkü Boğaz\'a bakar.', 'Tulips bloom in April; the park\'s far end looks over the Bosphorus.'],
  arkeoloji: ['Fatih', 'T1 Gülhane', 'paid', 'day', 'Çinili Köşk de aynı biletle gezilebilen müze kompleksinin parçasıdır.', 'The Tiled Kiosk is part of the same museum complex.'],
  arasta: ['Fatih', 'T1 Sultanahmet', 'free', 'day', 'Kapalıçarşı\'dan daha sakin; pazarlık burada da geçerli.', 'Calmer than the Grand Bazaar; bargaining still applies.'],
  kucukayasofya: ['Fatih', 'T1 Sultanahmet', 'free', 'any', 'Avludaki çay bahçesi kalabalıktan kaçmak için birebir.', 'The courtyard tea garden is a perfect escape from crowds.'],
  suleymaniye: ['Fatih', 'T1 Eminönü / M2 Vezneciler', 'free', 'sunset', 'Arka avludaki teraslardan Haliç gün batımı muhteşemdir.', 'Back-courtyard terraces give a stunning Golden Horn sunset.'],
  rustempasa: ['Fatih', 'T1 Eminönü', 'free', 'morning', 'Girişi dükkânların arasındaki merdivendedir, gözden kaçmasın.', 'The entrance is a staircase between shops, easy to miss.'],
  kariye: ['Fatih', 'Edirnekapı', 'paid', 'morning', 'Edirnekapı surlarına yürüyerek yakın; kombinleyin.', 'Close to the Edirnekapı land walls; combine the two.'],
  fatih: ['Fatih', 'M2 Vezneciler (yürüme)', 'free', 'day', 'Çarşamba günleri çevrede kurulan pazar renklidir.', 'The Wednesday market around it is wonderfully colourful.'],
  binbirdirek: ['Fatih', 'T1 Sultanahmet', 'paid', 'any', 'Yerebatan kadar kalabalık değildir; içeride kafe var.', 'Far less crowded than the Basilica Cistern; has a café.'],
  valens: ['Fatih', 'M2 Vezneciler', 'free', 'sunset', 'Saraçhane Parkı tarafından en güzel fotoğraf açısı yakalanır.', 'Best photo angle is from Saraçhane Park.'],
  yedikule: ['Fatih', 'Marmaray Yedikule', 'paid', 'day', 'Surların üstünde yürürken dikkatli olun; korkuluk azdır.', 'Be careful on the walls: railings are sparse.'],
  anadoluhisari: ['Beykoz', 'Anadoluhisarı iskelesi', 'free', 'sunset', 'Göksu deresi kıyısında kayıkla gezilebilir.', 'Rowing boats can be hired on the Göksu stream nearby.'],
  sirkeci: ['Fatih', 'Marmaray Sirkeci / T1', 'free', 'any', 'Gar içindeki Demiryolu Müzesi küçük ama keyiflidir.', 'The small railway museum inside the station is charming.'],
  mihrimah: ['Üsküdar', 'Marmaray / Üsküdar iskelesi', 'free', 'any', 'Vapurdan inince hemen karşınızda; Üsküdar turuna ideal başlangıç.', 'Right across the ferry pier, an ideal start to Üsküdar.'],

  // ---- Boğaz
  ortakoy: ['Beşiktaş', 'Ortaköy otobüs (22, 25E)', 'free', 'sunset', 'Hafta sonu el sanatları tezgâhları kurulur; erken gidin.', 'Craft stalls pop up on weekends; go early.'],
  dolmabahce: ['Beşiktaş', 'T1 Kabataş', 'paid', 'morning', 'Pazartesi kapalıdır; içeride fotoğraf kısıtlıdır.', 'Closed on Mondays; photography inside is restricted.'],
  beylerbeyi: ['Üsküdar', 'Beylerbeyi otobüs', 'paid', 'day', 'Bahçesindeki mermer havuz ve köşkler gezmeye değer.', 'Its marble pool and garden pavilions are worth a stroll.'],
  kizkulesi: ['Üsküdar', 'Salacak teknesi', 'paid', 'sunset', 'Kuleye Salacak ve Karaköy\'den kalkan teknelerle gidilir.', 'Boats run from Salacak and Karaköy to the tower.'],
  rumelihisari: ['Sarıyer', 'Rumelihisarı otobüs (22, 25E)', 'paid', 'day', 'Kulelere çıkışta merdivenler diktir; rahat ayakkabı giyin.', 'Tower steps are steep; wear comfy shoes.'],
  emirgan: ['Sarıyer', 'Emirgan iskelesi', 'free', 'morning', 'Nisan Lale Festivali\'nde hafta içi gitmek daha sakin olur.', 'During the April tulip festival weekdays are calmer.'],
  bebek: ['Beşiktaş', 'Bebek otobüs', 'free', 'sunset', 'Sahilden Arnavutköy\'e yürüyüş 20 dakikadır.', 'The shore walk to Arnavutköy takes about 20 minutes.'],
  arnavutkoy: ['Beşiktaş', 'Arnavutköy otobüs', 'free', 'day', 'Arka sokaklardaki ahşap evler sahilden daha fotojeniktir.', 'The wooden houses on back lanes are even more photogenic.'],
  kanlica: ['Beykoz', 'Kanlıca iskelesi', 'food', 'day', 'Yoğurdu pudra şekeriyle yemek gelenektir.', 'Tradition says eat the yoghurt with powdered sugar.'],
  cengelkoy: ['Üsküdar', 'Çengelköy iskelesi', 'food', 'morning', 'Çınar altı çay bahçesinde kahvaltı popülerdir.', 'Breakfast under the old plane tree is a local favourite.'],
  kuzguncuk: ['Üsküdar', 'Kuzguncuk otobüs', 'free', 'day', 'İcadiye Caddesi\'ndeki fırın ve kafeleri deneyin.', 'Try the bakeries and cafés on İcadiye Street.'],
  salacak: ['Üsküdar', 'Üsküdar (yürüme 10 dk)', 'free', 'sunset', 'Gün batımında çay ocağından çay alıp kayalıklarda oturun.', 'Grab a tea at sunset and sit on the rocks.'],
  yildiz: ['Beşiktaş', 'Çırağan otobüs', 'free', 'morning', 'Malta ve Çadır Köşkleri parkın içindedir.', 'The Malta and Çadır pavilions sit inside the park.'],
  besiktas: ['Beşiktaş', 'Beşiktaş iskelesi', 'food', 'evening', 'Çarşı içindeki kahvaltıcılar sokağı sabahları doludur.', 'The breakfast street inside the market is busy each morning.'],
  ihlamur: ['Beşiktaş', 'M2 Gayrettepe (yürüme)', 'paid', 'day', 'Bahçedeki kafe sakin bir mola için uygundur.', 'The garden café is great for a quiet break.'],
  ciragan: ['Beşiktaş', 'Çırağan otobüs', 'free', 'evening', 'Dışarıdan sahil yürüyüşü yeterli; içerisi otel.', 'A shoreline walk outside is enough; inside is a hotel.'],
  kucuksu: ['Beykoz', 'Küçüksu iskelesi', 'paid', 'day', 'Göksu çayırlarında piknik yapılabilir.', 'The Göksu meadows next door are good for picnics.'],
  kurucesme: ['Beşiktaş', 'Kuruçeşme otobüs', 'food', 'sunset', 'Sahil parkı akşamüstü çok keyiflidir.', 'The seaside park is lovely in the late afternoon.'],
  kandilli: ['Üsküdar', 'Kandilli iskelesi', 'free', 'day', 'Kandilli Rasathanesi tepesine yürüyüş manzaralıdır.', 'The walk up to the observatory hill has great views.'],
  yenikoy: ['Sarıyer', 'Yeniköy otobüs (25E)', 'food', 'day', 'Sahil boyunca yalıları görmek için yürüyün.', 'Stroll the shore to see the waterside mansions.'],

  // ---- Müzeler
  istanbulmodern: ['Beyoğlu', 'T1 Tophane', 'paid', 'day', 'Terastaki restoran Tarihi Yarımada manzaralıdır.', 'The terrace restaurant faces the Historic Peninsula.'],
  pera: ['Beyoğlu', 'M2 Şişhane', 'paid', 'day', 'Sergiler sık değişir; giriş katında kafe var.', 'Exhibitions rotate often; there\'s a café downstairs.'],
  sakip: ['Sarıyer', 'Emirgan iskelesi', 'paid', 'day', 'Bahçesindeki kafe Boğaz manzaralıdır.', 'The garden café overlooks the Bosphorus.'],
  rahmikoc: ['Beyoğlu', 'Hasköy iskelesi', 'paid', 'day', 'Çocuklarla en eğlenceli müzelerden; yarım gün ayırın.', 'One of the best with kids; plan half a day.'],
  salt: ['Beyoğlu', 'T1 Karaköy', 'free', 'day', 'Kütüphanesi çalışmak için sessiz bir mekân.', 'Its library is a quiet place to work.'],
  panorama1453: ['Zeytinburnu', 'T1 Topkapı', 'paid', 'day', 'Kara surlarına yakın; surlar boyunca yürüyüşle birleştirin.', 'Close to the land walls; pair it with a wall walk.'],
  borusan: ['Sarıyer', 'Rumelihisarı otobüs', 'paid', 'day', 'Genellikle hafta sonları ziyarete açıktır, önceden kontrol edin.', 'Mostly open on weekends, check before you go.'],
  akm: ['Beyoğlu', 'M2 Taksim', 'paid', 'evening', 'Programı önceden kontrol edip bilet alın.', 'Check the programme and book ahead.'],
  zorlu: ['Beşiktaş', 'M2 Gayrettepe', 'paid', 'evening', 'Gösteriden önce AVM katlarında yemek yiyebilirsiniz.', 'Eat in the mall before the show.'],
  babylon: ['Beyoğlu', 'M2 Şişhane', 'paid', 'evening', 'Konser takvimini web sitesinden takip edin.', 'Follow the gig calendar on its website.'],
  asiyan: ['Beşiktaş', 'Aşiyan otobüs', 'paid', 'day', 'Bahçesinde Boğaz\'a bakan bank var.', 'Its garden has a bench looking at the Bosphorus.'],
  miniaturk: ['Beyoğlu', 'Sütlüce otobüs', 'paid', 'day', 'Açık hava; güneşli bir gün seçin.', 'It\'s open-air; pick a sunny day.'],
  sadberk: ['Sarıyer', 'Sarıyer otobüs (25E)', 'paid', 'day', 'Sarıyer iskelesinde balıkla günü kapatın.', 'Finish with fish at Sarıyer pier.'],
  masumiyet: ['Beyoğlu', 'T1 Tophane', 'paid', 'day', 'Romanı okuduysanız sesli rehberi alın.', 'If you read the novel, grab the audio guide.'],
  oyuncak: ['Kadıköy', 'Marmaray Göztepe', 'paid', 'day', 'Çocuklar kadar yetişkinler için de nostaljik.', 'As nostalgic for adults as it is fun for kids.'],
  askeri: ['Şişli', 'M2 Osmanbey', 'paid', 'day', 'Mehter gösterisi saatlerini önceden öğrenin.', 'Check the Mehter band performance times.'],
  mozaik: ['Fatih', 'T1 Sultanahmet', 'paid', 'any', 'Arasta Çarşısı\'nın içinden girilir.', 'Entered through the Arasta Bazaar.'],
  islambilim: ['Fatih', 'T1 Gülhane', 'paid', 'day', 'Gülhane Parkı içinde; park gezisine ekleyin.', 'Inside Gülhane Park; add it to a park walk.'],
  santral: ['Eyüpsultan', 'Santral otobüs', 'paid', 'day', 'Bilgi Üniversitesi kampüsünde; kampüs de gezilebilir.', 'On Bilgi University campus, which is nice to walk.'],

  // ---- Semtler
  galatakulesi: ['Beyoğlu', 'M2 Şişhane / F2 Karaköy', 'paid', 'sunset', 'Gün batımı kuyruğu uzundur; bir saat önce gelin.', 'Sunset queues are long; arrive an hour earlier.'],
  karakoy: ['Beyoğlu', 'T1 Karaköy', 'free', 'any', 'Sokak sanatı Kemankeş ve çevresi sokaklarında yoğundur.', 'Street art is densest around Kemankeş.'],
  istiklal: ['Beyoğlu', 'M2 Taksim / F2 Tünel', 'free', 'evening', 'Ara sokaklardaki pasajlara mutlaka girin.', 'Duck into the side arcades.'],
  cicekpasaji: ['Beyoğlu', 'M2 Taksim', 'food', 'evening', 'Fasıl müziği akşamları başlar.', 'Live fasıl music starts in the evening.'],
  asmalimescit: ['Beyoğlu', 'M2 Şişhane', 'food', 'evening', 'Meyhaneler için hafta sonu rezervasyon yapın.', 'Book taverns ahead on weekends.'],
  cihangir: ['Beyoğlu', 'T1 Fındıklı', 'free', 'morning', 'Cihangir Camii\'nin bahçesi gizli bir manzara noktasıdır.', 'The Cihangir Mosque yard is a hidden viewpoint.'],
  balat: ['Fatih', 'Balat iskelesi / otobüs', 'free', 'morning', 'Kiremit Caddesi ve Merdivenli Mektep sokağı en renkli yerler.', 'Kiremit Street and the stepped lanes are the most colourful.'],
  fener: ['Fatih', 'Fener iskelesi', 'free', 'morning', 'Okul ziyarete kapalıdır; dışarıdan ve yokuştan izleyin.', 'The school is closed to visitors; admire it from outside.'],
  kamondo: ['Beyoğlu', 'T1 Karaköy', 'free', 'any', 'En iyi fotoğraf için yukarıdan aşağı çekin.', 'Shoot from the top for the best photo.'],
  bankalar: ['Beyoğlu', 'T1 Karaköy', 'free', 'day', 'SALT Galata binası caddenin en güzel yapısıdır.', 'The SALT Galata building is the street\'s gem.'],
  moda: ['Kadıköy', 'Moda tramvayı / Kadıköy iskelesi', 'free', 'sunset', 'Moda iskelesinden Prens Adaları\'na bakarak gün batımı.', 'Watch the sunset over the Princes\' Islands from Moda pier.'],
  yeldegirmeni: ['Kadıköy', 'Haydarpaşa / Kadıköy', 'free', 'day', 'Duvar resimleri Karakolhane Caddesi çevresinde yoğundur.', 'Murals cluster around Karakolhane Street.'],
  bahariye: ['Kadıköy', 'Moda tramvayı', 'free', 'any', 'Süreyya Operası caddenin üzerindedir.', 'The Süreyya Opera House is on this street.'],
  kadifesokak: ['Kadıköy', 'Kadıköy iskelesi', 'food', 'evening', 'Hafta sonu geceleri çok kalabalık; erken başlayın.', 'Packed on weekend nights; start early.'],
  taksim: ['Beyoğlu', 'M2 Taksim', 'free', 'any', 'Gezi Parkı meydanın hemen yanındadır.', 'Gezi Park is right next to the square.'],
  nisantasi: ['Şişli', 'M2 Osmanbey', 'food', 'day', 'Abdi İpekçi Caddesi lüks mağazaların sırasıdır.', 'Abdi İpekçi Avenue is the luxury row.'],
  tophane: ['Beyoğlu', 'T1 Tophane', 'free', 'evening', 'Tophane Çeşmesi rokoko süslemeleriyle ünlüdür.', 'The Tophane Fountain is famous for its rococo details.'],
  peralas: ['Beyoğlu', 'M2 Şişhane', 'food', 'day', 'Kubbeli salonda ikindi çayı deneyin.', 'Try afternoon tea in the domed salon.'],
  tunel: ['Beyoğlu', 'F2 Karaköy – Tünel', 'paid', 'any', 'İstanbulkart ile biner; yokuşu tırmanmaktan kurtarır.', 'Ride with an İstanbulkart and skip the steep climb.'],
  mevlevihane: ['Beyoğlu', 'F2 Tünel', 'paid', 'day', 'Sema gösterisi günlerini önceden kontrol edin.', 'Check which days the whirling ceremony runs.'],
  kadikoyboga: ['Kadıköy', 'Kadıköy iskelesi', 'free', 'any', 'Buluşma noktası olarak herkes bilir; çevresi kitapçılarla dolu.', 'Everyone knows it as a meeting spot; bookshops all around.'],

  // ---- Yeme ve İçme
  gulluoglu: ['Beyoğlu', 'T1 Karaköy', 'food', 'morning', 'Fıstıklı baklavayı kaymakla isteyin.', 'Order pistachio baklava with clotted cream.'],
  hafizmustafa: ['Fatih', 'T1 Eminönü / Sirkeci', 'food', 'any', 'Lokumları hediyelik kutularda alabilirsiniz.', 'Lokum comes in gift boxes.'],
  karakoylokantasi: ['Beyoğlu', 'T1 Karaköy', 'food', 'day', 'Öğle saatlerinde esnaf lokantası menüsü sunar.', 'At lunch it serves a tradesmen\'s menu.'],
  pandeli: ['Fatih', 'T1 Eminönü', 'food', 'day', 'Kılıç şiş ve patlıcanlı börek meşhurdur.', 'Famous for swordfish skewers and aubergine pastry.'],
  balikekmek: ['Fatih', 'T1 Eminönü', 'food', 'day', 'Yanına turşu suyu almadan geçmeyin.', 'Don\'t skip a glass of pickle juice with it.'],
  islak: ['Beyoğlu', 'M2 Taksim', 'food', 'evening', 'Tek başına küçük; iki tane alın.', 'They\'re small; order two.'],
  vankahvalti: ['Beyoğlu', 'T1 Fındıklı', 'food', 'morning', 'Hafta sonu sıra olur; erken gelin.', 'There\'s a queue on weekends; come early.'],
  modacay: ['Kadıköy', 'Moda tramvayı', 'food', 'sunset', 'Çay ile birlikte tost söylemek gelenek.', 'Ordering a toastie with tea is tradition.'],
  ciya: ['Kadıköy', 'Kadıköy iskelesi', 'food', 'day', 'Mevsimlik otlu yemekleri ve kebaplarını deneyin.', 'Try the seasonal herb dishes and kebabs.'],
  kumpir: ['Beşiktaş', 'Ortaköy otobüs', 'food', 'evening', 'Malzemeleri az seçin; patates zaten dev!', 'Go easy on toppings: the potato is huge!'],
  hamdi: ['Fatih', 'T1 Eminönü', 'food', 'evening', 'Teras için rezervasyon yapın.', 'Book for the terrace.'],
  kanaat: ['Üsküdar', 'Üsküdar iskelesi', 'food', 'day', 'Ayva tatlısı ve kaymaklı ekmek kadayıfı ünlüdür.', 'Famous for quince dessert and bread pudding with cream.'],
  hacibekir: ['Fatih', 'T1 Eminönü', 'food', 'any', 'Akide şekeri ve lokum karışık kutu alın.', 'Grab a mixed box of akide candy and lokum.'],
  mehmetefendi: ['Fatih', 'T1 Eminönü', 'food', 'morning', 'Sabah taze çekilmiş kahve kuyruğu oluşur.', 'Morning queues form for freshly ground coffee.'],
  vefa: ['Fatih', 'M2 Vezneciler', 'food', 'evening', 'Bozayı tarçın ve leblebiyle için.', 'Drink boza with cinnamon and roasted chickpeas.'],
  badem: ['Beşiktaş', 'Bebek otobüs', 'food', 'day', 'Badem ezmesini hediyelik kutuda alabilirsiniz.', 'The marzipan comes in nice gift boxes.'],

  // ---- Manzara
  pierreloti: ['Eyüpsultan', 'Eyüp–Piyer Loti teleferiği', 'food', 'sunset', 'Teleferikle çıkıp mezarlık yolundan yürüyerek inin.', 'Ride the cable car up, walk down through the cemetery path.'],
  camlica: ['Üsküdar', 'M5 Kısıklı', 'free', 'sunset', 'Çamlıca Camii ve Kulesi tepeye yakındır.', 'Çamlıca Mosque and Tower are close to the summit.'],
  belgrad: ['Sarıyer', 'Bahçeköy otobüs', 'free', 'morning', '6,5 km\'lik koşu parkuru çok popülerdir.', 'The 6.5 km running loop is very popular.'],
  ulus: ['Beşiktaş', 'Ulus otobüs', 'free', 'sunset', 'Boğaz Köprüsü manzarası için en iyi banklardan.', 'Some of the best benches for a Bosphorus Bridge view.'],
  macka: ['Şişli', 'M2 Osmanbey / Taksim', 'free', 'day', 'Teleferik Maçka ile Taşkışla arasında çalışır.', 'A small cable car links Maçka and Taşkışla.'],
  eyup: ['Eyüpsultan', 'Eyüp iskelesi', 'free', 'day', 'Cuma günleri çok kalabalık olabilir.', 'It can get very crowded on Fridays.'],
  caddebostan: ['Kadıköy', 'Marmaray Caddebostan', 'free', 'sunset', 'Sahil boyunca bisiklet kiralayabilirsiniz.', 'You can rent bikes along the shore.'],
  galataportsahil: ['Beyoğlu', 'T1 Tophane', 'free', 'evening', 'Kruvaziyer gemileri limana yanaşınca sahil daha canlı olur.', 'It\'s livelier when cruise ships are docked.'],
  fenerbahce: ['Kadıköy', 'Moda / Fenerbahçe otobüs', 'free', 'sunset', 'Feneri çevreleyen park balık tutanların favorisi.', 'The park around the lighthouse is a fishing favourite.'],
  goztepe: ['Kadıköy', 'Marmaray Göztepe', 'free', 'morning', 'Göl çevresi hafta sonu ailelerle dolar.', 'The lake area fills with families on weekends.'],
  validebag: ['Üsküdar', 'Altunizade', 'free', 'morning', 'Sabah kuş sesleriyle yürüyüş harika.', 'A morning walk with birdsong is wonderful.'],
  kucukcamlica: ['Üsküdar', 'M5 Bulgurlu', 'food', 'sunset', 'Büyük Çamlıca\'dan daha sakin bir çay bahçesi.', 'A calmer tea garden than Big Çamlıca.'],
  florya: ['Bakırköy', 'Marmaray Florya', 'free', 'sunset', 'Atatürk Deniz Köşkü sahilin yanında.', 'The Atatürk Sea Pavilion is right on the shore.'],

  // ---- Adalar ve kaçamaklar
  buyukada: ['Adalar', 'Kabataş / Bostancı vapuru', 'free', 'day', 'Faytonlar kaldırıldı; elektrikli araç veya bisiklet kullanın.', 'Horse carriages are gone; use e-carts or bikes.'],
  ayayorgi: ['Adalar', 'Büyükada iskelesi', 'free', 'day', 'Yokuş dik ve uzundur; su alın.', 'The climb is long and steep; bring water.'],
  heybeliada: ['Adalar', 'Kabataş / Bostancı vapuru', 'free', 'day', 'Değirmenburnu\'nda piknik ve deniz keyfi.', 'Picnic and swim at Değirmenburnu.'],
  burgazada: ['Adalar', 'Kabataş / Bostancı vapuru', 'free', 'day', 'Sait Faik Abasıyanık Müzesi adanın içindedir.', 'The Sait Faik Abasıyanık Museum is on the island.'],
  kinaliada: ['Adalar', 'Kabataş / Bostancı vapuru', 'free', 'day', 'En yakın ada; yarım gün yeter.', 'The closest island; half a day is enough.'],
  polonezkoy: ['Beykoz', 'Araç / otobüs', 'food', 'morning', 'Kahvaltı sonrası Polonezköy Tabiat Parkı\'nda yürüyün.', 'Walk the nature park after breakfast.'],
  kilyos: ['Sarıyer', 'Sarıyer\'den otobüs', 'free', 'day', 'Karadeniz akıntıları kuvvetlidir; cankurtaranlı alanda yüzün.', 'Black Sea currents are strong; swim where lifeguards are.'],
  sile: ['Şile', 'Üsküdar\'dan otobüs', 'free', 'day', 'Şile bezi ve deniz feneri yanındaki kale görülmeli.', 'See the Şile cloth shops and the castle by the lighthouse.'],

  // ---- Alışveriş
  kapalicarsi: ['Fatih', 'T1 Beyazıt-Kapalıçarşı', 'free', 'morning', 'Pazar günleri kapalıdır; pazarlık beklenir.', 'Closed on Sundays; bargaining is expected.'],
  misircarsisi: ['Fatih', 'T1 Eminönü', 'free', 'morning', 'Çarşının arkasındaki sokaklar daha yerel ve uygundur.', 'Streets behind the bazaar are more local and cheaper.'],
  sahaflar: ['Fatih', 'T1 Beyazıt-Kapalıçarşı', 'free', 'day', 'Beyazıt Camii avlusunun hemen yanındadır.', 'Right beside the Beyazıt Mosque courtyard.'],
  mahmutpasa: ['Fatih', 'T1 Eminönü', 'free', 'morning', 'Kalabalıkta çantanıza dikkat edin.', 'Mind your bag in the crowds.'],
  cukurcuma: ['Beyoğlu', 'T1 Tophane', 'free', 'day', 'Dükkânlar öğleden sonra açılabilir.', 'Some shops open only in the afternoon.'],
  balatantika: ['Fatih', 'Balat iskelesi', 'free', 'day', 'Hafta sonu açık artırma yapan dükkânlar var.', 'Some shops hold weekend auctions.'],
  ferikoyantika: ['Şişli', 'M2 Osmanbey', 'free', 'morning', 'Sadece pazar günleri kurulur; erken gidin.', 'Only on Sundays; go early.'],
  homer: ['Beyoğlu', 'M2 Taksim', 'free', 'any', 'İngilizce kitap seçkisi de geniştir.', 'Good selection of English books too.'],
  kadikoypazari: ['Kadıköy', 'Kadıköy iskelesi', 'food', 'morning', 'Güneşli Bahçe Sokak balıkçıların kalbidir.', 'Güneşli Bahçe Street is the fishmongers\' heart.'],
  balikpazari: ['Beyoğlu', 'M2 Taksim', 'food', 'evening', 'Midye tava ve kokoreç tezgâhları burada.', 'Fried mussels and kokoreç stands are here.'],
  tahtakale: ['Fatih', 'T1 Eminönü', 'free', 'morning', 'Mutfak eşyaları için şehrin en uygun yeri.', 'The cheapest place in town for kitchenware.'],
}

export const PLACE_INFO: Record<string, PlaceInfo> = Object.fromEntries(
  Object.entries(T).map(([id, [district, stop, price, best, tipTr, tipEn]]) => [
    id,
    { district, stop, price, best, tipTr, tipEn },
  ]),
)
