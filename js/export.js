// Système d'export et de téléchargement
class ExportManager {
    constructor() {
        this.exportCanvas = null;
        this.exportContext = null;
        this.initExportCanvas();
        this.initEventListeners();
    }
    
    initExportCanvas() {
        this.exportCanvas = document.createElement('canvas');
        this.exportContext = this.exportCanvas.getContext('2d');
    }
    
    initEventListeners() {
        // Bouton d'export principal
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.showExportModal();
        });
        
        // Fermeture du modal
        document.getElementById('closeExportModal').addEventListener('click', () => {
            this.hideExportModal();
        });
        
        document.getElementById('cancelExport').addEventListener('click', () => {
            this.hideExportModal();
        });
        
        // Téléchargement
        document.getElementById('downloadExport').addEventListener('click', () => {
            this.downloadImage();
        });
        
        // Mise à jour de l'aperçu quand les options changent
        ['exportGrid', 'exportMonsters', 'exportDecorations', 'exportStructures', 'exportPaths', 'exportFormat', 'exportResolution'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.updatePreview();
            });
        });
    }
    
    showExportModal() {
        document.getElementById('exportModal').classList.add('show');
        this.updatePreview();
    }
    
    hideExportModal() {
        document.getElementById('exportModal').classList.remove('show');
    }
    
    updatePreview() {
        const options = this.getExportOptions();
        
        // Créer une version miniature pour l'aperçu
        const previewCanvas = document.getElementById('exportPreview');
        const previewContext = previewCanvas.getContext('2d');
        
        // Calculer les dimensions de l'aperçu
        const island = getIslandData(window.islandDesigner.currentIsland);
        const aspectRatio = island.dimensions.width / island.dimensions.height;
        
        let previewWidth = 300;
        let previewHeight = 300 / aspectRatio;
        
        if (previewHeight > 200) {
            previewHeight = 200;
            previewWidth = 200 * aspectRatio;
        }
        
        previewCanvas.width = previewWidth;
        previewCanvas.height = previewHeight;
        
        // Dessiner l'aperçu
        this.renderToCanvas(previewContext, previewWidth, previewHeight, options, true);
    }
    
    downloadImage() {
        const options = this.getExportOptions();
        const island = getIslandData(window.islandDesigner.currentIsland);
        
        // Calculer les dimensions finales
        const baseWidth = island.dimensions.width * island.gridSize;
        const baseHeight = island.dimensions.height * island.gridSize;
        const scale = parseFloat(options.resolution);
        
        const finalWidth = baseWidth * scale;
        const finalHeight = baseHeight * scale;
        
        // Configurer le canvas d'export
        this.exportCanvas.width = finalWidth;
        this.exportCanvas.height = finalHeight;
        
        // Rendre l'image finale
        this.renderToCanvas(this.exportContext, finalWidth, finalHeight, options, false);
        
        // Télécharger
        const filename = `msm-island-${window.islandDesigner.currentIsland}-${Date.now()}.${options.format}`;
        this.downloadCanvasAsImage(this.exportCanvas, filename, options.format);
        
        // Fermer le modal
        this.hideExportModal();
    }
    
    getExportOptions() {
        return {
            includeGrid: document.getElementById('exportGrid').checked,
            includeMonsters: document.getElementById('exportMonsters').checked,
            includeDecorations: document.getElementById('exportDecorations').checked,
            includeStructures: document.getElementById('exportStructures').checked,
            includePaths: document.getElementById('exportPaths').checked,
            format: document.getElementById('exportFormat').value,
            resolution: document.getElementById('exportResolution').value
        };
    }
    
    renderToCanvas(context, width, height, options, isPreview) {
        const island = getIslandData(window.islandDesigner.currentIsland);
        const scale = width / (island.dimensions.width * island.gridSize);
        
        // Effacer le canvas
        context.clearRect(0, 0, width, height);
        
        // 1. Dessiner le fond de l'île
        this.drawIslandBackground(context, width, height, island);
        
        // 2. Dessiner la grille si demandée
        if (options.includeGrid) {
            this.drawGrid(context, width, height, island, scale);
        }
        
        // 3. Dessiner les éléments par couches
        const elements = this.getElementsToExport(options);
        
        // Trier par couches (chemins d'abord, puis décorations, structures, monstres)
        const sortedElements = elements.sort((a, b) => {
            const order = { paths: 0, decorations: 1, structures: 2, monsters: 3 };
            return order[a.category] - order[b.category];
        });
        
        // Dessiner chaque élément
        sortedElements.forEach(element => {
            this.drawElement(context, element, scale, isPreview);
        });
        
        // 4. Ajouter un watermark si ce n'est pas un aperçu
        if (!isPreview) {
            this.drawWatermark(context, width, height);
        }
    }
    
    drawIslandBackground(context, width, height, island) {
        // Créer un gradient basé sur les couleurs de l'île
        const gradient = context.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, island.background.colors[0]);
        gradient.addColorStop(0.5, island.background.colors[1]);
        gradient.addColorStop(1, island.background.colors[2]);
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
        
        // Ajouter une texture ou un pattern simple
        this.drawBackgroundPattern(context, width, height, island);
    }
    
    drawBackgroundPattern(context, width, height, island) {
        context.save();
        context.globalAlpha = 0.1;
        
        // Pattern simple basé sur le thème
        switch(island.background.pattern) {
            case 'tropical':
                this.drawTropicalPattern(context, width, height);
                break;
            case 'ice':
                this.drawIcePattern(context, width, height);
                break;
            case 'clouds':
                this.drawCloudPattern(context, width, height);
                break;
            case 'waves':
                this.drawWavePattern(context, width, height);
                break;
            case 'desert':
                this.drawDesertPattern(context, width, height);
                break;
            case 'lava':
                this.drawLavaPattern(context, width, height);
                break;
            default:
                this.drawTropicalPattern(context, width, height);
        }
        
        context.restore();
    }
    
    drawTropicalPattern(context, width, height) {
        context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        
        for (let x = 0; x < width; x += 100) {
            for (let y = 0; y < height; y += 100) {
                // Dessiner des petits cercles comme des bulles
                context.beginPath();
                context.arc(x + Math.random() * 50, y + Math.random() * 50, 3 + Math.random() * 5, 0, Math.PI * 2);
                context.fill();
            }
        }
    }
    
    drawIcePattern(context, width, height) {
        context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        context.lineWidth = 1;
        
        for (let x = 0; x < width; x += 80) {
            for (let y = 0; y < height; y += 80) {
                // Dessiner des cristaux
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x + 20, y + 10);
                context.lineTo(x + 10, y + 30);
                context.lineTo(x - 10, y + 20);
                context.closePath();
                context.stroke();
            }
        }
    }
    
    drawCloudPattern(context, width, height) {
        context.fillStyle = 'rgba(255, 255, 255, 0.3)';
        
        for (let x = 0; x < width; x += 120) {
            for (let y = 0; y < height; y += 80) {
                // Dessiner des nuages simples
                context.beginPath();
                context.arc(x, y, 15, 0, Math.PI * 2);
                context.arc(x + 15, y, 20, 0, Math.PI * 2);
                context.arc(x + 30, y, 15, 0, Math.PI * 2);
                context.fill();
            }
        }
    }
    
    drawWavePattern(context, width, height) {
        context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        context.lineWidth = 2;
        
        for (let y = 0; y < height; y += 50) {
            context.beginPath();
            for (let x = 0; x < width; x += 25) {
                const waveY = y + Math.sin(x / 25) * 10;
                if (x === 0) {
                    context.moveTo(x, waveY);
                } else {
                    context.lineTo(x, waveY);
                }
            }
            context.stroke();
        }
    }
    
    drawDesertPattern(context, width, height) {
        context.fillStyle = 'rgba(139, 69, 19, 0.3)';
        
        for (let x = 0; x < width; x += 60) {
            for (let y = 0; y < height; y += 60) {
                // Dessiner des petits grains de sable
                context.beginPath();
                context.arc(x + Math.random() * 30, y + Math.random() * 30, 1 + Math.random() * 2, 0, Math.PI * 2);
                context.fill();
            }
        }
    }
    
    drawLavaPattern(context, width, height) {
        context.fillStyle = 'rgba(255, 69, 0, 0.3)';
        
        for (let x = 0; x < width; x += 80) {
            for (let y = 0; y < height; y += 80) {
                // Dessiner des bulles de lave
                context.beginPath();
                context.arc(x + Math.random() * 40, y + Math.random() * 40, 5 + Math.random() * 10, 0, Math.PI * 2);
                context.fill();
            }
        }
    }
    
    drawGrid(context, width, height, island, scale) {
        const gridSize = island.gridSize * scale;
        
        context.save();
        context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        context.lineWidth = 1;
        context.setLineDash([2, 2]);
        
        // Lignes verticales
        for (let x = 0; x <= width; x += gridSize) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.stroke();
        }
        
        // Lignes horizontales
        for (let y = 0; y <= height; y += gridSize) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(width, y);
            context.stroke();
        }
        
        context.restore();
    }
    
    getElementsToExport(options) {
        const elements = [];
        const placedElements = document.querySelectorAll('.placed-element');
        
        placedElements.forEach(element => {
            const elementData = JSON.parse(element.dataset.elementData);
            const category = this.getElementCategory(elementData.id);
            
            // Vérifier si cette catégorie doit être incluse
            const shouldInclude = this.shouldIncludeCategory(category, options);
            
            if (shouldInclude) {
                elements.push({
                    element: element,
                    data: elementData,
                    category: category,
                    gridX: parseInt(element.dataset.gridX),
                    gridY: parseInt(element.dataset.gridY)
                });
            }
        });
        
        return elements;
    }
    
    getElementCategory(elementId) {
        for (const [category, data] of Object.entries(elementsData)) {
            if (data.items.some(item => item.id === elementId)) {
                return category;
            }
        }
        return 'decorations'; // Fallback
    }
    
    shouldIncludeCategory(category, options) {
        switch(category) {
            case 'monsters':
                return options.includeMonsters;
            case 'decorations':
                return options.includeDecorations;
            case 'structures':
                return options.includeStructures;
            case 'paths':
                return options.includePaths;
            default:
                return true;
        }
    }
    
    drawElement(context, elementInfo, scale, isPreview) {
        const { data, gridX, gridY } = elementInfo;
        const island = getIslandData(window.islandDesigner.currentIsland);
        
        // Calculer la position et la taille
        const x = gridX * island.gridSize * scale;
        const y = gridY * island.gridSize * scale;
        const width = data.size.width * island.gridSize * scale;
        const height = data.size.height * island.gridSize * scale;
        
        context.save();
        
        // Dessiner le fond de l'élément
        this.drawElementBackground(context, x, y, width, height, data);
        
        // Dessiner l'icône ou le contenu
        this.drawElementContent(context, x, y, width, height, data, isPreview);
        
        context.restore();
    }
    
    drawElementBackground(context, x, y, width, height, data) {
        // Couleur de fond basée sur la rareté
        let backgroundColor;
        switch(data.rarity) {
            case 'common':
                backgroundColor = 'rgba(255, 255, 255, 0.8)';
                break;
            case 'rare':
                backgroundColor = 'rgba(100, 150, 255, 0.8)';
                break;
            case 'epic':
                backgroundColor = 'rgba(200, 100, 255, 0.8)';
                break;
            case 'legendary':
                backgroundColor = 'rgba(255, 200, 50, 0.8)';
                break;
            case 'seasonal':
                backgroundColor = 'rgba(255, 150, 100, 0.8)';
                break;
            default:
                backgroundColor = 'rgba(255, 255, 255, 0.8)';
        }
        
        context.fillStyle = backgroundColor;
        context.fillRect(x, y, width, height);
        
        // Bordure
        context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        context.lineWidth = 2;
        context.strokeRect(x, y, width, height);
    }
    
    drawElementContent(context, x, y, width, height, data, isPreview) {
        // Dessiner l'icône emoji au centre
        const fontSize = Math.min(width, height) * 0.6;
        context.font = `${fontSize}px Arial`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Dessiner l'icône
        context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        context.fillText(data.icon, x + width/2, y + height/2);
        
        // Dessiner le nom si l'élément est assez grand et ce n'est pas un aperçu
        if (!isPreview && Math.min(width, height) > 60) {
            const nameSize = Math.max(12, fontSize * 0.3);
            context.font = `${nameSize}px Arial`;
            context.fillStyle = 'rgba(0, 0, 0, 0.6)';
            context.fillText(data.name, x + width/2, y + height - nameSize);
        }
    }
    
    drawWatermark(context, width, height) {
        context.save();
        
        // Watermark discret en bas à droite
        const watermarkText = 'MSM Island Designer';
        const fontSize = Math.max(12, width * 0.02);
        
        context.font = `${fontSize}px Arial`;
        context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        context.textAlign = 'right';
        context.textBaseline = 'bottom';
        
        context.fillText(watermarkText, width - 10, height - 10);
        
        context.restore();
    }
    
    downloadCanvasAsImage(canvas, filename, format) {
        // Créer un lien de téléchargement
        const link = document.createElement('a');
        
        // Convertir le canvas en blob
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = filename;
            
            // Déclencher le téléchargement
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Nettoyer l'URL
            URL.revokeObjectURL(url);
            
            // Afficher une notification de succès
            this.showSuccessNotification(`Image téléchargée : ${filename}`);
            
        }, `image/${format}`, format === 'jpeg' ? 0.9 : 1.0);
    }
    
    showSuccessNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-family: var(--font-family);
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Méthode pour exporter les données de l'île en JSON
    exportIslandData() {
        const elements = [];
        const placedElements = document.querySelectorAll('.placed-element');
        
        placedElements.forEach(element => {
            elements.push({
                id: element.dataset.elementId,
                data: JSON.parse(element.dataset.elementData),
                gridX: parseInt(element.dataset.gridX),
                gridY: parseInt(element.dataset.gridY)
            });
        });
        
        const islandExport = {
            island: window.islandDesigner.currentIsland,
            elements: elements,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        
        return JSON.stringify(islandExport, null, 2);
    }
    
    // Méthode pour importer les données d'une île
    importIslandData(jsonData) {
        try {
            const importData = JSON.parse(jsonData);
            
            // Vérifier la structure des données
            if (!importData.island || !importData.elements) {
                throw new Error('Format de données invalide');
            }
            
            // Changer d'île si nécessaire
            if (importData.island !== window.islandDesigner.currentIsland) {
                window.islandDesigner.switchIsland(importData.island);
            }
            
            // Effacer les éléments existants
            window.islandDesigner.clearIsland();
            
            // Placer les éléments importés
            importData.elements.forEach(elementInfo => {
                const elementData = elementInfo.data;
                window.islandDesigner.dragDropManager.placeElement(
                    elementInfo.gridX, 
                    elementInfo.gridY, 
                    elementData
                );
            });
            
            this.showSuccessNotification('Île importée avec succès !');
            
        } catch (error) {
            console.error('Erreur lors de l\'importation:', error);
            this.showErrorNotification('Erreur lors de l\'importation de l\'île');
        }
    }
    
    showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--danger-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-family: var(--font-family);
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// Animations CSS pour les notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);