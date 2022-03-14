import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react";
import MessageBar from "../../components/MessageBar/MessageBar";
import Button from "../../components/Button"
import styles from './[action].module.css'

const MyPetAction = () => {
	const [action, setAction] = useState('')
	const [pet, setPet] = useState({
		name: '', 
		img: 'https://www.collinsdictionary.com/images/full/dog_230497594.jpg',
		type: '', 
		sex: ''
	})
	const [currentImage, setCurrentImage] = useState(pet.img)
	const [errors, setErrors] = useState([])
	const inputRef = useRef(null);
	const imgRef = useRef(null);
	const router = useRouter();

	const actions = {
		add: 'Agregar',
		edit: 'Editar'
	}

	const buttonLabels = {
		add: 'Añadir',
		edit: 'Actualizar'
	}

	useEffect(() => {
		if(action === 'edit'){
			//Backend stuff
			// setPet()
		}
	}, [])

	useEffect(() => {
		if(router.isReady && !router.asPath.endsWith('add') && !router.asPath.endsWith('edit')) router.push('/')
		else setAction(router.query.action)
	}, [router])

	const selectImg = () => {
		inputRef.current.click();
	}

	const uploadImage = (e) => {
		const file = e.target.files[0];
		if(file){
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
				setCurrentImage(image)
			};
			reader.readAsDataURL(file);
		}
	};

	const nameHandler = ({target: { value }}) => setPet({...pet, name: value});

	const savePet = () => {
		if(errors.length === 0){
			//Backend stuff
		}
	}

	return(
		<div className={styles.petActionContainer}>
			<MessageBar message={`${actions[action]} mascota`} />
			<img 
				ref={imgRef}
				className={[styles.addImg, action === 'add' ? styles.plusIcon : ''].join(' ')} 
				onClick={selectImg} 
				src={
					action === 'add' 
					? '/assets/plus.svg' 
					: currentImage} 
				alt='Imagen de mascota' 
			/>
			<input 
				ref={inputRef} 
				type="file" 
				onChange={uploadImage} 
				accept="image/*" 
				hidden 
			/>
			<input type='text' value={pet.name} onChange={e => nameHandler(e)}/>
			<Button label={`¡${buttonLabels[action]} mascota!`} onClick={savePet}/>
		</div>
	)
}

export default MyPetAction