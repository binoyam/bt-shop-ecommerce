from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = "YOUR_SECRET_KEY"
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "flaskdatabase1"

mysql = MySQL(app)


@app.route("/hi")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/api/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    cursor = mysql.connection.cursor()
    cursor.execute(
        "SELECT * FROM users_table WHERE name = %s AND password = %s",
        (username, password),
    )
    account = cursor.fetchone()

    if account:
        customer_id = account[0]
        customer_name = account[1]
        customer_email = account[2]

        response_data = {
            "loginSuccess": "true",
            "customerId": customer_id,
            "customerName": customer_name,
            "customerEmail": customer_email,
        }

    else:
        response_data = {"loginSuccess": "false"}

    return jsonify(response_data)


@app.route("/api/signup", methods=["POST"])
def signup():
    signup_data = request.json
    cursor = mysql.connection.cursor()
    query = "INSERT INTO users_table (name, email, password, gender, phoneNumber) VALUES (%s, %s, %s, %s, %s)"
    values = (
        signup_data["username"],
        signup_data["email"],
        signup_data["password"],
        signup_data["gender"],
        signup_data["phoneNumber"],
    )
    cursor.execute(query, values)
    mysql.connection.commit()
    cursor.execute(
        "SELECT * FROM users_table WHERE name = %s AND password = %s",
        (signup_data["username"], signup_data["password"]),
    )
    account = cursor.fetchone()
    if account:
        customer_id = account[0]
        customer_name = account[1]
        customer_email = account[2]
        response_data = {
            "signupSuccess": "true",
            "customerId": customer_id,
            "customerName": customer_name,
            "customerEmail": customer_email,
        }

    else:
        response_data = {"signupSuccess": "false"}

    return jsonify(response_data)


@app.route("/api/products", methods=["GET"])
def get_products():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM products_table")
    columns = [column[0] for column in cursor.description]  # Retrieve column names
    products = []
    for row in cursor.fetchall():
        product = {}
        for i, column in enumerate(columns):
            product[column] = row[i]
        products.append(product)
    cursor.close()
    # print(products)
    return jsonify(products)


@app.route("/place_order", methods=["POST"])
def place_order():
    data = request.json
    customer_data = data.get("customerData")
    customer_id = customer_data.get("customerId")
    customer_name = customer_data.get("customerName")
    customer_email = customer_data.get("customerEmail")
    product_data = data.get("cartItemData")
    cursor = mysql.connection.cursor()
    cursor.execute(
        "INSERT INTO orders_table (user_id, user_name, user_email) VALUES (%s, %s, %s)",
        (customer_id, customer_name, customer_email),
    )
    order_id = cursor.lastrowid
    for product in product_data:
        product_id = product.get("productId")
        quantity = product.get("quantity")

        cursor.execute(
            "INSERT INTO order_items_table (order_id, product_id, quantity) VALUES (%s, %s, %s)",
            (order_id, product_id, quantity),
        )
    mysql.connection.commit()
    cursor.execute(
        "SELECT * FROM order_items_table WHERE order_id = %s",
        (order_id,),
    )
    order_items = []
    orders_list = cursor.fetchall()
    for order in orders_list:
        product_id = order[2]
        quantity = order[3]
        order_items.append(
            {
                "productId": product_id,
                "quantity": quantity,
            }
        )

    if orders_list:
        response_data = {
            "isOrderPlaced": "true",
            "orderedItems": order_items,
        }
    else:
        response_data = {
            "isOrderPlaced": "false",
        }
    return jsonify(response_data)


@app.route("/contact", methods=["POST"])
def handle_contact_form():
    data = request.json
    print(data)
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    cur = mysql.connection.cursor()

    cur.execute(
        "INSERT INTO feedback_table (name, email, message) VALUES (%s, %s, %s)",
        (name, email, message),
    )

    mysql.connection.commit()
    cur.close()
    response_data = {
        "feedbackSubmitted": "true",
    }
    return jsonify(response_data)


if __name__ == "__main__":
    app.run(debug=True)
