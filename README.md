# Langkah Deploy nodejs di Amazon Web Service
## Install Node JS
* >yum install gcc-c++ make -y
* >curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash - 
* >yum install nodejs git -y
## Cek versi NodeJS dan NPM
* >node -v
* >npm -v
## Install Embedded Javascript Template (EJS) 
* >npm install ejs
## Install Framework Express untuk aplikasi
* >npm install express --save
## Install Dependency
* >npm install --save express mysql body-parser hbs --save
* >npm install express-flash --save
* >npm install express-session --save
* >npm install method-override --save
* >npm install mysql --save
## NPM Config
* >npm init
## Config Database
1. Buka file index.js
2. Tambahkan kebutuhan untuk mengkoneksikan database seperti hostname, user, password, dan nama database seperti berikut :
  * >host : 'endpoint dari database'
  * >user : 'username yang dibuat'
  * >password : 'password yang dibuat'
  * >database : 'nama database'

## Untuk menjalankan program
* >node index // menjalankan program node js yang diambil dari file index.js
