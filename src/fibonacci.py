"""
This module contains a function that calculates the Fibonacci sequence.
"""


def fibonacci(x: int) -> int:
    """
    Calculate the Fibonacci number at position x.

    Parameters:
    x (int): The position of the Fibonacci number to calculate.

    Returns:
    int: The Fibonacci number at position x.
    """
    if x <= 2:
        return 1
    return fibonacci(x - 1) + fibonacci(x - 2)
