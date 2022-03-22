import {API_PETS_BASE_URL} from '../../../services/constants';

const handler = async ({method, query: {endpoint}, body}, resToFront) => {
	try {
		switch (method.toUpperCase()) {
			case 'GET': {
				const url = `${API_PETS_BASE_URL}/${endpoint.join('/')}`;
				const resFromBack = await fetch(url);
				if (resFromBack.status !== 200)
					return resToFront.status(resFromBack.status).json();
				const {Data} = await resFromBack.json();
				return resToFront.status(200).json({data: Data});
			}
			// POST, PUT, DELETE:
			default: {
				const url = `${API_PETS_BASE_URL}/${endpoint.join('/')}`;
				const resFromBack = await fetch(url, {
					headers: {'Content-Type': 'application/json'},
					method,
					mode: 'cors',
					body: JSON.stringify(body),
				});
				if (![200, 201].includes(resFromBack.status))
					return resToFront.status(resFromBack.status).json();
				return resToFront.status(200).json({});
			}
		}
	} catch {
		resToFront.status(500).json();
	}
};

export default handler;
