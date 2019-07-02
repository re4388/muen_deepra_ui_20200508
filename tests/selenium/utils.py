import time

from .config import AppConfig

__all__ = ['time_sleep']


def time_sleep(intv=None):
    time.sleep(AppConfig.SELENIUM_EXECUTION_INTERVAL if intv is None else intv)
