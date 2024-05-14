fn fibonacci(x: Int32) -> Int32:
    if x <= 2:
        return 1
    else:
        return fibonacci(x - 1) + fibonacci(x - 2)

fn main():