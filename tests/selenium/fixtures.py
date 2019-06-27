import pytest

from .config import AppConfig
from .driver import ChromeDriverProcess, ElectronAppProcess, RemoteDriver
from .env import XvfbServer


@pytest.fixture(scope='module')
def app(request):
    headless = request.config.getoption('headless')
    if headless and AppConfig.PLATFORM_SYS == 'Linux':
        proc_xvfb = XvfbServer(42)
        proc_xvfb.start()

    proc_electron = ElectronAppProcess(AppConfig.DIR_PROJECT)
    proc_electron.start()

    proc_chrome = ChromeDriverProcess(AppConfig.CHROME_VERSION)
    proc_chrome.start()

    yield RemoteDriver.create(headless=headless)

    # teardown
    proc_chrome.stop()
    proc_electron.stop()
    if headless and AppConfig.PLATFORM_SYS == 'Linux':
        proc_xvfb.stop()
