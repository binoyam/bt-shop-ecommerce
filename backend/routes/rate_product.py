from flask import Blueprint, jsonify, request
from flask_mysqldb import MySQL

rate_product_bp = Blueprint("rate_product", __name__)

mysql = MySQL()


@rate_product_bp.route("/api/rate_product", methods=["POST"])
def rate_product():
    rating = request.json.get("rating")
    product_id = request.json.get("product_id")
    print(rating)
    print(product_id)
    try:
        cursor = mysql.connection.cursor()

        # Select the row for the specific product
        cursor.execute(
            "SELECT `rating.count`, `rating.rate` FROM products_table WHERE id = %s",
            (product_id,),
        )
        result = cursor.fetchone()
        print(result)
        current_count = result[0]
        current_rating = result[1]
        print(current_count)
        print(current_rating)

        # Calculate the new rating count and average rating
        new_count = current_count + 1
        new_rating = (current_rating * current_count + rating) / new_count
        print(new_count)
        print(new_rating)
        # # Update the rating count and rating rate in the products table
        # cursor.execute(
        #     "UPDATE products SET rating_count = %s, rating_rate = %s WHERE product_id = %s",
        #     (new_count, new_rating, product_id),
        # )

        # # Insert the new rating for the specific product
        # cursor.execute(
        #     "INSERT INTO ratings (rating_rate, product_id) VALUES (%s, %s)",
        #     (rating["rate"], product_id),
        # )

        # mysql.connection.commit()
        # cursor.close()

        # response = {
        #     "current_rating": current_rating,
        #     "new_rating": rating["rate"],
        #     "average_rating": new_rating,
        # }
        response = {"isok": True}

        return jsonify(response), 200
    except Exception as e:
        return str(e), 500
