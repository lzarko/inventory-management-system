# inventory-management-system
An inventory management system that lets users list, add, edit and delete inventory items.

## Getting Started with the Project

### Step 1: Clone the Repository

Open your GIT Bash <br/> git clone https://github.com/lzarko/inventory-management-system.git <br/> cd inventory-management-system



### Step 2: Set Up the Environment

Inside the .env file, there are placeholders which you need to populate with your database options and Django secret key <br/> For generating a secret key, what you can do is open a terminal and run 
```
import secrets
print(secrets.token_urlsafe())
```




### Step 3: Build and Start the Docker Containers

docker-compose up --build



### Step 4: Apply Migrations(if necessary)

docker-compose exec backend python manage.py migrate



### Step 5: Run the Application

Open your favorite browser and run http://localhost:3000
