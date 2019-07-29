import os
import os.path as osp
from subprocess import Popen, check_call, CalledProcessError
from shutil import copyfile, rmtree, which
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


def main():
    git_user = input('Please enter your user name on Gitea: ')
    git_pwd = getpass('Please enter your password on Gitea: ')
    git_credential = '{}:{}'.format(git_user, git_pwd)

    cwd = osp.normpath(osp.join(osp.dirname(__file__), '..'))
    wd_autodl = osp.join(cwd, 'autodl')
    wd_deepra = osp.join(cwd, 'deerpa')
    is_bash_available = which('rmdir') is None
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
        ('pip install .', osp.join(cwd, 'deepra'), False),
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
        resp = check_call(cmd.split())
    except CalledProcessError as ex_call_error:
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