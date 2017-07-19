import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { registerSnapshots, expectxml } from "jasmine-snapshot";

import EditorComponentsExample from "./editorComponentExample/EditorComponentsExample";

let snapshots = {};

describe('example test', () => {
    beforeAll(() => {
        registerSnapshots(snapshots, "example");
    });

    it('component can render and not crash', () => {
        expect(() => {

            // mount and render the component
            const wrapper = mount(<EditorComponentsExample />);
            const comp = wrapper.instance();
            expect(comp instanceof EditorComponentsExample).toBe(true);

            // verify it "works" by calling methods on the component instance
            expect(comp.createColumnDefs().length).toBe(3);
            expect(comp.createRowData().length).toBe(13)
        }).not.toThrow();
    });

    it('component will render correct markup', () => {
        expect(() => {

            // mount and render the component
            const elem = mount(<EditorComponentsExample />);

            // get the element via selector - this works
            const agFreshH1 = elem.find("div.ag-fresh h1");
            expect(agFreshH1.length).toBe(1);
            expectxml(agFreshH1.html()).toMatchSnapshot();

            // try getting the ag-header - this fails
            const agHeader = elem.find("div.ag-header");
            expect(agHeader.length).toBe(1);
            expectxml(agHeader.html()).toMatchSnapshot();
        }).not.toThrow();
    });
});

/* Set data at bottom so it doesn't gum up the test */
snapshots = {
    "example test component will render correct markup 1": `{ "h1": "Cell Editor Component Example"}`
};