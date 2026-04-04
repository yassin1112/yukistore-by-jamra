// Load config first - Get webhook URL from config.js
let DISCORD_WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';

// Try to get webhook URL from window object (set by config.js)
function getWebhookURL() {
    // Wait a bit for config.js to load if it hasn't yet
    if (typeof window !== 'undefined') {
        // Check window object first (most reliable)
        if (window.DISCORD_WEBHOOK_URL) {
            return window.DISCORD_WEBHOOK_URL;
        }
        
        // Try again after a short delay (in case config.js is still loading)
        // This is handled in the async function calls
    }
    
    // Fallback: try to get from config if loaded
    if (typeof DISCORD_WEBHOOK_URL !== 'undefined' && DISCORD_WEBHOOK_URL !== 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
        return DISCORD_WEBHOOK_URL;
    }
    
    return 'YOUR_DISCORD_WEBHOOK_URL_HERE';
}

// Update webhook URL on load
if (typeof window !== 'undefined' && window.DISCORD_WEBHOOK_URL) {
    DISCORD_WEBHOOK_URL = window.DISCORD_WEBHOOK_URL;
} else {
    DISCORD_WEBHOOK_URL = getWebhookURL();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product-card, .package-card, .feature-card, .info-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Shopping Cart System
let shoppingCart = [];

// Function to add product to cart
function addToCart(product, packageName, price, productId) {
    const cartItem = {
        id: productId || Date.now(),
        product: product,
        package: packageName,
        price: parseInt(price) || 0
    };
    shoppingCart.push(cartItem);
    updateCartUI();
    showCartNotification();
}

// Function to remove product from cart
function removeFromCart(itemId) {
    const normalizedId = String(itemId);
    shoppingCart = shoppingCart.filter(item => String(item.id) !== normalizedId);
    updateCartUI();
}

// Function to update cart UI
function updateCartUI() {
    const cartIcon = document.getElementById('cartIcon');
    const cartCount = document.getElementById('cartCount');
    if (cartIcon && cartCount) {
        cartCount.textContent = shoppingCart.length;
        cartIcon.style.display = shoppingCart.length > 0 ? 'block' : 'none';
    }
    updateCartModal();
}

// Function to show cart notification
function showCartNotification() {
    // Create or update notification
    let notification = document.getElementById('cartNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cartNotification';
        notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: 15px 20px; border-radius: 8px; z-index: 10000; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
        document.body.appendChild(notification);
    }
    notification.textContent = `تمت إضافة المنتج إلى السلة (${shoppingCart.length})`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Function to update cart modal
function updateCartModal() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('cartTotalPrice');
    
    if (cartItemsContainer) {
        if (shoppingCart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: #999;">السلة فارغة</p>';
        } else {
            cartItemsContainer.innerHTML = shoppingCart.map((item, index) => `
                <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; margin-bottom: 10px;">
                    <div>
                        <strong>${item.package}</strong><br>
                        <small style="color: #666;">${item.product}</small><br>
                        <span style="color: #4CAF50; font-weight: bold;">${item.price.toLocaleString('ar-IQ')} دينار</span>
                    </div>
                    <button type="button" class="remove-cart-item" data-id="${item.id}" style="background: #f44336; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">حذف</button>
                </div>
            `).join('');
            
            // Add event listeners for remove buttons
            cartItemsContainer.querySelectorAll('.remove-cart-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    removeFromCart(this.getAttribute('data-id'));
                });
            });
        }
    }
    
    if (totalPriceElement) {
        const total = shoppingCart.reduce((sum, item) => sum + item.price, 0);
        totalPriceElement.textContent = total.toLocaleString('ar-IQ');
    }
}

// Payment Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('paymentModal');
    const closeModal = document.querySelector('.close-modal');
    const paymentForm = document.getElementById('paymentForm');
    
    // Debug: Check if elements exist
    console.log('Modal found:', !!modal);
    console.log('Payment form found:', !!paymentForm);
    console.log('Webhook URL:', window.DISCORD_WEBHOOK_URL ? 'Loaded ✓' : 'Not loaded ✗');
    
    // Use event delegation for dynamically loaded buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-purchase')) {
            e.preventDefault();
            
            const button = e.target;
            
            // Get product data from button attributes
            const product = button.getAttribute('data-product');
            const packageName = button.getAttribute('data-package');
            const price = button.getAttribute('data-price');
            const productId = button.getAttribute('data-id');
            
            // Add to cart instead of opening modal directly
            addToCart(product, packageName, price, productId);
        }
        
        // Handle cart icon click
        if (e.target.closest('#cartIcon') || e.target.closest('#cartCount')) {
            e.preventDefault();
            if (shoppingCart.length > 0) {
                if (modal) {
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            } else {
                alert('السلة فارغة');
            }
        }
    });
    
    // Close modal when X is clicked
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
                // Reset form when closing
                const form = document.getElementById('paymentForm');
                if (form) {
                    form.reset();
                    const previewContainer = document.getElementById('imagePreviewContainer');
                    if (previewContainer) {
                        previewContainer.innerHTML = '';
                    }
                }
            }
        });
    }
    
    // Handle image preview
    const imageInput = document.getElementById('asiaCardImages');
    const previewContainer = document.getElementById('imagePreviewContainer');
    let selectedImages = [];

    // Payment method -> update proof label/hint
    function updatePaymentProofText(paymentMethod) {
        if (!imageInput) return;

        const method = String(paymentMethod || 'asia-hawala').trim();
        const label = document.querySelector('label[for="asiaCardImages"]');
        const hint = imageInput.closest('.form-group')?.querySelector('.form-hint');

        if (method === 'mastercard') {
            if (label) label.textContent = 'صورة التحويل *';
            if (hint) hint.textContent = 'ارفع صورة التحويل (يمكنك رفع أكثر من صورة)';
        } else {
            if (label) label.textContent = 'صور كرت آسيا *';
            if (hint) hint.textContent = 'يمكنك رفع أكثر من صورة';
        }
    }

    const paymentMethodEl = document.getElementById('paymentMethod');
    if (paymentMethodEl) {
        updatePaymentProofText(paymentMethodEl.value);
        paymentMethodEl.addEventListener('change', () => updatePaymentProofText(paymentMethodEl.value));
    }
    
    if (imageInput && previewContainer) {
        imageInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            selectedImages = files;
            previewContainer.innerHTML = '';
            
            files.forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const previewItem = document.createElement('div');
                        previewItem.className = 'image-preview-item';
                        previewItem.setAttribute('data-file-index', index);
                        previewItem.innerHTML = `
                            <img src="${e.target.result}" alt="Preview ${index + 1}">
                            <button type="button" class="remove-image">&times;</button>
                        `;
                        previewContainer.appendChild(previewItem);
                        
                        // Remove image button
                        const removeBtn = previewItem.querySelector('.remove-image');
                        removeBtn.addEventListener('click', function() {
                            const itemIndex = parseInt(previewItem.getAttribute('data-file-index'));
                            selectedImages.splice(itemIndex, 1);
                            previewItem.remove();
                            // Update file input
                            const dt = new DataTransfer();
                            selectedImages.forEach(img => dt.items.add(img));
                            imageInput.files = dt.files;
                            // Re-render previews
                            if (selectedImages.length > 0) {
                                imageInput.dispatchEvent(new Event('change'));
                            } else {
                                previewContainer.innerHTML = '';
                            }
                        });
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }
    
    // Function to convert images to base64
    async function convertImagesToBase64(files) {
        const base64Images = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
                base64Images.push(base64);
            }
        }
        return base64Images;
    }

    // Function to generate Order ID
    function generateOrderID() {
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 12).toUpperCase();
        return `ORD-${timestamp}-${randomStr}`;
    }


    // Function to send data to Discord - using Webhook only
    async function sendToDiscord(formData, images) {
        // Use webhook only (bot is disabled)
        const webhookURL = window.DISCORD_WEBHOOK_URL || getWebhookURL();
        
        if (!webhookURL || webhookURL === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
            alert('⚠️ لم يتم إعداد رابط Discord\nيرجى التحقق من ملف config.js');
            return false;
        }

        // Check if axios is loaded
        if (typeof axios === 'undefined') {
            console.warn('axios not loaded, using fetch instead');
            return sendToDiscordWithFetch(formData, images);
        }

        try {
            // Get cart items
            const cartItems = Array.isArray(formData.products) ? formData.products : [];
            const product = String(formData.product || '').trim() || 'غير محدد';
            const packageName = String(formData.package || '').trim() || 'غير محدد';
            const price = String(formData.price || '').trim() || '0';
            const roblox = String(formData.robloxUsername || '').trim() || 'غير محدد';
            const whatsapp = String(formData.whatsapp || '').trim() || 'غير محدد';
            const imagesCount = Array.isArray(images) ? images.length : 0;
            const paymentMethodRaw = String(formData.paymentMethod || 'asia-hawala').trim();
            const paymentMethodLabel = paymentMethodRaw === 'mastercard' ? 'Mastercard' : 'Asia Hawala';
            const paymentReceiverInfo = paymentMethodRaw === 'mastercard' ? '7119763378' : 'غير محدد';
            
            // Generate Order ID
            const orderID = generateOrderID();
            
            // Format price with commas
            const priceNum = parseInt(String(price).replace(/[^\d]/g, '')) || 0;
            const priceFormatted = priceNum.toLocaleString('en-US') + ' IQD';

            // Build products list for embed
            let productsList = 'N/A';
            if (cartItems.length > 0) {
                productsList = cartItems.map((item, index) => 
                    `${index + 1}. ${item.package || item.product} - ${item.price.toLocaleString('en-US')} IQD`
                ).join('\n');
                // Limit to 1024 chars (Discord limit)
                if (productsList.length > 1024) {
                    productsList = productsList.substring(0, 1020) + '...';
                }
            }

            // Build embed fields matching the image format
            // Discord limits: field name max 256 chars, field value max 1024 chars
            const fields = [
                { name: '📦 Products', value: productsList, inline: false },
                { name: '📄 Order ID', value: orderID.substring(0, 1024), inline: true },
                { name: '📊 Quantity', value: cartItems.length.toString(), inline: true },
                { name: '💰 Total Price', value: priceFormatted.substring(0, 1024), inline: true },
                { name: '💳 Payment Method', value: paymentMethodLabel, inline: true },
                { name: '📱 WhatsApp Number', value: whatsapp.substring(0, 1024) || 'N/A', inline: true },
                { name: '🎯 Roblox Username', value: roblox.substring(0, 1024) || 'N/A', inline: true },
                { name: '💳 Payment Info', value: `Sender Number: ${whatsapp.substring(0, 1000)}\nReceiver: ${paymentReceiverInfo}`, inline: false }
            ];

            // Get product name for title
            const productTitle = cartItems.length > 0 ? 
                (cartItems.length === 1 ? cartItems[0].package || cartItems[0].product : `${cartItems.length} Products`) : 
                'Order';

            // Create embed matching the image format
            const embed = {
                title: `🛒 New Order - ${productTitle}`,
                color: 0x5865F2, // Discord blue color
                fields: fields,
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Yuku_Store Orders APP'
                }
            };

            // Validate embed structure
            if (!embed.fields || embed.fields.length === 0) {
                throw new Error('Embed fields are empty');
            }

            // Send with image if available using FormData
            if (imagesCount > 0 && images[0]) {
                const imgUrl = String(images[0]).trim();
                if (imgUrl.startsWith('data:image/')) {
                    // Convert base64 to blob
                    const base64Data = imgUrl.split(',')[1];
                    const mimeType = imgUrl.match(/data:image\/([^;]+)/)?.[1] || 'png';
                    const byteCharacters = atob(base64Data);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: `image/${mimeType}` });
                    
                    // Create FormData
                    const formData = new FormData();
                    formData.append('payload_json', JSON.stringify({
                        embeds: [embed]
                    }));
                    formData.append('files[0]', blob, `card-image.${mimeType}`);

                    // Send with FormData (axios will set Content-Type automatically with boundary)
                    const response = await axios.post(webhookURL, formData, {
                        headers: {
                            // Don't set Content-Type, let axios set it automatically with boundary
                        },
                        validateStatus: function (status) {
                            return status < 500;
                        }
                    });

                    if (response.status !== 200 && response.status !== 204) {
                        console.error('Discord Error:', response.status, response.data);
                        throw new Error(`خطأ ${response.status}: ${JSON.stringify(response.data).substring(0, 100)}`);
                    }
                } else {
                    // If image is already a URL, use it in embed
                    embed.thumbnail = { url: imgUrl };
                    const payload = { embeds: [embed] };
                    const response = await axios.post(webhookURL, payload, {
                        headers: { 'Content-Type': 'application/json' },
                        validateStatus: function (status) { return status < 500; }
                    });
                    if (response.status !== 200 && response.status !== 204) {
                        throw new Error(`خطأ ${response.status}: ${JSON.stringify(response.data).substring(0, 100)}`);
                    }
                }
            } else {
                // No images, send normally
                const payload = { embeds: [embed] };
                const response = await axios.post(webhookURL, payload, {
                    headers: { 'Content-Type': 'application/json' },
                    validateStatus: function (status) { return status < 500; }
                });
                if (response.status !== 200 && response.status !== 204) {
                    console.error('Discord Error:', response.status, response.data);
                    throw new Error(`خطأ ${response.status}: ${JSON.stringify(response.data).substring(0, 100)}`);
                }
            }

            // Send additional images separately if any
            if (imagesCount > 1) {
                for (let i = 1; i < imagesCount; i++) {
                    if (images[i]) {
                        try {
                            const imgUrl = String(images[i]).trim();
                            if (imgUrl.startsWith('data:image/')) {
                                const base64Data = imgUrl.split(',')[1];
                                const mimeType = imgUrl.match(/data:image\/([^;]+)/)?.[1] || 'png';
                                const byteCharacters = atob(base64Data);
                                const byteNumbers = new Array(byteCharacters.length);
                                for (let j = 0; j < byteCharacters.length; j++) {
                                    byteNumbers[j] = byteCharacters.charCodeAt(j);
                                }
                                const byteArray = new Uint8Array(byteNumbers);
                                const blob = new Blob([byteArray], { type: `image/${mimeType}` });
                                
                                const formData = new FormData();
                                formData.append('content', `📸 صورة كرت آسيا ${i + 1}`);
                                formData.append('files[0]', blob, `card-image-${i}.${mimeType}`);

                                await axios.post(webhookURL, formData, {
                                    headers: { 'Content-Type': 'multipart/form-data' }
                                });
                            }
                        } catch (e) {
                            console.warn('فشل إرسال الصورة', i + 1, e);
                        }
                    }
                }
            }

            return true;
        } catch (error) {
            console.error('Error sending to Discord:', error);
            const errorMsg = error.response ? 
                `خطأ ${error.response.status}: ${JSON.stringify(error.response.data).substring(0, 100)}` : 
                error.message;
            alert(`⚠️ حدث خطأ في إرسال الطلب:\n${errorMsg}\n\nيرجى المحاولة مرة أخرى أو التحقق من إعدادات Discord webhook.`);
            return false;
        }
    }

    // Function to send data to Discord Bot
    async function sendToDiscordBot(formData, images, apiUrl) {
        try {
            const payload = {
                product: String(formData.product || '').trim() || 'غير محدد',
                package: String(formData.package || '').trim() || 'غير محدد',
                price: String(formData.price || '').trim() || '0',
                robloxUsername: String(formData.robloxUsername || '').trim() || 'غير محدد',
                whatsapp: String(formData.whatsapp || '').trim() || 'غير محدد',
                telegram: String(formData.telegram || '').trim() || 'غير محدد',
                paymentMethod: String(formData.paymentMethod || 'asia-hawala').trim(),
                images: Array.isArray(images) ? images : []
            };

            // Use axios if available, otherwise use fetch
            let response;
            if (typeof axios !== 'undefined') {
                response = await axios.post(apiUrl, payload, {
                    headers: { 'Content-Type': 'application/json' },
                    validateStatus: function (status) {
                        return status < 500;
                    }
                });

                if (response.status !== 200) {
                    throw new Error(`خطأ ${response.status}: ${JSON.stringify(response.data).substring(0, 100)}`);
                }
            } else {
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(`خطأ ${response.status}: ${JSON.stringify(responseData).substring(0, 100)}`);
                }
            }

            return true;
        } catch (error) {
            console.error('Error sending to Discord Bot:', error);
            const errorMsg = error.response ? 
                `خطأ ${error.response.status}: ${JSON.stringify(error.response.data).substring(0, 100)}` : 
                error.message;
            
            // Check if it's a connection error
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                alert('⚠️ لا يمكن الاتصال بالسيرفر\nتأكد من أن البوت يعمل على: ' + apiUrl);
            } else {
                alert(`⚠️ حدث خطأ في إرسال الطلب:\n${errorMsg}\n\nتأكد من أن البوت يعمل بشكل صحيح.`);
            }
            return false;
        }
    }

    // Fallback function using fetch if axios is not available
    async function sendToDiscordWithFetch(formData, images) {
        const webhookURL = window.DISCORD_WEBHOOK_URL || getWebhookURL();
        
        try {
            // Get cart items
            const cartItems = Array.isArray(formData.products) ? formData.products : [];
            const product = String(formData.product || '').trim() || 'غير محدد';
            const packageName = String(formData.package || '').trim() || 'غير محدد';
            const price = String(formData.price || '').trim() || '0';
            const roblox = String(formData.robloxUsername || '').trim() || 'غير محدد';
            const whatsapp = String(formData.whatsapp || '').trim() || 'غير محدد';
            const imagesCount = Array.isArray(images) ? images.length : 0;
            const paymentMethodRaw = String(formData.paymentMethod || 'asia-hawala').trim();
            const paymentMethodLabel = paymentMethodRaw === 'mastercard' ? 'Mastercard' : 'Asia Hawala';
            const paymentReceiverInfo = paymentMethodRaw === 'mastercard' ? '7119763378' : 'غير محدد';
            
            // Generate Order ID
            const orderID = generateOrderID();
            
            // Format price with commas
            const priceNum = parseInt(String(price).replace(/[^\d]/g, '')) || 0;
            const priceFormatted = priceNum.toLocaleString('en-US') + ' IQD';
            
            // Build products list for embed
            let productsList = 'N/A';
            if (cartItems.length > 0) {
                productsList = cartItems.map((item, index) => 
                    `${index + 1}. ${item.package || item.product} - ${item.price.toLocaleString('en-US')} IQD`
                ).join('\n');
                // Limit to 1024 chars (Discord limit)
                if (productsList.length > 1024) {
                    productsList = productsList.substring(0, 1020) + '...';
                }
            }
            
            // Get product name for title
            const productTitle = cartItems.length > 0 ? 
                (cartItems.length === 1 ? cartItems[0].package || cartItems[0].product : `${cartItems.length} Products`) : 
                'Order';

            // Discord limits: field name max 256 chars, field value max 1024 chars
            const fields = [
                { name: '📦 Products', value: productsList, inline: false },
                { name: '📄 Order ID', value: orderID.substring(0, 1024), inline: true },
                { name: '📊 Quantity', value: cartItems.length.toString(), inline: true },
                { name: '💰 Total Price', value: priceFormatted.substring(0, 1024), inline: true },
                { name: '💳 Payment Method', value: paymentMethodLabel, inline: true },
                { name: '📱 WhatsApp Number', value: whatsapp.substring(0, 1024) || 'N/A', inline: true },
                { name: '🎯 Roblox Username', value: roblox.substring(0, 1024) || 'N/A', inline: true },
                { name: '💳 Payment Info', value: `Sender Number: ${whatsapp.substring(0, 1000)}\nReceiver: ${paymentReceiverInfo}`, inline: false }
            ];

            const embed = {
                title: `🛒 New Order - ${productTitle}`,
                color: 0x5865F2,
                fields: fields,
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Yuku_Store Orders APP'
                }
            };
            
            // Validate embed structure
            if (!embed.fields || embed.fields.length === 0) {
                throw new Error('Embed fields are empty');
            }

            // Send with image if available using FormData
            if (imagesCount > 0 && images[0]) {
                const imgUrl = String(images[0]).trim();
                if (imgUrl.startsWith('data:image/')) {
                    // Convert base64 to blob
                    const base64Data = imgUrl.split(',')[1];
                    const mimeType = imgUrl.match(/data:image\/([^;]+)/)?.[1] || 'png';
                    const byteCharacters = atob(base64Data);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: `image/${mimeType}` });
                    
                    // Create FormData
                    const formData = new FormData();
                    formData.append('payload_json', JSON.stringify({
                        embeds: [embed]
                    }));
                    formData.append('files[0]', blob, `card-image.${mimeType}`);

                    // Send with FormData
                    const response = await fetch(webhookURL, {
                        method: 'POST',
                        body: formData
                    });

                    const responseText = await response.text();
                    if (!response.ok) {
                        throw new Error(`خطأ ${response.status}: ${responseText.substring(0, 100)}`);
                    }
                } else {
                    // If image is already a URL, use it in embed
                    embed.thumbnail = { url: imgUrl };
                    const payload = { embeds: [embed] };
                    const response = await fetch(webhookURL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    const responseText = await response.text();
                    if (!response.ok) {
                        throw new Error(`خطأ ${response.status}: ${responseText.substring(0, 100)}`);
                    }
                }
            } else {
                // No images, send normally
                const payload = { embeds: [embed] };
                const response = await fetch(webhookURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const responseText = await response.text();
                if (!response.ok) {
                    throw new Error(`خطأ ${response.status}: ${responseText.substring(0, 100)}`);
                }
            }

            // Send additional images separately if any
            if (imagesCount > 1) {
                for (let i = 1; i < imagesCount; i++) {
                    if (images[i]) {
                        try {
                            const imgUrl = String(images[i]).trim();
                            if (imgUrl.startsWith('data:image/')) {
                                const base64Data = imgUrl.split(',')[1];
                                const mimeType = imgUrl.match(/data:image\/([^;]+)/)?.[1] || 'png';
                                const byteCharacters = atob(base64Data);
                                const byteNumbers = new Array(byteCharacters.length);
                                for (let j = 0; j < byteCharacters.length; j++) {
                                    byteNumbers[j] = byteCharacters.charCodeAt(j);
                                }
                                const byteArray = new Uint8Array(byteNumbers);
                                const blob = new Blob([byteArray], { type: `image/${mimeType}` });
                                
                                const formData = new FormData();
                                formData.append('content', `📸 صورة كرت آسيا ${i + 1}`);
                                formData.append('files[0]', blob, `card-image-${i}.${mimeType}`);

                                await fetch(webhookURL, {
                                    method: 'POST',
                                    body: formData
                                });
                            }
                        } catch (e) {
                            console.warn('فشل إرسال الصورة', i + 1, e);
                        }
                    }
                }
            }

            return true;
        } catch (error) {
            console.error('Error:', error);
            alert(`⚠️ حدث خطأ: ${error.message}`);
            return false;
        }
    }

    // Handle form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'جاري الإرسال...';
            
            // Get form data
            const imageInput = document.getElementById('asiaCardImages');
            const imageFiles = imageInput ? Array.from(imageInput.files) : [];
            
            // Convert images to base64
            const imagesBase64 = await convertImagesToBase64(imageFiles);
            
            // Get form data from shopping cart
            if (shoppingCart.length === 0) {
                alert('⚠️ السلة فارغة\nيرجى إضافة منتجات إلى السلة أولاً');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                return;
            }
            
            const robloxEl = document.getElementById('robloxUsername');
            const whatsappEl = document.getElementById('whatsapp');
            const telegramEl = document.getElementById('telegram');
            const paymentMethodEl = document.getElementById('paymentMethod');
            
            // Calculate total price from cart
            const totalPrice = shoppingCart.reduce((sum, item) => sum + item.price, 0);
            
            // Get all product names
            const allProducts = shoppingCart.map(item => item.package || item.product).join(', ');
            const allProductNames = shoppingCart.map(item => `${item.package} (${item.product})`).join('\n');
            
            const formData = {
                products: shoppingCart, // All cart items
                product: allProducts, // Combined product names
                package: allProductNames, // All packages with product names
                price: totalPrice.toString(),
                robloxUsername: robloxEl ? String(robloxEl.value || '').trim() : '',
                imagesCount: imageFiles.length,
                whatsapp: whatsappEl ? String(whatsappEl.value || '').trim() : '',
                telegram: telegramEl ? String(telegramEl.value || '').trim() : '',
                paymentMethod: paymentMethodEl ? String(paymentMethodEl.value || '').trim() : 'asia-hawala'
            };
            
            // Validate required fields
            if (!formData.robloxUsername) {
                alert('⚠️ يرجى إدخال اسم روبلوكس');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                return;
            }
            
            if (!formData.whatsapp) {
                alert('⚠️ يرجى إدخال رقم واتساب');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                return;
            }
            
            if (!formData.telegram) {
                alert('⚠️ يرجى إدخال اسم تيليجرام');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                return;
            }
            
            // Send to Discord
            const discordSuccess = await sendToDiscord(formData, imagesBase64);
            
            if (discordSuccess) {
                // Store order data in sessionStorage for success page
                sessionStorage.setItem('orderData', JSON.stringify(formData));
                
                // Clear shopping cart
                shoppingCart = [];
                updateCartUI();
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Close modal
                if (modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
                
                // Reset form
                this.reset();
                const previewContainer = document.getElementById('imagePreviewContainer');
                if (previewContainer) {
                    previewContainer.innerHTML = '';
                }
                
                // Redirect to success page
                window.location.href = 'checkout-success.html';
            } else {
                // Reset button on error
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }
    
    // Button click effects for other buttons
    document.querySelectorAll('.btn-primary, .btn-card').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn-purchase, .btn-primary, .btn-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

