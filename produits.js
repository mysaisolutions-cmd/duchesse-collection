/* ============================================
   DUCHESSE COLLECTION — Base de Données Produits
   ============================================ */

const produitsData = [
  {
    id: "elegance-rose-100",
    nom: "Élégance by Duchesse (Rose poudré)",
    categorie: "parfums-de-collection",
    genre: "femme",
    contenance: "100 ml",
    badge: "100 ml - Femme",
    image: "images/duchesse-parfum-1.png",  // ← chemin corrigé
    description: "Le parfum de la femme accomplie. Une composition chyprée moderne avec des notes de bergamote, de patchouli et d'ambre, créant une aura de confiance et de distinction.",
    ventePrivee: true,
    dateEvenement: "2026-08-08T14:00:00"
  },
  {
    id: "elegance-lavande-100",
    nom: "Élégance by Duchesse (Lavande poudré)",
    categorie: "parfums-de-collection",
    genre: "femme",
    contenance: "100 ml",
    badge: "100 ml - Femme",
    image: "images/duchesse-parfum-2.png",  // ← chemin corrigé
    description: "Un classique intemporel qui incarne la force tranquille et le raffinement suprême dans sa version lavande poudré.",
    ventePrivee: true,
    dateEvenement: "2026-08-08T14:00:00"
  },
  {
    id: "rose-100",
    nom: "Rose par Duchesse",
    categorie: "parfums-de-collection",
    genre: "femme",
    contenance: "100 ml",
    badge: "100 ml - Femme",
    image: "images/votre-image-rose.png",  // ← chemin corrigé
    description: "Un hommage intemporel à la reine des fleurs. Un parfum pur et élégant où la rose de Grasse se mêle à des accords de musc blanc et de bois de santal.",
    ventePrivee: true,
    dateEvenement: "2026-08-08T14:00:00"
  },
  {
    id: "passion-50",
    nom: "Passion",
    categorie: "parfums-de-collection",
    genre: "femme",
    contenance: "50 ml",
    badge: "50 ml - Femme",
    image: "images/votre-image-passion.png",  // ← chemin corrigé
    description: "Incarnation de l'audace et du désir, Passion est une fragrance florale et épicée avec des notes de rose bulgare, de jasmin et une touche de poivre rose.",
    ventePrivee: true,
    dateEvenement: "2026-08-08T14:00:00"
  },
  {
    id: "elle-50",
    nom: "Elle",
    categorie: "parfums-de-collection",
    genre: "femme",
    contenance: "50 ml",
    badge: "50 ml - Femme",
    image: "images/duchesse-parfum-4.png",  // ← chemin corrigé
    description: "Une senteur froide et dominante, spécialement dédiée à l'élégance naturelle, affirmée et résolument moderne.",
    ventePrivee: true,
    dateEvenement: "2026-08-08T14:00:00"
  },
  {
    id: "gourmandise-100",
    nom: "Gourmandise",
    categorie: "parfums-de-collection",
    genre: "homme",
    contenance: "100 ml",
    badge: "100 ml - Homme",
    image: "images/duchesse-parfum-5.png",  // ← chemin corrigé
    description: "Un parfum envoûtant qui éveille les sens avec ses notes sucrées et réconfortantes de vanille, de caramel et de fruits rouges.",
    ventePrivee: true,
    dateEvenement: "2026-08-08T14:00:00"
  },
  {
    id: "envie-50",
    nom: "Envie",
    categorie: "parfums-de-collection",
    genre: "homme",
    contenance: "50 ml",
    badge: "50 ml - Homme",
    image: "images/votre-image-envie.png",  // ← chemin corrigé
    description: "Une fragrance captivante, légèrement fruitée et racée, conçue sur mesure pour l'homme séducteur et audacieux.",
    ventePrivee: true,
    dateEvenement: "2026-08-08T14:00:00"
  },
  {
    id: "homme-de-lombre-50",
    nom: "L'Homme de l'Ombre",
    categorie: "parfums-de-collection",
    genre: "homme",
    contenance: "50 ml",
    badge: "50 ml - Homme",
    image: "images/duchesse-parfum-6.png",  // ← chemin corrigé
    description: "Une fragrance texturée, mystérieuse et racée, idéale pour laisser un sillage marquant et inoubliable.",
    ventePrivee: true,
    dateEvenement: "2026-08-08T14:00:00"
  }
];

// Export pour utilisation globale
if (typeof module !== 'undefined' && module.exports) {
  module.exports = produitsData;
}