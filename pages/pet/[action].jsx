import {useRouter} from 'next/router';
import {useEffect, useState, useRef} from 'react';
import {withAuth} from '../../utils/auth';
import MessageBar from '../../components/MessageBar/MessageBar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {TYPE_OPTIONS, SEX_OPTIONS} from '../../services/config';
import styles from '../../styles/pet-actions.module.css';
import Dropdown from '../../components/Dropdown';

const MyPetAction = () => {
	const [action, setAction] = useState('');
	const [pet, setPet] = useState({
		name: '',
		img: '',
		type: '',
		sex: '',
	});
	const [currentImage, setCurrentImage] = useState(pet.img);
	const [errors, setErrors] = useState([]);
	const inputRef = useRef(null);
	const imgRef = useRef(null);
	const router = useRouter();

	const actions = {
		add: 'Agregar',
		edit: 'Editar',
	};

	const buttonLabels = {
		add: 'Añadir',
		edit: 'Actualizar',
	};

	useEffect(() => {
		if (action === 'edit') {
			//Backend stuff
			const mockedPet = {
				name: 'Pancho',
				type: 'Tortuga',
				img: 'https://www.collinsdictionary.com/images/full/dog_230497594.jpg',
				sex: 'Hembra',
			};

			setPet(mockedPet);
			setCurrentImage(mockedPet.img);
		}
	}, [action]);

	useEffect(() => {
		if (
			router.isReady &&
			!router.asPath.endsWith('add') &&
			!router.asPath.endsWith('edit')
		)
			router.push('/');
		else setAction(router.query.action);
	}, [router]);

	const selectImg = () => {
		inputRef.current.click();
	};

	const uploadImage = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (!file.type.startsWith('image/')) {
				console.log('The picked file is not an image');
				return;
			}
			imgRef.current.file = file;

			const reader = new FileReader();
			reader.onload = (e) => {
				const image = e.target.result;
				imgRef.current.src = image;
				imgRef.current.style.padding = '0';
				setCurrentImage(image);
			};
			reader.readAsDataURL(file);
		}
	};

	const nameHandler = ({target: {value}}) => {
		const errorIndex = errors.findIndex((e) => e !== 'nameField');
		errors.splice(errorIndex, 1);
		setErrors(errors);

		setPet({...pet, name: value});
	};

	const dropdownHandler = ({target: {value, name}}) =>
		setPet({...pet, [name]: value});

	const hasErrors = (field) => {
		console.log(errors.includes(field));
		return errors.includes(field);
	};

	const validateErrors = () => {
		const auxErrors = [];

		if (pet.name === '' && !errors.includes('nameField')) {
			auxErrors = [...errors, 'nameField'];
		}

		return auxErrors;
	};

	const savePet = () => {
		const currentErrors = validateErrors();

		if (currentErrors.length === 0) {
			//Backend stuff
		} else {
			setErrors(currentErrors);
		}
	};

	return (
		<div className={styles.petActionContainer}>
			<MessageBar message={`${actions[action]} mascota`} />
			<img
				ref={imgRef}
				className={[
					styles.addImg,
					action === 'add' ? styles.plusIcon : '',
				].join(' ')}
				onClick={selectImg}
				src={action === 'add' ? '/assets/plus.svg' : currentImage}
				alt="Imagen de mascota"
			/>
			<input
				ref={inputRef}
				type="file"
				onChange={uploadImage}
				accept="image/*"
				hidden
			/>
			<Input
				type="text"
				value={pet.name}
				handleChange={(e) => nameHandler(e)}
				size="medium"
			/>
			{hasErrors('nameField') && (
				<span className={styles.error}>Debe ingresar un nombre</span>
			)}
			<Dropdown
				name="type"
				defaultValue={pet.type}
				options={TYPE_OPTIONS}
				handleChange={(e) => dropdownHandler(e)}
				size="medium"
			/>
			<Dropdown
				name="sex"
				defaultValue={pet.sex}
				options={SEX_OPTIONS}
				handleChange={(e) => dropdownHandler(e)}
				size="medium"
			/>
			<Button
				label={`¡${buttonLabels[action]} mascota!`}
				handleClick={savePet}
				size="medium"
				className={styles.buttonAnimation}
			/>
		</div>
	);
};

const Component = withAuth(MyPetAction);
Component.goBack = '/pets';

export default Component;
