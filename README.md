# StudyRPG
Make your study life to a RPG-Adventure

## Prerequisites
1. installed composer
2. installed npm
3. (recommended) mySQL-Database

## How to install
1. Clone this repository or download and extract it to your favorised folder.

2. Change into main directory containing "composer.json"

3. Install necessary php files with cmd-command:
```
composer install
```

4. Install necessary node_modules with cmd-command:
```
npm install
```

5. Start Database-Service and create Database with "studyrpg" utf8mb4_general_ci

6. Execute cmd-command to migrate tables
```
php artisan migrate:fresh
```

6.1 If you like to have your tables filled with example-data, use following cmd-command:
```
php artisan migrate:fresh --seed
```

7. You are finished now. Open your favorised WebBrowser and enter "localhost:8000"