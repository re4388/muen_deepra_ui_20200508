import { shallowMount } from '@vue/test-utils';
import MetricDisplay from '../MetricsDisplay.vue';
import {JestEnvironment} from '@jest/environment';



describe('MetricDisplay.vue', () => {
	it('data: "anotationText" render properly', () => {
		const wrapper = shallowMount(MetricDisplay);

		// check if the html does render out the key part of this data
		expect(wrapper.text()).toContain('2 * Precision * Sensitivity / (Precision Sensitivity)');
	});

	it('communicate: recevide props "metricsData" and reder properly', () => {
		const metricsData = {
			foo: 'AUC 90 %'
		};
		const wrapper = shallowMount(MetricDisplay, {
			// stub fake props for real propsData
			propsData: {
				metricsData: {
					AUC: 0.9,
					F1score: 0.1,
					Precision: 0.1,
					Sensitivity: 0.1,
					Specificity: 0.1
				}
			}
		});
		expect(wrapper.text()).toContain(metricsData.foo);
	});

	it('computed: all computed field render properly under all_class', () => {
		const wrapper = shallowMount(MetricDisplay, {
			// stub fake props for real propsData
			propsData: {
				currentTab: 'all class'
			}
		});

		expect(wrapper.text()).toContain('Macro Sensitivity');
		expect(wrapper.text()).toContain('Macro Specificity');
		expect(wrapper.text()).toContain('Macro Precision');
		expect(wrapper.text()).toContain('Macro F1 Score');
		expect(wrapper.text()).toContain('Weighted AUC');
	});

	it('computed: all computed field render properly under other class', () => {
		const wrapper = shallowMount(MetricDisplay, {
			// stub fake props for real propsData
			propsData: {
				currentTab: 'other class'
			}
		});

		expect(wrapper.text()).toContain('Sensitivity');
		expect(wrapper.text()).toContain('Specificity');
		expect(wrapper.text()).toContain('Precision');
		expect(wrapper.text()).toContain('F1 Score');
		expect(wrapper.text()).toContain('AUC');
	});

	it('filter: numberFormater works properly', () => {
    const numberFormater = jest.fn()

		const wrapper = shallowMount(MetricDisplay, {

			propsData: {
				metricsData: {
					AUC: 0.9,
					F1score: 0.1,
					Precision: 0.1,
					Sensitivity: 0.1,
					Specificity: 0.1
				}
      },
      filters: {
        numberFormater
      }
    });

    expect(numberFormater).toHaveBeenCalled()
    expect(numberFormater).toHaveBeenCalledTimes(5)
    
	});
});
