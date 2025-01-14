# Node.js'in resmi ve hafif bir sürümünü kullan
FROM node:18-alpine

# Çalışma dizinini ayarla
WORKDIR /usr/src/app

# Proje dosyalarını kopyala
COPY . .

# wait-for-it.sh betiğini çalıştırılabilir hale getir
RUN chmod +x wait-for-it.sh

# Gerekli bağımlılıkları yükle
RUN npm install

# RabbitMQ bağlantısı kurulana kadar bekle ve ardından uygulamayı başlat
CMD ["sh", "-c", "./wait-for-it.sh rabbitmq:5672 -- npm start"]
