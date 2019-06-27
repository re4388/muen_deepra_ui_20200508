
def pytest_addoption(parser):
    parser.addoption('--headless', action='store_true', dest='headless')
