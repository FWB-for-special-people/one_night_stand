from rest_framework.pagination import PageNumberPagination


class LargePagination(PageNumberPagination):
    page_size = 200
    page_size_query_param = "item"
    max_page_size = 1000