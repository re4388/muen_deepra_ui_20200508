from subprocess import Popen
import platform

__all__ = ['XvfbServer']


class XvfbServer(object):
    def __init__(self, display, screen=0, resolution=(1024, 768, 16)):
        self.display = display
        self.screen = screen
        self.resolution = resolution
        self.proc = None

    def start(self):
        if platform.system() != 'Linux':
            raise RuntimeError('Xvfb server is only available on Linux.')
        if self.proc is not None:
            raise RuntimeError('Process has been opened.')

        cmd = 'Xvfb :{} -screen {} {}'.format(
            display, screen, 'x'.join(map(str, resolution))
        )
        try:
            self.proc = Popen(cmd.split())
        except:
            raise

    def stop(self):
        if self.proc is not None:
            self.proc.terminate()
