// Sayfa yüklendiğinde yapılacaklar
window.onload = function() {
    // Başlık animasyonu
    animateHeader();

    // Menü olayları
    setupMenu();

    // İletişim formu işlemleri
    setupContactForm();
};

// Başlık animasyonu
function animateHeader() {
    var header = document.querySelector('header');
    header.style.opacity = 0; // Başlangıçta görünmez

    // Opaklığı artırarak yavaşça göster
    var opacity = 0;
    var animation = setInterval(function() {
        if (opacity >= 1) {
            clearInterval(animation); // Animasyonu durdur
        } else {
            opacity += 0.01;
            header.style.opacity = opacity;
        }
    }, 10);
}

// Menü olayları
function setupMenu() {
    var menuToggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
}

// İletişim formu işlemleri
function setupContactForm() {
    var form = document.querySelector('#contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Sayfa yenilemeyi engelle

        // Form verilerini topla
        var formData = new FormData(form);

        // Form verilerini işle ve sunucuya gönder
        fetch('/submit-contact-form', {
            method: 'POST',
            body: formData
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(function(data) {
            // Sunucu yanıtını işle
            displayConfirmationMessage(data.message);
        })
        .catch(function(error) {
            // Hata durumunda işle
            console.error('There has been a problem with your fetch operation:', error);
        });
    });
}

// İletişim formu onay mesajı göster
function displayConfirmationMessage(message) {
    var confirmationMessage = document.querySelector('#confirmation-message');
    confirmationMessage.textContent = message;
    confirmationMessage.style.display = 'block';
}
