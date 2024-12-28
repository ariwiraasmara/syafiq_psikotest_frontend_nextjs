'use client'
import axios from 'axios';
import * as React from 'react';
import { getToken, getUniqueToken, getVariabel } from '@/api/api';

export default function Page() {

	React.useEffect(() => {
        const dataUniqueToken = getUniqueToken();
		console.log('getUniqueToken', dataUniqueToken);

		const datagetVariabel = getVariabel(1);
		console.log('getVariabel', datagetVariabel);
    }, []);

	return (
		<>
			<h1>Page</h1>
			<p>Page content</p>
		</>
	);
}
