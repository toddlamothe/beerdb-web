import {spinnerService} from './spinnerService';

beforeEach(() => {
  const spinner1 = {
    name: "spinner1",
    show: true
  };
  const spinner2 = {
    name: "spinner2",
    show: false
  };
  spinnerService._register(spinner1);
  spinnerService._register(spinner2);
});

afterEach(() => {
  spinnerService._unregisterAll();
})

test('spinnerService properly stores and maintains spinner components', () => {
  expect(spinnerService.isShowing("spinner1")).toBe(true);
  spinnerService.hide("spinner1");
  expect(spinnerService.isShowing("spinner1")).toBe(false);
  expect(spinnerService.isShowing("spinner2")).toBe(false);
  spinnerService.show("spinner2");
  expect(spinnerService.isShowing("spinner2")).toBe(true);
});
