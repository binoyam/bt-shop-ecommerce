from flask import Blueprint, jsonify, request
from flask_mysqldb import MySQL

rate_product_bp = Blueprint("rate_product", __name__)

mysql = MySQL()


@rate_product_bp.route("/api/rate_product", methods=["POST"])
def rate_product():
    data = request.json
    product_id = data.get("product_id")
    rating = data.get("rating")
    print(data)
    print(product_id)
    print(rating)
    try:
        cursor = mysql.connection.cursor()
        select_query = (
            "SELECT `rating.count`, `rating.rate` FROM products_table WHERE id = %s"
        )

        cursor.execute(
            select_query,
            (product_id,),
        )
        prevRating = cursor.fetchone()
        print(prevRating)
        prev_count = prevRating[0]
        prev_rating = prevRating[1]
        print(prev_count)
        print(prev_rating)

        new_count = prev_count + 1
        new_rating = (prev_rating * prev_count + rating) / new_count
        new_rating_rounded = round(new_rating, 1)
        print(new_count)
        print(new_rating)
        print(new_rating_rounded)

        update_query = "UPDATE products_table SET `rating.count` = %(new_count)s, `rating.rate` = %(new_rating_rounded)s WHERE id = %(product_id)s"
        cursor.execute(
            update_query,
            {
                "new_count": new_count,
                "new_rating_rounded": new_rating_rounded,
                "product_id": product_id,
            },
        )
        mysql.connection.commit()
        # check if updated correctly
        cursor.execute(select_query, {"product_id": product_id})
        updatedRating = cursor.fetchone()
        updated_count = updatedRating[0]
        updated_rating = updatedRating[1]
        print(updatedRating)
        cursor.close()

        if updated_rating == new_rating_rounded and updated_count == new_count:
            response = {"rateSubmited": True}
        else:
            response = {"rateSubmited": False}
        return jsonify(response)
    except Exception as e:
        return str(e), 500
