import pandas as pd

customers_data = {
    'customer_id': [1, 2, 3],
    'first_name': ['John', 'Jane', 'Alice'],
    'last_name': ['Doe', 'Smith', 'Johnson'],
    'email': ['john.doe@example.com', 'jane.smith@example.com', 'alice.johnson@example.com']
}

products_data = {
    'product_id': [101, 102, 103],
    'product_name': ['Laptop', 'Smartphone', 'Tablet'],
    'price': [1200.00, 800.50, 400.75]
}

orders_data = {
    'order_id': [1001, 1002, 1003],
    'customer_id': [1, 2, 3],
    'order_date': ['2023-10-01', '2023-10-02', '2023-10-03']
}

order_items_data = {
    'order_item_id': [1, 2, 3, 4],
    'order_id': [1001, 1001, 1002, 1003],
    'product_id': [101, 102, 103, 101],
    'quantity': [1, 2, 1, 1]
}

customers_df = pd.DataFrame(customers_data)
products_df = pd.DataFrame(products_data)
order_items_df = pd.DataFrame(order_items_data)
orders_df = pd.DataFrame(orders_data)