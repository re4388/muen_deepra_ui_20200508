import pytest
from pytest_bdd import scenario, given, when, then

from .fixtures import app
from .config import AppConfig
from .utils import time_sleep


@scenario('./features/example.feature', 'Go to project overview')
def test_redirect_to_project_overview():
    pass

@given('Application is launched')
def launch_app(app):
    app.get('http://localhost:8080/#')

@when('Project overview panel is scrolled down')
def scroll_down_project_overview_panel(app, request):
    el = app.find_elements_by_class_name('page-content')[0]
    prev_rect = el.rect

    # scroll down
    app.execute_script(
        'obj = document.getElementById(\'project-overview-panel\');'
        'obj.scrollTo(0, obj.scrollHeight);'
    )

    # bind variable to `request` fixture, so that status of current step
    # can be retrieved in next step
    request.cached_state = {
        'el': el,
        'prev_rect': prev_rect
    }

@then('Y position of page should be changed')
def check_page_y_position_is_changed(app, request):
    el = request.cached_state['el']
    prev_rect = request.cached_state['prev_rect']
    assert el.rect['y'] < prev_rect['y']


@scenario('./features/example.feature', 'Scroll down page of project overview')
def test_scroll_page_in_project_overview_panel():
    pass

@given('Page is redirected to project overview')
def redirect_page_to_project_overview(app):
    app.get('http://localhost:8080/#/project-overview')
    time_sleep()

@when('Project overview button is pressed')
def press_sidebar_button_project_overview(app):
    # find button with text 'My Projects' in sidebar menu
    elements = app.find_elements_by_class_name('vsm-title')
    el = next((v for v in elements if v.text == 'My Projects'), None)
    assert el is not None

    # click the button and make page to be redirected
    el.click()
    time_sleep()

@then('Page should be redirected to project overview')
def check_page_is_redirected_to_project_overview(app):
    assert app.find_element_by_id('project-overview-panel') is not None
