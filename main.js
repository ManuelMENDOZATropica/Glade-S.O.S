document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const placeholder = document.getElementById('placeholder');
    const preview = document.getElementById('image-preview');
    const hud = document.getElementById('hud');
    const results = document.getElementById('results');
    const recProductImg = document.getElementById('rec-product-img');
    const markers = document.querySelectorAll('.marker');
    const btnDemo = document.getElementById('btn-demo');

    // Set initial product image
    recProductImg.src = 'product.png';

    btnDemo.addEventListener('click', () => {
        placeholder.style.display = 'none';
        preview.src = 'room.png';
        preview.style.display = 'block';
        startScanning();
    });

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImage(file);
        }
    });

    function handleImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Hide placeholder and show preview
            placeholder.style.display = 'none';
            preview.src = e.target.result;
            preview.style.display = 'block';
            
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

        // Show results after scanning
        setTimeout(() => {
            hud.classList.remove('active');
            results.style.display = 'block';
            results.scrollIntoView({ behavior: 'smooth' });
            
            // Add a subtle success pulse to the product card
            document.querySelector('.product-card').classList.add('fadeInUp');
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
        const file = e.dataTransfer.files[0];
        if (file) handleImage(file);
    });
});
