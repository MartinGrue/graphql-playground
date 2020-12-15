CREATE USER 'dev'@'%' identified with mysql_native_password by 'password';
GRANT ALL PRIVILEGES on *.* to 'dev'@'%' with grant option;