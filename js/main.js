// Application principale MSM Island Designer - Version avec popup personnalisée
class IslandDesigner {
    constructor() {
        this.currentIsland = 'plant';
        this.currentZoom = 1;
        this.history = [];
        this.historyIndex = -1;
        this.maxHistorySteps = 50;
        
        this.dragDropManager = null;
        this.exportManager = null;
        
        // Variables pour la popup personnalisée
        this.hasUnsavedChanges = false;
        this.isLeavingPage = false;
        
        this.init();
    }
    
    init() {
        // Initialiser les managers
        this.dragDropManager = new DragDropManager();
        this.exportManager = new ExportManager();
        
        // Initialiser l'interface
        this.initInterface();
        this.initEventListeners();
        this.initCustomConfirmDialog();
        
        // Charger l'île par défaut
        this.switchIsland(this.currentIsland);
        this.loadElementsForCategory('monsters');
        
        // Sauvegarder l'état initial
        this.saveState();
        
        console.log('🎵 MSM Island Designer initialisé ! 🏝️');
    }
    
    // Nouvelle méthode pour créer la popup personnalisée
    initCustomConfirmDialog() {
        // Créer la structure HTML de la popup
        const dialogHTML = `
            <div id="customConfirmDialog" class="custom-dialog-overlay" style="display: none;">
                <div class="custom-dialog">
                    <div class="custom-dialog-header">
                        <h3>🎵 MSM Island Designer</h3>
                    </div>
                    <div class="custom-dialog-content">
                        <div class="custom-dialog-icon">⚠️</div>
                        <p id="customDialogMessage">Vous avez des éléments non sauvegardés sur votre île.</p>
                        <p class="custom-dialog-submessage">Voulez-vous sauvegarder avant de quitter ?</p>
                    </div>
                    <div class="custom-dialog-actions">
                        <button id="customDialogSave" class="custom-dialog-btn custom-dialog-btn-primary">
                            💾 Sauvegarder et quitter
                        </button>
                        <button id="customDialogLeave" class="custom-dialog-btn custom-dialog-btn-danger">
                            🗑️ Quitter sans sauvegarder
                        </button>
                        <button id="customDialogCancel" class="custom-dialog-btn custom-dialog-btn-secondary">
                            ❌ Annuler
                        </button>
                    </div>
                    <div class="custom-dialog-footer">
                        <small>💡 Vos îles sont automatiquement sauvegardées toutes les 30 secondes</small>
                    </div>
                </div>
            </div>
        `;
        
        // Ajouter au body
        document.body.insertAdjacentHTML('beforeend', dialogHTML);
        
        // Configurer les événements
        this.setupCustomDialogEvents();
    }
    
    setupCustomDialogEvents() {
        const dialog = document.getElementById('customConfirmDialog');
        const saveBtn = document.getElementById('customDialogSave');
        const leaveBtn = document.getElementById('customDialogLeave');
        const cancelBtn = document.getElementById('customDialogCancel');
        
        // Sauvegarder et quitter
        saveBtn.addEventListener('click', () => {
            this.saveToLocalStorage();
            this.showNotification('Île sauvegardée ! 💾', 'success');
            this.hideCustomDialog();
            this.isLeavingPage = true;
            
            // Petit délai pour la notification puis quitter
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
        
        // Quitter sans sauvegarder
        leaveBtn.addEventListener('click', () => {
            this.hideCustomDialog();
            this.isLeavingPage = true;
            window.location.reload();
        });
        
        // Annuler
        cancelBtn.addEventListener('click', () => {
            this.hideCustomDialog();
        });
        
        // Fermer en cliquant sur l'overlay
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                this.hideCustomDialog();
            }
        });
        
        // Échap pour fermer
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dialog.style.display !== 'none') {
                this.hideCustomDialog();
            }
        });
    }
    
    showCustomConfirmDialog(elementsCount) {
        const dialog = document.getElementById('customConfirmDialog');
        const message = document.getElementById('customDialogMessage');
        
        // Message personnalisé selon le nombre d'éléments
        if (elementsCount === 1) {
            message.textContent = `Vous avez 1 élément non sauvegardé sur votre île.`;
        } else {
            message.textContent = `Vous avez ${elementsCount} éléments non sauvegardés sur votre île.`;
        }
        
        // Afficher avec animation
        dialog.style.display = 'flex';
        dialog.style.opacity = '0';
        
        requestAnimationFrame(() => {
            dialog.style.transition = 'opacity 0.3s ease';
            dialog.style.opacity = '1';
        });
        
        // Focus sur le bouton sauvegarder
        document.getElementById('customDialogSave').focus();
    }
    
    hideCustomDialog() {
        const dialog = document.getElementById('customConfirmDialog');
        
        dialog.style.transition = 'opacity 0.3s ease';
        dialog.style.opacity = '0';
        
        setTimeout(() => {
            dialog.style.display = 'none';
        }, 300);
    }
    
    // Méthode pour déclencher la confirmation avant de quitter
    confirmBeforeLeave() {
        const elementsCount = document.querySelectorAll('.placed-element').length;
        
        if (elementsCount > 0 && !this.isLeavingPage) {
            this.showCustomConfirmDialog(elementsCount);
            return false; // Empêcher la navigation
        }
        
        return true; // Permettre la navigation
    }
    
    // Reste du code existant de la classe IslandDesigner...
    initInterface() {
        this.updateCanvasInfo();
        
        const zoomSlider = document.getElementById('zoomSlider');
        const zoomValue = document.getElementById('zoomValue');
        zoomSlider.value = this.currentZoom;
        zoomValue.textContent = Math.round(this.currentZoom * 100) + '%';
    }
    
    // Ajouter cette méthode dans la classe IslandDesigner

    showHelpDialog() {
        // Supprimer l'ancienne popup d'aide si elle existe
        const existingHelp = document.getElementById('helpDialog');
        if (existingHelp) {
            existingHelp.remove();
        }
        
        const helpDialog = document.createElement('div');
        helpDialog.id = 'helpDialog';
        helpDialog.className = 'custom-dialog-overlay';
        helpDialog.innerHTML = `
            <div class="custom-dialog help-dialog">
                <div class="custom-dialog-header">
                    <h3>🎵 Guide d'utilisation - MSM Island Designer</h3>
                </div>
                <div class="custom-dialog-content help-content">
                    <div class="help-section">
                        <h4>🎮 Outils de base</h4>
                        <div class="help-item">
                            <span class="help-icon">📍</span>
                            <div>
                                <strong>Placer (1)</strong>
                                <p>Sélectionnez un monstre dans la palette, puis cliquez sur l'île pour le placer</p>
                            </div>
                        </div>
                        <div class="help-item">
                            <span class="help-icon">🤏</span>
                            <div>
                                <strong>Déplacer (2)</strong>
                                <p>Cliquez et glissez les monstres déjà placés pour les repositionner</p>
                            </div>
                        </div>
                        <div class="help-item">
                            <span class="help-icon">🗑️</span>
                            <div>
                                <strong>Supprimer (3)</strong>
                                <p>Cliquez sur un monstre pour le supprimer de l'île</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="help-section">
                        <h4>⌨️ Raccourcis clavier</h4>
                        <div class="shortcuts-grid">
                            <div class="shortcut-item">
                                <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd>
                                <span>Changer d'outil</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>+</kbd><kbd>-</kbd>
                                <span>Zoom</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Espace</kbd>
                                <span>Centrer la vue</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>F</kbd>
                                <span>Ajuster la vue</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>G</kbd>
                                <span>Afficher/Masquer la grille</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Ctrl</kbd>+<kbd>Z</kbd>
                                <span>Annuler</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd>
                                <span>Refaire</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Suppr</kbd>
                                <span>Supprimer élément sélectionné</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Échap</kbd>
                                <span>Désélectionner</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="help-section">
                        <h4>🏝️ Navigation</h4>
                        <div class="help-item">
                            <span class="help-icon">🖱️</span>
                            <div>
                                <strong>Déplacer la carte</strong>
                                <p>Cliquez et glissez sur les zones grises autour de l'île</p>
                            </div>
                        </div>
                        <div class="help-item">
                            <span class="help-icon">🔍</span>
                            <div>
                                <strong>Zoom</strong>
                                <p>Utilisez la molette de la souris ou les boutons +/- dans l'interface</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="help-section">
                        <h4>💾 Sauvegarde</h4>
                        <div class="help-item">
                            <span class="help-icon">🔄</span>
                            <div>
                                <strong>Sauvegarde automatique</strong>
                                <p>Vos îles sont automatiquement sauvegardées toutes les 30 secondes</p>
                            </div>
                        </div>
                        <div class="help-item">
                            <span class="help-icon">📤</span>
                            <div>
                                <strong>Export</strong>
                                <p>Utilisez le bouton "Exporter" pour sauvegarder votre île en image</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="help-section">
                        <h4>💡 Astuces</h4>
                        <ul class="tips-list">
                            <li>🎯 Les zones bleues en pointillés ne peuvent pas accueillir de monstres</li>
                            <li>🧩 Chaque monstre a une taille différente (1x1, 2x2, etc.)</li>
                            <li>⭐ Les monstres sont classés par rareté : Common, Rare, Epic, Legendary</li>
                            <li>🔄 Vous pouvez annuler jusqu'à 50 actions avec Ctrl+Z</li>
                            <li>🎨 Changez d'île dans le menu déroulant en haut</li>
                            <li>📱 L'interface s'adapte à la taille de votre écran</li>
                        </ul>
                    </div>
                </div>
                <div class="custom-dialog-actions">
                    <button id="helpDialogClose" class="custom-dialog-btn custom-dialog-btn-primary">
                        ✅ Compris !
                    </button>
                </div>
                <div class="custom-dialog-footer">
                    <small>🎵 My Singing Monsters Island Designer - Version 1.0</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(helpDialog);
        
        // Afficher avec animation
        helpDialog.style.display = 'flex';
        helpDialog.style.opacity = '0';
        
        requestAnimationFrame(() => {
            helpDialog.style.transition = 'opacity 0.3s ease';
            helpDialog.style.opacity = '1';
        });
        
        // Événements pour fermer
        document.getElementById('helpDialogClose').addEventListener('click', () => {
            this.hideHelpDialog();
        });
        
        helpDialog.addEventListener('click', (e) => {
            if (e.target === helpDialog) {
                this.hideHelpDialog();
            }
        });
        
        // Focus sur le bouton fermer
        document.getElementById('helpDialogClose').focus();
    }

    hideHelpDialog() {
        const helpDialog = document.getElementById('helpDialog');
        if (helpDialog) {
            helpDialog.style.transition = 'opacity 0.3s ease';
            helpDialog.style.opacity = '0';
            
            setTimeout(() => {
                helpDialog.remove();
            }, 300);
        }
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

        // Bouton d'aide
        document.getElementById('helpBtn').addEventListener('click', () => {
            this.showHelpDialog();
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
        
        // Bouton de refresh personnalisé (optionnel)
        this.addRefreshButton();
    }
    
    // Ajouter un bouton refresh personnalisé (optionnel)
    addRefreshButton() {
        const headerButtons = document.querySelector('.header-buttons');
        if (headerButtons) {
            const refreshBtn = document.createElement('button');
            refreshBtn.className = 'btn btn-secondary';
            refreshBtn.innerHTML = '🔄 Nouvelle île';
            refreshBtn.title = 'Commencer une nouvelle île (avec confirmation)';
            
            refreshBtn.addEventListener('click', () => {
                if (!this.confirmBeforeLeave()) {
                    // La popup s'affiche, pas besoin de faire autre chose
                    return;
                }
                // Si pas d'éléments, restart direct
                this.clearIsland();
                this.showNotification('Nouvelle île créée ! 🏝️', 'success');
            });
            
            headerButtons.appendChild(refreshBtn);
        }
    }
    
    saveState() {
        this.hasUnsavedChanges = true;
        
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
    
    saveToLocalStorage() {
        const currentState = this.getCurrentState();
        localStorage.setItem('msm-island-designer-autosave', JSON.stringify(currentState));
        this.hasUnsavedChanges = false;
        console.log('💾 Auto-sauvegarde effectuée');
    }
    
    // [Tout le reste du code de la classe IslandDesigner reste identique...]
    
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

// Styles pour la popup personnalisée
const customDialogStyles = document.createElement('style');
customDialogStyles.textContent = `
    .custom-dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        font-family: 'Fredoka', sans-serif;
    }
    
    .custom-dialog {
        background: white;
        border-radius: 16px;
        box-shadow: 0 16px 64px rgba(0, 0, 0, 0.3);
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow: hidden;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .custom-dialog-overlay[style*="opacity: 1"] .custom-dialog {
        transform: scale(1);
    }
    
    .custom-dialog-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;
        text-align: center;
    }
    
    .custom-dialog-header h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
    }
    
    .custom-dialog-content {
        padding: 2rem;
        text-align: center;
    }
    
    .custom-dialog-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        animation: pulse 2s infinite;
    }
    
    .custom-dialog-content p {
        margin: 0.5rem 0;
        font-size: 1.1rem;
        color: #333;
    }
    
    .custom-dialog-submessage {
        font-size: 1rem !important;
        color: #666 !important;
        font-weight: 500;
    }
    
    .custom-dialog-actions {
        padding: 1rem 2rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .custom-dialog-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-family: 'Fredoka', sans-serif;
        font-weight: 500;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .custom-dialog-btn-primary {
        background: #4caf50;
        color: white;
        border: 2px solid #4caf50;
    }
    
    .custom-dialog-btn-primary:hover {
        background: #45a049;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }
    
    .custom-dialog-btn-danger {
        background: #f44336;
        color: white;
        border: 2px solid #f44336;
    }
    
    .custom-dialog-btn-danger:hover {
        background: #da190b;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
    }
    
    .custom-dialog-btn-secondary {
        background: #f5f5f5;
        color: #333;
        border: 2px solid #ddd;
    }
    
    .custom-dialog-btn-secondary:hover {
        background: #e0e0e0;
        border-color: #bbb;
        transform: translateY(-1px);
    }
    
    .custom-dialog-footer {
        background: #f8f9fa;
        padding: 1rem 2rem;
        text-align: center;
        border-top: 1px solid #eee;
    }
    
    .custom-dialog-footer small {
        color: #666;
        font-size: 0.875rem;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @media (max-width: 600px) {
        .custom-dialog {
            margin: 1rem;
            width: calc(100% - 2rem);
        }
        
        .custom-dialog-content {
            padding: 1.5rem;
        }
        
        .custom-dialog-actions {
            padding: 1rem 1.5rem 1.5rem;
        }
    }
`;

        // Remplacez les styles de la popup d'aide par ceci :

const helpDialogStyles = document.createElement('style');
helpDialogStyles.textContent = `
    .help-dialog {
        max-width: 700px !important;
        max-height: 85vh !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
    }
    
    .help-dialog .custom-dialog-header {
        flex-shrink: 0;
    }
    
    .help-dialog .custom-dialog-actions {
        flex-shrink: 0;
    }
    
    .help-dialog .custom-dialog-footer {
        flex-shrink: 0;
    }
    
    .help-content {
        padding: 1.5rem 2rem !important;
        text-align: left !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        flex: 1 !important;
        max-height: calc(85vh - 200px) !important;
    }
    
    /* Amélioration de la scrollbar */
    .help-content::-webkit-scrollbar {
        width: 8px;
    }
    
    .help-content::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }
    
    .help-content::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
    }
    
    .help-content::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }
    
    .help-section {
        margin-bottom: 2rem;
        border-bottom: 1px solid #eee;
        padding-bottom: 1.5rem;
    }
    
    .help-section:last-child {
        border-bottom: none;
        margin-bottom: 1rem;
    }
    
    .help-section h4 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 1.2rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        position: sticky;
        top: 0;
        background: white;
        padding: 0.5rem 0;
        z-index: 1;
    }
    
    .help-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 0.75rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .help-icon {
        font-size: 1.5rem;
        min-width: 2rem;
        text-align: center;
        flex-shrink: 0;
    }
    
    .help-item strong {
        color: #333;
        font-size: 1rem;
        margin-bottom: 0.25rem;
        display: block;
    }
    
    .help-item p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .shortcuts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.75rem;
    }
    
    .shortcut-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background: #f8f9fa;
        border-radius: 6px;
        font-size: 0.9rem;
        min-height: 2.5rem;
    }
    
    .shortcut-item kbd {
        background: #333;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 0.8rem;
        font-weight: bold;
        border: 1px solid #555;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        flex-shrink: 0;
    }
    
    .tips-list {
        margin: 0;
        padding-left: 0;
        list-style: none;
    }
    
    .tips-list li {
        margin-bottom: 0.75rem;
        padding: 0.5rem;
        background: #e3f2fd;
        border-radius: 6px;
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .tips-list li:last-child {
        margin-bottom: 0;
    }
    
    /* Indicateur de scroll */
    .help-content::before {
        content: "";
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, transparent 0%, #667eea 50%, transparent 100%);
        opacity: 0.6;
        z-index: 2;
        display: block;
        margin-bottom: 1rem;
    }
    
    @media (max-width: 768px) {
        .help-dialog {
            max-width: 95% !important;
            max-height: 90vh !important;
            margin: 0.5rem;
        }
        
        .help-content {
            padding: 1rem !important;
            max-height: calc(90vh - 180px) !important;
        }
        
        .shortcuts-grid {
            grid-template-columns: 1fr;
        }
        
        .help-item {
            flex-direction: row;
            gap: 0.75rem;
        }
        
        .help-section h4 {
            font-size: 1.1rem;
        }
        
        .shortcut-item {
            min-height: 2rem;
        }
    }
    
    @media (max-width: 480px) {
        .help-dialog {
            max-height: 95vh !important;
        }
        
        .help-content {
            max-height: calc(95vh - 160px) !important;
        }
        
        .help-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
        }
        
        .help-icon {
            min-width: auto;
        }
    }
`;
document.head.appendChild(helpDialogStyles);

document.head.appendChild(customDialogStyles);

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
    
    // Restaurer sauvegarde avec popup personnalisée
    setTimeout(() => {
        const hasAutoSave = localStorage.getItem('msm-island-designer-autosave');
        if (hasAutoSave) {
            // Popup personnalisée pour la restauration
            const restoreDialog = document.createElement('div');
            restoreDialog.className = 'custom-dialog-overlay';
            restoreDialog.innerHTML = `
                <div class="custom-dialog">
                    <div class="custom-dialog-header">
                        <h3>💾 Sauvegarde trouvée</h3>
                    </div>
                    <div class="custom-dialog-content">
                        <div class="custom-dialog-icon">🏝️</div>
                        <p>Une sauvegarde automatique de votre île a été trouvée.</p>
                        <p class="custom-dialog-submessage">Voulez-vous la restaurer ?</p>
                    </div>
                    <div class="custom-dialog-actions">
                        <button id="restoreYes" class="custom-dialog-btn custom-dialog-btn-primary">
                            ✅ Oui, restaurer ma sauvegarde
                        </button>
                        <button id="restoreNo" class="custom-dialog-btn custom-dialog-btn-secondary">
                            🆕 Non, commencer une nouvelle île
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(restoreDialog);
            
            document.getElementById('restoreYes').addEventListener('click', () => {
                window.islandDesigner.loadFromLocalStorage();
                restoreDialog.remove();
            });
            
            document.getElementById('restoreNo').addEventListener('click', () => {
                localStorage.removeItem('msm-island-designer-autosave');
                restoreDialog.remove();
            });
        }
    }, 1000);
});

// Gestionnaire de navigation personnalisé
document.addEventListener('keydown', (e) => {
    const isRefreshKey = (e.key === 'F5') || 
                        (e.ctrlKey && e.key === 'r') || 
                        (e.ctrlKey && e.key === 'R');
    
    if (isRefreshKey) {
        const elementsCount = document.querySelectorAll('.placed-element').length;
        
        if (elementsCount > 0 && window.islandDesigner && !window.islandDesigner.isLeavingPage) {
            e.preventDefault();
            window.islandDesigner.showCustomConfirmDialog(elementsCount);
        }
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
🎨 Interface avec popups personnalisées !
`);