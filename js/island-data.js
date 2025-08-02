// Configuration des données d'îles avec formes personnalisées
const islandData = {
    plant: {
        name: "Plant Island",
        dimensions: { width: 24, height: 18 },
        gridSize: 40,
        background: {
            type: "gradient",
            colors: ["#4ade80", "#22c55e", "#16a34a"],
            pattern: "tropical"
        },
        theme: "nature",
        unlockLevel: 1,
        description: "L'île naturelle où tout commence",
        // Forme de l'île : 1 = placable, 0 = eau/vide
        shape: [
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0]
        ]
    },
    
    cold: {
        name: "Cold Island",
        dimensions: { width: 22, height: 16 },
        gridSize: 40,
        background: {
            type: "gradient", 
            colors: ["#93c5fd", "#3b82f6", "#1d4ed8"],
            pattern: "ice"
        },
        theme: "ice",
        unlockLevel: 4,
        description: "Île glacée aux mélodies cristallines",
        shape: [
            [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0]
        ]
    },
    
    air: {
        name: "Air Island", 
        dimensions: { width: 20, height: 14 },
        gridSize: 40,
        background: {
            type: "gradient",
            colors: ["#ddd6fe", "#c4b5fd", "#a78bfa"],
            pattern: "clouds"
        },
        theme: "sky",
        unlockLevel: 9,
        description: "Île flottante dans les nuages",
        shape: [
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0]
        ]
    },
    
    water: {
        name: "Water Island",
        dimensions: { width: 26, height: 18 },
        gridSize: 40,
        background: {
            type: "gradient",
            colors: ["#67e8f9", "#06b6d4", "#0891b2"],
            pattern: "waves"
        },
        theme: "ocean",
        unlockLevel: 9,
        description: "Île océanique aux profondeurs mystérieuses",
        shape: [
            [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0]
        ]
    },
    
    earth: {
        name: "Earth Island",
        dimensions: { width: 23, height: 17 },
        gridSize: 40,
        background: {
            type: "gradient",
            colors: ["#fbbf24", "#f59e0b", "#d97706"],
            pattern: "desert"
        },
        theme: "desert",
        unlockLevel: 9,
        description: "Île désertique aux rythmes tribaux",
        shape: [
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0]
        ]
    },
    
    "fire-oasis": {
        name: "Fire Oasis",
        dimensions: { width: 18, height: 13 },
        gridSize: 40,
        background: {
            type: "gradient",
            colors: ["#fb7185", "#e11d48", "#be123c"],
            pattern: "lava"
        },
        theme: "fire",
        unlockLevel: 15,
        description: "Oasis de feu aux mélodies ardentes",
        shape: [
            [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0]
        ]
    },
    
    "fire-haven": {
        name: "Fire Haven",
        dimensions: { width: 21, height: 15 },
        gridSize: 40,
        background: {
            type: "gradient",
            colors: ["#f97316", "#ea580c", "#c2410c"],
            pattern: "volcano"
        },
        theme: "volcano",
        unlockLevel: 20,
        description: "Refuge volcanique des créatures de feu",
        shape: [
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0]
        ]
    },
    
    psychic: {
        name: "Psychic Island",
        dimensions: { width: 19, height: 16 },
        gridSize: 40,
        background: {
            type: "gradient",
            colors: ["#c084fc", "#a855f7", "#9333ea"],
            pattern: "psychic"
        },
        theme: "psychic",
        unlockLevel: 25,
        description: "Île mystique aux pouvoirs mentaux",
        shape: [
            [0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0]
        ]
    },
    
    faerie: {
        name: "Faerie Island",
        dimensions: { width: 22, height: 17 },
        gridSize: 40,
        background: {
            type: "gradient",
            colors: ["#f9a8d4", "#f472b6", "#ec4899"],
            pattern: "magical"
        },
        theme: "fairy",
        unlockLevel: 30,
        description: "Île féerique emplie de magie",
        shape: [
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0]
        ]
    },
    
    bone: {
        name: "Bone Island",
        dimensions: { width: 17, height: 14 },
        gridSize: 40,
        background: {
            type: "gradient",
            colors: ["#6b7280", "#4b5563", "#374151"],
            pattern: "spooky"
        },
        theme: "spooky",
        unlockLevel: 35,
        description: "Île hantée aux mélodies d'outre-tombe",
        shape: [
            [0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0]
        ]
    },
    
    light: {
        name: "Light Island",
        dimensions: { width: 25, height: 19 },
        gridSize: 40,
        background: {
            type: "gradient",
            colors: ["#fef3c7", "#fcd34d", "#f59e0b"],
            pattern: "light"
        },
        theme: "celestial",
        unlockLevel: 40,
        description: "Île céleste baignée de lumière divine",
        shape: [
            [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0]
        ]
    }
};

// Patterns de fond pour chaque thème (identique à avant)
const backgroundPatterns = {
    tropical: `
        <pattern id="tropical" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="3" fill="rgba(255,255,255,0.1)"/>
            <circle cx="80" cy="60" r="2" fill="rgba(255,255,255,0.1)"/>
            <circle cx="50" cy="80" r="4" fill="rgba(255,255,255,0.1)"/>
        </pattern>
    `,
    
    ice: `
        <pattern id="ice" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <polygon points="10,10 30,20 20,40 0,30" fill="rgba(255,255,255,0.1)"/>
            <polygon points="50,50 70,60 60,80 40,70" fill="rgba(255,255,255,0.1)"/>
        </pattern>
    `,
    
    clouds: `
        <pattern id="clouds" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse">
            <ellipse cx="30" cy="40" rx="20" ry="10" fill="rgba(255,255,255,0.1)"/>
            <ellipse cx="90" cy="20" rx="15" ry="8" fill="rgba(255,255,255,0.1)"/>
        </pattern>
    `,
    
    waves: `
        <pattern id="waves" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
            <path d="M0,25 Q25,10 50,25 T100,25" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"/>
        </pattern>
    `,
    
    desert: `
        <pattern id="desert" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="1" fill="rgba(139,69,19,0.3)"/>
            <circle cx="45" cy="30" r="1.5" fill="rgba(139,69,19,0.3)"/>
            <circle cx="30" cy="50" r="1" fill="rgba(139,69,19,0.3)"/>
        </pattern>
    `,
    
    lava: `
        <pattern id="lava" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="5" fill="rgba(255,69,0,0.3)"/>
            <circle cx="60" cy="60" r="3" fill="rgba(255,140,0,0.3)"/>
        </pattern>
    `,
    
    volcano: `
        <pattern id="volcano" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <polygon points="50,10 60,30 40,30" fill="rgba(255,69,0,0.2)"/>
            <circle cx="50" cy="80" r="8" fill="rgba(255,140,0,0.2)"/>
        </pattern>
    `,
    
    psychic: `
        <pattern id="psychic" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse">
            <circle cx="45" cy="45" r="20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
            <circle cx="45" cy="45" r="5" fill="rgba(255,255,255,0.2)"/>
        </pattern>
    `,
    
    magical: `
        <pattern id="magical" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
            <polygon points="35,10 40,25 55,25 44,35 49,50 35,42 21,50 26,35 15,25 30,25" fill="rgba(255,255,255,0.2)"/>
        </pattern>
    `,
    
    spooky: `
        <pattern id="spooky" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="3" fill="rgba(255,255,255,0.1)"/>
            <rect x="70" y="70" width="6" height="20" fill="rgba(255,255,255,0.1)"/>
            <circle cx="75" cy="15" r="2" fill="rgba(255,255,255,0.1)"/>
        </pattern>
    `,
    
    light: `
        <pattern id="light" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="15" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
            <circle cx="40" cy="40" r="2" fill="rgba(255,255,255,0.5)"/>
            <line x1="40" y1="20" x2="40" y2="60" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
            <line x1="20" y1="40" x2="60" y2="40" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
        </pattern>
    `
};

// Fonction pour obtenir les données d'une île
function getIslandData(islandId) {
    return islandData[islandId] || islandData.plant;
}

// Fonction pour vérifier si une position est placable
function isPositionPlaceable(islandId, gridX, gridY) {
    const island = getIslandData(islandId);
    
    // Vérifier les limites
    if (gridX < 0 || gridY < 0 || 
        gridX >= island.dimensions.width || 
        gridY >= island.dimensions.height) {
        return false;
    }
    
    // Vérifier la forme de l'île
    return island.shape[gridY] && island.shape[gridY][gridX] === 1;
}

// Fonction pour vérifier si un élément peut être placé à une position
function canPlaceElementAt(islandId, gridX, gridY, elementSize) {
    const island = getIslandData(islandId);
    
    // Vérifier que toutes les cases nécessaires sont placables
    for (let y = gridY; y < gridY + elementSize.height; y++) {
        for (let x = gridX; x < gridX + elementSize.width; x++) {
            if (!isPositionPlaceable(islandId, x, y)) {
                return false;
            }
        }
    }
    
    return true;
}

// Fonction pour obtenir toutes les îles disponibles
function getAllIslands() {
    return Object.keys(islandData).map(id => ({
        id,
        ...islandData[id]
    }));
}

// Fonction pour générer le background SVG d'une île avec masque de forme
function generateIslandBackground(islandId) {
    const island = getIslandData(islandId);
    const pattern = backgroundPatterns[island.background.pattern] || backgroundPatterns.tropical;
    
    const gradientId = `gradient-${islandId}`;
    const patternId = island.background.pattern;
    const maskId = `mask-${islandId}`;
    
    // Créer le masque basé sur la forme de l'île
    let maskPath = '';
    const cellSize = 100 / island.dimensions.width; // Pourcentage par cellule
    
    for (let y = 0; y < island.shape.length; y++) {
        for (let x = 0; x < island.shape[y].length; x++) {
            if (island.shape[y][x] === 1) {
                const xPos = x * cellSize;
                const yPos = y * (100 / island.dimensions.height);
                maskPath += `<rect x="${xPos}%" y="${yPos}%" width="${cellSize}%" height="${100 / island.dimensions.height}%" fill="white"/>`;
            }
        }
    }
    
    return `
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${island.background.colors[0]};stop-opacity:1" />
                    <stop offset="50%" style="stop-color:${island.background.colors[1]};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${island.background.colors[2]};stop-opacity:1" />
                </linearGradient>
                <mask id="${maskId}">
                    ${maskPath}
                </mask>
                ${pattern}
            </defs>
            <rect width="100%" height="100%" fill="url(#${gradientId})" mask="url(#${maskId})"/>
            <rect width="100%" height="100%" fill="url(#${patternId})" mask="url(#${maskId})"/>
        </svg>
    `;
}

// Fonction pour calculer les dimensions du canvas
function calculateCanvasDimensions(islandId) {
    const island = getIslandData(islandId);
    return {
        width: island.dimensions.width * island.gridSize,
        height: island.dimensions.height * island.gridSize,
        gridSize: island.gridSize,
        cols: island.dimensions.width,
        rows: island.dimensions.height
    };
}

// Fonction pour obtenir les zones placables sous forme de rectangles (pour optimisation)
function getPlaceableAreas(islandId) {
    const island = getIslandData(islandId);
    const areas = [];
    
    // Cette fonction pourrait être optimisée pour créer des rectangles plus grands
    // Pour l'instant, on retourne chaque cellule placable individuellement
    for (let y = 0; y < island.shape.length; y++) {
        for (let x = 0; x < island.shape[y].length; x++) {
            if (island.shape[y][x] === 1) {
                areas.push({
                    x: x,
                    y: y,
                    width: 1,
                    height: 1
                });
            }
        }
    }
    
    return areas;
}