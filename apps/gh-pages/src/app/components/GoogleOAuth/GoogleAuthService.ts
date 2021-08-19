/// <reference types="gapi" />
/// <reference types="gapi.auth2" />
/// <reference types="gapi.client" />
/// <reference types="gapi.client.people" />
/// <reference path="../../../../../../node_modules/@types/gapi.youtube/index.d.ts" />

import { BehaviorSubject } from 'rxjs';

export type AuthState = {
	loadingGAPI: boolean;
	isSignedIn: boolean;
	initializing: boolean;
	result?: any;
};

export enum GoogleAuthScopes {
	YoutubeDataReadOnly = 'https://www.googleapis.com/auth/youtube.readonly',
}

export class GoogleAuthService {
	// Enter an API key from the Google API Console:
	//   https://console.developers.google.com/apis/credentials
	apiKey = '';

	// Enter the API Discovery Docs that describes the APIs you want to
	// access. In this example, we are accessing the People API, so we load
	// Discovery Doc found here: https://developers.google.com/people/api/rest/
	discoveryDocs = ['https://people.googleapis.com/$discovery/rest?version=v1'];

	// Enter a client ID for a web application from the Google API Console:
	//   https://console.developers.google.com/apis/credentials?project=_
	// In your API Console project, add a JavaScript origin that corresponds
	//   to the domain where you will be running the script.
	clientId = '';

	// Enter one or more authorization scopes. Refer to the documentation for
	// the API or https://developers.google.com/people/v1/how-tos/authorizing
	// for details.
	scopes = 'profile';

	private state$$ = new BehaviorSubject<AuthState>({
		loadingGAPI: true,
		isSignedIn: false,
		initializing: false,
	});

	public state$ = this.state$$.asObservable();

	updateState = (updates: Partial<AuthState>) =>
		this.state$$.next({ ...this.state$$.getValue(), ...updates });

	private readonly onAuthStatusChanged: (isSignedIn: boolean) => void =
		defaultOnAuthStatusChanged.bind(this);
	private readonly onInitialized: () => void = defaultOnInitialized.bind(this);
	private readonly onUserDataReceived: (resp: any) => void = defaultOnUserDataReceived.bind(this);

	constructor(
		options: {
			onAuthStatusChanged?: (isSignedIn: boolean) => void;
			onInitialized?: () => void;
			onUserDataReceived?: (resp: any) => void;
		} = {}
	) {
		if (options.onAuthStatusChanged) {
			this.onAuthStatusChanged = options.onAuthStatusChanged;
		}

		if (options.onInitialized) {
			this.onInitialized = options.onInitialized;
		}

		if (options.onUserDataReceived) {
			this.onUserDataReceived = options.onUserDataReceived;
		}
	}

	handleClientLoad() {
		this.updateState({ loadingGAPI: false, initializing: true });
		// Load the API client and auth2 library
		gapi.load('client:auth2', this.initClient);
	}

	initClient = async () => {
		await gapi.client.init({
			apiKey: this.apiKey,
			discoveryDocs: this.discoveryDocs,
			clientId: this.clientId,
			scope: this.scopes,
		});
		this.updateState({ initializing: false });
		this.onInitialized();

		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateAuthStatus);

		// Handle the initial sign-in state.
		this.updateAuthStatus(gapi?.auth2.getAuthInstance().isSignedIn.get() ?? false);
	};

	handleAuthClick = (event: unknown) => {
		gapi?.auth2.getAuthInstance().signIn();
	};

	handleSignOutClick = (event: unknown) => {
		gapi?.auth2.getAuthInstance().signOut();
	};

	updateAuthStatus = async (isSignedIn: boolean) => {
		this.onAuthStatusChanged(isSignedIn);
		this.updateState({ isSignedIn });
		if (isSignedIn) {
			try {
				const result = await this.fetchMyDetails();
				this.onUserDataReceived(result);
				this.updateState({ result });
			} catch (e) {
				console.error(e); // What errors can we get here?
			}
		}
	};

	// Load the API and make an API call.  Display the results on the screen.
	fetchMyDetails = () => {
		return gapi?.client.people.people.get({
			resourceName: 'people/me',
			'requestMask.includeField': 'person.names',
		});
	};
}

function defaultOnAuthStatusChanged(isSignedIn: boolean) {
	const authorizeButton = document.getElementById('authorize-button');
	const signOutButton = document.getElementById('sign-out-button');

	if (isSignedIn) {
		authorizeButton!.style.display = 'none';
		signOutButton!.style.display = 'block';
	} else {
		authorizeButton!.style.display = 'block';
		signOutButton!.style.display = 'none';
	}
}

function defaultOnInitialized(this: GoogleAuthService) {
	const authorizeButton = document.getElementById('authorize-button');
	const signOutButton = document.getElementById('sign-out-button');
	if (authorizeButton) authorizeButton.onclick = this.handleAuthClick;
	if (signOutButton) signOutButton.onclick = this.handleSignOutClick;
}

function defaultOnUserDataReceived(response: any) {
	const name = response.result.names[0].givenName;
	const contentElement = document.getElementById('content');
	if (contentElement) {
		const p = document.createElement('p');
		p.appendChild(document.createTextNode('Hello, ' + name + '!'));
		contentElement.appendChild(p);
	}
}
