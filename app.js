// دليل المؤسسات السنية في مالي — تطبيق مستقل (PWA + Firebase) — v3 (عربي/فرنسي)
import { firebaseConfig, OWNER_EMAIL } from "./firebase-config.js";

const FB = "https://www.gstatic.com/firebasejs/10.12.2/";
const DEMO = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes("PLACEHOLDER");

/* ================= اللغة ================= */
let LANG=(()=>{try{return localStorage.getItem("csm-lang")||"ar"}catch(e){return "ar"}})();
const S={
 appName:["دليل المؤسسات السنية في مالي","Annuaire des institutions sunnites du Mali"],
 org:["تجمع أهل السنة والجماعة في مالي","Communauté Sunnite du Mali"],
 brandSub:["دليل المؤسسات · CSM","Annuaire des institutions · CSM"],
 home:["الرئيسية","Accueil"],stats:["الإحصاء","Statistiques"],regions:["الأقاليم الإدارية","Régions administratives"],
 favs:["المفضلة","Favoris"],report:["التقرير","Rapport"],users:["المستخدمون","Utilisateurs"],
 gMain:["عام","Général"],gDir:["الدليل","Annuaire"],gBrowse:["التصفح","Navigation"],gAdmin:["الإدارة","Administration"],
 install:["📲 تثبيت التطبيق","📲 Installer l'application"],logout:["↩ تسجيل الخروج","↩ Déconnexion"],
 rAdmin:["🛡️ نائب المدير","🛡️ Directeur adjoint"],rContrib:["✍️ مساهم","✍️ Contributeur"],rViewer:["👁️ مطّلع","👁️ Lecteur"],
 demoBanner:["🧪 الوضع التجريبي: البيانات تُحفظ على هذا الجهاز فقط.","🧪 Mode démo : les données sont enregistrées sur cet appareil uniquement."],
 viewerBanner:["صلاحيتك للاطلاع فقط. للإدخال اطلب من المشرف صلاحية «مساهم».","Vous êtes en lecture seule. Demandez à l'administrateur le rôle « Contributeur » pour saisir des données."],
 demoNoLogout:["الوضع التجريبي لا يحتاج إلى خروج","Pas de déconnexion en mode démo"],
 kick:["تجمع أهل السنة والجماعة في مالي","Communauté Sunnite du Mali"],
 sayAllah:["قال الله تعالى","Allah le Très-Haut a dit"],
 verseRef:["سورة آل عمران، الآية ١٠٣","Sourate Âl ʿImrân, verset 103"],
 verseMeaning:["","« Attachez-vous tous fermement au lien d'Allah et ne vous divisez pas. »"],
 lead:["مساجد نعمرها، وعلم نتعلمه، وخير نتشارك فيه. منصة لإحصاء مؤسسات المجتمع وتوثيقها في كل أقاليم مالي.","Des mosquées que nous faisons vivre, un savoir que nous transmettons, un bien que nous partageons : la plateforme de recensement des institutions de la communauté dans toutes les régions du Mali."],
 explore:["استكشف الدليل ←","Explorer l'annuaire →"],addInst:["+ إضافة مؤسسة","+ Ajouter une institution"],
 sections:["أقسام الدليل","Rubriques de l'annuaire"],recent:["أحدث الإضافات","Derniers ajouts"],seeAll:["عرض الكل","Tout voir"],
 topRegions:["أكثر الأقاليم تسجيلاً","Régions les plus renseignées"],noData:["لا توجد بيانات بعد. ابدأ بإضافة مؤسسة من أحد الأقسام.","Aucune donnée pour l'instant. Commencez par ajouter une institution."],
 myEntries:["إدخالاتي","Mes saisies"],pendingN:["قيد المراجعة","en attente"],
 pendBanner:["🕓 يوجد {n} سجلاً قيد المراجعة. افتح أي قسم واختر «قيد المراجعة» لتوثيقها.","🕓 {n} fiche(s) en attente de vérification. Ouvrez une rubrique et filtrez « En attente »."],
 usersBanner:["👥 {n} حساب جديد بانتظار موافقتك","👥 {n} nouveau(x) compte(s) en attente de votre validation"],open:["افتح","Ouvrir"],
 searchAll:["🔎 بحث في كل الأقسام: اسم، حي، إمام، داعية…","🔎 Rechercher partout : nom, quartier, imam, prédicateur…"],
 results:["نتيجة","résultat(s)"],noResults:["لا نتائج.","Aucun résultat."],
 byRegion:["التوزيع حسب الأقاليم","Répartition par région"],region:["المقاطعة / الإقليم","District / Région"],total:["المجموع","Total"],
 studentsGender:["الطلاب حسب الجنس","Élèves par sexe"],male:["ذكور","Garçons"],female:["إناث","Filles"],
 waqfStatus:["وضعية وقف المساجد","Statut waqf des mosquées"],duatFields:["مجالات نشاط الدعاة","Domaines des prédicateurs"],
 langsChart:["لغات الدعوة والبث","Langues de prêche et de diffusion"],assocFields:["مجالات عمل الجمعيات","Domaines des associations"],
 verifStatus:["حالة التوثيق","État de vérification"],filtB:["تصفية","Filtres"],emptyCats:["أقسام لم تُسجَّل فيها مؤسسات بعد:","Rubriques encore vides :"],draftQ:["لديك مسودة غير محفوظة لهذا النموذج.","Vous avez un brouillon non enregistré."],draftUse:["↺ استعادتها","↺ Restaurer"],draftDrop:["تجاهل","Ignorer"],darkB:["الوضع الليلي","Mode sombre"],depT:["نواب مدير التطبيق","Directeurs adjoints"],depHint:["يعيّن المدير حتى {n} نواب لهم صلاحيات الإدارة كاملة (اختر «نائب المدير» في خانة الدور). ولأعضاء اللجنة الإدارية أن يطلبوا هذه الصلاحية، فتُمنح بموافقة المدير ولا تُحسب من العدد.","Le directeur nomme jusqu'à {n} adjoints. Les membres du comité administratif peuvent demander ces droits, accordés après son accord."],
 depFull:["اكتمل عدد النواب ({n}). أزل نائبا أولا.","Nombre maximal d'adjoints atteint ({n})."],reqT:["طلبات صلاحية نائب المدير","Demandes de droits d'adjoint"],reqOk:["✅ موافقة","✅ Accepter"],reqNo:["رفض","Refuser"],
 reqOkQ:["منح {n} صلاحيات نائب المدير؟","Accorder les droits d'adjoint à {n} ?"],reqOkT:["✅ مُنحت الصلاحية","✅ Droits accordés"],reqNoT:["رُفض الطلب","Demande refusée"],
 reqAsk:["طلب صلاحيات نائب المدير","Demander les droits d'adjoint"],reqSent:["📨 أُرسل طلبك إلى المدير","📨 Demande envoyée"],reqCancel:["أُلغي الطلب","Demande annulée"],reqWait:["طلبك بانتظار موافقة المدير","En attente de l'accord du directeur"],reqCancelB:["إلغاء","Annuler"],bvBtn:["✅ توثيق المعروض ({n})","✅ Vérifier la liste ({n})"],bvQ:["توثيق {n} سجلا دفعة واحدة؟ تأكد من مراجعتها أولا.","Vérifier {n} fiche(s) d'un coup ?"],bvDone:["✅ وُثّق {n} سجلا","✅ {n} fiche(s) vérifiée(s)"],
 pendBanner2:["🕓 {n} سجلا قيد المراجعة — اضغط على قسم لمراجعته:","🕓 {n} fiche(s) en attente — touchez une rubrique :"],qCall:["اتصال","Appeler"],qGo:["الاتجاهات","Itinéraire"],
 bnMenu:["المزيد","Plus"],codeL:["الرقم الخاص","Numéro d'identification"],codeCopied:["نُسخ الرقم","Numéro copié"],verified:["موثّق","Vérifié"],pending:["قيد المراجعة","En attente"],
 export:["تصدير البيانات","Exporter les données"],exportHint:["ملف CSV يُفتح مباشرة في Excel.","Fichier CSV lisible directement dans Excel."],allInOne:["⬇️ الكل في ملف واحد","⬇️ Tout dans un fichier"],
 searchList:["بحث بالاسم أو الحي أو المسؤول…","Rechercher par nom, quartier, responsable…"],allRegions:["كل الأقاليم","Toutes les régions"],
 allStatus:["كل الحالات","Tous les états"],add:["+ إضافة","+ Ajouter"],of:["من","sur"],
 noneYet:["لم يُسجَّل شيء في هذا القسم بعد.","Rien n'a encore été enregistré dans cette rubrique."],noMatch:["لا نتائج مطابقة.","Aucun résultat correspondant."],
 addFirst:["أضف أول سجل","Ajouter la première fiche"],
 regionsIntro:["اضغط على أي إقليم لعرض مؤسساته.","Cliquez sur une région pour voir ses institutions."],back:["→ رجوع","← Retour"],
 instIn:["مؤسسة","institution(s)"],emptyRegion:["لا توجد مؤسسات مسجّلة في هذا الإقليم بعد.","Aucune institution enregistrée dans cette région."],
 favsEmpty:["لم تضف شيئاً إلى المفضلة بعد. افتح أي سجل واضغط ☆.","Aucun favori. Ouvrez une fiche et cliquez sur ☆."],
 favAdd:["☆ إلى المفضلة","☆ Ajouter aux favoris"],favRm:["★ في المفضلة","★ Dans les favoris"],
 edit:["تعديل","Modifier"],verify:["✅ توثيق","✅ Vérifier"],unverify:["إلغاء التوثيق","Annuler la vérification"],del:["حذف","Supprimer"],
 delAsk:["هل تريد حذف «{x}» نهائياً؟","Supprimer définitivement « {x} » ?"],delYes:["نعم، احذف","Oui, supprimer"],
 deleted:["تم الحذف","Supprimé"],saved:["تم الحفظ","Enregistré"],savedOffline:["حُفظ على الجهاز، وسيُرسل عند الاتصال","Enregistré sur l'appareil, envoi au retour du réseau"],
 verifiedT:["تم التوثيق","Fiche vérifiée"],unverifiedT:["أُعيد إلى المراجعة","Remise en attente"],
 addT:["إضافة ","Ajouter : "],editT:["تعديل ","Modifier : "],save:["حفظ","Enregistrer"],saveNew:["حفظ وإضافة آخر","Enregistrer et ajouter"],cancel:["إلغاء","Annuler"],
 secLoc:["الموقع","Localisation"],secData:["البيانات","Informations"],secContact:["التواصل","Contact"],
 choose:["— اختر —","— Choisir —"],communeHint:["تظهر الأسماء المسجّلة سابقاً لتوحيد الكتابة.","Les noms déjà saisis s'affichent pour uniformiser l'orthographe."],
 gpsBtn:["📍 موقعي","📍 Ma position"],gpsHint:["عند الوقوف أمام المؤسسة اضغط «موقعي».","Devant l'institution, appuyez sur « Ma position »."],
 gpsNo:["الجهاز لا يدعم تحديد الموقع.","Géolocalisation non disponible."],gpsWait:["جارٍ تحديد الموقع…","Localisation en cours…"],
 gpsOk:["تم (دقة تقريبية {n} م).","OK (précision ≈ {n} m)."],gpsErr:["تعذّر تحديد الموقع. فعّل خدمة الموقع أو أدخل الإحداثيات يدوياً.","Échec de la localisation. Activez la localisation ou saisissez les coordonnées."],
 gpsBad:["صيغة الإحداثيات غير صحيحة. مثال: 12.6392, -8.0029","Format GPS incorrect. Exemple : 12.6392, -8.0029"],
 phoneHidden:["محفوظ ومخفي — اتركه فارغاً للإبقاء عليه","Enregistré et masqué — laisser vide pour le conserver"],phoneHint:["🔒 لا يراه إلا المشرفون.","🔒 Visible uniquement par les administrateurs."],
 reVerify:["ℹ️ تعديل سجل موثّق يعيده إلى المراجعة.","ℹ️ Modifier une fiche vérifiée la remet en attente."],
 fill:["يرجى تعبئة: ","Champ obligatoire : "],dup:["⚠️ يوجد سجل بالاسم نفسه في الإقليم نفسه. اضغط «حفظ» مرة أخرى للتأكيد.","⚠️ Une fiche porte déjà ce nom dans cette région. Cliquez de nouveau pour confirmer."],
 onMap:["🗺️ فتح على الخريطة","🗺️ Voir sur la carte"],totalStud:["مجموع الدارسين","Total des élèves"],
 metaBy:["أدخله: {n} في {d}","Saisi par {n} le {d}"],metaUpd:["آخر تعديل: {n} في {d}","Modifié par {n} le {d}"],metaVer:["وثّقه: {n} في {d}","Vérifié par {n} le {d}"],
 print:["🖨️ طباعة / حفظ PDF","🖨️ Imprimer / PDF"],repTitle:["التقرير الإحصائي للمؤسسات السنية في مالي","Rapport statistique des institutions sunnites du Mali"],
 repDate:["بتاريخ","au"],rep1:["أولاً: الخلاصة العامة","1. Synthèse générale"],rep2:["ثانياً: التوزيع على الأقاليم","2. Répartition par région"],
 rep3:["ثالثاً: التعليم والتحفيظ","3. Enseignement et Coran"],rep4:["رابعاً: المساجد والأوقاف","4. Mosquées et waqf"],
 category:["الفئة","Catégorie"],count:["العدد","Nombre"],details:["تفاصيل","Détails"],records:["مجموع السجلات","Total des fiches"],ofWhich:["منها {n} موثّق","dont {n} vérifiée(s)"],
 item:["البند","Élément"],studTot:["مجموع الطلاب والدارسين","Total élèves"],ofGirls:["منهم الإناث","dont filles"],teachersT:["المعلمون والمحفّظون","Enseignants et maîtres"],
 huffazT:["الحفاظ المتخرجون","Hafiz diplômés"],recog:["مدارس معترف بها رسمياً","Écoles reconnues"],waqfCol:["وضعية الوقف","Statut waqf"],mosqN:["عدد المساجد","Nb de mosquées"],
 prepared:["إعداد: لجنة الإحصاء والتوثيق","Préparé par : Commission statistique"],approved:["اعتماد: ............................","Visa : ............................"],
 usersIntro:["امنح المندوبين صلاحية «مساهم» ليُدخلوا البيانات، و«مطّلع» للاطلاع فقط، و«مشرف إقليم» لمن يراجع ويوثّق في إقليمه. أما «نائب المدير» فيعيّنه المدير وحده.","« Contributeur » pour saisir, « Lecteur » pour consulter, « Superviseur régional » pour vérifier dans sa région. Les « Directeurs adjoints » sont nommés par le directeur seul."],
 name:["الاسم","Nom"],email:["البريد","E-mail"],state:["الحالة","État"],role:["الصلاحية","Rôle"],you:["أنت","Vous"],noUsers:["لا يوجد مستخدمون بعد.","Aucun utilisateur."],
 roleUpd:["تم تحديث الصلاحية","Rôle mis à jour"],adminOnly:["هذا القسم للمشرفين.","Section réservée aux administrateurs."],
 signIn:["تسجيل الدخول","Connexion"],signUp:["إنشاء حساب مندوب","Créer un compte délégué"],
 signInSub:["ادخل بحسابك للاطلاع على الدليل والإدخال فيه.","Connectez-vous pour consulter et alimenter l'annuaire."],
 signUpSub:["بعد إنشاء الحساب يوافق المشرف عليه ويحدّد صلاحيتك.","Après création, l'administrateur valide votre compte et fixe votre rôle."],
 google:["الدخول بحساب Google","Continuer avec Google"],orEmail:["أو بالبريد الإلكتروني","ou par e-mail"],fullName:["الاسم الكامل","Nom complet"],
 password:["كلمة المرور","Mot de passe"],enter:["دخول","Se connecter"],create:["إنشاء الحساب","Créer le compte"],
 toIn:["لديّ حساب: تسجيل الدخول","J'ai un compte : me connecter"],toUp:["مندوب جديد؟ أنشئ حساباً","Nouveau délégué ? Créer un compte"],
 forgot:["نسيت كلمة المرور","Mot de passe oublié"],forgotFirst:["اكتب بريدك أولاً ثم اضغط «نسيت كلمة المرور».","Saisissez d'abord votre e-mail."],
 resetSent:["✅ أُرسل رابط استعادة كلمة المرور إلى بريدك. إن لم تجده خلال دقائق فابحث في مجلد «الرسائل غير المرغوب فيها» (Spam)، واضغط «ليس رسالة غير مرغوب فيها».","✅ Lien envoyé. Si vous ne le trouvez pas, regardez dans le dossier « Spam / Courrier indésirable » et marquez-le « Non spam »."],
 recommended:["موصى به: أسهل وأكثر أماناً، دون كلمة مرور","Recommandé : plus simple et plus sûr, sans mot de passe"],
 iosHint:["📲 للتثبيت على آيفون: زر المشاركة ⬆️ ثم «إضافة إلى الشاشة الرئيسية».","📲 Sur iPhone : bouton Partager ⬆️ puis « Sur l'écran d'accueil »."],
 andHint:["📲 يمكنك تثبيت التطبيق من قائمة المتصفح ⋮ ← «تثبيت التطبيق».","📲 Installez l'application depuis le menu du navigateur ⋮ → « Installer l'application »."],
 waitT:["حسابك بانتظار موافقة المشرف","Votre compte attend la validation"],waitS:["مرحباً {n}. أُرسل طلبك، وسيُفتح لك الدليل تلقائياً حين يمنحك المشرف الصلاحية.","Bienvenue {n}. Votre demande est envoyée ; l'annuaire s'ouvrira dès que l'administrateur vous aura attribué un rôle."],
 loading:["جارٍ التحميل…","Chargement…"],loadErr:["تعذّر الاتصال بقاعدة البيانات. تحقّق من الإنترنت ثم أعد فتح التطبيق.","Connexion à la base impossible. Vérifiez Internet puis rouvrez l'application."],
 offline:["📴 غير متصل","📴 Hors ligne"],offPend:["📴 غير متصل · {n} بانتظار الإرسال","📴 Hors ligne · {n} en attente d'envoi"],sending:["⏳ جارٍ الإرسال ({n})","⏳ Envoi en cours ({n})"],demo:["🧪 تجريبي","🧪 Démo"],
 installed:["تم تثبيت التطبيق","Application installée"],errPerm:["ليست لديك صلاحية لهذا الإجراء.","Vous n'avez pas l'autorisation pour cette action."],
 errNet:["لا يوجد اتصال؛ ستُرسل البيانات عند عودته.","Pas de réseau ; envoi au retour de la connexion."],errQuota:["تجاوزتم الحصة اليومية المجانية لقاعدة البيانات.","Quota gratuit journalier de la base dépassé."],errGen:["تعذّر الإجراء","Action impossible"],
 csvStatus:["الحالة","État"],csvBy:["أدخله","Saisi par"],csvDate:["تاريخ الإدخال","Date de saisie"],
 jum:["منها {n} جامع للجمعة","dont {n} grande(s) mosquée(s)"],studs:["{n} طالب وطالبة","{n} élèves"],
 cent:["{n} دارس · {h} حافظ","{n} élèves · {h} hafiz"],duatS:["{m} رجال · {w} نساء","{m} hommes · {w} femmes"],
 assocS:["{n} مرخصة","{n} agréée(s)"],mediaS:["{n} إذاعة FM","{n} radio(s) FM"],imamT:["الإمام: ","Imam : "],studT:["{n} طالب","{n} élèves"],
 lang:["Français","العربية"],
};
const t=(k,v)=>{let s=(S[k]||[k,k])[LANG==="fr"?1:0];if(v)for(const x in v)s=s.split("{"+x+"}").join(v[x]);return s};
const FRV={
"القيادة العامة":"Direction générale","مكتب القيادة":"Direction générale","المكتب التنسيقي العام":"Bureau de coordination générale","مكتب مديرية":"Bureau de direction communale (Bamako)","مكتب حي":"Bureau de quartier","مكتب إقليم":"Bureau régional","مكتب دائرة":"Bureau de cercle","مكتب مدينة / قرية":"Bureau de ville / village",
"أسبوعية":"Hebdomadaire","شهرية":"Mensuelle","فصلية":"Trimestrielle","سنوية":"Annuelle","غير منتظمة":"Irrégulière",
"جامع تقام فيه الجمعة":"Grande mosquée (vendredi)","مسجد للصلوات الخمس":"Mosquée de quartier","مصلى":"Salle de prière",
"موقوف بوثيقة رسمية":"Waqf avec acte officiel","موقوف بلا وثيقة":"Waqf sans acte","غير موقوف":"Non waqf","غير معروف":"Inconnu","غير محدد":"Non précisé",
"مصلى للنساء":"Espace femmes","مكتبة":"Bibliothèque","فصول تحفيظ":"Classes coraniques","ميضأة":"Salle d'ablutions","سكن للإمام":"Logement de l'imam","مكبر صوت":"Sonorisation",
"روضة":"Maternelle","ابتدائي":"Primaire","إعدادي":"Collège","ثانوي":"Lycée","معهد عالٍ / جامعي":"Supérieur / Université",
"عربية إسلامية (مدرسة)":"Médersa arabo-islamique","فرنسية-عربية مزدوجة":"Bilingue franco-arabe","شرعية تقليدية":"Enseignement traditionnel",
"معترف بها من الوزارة":"Reconnue par le ministère","قيد الإجراء":"En cours","غير معترف بها":"Non reconnue",
"نهاري":"Jour","مسائي / ليلي":"Soir / Nuit","داخلي":"Internat","عطلة صيفية":"Vacances","مختلط":"Mixte",
"ورش عن نافع":"Warsh ʿan Nâfiʿ","قالون عن نافع":"Qâlûn ʿan Nâfiʿ","حفص عن عاصم":"Hafs ʿan ʿÂsim","أخرى":"Autre",
"داعية (رجل)":"Homme","داعية (امرأة)":"Femme",
"دراسة تقليدية عند المشايخ":"Formation traditionnelle","ثانوية":"Secondaire","ليسانس":"Licence","ماجستير":"Master","دكتوراه":"Doctorat",
"الخطابة":"Prêche du vendredi","الدروس العلمية":"Cours","الدعوة النسائية":"Daʿwa féminine","الإعلام والإذاعة":"Médias et radio","التحفيظ":"Enseignement du Coran","الإفتاء":"Fatwa","الرقية الشرعية":"Roqya","دعوة غير المسلمين":"Daʿwa auprès des non-musulmans",
"العربية":"Arabe","الفرنسية":"Français","البمبارية":"Bambara","الفولانية":"Peul","السونغاي":"Songhaï","السوننكية":"Soninké","الطماشقية":"Tamasheq","الدوغونية":"Dogon",
"جمعية دعوية":"Association de daʿwa","جمعية خيرية":"Association caritative","جمعية شبابية":"Association de jeunes","جمعية نسائية":"Association féminine","اتحاد / رابطة":"Union / Ligue","منظمة تعليمية":"Organisation éducative",
"مرخصة (إيصال تسجيل)":"Agréée (récépissé)","قيد الترخيص":"Agrément en cours","غير مرخصة":"Non agréée",
"الدعوة":"Daʿwa","التعليم":"Éducation","الإغاثة":"Secours","كفالة الأيتام":"Parrainage d'orphelins","حفر الآبار":"Forage de puits","بناء المساجد":"Construction de mosquées","الصحة":"Santé","التنمية":"Développement",
"إذاعة FM":"Radio FM","قناة تلفزيونية":"Chaîne de télévision","قناة / صفحة على الإنترنت":"Chaîne / page en ligne","مطبوعة / مجلة":"Publication / revue",
"مقاطعة باماكو":"District de Bamako","كاي":"Kayes","كوليكورو":"Koulikoro","سيكاسو":"Sikasso","سيغو":"Ségou","موبتي":"Mopti","تمبكتو":"Tombouctou","غاو":"Gao","كيدال":"Kidal","تاوديني":"Taoudénit","ميناكا":"Ménaka","بوغوني":"Bougouni","ديويلا":"Dioïla","نيورو الساحل":"Nioro du Sahel","كيتا":"Kita","كوتيالا":"Koutiala","نارا":"Nara","بانديغارا":"Bandiagara","سان":"San","دوينتزا":"Douentza",
"موثّق":"Vérifié","قيد المراجعة":"En attente",
"المديرية الأولى":"Direction 1","المديرية الثانية":"Direction 2","المديرية الثالثة":"Direction 3","المديرية الرابعة":"Direction 4","المديرية الخامسة":"Direction 5","المديرية السادسة":"Direction 6","مديرية كالابان كورو":"Direction de Kalaban Coro","مديرية موريبابوغو وانغاباكورو":"Direction de Moribabougou et N'Gabacoro"
};
const tv=v=>v==="مقاطعة باماكو"&&LANG!=="fr"?"مقاطعة بماكو":(LANG==="fr"&&FRV[v]?FRV[v]:v);   // ترجمة قيمة مخزّنة للعرض فقط

/* ================= البيانات ================= */
const REGIONS=["مقاطعة باماكو","كاي","كوليكورو","سيكاسو","سيغو","موبتي","تمبكتو","غاو","كيدال","تاوديني","ميناكا","بوغوني","ديويلا","نيورو الساحل","كيتا","كوتيالا","نارا","بانديغارا","سان","دوينتزا"];
const LANGS=["العربية","الفرنسية","البمبارية","الفولانية","السونغاي","السوننكية","الطماشقية","الدوغونية","أخرى"];
// مستويات مكاتب التجمع بالترتيب الهرمي
const OFFICE_LEVELS=["القيادة العامة","المكتب التنسيقي العام","مكتب مديرية","مكتب حي","مكتب إقليم","مكتب دائرة","مكتب مدينة / قرية"];
const LV_NAT=OFFICE_LEVELS.slice(0,2), LV_BKO=[OFFICE_LEVELS[2],OFFICE_LEVELS[3]], LV_REG=OFFICE_LEVELS.slice(4);
const CATS={
 mosques:{label:["المساجد","Mosquées"],one:["مسجد","Mosquée"],ic:"🕌",fields:[
  {k:"name",l:["اسم المسجد","Nom de la mosquée"],req:1,full:1},
  {k:"kind",l:["النوع","Type"],t:"sel",o:["جامع تقام فيه الجمعة","مسجد للصلوات الخمس","مصلى"]},
  {k:"capacity",l:["السعة التقريبية (مصلٍّ)","Capacité (fidèles)"],t:"num"},
  {k:"imam",l:["الإمام الراتب","Imam"]},{k:"khatib",l:["الخطيب","Khatib (prêcheur)"]},
  {k:"waqf",l:["وضعية الوقف","Statut waqf"],t:"sel",o:["موقوف بوثيقة رسمية","موقوف بلا وثيقة","غير موقوف","غير معروف"]},
  {k:"founded",l:["سنة التأسيس","Année de fondation"],t:"num"},
  {k:"jumuah",l:["وقت صلاة الجمعة","Heure de la prière du vendredi"],t:"time"},
  {k:"khutbaLang",l:["لغة خطبة الجمعة","Langue du sermon du vendredi"],t:"chk",o:LANGS,full:1},
  {k:"facilities",l:["المرافق","Équipements"],t:"chk",o:["مصلى للنساء","مكتبة","فصول تحفيظ","ميضأة","سكن للإمام","مكبر صوت"],full:1}]},
 schools:{label:["المدارس","Écoles"],one:["مدرسة","École"],ic:"🏫",fields:[
  {k:"name",l:["اسم المدرسة","Nom de l'école"],req:1,full:1},
  {k:"stage",l:["أعلى مرحلة","Niveau le plus élevé"],t:"sel",o:["روضة","ابتدائي","إعدادي","ثانوي","معهد عالٍ / جامعي"]},
  {k:"system",l:["النظام","Système"],t:"sel",o:["عربية إسلامية (مدرسة)","فرنسية-عربية مزدوجة","شرعية تقليدية"]},
  {k:"recognized",l:["الاعتراف الرسمي","Reconnaissance officielle"],t:"sel",o:["معترف بها من الوزارة","قيد الإجراء","غير معترف بها"]},
  {k:"director",l:["المدير","Directeur"]},{k:"teachers",l:["عدد المعلمين","Nb d'enseignants"],t:"num"},
  {k:"mosque",l:["المسجد التابعة له","Mosquée de rattachement"],t:"link",full:1},
  {k:"st_m",l:["عدد الطلاب (ذكور)","Élèves (garçons)"],t:"num"},{k:"st_f",l:["عدد الطالبات (إناث)","Élèves (filles)"],t:"num"}]},
 centers:{label:["مراكز التحفيظ","Centres coraniques"],one:["مركز تحفيظ","Centre coranique"],ic:"📖",fields:[
  {k:"name",l:["اسم المركز","Nom du centre"],req:1,full:1},
  {k:"mode",l:["نظام الدراسة","Régime"],t:"sel",o:["نهاري","مسائي / ليلي","داخلي","عطلة صيفية","مختلط"]},
  {k:"riwaya",l:["الرواية المعتمدة","Lecture (riwâya)"],t:"sel",o:["ورش عن نافع","قالون عن نافع","حفص عن عاصم","أخرى"]},
  {k:"director",l:["المسؤول","Responsable"]},{k:"teachers",l:["عدد المحفظين","Nb de maîtres"],t:"num"},
  {k:"mosque",l:["المسجد التابع له","Mosquée de rattachement"],t:"link",full:1},
  {k:"huffaz",l:["عدد الحفاظ المتخرجين","Hafiz diplômés"],t:"num"},
  {k:"st_m",l:["عدد الطلاب (ذكور)","Élèves (garçons)"],t:"num"},{k:"st_f",l:["عدد الطالبات (إناث)","Élèves (filles)"],t:"num"}]},
 duat:{label:["الدعاة والداعيات","Prédicateurs et prédicatrices"],one:["داعية","Prédicateur"],ic:"🎙️",fields:[
  {k:"name",l:["الاسم الكامل","Nom complet"],req:1,full:1},
  {k:"gender",l:["الجنس","Sexe"],t:"sel",o:["داعية (رجل)","داعية (امرأة)"],req:1},
  {k:"qual",l:["المؤهل العلمي","Niveau d'études"],t:"sel",o:["دراسة تقليدية عند المشايخ","ثانوية","ليسانس","ماجستير","دكتوراه"]},
  {k:"spec",l:["مجالات النشاط","Domaines d'activité"],t:"chk",o:["الخطابة","الدروس العلمية","الدعوة النسائية","الإعلام والإذاعة","التحفيظ","الإفتاء","الرقية الشرعية","دعوة غير المسلمين"],full:1},
  {k:"langs",l:["لغات الدعوة","Langues de prêche"],t:"chk",o:LANGS,full:1},
  {k:"inst",l:["المؤسسة / المسجد المرتبط به","Institution / mosquée de rattachement"],t:"link",full:1}]},
 assoc:{label:["الجمعيات والمنظمات","Associations et ONG"],one:["جمعية","Association"],ic:"🤝",fields:[
  {k:"name",l:["اسم الجمعية / المنظمة","Nom de l'association"],req:1,full:1},
  {k:"type",l:["الصفة","Nature"],t:"sel",o:["جمعية دعوية","جمعية خيرية","جمعية شبابية","جمعية نسائية","اتحاد / رابطة","منظمة تعليمية"]},
  {k:"legal",l:["الوضع القانوني","Statut juridique"],t:"sel",o:["مرخصة (إيصال تسجيل)","قيد الترخيص","غير مرخصة"]},
  {k:"president",l:["الرئيس","Président"]},{k:"members",l:["عدد الأعضاء","Nb de membres"],t:"num"},{k:"founded",l:["سنة التأسيس","Année de fondation"],t:"num"},
  {k:"fields",l:["مجالات العمل","Domaines d'action"],t:"chk",o:["الدعوة","التعليم","الإغاثة","كفالة الأيتام","حفر الآبار","بناء المساجد","الصحة","التنمية"],full:1}]},
 media:{label:["الإذاعات والإعلام","Radios et médias"],one:["وسيلة إعلام","Média"],ic:"📻",fields:[
  {k:"name",l:["الاسم","Nom"],req:1,full:1},
  {k:"kind",l:["النوع","Type"],t:"sel",o:["إذاعة FM","قناة تلفزيونية","قناة / صفحة على الإنترنت","مطبوعة / مجلة"]},
  {k:"freq",l:["التردد أو الرابط","Fréquence ou lien"]},{k:"manager",l:["المسؤول","Responsable"]},
  {k:"hours",l:["ساعات البث الديني أسبوعياً","Heures d'émissions religieuses / semaine"],t:"num"},
  {k:"langs",l:["لغات البث","Langues de diffusion"],t:"chk",o:LANGS,full:1},
  {k:"programs",l:["أبرز البرامج","Principaux programmes"],t:"area",full:1}]},
 offices:{label:["مكاتب التجمع","Bureaux de la CSM"],one:["مكتب","Bureau"],ic:"🏛️",fields:[
  {k:"name",l:["اسم المكتب","Nom du bureau"],req:1,full:1,ph:["مثال: مكتب دائرة كاتي","Ex. : Bureau du cercle de Kati"]},
  {k:"level",l:["مستوى المكتب","Niveau du bureau"],t:"sel",o:OFFICE_LEVELS,req:1},
  {k:"founded",l:["سنة التأسيس","Année de création"],t:"num"},
  {k:"hq",l:["مقر المكتب","Siège du bureau"],t:"link",full:1},
  {k:"meetings",l:["دورية الاجتماعات","Fréquence des réunions"],t:"sel",o:["أسبوعية","شهرية","فصلية","سنوية","غير منتظمة"]},
  {k:"activities",l:["أبرز الأنشطة","Principales activités"],t:"area",full:1}]}
};
const ALLC=Object.keys(CATS);
const ORDER=ALLC.slice(); // الأقسام الظاهرة للمستخدم الحالي (تُضبط بعد الدخول)
const BAMAKO="مقاطعة باماكو";
const DIRECTORATES=["المديرية الأولى","المديرية الثانية","المديرية الثالثة","المديرية الرابعة","المديرية الخامسة","المديرية السادسة","مديرية كالابان كورو","مديرية موريبابوغو وانغاباكورو"];
const LOC=[
 {k:"region",l:["المقاطعة / الإقليم","District / Région"],t:"sel",o:REGIONS,req:1},
 {k:"commune",l:["الدائرة","Cercle"],t:"dl"},
 {k:"city",l:["المدينة / القرية","Ville / Village"]},
 {k:"quarter",l:["الحي","Quartier"]},
 {k:"landmark",l:["أقرب معلم","Repère le plus proche"],ph:["مثال: قرب سوق الحي، خلف المدرسة الابتدائية","Ex. : près du marché, derrière l'école"]},
 {k:"gps",l:["الإحداثيات (خط العرض، خط الطول)","Coordonnées GPS (lat, long)"],t:"gps"}];
// تسمية الخانة حسب الإقليم: «المديرية» في باماكو و«الدائرة» في غيرها
const flab=(f,x)=>f.k==="commune"?((x&&x.region)===BAMAKO?["المديرية","Direction"]:["الدائرة","Cercle"]):f.l;
const locLine=x=>{const a=[tv(x.region),tv(x.commune),x.region===BAMAKO?"":x.city,x.quarter].filter(Boolean);return a.filter((v,i)=>a.indexOf(v)===i).join(" · ")};
const TAIL=[{k:"phone",l:["الهاتف","Téléphone"],t:"tel",priv:1},{k:"notes",l:["ملاحظات","Remarques"],t:"area",full:1}];
const ROLES={pending:["بانتظار الموافقة","En attente"],viewer:["مطّلع","Lecteur"],contributor:["مساهم","Contributeur"],regadmin:["مشرف إقليم","Superviseur régional"],admin:["نائب المدير","Directeur adjoint"]};
const L=a=>Array.isArray(a)?a[LANG==="fr"?1:0]:a;
const cl=c=>L(CATS[c].label), co=c=>L(CATS[c].one);

/* ================= الحالة ================= */
let data={};ALLC.forEach(c=>data[c]=[]);
let phones={}, users=[], logs=[], news=[], reports=[];
const CONFIG={site:{},lists:{}};
let me=null;
let store=null;
let view=decodeURIComponent(location.hash.slice(1))||"home";
let filt={q:"",region:"",status:"",commune:"",city:""};
let pendingWrites=0;
const isAdmin=()=>me&&me.role==="admin";
const canWrite=()=>me&&(me.role==="admin"||me.role==="contributor"||me.role==="regadmin");
const isRegAdmin=()=>me&&me.role==="regadmin";
const canVerify=x=>isAdmin()||(isRegAdmin()&&x&&x.region===me.region);
const canRead=()=>me&&me.role!=="pending";
// مكاتب التجمع: للمشرف العام كلها، ولمشرف الإقليم والمندوب مكاتب منطقته فقط، ولا يراها غيرهم
// أعضاء اللجنة الإدارية يرون جميع المكاتب (اطلاعاً)
const isAdmCom=()=>!!me&&me.role!=="pending"&&me.role!=="guest"&&me.adminCommittee===true;
const offAll=()=>isAdmin()||isAdmCom();
const offZone=()=>!!me&&(me.role==="regadmin"||me.role==="contributor")&&!!me.region;
const canOffices=()=>!!me&&(offAll()||offZone());
const canAddOffice=()=>isAdmin()||offZone();
const canEditOffice=x=>isAdmin()||(offZone()&&x&&x.region===me.region);
const canWriteC=c=>c==="offices"?canAddOffice():canWrite();
function syncOrder(){ORDER.splice(0,ORDER.length,...ALLC.filter(c=>c!=="offices"||canOffices()));if(!canOffices())data.offices=[]}

const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num=v=>{const n=parseInt(v,10);return isNaN(n)?0:n};
const LOCALE=()=>LANG==="fr"?"fr-FR":"ar-u-nu-latn";
const fmt=n=>Number(n).toLocaleString(LOCALE());
const dfmt=s=>{try{return s?new Date(s).toLocaleDateString(LOCALE(),{year:"numeric",month:"long",day:"numeric"}):""}catch(e){return ""}};
const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const pkey=(c,id)=>c+"__"+id;
const ls={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
function toast(m){const el=$("#toast");el.textContent=m;el.classList.add("on");clearTimeout(el._h);el._h=setTimeout(()=>el.classList.remove("on"),2600)}
function fieldsOf(c){const f=CATS[c].fields;
  // الدعاة: لا موقع لهم، ويبقى الإقليم اختيارياً للإحصاء فقط
  const NF={k:"name_fr",l:["الاسم بالفرنسية (اختياري)","Nom en français (facultatif)"],full:1};
  if(c==="duat")return [f[0],NF,{...LOC[0],req:0,l:["المقاطعة / الإقليم (للإحصاء فقط)","District / Région (statistiques)"]},...f.slice(1),...TAIL];
  if(c==="offices")return [f[0],NF,f[1],{...LOC[0],req:0},...LOC.slice(1),...f.slice(2),...TAIL];
  return [f[0],NF,...LOC,...f.slice(1),...TAIL]}
// الاسم الرئيسي والفرعي: بالعربية الاسم العربي وتحته الفرنسي، وفي الواجهة الفرنسية العكس
const nameMain=x=>LANG==="fr"&&x.name_fr?x.name_fr:x.name;
const nameSub=x=>x.name_fr?(LANG==="fr"?x.name:x.name_fr):"";
function allRows(){return ORDER.flatMap(c=>data[c].map(x=>({c,x})))}
window.APP={};
let favs=new Set(ls.get("csm-favs",[]));
const isFav=(c,id)=>favs.has(pkey(c,id));
function applyLang(){document.documentElement.lang=LANG;document.documentElement.dir=LANG==="fr"?"ltr":"rtl";document.title=t("appName")}
applyLang();
APP.lang=()=>{LANG=LANG==="ar"?"fr":"ar";ls.set("csm-lang",LANG);try{localStorage.setItem("csm-lang",LANG)}catch(e){}applyLang();if(me)render();else renderAuth();};
// الدوائر الرسمية لكل إقليم — القانون 2023-006 (13 مارس 2023): 19 إقليما، 159 دائرة
// المصدر: الخريطة الإدارية الرسمية (غرفة التجارة والصناعة بمالي) + ويكيبيديا (رموز الدوائر)
const CERCLES_RAW={
"كاي":"أمبيديدي:Ambidédi|أورو:Aourou|بافولابي:Bafoulabé|ديامو:Diamou|كاي:Kayes|كينييبا:Kéniéba|أوسوبيدياغنا:Oussoubidiagna|ساديولا:Sadiola|سيغالا:Ségala|ييليماني:Yélimané",
"كوليكورو":"بانامبا:Banamba|كانغابا:Kangaba|كاتي:Kati|كولوكاني:Kolokani|كوليكورو:Koulikoro|نيغيلا:Néguéla|نيامينا:Nyamina|سيبي:Siby",
"سيكاسو":"دانديريسو:Danderesso|كاديولو:Kadiolo|كينيان:Kignan|كليلا:Kléla|لوبوغولا:Lobougoula|لولوني:Loulouni|نيينا:Niéna|سيكاسو:Sikasso",
"سيغو":"باروييلي:Barouéli|بلا:Bla|ديورو:Dioro|فاراكو:Farako|ماسينا:Macina|ماركالا:Markala|نامبالا:Nampala|نيونو:Niono|سارو:Sarro|سيغو:Ségou|سوكولو:Sokolo",
"موبتي":"جيني:Djenné|كونا:Konna|كورينتزي:Korientzé|موبتي:Mopti|سوفارا:Sofara|توغيري كومبي:Toguéré-Coumbé|تيننكو:Ténenkou|يووارو:Youwarou",
"تمبكتو":"بامبارا ماودي:Bambara-Maoudé|بير:Ber|بينتاغونغو:Bintagoungou|ديري:Diré|غارغاندو:Gargando|غوسي:Gossi|غوندام:Goundam|غورما رهاروس:Gourma-Rharous|ليري:Léré|نيافونكي:Niafunké|سارافيري:Saraféré|تمبكتو:Tombouctou|تونكا:Tonka",
"غاو":"المسترات:Almoustrat|أنسونغو:Ansongo|بامبا:Bamba|بوريم:Bourem|جيبوك:Djebock|إرسان:Ersane|غابيرو:Gabéro|غاو:Gao|كاسامبيري:Kassambéré|انتيليت:N'Tillit|واتاغونا:Ouattagouna|سوني علي بير:Soni Aliber|تبنكورت:Tabankort|تالاتاي:Talataye|تيسيت:Tessit|تين أوكر:Tin-Aouker",
"كيدال":"أبيبارا:Abeïbara|أشيبوغو:Achibogho|أغلهوك:Aguel-Hoc|أنفيس:Anéfif|كيدال:Kidal|تاكالوت:Takalote|تساليت:Tessalit|تيميترين:Timétrine|تين إيساكو:Tin-Essako",
"تاوديني":"أشورات:Achouratt|الورش:Al-Ourche|أروان:Araouane|بوجبيهة:Boû-Djebeha|فم العلبة:Foum-Elba|تاوديني:Taoudenni",
"ميناكا":"أندرامبوكان:Andéramboukane|أنوزاغرين:Anouzagrène|إينيكار:Inékar|إنلماوان (فانفي):Inlamawane (Fanfi)|ميناكا:Ménaka|تيدرمين:Tidermène",
"نيورو الساحل":"بيما:Béma|ديانغونتي كامارا:Diangounté-Camara|ديما:Diéma|نيورو:Nioro|ساندري:Sandaré|ترونغومبي:Troungoumbé",
"كيتا":"كيتا:Kita|ساغاباري:Sagabari|سيبيكورو:Sébékoro|سيفيتو:Séféto|سيراكورو:Sirakoro|توكوتو:Toukoto",
"ديويلا":"بانكو:Banco|بيلكو:Bélko|ديويلا:Dioïla|فانا:Fana|ماسيغي:Massigui|مينا:Ména",
"نارا":"بالي:Ballé|ديلي:Dilly|فالو:Fallou|غيري:Guiré|مورديا:Mourdiah|نارا:Nara",
"بوغوني":"بوغوني:Bougouni|دوغو:Dogo|فاكولا:Fakola|غارالو:Garalo|كاديانا:Kadiana|كولوندييبا:Kolondiéba|كومانتو:Koumantou|ويليسيبوغو:Ouélessébougou|سيلينغي:Sélingué|يانفوليلا:Yanfolila",
"كوتيالا":"كونسيغيلا:Konséguéla|كونيانا:Kouniana|كوري:Koury|كوتيالا:Koutiala|امبيسوبا:M'Pessoba|مولوبالا:Molobala|يوروسو:Yorosso|زانغاسو:Zangasso",
"سان":"فانغاسو:Fangasso|كيمبارانا:Kimparana|مندياكوي:Mandiakuy|سان:San|سي:Sy|تومينيان:Tominian|يانغاسو:Yangasso",
"دوينتزا":"بوني:Boni|بوري:Boré|دوينتزا:Douentza|هومبوري:Hombori|موندورو:Mondoro|انغوما:N'Gouma",
"بانديغارا":"بانديغارا:Bandiagara|بانكاس:Bankass|ديالاساغو:Diallassagou|كاني:Kani|كندي:Kendié|كورو:Koro|نينغاري:Ningari|سانغا:Sangha|سوكورا:Sokoura"
};
const CERCLES={};
Object.entries(CERCLES_RAW).forEach(([r,s])=>{CERCLES[r]=s.split("|").map(p=>{const [ar,fr]=p.split(":");if(!FRV[ar])FRV[ar]=fr;return ar})});
/* ====== التقسيم الإداري الجديد لمقاطعة باماكو: 7 أقسام إدارية و102 حيّا ====== */
Object.assign(S,{
 otherQ:["حي آخر (اكتب الاسم)","Autre quartier (saisir)"],
 nameFrL:["الاسم بالفرنسية (اختياري)","Nom en français (facultatif)"],
 gMore:["المزيد","Plus"],
 clnT:["تنظيف بيانات «القسم الإداري» القديمة","Nettoyer l'ancien champ « arrondissement »"],
 clnInfo:["أُلغي هذا الحقل في الإصدار 32. يحذف الزر القيمة القديمة المخزّنة من السجلات (لا يمسّ أي بيانات أخرى).","Ce champ a été supprimé en v32. Le bouton retire l'ancienne valeur des fiches (aucune autre donnée n'est modifiée)."],
 clnB:["🧹 حذف القيم القديمة الآن","🧹 Supprimer les anciennes valeurs"],
 clnNone:["لا توجد سجلات تحتوي القيمة القديمة ✅","Aucune fiche concernée ✅"],
 clnQ:["سيُنظَّف {n} سجلاً. متابعة؟","{n} fiches seront nettoyées. Continuer ?"],
 clnDone:["✅ نُظّف {n} سجلاً","✅ {n} fiches nettoyées"]
});
const QLAB=["الحي","Quartier"];
const ARRONDS=["القسم الأول","القسم الثاني","القسم الثالث","القسم الرابع","القسم الخامس","القسم السادس","القسم السابع"];
const ARR_FR={"القسم الأول":"1er Arrondissement","القسم الثاني":"2e Arrondissement","القسم الثالث":"3e Arrondissement","القسم الرابع":"4e Arrondissement","القسم الخامس":"5e Arrondissement","القسم السادس":"6e Arrondissement","القسم السابع":"7e Arrondissement"};
const BKO_RAW={
"القسم الأول":"بولكاسومبوغو:Boulkassoumbougou|بانكوني:Banconi|جيليبوغو:Djélibougou|جومانزانا:Djoumanzana|فادجيغيلا:Fadjiguila|كوروفينا الشمالية:Korofina Nord|كوروفينا الجنوبية:Korofina Sud|سوتوبا:Sotuba|سانغاريبوغو:Sangarébougou|سارامبوغو:Sarambougou|سيدوبوغو:Seydoubougou|ديالاكورودجي:Dialakorodji|نتيغيدو-ساماسيبوغو:N'Teguedo-Samassébougou|نتيغيدو-سيراكورو:N'Teguedo-Sirakoro|موريبابوغو:Moribabougou|دوغوبالي:Dogobale|سليمانيبوغو:Souleymanebougou|فومبابوغو:Fombabougou|نغاباكورو دروا:N'Gabacoro Droit|تيتيبوغو:Titibougou|سيكوروني:Sikoroni",
"القسم الثاني":"باغادادجي:Bagadadji|باكاريبوغو:Bakarybougou|بوغوبا:Bougouba|بوزولا:Bozola|إيبودروم:Hippodrome|كونيبوغو:Konébougou|ميدينا-كورا:Medina-Coura|ميسيرا:Missira|نغومي:N'Gomi|نياريلا:Niarela|كينزامبوغو:Quinzambougou|سان-فيلس:Sans-Fils|المنطقة الصناعية:Zone Industrielle",
"القسم الثالث":"باديالان 1:Badialan I|باديالان 2:Badialan II|باديالان 3:Badialan III|باماكو-كورا:Bamako-Coura|باماكو-كورا بوليبانا:Bamako-Coura Bolibana|المركز التجاري:Centre Commercial|دار السلام:Darsalam|درافيلا:Dravela|درافيلا بوليبانا:Dravela Bolibana|كودابوغو:Kodabougou|كولوبا:Koulouba|نيوميرامبوغو:Niomirambougou|نتوميكوروبوغو:N'Tomikorobougou|أوولو فوبوغو:Ouolo Fobougou|أوولو فوبوغو بوليبانا:Ouolo Fobougou Bolibana|بوينت G:Point G|سامي:Samé|سيراكورو-دونفينغ:Sirakoro-Dounfing|كولونيكو:Koulouniko|سوغونافينغ:Sogonafing|سانانكورو:Sanankoro|دياغوني:Diagoni",
"القسم الرابع":"همدلاي:Hamdallaye|لافيابوغو:Lafiabougou|لاسا:Lassa|جيكوروني بارا:Djicoroni Para|سيبينيكورو:Sébénikoro|سيبيريبوغو:Sibiribougou|كالابانبوغو:Kalabanbougou|دوغودومان:Dogodouman|غرينغومي:Gringoumé|تاليكو:Taliko|ويزيندوغو:Ouezindougou|ماماريبوغو:Mamaribougou|كانادجيغيلا:Kanadjiguila|كابالابوغو:Kabalabougou",
"القسم الخامس":"باكودجيكوروني:Bacodjicoroni|بادالابوغو:Badalabougou|داودابوغو:Daoudabougou|غارانتيغيبوغو:Garantiguibougou|كالابانكورا:Kalabancoura|حي مالي:Quartier Mali|ساباليبوغو:Sabalibougou|سيما:Séma|توروكوروبوغو:Torokorobougou",
"القسم السادس":"بانانكابوغو:Banankabougou|ديانيغيلا:Dianéguela|فالاديي:Faladié|ماغنامبوغو:Magnambougou|نياماكورو:Niamakoro|سينو:Sénou|سوغونينكو:Sogoninko|سوكورودجي:Sokorodji|ييريماديو:Yirimadio|ميسابوغو:Missabougou|دياتولا:Diatoula|نيامانا:Niamana|سيراكورو-ميغيتانا:Sirakoro-Méguétana|نتاباكورو:N'Tabacoro|درامانيبوغو-تيليم:Dramanebougou-Tellem|ساباليبوغو كوراني:Sabalibougou Kourani",
"القسم السابع":"غوانا:Gouana|كابالا:Kabala|كالابانكورو:Kalabancoro|كورالي:Kouralé|ميسالا:Missala|ميسالابوغو:Missalabougou|نغولو بوغو:N'Golo Bougou"
};
const BKO_Q={},Q_ARR={};
Object.entries(ARR_FR).forEach(([a,f])=>{if(!FRV[a])FRV[a]=f});
Object.entries(BKO_RAW).forEach(([a,s])=>{BKO_Q[a]=s.split("|").map(p=>{const [ar,fr]=p.split(":");if(fr&&!FRV[ar])FRV[ar]=fr;Q_ARR[ar]=a;return ar})});
const BKO_QUARTERS=ARRONDS.flatMap(a=>BKO_Q[a]);
// الرمز الإداري الرسمي للحي: 000 + رقم المقاطعة + ترتيب الحي
const qcode=q=>{const a=Q_ARR[q];if(!a)return"";return "000"+(ARRONDS.indexOf(a)+1)+String(BKO_Q[a].indexOf(q)+1).padStart(4,"0")};
const arrondOf=()=>""; // أُلغي «القسم الإداري» في الإصدار 32
function qDatalist(){return `<datalist id="dl_q">${BKO_QUARTERS.map(o=>`<option value="${esc(o)}">`).join("")}</datalist>`}
function quarterInput(r,v){
  if(r!==BAMAKO)return `<div class="row"><input id="f_quarter" value="${esc(v||"")}" autocomplete="off">${SR?`<button type="button" class="micb" title="${t("voice")}" onclick="APP.voice('f_quarter',this)">🎤</button>`:""}</div>`;
  if(!v||BKO_QUARTERS.includes(v))return `<select id="f_quarter" onchange="APP.qPick(this)"><option value="">${t("choose")}</option>${[...BKO_QUARTERS].sort((x,y)=>x.localeCompare(y,"ar")).map(o=>`<option value="${esc(o)}" ${v===o?"selected":""}>${esc(tv(o))}</option>`).join("")}<option value="__o">✏️ ${t("otherQ")}</option></select>`;
  return `<input id="f_quarter" list="dl_q" value="${esc(v)}" autocomplete="off">${qDatalist()}`;
}
APP.qPick=el=>{
  if(el.value==="__o"){el.outerHTML=`<input id="f_quarter" list="dl_q" autocomplete="off" placeholder="${esc(t("otherQ"))}">`+qDatalist();const n=$("#f_quarter");if(n)n.focus();return}
};
// تُستدعى عند تغيّر الإقليم: تبديل خانة الحي وإظهار/إخفاء المقاطعة الإدارية
function updQuarter(r,chg){
  const wq=$("#w_quarter");
  if(wq){let cur=chg?"":(($("#f_quarter")&&$("#f_quarter").value)||"");if(cur==="__o")cur="";
    wq.innerHTML=`<label id="l_quarter">${L(QLAB)}</label>`+quarterInput(r,cur)}
}
/* ================= التخزين: تجريبي (على الجهاز) ================= */
function LocalStore(){
  const K="csm-demo-v1";
  const load=()=>{try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return {}}};
  let db=load();
  const persist=()=>{try{localStorage.setItem(K,JSON.stringify(db))}catch(e){}};
  const emit=()=>{ORDER.forEach(c=>data[c]=Object.entries(db[c]||{}).map(([id,v])=>({...v,id})));phones={...(db.contacts||{})};users=Object.entries(db.users||{}).map(([uid,v])=>({...v,uid}));logs=db.logs||[];news=Object.entries(db.news||{}).map(([id,v])=>({...v,id})).sort((x,y)=>String(y.at).localeCompare(String(x.at)));cards=Object.entries(db.cards||{}).map(([id,v])=>({...v,id}));reports=Object.entries(db.reports||{}).map(([id,v])=>({...v,id}));Object.assign(CONFIG,db.config||{});render()};
  return {
    async start(){me={uid:"demo",name:(LANG==="fr"?"Utilisateur démo":"المستخدم التجريبي"),email:"demo@local",role:"admin",owner:true};db.users=db.users||{};db.users.demo={name:me.name,email:me.email,role:"admin",createdAt:new Date().toISOString()};persist();emit()},
    save(c,id,o){(db[c]=db[c]||{})[id]=o;persist();emit();return Promise.resolve()},
    savePhone(c,id,p){db.contacts=db.contacts||{};if(p)db.contacts[pkey(c,id)]=p;else delete db.contacts[pkey(c,id)];persist();emit();return Promise.resolve()},
    remove(c,id){if(db[c])delete db[c][id];if(db.contacts)delete db.contacts[pkey(c,id)];persist();emit();return Promise.resolve()},
    setRole(uid,role){if(db.users&&db.users[uid])db.users[uid].role=role;persist();emit();return Promise.resolve()},
    logout(){toast(t("demoNoLogout"))},
    guest(){},
    setUser(uid,patch){if(db.users&&db.users[uid])Object.assign(db.users[uid],patch);persist();emit();return Promise.resolve()},
    log(e){db.logs=db.logs||[];db.logs.unshift({...e,id:newId()});db.logs=db.logs.slice(0,300);persist();logs=db.logs;return Promise.resolve()},
    saveConfig(id,o){db.config=db.config||{};db.config[id]={...(db.config[id]||{}),...o};CONFIG[id]=db.config[id];persist();render();return Promise.resolve()},
    async getPhoto(k){return (db.photos||{})[k]||null},
    savePhoto(k,d){db.photos=db.photos||{};if(d)db.photos[k]=d;else delete db.photos[k];persist();return Promise.resolve()},
    saveNews(id,o){db.news=db.news||{};db.news[id]=o;persist();emit();return Promise.resolve()},
    delNews(id){if(db.news)delete db.news[id];persist();emit();return Promise.resolve()},
    saveCard(id,o){db.cards=db.cards||{};const v={...o};delete v.id;db.cards[id]=v;persist();emit();return Promise.resolve()},
    async getCard(id){const v=(db.cards||{})[id];return v?{...v,id}:null},
    async alloc(key,k,base=0){db.counters=db.counters||{};const n=Math.max(db.counters[key]||0,base);db.counters[key]=n+k;persist();return n+1},
    patch(c,id,o){if(db[c]&&db[c][id])Object.assign(db[c][id],o);persist();emit();return Promise.resolve()},
    suggest(o){db.reports=db.reports||{};db.reports[newId()]=o;persist();emit();return Promise.resolve()},
    patchReport(id,o){if(db.reports&&db.reports[id])Object.assign(db.reports[id],o);persist();emit();return Promise.resolve()}
  };
}

/* ---- نطاق العرض: إخفاء (لا حذف) السجلات الأخرى وإبقاء سجلات المالك في باماكو ---- */
const raw={};
const showAllHere=()=>isAdmin()&&ls.get("csm-showall",false)===true;
function keepRec(x){const sc=CONFIG.scope;if(!sc||sc.on!==true||!sc.uid)return true;if(showAllHere())return true;return x.createdBy===sc.uid&&x.region===BAMAKO}
function applyScope(){ORDER.forEach(c=>{if(raw[c])data[c]=raw[c].filter(keepRec)})}
const scopeHidden=()=>ORDER.reduce((n,c)=>n+(raw[c]||[]).filter(x=>!(x.createdBy===me.uid&&x.region===BAMAKO)).length,0);
function scopeBox(){
  if(!isAdmin()||!me.uid||DEMO)return "";
  const on=(CONFIG.scope||{}).on===true,sa=ls.get("csm-showall",false)===true;
  return `<div class="card"><h3>🙈 ${L(["نطاق العرض","Périmètre d'affichage"])}</h3>
   <div class="hint">${on?L(["الإخفاء مفعّل: لا يظهر للجميع إلا ما أدخلتَه أنت في باماكو. السجلات الأخرى محفوظة ولم تُحذف.","Masquage actif : seules vos fiches de Bamako sont visibles. Les autres sont conservées, non supprimées."]):L(["كل السجلات ظاهرة. يمكنك إخفاء ما عدا ما أدخلتَه أنت في باماكو (دون حذف).","Toutes les fiches sont visibles. Vous pouvez masquer toutes celles qui ne sont pas les vôtres à Bamako (sans suppression)."])}</div>
   <button class="${on?"bs":"bp"}" onclick="APP.scopeSet(${!on})">${on?L(["إلغاء الإخفاء (إظهار الكل)","Désactiver le masquage"]):L(["تفعيل الإخفاء","Activer le masquage"])}</button>
   ${on?`<label class="chk" style="margin-top:8px"><input type="checkbox" ${sa?"checked":""} onchange="APP.showAll(this.checked)"> ${L(["أرى أنا كل السجلات على هذا الجهاز","Je vois toutes les fiches sur cet appareil"])}</label>`:""}</div>`}
APP.scopeSet=on=>{
  if(on&&!confirm(L(["سيُخفى {n} سجلاً عن جميع المستخدمين (دون حذف) ولا يبقى إلا سجلاتك في باماكو. يُنصح بتنزيل نسخة احتياطية أولاً. متابعة؟","{n} fiches seront masquées pour tous (sans suppression). Seules vos fiches de Bamako resteront. Faites d'abord une sauvegarde. Continuer ?"]).replace("{n}",fmt(scopeHidden()))))return;
  store.saveConfig("scope",{on,uid:me.uid});applyScope();toast(t("saved"));render()};
APP.showAll=v=>{ls.set("csm-showall",!!v);applyScope();render()};
/* ================= التخزين: Firebase ================= */
async function FirebaseStore(){
  const [{initializeApp},A,F]=await Promise.all([
    import(FB+"firebase-app.js"),import(FB+"firebase-auth.js"),import(FB+"firebase-firestore.js")]);
  const app=initializeApp(firebaseConfig);
  const auth=A.getAuth(app); auth.languageCode="ar";
  let fs;
  try{fs=F.initializeFirestore(app,{localCache:F.persistentLocalCache({tabManager:F.persistentMultipleTabManager()})})}
  catch(e){fs=F.getFirestore(app)}
  let unsubs=[];
  const stopAll=()=>{unsubs.forEach(u=>{try{u()}catch(e){}});unsubs=[]};
  const track=p=>{pendingWrites++;syncBadge();return p.finally(()=>{pendingWrites--;syncBadge()})};
  // الكتابة: لا ننتظر الخادم (يعمل دون اتصال)، ونُظهر الخطأ إن رفضته القواعد
  const fire=p=>{track(p).catch(e=>toast(errMsg(e)));return Promise.resolve()};

  function listen(){
    stopAll();
    syncOrder();
    if(!canRead())return;
    const qOf=c=>c==="offices"?(offAll()?F.collection(fs,c):F.query(F.collection(fs,c),F.where("region","==",me.region))):me.role==="guest"?F.query(F.collection(fs,c),F.where("status","==","verified")):F.collection(fs,c);
    ORDER.forEach(c=>unsubs.push(F.onSnapshot(qOf(c),{includeMetadataChanges:false},
      s=>{raw[c]=s.docs.map(d=>({...d.data(),id:d.id}));data[c]=raw[c].filter(keepRec);render()},
      e=>{console.warn(c,e);toast(errMsg(e))})));
    unsubs.push(F.onSnapshot(F.query(F.collection(fs,"news"),F.orderBy("at","desc"),F.limit(50)),s=>{news=s.docs.map(d=>({...d.data(),id:d.id}));render()},()=>{}));
    unsubs.push(F.onSnapshot(F.collection(fs,"config"),s=>{s.docs.forEach(d=>{CONFIG[d.id]=d.data()});applyScope();render()},()=>{}));
    if(canIssue())unsubs.push(F.onSnapshot(isAdmin()?F.collection(fs,"cards"):F.query(F.collection(fs,"cards"),F.where("region","==",me.region)),s=>{cards=s.docs.map(d=>({...d.data(),id:d.id}));if(view==="cards"||view.startsWith("cardv/"))render()},()=>{}));
    if(isAdmin()||isRegAdmin())unsubs.push(F.onSnapshot(isAdmin()?F.collection(fs,"reports"):F.query(F.collection(fs,"reports"),F.where("region","==",me.region)),s=>{reports=s.docs.map(d=>({...d.data(),id:d.id}));render()},()=>{}));
    if(isAdmin())unsubs.push(F.onSnapshot(F.query(F.collection(fs,"logs"),F.orderBy("at","desc"),F.limit(300)),s=>{logs=s.docs.map(d=>({...d.data(),id:d.id}));if(view==="logs")render()},()=>{}));
    if(isAdmin()){
      unsubs.push(F.onSnapshot(F.collection(fs,"contacts"),s=>{phones={};s.docs.forEach(d=>{const v=d.data();if(v.phone)phones[d.id]=v.phone})},()=>{}));
      unsubs.push(F.onSnapshot(F.collection(fs,"users"),s=>{users=s.docs.map(d=>({...d.data(),uid:d.id}));render()},()=>{}));
    }
  }

  return {
    async start(){
      try{await A.getRedirectResult(auth)}catch(e){authMsg(authErr(e))}
      A.onAuthStateChanged(auth,async u=>{
        stopAll(); ORDER.forEach(c=>data[c]=[]); phones={}; users=[];
        if(!u){me=null;renderAuth();return}
        const ref=F.doc(fs,"users",u.uid);
        let snap=null; try{snap=await F.getDoc(ref)}catch(e){}
        const owner=u.email&&u.email.toLowerCase()===OWNER_EMAIL.toLowerCase()&&u.emailVerified;
        if(!snap||!snap.exists()){
          const prof={name:u.displayName||(u.email||"").split("@")[0],email:u.email||"",role:"pending",createdAt:new Date().toISOString()};
          try{await F.setDoc(ref,prof)}catch(e){console.warn(e)}
          me={uid:u.uid,...prof};
        }else me={uid:u.uid,...snap.data()};
        me.owner=!!owner;
        if(owner){if(me.role!=="admin")F.setDoc(ref,{role:"admin"},{merge:true}).catch(()=>{});me.role="admin"}
        // متابعة تغيّر الدور (حين يوافق المشرف)
        unsubs.push(F.onSnapshot(ref,s=>{if(!s.exists())return;const d=s.data(),r=owner?"admin":d.role;if(r!==me.role||(d.region||"")!==(me.region||"")||!!d.adminCommittee!==!!me.adminCommittee){me={...me,...d,role:r};listen();render()}else if((d.adminReq||"")!==(me.adminReq||"")){me={...me,adminReq:d.adminReq||""};render()}}));
        listen(); render();
      });
    },
    async google(){
      const p=new A.GoogleAuthProvider();
      const standalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone;
      if(standalone)return A.signInWithRedirect(auth,p);
      try{await A.signInWithPopup(auth,p)}catch(e){if(e.code==="auth/popup-blocked"||e.code==="auth/operation-not-supported-in-this-environment")return A.signInWithRedirect(auth,p);throw e}
    },
    async signin(email,pw){await A.signInWithEmailAndPassword(auth,email,pw)},
    async signup(name,email,pw){const c=await A.createUserWithEmailAndPassword(auth,email,pw);await A.updateProfile(c.user,{displayName:name});try{await A.sendEmailVerification(c.user)}catch(e){}
      try{await F.setDoc(F.doc(fs,"users",c.user.uid),{name,email,role:"pending",createdAt:new Date().toISOString()})}catch(e){}
      if(me){me.name=name}},
    async reset(email){await A.sendPasswordResetEmail(auth,email)},
    logout(){if(me&&me.role==="guest"){stopAll();me=null;ORDER.forEach(c=>data[c]=[]);renderAuth();return}return A.signOut(auth)},
    guest(){me={uid:null,name:t("guestName"),email:"",role:"guest"};listen();render()},
    save(c,id,o){return fire(F.setDoc(F.doc(fs,c,id),o))},
    savePhone(c,id,p){const r=F.doc(fs,"contacts",pkey(c,id));return fire(p?F.setDoc(r,{phone:p,cat:c,ref:id}):(isAdmin()?F.deleteDoc(r):F.setDoc(r,{phone:"",cat:c,ref:id})))},
    remove(c,id){fire(F.deleteDoc(F.doc(fs,c,id)));if(phones[pkey(c,id)])fire(F.deleteDoc(F.doc(fs,"contacts",pkey(c,id))));return Promise.resolve()},
    setRole(uid,role){return fire(F.updateDoc(F.doc(fs,"users",uid),{role}))},
    setUser(uid,patch){return fire(F.updateDoc(F.doc(fs,"users",uid),patch))},
    log(e){return fire(F.setDoc(F.doc(fs,"logs",newId()),e))},
    saveConfig(id,o){CONFIG[id]={...(CONFIG[id]||{}),...o};return fire(F.setDoc(F.doc(fs,"config",id),o,{merge:true}))},
    async getPhoto(k){try{const s=await F.getDoc(F.doc(fs,"photos",k));return s.exists()?s.data().data:null}catch(e){return null}},
    savePhoto(k,d){const r=F.doc(fs,"photos",k);return fire(d?F.setDoc(r,{data:d}):F.deleteDoc(r))},
    saveNews(id,o){return fire(F.setDoc(F.doc(fs,"news",id),o))},
    delNews(id){return fire(F.deleteDoc(F.doc(fs,"news",id)))},
    saveCard(id,o){const v={...o};delete v.id;return fire(F.setDoc(F.doc(fs,"cards",id),v))},
    async getCard(id){const s=await F.getDoc(F.doc(fs,"cards",id));return s.exists()?{...s.data(),id:s.id}:null},
    // حجز أرقام متتالية بمعاملة ذرية حتى لا يتكرر رقم بين مشرفَين
    alloc(key,k,base=0){return F.runTransaction(fs,async tr=>{const r=F.doc(fs,"counters",key);const s=await tr.get(r);const n=Math.max(s.exists()?(s.data().n||0):0,base);tr.set(r,{n:n+k,at:new Date().toISOString()});return n+1})},
    patch(c,id,o){return F.updateDoc(F.doc(fs,c,id),o)},
    suggest(o){return fire(F.addDoc(F.collection(fs,"reports"),o))},
    patchReport(id,o){return fire(F.updateDoc(F.doc(fs,"reports",id),o))}
  };
}

/* ================= نصوص إضافية ================= */
Object.assign(S,{
 guestName:["زائر","Visiteur"],browseGuest:["👁️ تصفّح الدليل دون حساب","👁️ Consulter l'annuaire sans compte"],
 guestHint:["الزائر يرى المؤسسات الموثّقة فقط. للإدخال أنشئ حساب مندوب.","Le visiteur ne voit que les fiches vérifiées. Pour contribuer, créez un compte délégué."],
 rGuest:["👁️ زائر","👁️ Visiteur"],loginToContrib:["🔑 الدخول للمساهمة","🔑 Se connecter pour contribuer"],
 guestBanner:["أنت تتصفح كزائر: تظهر المؤسسات الموثّقة فقط.","Mode visiteur : seules les fiches vérifiées sont affichées."],
 spBasm:["بسم الله الرحمن الرحيم","Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux"],
 spWelcome:["أهلاً وسهلاً ومرحباً بكم","Soyez les bienvenus"],spWelcomeName:["أهلاً وسهلاً بك يا {n}","Bienvenue, {n}"],
 spSalat:["اللهم صلِّ وسلِّم وبارك على نبينا محمد، وعلى آله وصحبه أجمعين","Que la prière et la paix d'Allah soient sur notre Prophète Muhammad, sa famille et ses compagnons"],
 spDua:["اللهم اجزِ مطوّر هذا التطبيق خير الجزاء، واغفر له ولوالديه ولجميع المسلمين والمسلمات","Ô Allah, récompense le développeur de cette application, pardonne-lui ainsi qu'à ses parents et à tous les musulmans et musulmanes"],
 spAmin:["آمين","Âmîn"],enterApp:["الدخول إلى الدليل ←","Entrer dans l'annuaire →"],
 clear:["مسح","Effacer"],lastUsed:["عُبّئ الموقع تلقائياً من آخر إدخال.","Localisation pré-remplie depuis votre dernière saisie."],
});

/* ================= شاشة الترحيب ================= */
let splashShown=false,_splashed=false;
// بوابة الدخول بعد الدعاء: ﴿ادخلوها بسلام آمنين﴾ ثم تنفتح البوابة إلى التطبيق
function gate(){return new Promise(res=>{
  const g=document.createElement("div");g.id="gate";
  g.innerHTML=`<div class="g-img"></div><div class="g-shade"></div><img class="g-flag" src="mali-flag.svg" alt="علم مالي">
   <div class="g-in"><div class="g-ayah">﴿ادْخُلُوهَا بِسَلَامٍ آمِنِينَ﴾</div><div class="g-ref">${esc(L(["سورة الحجر، الآية ٤٦","Sourate Al-Hijr, verset 46"]))}</div>
   <button class="g-go">${t("enterApp")}</button></div>`;
  document.body.appendChild(g);
  const go=()=>{if(g._c)return;g._c=1;g.classList.add("open");setTimeout(()=>{g.remove();res()},1100)};
  g.querySelector(".g-go").onclick=go;g.querySelector(".g-img").onclick=go;setTimeout(go,7000)})}
function splash(name){
  if(splashShown)return Promise.resolve(); splashShown=true;
  try{if(sessionStorage.getItem("csm-splash"))return Promise.resolve();sessionStorage.setItem("csm-splash","1")}catch(e){}
  return new Promise(res=>{
    const d=document.createElement("div");d.id="splash";
    d.innerHTML=`<div class="sp-bg"></div><div class="sp-stars">${"<i></i>".repeat(18)}</div>
     <div class="sp-in">
      <img class="sp-logo" src="logo.png" alt=""><img class="sp-flag" src="mali-flag.svg" alt="">
      <div class="sp-l sp-basm">${t("spBasm")}</div>
      <div class="sp-l sp-wel">${esc(name?t("spWelcomeName",{n:name}):t("spWelcome"))}</div>
      <div class="sp-l sp-org">${t("org")}</div>
      <div class="sp-orn">❁ ❁ ❁</div>
      <div class="sp-l sp-salat">${t("spSalat")} ﷺ</div>
      <div class="sp-l sp-dua">${t("spDua")}</div>
      <div class="sp-l sp-amin">${t("spAmin")}</div>
      <button class="sp-go">${t("enterApp")}</button>
     </div>`;
    document.body.appendChild(d);
    const close=()=>{if(d._c)return;d._c=1;d.classList.add("out");setTimeout(()=>{d.remove();gate().then(res)},650)};
    d.querySelector(".sp-go").onclick=close;
    setTimeout(close,9000);
  });
}

/* ================= شارة الاتصال والتثبيت ================= */
function syncBadge(){
  const s=$("#sync");if(!s)return;
  if(DEMO){s.hidden=false;s.className="";s.textContent=t("demo");return}
  const off=!navigator.onLine;
  s.hidden=!(off||pendingWrites);s.className=off?"off":"";
  s.textContent=off?(pendingWrites?t("offPend",{n:fmt(pendingWrites)}):t("offline")):t("sending",{n:fmt(pendingWrites)});
}
addEventListener("online",syncBadge);addEventListener("offline",syncBadge);
let deferredPrompt=null;
addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;const b=$("#install");if(b)b.hidden=false});
addEventListener("appinstalled",()=>{const b=$("#install");if(b)b.hidden=true;toast(t("installed"))});
const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent),isStandalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone;
document.addEventListener("click",async e=>{
  const id=e.target.closest("button")?.id;
  if(id==="install"&&deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("#install").hidden=true}
  if(id==="logout"&&store)await store.logout();
  if(id==="menu")document.body.classList.toggle("open");
  if(id==="langbtn")APP.lang();
});
$("#scrim").onclick=()=>document.body.classList.remove("open");

/* ================= شاشة الدخول ================= */
let authMode="in";
function authMsg(m){const e=$("#aerr");if(e)e.textContent=m}
function authErr(e){
  const c=e&&e.code||"",fr=LANG==="fr";
  if(/invalid-credential|wrong-password|user-not-found|invalid-login/.test(c))return fr?"E-mail ou mot de passe incorrect.":"البريد أو كلمة المرور غير صحيحة.";
  if(c.includes("email-already-in-use"))return fr?"Cet e-mail est déjà utilisé.":"هذا البريد مسجَّل من قبل. ادخل به أو استعد كلمة المرور.";
  if(c.includes("weak-password"))return fr?"Mot de passe trop faible (6 caractères minimum).":"كلمة المرور ضعيفة: ستة أحرف على الأقل.";
  if(c.includes("invalid-email"))return fr?"E-mail invalide.":"صيغة البريد غير صحيحة.";
  if(c.includes("network"))return fr?"Pas de connexion. La première connexion nécessite Internet.":"لا يوجد اتصال. الدخول أول مرة يحتاج إلى إنترنت.";
  if(c.includes("unauthorized-domain"))return fr?"Domaine non autorisé dans Firebase.":"هذا النطاق غير مأذون في Firebase.";
  if(c.includes("popup-closed")||c.includes("cancelled-popup"))return "";
  if(c.includes("too-many-requests"))return fr?"Trop de tentatives, réessayez plus tard.":"محاولات كثيرة، انتظر قليلاً ثم أعد المحاولة.";
  return (fr?"Échec de connexion : ":"تعذّر الدخول: ")+(c||"?");
}
function heroHTML(withActs){
  return `<div class="hero"><div class="tx">
    <div class="kick">${t("kick")}</div>
    <div class="say">${t("sayAllah")}</div>
    <div class="verse" lang="ar" dir="rtl">﴿وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا﴾</div>
    <div class="ref">${t("verseRef")}</div>
    ${LANG==="fr"?`<div class="mean">${t("verseMeaning")}</div>`:""}
    <p class="lead">${t("lead")}</p>
    ${withActs||""}
  </div><div class="img"></div></div>`;
}
function renderAuth(){
  if(view.startsWith("verify/")){renderVerify(view.slice(7));return}
  document.body.classList.add("noside");document.body.classList.remove("open");$("#fab").style.display="none";
  const up=authMode==="up";
  $("#main").innerHTML=`<div class="authtop"><img src="logo.png" alt=""><div><b>${t("appName")}</b><small>${t("org")} · CSM</small></div><button class="langb" id="langbtn">🌐 ${t("lang")}</button></div>
  <div class="authwrap">${heroHTML()}
   <div id="auth">
   <h2>${up?t("signUp"):t("signIn")}</h2><div class="sub">${up?t("signUpSub"):t("signInSub")}</div>
   <button class="gbtn" id="gbtn"><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.2-.1-2.3-.4-3.5z"/></svg> ${t("google")}</button><div class="hint gtip">⭐ ${t("recommended")}</div>
   <div class="or">${t("orEmail")}</div>
   <form id="af">
    ${up?`<div class="fld"><label>${t("fullName")}</label><input id="an" required autocomplete="name"></div>`:""}
    <div class="fld"><label>${t("email")}</label><input id="ae" type="email" dir="ltr" required autocomplete="email"></div>
    <div class="fld"><label>${t("password")}</label><input id="ap" type="password" dir="ltr" required minlength="6" autocomplete="${up?"new-password":"current-password"}"></div>
    <button class="bp" type="submit">${up?t("create"):t("enter")}</button>
   </form>
   <div class="err" id="aerr"></div>
   <div class="alinks"><button class="lnkb" id="aswitch">${up?t("toIn"):t("toUp")}</button>${up?"":`<button class="lnkb" id="areset">${t("forgot")}</button>`}</div>
   ${DEMO?"":`<div class="or"> </div><button class="bs gst" id="gst">${t("browseGuest")}</button><div class="hint" style="text-align:center">${t("guestHint")}</div>`}
   ${!isStandalone?`<div class="hint" style="margin-top:12px;text-align:center">${isIOS?t("iosHint"):t("andHint")}</div>`:""}
  </div></div>`;
  $("#gbtn").onclick=async()=>{authMsg("");try{await store.google()}catch(e){authMsg(authErr(e))}};
  $("#aswitch").onclick=()=>{authMode=up?"in":"up";renderAuth()};
  const g=$("#gst");if(g)g.onclick=()=>store.guest();
  if(g&&/^#(zair|visit|public)$/.test(location.hash)){location.hash="home";store.guest()}
  else if(g&&/^#i\/[a-z]+\/[^\/]+$/.test(location.hash))store.guest(); // رابط مؤسسة (من لوحة QR): يفتح للزائر دون حساب
  if($("#areset"))$("#areset").onclick=async()=>{const e=$("#ae").value.trim();if(!e){authMsg(t("forgotFirst"));return}try{await store.reset(e);authMsg(t("resetSent"))}catch(x){authMsg(authErr(x))}};
  $("#af").onsubmit=async ev=>{ev.preventDefault();authMsg("");const b=ev.submitter;b.disabled=true;
    try{if(up)await store.signup($("#an").value.trim(),$("#ae").value.trim(),$("#ap").value);else await store.signin($("#ae").value.trim(),$("#ap").value)}
    catch(e){authMsg(authErr(e))}finally{b.disabled=false}};
}
function renderWaiting(){
  document.body.classList.add("noside");$("#fab").style.display="none";
  $("#main").innerHTML=`<div class="authtop"><img src="logo.png" alt=""><div><b>${t("appName")}</b><small>${t("org")}</small></div><button class="langb" id="langbtn">🌐 ${t("lang")}</button></div>
  <div id="auth" class="wait"><div class="big">🕓</div><h2>${t("waitT")}</h2><div class="sub">${esc(t("waitS",{n:me.name}))}</div>
  <div class="count" dir="ltr">${esc(me.email)}</div><button class="bs" id="logout" style="margin-top:14px">${t("logout")}</button></div>`;
}

/* ================= الإطار ================= */
const TITLES={quick:"quick",numbers:"numbers",mrep:"mrep",gaps:"gaps",reports:"reports",ask:"ask",privacy:"privacy",news:"news",home:"home",stats:"stats",regions:"regions",favs:"favs",report:"report",users:"users",map:"map",about:"about",dash:"dash",logs:"logs",import:"import",settings:"settings"};
const navOpen={};APP.nt=(id,o)=>{navOpen[id]=o};
function renderSide(){
  const pu=users.filter(u=>u.role==="pending").length;
  const a=(k,ic,l,extra="")=>`<a href="#${k}" class="${view===k||(k==="regions"&&view.startsWith("region/"))||(k==="news"&&view.startsWith("news/"))?"on":""}"><span class="ic">${ic}</span>${l}${extra}</a>`;
  let h=`<div class="grp">${t("gMain")}</div>`+a("home","🏠",t("home"))+a("news","📰",t("news"),news.length?`<span class="cnt">${fmt(news.length)}</span>`:"")+a("stats","📊",t("stats"))+a("map","📍",t("map"))+a("regions","🗺️",t("regions"))+a("favs","⭐",t("favs"),favs.size?`<span class="cnt">${fmt(favs.size)}</span>`:"");
  if(canOffices())h+=`<div class="grp">${t("gOrg")}</div>`+a("offices",CATS.offices.ic,cl("offices"),`<span class="cnt">${fmt(data.offices.length)}</span>`)+(offAll()?"":`<div class="hint" style="padding:0 16px 6px">🔒 ${t("offScope",{r:tv(me.region)})}</div>`);
  h+=`<div class="grp">${t("gDir")}</div>`+ORDER.filter(c=>c!=="offices").map(c=>a(c,CATS[c].ic,cl(c),`<span class="cnt">${fmt(data[c].length)}</span>`)).join("");
  // مجموعتا «المزيد» و«الإدارة» مطويتان افتراضياً، وتنفتحان تلقائياً إن كانت الصفحة الحالية فيهما
  const det=(id,title,keys,inner)=>{if(!inner)return "";const on=navOpen[id]!==undefined?navOpen[id]:keys.includes(view);return `<details class="ngrp" ${on?"open":""} ontoggle="APP.nt('${id}',this.open)"><summary class="grp" style="cursor:pointer;list-style:none">${title} ▾</summary>${inner}</details>`};
  h+=det("more",t("gMore"),["numbers","ask","about","privacy"],a("numbers","🔢",t("numT"))+a("ask","🤖",t("askT"))+a("about","ℹ️",t("about"))+a("privacy","🔒",t("prvNav")));
  h+=det("adm",t("gAdmin"),["report","quick","import","dash","cards","monthly","reports","gaps","mrep","users","logs","settings"],a("report","📄",t("report"))+(canWrite()&&me.role!=="guest"?a("quick","⚡",t("qkT"))+a("import","📥",t("import")):"")+(isAdmin()||isRegAdmin()?a("dash","📈",t("dash"))+a("cards","🪪",t("cardsT"),cards.length?`<span class="cnt">${fmt(cards.length)}</span>`:""):"")+(canReport()?a("monthly","🗓️",t("mrT")):"")+((isAdmin()||isRegAdmin())?a("reports","🚩",t("repsT"),reportsNew()?`<span class="cnt">${fmt(reportsNew())}</span>`:"")+a("gaps","📋",t("gapsT"))+a("mrep","🗓️",t("mrepT")):"")+(isAdmin()?a("users","👥",t("users"),pu?'<span class="dot"></span>':"")+a("logs","📜",t("logs"))+a("settings","⚙️",t("settings")):""));
  $("#nav").innerHTML=h;
  const rl=me.role==="guest"?t("rGuest"):me.owner?"👑 "+t("ownerL"):isAdmin()?t("rAdmin"):isRegAdmin()?"🛡️ "+L(ROLES.regadmin)+" · "+tv(me.region||""):canWrite()?t("rContrib"):t("rViewer");
  $("#who").innerHTML=`<b>${esc(me.name||"")}</b>${rl}`;
  $("#logout").textContent=me.role==="guest"?t("loginToContrib"):t("logout");
  $("#logout").hidden=DEMO;
  $("#install").textContent=t("install");if($("#updb"))$("#updb").textContent=t("updBtn");
  $("#langbtn2").textContent=matchMedia("(max-width:600px)").matches?(LANG==="fr"?"ع":"FR"):"🌐 "+t("lang");
  $("#role").textContent=rl;
  if(isAdmCom()&&!isAdmin())$("#who").insertAdjacentHTML("beforeend",`<small style="display:block">${t("admComL")}</small>${me.adminReq?`<small class="reqst">⏳ ${t("reqWait")} · <a href="javascript:void 0" onclick="APP.askAdmin(false)">${t("reqCancelB")}</a></small>`:`<button class="hb" style="margin-top:6px" onclick="APP.askAdmin(true)">🙋 ${t("reqAsk")}</button>`}`);
  const ttl=view.startsWith("print/")&&CATS[view.slice(6)]?"🖨️ "+cl(view.slice(6)):CATS[view]?CATS[view].ic+" "+cl(view):view.startsWith("region/")?"🗺️ "+tv(REGIONS[+view.split("/")[1]]||"")+(view.split("/")[2]?" › "+tv(decodeURIComponent(view.split("/").slice(2).join("/")).replace(/^_$/,t("unspecified"))):""):TITLES[view]?t(TITLES[view]):t("appName");
  $("#ptitle").textContent=view==="home"?t("appName"):ttl;
  $("#fab").style.display=(CATS[view]&&canWriteC(view))?"":"none";
  renderBnav();
}
function banner(){
  if(DEMO)return `<div class="banner">${t("demoBanner")}</div>`;
  if(me.role==="guest")return `<div class="banner">${t("guestBanner")} <button class="lnkb" onclick="document.getElementById('logout').click()">${t("loginToContrib")}</button></div>`;
  if(!canWrite())return `<div class="banner">${t("viewerBanner")}</div>`;
  return "";
}

/* ================= مكوّنات ================= */
function bars(rows,max){
  return rows.map(r=>{const tt=r.m+(r.f||0);const w=max?tt/max*100:0;const wm=tt?w*r.m/tt:0,wf=tt?w*(r.f||0)/tt:0;
    return `<div class="bar"><span class="lb">${esc(tv(r.l))}</span><span class="tr"><span class="fl" style="width:${wm}%"></span><span class="fl f" style="width:${wf}%"></span></span><span class="v">${fmt(tt)}</span></div>`}).join("");
}
function countBy(rows,fn){const o={};rows.forEach(x=>{[].concat(fn(x)||[]).forEach(k=>{if(k)o[k]=(o[k]||0)+1})});return Object.entries(o).sort((a,b)=>b[1]-a[1]).map(([l,m])=>({l,m}))}
function barSec(title,rows){return `<div class="sec"><h2>${title}</h2>${rows.length?bars(rows,Math.max(...rows.map(r=>r.m+(r.f||0)))):'<div class="empty">—</div>'}</div>`}
function subs(){
  const d=data,stud=k=>d[k].reduce((a,x)=>a+num(x.st_m)+num(x.st_f),0);
  return {
    mosques:t("jum",{n:fmt(d.mosques.filter(x=>x.kind==="جامع تقام فيه الجمعة").length)}),
    schools:t("studs",{n:fmt(stud("schools"))}),
    centers:t("cent",{n:fmt(stud("centers")),h:fmt(d.centers.reduce((a,x)=>a+num(x.huffaz),0))}),
    duat:t("duatS",{m:fmt(d.duat.filter(x=>x.gender==="داعية (رجل)").length),w:fmt(d.duat.filter(x=>x.gender==="داعية (امرأة)").length)}),
    assoc:t("assocS",{n:fmt(d.assoc.filter(x=>x.legal==="مرخصة (إيصال تسجيل)").length)}),
    media:t("mediaS",{n:fmt(d.media.filter(x=>x.kind==="إذاعة FM").length)}),
    offices:t("officesS",{n:fmt(d.offices.filter(x=>LV_REG.includes(x.level)).length),b:fmt(d.offices.filter(x=>LV_BKO.includes(x.level)).length)})};
}
function regionTable(){
  const reg=REGIONS.map(r=>({r,v:ORDER.map(c=>data[c].filter(x=>x.region===r).length)})).filter(x=>x.v.some(Boolean));
  const tot=ORDER.map(c=>data[c].length);
  if(!reg.length)return `<div class="empty">${t("noData")}</div>`;
  return `<div class="tw"><table><tr><th>${t("region")}</th>${ORDER.map(c=>`<th class="num">${cl(c)}</th>`).join("")}<th class="num">${t("total")}</th></tr>`+
    reg.map(x=>`<tr><td><a class="lnk" href="#region/${REGIONS.indexOf(x.r)}">${esc(tv(x.r))}</a></td>${x.v.map(v=>`<td class="num">${fmt(v)}</td>`).join("")}<td class="num"><b>${fmt(x.v.reduce((a,b)=>a+b,0))}</b></td></tr>`).join("")+
    `<tr class="tot"><td>${t("total")}</td>${tot.map(v=>`<td class="num">${fmt(v)}</td>`).join("")}<td class="num">${fmt(tot.reduce((a,b)=>a+b,0))}</td></tr></table></div>`;
}
function summary(c,x){
  const r=[],st=num(x.st_m)+num(x.st_f);
  if(c==="mosques"){x.kind&&r.push(tv(x.kind));x.imam&&r.push(t("imamT")+x.imam)}
  if(c==="schools"){x.stage&&r.push(tv(x.stage));st&&r.push(t("studT",{n:fmt(st)}))}
  if(c==="centers"){x.mode&&r.push(tv(x.mode));st&&r.push(t("studT",{n:fmt(st)}))}
  if(c==="duat"){x.gender&&r.push(tv(x.gender));x.qual&&r.push(tv(x.qual))}
  if(c==="assoc"){x.type&&r.push(tv(x.type));x.legal&&r.push(tv(x.legal))}
  if(c==="media"){x.kind&&r.push(tv(x.kind));x.freq&&r.push(x.freq)}
  if(c==="offices"){x.level&&r.push(tv(x.level));x.president&&r.push(t("presT")+x.president);x.struct&&(x.struct.comms||[]).length&&r.push("🗂️ "+fmt(x.struct.comms.length))}
  return r;
}
function card(c,x,showCat){
  const v=x.status==="verified";
  return `<div class="it ${v?"vok":"vpd"}" onclick="APP.detail('${c}','${esc(x.id)}')"><span class="st" title="${v?t("verified"):t("pending")}">${v?"✅":"🕓"}</span>${isFav(c,x.id)?'<span class="favm">⭐</span>':""}<h3>${esc(nameMain(x))}</h3>${nameSub(x)?`<div class="m" dir="auto">${esc(nameSub(x))}</div>`:""}${codeTag(x)}${locLine(x)?`<div class="m">📍 ${esc(locLine(x))}</div>`:""}${showCat?`<span class="tag cat">${CATS[c].ic} ${co(c)}</span>`:""}${summary(c,x).map((s,i)=>`<span class="tag ${i?"gd":""}">${esc(s)}</span>`).join("")}</div>`;
}

/* ================= الصفحات ================= */
function renderHome(){
  const S2=subs();
  const acts=`<div class="acts"><a class="gold" href="#stats">${t("explore")}</a>${canWrite()?`<button class="ghost" onclick="APP.pick()">${t("addInst")}</button>`:`<a class="ghost" href="#regions">🗺️ ${t("regions")}</a>`}</div>`;
  let h=heroHTML(acts);
  if(me.role==="guest")return h+guestSearch()+homeNews();
  const pend=allRows().filter(({x})=>x.status!=="verified").length, pu=users.filter(u=>u.role==="pending").length;
  if(isAdmin()&&pu)h+=`<div class="banner" style="margin-top:14px">${t("usersBanner",{n:fmt(pu)})} — <a class="lnk" href="#users">${t("open")}</a></div>`;
  if((isAdmin()||isRegAdmin())&&pend)h+=`<div class="banner pendb" style="margin-top:8px">${t("pendBanner2",{n:fmt(pend)})}<div class="pchips">${ORDER.map(c=>{const n=data[c].filter(x=>x.status!=="verified"&&canVerify(x)).length;return n?`<button class="chip" onclick="APP.goPending('${c}')">${CATS[c].ic} ${cl(c)} <span class="cnt">${fmt(n)}</span></button>`:""}).join("")}</div></div>`;
  if(isAdmin()&&!DEMO&&allRows().length&&Date.now()-(ls.get("csm-backup",0)||0)>7*864e5)h+=`<div class="banner" style="margin-top:8px">${t("backupOld")} <button class="lnkb" onclick="APP.backup()">${t("backupNow")}</button></div>`;
  h+=monthlyNotice();
  h+=homeNews();
  h+=`<div class="sech"><h3>${t("sections")}</h3><a href="#stats">${t("stats")} ${LANG==="fr"?"→":"←"}</a></div><div class="qgrid">`+
    ORDER.filter(c=>data[c].length).map(c=>`<div class="qt" onclick="location.hash='${c}'"><span class="ic">${CATS[c].ic}</span><span class="n">${fmt(data[c].length)}</span><span class="l">${cl(c)}</span><span class="s">${S2[c]}</span></div>`).join("")+`</div>`+(()=>{const z=ORDER.filter(c=>!data[c].length);return z.length?`<div class="zchips"><span class="count">${t("emptyCats")}</span> ${z.map(c=>canWriteC(c)?`<button class="chip" onclick="APP.form('${c}')">＋ ${CATS[c].ic} ${co(c)}</button>`:`<span class="chip">${CATS[c].ic} ${cl(c)}</span>`).join("")}</div>`:""})();
  const rec=allRows().sort((a,b)=>String(b.x.createdAt||"").localeCompare(String(a.x.createdAt||""))).slice(0,4);
  if(me.uid&&canWrite()){const mine=allRows().filter(({x})=>x.createdBy===me.uid).length;if(mine)h+=`<div class="banner" style="margin-top:14px;background:var(--g3);border-color:#cfe5d8;color:var(--g)">✍️ ${t("myEntries")}: <b>${fmt(mine)}</b></div>`}
  h+=`<div class="sech"><h3>${t("recent")}</h3></div>`+(rec.length?`<div class="list">${rec.map(({c,x})=>card(c,x,true)).join("")}</div>`:`<div class="sec empty">${t("noData")}${canWrite()?`<div style="margin-top:12px"><button class="bp" onclick="APP.pick()">${t("addInst")}</button></div>`:""}</div>`);
  return h;
}
// صفحة بحث مبسطة للزائر: خانة بحث، نوع المؤسسة، الإقليم، ثم زر واحد
function guestSearch(){
  const cats=ORDER.filter(c=>c!=="offices");
  return `<div class="sec" style="margin-top:14px"><h2>🔎 ${L(["ابحث في الدليل","Rechercher dans l'annuaire"])}</h2>
   <input id="gs_q" placeholder="${esc(L(["اسم المؤسسة أو المكان…","Nom ou lieu…"]))}" style="font-size:17px;padding:14px" onkeydown="if(event.key==='Enter')APP.gs()">
   <div class="fg" style="margin-top:8px"><div><label>${L(["النوع","Type"])}</label><select id="gs_c">${cats.map(c=>`<option value="${c}">${CATS[c].ic} ${cl(c)}</option>`).join("")}</select></div>
   <div><label>${t("region")}</label><select id="gs_r"><option value="">${t("allRegions")}</option>${REGIONS.map(r=>`<option value="${r}">${esc(tv(r))}</option>`).join("")}</select></div></div>
   <button class="bp" style="margin-top:12px;width:100%;padding:14px;font-size:17px" onclick="APP.gs()">🔎 ${L(["بحث","Rechercher"])}</button></div>`}
APP.gs=()=>{const c=$("#gs_c").value,q=$("#gs_q").value,r=$("#gs_r").value;
  const go=()=>{filt.q=q;filt.region=r;filt.status="";filt.commune="";filt.city="";render()};
  if(view===c)go();else{location.hash=c;setTimeout(go,80)}};
APP.pick=()=>{
  $("#dt").textContent=t("addInst").replace("+ ","");
  $("#dbody").innerHTML=`<div class="db"><div class="qgrid" style="margin:0">${ORDER.map(c=>`<div class="qt" onclick="APP.form('${c}')"><span class="ic">${CATS[c].ic}</span><span class="l">${co(c)}</span></div>`).join("")}</div></div>`;
  if(!dlg.open)dlg.showModal();
};
function cntIn(pred){return allRows().filter(({x})=>pred(x)).length}
function miniIcons(pred){return ORDER.map(c=>{const k=data[c].filter(pred).length;return k?`<span>${CATS[c].ic} ${fmt(k)}</span>`:""}).join("")}
function regionCard({r,i,n},big){
  return `<div class="rg ${n?"":"zero"} ${big?"big":""}" onclick="location.hash='region/${i}'"><h4>${big?"🏙️ ":""}${esc(tv(r))}</h4><div class="t">${fmt(n)}</div><div class="count">${t("instIn")}</div><div class="mini">${miniIcons(x=>x.region===r)}</div></div>`;
}
// الأقاليم: باماكو أولاً، ثم الأقاليم التي فيها بيانات، ثم البقية مختصرة
function renderRegions(){
  const rs=REGIONS.map((r,i)=>({r,i,n:cntIn(x=>x.region===r)}));
  const bk=rs.find(z=>z.r===BAMAKO),others=rs.filter(z=>z.r!==BAMAKO);
  const withData=others.filter(z=>z.n).sort((a,b)=>b.n-a.n),empty=others.filter(z=>!z.n);
  return `<p class="count" style="margin-top:0">${t("regionsIntro")}</p>
   <div class="rgrid">${regionCard(bk,true)}${withData.map(z=>regionCard(z)).join("")}</div>
   ${empty.length?`<div class="sech"><h3 style="font-size:14.5px;color:var(--mut)">${t("noDataYet")}</h3></div><div class="chips">${empty.map(z=>`<button class="chip" onclick="location.hash='region/${z.i}'">${esc(tv(z.r))}</button>`).join("")}</div>`:""}`;
}
// الإقليم ← المديريات (باماكو) أو الدوائر ← المؤسسات
function renderRegion(i,sub){
  const r=REGIONS[i];if(!r)return renderRegions();
  const inR=x=>x.region===r;
  const unitName=r===BAMAKO?t("directorates"):t("cercles");
  if(sub!==undefined&&sub!==""){
    const inS=x=>inR(x)&&(sub==="_"?!x.commune:x.commune===sub);
    let h=`<div class="tools"><a class="back" href="#region/${i}">${t("back")}</a><span class="count">${esc(tv(r))} › ${esc(sub==="_"?t("unspecified"):tv(sub))} · ${fmt(cntIn(inS))} ${t("instIn")}</span></div>`;
    let any=false;
    ORDER.forEach(c=>{const rows=data[c].filter(inS).sort((a,b)=>String(a.quarter||"").localeCompare(String(b.quarter||""))||String(a.name).localeCompare(String(b.name)));if(!rows.length)return;any=true;
      h+=`<div class="sech"><h3>${CATS[c].ic} ${cl(c)} (${fmt(rows.length)})</h3></div><div class="list">${rows.map(x=>card(c,x)).join("")}</div>`});
    return h+(any?"":`<div class="sec empty">${t("emptyRegion")}</div>`);
  }
  const units=r===BAMAKO?DIRECTORATES.slice():[...new Set([...officialCommunes(r),...allRows().map(({x})=>inR(x)?x.commune:"").filter(Boolean)])];
  const noUnit=cntIn(x=>inR(x)&&!x.commune);
  const uc=u=>{const n=cntIn(x=>inR(x)&&x.commune===u);return `<div class="rg ${n?"":"zero"}" onclick="location.hash='region/${i}/${encodeURIComponent(u)}'"><h4>${esc(tv(u))}</h4><div class="t">${fmt(n)}</div><div class="mini">${miniIcons(x=>inR(x)&&x.commune===u)}</div></div>`};
  let h=`<div class="tools"><a class="back" href="#regions">${t("back")}</a><span class="count">${fmt(cntIn(inR))} ${t("instIn")}</span>${canWrite()?`<button class="bp" onclick="APP.pickIn('${r}')">${t("addInst")}</button>`:""}</div>`;
  h+=`<div class="sech"><h3>${unitName}</h3></div>`;
  h+=units.length?`<div class="rgrid sm">${units.map(uc).join("")}${noUnit?`<div class="rg" onclick="location.hash='region/${i}/_'"><h4>${t("unspecified")}</h4><div class="t">${fmt(noUnit)}</div></div>`:""}</div>`
    :`<div class="sec empty">${t("noCercles")}${isAdmin()?` <a class="lnk" href="#settings">${t("settings")}</a>`:""}</div>`;
  if(!units.length||r!==BAMAKO){const rows=allRows().filter(({x})=>inR(x));if(rows.length&&!units.length)h+=`<div class="list" style="margin-top:12px">${rows.map(({c,x})=>card(c,x,true)).join("")}</div>`}
  return h;
}
APP.pickIn=r=>{ls.set("csm-lastloc",{region:r});APP.pick()};
function renderFavs(){
  const rows=allRows().filter(({c,x})=>isFav(c,x.id));
  return rows.length?`<div class="list">${rows.map(({c,x})=>card(c,x,true)).join("")}</div>`:`<div class="sec empty">⭐<br>${t("favsEmpty")}</div>`;
}
function renderStats(){
  const d=data;
  let h=`<div class="tools"><input id="gq" placeholder="${t("searchAll")}" value="${esc(filt.q)}"></div>`;
  const q=filt.q.trim().toLowerCase();
  if(q){const hits=allRows().filter(({x})=>(JSON.stringify(x)+" "+tv(x.region)).toLowerCase().includes(q)).slice(0,80);
    return h+`<div class="count">${fmt(hits.length)} ${t("results")}</div><div style="height:8px"></div>`+(hits.length?`<div class="list">${hits.map(({c,x})=>card(c,x,true)).join("")}</div>`:`<div class="empty">${t("noResults")}</div>`)}
  const S2=subs();
  h+=`<div class="kpis">`+ORDER.map(c=>`<div class="kpi" onclick="location.hash='${c}'"><div class="ic">${CATS[c].ic}</div><div class="n">${fmt(d[c].length)}</div><div class="l">${cl(c)}</div><div class="s">${S2[c]}</div></div>`).join("")+`</div>`;
  h+=`<div class="grid2"><div class="sec"><h2>${t("distrib")}</h2><div id="donut"></div></div><div class="sec"><h2>${t("growth")}</h2><div id="growth"></div></div></div>`;
  h+=`<div class="sec"><h2>${t("byRegion")}</h2>${regionTable()}</div>`;
  const sr=["schools","centers"].map(c=>({l:cl(c),m:d[c].reduce((a,x)=>a+num(x.st_m),0),f:d[c].reduce((a,x)=>a+num(x.st_f),0)}));
  h+=`<div class="grid2">
   <div class="sec"><h2>${t("studentsGender")}</h2><div class="legend"><span><i style="background:var(--g2)"></i>${t("male")}</span><span><i style="background:var(--gold)"></i>${t("female")}</span></div>${bars(sr,Math.max(1,...sr.map(r=>r.m+r.f)))}</div>
   ${barSec(t("waqfStatus"),countBy(d.mosques,x=>x.waqf||"غير محدد"))}
   ${barSec(t("duatFields"),countBy(d.duat,x=>x.spec))}
   ${barSec(t("langsChart"),countBy([...d.duat,...d.media],x=>x.langs))}
   ${barSec(t("assocFields"),countBy(d.assoc,x=>x.fields))}
   ${barSec(t("verifStatus"),countBy(allRows().map(r=>r.x),x=>x.status==="verified"?"موثّق":"قيد المراجعة"))}
  </div>
  <div class="sec noprint"><h2>${t("export")}</h2><p class="count">${t("exportHint")}</p><div class="tools">${ORDER.map(c=>`<button class="bs" onclick="APP.csv('${c}')">⬇️ ${cl(c)}</button>`).join("")}<button class="bp" onclick="APP.csv('all')">${t("allInOne")}</button></div></div>`;
  return h;
}
function renderReport(){
  const d=data,S2=subs(),all=allRows().length,ver=allRows().filter(({x})=>x.status==="verified").length;
  const sum=(cs,k)=>cs.reduce((a,c)=>a+d[c].reduce((b,x)=>b+num(x[k]),0),0);
  return `<div class="tools noprint"><button class="bp" onclick="print()">${t("print")}</button></div>
  <div class="rep"><div class="rh"><img src="logo.png" alt=""><h2>${t("repTitle")}</h2><p>${t("org")} — ${t("repDate")} ${dfmt(new Date().toISOString())}</p></div>
   <h3>${t("rep1")}</h3><table><tr><th>${t("category")}</th><th class="num">${t("count")}</th><th>${t("details")}</th></tr>
   ${ORDER.map(c=>`<tr><td>${CATS[c].ic} ${cl(c)}</td><td class="num">${fmt(d[c].length)}</td><td>${S2[c]}</td></tr>`).join("")}
   <tr class="tot"><td>${t("records")}</td><td class="num">${fmt(all)}</td><td>${t("ofWhich",{n:fmt(ver)})}</td></tr></table>
   <h3>${t("rep2")}</h3>${regionTable()}
   <h3>${t("rep3")}</h3><table><tr><th>${t("item")}</th><th class="num">${t("count")}</th></tr>
   <tr><td>${t("studTot")}</td><td class="num">${fmt(sum(["schools","centers"],"st_m")+sum(["schools","centers"],"st_f"))}</td></tr>
   <tr><td>${t("ofGirls")}</td><td class="num">${fmt(sum(["schools","centers"],"st_f"))}</td></tr>
   <tr><td>${t("teachersT")}</td><td class="num">${fmt(sum(["schools","centers"],"teachers"))}</td></tr>
   <tr><td>${t("huffazT")}</td><td class="num">${fmt(sum(["centers"],"huffaz"))}</td></tr>
   <tr><td>${t("recog")}</td><td class="num">${fmt(d.schools.filter(x=>x.recognized==="معترف بها من الوزارة").length)}</td></tr></table>
   <h3>${t("rep4")}</h3><table><tr><th>${t("waqfCol")}</th><th class="num">${t("mosqN")}</th></tr>${countBy(d.mosques,x=>x.waqf||"غير محدد").map(r=>`<tr><td>${esc(tv(r.l))}</td><td class="num">${fmt(r.m)}</td></tr>`).join("")||'<tr><td colspan="2">—</td></tr>'}</table>
   ${repExtra()}<div class="sig"><div>${t("prepared")}</div><div>${t("approved")}</div></div></div>`;
}
function renderUsers(){
  if(!isAdmin())return `<div class="empty">${t("adminOnly")}</div>`;
  const order={pending:0,contributor:1,viewer:2,admin:3};
  const rows=[...users].sort((a,b)=>(order[a.role]??9)-(order[b.role]??9)||String(a.name).localeCompare(String(b.name)));
  const reqs=users.filter(u=>u.adminReq&&u.adminCommittee&&u.role!=="admin");
  return `<div class="banner">${t("usersIntro")}</div>
  <div class="sec"><h2>🛡️ ${t("depT")} <span class="count">(${fmt(depCount())}/${MAX_DEP})</span></h2><div class="hint">${t("depHint",{n:MAX_DEP})}</div>
   ${users.filter(u=>u.role==="admin"&&!isOwnerU(u)).map(u=>`<span class="tag">${u.adminVia==="committee"?"🤝":"🛡️"} ${esc(u.name||u.email)}</span>`).join(" ")||`<div class="count">—</div>`}
   ${reqs.length?`<h3 style="margin-top:12px">🙋 ${t("reqT")} (${fmt(reqs.length)})</h3>${reqs.map(u=>`<div class="reqrow"><b>${esc(u.name||"")}</b> <span class="count" dir="ltr">${esc(u.email||"")}</span> <span class="count">· ${dfmt(u.adminReq)}</span>
     ${me.owner?`<button class="bp sm" onclick="APP.reqOk('${esc(u.uid)}')">${t("reqOk")}</button><button class="bs sm" onclick="APP.reqNo('${esc(u.uid)}')">${t("reqNo")}</button>`:`<span class="count">🔒 ${t("ownerOnly")}</span>`}</div>`).join("")}`:""}</div>
  <div class="sec"><h2>${t("users")} (${fmt(users.length)})</h2>${rows.length?`<div class="tw"><table><tr><th>${t("name")}</th><th>${t("email")}</th><th>${t("state")}</th><th>${t("role")}</th></tr>
  ${rows.map(u=>`<tr><td>${esc(u.name)}</td><td dir="ltr">${esc(u.email)}</td><td><span class="ubadge ${esc(u.role)}">${L(ROLES[u.role])||esc(u.role)}</span></td>
  <td>${u.uid===me.uid?`<span class="count">${me.owner?"👑 "+t("ownerL")+" · ":""}${t("you")}</span>`:(u.role==="admin"&&!me.owner)?`<span class="count">🔒 ${t("ownerOnly")}</span>`:`<select onchange="APP.role('${esc(u.uid)}',this.value)">${Object.entries(ROLES).filter(([k])=>me.owner||k!=="admin").map(([k,l])=>`<option value="${k}" ${u.role===k?"selected":""}>${L(l)}</option>`).join("")}</select>${u.role!=="pending"&&u.role!=="admin"?`<label class="chkc"><input type="checkbox" ${u.adminCommittee?"checked":""} onchange="APP.ucom('${esc(u.uid)}',this.checked)"> ${t("admCom")}</label>`:""}${u.role==="regadmin"||u.role==="contributor"?`<select style="margin-top:4px" title="${esc(t("uRegionT"))}" onchange="APP.uregion('${esc(u.uid)}',this.value)"><option value="">${t("chooseRegion")}</option>${REGIONS.map(r=>`<option value="${r}" ${u.region===r?"selected":""}>${esc(tv(r))}</option>`).join("")}</select>`:""}`}</td></tr>`).join("")}</table></div>`:`<div class="empty">${t("noUsers")}</div>`}</div>`;
}
const MAX_DEP=6,OWNER="sidibey487@gmail.com";
// النواب المعيَّنون مباشرة (حدّهم 6)، أما أعضاء اللجنة الإدارية المأذون لهم فلا يُحسبون
const isOwnerU=u=>u.email===OWNER||(me&&me.owner&&u.uid===me.uid);
const depCount=()=>users.filter(u=>u.role==="admin"&&!isOwnerU(u)&&u.adminVia!=="committee").length;
APP.reqOk=async uid=>{if(!me.owner)return;const u=users.find(z=>z.uid===uid);if(!confirm(t("reqOkQ",{n:(u&&u.name)||""})))return;
  await store.setUser(uid,{role:"admin",adminVia:"committee",adminReq:""});logAct("edit","users",uid,(u&&u.name)||"",null);toast(t("reqOkT"))};
APP.reqNo=async uid=>{if(!me.owner)return;await store.setUser(uid,{adminReq:""});toast(t("reqNoT"))};
APP.askAdmin=async on=>{await store.setUser(me.uid,{adminReq:on?new Date().toISOString():""});me.adminReq=on?"x":"";toast(on?t("reqSent"):t("reqCancel"));render()};
APP.ucom=async(uid,v)=>{await store.setUser(uid,{adminCommittee:!!v});toast(v?t("admComOn"):t("admComOff"))};
APP.role=async(uid,role)=>{if(role==="admin"&&!me.owner){toast(t("ownerOnly"));return}
  if(role==="admin"&&depCount()>=MAX_DEP){toast(t("depFull",{n:MAX_DEP}));render();return}
  const u=users.find(z=>z.uid===uid);if(u&&u.role==="admin"&&!me.owner){toast(t("ownerOnly"));return}
  if(role==="admin"&&!confirm(t("mkAdminQ",{n:(u&&u.name)||""}))){render();return}
  await store.setRole(uid,role);if(role==="admin")await store.setUser(uid,{adminVia:"appoint",adminReq:""});else if(u&&u.adminVia)await store.setUser(uid,{adminVia:""});toast(t("roleUpd"))};
function renderList(c){
  const q=filt.q.trim().toLowerCase();
  const lvi=x=>{const i=OFFICE_LEVELS.indexOf(x.level);return i<0?99:i};
  const rows=data[c].filter(x=>(c!=="offices"||!filt.level||x.level===filt.level)&&(!filt.region||x.region===filt.region)&&(!filt.commune||x.commune===filt.commune)&&(!filt.city||(x.city||x.quarter)===filt.city)&&(!filt.status||(filt.status==="mine"?x.createdBy===me.uid:(filt.status==="verified")===(x.status==="verified")))&&(!q||(JSON.stringify(x)+" "+tv(x.region)).toLowerCase().includes(q)))
    .sort((a,b)=>(c==="offices"?lvi(a)-lvi(b):0)||String(a.name).localeCompare(String(b.name),LANG));
  let h=`<div class="tools"><div class="sbox"><input id="q" placeholder="${t("searchList")}" value="${esc(filt.q)}">${filt.q?`<button class="clr" onclick="APP.clr()" title="${t("clear")}">×</button>`:""}</div>
   ${(()=>{const n=[filt.region,filt.commune,filt.city,filt.status,c==="offices"&&filt.level].filter(Boolean).length;return `<button class="bs ftog" onclick="APP.ftog()">⚙️ ${t("filtB")}${n?` <span class="cnt">${n}</span>`:""}</button>`})()}<div class="fwrap ${filtOpen?"open":""}">${c==="offices"?`<select id="lvf" onchange="APP.lvf(this.value)"><option value="">${t("allLevels")}</option>${OFFICE_LEVELS.map(o=>`<option value="${esc(o)}" ${filt.level===o?"selected":""}>${esc(tv(o))}</option>`).join("")}</select>`:""}
   <select id="rg"><option value="">${t("allRegions")}</option>${REGIONS.map(r=>`<option value="${r}" ${filt.region===r?"selected":""}>${esc(tv(r))}</option>`).join("")}</select>
   ${filt.region?locFilters(c):""}
   <select id="sf"><option value="">${t("allStatus")}</option><option value="verified" ${filt.status==="verified"?"selected":""}>✅ ${t("verified")}</option><option value="pending" ${filt.status==="pending"?"selected":""}>🕓 ${t("pending")}</option>${canWrite()?`<option value="mine" ${filt.status==="mine"?"selected":""}>✍️ ${t("myEntries")}</option>`:""}</select>
   ${canWriteC(c)?`<button class="bp" onclick="APP.form('${c}')">${t("add")} ${co(c)}</button>`:""}
   <button class="bs" onclick="location.hash='print/${c}'">🖨️ ${t("prList")}</button>${isAdmin()||isRegAdmin()?`<button class="bs" onclick="location.hash='qrs/${c}'">${t("qrB")}</button>`:""}<button class="bs" onclick="APP.csv('${c}')">⬇️ CSV</button>${c==="offices"?`<button class="bs" onclick="APP.structCsv()">${t("stCsv")}</button>`:""}</div>${c==="offices"?`<span class="vtog"><button class="bs ${offView!=="tree"?"on":""}" onclick="APP.offView('list')">${t("listV")}</button><button class="bs ${offView==="tree"?"on":""}" onclick="APP.offView('tree')">${t("treeV")}</button></span>`:""}</div>
   <div class="count">${fmt(rows.length)} ${t("of")} ${fmt(data[c].length)}${(()=>{const pv=rows.filter(x=>x.status!=="verified"&&canVerify(x)).length;return pv&&filt.status==="pending"?` <button class="bg sm" onclick="APP.bulkVerify('${c}')">${t("bvBtn",{n:fmt(pv)})}</button>`:""})()}</div><div style="height:8px"></div>`;
  window._lastRows=rows;
  if(!rows.length)h+=`<div class="sec empty">${data[c].length?t("noMatch"):`<div style="font-size:40px">${CATS[c].ic}</div>${t("noneYet")}${canWriteC(c)?`<div style="margin-top:12px"><button class="bp" onclick="APP.form('${c}')">${t("addFirst")}</button></div>`:""}`}</div>`;
  else if(c==="offices"&&offView==="tree")h+=offTree(rows);
  else{
    // عرض تدريجي: ٦٠ سجلاً أولاً ثم «عرض المزيد»، حتى تبقى الصفحة سريعة مع كثرة السجلات
    if(listV!==view){listV=view;listN=60}
    h+=`<div class="list">${rows.slice(0,listN).map(x=>card(c,x)).join("")}</div>`;
    if(rows.length>listN)h+=`<div style="text-align:center;margin:14px 0"><button class="bs" onclick="APP.more()">${L(["عرض المزيد","Afficher plus"])} (${fmt(rows.length-listN)})</button></div>`;
  }
  if(c==="offices"&&offAll()&&data.offices.length)h+=offCoverage();
  return h;
}
let listV="",listN=60;APP.more=()=>{listN+=60;render()};
APP.clr=()=>{filt.q="";render()};APP.lvf=v=>{filt.level=v;render()};let filtOpen=false;APP.ftog=()=>{filtOpen=!filtOpen;render()};
// توثيق جماعي لكل السجلات المعروضة قيد المراجعة
APP.bulkVerify=async c=>{const ids=(window._lastRows||[]).filter(x=>x.status!=="verified"&&canVerify(x));if(!ids.length)return;
  if(!confirm(t("bvQ",{n:fmt(ids.length)})))return;const now=new Date().toISOString();let n=0;
  for(const x of ids){const {id,...o}=x;Object.assign(o,{status:"verified",verifiedBy:me.uid,verifiedByName:me.name,verifiedAt:now});await store.save(c,id,o);n++}
  logAct("verify",c,"",n+" × "+cl(c),null);toast(t("bvDone",{n:fmt(n)}))};
APP.goPending=c=>{const go=()=>{filt.status="pending";filt.region="";filt.commune="";filt.city="";render()};if(view===c)go();else{location.hash=c;setTimeout(go,80)}};
function render(){
  syncBadge();document.body.classList.toggle("pc",view.startsWith("cardv/")||view.startsWith("cardsp/"));document.body.classList.toggle("pl",view.startsWith("print/")||view==="gaps"||view==="mrep"||view==="numbers"||view.startsWith("qrs/"));
  if(view.startsWith("verify/")&&store){renderVerify(view.slice(7));return}
  if(!me)return;
  if(!canRead()){renderWaiting();return}
  syncOrder();
  if(view==="offices"&&!canOffices())view="home";
  document.body.classList.remove("noside");
  if(!_splashed){_splashed=true;splash(me.role==="guest"?null:me.name)}
  renderSide();
  const main=$("#main");
  if(view==="quick"&&$("#qk_n"))return; // لا نمسح ما يكتبه المندوب عند وصول تحديثات البيانات
  if(view==="settings")setTimeout(()=>typeof sigPrev==="function"&&sigPrev(),0);
  if(view.startsWith("print/")){main.innerHTML=renderPrintList(view.slice(6));return}
  if(view.startsWith("qrs/")){main.innerHTML=renderQrSheet(view.slice(4));afterQrSheet();return}
  if(view.startsWith("cardsp/")){const k=view.slice(7);main.innerHTML=renderCardsPrint(k);afterCardsPrint(k);return}
  if(view.startsWith("cardv/")){const id=view.slice(6);main.innerHTML=renderCardView(id);afterCardView(id);return}
  if(view.startsWith("card/")){const[,c,id]=view.split("/");main.innerHTML=renderCard(c,id);afterCard(c,id);return}
  const R={quick:renderQuick,numbers:renderNumbers,mrep:renderMonthRep,gaps:renderGaps,reports:renderReports,ask:renderAsk,privacy:renderPrivacy,monthly:renderMonthly,cards:renderCards,news:()=>renderNews(),home:renderHome,stats:renderStats,regions:renderRegions,favs:renderFavs,report:renderReport,users:renderUsers,map:renderMap,about:renderAbout,dash:renderDash,logs:renderLogs,import:renderImport,settings:renderSettings};
  const body=view.startsWith("news/")?renderNews(view.slice(5)):view.startsWith("region/")?renderRegion(+view.split("/")[1],view.split("/").slice(2).join("/")||undefined):R[view]?R[view]():CATS[view]?renderList(view):renderHome();
  main.innerHTML=banner()+body;
  if(view==="map")afterMap();
  if(view==="stats")afterStats();
  if(view.startsWith("i/")&&!dlg.open){const[,c,id]=view.split("/");if(data[c]&&data[c].find(r=>r.id===id))APP.detail(c,id)}
  for(const id of ["q","gq"]){const q=$("#"+id);if(q)q.oninput=e=>{filt.q=e.target.value;const p=e.target.selectionStart;render();const n=$("#"+id);n.focus();n.setSelectionRange(p,p)}}
  const rg=$("#rg");if(rg)rg.onchange=e=>{filt.region=e.target.value;filt.commune="";filt.city="";render()};
  const sf=$("#sf");if(sf)sf.onchange=e=>{filt.status=e.target.value;render()};
}

/* ================= النوافذ ================= */
const dlg=$("#dlg");$("#dx").onclick=()=>dlg.close();
function communesFor(region){const s=new Set(officialCommunes(region));allRows().forEach(({x})=>{if(x.commune&&(!region||x.region===region))s.add(x.commune)});return [...s].sort((a,b)=>a.localeCompare(b))}
function inputFor(f,v,ctx){
  const id="f_"+f.k,req=f.req?"required":"";
  if(f.t==="sel")return `<select id="${id}" ${req}><option value="">${t("choose")}</option>${f.o.map(o=>`<option value="${esc(o)}" ${v===o?"selected":""}>${esc(tv(o))}</option>`).join("")}</select>`;
  if(f.t==="chk")return `<div class="chk" id="${id}">${f.o.map(o=>`<label><input type="checkbox" value="${esc(o)}" ${(v||[]).includes(o)?"checked":""}>${esc(tv(o))}</label>`).join("")}</div>`;
  if(f.t==="area")return `<textarea id="${id}" rows="3">${esc(v)}</textarea>`;
  if(f.t==="time")return `<input id="${id}" type="time" value="${esc(v)}" dir="ltr">`;
  if(f.t==="link"){const names=[...new Set([...data.mosques,...data.assoc].map(x=>x.name))].sort();return `<input id="${id}" list="dl_${f.k}" value="${esc(v)}" autocomplete="off"><datalist id="dl_${f.k}">${names.map(o=>`<option value="${esc(o)}">`).join("")}</datalist>`}
  if(f.t==="dl")return communeInput(ctx.region,v);
  if(f.k==="quarter")return quarterInput(ctx.region,v);
  if(f.t==="gps")return `<div class="row"><input id="${id}" dir="ltr" placeholder="12.6392, -8.0029" value="${esc(v)}"><button type="button" class="bg" onclick="APP.locate()">${t("gpsBtn")}</button></div><div class="hint" id="gpsh">${t("gpsHint")}</div>`;
  if(f.t==="tel"){const hidden=ctx.editing&&!isAdmin();return `<input id="${id}" type="tel" dir="ltr" value="${esc(v)}" placeholder="${hidden?t("phoneHidden"):""}"><div class="hint">${t("phoneHint")}</div>`}
  const mic=!f.t&&SR?`<button type="button" class="micb" title="${t("voice")}" onclick="APP.voice('${id}',this)">🎤</button>`:"";
  const ph=f.ph?`placeholder="${esc(L(f.ph))}"`:"";
  return mic?`<div class="row"><input id="${id}" value="${esc(v)}" ${ph} ${req}>${mic}</div>`:`<input id="${id}" ${f.t==="num"?'type="number" min="0" inputmode="numeric"':""} value="${esc(v)}" ${ph} ${req}>`;
}
APP.locate=()=>{
  const h=$("#gpsh");if(!navigator.geolocation){h.textContent=t("gpsNo");return}
  h.textContent=t("gpsWait");
  navigator.geolocation.getCurrentPosition(p=>{$("#f_gps").value=p.coords.latitude.toFixed(5)+", "+p.coords.longitude.toFixed(5);h.textContent=t("gpsOk",{n:fmt(Math.round(p.coords.accuracy))})},
    ()=>{h.textContent=t("gpsErr")},{enableHighAccuracy:true,timeout:20000});
};
function parseGps(s){const m=String(s||"").match(/(-?\d+(?:\.\d+)?)\s*[,،\s]\s*(-?\d+(?:\.\d+)?)/);if(!m)return null;const a=+m[1],b=+m[2];return Math.abs(a)<=90&&Math.abs(b)<=180?[a,b]:null}

APP.form=(c,id)=>{if(c==="offices"&&!(id?canEditOffice(data.offices.find(r=>r.id===id)):canAddOffice())){toast(t("offRO"));return}
  const x=id?data[c].find(r=>r.id===id)||{}:{};
  const last=!id&&c!=="offices"?ls.get("csm-lastloc",null):null;
  const vals={...(last||{}),...x};if(isAdmin()&&id)vals.phone=phones[pkey(c,id)]||"";
  const ctx={editing:!!id,region:vals.region};
  const fs=fieldsOf(c);
  const sect=k=>k==="region"&&c!=="duat"?`<h4>📍 ${t("secLoc")}</h4>`:k===CATS[c].fields[1].k?`<h4>📝 ${t("secData")}</h4>`:k==="phone"?`<h4>☎️ ${t("secContact")}</h4>`:"";
  const ESS=["name","name_fr","region","commune","city","quarter","landmark","gps",CATS[c].fields[1].k,...[]];
  const isEss=f=>f.req||ESS.includes(f.k);
  const fld=f=>(isEss(f)?sect(f.k):(f.k==="phone"?sect(f.k):""))+`<div class="${f.full||f.t==="gps"?"full":""}" id="w_${f.k}"><label id="l_${f.k}">${L(flab(f,vals))}${f.req?" <b>*</b>":""}</label>${inputFor(f,vals[f.k],ctx)}</div>`;
  $("#dt").textContent=CATS[c].ic+" "+(id?t("editT"):t("addT"))+co(c);
  $("#dbody").innerHTML=`<form id="frm" novalidate><div class="db">${last&&last.region?`<div class="hint" style="margin-bottom:8px">↺ ${t("lastUsed")}</div>`:""}<div class="fg">${fs.filter(isEss).map(fld).join("")}</div><details class="more" ${id?"open":""}><summary>➕ ${t("more")}</summary><div class="fg">${fs.filter(f=>!isEss(f)).map(fld).join("")}</div></details>
   ${c==="offices"?structEditor(x.struct):""}
   ${c==="duat"||c==="offices"?"":`<div class="fg"><h4>📷 ${t("photo")}</h4><div class="full"><input type="file" id="f_photo" accept="image/*" capture="environment"><div class="hint">${t("photoHint")}</div><img id="ph_prev" class="phprev" hidden alt=""></div></div>`}
   ${id&&!canVerify(x)&&x.status==="verified"?`<div class="hint">${t("reVerify")}</div>`:""}<div class="err" id="ferr"></div></div>
   <div class="df"><button class="bp" type="submit" value="save">${t("save")}</button>${!id?`<button class="bs" type="submit" value="again">${t("saveNew")}</button>`:""}<button class="bs" type="button" onclick="document.getElementById('dlg').close()">${t("cancel")}</button></div></form>`;
  // تغيّر الإقليم: تتبدّل خانة المديرية/الدائرة، وتختفي «المدينة/القرية» في باماكو
  const updLoc=(r,chg)=>{const w=$("#w_commune");if(w){let cur=$("#f_commune").value;if(cur==="__o")cur="";if(chg&&cur&&!officialCommunes(r).includes(cur))cur="";w.innerHTML=`<label id="l_commune">${L(flab({k:"commune"},{region:r}))}</label>`+communeInput(r,r===BAMAKO&&!DIRECTORATES.includes(cur)?"":cur)}const wc=$("#w_city");if(wc)wc.style.display=r===BAMAKO?"none":"";updQuarter(r,chg)};
  if($("#f_region")){$("#f_region").onchange=e=>{["quarter","city","landmark"].forEach(k=>{const n=$("#f_"+k);if(n)n.value=""});updLoc(e.target.value,1)};updLoc(vals.region||"")}
  if(c==="offices"&&!isAdmin()&&$("#f_region")){const rg=$("#f_region");rg.value=me.region;rg.disabled=true;updLoc(me.region);
    const ok=me.region===BAMAKO?LV_BKO:LV_REG;[...$("#f_level").options].forEach(o=>{if(o.value&&!ok.includes(o.value))o.remove()})}
  if(c==="offices")structBind();
  if(c==="offices"&&$("#f_level")){const lv=$("#f_level");const hint=document.createElement("div");hint.className="hint";hint.id="lvh";lv.after(hint);
    const onLv=()=>{const v=lv.value;hint.textContent=v?(v===OFFICE_LEVELS[0]?t("lvTop")+" ":"")+t(LV_NAT.includes(v)?"lvNat":LV_BKO.includes(v)?"lvBko":"lvReg"):"";
      const rg=$("#f_region");if(LV_BKO.includes(v)&&rg&&rg.value!==BAMAKO){rg.value=BAMAKO;rg.onchange({target:rg})}
      if(LV_REG.includes(v)&&rg&&rg.value===BAMAKO){rg.value="";rg.onchange({target:rg})}};
    lv.addEventListener("change",onLv);onLv()}
  let photoData=null;
  if($("#f_photo"))$("#f_photo").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{photoData=await compressImage(f);const im=$("#ph_prev");im.src=photoData;im.hidden=false}catch(err){toast(t("photoErr"))}};
  if(id&&x.hasPhoto)store.getPhoto(pkey(c,id)).then(d=>{if(okImg(d)&&!photoData){const im=$("#ph_prev");if(im){im.src=okImg(d);im.hidden=false}}});
  $("#frm").onsubmit=async e=>{
    e.preventDefault();
    const again=e.submitter&&e.submitter.value==="again";
    const o={};let phone="";
    document.querySelectorAll(".fg .bad").forEach(n=>n.classList.remove("bad"));
    for(const f of fs){
      const el=$("#f_"+f.k);if(!el)continue;let v;
      if(f.t==="chk")v=[...el.querySelectorAll("input:checked")].map(i=>i.value);
      else if(f.t==="num")v=el.value===""?null:num(el.value);
      else v=el.value.trim();
      if(f.req&&!v){$("#ferr").textContent=t("fill")+L(f.l);$("#w_"+f.k).classList.add("bad");el.focus();return}
      if(f.t==="gps"&&v&&!parseGps(v)){$("#ferr").textContent=t("gpsBad");$("#w_gps").classList.add("bad");return}
      if(f.priv)phone=v;else o[f.k]=v;
    }
    delete o.arrond; // أُلغي «القسم الإداري» في الإصدار 32
    if(c==="offices"){const v=o.level,bad=(k,m)=>{$("#ferr").textContent=m;const w=$("#w_"+k);if(w)w.classList.add("bad");return true};
      if(!isAdmin()&&o.region!==me.region&&bad("region",t("offSave")))return;
      if(LV_BKO.includes(v)&&o.region!==BAMAKO&&bad("region",t("lvNeedBko")))return;
      if(LV_REG.includes(v)&&(!o.region||o.region===BAMAKO)&&bad("region",t("lvNeedReg")))return;
      if((LV_BKO.includes(v)||v==="مكتب دائرة"||v==="مكتب مدينة / قرية")&&!o.commune&&bad("commune",t("fill")+L(flab({k:"commune"},o))))return;
      if(v==="مكتب حي"&&!o.quarter&&bad("quarter",t("fill")+t("quarterL")))return;
      if(v==="مكتب مدينة / قرية"&&!o.city&&bad("city",t("fill")+t("cityL")))return}
    if(c==="offices"){o.struct=structCollect()||{};o.president=(o.struct.pres&&o.struct.pres.n)||"";o.people=structCount(o.struct)}
    if(o.region===BAMAKO)o.city="";
    const nn=s=>nz(String(s||"").replace(/\s+/g," ")),dup=data[c].find(r=>r.id!==id&&r.region===o.region&&nn(r.name)===nn(o.name)&&(!r.quarter&&!o.quarter||nn(r.quarter)===nn(o.quarter))&&(!r.city&&!o.city||nn(r.city)===nn(o.city)));
    if(dup&&!e.target.dataset.ok){$("#ferr").textContent=t("dup");e.target.dataset.ok=1;return}
    const now=new Date().toISOString();
    if(x.code)o.code=x.code;
    Object.assign(o,{createdAt:x.createdAt||now,updatedAt:now,createdBy:x.createdBy||me.uid,createdByName:x.createdByName||me.name,updatedBy:me.uid,updatedByName:me.name});
    if(id&&canVerify(x)){o.status=x.status||"pending";if(x.verifiedBy){o.verifiedBy=x.verifiedBy;o.verifiedByName=x.verifiedByName||"";o.verifiedAt=x.verifiedAt}}
    else o.status="pending";
    if(photoData||x.hasPhoto)o.hasPhoto=true;
    const nid=id||newId();
    try{
      await store.save(c,nid,o);if(phone||(isAdmin()&&id))await store.savePhone(c,nid,phone);
      if(photoData)await store.savePhoto(pkey(c,nid),photoData);
      logAct(id?"edit":"add",c,nid,o.name,id?x:null);
      ls.set("csm-lastloc",{region:o.region,commune:o.commune,quarter:o.quarter});
      toast(navigator.onLine?t("saved"):t("savedOffline"));
      if(!id)ls.set("csm-draft-"+c,null);if(again)APP.form(c);else dlg.close();
    }catch(err){$("#ferr").textContent=errMsg(err)}
  };
  if(!dlg.open)dlg.showModal();
  setTimeout(()=>{const n=$("#f_name");if(n&&!id)n.focus()},50);
  // اقتراح مؤسسات مشابهة أثناء كتابة الاسم لمنع التكرار قبل الحفظ
  {const n=$("#f_name"),w=$("#w_name");
    if(n&&w){const box=document.createElement("div");box.className="hint";box.id="dupsug";box.style.color="#b45309";w.appendChild(box);
      const nn=s=>nz(String(s||"").replace(/\s+/g," "));
      n.addEventListener("input",()=>{
        const q=nn(n.value),toks=q.split(" ").filter(z=>z.length>=3);
        if(q.length<4){box.innerHTML="";return}
        const hit=data[c].filter(r=>r.id!==id&&(()=>{const z=nn(r.name);return z===q||z.includes(q)||q.includes(z)||(toks.length>1&&toks.every(k=>z.includes(k)))})()).slice(0,3);
        box.innerHTML=hit.length?"⚠️ "+L(["مؤسسات مشابهة موجودة:","Fiches similaires déjà saisies :"])+"<br>"+hit.map(r=>"• "+esc(r.name)+" — "+esc(locLine(r))).join("<br>"):""});}}
};
function show(v){if(Array.isArray(v))return v.length?v.map(z=>esc(tv(z))).join("، "):"";return v===null||v===undefined?"":esc(typeof v==="number"?fmt(v):tv(v))}
APP.detail=(c,id)=>{
  const x=data[c].find(r=>r.id===id);if(!x)return;
  $("#dt").textContent=CATS[c].ic+" "+nameMain(x);
  const rows=fieldsOf(c).slice(1).filter(f=>!f.priv&&f.k!=="name_fr").map(f=>{
    if(f.t==="gps"){const g=parseGps(x.gps);return [L(f.l),g?`<a class="lnk" target="_blank" rel="noopener" href="https://www.google.com/maps?q=${g[0]},${g[1]}">${t("onMap")}</a> <span dir="ltr" class="count">${esc(x.gps)}</span>`:""]}
    if(f.k==="city"&&x.region===BAMAKO)return ["",""];
    return [L(flab(f,x)),show(x[f.k])]}).filter(r=>r[1]);
  {const s=nameSub(x);if(s)rows.unshift([LANG==="fr"?"الاسم بالعربية":"Nom en français",esc(s)]);}
  let qa="";
  if(isAdmin()){const p=phones[pkey(c,id)];if(p){const nums=phoneList(p);
    rows.push([L(TAIL[0].l)+" 🔒",nums.length?nums.map(z=>`<span class="phl">${z.label?`<small>${esc(z.label)}</small> `:""}<a class="lnk" dir="ltr" href="tel:${z.tel}">${esc(z.n)}</a> <a class="wa" target="_blank" rel="noopener" href="https://wa.me/${z.wa}" title="WhatsApp">💬</a></span>`).join(""):esc(p)]);
    if(nums[0])qa+=`<a class="qa" href="tel:${nums[0].tel}">📞 ${t("qCall")}</a><a class="qa" target="_blank" rel="noopener" href="https://wa.me/${nums[0].wa}">💬 WhatsApp</a>`}}
  {const g=parseGps(x.gps);if(g)qa+=`<a class="qa" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${g[0]},${g[1]}">🧭 ${t("qGo")}</a>`}
  if(["schools","centers"].includes(c)&&(x.st_m!=null||x.st_f!=null))rows.push([t("totalStud"),fmt(num(x.st_m)+num(x.st_f))]);
  const v=x.status==="verified",fv=isFav(c,id);
  const meta=[x.createdByName&&t("metaBy",{n:esc(x.createdByName),d:dfmt(x.createdAt)}),
    x.updatedAt&&x.updatedAt!==x.createdAt&&t("metaUpd",{n:esc(x.updatedByName||""),d:dfmt(x.updatedAt)}),
    v&&x.verifiedByName&&t("metaVer",{n:esc(x.verifiedByName),d:dfmt(x.verifiedAt)})].filter(Boolean).join(" · ");
  const linked=linkedTo(c,x);
  if(linked.length)rows.push([t("linked"),linked.map(([lc,lx])=>`<a class="lnk" href="#i/${lc}/${esc(lx.id)}">${CATS[lc].ic} ${esc(lx.name)}</a>`).join("<br>")]);
  $("#dbody").innerHTML=`<div class="db">${x.hasPhoto?'<div class="dphoto" id="dphoto"><span class="count">📷 …</span></div>':""}<div style="margin-bottom:10px;display:flex;gap:6px;flex-wrap:wrap"><span class="pill ${v?"ok":"pd"}">${v?"✅ "+t("verified"):"🕓 "+t("pending")}</span><span class="pill" style="background:#eef0ff;color:#3c4a8f">${CATS[c].ic} ${co(c)}</span>${x.code?`<span class="pill code" dir="ltr" title="${esc(t("codeL"))}" onclick="APP.copyCode('${esc(x.code)}')">🔢 ${esc(x.code)}</span>`:""}</div>${qa?`<div class="qabar">${qa}</div>`:""}<dl class="det">${rows.map(([l,val])=>`<dt>${l}</dt><dd>${val}</dd>`).join("")}</dl>${c==="offices"?structView(x.struct):""}${meta&&me.role!=="guest"?`<div class="meta">${meta}</div>`:""}</div>
   <div class="df"><button class="fav" onclick="APP.fav('${c}','${esc(id)}')">${fv?t("favRm"):t("favAdd")}</button><button class="bs" onclick="APP.share('${c}','${esc(id)}')">📤 ${t("share")}</button><button class="bs" onclick="APP.wa('${c}','${esc(id)}')">${t("wa")}</button><button class="bs" onclick="APP.repOpen('${c}','${esc(id)}')">${t("rep")}</button><a class="bs btnl" href="#card/${c}/${esc(id)}">🪪 ${t("card")}</a>${(c==="offices"?canEditOffice(x):canWrite())?`<button class="bp" onclick="APP.form('${c}','${esc(id)}')">${t("edit")}</button>`:""}${canVerify(x)?`<button class="bg" onclick="APP.status('${c}','${esc(id)}',${!v})">${v?t("unverify"):t("verify")}</button><button class="bd" onclick="APP.del('${c}','${esc(id)}')">${t("del")}</button>`:""}</div>`;
  if(!dlg.open)dlg.showModal();
  if(x.hasPhoto)store.getPhoto(pkey(c,id)).then(d=>{const el=$("#dphoto");if(el)el.innerHTML=okImg(d)?`<img src="${okImg(d)}" alt="">`:""});
};
APP.fav=(c,id)=>{const k=pkey(c,id);favs.has(k)?favs.delete(k):favs.add(k);ls.set("csm-favs",[...favs]);APP.detail(c,id);render()};
APP.status=async(c,id,ok)=>{
  const x=data[c].find(r=>r.id===id);if(!x)return;
  const {id:_,...o}=x;o.status=ok?"verified":"pending";
  if(ok){o.verifiedBy=me.uid;o.verifiedByName=me.name;o.verifiedAt=new Date().toISOString()}else{delete o.verifiedBy;delete o.verifiedByName;delete o.verifiedAt}
  await store.save(c,id,o);logAct(ok?"verify":"unverify",c,id,x.name,x);toast(ok?t("verifiedT"):t("unverifiedT"));setTimeout(()=>APP.detail(c,id),200);
};
APP.del=(c,id)=>{
  const x=data[c].find(r=>r.id===id);
  $("#dt").textContent="⚠️";
  $("#dbody").innerHTML=`<div class="db">${esc(t("delAsk",{x:x?.name||""}))}</div><div class="df"><button class="bd" id="yes">${t("delYes")}</button><button class="bs" onclick="APP.detail('${c}','${esc(id)}')">${t("cancel")}</button></div>`;
  $("#yes").onclick=async()=>{logAct("delete",c,id,x?.name,x);await store.remove(c,id);if(x&&x.hasPhoto)store.savePhoto(pkey(c,id),null);dlg.close();toast(t("deleted"))};
};

/* ================= التصدير ================= */
APP.csv=c=>{
  const cats=c==="all"?ORDER:[c];
  const cell=v=>{v=Array.isArray(v)?v.map(tv).join(" / "):tv(v??"");v=String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
  const out=[];
  cats.forEach(k=>{const fs=fieldsOf(k).filter(f=>!f.priv||isAdmin());
    if(cats.length>1)out.push(cell(CATS[k].ic+" "+cl(k)));
    out.push([t("codeL"),...fs.map(f=>f.k==="commune"?(LANG==="fr"?"Direction / Cercle":"المديرية / الدائرة"):L(f.l)),t("csvStatus"),t("csvBy"),t("csvDate")].map(cell).join(","));
    data[k].forEach(x=>out.push([x.code||"",...fs.map(f=>f.priv?phones[pkey(k,x.id)]:x[f.k]),x.status==="verified"?"موثّق":"قيد المراجعة",x.createdByName||"",(x.createdAt||"").slice(0,10)].map(cell).join(",")));
    if(cats.length>1)out.push("")});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob(["﻿"+out.join("\r\n")],{type:"text/csv;charset=utf-8"}));
  a.download=(c==="all"?"CSM-annuaire":"CSM-"+c)+"-"+new Date().toISOString().slice(0,10)+".csv";
  document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);
};
function errMsg(e){
  const c=(e&&e.code)||"";
  if(c.includes("permission-denied"))return t("errPerm");
  if(c.includes("unavailable"))return t("errNet");
  if(c.includes("resource-exhausted"))return t("errQuota");
  return t("errGen")+(c?": "+c:"");
}


/* ================= الإصدار الرابع: إضافات ================= */
Object.assign(S,{
 noDataYet:["أقاليم لم تُسجَّل فيها مؤسسات بعد","Régions sans institution pour l'instant"],
 directorates:["المديريات","Directions"],cercles:["الدوائر","Cercles"],unspecified:["غير محدد","Non précisé"],
 noCercles:["لم تُضف قائمة الدوائر لهذا الإقليم بعد.","La liste des cercles de cette région n'a pas encore été ajoutée."],
 pickRegionFirst:["اختر الإقليم أولاً","Choisissez d'abord la région"],
 map:["الخريطة","Carte"],about:["عن التجمع","À propos"],dash:["متابعة المندوبين","Suivi des délégués"],logs:["سجل التعديلات","Historique"],
 import:["استيراد من Excel","Import Excel"],settings:["الإعدادات","Paramètres"],
 photo:["صورة المؤسسة","Photo de l'institution"],photoHint:["اختياري. تُصغَّر الصورة تلقائياً.","Facultatif. La photo est réduite automatiquement."],photoErr:["تعذّر قراءة الصورة","Lecture de la photo impossible"],
 voice:["إملاء صوتي","Dictée vocale"],voiceListen:["🎙️ تكلّم الآن…","🎙️ Parlez…"],voiceErr:["تعذّر التعرّف على الصوت","Reconnaissance vocale impossible"],
 share:["مشاركة","Partager"],card:["بطاقة","Fiche"],copied:["نُسخ الرابط","Lien copié"],linked:["مؤسسات مرتبطة","Institutions liées"],
 chooseRegion:["— الإقليم —","— Région —"],regionSet:["تم تحديد الإقليم","Région attribuée"],
 distrib:["توزيع المؤسسات","Répartition des institutions"],growth:["الإدخالات شهرياً","Saisies par mois"],
 more:["تفاصيل إضافية (اختياري)","Détails supplémentaires (facultatif)"],
 mapAll:["الكل","Tout"],nearMe:["📍 الأقرب إليّ","📍 Les plus proches"],nearWait:["جارٍ تحديد موقعك…","Localisation…"],
 nearErr:["تعذّر تحديد موقعك. فعّل خدمة الموقع.","Position introuvable. Activez la localisation."],km:["كم","km"],
 noGps:["{n} مؤسسة بلا إحداثيات لا تظهر على الخريطة.","{n} institution(s) sans coordonnées GPS ne figurent pas sur la carte."],
 mapLoadErr:["تعذّر تحميل الخريطة. تحقّق من الإنترنت.","Chargement de la carte impossible."],openCard:["فتح","Ouvrir"],
 nearest:["الأقرب إليك","Les plus proches de vous"],
 aboutEdit:["✏️ تعديل الصفحة","✏️ Modifier la page"],aboutDefault:["[اكتب هنا تعريفاً بتجمع أهل السنة والجماعة في مالي: نشأته، وأهدافه، ومجالات عمله.]","[Présentez ici la Communauté Sunnite du Mali : historique, objectifs, domaines d'action.]"],
 contact:["التواصل","Contact"],phoneL:["الهاتف","Téléphone"],emailL:["البريد","E-mail"],addressL:["العنوان","Adresse"],whatsapp:["واتساب","WhatsApp"],facebook:["فيسبوك","Facebook"],
 aboutText:["نص التعريف","Texte de présentation"],saveB:["💾 حفظ","💾 Enregistrer"],credits:["تطبيق دليل المؤسسات السنية في مالي","Application Annuaire des institutions sunnites du Mali"],
 dashIntro:["نشاط كل مندوب، والأقاليم التي تحتاج إلى مزيد من الإحصاء.","Activité de chaque délégué et régions à renforcer."],
 delegate:["المندوب","Délégué"],entries:["الإدخالات","Saisies"],verifiedN:["الموثّقة","Vérifiées"],lastAct:["آخر نشاط","Dernière activité"],
 weakRegions:["أقاليم لم تُسجَّل فيها أي مؤسسة","Régions sans aucune institution"],allCovered:["كل الأقاليم فيها بيانات ✅","Toutes les régions ont des données ✅"],
 logsIntro:["آخر ٣٠٠ عملية. يمكن استرجاع النسخة السابقة من أي سجل.","300 dernières opérations. Possibilité de restaurer la version précédente."],
 restore:["↺ استرجاع","↺ Restaurer"],restored:["استُرجعت النسخة السابقة","Version précédente restaurée"],noLogs:["لا توجد عمليات بعد.","Aucune opération."],
 aAdd:["إضافة","Ajout"],aEdit:["تعديل","Modification"],aDelete:["حذف","Suppression"],aVerify:["توثيق","Vérification"],aUnverify:["إلغاء توثيق","Dé-vérification"],aImport:["استيراد","Import"],
 impIntro:["١) نزّل القالب ٢) املأه في Excel ٣) ارفعه هنا. تدخل السجلات «قيد المراجعة».","1) Téléchargez le modèle 2) Remplissez-le dans Excel 3) Importez-le ici. Les fiches arrivent « En attente »."],
 impCat:["القسم","Rubrique"],impTpl:["⬇️ تنزيل القالب","⬇️ Télécharger le modèle"],impFile:["اختر ملف Excel أو CSV","Choisir un fichier Excel ou CSV"],
 impReady:["{n} سجلاً جاهزاً للاستيراد · {b} مرفوضاً (بلا اسم أو إقليم صحيح)","{n} fiche(s) prêtes · {b} rejetée(s) (nom ou région manquants)"],
 impGo:["📥 استيراد الآن","📥 Importer"],impDone:["تم استيراد {n} سجلاً","{n} fiche(s) importée(s)"],impLoadErr:["تعذّر قراءة الملف","Lecture du fichier impossible"],
 setIntro:["إعدادات عامة يراها الجميع.","Paramètres visibles par tous."],communesT:["قوائم الدوائر","Listes des cercles"],
 communesHint:["الدوائر الرسمية (159 دائرة حسب القانون 2023-006) محمّلة مسبقا. يمكنك تعديل قائمة أي إقليم: اسم دائرة في كل سطر. لإرجاع القائمة الرسمية امسح الحقل واحفظ.","Les 159 cercles officiels (Loi 2023-006) sont préchargés. Vous pouvez modifier la liste d'une région : un cercle par ligne. Videz et enregistrez pour revenir à la liste officielle."],
 ownerL:["المالك — صلاحية مطلقة","Propriétaire — pleins pouvoirs"],ownerOnly:["لا يمنح صفة المشرف العام أو ينزعها إلا المالك","Seul le propriétaire peut nommer ou retirer un administrateur"],mkAdminQ:["منح «{n}» صفة المشرف العام؟","Nommer « {n} » administrateur ?"],
 offScope:["تظهر لك مكاتب {r} فقط","Seuls les bureaux de {r} vous sont visibles"],uRegionT:["منطقة المندوب أو المشرف (تحدد المكاتب التي يراها)","Zone du délégué/superviseur (bureaux visibles)"],
 offSave:["لا يمكنك إضافة مكتب خارج منطقتك","Vous ne pouvez pas ajouter un bureau hors de votre zone"],
 admCom:["عضو اللجنة الإدارية (يرى جميع المكاتب)","Membre du comité administratif (voit tous les bureaux)"],admComOn:["أُضيف إلى اللجنة الإدارية","Ajouté au comité administratif"],admComOff:["أُزيل من اللجنة الإدارية","Retiré du comité administratif"],
 offRO:["اطلاع فقط: لا يمكنك تعديل مكاتب خارج منطقتك","Consultation seule : bureaux hors de votre zone"],admComL:["🗂️ اللجنة الإدارية","🗂️ Comité administratif"],
 guideL:["📘 دليل الاستعمال (PDF)","📘 Guide d'utilisation (PDF)"],
 gOrg:["التنظيم","Organisation"],officesS:["{n} في الأقاليم · {b} في بماكو","{n} en régions · {b} à Bamako"],presT:["الرئيس: ","Président : "],allLevels:["كل المستويات","Tous les niveaux"],
 lvNat:["مكتب وطني: الموقع اختياري (عنوان المقر).","Bureau national : localisation facultative (adresse du siège)."],
 lvBko:["في مقاطعة بماكو: اختر المديرية (والحي لمكتب الحي).","District de Bamako : choisissez la direction (et le quartier pour un bureau de quartier)."],
 lvReg:["في الأقاليم: اختر الإقليم ثم الدائرة (والمدينة/القرية لمكتبها).","En région : choisissez la région puis le cercle (et la ville/village)."],
 lvNeedBko:["مكتب المديرية والحي يكون في مقاطعة بماكو","Les bureaux de direction et de quartier sont dans le District de Bamako"],
 lvNeedReg:["اختر الإقليم (خارج مقاطعة بماكو) لهذا المستوى","Choisissez une région (hors Bamako) pour ce niveau"],
 quarterL:["الحي","Quartier"],cityL:["المدينة / القرية","Ville / Village"],
 otherC:["أخرى (اكتب الاسم)","Autre (saisir)"],
 backupT:["النسخة الاحتياطية","Sauvegarde"],backupHint:["نزّل نسخة كاملة من كل البيانات (مع الهواتف) واحفظها في مكان آمن. يُنصح بذلك كل أسبوع.","Téléchargez une copie complète (avec téléphones) chaque semaine et conservez-la en lieu sûr."],
 backupBtn:["💾 تنزيل نسخة احتياطية كاملة","💾 Télécharger une sauvegarde complète"],backupOld:["💾 مرّ أسبوع على آخر نسخة احتياطية.","💾 Dernière sauvegarde il y a plus d'une semaine."],backupNow:["نزّلها الآن","Sauvegarder"],
 cardPrint:["🖨️ طباعة / PDF","🖨️ Imprimer / PDF"],cardScan:["امسح الرمز لفتح المؤسسة في التطبيق","Scannez pour ouvrir la fiche dans l'application"],
});

/* ---------- أدوات ---------- */
// لا تُعرض إلا صورة حقيقية مضغوطة (حماية من إدخال نص ضار مكان الصورة)
const okImg=d=>typeof d==="string"&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(d)?d:"";
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
const loaded={};
function loadScript(src){return loaded[src]||(loaded[src]=new Promise((ok,ko)=>{const s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=ko;document.head.appendChild(s)}))}
function loadCss(href){if(document.querySelector(`link[href="${href}"]`))return;const l=document.createElement("link");l.rel="stylesheet";l.href=href;document.head.appendChild(l)}
function compressImage(file,max=900,q=.62){return new Promise((ok,ko)=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,max/Math.max(im.width,im.height));const cv=document.createElement("canvas");cv.width=Math.round(im.width*k);cv.height=Math.round(im.height*k);cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);ok(cv.toDataURL("image/jpeg",q))};im.onerror=ko;im.src=r.result};r.onerror=ko;r.readAsDataURL(file)})}
function communeInput(r,v){
  if(r===BAMAKO)return `<select id="f_commune"><option value="">${t("choose")}</option>${DIRECTORATES.map(o=>`<option value="${esc(o)}" ${v===o?"selected":""}>${esc(tv(o))}</option>`).join("")}</select>`;
  const off=r?officialCommunes(r):[];
  if(off.length&&(!v||off.includes(v)))return `<select id="f_commune" onchange="APP.cOther(this)"><option value="">${t("choose")}</option>${[...off].sort((a,b)=>tv(a).localeCompare(tv(b))).map(o=>`<option value="${esc(o)}" ${v===o?"selected":""}>${esc(tv(o))}</option>`).join("")}<option value="__o">✏️ ${t("otherC")}</option></select>`;
  return `<input id="f_commune" list="dl_c" value="${esc(v||"")}" autocomplete="off"><datalist id="dl_c">${communesFor(r).map(o=>`<option value="${esc(o)}">`).join("")}</datalist>${r?"":`<div class="hint">${t("pickRegionFirst")}</div>`}`;
}
function officialCommunes(region){const l=(CONFIG.lists&&CONFIG.lists.communes)||{};if(region===BAMAKO)return DIRECTORATES;return (l[region]&&l[region].length?l[region]:(CERCLES[region]||[]))}
APP.cOther=el=>{if(el.value!=="__o")return;const w=el.parentNode;const r=$("#f_region")?$("#f_region").value:"";el.outerHTML=`<input id="f_commune" list="dl_c" autocomplete="off" placeholder="${esc(t("otherC"))}"><datalist id="dl_c">${communesFor(r).map(o=>`<option value="${esc(o)}">`).join("")}</datalist>`;const n=$("#f_commune");if(n)n.focus()};
function linkedTo(c,x){const out=[];
  if(c==="mosques"||c==="assoc"){[["schools","mosque"],["centers","mosque"],["duat","inst"],["offices","hq"]].forEach(([lc,k])=>data[lc].forEach(y=>{if(y[k]&&y[k].trim()===String(x.name).trim())out.push([lc,y])}))}
  else{const k=c==="duat"?"inst":c==="offices"?"hq":"mosque";if(x[k]){["mosques","assoc"].forEach(lc=>data[lc].forEach(y=>{if(y.name.trim()===x[k].trim())out.push([lc,y])}))}}
  return out}
function logAct(action,c,id,name,before){if(!store||!store.log||!me||!me.uid)return;const b=before?{...before}:null;if(b)delete b.id;store.log({at:new Date().toISOString(),by:me.uid,byName:me.name||"",action,cat:c,ref:id,name:name||"",before:b})}
function dl(name,text,type){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500)}
const CATCOL={mosques:"#0f5132",schools:"#2563eb",centers:"#b8892b",duat:"#7c3aed",assoc:"#db2777",media:"#ea580c",offices:"#0e7490"};

/* ---------- إملاء صوتي ---------- */
APP.voice=(id,btn)=>{
  if(!SR)return;const r=new SR();r.lang=LANG==="fr"?"fr-FR":"ar-SA";r.interimResults=false;r.maxAlternatives=1;
  const el=$("#"+id);const old=el.placeholder;el.placeholder=t("voiceListen");btn.classList.add("rec");
  r.onresult=e=>{el.value=(el.value?el.value+" ":"")+e.results[0][0].transcript;el.dispatchEvent(new Event("input"))};
  r.onerror=()=>toast(t("voiceErr"));r.onend=()=>{el.placeholder=old;btn.classList.remove("rec")};
  try{r.start()}catch(e){toast(t("voiceErr"))}
};

/* ---------- مشاركة ---------- */
APP.share=async(c,id)=>{
  const x=data[c].find(r=>r.id===id);if(!x)return;
  const url=location.origin+location.pathname+"#i/"+c+"/"+encodeURIComponent(id);
  const text=`${CATS[c].ic} ${x.name}\n📍 ${locLine(x)}\n${t("appName")}`;
  if(navigator.share){try{await navigator.share({title:x.name,text,url});return}catch(e){if(e.name==="AbortError")return}}
  try{await navigator.clipboard.writeText(text+"\n"+url);toast(t("copied"))}catch(e){}
  open("https://wa.me/?text="+encodeURIComponent(text+"\n"+url),"_blank");
};
APP.uregion=async(uid,r)=>{await store.setUser(uid,{region:r});toast(t("regionSet"))};

/* ---------- الخريطة ---------- */
let mapObj=null,mapCat="",mapLayer=null;
function renderMap(){
  const all=allRows(),withGps=all.filter(({x})=>parseGps(x.gps));
  return `<div class="tools"><div class="chips">${[["","🗂️ "+t("mapAll")],...ORDER.map(c=>[c,CATS[c].ic+" "+co(c)])].map(([k,l])=>`<button class="chip ${mapCat===k?"on":""}" onclick="APP.mapCat('${k}')">${l}</button>`).join("")}</div>
   <button class="bp" onclick="APP.near()">${t("nearMe")}</button></div>
   <div id="map"></div>${all.length-withGps.length?`<div class="hint" style="margin-top:6px">ℹ️ ${t("noGps",{n:fmt(all.length-withGps.length)})}</div>`:""}<div id="nearList"></div>`;
}
async function afterMap(){
  const el=$("#map");if(!el)return;
  try{loadCss("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");await loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js")}catch(e){el.innerHTML=`<div class="empty">${t("mapLoadErr")}</div>`;return}
  if(mapObj){mapObj.remove();mapObj=null}
  mapObj=L_.map(el,{zoomControl:true}).setView([17.2,-3.5],5);
  L_.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'&copy; OpenStreetMap'}).addTo(mapObj);
  drawMarkers();
}
const L_={map:(...a)=>window.L.map(...a),tileLayer:(...a)=>window.L.tileLayer(...a)};
function drawMarkers(){
  if(!mapObj)return;if(mapLayer)mapLayer.remove();mapLayer=window.L.layerGroup().addTo(mapObj);
  const pts=[];
  allRows().filter(({c})=>!mapCat||c===mapCat).forEach(({c,x})=>{const g=parseGps(x.gps);if(!g)return;pts.push(g);
    window.L.circleMarker(g,{radius:8,color:"#fff",weight:2,fillColor:CATCOL[c],fillOpacity:.95}).addTo(mapLayer)
     .bindPopup(`<b>${CATS[c].ic} ${esc(x.name)}</b><br>${esc(locLine(x))}<br><a href="#i/${c}/${esc(x.id)}">${t("openCard")} ←</a>`)});
  if(pts.length)mapObj.fitBounds(pts,{padding:[30,30],maxZoom:14});
}
APP.mapCat=k=>{mapCat=k;document.querySelectorAll(".chip").forEach(b=>b.classList.toggle("on",b.getAttribute("onclick")===`APP.mapCat('${k}')`));drawMarkers()};
APP.near=()=>{
  const box=$("#nearList");box.innerHTML=`<div class="count" style="margin-top:10px">${t("nearWait")}</div>`;
  navigator.geolocation.getCurrentPosition(p=>{
    const me2=[p.coords.latitude,p.coords.longitude];
    const d=(a,b)=>{const R=6371,r=Math.PI/180,dl=(b[0]-a[0])*r,dn=(b[1]-a[1])*r;const h=Math.sin(dl/2)**2+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(h))};
    const list=allRows().filter(({c})=>!mapCat||c===mapCat).map(({c,x})=>{const g=parseGps(x.gps);return g?{c,x,km:d(me2,g)}:null}).filter(Boolean).sort((a,b)=>a.km-b.km).slice(0,10);
    if(mapObj){mapObj.setView(me2,13);window.L.circleMarker(me2,{radius:9,color:"#fff",weight:3,fillColor:"#d23",fillOpacity:1}).addTo(mapLayer)}
    box.innerHTML=`<div class="sech"><h3>${t("nearest")}</h3></div><div class="list">${list.map(({c,x,km})=>card(c,x,true).replace('<h3>',`<span class="km">${km<1?fmt(Math.round(km*1000))+" m":fmt(Math.round(km*10)/10)+" "+t("km")}</span><h3>`)).join("")||`<div class="empty">—</div>`}</div>`;
  },()=>{box.innerHTML=`<div class="banner" style="margin-top:10px">${t("nearErr")}</div>`},{enableHighAccuracy:true,timeout:15000});
};

/* ---------- الرسوم ---------- */
function afterStats(){
  const dn=$("#donut");if(dn){const tot=ORDER.reduce((a,c)=>a+data[c].length,0);let acc=0;
    const seg=ORDER.map(c=>{const v=tot?data[c].length/tot*100:0;const s=`${CATCOL[c]} ${acc}% ${acc+v}%`;acc+=v;return s}).join(",");
    dn.innerHTML=`<div class="donut-w"><div class="donut" style="background:${tot?`conic-gradient(${seg})`:"#eef2ef"}"><span>${fmt(tot)}</span></div><div class="dleg">${ORDER.map(c=>`<div><i style="background:${CATCOL[c]}"></i>${CATS[c].ic} ${cl(c)} <b>${fmt(data[c].length)}</b></div>`).join("")}</div></div>`}
  const gr=$("#growth");if(gr){const m={};allRows().forEach(({x})=>{const k=(x.createdAt||"").slice(0,7);if(k)m[k]=(m[k]||0)+1});
    const keys=Object.keys(m).sort().slice(-12),mx=Math.max(1,...keys.map(k=>m[k]));
    gr.innerHTML=keys.length?`<div class="cols">${keys.map(k=>`<div class="col"><span class="cv">${fmt(m[k])}</span><span class="cb" style="height:${m[k]/mx*100}%"></span><span class="cl">${k.slice(5)}/${k.slice(2,4)}</span></div>`).join("")}</div>`:`<div class="empty">—</div>`}
}

/* ---------- عن التجمع ---------- */
function renderAbout(){
  const s=CONFIG.site||{};const txt=s.about||t("aboutDefault");
  const row=(ic,l,v,href)=>v?`<div class="crow"><span>${ic}</span><b>${l}</b><a ${href?`href="${href}" target="_blank" rel="noopener"`:""} dir="ltr">${esc(v)}</a></div>`:"";
  return `<div class="hero about"><div class="tx"><div class="kick">${t("kick")}</div><h2 class="abt">${t("org")}</h2><p class="lead" style="white-space:pre-line">${esc(txt)}</p></div><div class="img"></div></div>
  <div class="sec"><h2>${t("contact")}</h2>${row("☎️",t("phoneL"),s.phone,s.phone?"tel:"+s.phone.replace(/\s/g,""):"")}${row("💬",t("whatsapp"),s.whatsapp,s.whatsapp?"https://wa.me/"+s.whatsapp.replace(/\D/g,""):"")}${row("✉️",t("emailL"),s.email,s.email?"mailto:"+s.email:"")}${row("📍",t("addressL"),s.address)}${row("📘",t("facebook"),s.facebook,s.facebook)}
  ${!s.phone&&!s.email&&!s.address?`<div class="hint">—</div>`:""}</div>
  ${isAdmin()?`<div class="tools"><a class="bp btnl" href="#settings">${t("aboutEdit")}</a></div>`:""}
  <div class="tools" style="justify-content:center;margin-top:16px"><a class="bp" href="guide.pdf" target="_blank" rel="noopener">${t("guideL")}</a><button class="bs" onclick="APP.checkUpdate()">${t("updBtn")}</button></div>
  <div class="hint" style="text-align:center;margin-top:12px">${t("credits")} · CSM · ${t("verL")} ${APP_VERSION}</div>`;
}

/* ---------- لوحة المندوبين ---------- */
function renderDash(){
  const scope=isRegAdmin()?allRows().filter(({x})=>x.region===me.region):allRows();
  const by={};scope.forEach(({x})=>{const k=x.createdBy||"?";by[k]=by[k]||{name:x.createdByName||"?",n:0,v:0,last:""};by[k].n++;if(x.status==="verified")by[k].v++;if((x.updatedAt||"")>by[k].last)by[k].last=x.updatedAt||""});
  const rows=Object.values(by).sort((a,b)=>b.n-a.n);
  const empty=REGIONS.filter(r=>!allRows().some(({x})=>x.region===r));
  return `<div class="banner">${t("dashIntro")}</div>
  <div class="sec"><h2>👤 ${t("delegate")}</h2>${rows.length?`<div class="tw"><table><tr><th>${t("delegate")}</th><th class="num">${t("entries")}</th><th class="num">${t("verifiedN")}</th><th>${t("lastAct")}</th></tr>${rows.map(r=>`<tr><td>${esc(r.name)}</td><td class="num"><b>${fmt(r.n)}</b></td><td class="num">${fmt(r.v)}</td><td>${dfmt(r.last)}</td></tr>`).join("")}</table></div>`:`<div class="empty">—</div>`}</div>
  ${isAdmin()?`<div class="sec"><h2>⚠️ ${t("weakRegions")}</h2>${empty.length?`<div class="chips">${empty.map(r=>`<span class="chip">${esc(tv(r))}</span>`).join("")}</div>`:t("allCovered")}</div>`:""}`;
}

/* ---------- سجل التعديلات ---------- */
function renderLogs(){
  if(!isAdmin())return `<div class="empty">${t("adminOnly")}</div>`;
  const A={add:["➕",t("aAdd")],edit:["✏️",t("aEdit")],delete:["🗑️",t("aDelete")],verify:["✅",t("aVerify")],unverify:["↩️",t("aUnverify")],import:["📥",t("aImport")]};
  return `<div class="banner">${t("logsIntro")}</div><div class="sec">${logs.length?`<div class="tw"><table><tr><th></th><th>${t("name")}</th><th>${t("delegate")}</th><th>${t("lastAct")}</th><th></th></tr>${logs.map(l=>`<tr><td title="${(A[l.action]||["",""])[1]}">${(A[l.action]||["•"])[0]} ${(A[l.action]||["",""])[1]}</td><td>${CATS[l.cat]?CATS[l.cat].ic:""} ${esc(l.name)}</td><td>${esc(l.byName)}</td><td>${dfmt(l.at)} ${(l.at||"").slice(11,16)}</td><td>${l.before&&CATS[l.cat]?`<button class="bs sm" onclick="APP.restore('${esc(l.id)}')">${t("restore")}</button>`:""}</td></tr>`).join("")}</table></div>`:`<div class="empty">${t("noLogs")}</div>`}</div>`;
}
APP.restore=async lid=>{const l=logs.find(z=>z.id===lid);if(!l||!l.before)return;await store.save(l.cat,l.ref,l.before);logAct("edit",l.cat,l.ref,l.name,null);toast(t("restored"))};

/* ---------- استيراد ---------- */
let impCat="mosques",impRows=[];
function renderImport(){
  return `<div class="banner">${t("impIntro")}</div><div class="sec">
   <label>${t("impCat")}</label><select id="impc" onchange="APP.impCat(this.value)">${ORDER.map(c=>`<option value="${c}" ${impCat===c?"selected":""}>${CATS[c].ic} ${cl(c)}</option>`).join("")}</select>
   <div class="tools" style="margin-top:12px"><button class="bs" onclick="APP.impTpl()">${t("impTpl")}</button>
   <label class="bp filebtn">📂 ${t("impFile")}<input type="file" accept=".xlsx,.xls,.csv" onchange="APP.impFile(this.files[0])" hidden></label></div>
   <div id="impRes"></div></div>${pasteBox()}${jsonImportBox()}`;
}
APP.impCat=c=>{impCat=c;impRows=[];render()};
const impCols=()=>fieldsOf(impCat).filter(f=>f.t!=="gps").map(f=>f.k==="commune"?(LANG==="fr"?"Direction / Cercle":"المديرية / الدائرة"):L(f.l));
APP.impTpl=()=>dl(`CSM-${impCat}-modele.csv`,"\ufeff"+impCols().join(",")+"\r\n","text/csv;charset=utf-8");
// تحويل صفوف (رأس العمود ← القيمة) إلى سجلات، يشترك فيه ملف Excel واللصق المباشر
function impMap(rows,defRegion){
  const fs=fieldsOf(impCat).filter(f=>f.t!=="gps");
  const norm=s=>String(s||"").trim().toLowerCase();
  const regMap={};REGIONS.forEach(r=>{regMap[norm(r)]=r;if(FRV[r])regMap[norm(FRV[r])]=r});["مقاطعة بماكو","باماكو","بماكو","bamako","district de bamako"].forEach(z=>regMap[norm(z)]=BAMAKO);
  const optBack={};Object.entries(FRV).forEach(([ar,fr])=>{optBack[norm(fr)]=ar;optBack[norm(ar)]=ar});
  let bad=0;const out=[];
  rows.forEach(r=>{const o={};const keys=Object.keys(r);
    fs.forEach(f=>{const alias=f.k==="commune"?["المديرية / الدائرة","direction / cercle","المديرية","الدائرة","direction","cercle"]:f.priv?["الهاتف","هاتف","phone","téléphone","telephone","tel","رقم الهاتف"]:[];const k=keys.find(h=>norm(h)===norm(f.l[0])||norm(h)===norm(f.l[1])||norm(h)===f.k||alias.includes(norm(h)));if(!k)return;let v=String(r[k]).trim();if(!v)return;
      if(f.priv){o.__ph=v;return}
      if(f.t==="num")v=num(v);else if(f.t==="chk")v=v.split(/[\/،,;]/).map(z=>optBack[norm(z)]||z.trim()).filter(Boolean);else if(f.t==="sel")v=f.k==="region"?(regMap[norm(v)]||""):(optBack[norm(v)]||v);
      o[f.k]=v});
    if(o.commune)o.commune=optBack[norm(o.commune)]||o.commune;
    if(o.quarter)o.quarter=optBack[norm(o.quarter)]||o.quarter;
    if(!o.region&&defRegion)o.region=defRegion;
    if(!o.name||(!o.region&&impCat!=="duat")){bad++;return}if(o.region===BAMAKO)delete o.city;out.push(o)});
  return {rows:out,bad};
}
function impPreview(res,bad){
  res.innerHTML=`<div class="banner" style="margin-top:12px">${t("impReady",{n:fmt(impRows.length),b:fmt(bad)})}</div>
    ${impRows.length?`<div class="tw"><table><tr><th>${t("name")}</th><th>${t("region")}</th><th>${L(flab({k:"commune"},impRows[0]))}</th></tr>${impRows.slice(0,10).map(o=>`<tr><td>${esc(o.name)}</td><td>${esc(tv(o.region))}</td><td>${esc(o.commune||"")}</td></tr>`).join("")}</table></div>${impRows.length>10?`<div class="count">… +${fmt(impRows.length-10)}</div>`:""}<button class="bp" style="margin-top:10px" onclick="APP.impGo()">${t("impGo")}</button>`:""}`}
APP.impFile=async file=>{
  if(!file)return;const res=$("#impRes");res.innerHTML=`<div class="count">${t("loading")}</div>`;
  try{
    await loadScript("lib/xlsx.full.min.js").catch(()=>loadScript("https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"));
    const wb=window.XLSX.read(await file.arrayBuffer(),{type:"array"});const rows=window.XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{defval:""});
    const m=impMap(rows);impRows=m.rows;impPreview(res,m.bad);
  }catch(e){console.error(e);res.innerHTML=`<div class="err">${t("impLoadErr")}</div>`}
};
APP.impGo=async()=>{
  const t0=Date.now();let n=0,k=0;
  for(const r of impRows){const {__ph,...o}=r;
    const nn=s=>nz(String(s||"").replace(/\s+/g," "));
    if(data[impCat].some(x=>nn(x.name)===nn(o.name)&&(x.region||"")===(o.region||"")&&nn(x.quarter)===nn(o.quarter)&&nn(x.city)===nn(o.city))){k++;continue}
    const now=new Date(t0+n).toISOString();const id=newId();await store.save(impCat,id,{...o,status:"pending",createdAt:now,updatedAt:now,createdBy:me.uid,createdByName:me.name,updatedBy:me.uid,updatedByName:me.name});if(__ph)await store.savePhone(impCat,id,__ph);n++}
  logAct("import",impCat,"",n+" × "+cl(impCat),null);
  toast(t("impDone",{n:fmt(n)})+(k?" · "+t("impSkip",{n:fmt(k)}):""));impRows=[];location.hash=impCat;
};

/* ---------- الإعدادات ---------- */
function renderSettings(){
  if(!isAdmin())return `<div class="empty">${t("adminOnly")}</div>`;
  const s=CONFIG.site||{};const lists=(CONFIG.lists&&CONFIG.lists.communes)||{};
  const inp=(k,l)=>`<div><label>${l}</label><input id="s_${k}" value="${esc(s[k]||"")}" ${k!=="address"?'dir="ltr"':""}></div>`;
  const sm=(ic,ttl)=>`<summary style="cursor:pointer;font-weight:700;padding:12px 4px;font-size:16px">${ic} ${L(ttl)}</summary>`;
  return `<div class="banner">${t("setIntro")}</div>
  <details open>${sm("🏢",["بيانات التجمع والتواصل","Informations et contact"])}<div class="sec"><h2>ℹ️ ${t("about")}</h2><label>${t("aboutText")}</label><textarea id="s_about" rows="6">${esc(s.about||"")}</textarea>
   <div class="fg" style="margin-top:10px">${inp("phone",t("phoneL"))}${inp("whatsapp",t("whatsapp"))}${inp("email",t("emailL"))}${inp("facebook",t("facebook"))}<div class="full"><label>${t("addressL")}</label><input id="s_address" value="${esc(s.address||"")}"></div></div>
   <h3 style="margin-top:14px">🪪 ${t("setCards")}</h3><div class="fg"><div><label>${t("presName")}</label><input id="s_presName" value="${esc(s.presName||"")}"></div><div><label>${t("cardYearsL")}</label><input id="s_cardYears" type="number" min="1" max="10" value="${esc(s.cardYears||"2")}"></div></div>
   <button class="bp" style="margin-top:10px" onclick="APP.saveSite()">${t("saveB")}</button></div></details>
  <details>${sm("🏘️",["قوائم الدوائر","Listes des cercles"])}<div class="sec"><h2>🏘️ ${t("communesT")}</h2><div class="hint">${t("communesHint")}</div>
   <label style="margin-top:8px">${t("region")}</label><select id="s_reg" onchange="APP.showCommunes(this.value)">${REGIONS.filter(r=>r!==BAMAKO).map(r=>`<option value="${r}">${esc(tv(r))}</option>`).join("")}</select>
   <textarea id="s_comm" rows="7" style="margin-top:8px">${esc(officialCommunes(REGIONS[1]).join("\n"))}</textarea>
   <button class="bp" style="margin-top:8px" onclick="APP.saveCommunes()">${t("saveB")}</button></div></details>
  <details>${sm("🧰",["الصيانة والأدوات","Maintenance et outils"])}${backupBox()}${scopeBox()}${renumBox()}${clnBox()}${unifyBox()}${sigBox()}
  <div class="sec"><h2>💾 ${t("backupT")}</h2><div class="hint">${t("backupHint")}</div><button class="bp" style="margin-top:10px" onclick="APP.backup()">${t("backupBtn")}</button></div></details>`;
}
/* ---- تنظيف حقل «القسم الإداري» القديم من السجلات ---- */
const clnList=()=>ALLC.flatMap(c=>data[c].filter(x=>"arrond" in x).map(x=>[c,x]));
const clnBox=()=>!isAdmin()||!clnList().length?"":`<div class="card"><h3>🧹 ${t("clnT")} (${fmt(clnList().length)})</h3><div class="hint">${t("clnInfo")}</div><button class="bs" onclick="APP.clnGo()">${t("clnB")}</button></div>`;
APP.clnGo=async()=>{
  const todo=clnList();if(!todo.length){toast(t("clnNone"));return}
  if(!confirm(t("clnQ",{n:fmt(todo.length)})))return;
  let n=0;
  for(const [c,x] of todo){try{const {id,arrond,...o}=x;await store.save(c,id,o);n++}catch(e){}}
  logAct("edit","settings","",n+" × arrond",null);toast(t("clnDone",{n:fmt(n)}));render();
};
APP.saveSite=()=>{const o={};["about","phone","whatsapp","email","facebook","address","presName","cardYears"].forEach(k=>o[k]=$("#s_"+k).value.trim());store.saveConfig("site",o);toast(t("saved"))};
APP.showCommunes=r=>{$("#s_comm").value=officialCommunes(r).join("\n")};
APP.saveCommunes=()=>{const r=$("#s_reg").value;const list=$("#s_comm").value.split("\n").map(z=>z.trim()).filter(Boolean);const all={...((CONFIG.lists&&CONFIG.lists.communes)||{})};all[r]=list;store.saveConfig("lists",{communes:all});toast(t("saved"))};
APP.backup=()=>{const out={exportedAt:new Date().toISOString(),data:{},phones};ORDER.forEach(c=>out.data[c]=data[c]);out.config=CONFIG;dl("CSM-sauvegarde-"+new Date().toISOString().slice(0,10)+".json",JSON.stringify(out,null,1),"application/json");ls.set("csm-backup",Date.now())};

/* ---------- بطاقة المؤسسة ---------- */
function renderCard(c,id){
  const x=data[c]&&data[c].find(r=>r.id===id);if(!x)return `<div class="empty">—</div>`;
  const rows=fieldsOf(c).slice(1).filter(f=>!f.priv&&f.t!=="gps"&&f.k!=="notes"&&f.k!=="name_fr").filter(f=>!(f.k==="city"&&x.region===BAMAKO)).map(f=>[L(flab(f,x)),show(x[f.k])]).filter(r=>r[1]);
  return `<div class="tools noprint"><a class="back" href="#i/${c}/${esc(id)}">${t("back")}</a><button class="bp" onclick="print()">${t("cardPrint")}</button></div>
  <div class="icard"><div class="ich"><img src="logo.png" alt=""><div><b>${t("org")}</b><small>${t("appName")}</small></div><span class="pill ${x.status==="verified"?"ok":"pd"}">${x.status==="verified"?"✅ "+t("verified"):"🕓 "+t("pending")}</span></div>
   <div class="icb"><div class="icph" id="icph"></div><div class="ict"><div class="count">${CATS[c].ic} ${co(c)}</div><h2>${esc(nameMain(x))}</h2>${nameSub(x)?`<div class="m" dir="auto">${esc(nameSub(x))}</div>`:""}<div class="m">📍 ${esc(locLine(x))}</div></div></div>
   <dl class="det">${rows.map(([l,v])=>`<dt>${l}</dt><dd>${v}</dd>`).join("")}</dl>
   <div class="icq"><div id="qr"></div><div class="hint">${t("cardScan")}</div></div></div>`;
}
async function afterCard(c,id){
  const x=data[c]&&data[c].find(r=>r.id===id);if(!x)return;
  if(x.hasPhoto)store.getPhoto(pkey(c,id)).then(d=>{const el=$("#icph");if(el&&okImg(d))el.innerHTML=`<img src="${okImg(d)}" alt="">`});
  try{await loadScript("lib/qrcode.js");const q=window.qrcode(0,"M");q.addData(location.origin+location.pathname+"#i/"+c+"/"+encodeURIComponent(id));q.make();const el=$("#qr");if(el)el.innerHTML=q.createSvgTag({cellSize:4,margin:2})}catch(e){}
}
/* ================= هيكل المكتب: الرئيس ونوابه والأعضاء واللجان ================= */
Object.assign(S,{
 stT:["👥 هيكل المكتب","👥 Organigramme du bureau"],
 stPres:["رئيس المكتب","Président du bureau"],stVices:["نواب الرئيس","Vice-présidents"],stMembers:["الأعضاء","Membres"],
 stComms:["🗂️ اللجان","🗂️ Commissions"],stComm:["اللجنة","Commission"],stCommName:["اسم اللجنة","Nom de la commission"],
 stHead:["رئيس اللجنة","Président de la commission"],stCVices:["نواب رئيس اللجنة","Vice-présidents de la commission"],stCMembers:["أعضاء اللجنة","Membres de la commission"],
 stAddVice:["➕ نائب","➕ Vice-président"],stAddMember:["➕ عضو","➕ Membre"],stAddComm:["➕ إضافة لجنة","➕ Ajouter une commission"],stDelComm:["حذف اللجنة","Supprimer"],
 stName:["الاسم","Nom"],stPhone:["الهاتف","Téléphone"],stEmpty:["لم يُسجَّل الهيكل بعد","Organigramme non renseigné"],
 stHint:["سجّل رئيس المكتب ونوابه والأعضاء، ثم أضف اللجان: لكل لجنة رئيس ونواب وأعضاء. الأرقام لا يراها إلا المشرفون والمندوبون في المنطقة.","Saisissez le président, ses vice-présidents et les membres, puis les commissions. Les numéros ne sont visibles que des responsables de la zone."],
 stCount:["{n} شخصاً · {c} لجنة","{n} personne(s) · {c} commission(s)"],stCsv:["⬇️ الهيكل (Excel)","⬇️ Organigramme (Excel)"],
 stRole:["الصفة","Fonction"],stOffice:["المكتب","Bureau"],stVice:["نائب الرئيس","Vice-président"],stMember:["عضو","Membre"],
 stCHead:["رئيس لجنة","Président de commission"],stCVice:["نائب رئيس لجنة","Vice-président de commission"],stCMember:["عضو لجنة","Membre de commission"],
 lvTop:["القيادة العامة هي الجهة العليا للتجمع.","La Direction générale est l'instance suprême de la CSM."]
});
const COMMS=["لجنة الدعوة والإرشاد","لجنة التعليم","لجنة الشؤون الدينية والمساجد","لجنة الإعلام والاتصال","لجنة المالية","لجنة التنظيم والإدارة","لجنة الشؤون الاجتماعية","لجنة العلاقات العامة","لجنة الشباب","لجنة المرأة","لجنة الإغاثة","لجنة الفتوى والقضايا الشرعية"];
Object.assign(FRV,{"لجنة الدعوة والإرشاد":"Commission da'wa et orientation","لجنة التعليم":"Commission éducation","لجنة الشؤون الدينية والمساجد":"Commission affaires religieuses et mosquées","لجنة الإعلام والاتصال":"Commission information et communication","لجنة المالية":"Commission des finances","لجنة التنظيم والإدارة":"Commission organisation et administration","لجنة الشؤون الاجتماعية":"Commission affaires sociales","لجنة العلاقات العامة":"Commission relations publiques","لجنة الشباب":"Commission jeunesse","لجنة المرأة":"Commission femmes","لجنة الإغاثة":"Commission secours","لجنة الفتوى والقضايا الشرعية":"Commission fatwa et questions charia"});

const stRow=(p={})=>`<div class="prow"><input class="pn" placeholder="${esc(t("stName"))}" value="${esc(p.n||"")}"><input class="pp" type="tel" dir="ltr" inputmode="tel" placeholder="${esc(t("stPhone"))}" value="${esc(p.p||"")}"><button type="button" class="px" title="✕">✕</button></div>`;
const stList=(k,arr,addLbl)=>`<div class="plist" data-k="${k}">${(arr||[]).map(stRow).join("")}</div><button type="button" class="padd">${t(addLbl)}</button>`;
const stComm=(cm={})=>`<div class="comm"><div class="chd"><input class="c-name" list="dl_comms" placeholder="${esc(t("stCommName"))}" value="${esc(cm.name||"")}"><button type="button" class="cdel" title="${esc(t("stDelComm"))}">🗑️</button></div>
  <label>${t("stHead")}</label><div class="c-head">${stRow(cm.head)}</div>
  <label>${t("stCVices")}</label>${stList("vices",cm.vices,"stAddVice")}
  <label>${t("stCMembers")}</label>${stList("members",cm.members,"stAddMember")}</div>`;
function structEditor(st){st=st||{};
  return `<div class="stv sted" id="sted"><h4>${t("stT")}</h4><div class="hint">${t("stHint")}</div>
   <label>${t("stPres")}</label><div class="st-pres">${stRow(st.pres)}</div>
   <label>${t("stVices")}</label>${stList("vices",st.vices,"stAddVice")}
   <label>${t("stMembers")}</label>${stList("members",st.members,"stAddMember")}
   <h4 style="margin-top:14px">${t("stComms")}</h4><div class="st-comms">${(st.comms||[]).map(stComm).join("")}</div>
   <button type="button" class="cadd bs">${t("stAddComm")}</button>
   <datalist id="dl_comms">${COMMS.map(z=>`<option value="${esc(z)}">`).join("")}</datalist></div>`}
function structBind(){const r=$("#sted");if(!r)return;
  r.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;
    if(b.classList.contains("padd")){const l=b.previousElementSibling;l.insertAdjacentHTML("beforeend",stRow());l.lastElementChild.querySelector(".pn").focus()}
    else if(b.classList.contains("px")){const row=b.closest(".prow");if(row.parentElement.classList.contains("plist"))row.remove();else row.querySelectorAll("input").forEach(i=>i.value="")}
    else if(b.classList.contains("cadd")){r.querySelector(".st-comms").insertAdjacentHTML("beforeend",stComm());const cs=r.querySelectorAll(".comm");cs[cs.length-1].querySelector(".c-name").focus()}
    else if(b.classList.contains("cdel")){const cm=b.closest(".comm");const nm=cm.querySelector(".c-name").value;if(!nm||confirm(t("stDelComm")+" «"+nm+"»؟"))cm.remove()}})}
function structCollect(){const r=$("#sted");if(!r)return null;
  const rd=row=>{if(!row)return null;const n=row.querySelector(".pn").value.trim(),p=row.querySelector(".pp").value.trim();return n||p?{n,p}:null};
  const lst=(el,k)=>[...el.querySelectorAll(`:scope > .plist[data-k="${k}"] > .prow`)].map(rd).filter(Boolean);
  return {pres:rd(r.querySelector(".st-pres .prow")),vices:lst(r,"vices"),members:lst(r,"members"),
    comms:[...r.querySelectorAll(".st-comms > .comm")].map(cm=>({name:cm.querySelector(".c-name").value.trim(),head:rd(cm.querySelector(".c-head .prow")),vices:lst(cm,"vices"),members:lst(cm,"members")})).filter(cm=>cm.name||cm.head||cm.vices.length||cm.members.length)}}
function structCount(st){if(!st)return 0;let n=(st.pres?1:0)+(st.vices||[]).length+(st.members||[]).length;(st.comms||[]).forEach(cm=>{n+=(cm.head?1:0)+cm.vices.length+cm.members.length});return n}
const waNum=p=>{let d=String(p||"").replace(/\D/g,"");if(d.length===8)d="223"+d;return d};
const stP=p=>p?`<span class="svn">${esc(p.n||"—")}</span>${p.p?` <a class="lnk" dir="ltr" href="tel:${esc(p.p.replace(/\s/g,""))}">📞 ${esc(p.p)}</a> <a class="lnk wa" target="_blank" rel="noopener" href="https://wa.me/${waNum(p.p)}" title="WhatsApp">💬</a>`:""}`:"—";
const stUl=(arr)=>arr&&arr.length?`<ol class="svl">${arr.map(p=>`<li>${stP(p)}</li>`).join("")}</ol>`:"";
function structView(st){
  if(!st||!structCount(st)&&!(st.comms||[]).length)return `<div class="stv"><h4>${t("stT")}</h4><div class="hint">${t("stEmpty")}</div></div>`;
  return `<div class="stv"><h4>${t("stT")} <span class="count">${t("stCount",{n:fmt(structCount(st)),c:fmt((st.comms||[]).length)})}</span></h4>
   <div class="svr"><b>👤 ${t("stPres")}:</b> ${stP(st.pres)}</div>
   ${st.vices&&st.vices.length?`<div class="svr"><b>${t("stVices")}:</b>${stUl(st.vices)}</div>`:""}
   ${st.members&&st.members.length?`<div class="svr"><b>${t("stMembers")} (${fmt(st.members.length)}):</b>${stUl(st.members)}</div>`:""}
   ${(st.comms||[]).map(cm=>`<details class="svc"><summary>🗂️ <b>${esc(tv(cm.name)||t("stComm"))}</b>${cm.head&&cm.head.n?` — ${esc(cm.head.n)}`:""}</summary>
     <div class="svr"><b>${t("stHead")}:</b> ${stP(cm.head)}</div>
     ${cm.vices.length?`<div class="svr"><b>${t("stCVices")}:</b>${stUl(cm.vices)}</div>`:""}
     ${cm.members.length?`<div class="svr"><b>${t("stCMembers")} (${fmt(cm.members.length)}):</b>${stUl(cm.members)}</div>`:""}</details>`).join("")}</div>`}
// تصدير كل الأشخاص في المكاتب الظاهرة: سطر لكل شخص
APP.structCsv=()=>{
  const cell=v=>{v=String(v??"");return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
  const out=[[t("stOffice"),L(CATS.offices.fields[1].l),t("region"),L(flab(LOC[1],{})),t("stComm"),t("stRole"),t("stName"),t("stPhone")].map(cell).join(",")];
  data.offices.forEach(x=>{const st=x.struct||{};const base=[x.name,tv(x.level),tv(x.region),tv(x.commune)];
    const add=(comm,role,p)=>{if(p)out.push([...base,comm,role,p.n,p.p].map(cell).join(","))};
    add("",t("stPres"),st.pres);(st.vices||[]).forEach(p=>add("",t("stVice"),p));(st.members||[]).forEach(p=>add("",t("stMember"),p));
    (st.comms||[]).forEach(cm=>{const n=tv(cm.name);add(n,t("stCHead"),cm.head);cm.vices.forEach(p=>add(n,t("stCVice"),p));cm.members.forEach(p=>add(n,t("stCMember"),p))})});
  dl("CSM-hayakil.csv","﻿"+out.join("\n"),"text/csv;charset=utf-8");
};

/* ================= الشجرة التنظيمية والتغطية ================= */
Object.assign(S,{
 treeV:["🌳 الشجرة التنظيمية","🌳 Arborescence"],listV:["📋 القائمة","📋 Liste"],
 covT:["تغطية المكاتب","Couverture des bureaux"],covR:["{n} من {t} إقليماً","{n} région(s) sur {t}"],covC:["{n} من {t} دائرة","{n} cercle(s) sur {t}"],covD:["{n} من 8 مديريات","{n} direction(s) sur 8"],
 covMissing:["أقاليم بلا مكتب: ","Régions sans bureau : "],noOffice:["لا مكتب بعد","Pas encore de bureau"]
});
let offView=ls.get("csm-offview","list");
APP.offView=v=>{offView=v;ls.set("csm-offview",v);render()};
function offCoverage(){
  const o=data.offices,regs=REGIONS.slice(1);
  const hasR=new Set(o.filter(x=>x.level==="مكتب إقليم").map(x=>x.region));
  const hasD=new Set(o.filter(x=>x.level==="مكتب مديرية").map(x=>x.commune));
  const hasC=new Set(o.filter(x=>x.level==="مكتب دائرة").map(x=>x.region+"|"+x.commune));
  const totC=regs.reduce((a,r)=>a+officialCommunes(r).length,0);
  const pc=(a,b)=>b?Math.round(a/b*100):0;
  const bar=(lbl,a,b)=>`<div class="cov"><div class="covl">${lbl}</div><div class="covb"><span style="width:${pc(a,b)}%"></span></div><b>${pc(a,b)}%</b></div>`;
  const miss=regs.filter(r=>!hasR.has(r));
  return `<div class="sec"><h2>📶 ${t("covT")}</h2>
   ${bar(t("covR",{n:fmt(hasR.size),t:fmt(regs.length)}),hasR.size,regs.length)}
   ${bar(t("covD",{n:fmt(hasD.size)}),hasD.size,8)}
   ${bar(t("covC",{n:fmt(hasC.size),t:fmt(totC)}),hasC.size,totC)}
   ${miss.length&&miss.length<regs.length?`<div class="hint">${t("covMissing")}${miss.map(r=>esc(tv(r))).join("، ")}</div>`:""}</div>`}
function offTree(rows){
  const by=lv=>rows.filter(x=>x.level===lv);
  const node=(x,kids="")=>`<li><a class="tn" onclick="APP.detail('offices','${esc(x.id)}')">${x.status==="verified"?"✅":"🕓"} <b>${esc(x.name)}</b>${x.president?` <span class="count">· ${esc(x.president)}</span>`:""}</a>${kids?`<ul>${kids}</ul>`:""}</li>`;
  const grp=(lbl,inner)=>inner?`<li><span class="tg">${lbl}</span><ul>${inner}</ul></li>`:"";
  // بماكو: مكتب المديرية ← مكاتب أحيائها
  const bko=by("مكتب مديرية").map(d=>node(d,by("مكتب حي").filter(q=>q.commune===d.commune).map(q=>node(q)).join(""))).join("")
    +by("مكتب حي").filter(q=>!by("مكتب مديرية").some(d=>d.commune===q.commune)).map(q=>node(q)).join("");
  // الأقاليم: مكتب الإقليم ← الدوائر ← المدن/القرى
  const regs=[...new Set([...by("مكتب إقليم"),...by("مكتب دائرة"),...by("مكتب مدينة / قرية")].map(x=>x.region))].sort((a,b)=>REGIONS.indexOf(a)-REGIONS.indexOf(b));
  const reg=regs.map(r=>{
    const cer=by("مكتب دائرة").filter(x=>x.region===r),cit=by("مكتب مدينة / قرية").filter(x=>x.region===r);
    const inner=cer.map(c=>node(c,cit.filter(v=>v.commune===c.commune).map(v=>node(v)).join(""))).join("")+cit.filter(v=>!cer.some(c=>c.commune===v.commune)).map(v=>node(v)).join("");
    const top=by("مكتب إقليم").filter(x=>x.region===r);
    return top.length?grp("🗺️ "+esc(tv(r)),top.map((tp,i)=>node(tp,i?"":inner)).join("")):grp("🗺️ "+esc(tv(r))+` <span class="count">(${t("noOffice")})</span>`,inner)}).join("");
  const nat=by(OFFICE_LEVELS[0]).map(x=>node(x)).join("")+by(OFFICE_LEVELS[1]).map(x=>node(x)).join("");
  return `<div class="sec"><ul class="otree">${nat?grp("🏛️ "+esc(tv(OFFICE_LEVELS[0]))+" / "+esc(tv(OFFICE_LEVELS[1])),nat):""}${bko?grp("🏙️ "+esc(tv(BAMAKO)),bko):""}${reg}</ul></div>`}
/* ================= البطاقات: العضوية · الأئمة · الدعاة =================
   تُصدَر من الإدارة، وتُحفظ في مجموعة cards، ولكل بطاقة رمز QR يفتح صفحة تحقّق عامة. */
let cards=[];
const CTYPES={
 member:{l:["بطاقة عضوية","Carte de membre"],ic:"🪪",code:"M",col:"#0f5132",col2:"#14704a"},
 imam:{l:["بطاقة إمام","Carte d'imam"],ic:"🕌",code:"I",col:"#1e3a8a",col2:"#2b4fb5"},
 daiya:{l:["بطاقة داعية","Carte de prédicateur"],ic:"🎙️",code:"D",col:"#7a2e0e",col2:"#a5481c"}
};
Object.assign(S,{
 cardsT:["البطاقات","Cartes"],cIssue:["➕ إصدار بطاقة","➕ Émettre une carte"],cNone:["لم تُصدر بطاقات بعد","Aucune carte émise"],
 cSource:["المصدر","Source"],cOffice:["المكتب","Bureau"],cPerson:["الشخص","Personne"],cMosque:["المسجد","Mosquée"],cDaiya:["الداعية","Prédicateur"],
 cManual:["— إدخال يدوي —","— Saisie manuelle —"],cName:["الاسم الكامل","Nom complet"],cTitle:["الصفة","Fonction"],cEntity:["الجهة","Entité"],
 cYears:["مدة الصلاحية (سنوات)","Validité (années)"],cPhoto:["الصورة الشخصية","Photo d'identité"],cPhotoHint:["صورة وجه واضحة بخلفية فاتحة","Photo de face, fond clair"],
 cSave:["💾 إصدار البطاقة","💾 Émettre"],cIssued:["✅ صدرت البطاقة","✅ Carte émise"],cNum:["رقم البطاقة","N° de carte"],
 cIssuedOn:["تاريخ الإصدار","Délivrée le"],cExp:["تنتهي في","Expire le"],cActive:["سارية","Valide"],cRevoked:["ملغاة","Annulée"],cExpired:["منتهية","Expirée"],
 cRevoke:["إلغاء البطاقة","Annuler la carte"],cRevokeQ:["إلغاء هذه البطاقة؟ ستظهر «ملغاة» عند التحقق منها.","Annuler cette carte ?"],cRestore:["إعادة تفعيل","Réactiver"],
 cView:["عرض وطباعة","Voir / imprimer"],cPrint:["🖨️ طباعة","🖨️ Imprimer"],cPng:["⬇️ صورة (PNG)","⬇️ Image (PNG)"],cFront:["الوجه","Recto"],cBack:["الظهر","Verso"],
 cBackTxt:["هذه البطاقة ملك لتجمع أهل السنة والجماعة في مالي، وهي شخصية لا تُعار. من وجدها فليُعِدها إلى أقرب مكتب للتجمع.","Cette carte est la propriété de la CSM. Elle est personnelle. Merci de la remettre au bureau le plus proche."],
 cScan:["امسح الرمز للتحقق","Scannez pour vérifier"],cPres:["رئيس التجمع","Le Président"],
 vT:["التحقق من بطاقة","Vérification de carte"],vOk:["✅ بطاقة صحيحة وسارية","✅ Carte authentique et valide"],vRev:["⛔ هذه البطاقة ملغاة","⛔ Cette carte a été annulée"],
 vExp:["⚠️ بطاقة صحيحة لكن انتهت صلاحيتها","⚠️ Carte authentique mais expirée"],vNo:["❌ لا توجد بطاقة بهذا الرقم","❌ Aucune carte ne correspond"],vHome:["فتح الدليل","Ouvrir l'annuaire"],
 setCards:["إعدادات البطاقات","Paramètres des cartes"],presName:["اسم رئيس التجمع (يُطبع على البطاقات)","Nom du Président (imprimé sur les cartes)"],
 cardYearsL:["مدة صلاحية البطاقة الافتراضية (سنوات)","Validité par défaut (années)"],
 tMember:["عضو","Membre"],tPres:["رئيس المكتب","Président du bureau"],tVice:["نائب رئيس المكتب","Vice-président du bureau"],
 tImam:["إمام وخطيب","Imam et prédicateur"],tImamR:["إمام راتب","Imam"],tDaiya:["داعية","Prédicateur"],tDaiyaF:["داعية","Prédicatrice"],
 cSearch:["بحث بالاسم أو الرقم...","Rechercher par nom ou numéro..."],cOnly:["تُصدر البطاقات من الإدارة","Les cartes sont émises par l'administration"]
});
const canIssue=()=>isAdmin()||isRegAdmin();
const cStatus=k=>k.status==="revoked"?"revoked":(k.expires&&new Date(k.expires)<new Date()?"expired":"active");
const cBadge=k=>{const s=cStatus(k);return `<span class="pill ${s==="active"?"ok":"pd"}">${s==="active"?"✅ "+t("cActive"):s==="revoked"?"⛔ "+t("cRevoked"):"⚠️ "+t("cExpired")}</span>`};
const dshort=d=>{try{return new Date(d).toLocaleDateString("fr-FR",{year:"numeric",month:"2-digit",day:"2-digit"})}catch(e){return ""}};
let cTab="member",cQ="";
APP.cTab=k=>{cTab=k;render()};APP.cq=v=>{cQ=v};

function renderCards(){
  if(!canIssue())return `<div class="empty">${t("cOnly")}</div>`;
  const q=cQ.trim().toLowerCase();
  const rows=cards.filter(k=>k.type===cTab&&(!q||(k.name+" "+k.num+" "+(k.entity||"")).toLowerCase().includes(q))).sort((a,b)=>String(b.issuedAt).localeCompare(String(a.issuedAt)));
  return `<div class="tools"><div class="chips">${Object.entries(CTYPES).map(([k,v])=>`<button class="chip ${cTab===k?"on":""}" onclick="APP.cTab('${k}')">${v.ic} ${L(v.l)} <span class="cnt">${fmt(cards.filter(z=>z.type===k).length)}</span></button>`).join("")}</div></div>
  <div class="tools"><div class="sbox"><input id="cq" placeholder="${esc(t("cSearch"))}" value="${esc(cQ)}" oninput="APP.cq(this.value);clearTimeout(window._cqt);window._cqt=setTimeout(()=>{render();const i=document.getElementById('cq');i.focus();i.setSelectionRange(i.value.length,i.value.length)},300)"></div>
   <button class="bp" onclick="APP.cardForm('${cTab}')">${t("cIssue")}</button><button class="bs" onclick="APP.cardBulk('${cTab}')">${t("cBulk")}</button><button class="bs" onclick="APP.phBulk()">${t("phBulk")}</button></div>
  ${rows.length?`<div class="tools"><button class="bs" onclick="APP.cSelAll(true)">${t("selAll")}</button>${cSel.size?`<button class="bs" onclick="APP.cSelAll(false)">${t("selNone")}</button><button class="bp" onclick="location.hash='cardsp/sel'">${t("prSel",{n:fmt(cSel.size)})}</button>`:""}<button class="bs" onclick="location.hash='cardsp/list'">${t("cPrintAll")}</button></div>`:""}
  ${rows.length?`<div class="list">${rows.map(k=>`<div class="it${cSel.has(k.id)?" sel":""}" onclick="location.hash='cardv/${esc(k.id)}'"><label class="csel" onclick="event.stopPropagation()"><input type="checkbox" ${cSel.has(k.id)?"checked":""} onchange="APP.cSel('${esc(k.id)}',this.checked,event)"></label><span class="st">${cStatus(k)==="active"?"✅":"⛔"}</span>${k.hasPhoto?"":`<span class="tag" style="background:#fff4e5;color:#9a5b00">📷 ${t("noPhoto")}</span>`}<h3>${esc(k.name)}</h3><div class="m">${esc(k.title||"")}${k.entity?" · "+esc(k.entity):""}</div><span class="tag" dir="ltr">${esc(k.num)}</span>${k.region?`<span class="tag">${esc(tv(k.region))}</span>`:""}</div>`).join("")}</div>`
   :`<div class="sec empty"><div style="font-size:40px">${CTYPES[cTab].ic}</div>${t("cNone")}</div>`}`;
}
// قائمة الأشخاص في هيكل مكتب
function officePeople(x){const st=x.struct||{},out=[];const P=(p,title)=>{if(p&&p.n)out.push({n:p.n,title})};
  P(st.pres,L(S.tPres));(st.vices||[]).forEach(p=>P(p,L(S.tVice)));(st.members||[]).forEach(p=>P(p,L(S.tMember)));
  (st.comms||[]).forEach(cm=>{const cn=tv(cm.name)||"";P(cm.head,(LANG==="fr"?"Président — ":"رئيس ")+cn);cm.vices.forEach(p=>P(p,(LANG==="fr"?"Vice-président — ":"نائب رئيس ")+cn));cm.members.forEach(p=>P(p,(LANG==="fr"?"Membre — ":"عضو ")+cn))});
  return out}
const inRegion=x=>isAdmin()||x.region===me.region;
APP.cardForm=type=>{
  const ty=CTYPES[type];let srcHtml="";
  if(type==="member")srcHtml=`<div class="full"><label>${t("cOffice")}</label><select id="k_src"><option value="">${t("cManual")}</option>${data.offices.filter(inRegion).map(o=>`<option value="${esc(o.id)}">${esc(o.name)}</option>`).join("")}</select></div>
     <div class="full" id="k_pw" hidden><label>${t("cPerson")}</label><select id="k_person"></select></div>`;
  if(type==="imam")srcHtml=`<div class="full"><label>${t("cMosque")}</label><select id="k_src"><option value="">${t("cManual")}</option>${data.mosques.filter(inRegion).filter(m=>m.imam).map(m=>`<option value="${esc(m.id)}">${esc(m.name)} — ${esc(m.imam)}</option>`).join("")}</select></div>`;
  if(type==="daiya")srcHtml=`<div class="full"><label>${t("cDaiya")}</label><select id="k_src"><option value="">${t("cManual")}</option>${data.duat.filter(d=>isAdmin()||d.region===me.region).map(d=>`<option value="${esc(d.id)}">${esc(d.name)}</option>`).join("")}</select></div>`;
  const yrs=num((CONFIG.site||{}).cardYears)||2;
  $("#dt").textContent=ty.ic+" "+L(ty.l);
  $("#dbody").innerHTML=`<form id="kfrm"><div class="db"><div class="fg">
    ${srcHtml}
    <div class="full"><label>${t("cName")} <b>*</b></label><input id="k_name" required></div>
    <div><label>${t("cTitle")}</label><input id="k_title"></div>
    <div><label>${t("cEntity")}</label><input id="k_entity"></div>
    <div><label>${t("region")}</label><select id="k_region" ${isAdmin()?"":"disabled"}><option value="">—</option>${REGIONS.map(r=>`<option value="${r}" ${!isAdmin()&&r===me.region?"selected":""}>${esc(tv(r))}</option>`).join("")}</select></div>
    <div><label>${t("cYears")}</label><input id="k_years" type="number" min="1" max="10" value="${yrs}"></div>
    <div class="full"><label>📷 ${t("cPhoto")}</label><input type="file" id="k_photo" accept="image/*" capture="user"><div class="hint">${t("cPhotoHint")}</div><img id="k_prev" class="phprev" hidden alt=""></div>
   </div><div class="err" id="kerr"></div></div>
   <div class="df"><button class="bp" type="submit">${t("cSave")}</button><button class="bs" type="button" onclick="document.getElementById('dlg').close()">${t("cancel")}</button></div></form>`;
  if(!dlg.open)dlg.showModal();
  let photo=null;
  const setPh=d=>{photo=d;const im=$("#k_prev");if(d){im.src=d;im.hidden=false}};
  $("#k_photo").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{setPh(await compressImage(f,520,.7))}catch(err){toast(t("photoErr"))}};
  const fill=(o)=>{["name","title","entity"].forEach(k=>{if(o[k]!==undefined)$("#k_"+k).value=o[k]});if(o.region!==undefined&&isAdmin())$("#k_region").value=o.region};
  const src=$("#k_src");
  if(src)src.onchange=()=>{const id=src.value;
    if(type==="member"){const pw=$("#k_pw"),ps=$("#k_person");const o=data.offices.find(z=>z.id===id);
      if(!o){pw.hidden=true;return}const pp=officePeople(o);pw.hidden=!pp.length;
      ps.innerHTML=`<option value="">—</option>`+pp.map((p,i)=>`<option value="${i}">${esc(p.n)} — ${esc(p.title)}</option>`).join("");
      ps.onchange=()=>{const p=pp[+ps.value];if(p)fill({name:p.n,title:p.title})};
      fill({entity:o.name,region:o.region||"",title:L(S.tMember)})}
    if(type==="imam"){const m=data.mosques.find(z=>z.id===id);if(m)fill({name:m.imam,title:m.khatib&&m.khatib.trim()!==m.imam.trim()?L(S.tImamR):L(S.tImam),entity:m.name,region:m.region})}
    if(type==="daiya"){const d=data.duat.find(z=>z.id===id);if(d){fill({name:d.name,title:d.gender==="داعية (امرأة)"?L(S.tDaiyaF):L(S.tDaiya),entity:d.inst||"",region:d.region||""});
      if(d.hasPhoto)store.getPhoto(pkey("duat",id)).then(p=>{if(okImg(p)&&!photo)setPh(okImg(p))})}}};
  if(type!=="member")fill({title:type==="imam"?L(S.tImam):L(S.tDaiya)});else fill({title:L(S.tMember)});
  $("#kfrm").onsubmit=async e=>{e.preventDefault();
    const name=$("#k_name").value.trim();if(!name){$("#kerr").textContent=t("fill")+t("cName");return}
    const region=isAdmin()?$("#k_region").value:me.region;
    const yrsN=Math.min(10,Math.max(1,num($("#k_years").value)||2));
    const now=new Date(),exp=new Date(now);exp.setFullYear(exp.getFullYear()+yrsN);
    const rc=String(Math.max(0,REGIONS.indexOf(region))).padStart(2,"0"),yy=String(now.getFullYear()).slice(2);
    const pre=`CSM-${ty.code}-${yy}-${rc}-`;
    const seq=1+cards.filter(k=>k.num&&k.num.startsWith(pre)).reduce((a,k)=>Math.max(a,parseInt(k.num.slice(pre.length))||0),0);
    const id=newId();
    const o={type,name,title:$("#k_title").value.trim(),entity:$("#k_entity").value.trim(),region,num:pre+String(seq).padStart(4,"0"),
      issuedAt:now.toISOString(),expires:exp.toISOString(),status:"active",hasPhoto:!!photo,srcId:src?src.value:"",by:me.uid,byName:me.name||""};
    try{await store.saveCard(id,o);if(photo)await store.savePhoto("cards__"+id,photo);logAct("add","cards",id,o.name+" · "+o.num,null);
      dlg.close();toast(t("cIssued"));location.hash="cardv/"+id}catch(err){$("#kerr").textContent=errMsg(err)}};
};
APP.cardRevoke=async(id,on)=>{const k=cards.find(z=>z.id===id);if(!k)return;if(on&&!confirm(t("cRevokeQ")))return;
  await store.saveCard(id,{...k,id:undefined,status:on?"revoked":"active",updatedAt:new Date().toISOString(),updatedBy:me.uid});logAct(on?"delete":"edit","cards",id,k.name+" · "+k.num,null);render()};

// رسم البطاقة (الوجه والظهر)
function cardFace(k){const ty=CTYPES[k.type]||CTYPES.member,pres=(CONFIG.site||{}).presName||"";
  return `<div class="idc" style="--c1:${ty.col};--c2:${ty.col2}" id="idc_front">
   <div class="idh"><img class="idl" src="logo.png" alt=""><div class="idn"><b>تجمع أهل السنة والجماعة في مالي</b><small>Communauté Sunnite du Mali — CSM</small></div><img class="idf" src="mali-flag.svg" alt=""></div>
   <div class="idt"><span>${ty.l[0]}</span><span dir="ltr">${ty.l[1]}</span></div>
   <div class="idb"><div class="idp" id="idp">${k.hasPhoto?"":"👤"}</div>
    <div class="idd"><div class="idname">${esc(k.name)}</div>${k.title?`<div class="idr">${esc(k.title)}</div>`:""}${k.entity?`<div class="idr2">${esc(k.entity)}</div>`:""}${k.region?`<div class="idr2">📍 ${esc(k.region===BAMAKO?"مقاطعة بماكو":k.region)} · <span dir="ltr">${esc(FRV[k.region]||"")}</span></div>`:""}
     <div class="idnum" dir="ltr">${esc(k.num)}</div></div></div>
   <div class="idfoot"><span>الإصدار ${dshort(k.issuedAt)} Délivrée</span><span>الانتهاء ${dshort(k.expires)} Expire</span></div></div>`}
function cardBack(k){const ty=CTYPES[k.type]||CTYPES.member,s=CONFIG.site||{};
  return `<div class="idc back" style="--c1:${ty.col};--c2:${ty.col2}" id="idc_back">
   <div class="idbk"><div class="idq" id="idq"></div><div class="idbt"><p>${S.cBackTxt[0]}</p><p dir="ltr" class="fr">${S.cBackTxt[1]}</p>
    ${s.phone?`<p dir="ltr" class="ph">☎ ${esc(s.phone)}</p>`:""}</div></div>
   <div class="idsig"><div><small>${S.cPres[0]} · ${S.cPres[1]}</small><div class="sgl"></div><b>${esc(s.presName||"")}</b></div><div class="idqs">${S.cScan[0]}<br><span dir="ltr">${S.cScan[1]}</span></div></div>
   <div class="idstripe"></div></div>`}
function renderCardView(id){
  const k=cards.find(z=>z.id===id);if(!k)return `<div class="empty">—</div>`;
  const st=cStatus(k);
  return `<div class="tools noprint"><a class="back" href="#cards">${t("back")}</a>${cBadge(k)}<button class="bp" onclick="print()">${t("prOne")}</button>${canIssue()?`<button class="bs" onclick="APP.cPh('${esc(id)}','idp',true)">${t("phCam")}</button><button class="bs" onclick="APP.cPh('${esc(id)}','idp')">${t("phGal")}</button>${k.hasPhoto?`<button class="bs" onclick="APP.cPhDel('${esc(id)}')">${t("phDel")}</button>`:""}`:""}<button class="bs" onclick="APP.cardPng('${esc(id)}')">${t("cPng")}</button>
   ${isAdmin()||isRegAdmin(k.region)?(st==="revoked"?`<button class="bs" onclick="APP.cardRevoke('${esc(id)}',false)">${t("cRestore")}</button>`:`<button class="bs" style="color:#b42318" onclick="APP.cardRevoke('${esc(id)}',true)">⛔ ${t("cRevoke")}</button>`):""}</div>
   <div class="cardsheet"><div><div class="count noprint">${t("cFront")}</div>${canIssue()?cardFace(k).replace('id="idp"',`id="idp" onclick="APP.cPh('${esc(id)}','idp')" title="📷"`):cardFace(k)}</div><div><div class="count noprint">${t("cBack")}</div>${cardBack(k)}</div></div>`}
const verifyUrl=id=>location.origin+location.pathname+"#verify/"+encodeURIComponent(id);
async function afterCardView(id){const k=cards.find(z=>z.id===id);if(!k)return;fillSig();
  if(k.hasPhoto)store.getPhoto("cards__"+id).then(d=>{const el=$("#idp");if(el&&okImg(d))el.innerHTML=`<img src="${okImg(d)}" alt="">`});
  try{await loadScript("lib/qrcode.js");const q=window.qrcode(0,"M");q.addData(verifyUrl(id));q.make();const el=$("#idq");if(el)el.innerHTML=q.createSvgTag({cellSize:3,margin:1})}catch(e){}}
APP.cardPng=async id=>{const k=cards.find(z=>z.id===id);if(!k)return;
  try{await loadScript("lib/html2canvas.min.js");
    for(const [sel,suf] of [["#idc_front","recto"],["#idc_back","verso"]]){const el=$(sel),z=el.style.zoom;el.style.zoom="1";let cv;try{cv=await window.html2canvas(el,{scale:4,backgroundColor:null,useCORS:true})}finally{el.style.zoom=z}
      const a=document.createElement("a");a.href=cv.toDataURL("image/png");a.download=`${k.num}-${suf}.png`;document.body.appendChild(a);a.click();a.remove()}}
  catch(e){toast(errMsg(e))}};
// صفحة التحقق العامة (تعمل دون تسجيل دخول)
async function renderVerify(id){
  document.body.classList.add("noside");$("#fab").style.display="none";
  const m=$("#main");m.innerHTML=`<div class="empty">${t("loading")}</div>`;
  let k=null;try{k=await store.getCard(id)}catch(e){}
  if(!k){m.innerHTML=`<div class="vbox"><img src="logo.png" alt=""><h2>${t("vT")}</h2><div class="vres no">${t("vNo")}</div><a class="bs btnl" href="#home">${t("vHome")}</a></div>`;return}
  const st=cStatus(k),ty=CTYPES[k.type]||CTYPES.member;
  let ph="";if(k.hasPhoto){try{const d=await store.getPhoto("cards__"+id);if(okImg(d))ph=`<img class="vph" src="${okImg(d)}" alt="">`}catch(e){}}
  m.innerHTML=`<div class="vbox"><img src="logo.png" alt=""><h2>${t("vT")}</h2>
   <div class="vres ${st}">${st==="active"?t("vOk"):st==="revoked"?t("vRev"):t("vExp")}</div>
   ${ph}<div class="vname">${esc(k.name)}</div><div class="count">${ty.ic} ${L(ty.l)} · <span dir="ltr">${esc(k.num)}</span></div>
   ${k.title?`<div>${esc(k.title)}</div>`:""}${k.entity?`<div>${esc(k.entity)}</div>`:""}${k.region?`<div>📍 ${esc(tv(k.region))}</div>`:""}
   <div class="count">${t("cIssuedOn")}: ${dshort(k.issuedAt)} · ${t("cExp")}: ${dshort(k.expires)}</div>
   <a class="bs btnl" href="#home" style="margin-top:12px">${t("vHome")}</a></div>`}
/* ================= التقرير الشهري للقيادة العامة =================
   يُحسب تلقائياً من البيانات: ما أُضيف وما وُثّق في الشهر، حسب القسم والإقليم، ونشاط المندوبين،
   والمكاتب الجديدة، والبطاقات الصادرة، ومقارنة بالشهر السابق. قابل للطباعة PDF. */
Object.assign(S,{
 mrT:["التقرير الشهري","Rapport mensuel"],mrMonth:["الشهر","Mois"],mrPrint:["🖨️ طباعة / PDF","🖨️ Imprimer / PDF"],
 mrAdded:["أُضيف هذا الشهر","Ajouts du mois"],mrVerified:["وُثّق هذا الشهر","Vérifiés du mois"],mrTotal:["الإجمالي حتى نهاية الشهر","Total en fin de mois"],
 mrVsPrev:["مقارنة بالشهر السابق","vs mois précédent"],mrByCat:["حسب القسم","Par catégorie"],mrByReg:["حسب الإقليم","Par région"],
 mrTopDel:["أنشط المندوبين","Délégués les plus actifs"],mrNewOff:["المكاتب الجديدة","Nouveaux bureaux"],mrCards:["البطاقات الصادرة","Cartes émises"],
 mrNone:["لا شيء هذا الشهر","Rien ce mois-ci"],mrPending:["بانتظار التوثيق (الكل)","En attente de vérification (total)"],
 mrSummary:["الخلاصة","Synthèse"],mrSilent:["أقاليم بلا نشاط هذا الشهر","Régions sans activité ce mois"],
 mrReady:["📊 تقرير شهر {m} جاهز","📊 Le rapport de {m} est prêt"],mrOpen:["فتح التقرير","Ouvrir"],mrEntries:["إدخالات","saisies"],
 mrAll:["كل الأقاليم","Toutes les régions"],mrGen:["أُعدّ تلقائياً في {d}","Généré automatiquement le {d}"]
});
const canReport=()=>isAdmin()||isRegAdmin()||isAdmCom();
let mrMonth="";
const ym=d=>String(d||"").slice(0,7);
const monthName=m=>{try{const [y,mm]=m.split("-");return new Date(+y,+mm-1,15).toLocaleDateString(LANG==="fr"?"fr-FR":"ar-u-nu-latn",{month:"long",year:"numeric"})}catch(e){return m}};
const prevMonth=m=>{const [y,mm]=m.split("-").map(Number);const d=new Date(y,mm-2,15);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")};
const lastMonth=()=>prevMonth(new Date().toISOString().slice(0,7));
APP.mrSet=v=>{mrMonth=v;render()};
function renderMonthly(){
  if(!canReport())return `<div class="empty">${t("adminOnly")}</div>`;
  const m=mrMonth||lastMonth(),pm=prevMonth(m);
  const scope=x=>isAdmin()||isAdmCom()||x.region===me.region;
  const cats=ALLC.filter(c=>c!=="offices"||canOffices());
  const all=c=>(data[c]||[]).filter(scope);
  const added=(c,mm)=>all(c).filter(x=>ym(x.createdAt)===mm);
  const verif=(c,mm)=>all(c).filter(x=>x.status==="verified"&&ym(x.verifiedAt)===mm);
  const upto=(c,mm)=>all(c).filter(x=>ym(x.createdAt)<=mm);
  const sum=f=>cats.reduce((a,c)=>a+f(c).length,0);
  const A=sum(c=>added(c,m)),Ap=sum(c=>added(c,pm)),V=sum(c=>verif(c,m)),T=sum(c=>upto(c,m)),P=sum(c=>all(c).filter(x=>x.status!=="verified"));
  const delta=(a,b)=>{const d=a-b;if(!d)return `<span class="count">—</span>`;return `<span class="${d>=0?"up":"down"}">${d>=0?"▲":"▼"} ${fmt(Math.abs(d))}</span>`};
  // حسب الإقليم
  const regs=REGIONS.filter(r=>isAdmin()||isAdmCom()||r===me.region);
  const byReg=regs.map(r=>[r,cats.reduce((a,c)=>a+added(c,m).filter(x=>x.region===r).length,0)]).sort((a,b)=>b[1]-a[1]);
  const maxR=Math.max(1,...byReg.map(z=>z[1]));
  const silent=byReg.filter(z=>!z[1]).map(z=>tv(z[0]));
  // المندوبون
  const del={};cats.forEach(c=>added(c,m).forEach(x=>{const k=x.createdByName||"—";del[k]=(del[k]||0)+1}));
  const dels=Object.entries(del).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const newOff=canOffices()?added("offices",m):[];
  const crd=canIssue()?cards.filter(k=>ym(k.issuedAt)===m&&(isAdmin()||k.region===me.region)):[];
  const months=[...new Set([new Date().toISOString().slice(0,7),...cats.flatMap(c=>all(c).map(x=>ym(x.createdAt)))].filter(Boolean))].sort().reverse().slice(0,24);
  if(!months.includes(m))months.push(m);
  return `<div class="tools noprint"><label>${t("mrMonth")}</label><select onchange="APP.mrSet(this.value)">${months.map(x=>`<option value="${x}" ${x===m?"selected":""}>${esc(monthName(x))}</option>`).join("")}</select><button class="bp" onclick="print()">${t("mrPrint")}</button></div>
  <div class="rep mrep">
   <div class="mrh"><img src="logo.png" alt=""><div><h2>${t("mrT")} — ${esc(monthName(m))}</h2><div class="count">${t("org")} · ${isAdmin()||isAdmCom()?t("mrAll"):esc(tv(me.region))}</div></div><img src="mali-flag.svg" class="mrf" alt=""></div>
   <div class="kpis">
    <div class="kpi"><b>${fmt(A)}</b><span>${t("mrAdded")}</span><small>${t("mrVsPrev")}: ${delta(A,Ap)}</small></div>
    <div class="kpi"><b>${fmt(V)}</b><span>${t("mrVerified")}</span></div>
    <div class="kpi"><b>${fmt(T)}</b><span>${t("mrTotal")}</span></div>
    <div class="kpi"><b>${fmt(P)}</b><span>${t("mrPending")}</span></div>
   </div>
   <h3>${t("mrByCat")}</h3>
   <table><tr><th></th><th>${t("mrAdded")}</th><th>${t("mrVerified")}</th><th>${t("mrTotal")}</th><th>${t("mrVsPrev")}</th></tr>
    ${cats.map(c=>`<tr><td>${CATS[c].ic} ${esc(L(CATS[c].label))}</td><td>${fmt(added(c,m).length)}</td><td>${fmt(verif(c,m).length)}</td><td>${fmt(upto(c,m).length)}</td><td>${delta(added(c,m).length,added(c,pm).length)}</td></tr>`).join("")}</table>
   <h3>${t("mrByReg")}</h3>
   <div class="mbars">${byReg.filter(z=>z[1]).map(([r,n])=>`<div class="mb"><span>${esc(tv(r))}</span><div><i style="width:${n/maxR*100}%"></i></div><b>${fmt(n)}</b></div>`).join("")||`<div class="hint">${t("mrNone")}</div>`}</div>
   ${silent.length&&silent.length<byReg.length?`<div class="hint">⚠️ ${t("mrSilent")}: ${silent.map(esc).join("، ")}</div>`:""}
   <div class="cols2">
    <div><h3>${t("mrTopDel")}</h3>${dels.length?`<ol>${dels.map(([n,c])=>`<li>${esc(n)} — <b>${fmt(c)}</b> ${t("mrEntries")}</li>`).join("")}</ol>`:`<div class="hint">${t("mrNone")}</div>`}</div>
    ${canOffices()?`<div><h3>${t("mrNewOff")}</h3>${newOff.length?`<ul>${newOff.map(o=>`<li>${esc(o.name)} <span class="count">(${esc(tv(o.level))})</span></li>`).join("")}</ul>`:`<div class="hint">${t("mrNone")}</div>`}</div>`:""}
   </div>
   ${canIssue()?`<h3>${t("mrCards")}</h3>${crd.length?`<div>${Object.keys(CTYPES).map(k=>`${CTYPES[k].ic} ${L(CTYPES[k].l)}: <b>${fmt(crd.filter(z=>z.type===k).length)}</b>`).join(" · ")}</div>`:`<div class="hint">${t("mrNone")}</div>`}`:""}
   <div class="hint" style="margin-top:16px;text-align:center">${t("mrGen",{d:new Date().toLocaleDateString("fr-FR")})} · ${t("appName")}</div>
  </div>`;
}
// تنبيه في الرئيسية خلال الأيام السبعة الأولى من كل شهر
function monthlyNotice(){
  if(!canReport()||new Date().getDate()>7)return "";
  const m=lastMonth();if(ls.get("csm-mr-seen","")===m)return "";
  return `<div class="banner mrb">${t("mrReady",{m:esc(monthName(m))})} <button class="bp sm" onclick="localStorage.setItem('csm-mr-seen',JSON.stringify('${m}'));APP.mrSet('${m}');location.hash='monthly'">${t("mrOpen")}</button></div>`;
}
/* ================= استيراد حزمة بيانات جاهزة (JSON) =================
   حزمة يُعدّها فريق الدعم من وثائق التجمع: {offices:[…], mosques:[…], schools:[…] …}
   كل ما يُستورد يدخل «قيد المراجعة»، ويُتخطّى ما هو موجود بالاسم نفسه. للمشرف العام فقط. */
Object.assign(S,{
 jiT:["📦 استيراد حزمة بيانات جاهزة (JSON)","📦 Importer un paquet de données (JSON)"],
 jiHint:["حزمة يُعدّها فريق الدعم من وثائق التجمع (مكاتب بهياكلها ولجانها، مساجد…). يدخل كل شيء «قيد المراجعة»، ويُتخطّى المكرر.","Paquet préparé à partir des documents de la CSM. Tout entre « en attente » ; les doublons sont ignorés."],
 jiFile:["📂 اختيار ملف الحزمة","📂 Choisir le fichier"],jiBad:["الملف ليس حزمة بيانات صالحة","Fichier invalide"],
 jiPrev:["في الحزمة: {s}. اضغط «استيراد» للمتابعة.","Le paquet contient : {s}. Cliquez « Importer »."],jiGo:["⬆️ استيراد","⬆️ Importer"],
 jiDone:["✅ استُورد {n} سجلا، وتُخطّي {k} مكرر","✅ {n} importé(s), {k} doublon(s) ignoré(s)"],jiWork:["جارٍ الاستيراد… {n}","Import… {n}"]
});
let jiPack=null,jiMsg="";
const jStr=v=>typeof v==="string"?v.trim().slice(0,400):(typeof v==="number"?String(v):"");
const jP=p=>p&&(p.n||p.p)?{n:jStr(p.n),p:jStr(p.p)}:null;
const jL=a=>Array.isArray(a)?a.map(jP).filter(Boolean).slice(0,300):[];
function jStruct(s){s=s||{};return {pres:jP(s.pres),vices:jL(s.vices),members:jL(s.members),
  comms:(Array.isArray(s.comms)?s.comms:[]).slice(0,60).map(c=>({name:jStr(c.name),head:jP(c.head),vices:jL(c.vices),members:jL(c.members)}))}}
APP.jiFile=async f=>{if(!f)return;const box=$("#jiRes");
  try{const d=JSON.parse(await f.text());const cats=ALLC.filter(c=>Array.isArray(d[c])&&d[c].length);if(!cats.length)throw 0;
    jiPack=d;box.innerHTML=`<div class="banner">${t("jiPrev",{s:cats.map(c=>`${CATS[c].ic} ${cl(c)}: <b>${fmt(d[c].length)}</b>`).join(" · ")})}</div><button class="bp" onclick="APP.jiGo()">${t("jiGo")}</button>`}
  catch(e){jiPack=null;box.innerHTML=`<div class="err">${t("jiBad")}</div>`}};
APP.jiGo=async()=>{if(!jiPack||!isAdmin())return;const box=$("#jiRes"),t0=Date.now();let n=0,k=0;
  for(const c of ALLC){const arr=Array.isArray(jiPack[c])?jiPack[c]:[];const fields=fieldsOf(c).map(f=>f.k);
    for(const r of arr){const name=jStr(r.name);if(!name){k++;continue}
      if(data[c].some(x=>x.name===name&&(x.quarter||"")===jStr(r.quarter)&&(x.region||"")===jStr(r.region))){k++;continue}
      const o={};fields.forEach(f=>{if(f!=="phone"&&r[f]!==undefined&&typeof r[f]!=="object")o[f]=jStr(r[f])});
      if(o.region&&!REGIONS.includes(o.region))o.region="";
      if(c==="offices"){if(!OFFICE_LEVELS.includes(o.level)){k++;continue}o.struct=jStruct(r.struct);o.president=(o.struct.pres&&o.struct.pres.n)||"";o.people=structCount(o.struct)}
      const now=new Date(t0+n+k).toISOString();Object.assign(o,{status:"pending",createdAt:now,updatedAt:now,createdBy:me.uid,createdByName:me.name||"",updatedBy:me.uid,updatedByName:me.name||"",source:"json"});
      const id=newId();await store.save(c,id,o);if(r.phone)await store.savePhone(c,id,jStr(r.phone));n++;
      if(n%5===0&&$("#jiRes"))$("#jiRes").innerHTML=`<div class="banner">${t("jiWork",{n:fmt(n)})}</div>`}}
  logAct("add","import","json",`JSON: ${n}`,null);jiPack=null;jiMsg=t("jiDone",{n:fmt(n),k:fmt(k)});const bx=$("#jiRes");if(bx)bx.innerHTML=`<div class="banner">${t("jiDone",{n:fmt(n),k:fmt(k)})}</div>`;toast(t("jiDone",{n:fmt(n),k:fmt(k)}))};
function jsonImportBox(){return isAdmin()?`<div class="sec"><h2>${t("jiT")}</h2><div class="hint">${t("jiHint")}</div>
  <div class="tools" style="margin-top:10px"><label class="bp filebtn">${t("jiFile")}<input type="file" accept=".json,application/json" onchange="APP.jiFile(this.files[0])" hidden></label></div><div id="jiRes">${jiMsg?`<div class="banner">${jiMsg}</div>`:""}</div></div>`:""}

/* ================= الرقم الخاص لكل سجل (رقم التعريف) =================
   الصيغة: رمز الإقليم - رمز الصنف - رقم تسلسلي، مثل KLK-M-0012 (مسجد رقم 12 في كوليكورو).
   يُعطى الرقم تلقائيا من جهاز المشرف العام عند الاتصال بالإنترنت، ولا يتغير بعد ذلك ولو تغيّر الإقليم. */
const REG_CODE={"مقاطعة باماكو":"BKO","كاي":"KYS","كوليكورو":"KLK","سيكاسو":"SKS","سيغو":"SGU","موبتي":"MPT","تمبكتو":"TBK","غاو":"GAO","كيدال":"KDL","تاوديني":"TDN","ميناكا":"MNK","بوغوني":"BGN","ديويلا":"DLA","نيورو الساحل":"NRO","كيتا":"KTA","كوتيالا":"KTL","نارا":"NRA","بانديغارا":"BDG","سان":"SAN","دوينتزا":"DTZ"};
const CAT_CODE={mosques:"M",schools:"E",centers:"C",duat:"D",assoc:"A",media:"P",offices:"B"};
// المساجد ترقيم وطني واحد متسلسل (رمز الإقليم للدلالة فقط)، وبقية الأصناف ترقيم داخل كل إقليم
// المساجد: 1 = المقر، ثم مساجد باماكو (2…500)، ثم الأقاليم من 501 فما بعده
const REG_START=501;
const codeKey=(c,x)=>c==="mosques"?(x.region===BAMAKO?"M-BKO":"M-ALL"):(CAT_CODE[c]||"X")+"-"+(REG_CODE[x.region]||"ML");
const codeOf=(k,n,x)=>{const [cc,rr]=k.split("-");return (rr==="ALL"?(REG_CODE[x&&x.region]||"ML"):rr)+"-"+cc+"-"+String(n).padStart(4,"0")};
const codeTag=x=>x&&x.code?`<span class="code" dir="ltr">🔢 ${esc(x.code)}</span>`:"";
// الرقم الأول محجوز لجامع ماغامبا دومبيا، مقر تجمع أهل السنة والجماعة في مالي: BKO-M-0001
const HQ_KEY="M-BKO",HQ_CODE="BKO-M-0001";
const normAr=v=>String(v||"").replace(/[\u064B-\u0652\u0640]/g,"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").toLowerCase();
const isHQ=x=>{const n=normAr(x.name);return /(ماغامبا|مغامبا|ماقامبا|ماغمبا|magh?amba)/.test(n)};
let _numBusy=false,_numFail=0;
async function autoNumber(){
  if(_numBusy||!store||!store.alloc||!me||!isAdmin()||!navigator.onLine||_numFail>=3)return;
  const groups={};
  ORDER.forEach(c=>(data[c]||[]).forEach(x=>{if(!x.code&&x.name){const k=codeKey(c,x);(groups[k]=groups[k]||[]).push([c,x])}}));
  const keys=Object.keys(groups);if(!keys.length)return;
  _numBusy=true;let done=0;
  try{
    for(const k of keys){
      let g=groups[k].sort((a,b)=>String(a[1].createdAt||"").localeCompare(String(b[1].createdAt||"")));
      if(k===HQ_KEY){const hq=g.find(([c,x])=>c==="mosques"&&isHQ(x));
        if(hq&&!data.mosques.some(x=>x.code===HQ_CODE)){hq[1].code=HQ_CODE;await store.patch("mosques",hq[1].id,{code:HQ_CODE});done++;g=g.filter(z=>z!==hq)}
        if(!g.length)continue}
      // للمساجد: لا يقل التسلسل عن أكبر رقم مستعمل، فلا يتكرر رقم أبدا
      const mx=f=>Math.max(0,...data.mosques.filter(f).map(x=>parseInt(String(x.code||"").slice(-4))||0));
      const base=k==="M-BKO"?Math.max(1,mx(x=>x.region===BAMAKO)):k==="M-ALL"?Math.max(REG_START-1,mx(x=>x.region!==BAMAKO)):0;
      const start=await store.alloc(k,g.length,base);
      for(let i=0;i<g.length;i++){const [c,x]=g[i];const code=codeOf(k,start+i,x);x.code=code;await store.patch(c,x.id,{code});done++}
    }
    _numFail=0;
  }catch(e){_numFail++;console.warn("autoNumber",e)}
  finally{_numBusy=false}
  if(done)render();
}
setInterval(autoNumber,15000);
window.addEventListener("online",()=>{_numFail=0;setTimeout(autoNumber,3000)});
APP.copyCode=async v=>{try{await navigator.clipboard.writeText(v);toast(t("codeCopied")+": "+v)}catch(e){}};
setTimeout(autoNumber,5000);

/* ---------- إعادة ترقيم المساجد: المقر أولا، ثم مديريات باماكو بالترتيب، ثم الأقاليم بترتيبها ---------- */
function mosqueOrder(){
  const ri=r=>{const i=REGIONS.indexOf(r);return i<0?999:i};
  // داخل الإقليم: دائرة العاصمة (التي تحمل اسم الإقليم) أولا، ثم بقية الدوائر بترتيبها
  const ci=x=>{if(x.region!==BAMAKO&&x.commune&&String(x.region).startsWith(x.commune))return -1;const list=x.region===BAMAKO?DIRECTORATES:(CERCLES[x.region]||[]);const i=list.indexOf(x.commune);return i<0?999:i};
  return [...data.mosques].sort((a,b)=>(isHQ(b)-isHQ(a))||ri(a.region)-ri(b.region)||ci(a)-ci(b)||String(a.createdAt||"").localeCompare(String(b.createdAt||""))||String(a.name).localeCompare(String(b.name)))}
APP.renumM=async()=>{if(!isAdmin())return;
  const list=mosqueOrder();if(!list.length)return;
  if(!confirm(t("rnQ",{n:fmt(list.length)})))return;
  _numBusy=true;let ch=0;
  try{const bko=list.filter(x=>x.region===BAMAKO&&!isHQ(x)),reg=list.filter(x=>x.region!==BAMAKO),hq=list.find(isHQ);
    const regStart=Math.max(REG_START,bko.length+2),plan=[];
    if(hq)plan.push([hq,"M-BKO",1]);
    bko.forEach((x,i)=>plan.push([x,"M-BKO",i+2]));
    reg.forEach((x,i)=>plan.push([x,"M-ALL",regStart+i]));
    try{await store.alloc("M-BKO",0,bko.length+1)}catch(e){}
    try{await store.alloc("M-ALL",0,regStart-1+reg.length)}catch(e){}
    for(const [x,k,n] of plan){const code=codeOf(k,n,x);if(x.code!==code){x.code=code;await store.patch("mosques",x.id,{code});ch++}}
    logAct("edit","settings","",`renumber mosques ${ch}/${plan.length}`,null);toast(t("rnDone",{n:fmt(ch)}))}
  catch(e){toast(errMsg(e))}finally{_numBusy=false;render()}};
function renumBox(){return `<div class="sec"><h2>🔢 ${t("rnT")}</h2><div class="hint">${t("rnHint")}</div><button class="bp" style="margin-top:8px" onclick="APP.renumM()">${t("rnB")}</button></div>`}
Object.assign(S,{rnT:["إعادة ترقيم المساجد","Renuméroter les mosquées"],rnHint:["رقم 1 دائما لجامع ماغامبا دومبيا (مقر التجمع)، ثم مساجد باماكو من 2 بترتيب المديريات (الأولى فالثانية…)، ثم الأقاليم من 501 بترتيبها (كاي، كوليكورو، سيكاسو، سيغو…)، وداخل كل إقليم حسب الدوائر. المسجد الجديد في باماكو يأخذ الرقم التالي لمساجد باماكو، وفي الأقاليم التالي لمساجد الأقاليم. ويمكن إعادة الترقيم متى شئت.","Numérotation nationale unique : 1 = Mosquée Maghamba Doumbia, puis les directions de Bamako, puis les régions dans l'ordre."],
 rnB:["🔢 إعادة الترقيم الآن","🔢 Renuméroter maintenant"],rnQ:["إعادة ترقيم {n} مسجدا؟ ستتغير أرقامها الحالية.","Renuméroter {n} mosquées ?"],rnDone:["✅ أُعيد ترقيم {n} مسجدا","✅ {n} mosquée(s) renumérotée(s)"]});

/* ================= اللصق المباشر =================
   ينسخ المستخدم صفوفا من Excel أو Word أو واتساب ويلصقها، فتتحول إلى سجلات أو بطاقات دفعة واحدة. */
Object.assign(S,{
 pasteT:["📋 لصق مباشر لمجموعة من المؤسسات","📋 Coller directement une liste"],
 pasteHint:["انسخ الصفوف من Excel (مع سطر العناوين أو بدونه) أو اكتب كل مؤسسة في سطر، وافصل الخانات بعلامة | أو بفاصلة. إذا لم يكن سطر العناوين موجودا فترتيب الخانات هو:","Copiez les lignes depuis Excel (avec ou sans en-têtes), ou une fiche par ligne avec des champs séparés par | ou virgule. Sans en-têtes, l'ordre des colonnes est :"],
 pastePh:["مثال:\nمسجد النور | كوليكورو | كاتي | | حي المحطة","Exemple :\nMosquée An-Nour | Koulikoro | Kati | | Quartier Gare"],
 pasteDefReg:["الإقليم الافتراضي (لمن لم يُذكر إقليمه)","Région par défaut (si absente)"],
 pasteRead:["👁️ معاينة","👁️ Aperçu"],pasteEmpty:["الصق الصفوف أولا","Collez d'abord des lignes"],
 impSkip:["تُخطّي {n} مكرر","{n} doublon(s) ignoré(s)"],
 cBulk:["📋 إصدار جماعي","📋 Émission groupée"],
 cBulkSrc:["طريقة الإصدار","Mode d'émission"],cBulkPaste:["لصق قائمة أسماء","Coller une liste de noms"],
 cBulkOffice:["كل أعضاء مكتب","Tous les membres d'un bureau"],cBulkMosq:["أئمة كل مساجد إقليم","Imams de toutes les mosquées d'une région"],cBulkDuat:["كل دعاة إقليم","Tous les prédicateurs d'une région"],
 cBulkHint:["سطر لكل شخص: الاسم | الصفة | الجهة. (الصفة والجهة اختياريتان)","Une personne par ligne : Nom | Fonction | Entité (facultatifs)"],
 cBulkPh:["مثال:\nأبوبكر جكتي | إمام وخطيب | جامع أهل السنة — كوليكورو\nعمر جف دكوري","Exemple :\nBakary Diakité | Imam | Mosquée de Koulikoro"],
 cBulkPrev:["سيصدر {n} بطاقة، وتُخطّى {k} لأصحابها بطاقة سارية","{n} carte(s) à émettre, {k} ignorée(s) (carte déjà valide)"],
 cBulkGo:["💾 إصدار البطاقات","💾 Émettre les cartes"],cBulkDone:["✅ صدرت {n} بطاقة","✅ {n} carte(s) émise(s)"],
 cPrintAll:["🖨️ طباعة المعروض","🖨️ Imprimer la liste"],cPrintHint:["كل بطاقة بوجهها وظهرها جنبا إلى جنب، 5 بطاقات في الصفحة. قصّ واطوِ من المنتصف.","Recto et verso côte à côte, 5 cartes par page. Découpez et pliez."]
});
// تقسيم النص الملصوق إلى صفوف وخانات
function splitPaste(txt){
  const lines=String(txt||"").replace(/\r/g,"").split("\n").map(l=>l.trim()).filter(Boolean);
  return lines.map(l=>(l.includes("\t")?l.split("\t"):l.includes("|")?l.split("|"):l.split(/[,،;]/)).map(z=>z.trim()));
}
let pasteTxt="",pasteReg="";
APP.pst=v=>{pasteTxt=v};APP.pstR=v=>{pasteReg=v};
function pasteBox(){
  return `<div class="sec"><h2>${t("pasteT")}</h2><div class="hint">${t("pasteHint")} <b>${impCols().map(esc).join(" | ")}</b></div>
   <textarea id="pst" rows="7" style="margin-top:8px" placeholder="${esc(t("pastePh"))}" oninput="APP.pst(this.value)">${esc(pasteTxt)}</textarea>
   <div class="fg" style="margin-top:8px"><div><label>${t("pasteDefReg")}</label><select id="pstr" onchange="APP.pstR(this.value)"><option value="">—</option>${REGIONS.map(r=>`<option value="${r}" ${pasteReg===r?"selected":""}>${esc(tv(r))}</option>`).join("")}</select></div></div>
   <button class="bp" style="margin-top:10px" onclick="APP.pastePrev()">${t("pasteRead")}</button><div id="pstRes"></div></div>`}
APP.pastePrev=()=>{
  const res=$("#pstRes"),rows=splitPaste(pasteTxt);
  if(!rows.length){res.innerHTML=`<div class="err">${t("pasteEmpty")}</div>`;return}
  const cols=impCols(),norm=s=>String(s||"").trim().toLowerCase();
  const nameL=[norm(L(fieldsOf(impCat)[0].l)),norm(fieldsOf(impCat)[0].l[0]),norm(fieldsOf(impCat)[0].l[1]),"name","الاسم","nom"];
  let head=cols,body=rows;
  if(rows[0].some(c=>nameL.includes(norm(c)))){head=rows[0];body=rows.slice(1)}
  const objs=body.map(r=>{const o={};head.forEach((h,i)=>{if(r[i]!==undefined)o[h]=r[i]});return o});
  const m=impMap(objs,pasteReg);impRows=m.rows;impPreview(res,m.bad);
};

/* ---------- إصدار البطاقات جماعيا ---------- */
function cardNumFactory(type){const ty=CTYPES[type],used={};
  return region=>{const now=new Date(),rc=String(Math.max(0,REGIONS.indexOf(region))).padStart(2,"0"),yy=String(now.getFullYear()).slice(2);
    const pre=`CSM-${ty.code}-${yy}-${rc}-`;
    if(used[pre]===undefined)used[pre]=cards.filter(k=>k.num&&k.num.startsWith(pre)).reduce((a,k)=>Math.max(a,parseInt(k.num.slice(pre.length))||0),0);
    used[pre]++;return pre+String(used[pre]).padStart(4,"0")}}
let bulkList=[];
APP.cardBulk=type=>{
  const ty=CTYPES[type],yrs=num((CONFIG.site||{}).cardYears)||2;
  const srcOpt=type==="member"?`<option value="office">${t("cBulkOffice")}</option>`:type==="imam"?`<option value="mosq">${t("cBulkMosq")}</option>`:`<option value="duat">${t("cBulkDuat")}</option>`;
  $("#dt").textContent=ty.ic+" "+t("cBulk")+" — "+L(ty.l);
  $("#dbody").innerHTML=`<div class="db"><div class="fg">
   <div class="full"><label>${t("cBulkSrc")}</label><select id="b_src"><option value="paste">${t("cBulkPaste")}</option>${srcOpt}</select></div>
   <div class="full" id="b_offw" hidden><label>${t("cOffice")}</label><select id="b_off">${data.offices.filter(inRegion).map(o=>`<option value="${esc(o.id)}">${esc(o.name)}</option>`).join("")}</select></div>
   <div class="full" id="b_txtw"><div class="hint">${t("cBulkHint")}</div><textarea id="b_txt" rows="8" placeholder="${esc(t("cBulkPh"))}"></textarea></div>
   <div><label>${t("region")}</label><select id="b_reg" ${isAdmin()?"":"disabled"}><option value="">—</option>${REGIONS.map(r=>`<option value="${r}" ${!isAdmin()&&r===me.region?"selected":""}>${esc(tv(r))}</option>`).join("")}</select></div>
   <div><label>${t("cYears")}</label><input id="b_years" type="number" min="1" max="10" value="${yrs}"></div>
  </div><button class="bs" style="margin-top:10px" onclick="APP.cardBulkPrev('${type}')">${t("pasteRead")}</button><div id="b_res"></div></div>
  <div class="df"><button class="bs" type="button" onclick="document.getElementById('dlg').close()">${t("cancel")}</button></div>`;
  const sync=()=>{const v=$("#b_src").value;$("#b_offw").hidden=v!=="office";$("#b_txtw").hidden=v!=="paste";$("#b_res").innerHTML=""};
  $("#b_src").onchange=sync;
  if(!dlg.open)dlg.showModal();
};
APP.cardBulkPrev=type=>{
  const src=$("#b_src").value,region=isAdmin()?$("#b_reg").value:me.region,res=$("#b_res");
  const defTitle=type==="imam"?L(S.tImam):type==="daiya"?L(S.tDaiya):L(S.tMember);
  let list=[];
  if(src==="paste")list=splitPaste($("#b_txt").value).map(r=>({name:r[0],title:r[1]||defTitle,entity:r[2]||"",region}));
  if(src==="office"){const o=data.offices.find(z=>z.id===$("#b_off").value);if(o)list=officePeople(o).map(p=>({name:p.n,title:p.title,entity:o.name,region:o.region||region}))}
  if(src==="mosq")list=data.mosques.filter(m=>m.imam&&(!region||m.region===region)&&inRegion(m)).map(m=>({name:m.imam,title:m.khatib&&m.khatib.trim()!==m.imam.trim()?L(S.tImamR):L(S.tImam),entity:m.name,region:m.region,srcId:m.id}));
  if(src==="duat")list=data.duat.filter(d=>(!region||d.region===region)&&inRegion(d)).map(d=>({name:d.name,title:d.gender==="داعية (امرأة)"?L(S.tDaiyaF):L(S.tDaiya),entity:d.inst||"",region:d.region||"",srcId:d.id}));
  // اسم الشخص في هيكل المكتب قد يحمل صفته بين قوسين: نُبقي الاسم وحده
  // والصفة العربية بين قوسين تنتقل إلى خانة الصفة، أما الاسم الفرنسي بين قوسين فيبقى
  list=list.map(p=>{let name=String(p.name||"").replace(/\s+[—-]\s+.*$/,"").trim(),title=p.title;
    const m=name.match(/^(.*?)\s*\(([^)]*[\u0600-\u06FF][^)]*)\)\s*(.*)$/);if(m){name=(m[1]+" "+m[3]).trim();title=m[2].trim()}
    return {...p,name,title}}).filter(p=>p.name);
  const has=p=>cards.some(k=>k.type===type&&cStatus(k)==="active"&&k.name===p.name&&(k.entity||"")===(p.entity||""));
  const skip=list.filter(has).length;bulkList=list.filter(p=>!has(p));
  if(!list.length){res.innerHTML=`<div class="err">${t("pasteEmpty")}</div>`;return}
  res.innerHTML=`<div class="banner" style="margin-top:10px">${t("cBulkPrev",{n:fmt(bulkList.length),k:fmt(skip)})}</div>
   ${bulkList.length?`<div class="tw"><table><tr><th>${t("cName")}</th><th>${t("cTitle")}</th><th>${t("cEntity")}</th></tr>${bulkList.slice(0,12).map(p=>`<tr><td>${esc(p.name)}</td><td>${esc(p.title)}</td><td>${esc(p.entity)}</td></tr>`).join("")}</table></div>${bulkList.length>12?`<div class="count">… +${fmt(bulkList.length-12)}</div>`:""}
   <button class="bp" style="margin-top:10px" onclick="APP.cardBulkGo('${type}')">${t("cBulkGo")}</button>`:""}`;
};
APP.cardBulkGo=async type=>{
  if(!bulkList.length)return;
  const yrsN=Math.min(10,Math.max(1,num($("#b_years").value)||2)),numOf=cardNumFactory(type),batch=newId();
  const now=new Date(),exp=new Date(now);exp.setFullYear(exp.getFullYear()+yrsN);let n=0;
  try{for(const p of bulkList){const id=newId();
      const o={type,name:p.name,title:p.title||"",entity:p.entity||"",region:p.region||"",num:numOf(p.region||""),
        issuedAt:new Date(now.getTime()+n).toISOString(),expires:exp.toISOString(),status:"active",hasPhoto:false,srcId:p.srcId||"",batch,by:me.uid,byName:me.name||""};
      await store.saveCard(id,o);n++}
    logAct("add","cards","",n+" × "+L(CTYPES[type].l),null);
    dlg.close();toast(t("cBulkDone",{n:fmt(n)}));bulkList=[];location.hash="cardsp/"+batch}
  catch(err){toast(errMsg(err))}
};
// طباعة مجموعة من البطاقات: دفعة إصدار واحدة، أو القائمة المعروضة
function batchCards(key){
  if(key==="sel")return cards.filter(k=>cSel.has(k.id));
  if(key.startsWith("one:"))return cards.filter(k=>k.id===key.slice(4));
  if(key==="list"){const q=cQ.trim().toLowerCase();return cards.filter(k=>k.type===cTab&&(!q||(k.name+" "+k.num+" "+(k.entity||"")).toLowerCase().includes(q)))}
  return cards.filter(k=>k.batch===key)}
function renderCardsPrint(key){
  const ks=batchCards(key).sort((a,b)=>String(a.num).localeCompare(String(b.num)));
  if(!ks.length)return `<div class="empty">—</div>`;
  return `<div class="tools noprint"><a class="back" href="#cards">${t("back")}</a><span class="count">${fmt(ks.length)} ${t("cardsT")}</span><button class="bp" onclick="print()">${t("cPrint")}</button></div>
   <div class="hint noprint">${t("cPrintHint")} ${canIssue()?t("phTap"):""}</div>
   <div class="cardsheet multi">${ks.map((k,i)=>`<div class="cpair">${cardFace(k).replace('id="idc_front"',`data-k="${esc(k.id)}"`).replace('id="idp"',`id="idp_${i}" onclick="APP.cPh('${esc(k.id)}','idp_${i}')" title="📷"`)}${cardBack(k).replace('id="idc_back"',"").replace('id="idq"',`id="idq_${i}"`)}</div>`).join("")}</div>`}
async function afterCardsPrint(key){fillSig();
  const ks=batchCards(key).sort((a,b)=>String(a.num).localeCompare(String(b.num)));
  try{await loadScript("lib/qrcode.js")}catch(e){}
  ks.forEach((k,i)=>{
    if(window.qrcode){const q=window.qrcode(0,"M");q.addData(verifyUrl(k.id));q.make();const el=$("#idq_"+i);if(el)el.innerHTML=q.createSvgTag({cellSize:3,margin:1})}
    if(k.hasPhoto){const c=photoCache["cards__"+k.id];(c?Promise.resolve(c):store.getPhoto("cards__"+k.id)).then(d=>{const el=$("#idp_"+i);if(el&&okImg(d)){photoCache["cards__"+k.id]=d;el.innerHTML=`<img src="${okImg(d)}" alt="">`}})}})}

/* ================= صور البطاقات والطباعة حسب الحاجة ================= */
Object.assign(S,{
 phCam:["📷 التقاط بالكاميرا","📷 Prendre une photo"],phGal:["🖼️ من المعرض / الملفات","🖼️ Depuis la galerie"],phDel:["🗑️ حذف الصورة","🗑️ Supprimer la photo"],
 phSaved:["✅ حُفظت الصورة","✅ Photo enregistrée"],phTap:["اضغط على مكان الصورة في أي بطاقة لإضافة صورتها","Touchez l'emplacement photo d'une carte pour l'ajouter"],
 phBulk:["🖼️ صور جماعية","🖼️ Photos groupées"],
 phBulkHint:["اختر عدة صور دفعة واحدة. سمِّ كل صورة باسم صاحبها أو برقم بطاقته (مثل: أبوبكر جكتي.jpg أو CSM-M-26-07-0001.jpg)، فيضعها التطبيق في بطاقتها تلقائيا.","Choisissez plusieurs photos à la fois, nommées comme la personne ou le numéro de carte (ex. CSM-M-26-07-0001.jpg)."],
 phPick:["📂 اختيار الصور","📂 Choisir les photos"],phMatch:["طابقت {n} صورة بطاقاتها، ولم تُطابق {k}","{n} photo(s) associée(s), {k} non trouvée(s)"],
 phNoMatch:["لم يُعثر على بطاقة","Aucune carte"],phSaveAll:["💾 حفظ الصور","💾 Enregistrer les photos"],phDone:["✅ حُفظت {n} صورة","✅ {n} photo(s) enregistrée(s)"],
 selAll:["☑️ تحديد الكل","☑️ Tout sélectionner"],selNone:["إلغاء التحديد","Désélectionner"],
 prSel:["🖨️ طباعة المحدد ({n})","🖨️ Imprimer la sélection ({n})"],prOne:["🖨️ طباعة هذه البطاقة","🖨️ Imprimer cette carte"],
 noPhoto:["بلا صورة","Sans photo"]
});
// قصّ الصورة على مقاس صورة البطاقة (4:5) مع ترك مساحة أعلى للوجه، ثم ضغطها
function portraitImage(file,W=360,H=450,q=.72){return new Promise((ok,ko)=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{
  const ar=W/H;let sw=im.width,sh=im.height,sx=0,sy=0;
  if(sw/sh>ar){sw=sh*ar;sx=(im.width-sw)/2}else{sh=sw/ar;sy=(im.height-sh)*.25}
  const cv=document.createElement("canvas");cv.width=W;cv.height=H;const g=cv.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,W,H);g.drawImage(im,sx,sy,sw,sh,0,0,W,H);ok(cv.toDataURL("image/jpeg",q))};im.onerror=ko;im.src=r.result};r.onerror=ko;r.readAsDataURL(file)})}
async function setCardPhoto(id,d){const k=cards.find(z=>z.id===id);if(!k)return;
  await store.savePhoto("cards__"+id,d||null);const {id:_,...o}=k;o.hasPhoto=!!d;o.updatedAt=new Date().toISOString();o.updatedBy=me.uid;await store.saveCard(id,o);
  if(d)photoCache["cards__"+id]=d;else delete photoCache["cards__"+id]}
const photoCache={};
// اختيار صورة لبطاقة: cam=true يفتح الكاميرا مباشرة على الهاتف
APP.cPh=(id,slot,cam)=>{if(!canIssue())return;const inp=document.createElement("input");inp.type="file";inp.accept="image/*";if(cam)inp.capture="user";
  inp.onchange=async()=>{const f=inp.files[0];if(!f)return;try{const d=await portraitImage(f);await setCardPhoto(id,d);
    const el=document.getElementById(slot||"idp");if(el)el.innerHTML=`<img src="${d}" alt="">`;toast(t("phSaved"))}catch(e){toast(t("photoErr"))}};
  inp.click()};
APP.cPhDel=async id=>{await setCardPhoto(id,null);const el=$("#idp");if(el)el.innerHTML="👤";render()};

/* ---------- صور جماعية ---------- */
let phList=[];
const nrm=s=>String(s||"").toLowerCase().replace(/\.[a-z0-9]+$/,"").replace(/[ً-ْـ]/g,"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/[_\-.]+/g," ").replace(/\s+/g," ").trim();
APP.phBulk=()=>{
  $("#dt").textContent=t("phBulk");
  $("#dbody").innerHTML=`<div class="db"><div class="hint">${t("phBulkHint")}</div>
   <label class="bp filebtn" style="margin-top:10px">${t("phPick")}<input type="file" accept="image/*" multiple hidden onchange="APP.phFiles(this.files)"></label><div id="phRes"></div></div>
   <div class="df"><button class="bs" type="button" onclick="document.getElementById('dlg').close()">${t("cancel")}</button></div>`;
  if(!dlg.open)dlg.showModal()};
APP.phFiles=files=>{
  const pool=cards.filter(k=>k.type===cTab);phList=[];let miss=[];
  [...files].forEach(f=>{const b=nrm(f.name),bn=b.replace(/\s/g,"").toUpperCase();
    const k=pool.find(z=>bn.includes(String(z.num).replace(/-/g,"").toUpperCase()))||pool.find(z=>nrm(z.name)===b)||pool.find(z=>b.length>3&&(nrm(z.name).includes(b)||b.includes(nrm(z.name))));
    if(k)phList.push({f,k});else miss.push(f.name)});
  $("#phRes").innerHTML=`<div class="banner" style="margin-top:10px">${t("phMatch",{n:fmt(phList.length),k:fmt(miss.length)})}</div>
   <div class="tw"><table>${phList.map(p=>`<tr><td>🖼️ ${esc(p.f.name)}</td><td>✅ ${esc(p.k.name)} <span class="count" dir="ltr">${esc(p.k.num)}</span></td></tr>`).join("")}${miss.map(n=>`<tr><td>🖼️ ${esc(n)}</td><td style="color:#b42318">❌ ${t("phNoMatch")}</td></tr>`).join("")}</table></div>
   ${phList.length?`<button class="bp" style="margin-top:10px" onclick="APP.phSave()">${t("phSaveAll")}</button>`:""}`};
APP.phSave=async()=>{let n=0;
  for(const p of phList){try{await setCardPhoto(p.k.id,await portraitImage(p.f));n++}catch(e){}}
  dlg.close();toast(t("phDone",{n:fmt(n)}));phList=[];render()};

/* ---------- التحديد والطباعة حسب الحاجة ---------- */
const cSel=new Set();
APP.cSel=(id,on,ev)=>{if(ev)ev.stopPropagation();on?cSel.add(id):cSel.delete(id);render()};
APP.cSelAll=on=>{const q=cQ.trim().toLowerCase();cards.filter(k=>k.type===cTab&&(!q||(k.name+" "+k.num+" "+(k.entity||"")).toLowerCase().includes(q))).forEach(k=>on?cSel.add(k.id):cSel.delete(k.id));render()};
/* ---------- توقيع الرئيس وختم التجمع على ظهر البطاقة ---------- */
const sigCache={};
async function sigImg(k){if(sigCache[k]!==undefined)return sigCache[k];let d=null;try{d=await store.getPhoto("site__"+k)}catch(e){}sigCache[k]=okImg(d)||"";return sigCache[k]}
async function fillSig(){const [sg,st]=await Promise.all([sigImg("sig"),sigImg("stamp")]);
  document.querySelectorAll(".idc.back").forEach(b=>{const l=b.querySelector(".sgl");if(l&&sg)l.innerHTML=`<img class="sigimg" src="${sg}" alt="">`;
    if(st&&!b.querySelector(".stampimg")){const box=b.querySelector(".idsig");if(box)box.insertAdjacentHTML("beforeend",`<img class="stampimg" src="${st}" alt="">`)}})}
function pngImage(file,max=420){return new Promise((ok,ko)=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,max/Math.max(im.width,im.height));const cv=document.createElement("canvas");cv.width=Math.round(im.width*k);cv.height=Math.round(im.height*k);
  const g=cv.getContext("2d");g.drawImage(im,0,0,cv.width,cv.height);
  // إزالة الخلفية البيضاء ليظهر التوقيع والختم فوق البطاقة بشكل طبيعي
  const px=g.getImageData(0,0,cv.width,cv.height),a=px.data;for(let i=0;i<a.length;i+=4){const m=Math.min(a[i],a[i+1],a[i+2]);if(m>225)a[i+3]=0;else if(m>190)a[i+3]=Math.round(a[i+3]*(225-m)/35)}g.putImageData(px,0,0);
  ok(cv.toDataURL("image/png"))};im.onerror=ko;im.src=r.result};r.onerror=ko;r.readAsDataURL(file)})}
function sigBox(){
  return `<div class="sec"><h2>✍️ ${t("sigT")}</h2><div class="hint">${t("sigHint")}</div>
   <div class="fg" style="margin-top:8px">${["sig","stamp"].map(k=>`<div><label>${t(k==="sig"?"sigL":"stampL")}</label><div class="sigprev" id="sp_${k}">…</div>
    <label class="bs filebtn" style="margin-top:6px">📂 ${t("sigPick")}<input type="file" accept="image/*" hidden onchange="APP.sigSet('${k}',this.files[0])"></label> <button class="bs sm" onclick="APP.sigSet('${k}',null)">🗑️</button></div>`).join("")}</div></div>`}
async function sigPrev(){for(const k of ["sig","stamp"]){const el=$("#sp_"+k);if(!el)continue;const d=await sigImg(k);el.innerHTML=d?`<img src="${d}" alt="">`:`<span class="count">${t("sigNone")}</span>`}}
APP.sigSet=async(k,f)=>{try{const d=f?await pngImage(f):null;await store.savePhoto("site__"+k,d);sigCache[k]=d||"";toast(t("phSaved"));sigPrev()}catch(e){toast(t("photoErr"))}};
Object.assign(S,{sigT:["توقيع الرئيس وختم التجمع (للبطاقات)","Signature et cachet (cartes)"],sigHint:["صوّر التوقيع والختم على ورقة بيضاء، فيُزيل التطبيق البياض ويطبعهما على ظهر كل البطاقات.","Photographiez la signature et le cachet sur papier blanc ; le fond blanc est retiré automatiquement."],
 sigL:["توقيع الرئيس","Signature du Président"],stampL:["ختم التجمع","Cachet de la CSM"],sigPick:["اختيار صورة","Choisir"],sigNone:["لم تُرفع بعد","Non défini"]});

/* ================= تحسينات سهولة الاستعمال ================= */
// تفكيك خانة الهاتف إلى أرقام (مع صاحب كل رقم إن ذُكر) لروابط الاتصال وواتساب
function phoneList(p){const out=[];let lab="";
  String(p||"").split(/\s*\/\s*|\n/).forEach(seg=>{const m=seg.match(/^(.*?):\s*(.*)$/);let body=seg;if(m){lab=m[1].trim();body=m[2]}
    (body.match(/\+?\d[\d .-]{6,}\d/g)||[]).forEach(raw=>{let d=raw.replace(/\D/g,"");if(d.startsWith("00"))d=d.slice(2);
      const intl=d.length===8?"223"+d:d,loc=d.length===8?d:d.replace(/^223/,"");
      out.push({n:loc.length===8?loc.replace(/(\d\d)(?=\d)/g,"$1 "):raw.trim(),tel:"+"+intl,wa:intl,label:lab})})});
  return out}
// شريط التنقل السفلي على الهاتف
function renderBnav(){const el=$("#bnav");if(!el||!me)return;
  const it=(k,ic,l)=>`<a href="#${k}" class="${view===k?"on":""}"><span>${ic}</span><small>${l}</small></a>`;
  el.innerHTML=it("home","🏠",t("home"))+it("mosques",CATS.mosques.ic,cl("mosques"))+
    (canOffices()?it("offices",CATS.offices.ic,L(["المكاتب","Bureaux"])):it("map","📍",t("map")))+
    ((isAdmin()||isRegAdmin())?it("cards","🪪",t("cardsT")):it("favs","⭐",t("favs")))+
    `<a href="javascript:void 0" onclick="document.body.classList.toggle('open')"><span>☰</span><small>${t("bnMenu")}</small></a>`}
// إغلاق القائمة الجانبية عند اختيار صفحة على الهاتف
addEventListener("hashchange",()=>document.body.classList.remove("open"));
// مسودة تلقائية لنموذج الإضافة: لا يضيع ما كُتب إذا انقطع الاتصال أو أُغلق النموذج خطأً
{const _form=APP.form;APP.form=(c,id)=>{_form(c,id);if(id||c==="offices")return;const f=$("#frm");if(!f)return;const key="csm-draft-"+c;
  const grab=()=>{const o={};f.querySelectorAll("input[id^=f_],select[id^=f_],textarea[id^=f_]").forEach(el=>{if(el.type==="file")return;if(el.type==="checkbox"){if(el.checked)(o[el.id+"[]"]=o[el.id+"[]"]||[]).push(el.value)}else if(el.value)o[el.id]=el.value});return o};
  const d=ls.get(key,null);
  if(d&&d.f_name){const bar=document.createElement("div");bar.className="banner draftb";bar.innerHTML=`📝 ${t("draftQ")} <b>${esc(d.f_name)}</b> <button type="button" class="bp sm">${t("draftUse")}</button> <button type="button" class="bs sm">${t("draftDrop")}</button>`;
    f.querySelector(".db").prepend(bar);
    bar.querySelector(".bp").onclick=()=>{const rg=$("#f_region");if(d.f_region&&rg){rg.value=d.f_region;rg.onchange&&rg.onchange({target:rg})}
      Object.entries(d).forEach(([k,v])=>{if(k.endsWith("[]")){f.querySelectorAll(`input[type=checkbox][id="${k.slice(0,-2)}"]`).forEach(el=>el.checked=v.includes(el.value));return}if(k==="f_region")return;const el=document.getElementById(k);if(el)el.value=v});bar.remove()};
    bar.querySelector(".bs").onclick=()=>{ls.set(key,null);bar.remove()}}
  let tm;f.addEventListener("input",()=>{clearTimeout(tm);tm=setTimeout(()=>{const o=grab();if(o.f_name)ls.set(key,o)},600)})}}
// الوضع الليلي
const applyDark=on=>{document.documentElement.classList.toggle("dark",!!on);const b=$("#darkb");if(b)b.textContent=on?"☀️":"🌙"};
APP.dark=()=>{const on=!document.documentElement.classList.contains("dark");ls.set("csm-dark",on);applyDark(on)};
applyDark(ls.get("csm-dark",false));
// أقسام إضافية في التقرير المطبوع: المكاتب حسب المستوى، ونسبة التوثيق، والبطاقات
function repExtra(){
  const lv=OFFICE_LEVELS.map(l=>[l,data.offices.filter(o=>o.level===l)]).filter(([,a])=>a.length);
  const people=data.offices.reduce((a,o)=>a+num(o.people),0);
  const ct=typeof cards!=="undefined"&&(isAdmin()||isRegAdmin())?cards:[];
  return `<h3>${t("repOff")}</h3><table><tr><th>${t("lvL")}</th><th class="num">${t("count")}</th><th class="num">${t("repPeople")}</th></tr>
   ${lv.map(([l,a])=>`<tr><td>${esc(tv(l))}</td><td class="num">${fmt(a.length)}</td><td class="num">${fmt(a.reduce((s,o)=>s+num(o.people),0))}</td></tr>`).join("")||'<tr><td colspan="3">—</td></tr>'}
   <tr class="tot"><td>${t("records")}</td><td class="num">${fmt(data.offices.length)}</td><td class="num">${fmt(people)}</td></tr></table>
   <h3>${t("repVer")}</h3><table><tr><th>${t("category")}</th><th class="num">✅</th><th class="num">🕓</th><th class="num">%</th></tr>
   ${ORDER.filter(c=>data[c].length).map(c=>{const v=data[c].filter(x=>x.status==="verified").length;return `<tr><td>${CATS[c].ic} ${cl(c)}</td><td class="num">${fmt(v)}</td><td class="num">${fmt(data[c].length-v)}</td><td class="num">${Math.round(100*v/data[c].length)}%</td></tr>`}).join("")}</table>
   ${ct.length?`<h3>${t("repCards")}</h3><table><tr><th>${t("cardsT")}</th><th class="num">${t("cActive")}</th><th class="num">${t("cRevoked")} / ${t("cExpired")}</th></tr>
   ${Object.entries(CTYPES).map(([k,v])=>{const a=ct.filter(z=>z.type===k);return a.length?`<tr><td>${v.ic} ${L(v.l)}</td><td class="num">${fmt(a.filter(z=>cStatus(z)==="active").length)}</td><td class="num">${fmt(a.filter(z=>cStatus(z)!=="active").length)}</td></tr>`:""}).join("")}</table>`:""}`}
// توحيد كتابة أسماء الأماكن: يعرض القيم المختلفة لكل خانة ويستبدلها في كل السجلات دفعة واحدة
let unF="city",unR="";
APP.unF=v=>{unF=v;render()};APP.unR=v=>{unR=v;render()};
function unifyBox(){
  const vals={};ORDER.forEach(c=>data[c].forEach(x=>{if(unR&&x.region!==unR)return;const v=String(x[unF]||"").trim();if(v)vals[v]=(vals[v]||0)+1}));
  const list=Object.entries(vals).sort((a,b)=>a[0].localeCompare(b[0],"ar"));
  const lab={city:t("cityL"),quarter:t("quarterL"),commune:L(["الدائرة / المديرية","Cercle / Direction"])};
  return `<div class="sec"><h2>🔤 ${t("unT")}</h2><div class="hint">${t("unHint")}</div>
   <div class="fg" style="margin-top:8px"><div><label>${t("unField")}</label><select onchange="APP.unF(this.value)">${Object.entries(lab).map(([k,l])=>`<option value="${k}" ${unF===k?"selected":""}>${esc(l)}</option>`).join("")}</select></div>
   <div><label>${t("region")}</label><select onchange="APP.unR(this.value)"><option value="">${t("allRegions")}</option>${REGIONS.map(r=>`<option value="${r}" ${unR===r?"selected":""}>${esc(tv(r))}</option>`).join("")}</select></div></div>
   <div class="tw" style="margin-top:8px;max-height:340px;overflow:auto"><table><tr><th>${t("unVal")}</th><th class="num">${t("count")}</th><th></th></tr>
   ${list.map(([v,n])=>`<tr><td>${esc(v)}</td><td class="num">${fmt(n)}</td><td><button class="bs sm" onclick="APP.unRen(${esc(JSON.stringify(v))})">✏️ ${t("unRen")}</button></td></tr>`).join("")||'<tr><td colspan="3">—</td></tr>'}</table></div></div>`}
APP.unRen=async from=>{const to=(prompt(t("unQ",{v:from}),from)||"").trim();if(!to||to===from)return;let n=0;
  for(const c of ORDER)for(const x of data[c]){if(unR&&x.region!==unR)continue;if(String(x[unF]||"").trim()!==from)continue;const {id,...o}=x;o[unF]=to;o.updatedAt=new Date().toISOString();o.updatedBy=me.uid;o.updatedByName=me.name;await store.save(c,id,o);n++}
  logAct("edit","settings","",`${from} → ${to} (${n})`,null);toast(t("unDone",{n:fmt(n)}))};
Object.assign(S,{repOff:["مكاتب التجمع حسب المستوى","Bureaux par niveau"],lvL:["المستوى","Niveau"],repPeople:["عدد الأشخاص في الهياكل","Personnes dans les structures"],
 repVer:["نسبة التوثيق","Taux de vérification"],repCards:["البطاقات الصادرة","Cartes émises"],
 unT:["توحيد كتابة أسماء الأماكن","Harmoniser l'orthographe des lieux"],unHint:["تظهر هنا كل الصيغ المكتوبة لخانة ما. إذا وجدت الاسم نفسه مكتوبا بطريقتين (مثل «بانمبا» و«بانامبا») فاضغط «تصحيح» واكتب الصيغة الموحدة، فتُصحَّح في كل السجلات.","Toutes les variantes d'un champ. Corrigez une variante pour l'appliquer à toutes les fiches."],
 unField:["الخانة","Champ"],unVal:["الصيغة المكتوبة","Valeur saisie"],unRen:["تصحيح","Corriger"],unQ:["اكتب الصيغة الموحدة بدل «{v}»:","Nouvelle orthographe pour « {v} » :"],unDone:["✅ صُحّح {n} سجلا","✅ {n} fiche(s) corrigée(s)"]});

/* ================= طباعة قوائم المؤسسات حسب المكان والحالة ================= */
Object.assign(S,{prList:["طباعة","Imprimer"],allDirs:["كل المديريات","Toutes les directions"],allCercles:["كل الدوائر","Tous les cercles"],
 allCities:["كل المدن والقرى","Toutes les villes et villages"],allQuarters:["كل الأحياء","Tous les quartiers"],
 prTitle:["قائمة {c}","Liste : {c}"],prFilt:["التصفية","Filtre"],prAll:["كل مالي","Tout le Mali"],prDate:["تاريخ الطباعة","Imprimé le"],
 prTot:["المجموع: {n} — ✅ موثق {v} · 🕓 قيد المراجعة {p}","Total : {n} — ✅ vérifiées {v} · 🕓 en attente {p}"],
 prPhones:["إظهار الهواتف","Afficher les téléphones"],prGroup:["تجميع حسب المكان","Grouper par lieu"],prResp:["المسؤول","Responsable"],prPlace:["المكان","Lieu"],
 prGo:["🖨️ طباعة / PDF","🖨️ Imprimer / PDF"],prHint:["لحفظها PDF اختر «Enregistrer au format PDF» في نافذة الطباعة.","Pour un PDF, choisissez « Enregistrer au format PDF »."]});
const respOf=x=>x.imam||x.director||x.president||x.manager||(x.struct&&x.struct.pres&&x.struct.pres.n)||"";
const placeOf=x=>[...new Set([x.city,x.quarter,x.landmark].filter(Boolean))].join(" · ");
function filterRows(c){const q=filt.q.trim().toLowerCase();
  return data[c].filter(x=>(c!=="offices"||!filt.level||x.level===filt.level)&&(!filt.region||x.region===filt.region)&&(!filt.commune||x.commune===filt.commune)&&(!filt.city||(x.city||x.quarter)===filt.city)&&(!filt.status||(filt.status==="mine"?x.createdBy===me.uid:(filt.status==="verified")===(x.status==="verified")))&&(!q||(JSON.stringify(x)+" "+tv(x.region)).toLowerCase().includes(q)))}
function locFilters(c){
  const inR=data[c].filter(x=>x.region===filt.region),isB=filt.region===BAMAKO;
  const coms=[...new Set([...(officialCommunes(filt.region)||[]),...inR.map(x=>x.commune).filter(Boolean)])];
  const cities=[...new Set(inR.filter(x=>(!filt.commune||x.commune===filt.commune)).map(x=>x.city||x.quarter).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ar"));
  return `<select onchange="APP.lf('commune',this.value)"><option value="">${t(isB?"allDirs":"allCercles")}</option>${coms.map(v=>`<option value="${esc(v)}" ${filt.commune===v?"selected":""}>${esc(tv(v))} (${fmt(inR.filter(x=>x.commune===v).length)})</option>`).join("")}</select>
   ${cities.length?`<select onchange="APP.lf('city',this.value)"><option value="">${t(isB?"allQuarters":"allCities")}</option>${cities.map(v=>`<option value="${esc(v)}" ${filt.city===v?"selected":""}>${esc(v)}</option>`).join("")}</select>`:""}`}
APP.lf=(k,v)=>{filt[k]=v;if(k==="commune")filt.city="";render()};
let prPh=false,prGrp=true;APP.prOpt=(k,v)=>{if(k==="ph")prPh=v;else prGrp=v;render()};
function renderPrintList(c){
  if(!CATS[c])return "";
  const rows=filterRows(c).sort((a,b)=>REGIONS.indexOf(a.region)-REGIONS.indexOf(b.region)||String(a.commune||"").localeCompare(String(b.commune||""),"ar")||String(a.city||a.quarter||"").localeCompare(String(b.city||b.quarter||""),"ar")||String(a.name).localeCompare(String(b.name),"ar"));
  const v=rows.filter(x=>x.status==="verified").length,showPh=prPh&&isAdmin();
  const fl=[filt.region?tv(filt.region):t("prAll"),filt.commune&&tv(filt.commune),filt.city,filt.level&&tv(filt.level),filt.status==="verified"?"✅ "+t("verified"):filt.status==="pending"?"🕓 "+t("pending"):t("allStatus"),filt.q&&"«"+filt.q+"»"].filter(Boolean).join(" › ");
  const head=`<tr><th>#</th><th>${t("codeL")}</th><th>${t("name")}</th>${prGrp?"":`<th>${t("region")}</th>`}<th>${t("prPlace")}</th><th>${t("prResp")}</th>${showPh?`<th>${L(TAIL[0].l)}</th>`:""}<th></th></tr>`;
  const row=(x,i)=>`<tr><td class="num">${i+1}</td><td dir="ltr" class="cd">${esc(x.code||"")}</td><td><b>${esc(nameMain(x))}</b>${nameSub(x)?`<br><small dir="auto">${esc(nameSub(x))}</small>`:""}</td>${prGrp?"":`<td>${esc(tv(x.region||""))}${x.commune?" · "+esc(tv(x.commune)):""}</td>`}<td>${esc(placeOf(x))}</td><td>${esc(respOf(x))}</td>${showPh?`<td dir="ltr">${esc(phones[pkey(c,x.id)]||"")}</td>`:""}<td>${x.status==="verified"?"✅":"🕓"}</td></tr>`;
  let body="";
  if(prGrp){const g={};rows.forEach(x=>{const k=(x.region||"—")+"|"+(x.commune||"");(g[k]=g[k]||[]).push(x)});
    let n=0;body=Object.entries(g).map(([k,a])=>{const [r,cm]=k.split("|");return `<h3 class="prg">📍 ${esc(tv(r))}${cm?" › "+esc(tv(cm)):""} <span>(${fmt(a.length)})</span></h3><table class="prt"><thead>${head}</thead><tbody>${a.map(x=>row(x,n++)).join("")}</tbody></table>`}).join("")}
  else body=`<table class="prt"><thead>${head}</thead><tbody>${rows.map(row).join("")}</tbody></table>`;
  return `<div class="tools noprint"><a class="back" href="#${c}">${t("back")}</a>
    <label class="chk"><input type="checkbox" ${prGrp?"checked":""} onchange="APP.prOpt('g',this.checked)"> ${t("prGroup")}</label>
    ${isAdmin()?`<label class="chk"><input type="checkbox" ${prPh?"checked":""} onchange="APP.prOpt('ph',this.checked)"> 🔒 ${t("prPhones")}</label>`:""}
    <button class="bp" onclick="print()">${t("prGo")}</button></div><div class="hint noprint">${t("prHint")}</div>
   <div class="prdoc"><div class="prhd"><img src="logo.png" alt=""><div><b>${esc(L(["تجمع أهل السنة والجماعة في مالي","Communauté Sunnite du Mali (CSM)"]))}</b><h2>${CATS[c].ic} ${t("prTitle",{c:cl(c)})}</h2>
     <div class="count">${t("prFilt")}: ${esc(fl)} · ${t("prDate")}: ${dfmt(new Date().toISOString())}</div></div><img src="mali-flag.svg" alt="" class="fl"></div>
    <div class="prtot">${t("prTot",{n:fmt(rows.length),v:fmt(v),p:fmt(rows.length-v)})}</div>
    ${rows.length?body:`<div class="empty">${t("noMatch")}</div>`}
    <div class="prft">youssoufsid.github.io/csm-dalil — ${esc(L(["دليل المؤسسات السنية في مالي","Annuaire des institutions sunnites du Mali"]))}</div></div>`}
/* ====== الإبلاغ عن خطأ/اقتراح تعديل · المساعد المحلي · حماية البيانات ====== */
Object.assign(S,{
 wa:["💬 واتساب","💬 WhatsApp"],
 rep:["🚩 إبلاغ / اقتراح","🚩 Signaler / suggérer"],
 repT:["الإبلاغ عن خطأ أو اقتراح تعديل","Signaler une erreur ou suggérer une modification"],
 repType:["نوع الملاحظة","Type de remarque"],
 repTypes:[["خطأ في المعلومات","معلومات ناقصة","مؤسسة مغلقة أو انتقلت","اقتراح تعديل","طلب تصحيح أو حذف بياناتي"],["Information erronée","Information manquante","Établissement fermé ou déplacé","Suggestion de modification","Demande de correction/suppression de mes données"]],
 repText:["اكتب الملاحظة","Votre remarque"],
 repContact:["وسيلة تواصل (اختياري)","Contact (facultatif)"],
 repHint:["تصل ملاحظتك إلى مشرف الإقليم المختص للمراجعة، ولا يتغير شيء في الدليل قبل التحقق منها.","Votre remarque est transmise au superviseur de la région pour vérification ; rien n'est modifié avant contrôle."],
 repSend:["إرسال الملاحظة","Envoyer"],
 repShort:["اكتب الملاحظة (٥ أحرف على الأقل)","Écrivez votre remarque (5 caractères min.)"],
 repOk:["✅ وصلت ملاحظتك، جزاك الله خيراً","✅ Remarque transmise, merci"],
 repWait:["أرسلت ملاحظة قبل قليل، انتظر دقيقة","Vous avez envoyé une remarque à l'instant, patientez une minute"],
 repsT:["ملاحظات المستخدمين","Remarques des utilisateurs"],
 repsNone:["لا توجد ملاحظات بعد","Aucune remarque pour l'instant"],
 repsNew:["جديدة","Nouvelles"],repsDone:["تمت المعالجة","Traitées"],
 repHandle:["✔ تمت المعالجة","✔ Traité"],repReopen:["↩ إعادة فتح","↩ Rouvrir"],repOpen:["فتح السجل","Ouvrir la fiche"],
 askT:["المساعد","Assistant"],
 askPh:["اسأل: أين أقرب مركز تحفيظ للبنات؟","Ex. : combien de mosquées à Ségou ?"],
 askGo:["اسأل","Demander"],
 askNote:["يجيب من بيانات الدليل المعتمدة فقط، ولا يعرض أرقام الهواتف، وما يذكره يحتاج مراجعة المندوب قبل الاعتماد.","Répond uniquement à partir des fiches vérifiées, sans afficher de téléphones ; à confirmer avec le délégué."],
 askHello:["السلام عليكم، اسألني عن عدد المؤسسات في إقليم، أو ابحث عن مسجد أو مركز، أو اطلب «الأقرب إليّ».","Salam ! Demandez-moi un nombre d'établissements, une recherche, ou « le plus proche »."],
 askNone:["لم أجد نتيجة مطابقة. جرّب اسم الإقليم أو الدائرة أو الحي مع نوع المؤسسة.","Aucun résultat. Essayez une région, un cercle ou un quartier avec un type d'établissement."],
 askGps:["لم أستطع معرفة موقعك. فعّل الموقع في المتصفح ثم أعد السؤال.","Position introuvable. Activez la localisation puis réessayez."],
 askNoGps:["لا توجد إحداثيات مسجلة لهذه المؤسسات بعد، فابحث بالإقليم أو الحي.","Pas de coordonnées enregistrées ; cherchez par région ou quartier."],
 askAdm:["هذه الميزة للمشرفين فقط.","Réservé aux administrateurs."],
 askDup:["لا تكرار ظاهر في السجلات 👍","Aucun doublon apparent 👍"],
 askS:[["أين أقرب مسجد؟","كم مسجداً في سيغو؟","أين أقرب مركز تحفيظ للبنات؟","ابحث عن مدرسة في باماكو","كم عدد المؤسسات في تمبكتو؟"],["Quelle est la mosquée la plus proche ?","Combien de mosquées à Ségou ?","Centre coranique pour filles le plus proche ?","Écoles à Bamako","Combien d'établissements à Tombouctou ?"]],
 askSA:[["كشف التكرار","البيانات الناقصة"],["Doublons","Données manquantes"]],
 prvT:["حماية البيانات والخصوصية","Protection des données"],
 prvNav:["حماية البيانات","Confidentialité"]
});
Object.assign(S,{reports:S.repsT,ask:S.askT,privacy:S.prvT});
const reportsNew=()=>reports.filter(r=>r.status!=="done").length;
/* ---------- واتساب ---------- */
APP.wa=(c,id)=>{const x=data[c].find(r=>r.id===id);if(!x)return;
  const url=location.origin+location.pathname+"#i/"+c+"/"+encodeURIComponent(id);
  open("https://wa.me/?text="+encodeURIComponent(`${CATS[c].ic} ${x.name}\n📍 ${locLine(x)}\n${t("appName")}\n${url}`),"_blank","noopener")};
/* ---------- الإبلاغ عن خطأ ---------- */
APP.repOpen=(c,id)=>{const x=data[c].find(r=>r.id===id);if(!x)return;
  const types=L(S.repTypes);
  $("#dt").textContent=t("repT");
  $("#dbody").innerHTML=`<form id="repf" novalidate><div class="db"><div class="hint" style="margin-bottom:8px">${CATS[c].ic} <b>${esc(x.name)}</b> · ${esc(locLine(x))}</div>
   <div class="fg"><div class="full"><label>${t("repType")}</label><select id="rp_type">${types.map((o,i)=>`<option value="${esc(o)}">${esc(o)}</option>`).join("")}</select></div>
   <div class="full"><label>${t("repText")} <b>*</b></label><textarea id="rp_text" rows="4" maxlength="700"></textarea></div>
   <div class="full"><label>${t("repContact")}</label><input id="rp_ct" maxlength="70" dir="ltr" autocomplete="off"></div></div>
   <div class="hint" style="margin-top:8px">${t("repHint")} <a class="lnk" href="#privacy" onclick="document.getElementById('dlg').close()">🔒 ${t("prvNav")}</a></div><div class="err" id="rp_err"></div></div>
   <div class="df"><button class="bp" type="submit">${t("repSend")}</button><button class="bs" type="button" onclick="document.getElementById('dlg').close()">${t("cancel")}</button></div></form>`;
  $("#repf").onsubmit=async e=>{e.preventDefault();
    const text=$("#rp_text").value.trim();if(text.length<5){$("#rp_err").textContent=t("repShort");return}
    if(Date.now()-ls.get("csm-lastrep",0)<60000){$("#rp_err").textContent=t("repWait");return}
    const o={cat:c,ref:id,name:String(x.name).slice(0,120),region:x.region||"",type:$("#rp_type").value,text:text.slice(0,700),contact:$("#rp_ct").value.trim().slice(0,70),
      by:(me&&me.uid)||"",byName:String((me&&me.name)||"").slice(0,60),at:new Date().toISOString(),status:"new"};
    try{await store.suggest(o);ls.set("csm-lastrep",Date.now());dlg.close();toast(t("repOk"))}catch(er){$("#rp_err").textContent=errMsg(er)}};
  if(!dlg.open)dlg.showModal();
};
APP.repDone=(id,done)=>store.patchReport(id,{status:done?"done":"new",doneBy:done?(me.name||""):"",doneAt:done?new Date().toISOString():""});
function renderReports(){
  const list=[...reports].sort((a,b)=>String(b.at).localeCompare(String(a.at)));
  const card=r=>`<div class="rpc ${r.status==="done"?"dn":""}"><div class="rph"><b>${esc(r.type||"")}</b><span class="count">${esc(dfmt(r.at))}${r.region?" · "+esc(tv(r.region)):""}</span></div>
    <div class="rpn">${CATS[r.cat]?CATS[r.cat].ic:""} ${esc(r.name||"")}</div><p class="rpt">${esc(r.text||"")}</p>
    <div class="count">${r.byName?esc(r.byName)+" · ":"👤 "}${r.contact?`<span dir="ltr">${esc(r.contact)}</span>`:""}</div>
    <div class="df" style="margin-top:8px">${data[r.cat]&&data[r.cat].find(x=>x.id===r.ref)?`<a class="bs btnl" href="#i/${r.cat}/${esc(r.ref)}">${t("repOpen")}</a>`:""}
    <button class="${r.status==="done"?"bs":"bg"}" onclick="APP.repDone('${esc(r.id)}',${r.status==="done"?"false":"true"})">${r.status==="done"?t("repReopen"):t("repHandle")}</button></div></div>`;
  return `<div class="sec"><h2>🚩 ${t("repsT")} <span class="count">(${t("repsNew")}: ${fmt(reportsNew())})</span></h2>${list.length?`<div class="rpg">${list.map(card).join("")}</div>`:`<div class="empty">${t("repsNone")}</div>`}</div>`}
/* ---------- المساعد المحلي ---------- */
const nz=s=>String(s||"").replace(/[ً-ٰٟـ]/g,"").replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/ؤ/g,"و").replace(/ئ/g,"ي").replace(/باماكو/g,"بماكو").replace(/مقاطعه\s*/g,"").toLowerCase().trim();
const CATKW=[["mosques",/(مسجد|مساجد|جامع|جوامع|mosqu)/],["schools",/(مدرس|مدارس|ecole|école)/],["centers",/(تحفيظ|مركز|مراكز|كتاتيب|centre)/],["duat",/(داعي|دعاه|دعاة|داعيات|دعوه)/],["assoc",/(جمعي|منظم|هيئ|association)/],["media",/(اذاع|اعلام|راديو|radio)/],["offices",/(مكتب|مكاتب|bureau)/]];
const FEMKW=/(بنات|بنت|نساء|نسائي|نسويه|نسوي|فتيات|طالبات|اناث|للمراه)/;
function placeList(){const m=new Map();
  const add=(v,k)=>{const n=nz(v).replace(/^ال/,"");if(n.length>=3&&!m.has(n))m.set(n,k)};
  REGIONS.forEach(r=>add(r,"region"));Object.values(CERCLES).flat().forEach(v=>add(v,"commune"));DIRECTORATES.forEach(v=>add(v.replace(/^مديرية\s*/,""),"commune"));BKO_QUARTERS.forEach(v=>add(v,"quarter"));
  allRows().forEach(({x})=>{add(x.city,"city");add(x.quarter,"quarter");add(x.commune,"commune")});
  return [...m.keys()].sort((a,b)=>b.length-a.length)}
function rowHasPlace(x,n){return [x.region,x.commune,x.city,x.quarter].some(v=>{const z=nz(v).replace(/^ال/,"");return z&&(z===n||z.includes(n))})}
const hav=(a,b)=>{const R=6371,r=Math.PI/180,dl=(b[0]-a[0])*r,dn=(b[1]-a[1])*r,q=Math.sin(dl/2)**2+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(q))};
const askLink=(c,x,extra="")=>`<a class="lnk" href="#i/${c}/${esc(x.id)}">${CATS[c].ic} ${esc(x.name)}</a> <span class="count">${esc(locLine(x))}${extra}</span>`;
function plan(q){
  const z=nz(q),cats=CATKW.filter(([,re])=>re.test(z)).map(([k])=>k).filter(k=>ORDER.includes(k)||k==="offices");
  const hits=placeList().filter(n=>z.includes(n));const places=hits.filter(n=>!hits.some(o=>o!==n&&o.includes(n)));
  return {z,cats,places,fem:FEMKW.test(z),near:/(اقرب|قريب|حولي|بجانبي|حولى)/.test(z),count:/(كم|عدد|احصاء|إحصاء|combien|nombre)/.test(z)||/(كم |عدد)/.test(q),dup:/(تكرار|مكرر|doublon)/.test(z),miss:/(ناقص|نقص|ناقصه|manquant)/.test(z)}}
function pick(p,rows){
  let r=rows.filter(({c})=>!p.cats.length||p.cats.includes(c));
  if(p.places.length)r=r.filter(({x})=>p.places.some(n=>rowHasPlace(x,n)));
  if(p.fem)r=r.filter(({c,x})=>c==="duat"?/امرأة/.test(x.gender||""):((c==="centers"||c==="schools")&&num(x.st_f)>0));
  const stop=new Set([...p.places,"اين","ابحث","عن","في","من","كم","عدد","للبنات","بنات"]);
  const toks=p.z.split(/[\s،,؟?!.]+/).map(t=>t.replace(/^ال/,"")).filter(t=>t.length>=3&&!stop.has(t)&&!CATKW.some(([,re])=>re.test(t))&&!FEMKW.test(t)&&!/^(اقرب|قريب|اين|ابحث|عن)$/.test(t));
  if(toks.length&&!p.count)r=r.filter(({x})=>toks.every(t=>nz(x.name+" "+respOf(x)).includes(t)||rowHasPlace(x,t)));
  return r}
async function answer(q){
  const p=plan(q),adm=isAdmin()||isRegAdmin();
  if(p.dup){if(!adm)return t("askAdm");const g={};allRows().forEach(({c,x})=>{const k=c+"|"+nz(x.name)+"|"+x.region+"|"+nz(x.quarter||x.city);(g[k]=g[k]||[]).push([c,x])});
    const d=Object.values(g).filter(a=>a.length>1);return d.length?d.slice(0,8).map(a=>a.map(([c,x])=>askLink(c,x)).join(" ⟷ ")).join("<br>")+(d.length>8?`<br><span class="count">+${fmt(d.length-8)}</span>`:""):t("askDup")}
  if(p.miss){if(!adm)return t("askAdm");const out=[];ORDER.forEach(c=>{const a=data[c];if(!a.length)return;const g=a.filter(x=>!parseGps(x.gps)).length,r=c==="duat"?0:a.filter(x=>!respOf(x)).length;out.push(`${CATS[c].ic} ${cl(c)}: ${fmt(a.length)} — 📍 ${fmt(g)} · 👤 ${fmt(r)}`)});
    return out.join("<br>")+`<br><span class="count">📍 = ${LANG==="fr"?"sans GPS":"بلا إحداثيات"} · 👤 = ${LANG==="fr"?"sans responsable":"بلا مسؤول"}</span>`}
  const rows=pick(p,allRows().filter(({x})=>adm||x.status==="verified"));
  if(p.near){
    const pos=await new Promise(ok=>navigator.geolocation?navigator.geolocation.getCurrentPosition(g=>ok([g.coords.latitude,g.coords.longitude]),()=>ok(null),{timeout:12000,enableHighAccuracy:true}):ok(null));
    if(!pos)return t("askGps");
    const w=rows.map(({c,x})=>({c,x,g:parseGps(x.gps)})).filter(o=>o.g).map(o=>({...o,d:hav(pos,o.g)})).sort((a,b)=>a.d-b.d).slice(0,5);
    return w.length?w.map(o=>askLink(o.c,o.x,` · 📏 ${o.d<1?Math.round(o.d*1000)+" m":o.d.toFixed(1)+" km"}`)).join("<br>"):t("askNoGps")}
  if(p.count){
    if(!rows.length)return LANG==="fr"?"0":"٠ — "+t("askNone");
    const by={};rows.forEach(({c,x})=>{const o=by[c]=by[c]||[0,0];o[0]++;if(x.status==="verified")o[1]++});
    const where=p.places.length?" · "+p.places.map(n=>esc(n)).join("، "):"";
    return Object.entries(by).map(([c,[n,v]])=>`${CATS[c].ic} ${cl(c)}: <b>${fmt(n)}</b>${adm&&v<n?` <span class="count">(✅ ${fmt(v)} · 🕓 ${fmt(n-v)})</span>`:""}`).join("<br>")+`<br><span class="count">${rows.length>1?"Σ "+fmt(rows.length)+where:where}</span>`}
  if(!rows.length||(!p.cats.length&&!p.places.length&&nz(q).length<3))return t("askNone");
  return rows.slice(0,8).map(({c,x})=>askLink(c,x)).join("<br>")+(rows.length>8?`<br><span class="count">+${fmt(rows.length-8)} …</span>`:"")}
function renderAsk(){
  const adm=isAdmin()||isRegAdmin(),sg=L(S.askS),sa=L(S.askSA);
  return `<div class="sec"><h2>🤖 ${t("askT")}</h2><div class="hint">${t("askNote")}</div>
   <div id="askchat" class="askchat"><div class="ab bot">${t("askHello")}</div></div>
   <div class="askchips">${sg.map(s=>`<button class="chip" onclick="APP.askQ(this.textContent)">${esc(s)}</button>`).join("")}${adm?sa.map(s=>`<button class="chip" onclick="APP.askQ(this.textContent)">🛠 ${esc(s)}</button>`).join(""):""}</div>
   <form class="askf" onsubmit="event.preventDefault();APP.askQ(document.getElementById('askin').value)"><input id="askin" placeholder="${esc(t("askPh"))}" autocomplete="off"><button class="bp" type="submit">${t("askGo")}</button></form></div>`}
APP.askQ=async q=>{q=String(q||"").replace(/^🛠\s*/,"").trim();if(!q)return;
  const box=$("#askchat");if(!box)return;const inp=$("#askin");if(inp)inp.value="";
  box.insertAdjacentHTML("beforeend",`<div class="ab me">${esc(q)}</div>`);
  const w=document.createElement("div");w.className="ab bot";w.textContent="…";box.appendChild(w);box.scrollTop=box.scrollHeight;
  let a;try{a=await answer(q)}catch(e){a=t("askNone")}
  w.innerHTML=a;box.scrollTop=box.scrollHeight};
/* ---------- حماية البيانات ---------- */
function renderPrivacy(){
  const P=LANG==="fr"?[
   ["🎯 Finalité","Les données servent uniquement à faire connaître, organiser et statistiquer les institutions sunnites du Mali, au service de la communauté."],
   ["👁️ Ce qui est public","Le visiteur ne voit que les fiches vérifiées : nom, type et localisation de l'établissement."],
   ["📞 Téléphones et données de personnes","Jamais affichés aux visiteurs. Ils sont conservés séparément et seuls les administrateurs y accèdent."],
   ["✅ Exactitude","Aucune information n'est publiée avant vérification par un délégué habilité. Chacun peut demander une correction ou la suppression de ses données via le bouton « Signaler »."],
   ["🔐 Sécurité","Comptes à rôles, journal des modifications, règles d'accès côté serveur et sauvegardes."],
   ["⚖️ Cadre légal","Le projet s'inspire des principes de la loi malienne n° 2013-015 sur la protection des données à caractère personnel (finalité, exactitude, sécurité, respect de la vie privée). Texte à valider avec un juriste avant adoption définitive."]
  ]:[
   ["🎯 الغرض من جمع البيانات","تُجمع البيانات للتعريف بالمؤسسات السنية في مالي وتنظيمها وإحصائها وخدمة المجتمع، ولا تُستعمل في غير ذلك."],
   ["👁️ ما يراه الزائر","لا يرى الزائر إلا المؤسسات الموثقة: الاسم والنوع والموقع العام."],
   ["📞 الهواتف وبيانات الأشخاص","لا تظهر للزوار أبداً، وتُحفظ في مكان منفصل لا يطّلع عليه إلا المشرفون."],
   ["✅ الدقة","لا تُنشر معلومة إلا بعد مراجعة المندوب المخوّل. ولكل شخص أن يطلب تصحيح بياناته أو حذفها عبر زر «إبلاغ» في صفحة المؤسسة."],
   ["🔐 الأمان","حسابات بصلاحيات، وسجل لكل تعديل، وقواعد حماية في الخادم، ونسخ احتياطية."],
   ["⚖️ الإطار القانوني","يراعي المشروع مبادئ القانون المالي رقم 2013-015 لحماية المعطيات ذات الطابع الشخصي (الغرض والدقة والأمان واحترام الخصوصية). والنص يُراجَع مع مختص قانوني قبل الاعتماد النهائي."]];
  return `<div class="sec"><h2>🔒 ${t("prvT")}</h2>${P.map(([h,b])=>`<div class="prv"><b>${h}</b><p>${esc(b)}</p></div>`).join("")}</div>`}
/* ====== نسخة احتياطية كاملة واستعادتها ====== */
Object.assign(S,{
 bkT:["النسخة الاحتياطية","Sauvegarde"],
 bkInfo:["ينزّل كل بيانات الدليل (المؤسسات، الأرقام، البطاقات، الأخبار، الإعدادات) في ملف واحد تحفظه في مكان آمن. يُنصح بنسخة كل أسبوع.","Télécharge toutes les données (fiches, numéros, cartes, actualités, réglages) dans un seul fichier. Une sauvegarde par semaine est conseillée."],
 bkPh:["مع الصور (أثقل حجماً وأبطأ)","Avec les photos (plus lourd)"],
 bkB:["💾 نسخة احتياطية الآن","💾 Sauvegarder maintenant"],
 bkR:["♻️ استعادة من نسخة","♻️ Restaurer une sauvegarde"],
 bkLast:["آخر نسخة: {d}","Dernière sauvegarde : {d}"],bkNever:["لم تؤخذ نسخة بعد","Aucune sauvegarde"],
 bkWork:["جارٍ تجميع البيانات…","Préparation…"],
 bkDone:["✅ نُزّلت النسخة: {n} سجل","✅ Sauvegarde : {n} éléments"],
 bkBad:["هذا الملف ليس نسخة احتياطية للدليل","Ce fichier n'est pas une sauvegarde de l'annuaire"],
 bkQ:["ستُستعاد {n} سجلاً وتحلّ محل ما يحمل الرقم نفسه. متابعة؟","{n} éléments seront restaurés et remplaceront ceux ayant le même identifiant. Continuer ?"],
 bkRun:["جارٍ الاستعادة… {i}/{n}","Restauration… {i}/{n}"],
 bkRDone:["✅ اكتملت الاستعادة: {n} سجل","✅ Restauration terminée : {n} éléments"],
 bkRem:["💾 {d} — لا توجد نسخة احتياطية حديثة.","💾 {d} — pas de sauvegarde récente."],
 bkRemNow:["نسخ الآن","Sauvegarder"],bkDays:["منذ {n} يوماً","depuis {n} jours"],bkNone:["لا نسخة بعد","aucune sauvegarde"]
});
const bkDaysAgo=()=>{const t0=ls.get("csm-lastbackup",0);return t0?Math.floor((Date.now()-t0)/864e5):null};
function backupBox(){
  if(!isAdmin())return "";
  const d=ls.get("csm-lastbackup",0);
  return `<div class="card"><h3>💾 ${t("bkT")}</h3><div class="hint">${t("bkInfo")}</div>
   <div class="hint"><b>${d?t("bkLast",{d:dfmt(new Date(d).toISOString())}):t("bkNever")}</b></div>
   <label class="chk"><input type="checkbox" id="bk_ph"> ${t("bkPh")}</label>
   <div class="tools"><button class="bp" onclick="APP.backup()">${t("bkB")}</button>
   <label class="bs btnl" style="cursor:pointer">${t("bkR")}<input type="file" accept=".json,application/json" hidden onchange="APP.restore(this)"></label></div></div>`}
APP.backup=async()=>{
  if(!isAdmin())return;
  const withPh=!!($("#bk_ph")&&$("#bk_ph").checked);toast(t("bkWork"));
  const out={app:"csm-dalil",v:APP_VERSION,at:new Date().toISOString(),data:{},phones:{...phones},cards:cards.map(k=>({...k})),news:news.map(k=>({...k})),
    config:{site:CONFIG.site||{},lists:CONFIG.lists||{}},photos:{}};
  let n=0;ALLC.forEach(c=>{out.data[c]=(data[c]||[]).map(x=>({...x}));n+=out.data[c].length});
  n+=out.cards.length+out.news.length;
  if(withPh){
    const keys=[];ALLC.forEach(c=>data[c].forEach(x=>{if(x.hasPhoto)keys.push(pkey(c,x.id))}));cards.forEach(k=>{if(k.hasPhoto)keys.push("cards__"+k.id)});keys.push("site__sig","site__stamp");
    for(const k of keys){try{const d=await store.getPhoto(k);if(okImg(d))out.photos[k]=d}catch(e){}}}
  const day=new Date().toISOString().slice(0,10);
  dl(`CSM-backup-${day}.json`,JSON.stringify(out),"application/json");
  ls.set("csm-lastbackup",Date.now());toast(t("bkDone",{n:fmt(n)}));render();
};
APP.restore=async inp=>{
  const f=inp.files&&inp.files[0];inp.value="";if(!f||!isAdmin())return;
  let b;try{b=JSON.parse(await f.text())}catch(e){toast(t("bkBad"));return}
  if(!b||b.app!=="csm-dalil"||typeof b.data!=="object"){toast(t("bkBad"));return}
  const jobs=[];
  ALLC.forEach(c=>(Array.isArray(b.data[c])?b.data[c]:[]).forEach(x=>{if(x&&x.id){const o={...x};delete o.id;jobs.push(()=>store.save(c,x.id,o))}}));
  Object.entries(b.phones||{}).forEach(([k,p])=>{const i=k.indexOf("__");if(i>0&&p)jobs.push(()=>store.savePhone(k.slice(0,i),k.slice(i+2),p))});
  (b.cards||[]).forEach(x=>{if(x&&x.id)jobs.push(()=>store.saveCard(x.id,x))});
  (b.news||[]).forEach(x=>{if(x&&x.id){const o={...x};delete o.id;jobs.push(()=>store.saveNews(x.id,o))}});
  Object.entries(b.photos||{}).forEach(([k,d])=>{if(okImg(d))jobs.push(()=>store.savePhoto(k,d))});
  if(b.config&&b.config.site)jobs.push(()=>store.saveConfig("site",b.config.site));
  if(b.config&&b.config.lists)jobs.push(()=>store.saveConfig("lists",b.config.lists));
  if(!jobs.length){toast(t("bkBad"));return}
  if(!confirm(t("bkQ",{n:fmt(jobs.length)})))return;
  let i=0;for(const j of jobs){try{await j()}catch(e){}i++;if(i%25===0)toast(t("bkRun",{i:fmt(i),n:fmt(jobs.length)}))}
  toast(t("bkRDone",{n:fmt(jobs.length)}));
};
{const _b=banner;banner=()=>{let h=_b();
  if(isAdmin()&&!DEMO&&view==="home"){const n=bkDaysAgo(),total=ALLC.reduce((a,c)=>a+data[c].length,0);
    if(total>0&&(n===null||n>=7))h+=`<div class="banner">${t("bkRem",{d:n===null?t("bkNone"):t("bkDays",{n:fmt(n)})})} <button class="lnkb" onclick="APP.backup()">${t("bkRemNow")}</button></div>`}
  return h}}
/* ====== تقرير النواقص لكل إقليم (للطباعة وإرساله إلى مشرف الإقليم) ====== */
Object.assign(S,{
 gapsT:["تقرير النواقص","Rapport des manquants"],gaps:["تقرير النواقص","Rapport des manquants"],
 gapsHint:["قائمة بالمؤسسات التي ينقصها بيان مهم، لتسلّمها إلى مشرف الإقليم ليكملها.","Fiches auxquelles il manque une information importante, à remettre au superviseur de la région."],
 gapsAllR:["كل الأقاليم","Toutes les régions"],gapsAllT:["كل أنواع النقص","Tous les manquants"],
 gGps:["الإحداثيات","GPS"],gPlace:["الموقع","Localisation"],gResp:["المسؤول","Responsable"],gPhone:["الهاتف","Téléphone"],
 gapsTot:["المؤسسات: {n} — فيها نقص: {g} — مكتملة: {o}","Fiches : {n} — incomplètes : {g} — complètes : {o}"],
 gapsNone:["لا نقص ظاهر، بارك الله فيكم 👏","Rien à compléter 👏"],
 gapsMiss:["الناقص","Manquant"],gapsPhNote:["ملاحظة: نقص الهاتف يظهر للمشرف العام فقط.","Note : le téléphone manquant n'est visible que par l'administrateur."]
});
let gapR="",gapT="";
APP.gapSet=(k,v)=>{if(k==="r")gapR=v;else gapT=v;render()};
const GAPK=[["gps","gGps"],["place","gPlace"],["resp","gResp"],["phone","gPhone"],["stale","gStale"]];
function gapsOf(c,x){
  const g=[];
  if(!parseGps(x.gps))g.push("gps");
  if(x.region===BAMAKO?!(x.commune||x.quarter):!(x.commune||x.city))g.push("place");
  if(c!=="duat"&&!respOf(x))g.push("resp");
  if(isAdmin()&&!phones[pkey(c,x.id)])g.push("phone");
  const d=x.updatedAt||x.verifiedAt||x.createdAt;
  if(d&&Date.now()-new Date(d).getTime()>365*864e5)g.push("stale");
  return g}
function renderGaps(){
  if(!(isAdmin()||isRegAdmin()))return `<div class="empty">${t("askAdm")}</div>`;
  const reg=isAdmin()?gapR:(me.region||"");
  const all=allRows().filter(({c,x})=>c!=="offices"&&(!reg||x.region===reg)).map(({c,x})=>({c,x,g:gapsOf(c,x)}));
  const bad=all.filter(o=>o.g.length&&(!gapT||o.g.includes(gapT)));
  const cnt={};GAPK.forEach(([k])=>cnt[k]=all.filter(o=>o.g.includes(k)).length);
  bad.sort((a,b)=>REGIONS.indexOf(a.x.region)-REGIONS.indexOf(b.x.region)||String(a.x.commune||"").localeCompare(String(b.x.commune||""),"ar")||String(a.x.name).localeCompare(String(b.x.name),"ar"));
  const row=(o,i)=>`<tr><td class="num">${i+1}</td><td dir="ltr" class="cd">${esc(o.x.code||"")}</td><td><b>${CATS[o.c].ic} ${esc(o.x.name)}</b></td><td>${esc(placeOf(o.x))}</td><td>${o.g.map(k=>`<span class="gp">${esc(L(S[GAPK.find(z=>z[0]===k)[1]]))}</span>`).join(" ")}</td><td>${o.x.status==="verified"?"✅":"🕓"}</td></tr>`;
  const head=`<tr><th>#</th><th>${t("codeL")}</th><th>${t("name")}</th><th>${t("prPlace")}</th><th>${t("gapsMiss")}</th><th></th></tr>`;
  let n=0;const grp={};bad.forEach(o=>{const k=(o.x.region||"—")+"|"+(o.x.commune||"");(grp[k]=grp[k]||[]).push(o)});
  const body=Object.entries(grp).map(([k,a])=>{const [r,cm]=k.split("|");return `<h3 class="prg">📍 ${esc(tv(r))}${cm?" › "+esc(tv(cm)):""} <span>(${fmt(a.length)})</span></h3><table class="prt"><thead>${head}</thead><tbody>${a.map(o=>row(o,n++)).join("")}</tbody></table>`}).join("");
  const sel=isAdmin()?`<select onchange="APP.gapSet('r',this.value)"><option value="">${t("gapsAllR")}</option>${REGIONS.map(r=>`<option value="${esc(r)}" ${gapR===r?"selected":""}>${esc(tv(r))}</option>`).join("")}</select>`:"";
  const typ=`<select onchange="APP.gapSet('t',this.value)"><option value="">${t("gapsAllT")}</option>${GAPK.filter(([k])=>k!=="phone"||isAdmin()).map(([k,l])=>`<option value="${k}" ${gapT===k?"selected":""}>${esc(L(S[l]))} (${fmt(cnt[k])})</option>`).join("")}</select>`;
  return `<div class="tools noprint">${sel}${typ}<button class="bp" onclick="print()">${t("prGo")}</button></div><div class="hint noprint">${t("gapsHint")} ${isAdmin()?"":t("gapsPhNote")}</div>
   <div class="prdoc"><div class="prhd"><img src="logo.png" alt=""><div><b>${esc(L(["تجمع أهل السنة والجماعة في مالي","Communauté Sunnite du Mali (CSM)"]))}</b><h2>📋 ${t("gapsT")}${reg?" — "+esc(tv(reg)):""}</h2>
   <div class="count">${t("prDate")}: ${dfmt(new Date().toISOString())}</div></div><img src="mali-flag.svg" alt="" class="fl"></div>
   <div class="prtot">${t("gapsTot",{n:fmt(all.length),g:fmt(all.filter(o=>o.g.length).length),o:fmt(all.filter(o=>!o.g.length).length)})} · ${GAPK.filter(([k])=>k!=="phone"||isAdmin()).map(([k,l])=>esc(L(S[l]))+": "+fmt(cnt[k])).join(" · ")}</div>
   ${bad.length?body:`<div class="empty">${t("gapsNone")}</div>`}
   <div class="prft">youssoufsid.github.io/csm-dalil — ${esc(L(["دليل المؤسسات السنية في مالي","Annuaire des institutions sunnites du Mali"]))}</div></div>`}
/* ====== لوحات QR: صفحة عامة لكل مؤسسة موثقة + طباعة ملصقات جاهزة ====== */
Object.assign(S,{
 qrB:["🔳 لوحات QR","🔳 Plaques QR"],
 qrT:["لوحات QR — {c}","Plaques QR — {c}"],
 qrHint:["كل لوحة تفتح صفحة المؤسسة مباشرة لأي شخص دون حساب. تُطبع المؤسسات الموثقة فقط، وتُحترم التصفية الحالية (الإقليم، الدائرة…).","Chaque plaque ouvre directement la fiche, sans compte. Seules les fiches vérifiées sont imprimées, selon le filtre en cours."],
 qrScan:["امسح للتعريف بالمؤسسة","Scannez pour la fiche"],
 qrNone:["لا توجد مؤسسات موثقة مطابقة للتصفية","Aucune fiche vérifiée pour ce filtre"],
 qrPer:["في الصفحة","Par page"],qrN:["العدد: {n}","Nombre : {n}"]
});
let qrPer=6;
APP.qrPer=v=>{qrPer=+v||6;render()};
function renderQrSheet(c){
  if(!CATS[c])return "";
  const rows=filterRows(c).filter(x=>x.status==="verified").sort((a,b)=>REGIONS.indexOf(a.region)-REGIONS.indexOf(b.region)||String(a.commune||"").localeCompare(String(b.commune||""),"ar")||String(a.name).localeCompare(String(b.name),"ar"));
  const base=location.origin+location.pathname;
  const lab=x=>`<div class="qrl"><div class="qrh"><img src="logo.png" alt=""><b>${esc(L(["تجمع أهل السنة والجماعة في مالي","Communauté Sunnite du Mali"]))}</b></div>
    <div class="qrc" data-u="${esc(base+"#i/"+c+"/"+encodeURIComponent(x.id))}"></div>
    <div class="qrn">${CATS[c].ic} ${esc(x.name)}</div><div class="qrp">${esc(locLine(x))}</div>
    ${x.code?`<div class="qrk" dir="ltr">${esc(x.code)}</div>`:""}<div class="qrs">${t("qrScan")}</div></div>`;
  return `<div class="tools noprint"><a class="back" href="#${c}">${t("back")}</a>
    <label>${t("qrPer")}: <select onchange="APP.qrPer(this.value)">${[2,4,6,9].map(n=>`<option ${qrPer===n?"selected":""}>${n}</option>`).join("")}</select></label>
    <button class="bp" onclick="print()">${t("prGo")}</button></div>
   <div class="hint noprint">${t("qrHint")} · ${t("qrN",{n:fmt(rows.length)})}</div>
   <div class="qrg per${qrPer}">${rows.length?rows.map(lab).join(""):`<div class="empty">${t("qrNone")}</div>`}</div>`}
async function afterQrSheet(){
  try{await loadScript("lib/qrcode.js")}catch(e){return}
  document.querySelectorAll(".qrc[data-u]").forEach(el=>{try{const q=window.qrcode(0,"M");q.addData(el.dataset.u);q.make();el.innerHTML=q.createSvgTag({cellSize:4,margin:2});el.removeAttribute("data-u")}catch(e){}})}
/* ====== زيادات: الإدخال السريع للمندوب · الدليل في أرقام · ملخص الشهر ====== */
Object.assign(S,{
 qkT:["إدخال سريع","Saisie rapide"],quick:["إدخال سريع","Saisie rapide"],
 qkHint:["شاشة مبسّطة للميدان: اكتب الاسم، واضغط «موقعي»، والتقط صورة، ثم احفظ. تبقى الفئة والإقليم والحي كما هي للمؤسسة التالية.","Écran simplifié : nom, « Ma position », photo, puis enregistrer. Catégorie, région et lieu sont conservés pour la fiche suivante."],
 qkCat:["الفئة","Catégorie"],qkName:["اسم المؤسسة","Nom"],qkPlace:["الحي أو القرية","Quartier ou village"],qkPhone:["هاتف المسؤول (اختياري)","Téléphone du responsable (facultatif)"],
 qkGps:["📍 موقعي","📍 Ma position"],qkPhoto:["📷 صورة","📷 Photo"],qkSave:["💾 حفظ وإضافة التالي","💾 Enregistrer et suivant"],
 qkNeed:["اكتب الاسم واختر الإقليم","Nom et région obligatoires"],qkCount:["حُفظ في هذه الجلسة: {n}","Enregistrées : {n}"],qkGot:["✅ تم تحديد الموقع","✅ Position prise"],
 numT:["الدليل في أرقام","L'annuaire en chiffres"],numbers:["الدليل في أرقام","L'annuaire en chiffres"],
 numNote:["أرقام المؤسسات الموثقة فقط، دون أسماء أشخاص أو هواتف.","Fiches vérifiées uniquement, sans noms de personnes ni téléphones."],
 numTot:["المجموع","Total"],numReg:["حسب الإقليم","Par région"],numShare:["📤 مشاركة الأرقام","📤 Partager"],
 mrepT:["ملخص الشهر","Bilan du mois"],mrep:["ملخص الشهر","Bilan du mois"],
 mrNew:["مسجّلة هذا الشهر","Enregistrées ce mois"],mrVer:["وُثّقت هذا الشهر","Vérifiées ce mois"],mrPen:["بانتظار التوثيق الآن","En attente"],mrGap:["فيها نقص","Incomplètes"],
 mrRep:["ملاحظات واردة","Remarques reçues"],mrRepD:["عولجت منها","traitées"],mrepTotal:["إجمالي المؤسسات","Total des fiches"],mrepMonth:["الشهر","Mois"],
 gStale:["لم تُحدَّث منذ سنة","Non mise à jour depuis 1 an"]
});
const mosqueCats=()=>ORDER.filter(c=>c!=="offices");
/* ---------- الإدخال السريع ---------- */
let qkN=0,qkPhoto=null;
function renderQuick(){
  if(!canWrite()||me.role==="guest")return `<div class="empty">${t("askAdm")}</div>`;
  const last=ls.get("csm-lastloc",{})||{},cat=ls.get("csm-quick-cat","mosques"),fixed=!isAdmin()&&me.region;
  const reg=fixed?me.region:(last.region||"");
  return `<div class="sec"><h2>⚡ ${t("qkT")}</h2><div class="hint">${t("qkHint")}</div>
   <div class="fg" style="margin-top:10px">
    <div class="full"><label>${t("qkCat")}</label><select id="qk_c" onchange="APP.qkCat(this.value)">${mosqueCats().map(c=>`<option value="${c}" ${c===cat?"selected":""}>${CATS[c].ic} ${esc(cl(c))}</option>`).join("")}</select></div>
    <div class="full"><label>${t("qkName")} <b>*</b></label><input id="qk_n" autocomplete="off" style="font-size:18px"></div>
    <div><label>${t("region")} <b>*</b></label><select id="qk_r" ${fixed?"disabled":""}><option value="">${t("choose")}</option>${REGIONS.map(r=>`<option value="${esc(r)}" ${reg===r?"selected":""}>${esc(tv(r))}</option>`).join("")}</select></div>
    <div><label>${t("qkPlace")}</label><input id="qk_p" value="${esc(last.quarter||"")}" autocomplete="off"></div>
    <div class="full"><label>${t("qkPhone")}</label><input id="qk_t" type="tel" dir="ltr" autocomplete="off"></div>
   </div>
   <div class="tools" style="margin-top:10px"><button class="bg" type="button" onclick="APP.qkGps()">${t("qkGps")}</button>
    <label class="bs btnl" style="cursor:pointer">${t("qkPhoto")}<input type="file" accept="image/*" capture="environment" hidden onchange="APP.qkPh(this)"></label>
    <span class="count" id="qk_i"></span></div>
   <div class="err" id="qk_e"></div>
   <div class="tools"><button class="bp" style="font-size:17px;padding:13px 26px" onclick="APP.qkSave()">${t("qkSave")}</button><span class="count" id="qk_k">${qkN?t("qkCount",{n:fmt(qkN)}):""}</span></div></div>`}
let qkGpsV="";
APP.qkCat=v=>ls.set("csm-quick-cat",v);
APP.qkGps=()=>{if(!navigator.geolocation){toast(t("gpsNo"));return}
  $("#qk_i").textContent=t("gpsWait");
  navigator.geolocation.getCurrentPosition(p=>{qkGpsV=p.coords.latitude.toFixed(5)+", "+p.coords.longitude.toFixed(5);$("#qk_i").textContent=t("qkGot")+" ("+fmt(Math.round(p.coords.accuracy))+" m)"},()=>{$("#qk_i").textContent=t("gpsErr")},{enableHighAccuracy:true,timeout:20000})};
APP.qkPh=async inp=>{const f=inp.files&&inp.files[0];inp.value="";if(!f)return;try{qkPhoto=await compressImage(f);$("#qk_i").textContent=(qkGpsV?"📍 ":"")+"📷 ✓"}catch(e){}};
APP.qkSave=async()=>{
  const c=$("#qk_c").value,name=$("#qk_n").value.trim(),region=$("#qk_r").value||(me.region||""),place=$("#qk_p").value.trim(),ph=$("#qk_t").value.trim();
  if(!name||!region){$("#qk_e").textContent=t("qkNeed");return}
  $("#qk_e").textContent="";
  const now=new Date().toISOString(),o={name,region,status:"pending",createdAt:now,updatedAt:now,createdBy:me.uid,createdByName:me.name,updatedBy:me.uid,updatedByName:me.name};
  if(place){if(region===BAMAKO){o.quarter=place;}else o.city=place}
  if(qkGpsV)o.gps=qkGpsV;if(qkPhoto)o.hasPhoto=true;
  if(c==="duat")o.gender=o.gender||"";
  const id=newId();ls.set("csm-quick-cat",c);ls.set("csm-lastloc",{region,quarter:place});
  try{await store.save(c,id,o);if(ph)await store.savePhone(c,id,ph);if(qkPhoto)await store.savePhoto(pkey(c,id),qkPhoto);
    logAct("add",c,id,name,null);ls.set("csm-lastloc",{region,quarter:place});qkN++;qkGpsV="";qkPhoto=null;
    toast(navigator.onLine?t("saved"):t("savedOffline"));
    $("#qk_n").value="";$("#qk_t").value="";$("#qk_i").textContent="";$("#qk_k").textContent=t("qkCount",{n:fmt(qkN)});$("#qk_n").focus()
  }catch(e){$("#qk_e").textContent=errMsg(e)}};
/* ---------- الدليل في أرقام (عام) ---------- */
function numData(){
  const cats=mosqueCats(),rows=allRows().filter(({c,x})=>c!=="offices"&&x.status==="verified");
  const byC={},byR={};cats.forEach(c=>byC[c]=0);
  rows.forEach(({c,x})=>{byC[c]++;const r=x.region||"—";(byR[r]=byR[r]||{})[c]=((byR[r]||{})[c]||0)+1});
  return {cats,byC,byR,total:rows.length}}
APP.numShare=()=>{const d=numData();const lines=d.cats.filter(c=>d.byC[c]).map(c=>`${CATS[c].ic} ${cl(c)}: ${fmt(d.byC[c])}`);
  open("https://wa.me/?text="+encodeURIComponent(`${t("numT")} — ${t("appName")}\n${lines.join("\n")}\n${t("numTot")}: ${fmt(d.total)}\n${location.origin+location.pathname}`),"_blank","noopener")};
function renderNumbers(){
  const d=numData(),regs=REGIONS.filter(r=>d.byR[r]),mx=Math.max(1,...regs.map(r=>Object.values(d.byR[r]).reduce((a,b)=>a+b,0)));
  return `<div class="sec"><h2>🔢 ${t("numT")}</h2><div class="hint">${t("numNote")}</div>
   <div class="numg">${d.cats.map(c=>`<div class="numc"><span>${CATS[c].ic}</span><b>${fmt(d.byC[c])}</b><small>${esc(cl(c))}</small></div>`).join("")}<div class="numc tot"><span>Σ</span><b>${fmt(d.total)}</b><small>${t("numTot")}</small></div></div>
   <h3 style="margin-top:16px">${t("numReg")}</h3>
   ${regs.length?regs.map(r=>{const n=Object.values(d.byR[r]).reduce((a,b)=>a+b,0);return `<div class="nrow"><span class="nl">${esc(tv(r))}</span><span class="nb"><i style="width:${Math.max(3,Math.round(n/mx*100))}%"></i></span><b>${fmt(n)}</b></div>`}).join(""):`<div class="empty">—</div>`}
   <div class="tools noprint" style="margin-top:12px"><button class="bs" onclick="APP.numShare()">${t("numShare")}</button><button class="bp" onclick="print()">${t("prGo")}</button></div></div>`}
/* ---------- ملخص الشهر ---------- */
let mrepMonth=new Date().toISOString().slice(0,7);
APP.mrepSet=v=>{mrepMonth=v||mrepMonth;render()};
function renderMonthRep(){
  if(!(isAdmin()||isRegAdmin()))return `<div class="empty">${t("askAdm")}</div>`;
  const reg=isAdmin()?"":(me.region||""),m=mrepMonth;
  const all=allRows().filter(({c,x})=>c!=="offices"&&(!reg||x.region===reg));
  const inM=v=>String(v||"").startsWith(m);
  const sum=rs=>({n:rs.length,nw:rs.filter(({x})=>inM(x.createdAt)).length,vf:rs.filter(({x})=>inM(x.verifiedAt)).length,pd:rs.filter(({x})=>x.status!=="verified").length,gp:rs.filter(({c,x})=>gapsOf(c,x).some(k=>k!=="stale")).length});
  const tot=sum(all);
  const reps=reports.filter(r=>inM(r.at)&&(!reg||r.region===reg)),repD=reps.filter(r=>r.status==="done").length;
  const regs=[...new Set(all.map(({x})=>x.region||"—"))].sort((a,b)=>REGIONS.indexOf(a)-REGIONS.indexOf(b));
  const rowR=r=>{const s=sum(all.filter(({x})=>(x.region||"—")===r));return `<tr><td><b>${esc(tv(r))}</b></td><td class="num">${fmt(s.n)}</td><td class="num">${fmt(s.nw)}</td><td class="num">${fmt(s.vf)}</td><td class="num">${fmt(s.pd)}</td><td class="num">${fmt(s.gp)}</td></tr>`};
  const kp=(l,v)=>`<div class="numc"><b>${fmt(v)}</b><small>${l}</small></div>`;
  return `<div class="tools noprint"><label>${t("mrepMonth")}: <input type="month" value="${esc(m)}" onchange="APP.mrepSet(this.value)"></label><button class="bp" onclick="print()">${t("prGo")}</button></div>
   <div class="prdoc"><div class="prhd"><img src="logo.png" alt=""><div><b>${esc(L(["تجمع أهل السنة والجماعة في مالي","Communauté Sunnite du Mali (CSM)"]))}</b><h2>🗓️ ${t("mrepT")} — ${esc(m)}${reg?" — "+esc(tv(reg)):""}</h2><div class="count">${t("prDate")}: ${dfmt(new Date().toISOString())}</div></div><img src="mali-flag.svg" alt="" class="fl"></div>
   <div class="numg">${kp(t("mrepTotal"),tot.n)}${kp(t("mrNew"),tot.nw)}${kp(t("mrVer"),tot.vf)}${kp(t("mrPen"),tot.pd)}${kp(t("mrGap"),tot.gp)}${kp(t("mrRep")+" ("+t("mrRepD")+" "+fmt(repD)+")",reps.length)}</div>
   <table class="prt" style="margin-top:14px"><thead><tr><th>${t("region")}</th><th>${t("mrepTotal")}</th><th>${t("mrNew")}</th><th>${t("mrVer")}</th><th>${t("mrPen")}</th><th>${t("mrGap")}</th></tr></thead><tbody>${regs.map(rowR).join("")||`<tr><td colspan="6">—</td></tr>`}</tbody></table>
   <div class="prft">youssoufsid.github.io/csm-dalil — ${esc(L(["دليل المؤسسات السنية في مالي","Annuaire des institutions sunnites du Mali"]))}</div></div>`}

/* ================= الأخبار ================= */
Object.assign(S,{
 news:["الأخبار","Actualités"],latestNews:["آخر الأخبار","Dernières actualités"],addNews:["+ خبر جديد","+ Nouvelle actualité"],
 newsTitle:["العنوان","Titre"],newsBody:["نص الخبر","Texte"],newsImg:["صورة (اختيارية)","Image (facultative)"],
 newsEmpty:["لا توجد أخبار بعد.","Aucune actualité pour l'instant."],newsSaved:["نُشر الخبر","Actualité publiée"],
 newsDelAsk:["حذف هذا الخبر؟","Supprimer cette actualité ?"],readMore:["اقرأ المزيد","Lire la suite"],
 newsPin:["📌 تثبيت في أعلى الصفحة الرئيسية","📌 Épingler en haut de l'accueil"],
});
function newsCard(n,full){
  const body=String(n.body||"");const short=!full&&body.length>180;
  return `<article class="news ${n.pin?"pin":""}">${okImg(n.img)?`<img src="${okImg(n.img)}" alt="">`:""}<div class="nb">
   <div class="nd">${n.pin?"📌 ":""}${dfmt(n.at)}</div><h3>${esc(n.title)}</h3>
   <p>${esc(short?body.slice(0,180)+"…":body)}</p>
   ${short?`<a class="lnk" href="#news/${esc(n.id)}">${t("readMore")} ${LANG==="fr"?"→":"←"}</a>`:""}
   ${isAdmin()&&full?`<div class="tools" style="margin:10px 0 0"><button class="bs sm" onclick="APP.newsForm('${esc(n.id)}')">✏️ ${t("edit")}</button><button class="bd sm" onclick="APP.newsDel('${esc(n.id)}')">🗑️ ${t("del")}</button></div>`:""}
  </div></article>`;
}
function sortedNews(){return [...news].sort((a,b)=>(b.pin?1:0)-(a.pin?1:0)||String(b.at).localeCompare(String(a.at)))}
function renderNews(id){
  if(id){const n=news.find(z=>z.id===id);return `<div class="tools"><a class="back" href="#news">${t("back")}</a></div>${n?newsCard(n,true):`<div class="empty">—</div>`}`}
  return `${isAdmin()?`<div class="tools"><button class="bp" onclick="APP.newsForm()">${t("addNews")}</button></div>`:""}
   ${news.length?`<div class="newsl">${sortedNews().map(n=>newsCard(n,true)).join("")}</div>`:`<div class="sec empty">📰<br>${t("newsEmpty")}</div>`}`;
}
function homeNews(){
  if(!news.length)return "";
  return `<div class="sech"><h3>📰 ${t("latestNews")}</h3><a href="#news">${t("seeAll")} ${LANG==="fr"?"→":"←"}</a></div><div class="newsh">${sortedNews().slice(0,3).map(n=>newsCard(n,false)).join("")}</div>`;
}
APP.newsForm=id=>{
  const n=id?news.find(z=>z.id===id)||{}:{};
  $("#dt").textContent="📰 "+(id?t("edit"):t("addNews").replace("+ ",""));
  $("#dbody").innerHTML=`<form id="nf"><div class="db">
   <label>${t("newsTitle")} <b>*</b></label><input id="n_t" value="${esc(n.title||"")}" required>
   <label style="margin-top:10px">${t("newsBody")} <b>*</b></label><textarea id="n_b" rows="7" required>${esc(n.body||"")}</textarea>
   <label style="margin-top:10px">${t("newsImg")}</label><input type="file" id="n_i" accept="image/*"><img id="n_p" class="phprev" ${okImg(n.img)?`src="${okImg(n.img)}"`:"hidden"} alt="">
   <label class="chkl"><input type="checkbox" id="n_pin" ${n.pin?"checked":""}> ${t("newsPin")}</label>
   <div class="err" id="nerr"></div></div>
   <div class="df"><button class="bp" type="submit">${t("save")}</button><button class="bs" type="button" onclick="document.getElementById('dlg').close()">${t("cancel")}</button></div></form>`;
  let img=okImg(n.img);
  $("#n_i").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{img=await compressImage(f,1000,.6);const p=$("#n_p");p.src=img;p.hidden=false}catch(x){toast(t("photoErr"))}};
  $("#nf").onsubmit=async e=>{e.preventDefault();
    const title=$("#n_t").value.trim(),body=$("#n_b").value.trim();
    if(!title||!body){$("#nerr").textContent=t("fill")+(title?t("newsBody"):t("newsTitle"));return}
    await store.saveNews(id||newId(),{title,body,img,pin:$("#n_pin").checked,at:n.at||new Date().toISOString(),updatedAt:new Date().toISOString(),by:me.uid||"",byName:me.name||""});
    dlg.close();toast(t("newsSaved"));if(!location.hash.startsWith("#news"))location.hash="news";};
  if(!dlg.open)dlg.showModal();
};
APP.newsDel=id=>{if(confirm(t("newsDelAsk"))){store.delNews(id);toast(t("deleted"));location.hash="news"}};
/* ================= التحديث التلقائي (الهاتف والحاسوب) =================
   - يتحقق التطبيق من وجود نسخة جديدة عند الفتح، وعند الرجوع إليه، وكل 20 دقيقة.
   - إن وُجدت: يتحدّث تلقائياً إن لم يكن المستخدم يكتب في نموذج، وإلا يظهر شريط «تحديث الآن».
   - زر «🔄 تحديث التطبيق» في القائمة يفرض أحدث نسخة فوراً. */
const APP_VERSION="36";
Object.assign(S,{
 updAvail:["✨ يتوفر تحديث جديد للتطبيق","✨ Une nouvelle version est disponible"],updNow:["تحديث الآن","Mettre à jour"],
 updBtn:["🔄 تحديث التطبيق","🔄 Mettre à jour l'app"],updDone:["✅ تم تحديث التطبيق إلى الإصدار {v}","✅ Application mise à jour (version {v})"],
 updLatest:["التطبيق محدَّث (الإصدار {v})","Application à jour (version {v})"],updOff:["لا اتصال بالإنترنت الآن","Pas de connexion Internet"],
 verL:["الإصدار","Version"]
});
let _swReg=null,_updShown=false;
async function hardRefresh(){
  try{if(_swReg){await _swReg.update().catch(()=>{});if(_swReg.waiting)_swReg.waiting.postMessage("skip")}}catch(e){}
  try{const ks=await caches.keys();await Promise.all(ks.map(k=>caches.delete(k)))}catch(e){}
  ls.set("csm-justupd",1);
  location.replace(location.pathname+"?u="+Date.now()+location.hash);
}
async function remoteVersion(){
  try{const r=await fetch("version.json?t="+Date.now(),{cache:"no-store"});if(!r.ok)return null;const j=await r.json();return String(j.v||"")}catch(e){return null}
}
const busy=()=>dlg&&dlg.open&&!!document.getElementById("frm");
function updBanner(){
  if(_updShown)return;_updShown=true;
  const b=document.createElement("div");b.id="updbar";
  b.innerHTML=`<span>${t("updAvail")}</span><button class="bp" onclick="APP.update()">${t("updNow")}</button><button class="x" onclick="this.parentNode.remove()">✕</button>`;
  document.body.appendChild(b);
}
async function checkUpdate(manual){
  if(!navigator.onLine){if(manual)toast(t("updOff"));return}
  const v=await remoteVersion();
  if(v&&v!==APP_VERSION){
    // منع التكرار: محاولة تلقائية واحدة لكل إصدار، وبعدها شريط «تحديث الآن»
    if(busy()||ls.get("csm-updtried","")===v)updBanner();else{ls.set("csm-updtried",v);hardRefresh()}return}
  if(manual)toast(t("updLatest",{v:APP_VERSION}));
}
APP.update=()=>hardRefresh();
APP.checkUpdate=()=>checkUpdate(true);
if("serviceWorker" in navigator&&location.protocol!=="file:"){
  navigator.serviceWorker.register("sw.js").then(r=>{_swReg=r;r.update().catch(()=>{})}).catch(()=>{});
  // حين يتولى عاملُ خدمة جديد الصفحة: إعادة تحميل واحدة لتظهر النسخة الجديدة
  let _reloaded=false;const _hadCtrl=!!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!_hadCtrl||_reloaded||busy())return;_reloaded=true;location.reload()});
}
setTimeout(()=>checkUpdate(false),4000);
setInterval(()=>checkUpdate(false),20*60*1000);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){checkUpdate(false);if(_swReg)_swReg.update().catch(()=>{})}});
addEventListener("online",()=>checkUpdate(false));
if(ls.get("csm-justupd",0)){ls.set("csm-justupd",0);setTimeout(()=>toast(t("updDone",{v:APP_VERSION})),1500);
  if(location.search.includes("u="))history.replaceState(null,"",location.pathname+location.hash)}
/* ================= التشغيل ================= */
addEventListener("hashchange",()=>{view=decodeURIComponent(location.hash.slice(1))||"home";filt.q="";filt.status="";document.body.classList.remove("open");if(dlg.open)dlg.close();render();if(!view.startsWith("i/"))(scrollTo(0,0),document.getElementById("col")&&(document.getElementById("col").scrollTop=0))});
$("#fab").onclick=()=>CATS[view]&&APP.form(view);
(async()=>{
  $("#main").innerHTML=`<div class="empty">${t("loading")}</div>`;
  try{store=DEMO?LocalStore():await FirebaseStore();await store.start()}
  catch(e){console.error(e);$("#main").innerHTML=`<div class="banner">${t("loadErr")}</div>`}
})();
