import os
import os.path as osp
from subprocess import Popen
from shutil import copyfile
import glob


def main(enable_gherkin=False):
    cwd = osp.abspath(osp.join(osp.dirname(__file__), '..'))
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


if __name__ == '__main__':
    main()
