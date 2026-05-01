from math_utils import divide, get_user_name, calculate_total

def test_divide():
    assert divide(10, 0) is None

def test_user_name():
    assert get_user_name(None) == "UNKNOWN"

def test_total():
    assert calculate_total(100, 10) == 110