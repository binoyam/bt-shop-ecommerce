from flask import Flask
from flask_cors import CORS
from flask_mysqldb import MySQL
# user routes
from routes.auth import auth_bp
from routes.feedback import feedback_bp
from routes.get_products import get_products_bp
from routes.place_orders import place_orders_bp
# admin routes
from routes.admin_routes.users import users_bp
from routes.admin_routes.orders import orders_bp
from routes.admin_routes.products import products_bp

app = Flask(__name__)
mysql = MySQL()
CORS(app)
app.config["SECRET_KEY"] = "YOUR_SECRET_KEY"
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "flaskdatabase1"
app.config["MYSQL_PORT"] = 3306

mysql.init_app(app)
# user routes
app.register_blueprint(auth_bp)
app.register_blueprint(feedback_bp)
app.register_blueprint(get_products_bp)
app.register_blueprint(place_orders_bp)
# admin routes
app.register_blueprint(users_bp)
app.register_blueprint(orders_bp)
app.register_blueprint(products_bp)


if __name__ == "__main__":
    app.run(debug=True)
