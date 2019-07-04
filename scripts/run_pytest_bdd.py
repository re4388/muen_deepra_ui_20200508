from argparse import ArgumentParser
import os.path as osp
from subprocess import Popen


def parse_args():
    parser = ArgumentParser()
    parser.add_argument('--show_scenario', action='store_true',
                        help='Show defined scenario')
    return parser.parse_args()


def main(enable_gherkin=False):
    cwd = osp.abspath(osp.join(osp.dirname(__file__), '..'))
    cmd = 'python -m pytest {gherkin_reporter} ./tests/ --headless {verbose}'.format(
        gherkin_reporter=('--gherkin-terminal-reporter' if enable_gherkin else ''),
        verbose=('-vv' if enable_gherkin else '')
    )

    try:
        proc = Popen(cmd.split(), cwd=cwd)
        proc.wait()
    except:
        raise


if __name__ == '__main__':
    args = parse_args()
    main(enable_gherkin=args.show_scenario)
