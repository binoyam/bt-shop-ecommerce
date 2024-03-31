# from flask import Flask, jsonify, request
# from flask_mysqldb import MySQL
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)
# app.config["SECRET_KEY"] = "YOUR_SECRET_KEY"
# app.config["MYSQL_HOST"] = "localhost"
# app.config["MYSQL_USER"] = "root"
# app.config["MYSQL_PASSWORD"] = ""
# app.config["MYSQL_DB"] = "flaskdatabase1"

# mysql = MySQL(app)


# @app.route("/api/users")
# def get_users():
#     cursor = mysql.connection.cursor()
#     cursor.execute("SELECT * FROM users_table")
#     users = convert_to_objects(cursor)
#     cursor.close()
#     return jsonify(users)


# @app.route("/api/orders")
# def get_orders():
#     cursor = mysql.connection.cursor()
#     cursor.execute("SELECT * FROM orders_table")
#     orders = convert_to_objects(cursor)
#     cursor.close()
#     print(orders)
#     return orders


# @app.route("/api/all_products")
# def get_all_products():
#     cursor = mysql.connection.cursor()
#     cursor.execute("SELECT * FROM products_table")
#     products = convert_to_objects(cursor)
#     cursor.close()
#     return jsonify(products)

# def convert_to_objects(cursor):
#     # Get column names
#     columns = [column[0] for column in cursor.description]
#     # Fetch all rows
#     rows = cursor.fetchall()
#     # Convert rows to objects
#     objects = [dict(zip(columns, row)) for row in rows]
#     return objects

# @app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"


# login user
# @app.route("/api/login", methods=["POST"])
# def login():
#     username = request.json.get("username")
#     password = request.json.get("password")

#     cursor = mysql.connection.cursor()
#     cursor.execute(
#         "SELECT * FROM users_table WHERE name = %s AND password = %s",
#         (username, password),
#     )
#     account = cursor.fetchone()

#     if account:
#         customer_id = account[0]
#         customer_name = account[1]
#         customer_email = account[2]
#         is_admin = account[6]

#         if is_admin:
#             response_data = {
#                 "loginSuccess": "true",
#                 "customerId": customer_id,
#                 "customerName": customer_name,
#                 "customerEmail": customer_email,
#                 "isAdmin": True,
#             }
#         else:
#             response_data = {
#                 "loginSuccess": "true",
#                 "customerId": customer_id,
#                 "customerName": customer_name,
#                 "customerEmail": customer_email,
#                 "isAdmin": False,
#             }

#     else:
#         response_data = {"loginSuccess": "false"}

#     return jsonify(response_data)


# # signup new user
# @app.route("/api/signup", methods=["POST"])
# def signup():
#     signup_data = request.json
#     cursor = mysql.connection.cursor()
#     cursor.execute(
#         "SELECT * FROM users_table WHERE email = %s", (signup_data["email"],)
#     )
#     existing_user = cursor.fetchone()
#     if existing_user:
#         response_data = {
#             "signupSuccess": "false1",
#             "message": "Email already registered",
#         }
#     else:
#         query = "INSERT INTO users_table (name, email, password, gender, phoneNumber) VALUES (%s, %s, %s, %s, %s)"
#         values = (
#             signup_data["username"],
#             signup_data["email"],
#             signup_data["password"],
#             signup_data["gender"],
#             signup_data["phoneNumber"],
#         )
#         cursor.execute(query, values)
#         mysql.connection.commit()
#         cursor.execute(
#             "SELECT * FROM users_table WHERE name = %s AND password = %s",
#             (signup_data["username"], signup_data["password"]),
#         )
#         account = cursor.fetchone()
#         if account:
#             customer_id = account[0]
#             customer_name = account[1]
#             customer_email = account[2]
#             response_data = {
#                 "signupSuccess": "true",
#                 "customerId": customer_id,
#                 "customerName": customer_name,
#                 "customerEmail": customer_email,
#             }

#         else:
#             response_data = {"signupSuccess": "false"}
#     cursor.close()

#     return jsonify(response_data)


# fetch all products
# @app.route("/api/products", methods=["GET"])
# def get_products():
#     cursor = mysql.connection.cursor()
#     cursor.execute("SELECT * FROM products_table")
#     columns = [column[0] for column in cursor.description]  # Retrieve column names
#     products = []
#     for row in cursor.fetchall():
#         product = {}
#         for i, column in enumerate(columns):
#             product[column] = row[i]
#         products.append(product)
#     cursor.close()
#     # print(products)
#     return jsonify(products)


# customer order placement
# @app.route("/api/place_order", methods=["POST"])
# def place_order():
#     data = request.json
#     print("data", data)
#     customer_data = data.get("customerData")
#     products_list = data.get("cartItemData")
#     print("products_list", products_list)
#     customer_id = customer_data.get("customerId")
#     customer_name = customer_data.get("customerName")
#     customer_email = customer_data.get("customerEmail")

#     insert_orders(customer_id, customer_name, customer_email, products_list)
#     order_items = fetch_orders(customer_id)
#     merged_items = merge_duplicates(order_items)
#     print("merged_items", merged_items)

#     if merged_items:
#         response_data = {
#             "isOrderPlaced": "true",
#             "orderedItems": merged_items,
#         }
#     else:
#         response_data = {
#             "isOrderPlaced": "false",
#         }
#     return jsonify(response_data)


# def merge_duplicates(order_items):
#     merged_items = {}
#     for item in order_items:
#         product_id = item["productId"]
#         quantity = item["quantity"]
#         if product_id in merged_items:
#             merged_items[product_id]["quantity"] += quantity
#         else:
#             merged_items[product_id] = item

#     merged_order_items = list(merged_items.values())
#     return merged_order_items


# def insert_orders(customer_id, customer_name, customer_email, products_list):
#     cursor = mysql.connection.cursor()

#     for product in products_list:
#         product_id = product.get("productId")
#         quantity = product.get("quantity")
#         product_name = product.get("title")
#         product_price = product.get("price")

#         cursor.execute(
#             "INSERT INTO orders_table (user_id, user_name, user_email, product_id, product_name, price, quantity) VALUES (%s, %s, %s, %s, %s, %s, %s)",
#             (
#                 customer_id,
#                 customer_name,
#                 customer_email,
#                 product_id,
#                 product_name,
#                 product_price,
#                 quantity,
#             ),
#         )

#         mysql.connection.commit()


# def fetch_orders(customer_id):
#     cursor = mysql.connection.cursor()

#     cursor.execute(
#         "SELECT * FROM orders_table WHERE user_id = %s",
#         (customer_id,),
#     )

#     order_items = []
#     orders_list = cursor.fetchall()
#     for order in orders_list:
#         order_id = order[0]
#         user_id = order[1]
#         user_name = order[2]
#         user_email = order[3]
#         product_id = order[4]
#         product_name = order[5]
#         price = order[6]
#         quantity = order[7]
#         order_items.append(
#             {
#                 "orderId": order_id,
#                 "userId": user_id,
#                 "userName": user_name,
#                 "userEmail": user_email,
#                 "productId": product_id,
#                 "productName": product_name,
#                 "price": price,
#                 "quantity": quantity,
#             }
#         )

#     return order_items


# # customer feedback form
# @app.route("/api/contact", methods=["POST"])
# def handle_contact_form():
#     data = request.json
#     print(data)
#     name = data.get("name")
#     email = data.get("email")
#     message = data.get("message")

#     cur = mysql.connection.cursor()

#     cur.execute(
#         "INSERT INTO feedback_table (name, email, message) VALUES (%s, %s, %s)",
#         (name, email, message),
#     )

#     mysql.connection.commit()
#     cur.close()
#     response_data = {
#         "feedbackSubmitted": "true",
#     }
#     return jsonify(response_data)


# if __name__ == "__main__":
#     app.run(debug=True)
