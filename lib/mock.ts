import { EXAMPLE_PHOTOS } from "./examplePhotos";
import type { Issue, Project, Proposal } from "./types";

const photo = (id: string) => EXAMPLE_PHOTOS.find((p) => p.id === id)?.src ?? "";

export const seedIssues: Issue[] = [
  {
    id: "i1",
    ref: "MRK-48102",
    title: {
      fr: "Nid-de-poule dangereux sur l'avenue Mohammed V",
      en: "Dangerous pothole on Avenue Mohammed V",
      ar: "حفرة خطيرة في شارع محمد الخامس",
    },
    description: {
      fr: "Grand nid-de-poule au milieu de la chaussée, dangereux pour les deux-roues, surtout la nuit. Plusieurs crevaisons signalées cette semaine.",
      en: "A large pothole in the middle of the road, dangerous for two-wheelers, especially at night. Several punctures reported this week.",
      ar: "حفرة كبيرة في وسط الطريق، خطيرة على الدراجات خاصة ليلًا. تم الإبلاغ عن عدة ثقوب هذا الأسبوع.",
    },
    category: "route",
    status: "ouvert",
    lat: 31.6295,
    lng: -7.9889,
    landmarkId: "independance",
    photo: photo("pothole"),
    upvotes: 142,
    supportedByMe: false,
    reporter: "Yasmine B.",
    createdAt: "10 nov. 2026",
    updates: [
      {
        date: "10 nov. 2026",
        text: {
          fr: "Signalement créé par Yasmine B.",
          en: "Report created by Yasmine B.",
          ar: "تم إنشاء البلاغ بواسطة Yasmine B.",
        },
      },
    ],
  },
  {
    id: "i2",
    ref: "MRK-48177",
    title: {
      fr: "Lampadaire cassé rue Bab Doukkala",
      en: "Broken streetlight on rue Bab Doukkala",
      ar: "عمود إنارة مكسور في شارع باب دكال",
    },
    description: {
      fr: "Lampadaire éteint depuis plus d'une semaine : le tronçon est plongé dans le noir, insécurité pour les piétons le soir.",
      en: "Streetlight out for over a week: the stretch is pitch dark, unsafe for pedestrians at night.",
      ar: "عمود الإنارة معطّل منذ أكثر من أسبوع: الشارع مظلم تمامًا، خطر على المارة ليلًا.",
    },
    category: "eclairage",
    status: "ouvert",
    lat: 31.6328,
    lng: -8.0075,
    landmarkId: "bab-doukkala",
    photo: photo("lamp"),
    upvotes: 57,
    supportedByMe: false,
    reporter: "Karim A.",
    createdAt: "12 nov. 2026",
    updates: [
      {
        date: "12 nov. 2026",
        text: {
          fr: "Signalement créé par Karim A.",
          en: "Report created by Karim A.",
          ar: "تم إنشاء البلاغ بواسطة Karim A.",
        },
      },
    ],
  },
  {
    id: "i3",
    ref: "MRK-48201",
    title: {
      fr: "Poubelles débordantes près du marché de Guéliz",
      en: "Overflowing bins near Guéliz market",
      ar: "حاويات قمامة فائضة بالقرب من سوق جيليز",
    },
    description: {
      fr: "Les poubelles débordent depuis plusieurs jours : odeurs et déchets au sol autour du marché.",
      en: "Bins have been overflowing for days: smells and litter all around the market.",
      ar: "تفيض الحاويات منذ أيام: روائح وأوساخ حول السوق.",
    },
    category: "proprete",
    status: "en-cours",
    lat: 31.6342,
    lng: -7.9901,
    landmarkId: "guelliz-market",
    photo: photo("litter"),
    upvotes: 89,
    supportedByMe: false,
    reporter: "Salma R.",
    createdAt: "13 nov. 2026",
    updates: [
      {
        date: "13 nov. 2026",
        text: {
          fr: "Signalement créé par Salma R.",
          en: "Report created by Salma R.",
          ar: "تم إنشاء البلاغ بواسطة Salma R.",
        },
      },
      {
        date: "14 nov. 2026",
        text: {
          fr: "Équipe de propreté déployée sur le secteur (simulation).",
          en: "Cleaning crew dispatched to the area (simulated).",
          ar: "تم إرسال فريق نظافة إلى المنطقة (محاكاة).",
        },
      },
    ],
  },
  {
    id: "i4",
    ref: "MRK-48055",
    title: {
      fr: "Arbre tombé sur le trottoir, boulevard Mohammed VI",
      en: "Tree fallen on the sidewalk, Blvd Mohammed VI",
      ar: "شجرة ساقطة على الرصيف، جادة محمد السادس",
    },
    description: {
      fr: "Un arbre arraché par le vent bloque le trottoir : les piétons sont obligés de passer sur la chaussée.",
      en: "A wind-felled tree blocks the sidewalk: pedestrians have to walk on the road.",
      ar: "شجرة اقتلعتها الرياح تسد الرصيف: المارة مجبرون على Sir في الطريق.",
    },
    category: "espaces-verts",
    status: "resolu",
    lat: 31.6274,
    lng: -7.982,
    landmarkId: "mohammed-vi",
    photo: photo("litter"),
    upvotes: 210,
    supportedByMe: false,
    reporter: "Youssef M.",
    createdAt: "08 nov. 2026",
    updates: [
      {
        date: "08 nov. 2026",
        text: {
          fr: "Signalement créé par Youssef M.",
          en: "Report created by Youssef M.",
          ar: "تم إنشاء البلاغ بواسطة Youssef M.",
        },
      },
      {
        date: "11 nov. 2026",
        text: {
          fr: "Équipe des espaces verts intervenue, trottoir dégagé (simulation).",
          en: "Green-space crew cleared the sidewalk (simulated).",
          ar: "فريق المساحات الخضراء أخلى الرصيف (محاكاة).",
        },
      },
    ],
  },
];

export const seedProposals: Proposal[] = [
  {
    id: "p1",
    title: {
      fr: "Passage piéton sécurisé devant le lycée Omar Ibn Khattab",
      en: "Safe pedestrian crossing outside Omar Ibn Khattab high school",
      ar: "ممر مشاة آمن أمام ثانوية عمر ابن الخطاب",
    },
    description: {
      fr: "Aux heures de sortie, des centaines d'élèves traversent une avenue très passante sans protection. Un passage surélevé réduirait les accidents.",
      en: "At dismissal time, hundreds of students cross a busy avenue unprotected. A raised crossing would prevent accidents.",
      ar: "في أوقات الخروج، يعبر مئات التلاميذ شارعًا مزدحمًا دون حماية. ممر مرتفع من شأنه أن يقلل الحوادث.",
    },
    author: "Association des parents d'élèves",
    category: "securite",
    lat: 31.6246,
    lng: -7.9536,
    landmarkId: "hivernage-school",
    votes: 348,
    votedByMe: false,
    status: "proposee",
    createdAt: "05 nov. 2026",
  },
  {
    id: "p2",
    title: {
      fr: "Un skatepark au parc de la Menara",
      en: "A skatepark in Menara park",
      ar: "منتزه تزلج في حديقة المنارة",
    },
    description: {
      fr: "Le parc est immense mais il n'y a aucune infrastructure pour les jeunes. Un skatepark créerait un vrai lieu de vie.",
      en: "The park is huge but has no infrastructure for young people. A skatepark would create a real community space.",
      ar: "الحديقة واسعة لكنها بلا أي منشأة للشباب. منتزه تزلج سيخلق فضاءً حقيقيًا للحياة.",
    },
    author: "Collectif Jeunesse Guéliz",
    category: "espaces-verts",
    lat: 31.6183,
    lng: -8.0163,
    landmarkId: "menara",
    votes: 512,
    votedByMe: false,
    status: "retenue",
    createdAt: "02 nov. 2026",
  },
  {
    id: "p3",
    title: {
      fr: "Plus de poubelles dans la Médina",
      en: "More bins in the Medina",
      ar: "المزيد من حاويات القمامة في المدينة القديمة",
    },
    description: {
      fr: "Dans plusieurs ruelles de la Médina, aucune poubelle publique : des tas de déchets en permanence.",
      en: "In several Medina alleys there are no public bins: permanent piles of rubbish.",
      ar: "في أزقة عديدة بالمدينة القديمة لا توجد حاويات عمومية: أكوام قمامة دائمة.",
    },
    author: "Habitants du quartier Derb el Ferrane",
    category: "proprete",
    lat: 31.6259,
    lng: -7.9891,
    landmarkId: "jemaa-el-fnaa",
    votes: 96,
    votedByMe: false,
    status: "proposee",
    createdAt: "14 nov. 2026",
  },
];

export const seedProjects: Project[] = [
  {
    id: "pr1",
    title: {
      fr: "Rénovation de la place Jemaa el-Fnaa",
      en: "Renovation of Jemaa el-Fnaa square",
      ar: "تجديد ساحة جامع الفنا",
    },
    description: {
      fr: "Rénovation complète de la place : nouveau pavage, éclairage LED, mobilier urbain et végétalisation des abords.",
      en: "Full renovation of the square: new paving, LED lighting, street furniture and greening of the surroundings.",
      ar: "تجديد شامل للساحة: رصف جديد، إنارة LED، أثاث حضري وتشجير المحيط.",
    },
    category: "route",
    lat: 31.6259,
    lng: -7.9891,
    landmarkId: "jemaa-el-fnaa",
    status: "en-cours",
    progress: 65,
    budget: "8 M MAD",
    startDate: "02 sept. 2026",
    endDate: "30 déc. 2026",
    milestones: [
      {
        label: { fr: "Étude & diagnostic", en: "Study & diagnosis", ar: "دراسة وتشخيص" },
        date: "15 sept. 2026",
        done: true,
      },
      {
        label: { fr: "Travaux de voirie et pavage", en: "Roadworks & paving", ar: "أشغال الطرقات والرصف" },
        date: "20 oct. 2026",
        done: true,
      },
      {
        label: {
          fr: "Nouvel éclairage & mobilier urbain",
          en: "New lighting & street furniture",
          ar: "إنارة وأثاث حضري جديد",
        },
        date: "15 nov. 2026",
        done: false,
      },
      {
        label: { fr: "Réception des travaux", en: "Handover", ar: "استلام الأشغال" },
        date: "30 déc. 2026",
        done: false,
      },
    ],
  },
  {
    id: "pr2",
    title: {
      fr: "Piste cyclable sur l'avenue Mohammed V",
      en: "Bike lane on Avenue Mohammed V",
      ar: "ممر للدراجات في شارع محمد الخامس",
    },
    description: {
      fr: "Création d'une piste cyclable sécurisée de 2,4 km entre la Place de l'Indépendance et le quartier Guéliz.",
      en: "A safe 2.4 km bike lane between Independence Square and the Guéliz district.",
      ar: "إنشاء ممر دراجات آمن بطول 2.4 كم بين ساحة الاستقلال وحي جيليز.",
    },
    category: "route",
    lat: 31.6318,
    lng: -7.9855,
    landmarkId: "independance",
    status: "planifie",
    progress: 10,
    budget: "3,2 M MAD",
    startDate: "01 déc. 2026",
    endDate: "30 juin 2027",
    milestones: [
      { label: { fr: "Appel d'offres", en: "Tender", ar: "نشر طلب العروض" }, date: "15 déc. 2026", done: false },
      { label: { fr: "Début des travaux", en: "Works start", ar: "بداية الأشغال" }, date: "01 févr. 2027", done: false },
      {
        label: { fr: "Mise en service partielle", en: "Partial opening", ar: "دخول جزئي في الخدمة" },
        date: "01 mai 2027",
        done: false,
      },
      { label: { fr: "Livraison", en: "Delivery", ar: "تسليم الأشغال" }, date: "30 juin 2027", done: false },
    ],
  },
];

export const initialIssues = () => structuredClone(seedIssues);
export const initialProposals = () => structuredClone(seedProposals);
export const initialProjects = () => structuredClone(seedProjects);
