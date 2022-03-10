import {API_AUTH_BASE_URL, API_BASE_URL} from '../../services/constants';

const descriptions = {
	404: 'El usuario o contraseña son incorrectos', // Usuario incorrecto o inexistente.
	401: 'El usuario o contraseña son incorrectos', // Contraseña incorrecta.
	406: 'Tu usuario no tiene permisos suficientes para ingresar a esta página',
	default: 'Ha ocurrido un error', // 400 or 500.
};

export default handler = async ({method, body, query}, resToFront) => {
	let url = '';
	try {
		switch (method.toUpperCase()) {
			case 'POST': {
				url = `${API_AUTH_BASE_URL}/login?from=aegir-backoffice`;
				const resFromBack = await fetch(url, {
					headers: {'Content-Type': 'application/json'},
					method: 'post',
					mode: 'cors',
					body: JSON.stringify(body),
				});
				if (resFromBack.status !== 200)
					return resToFront.status(resFromBack.status).json({
						error: descriptions[resFromBack.status] || descriptions.default,
					});
				const {data: user} = await resFromBack.json();
				return resToFront.status(resFromBack.status).json(user);
			}
			case 'GET': {
				const {token} = query;
				url = `${API_BASE_URL}/users/token/${token}`;
				const resFromBack = await fetch(url);
				if (resFromBack.status !== 200)
					return resToFront.status(resFromBack.status).json({});
				const {data: user} = await resFromBack.json();
				return resToFront.status(200).json(user);
			}
			default:
				return resToFront.status(405).json({error: descriptions.default});
		}
	} catch (error) {
		resToFront.status(500).json({error: descriptions.default});
	}
};
