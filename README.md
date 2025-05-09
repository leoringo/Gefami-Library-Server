# Gefami-Library-Server

Cara Menjalankan Proyek

1. Install dependencies 

    npm install

2. Buat database

    npx sequelize-cli db:create

3. Jalankan migrasi database

    npx sequelize-cli db:migrate

4. Seed data awal ke database

    npx sequelize-cli db:seed:all

5. Jalankan server

    npx nodemon app
 