/// <reference types="gapi" />
/// <reference types="gapi.auth2" />
/// <reference types="gapi.client" />
/// <reference types="gapi.client.people" />
// TODO: Figure out why `gapi.client.youtube` or `gapi.youtube` still isn't being typed
/// <reference types="gapi.youtube" />
/// <reference path="../../../../../../node_modules/@types/gapi.youtube/index.d.ts" />

import useScript from '../../hooks/useScript';
import { useEffect, useRef, useState } from 'react';
import { AuthState, GoogleAuthService } from './GoogleAuthService';
import { distinctUntilChanged, tap } from 'rxjs/operators';

export function GoogleAuthComponent() {
	const [auth] = useState(() => new GoogleAuthService());
	useScript('https://apis.google.com/js/api.js', {
		onLoad: (e: Event) => auth.handleClientLoad(),
	});

	const called = useRef<boolean>(false);
	useEffect(() => {
		const subscription = auth.state$
			.pipe(
				distinctUntilChanged((prev: AuthState, next: AuthState) => {
					const isSignedInChanged = prev.isSignedIn !== next.isSignedIn;
					const loadingGAPIChanged = prev.loadingGAPI !== next.loadingGAPI;
					const initializingChanged = prev.initializing !== next.initializing;
					const resultChanged = prev.result !== next.result;
					return !(isSignedInChanged || loadingGAPIChanged || initializingChanged || resultChanged);
				}),
				tap(console.log)
			)
			.subscribe(async (state) => {
				if (state.isSignedIn && !called.current) {
					called.current = true;

					gapi.auth2.getAuthInstance().then((auth) => console.log('### google auth:', auth));
					const token = gapi.client.getToken();
					// console.log('auth token:', token);
					const result = await fetch(
						`https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&maxResults=20&mine=true&access_token=${token.access_token}`
					);
					const data = await result.json();
					// console.log('fetch my playlists result:', data);
					if (data) {
						//@ts-ignore
						const playlists = data.items.map((playlist) => {
							return {
								id: playlist.id,
								title: playlist.snippet.title,
								description: playlist.snippet.description,
							};
						});
						console.log('### my youtube playlists:', playlists);

						// cant fetch Watch Later playlist, wth!
						// https://developers.google.com/youtube/v3/docs/playlists/list#errors
						// const result2 = await fetch(
						// 	`https://www.googleapis.com/youtube/v3/playlistItems?part=id,snippet,contentDetails&playlistId=WL&mine=true&access_token=${token.access_token}`
						// );

						const playlistId = playlists[0].id; //.map((p: any) => p.id)
						const result2 = await fetch(
							`https://www.googleapis.com/youtube/v3/playlistItems?part=id,snippet,contentDetails&playlistId=${playlistId}&access_token=${token.access_token}`
						);
						const data2 = await result2.json();
						console.log('Refined query results:', data2);
					}
				}
			});
		return () => subscription.unsubscribe();
	}, [auth]);

	return (
		<>
			<button id="authorize-button" style={{ display: 'none' }}>
				Authorize
			</button>
			<button id="sign-out-button" style={{ display: 'none' }}>
				Sign Out
			</button>
			<div id="content"></div>
		</>
	);
}
