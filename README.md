# Langkah Deploy nodejs di Amazon Web Service
## Install Node JS
### Menggunakan Amazon Linux 2
* >yum install -y gcc-c++ make
* >curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash - 
* >yum install nodejs git -y
### Menggunakan Ubuntu
* >apt install -y g++ make npm
* >curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
* >apt install -y nodejs git npm
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
* >npm install dotenv --save
* >npm install ip
* >npm install pm2 -g -i
## Config Environment
1. Buat file .env pada folder aplikasi
2. Tambahkan kebutuhan untuk mengkoneksikan database seperti hostname, user, password, dan nama database seperti berikut :
 * >DB_HOST = YOUR ENDPOINT
 * >DB_USER = YOUR USERNAME
 * >DB_PASSWORD = YOUR PASSWORD
 * >DB_DATABASE = YOUR DATABASE
 * >NODE_ENV = production
## Config Database
1. Buat cluster database menggunakan RDS dari Amazon Aurora MySQL atau MySQL
2. Akses cluster database tersebut menggunakan tambahan software seperti HeidiSQL
3. Buat database dengan nama "barang"
4. Buat table menggunakan perintah berikut 
   * > CREATE TABLE IF NOT EXISTS `product` (
   * > `product_id` int(11) NOT NULL AUTO_INCREMENT,
   * > `product_name` varchar(200) DEFAULT NULL,
   * > `product_price` int(11) DEFAULT NULL,
   * > PRIMARY KEY (`product_id`)
   * > ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

5. Tambahkan data pada tabel product dengan perintah berikut :
  * > INSERT INTO `product` (`product_id`, `product_name`, `product_price`) VALUES
  * > (1, 'Product 1', 2000),
  * > (2, 'Product 2', 2000),
  * > (3, 'Product 3', 3000),
  * > (4, 'Product 4', 2000),
  * > (5, 'Product 5', 1500); 
## Untuk menjalankan program
* >npm run start
## Test Program
* >buka browser dan masukan ip anda dan portnya seperti berikut: localhost:8000
