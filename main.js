document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const placeholder = document.getElementById('placeholder');
    const preview = document.getElementById('image-preview');
    const previewWhite = document.getElementById('image-preview-white');
    const hud = document.getElementById('hud');
    const results = document.getElementById('results');
    const recProductImg = document.getElementById('rec-product-img');
    const markers = document.querySelectorAll('.marker');
    const btnDemo = document.getElementById('btn-demo');

    let isDemo = false;

    // Set initial product image
    recProductImg.src = 'products.png';

    btnDemo.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering dropZone click
        isDemo = true;
        
        placeholder.style.display = 'none';
        
        preview.src = 'room.png';
        preview.classList.add('camera-raw');
        preview.style.display = 'block';
        preview.style.opacity = '1';
        
        previewWhite.src = 'room_white.png';
        previewWhite.classList.remove('white-aesthetic'); // Demo has its own white render
        previewWhite.style.display = 'block';
        previewWhite.classList.remove('active');
        
        startScanning();
    });

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            isDemo = false;
            handleImage(file);
        }
    });

    function handleImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            placeholder.style.display = 'none';
            
            // Set original preview
            preview.src = e.target.result;
            preview.classList.remove('camera-raw');
            preview.style.display = 'block';
            preview.style.opacity = '1';
            
            // Set white preview with CSS filter
            previewWhite.src = e.target.result;
            previewWhite.classList.add('white-aesthetic');
            previewWhite.style.display = 'block';
            previewWhite.classList.remove('active');
            
            startScanning();
        };
        reader.readAsDataURL(file);
    }

    function startScanning() {
        hud.classList.add('active');
        results.style.display = 'none';
        
        // Hide markers initially
        markers.forEach(m => m.classList.remove('show'));

        // Simulate AI detection timing
        setTimeout(() => {
            document.getElementById('marker-1').classList.add('show');
        }, 1500);

        setTimeout(() => {
            document.getElementById('marker-2').classList.add('show');
        }, 3000);

        // Show results after scanning and convert to white aesthetic
        setTimeout(() => {
            hud.classList.remove('active');
            
            // Fade in the white aesthetic version
            previewWhite.classList.add('active');
            
            // Show result cards
            results.style.display = 'block';
            results.scrollIntoView({ behavior: 'smooth' });
        }, 5000);
    }

    // Drag and drop support
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--glade-yellow)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'var(--glass-border)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        isDemo = false;
        const file = e.dataTransfer.files[0];
        if (file) handleImage(file);
    });
});
