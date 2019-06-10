from argparse import ArgumentParser
from selenium import webdriver
from selenium.webdriver import chrome
import os
import time
from subprocess import Popen


DIR_HOME = os.path.expanduser('~')
DIR_BIN = os.path.join(DIR_HOME, 'bin')
FN_CHROME_DRIVER = os.path.join(DIR_BIN, 'chromedriver.exe')

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
BIN_ELECTRON = os.path.join(THIS_DIR, '../node_modules/.bin/electron')
DIR_PROJECT = os.path.join(THIS_DIR, '../src')
APP_PATH = os.path.join(THIS_DIR, '../dist_electron/win-unpacked/deepra_ui.exe')


def parse_args():
    parser = ArgumentParser()
    parser.add_argument('entry', type=str,
                        help='Function entry')
    parser.add_argument('-c', '--chrome_version', type=str, default='75',
                        help='Version of chrome driver to be used')
    return parser.parse_args()


class ChromeDriver(object):
    def __init__(self, version):
        HOME = os.path.expanduser('~')
        self.exec_path = os.path.join(HOME, 'bin', 'chromedriver', version, 'chromedriver.exe')
        self.proc = None

    def start(self, timeout=1):
        if self.proc is not None:
            raise RuntimeError('Process has been opened.')

        cmd = '{}'.format(self.exec_path)
        try:
            self.proc = Popen(cmd)
        except:
            raise

        if timeout is not None:
            time.sleep(timeout)

    def stop(self, timeout=1):
        if self.proc is not None:
            self.proc.terminate()

        if timeout is not None:
            time.sleep(timeout)


def main_open_chrome():
    driver = webdriver.Chrome(FN_CHROME_DRIVER)
    driver.get('https://www.google.com')
    time.sleep(5)
    driver.quit()


def run_test_on_dist(chrome_version):
    # ref: https://electronjs.org/docs/tutorial/using-selenium-and-webdriver

    chrome_driver = ChromeDriver(chrome_version)
    chrome_driver.start()

    chrome_options = chrome.options.Options()
    chrome_options.binary_location = os.path.abspath(os.path.abspath(APP_PATH))
    chrome_options.add_argument(os.path.abspath(DIR_PROJECT))

    capabilities = {
        'chromeOptions': {'binary': os.path.abspath(APP_PATH)}
    }

    remote_app = webdriver.remote.webdriver.WebDriver(
        command_executor='http://localhost:9515',
        # desired_capabilities=capabilities,  # does not work correctly with chrome 75
        proxy=None,
        keep_alive=False,
        options=chrome_options
    )
    time.sleep(1)

    # For demonstration
    remote_app.get('http://localhost:8080/#/project-overview')
    time.sleep(1)
    remote_app.execute_script(
        'obj = document.getElementById(\'project-overview-panel\');'
        'obj.scrollTo(0, obj.scrollHeight);'
    )
    time.sleep(1)
    remote_app.execute_script(
        'obj = document.getElementById(\'project-overview-panel\');'
        'obj.scrollTo(obj.scrollHeight, 0);'
    )
    time.sleep(1)

    remote_app.quit()
    chrome_driver.stop()


def run_test_on_dev(chrome_version):
    chrome_driver = ChromeDriver(chrome_version)
    chrome_driver.start()

    driver = webdriver.Chrome(chrome_driver.exec_path)
    driver.get('http://localhost:8080')
    time.sleep(1)

    # For demonstration
    driver.get('http://localhost:8080/#/project-overview')
    time.sleep(1)
    driver.execute_script(
        'obj = document.getElementById(\'project-overview-panel\');'
        'obj.scrollTo(0, obj.scrollHeight);'
    )
    time.sleep(1)
    driver.execute_script(
        'obj = document.getElementById(\'project-overview-panel\');'
        'obj.scrollTo(obj.scrollHeight, 0);'
    )
    time.sleep(1)

    driver.quit()
    chrome_driver.stop()


def main_chrome():
    options = webdriver.ChromeOptions()
    options.binary_location = '../dist_electron/win-unpacked/deepra_ui.exe'
    browser = webdriver.Chrome(FN_CHROME_DRIVER, options=options)
    browser.quit()


FUNC_ENTRY = {
    'dist': run_test_on_dist,
    'dev': run_test_on_dev,
}

if __name__ == '__main__':
    args = parse_args()
    FUNC_ENTRY[args.entry](args.chrome_version)
