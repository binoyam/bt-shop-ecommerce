from flask import Blueprint, jsonify, request
from flask_mysqldb import MySQL

get_products_bp = Blueprint("place_orders", __name__)

mysql = MySQL()


@get_products_bp.route("/api/products", methods=["GET"])
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
