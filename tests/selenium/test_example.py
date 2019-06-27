import time
import pytest

from .fixtures import app


def test_scroll_page(app):
    app.get('http://localhost:8080/#/project-overview')
    time.sleep(1)
    app.execute_script(
        'obj = document.getElementById(\'project-overview-panel\');'
        'obj.scrollTo(0, obj.scrollHeight);'
    )
    time.sleep(1)
    app.execute_script(
        'obj = document.getElementById(\'project-overview-panel\');'
        'obj.scrollTo(obj.scrollHeight, 0);'
    )
    time.sleep(1)


class TestPageNavigation:
    def test_nav_to_base_panel(self, app):
        app.get('http://localhost:8080/#')
        time.sleep(1)
        assert app.find_element_by_id('base-panel') is not None

    def test_nav_to_project_overview_panel(self, app):
        app.get('http://localhost:8080/#/project-overview')
        time.sleep(1)
        assert app.find_element_by_id('project-overview-panel') is not None

    @pytest.mark.skip(reason='some functionalities in training panel requires to '
    'interactive with grpc server, so that this test case is temporary skipped.')
    def test_nav_to_train_panel(self, app):
        app.get('http://localhost:8080/#/training')
        time.sleep(1)
        assert app.find_element_by_id('training-panel') is not None
