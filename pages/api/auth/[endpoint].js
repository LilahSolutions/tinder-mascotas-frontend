import {API_AUTH_BASE_URL} from '../../../services/constants';

const descriptions = {
	404: 'El usuario o contraseña son incorrectos', // Usuario incorrecto o inexistente.
	401: 'El usuario o contraseña son incorrectos', // Contraseña incorrecta.
	409: 'El email ingresado ya está registrado',
	default: 'Ha ocurrido un error', // 400 or 500.
};

export default handler = async ({method, endpoint, body}, resToFront) => {
	try {
		switch (method.toUpperCase()) {
			case 'POST': {
				const url = `${API_AUTH_BASE_URL}/${endpoint}`;
				const resFromBack = await fetch(url, {
					headers: {'Content-Type': 'application/json'},
					method: 'post',
					mode: 'cors',
					body: JSON.stringify(body),
				});
				if (![200, 201].includes(resFromBack.status))
					return resToFront.status(resFromBack.status).json({
						error: descriptions[resFromBack.status] || descriptions.default,
					});
				const {data: user} = await resFromBack.json(); /// Does this crash in register?
				return resToFront.status(200).json(user || null);
			}
			default:
				return resToFront.status(405).json({error: descriptions.default});
		}
	} catch (error) {
		resToFront.status(500).json({error: descriptions.default});
	}
};
