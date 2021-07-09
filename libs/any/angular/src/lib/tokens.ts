import { inject, InjectionToken } from '@angular/core';

export const AnyAngularLibraryModuleToken = new InjectionToken<unknown>(
	'@mono/any-angular module token'
);

export const LifecycleLogsComponentNameToken: InjectionToken<string> =
	new InjectionToken<string>(
		'Name of the component extending LifecycleLogsComponent',
		{
			factory: () =>
				inject(LifecycleLogsComponentNameToken) ?? 'UnknownComponent',
		}
	);
