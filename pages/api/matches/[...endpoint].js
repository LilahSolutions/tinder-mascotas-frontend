import {API_MATCHES_BASE_URL} from '../../../services/constants';

const handler = async ({method, query: {endpoint}, body}, resToFront) => {
	try {
		switch (method.toUpperCase()) {
			case 'GET': {
				const url = `${API_MATCHES_BASE_URL}/${endpoint.join('/')}`;
				const resFromBack = await fetch(url);
				if (resFromBack.status !== 200)
					return resToFront.status(resFromBack.status).json();
				const {Data} = await resFromBack.json();
				return resToFront.status(200).json({data: Data.whoMatchedMe || Data});
			}
			case 'POST': {
				const {matcher, matched} = body;
				const url = `${API_MATCHES_BASE_URL}?matcher=${matcher}&matched=${matched}`;
				const resFromBack = await fetch(url, {
					headers: {'Content-Type': 'application/json'},
					method: 'post',
					mode: 'cors',
					body: JSON.stringify(body),
				});
				if (resFromBack.status !== 201)
					return resToFront.status(resFromBack.status).json();
				return resToFront.status(200).json({});
			}
			default:
				return resToFront.status(405).json();
		}
	} catch {
		resToFront.status(500).json();
	}
};

export default handler;
