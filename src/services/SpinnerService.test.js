import {spinnerService} from './spinnerService';


describe('spinnerService manages multiple spinner components', () => {
  beforeAll(() => {
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

  afterAll(() => {
    spinnerService._unregisterAll();
  })

  test('spinnerService returns proper status', () => {
    expect(spinnerService.isShowing("spinner1")).toBe(true);
    expect(spinnerService.isShowing("spinner2")).toBe(false);
  });

  test('spinner state can be changed', () => {
    spinnerService.hide("spinner1");
    spinnerService.show("spinner2");
  })

  test('new spinner status is returned', () => {
    expect(spinnerService.isShowing("spinner1")).toBe(false);
    expect(spinnerService.isShowing("spinner2")).toBe(true);
  })

})
