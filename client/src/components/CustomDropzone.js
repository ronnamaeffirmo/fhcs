import React, { Component } from 'react'
import { Segment, Image, Loader } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import { fileToDataUrl } from '../common/helpers'
import toast from 'izitoast'

class CustomDropzone extends Component {
	constructor(props) {
		super(props)
		this.state = {
			settingImage: false,
		}
	}

	handleDrop = async (files) => {
		try {
			this.setState({ settingImage: true })
			const { input } = this.props
			const base64Image = await fileToDataUrl(files[0])
			input.onChange(base64Image)
			this.setState({ settingImage: false })
		} catch (e) {
			toast.error({
				title: 'Error',
				position: 'bottomRight',
				message: e.message,
			});
		}
	}

	render() {
		const { value } = this.props.input
		const { settingImage } = this.state
		const acceptedImgs = 'image/jpeg, image/jpg, image/png, image/gif'
		return (
			<Dropzone onDrop={this.handleDrop} accept={acceptedImgs} multiple={false} style={styles.dropzone}>
				{({getRootProps, getInputProps}) => (
					<Segment style={styles.innerDrop} {...getRootProps()}>
						<Loader active={settingImage} />
						<div style={styles.dropzoneInstruction}>
							<b>Choose a new profile pic</b> or drop it here
						</div>
						<input {...getInputProps()}/>
						<Image 
							circular centered 
							style={value ? styles.dropzoneImage : styles.dropzoneDefaultImg} 
							size='small' 
							src={value || '/images/drop.png'}
						/>
					</Segment>
				)}
			</Dropzone>
		)
	}
}

const styles = {
	dropzone: {
    marginBottom: '20px',
    outline: 'none'
  },
  innerDrop: {
    border: '2px dashed lightgrey',
		boxShadow: 'none',
		padding: '20px',
		backgroundColor: 'whitesmoke'
  },
  dropzoneInstruction: {
    color: 'grey', 
    textAlign: 'center', 
    marginBottom: '18px'
  },
  dropzoneDefaultImg: {
    opacity: '0.4',
	},
	dropzoneImage: {
		width: '278px',
		height: 'auto'
	}
}

export default CustomDropzone
