import os
import time
from subprocess import Popen
from selenium import webdriver
from selenium.webdriver import chrome

from .config import AppConfig

__all__ = ['ChromeDriverProcess', 'ElectronAppProcess']


class ChromeDriverProcess(object):
    def __init__(self, version):
        exec_name = 'chromedriver' if AppConfig.PLATFORM_SYS == 'Linux' else 'chromedriver.exe'
        self.exec_path = os.path.join(AppConfig.DIR_BIN, 'chromedriver', version, exec_name)
        self.proc = None

    def start(self, timeout=1):
        if self.proc is not None:
            raise RuntimeError('Process has been opened.')

        cmd = '{}'.format(self.exec_path)
        try:
            self.proc = Popen(cmd.split())
        except:
            raise

        if timeout is not None:
            time.sleep(timeout)

    def stop(self, timeout=1):
        if self.proc is not None:
            self.proc.terminate()

        if timeout is not None:
            time.sleep(timeout)


class ElectronAppProcess(object):
    def __init__(self, project_path):
        self.project_path = os.path.realpath(project_path)
        self.proc = None

    def start(self, timeout=5):
        if self.proc is not None:
            raise RuntimeError('Process has been opened.')

        if self._is_port_available():
            return

        cmd = 'yarn run electron:headless'
        try:
            self.proc = Popen(cmd.split(), cwd=self.project_path)
        except:
            raise

        if timeout is not None:
            time.sleep(timeout)

    def stop(self, timeout=1):
        if self.proc is not None:
            self.proc.terminate()

        if timeout is not None:
            time.sleep(timeout)

    def _is_port_available(self):
        import socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex(('127.0.0.1', 8080))
        result = True if result == 0 else False
        sock.close()
        return result


class RemoteDriver(object):
    @classmethod
    def create(cls, command_executor='http://localhost:9515', chrome_options=None, headless=False):
        if chrome_options is None:
            chrome_options = chrome.options.Options()
            chrome_options.binary_location = AppConfig.APP_PATH
            if headless:
                chrome_options.add_argument('--whitelisted-ips')
                chrome_options.add_argument('--headless')
        elif not isinstance(chrome_options, chrome.options.Options):
            raise TypeError('Given `chrome_options` should be a instance of {}'.format(
                chrome.options.Options
            ))

        driver = webdriver.remote.webdriver.WebDriver(
            command_executor=command_executor,
            proxy=None,
            keep_alive=False,
            options=chrome_options
        )
        return driver
