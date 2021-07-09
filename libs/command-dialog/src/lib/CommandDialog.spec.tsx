import { render } from '@testing-library/react';

import { CommandDialog } from './CommandDialog';

describe('CommandDialog', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<CommandDialog commands={{}} />);
		expect(baseElement).toBeTruthy();
	});
});
