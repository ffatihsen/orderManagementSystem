# E-Ticaret Sipariş Yönetim Sistemi

## Proje Tanımı
Bu proje, bir e-ticaret platformu için Sipariş Yönetim Sistemi oluşturmayı amaçlamaktadır. Sistemde kullanıcılar sipariş oluşturma, listeleme, iptal etme gibi işlemleri gerçekleştirebilir. Ayrıca sipariş oluştuğunda webhook tetiklenmesi, fatura işlemleri ve RabbitMQ ile mesaj işleme gibi özellikler içermektedir.

## Kullanılan Teknolojiler
- **Backend Framework:** Node.js, Express.js
- **Veritabanı:** MySQL, Sequelize ORM
- **Mesaj Kuyruğu:** RabbitMQ
- **Validasyon:** Joi
- **API Dökümantasyonu:** Swagger
- **Loglama:** Winston
- **Testler:** Jest, Supertest
- **Containerizasyon:** Docker, Docker Compose

## Proje Tasarımı

### Sistem Tasarımı ve Kullanılan Servisler
- **userService:** Kullanıcı kayıt ve işlemleri.
- **productService:** Ürün oluşturma, güncelleme ve silme.
- **orderService:** Sipariş oluşturma, listeleme ve iptal etme.
- **invoiceService:** Fatura oluşturma ve işlemleri.
- **notificationService:** Kullanıcılara e-posta gönderme.
- **mqConsumer:** RabbitMQ kuyruklarını dinleyerek ilgili servislere görev iletme.

### Veritabanı Tasarımı ve Veri Modeli
Projede, aşağıdaki özellikleri içeren bir MySQL veritabanı kullanılmıştır:
- Kullanıcı, ürün ve sipariş bilgilerinin şematik olarak modellenmesi.
- Sequelize CLI ile veri tabanı güncellemelerinin yönetimi.
- ERD (Entity-Relationship Diagram) ile tasarım.

### Fatura İşlemleri ve Hata Yönetimi
- **Fatura Oluşturma:** Siparişe bağlı olarak otomatik fatura oluşturulur.
- **Global Error Handler:** Hatalar merkezi bir yapı ile ele alınır ve loglanır.

### Test Stratejileri
- **Birim Testleri:** Jest kullanılarak, her bir fonksiyonun doğru çalıştığı test edilmiştir.
- **Entegrasyon Testleri:** Supertest ile API sonuçlarının doğruluğu kontrol edilmiştir.
- Test kapsamı, kritik fonksiyonlara öncelik verilerek genişletilmiştir.

### Performans ve Ölçeklenebilirlik
- RabbitMQ ile asenkron işlemler desteklenmiştir.
- Sistem yatay ölçeklenebilirlik için tasarlanmıştır.

## Proje Kurulumu

### Docker Compose ile Çalıştırma
1. **Gereksinimler:**
   - Docker ve Docker Compose yüklenmiş olmalı.
2. **Kurulum Adımları:**
   - Depoyu klonlayın:
     ```bash
     git clone https://github.com/ffatihsen/orderManagementSystem.git
     cd orderManagementSystem
     ```
   - Docker Compose ile uygulamayı çalıştırın:
     ```bash
     docker-compose up --build
     ```
3. **API Dökümantasyonu:**
   Her bir servis için Swagger arayüzü sunulmaktadır. Aşağıdaki adreslerden ilgili servisin dökümantasyonuna ulaşabilirsiniz:
   
   - **userService:** `http://localhost:8080/api-docs`
   - **productService:** `http://localhost:8081/api-docs`
   - **orderService:** `http://localhost:8082/api-docs` 
   - **invoiceService:** `http://localhost:8083/api-docs` 
   - **notificationService:** `http://localhost:8084/api-docs` 

## API Dökümantasyonları
API endpoint detayları Swagger arayüzünde yer almaktadır. Başlıca endpointler:

- **POST /orders:** Yeni sipariş oluşturur.
- **GET /orders:** Kullanıcının siparişlerini listeler.
- **DELETE /orders/:id:** Belirtilen siparişi iptal eder.



## Loglama ve Monitoring
- **Loglama:**
  - Winston ile JSON formatında loglar tutulmuştur.

## Katkı
Proje ile ilgili görüş, öneri veya hata bildirimlerinizi [Issue](https://github.com/ffatihsen/orderManagementSystem/issues) sekmesinden yapabilirsiniz.

