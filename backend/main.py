from flask import Flask
from flask_cors import CORS
from routes.users import users_bp
from routes.orders import orders_bp
from routes.products import products_bp
from routes.auth import auth_bp
from routes.feedback import feedback_bp
from routes.place_orders import place_orders_bp
from routes.get_products import get_products_bp

app = Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = "YOUR_SECRET_KEY"
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "flaskdatabase1"

app.register_blueprint(users_bp, url_prefix="/api/users")
app.register_blueprint(orders_bp, url_prefix="/api/orders")
app.register_blueprint(products_bp, url_prefix="/api/all_products")
app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(feedback_bp, url_prefix="/api")
app.register_blueprint(place_orders_bp, url_prefix="/api/place_orders")
app.register_blueprint(get_products_bp, url_prefix="/api/products")


if __name__ == "__main__":
    app.run(debug=True)
