from flask import Flask
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL
from flask.helpers import send_from_directory

# user routes
from routes.auth import auth_bp
from routes.feedback import feedback_bp
from routes.get_products import get_products_bp
from routes.place_orders import place_orders_bp
from routes.rate_product import rate_product_bp

# admin routes
from routes.admin_routes.users import users_bp
from routes.admin_routes.orders import orders_bp
from routes.admin_routes.products import products_bp
from routes.admin_routes.remove_order import remove_order_bp
from routes.admin_routes.remove_user import remove_user_bp
from routes.admin_routes.remove_product import remove_product_bp
from routes.admin_routes.add_product import add_product_bp

app = Flask(__name__, static_folder="../frontend/build", static_url_path="")
mysql = MySQL()
CORS(app)


@app.route("/api", methods=["GET"])
@cross_origin()
def index():
    return {"deployment": "first try"}

@app.route("/")
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


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
app.register_blueprint(rate_product_bp)
# admin routes
app.register_blueprint(users_bp)
app.register_blueprint(remove_user_bp)
app.register_blueprint(orders_bp)
app.register_blueprint(remove_order_bp)
app.register_blueprint(products_bp)
app.register_blueprint(remove_product_bp)
app.register_blueprint(add_product_bp)


if __name__ == "__main__":
    app.run()
