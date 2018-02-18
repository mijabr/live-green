"use strict";
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var TopMenu_1 = require('./TopMenu');
describe('TopMenuComponent', function () {
    var comp;
    var fixture;
    var de;
    var el;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [TopMenu_1.TopMenuComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(TopMenu_1.TopMenuComponent);
        comp = fixture.componentInstance;
    });
    it('First menu should be Home', function () {
        de = fixture.debugElement.query(platform_browser_1.By.css('.wrap li:nth-child(1) a'));
        el = de.nativeElement;
        expect(el.innerHTML).toContain('Home');
    });
    it('Second menu should be Employees', function () {
        de = fixture.debugElement.query(platform_browser_1.By.css('.wrap li:nth-child(2) a'));
        el = de.nativeElement;
        expect(el.innerHTML).toContain('Employees');
    });
});
//# sourceMappingURL=TopMenu.spec.js.map