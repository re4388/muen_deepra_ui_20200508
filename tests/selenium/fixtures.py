import pytest

from .config import AppConfig
from .driver import ChromeDriverProcess, ElectronAppProcess, RemoteDriver


@pytest.fixture(scope='module')
def app():
    proc_electron = ElectronAppProcess(AppConfig.DIR_PROJECT)
    proc_electron.start()
    proc_chrome = ChromeDriverProcess(AppConfig.CHROME_VERSION)
    proc_chrome.start()

    yield RemoteDriver.create()

    # teardown
    proc_chrome.stop()
    proc_electron.stop()
