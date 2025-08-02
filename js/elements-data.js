// Données des éléments placables
const elementsData = {
    monsters: {
        name: "Monstres",
        icon: "👹",
        items: [
            // Monstres naturels (Plant Island)
            { id: "mammott", name: "Mammott", icon: "🐘", size: { width: 2, height: 2 }, theme: "nature", rarity: "common" },
            { id: "potbelly", name: "Potbelly", icon: "🐷", size: { width: 1, height: 1 }, theme: "nature", rarity: "common" },
            { id: "noggin", name: "Noggin", icon: "🗿", size: { width: 1, height: 1 }, theme: "nature", rarity: "common" },
            { id: "toe-jammer", name: "Toe Jammer", icon: "🦶", size: { width: 1, height: 1 }, theme: "nature", rarity: "common" },
            { id: "dandidoo", name: "Dandidoo", icon: "🌸", size: { width: 1, height: 2 }, theme: "nature", rarity: "rare" },
            { id: "cybop", name: "Cybop", icon: "👁️", size: { width: 1, height: 1 }, theme: "nature", rarity: "rare" },
            { id: "quibble", name: "Quibble", icon: "🐸", size: { width: 2, height: 1 }, theme: "nature", rarity: "rare" },
            { id: "spunge", name: "Spunge", icon: "🟡", size: { width: 2, height: 2 }, theme: "nature", rarity: "rare" },
            
            // Monstres de froid (Cold Island)
            { id: "drumpler", name: "Drumpler", icon: "🥁", size: { width: 2, height: 2 }, theme: "ice", rarity: "common" },
            { id: "maw", name: "Maw", icon: "👄", size: { width: 2, height: 1 }, theme: "ice", rarity: "common" },
            { id: "thumpies", name: "Thumpies", icon: "🦘", size: { width: 1, height: 2 }, theme: "ice", rarity: "rare" },
            { id: "congle", name: "Congle", icon: "🦧", size: { width: 2, height: 2 }, theme: "ice", rarity: "rare" },
            
            // Monstres aériens (Air Island)
            { id: "tweedle", name: "Tweedle", icon: "🐦", size: { width: 1, height: 1 }, theme: "sky", rarity: "common" },
            { id: "pom-pom", name: "PomPom", icon: "🎀", size: { width: 2, height: 1 }, theme: "sky", rarity: "common" },
            { id: "pango", name: "Pango", icon: "🪘", size: { width: 2, height: 2 }, theme: "sky", rarity: "rare" },
            { id: "scups", name: "Scups", icon: "🥄", size: { width: 1, height: 2 }, theme: "sky", rarity: "rare" },
            
            // Monstres aquatiques (Water Island)
            { id: "reedling", name: "Reedling", icon: "🎋", size: { width: 1, height: 2 }, theme: "ocean", rarity: "common" },
            { id: "shellbeat", name: "Shellbeat", icon: "🐚", size: { width: 2, height: 2 }, theme: "ocean", rarity: "rare" },
            { id: "sooza", name: "Sooza", icon: "🎺", size: { width: 1, height: 2 }, theme: "ocean", rarity: "rare" },
            
            // Monstres terrestres (Earth Island)
            { id: "deedge", name: "Deedge", icon: "💎", size: { width: 2, height: 2 }, theme: "desert", rarity: "common" },
            { id: "cybop-earth", name: "Cybop", icon: "👁️", size: { width: 1, height: 1 }, theme: "desert", rarity: "rare" },
            { id: "quarrister", name: "Quarrister", icon: "🏔️", size: { width: 3, height: 3 }, theme: "desert", rarity: "epic" },
            
            // Monstres de feu
            { id: "kayna", name: "Kayna", icon: "🔥", size: { width: 1, height: 2 }, theme: "fire", rarity: "common" },
            { id: "glowl", name: "Glowl", icon: "💀", size: { width: 2, height: 2 }, theme: "fire", rarity: "rare" },
            { id: "flowah", name: "Flowah", icon: "🌺", size: { width: 1, height: 1 }, theme: "fire", rarity: "rare" },
            
            // Monstres psychiques
            { id: "psychic-monster", name: "TooMany", icon: "🧠", size: { width: 2, height: 1 }, theme: "psychic", rarity: "rare" },
            
            // Monstres féeriques
            { id: "punkleton", name: "Punkleton", icon: "🎃", size: { width: 2, height: 3 }, theme: "fairy", rarity: "seasonal" },
            
            // Monstres d'os
            { id: "boodoo", name: "Boodoo", icon: "👻", size: { width: 1, height: 2 }, theme: "spooky", rarity: "rare" },
            
            // Monstres de lumière
            { id: "blow-t", name: "Blow't", icon: "💨", size: { width: 1, height: 1 }, theme: "celestial", rarity: "rare" }
        ]
    },
    
    decorations: {
        name: "Décorations",
        icon: "🌳",
        items: [
            // Décorations naturelles
            { id: "tree-oak", name: "Chêne", icon: "🌳", size: { width: 1, height: 1 }, theme: "nature", rarity: "common" },
            { id: "tree-pine", name: "Pin", icon: "🌲", size: { width: 1, height: 1 }, theme: "nature", rarity: "common" },
            { id: "bush-small", name: "Petit buisson", icon: "🌿", size: { width: 1, height: 1 }, theme: "nature", rarity: "common" },
            { id: "bush-large", name: "Grand buisson", icon: "🌳", size: { width: 2, height: 2 }, theme: "nature", rarity: "common" },
            { id: "flower-red", name: "Fleurs rouges", icon: "🌹", size: { width: 1, height: 1 }, theme: "nature", rarity: "common" },
            { id: "flower-blue", name: "Fleurs bleues", icon: "🌸", size: { width: 1, height: 1 }, theme: "nature", rarity: "common" },
            { id: "mushroom", name: "Champignon", icon: "🍄", size: { width: 1, height: 1 }, theme: "nature", rarity: "rare" },
            { id: "pond", name: "Étang", icon: "🏞️", size: { width: 2, height: 2 }, theme: "nature", rarity: "rare" },
            
            // Décorations de glace
            { id: "ice-crystal", name: "Cristal de glace", icon: "❄️", size: { width: 1, height: 1 }, theme: "ice", rarity: "common" },
            { id: "snowman", name: "Bonhomme de neige", icon: "⛄", size: { width: 1, height: 2 }, theme: "ice", rarity: "rare" },
            { id: "ice-sculpture", name: "Sculpture de glace", icon: "🧊", size: { width: 2, height: 2 }, theme: "ice", rarity: "rare" },
            
            // Décorations aériennes
            { id: "cloud-small", name: "Petit nuage", icon: "☁️", size: { width: 1, height: 1 }, theme: "sky", rarity: "common" },
            { id: "cloud-large", name: "Grand nuage", icon: "⛅", size: { width: 2, height: 1 }, theme: "sky", rarity: "common" },
            { id: "rainbow", name: "Arc-en-ciel", icon: "🌈", size: { width: 3, height: 1 }, theme: "sky", rarity: "epic" },
            
            // Décorations aquatiques
            { id: "coral-small", name: "Petit corail", icon: "🪸", size: { width: 1, height: 1 }, theme: "ocean", rarity: "common" },
            { id: "coral-large", name: "Grand corail", icon: "🐠", size: { width: 2, height: 2 }, theme: "ocean", rarity: "rare" },
            { id: "seaweed", name: "Algues", icon: "🌱", size: { width: 1, height: 2 }, theme: "ocean", rarity: "common" },
            
            // Décorations désertiques
            { id: "cactus-small", name: "Petit cactus", icon: "🌵", size: { width: 1, height: 1 }, theme: "desert", rarity: "common" },
            { id: "cactus-large", name: "Grand cactus", icon: "🌵", size: { width: 1, height: 2 }, theme: "desert", rarity: "rare" },
            { id: "rock-desert", name: "Rocher désertique", icon: "🪨", size: { width: 2, height: 1 }, theme: "desert", rarity: "common" },
            
            // Décorations de feu
            { id: "torch", name: "Torche", icon: "🕯️", size: { width: 1, height: 1 }, theme: "fire", rarity: "common" },
            { id: "lava-pool", name: "Bassin de lave", icon: "🌋", size: { width: 2, height: 2 }, theme: "fire", rarity: "rare" },
            { id: "fire-crystal", name: "Cristal de feu", icon: "💎", size: { width: 1, height: 1 }, theme: "fire", rarity: "rare" },
            
            // Décorations magiques
            { id: "magic-crystal", name: "Cristal magique", icon: "🔮", size: { width: 1, height: 1 }, theme: "fairy", rarity: "rare" },
            { id: "fairy-ring", name: "Cercle de fées", icon: "⭐", size: { width: 2, height: 2 }, theme: "fairy", rarity: "epic" },
            
            // Décorations effrayantes
            { id: "tombstone", name: "Pierre tombale", icon: "🪦", size: { width: 1, height: 1 }, theme: "spooky", rarity: "common" },
            { id: "dead-tree", name: "Arbre mort", icon: "🌲", size: { width: 1, height: 2 }, theme: "spooky", rarity: "rare" },
            
            // Décorations célestes
            { id: "star", name: "Étoile", icon: "⭐", size: { width: 1, height: 1 }, theme: "celestial", rarity: "rare" },
            { id: "light-beam", name: "Rayon de lumière", icon: "✨", size: { width: 1, height: 3 }, theme: "celestial", rarity: "epic" }
        ]
    },
    
    structures: {
        name: "Structures",
        icon: "🏢",
        items: [
            // Structures de base
            { id: "castle", name: "Château", icon: "🏰", size: { width: 3, height: 3 }, theme: "universal", rarity: "epic" },
            { id: "breeding-structure", name: "Structure d'élevage", icon: "🏠", size: { width: 2, height: 2 }, theme: "universal", rarity: "common" },
            { id: "nursery", name: "Pouponnière", icon: "🍼", size: { width: 2, height: 2 }, theme: "universal", rarity: "common" },
            { id: "bakery", name: "Boulangerie", icon: "🍞", size: { width: 2, height: 2 }, theme: "universal", rarity: "rare" },
            { id: "unity-tree", name: "Arbre d'unité", icon: "🌴", size: { width: 2, height: 3 }, theme: "universal", rarity: "epic" },
            
            // Structures naturelles
            { id: "natural-portal", name: "Portail naturel", icon: "🌀", size: { width: 2, height: 2 }, theme: "nature", rarity: "rare" },
            { id: "tree-house", name: "Cabane dans l'arbre", icon: "🏘️", size: { width: 2, height: 3 }, theme: "nature", rarity: "rare" },
            
            // Structures de glace
            { id: "ice-castle", name: "Château de glace", icon: "🏰", size: { width: 3, height: 3 }, theme: "ice", rarity: "epic" },
            { id: "igloo", name: "Igloo", icon: "🏠", size: { width: 2, height: 2 }, theme: "ice", rarity: "common" },
            
            // Structures aériennes
            { id: "cloud-castle", name: "Château nuageux", icon: "🏰", size: { width: 3, height: 2 }, theme: "sky", rarity: "epic" },
            { id: "wind-mill", name: "Moulin à vent", icon: "🌪️", size: { width: 2, height: 3 }, theme: "sky", rarity: "rare" },
            
            // Structures aquatiques
            { id: "underwater-dome", name: "Dôme sous-marin", icon: "🫧", size: { width: 3, height: 2 }, theme: "ocean", rarity: "epic" },
            { id: "lighthouse", name: "Phare", icon: "🗼", size: { width: 1, height: 4 }, theme: "ocean", rarity: "rare" },
            
            // Structures désertiques
            { id: "pyramid", name: "Pyramide", icon: "🔺", size: { width: 3, height: 3 }, theme: "desert", rarity: "epic" },
            { id: "oasis", name: "Oasis", icon: "🏝️", size: { width: 3, height: 3 }, theme: "desert", rarity: "rare" },
            
            // Structures de feu
            { id: "volcano-structure", name: "Structure volcanique", icon: "🌋", size: { width: 3, height: 4 }, theme: "fire", rarity: "epic" },
            { id: "forge", name: "Forge", icon: "⚒️", size: { width: 2, height: 2 }, theme: "fire", rarity: "rare" },
            
            // Structures magiques
            { id: "magic-tower", name: "Tour magique", icon: "🗼", size: { width: 2, height: 4 }, theme: "fairy", rarity: "epic" },
            { id: "fairy-house", name: "Maison de fée", icon: "🏡", size: { width: 1, height: 2 }, theme: "fairy", rarity: "rare" },
            
            // Structures effrayantes
            { id: "haunted-mansion", name: "Manoir hanté", icon: "🏚️", size: { width: 3, height: 3 }, theme: "spooky", rarity: "epic" },
            { id: "crypt", name: "Crypte", icon: "⚱️", size: { width: 2, height: 2 }, theme: "spooky", rarity: "rare" },
            
            // Structures célestes
            { id: "celestial-temple", name: "Temple céleste", icon: "🛕", size: { width: 3, height: 3 }, theme: "celestial", rarity: "epic" },
            { id: "star-altar", name: "Autel stellaire", icon: "⭐", size: { width: 2, height: 1 }, theme: "celestial", rarity: "rare" }
        ]
    },
    
    paths: {
        name: "Chemins",
        icon: "🛤️",
        items: [
            // Chemins de base
            { id: "stone-path", name: "Chemin de pierre", icon: "🪨", size: { width: 1, height: 1 }, theme: "universal", rarity: "common" },
            { id: "wood-path", name: "Chemin de bois", icon: "🪵", size: { width: 1, height: 1 }, theme: "universal", rarity: "common" },
            { id: "brick-path", name: "Chemin de brique", icon: "🧱", size: { width: 1, height: 1 }, theme: "universal", rarity: "common" },
            
            // Chemins spécialisés
            { id: "grass-path", name: "Sentier d'herbe", icon: "🌱", size: { width: 1, height: 1 }, theme: "nature", rarity: "common" },
            { id: "ice-path", name: "Chemin glacé", icon: "🧊", size: { width: 1, height: 1 }, theme: "ice", rarity: "common" },
            { id: "cloud-path", name: "Chemin nuageux", icon: "☁️", size: { width: 1, height: 1 }, theme: "sky", rarity: "rare" },
            { id: "coral-path", name: "Chemin de corail", icon: "🪸", size: { width: 1, height: 1 }, theme: "ocean", rarity: "common" },
            { id: "sand-path", name: "Chemin de sable", icon: "🏖️", size: { width: 1, height: 1 }, theme: "desert", rarity: "common" },
            { id: "lava-path", name: "Chemin de lave", icon: "🌋", size: { width: 1, height: 1 }, theme: "fire", rarity: "rare" },
            { id: "crystal-path", name: "Chemin cristallin", icon: "💎", size: { width: 1, height: 1 }, theme: "fairy", rarity: "rare" },
            { id: "bone-path", name: "Chemin d'os", icon: "🦴", size: { width: 1, height: 1 }, theme: "spooky", rarity: "rare" },
            { id: "light-path", name: "Chemin lumineux", icon: "✨", size: { width: 1, height: 1 }, theme: "celestial", rarity: "rare" },
            
            // Éléments de chemin spéciaux
            { id: "bridge-wood", name: "Pont de bois", icon: "🌉", size: { width: 3, height: 1 }, theme: "universal", rarity: "rare" },
            { id: "bridge-stone", name: "Pont de pierre", icon: "🌁", size: { width: 3, height: 1 }, theme: "universal", rarity: "rare" },
            { id: "stairs", name: "Escaliers", icon: "🪜", size: { width: 1, height: 2 }, theme: "universal", rarity: "common" }
        ]
    }
};

// Fonction pour obtenir les éléments d'une catégorie
function getElementsForCategory(category) {
    return elementsData[category]?.items || [];
}

// Fonction pour obtenir toutes les catégories
function getAllCategories() {
    return Object.keys(elementsData).map(id => ({
        id,
        ...elementsData[id]
    }));
}

// Fonction pour obtenir un élément par son ID
function getElementById(elementId) {
    for (const category of Object.values(elementsData)) {
        const element = category.items.find(item => item.id === elementId);
        if (element) {
            return element;
        }
    }
    return null;
}

// Fonction pour filtrer les éléments par thème
function getElementsByTheme(theme) {
    const results = [];
    for (const category of Object.values(elementsData)) {
        const themeElements = category.items.filter(item => 
            item.theme === theme || item.theme === 'universal'
        );
        results.push(...themeElements);
    }
    return results;
}

// Fonction pour filtrer les éléments par rareté
function getElementsByRarity(rarity) {
    const results = [];
    for (const category of Object.values(elementsData)) {
        const rarityElements = category.items.filter(item => item.rarity === rarity);
        results.push(...rarityElements);
    }
    return results;
}