import os

__all__ = ['AppConfig']


class AppConfig(object):
    DIR_HOME = os.path.expanduser('~')
    DIR_BIN = os.path.join(DIR_HOME, 'bin')

    THIS_DIR = os.path.dirname(os.path.abspath(__file__))
    DIR_PROJECT = os.path.join(THIS_DIR, '../..')

    DIR_PROJECT_SRC = os.path.join(DIR_PROJECT, './src')
    BIN_ELECTRON = os.path.join(DIR_PROJECT, './node_modules/.bin/electron')
    APP_PATH = os.path.join(DIR_PROJECT, './dist_electron/win-unpacked/deepra_ui.exe')

    CHROME_VERSION = '73'
