import pytest
from pytest_bdd import scenario, given, when, then

from .fixtures import app
from .config import AppConfig
from .utils import time_sleep


@scenario('./features/page_navigation.feature', 'Go to project overview page')
def test_redirect_to_project_overview_page():
    pass

@given('Application is launched')
def launch_app(app):
    app.get('http://localhost:8080/#')

@when('Project overview button is pressed')
def press_project_overview_button(app):
    elements = app.find_elements_by_class_name('vsm-title')
    el = next((v for v in elements if v.text == 'My Projects'), None)
    assert el is not None
    el.click()
    time_sleep()

# TODO: write this by parameterized fixture
@then('Page should be redirected to project overview page')
def check_page_is_redirect_to_project_overview_page(app):
    assert app.find_element_by_id('project-overview-panel') is not None


@scenario('./features/page_navigation.feature', 'Go to model overview page')
def test_redirect_to_model_overview_page():
    pass

@when('Model overview button is pressed')
def press_model_overview_button(app):
    elements = app.find_elements_by_class_name('vsm-title')
    el = next((v for v in elements if v.text == 'My Models'), None)
    assert el is not None
    el.click()
    time_sleep()

@then('Page should be redirected to model overview page')
def check_page_is_redirect_to_model_overview_page(app):
    assert app.find_element_by_id('model-overview-panel') is not None


@scenario('./features/page_navigation.feature', 'Go to data import page')
def test_redirect_to_data_import_page():
    pass

@when('Temporary shortcut for data import page is triggered')
def directly_go_to_data_import_page(app):
    app.get('http://localhost:8080/#/import-data')

@then('Page should be redirected to data import page')
def check_page_is_redirect_to_data_import_page(app):
    assert app.find_element_by_id('data-import-panel') is not None


@scenario('./features/page_navigation.feature', 'Go to training page')
@pytest.mark.skip(reason='some functionalities in training panel requires to '
    'interactive with grpc server, so that this test case is temporary skipped.')
def test_redirect_to_training_page():
    pass

@when('Temporary shortcut for training page is triggered')
def directly_go_to_training_page(app):
    app.get('http://localhost:8080/#/training')

@then('Page should be redirected to training page')
def check_page_is_redirect_to_training_page(app):
    assert app.find_element_by_id('training-panel') is not None
