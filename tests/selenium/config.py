import os
import platform

__all__ = ['AppConfig']


class AppConfig(object):
    PLATFORM_SYS = platform.system()
    DIR_HOME = os.path.expanduser('~')
    DIR_BIN = os.path.join(DIR_HOME, 'bin')

    THIS_DIR = os.path.dirname(os.path.abspath(__file__))
    DIR_PROJECT = os.path.join(THIS_DIR, '..', '..')
    DIR_PROJECT_SRC = os.path.join(DIR_PROJECT, 'src')

    _dist_os_dir = {
        'Windows': 'win-unpacked',
        'Linux': 'linux-unpacked',
    }
    _dist_exec = {
        'Windows': 'deepra_ui.exe',
        'Linux': 'deepra_ui',
    }
    DIST_OS_DIR = _dist_os_dir[PLATFORM_SYS]
    DIST_EXEC = _dist_exec[PLATFORM_SYS]

    DIST_PATH = os.path.join(DIR_PROJECT, 'dist_electron')
    BIN_ELECTRON = os.path.join(DIR_PROJECT, 'node_modules', '.bin', 'electron')
    APP_PATH = os.path.join(DIST_PATH, DIST_OS_DIR, DIST_EXEC)

    CHROME_VERSION = '73'
