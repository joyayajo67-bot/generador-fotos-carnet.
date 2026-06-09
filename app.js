// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const photoCanvas = document.getElementById('photoCanvas');
const guideOverlay = document.getElementById('guideOverlay');
const guideInstruction = document.querySelector('.guide-instruction');
const emptyState = document.getElementById('emptyState');
const canvasToolbar = document.getElementById('canvasToolbar');
const fileInfoBar = document.getElementById('fileInfoBar');
const infoOriginal = document.getElementById('infoOriginal');
const infoExport = document.getElementById('infoExport');

// Webcam DOM Elements
const webcamVideo = document.getElementById('webcamVideo');
const webcamControls = document.getElementById('webcamControls');
const btnSelectFile = document.getElementById('btnSelectFile');
const btnUseWebcam = document.getElementById('btnUseWebcam');
const btnWebcamCapture = document.getElementById('btnWebcamCapture');
const btnWebcamSwitch = document.getElementById('btnWebcamSwitch');
const btnWebcamCancel = document.getElementById('btnWebcamCancel');
const btnToggleParallel = document.getElementById('btnToggleParallel');
const btnWebcamAccept = document.getElementById('btnWebcamAccept');
const btnWebcamRetry = document.getElementById('btnWebcamRetry');
const btnWebcamTorch = document.getElementById('btnWebcamTorch');

// Welcome & Presentation Screen DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const btnBackToWelcome = document.getElementById('btnBackToWelcome');
const btnBackToWelcomeMobile = document.getElementById('btnBackToWelcomeMobile');
const appContainer = document.querySelector('.app-container');

// Leveling Bubble DOM Elements
const levelingOverlay = document.getElementById('levelingOverlay');
const levelingBubble = document.getElementById('levelingBubble');
const levelingStatus = document.getElementById('levelingStatus');
const levelingBlurRing = document.getElementById('levelingBlurRing');
const levelingHorizonLine = document.getElementById('levelingHorizonLine');
const levelingHorizonBar = document.getElementById('levelingHorizonBar');

// Perspective DOM Elements
const perspectiveHandlesOverlay = document.getElementById('perspectiveHandlesOverlay');
const btnPerspectiveWarp = document.getElementById('btnPerspectiveWarp');
const handleTL = document.getElementById('handleTL');
const handleTR = document.getElementById('handleTR');
const handleBL = document.getElementById('handleBL');
const handleBR = document.getElementById('handleBR');



// Sliders and controls
const sliderZoom = document.getElementById('sliderZoom');
const sliderRotate = document.getElementById('sliderRotate');
const sliderBrightness = document.getElementById('sliderBrightness');
const sliderContrast = document.getElementById('sliderContrast');
const sliderSaturation = document.getElementById('sliderSaturation');
const sliderQuality = document.getElementById('sliderQuality');

// Sliders value number inputs
const numZoom = document.getElementById('numZoom');
const numRotate = document.getElementById('numRotate');
const numBrightness = document.getElementById('numBrightness');
const numContrast = document.getElementById('numContrast');
const numSaturation = document.getElementById('numSaturation');
const numQuality = document.getElementById('numQuality');

// New Premium UI Elements for Printing Templates
const printTemplateSelect = document.getElementById('printTemplateSelect');
const paperSheet = document.getElementById('paperSheet');
const templateInfoText = document.getElementById('templateInfoText');

const presetPasaporte = document.getElementById('presetPasaporte');
const presetCarnet = document.getElementById('presetCarnet');
const presetAlt = document.getElementById('presetAlt');
const presetCedula = document.getElementById('presetCedula');
const presetButtons = document.querySelectorAll('.preset-card');

const cedulaTabsContainer = document.getElementById('cedulaTabsContainer');
const tabFrente = document.getElementById('tabFrente');
const tabReverso = document.getElementById('tabReverso');

// New Multicédula & Position DOM Elements
const cedulaManagerCard = document.getElementById('cedulaManagerCard');
const cedulaListContainer = document.getElementById('cedulaListContainer');
const btnAddCedula = document.getElementById('btnAddCedula');
const cedulaPositionGroup = document.getElementById('cedulaPositionGroup');
const btnPosTop = document.getElementById('btnPosTop');
const btnPosMiddle = document.getElementById('btnPosMiddle');
const btnPosBottom = document.getElementById('btnPosBottom');

const radioDistStacked = document.getElementById('radioDistStacked');
const radioDistGrid = document.getElementById('radioDistGrid');
const labelDistStacked = document.getElementById('labelDistStacked');
const labelDistGrid = document.getElementById('labelDistGrid');

const radioOrientVertical = document.getElementById('radioOrientVertical');
const radioOrientHorizontal = document.getElementById('radioOrientHorizontal');
const labelOrientVertical = document.getElementById('labelOrientVertical');
const labelOrientHorizontal = document.getElementById('labelOrientHorizontal');

// Buttons
const btnReset = document.getElementById('btnReset');
const btnRotateLeft = document.getElementById('btnRotateLeft');
const btnRotateRight = document.getElementById('btnRotateRight');
const btnMirror = document.getElementById('btnMirror');
const btnDownload = document.getElementById('btnDownload');
const btnLockImage = document.getElementById('btnLockImage');

// Canvas Context
const ctx = photoCanvas.getContext('2d');

// Image and State variables
let originalImage = null;
let reversoImage = null; // For Back of ID card
let canvasWidth = 600;
let canvasHeight = 800;
let currentOrientation = 'vertical'; // 'vertical' or 'horizontal'
let activePreset = 'carnet'; // 'pasaporte', 'carnet', 'intt', 'cedula'
let originalFileSize = 0;
let reversoFileSize = 0;
let activeSide = 'frente'; // 'frente' or 'reverso'

function isReversoActive() {
    return (activePreset === 'cedula' && activeSide === 'reverso') || (activePreset === 'intt' && activeSide === 'reverso');
}

function getActiveImage() {
    return isReversoActive() ? reversoImage : originalImage;
}

// Multicédula & Position States
let activeCedulaPosition = 'middle'; // 'top', 'middle', 'bottom'
let activeMulticedulaDist = 'stacked'; // 'stacked' (one under another) or 'grid' (2 per row)

// Array of loaded ID documents
let cedulaList = [
    {
        id: Date.now(),
        name: "Cédula 1",
        frenteImage: null,
        reversoImage: null,
        frenteFileSize: 0,
        reversoFileSize: 0,
        frenteState: {
            zoom: 100, rotate: 0, offsetX: 0, offsetY: 0, brightness: 0, contrast: 0, saturation: 0, mirror: false,
            isWarpActive: false,
            corners: { TL: {x: 0.1, y: 0.1}, TR: {x: 0.9, y: 0.1}, BL: {x: 0.1, y: 0.9}, BR: {x: 0.9, y: 0.9} }
        },
        reversoState: {
            zoom: 100, rotate: 0, offsetX: 0, offsetY: 0, brightness: 0, contrast: 0, saturation: 0, mirror: false,
            isWarpActive: false,
            corners: { TL: {x: 0.1, y: 0.1}, TR: {x: 0.9, y: 0.1}, BL: {x: 0.1, y: 0.9}, BR: {x: 0.9, y: 0.9} }
        }
    }
];
let activeCedulaIndex = 0;

// Webcam Stream & Facing State
let webcamStream = null;
let currentFacingMode = 'user'; // 'user' (front camera) or 'environment' (back camera)
let isParallelActive = false; // webcam level sensor state
let isPerspectiveAdjustmentActive = false; // manual corner adjusting mode active state
let isEditingLocked = false; // image adjustments locked state
let pendingCapturedFile = null; // holds snapped frame before accept/discard
let isTorchActive = false; // webcam flashlight state



// State management
let frenteState = cedulaList[0].frenteState;
let reversoState = cedulaList[0].reversoState;
let state = frenteState; // Points to active side's state reference





// Dragging tracking
let isDragging = false;
let startX = 0;
let startY = 0;

// File Input triggers
dropZone.addEventListener('click', (e) => {
    // Prevent opening file explorer if clicked on empty state buttons or active webcam controls
    if (webcamStream || e.target.closest('.empty-state-buttons') || e.target.closest('.webcam-controls')) {
        return;
    }
    if (!getActiveImage()) {
        fileInput.click();
    }
});

btnSelectFile.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
});

btnUseWebcam.addEventListener('click', (e) => {
    e.stopPropagation();
    startWebcam();
});

btnWebcamCapture.addEventListener('click', (e) => {
    e.stopPropagation();
    captureSnapshot();
});

btnWebcamSwitch.addEventListener('click', (e) => {
    e.stopPropagation();
    switchCamera();
});

btnWebcamCancel.addEventListener('click', (e) => {
    e.stopPropagation();
    stopWebcam();
});

btnWebcamTorch.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleTorch();
});

// Welcome Screen Format Selection click handlers
const welcomePresetItems = document.querySelectorAll('.welcome-preset-item');
welcomePresetItems.forEach(item => {
    item.addEventListener('click', () => {
        const presetName = item.getAttribute('data-preset');
        
        // Find corresponding preset-card button in main UI and activate it
        const targetBtn = document.querySelector(`.preset-card[data-preset="${presetName}"]`);
        if (targetBtn) {
            presetButtons.forEach(btn => btn.classList.remove('active'));
            targetBtn.classList.add('active');
            activePreset = presetName;
            
            // Show app container first so it has dimensions
            appContainer.style.display = 'flex';
            
            // Re-render and configure canvas dimensions
            updateCanvasDimensions();
            
            // Smoothly fade out the welcome screen and show main app
            welcomeScreen.classList.add('fade-out');
            
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                adjustMobilePadding();
            }, 500); // match transition duration
        }
    });
});

// Back to Welcome Screen handler
btnBackToWelcome.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Stop any active camera streams for security
    stopWebcam();
    
    // Smoothly show welcome screen
    welcomeScreen.style.display = 'flex';
    setTimeout(() => {
        welcomeScreen.classList.remove('fade-out');
    }, 10);
    
    // Hide main app editor
    appContainer.style.display = 'none';
});

// Back to Welcome Screen handler (Mobile)
btnBackToWelcomeMobile.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Stop any active camera streams for security
    stopWebcam();
    
    // Smoothly show welcome screen
    welcomeScreen.style.display = 'flex';
    setTimeout(() => {
        welcomeScreen.classList.remove('fade-out');
    }, 10);
    
    // Hide main app editor
    appContainer.style.display = 'none';
});

fileInput.addEventListener('change', handleFileSelect);

// Drag & Drop events
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processImageFile(files[0]);
    }
});

// Process Selected Image
function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        processImageFile(files[0]);
    }
}

function processImageFile(file) {
    if (!file.type.match('image.*')) {
        alert('Por favor, selecciona una imagen válida.');
        return;
    }

    const isReverso = isReversoActive();

    if (isReverso) {
        reversoFileSize = file.size;
    } else {
        originalFileSize = file.size;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            if (isReverso) {
                reversoImage = img;
                if (activePreset === 'cedula') {
                    cedulaList[activeCedulaIndex].reversoImage = img;
                    cedulaList[activeCedulaIndex].reversoFileSize = file.size;
                }
                resetReversoState();
            } else {
                originalImage = img;
                if (activePreset === 'cedula') {
                    cedulaList[activeCedulaIndex].frenteImage = img;
                    cedulaList[activeCedulaIndex].frenteFileSize = file.size;
                }
                resetFrenteState();
            }
            
            enableControls(true);
            if (isEditingLocked) {
                toggleImageLock(false);
            }
            calculateInitialFit();
            
            // Display Canvas
            emptyState.style.display = 'none';
            photoCanvas.style.display = 'block';
            guideOverlay.style.display = 'block';
            canvasToolbar.style.display = 'flex';
            
            // Display Original Image Info
            const currentSize = isReverso ? reversoFileSize : originalFileSize;
            const sizeFormatted = formatBytes(currentSize);
            infoOriginal.textContent = `${img.width} x ${img.height} px • ${sizeFormatted}`;
            fileInfoBar.style.display = 'flex';
            
            if (activePreset === 'cedula') {
                renderCedulaListUI();
            }
            
            renderCanvas();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// Enable/Disable Controls
function enableControls(enable) {
    const inputs = [sliderZoom, sliderRotate, sliderBrightness, sliderContrast, sliderSaturation, numZoom, numRotate, numBrightness, numContrast, numSaturation];
    inputs.forEach(input => {
        input.disabled = !enable;
    });
    btnDownload.disabled = !enable;
    printTemplateSelect.disabled = !enable;
    if (btnLockImage) btnLockImage.disabled = !enable;
}

// Toggle Image Lock
function toggleImageLock(locked) {
    isEditingLocked = locked;
    
    // Disable or enable sliders
    const inputs = [
        sliderZoom, sliderRotate, sliderBrightness, sliderContrast, sliderSaturation,
        numZoom, numRotate, numBrightness, numContrast, numSaturation
    ];
    inputs.forEach(input => {
        input.disabled = locked;
    });
    
    // Disable or enable canvas toolbar buttons except Lock
    const toolbarButtons = [
        btnReset,
        document.getElementById('btnPerspectiveWarp'),
        btnRotateLeft,
        btnRotateRight,
        btnMirror
    ];
    toolbarButtons.forEach(btn => {
        if (btn) btn.disabled = locked;
    });
    
    if (btnLockImage) {
        if (locked) {
            btnLockImage.innerHTML = '<i class="fa-solid fa-lock-open"></i> Desbloquear';
            btnLockImage.classList.add('active');
            btnLockImage.style.background = 'rgba(239, 68, 68, 0.15)';
            btnLockImage.style.borderColor = 'rgba(239, 68, 68, 0.25)';
            btnLockImage.style.color = '#f87171';
        } else {
            btnLockImage.innerHTML = '<i class="fa-solid fa-lock"></i> Fijar';
            btnLockImage.classList.remove('active');
            btnLockImage.style.background = 'rgba(16, 185, 129, 0.12)';
            btnLockImage.style.borderColor = 'rgba(16, 185, 129, 0.25)';
            btnLockImage.style.color = '#34d399';
        }
    }
}

// Reset states
function resetState() {
    if (isReversoActive()) {
        resetReversoState();
    } else {
        resetFrenteState();
    }
}

function resetFrenteState() {
    frenteState = {
        zoom: 100,
        rotate: 0,
        offsetX: 0,
        offsetY: 0,
        brightness: 0,
        contrast: 0,
        saturation: 0,
        mirror: false,
        isWarpActive: false,
        corners: { TL: {x: 0.1, y: 0.1}, TR: {x: 0.9, y: 0.1}, BL: {x: 0.1, y: 0.9}, BR: {x: 0.9, y: 0.9} }
    };
    if (activeSide === 'frente') {
        state = frenteState;
        updateSlidersFromState(state);
    }
}

function resetReversoState() {
    reversoState = {
        zoom: 100,
        rotate: 0,
        offsetX: 0,
        offsetY: 0,
        brightness: 0,
        contrast: 0,
        saturation: 0,
        mirror: false,
        isWarpActive: false,
        corners: { TL: {x: 0.1, y: 0.1}, TR: {x: 0.9, y: 0.1}, BL: {x: 0.1, y: 0.9}, BR: {x: 0.9, y: 0.9} }
    };
    if (activeSide === 'reverso') {
        state = reversoState;
        updateSlidersFromState(state);
    }
}


function updateSlidersFromState(s) {
    sliderZoom.value = s.zoom;
    sliderRotate.value = s.rotate;
    sliderBrightness.value = s.brightness;
    sliderContrast.value = s.contrast;
    sliderSaturation.value = s.saturation;
    
    numZoom.value = s.zoom;
    numRotate.value = s.rotate;
    numBrightness.value = s.brightness;
    numContrast.value = s.contrast;
    numSaturation.value = s.saturation;
}

// Calculate perfect initial fit for image centered inside canvas
function calculateInitialFit() {
    const img = getActiveImage();
    if (!img) return;
    
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;
    
    let baseScale = 1;
    if (imgRatio > canvasRatio) {
        baseScale = canvasHeight / img.height;
    } else {
        baseScale = canvasWidth / img.width;
    }
    
    state.zoom = Math.round(baseScale * 100);
    sliderZoom.value = state.zoom;
    numZoom.value = state.zoom;
    
    state.offsetX = 0;
    state.offsetY = 0;
}

// Main Render Canvas Logic
function renderCanvas() {
    const isReverso = isReversoActive();
    const img = isReverso ? reversoImage : originalImage;
    
    // Update button text and styles to match warp state
    updatePerspectiveButtonUI();
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    if (!img) {
        // If the active side image is missing, show empty state inside canvas
        emptyState.style.display = 'flex';
        photoCanvas.style.display = 'none';
        canvasToolbar.style.display = 'none';
        fileInfoBar.style.display = 'none';
        
        const emptyStateTitle = emptyState.querySelector('h3');
        const emptyStateText = emptyState.querySelector('p');
        if (isReverso) {
            emptyStateTitle.textContent = "Arrastra la foto del REVERSO aquí";
            emptyStateText.textContent = "o haz clic para explorar tus archivos";
        } else {
            emptyStateTitle.textContent = "Arrastra tu foto del FRENTE aquí";
            emptyStateText.textContent = "o haz clic para explorar tus archivos";
        }
        
        // Disable sliders since no image is loaded for this side
        const inputs = [sliderZoom, sliderRotate, sliderBrightness, sliderContrast, sliderSaturation, numZoom, numRotate, numBrightness, numContrast, numSaturation];
        inputs.forEach(input => {
            input.disabled = true;
        });
        btnDownload.disabled = true;
        return;
    }
    
    // Otherwise, ensure controls are active
    enableControls(true);
    emptyState.style.display = 'none';
    photoCanvas.style.display = 'block';
    canvasToolbar.style.display = 'flex';
    fileInfoBar.style.display = 'flex';
    
    // Save state
    ctx.save();
    
    // Apply visual enhancement adjustments / filters
    const b = 100 + parseInt(state.brightness);
    const c = 100 + parseInt(state.contrast);
    const s = 100 + parseInt(state.saturation);
    ctx.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
    
    // Translate origin to center of canvas for transformations
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    
    // Apply panning offsets
    ctx.translate(state.offsetX, state.offsetY);
    
    // Apply rotation
    ctx.rotate((state.rotate * Math.PI) / 180);
    
    // Apply mirroring
    if (state.mirror) {
        ctx.scale(-1, 1);
    }
    
    // Apply scale (zoom)
    const scaleFactor = state.zoom / 100;
    ctx.scale(scaleFactor, scaleFactor);
    
    // Resolve final warped image to draw if perspective correction is active
    let finalImgToDraw = img;
    if (state.isWarpActive && !isPerspectiveAdjustmentActive) {
        // Map interactive canvas coordinates to the exact source image dimensions using aspect ratio fitting
        const projectedCorners = getWarpNormalizedCorners(img, state);
        finalImgToDraw = warpQuadToRect(img, projectedCorners, img.width, img.height);
    }
    
    // Apply background color filter if selected
    const bgFilterVal = document.getElementById('backgroundColorFilterSelect')?.value || 'none';
    if (bgFilterVal !== 'none') {
        const offCtxCanvas = document.createElement('canvas');
        offCtxCanvas.width = finalImgToDraw.width;
        offCtxCanvas.height = finalImgToDraw.height;
        const offCtx = offCtxCanvas.getContext('2d');
        offCtx.drawImage(finalImgToDraw, 0, 0);
        finalImgToDraw = applyChromaKeyFilter(offCtxCanvas, bgFilterVal);
    }
    
    // Draw the image centered at the origin
    if (isPerspectiveAdjustmentActive) {
        // Draw the image preserving its correct, natural aspect ratio (contain fit)
        // so that portrait/landscape images look completely un-stretched on screen!
        const imgRatio = finalImgToDraw.width / finalImgToDraw.height;
        const canvasRatio = canvasWidth / canvasHeight;
        
        let fitScale = 1;
        if (imgRatio > canvasRatio) {
            fitScale = canvasWidth / finalImgToDraw.width;
        } else {
            fitScale = canvasHeight / finalImgToDraw.height;
        }
        
        const drawW = finalImgToDraw.width * fitScale;
        const drawH = finalImgToDraw.height * fitScale;
        ctx.drawImage(finalImgToDraw, -drawW / 2, -drawH / 2, drawW, drawH);
    } else {
        const imgW = finalImgToDraw.width;
        const imgH = finalImgToDraw.height;
        ctx.drawImage(finalImgToDraw, -imgW / 2, -imgH / 2, imgW, imgH);
    }
    
    // Restore state
    ctx.restore();

    // Apply Paper Texture Simulator
    const textureVal = document.getElementById('paperTextureSelect')?.value || 'none';
    applyPaperTexture(ctx, canvasWidth, canvasHeight, textureVal);

    // Update the live mini-paper printing preview sheet!
    updatePaperPreview();

    // Trigger dynamic estimation of export file size
    debounceExportSize();
    adjustMobilePadding();
}


// Drag & Panning Interactions
let touchStartDist = 0;
let touchStartZoom = 100;
let isPinching = false;

photoCanvas.addEventListener('mousedown', startPan);
photoCanvas.addEventListener('mousemove', movePan);
window.addEventListener('mouseup', stopPan);

photoCanvas.addEventListener('touchstart', startPan, { passive: false });
photoCanvas.addEventListener('touchmove', movePan, { passive: false });
window.addEventListener('touchend', stopPan);

function getEventCoords(e) {
    if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
}

function startPan(e) {
    if (!getActiveImage()) return;
    if (isEditingLocked) return;
    
    // Prevent mobile touch scroll behavior
    if (e.cancelable) e.preventDefault();

    if (e.touches && e.touches.length === 2) {
        isPinching = true;
        isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.sqrt(dx * dx + dy * dy);
        touchStartZoom = state.zoom;
    } else {
        isPinching = false;
        isDragging = true;
        const coords = getEventCoords(e);
        startX = coords.x - state.offsetX;
        startY = coords.y - state.offsetY;
        photoCanvas.style.cursor = 'grabbing';
    }
}

function movePan(e) {
    if (!getActiveImage()) return;
    if (isEditingLocked) return;
    if (e.cancelable) e.preventDefault();

    if (e.touches && e.touches.length === 2) {
        if (!isPinching) {
            // Initialize pinching mid-touch if fingers changed
            isPinching = true;
            isDragging = false;
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            touchStartDist = Math.sqrt(dx * dx + dy * dy);
            touchStartZoom = state.zoom;
        } else {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (touchStartDist > 0) {
                const factor = dist / touchStartDist;
                let newZoom = Math.round(touchStartZoom * factor);
                if (newZoom < 10) newZoom = 10;
                if (newZoom > 300) newZoom = 300;
                
                state.zoom = newZoom;
                sliderZoom.value = newZoom;
                numZoom.value = newZoom;
                renderCanvas();
            }
        }
    } else {
        // Single finger touch or mouse
        if (isPinching) {
            // Handoff from pinch back to drag
            isPinching = false;
            isDragging = true;
            const coords = getEventCoords(e);
            startX = coords.x - state.offsetX;
            startY = coords.y - state.offsetY;
        }
        
        if (isDragging) {
            const coords = getEventCoords(e);
            state.offsetX = coords.x - startX;
            state.offsetY = coords.y - startY;
            renderCanvas();
        }
    }
}

function stopPan() {
    isDragging = false;
    isPinching = false;
    photoCanvas.style.cursor = 'grab';
}

// Zoom via Mouse Scroll Wheel
photoCanvas.addEventListener('wheel', (e) => {
    if (!getActiveImage()) return;
    e.preventDefault();
    
    const zoomStep = 5;
    if (e.deltaY < 0) {
        state.zoom = Math.min(300, state.zoom + zoomStep);
    } else {
        state.zoom = Math.max(10, state.zoom - zoomStep);
    }
    
    sliderZoom.value = state.zoom;
    numZoom.value = state.zoom;
    renderCanvas();
}, { passive: false });

// Universal Synced Controls for Main Workspace
function setupWorkspaceSyncedControl(slider, numberInput, stateProp, callback) {
    slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        numberInput.value = val;
        state[stateProp] = val;
        callback();
    });

    numberInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value);
        const min = parseInt(numberInput.getAttribute('min'));
        const max = parseInt(numberInput.getAttribute('max'));

        if (isNaN(val)) return;
        if (val < min) val = min;
        if (val > max) val = max;

        slider.value = val;
        state[stateProp] = val;
        callback();
    });

    numberInput.addEventListener('blur', (e) => {
        if (e.target.value === '') {
            e.target.value = slider.value;
        } else {
            let val = parseInt(e.target.value);
            const min = parseInt(numberInput.getAttribute('min'));
            const max = parseInt(numberInput.getAttribute('max'));
            if (val < min) val = min;
            if (val > max) val = max;
            e.target.value = val;
            slider.value = val;
            state[stateProp] = val;
            callback();
        }
    });
}

// Bind workspace controls syncs
setupWorkspaceSyncedControl(sliderZoom, numZoom, 'zoom', renderCanvas);
setupWorkspaceSyncedControl(sliderRotate, numRotate, 'rotate', renderCanvas);
setupWorkspaceSyncedControl(sliderBrightness, numBrightness, 'brightness', renderCanvas);
setupWorkspaceSyncedControl(sliderContrast, numContrast, 'contrast', renderCanvas);
setupWorkspaceSyncedControl(sliderSaturation, numSaturation, 'saturation', renderCanvas);

// Bind Quality control syncs
sliderQuality.addEventListener('input', (e) => {
    numQuality.value = e.target.value;
    debounceExportSize();
});

numQuality.addEventListener('input', (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) return;
    if (val < 50) val = 50;
    if (val > 100) val = 100;
    sliderQuality.value = val;
    debounceExportSize();
});

numQuality.addEventListener('blur', (e) => {
    if (e.target.value === '') {
        e.target.value = sliderQuality.value;
    } else {
        let val = parseInt(e.target.value);
        if (val < 50) val = 50;
        if (val > 100) val = 100;
        e.target.value = val;
        sliderQuality.value = val;
        debounceExportSize();
    }
});

// Canvas Toolbar Actions
btnReset.addEventListener('click', () => {
    isPerspectiveAdjustmentActive = false;
    perspectiveHandlesOverlay.style.display = 'none';
    resetState();
    calculateInitialFit();
    updatePerspectiveButtonUI();
    renderCanvas();
});

btnLockImage.addEventListener('click', () => {
    if (!getActiveImage()) return;
    toggleImageLock(!isEditingLocked);
});

btnRotateLeft.addEventListener('click', () => {
    let r = state.rotate - 90;
    if (r < -180) r += 360;
    state.rotate = r;
    sliderRotate.value = state.rotate;
    numRotate.value = state.rotate;
    renderCanvas();
});

btnRotateRight.addEventListener('click', () => {
    let r = state.rotate + 90;
    if (r > 180) r -= 360;
    state.rotate = r;
    sliderRotate.value = state.rotate;
    numRotate.value = state.rotate;
    renderCanvas();
});

btnMirror.addEventListener('click', () => {
    state.mirror = !state.mirror;
    renderCanvas();
});

// Update the canvas and overlay dynamically based on active preset and orientation
function updateCanvasDimensions() {
    updateBodyPresetClass();
    const activePresetBtn = document.querySelector('.preset-card.active');
    if (!activePresetBtn) return;

    let w = parseInt(activePresetBtn.getAttribute('data-w'));
    let h = parseInt(activePresetBtn.getAttribute('data-h'));

    // Apply dimensions to canvas
    canvasWidth = w;
    canvasHeight = h;
    photoCanvas.width = canvasWidth;
    photoCanvas.height = canvasHeight;

    // Dynamically update the outer container aspect ratio to match the active photo layout!
    dropZone.style.aspectRatio = `${canvasWidth} / ${canvasHeight}`;

    // Manage visibility of the Frente/Reverso tabs and Multicédula manager card
    if (activePreset === 'cedula' || activePreset === 'intt') {
        cedulaTabsContainer.style.display = 'flex';
        
        // Dynamically change tab text and icons based on preset
        if (activePreset === 'intt') {
            tabFrente.innerHTML = `<i class="fa-solid fa-user-tie"></i> Foto Carnet`;
            tabReverso.innerHTML = `<i class="fa-solid fa-camera-retro"></i> Selfie + Cédula`;
            cedulaManagerCard.style.display = 'none';
        } else {
            tabFrente.innerHTML = `<i class="fa-solid fa-id-card"></i> Anverso (Frente)`;
            tabReverso.innerHTML = `<i class="fa-solid fa-id-card-clip"></i> Reverso (Dorso)`;
            cedulaManagerCard.style.display = 'flex';
        }

        if (activePreset === 'cedula') {
            // Auto-select template 'cedula_single' if no template selected or if we switch to Cédula
            if (!printTemplateSelect.value.startsWith('cedula_') && printTemplateSelect.value !== 'multicedula') {
                printTemplateSelect.value = 'cedula_single';
            }
            renderCedulaListUI();
        } else {
            // If leaving Cédula preset, switch back to 'single' template
            if (printTemplateSelect.value.startsWith('cedula_') || printTemplateSelect.value === 'multicedula') {
                printTemplateSelect.value = 'single';
            }
        }
    } else {
        cedulaTabsContainer.style.display = 'none';
        cedulaManagerCard.style.display = 'none';
        // If leaving Cédula/INTT preset, switch back to 'single' template
        if (printTemplateSelect.value.startsWith('cedula_') || printTemplateSelect.value === 'multicedula') {
            printTemplateSelect.value = 'single';
        }
    }

    // Manage visibility of Position Selector group
    const templateVal = printTemplateSelect.value;
    if (templateVal === 'cedula_single' || templateVal === 'cedula_double') {
        cedulaPositionGroup.style.display = 'block';
    } else {
        cedulaPositionGroup.style.display = 'none';
    }

    updateTemplateDescription();

    // Adjust Guide Oval Overlay Styles based on Aspect Ratio
    const oval = document.querySelector('.guide-oval');
    const eyeLine = document.querySelector('.guide-line-eyes');
    const chinLine = document.querySelector('.guide-line-chin');

    // If square aspect ratio (e.g. 1:1 Passport)
    if (canvasWidth === canvasHeight) {
        oval.style.top = '12%';
        oval.style.left = '22%';
        oval.style.width = '56%';
        oval.style.height = '62%';
        eyeLine.style.top = '36%';
        chinLine.style.top = '70%';
    } else if (canvasWidth >= canvasHeight) {
        // Landscape (Horizontal) Mode
        oval.style.top = '10%';
        oval.style.left = '32%';
        oval.style.width = '36%';
        oval.style.height = '80%';
        eyeLine.style.top = '40%';
        chinLine.style.top = '78%';
    } else {
        // Portrait (Vertical) Mode
        oval.style.top = '10%';
        oval.style.left = '20%';
        oval.style.width = '60%';
        oval.style.height = '60%';
        eyeLine.style.top = '36%';
        chinLine.style.top = '70%';
    }

    // Hide oval guide in Cédula mode or INTT Selfie + Cédula tab
    if (activePreset === 'cedula' || (activePreset === 'intt' && activeSide === 'reverso')) {
        oval.style.display = 'none';
        eyeLine.style.display = 'none';
        chinLine.style.display = 'none';
        if (activePreset === 'cedula') {
            document.querySelector('.guide-instruction').style.display = 'none';
        } else {
            document.querySelector('.guide-instruction').style.display = 'block';
        }
    } else {
        oval.style.display = 'block';
        eyeLine.style.display = 'block';
        chinLine.style.display = 'block';
        document.querySelector('.guide-instruction').style.display = 'block';
    }

    updateGuideInstruction();

    const currentImg = getActiveImage();
    if (currentImg) {
        calculateInitialFit();
        renderCanvas();
    } else {
        renderCanvas();
    }
    adjustMobilePadding();
}

function updateGuideInstruction() {
    if (!guideInstruction) return;
    
    if (activePreset === 'pasaporte') {
        guideInstruction.textContent = "Alinea los ojos y la barbilla aquí (1:1)";
    } else if (activePreset === 'carnet') {
        guideInstruction.textContent = "Alinea tu rostro y hombros aquí (3:4)";
    } else if (activePreset === 'intt') {
        if (activeSide === 'frente') {
            guideInstruction.textContent = "INTT Foto Carnet: fondo blanco (448x336)";
        } else {
            guideInstruction.textContent = "INTT Selfie: sostén tu Cédula al lado (448x336)";
        }
    } else if (activePreset === 'cedula') {
        if (activeSide === 'frente') {
            guideInstruction.textContent = "Cédula: Anverso (Frente)";
        } else {
            guideInstruction.textContent = "Cédula: Reverso (Dorso)";
        }
    }
}

// Orientation Switches listeners
function handleOrientationChange(orient) {
    if (currentOrientation === orient) return;
    currentOrientation = orient;

    // Adjust radio visual active states
    if (orient === 'vertical') {
        labelOrientVertical.classList.add('active');
        radioOrientVertical.checked = true;
        labelOrientHorizontal.classList.remove('active');
    } else {
        labelOrientHorizontal.classList.add('active');
        radioOrientHorizontal.checked = true;
        labelOrientVertical.classList.remove('active');
    }

    // Dynamic Swapping of preset cards specifications based on vertical/horizontal
    if (orient === 'vertical') {
        // Preset Pasaporte is always 1:1 square
        presetPasaporte.setAttribute('data-w', '600');
        presetPasaporte.setAttribute('data-h', '600');
        presetPasaporte.querySelector('.dims-label').textContent = '600 x 600 px (1:1)';

        // Preset Carnet vertical: 600x800
        presetCarnet.setAttribute('data-w', '600');
        presetCarnet.setAttribute('data-h', '800');
        presetCarnet.querySelector('.dims-label').textContent = '600 x 800 px (3:4)';

        // Preset Alt is ALWAYS horizontal 448x336 per official INTT specifications
        presetAlt.setAttribute('data-w', '448');
        presetAlt.setAttribute('data-h', '336');
        presetAlt.querySelector('strong').textContent = 'Digital INTT';
        presetAlt.querySelector('.dims-label').textContent = '448 x 336 px (4:3)';

        // Preset Cédula vertical: 673x1004
        presetCedula.setAttribute('data-w', '673');
        presetCedula.setAttribute('data-h', '1004');
        presetCedula.querySelector('.dims-label').textContent = '673 x 1004 px (1:1.5)';
    } else {
        // Preset Pasaporte is always 1:1 square
        presetPasaporte.setAttribute('data-w', '600');
        presetPasaporte.setAttribute('data-h', '600');
        presetPasaporte.querySelector('.dims-label').textContent = '600 x 600 px (1:1)';

        // Preset Carnet horizontal: 800x600
        presetCarnet.setAttribute('data-w', '800');
        presetCarnet.setAttribute('data-h', '600');
        presetCarnet.querySelector('.dims-label').textContent = '800 x 600 px (4:3)';

        // Preset Alt horizontal: 448x336
        presetAlt.setAttribute('data-w', '448');
        presetAlt.setAttribute('data-h', '336');
        presetAlt.querySelector('strong').textContent = 'Digital INTT';
        presetAlt.querySelector('.dims-label').textContent = '448 x 336 px (4:3)';

        // Preset Cédula horizontal: 1004x673
        presetCedula.setAttribute('data-w', '1004');
        presetCedula.setAttribute('data-h', '673');
        presetCedula.querySelector('.dims-label').textContent = '1004 x 673 px (1.5:1)';
    }

    updateCanvasDimensions();
}

labelOrientVertical.addEventListener('click', (e) => {
    e.preventDefault();
    handleOrientationChange('vertical');
});

labelOrientHorizontal.addEventListener('click', (e) => {
    e.preventDefault();
    handleOrientationChange('horizontal');
});

// Preset buttons selection
presetButtons.forEach(card => {
    card.addEventListener('click', (e) => {
        const selected = e.currentTarget;
        presetButtons.forEach(c => c.classList.remove('active'));
        selected.classList.add('active');
        activePreset = selected.getAttribute('data-preset');
        
        updateCanvasDimensions();
    });
});

// Frente / Reverso Tab Switcher click handlers
tabFrente.addEventListener('click', () => {
    if (activeSide === 'frente') return;
    switchCedulaSide('frente');
});

tabReverso.addEventListener('click', () => {
    if (activeSide === 'reverso') return;
    switchCedulaSide('reverso');
});

function switchCedulaSide(side) {
    activeSide = side;
    
    // Turn off perspective adjustment mode when switching sides
    isPerspectiveAdjustmentActive = false;
    perspectiveHandlesOverlay.style.display = 'none';

    if (side === 'frente') {
        tabFrente.classList.add('active');
        tabReverso.classList.remove('active');
        state = frenteState; // point state to frenteState
    } else {
        tabReverso.classList.add('active');
        tabFrente.classList.remove('active');
        state = reversoState; // point state to reversoState
    }

    updateSlidersFromState(state);

    const currentImg = (side === 'frente') ? originalImage : reversoImage;
    const currentSize = (side === 'frente') ? originalFileSize : reversoFileSize;

    if (currentImg) {
        const sizeFormatted = formatBytes(currentSize);
        infoOriginal.textContent = `${currentImg.width} x ${currentImg.height} px • ${sizeFormatted}`;
        fileInfoBar.style.display = 'flex';
    } else {
        fileInfoBar.style.display = 'none';
    }

    updateGuideInstruction();
    updatePerspectiveButtonUI();
    renderCanvas();
}

// Multicédula & Position Management logic
function selectCedulaCard(index) {
    activeCedulaIndex = index;
    const card = cedulaList[index];
    
    // Swap references
    originalImage = card.frenteImage;
    reversoImage = card.reversoImage;
    frenteState = card.frenteState;
    reversoState = card.reversoState;
    originalFileSize = card.frenteFileSize;
    reversoFileSize = card.reversoFileSize;

    if (activeSide === 'frente') {
        state = frenteState;
    } else {
        state = reversoState;
    }

    updateSlidersFromState(state);

    const currentImg = (activeSide === 'frente') ? originalImage : reversoImage;
    const currentSize = (activeSide === 'frente') ? originalFileSize : reversoFileSize;

    if (currentImg) {
        const sizeFormatted = formatBytes(currentSize);
        infoOriginal.textContent = `${currentImg.width} x ${currentImg.height} px • ${sizeFormatted}`;
        fileInfoBar.style.display = 'flex';
    } else {
        fileInfoBar.style.display = 'none';
    }

    renderCanvas();
    renderCedulaListUI();
}

function renderCedulaListUI() {
    cedulaListContainer.innerHTML = '';
    cedulaList.forEach((card, index) => {
        const item = document.createElement('div');
        item.className = `cedula-list-item ${index === activeCedulaIndex ? 'active' : ''}`;
        item.addEventListener('click', () => selectCedulaCard(index));

        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';

        const avatar = document.createElement('div');
        avatar.className = 'item-avatar';
        if (card.frenteImage) {
            const miniCanvas = renderImageToOffscreenCanvas(card.frenteImage, card.frenteState, 60, 40);
            const img = document.createElement('img');
            img.src = miniCanvas.toDataURL('image/jpeg', 0.4);
            avatar.appendChild(img);
        } else {
            avatar.innerHTML = '<i class="fa-solid fa-image"></i>';
        }

        const name = document.createElement('span');
        name.className = 'item-name';
        name.textContent = card.name;

        itemInfo.appendChild(avatar);
        itemInfo.appendChild(name);
        item.appendChild(itemInfo);

        if (cedulaList.length > 1) {
            const btnDelete = document.createElement('button');
            btnDelete.className = 'btn-delete-item';
            btnDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
            btnDelete.type = 'button';
            btnDelete.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteCedulaCard(index);
            });
            item.appendChild(btnDelete);
        }

        cedulaListContainer.appendChild(item);
    });
}

function deleteCedulaCard(index) {
    if (cedulaList.length <= 1) return;
    cedulaList.splice(index, 1);
    
    if (activeCedulaIndex >= cedulaList.length) {
        activeCedulaIndex = cedulaList.length - 1;
    }
    selectCedulaCard(activeCedulaIndex);
}

function addNewCedulaCard() {
    const maxLimit = (activeMulticedulaDist === 'grid') ? 8 : 4;
    if (cedulaList.length >= maxLimit) {
        alert(`Límite alcanzado. Solo puedes imprimir hasta ${maxLimit} cédulas en esta distribución.`);
        return;
    }

    const newNum = cedulaList.length + 1;
    const newCard = {
        id: Date.now(),
        name: `Cédula ${newNum}`,
        frenteImage: null,
        reversoImage: null,
        frenteFileSize: 0,
        reversoFileSize: 0,
        frenteState: {
            zoom: 100, rotate: 0, offsetX: 0, offsetY: 0, brightness: 0, contrast: 0, saturation: 0, mirror: false,
            isWarpActive: false,
            corners: { TL: {x: 0.1, y: 0.1}, TR: {x: 0.9, y: 0.1}, BL: {x: 0.1, y: 0.9}, BR: {x: 0.9, y: 0.9} }
        },
        reversoState: {
            zoom: 100, rotate: 0, offsetX: 0, offsetY: 0, brightness: 0, contrast: 0, saturation: 0, mirror: false,
            isWarpActive: false,
            corners: { TL: {x: 0.1, y: 0.1}, TR: {x: 0.9, y: 0.1}, BL: {x: 0.1, y: 0.9}, BR: {x: 0.9, y: 0.9} }
        }
    };


    cedulaList.push(newCard);
    selectCedulaCard(cedulaList.length - 1);
}

// Bind Multicédula controls
btnAddCedula.addEventListener('click', addNewCedulaCard);

// Position Selector Buttons Bindings
function setCedulaPosition(pos) {
    activeCedulaPosition = pos;
    
    // Toggle active classes
    [btnPosTop, btnPosMiddle, btnPosBottom].forEach(btn => btn.classList.remove('active'));
    
    if (pos === 'top') btnPosTop.classList.add('active');
    else if (pos === 'middle') btnPosMiddle.classList.add('active');
    else if (pos === 'bottom') btnPosBottom.classList.add('active');
    
    updatePaperPreview();
}

btnPosTop.addEventListener('click', () => setCedulaPosition('top'));
btnPosMiddle.addEventListener('click', () => setCedulaPosition('middle'));
btnPosBottom.addEventListener('click', () => setCedulaPosition('bottom'));

// Distribution Selector Bindings
labelDistStacked.addEventListener('click', (e) => {
    e.preventDefault();
    if (activeMulticedulaDist === 'stacked') return;
    activeMulticedulaDist = 'stacked';
    labelDistStacked.classList.add('active');
    radioDistStacked.checked = true;
    labelDistGrid.classList.remove('active');
    updatePaperPreview();
});

labelDistGrid.addEventListener('click', (e) => {
    e.preventDefault();
    if (activeMulticedulaDist === 'grid') return;
    activeMulticedulaDist = 'grid';
    labelDistGrid.classList.add('active');
    radioDistGrid.checked = true;
    labelDistStacked.classList.remove('active');
    updatePaperPreview();
});

// Print Template Dropdown Selection
printTemplateSelect.addEventListener('change', () => {
    const templateVal = printTemplateSelect.value;
    if (templateVal === 'cedula_single' || templateVal === 'cedula_double') {
        cedulaPositionGroup.style.display = 'block';
    } else {
        cedulaPositionGroup.style.display = 'none';
    }
    updateTemplateDescription();
    updatePaperPreview();
});

function updateTemplateDescription() {
    const val = printTemplateSelect.value;
    if (val === 'single') {
        templateInfoText.textContent = 'Exporta una sola foto en formato JPG de alta calidad, lista para cargar en portales web.';
    } else if (val === '4x6') {
        templateInfoText.textContent = 'Genera un pliego de 4x6" conteniendo 8 copias idénticas. Perfecto para imprimir en cualquier local de fotografía.';
    } else if (val === 'a4') {
        templateInfoText.textContent = 'Genera un pliego A4 listo para imprimir que contiene 16 copias idénticas con líneas guía de recorte.';
    } else if (val === 'letter') {
        templateInfoText.textContent = 'Genera un pliego Carta (8.5x11") conteniendo 16 copias idénticas. Ideal para impresoras domésticas y láser a color.';
    } else if (val === 'legal') {
        templateInfoText.textContent = 'Genera un pliego Oficio (8.5x14") conteniendo 20 copias idénticas, maximizando el espacio de papel para impresión láser a color.';
    } else if (val === 'cedula_single') {
        templateInfoText.textContent = 'Genera una hoja Carta con el Frente (Anverso) de la cédula en su tamaño original exacto (85x57 mm), según la posición seleccionada.';
    } else if (val === 'cedula_double') {
        templateInfoText.textContent = 'Genera una hoja Carta con el Frente y el Reverso de la cédula apilados verticalmente a su tamaño original exacto (85x57 mm), según la posición seleccionada.';
    } else if (val === 'multicedula') {
        templateInfoText.textContent = `Genera un pliego Carta con múltiples documentos (${cedulaList.length} cargados) impresos a escala física real exacta (85x57 mm), distribuidos en la hoja.`;
    }
}

// Live Dynamic Mini-Paper Previsualizer Sheet
function updatePaperPreview() {
    if (!getActiveImage()) {
        paperSheet.innerHTML = '<div class="paper-thumb-empty"></div>';
        return;
    }

    const templateMode = printTemplateSelect.value;
    const thumbUrl = photoCanvas.toDataURL('image/jpeg', 0.4);

    paperSheet.className = 'paper-sheet'; // Reset classes
    paperSheet.innerHTML = '';

    if (templateMode === 'single') {
        paperSheet.classList.add('grid-single');
        const img = document.createElement('img');
        img.src = thumbUrl;
        img.className = 'mini-thumb';
        paperSheet.appendChild(img);
    } else if (templateMode === '4x6') {
        paperSheet.classList.add('grid-4x6');
        for (let i = 0; i < 8; i++) {
            const img = document.createElement('img');
            img.src = thumbUrl;
            img.className = 'mini-thumb';
            paperSheet.appendChild(img);
        }
    } else if (templateMode === 'a4' || templateMode === 'letter') {
        paperSheet.className = `paper-sheet grid-${templateMode}`;
        for (let i = 0; i < 16; i++) {
            const img = document.createElement('img');
            img.src = thumbUrl;
            img.className = 'mini-thumb';
            paperSheet.appendChild(img);
        }
    } else if (templateMode === 'legal') {
        paperSheet.classList.add('grid-legal');
        for (let i = 0; i < 20; i++) {
            const img = document.createElement('img');
            img.src = thumbUrl;
            img.className = 'mini-thumb';
            paperSheet.appendChild(img);
        }
    } else if (templateMode === 'cedula_single') {
        paperSheet.classList.add('grid-cedula-single');
        paperSheet.style.alignContent = (activeCedulaPosition === 'top') ? 'start' : (activeCedulaPosition === 'bottom' ? 'end' : 'center');
        const img = document.createElement('img');
        img.src = thumbUrl;
        img.className = 'mini-thumb';
        paperSheet.appendChild(img);
    } else if (templateMode === 'cedula_double') {
        paperSheet.classList.add('grid-cedula-double');
        paperSheet.style.alignContent = (activeCedulaPosition === 'top') ? 'start' : (activeCedulaPosition === 'bottom' ? 'end' : 'center');
        
        // Frente
        const imgFrente = document.createElement('img');
        imgFrente.src = thumbUrl;
        imgFrente.className = 'mini-thumb';
        paperSheet.appendChild(imgFrente);
        
        // Reverso
        const imgReverso = document.createElement('img');
        if (reversoImage) {
            const tempCanvas = renderImageToOffscreenCanvas(reversoImage, reversoState, 200, 134);
            imgReverso.src = tempCanvas.toDataURL('image/jpeg', 0.4);
        } else {
            imgReverso.src = thumbUrl;
        }
        imgReverso.className = 'mini-thumb';
        paperSheet.appendChild(imgReverso);
    } else if (templateMode === 'multicedula') {
        const previewClass = `grid-multicedula-${activeMulticedulaDist}`;
        paperSheet.classList.add(previewClass);
        
        cedulaList.forEach(card => {
            const img = document.createElement('img');
            img.className = 'mini-thumb';
            if (card.frenteImage) {
                const miniCanvas = renderImageToOffscreenCanvas(card.frenteImage, card.frenteState, 150, 100);
                img.src = miniCanvas.toDataURL('image/jpeg', 0.4);
            } else {
                const blankCanvas = document.createElement('canvas');
                blankCanvas.width = 150;
                blankCanvas.height = 100;
                const bCtx = blankCanvas.getContext('2d');
                bCtx.fillStyle = 'rgba(147, 51, 234, 0.1)';
                bCtx.fillRect(0,0,150,100);
                img.src = blankCanvas.toDataURL();
            }
            paperSheet.appendChild(img);
        });
    }
}

// Compiler of high-res print sheets on offscreen canvases
function renderImageToOffscreenCanvas(img, imgState, w, h) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tCtx = tempCanvas.getContext('2d');

    if (!img) {
        // Draw elegant placeholder
        tCtx.fillStyle = '#161426';
        tCtx.fillRect(0, 0, w, h);
        
        tCtx.strokeStyle = 'rgba(255,255,255,0.08)';
        tCtx.lineWidth = 4;
        tCtx.strokeRect(10, 10, w - 20, h - 20);

        tCtx.font = 'bold 28px sans-serif';
        tCtx.fillStyle = '#9ca3af';
        tCtx.textAlign = 'center';
        tCtx.textBaseline = 'middle';
        tCtx.fillText('Reverso (Dorso) no cargado', w / 2, h / 2 - 20);
        
        tCtx.font = '18px sans-serif';
        tCtx.fillStyle = '#6b7280';
        tCtx.fillText('Se puede cargar en la pestaña Reverso', w / 2, h / 2 + 20);
        return tempCanvas;
    }

    tCtx.save();
    
    // Apply filters
    const b = 100 + parseInt(imgState.brightness);
    const c = 100 + parseInt(imgState.contrast);
    const s = 100 + parseInt(imgState.saturation);
    tCtx.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
    
    tCtx.translate(w / 2, h / 2);
    tCtx.translate(imgState.offsetX, imgState.offsetY);
    tCtx.rotate((imgState.rotate * Math.PI) / 180);
    
    if (imgState.mirror) {
        tCtx.scale(-1, 1);
    }
    
    const scaleFactor = imgState.zoom / 100;
    tCtx.scale(scaleFactor, scaleFactor);
    
    // Apply perspective warp to high-res output if active
    let finalImgToDraw = img;
    if (imgState.isWarpActive) {
        const projectedCorners = getWarpNormalizedCorners(img, imgState);
        finalImgToDraw = warpQuadToRect(img, projectedCorners, img.width, img.height);
    }
    
    // Apply background color filter if selected
    const bgFilterVal = document.getElementById('backgroundColorFilterSelect')?.value || 'none';
    if (bgFilterVal !== 'none') {
        const offCtxCanvas = document.createElement('canvas');
        offCtxCanvas.width = finalImgToDraw.width;
        offCtxCanvas.height = finalImgToDraw.height;
        const offCtx = offCtxCanvas.getContext('2d');
        offCtx.drawImage(finalImgToDraw, 0, 0);
        finalImgToDraw = applyChromaKeyFilter(offCtxCanvas, bgFilterVal);
    }
    
    tCtx.drawImage(finalImgToDraw, -finalImgToDraw.width / 2, -finalImgToDraw.height / 2, finalImgToDraw.width, finalImgToDraw.height);
    
    tCtx.restore();

    // Apply Paper Texture Simulator
    const textureVal = document.getElementById('paperTextureSelect')?.value || 'none';
    applyPaperTexture(tCtx, w, h, textureVal);

    return tempCanvas;
}


function compilePrintSheet() {
    const mode = printTemplateSelect.value;
    
    // If single photo, just return the active workspace canvas
    if (mode === 'single') {
        return photoCanvas;
    }

    // Otherwise, create offscreen canvas for high-quality template construction
    const offscreen = document.createElement('canvas');
    const oCtx = offscreen.getContext('2d');
    
    if (mode === '4x6') {
        // High quality 4x6" canvas at 300 DPI = 1800 x 1200 px
        offscreen.width = 1800;
        offscreen.height = 1200;
        
        oCtx.fillStyle = '#ffffff';
        oCtx.fillRect(0, 0, 1800, 1200);

        // 8 Photos Grid: 4 columns x 2 rows
        const cols = 4;
        const rows = 2;
        
        const cellW = 360;
        const cellH = Math.round(cellW * (canvasHeight / canvasWidth));
        
        const gapX = 65;
        const gapY = 50;
        
        const startX = Math.round((1800 - (cols * cellW) - ((cols - 1) * gapX)) / 2);
        const startY = Math.round((1200 - (rows * cellH) - ((rows - 1) * gapY)) / 2);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const posX = startX + c * (cellW + gapX);
                const posY = startY + r * (cellH + gapY);
                oCtx.drawImage(photoCanvas, posX, posY, cellW, cellH);
                
                oCtx.strokeStyle = '#d1d5db';
                oCtx.lineWidth = 1;
                oCtx.setLineDash([6, 6]);
                oCtx.strokeRect(posX, posY, cellW, cellH);
            }
        }
    } else if (mode === 'a4') {
        // High quality A4 sheet canvas at 300 DPI = 2480 x 3508 px
        offscreen.width = 2480;
        offscreen.height = 3508;
        
        oCtx.fillStyle = '#ffffff';
        oCtx.fillRect(0, 0, 2480, 3508);

        // 16 Photos Grid: 4 columns x 4 rows
        const cols = 4;
        const rows = 4;
        
        const cellW = 460;
        const cellH = Math.round(cellW * (canvasHeight / canvasWidth));
        
        const gapX = 80;
        const gapY = 80;
        
        const startX = Math.round((2480 - (cols * cellW) - ((cols - 1) * gapX)) / 2);
        const startY = Math.round((3508 - (rows * cellH) - ((rows - 1) * gapY)) / 2);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const posX = startX + c * (cellW + gapX);
                const posY = startY + r * (cellH + gapY);
                oCtx.drawImage(photoCanvas, posX, posY, cellW, cellH);
                
                oCtx.strokeStyle = '#d1d5db';
                oCtx.lineWidth = 1.5;
                oCtx.setLineDash([8, 8]);
                oCtx.strokeRect(posX, posY, cellW, cellH);
            }
        }
    } else if (mode === 'letter') {
        // High quality Letter sheet canvas at 300 DPI = 2550 x 3300 px
        offscreen.width = 2550;
        offscreen.height = 3300;
        
        oCtx.fillStyle = '#ffffff';
        oCtx.fillRect(0, 0, 2550, 3300);

        // 16 Photos Grid: 4 columns x 4 rows
        const cols = 4;
        const rows = 4;
        
        const cellW = 460;
        const cellH = Math.round(cellW * (canvasHeight / canvasWidth));
        
        const gapX = 80;
        const gapY = 80;
        
        const startX = Math.round((2550 - (cols * cellW) - ((cols - 1) * gapX)) / 2);
        const startY = Math.round((3300 - (rows * cellH) - ((rows - 1) * gapY)) / 2);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const posX = startX + c * (cellW + gapX);
                const posY = startY + r * (cellH + gapY);
                oCtx.drawImage(photoCanvas, posX, posY, cellW, cellH);
                
                oCtx.strokeStyle = '#d1d5db';
                oCtx.lineWidth = 1.5;
                oCtx.setLineDash([8, 8]);
                oCtx.strokeRect(posX, posY, cellW, cellH);
            }
        }
    } else if (mode === 'legal') {
        // High quality Oficio / Legal sheet canvas at 300 DPI = 2550 x 4200 px
        offscreen.width = 2550;
        offscreen.height = 4200;
        
        oCtx.fillStyle = '#ffffff';
        oCtx.fillRect(0, 0, 2550, 4200);

        // 20 Photos Grid: 4 columns x 5 rows
        const cols = 4;
        const rows = 5;
        
        const cellW = 460;
        const cellH = Math.round(cellW * (canvasHeight / canvasWidth));
        
        const gapX = 80;
        const gapY = 80;
        
        const startX = Math.round((2550 - (cols * cellW) - ((cols - 1) * gapX)) / 2);
        const startY = Math.round((4200 - (rows * cellH) - ((rows - 1) * gapY)) / 2);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const posX = startX + c * (cellW + gapX);
                const posY = startY + r * (cellH + gapY);
                oCtx.drawImage(photoCanvas, posX, posY, cellW, cellH);
                
                oCtx.strokeStyle = '#d1d5db';
                oCtx.lineWidth = 1.5;
                oCtx.setLineDash([8, 8]);
                oCtx.strokeRect(posX, posY, cellW, cellH);
            }
        }
    } else if (mode === 'cedula_single') {
        // Cédula Solo Frente centrado en hoja Carta (2550 x 3300 px)
        offscreen.width = 2550;
        offscreen.height = 3300;
        
        oCtx.fillStyle = '#ffffff';
        oCtx.fillRect(0, 0, 2550, 3300);

        // Cédula standard size Venezuelan: 85 x 57 mm. At 300 DPI = 1004 x 673 px
        const cellW = 1004;
        const cellH = 673;
        
        const posX = Math.round((2550 - cellW) / 2);
        let posY = Math.round((3300 - cellH) / 2); // default center (Medio)
        
        if (activeCedulaPosition === 'top') {
            posY = 150; // Arriba
        } else if (activeCedulaPosition === 'bottom') {
            posY = 3300 - cellH - 150; // Abajo
        }

        // Render Frente
        const frontCanvas = renderImageToOffscreenCanvas(originalImage, frenteState, 1004, 673);
        oCtx.drawImage(frontCanvas, posX, posY, cellW, cellH);
        
        // Draw light cutting border
        oCtx.strokeStyle = '#9ca3af';
        oCtx.lineWidth = 2;
        oCtx.setLineDash([10, 10]);
        oCtx.strokeRect(posX, posY, cellW, cellH);
    } else if (mode === 'cedula_double') {
        // Cédula Frente + Reverso centrados en hoja Carta (2550 x 3300 px)
        offscreen.width = 2550;
        offscreen.height = 3300;
        
        oCtx.fillStyle = '#ffffff';
        oCtx.fillRect(0, 0, 2550, 3300);

        const cellW = 1004;
        const cellH = 673;
        const gap = 120; // 1 cm approx gap
        const totalBlockHeight = cellH * 2 + gap; // 1466 px

        const startX = Math.round((2550 - cellW) / 2);
        let startY = Math.round((3300 - totalBlockHeight) / 2); // default center (Medio)
        
        if (activeCedulaPosition === 'top') {
            startY = 150; // Arriba
        } else if (activeCedulaPosition === 'bottom') {
            startY = 3300 - totalBlockHeight - 150; // Abajo
        }

        // Render Frente
        const frontCanvas = renderImageToOffscreenCanvas(originalImage, frenteState, 1004, 673);
        oCtx.drawImage(frontCanvas, startX, startY, cellW, cellH);
        
        oCtx.strokeStyle = '#9ca3af';
        oCtx.lineWidth = 2;
        oCtx.setLineDash([10, 10]);
        oCtx.strokeRect(startX, startY, cellW, cellH);

        // Render Reverso
        const backImg = reversoImage;
        const backCanvas = renderImageToOffscreenCanvas(backImg, reversoState, 1004, 673);
        oCtx.drawImage(backCanvas, startX, startY + cellH + gap, cellW, cellH);

        oCtx.strokeStyle = '#9ca3af';
        oCtx.lineWidth = 2;
        oCtx.setLineDash([10, 10]);
        oCtx.strokeRect(startX, startY + cellH + gap, cellW, cellH);
    } else if (mode === 'multicedula') {
        // High quality Multicédula sheet at 300 DPI (Letter = 2550 x 3300 px)
        offscreen.width = 2550;
        offscreen.height = 3300;
        
        oCtx.fillStyle = '#ffffff';
        oCtx.fillRect(0, 0, 2550, 3300);

        const cellW = 1004;
        const cellH = 673;

        if (activeMulticedulaDist === 'stacked') {
            // Una bajo otra (Vertical Stack) - Max 4 cards
            const gap = 120;
            const count = Math.min(cedulaList.length, 4);
            const totalHeight = count * cellH + (count - 1) * gap;
            
            const startX = Math.round((2550 - cellW) / 2);
            const startY = Math.round((3300 - totalHeight) / 2);

            for (let i = 0; i < count; i++) {
                const card = cedulaList[i];
                const posY = startY + i * (cellH + gap);
                
                // Draw Frente of each card
                const frontCanvas = renderImageToOffscreenCanvas(card.frenteImage, card.frenteState, 1004, 673);
                oCtx.drawImage(frontCanvas, startX, posY, cellW, cellH);
                
                oCtx.strokeStyle = '#9ca3af';
                oCtx.lineWidth = 2;
                oCtx.setLineDash([10, 10]);
                oCtx.strokeRect(startX, posY, cellW, cellH);
            }
        } else {
            // Dos por fila (2 Columns grid) - Max 8 cards (4 rows)
            const gapX = 120;
            const gapY = 100;
            const count = Math.min(cedulaList.length, 8);
            const rows = Math.ceil(count / 2);
            const totalHeight = rows * cellH + (rows - 1) * gapY;

            const startWidth = cellW * 2 + gapX;
            const startX = Math.round((2550 - startWidth) / 2);
            const startY = Math.round((3300 - totalHeight) / 2);

            for (let i = 0; i < count; i++) {
                const card = cedulaList[i];
                const r = Math.floor(i / 2);
                const c = i % 2;

                const posX = startX + c * (cellW + gapX);
                const posY = startY + r * (cellH + gapY);

                // Draw Frente of each card
                const frontCanvas = renderImageToOffscreenCanvas(card.frenteImage, card.frenteState, 1004, 673);
                oCtx.drawImage(frontCanvas, posX, posY, cellW, cellH);
                
                oCtx.strokeStyle = '#9ca3af';
                oCtx.lineWidth = 2;
                oCtx.setLineDash([10, 10]);
                oCtx.strokeRect(posX, posY, cellW, cellH);
            }
        }
    }

    return offscreen;
}

// Download / Export Trigger with loading animations
btnDownload.addEventListener('click', () => {
    const activeImg = (activeSide === 'frente') ? originalImage : reversoImage;
    if (!activeImg) return;
    
    // Add visual click animation
    btnDownload.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Compilando Plantilla...';
    btnDownload.disabled = true;
    
    setTimeout(() => {
        try {
            const qualitySetting = parseInt(sliderQuality.value) / 100;
            const compiledCanvas = compilePrintSheet();
            
            // Generate JPEG image
            const dataUrl = compiledCanvas.toDataURL('image/jpeg', qualitySetting);
            
            // Create download trigger link
            const downloadLink = document.createElement('a');
            
            const mode = printTemplateSelect.value;
            if (mode === 'single') {
                if (activePreset === 'intt') {
                    downloadLink.download = (activeSide === 'frente') ? 'intt_foto_carnet_448x336.jpg' : 'intt_selfie_cedula_448x336.jpg';
                } else if (activePreset === 'cedula') {
                    downloadLink.download = (activeSide === 'frente') ? 'cedula_venezolana_frente_1004x673.jpg' : 'cedula_venezolana_reverso_1004x673.jpg';
                } else {
                    downloadLink.download = `foto_carnet_unica_${canvasWidth}x${canvasHeight}.jpg`;
                }
            } else if (mode === '4x6') {
                downloadLink.download = `pliego_impresion_4x6_${canvasWidth}x${canvasHeight}.jpg`;
            } else if (mode === 'a4') {
                downloadLink.download = `pliego_impresion_a4_${canvasWidth}x${canvasHeight}.jpg`;
            } else if (mode === 'letter') {
                downloadLink.download = `pliego_impresion_carta_${canvasWidth}x${canvasHeight}.jpg`;
            } else if (mode === 'legal') {
                downloadLink.download = `pliego_impresion_oficio_${canvasWidth}x${canvasHeight}.jpg`;
            } else if (mode === 'cedula_single') {
                downloadLink.download = `cedula_venezolana_frente_${activeCedulaPosition}_carta.jpg`;
            } else if (mode === 'cedula_double') {
                downloadLink.download = `cedula_frente_y_reverso_${activeCedulaPosition}_carta.jpg`;
            } else if (mode === 'multicedula') {
                downloadLink.download = `pliego_multicedula_${activeMulticedulaDist}_carta.jpg`;
            }
            
            downloadLink.href = dataUrl;
            
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error(error);
            alert('Error exportando la foto carnet. Intenta con un navegador moderno.');
        } finally {
            // Restore button visual
            btnDownload.innerHTML = '<i class="fa-solid fa-circle-down"></i> Exportar Foto de Alta Calidad';
            btnDownload.disabled = false;
        }
    }, 850); // Slight delay for realistic compiler loading transition
});

// ==========================================================================
// Pixels to Centimeters Converter Module Logic
// ==========================================================================

// DOM Elements for Converter
const convBox = document.getElementById('convBox');
const convLabelWidth = document.getElementById('convLabelWidth');
const convLabelHeight = document.getElementById('convLabelHeight');
const convLabelDpi = document.getElementById('convLabelDpi');

const numConvCmWidth = document.getElementById('numConvCmWidth');
const numConvCmHeight = document.getElementById('numConvCmHeight');

const numConvWidth = document.getElementById('numConvWidth');
const sliderConvWidth = document.getElementById('sliderConvWidth');

const numConvHeight = document.getElementById('numConvHeight');
const sliderConvHeight = document.getElementById('sliderConvHeight');

const numConvDpi = document.getElementById('numConvDpi');
const sliderConvDpi = document.getElementById('sliderConvDpi');

const btnDpiPrev = document.getElementById('btnDpiPrev');
const btnDpiNext = document.getElementById('btnDpiNext');
const dpiDisplayBox = document.getElementById('dpiDisplayBox');

// Typical DPI preset values
const dpiPresets = [72, 96, 150, 300, 400, 600];

// Main Calculation and visual resize loop
// Pass updateCmInputs=false when the user is actively typing in the CM fields to prevent focus disruption.
function updateConverter(updateCmInputs = true) {
    const widthPx = parseInt(sliderConvWidth.value);
    const heightPx = parseInt(sliderConvHeight.value);
    const dpi = parseInt(sliderConvDpi.value);

    // DPI Formula: cm = (pixels / DPI) * 2.54
    const cmWidth = ((widthPx / dpi) * 2.54).toFixed(2);
    const cmHeight = ((heightPx / dpi) * 2.54).toFixed(2);

    // Update Centimeter inputs if requested
    if (updateCmInputs) {
        numConvCmWidth.value = cmWidth;
        numConvCmHeight.value = cmHeight;
    }

    // Update labels inside preview grid box
    convLabelWidth.textContent = `${widthPx} px / ${cmWidth} cm`;
    convLabelHeight.textContent = `${heightPx} px / ${cmHeight} cm`;
    convLabelDpi.textContent = `${dpi} DPI`;
    dpiDisplayBox.textContent = dpi;

    // Dynamically scale/resize the preview grid box based on aspect ratio
    const maxBoxSize = 180;
    let boxW = maxBoxSize;
    let boxH = maxBoxSize;

    if (widthPx > heightPx) {
        boxH = Math.round(maxBoxSize * (heightPx / widthPx));
    } else if (heightPx > widthPx) {
        boxW = Math.round(maxBoxSize * (widthPx / heightPx));
    }

    convBox.style.width = `${boxW}px`;
    convBox.style.height = `${boxH}px`;
}

// Synchronize Sliders and Numeric Inputs
function setupSyncedControls(slider, numberInput) {
    slider.addEventListener('input', (e) => {
        numberInput.value = e.target.value;
        updateConverter(true);
    });

    numberInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value);
        const min = parseInt(numberInput.getAttribute('min'));
        const max = parseInt(numberInput.getAttribute('max'));

        if (isNaN(val)) return;
        if (val < min) val = min;
        if (val > max) val = max;

        slider.value = val;
        updateConverter(true);
    });

    numberInput.addEventListener('blur', (e) => {
        if (e.target.value === '') {
            e.target.value = slider.value;
        }
    });
}

// Setup controls syncs
setupSyncedControls(sliderConvWidth, numConvWidth);
setupSyncedControls(sliderConvHeight, numConvHeight);
setupSyncedControls(sliderConvDpi, numConvDpi);

// Dynamic Bidirectional Centimeter Input Listeners
// Formula: pixels = (cm / 2.54) * DPI
function handleCmInput(e, type) {
    let cmVal = parseFloat(e.target.value);
    const dpi = parseInt(sliderConvDpi.value);

    if (isNaN(cmVal) || cmVal <= 0) return;

    // Limit values to reasonable dimensions (up to 100 cm)
    if (cmVal > 100) cmVal = 100;

    const pxVal = Math.round((cmVal / 2.54) * dpi);

    if (type === 'width') {
        sliderConvWidth.value = pxVal;
        numConvWidth.value = pxVal;
    } else {
        sliderConvHeight.value = pxVal;
        numConvHeight.value = pxVal;
    }

    // Update visual aspects without overwriting the typed text field (preserves input cursor)
    updateConverter(false);
}

numConvCmWidth.addEventListener('input', (e) => handleCmInput(e, 'width'));
numConvCmHeight.addEventListener('input', (e) => handleCmInput(e, 'height'));

// Blur events to clean up formatting (e.g. append decimal zeros)
numConvCmWidth.addEventListener('blur', (e) => {
    if (e.target.value === '' || parseFloat(e.target.value) <= 0) {
        e.target.value = ((parseInt(sliderConvWidth.value) / parseInt(sliderConvDpi.value)) * 2.54).toFixed(2);
    } else {
        updateConverter(true);
    }
});

numConvCmHeight.addEventListener('blur', (e) => {
    if (e.target.value === '' || parseFloat(e.target.value) <= 0) {
        e.target.value = ((parseInt(sliderConvHeight.value) / parseInt(sliderConvDpi.value)) * 2.54).toFixed(2);
    } else {
        updateConverter(true);
    }
});

// Carousel DPI preset navigation
function shiftDpiPreset(direction) {
    const currentDpi = parseInt(sliderConvDpi.value);
    let targetIndex = -1;

    // Try to locate close index
    if (direction === 'next') {
        targetIndex = dpiPresets.findIndex(p => p > currentDpi);
        if (targetIndex === -1) targetIndex = 0; // Wrap
    } else {
        for (let i = dpiPresets.length - 1; i >= 0; i--) {
            if (dpiPresets[i] < currentDpi) {
                targetIndex = i;
                break;
            }
        }
        if (targetIndex === -1) targetIndex = dpiPresets.length - 1; // Wrap
    }

    const targetDpi = dpiPresets[targetIndex];
    sliderConvDpi.value = targetDpi;
    numConvDpi.value = targetDpi;
    updateConverter(true);
}

btnDpiPrev.addEventListener('click', () => shiftDpiPreset('prev'));
btnDpiNext.addEventListener('click', () => shiftDpiPreset('next'));

// Initial render
updateConverter(true);

// ==========================================================================
// Dynamic File Size Utility & Calculations Logic
// ==========================================================================

// Bytes formatter utility
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Live estimated export size calculation
function updateExportSizeInfo() {
    if (!getActiveImage()) return;

    const qualitySetting = parseInt(sliderQuality.value) / 100;
    const mode = printTemplateSelect.value;
    const targetCanvas = compilePrintSheet(); // compiles active single canvas or print layout sheet

    targetCanvas.toBlob((blob) => {
        if (!blob) return;
        
        const sizeFormatted = formatBytes(blob.size);
        let labelName = "Foto Única";
        
        if (mode === '4x6') labelName = "Hoja 4x6\"";
        if (mode === 'a4') labelName = "Hoja A4";
        
        infoExport.textContent = `${labelName} (${targetCanvas.width}x${targetCanvas.height} px) • ${sizeFormatted}`;
    }, 'image/jpeg', qualitySetting);
}

// Debounce wrapper to prevent lag during active pan/zoom interactions
let exportSizeTimeout = null;
function debounceExportSize() {
    if (exportSizeTimeout) clearTimeout(exportSizeTimeout);
    exportSizeTimeout = setTimeout(updateExportSizeInfo, 180);
}

// Bind selectors to update export size estimations
sliderQuality.addEventListener('input', debounceExportSize);
printTemplateSelect.addEventListener('change', debounceExportSize);


// ==========================================================================
// Webcam & Live Camera Stream Capture System
// ==========================================================================

// Start Webcam Stream with Ideal HD/Full-HD resolution
async function startWebcam() {
    if (webcamStream) {
        stopWebcam();
    }

    // Request high resolution capture to ensure premium output quality
    const constraints = {
        video: {
            facingMode: currentFacingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 }
        },
        audio: false
    };

    try {
        webcamStream = await navigator.mediaDevices.getUserMedia(constraints);
        webcamVideo.srcObject = webcamStream;

        // Apply visual toggle states
        emptyState.style.display = 'none';
        photoCanvas.style.display = 'none';
        canvasToolbar.style.display = 'none';
        fileInfoBar.style.display = 'none';

        webcamVideo.style.display = 'block';
        guideOverlay.style.display = 'block';
        webcamControls.style.display = 'flex';

        // Reset webcam preview buttons and ensure default snapshot buttons are visible
        btnWebcamAccept.style.display = 'none';
        btnWebcamRetry.style.display = 'none';
        btnWebcamCapture.style.display = 'flex';
        btnToggleParallel.style.display = 'flex';
        btnWebcamSwitch.style.display = 'flex';
        btnWebcamCancel.style.display = 'flex';

        // Dynamically apply video mirroring (scaleX(-1)) ONLY for the front selfie camera (user)
        // and keep rear camera (environment) naturally unmirrored to make object alignment natural.
        if (currentFacingMode === 'user') {
            webcamVideo.style.transform = 'scaleX(-1)';
        } else {
            webcamVideo.style.transform = 'none';
        }

        // Check for physical flashlight (torch) availability dynamically in the video track
        const track = webcamStream.getVideoTracks()[0];
        if (track) {
            setTimeout(() => {
                try {
                    const capabilities = track.getCapabilities();
                    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    // Show torch if capability is verified OR if using rear camera on mobile device (fallback)
                    if ((capabilities && 'torch' in capabilities) || (currentFacingMode === 'environment' && isMobileDevice)) {
                        btnWebcamTorch.style.display = 'flex';
                    } else {
                        btnWebcamTorch.style.display = 'none';
                    }
                } catch (e) {
                    console.warn("Flashlight capability query failed:", e);
                    // Fallback for mobile environment camera
                    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    if (currentFacingMode === 'environment' && isMobileDevice) {
                        btnWebcamTorch.style.display = 'flex';
                    } else {
                        btnWebcamTorch.style.display = 'none';
                    }
                }
            }, 500); // Small safety delay to let track start fully
        }

        // Direct stream to update aspect-ratio box live
        dropZone.style.aspectRatio = `${canvasWidth} / ${canvasHeight}`;

    } catch (err) {
        console.error("Error al acceder a la cámara: ", err);
        alert("No se pudo acceder a la cámara. Por favor, asegúrate de otorgar los permisos necesarios en tu navegador.");
        stopWebcam();
    }
}


// Stop Webcam Stream and recover previous active view
function stopWebcam() {
    if (isParallelActive) {
        toggleParallelMode(false); // Force turn off parallel mode
    }
    if (isTorchActive) {
        toggleTorch(false); // Force turn off flashlight
    }
    if (webcamStream) {

        webcamStream.getTracks().forEach(track => track.stop());
        webcamStream = null;
    }
    webcamVideo.srcObject = null;
    webcamVideo.style.display = 'none';
    webcamControls.style.display = 'none';
    if (btnWebcamTimer) btnWebcamTimer.style.display = 'flex';

    if (!getActiveImage()) {
        emptyState.style.display = 'flex';
        photoCanvas.style.display = 'none';
        guideOverlay.style.display = 'none';
        canvasToolbar.style.display = 'none';
        fileInfoBar.style.display = 'none';
    } else {
        photoCanvas.style.display = 'block';
        guideOverlay.style.display = 'block';
        canvasToolbar.style.display = 'flex';
        fileInfoBar.style.display = 'flex';
        renderCanvas();
    }
}

// Cycle Camera Facing Mode (Frontal selfie <-> Trasera principal)
async function switchCamera() {
    // Stop the active stream to trigger hardware release
    stopWebcam();
    
    // Brief 350ms delay to let mobile OS release the camera device
    await new Promise(resolve => setTimeout(resolve, 350));
    
    currentFacingMode = (currentFacingMode === 'user') ? 'environment' : 'user';
    startWebcam();
}

// Capture Snapshot in Native Camera Resolution with countdown timer support
function captureSnapshot() {
    if (!webcamStream || !webcamVideo.videoWidth) return;

    if (currentTimerDuration > 0) {
        // Show countdown timer overlay
        const timerOverlay = document.getElementById('cameraTimerOverlay');
        const timerCountdown = document.getElementById('cameraTimerCountdown');
        timerOverlay.style.display = 'flex';
        
        let count = currentTimerDuration;
        timerCountdown.textContent = count;
        
        // Disable buttons during countdown
        btnWebcamCapture.disabled = true;
        btnWebcamCancel.disabled = true;
        btnWebcamSwitch.disabled = true;
        btnWebcamTimer.disabled = true;

        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                timerCountdown.textContent = count;
            } else {
                clearInterval(interval);
                timerOverlay.style.display = 'none';
                btnWebcamCapture.disabled = false;
                btnWebcamCancel.disabled = false;
                btnWebcamSwitch.disabled = false;
                btnWebcamTimer.disabled = false;
                triggerFlashAndCapture();
            }
        }, 1000);
    } else {
        triggerFlashAndCapture();
    }
}

function triggerFlashAndCapture() {
    // Flash Overlay Effect
    const flashOverlay = document.getElementById('flashOverlay');
    flashOverlay.style.opacity = '1';
    setTimeout(() => {
        flashOverlay.style.opacity = '0';
    }, 150);

    // Freeze camera video stream on screen
    webcamVideo.pause();

    // Toggle button visibilities to present the Accept / Retry controls
    btnWebcamCapture.style.display = 'none';
    btnToggleParallel.style.display = 'none';
    btnWebcamSwitch.style.display = 'none';
    btnWebcamCancel.style.display = 'none';
    if (btnWebcamTimer) btnWebcamTimer.style.display = 'none';
    btnWebcamAccept.style.display = 'flex';
    btnWebcamRetry.style.display = 'flex';

    // Temporarily hide the leveling guide while reviewing the captured frame
    levelingOverlay.style.display = 'none';

    const nativeW = webcamVideo.videoWidth;
    const nativeH = webcamVideo.videoHeight;

    // Create high-res offscreen capture canvas
    const captureCanvas = document.createElement('canvas');
    captureCanvas.width = nativeW;
    captureCanvas.height = nativeH;
    const cCtx = captureCanvas.getContext('2d');

    // Mirror capture if using front facing camera to preserve user alignment expectation
    if (currentFacingMode === 'user') {
        cCtx.translate(nativeW, 0);
        cCtx.scale(-1, 1);
    }

    // Snap the frame
    cCtx.drawImage(webcamVideo, 0, 0, nativeW, nativeH);

    // Convert snap to Blob and store it pending user decision
    captureCanvas.toBlob((blob) => {
        if (!blob) return;

        pendingCapturedFile = new File(
            [blob], 
            `captura_camara_${Date.now()}.jpg`, 
            { type: 'image/jpeg', lastModified: Date.now() }
        );
    }, 'image/jpeg', 0.98); // High quality JPEG snap
}

// Bind Accept photo snap button
btnWebcamAccept.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!pendingCapturedFile) return;

    // Save and load snapshot into editor
    const fileToLoad = pendingCapturedFile;
    pendingCapturedFile = null;
    stopWebcam();
    processImageFile(fileToLoad);
});

// Bind Retry / Discard photo snap button
btnWebcamRetry.addEventListener('click', (e) => {
    e.stopPropagation();
    pendingCapturedFile = null;

    // Resume video playback
    webcamVideo.play();

    // Restore standard snapshot buttons
    btnWebcamCapture.style.display = 'flex';
    btnToggleParallel.style.display = 'flex';
    btnWebcamSwitch.style.display = 'flex';
    btnWebcamCancel.style.display = 'flex';
    if (btnWebcamTimer) btnWebcamTimer.style.display = 'flex';
    btnWebcamAccept.style.display = 'none';
    btnWebcamRetry.style.display = 'none';

    // Restore leveling bubble guide if parallel mode is active
    if (isParallelActive) {
        levelingOverlay.style.display = 'flex';
    }
});


// ==========================================================================
// Modo Foto Paralela (Giroscopio & Level guide) Systems
// ==========================================================================

async function toggleParallelMode(forceState) {
    const targetState = (forceState !== undefined) ? forceState : !isParallelActive;
    if (targetState === isParallelActive) return;

    isParallelActive = targetState;

    if (isParallelActive) {
        const hasPermission = await requestDeviceOrientationPermission();
        if (hasPermission) {
            btnToggleParallel.classList.add('active');
            levelingOverlay.style.display = 'flex';
            window.addEventListener('deviceorientation', handleDeviceOrientation);
            levelingStatus.textContent = "Calibrando giroscopio...";
        } else {
            isParallelActive = false;
            alert("El permiso para acceder a la orientación del dispositivo fue denegado o no está disponible en este dispositivo.");
        }
    } else {
        btnToggleParallel.classList.remove('active');
        levelingOverlay.style.display = 'none';
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
        levelingBubble.classList.remove('aligned');
        levelingStatus.classList.remove('aligned');
        if (levelingBlurRing) levelingBlurRing.classList.remove('aligned');
        levelingBubble.style.transform = "translate(0px, 0px)";
        
        // Reset calibration parameters for next initialization
        devOrientationCalibrated = false;
        smoothedBeta = null;
        smoothedGamma = null;
    }
}

async function requestDeviceOrientationPermission() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const permissionState = await DeviceOrientationEvent.requestPermission();
            return permissionState === 'granted';
        } catch (error) {
            console.error("Error al solicitar permisos de orientación:", error);
            return false;
        }
    }
    // Return true for non-iOS or desktop browsers containing standard orientation listeners
    return 'ondeviceorientation' in window;
}

// Calibration offsets for device orientation
let devOrientationCalibrated = false;
let devOrientationOffset = { beta: 0, gamma: 0 };

// Filtered values for low-pass smoothing (damping)
let smoothedBeta = null;
let smoothedGamma = null;
const filterFactor = 0.15; // 0.15 gives a smooth, dampened response without lag

function handleDeviceOrientation(event) {
    if (!isParallelActive || !webcamStream) return;

    // Raw orientation values in degrees
    let rawBeta = event.beta || 0;
    let rawGamma = event.gamma || 0;

    // Handle screen orientation rotation if screen is rotated
    const screenOrientation = window.screen?.orientation?.angle || window.orientation || 0;
    
    // Normalize coordinates based on screen orientation
    let beta = rawBeta;
    let gamma = rawGamma;
    
    if (screenOrientation === 90) {
        beta = -rawGamma;
        gamma = rawBeta;
    } else if (screenOrientation === -90 || screenOrientation === 270) {
        beta = rawGamma;
        gamma = -rawBeta;
    } else if (screenOrientation === 180) {
        beta = -rawBeta;
        gamma = -rawGamma;
    }

    // Apply auto-calibration on first read if not yet calibrated
    if (!devOrientationCalibrated) {
        // Assume default upright target on start
        const isPortraitPreset = (activePreset === 'pasaporte' || activePreset === 'carnet' || activePreset === 'intt');
        const defaultTargetBeta = isPortraitPreset ? 90 : 0;
        
        // Calibrate offset relative to standard upright or flat targets
        devOrientationOffset.beta = beta - defaultTargetBeta;
        devOrientationOffset.gamma = gamma;
        devOrientationCalibrated = true;
        
        // If the initial offset is too high (e.g. > 25°), it might be held weirdly, so discard it to avoid breaking defaults
        if (Math.abs(devOrientationOffset.beta) > 25 || Math.abs(devOrientationOffset.gamma) > 25) {
            devOrientationOffset.beta = 0;
            devOrientationOffset.gamma = 0;
        }
    }

    // Apply calibration offset
    let calBeta = beta - devOrientationOffset.beta;
    let calGamma = gamma - devOrientationOffset.gamma;

    // Apply low-pass / complementary filter smoothing
    if (smoothedBeta === null || smoothedGamma === null) {
        smoothedBeta = calBeta;
        smoothedGamma = calGamma;
    } else {
        smoothedBeta = smoothedBeta + filterFactor * (calBeta - smoothedBeta);
        smoothedGamma = smoothedGamma + filterFactor * (calGamma - smoothedGamma);
    }

    // Determine target beta orientation: 90° (upright vertical) for face photos, 0° (flat scanner) for document scans
    const isPortraitPreset = (activePreset === 'pasaporte' || activePreset === 'carnet' || activePreset === 'intt');
    const targetBeta = isPortraitPreset ? 90 : 0;

    // Calculate deviations from target orientation
    const devX = smoothedGamma;
    const devY = smoothedBeta - targetBeta;

    // Map a tilt deviation of ±15 degrees to our 120px ring container.
    const maxTilt = 15;
    const maxOffset = 45; // pixel translation limit

    let offsetX = (devX / maxTilt) * maxOffset;
    let offsetY = (devY / maxTilt) * maxOffset;

    // Constrain bubble translation inside the circular boundary
    const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    if (distance > maxOffset) {
        offsetX = (offsetX / distance) * maxOffset;
        offsetY = (offsetY / distance) * maxOffset;
    }

    // Apply translations and rendering based on the alignment mode
    if (isPortraitPreset) {
        // Vertical Mode: Display flight-style Artificial Horizon
        levelingBubble.style.display = 'none';
        levelingHorizonLine.style.display = 'block';
        levelingHorizonBar.style.display = 'block';

        // Constrain the translation offset
        let transY = -(devY / maxTilt) * maxOffset;
        transY = Math.max(-maxOffset, Math.min(maxOffset, transY));

        // Apply rotation (roll) and translation (pitch)
        levelingHorizonBar.style.transform = `translateY(${transY}px) rotate(${-devX}deg)`;
    } else {
        // Flat Scanner Mode: Display standard Circular Bubble Level
        levelingBubble.style.display = 'block';
        levelingHorizonLine.style.display = 'none';
        levelingHorizonBar.style.display = 'none';

        levelingBubble.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    // Calculate total tilt angle deviation from the target orientation
    const tiltAngle = Math.sqrt(devX * devX + devY * devY);

    // Apply snap tolerance of 3 degrees
    if (Math.abs(devY) <= 3 && Math.abs(devX) <= 3) {
        // Parallel! Snap to absolute center and change colors to premium emerald
        if (isPortraitPreset) {
            levelingHorizonBar.style.transform = "translateY(0px) rotate(0deg)";
            levelingHorizonBar.style.background = 'var(--success)';
            levelingHorizonBar.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.9)';
        } else {
            levelingBubble.style.transform = "translate(0px, 0px)";
            levelingBubble.classList.add('aligned');
        }
        levelingStatus.classList.add('aligned');
        if (levelingBlurRing) levelingBlurRing.classList.add('aligned');
        levelingStatus.textContent = "Alineado ✓";
    } else {
        // Out of tolerance
        if (isPortraitPreset) {
            levelingHorizonBar.style.background = '#ef4444';
            levelingHorizonBar.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.7)';
        } else {
            levelingBubble.classList.remove('aligned');
        }
        levelingStatus.classList.remove('aligned');
        if (levelingBlurRing) levelingBlurRing.classList.remove('aligned');
        
        const modeLabel = isPortraitPreset ? "Vertical" : "Plano";
        levelingStatus.textContent = `${modeLabel} - Inclinación: ${Math.round(tiltAngle)}° (Tolerancia: 3°)`;
    }
}

// Bind Parallel toggle
btnToggleParallel.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleParallelMode();
});


// ==========================================================================
// Escáner 3D Perspective Warp Correction Systems
// ==========================================================================

// Updates handles positions in percentage coordinate space relative to dropZone container
function updateHandlesDOM() {
    if (!state.corners) {
        state.corners = { TL: {x: 0.1, y: 0.1}, TR: {x: 0.9, y: 0.1}, BL: {x: 0.1, y: 0.9}, BR: {x: 0.9, y: 0.9} };
    }

    handleTL.style.left = `${state.corners.TL.x * 100}%`;
    handleTL.style.top = `${state.corners.TL.y * 100}%`;

    handleTR.style.left = `${state.corners.TR.x * 100}%`;
    handleTR.style.top = `${state.corners.TR.y * 100}%`;

    handleBL.style.left = `${state.corners.BL.x * 100}%`;
    handleBL.style.top = `${state.corners.BL.y * 100}%`;

    handleBR.style.left = `${state.corners.BR.x * 100}%`;
    handleBR.style.top = `${state.corners.BR.y * 100}%`;

    updateSvgLines();
}

// Updates SVG lines connecting interactive handles in real time
function updateSvgLines() {
    const svg = document.getElementById('perspectiveSvg');
    if (!svg) return;

    const rect = dropZone.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const pTL = { x: state.corners.TL.x * w, y: state.corners.TL.y * h };
    const pTR = { x: state.corners.TR.x * w, y: state.corners.TR.y * h };
    const pBL = { x: state.corners.BL.x * w, y: state.corners.BL.y * h };
    const pBR = { x: state.corners.BR.x * w, y: state.corners.BR.y * h };

    document.getElementById('lineTL_TR').setAttribute('x1', pTL.x);
    document.getElementById('lineTL_TR').setAttribute('y1', pTL.y);
    document.getElementById('lineTL_TR').setAttribute('x2', pTR.x);
    document.getElementById('lineTL_TR').setAttribute('y2', pTR.y);

    document.getElementById('lineTR_BR').setAttribute('x1', pTR.x);
    document.getElementById('lineTR_BR').setAttribute('y1', pTR.y);
    document.getElementById('lineTR_BR').setAttribute('x2', pBR.x);
    document.getElementById('lineTR_BR').setAttribute('y2', pBR.y);

    document.getElementById('lineBR_BL').setAttribute('x1', pBR.x);
    document.getElementById('lineBR_BL').setAttribute('y1', pBR.y);
    document.getElementById('lineBR_BL').setAttribute('x2', pBL.x);
    document.getElementById('lineBR_BL').setAttribute('y2', pBL.y);

    document.getElementById('lineBL_TL').setAttribute('x1', pBL.x);
    document.getElementById('lineBL_TL').setAttribute('y1', pBL.y);
    document.getElementById('lineBL_TL').setAttribute('x2', pTL.x);
    document.getElementById('lineBL_TL').setAttribute('y2', pTL.y);
}

// Implements mouse and touch drag handlers for perspective guides
let activeHandleElement = null;

function setupHandleDrag(handleEl, cornerKey) {
    function onStart(e) {
        e.preventDefault();
        e.stopPropagation();
        activeHandleElement = { el: handleEl, key: cornerKey };
        
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
    }

    function onMove(e) {
        if (!activeHandleElement) return;
        if (e.cancelable) e.preventDefault();

        const rect = dropZone.getBoundingClientRect();
        let clientX = e.clientX;
        let clientY = e.clientY;

        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        // Calculate relative coordinates normalized from 0.0 to 1.0 constrained in dropZone boundaries
        let x = (clientX - rect.left) / rect.width;
        let y = (clientY - rect.top) / rect.height;

        x = Math.max(0.0, Math.min(1.0, x));
        y = Math.max(0.0, Math.min(1.0, y));

        // Save new coordinate in active state
        state.corners[cornerKey].x = x;
        state.corners[cornerKey].y = y;

        // Reposition element
        handleEl.style.left = `${x * 100}%`;
        handleEl.style.top = `${y * 100}%`;

        // Draw connections
        updateSvgLines();
        
        // Dynamic canvas refresh
        renderCanvas();
    }

    function onEnd() {
        activeHandleElement = null;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
    }

    handleEl.addEventListener('mousedown', onStart);
    handleEl.addEventListener('touchstart', onStart, { passive: false });
}

// Initialize dragging logic for all 4 corners
setupHandleDrag(handleTL, 'TL');
setupHandleDrag(handleTR, 'TR');
setupHandleDrag(handleBL, 'BL');
setupHandleDrag(handleBR, 'BR');

// Recalculates canvas layout coordinates when browser window is resized to keep handles synchronized
window.addEventListener('resize', () => {
    if (isPerspectiveAdjustmentActive) {
        updateHandlesDOM();
    }
});

// Helper to update the Perspective Warp button text and styling dynamically
function updatePerspectiveButtonUI() {
    if (!btnPerspectiveWarp) return;
    
    if (isPerspectiveAdjustmentActive) {
        btnPerspectiveWarp.innerHTML = `<i class="fa-solid fa-check"></i> Aplicar Escáner`;
        btnPerspectiveWarp.style.background = 'rgba(16, 185, 129, 0.2)';
        btnPerspectiveWarp.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        btnPerspectiveWarp.style.color = '#a7f3d0';
        btnPerspectiveWarp.classList.add('active');
    } else if (state && state.isWarpActive) {
        btnPerspectiveWarp.innerHTML = `<i class="fa-solid fa-crop-simple"></i> Reajustar Escáner`;
        btnPerspectiveWarp.style.background = 'rgba(37, 99, 235, 0.2)';
        btnPerspectiveWarp.style.borderColor = 'rgba(37, 99, 235, 0.4)';
        btnPerspectiveWarp.style.color = '#93c5fd';
        btnPerspectiveWarp.classList.remove('active');
    } else {
        btnPerspectiveWarp.innerHTML = `<i class="fa-solid fa-crop-simple"></i> Escáner 3D`;
        btnPerspectiveWarp.style.background = '';
        btnPerspectiveWarp.style.borderColor = '';
        btnPerspectiveWarp.style.color = '';
        btnPerspectiveWarp.classList.remove('active');
    }
}

// Toggle Perspective adjustments
btnPerspectiveWarp.addEventListener('click', () => {
    if (!getActiveImage()) return;

    if (isPerspectiveAdjustmentActive) {
        // Exit Adjustment Mode (Apply warp)
        isPerspectiveAdjustmentActive = false;
        perspectiveHandlesOverlay.style.display = 'none';
        
        // Turn on real perspective warping rendering
        state.isWarpActive = true;
        
        // Re-enable sliders
        enableControls(true);
        
        // Automatically fit the newly warped cropped card to the template canvas
        calculateInitialFit();
    } else {
        // Enter Adjustment Mode (Allow realignment)
        isPerspectiveAdjustmentActive = true;
        perspectiveHandlesOverlay.style.display = 'block';

        // Create container SVG if not present
        let svg = document.getElementById('perspectiveSvg');
        if (!svg) {
            svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("class", "perspective-svg-lines");
            svg.id = "perspectiveSvg";
            svg.innerHTML = `
                <line class="perspective-line" id="lineTL_TR"></line>
                <line class="perspective-line" id="lineTR_BR"></line>
                <line class="perspective-line" id="lineBR_BL"></line>
                <line class="perspective-line" id="lineBL_TL"></line>
            `;
            perspectiveHandlesOverlay.appendChild(svg);
        }

        // Reset workspace translation settings so that the photo is drawn clean & fitted
        state.zoom = 100;
        state.rotate = 0;
        state.offsetX = 0;
        state.offsetY = 0;
        updateSlidersFromState(state);

        // Position handles
        updateHandlesDOM();
    }

    updatePerspectiveButtonUI();
    renderCanvas();
});

// ==========================================================================
// Triangulation Perspective Warp Algorithm (Pure JS Texture Mapper)
// ==========================================================================

function warpQuadToRect(img, corners, dstW, dstH) {
    const canvas = document.createElement('canvas');
    canvas.width = dstW;
    canvas.height = dstH;
    const tCtx = canvas.getContext('2d');

    // Use a 16x16 grid for maximum grid distortion accuracy
    const gridN = 16;
    
    // Distorted source corners in source image pixels
    const pTL = { x: corners.TL.x * img.width, y: corners.TL.y * img.height };
    const pTR = { x: corners.TR.x * img.width, y: corners.TR.y * img.height };
    const pBL = { x: corners.BL.x * img.width, y: corners.BL.y * img.height };
    const pBR = { x: corners.BR.x * img.width, y: corners.BR.y * img.height };

    // Bilinear interpolation mapping normalized coordinates to source pixels
    function getDistortedPoint(u, v) {
        const x = (1 - u) * (1 - v) * pTL.x + u * (1 - v) * pTR.x + (1 - u) * v * pBL.x + u * v * pBR.x;
        const y = (1 - u) * (1 - v) * pTL.y + u * (1 - v) * pTR.y + (1 - u) * v * pBL.y + u * v * pBR.y;
        return { x, y };
    }

    // Solves linear equation for affine triangle transformation parameters
    function drawAffineTriangle(s0, s1, s2, d0, d1, d2) {
        tCtx.save();
        
        // Clip offscreen canvas drawings to destination triangle area
        tCtx.beginPath();
        tCtx.moveTo(d0.x, d0.y);
        tCtx.lineTo(d1.x, d1.y);
        tCtx.lineTo(d2.x, d2.y);
        tCtx.closePath();
        tCtx.clip();
        
        // Solve mapping: [u, v] -> [x, y]
        const u0 = s0.x, v0 = s0.y;
        const u1 = s1.x, v1 = s1.y;
        const u2 = s2.x, v2 = s2.y;
        
        const x0 = d0.x, y0 = d0.y;
        const x1 = d1.x, y1 = d1.y;
        const x2 = d2.x, y2 = d2.y;
        
        const det = u0 * (v1 - v2) + u1 * (v2 - v0) + u2 * (v0 - v1);
        if (Math.abs(det) < 0.0001) {
            tCtx.restore();
            return;
        }
        
        const a = (x0 * (v1 - v2) + x1 * (v2 - v0) + x2 * (v0 - v1)) / det;
        const c = (x0 * (u2 - u1) + x1 * (u0 - u2) + x2 * (u1 - u0)) / det;
        const e = (x0 * (u1 * v2 - u2 * v1) + x1 * (u2 * v0 - u0 * v2) + x2 * (u0 * v1 - u1 * v0)) / det;
        
        const b = (y0 * (v1 - v2) + y1 * (v2 - v0) + y2 * (v0 - v1)) / det;
        const d = (y0 * (u2 - u1) + y1 * (u0 - u2) + y2 * (u1 - u0)) / det;
        const f = (y0 * (u1 * v2 - u2 * v1) + y1 * (u2 * v0 - u0 * v2) + y2 * (u0 * v1 - u1 * v0)) / det;
        
        // Apply matrix and paint
        tCtx.transform(a, b, c, d, e, f);
        tCtx.drawImage(img, 0, 0);
        tCtx.restore();
    }

    // Warp grid cells
    for (let i = 0; i < gridN; i++) {
        for (let j = 0; j < gridN; j++) {
            const u0 = i / gridN;
            const u1 = (i + 1) / gridN;
            const v0 = j / gridN;
            const v1 = (j + 1) / gridN;

            // Target destination coordinates on final clean sheet
            const dTL = { x: u0 * dstW, y: v0 * dstH };
            const dTR = { x: u1 * dstW, y: v0 * dstH };
            const dBL = { x: u0 * dstW, y: v1 * dstH };
            const dBR = { x: u1 * dstW, y: v1 * dstH };

            // Distorted coordinates in camera photograph
            const sTL = getDistortedPoint(u0, v0);
            const sTR = getDistortedPoint(u1, v0);
            const sBL = getDistortedPoint(u0, v1);
            const sBR = getDistortedPoint(u1, v1);

            // Draw Triangle 1 (TL, TR, BL)
            drawAffineTriangle(sTL, sTR, sBL, dTL, dTR, dBL);
            // Draw Triangle 2 (TR, BR, BL)
            drawAffineTriangle(sTR, sBR, sBL, dTR, dBR, dBL);
        }
    }

    return canvas;
}

// ==========================================================================
// Aspect-Ratio Projection Coordinates Mapping Helper
// ==========================================================================

function getWarpNormalizedCorners(img, imgState) {
    if (!img || !imgState.corners) {
        return { TL: {x: 0.1, y: 0.1}, TR: {x: 0.9, y: 0.1}, BL: {x: 0.1, y: 0.9}, BR: {x: 0.9, y: 0.9} };
    }

    // Determine the fitted aspect-ratio bounding box dimensions ("contain" layout)
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let fitScale = 1;
    if (imgRatio > canvasRatio) {
        fitScale = canvasWidth / img.width;
    } else {
        fitScale = canvasHeight / img.height;
    }

    const drawW = img.width * fitScale;
    const drawH = img.height * fitScale;

    // Center offsets of the drawing bounding box relative to canvas origin
    const drawX = (canvasWidth - drawW) / 2;
    const drawY = (canvasHeight - drawH) / 2;

    const projectedCorners = {};
    for (const key in imgState.corners) {
        const hx = imgState.corners[key].x * canvasWidth;
        const hy = imgState.corners[key].y * canvasHeight;

        // Calculate handle relative offset within the actual drawn image box (clamped between 0.0 and 1.0)
        let rx = (hx - drawX) / drawW;
        let ry = (hy - drawY) / drawH;

        rx = Math.max(0.0, Math.min(1.0, rx));
        ry = Math.max(0.0, Math.min(1.0, ry));

        projectedCorners[key] = { x: rx, y: ry };
    }
    return projectedCorners;
}

// ==========================================================================
// Assisted Lighting (Flashlight / Torch) Control Logic
// ==========================================================================

async function toggleTorch(forceState) {
    if (!webcamStream) return;
    const track = webcamStream.getVideoTracks()[0];
    if (!track) return;
    const targetState = (forceState !== undefined) ? forceState : !isTorchActive;
    try {
        await track.applyConstraints({ advanced: [{ torch: targetState }] });
        isTorchActive = targetState;
        if (isTorchActive) {
            btnWebcamTorch.classList.add('active');
            btnWebcamTorch.style.background = 'rgba(255, 193, 7, 0.2)';
            btnWebcamTorch.style.borderColor = 'rgba(255, 193, 7, 0.4)';
            btnWebcamTorch.innerHTML = '<i class="fa-solid fa-lightbulb"></i>';
        } else {
            btnWebcamTorch.classList.remove('active');
            btnWebcamTorch.style.background = 'rgba(255, 193, 7, 0.08)';
            btnWebcamTorch.style.borderColor = 'rgba(255, 193, 7, 0.15)';
            btnWebcamTorch.innerHTML = '<i class="fa-regular fa-lightbulb"></i>';
        }
    } catch (err) {
        console.error("Error al controlar la linterna:", err);
    }
}

// Dynamic adjustment of mobile layout padding (deactivated to allow fluid scrolling)
function adjustMobilePadding() {
    // Fluid relative layout doesn't require fixed padding offsets
}

// Collapses all accordion control cards on mobile by default on startup
function initializeMobileAccordions() {
    if (window.innerWidth <= 900) {
        document.querySelectorAll('.control-card.collapsible').forEach(card => {
            card.classList.remove('expanded');
        });
    }
}

// Add event listeners for resizing and load to keep it perfectly sync'd
window.addEventListener('resize', adjustMobilePadding);
window.addEventListener('load', () => {
    adjustMobilePadding();
    initializeMobileAccordions();
});
document.addEventListener('DOMContentLoaded', () => {
    adjustMobilePadding();
    initializeMobileAccordions();
});

// ==========================================================================
// Mobile Slider Touch Scroll Prevention Helper
// Prevents range sliders from snapping values immediately when the user attempts
// to scroll the page vertically, ensuring smooth horizontal-only value adjustments.
// ==========================================================================
let sliderTouchState = null;

document.querySelectorAll('.slider').forEach(slider => {
    slider.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        const touch = e.touches[0];
        sliderTouchState = {
            slider: slider,
            initialValue: parseFloat(slider.value),
            startX: touch.clientX,
            startY: touch.clientY,
            hasMoved: false,
            isScrolling: false
        };
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!sliderTouchState || sliderTouchState.slider !== slider) return;
        
        const touch = e.touches[0];
        const dx = touch.clientX - sliderTouchState.startX;
        const dy = touch.clientY - sliderTouchState.startY;
        
        if (!sliderTouchState.hasMoved) {
            // Check threshold (e.g. 8 pixels of movement)
            if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
                sliderTouchState.hasMoved = true;
                if (Math.abs(dy) > Math.abs(dx)) {
                    sliderTouchState.isScrolling = true;
                } else {
                    sliderTouchState.isScrolling = false;
                }
            }
        }
        
        if (sliderTouchState.isScrolling) {
            // Restore the initial value to prevent value jump during vertical scroll
            slider.value = sliderTouchState.initialValue;
            
            // Trigger input event to sync UI if the browser had modified it
            const event = new Event('input', { bubbles: true });
            slider.dispatchEvent(event);
        }
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        if (sliderTouchState && sliderTouchState.slider === slider) {
            if (sliderTouchState.isScrolling || !sliderTouchState.hasMoved) {
                // If the user only tapped or scrolled vertically, restore initial value
                slider.value = sliderTouchState.initialValue;
                const event = new Event('input', { bubbles: true });
                slider.dispatchEvent(event);
            }
            sliderTouchState = null;
        }
    });
});

// ==========================================================================
// Premium UI Dynamic Theme, Accordion, Chroma Key, Texture & HUD systems
// ==========================================================================

let currentTimerDuration = 0; // State for camera timer: 0 = Off, 3 = 3s, 5 = 5s

// Update preset class on body for color-coding presets
function updateBodyPresetClass() {
    document.body.classList.remove('preset-pasaporte', 'preset-carnet', 'preset-intt', 'preset-cedula');
    document.body.classList.add(`preset-${activePreset}`);
}

// Background Chroma Key replacement filter
function applyChromaKeyFilter(srcCanvas, filterMode) {
    if (filterMode === 'none') return srcCanvas;
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = srcCanvas.width;
    tempCanvas.height = srcCanvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(srcCanvas, 0, 0);
    
    const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imgData.data;
    
    // Sample background color from top-left corner
    const sampleIdx = (5 * tempCanvas.width + 5) * 4;
    const refR = data[sampleIdx];
    const refG = data[sampleIdx + 1];
    const refB = data[sampleIdx + 2];
    
    // Target background color (White or Light Blue)
    let targetR = 255, targetG = 255, targetB = 255;
    if (filterMode === 'blue') {
        targetR = 176; targetG = 224; targetB = 246; // Light official blue
    }
    
    const threshold = 65; 
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const dist = Math.sqrt(
            (r - refR) * (r - refR) +
            (g - refG) * (g - refG) +
            (b - refB) * (b - refB)
        );
        
        if (dist < threshold) {
            const blendFactor = Math.max(0, Math.min(1, (threshold - dist) / 15));
            data[i] = Math.round(targetR * blendFactor + r * (1 - blendFactor));
            data[i + 1] = Math.round(targetG * blendFactor + g * (1 - blendFactor));
            data[i + 2] = Math.round(targetB * blendFactor + b * (1 - blendFactor));
        }
    }
    
    tempCtx.putImageData(imgData, 0, 0);
    return tempCanvas;
}

// Paper Texture Simulator Overlays
function applyPaperTexture(targetCtx, w, h, textureMode) {
    if (textureMode === 'none') return;
    
    targetCtx.save();
    
    if (textureMode === 'mate') {
        // Create fine-grain matte paper texture
        const noiseCanvas = document.createElement('canvas');
        noiseCanvas.width = 120;
        noiseCanvas.height = 120;
        const nCtx = noiseCanvas.getContext('2d');
        const nImgData = nCtx.createImageData(120, 120);
        const nData = nImgData.data;
        for (let i = 0; i < nData.length; i += 4) {
            const val = Math.floor(Math.random() * 22);
            nData[i] = val;
            nData[i + 1] = val;
            nData[i + 2] = val;
            nData[i + 3] = 10; // low opacity
        }
        nCtx.putImageData(nImgData, 0, 0);
        
        const pattern = targetCtx.createPattern(noiseCanvas, 'repeat');
        targetCtx.fillStyle = pattern;
        targetCtx.globalCompositeOperation = 'source-over';
        targetCtx.fillRect(0, 0, w, h);
        
        // Soft matte white color wash
        targetCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        targetCtx.fillRect(0, 0, w, h);
    } else if (textureMode === 'glossy') {
        // Glossy glare reflection effect
        const grad = targetCtx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
        grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.07)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.16)');
        grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.07)');
        grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.0)');
        
        targetCtx.fillStyle = grad;
        targetCtx.globalCompositeOperation = 'source-over';
        targetCtx.fillRect(0, 0, w, h);
    }
    
    targetCtx.restore();
}

// Collapsible accordion card trigger listeners
document.querySelectorAll('.control-card.collapsible .card-header').forEach(header => {
    header.addEventListener('click', (e) => {
        if (e.target.closest('input') || e.target.closest('button') || e.target.closest('select')) {
            return;
        }
        const card = header.closest('.control-card');
        card.classList.toggle('expanded');
    });
});

// Theme Toggle Logic
const btnThemeToggle = document.getElementById('btnThemeToggle');
const btnThemeToggleMobile = document.getElementById('btnThemeToggleMobile');

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Sync button icons
    const icons = [btnThemeToggle?.querySelector('i'), btnThemeToggleMobile?.querySelector('i')];
    icons.forEach(icon => {
        if (icon) {
            icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    });
}

if (btnThemeToggle) btnThemeToggle.addEventListener('click', toggleTheme);
if (btnThemeToggleMobile) btnThemeToggleMobile.addEventListener('click', toggleTheme);

// Load persisted theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    toggleTheme();
}

// Camera Timer Button
const btnWebcamTimer = document.getElementById('btnWebcamTimer');
const timerIndicator = document.getElementById('timerIndicator');

if (btnWebcamTimer) {
    btnWebcamTimer.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentTimerDuration === 0) {
            currentTimerDuration = 3;
            timerIndicator.textContent = "3s";
            btnWebcamTimer.classList.add('active');
            btnWebcamTimer.style.background = 'rgba(168, 85, 247, 0.2)';
            btnWebcamTimer.style.borderColor = 'var(--primary)';
        } else if (currentTimerDuration === 3) {
            currentTimerDuration = 5;
            timerIndicator.textContent = "5s";
        } else {
            currentTimerDuration = 0;
            timerIndicator.textContent = "Off";
            btnWebcamTimer.classList.remove('active');
            btnWebcamTimer.style.background = 'rgba(255,255,255,0.08)';
            btnWebcamTimer.style.borderColor = 'rgba(255,255,255,0.12)';
        }
    });
}

// Bind texture and background filter dropdown changes to trigger canvas updates
document.getElementById('paperTextureSelect')?.addEventListener('change', renderCanvas);
document.getElementById('backgroundColorFilterSelect')?.addEventListener('change', renderCanvas);

// Dynamic 3D interactive paper preview effect
const paperSheetEl = document.getElementById('paperSheet');
if (paperSheetEl) {
    const container = paperSheetEl.parentElement;
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const rotateY = -((x / rect.width) - 0.5) * 26; 
        const rotateX = ((y / rect.height) - 0.5) * 26; 
        
        paperSheetEl.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(10px)`;
    });
    
    container.addEventListener('mouseleave', () => {
        paperSheetEl.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
    });
}

// Fullscreen API toggle logic with cross-browser prefix support and secure context handling
const btnFullscreenToggle = document.getElementById('btnFullscreenToggle');
const btnFullscreenToggleMobile = document.getElementById('btnFullscreenToggleMobile');

function toggleFullscreen() {
    const docEl = document.documentElement;
    const isFullscreenActive = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

    if (!isFullscreenActive) {
        const requestMethod = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
        if (requestMethod) {
            requestMethod.call(docEl).catch(err => {
                console.warn("Native Fullscreen failed (likely blocked by HTTP non-secure context):", err);
                alert("Para activar la pantalla completa, Chrome requiere una conexión segura (HTTPS). \n\nSugerencia: Puedes agregar esta aplicación a la pantalla de inicio de tu teléfono (PWA) usando la opción 'Agregar a la pantalla principal' de tu navegador para que se abra siempre a pantalla completa sin barra de direcciones.");
            });
        } else {
            alert("Tu dispositivo o navegador no soporta la API de Pantalla Completa nativa.");
        }
    } else {
        const exitMethod = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
        if (exitMethod) {
            exitMethod.call(document);
        }
    }
}

function updateFullscreenIcons() {
    const isFullscreenActive = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    const icons = [btnFullscreenToggle?.querySelector('i'), btnFullscreenToggleMobile?.querySelector('i')];
    icons.forEach(icon => {
        if (icon) {
            if (isFullscreenActive) {
                icon.className = 'fa-solid fa-compress';
            } else {
                icon.className = 'fa-solid fa-expand';
            }
        }
    });
}

if (btnFullscreenToggle) btnFullscreenToggle.addEventListener('click', toggleFullscreen);
if (btnFullscreenToggleMobile) btnFullscreenToggleMobile.addEventListener('click', toggleFullscreen);

document.addEventListener('fullscreenchange', updateFullscreenIcons);
document.addEventListener('webkitfullscreenchange', updateFullscreenIcons);
document.addEventListener('mozfullscreenchange', updateFullscreenIcons);
document.addEventListener('MSFullscreenChange', updateFullscreenIcons);




