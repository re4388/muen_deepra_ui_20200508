import os
import os.path as osp
from subprocess import Popen, check_call, CalledProcessError, DEVNULL
from shutil import copyfile, rmtree, which
from sys import platform as sys_platform
from sys import stdout
from getpass import getpass
import glob


def onerror(func, path, exc_info):
    """
    Error handler for ``shutil.rmtree``.

    If the error is due to an access error (read only file)
    it attempts to add write permission and then retries.

    If the error is for another reason it re-raises the error.

    Usage : ``shutil.rmtree(path, onerror=onerror)``

    ref: https://stackoverflow.com/questions/2656322
    """
    import stat
    if not os.access(path, os.W_OK):
        # Is the error an access error ?
        os.chmod(path, stat.S_IWUSR)
        func(path)
    else:
        raise


def query_yes_no(question, default='no'):
    valid = {'yes': True, 'y': True, 'no': False, 'n': False}
    prompt = ' [y/n] '

    import sys
    while True:
        stdout.write(question + prompt)
        choice = input().lower()
        if default is not None and choice == '':
            return valid[default]
        elif choice in valid:
            return valid[choice]
        else:
            stdout.write('Please respond with `yes` or `no` (or `y` or `n`).\n')


def main():
    git_user = input('Please enter your user name on Gitea: ')
    git_pwd = getpass('Please enter your password on Gitea: ')
    git_credential = '{}:{}'.format(git_user, git_pwd)
    install_in_dev_mode = query_yes_no('Install in development mode?')

    deepra_option = '--install-option=--mode={}'.format('dev' if install_in_dev_mode else 'dist')

    cwd = osp.normpath(osp.join(osp.dirname(__file__), '..'))
    wd_autodl = osp.join(cwd, 'autodl')
    wd_deepra = osp.join(cwd, 'deerpa')
    is_bash_available = 'win' not in sys_platform
    cmd_clean = 'rm -rf -y ./{}' if is_bash_available else 'echo y | rmdir /s .\{}'

    cmd_pairs = [
        # Install package `autodl`
        (('git clone http://{}@10.0.4.52:3000/muen/autodl.git '
         '--branch pre_release_api'.format(git_credential)), cwd, False),
        ('pip install .', osp.join(cwd, 'autodl'), False),
        (cmd_clean.format('autodl'), cwd, True),
        # Install package `deepra` (backend)
        (('git clone http://{}@10.0.4.52:3000/muen/deepra.git'
        .format(git_credential)), cwd, False),
        ('pip install . {}'.format(deepra_option), osp.join(cwd, 'deepra'), False),
        (cmd_clean.format('deepra'), cwd, True),
        # Install requirements of this project (`deepra_ui`)
        ('yarn install', cwd, True),
        ('python setup_api_protos.py --git_credential {}'.format(git_credential), osp.join(cwd, 'scripts'), False),
    ]

    if osp.exists(osp.join(cwd, 'deepra')):
        raise RuntimeError('Git repository `deepra` exists already, please remove it to continue.')

    # Check whether given gitea-credential is valid for accessing gitea
    try:
        cmd = 'git ls-remote http://{}@10.0.4.52:3000/muen/autodl.git'.format(git_credential)
        resp = check_call(cmd.split(), stderr=DEVNULL)
    except CalledProcessError as ex_call_error:
        ex_call_error.args[1].pop()  # avoid showing user credential from error message
        raise ValueError('Given git credential is invalid.') from ex_call_error

    for _cmd, _cwd, use_shell in cmd_pairs:
        curr_cmd = _cmd
        try:
            temp = curr_cmd if use_shell else curr_cmd.split()
            proc = Popen(temp, cwd=_cwd, shell=use_shell)
            proc.wait()
        except:
            print('--------- Failed to execute command: {}'.format(curr_cmd))
            raise

    print('----- Installation is complete -----')


if __name__ == '__main__':
    main()
