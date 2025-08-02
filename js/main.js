// Application principale MSM Island Designer - Version refaite
class IslandDesigner {
    constructor() {
        this.currentIsland = 'plant';
        this.currentZoom = 1;
        this.history = [];
        this.historyIndex = -1;
        this.maxHistorySteps = 50;
        
        this.dragDropManager = null;
        this.exportManager = null;
        
        this.init();
    }
    
    init() {
        // Initialiser les managers
        this.dragDropManager = new DragDropManager();
        this.exportManager = new ExportManager();
        
        // Initialiser l'interface
        this.initInterface();
        this.initEventListeners();
        
        // Charger l'île par défaut
        this.switchIsland(this.currentIsland);
        this.loadElementsForCategory('monsters');
        
        // Sauvegarder l'état initial
        this.saveState();
        
        console.log('🎵 MSM Island Designer initialisé ! 🏝️');
    }
    
    initInterface() {
        this.updateCanvasInfo();
        
        const zoomSlider = document.getElementById('zoomSlider');
        const zoomValue = document.getElementById('zoomValue');
        zoomSlider.value = this.currentZoom;
        zoomValue.textContent = Math.round(this.currentZoom * 100) + '%';
    }
    
    initEventListeners() {
        // Sélecteur d'île
        document.getElementById('islandSelector').addEventListener('change', (e) => {
            this.switchIsland(e.target.value);
        });
        
        // Onglets de catégories
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchCategory(tab.dataset.category);
            });
        });
        
        // Contrôles de zoom
        document.getElementById('zoomIn').addEventListener('click', () => {
            this.zoomIn();
        });
        
        document.getElementById('zoomOut').addEventListener('click', () => {
            this.zoomOut();
        });
        
        document.getElementById('zoomSlider').addEventListener('input', (e) => {
            this.setZoom(parseFloat(e.target.value));
        });
        
        // Contrôles de la grille
        document.getElementById('showGrid').addEventListener('change', (e) => {
            this.toggleGrid(e.target.checked);
        });
        
        // Boutons d'action
        document.getElementById('undoBtn').addEventListener('click', () => {
            this.undo();
        });
        
        document.getElementById('redoBtn').addEventListener('click', () => {
            this.redo();
        });
        
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.confirmClear();
        });
        
        // Boutons de vue
        document.getElementById('centerView').addEventListener('click', () => {
            this.centerView();
        });
        
        document.getElementById('fitView').addEventListener('click', () => {
            this.fitView();
        });
        
        // Raccourcis clavier
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Redimensionnement
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    switchIsland(islandId) {
        this.currentIsland = islandId;
        const island = getIslandData(islandId);
        
        document.getElementById('islandSelector').value = islandId;
        
        this.updateIslandCanvas(island);
        this.updateCanvasInfo();
        this.clearIsland();
        
        this.dragDropManager.updateGridSize(island.gridSize);
        this.saveState();
        
        console.log(`🏝️ Basculé vers ${island.name}`);
    }
    
    updateIslandCanvas(island) {
        const canvas = document.getElementById('islandCanvas');
        const background = document.getElementById('islandBackground');
        const gridOverlay = document.getElementById('gridOverlay');
        
        const dimensions = calculateCanvasDimensions(this.currentIsland);
        
        canvas.style.width = dimensions.width + 'px';
        canvas.style.height = dimensions.height + 'px';
        
        background.innerHTML = generateIslandBackground(this.currentIsland);
        
        this.updateGridWithShape(gridOverlay, island);
        this.createNonPlaceableAreas(island);
        this.applyZoom();
    }
    
    updateGridWithShape(gridOverlay, island) {
        gridOverlay.style.backgroundSize = `${island.gridSize}px ${island.gridSize}px`;
        
        const maskPath = this.createSVGMaskFromShape(island.shape, island.gridSize);
        gridOverlay.style.setProperty('--island-mask', `url("data:image/svg+xml,${encodeURIComponent(maskPath)}")`);
        gridOverlay.classList.add('island-shape');
    }
    
    createSVGMaskFromShape(shape, gridSize) {
        let maskRects = '';
        
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x] === 1) {
                    const xPos = x * gridSize;
                    const yPos = y * gridSize;
                    maskRects += `<rect x="${xPos}" y="${yPos}" width="${gridSize}" height="${gridSize}" fill="white"/>`;
                }
            }
        }
        
        const totalWidth = shape[0].length * gridSize;
        const totalHeight = shape.length * gridSize;
        
        return `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <mask id="islandMask">
                            ${maskRects}
                        </mask>
                    </defs>
                    <rect width="100%" height="100%" fill="black" mask="url(#islandMask)"/>
                </svg>`;
    }
    
    createNonPlaceableAreas(island) {
        document.querySelectorAll('.non-placeable-area').forEach(area => area.remove());
        
        const elementsLayer = document.getElementById('elementsLayer');
        
        for (let y = 0; y < island.shape.length; y++) {
            for (let x = 0; x < island.shape[y].length; x++) {
                if (island.shape[y][x] === 0) {
                    const nonPlaceableArea = document.createElement('div');
                    nonPlaceableArea.className = 'non-placeable-area';
                    nonPlaceableArea.style.cssText = `
                        position: absolute;
                        left: ${x * island.gridSize}px;
                        top: ${y * island.gridSize}px;
                        width: ${island.gridSize}px;
                        height: ${island.gridSize}px;
                        background: rgba(0, 100, 200, 0.1);
                        border: 1px dashed rgba(0, 100, 200, 0.3);
                        pointer-events: none;
                        z-index: 1;
                    `;
                    elementsLayer.appendChild(nonPlaceableArea);
                }
            }
        }
    }
    
    switchCategory(category) {
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });
        
        this.loadElementsForCategory(category);
    }
    
    loadElementsForCategory(category) {
        const elementsGrid = document.getElementById('elementsGrid');
        const elements = getElementsForCategory(category);
        
        elementsGrid.innerHTML = '';
        
        elements.forEach(element => {
            const elementItem = this.createElement(element);
            elementsGrid.appendChild(elementItem);
        });
        
        elementsGrid.style.opacity = '0';
        elementsGrid.style.transform = 'translateY(10px)';
        
        requestAnimationFrame(() => {
            elementsGrid.style.transition = 'all 0.3s ease';
            elementsGrid.style.opacity = '1';
            elementsGrid.style.transform = 'translateY(0)';
        });
    }
    
    createElement(elementData) {
        const elementItem = document.createElement('div');
        elementItem.className = 'element-item';
        elementItem.dataset.elementId = elementData.id;
        elementItem.title = `${elementData.name} (${elementData.size.width}x${elementData.size.height}) - ${elementData.rarity}`;
        
        elementItem.innerHTML = `
            <span class="element-icon">${elementData.icon}</span>
        `;
        
        elementItem.classList.add(`rarity-${elementData.rarity}`);
        
        return elementItem;
    }
    
    zoomIn() {
        const newZoom = Math.min(this.currentZoom + 0.1, 3);
        this.setZoom(newZoom);
    }
    
    zoomOut() {
        const newZoom = Math.max(this.currentZoom - 0.1, 0.5);
        this.setZoom(newZoom);
    }
    
    setZoom(zoom) {
        this.currentZoom = zoom;
        
        document.getElementById('zoomSlider').value = zoom;
        document.getElementById('zoomValue').textContent = Math.round(zoom * 100) + '%';
        
        this.applyZoom();
    }
    
    applyZoom() {
        const canvas = document.getElementById('islandCanvas');
        canvas.style.transform = `scale(${this.currentZoom})`;
    }
    
    toggleGrid(show) {
        const gridOverlay = document.getElementById('gridOverlay');
        gridOverlay.style.display = show ? 'block' : 'none';
    }
    
    centerView() {
        const viewport = document.getElementById('canvasViewport');
        const canvas = document.getElementById('islandCanvas');
        
        const viewportRect = viewport.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        
        const scrollX = (canvasRect.width - viewportRect.width) / 2;
        const scrollY = (canvasRect.height - viewportRect.height) / 2;
        
        viewport.scrollTo({
            left: scrollX,
            top: scrollY,
            behavior: 'smooth'
        });
    }
    
    fitView() {
        const viewport = document.getElementById('canvasViewport');
        const island = getIslandData(this.currentIsland);
        const dimensions = calculateCanvasDimensions(this.currentIsland);
        
        const viewportRect = viewport.getBoundingClientRect();
        
        const scaleX = (viewportRect.width - 40) / dimensions.width;
        const scaleY = (viewportRect.height - 40) / dimensions.height;
        const newZoom = Math.min(scaleX, scaleY, 3);
        
        this.setZoom(newZoom);
        
        setTimeout(() => this.centerView(), 100);
    }
    
    updateCanvasInfo() {
        const island = getIslandData(this.currentIsland);
        const placeableCells = this.countPlaceableCells(island);
        const info = `${island.name} - ${placeableCells} cases placables`;
        document.getElementById('canvasInfo').textContent = info;
    }
    
    countPlaceableCells(island) {
        let count = 0;
        for (let y = 0; y < island.shape.length; y++) {
            for (let x = 0; x < island.shape[y].length; x++) {
                if (island.shape[y][x] === 1) {
                    count++;
                }
            }
        }
        return count;
    }
    
    clearIsland() {
        const elementsLayer = document.getElementById('elementsLayer');
        const elements = elementsLayer.querySelectorAll('.placed-element');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transition = 'all 0.2s ease';
                element.style.transform = 'scale(0)';
                element.style.opacity = '0';
                
                setTimeout(() => element.remove(), 200);
            }, index * 50);
        });
        
        setTimeout(() => this.saveState(), elements.length * 50 + 300);
    }
    
    confirmClear() {
        const elementsCount = document.querySelectorAll('.placed-element').length;
        
        if (elementsCount === 0) {
            this.showNotification('L\'île est déjà vide !', 'info');
            return;
        }
        
        if (confirm(`Êtes-vous sûr de vouloir effacer tous les ${elementsCount} éléments de l'île ?`)) {
            this.clearIsland();
            this.showNotification('Île effacée !', 'success');
        }
    }
    
    saveState() {
        const state = this.getCurrentState();
        
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }
        
        this.history.push(state);
        this.historyIndex = this.history.length - 1;
        
        if (this.history.length > this.maxHistorySteps) {
            this.history.shift();
            this.historyIndex--;
        }
        
        this.updateHistoryButtons();
    }
    
    getCurrentState() {
        const elements = [];
        document.querySelectorAll('.placed-element').forEach(element => {
            elements.push({
                id: element.dataset.elementId,
                data: JSON.parse(element.dataset.elementData),
                gridX: parseInt(element.dataset.gridX),
                gridY: parseInt(element.dataset.gridY)
            });
        });
        
        return {
            island: this.currentIsland,
            elements: elements,
            timestamp: Date.now()
        };
    }
    
    loadState(state) {
        if (state.island !== this.currentIsland) {
            this.switchIsland(state.island);
        }
        
        document.getElementById('elementsLayer').innerHTML = '';
        
        document.querySelectorAll('.non-placeable-area').forEach(area => area.remove());
        
        const island = getIslandData(state.island);
        this.createNonPlaceableAreas(island);
        
        state.elements.forEach(elementInfo => {
            const element = this.dragDropManager.createElement(
                elementInfo.data,
                elementInfo.gridX,
                elementInfo.gridY
            );
            document.getElementById('elementsLayer').appendChild(element);
            this.dragDropManager.setupElementEvents(element);
        });
    }
    
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.loadState(this.history[this.historyIndex]);
            this.updateHistoryButtons();
            this.showNotification('Action annulée', 'info');
        }
    }
    
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.loadState(this.history[this.historyIndex]);
            this.updateHistoryButtons();
            this.showNotification('Action refaite', 'info');
        }
    }
    
    updateHistoryButtons() {
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');
        
        undoBtn.disabled = this.historyIndex <= 0;
        redoBtn.disabled = this.historyIndex >= this.history.length - 1;
        
        undoBtn.style.opacity = undoBtn.disabled ? '0.5' : '1';
        redoBtn.style.opacity = redoBtn.disabled ? '0.5' : '1';
    }
    
    handleKeyboard(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(e.key) {
            case 'z':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                }
                break;
                
            case 'Delete':
            case 'Backspace':
                const selectedElement = document.querySelector('.placed-element.selected');
                if (selectedElement) {
                    e.preventDefault();
                    this.dragDropManager.deleteElement(selectedElement);
                }
                break;
                
            case 'Escape':
                document.querySelectorAll('.placed-element.selected, .element-item.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                break;
                
            case '1':
                this.dragDropManager.setTool('place');
                break;
            case '2':
                this.dragDropManager.setTool('move');
                break;
            case '3':
                this.dragDropManager.setTool('delete');
                break;
                
            case '+':
            case '=':
                e.preventDefault();
                this.zoomIn();
                break;
            case '-':
                e.preventDefault();
                this.zoomOut();
                break;
                
            case ' ':
                e.preventDefault();
                this.centerView();
                break;
                
            case 'f':
                this.fitView();
                break;
                
            case 'g':
                const gridCheckbox = document.getElementById('showGrid');
                gridCheckbox.checked = !gridCheckbox.checked;
                this.toggleGrid(gridCheckbox.checked);
                break;
        }
    }
    
    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.centerView();
        }, 250);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        
        const colors = {
            info: '#004e89',
            success: '#4caf50',
            warning: '#ff9800',
            error: '#f44336'
        };
        
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${colors[type]};
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInUp 0.3s ease;
            font-family: 'Fredoka', sans-serif;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    enableAutoSave() {
        setInterval(() => {
            this.saveToLocalStorage();
        }, 30000);
    }
    
    saveToLocalStorage() {
        const currentState = this.getCurrentState();
        localStorage.setItem('msm-island-designer-autosave', JSON.stringify(currentState));
        console.log('💾 Auto-sauvegarde effectuée');
    }
    
    loadFromLocalStorage() {
        const saved = localStorage.getItem('msm-island-designer-autosave');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                this.loadState(state);
                this.showNotification('Sauvegarde automatique restaurée', 'info');
                return true;
            } catch (e) {
                console.error('Erreur lors du chargement de la sauvegarde:', e);
                return false;
            }
        }
        return false;
    }
}

// Styles supplémentaires
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(additionalStyles);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.islandDesigner = new IslandDesigner();
    
    // Auto-save
    window.islandDesigner.enableAutoSave();
    
    // Restaurer sauvegarde
    setTimeout(() => {
        const hasAutoSave = localStorage.getItem('msm-island-designer-autosave');
        if (hasAutoSave) {
            if (confirm('Une sauvegarde automatique a été trouvée. Voulez-vous la restaurer ?')) {
                window.islandDesigner.loadFromLocalStorage();
            }
        }
    }, 1000);
});

// Prévenir la perte de données
window.addEventListener('beforeunload', (e) => {
    const elementsCount = document.querySelectorAll('.placed-element').length;
    if (elementsCount > 0) {
        window.islandDesigner.saveToLocalStorage();
        e.preventDefault();
        e.returnValue = 'Vous avez des éléments non sauvegardés. Voulez-vous vraiment quitter ?';
    }
});

console.log(`
🎵 MSM Island Designer - Raccourcis clavier:
• 1-3: Changer d'outil
• +/- : Zoom
• Espace: Centrer
• F: Ajuster la vue
• G: Basculer la grille
• Ctrl+Z: Annuler
• Ctrl+Shift+Z: Refaire
• Échap: Désélectionner
• Delete: Supprimer élément sélectionné

💾 Sauvegarde automatique activée !
`);