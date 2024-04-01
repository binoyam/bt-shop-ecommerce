from flask import Blueprint
from flask_mysqldb import MySQL

remove_order_bp = Blueprint("remove_order", __name__)

mysql = MySQL()


@remove_order_bp.route("/api/orders/<int:order_id>", methods=["DELETE"])
def remove_order(order_id):
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM orders_table WHERE id = %s", (order_id,))
        mysql.connection.commit()

        cursor.close()
        return "Order removed successfully", 200
    except Exception as e:
        return str(e), 500
