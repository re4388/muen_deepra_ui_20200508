from argparse import ArgumentParser
from urllib import request as urllib_request
import os
import platform
import shutil
import zipfile
from tqdm import tqdm

DOWNLOAD_DIR = os.path.abspath(os.path.dirname(__file__))
CHROME_DRIVER_VERSION = {
    '2.46': '2.46',
    '73': '73.0.3683.68',
    '74': '74.0.3729.6',
    '75': '75.0.3770.8',
}
CHROME_DRIVER_PLATFORM = {
    'linux': 'linux64',
    'windows': 'win32',
}
URL_CHROME_DRIVER = 'https://chromedriver.storage.googleapis.com/{version}/chromedriver_{platform}.zip'

DIR_HOME = os.path.expanduser('~')
DIR_BIN = os.path.join(DIR_HOME, 'bin')

DOC_SET_ENV = """
=================================================================
`chromedriver` has been moved to {dir_bin}, now you have to add it into the environment variables.

On Windows, open `cmd.exe` and enter the following command to open environment variable editor:

    > rundll32 sysdm.cpl,EditEnvironmentVariables

On Linux, you may need to make downloaded chromedriver be an executable by

    $ chmod +x ~/bin/chromedriver

"""


class TqdmUpTo(tqdm):
    def update_to(self, b=1, bsize=1, tsize=None):
        if tsize is not None:
            self.total = tsize
        self.update(b * bsize - self.n)


def parse_args():
    parser = ArgumentParser()
    parser.add_argument('-c', '--chrome_version', type=str, default='75',
                        help='Version of chromedriver to be installed')
    return parser.parse_args()


def get_platform_info():
    _sys = platform.system().lower()
    _nbit = platform.machine()[-2:]
    _platform = '{}-{}'.format(_sys, _nbit)
    return _platform


def download_file(url_target, fo):
    with TqdmUpTo(unit='B', unit_scale=True, unit_divisor=1024, miniters=1, ascii=True) as t:
        urllib_request.urlretrieve(
            url_target, filename=fo, reporthook=t.update_to, data=None
        )


def main(chrome_version):
    os_type = get_platform_info().split('-')[0]
    url_target = URL_CHROME_DRIVER.format(
        version=CHROME_DRIVER_VERSION[chrome_version],
        platform=CHROME_DRIVER_PLATFORM[os_type]
    )
    fo = os.path.join(DOWNLOAD_DIR, url_target.split('/')[-1])

    # Download file
    if not os.path.exists(fo):
        if not os.path.exists(DOWNLOAD_DIR):
            os.makedirs(DOWNLOAD_DIR)
        download_file(url_target, fo)
    else:
        print('File already exist in {}, step of download will be skipped.'.format(fo))

    # Extract file
    dir_extraction = os.path.join(DOWNLOAD_DIR, 'chorme_driver')
    print('Extracting files to {}'.format(dir_extraction))
    extracted = None
    with zipfile.ZipFile(fo, 'r') as zip_ref:
        zip_ref.extractall(path=dir_extraction)
        extracted = zip_ref.namelist()

    # Move files to `/usr/bin`
    dir_dst = os.path.join(DIR_BIN, 'chromedriver', chrome_version)
    if not os.path.exists(dir_dst):
        print('Directory {} does not exist, so that it will be created automatically.'.format(DIR_BIN))
        os.makedirs(dir_dst)

    for f in extracted:
        fn_src = os.path.join(dir_extraction, f)
        fn_dst = os.path.join(dir_dst, f)
        print('Moving {} to {}'.format(fn_src, fn_dst))
        shutil.move(fn_src, fn_dst)

    print(DOC_SET_ENV.format(dir_bin=DIR_BIN))


if __name__ == '__main__':
    args = parse_args()
    main(args.chrome_version)
