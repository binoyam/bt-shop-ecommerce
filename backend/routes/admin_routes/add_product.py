from flask import Blueprint, jsonify, request
from flask_mysqldb import MySQL

add_product_bp = Blueprint("add_product", __name__)

mysql = MySQL()


@add_product_bp.route("/api/add_product", methods=["POST"])
def add_product():
    try:
        product = request.get_json()
        # Extract the product details from the request JSON
        # Example code:
        title = product.get("title")
        category = product.get("category")
        description = product.get("description")
        price = product.get("price")
        # ...

        # Perform the necessary logic to add the product to the database
        # Example code:
        # Your code to insert the product details into the database
        # ...

        # Return a JSON response indicating that the product was added successfully
        return jsonify({"productAdded": True})
    except Exception as e:
        # Handle the error case
        return jsonify({"error": str(e)}), 500