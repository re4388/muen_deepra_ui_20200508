from argparse import ArgumentParser
import os
import os.path as osp
from subprocess import Popen
from shutil import copyfile, rmtree
import glob


def parse_args():
    parser = ArgumentParser()
    parser.add_argument('--git_credential', type=str, default=None)
    return parser.parse_args()


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


def main(git_credential=None):
    cwd = osp.abspath(osp.join(osp.dirname(__file__), '..'))

    if git_credential is not None:
        cmd = 'git clone http://{}@10.0.4.52:3000/muen/deepra.git'.format(git_credential)
    else:
        cmd = 'git clone http://10.0.4.52:3000/muen/deepra.git'

    if osp.exists(osp.join(cwd, 'deepra')):
        raise RuntimeError('Git repository `deepra` exists already, please remove it to continue.')

    try:
        proc = Popen(cmd.split(), cwd=cwd)
        proc.wait()
    except:
        raise

    dir_src = osp.join(cwd, 'deepra', 'deepra', 'api', 'protos')
    dir_dst = osp.join(cwd, 'src', 'api', 'protos')

    if not osp.exists(dir_src):
        raise RuntimeError('Source directory does not exist, there might be something wrong...')

    if not osp.exists(dir_dst):
        os.makedirs(dir_dst)

    proto_files = glob.glob(osp.join(dir_src, '*.proto'))

    for f in proto_files:
        dst = osp.join(dir_dst, osp.basename(f))
        print('Copying file from {} to {}'.format(f, dst))
        copyfile(f, dst)

    print('--- removing files cloned from `deepra` ---')
    rmtree(osp.join(cwd, 'deepra'), onerror=onerror)

    print('--- DONE ---')


if __name__ == '__main__':
    args = parse_args()
    main(git_credential=args.git_credential)
