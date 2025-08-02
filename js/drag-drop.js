// Système de drag & drop et interactions - Version corrigée
class DragDropManager {
    constructor() {
        this.isDragging = false;
        this.dragElement = null;
        this.dragOffset = { x: 0, y: 0 };
        this.currentTool = 'place';
        this.selectedElement = null;
        this.selectedElementType = null;
        this.snapToGrid = true;
        this.gridSize = 40;
        
        // Variables pour le drag de la carte
        this.isMapDragging = false;
        this.mapDragStart = { x: 0, y: 0 };
        this.mapScrollStart = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.setupToolButtons();
        this.setupElementPalette();
        this.setupCanvasEvents();
        this.setupViewportDrag();
        this.setupGridControls();
        
        console.log('🎮 DragDropManager initialisé');
    }
    
    setupToolButtons() {
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setTool(btn.dataset.tool);
            });
        });
    }
    
    setupElementPalette() {
        document.addEventListener('click', (e) => {
            const elementItem = e.target.closest('.element-item');
            if (elementItem) {
                this.selectElement(elementItem);
            }
        });
    }
    
    setupCanvasEvents() {
        const canvas = document.getElementById('islandCanvas');
        
        // Événements de clic pour placement
        canvas.addEventListener('click', (e) => {
            if (this.isDragging || this.isMapDragging) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.handleCanvasClick(x, y);
        });
        
        // Empêcher le menu contextuel
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        
        console.log('📱 Événements canvas configurés');
    }
    
    setupViewportDrag() {
        const viewport = document.getElementById('canvasViewport');
        let isDown = false;
        let startX, startY;
        let scrollLeft, scrollTop;
        
        viewport.addEventListener('mousedown', (e) => {
            // Ne pas démarrer le drag de viewport si on clique sur un élément ou le canvas
            if (e.target.closest('.placed-element') || e.target.closest('#islandCanvas')) {
                return;
            }
            
            isDown = true;
            viewport.classList.add('dragging');
            startX = e.pageX - viewport.offsetLeft;
            startY = e.pageY - viewport.offsetTop;
            scrollLeft = viewport.scrollLeft;
            scrollTop = viewport.scrollTop;
            viewport.style.cursor = 'grabbing';
        });
        
        viewport.addEventListener('mouseleave', () => {
            isDown = false;
            viewport.classList.remove('dragging');
            viewport.style.cursor = 'grab';
        });
        
        viewport.addEventListener('mouseup', () => {
            isDown = false;
            viewport.classList.remove('dragging');
            viewport.style.cursor = 'grab';
        });
        
        viewport.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - viewport.offsetLeft;
            const y = e.pageY - viewport.offsetTop;
            const walkX = (x - startX) * 1;
            const walkY = (y - startY) * 1;
            viewport.scrollLeft = scrollLeft - walkX;
            viewport.scrollTop = scrollTop - walkY;
        });
        
        console.log('🗺️ Drag de viewport configuré');
    }
    
    setupGridControls() {
        const snapToGridCheckbox = document.getElementById('snapToGrid');
        if (snapToGridCheckbox) {
            snapToGridCheckbox.addEventListener('change', (e) => {
                this.snapToGrid = e.target.checked;
            });
        }
    }
    
    setTool(tool) {
        this.currentTool = tool;
        
        // Mettre à jour l'interface
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tool === tool);
        });
        
        // Mettre à jour les curseurs
        this.updateCursors();
        
        // NE PAS désélectionner l'élément de la palette quand on change d'outil
        // Garder la sélection pour pouvoir replacer après avoir déplacé/supprimé
        
        console.log('🔧 Outil changé:', tool);
    }
    
    updateCursors() {
        const canvas = document.getElementById('islandCanvas');
        const viewport = document.getElementById('canvasViewport');
        
        // Curseur du canvas
        switch(this.currentTool) {
            case 'place':
                canvas.style.cursor = 'crosshair';
                break;
            case 'move':
                canvas.style.cursor = 'default';
                break;
            case 'delete':
                canvas.style.cursor = 'not-allowed';
                break;
        }
        
        // Curseur des éléments
        document.querySelectorAll('.placed-element').forEach(element => {
            switch(this.currentTool) {
                case 'place':
                    element.style.cursor = 'pointer';
                    break;
                case 'move':
                    element.style.cursor = 'grab';
                    break;
                case 'delete':
                    element.style.cursor = 'not-allowed';
                    break;
            }
        });
        
        // Curseur du viewport
        viewport.style.cursor = 'grab';
    }
    
    selectElement(elementItem) {
        // Désélectionner l'ancien
        document.querySelectorAll('.element-item.selected').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Sélectionner le nouveau
        elementItem.classList.add('selected');
        
        // Récupérer les données
        this.selectedElementType = elementItem.dataset.elementId;
        this.selectedElement = getElementById(this.selectedElementType);
        
        // AUTOMATIQUEMENT passer en mode placement quand on sélectionne un élément
        this.setTool('place');
        
        console.log('🎯 Élément sélectionné:', this.selectedElement.name);
    }
    
    handleCanvasClick(x, y) {
        const gridPos = this.screenToGrid(x, y);
        
        switch(this.currentTool) {
            case 'place':
                if (this.selectedElement) {
                    this.placeElement(gridPos.x, gridPos.y);
                } else {
                    // Afficher un message si aucun élément n'est sélectionné
                    this.showError('Sélectionnez d\'abord un élément dans la palette à gauche');
                }
                break;
                
            case 'delete':
                this.deleteElementAt(gridPos.x, gridPos.y);
                break;
                
            case 'move':
                // Sélectionner l'élément cliqué
                this.selectElementAt(gridPos.x, gridPos.y);
                break;
        }
    }
    
    placeElement(gridX, gridY) {
        if (!this.selectedElement) {
            this.showError('Aucun élément sélectionné');
            return;
        }
        
        // Vérifier si la position est valide
        if (!this.isValidPosition(gridX, gridY, this.selectedElement)) {
            this.showError('Position invalide - vérifiez que l\'élément est entièrement sur l\'île');
            return;
        }
        
        // Créer l'élément
        const element = this.createElement(this.selectedElement, gridX, gridY);
        
        // L'ajouter au canvas
        document.getElementById('elementsLayer').appendChild(element);
        
        // Configurer les événements
        this.setupElementEvents(element);
        
        // Sauvegarder
        window.islandDesigner.saveState();
        
        // Animation
        this.animateElementPlacement(element);
        
        console.log('✅ Élément placé:', this.selectedElement.name, 'à', gridX, gridY);
        
        // Garder l'élément sélectionné pour pouvoir en placer d'autres
        // Ne pas désélectionner automatiquement
    }
    
    createElement(elementData, gridX, gridY) {
        const element = document.createElement('div');
        element.className = 'placed-element';
        element.dataset.elementId = elementData.id;
        element.dataset.elementData = JSON.stringify(elementData);
        element.dataset.gridX = gridX;
        element.dataset.gridY = gridY;
        
        // Position et taille
        const screenPos = this.gridToScreen(gridX, gridY);
        element.style.position = 'absolute';
        element.style.left = screenPos.x + 'px';
        element.style.top = screenPos.y + 'px';
        element.style.width = (elementData.size.width * this.gridSize) + 'px';
        element.style.height = (elementData.size.height * this.gridSize) + 'px';
        
        // Contenu
        element.innerHTML = `
            <span class="element-icon">${elementData.icon}</span>
            <span class="element-name">${elementData.name}</span>
        `;
        
        // Style initial
        element.style.background = 'rgba(255, 255, 255, 0.9)';
        element.style.border = '2px solid rgba(255, 255, 255, 0.5)';
        element.style.borderRadius = '8px';
        element.style.display = 'flex';
        element.style.flexDirection = 'column';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
        element.style.fontSize = '2rem';
        element.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
        element.style.userSelect = 'none';
        element.style.cursor = 'pointer';
        
        return element;
    }
    
    setupElementEvents(element) {
        let isDragging = false;
        let dragStart = { x: 0, y: 0 };
        let elementStart = { x: 0, y: 0 };
        
        element.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🎯 MouseDown sur élément:', element.dataset.elementId, 'Outil:', this.currentTool);
            
            if (this.currentTool === 'move') {
                isDragging = true;
                this.isDragging = true;
                this.dragElement = element;
                
                // Position de départ
                dragStart.x = e.clientX;
                dragStart.y = e.clientY;
                elementStart.x = parseInt(element.style.left);
                elementStart.y = parseInt(element.style.top);
                
                // Style pendant le drag
                element.style.zIndex = '1000';
                element.style.opacity = '0.8';
                element.style.transform = 'scale(1.05)';
                element.style.cursor = 'grabbing';
                
                // Sélectionner l'élément
                this.selectPlacedElement(element);
                
                console.log('🚀 Drag démarré');
                
                // Ajouter les listeners globaux
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
                
            } else if (this.currentTool === 'delete') {
                this.deleteElement(element);
            } else {
                this.selectPlacedElement(element);
            }
        });
        
        // Événements globaux pour le drag (définis ici pour éviter les fuites mémoire)
        const onMouseMove = (e) => {
            if (!isDragging || this.dragElement !== element) return;
            
            const deltaX = e.clientX - dragStart.x;
            const deltaY = e.clientY - dragStart.y;
            
            const newX = elementStart.x + deltaX;
            const newY = elementStart.y + deltaY;
            
            if (this.snapToGrid) {
                const gridPos = this.screenToGrid(newX, newY);
                const snapPos = this.gridToScreen(gridPos.x, gridPos.y);
                element.style.left = snapPos.x + 'px';
                element.style.top = snapPos.y + 'px';
                
                // Validation visuelle
                this.updateDragValidityVisual(element, gridPos.x, gridPos.y);
            } else {
                element.style.left = newX + 'px';
                element.style.top = newY + 'px';
            }
        };
        
        const onMouseUp = (e) => {
            if (!isDragging || this.dragElement !== element) return;
            
            isDragging = false;
            this.isDragging = false;
            this.dragElement = null;
            
            // Position finale
            const finalX = parseInt(element.style.left);
            const finalY = parseInt(element.style.top);
            const gridPos = this.screenToGrid(finalX, finalY);
            
            console.log('🎯 Fin drag à position:', gridPos);
            
            // Vérifier la validité
            const elementData = JSON.parse(element.dataset.elementData);
            if (this.isValidPosition(gridPos.x, gridPos.y, elementData, element)) {
                // Position valide
                this.updateElementPosition(element, gridPos.x, gridPos.y);
                console.log('✅ Position valide');
            } else {
                // Position invalide - remettre à l'ancienne position
                const oldGridX = parseInt(element.dataset.gridX);
                const oldGridY = parseInt(element.dataset.gridY);
                const oldPos = this.gridToScreen(oldGridX, oldGridY);
                element.style.left = oldPos.x + 'px';
                element.style.top = oldPos.y + 'px';
                this.showError('Position invalide');
                console.log('❌ Position invalide - remis en place');
            }
            
            // Nettoyer le style
            element.style.zIndex = '';
            element.style.opacity = '';
            element.style.transform = '';
            element.style.cursor = 'grab';
            element.classList.remove('drag-valid', 'drag-invalid');
            
            // Supprimer les listeners globaux
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            
            console.log('🏁 Drag terminé');
        };
        
        // Click simple
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isDragging) {
                this.selectPlacedElement(element);
            }
        });
        
        // Mettre à jour le curseur
        this.updateCursors();
    }
    
    deleteElementAt(gridX, gridY) {
        const element = this.getElementAtPosition(gridX, gridY);
        if (element) {
            this.deleteElement(element);
        }
    }
    
    deleteElement(element) {
        element.style.transition = 'all 0.3s ease';
        element.style.transform = 'scale(0)';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.remove();
            window.islandDesigner.saveState();
        }, 300);
        
        console.log('🗑️ Élément supprimé:', element.dataset.elementId);
    }
    
    selectElementAt(gridX, gridY) {
        const element = this.getElementAtPosition(gridX, gridY);
        if (element) {
            this.selectPlacedElement(element);
        }
    }
    
    selectPlacedElement(element) {
        // Désélectionner les autres
        document.querySelectorAll('.placed-element.selected').forEach(el => {
            el.classList.remove('selected');
            // Remettre le style normal
            el.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            el.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
        });
        
        // Sélectionner celui-ci
        element.classList.add('selected');
        element.style.borderColor = '#ffa726';
        element.style.boxShadow = '0 0 0 3px rgba(255, 167, 38, 0.3)';
        
        console.log('🎯 Élément placé sélectionné:', element.dataset.elementId);
    }
    
    getElementAtPosition(gridX, gridY) {
        const elements = document.querySelectorAll('.placed-element');
        
        for (const element of elements) {
            const elementGridX = parseInt(element.dataset.gridX);
            const elementGridY = parseInt(element.dataset.gridY);
            const elementData = JSON.parse(element.dataset.elementData);
            
            if (gridX >= elementGridX && 
                gridX < elementGridX + elementData.size.width &&
                gridY >= elementGridY && 
                gridY < elementGridY + elementData.size.height) {
                return element;
            }
        }
        
        return null;
    }
    
    updateElementPosition(element, gridX, gridY) {
        element.dataset.gridX = gridX;
        element.dataset.gridY = gridY;
        
        const screenPos = this.gridToScreen(gridX, gridY);
        element.style.left = screenPos.x + 'px';
        element.style.top = screenPos.y + 'px';
        
        window.islandDesigner.saveState();
    }
    
    updateDragValidityVisual(element, gridX, gridY) {
        const elementData = JSON.parse(element.dataset.elementData);
        const isValid = this.isValidPosition(gridX, gridY, elementData, element);
        
        element.classList.toggle('drag-valid', isValid);
        element.classList.toggle('drag-invalid', !isValid);
    }
    
    isValidPosition(gridX, gridY, elementData, excludeElement = null) {
        // Vérifier les limites de l'île
        if (!canPlaceElementAt(window.islandDesigner.currentIsland, gridX, gridY, elementData.size)) {
            return false;
        }
        
        // Vérifier les collisions
        const elements = document.querySelectorAll('.placed-element');
        
        for (const element of elements) {
            if (element === excludeElement) continue;
            
            const elementGridX = parseInt(element.dataset.gridX);
            const elementGridY = parseInt(element.dataset.gridY);
            const existingElementData = JSON.parse(element.dataset.elementData);
            
            if (this.checkIntersection(
                gridX, gridY, elementData.size.width, elementData.size.height,
                elementGridX, elementGridY, existingElementData.size.width, existingElementData.size.height
            )) {
                return false;
            }
        }
        
        return true;
    }
    
    checkIntersection(x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(x1 + w1 <= x2 || x2 + w2 <= x1 || y1 + h1 <= y2 || y2 + h2 <= y1);
    }
    
    screenToGrid(screenX, screenY) {
        return {
            x: Math.floor(screenX / this.gridSize),
            y: Math.floor(screenY / this.gridSize)
        };
    }
    
    gridToScreen(gridX, gridY) {
        return {
            x: gridX * this.gridSize,
            y: gridY * this.gridSize
        };
    }
    
    animateElementPlacement(element) {
        element.style.transform = 'scale(0)';
        element.style.opacity = '0';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.3s ease';
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
    }
    
    showError(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f44336;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            font-family: 'Fredoka', sans-serif;
            font-weight: 500;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    updateGridSize(newGridSize) {
        this.gridSize = newGridSize;
        
        // Mettre à jour tous les éléments
        document.querySelectorAll('.placed-element').forEach(element => {
            const gridX = parseInt(element.dataset.gridX);
            const gridY = parseInt(element.dataset.gridY);
            const elementData = JSON.parse(element.dataset.elementData);
            
            const screenPos = this.gridToScreen(gridX, gridY);
            element.style.left = screenPos.x + 'px';
            element.style.top = screenPos.y + 'px';
            element.style.width = (elementData.size.width * this.gridSize) + 'px';
            element.style.height = (elementData.size.height * this.gridSize) + 'px';
        });
    }
    
    // Fonctionnalités supplémentaires
    getValidPositionsForElement(elementData) {
        const validPositions = [];
        const island = getIslandData(window.islandDesigner.currentIsland);
        
        for (let y = 0; y < island.dimensions.height - elementData.size.height + 1; y++) {
            for (let x = 0; x < island.dimensions.width - elementData.size.width + 1; x++) {
                if (this.isValidPosition(x, y, elementData)) {
                    validPositions.push({ x, y });
                }
            }
        }
        
        return validPositions;
    }
    
    autoPlaceElement(elementData) {
        const validPositions = this.getValidPositionsForElement(elementData);
        
        if (validPositions.length === 0) {
            this.showError('Aucune position valide trouvée');
            return false;
        }
        
        // Placer au centre si possible
        const island = getIslandData(window.islandDesigner.currentIsland);
        const centerX = Math.floor(island.dimensions.width / 2);
        const centerY = Math.floor(island.dimensions.height / 2);
        
        validPositions.sort((a, b) => {
            const distA = Math.sqrt(Math.pow(a.x - centerX, 2) + Math.pow(a.y - centerY, 2));
            const distB = Math.sqrt(Math.pow(b.x - centerX, 2) + Math.pow(b.y - centerY, 2));
            return distA - distB;
        });
        
        const bestPosition = validPositions[0];
        this.selectedElement = elementData;
        this.placeElement(bestPosition.x, bestPosition.y);
        
        return true;
    }
    
    // Méthode pour maintenir la sélection d'élément de palette
    maintainPaletteSelection() {
        // Vérifier si un élément de la palette était sélectionné
        const selectedPaletteItem = document.querySelector('.element-item.selected');
        if (selectedPaletteItem && !this.selectedElement) {
            // Récupérer les données de l'élément
            this.selectedElementType = selectedPaletteItem.dataset.elementId;
            this.selectedElement = getElementById(this.selectedElementType);
            console.log('🔄 Sélection de palette maintenue:', this.selectedElement.name);
        }
    }
    
    // Réinitialiser tous les éléments pour les événements
    refreshAllElements() {
        document.querySelectorAll('.placed-element').forEach(element => {
            this.setupElementEvents(element);
        });
        this.updateCursors();
        this.maintainPaletteSelection(); // Maintenir la sélection
        console.log('🔄 Tous les éléments rafraîchis');
    }
}

// Styles CSS pour les animations
const styles = document.createElement('style');
styles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .drag-valid {
        border-color: #4caf50 !important;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3) !important;
    }
    
    .drag-invalid {
        border-color: #f44336 !important;
        box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.3) !important;
    }
    
    .canvas-viewport.dragging {
        cursor: grabbing !important;
    }
    
    .placed-element {
        transition: all 0.2s ease;
    }
    
    .placed-element:hover {
        transform: scale(1.02) !important;
    }
    
    /* Amélioration visuelle pour les éléments sélectionnés dans la palette */
    .element-item.selected {
        border-color: #ffa726 !important;
        background: #ffa726 !important;
        color: white !important;
        box-shadow: 0 0 0 3px rgba(255, 167, 38, 0.3) !important;
        transform: scale(1.05) !important;
    }
    
    /* Indicateur visuel que l'outil placement est actif */
    .tool-btn[data-tool="place"].active {
        background: #4caf50 !important;
        border-color: #4caf50 !important;
    }
`;
document.head.appendChild(styles);